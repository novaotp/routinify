/// <reference types="vitest" />

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
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
