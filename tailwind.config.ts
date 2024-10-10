import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.flex-center': {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}
			});
		})
	]
} satisfies Config;
