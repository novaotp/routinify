import { auth, db } from '$lib/server/firebase';
import { redirect } from '@sveltejs/kit';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { User } from '$types/User';

export const handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// @ts-expect-error Won't set user to be of type `undefined`.
	event.locals.user = undefined;

	if (pathname.startsWith('/app') && !auth.currentUser?.uid) {
		const message = 'Please log in to access this page.';
		throw redirect(303, `/login?message=${message}&from=${encodeURIComponent(pathname)}`);
	} else if (auth.currentUser?.uid) {
		let user: User | undefined = undefined;
		try {
			user = await getUser();
		} catch (err) {
			console.error(err);
		}

		if (!user) {
			await signOut(auth);

			const message = 'An error occurred. Please log in to access this page.';
			throw redirect(303, `/login?message=${message}&from=${encodeURIComponent(pathname)}`);
		}

		event.locals.user = user;
	}

	return resolve(event);
};

/**
 * Gets a user by their authentication ID.
 * @returns The user if found, otherwise `undefined`.
 */
const getUser = async (): Promise<User | undefined> => {
	const q = query(collection(db, 'users'), where('authenticationId', '==', auth.currentUser?.uid));
	const snapshot = await getDocs(q);

	if (snapshot.empty) return undefined;

	return {
		...snapshot.docs[0].data(),
		id: snapshot.docs[0].id
	} as User;
};
