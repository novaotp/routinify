/**
 * The current notification permission on the device.
 *
 * Used because there is no way to revoke the permission programatically.
 */
let permission = $state<NotificationPermission>('default');

/**
 * Initializes the notification permission on the device.
 */
export const initNotificationsOnDevice = () => {
	permission = Notification.permission;
	localStorage.setItem('notification-permission', permission);
};

/** Returns the current notification permission on the device. */
export const getNotificationsPermissionOnDevice = () => permission;

/**
 * Attempts to enable notifications on the device.
 *
 * If it is already `granted` on the device, the permission `granted` is changed in `localStorage`.
 *
 * Otherwise, it will ask for permission and update to `granted` if allowed, otherwise `denied`.
 *
 * @returns The new permission.
 */
export const enableNotificationsOnDevice = async () => {
	if (permission === 'granted') {
		localStorage.setItem('notification-permission', 'granted');
		return permission;
	} else {
		permission = await Notification.requestPermission();
		localStorage.setItem('notification-permission', permission);

		return permission;
	}
};

/** Disables notifications in `localStorage`. */
export const disableNotificationsOnDevice = () => {
	permission = 'denied';
	localStorage.setItem('notification-permission', permission);
};

/**
 * Sends a notification on the device.
 * @returns `true` if the notification was sent, `false` otherwise (happens if the permission is `denied`).
 */
export const sendNotificationOnDevice = async (
	title: string,
	options: NotificationOptions = { icon: '/logos/favicon.svg' }
) => {
	if (permission !== 'granted') {
		return false;
	}

	navigator.serviceWorker.ready.then((registration) => {
		registration.showNotification(title, options);
	});

	return true;
};
