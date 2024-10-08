<script lang="ts">
	import { cn } from '$utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface Props extends HTMLLabelAttributes {
		children?: Snippet;
		class?: string;
		for?: string;
	}

	let { children, class: className = '', for: htmlFor, ...restProps }: Props = $props();
</script>

<label for={htmlFor} class={cn('flex flex-col gap-1', className)} {...restProps}>
	{@render children?.()}
</label>
