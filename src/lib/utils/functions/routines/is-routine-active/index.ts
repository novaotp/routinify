import type { Routine } from '$types/Routine';

/**
 * Checks if a routine is active.
 * @param routine The routine to check.
 * @returns `true` if the routine is active, `false` otherwise.
 */
export const isRoutineActive = (routine: Routine) => {
	return routine.trigger !== '' && Object.values(routine.days).some((d) => d === true);
};
