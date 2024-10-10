import { describe, expect, it, vi } from 'vitest';
import { self } from '.';

describe('self modifier', () => {
	it('Should only trigger if the event target is the same element that the event listener was added to and not a parent', () => {
		const handler = vi.fn();
		const element = document.createElement('div');
		const modifiedHandler = self(handler);

		element.addEventListener('click', modifiedHandler);

		element.click();
		expect(handler).toHaveBeenCalledTimes(1);

		document.body.click();
		expect(handler).toHaveBeenCalledTimes(1);
	});

	it('Should only trigger if the event target is the same element that the event listener was added to and not a parent', () => {
		const handler = vi.fn();
		const element = document.createElement('div');
		const child = document.createElement('span');
		element.appendChild(child);
		const modifiedHandler = self(handler);

		element.addEventListener('click', modifiedHandler);

		element.click();
		expect(handler).toHaveBeenCalledTimes(1);

		child.click();
		expect(handler).toHaveBeenCalledTimes(1);
	});
});
