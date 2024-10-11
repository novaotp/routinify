export type Routine = {
	id: string;
	name: string;
	trigger: string;
	days: Record<RoutineDay, boolean>;
	tasks: RoutineTask[];
	createdAt: { seconds: number; nanoseconds: number };
};

export type RoutineDay =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday';

export type RoutineTask = {
	id: string;
	name: string;
	description: string;
	/** The duration of the task in minutes. */
	duration: number;
};
