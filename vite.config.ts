/// <reference types="vitest" />

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	plugins: [sveltekit(), mkcert()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom'
	},
	optimizeDeps: {
		exclude: ['@tabler/icons-svelte', 'devalue', 'clsx', 'tailwind-merge']
	},
	server: {
		host: '127.0.0.1'
	}
});
