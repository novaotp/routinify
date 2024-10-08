import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/services/db';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('X-SESSION-ID');

	if (!sessionId) {
		throw redirect(303, '/');
	}

	try {
		await prisma.session.delete({ where: { id: sessionId } });
	} catch (err) {
		console.error(err);
	}

	cookies.delete('X-SESSION-ID', { path: '/' });

	throw redirect(303, '/');
};
