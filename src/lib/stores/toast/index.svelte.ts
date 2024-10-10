export interface Toast {
	id: string;
	type: 'success' | 'error' | 'info';
	message: string;
}

export const DISMISS_AFTER = 5000;

class ToastContext {
	private _toasts: Toast[] = $state([]);

	get toasts() {
		return this._toasts;
	}

	/**
	 * Adds a new toast to the top of the stack.
	 * @param data The data of the toast to add.
	 * @returns The ID of the toast.
	 */
	public add(data: Omit<Toast, 'id'>): string {
		const id = crypto.randomUUID();

		this._toasts.push({ id, ...data });

		setTimeout(() => {
			this.dismiss(id);
		}, DISMISS_AFTER);

		return id;
	}

	/**
	 * Removes a toast from the stack.
	 * @param id The ID of the toast to remove.
	 */
	public dismiss(id: string): void {
		this._toasts = this._toasts.filter((toast) => toast.id !== id);
	}

	/**
	 * Adds a new `success` toast to the top of the stack.
	 * @alias {@link add} with type `success`.
	 */
	public success(message: string): string {
		return this.add({ type: 'success', message });
	}

	/**
	 * Adds a new `info` toast to the top of the stack.
	 * @alias {@link add} with type `info`.
	 */
	public info(message: string): string {
		return this.add({ type: 'info', message });
	}

	/**
	 * Adds a new `error` toast to the top of the stack.
	 * @alias {@link add} with type `error`.
	 */
	public error(message: string): string {
		return this.add({ type: 'error', message });
	}

	/**
	 * Removes all toasts from the stack.
	 */
	public clear(): void {
		this._toasts = [];
	}
}

export const toast = new ToastContext();
