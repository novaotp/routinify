import { beforeEach, describe, expect, it } from 'vitest';
import { toast } from './index.svelte';

describe('ToastContext', () => {
	beforeEach(async () => {
		toast.clear();
	});

	it('Adds a toast to the stack', () => {
		toast.add({ type: 'success', message: 'Yay!' });

		expect(toast.toasts).toHaveLength(1);
	});

	it('Adds multiple toasts to the stack', () => {
		toast.add({ type: 'success', message: 'Yay!' });
		toast.add({ type: 'info', message: 'Info!' });
		toast.add({ type: 'error', message: 'Oops!' });

		expect(toast.toasts).toHaveLength(3);
	});

	it('Removes a toast from the stack', () => {
		const id = toast.add({ type: 'success', message: 'Yay!' });

		expect(toast.toasts).toHaveLength(1);

		toast.dismiss(id);

		expect(toast.toasts).toHaveLength(0);
	});

	it('Adds a success toast', () => {
		toast.success('Yay!');

		expect(toast.toasts).toHaveLength(1);
		expect(toast.toasts[0].type).toBe('success');
	});

	it('Adds an info toast', () => {
		toast.info('Info!');

		expect(toast.toasts).toHaveLength(1);
		expect(toast.toasts[0].type).toBe('info');
	});

	it('Adds an error toast', () => {
		toast.error('Oops!');

		expect(toast.toasts).toHaveLength(1);
		expect(toast.toasts[0].type).toBe('error');
	});

	it('Dismisses a toast after a certain amount of time', async () => {
		toast.add({ type: 'success', message: 'Yay!' });

		expect(toast.toasts).toHaveLength(1);

		await new Promise((resolve) => setTimeout(resolve, 5000));

		expect(toast.toasts).toHaveLength(0);
	});
});
