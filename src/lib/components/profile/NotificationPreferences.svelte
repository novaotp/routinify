<script lang="ts">
	import {
		disableNotificationsOnDevice,
		enableNotificationsOnDevice,
		getNotificationsPermissionOnDevice,
		sendNotificationOnDevice
	} from '$stores/notification/index.svelte';
	import { toast } from '$stores/toast/index.svelte';
	import { Button, Label, Switch } from '$ui/forms';
	import IconArrowNarrowLeft from '@tabler/icons-svelte/icons/arrow-narrow-left';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	let isChecked = $derived(getNotificationsPermissionOnDevice() === 'granted');

	const onNotificationSwitch = async () => {
		if (isChecked) {
			disableNotificationsOnDevice();
			return toast.info('Notifications have been disabled.');
		}

		const newPermission = await enableNotificationsOnDevice();

		if (newPermission === 'granted') {
			toast.success('Notifications have been enabled.');
		} else {
			toast.error('Failed to enable notifications.');
		}
	};
</script>

<div class="relative flex h-full w-full flex-col gap-5 bg-teal-500">
	<div class="flex gap-5 px-5 pt-5">
		<button onclick={onClose} type="button">
			<IconArrowNarrowLeft />
		</button>
		<h1>Notification Preferences</h1>
	</div>
	<div
		class="relative flex w-full flex-grow flex-col items-start justify-start gap-5 rounded-t-3xl bg-white p-5"
	>
		<Label.Root class="w-full flex-row items-center justify-between">
			<Label.Control for="allow-notifications">Allow notifications on this device</Label.Control>
			<Switch checked={isChecked} onclick={onNotificationSwitch} />
		</Label.Root>
		<Button onclick={() => sendNotificationOnDevice('hello world')}>Test notification</Button>
	</div>
</div>
