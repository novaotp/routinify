import { fail } from '@sveltejs/kit';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '$lib/server/firebase';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return;
};

export const actions: Actions = {
	editPersonalInformation: async ({ locals, request }) => {
		const formData = await request.formData();

		const nickname = formData.get('nickname')?.toString();

		if (!nickname) {
			return fail(422, { message: 'Please enter a nickname.' });
		}

		try {
			await updateDoc(doc(db, 'users', locals.user.id), {
				nickname
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'An error occurred. Please try again later.' });
		}

		return { message: 'Personal information updated.' };
	}
};
