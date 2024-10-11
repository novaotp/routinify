<script lang="ts">
	import type { Snippet } from 'svelte';
	import IconCircleCheckFilled from '@tabler/icons-svelte/icons/circle-check-filled';
	import IconAlertTriangleFilled from '@tabler/icons-svelte/icons/alert-triangle-filled';
	import IconInfoSquareFilled from '@tabler/icons-svelte/icons/info-square-filled';
	import IconExclamationCircleFilled from '@tabler/icons-svelte/icons/exclamation-circle-filled';
	import { cn } from '$utils/cn';

	interface Props {
		children?: Snippet;
		class?: string;
		/** The type of the banner to display. Defaults to `info`. */
		type?: 'success' | 'warning' | 'info' | 'error';
	}

	let { children, class: className = '', type = 'info' }: Props = $props();

	let [bgColor, Icon, iconColor] = $derived.by(() => {
		switch (type) {
			case 'success':
				return ['bg-green-50', IconCircleCheckFilled, 'text-green-500'];
			case 'warning':
				return ['bg-yellow-50', IconAlertTriangleFilled, 'text-yellow-500'];
			case 'info':
				return ['bg-blue-50', IconInfoSquareFilled, 'text-blue-500'];
			case 'error':
				return ['bg-red-100', IconExclamationCircleFilled, 'text-red-500'];
		}
	});
</script>

<div
	role="alert"
	class={cn('relative flex w-full items-center gap-5 rounded-2xl p-5', bgColor, className)}
>
	<Icon class="min-h-6 min-w-6 {iconColor}" />
	<span class="text-zinc-800">{@render children?.()}</span>
</div>
