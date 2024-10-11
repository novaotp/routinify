<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cn } from '$utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<article
	transition:fly={{ x: -200 }}
	class={cn('fixed left-0 top-0 z-10 h-full w-full bg-white', className)}
>
	{@render children?.()}
</article>
