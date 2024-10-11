<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$ui/forms';
</script>

<main class="relative flex h-full w-full flex-col items-start justify-center gap-10 p-5">
	<h1 class="text-3xl font-semibold text-teal-600">Routinify</h1>
	<p>
		Do you struggle following routines ? Or maybe you haven't had the courage to create one yet ? In
		any case, Routinify is here to help !
	</p>
	<Button onclick={() => goto('/login')}>Get Started</Button>
</main>
