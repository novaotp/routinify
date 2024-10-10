<script lang="ts">
	import { cn } from '$utils/cn';
	import { flyAndScale } from '$utils/transitions/fly-and-scale';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className = undefined }: Props = $props();
</script>

<div
	transition:flyAndScale
	class={cn(
		'relative flex w-full max-w-lg flex-col gap-5 bg-white p-5 shadow-2xl sm:rounded-2xl',
		className
	)}
>
	{@render children?.()}
</div>
