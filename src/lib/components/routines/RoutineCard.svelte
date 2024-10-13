<script lang="ts">
	import { goto } from '$app/navigation';
	import IconEdit from '@tabler/icons-svelte/icons/edit';
	import IconPlayerPlayFilled from '@tabler/icons-svelte/icons/player-play-filled';
	import { Button } from '$ui/forms';
	import { presets } from '$ui/forms/button';
	import { getActiveDays, isRoutineActive } from './utils';
	import type { Routine } from '$types/Routine';

	interface Props {
		routine: Routine;
	}

	let { routine }: Props = $props();

	let borderColor = $derived(isRoutineActive(routine) ? 'border-green-300' : 'border-red-300');
	let activeDays = $derived(getActiveDays(routine));
</script>

<div
	class="relative flex w-full flex-col items-start gap-[10px] rounded-2xl border-2 p-5 {borderColor}"
>
	{#if routine.trigger}
		<span class="text-sm text-zinc-500">At <time datetime="HH:mm:ss">{routine.trigger}</time></span>
	{/if}
	<span>{routine.name}</span>
	{#if activeDays.length > 0}
		<span>
			Every {activeDays.join(', ')}
		</span>
	{/if}
	<div class="flex w-full justify-end gap-5">
		<Button
			onclick={() => goto(`/app/routines/${routine.id}`)}
			class="{presets.secondary} {presets.square}"
		>
			<IconEdit class="size-5" />
		</Button>
		<Button class={presets.square}>
			<IconPlayerPlayFilled class="size-5" />
		</Button>
	</div>
</div>
