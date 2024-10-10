<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { setUserContext } from '$stores/user.svelte';
	import { cn } from '$utils/cn/index.js';
	import IconHomeFilled from '@tabler/icons-svelte/icons/home-filled';
	import IconRoute from '@tabler/icons-svelte/icons/route';
	import IconUserFilled from '@tabler/icons-svelte/icons/user-filled';

	let { children, data } = $props();

	setUserContext(data.user);

	const links = [
		{ name: 'Home', href: '/app', Icon: IconHomeFilled },
		{ name: 'Routines', href: '/app/routines', Icon: IconRoute },
		{ name: 'Profile', href: '/app/profile', Icon: IconUserFilled }
	];
</script>

<div class="relative h-[calc(100%-80px)] w-full">{@render children()}</div>
<nav class="relative flex h-20 w-full items-center justify-evenly border-t-2 border-zinc-300">
	{#each links as { name, href, Icon } (name)}
		<button
			onclick={() => goto(href)}
			class={cn('flex flex-col items-center gap-2', {
				'text-zinc-500': $page.url.pathname !== href
			})}
		>
			<Icon />
			<span class="text-xs">{name}</span>
		</button>
	{/each}
</nav>
