export interface Toast {
	id: string;
	type: 'success' | 'error' | 'info';
	message: string;
}

const DISMISS_AFTER = 5000;

class ToastContext {
	private _toasts: Toast[] = $state([]);

	get toasts() {
		return this._toasts;
	}

	/** Adds a new toast to the top of the stack. */
	public add(data: Omit<Toast, 'id'>) {
		const id = crypto.randomUUID();

		this._toasts.push({ id, ...data });

		setTimeout(() => {
			this.dismiss(id);
		}, DISMISS_AFTER);
	}

	/** Removes a toast from the stack. */
	public dismiss(id: string) {
		this._toasts = this._toasts.filter((toast) => toast.id !== id);
	}

	/**
	 * Adds a new `success` toast to the top of the stack.
	 * @alias {@link add} with type `success`.
	 */
	public success(message: string) {
		this.add({ type: 'success', message });
	}

	/**
	 * Adds a new `info` toast to the top of the stack.
	 * @alias {@link add} with type `info`.
	 */
	public info(message: string) {
		this.add({ type: 'info', message });
	}

	/**
	 * Adds a new `error` toast to the top of the stack.
	 * @alias {@link add} with type `error`.
	 */
	public error(message: string) {
		this.add({ type: 'error', message });
	}
}

export const toast = new ToastContext();
