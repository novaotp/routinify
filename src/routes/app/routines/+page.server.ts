import { db } from '$lib/server/firebase';
import { query, collection, where, getDocs } from 'firebase/firestore';
import type { PageServerLoad } from './$types';
import type { Routine } from '$types/Routine';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		routines: getRoutinesByUserId(locals.user.id)
	};
};

/**
 * Retrieves all routines for a given user.
 * @param userId The ID of the user to retrieve routines for.
 * @returns The routines for the user.
 */
const getRoutinesByUserId = async (userId: string): Promise<Routine[]> => {
	const q = query(collection(db, 'routines'), where('userId', '==', userId));
	const snapshot = await getDocs(q);

	return snapshot.docs.map((doc) => {
		return {
			...doc.data(),
			id: doc.id,
			createdAt: {
				seconds: doc.data().createdAt.seconds,
				nanoseconds: doc.data().createdAt.nanoseconds
			}
		} as Routine;
	});
};
