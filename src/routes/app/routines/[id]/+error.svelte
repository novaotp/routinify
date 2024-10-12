<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$ui/forms';
</script>

<main class="relative flex h-full w-full flex-col items-start justify-center gap-10 p-5">
	<h1 class="text-3xl">Not found</h1>
	<p>{$page.error?.message}</p>
	<Button onclick={() => goto('/app/routines')}>Go back to my routines</Button>
</main>
