<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { toast } from '$stores/toast/index.svelte';
	import { Button, Input, Label } from '$ui/forms';
	import type { SubmitFunction } from './$types';

	let email = $state('');
	let password = $state('');

	const registerEnhance: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'failure') {
				password = '';
				return toast.error(result.data?.message ?? '');
			} else if (result.type === 'error') {
				password = '';
				return toast.error(result.error.message);
			} else if (result.type === 'redirect') {
				toast.success('Registered successfully. Please login.');
				return goto(result.location);
			}
		};
	};
</script>

<svelte:head>
	<title>Register | Routinify</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col items-center justify-center gap-14 p-5">
	<h1 class="text-3xl">Register</h1>
	<form method="post" use:enhance={registerEnhance} class="relative flex w-full flex-col gap-5">
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
		<Button type="submit">Register Now</Button>
	</form>
	<span class="text-sm text-zinc-500">
		Already have an account ?
		<a href="/login" class="text-purple-700">Login</a>
	</span>
</main>
