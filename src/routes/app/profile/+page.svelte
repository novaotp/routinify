<script lang="ts">
	import { getUserContext } from '$stores/user.svelte';
	import IconUser from '@tabler/icons-svelte/icons/user';
	import IconShieldLock from '@tabler/icons-svelte/icons/shield-lock';
	import IconBell from '@tabler/icons-svelte/icons/bell';
	import IconBubbleText from '@tabler/icons-svelte/icons/bubble-text';
	import IconHelp from '@tabler/icons-svelte/icons/help';
	import IconChevronRight from '@tabler/icons-svelte/icons/chevron-right';
	import { toast } from '$stores/toast/index.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Sheet } from '$ui/portals';
	import { Avatar, PersonalInformation } from '$components/profile';
	import NotificationPreferences from '$components/profile/NotificationPreferences.svelte';

	const userContext = getUserContext();

	let currentSubpage = $derived<string | null>($page.url.searchParams.get('subpage'));

	const openProfileSubpage = (subpage: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);

		searchParams.set('subpage', subpage);
		goto(`${$page.url.pathname}?${searchParams.toString()}`);
	};

	const closeProfileSubpage = () => {
		const searchParams = new URLSearchParams($page.url.searchParams);

		searchParams.delete('subpage');
		goto(`${$page.url.pathname}?${searchParams.toString()}`);
	};
</script>

<svelte:head>
	<title>Profile | Routinify</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col items-start justify-start bg-teal-500">
	<div class="relative flex w-full items-center justify-start gap-5 p-5">
		<Avatar />
		<div class="flex flex-col">
			<h1 class="text-zinc-900">{userContext.user.nickname}</h1>
			<span class="text-sm text-zinc-700">{userContext.user.email}</span>
		</div>
	</div>
	<div class="relative flex h-full w-full flex-col gap-10 rounded-t-3xl bg-white px-5 py-8">
		<div class="relative flex w-full flex-col gap-5">
			<h2 class="text-sm text-zinc-500">Account Settings</h2>
			<button
				onclick={() => openProfileSubpage('personal-information')}
				class="relative flex justify-between"
			>
				<div class="flex gap-5">
					<IconUser class="text-zinc-800" />
					<span class="text-zinc-800">Personal Information</span>
				</div>
				<IconChevronRight class="text-zinc-400" />
			</button>
			<button
				onclick={() => toast.info("This page doesn't exist yet.")}
				class="relative flex justify-between"
			>
				<div class="flex gap-5">
					<IconShieldLock class="text-zinc-800" />
					<span class="text-zinc-800">Password & Security</span>
				</div>
				<IconChevronRight class="text-zinc-400" />
			</button>
			<button
				onclick={() => openProfileSubpage('notification-preferences')}
				class="relative flex justify-between"
			>
				<div class="flex gap-5">
					<IconBell class="text-zinc-800" />
					<span class="text-zinc-800">Notification Preferences</span>
				</div>
				<IconChevronRight class="text-zinc-400" />
			</button>
		</div>
		<div class="relative flex w-full flex-col gap-5">
			<h2 class="text-sm text-zinc-500">Other</h2>
			<button
				onclick={() => toast.info("This page doesn't exist yet.")}
				class="relative flex justify-between"
			>
				<div class="flex gap-5">
					<IconBubbleText class="text-zinc-800" />
					<span class="text-zinc-800">FAQ</span>
				</div>
				<IconChevronRight class="text-zinc-400" />
			</button>
			<button
				onclick={() => toast.info("This page doesn't exist yet.")}
				class="relative flex justify-between"
			>
				<div class="flex gap-5">
					<IconHelp class="text-zinc-800" />
					<span class="text-zinc-800">Help</span>
				</div>
				<IconChevronRight class="text-zinc-400" />
			</button>
		</div>
	</div>
</main>

{#if currentSubpage !== null}
	<Sheet>
		{#if currentSubpage === 'personal-information'}
			<PersonalInformation onClose={closeProfileSubpage} />
		{:else if currentSubpage === 'notification-preferences'}
			<NotificationPreferences onClose={closeProfileSubpage} />
		{/if}
	</Sheet>
{/if}
