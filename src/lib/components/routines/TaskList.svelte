<script lang="ts">
	import { enableDragDropTouch } from '$utils/polyfills/drag-drop-touch';
	import { flip } from 'svelte/animate';
	import { Button } from '$ui/forms';
	import IconEdit from '@tabler/icons-svelte/icons/edit';
	import IconGripVertical from '@tabler/icons-svelte/icons/grip-vertical';
	import { presets } from '$ui/forms/button';
	import type { RoutineTask } from '$types/Routine';
	import { cn } from '$utils/cn';
	import { onMount } from 'svelte';

	interface Props {
		openTask: (task: RoutineTask) => void;
		tasks: RoutineTask[];
	}

	let { openTask, tasks = $bindable() }: Props = $props();

	let draggingTask = $state<RoutineTask>();
	let animatingTasks = new Set();

	const swapWith = (task: RoutineTask) => {
		if (draggingTask === task || animatingTasks.has(task)) return;

		animatingTasks.add(task);
		setTimeout(() => animatingTasks.delete(task), 300);
		const taskAIndex = tasks.indexOf(draggingTask!);
		const taskBIndex = tasks.indexOf(task);
		tasks[taskAIndex] = task;
		tasks[taskBIndex] = draggingTask!;
	};

	onMount(() => {
		enableDragDropTouch();
	});
</script>

<ul class="flex flex-col gap-[10px]">
	{#each tasks as task (task.id)}
		<li
			animate:flip={{ duration: 300 }}
			ondragenter={() => swapWith(task)}
			ondragover={(event) => event.preventDefault()}
			class={cn('relative flex w-full gap-5 rounded-lg p-2', {
				'bg-teal-100': draggingTask !== undefined && draggingTask.id === task.id
			})}
		>
			<button
				draggable="true"
				ondragstart={() => (draggingTask = task)}
				ondragend={() => (draggingTask = undefined)}
				type="button"
			>
				<IconGripVertical />
			</button>
			<div class="relative flex w-full items-center justify-between">
				<div>
					<span>{task.name}</span>
					{#if task.duration}
						<span> for {task.duration} minutes </span>
					{/if}
				</div>
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
