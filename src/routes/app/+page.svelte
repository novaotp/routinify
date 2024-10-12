<script lang="ts">
	import RoutineCard from '$components/routines/RoutineCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Home | Routinify</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col items-start justify-start gap-10 p-5">
	<h1>My Active Routines</h1>
	{#await data.activeRoutines}
		<p>Loading active routines...</p>
	{:then activeRoutines}
		<ul class="relative flex w-full flex-col gap-5">
			{#each activeRoutines as routine (routine.id)}
				<li class="relative w-full">
					<RoutineCard {routine} />
				</li>
			{:else}
				<p>You don't have any active routines yet.</p>
				<br />
				<p>
					Make sure to add a trigger time and at least one active day for your routine to be active.
				</p>
			{/each}
		</ul>
	{:catch error}
		<p>An error occurred : {error.message}.</p>
	{/await}
</main>
