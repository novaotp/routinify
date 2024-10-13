export type Routine = {
	id: string;
	name: string;
	trigger: string;
	days: Record<RoutineDay, boolean>;
	tasks: RoutineTask[];
	createdAt: { seconds: number; nanoseconds: number };
};

export const daysOfWeek = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday'
] as const;

export type RoutineDay = (typeof daysOfWeek)[number];

export type RoutineTask = {
	id: string;
	name: string;
	description: string;
	/** The duration of the task in minutes. */
	duration: number;
};
