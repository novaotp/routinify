import { prisma } from '$lib/server/services/db';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;
	const sessionId = event.cookies.get('X-SESSION-ID');

	// @ts-expect-error Won't set user to be of type `undefined`.
	event.locals.user = undefined;

	if (pathname.startsWith('/app') && !sessionId) {
		const message = 'Please log in to access this page.';
		throw redirect(303, `/login?message=${encodeURIComponent(message)}&from=${pathname}`);
	} else if (sessionId) {
		const user = await getUserBySessionId(sessionId);

		if (!user) {
			event.cookies.delete('X-SESSION-ID', { path: '/' });

			const message = 'Please log in to access this page.';
			throw redirect(303, `/login?message=${encodeURIComponent(message)}&from=${pathname}`);
		}

		event.locals.user = user;
	}

	return resolve(event);
};

/**
 * Gets a user by their session ID.
 * @param {string} sessionId The session ID to use to get the user.
 */
const getUserBySessionId = async (sessionId: string): Promise<App.Locals['user'] | null> => {
	return prisma.user.findFirst({
		where: {
			sessions: {
				some: {
					id: sessionId
				}
			}
		},
		select: {
			id: true,
			nickname: true,
			email: true,
			createdAt: true
		}
	});
};
