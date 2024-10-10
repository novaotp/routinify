<script lang="ts">
	import Toast from './Toast.svelte';
	import { toast } from '$stores/toast/index.svelte';
</script>

<section
	class="fixed bottom-5 right-5 z-[1000] flex w-[calc(100%-40px)] flex-col justify-center gap-2 md:max-w-[300px]"
>
	{#each toast.toasts as { id, message, type } (id)}
		<Toast {type} ondismiss={() => toast.dismiss(id)}>
			{message}
		</Toast>
	{/each}
</section>
