<script lang="ts">
	import IconArrowNarrowLeft from '@tabler/icons-svelte/icons/arrow-narrow-left';
	import Avatar from './Avatar.svelte';
	import { Button, Input, Label } from '$ui/forms';
	import { getUserContext } from '$stores/user.svelte';
	import { presets } from '$ui/forms/button';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '../../../routes/app/profile/$types';
	import { toast } from '$stores/toast/index.svelte';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	const userContext = getUserContext();

	let nickname = $state(userContext.user.nickname);

	const customEnhance: SubmitFunction = ({ cancel }) => {
		if (nickname === userContext.user.nickname) {
			cancel();
		}

		// Optimistic update
		const previousNickname = userContext.user.nickname;
		userContext.user.nickname = nickname;

		return async ({ result }) => {
			if (result.type === 'failure') {
				// Revert optimistic update
				userContext.user.nickname = previousNickname;

				return toast.error(result.data?.message ?? '');
			} else if (result.type === 'success') {
				toast.success('Personal information updated successfully.');
			}
		};
	};

	const discardChanges = () => {
		nickname = userContext.user.nickname;
	};
</script>

<div class="relative flex h-full w-full flex-col gap-5 bg-teal-500">
	<div class="flex gap-5 px-5 pt-5">
		<button onclick={onClose} type="button">
			<IconArrowNarrowLeft />
		</button>
		<h1>Personal Information</h1>
	</div>
	<div class="relative flex w-full items-center justify-center">
		<button
			onclick={() => toast.info('Feature not implemented yet.')}
			class="flex flex-col items-center gap-[10px]"
		>
			<Avatar />
			<span>Edit avatar</span>
		</button>
	</div>
	<form
		method="post"
		action="?/editPersonalInformation"
		use:enhance={customEnhance}
		class="relative flex w-full flex-grow flex-col items-start justify-between gap-5 rounded-t-3xl bg-white p-5"
	>
		<Label.Root class="w-full">
			<Label.Control for="nickname">Nickname</Label.Control>
			<Input
				bind:value={nickname}
				name="nickname"
				type="text"
				placeholder="Enter your nickname..."
			/>
		</Label.Root>
		<div class="flex w-full flex-col gap-5">
			<Button type="submit" disabled={nickname === userContext.user.nickname}>Save changes</Button>
			<Button
				onclick={discardChanges}
				class={presets.secondary}
				disabled={nickname === userContext.user.nickname}
			>
				Discard changes
			</Button>
		</div>
	</form>
</div>
