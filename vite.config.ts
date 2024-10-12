/// <reference types="vitest" />

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	plugins: [sveltekit(), SvelteKitPWA(), mkcert()],
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
