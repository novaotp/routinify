<script lang="ts">
	import { cn } from '$utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className = '', ...restProps }: Props = $props();
</script>

<div class={cn('flex flex-col gap-[10px]', className)} {...restProps}>
	{@render children?.()}
</div>
