import { fail, redirect } from '@sveltejs/kit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '$lib/server/firebase';
import { FirebaseError } from 'firebase/app';
import { addDoc, collection } from 'firebase/firestore';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		if (!email || !password) {
			return fail(422, { message: 'Please enter an email and a password.' });
		}

		if (password.length < 8) {
			return fail(422, { message: 'Password must be at least 8 characters long.' });
		}

		let userCredential: Awaited<ReturnType<typeof createUserWithEmailAndPassword>>;
		try {
			userCredential = await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.error(err);

			if (err instanceof FirebaseError && err.code === 'auth/email-already-in-use') {
				return fail(409, { message: 'Email address already in use.' });
			}

			return fail(500, { message: 'Internal server error.' });
		}

		const user = {
			authenticationId: userCredential.user.uid,
			avatarPath: null,
			nickname: randomNickname(),
			email
		};

		try {
			await addDoc(collection(db, 'users'), user);
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Internal server error.' });
		}

		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Internal server error.' });
		}

		throw redirect(303, '/app');
	}
};

const randomNickname = () => {
	return Array(8)
		.fill(null)
		.map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
		.join('');
};
