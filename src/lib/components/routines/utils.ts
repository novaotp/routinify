import { daysOfWeek, type Routine } from '$types/Routine';

/**
 * Returns all active days for a routine in order.
 * @param routine The routine to check.
 * @returns All active days for the routine in order.
 */
export const getActiveDays = (routine: Routine): string[] => {
	const active = Object.entries(routine.days)
		.filter(([, isActive]) => isActive)
		.map(([day]) => day);

	return daysOfWeek.filter((day) => active.includes(day));
};

/**
 * Checks if a routine is active.
 * @param routine The routine to check.
 * @returns `true` if the routine is active, `false` otherwise.
 */
export const isRoutineActive = (routine: Routine) => {
	return routine.trigger !== '' && Object.values(routine.days).some((d) => d === true);
};
