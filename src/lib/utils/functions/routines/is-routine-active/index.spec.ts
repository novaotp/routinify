import { isRoutineActive } from '.';
import { describe, it, expect } from 'vitest';
import type { RoutineDay } from '$types/Routine';

describe('isRoutineActive', () => {
	it('Should return false if the trigger is empty and no days are selected', () => {
		const expected = false;
		const received = isRoutineActive({
			id: 'some-id',
			name: '',
			tasks: [],
			trigger: '',
			days: {} as Record<RoutineDay, boolean>,
			createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 }
		});

		expect(received).toEqual(expected);
	});

	it('Should return false if at least one day is selected but the trigger is empty', () => {
		const expected = false;
		const received = isRoutineActive({
			id: 'some-id',
			name: '',
			tasks: [],
			trigger: '',
			days: { monday: true, tuesday: false } as Record<RoutineDay, boolean>,
			createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 }
		});

		expect(received).toEqual(expected);
	});

	it('Should return false if the trigger is set but no days are selected', () => {
		const expected = false;
		const received = isRoutineActive({
			id: 'some-id',
			name: '',
			tasks: [],
			trigger: '13:00',
			days: {} as Record<RoutineDay, boolean>,
			createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 }
		});

		expect(received).toEqual(expected);
	});

	it('should return true if the trigger is not empty and at least one day is selected', () => {
		const expected = true;
		const received = isRoutineActive({
			id: 'some-id',
			name: '',
			tasks: [],
			trigger: '13:00',
			days: { monday: true, tuesday: false } as Record<RoutineDay, boolean>,
			createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 }
		});

		expect(received).toEqual(expected);
	});
});
