<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cn } from '$utils/cn';
	import { self } from '$utils/modifiers/self';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
		/** Runs when the overlay's background is clicked, but not the children inside it. */
		onBackgroundClick?: () => void;
	}

	let { children, class: className = '', onBackgroundClick = () => {} }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={self(onBackgroundClick)}
	transition:fade
	class={cn('fixed inset-0 z-50 bg-black/20 flex-center', className)}
>
	{@render children?.()}
</div>
