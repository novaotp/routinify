import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/services/db';
import type { Actions } from './$types';
import { hash } from 'bcrypt';

const HASH_SALT_ROUNDS = 15;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		if (!email || !password) {
			return fail(422, { message: 'Please enter an email and a password.' });
		}

		if (password.length < 8) {
			return fail(422, { message: 'Password must be at least 8 characters long.' });
		}

		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			return fail(422, { message: 'Email address already in use.' });
		}

		try {
			await prisma.user.create({
				data: {
					nickname: randomNickname(),
					email,
					password: await hash(password, HASH_SALT_ROUNDS)
				}
			});
		} catch (err) {
			console.error(err);
			return error(500, { message: 'Something went wrong.' });
		}

		throw redirect(303, '/login');
	}
};

const randomNickname = () => {
	return Array(8)
		.fill(null)
		.map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
		.join('');
};
