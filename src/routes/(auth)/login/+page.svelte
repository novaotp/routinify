<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { toast } from '$stores/toast/index.svelte';
	import { Banner } from '$ui/feedback';
	import { Button, Input, Label } from '$ui/forms';
	import type { SubmitFunction } from './$types';

	let email = $state('');
	let password = $state('');

	const loginEnhance: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'failure') {
				password = '';
				return toast.error(result.data?.message ?? '');
			} else if (result.type === 'error') {
				password = '';
				return toast.error(result.error.message);
			} else if (result.type === 'redirect') {
				toast.success('Logged in successfully.');
				return goto(result.location);
			}
		};
	};
</script>

<svelte:head>
	<title>Login | Routinify</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col items-center justify-center gap-14 p-5">
	{#if $page.url.searchParams.has('message')}
		<Banner type="error">
			{$page.url.searchParams.get('message')}
		</Banner>
	{/if}
	<h1 class="text-3xl">Login</h1>
	<form method="post" use:enhance={loginEnhance} class="relative flex w-full flex-col gap-5">
		<Label.Root>
			<Label.Control for="email">Email</Label.Control>
			<Input bind:value={email} name="email" type="email" placeholder="Enter your email here..." />
		</Label.Root>
		<Label.Root>
			<Label.Control for="password">Password</Label.Control>
			<Input
				bind:value={password}
				name="password"
				type="password"
				placeholder="Enter your password here..."
			/>
		</Label.Root>
		<Button type="submit">Log In</Button>
	</form>
	<span class="text-sm text-zinc-500">
		Don't have an account ?
		<a href="/register" class="text-purple-700">Register</a>
	</span>
</main>
