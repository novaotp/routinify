import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/services/db';
import { compare } from 'bcrypt';
import type { Session } from '@prisma/client';

/** 7 days. */
const SESSION_EXPIRES_IN = 604800000;

export const actions: Actions = {
	default: async ({ cookies, request, url }) => {
		const formData = await request.formData();

		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		if (!email || !password) {
			return fail(422, { message: 'Please enter an email and a password.' });
		}

		const user = await prisma.user.findUnique({ where: { email } });

		if (!user || !(await compare(password, user.password))) {
			return fail(401, { message: 'Invalid email or password.' });
		}

		let session: Session;
		try {
			session = await prisma.session.create({
				data: {
					userId: user.id,
					expires: new Date(Date.now() + SESSION_EXPIRES_IN)
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Something went wrong. Please try again later.' });
		}

		cookies.set('X-SESSION-ID', session.id, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			expires: session.expires
		});

		throw redirect(303, url.searchParams.get('from') ?? '/app');
	}
};
