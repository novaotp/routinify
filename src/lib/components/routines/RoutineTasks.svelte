<script lang="ts">
	import type { RoutineTask } from '$types/RoutineTask';
	import { Button, Input, Label, TextArea } from '$ui/forms';
	import { Modal, Overlay } from '$ui/portals';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
	import IconX from '@tabler/icons-svelte/icons/x';
	import IconTrash from '@tabler/icons-svelte/icons/trash';

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

		openTask(task);
	};

	const removeTask = (task: RoutineTask) => {
		tasks = tasks.filter((t) => t.id !== task.id);
		selectedTask = null;
	};
</script>

<Label.Root>
	<div class="flex items-center justify-between">
		<Label.Control for="tasks">Tasks</Label.Control>
		<Button onclick={addDefaultTask} class="aspect-square h-10 p-0 flex-center">
			<IconPlus />
		</Button>
	</div>
	<ul class="flex flex-col gap-5">
		{#each tasks as task}
			<li class="relative w-full shadow-md">
				<button onclick={() => openTask(task)} type="button" class="relative w-full p-5">
					{task.name}
				</button>
			</li>
		{:else}
			<li>You don't have any tasks yet.</li>
		{/each}
	</ul>
</Label.Root>

{#if selectedTask}
	<Overlay onBackgroundClick={() => (selectedTask = null)}>
		<Modal>
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
						placeholder="Enter your routine's name..."
					/>
				</Label.Root>
				<Label.Root>
					<Label.Control for="description">Description</Label.Control>
					<TextArea
						bind:value={selectedTask.description}
						name="description"
						placeholder="Enter your routine's description..."
					/>
				</Label.Root>
				<Label.Root>
					<Label.Control for="duration">Duration</Label.Control>
					<Input
						bind:value={selectedTask.duration}
						name="duration"
						type="number"
						placeholder="Enter your routine's duration..."
					/>
				</Label.Root>
			</div>
		</Modal>
	</Overlay>
{/if}
