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

		if ('serviceWorker' in navigator) {
			window.addEventListener('load', async () => {
				await navigator.serviceWorker.register('../service-worker.js', {
					type: dev ? 'module' : 'classic'
				});

				toast.success('Service worker registered');
			});
		}
	});
</script>

{@render children()}
<ToastContainer />
