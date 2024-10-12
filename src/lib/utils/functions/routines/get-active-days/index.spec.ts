import { describe, expect, it } from 'vitest';
import { getActiveDays } from '.';

describe('getActiveDays', () => {
	it('should return an empty array if no days are active', () => {
		const expected: string[] = [];
		const received = getActiveDays({
			id: '',
			name: '',
			tasks: [],
			trigger: '',
			days: {
				monday: false,
				tuesday: false,
				wednesday: false,
				thursday: false,
				friday: false,
				saturday: false,
				sunday: false
			},
			createdAt: { seconds: 0, nanoseconds: 0 }
		});

		expect(received).toEqual(expected);
	});

	it('should return an array of active days if some days are active', () => {
		const expected = ['monday', 'wednesday', 'friday'];
		const received = getActiveDays({
			id: '',
			name: '',
			tasks: [],
			trigger: '',
			days: {
				monday: true,
				tuesday: false,
				wednesday: true,
				thursday: false,
				friday: true,
				saturday: false,
				sunday: false
			},
			createdAt: { seconds: 0, nanoseconds: 0 }
		});

		expect(received).toEqual(expected);
	});

	it('should return an array of all days if all days are active', () => {
		const expected = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		const received = getActiveDays({
			id: '',
			name: '',
			tasks: [],
			trigger: '',
			days: {
				monday: true,
				tuesday: true,
				wednesday: true,
				thursday: true,
				friday: true,
				saturday: true,
				sunday: true
			},
			createdAt: { seconds: 0, nanoseconds: 0 }
		});

		expect(received).toEqual(expected);
	});
});
