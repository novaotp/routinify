<script lang="ts">
	import '../app.css';
	import { ToastContainer } from '$ui/feedback';
	import { onMount } from 'svelte';
	import { initNotificationsOnDevice } from '$stores/notification/index.svelte';
	import { dev } from '$app/environment';
	import { toast } from '$stores/toast/index.svelte';

	let { children } = $props();

	onMount(() => {
		initNotificationsOnDevice();
	});
</script>

{@render children()}
<ToastContainer />
