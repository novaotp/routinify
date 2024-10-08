<script lang="ts">
	import { fly } from 'svelte/transition';
	import CloseIcon from '@tabler/icons-svelte/icons/x';
	import { cn } from '$utils/cn';
	import type { Snippet } from 'svelte';
	import type { Toast } from '$stores/toast.svelte';

	interface Props {
		type: Toast['type'];
		ondismiss: () => void;
		children: Snippet;
	}

	let { children, ondismiss, type }: Props = $props();

	let bgColor = $derived.by(() => {
		const colors = {
			success: 'rgb(22, 163, 74)',
			info: 'rgb(59, 130, 246)',
			error: 'rgb(239, 68, 68)'
		};

		return colors[type];
	});
	let title = $derived.by(() => {
		return type
			.toLowerCase()
			.split(' ')
			.map((word) => word.replace(word[0], word[0].toUpperCase()))
			.join(' ');
	});
</script>

<article
	role="alert"
	transition:fly={{ duration: 300, x: 200 }}
	class={cn(
		'relative flex w-full items-center gap-5 overflow-hidden rounded-lg bg-white px-4 py-3 shadow-[0_0_4px_4px_rgba(0,0,0,0.1)]',
		'after:absolute after:left-0 after:top-0 after:h-full after:w-2 after:content-[""]'
	)}
	style="--bg-color: {bgColor};"
>
	<div class="relative ml-3 flex w-full flex-col gap-[10px]">
		<span class="font-semibold">{title}</span>
		<p class="flex-grow text-sm text-zinc-400">
			{@render children()}
		</p>
	</div>
	<button class="border-none bg-transparent" onclick={ondismiss}>
		<CloseIcon class="size-6 text-zinc-400" />
	</button>
</article>

<style>
	article::after {
		background-color: var(--bg-color);
	}
</style>
