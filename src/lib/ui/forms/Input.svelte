<script lang="ts">
	import { cn } from '$utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {}

	let {
		class: className = '',
		placeholder = '',
		type = 'text',
		value = $bindable(''),
		id = undefined,
		name = undefined,
		...restProps
	}: Props = $props();
</script>

<input
	id={id ?? name}
	{name}
	bind:value
	{placeholder}
	{type}
	class={cn('h-[50px] rounded-2xl border border-zinc-300 px-5 text-sm', className)}
	{...restProps}
/>
