<script lang="ts">
	import { goto } from '$app/navigation';
	import RoutineCard from '$components/routines/RoutineCard.svelte';
	import { Button } from '$ui/forms';
	import IconPlus from '@tabler/icons-svelte/icons/plus';

	let { data } = $props();
</script>

<svelte:head>
	<title>My Routines | Routinify</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col items-start justify-start gap-10 p-5">
	<h1>My Routines</h1>
	{#await data.routines}
		<p>Loading routines...</p>
	{:then routines}
		<ul class="relative flex w-full flex-col gap-[10px]">
			{#each routines as routine (routine.id)}
				<li class="relative w-full">
					<RoutineCard {routine} />
				</li>
			{:else}
				<p>You don't have any routines yet.</p>
			{/each}
		</ul>
	{:catch error}
		<p>An error occurred : {error.message}.</p>
	{/await}
</main>
<Button
	onclick={() => goto('/app/routines/new')}
	class="fixed bottom-[100px] right-5 flex aspect-square h-[50px] items-center justify-center p-0"
>
	<IconPlus />
</Button>
