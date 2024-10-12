<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Routine } from '$types/Routine';
	import { getActiveDays } from '$utils/functions/routines/get-active-days';
	import { isRoutineActive } from '$utils/functions/routines/is-routine-active';

	interface Props {
		routine: Routine;
	}

	let { routine }: Props = $props();

	let borderColor = $derived(isRoutineActive(routine) ? 'border-green-300' : 'border-red-300');
	let activeDays = $derived(getActiveDays(routine));
</script>

<button
	onclick={() => goto(`/app/routines/${routine.id}`)}
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
</button>
