import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$stores: './src/lib/stores',
			$utils: './src/lib/utils',
			$components: './src/lib/components',
			$ui: './src/lib/ui',
			$types: './src/lib/types'
		},
		/* csrf: {
			checkOrigin: false // Only to test service workers in dev
		}, */
		serviceWorker: {
			register: false
		}
	}
};

export default config;
