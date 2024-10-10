import { redirect } from '@sveltejs/kit';
import { signOut } from 'firebase/auth';
import { auth } from '$lib/server/firebase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	await signOut(auth);

	throw redirect(303, '/');
};
