<script lang="ts">
	import { getUserContext } from '$stores/user.svelte';
	import IconUser from '@tabler/icons-svelte/icons/user';
	import IconShieldLock from '@tabler/icons-svelte/icons/shield-lock';
	import IconBell from '@tabler/icons-svelte/icons/bell';
	import IconBubbleText from '@tabler/icons-svelte/icons/bubble-text';
	import IconHelp from '@tabler/icons-svelte/icons/help';
	import IconChevronRight from '@tabler/icons-svelte/icons/chevron-right';
	import { toast } from '$stores/toast/index.svelte';

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

<svelte:head>
	<title>Profile | Routinify</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col items-start justify-start bg-teal-500">
	<div class="relative flex w-full items-center justify-start gap-5 p-5">
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
		<div class="flex flex-col">
			<h1 class="text-zinc-900">{userContext.user.nickname}</h1>
			<span class="text-sm text-zinc-700">{userContext.user.email}</span>
		</div>
	</div>
	<div class="relative flex h-full w-full flex-col gap-10 rounded-t-3xl bg-white p-5">
		<div class="relative flex w-full flex-col gap-5">
			<h2 class="text-sm text-zinc-500">Account Settings</h2>
			<button
				onclick={() => toast.info("This page doesn't exist yet.")}
				class="relative flex justify-between"
			>
				<div class="flex gap-5">
					<IconUser class="text-zinc-800" />
					<span class="text-zinc-800">Personal Information</span>
				</div>
				<IconChevronRight class="text-zinc-400" />
			</button>
			<button
				onclick={() => toast.info("This page doesn't exist yet.")}
				class="relative flex justify-between"
			>
				<div class="flex gap-5">
					<IconShieldLock class="text-zinc-800" />
					<span class="text-zinc-800">Password & Security</span>
				</div>
				<IconChevronRight class="text-zinc-400" />
			</button>
			<button
				onclick={() => toast.info("This page doesn't exist yet.")}
				class="relative flex justify-between"
			>
				<div class="flex gap-5">
					<IconBell class="text-zinc-800" />
					<span class="text-zinc-800">Notification Preferences</span>
				</div>
				<IconChevronRight class="text-zinc-400" />
			</button>
		</div>
		<div class="relative flex w-full flex-col gap-5">
			<h2 class="text-sm text-zinc-500">Other</h2>
			<button
				onclick={() => toast.info("This page doesn't exist yet.")}
				class="relative flex justify-between"
			>
				<div class="flex gap-5">
					<IconBubbleText class="text-zinc-800" />
					<span class="text-zinc-800">FAQ</span>
				</div>
				<IconChevronRight class="text-zinc-400" />
			</button>
			<button
				onclick={() => toast.info("This page doesn't exist yet.")}
				class="relative flex justify-between"
			>
				<div class="flex gap-5">
					<IconHelp class="text-zinc-800" />
					<span class="text-zinc-800">Help</span>
				</div>
				<IconChevronRight class="text-zinc-400" />
			</button>
		</div>
	</div>
</main>
