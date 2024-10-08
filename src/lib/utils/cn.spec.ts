import { expect, it } from 'vitest';
import { cn } from './cn';

it('Returns an empty string if no classnames are provided', () => {
	const received = cn();
	const expected = '';

	expect(received).toBe(expected);
});

it('Combines non-overlapping classnames', () => {
	const received = cn('text-red-500', 'hover:text-blue-500');
	const expected = 'text-red-500 hover:text-blue-500';

	expect(received).toBe(expected);
});

it('Combines overlapping classnames', () => {
	const received = cn('text-red-500', 'text-blue-500');
	const expected = 'text-blue-500';

	expect(received).toBe(expected);
});

it('Combines non-overlapping object classnames', () => {
	const received = cn({
		'text-red-500': true,
		'hover:text-blue-500': true,
		'bg-blue-500': false
	});
	const expected = 'text-red-500 hover:text-blue-500';

	expect(received).toBe(expected);
});

it('Combines overlapping object classnames', () => {
	const received = cn({
		'text-red-500': true,
		'text-blue-500': true
	});
	const expected = 'text-blue-500';

	expect(received).toBe(expected);
});
