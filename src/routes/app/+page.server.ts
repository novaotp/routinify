import { db } from '$lib/server/firebase';
import { query, collection, where, getDocs } from 'firebase/firestore';
import type { PageServerLoad } from './$types';
import type { Routine } from '$types/Routine';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		activeRoutines: getActiveRoutinesByUserId(locals.user.id)
	};
};

const getActiveRoutinesByUserId = async (userId: string) => {
	const q = query(collection(db, 'routines'), where('userId', '==', userId));
	const snapshot = await getDocs(q);

	return snapshot.docs
		.filter((doc) => doc.data().trigger !== '')
		.filter((doc) => Object.values<boolean>(doc.data().days).some((v) => v))
		.map((doc) => {
			return {
				...doc.data(),
				id: doc.id,
				// Timestamp is a class, so we need to convert it to a POJO.
				createdAt: {
					seconds: doc.data().createdAt.seconds,
					nanoseconds: doc.data().createdAt.nanoseconds
				},
				// Ensure that the days are in the correct order.
				days: {
					monday: doc.data().days.monday,
					tuesday: doc.data().days.tuesday,
					wednesday: doc.data().days.wednesday,
					thursday: doc.data().days.thursday,
					friday: doc.data().days.friday,
					saturday: doc.data().days.saturday,
					sunday: doc.data().days.sunday
				}
			} as Routine;
		});
};
