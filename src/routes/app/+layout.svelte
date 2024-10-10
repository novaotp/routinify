<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { setUserContext } from '$stores/user.svelte';
	import { cn } from '$utils/cn/index.js';
	import IconHomeFilled from '@tabler/icons-svelte/icons/home-filled';
	import IconRoute from '@tabler/icons-svelte/icons/route';

	let { children, data } = $props();

	setUserContext(data.user);
</script>

<div class="relative h-[calc(100%-80px)] w-full">{@render children()}</div>
<nav
	class="relative flex h-20 w-full items-center justify-evenly px-5 shadow-[0_0_4px_4px_rgba(0,0,0,0.1)]"
>
	<button
		onclick={() => goto('/app')}
		class={cn('flex flex-col items-center gap-2', {
			'text-zinc-500': $page.url.pathname !== '/app'
		})}
	>
		<IconHomeFilled />
		<span class="text-xs">Home</span>
	</button>
	<button
		onclick={() => goto('/app/routines')}
		class={cn('flex flex-col items-center gap-2', {
			'text-zinc-500': $page.url.pathname !== '/app/routines'
		})}
	>
		<IconRoute />
		<span class="text-xs">Routines</span>
	</button>
</nav>
