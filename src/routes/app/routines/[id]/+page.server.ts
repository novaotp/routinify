import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '$lib/server/firebase';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Routine } from '$types/Routine';
import { updateDoc } from 'firebase/firestore';

export const load: PageServerLoad = async ({ locals, params }) => {
	return {
		routine: await getRoutineByIdAndUserId(params.id, locals.user.id)
	};
};

/**
 * Retrieves a routine by its ID and user ID.
 * @param id The ID of the routine.
 * @param userId The ID of the user whose routine to retrieve.
 * @returns The routine with the given ID and user ID.
 * @throws If the routine is not found.
 */
const getRoutineByIdAndUserId = async (id: string, userId: string): Promise<Routine> => {
	const snapshot = await getDoc(doc(db, 'routines', id));

	if (!snapshot.exists() || snapshot.data().userId !== userId) {
		throw error(404, 'It looks like this routine does not exist or it was deleted.');
	}

	return {
		...snapshot.data(),
		id: snapshot.id,
		// Timestamp is a class, so we need to convert it to a POJO.
		createdAt: {
			seconds: snapshot.data().createdAt.seconds,
			nanoseconds: snapshot.data().createdAt.nanoseconds
		},
		// Ensure that the days are in the correct order.
		days: {
			monday: snapshot.data().days.monday,
			tuesday: snapshot.data().days.tuesday,
			wednesday: snapshot.data().days.wednesday,
			thursday: snapshot.data().days.thursday,
			friday: snapshot.data().days.friday,
			saturday: snapshot.data().days.saturday,
			sunday: snapshot.data().days.sunday
		}
	} as Routine;
};

export const actions: Actions = {
	edit: async ({ params, request }) => {
		const formData = await request.formData();

		const name = formData.get('name')?.toString();
		const trigger = formData.get('trigger')?.toString();
		const days = JSON.parse(formData.get('days')?.toString() ?? '{}');
		const tasks = JSON.parse(formData.get('tasks')?.toString() ?? '[]');

		if (!name) {
			return fail(422, { message: 'Please enter a name for the routine.' });
		}

		try {
			await updateDoc(doc(db, 'routines', params.id), {
				name,
				trigger,
				days,
				tasks
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'An error occurred. Please try again later.' });
		}

		return { message: 'Routine updated successfully.' };
	},
	destroy: async ({ params }) => {
		try {
			await deleteDoc(doc(db, 'routines', params.id));
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'An error occurred. Please try again later.' });
		}

		return { message: 'Routine deleted successfully.' };
	}
};
