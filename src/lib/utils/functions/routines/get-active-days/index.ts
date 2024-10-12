import type { Routine } from '$types/Routine';

/**
 * Returns all active days for a routine.
 * @param routine The routine to check.
 * @returns All active days for the routine.
 */
export const getActiveDays = (routine: Routine): string[] => {
	return Object.entries(routine.days)
		.filter(([, isActive]) => isActive)
		.map(([day]) => day);
};
