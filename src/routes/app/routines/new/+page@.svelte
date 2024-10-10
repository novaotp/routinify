<script lang="ts">
	import { goto } from '$app/navigation';
	import { Input, Label } from '$ui/forms';
	import IconX from '@tabler/icons-svelte/icons/x';
	import RoutineTasks from '$components/routines/RoutineTasks.svelte';
	import type { RoutineTask } from '$types/RoutineTask';

	const tasks = $state<RoutineTask[]>([]);
</script>

<svelte:head>
	<title>New Routine | Routinify</title>
</svelte:head>

<header class="relative flex w-full items-center justify-start p-5">
	<button onclick={() => goto('/app/routines')}>
		<IconX />
	</button>
</header>
<main class="relative flex w-full flex-grow flex-col px-5">
	<form method="post" class="flex flex-col gap-5">
		<Label.Root>
			<Label.Control for="name">Name *</Label.Control>
			<Input name="name" type="text" placeholder="Enter your routine's name..." />
		</Label.Root>
		<RoutineTasks {tasks} />
	</form>
</main>
