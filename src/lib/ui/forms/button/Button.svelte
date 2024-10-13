<script lang="ts">
	import { cn } from '$utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		children?: Snippet;
	}

	let {
		children,
		class: className = '',
		type = 'button',
		disabled = false,
		...restProps
	}: Props = $props();
</script>

<button
	{type}
	{disabled}
	aria-disabled={disabled}
	class={cn(
		'rounded-2xl bg-teal-500 px-5 py-2 text-zinc-900',
		'disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</button>
