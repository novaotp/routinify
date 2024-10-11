<script lang="ts">
	import { getUserContext } from '$stores/user.svelte';

	const userContext = getUserContext();

	const stringToColor = (str: string): string => {
		let hash = 0;

		for (let i = 0; i < str.length; i++) {
			hash += str.charCodeAt(i) * (i + 1);
		}

		// Extract RGB values (0 to 255)
		const r = hash % 256;
		const g = Math.floor(hash / 256) % 256;
		const b = Math.floor(hash / 65536) % 256;

		return `rgb(${r}, ${g}, ${b})`;
	};

	/**
	 * Determines the text color based on relative luminance.
	 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
	 */
	const getTextColor = (color: string): string => {
		// Extract the RGB values from the 'rgb(r, g, b)' format
		const [r8bit, g8bit, b8bit] = color.match(/\d+/g)?.map(Number) || [0, 0, 0];

		// Convert RGB to sRGB
		const RsRGB = r8bit / 255;
		const GsRGB = g8bit / 255;
		const BsRGB = b8bit / 255;

		/** Converts sRGB to linear RGB. */
		const linearize = (value: number): number => {
			return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
		};

		const R = linearize(RsRGB);
		const G = linearize(GsRGB);
		const B = linearize(BsRGB);

		const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

		return luminance > 0.179 ? 'black' : 'white';
	};
</script>

<div class="relative aspect-square h-[70px] overflow-hidden rounded-full">
	{#if !userContext.user.avatarPath}
		{@const bgColor = stringToColor(userContext.user.email)}
		{@const textColor = getTextColor(bgColor)}
		<div
			style="background-color: {bgColor}; color: {textColor}"
			class="relative flex h-full w-full items-center justify-center rounded-full text-xl font-semibold shadow-[inset_0_0_4px_4px_rgba(0,0,0,0.1)]"
		>
			{userContext.user.nickname.slice(0, 2).toUpperCase()}
		</div>
	{/if}
</div>
