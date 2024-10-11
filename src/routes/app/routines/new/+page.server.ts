import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '$lib/server/firebase';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData();

		const name = formData.get('name')?.toString();
		const trigger = formData.get('trigger')?.toString();
		const days = JSON.parse(formData.get('days')?.toString() ?? '{}');
		const tasks = JSON.parse(formData.get('tasks')?.toString() ?? '[]');

		if (!name) {
			return fail(422, { message: 'Please enter a name for the routine.' });
		}

		try {
			await addDoc(collection(db, 'routines'), {
				userId: locals.user.id,
				name,
				trigger,
				days,
				tasks,
				createdAt: new Date()
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'An error occurred. Please try again later.' });
		}

		return { message: 'Routine created successfully.' };
	}
};
