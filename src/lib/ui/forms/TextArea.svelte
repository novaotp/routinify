<script lang="ts">
	import { cn } from '$utils/cn';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends HTMLTextareaAttributes {
		class?: string;
		placeholder?: string;
		value?: string;
	}

	let {
		class: className = '',
		placeholder = '',
		value = $bindable(''),
		...restProps
	}: Props = $props();
</script>

<textarea
	bind:value
	{placeholder}
	class={cn('h-[200px] resize-none rounded-2xl border border-zinc-300 p-5 text-sm', className)}
	{...restProps}
></textarea>
