/**
 * Predefined button presets for general use cases.
 *
 * You can combine them to create custom presets.
 */
export const presets = {
	/** A preset for secondary actions. */
	secondary: 'border border-teal-500 bg-teal-200 disabled:bg-teal-200 disabled:border-teal-500/50',
	/** A preset for dangerous actions. */
	destroy: 'bg-red-500 bg-white',
	/**
	 * Transforms the button to a square-shape and centers its content.
	 * @description Edit the height.
	 * @defaults 40px
	 */
	square: 'h-10 aspect-square p-0 flex-center'
} as const;
