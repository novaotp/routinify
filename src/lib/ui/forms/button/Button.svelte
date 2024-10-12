<script lang="ts">
	import { cn } from '$utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className = '', type = 'button', ...restProps }: Props = $props();
</script>

<button
	{type}
	class={cn('rounded-2xl bg-teal-500 px-5 py-2 text-zinc-900 disabled:opacity-50', className)}
	{...restProps}
>
	{@render children?.()}
</button>
