<script lang="ts">
	import { cn } from '$utils/cn';
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		checked?: boolean;
		onclick?: MouseEventHandler<HTMLButtonElement>;
	}

	let { checked = false, onclick }: Props = $props();
</script>

<button
	role="switch"
	onclick={(event) => onclick?.(event)}
	aria-label="Enable/disable notifications switch"
	aria-checked={checked}
	class={cn(
		'relative flex h-7 w-14 items-center rounded-full bg-zinc-300 p-[3px] transition-colors duration-300',
		checked ? 'bg-green-500' : 'bg-zinc-300'
	)}
>
	<div
		class={cn(
			'absolute top-[2px] aspect-square h-[calc(100%-4px)] rounded-full bg-black transition-all duration-300',
			checked ? 'left-[calc(100%-27px)]' : 'left-[3px]'
		)}
	></div>
</button>
