import { fail, redirect } from '@sveltejs/kit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '$lib/server/firebase';
import type { Actions } from './$types';
import { FirebaseError } from 'firebase/app';

export const actions: Actions = {
	default: async ({ request, url }) => {
		const formData = await request.formData();

		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		if (!email || !password) {
			return fail(422, { message: 'Please enter an email and a password.' });
		}

		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.error(err);

			if (err instanceof FirebaseError && err.code === 'auth/invalid-credential') {
				return fail(404, { message: 'Invalid credentials.' });
			}

			return fail(500, { message: 'Internal server error.' });
		}

		throw redirect(303, url.searchParams.get('from') ?? '/app');
	}
};
