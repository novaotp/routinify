<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import IconChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
	import IconTrash from '@tabler/icons-svelte/icons/trash';
	import RoutineTasks from '$components/routines/RoutineTasks.svelte';
	import { Button, Input, Label } from '$ui/forms';
	import { presets } from '$ui/forms/button';
	import { cn } from '$utils/cn';
	import { Banner } from '$ui/feedback';
	import { toast } from '$stores/toast/index.svelte';
	import type { SubmitFunction } from './$types';
	import type { RoutineDay, RoutineTask } from '$types/Routine';

	let { data } = $props();

	let name = $state(data.routine.name);
	let trigger = $state(data.routine.trigger);
	let days = $state<Record<RoutineDay, boolean>>(data.routine.days);
	const tasks = $state<RoutineTask[]>(data.routine.tasks);

	let hasChanged = $derived.by(() => {
		return (
			name !== data.routine.name ||
			trigger !== data.routine.trigger ||
			JSON.stringify(days) !== JSON.stringify(data.routine.days) ||
			JSON.stringify(tasks) !== JSON.stringify(data.routine.tasks)
		);
	});

	const editEnhance: SubmitFunction = ({ cancel, formData }) => {
		if (!name) {
			toast.error('Please enter a name for the routine.');
			return cancel();
		}

		formData.append('days', JSON.stringify(days));
		formData.append('tasks', JSON.stringify(tasks));

		return async ({ result }) => {
			if (result.type === 'failure') {
				return toast.error(result.data?.message ?? '');
			} else if (result.type === 'success') {
				toast.success(result.data?.message ?? '');
			}
		};
	};

	const deleteEnhance: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'failure') {
				return toast.error(result.data?.message ?? '');
			} else if (result.type === 'success') {
				toast.success(result.data?.message ?? '');
				return goto('/app/routines');
			}
		};
	};
</script>

<svelte:head>
	<title>{data.routine.name} - Routine | Routinify</title>
</svelte:head>

<header class="relative flex w-full items-center justify-between p-5">
	<button onclick={() => history.back()}>
		<IconChevronLeft />
	</button>
	<div class="flex gap-5">
		<form method="post" action="?/destroy" use:enhance={deleteEnhance} class="relative">
			<Button type="submit" class="{presets.destroy} {presets.square}">
				<IconTrash />
			</Button>
		</form>
		<Button form="new-routine" type="submit" disabled={!hasChanged}>Save</Button>
	</div>
</header>
<main class="relative flex w-full flex-grow flex-col gap-5 px-5">
	{#if trigger === '' || Object.values(days).every((d) => d === false)}
		<Banner type="warning">
			{#if trigger === ''}
				An empty trigger means that the routine will never run automatically.
			{:else if Object.values(days).every((d) => d === false)}
				No days selected means that the routine will never run automatically.
			{/if}
		</Banner>
	{/if}
	<form
		method="post"
		action="?/edit"
		use:enhance={editEnhance}
		id="new-routine"
		class="flex flex-col gap-5"
	>
		<Label.Root>
			<Label.Control for="name">Name *</Label.Control>
			<Input
				bind:value={name}
				name="name"
				type="text"
				placeholder="Enter your routine's name..."
				required
			/>
		</Label.Root>
		<RoutineTasks {tasks} />
		<Label.Root>
			<Label.Control for="trigger">Trigger</Label.Control>
			<Input
				bind:value={trigger}
				name="trigger"
				type="time"
				placeholder="Enter your routine's trigger time..."
			/>
		</Label.Root>
		<Label.Root>
			<Label.Control for="days">Days</Label.Control>
			<div class="relative flex w-full justify-evenly gap-[10px]">
				{#each Object.entries(days) as [day, isActive]}
					<button
						type="button"
						onclick={() => (days[day as keyof typeof days] = !isActive)}
						class={cn('aspect-square h-10 rounded-full', {
							'text-zinc-500': !isActive,
							'bg-teal-500': isActive
						})}
					>
						{day[0].toUpperCase() + day[1].toLowerCase()}
					</button>
				{/each}
			</div>
		</Label.Root>
	</form>
</main>
