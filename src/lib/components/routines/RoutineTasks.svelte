<script lang="ts">
	import type { RoutineTask } from '$types/Routine';
	import { Button, Input, Label, TextArea } from '$ui/forms';
	import { Dialog, Overlay } from '$ui/portals';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
	import IconX from '@tabler/icons-svelte/icons/x';
	import IconTrash from '@tabler/icons-svelte/icons/trash';
	import IconEdit from '@tabler/icons-svelte/icons/edit';
	import { presets } from '$ui/forms/button';

	interface Props {
		tasks: RoutineTask[];
	}

	let { tasks = $bindable() }: Props = $props();

	let selectedTask = $state<RoutineTask | null>(null);

	const openTask = (task: RoutineTask) => {
		selectedTask = task;
	};

	const addDefaultTask = () => {
		const task = { id: crypto.randomUUID(), name: '', description: '', duration: 0 };
		tasks.push(task);

		// Cannot use task directly because it won't be reactive.
		openTask(tasks.find((t) => t.id === task.id)!);
	};

	const removeTask = (task: RoutineTask) => {
		tasks = tasks.filter((t) => t.id !== task.id);
		selectedTask = null;
	};
</script>

<Label.Root>
	<div class="flex items-center justify-between">
		<Label.Control for="tasks">Tasks</Label.Control>
		<Button onclick={addDefaultTask} class={presets.square}>
			<IconPlus />
		</Button>
	</div>
	<ul class="flex flex-col gap-[10px]">
		{#each tasks as task, i}
			<li class="relative w-full pl-5">
				<div class="relative flex w-full items-center justify-between">
					<span>{i + 1}. {task.name} for {task.duration} minutes</span>
					<Button
						onclick={() => openTask(task)}
						type="button"
						class="{presets.secondary} {presets.square} h-8 rounded-xl"
					>
						<IconEdit class="size-5" />
					</Button>
				</div>
			</li>
		{:else}
			<li class="text-sm text-zinc-500">You don't have any tasks yet.</li>
		{/each}
	</ul>
</Label.Root>

{#if selectedTask}
	<Overlay onBackgroundClick={() => (selectedTask = null)}>
		<Dialog>
			<header class="relative flex w-full items-center justify-between">
				<button onclick={() => (selectedTask = null)} type="button">
					<IconX />
				</button>
				<button
					onclick={() => removeTask(selectedTask!)}
					type="button"
					class="relative aspect-square h-10 rounded-2xl bg-red-500 text-white flex-center"
				>
					<IconTrash />
				</button>
			</header>
			<div class="flex flex-col gap-5">
				<Label.Root>
					<Label.Control for="name">Name</Label.Control>
					<Input
						bind:value={selectedTask.name}
						name="name"
						type="text"
						placeholder="Enter your task's name..."
					/>
				</Label.Root>
				<Label.Root>
					<Label.Control for="description">Description</Label.Control>
					<TextArea
						bind:value={selectedTask.description}
						name="description"
						placeholder="Enter your task's description..."
					/>
				</Label.Root>
				<Label.Root>
					<Label.Control for="duration">Duration (in minutes)</Label.Control>
					<Input
						bind:value={selectedTask.duration}
						name="duration"
						type="number"
						placeholder="Enter your task's duration..."
					/>
				</Label.Root>
			</div>
		</Dialog>
	</Overlay>
{/if}
