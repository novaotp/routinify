<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$ui/forms';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
</script>

<svelte:head>
	<title>My Routines | Routinify</title>
</svelte:head>

<h1>My Routines</h1>
<Button
	onclick={() => goto('/app/routines/new')}
	class="fixed bottom-[100px] right-5 flex aspect-square h-[50px] items-center justify-center p-0"
>
	<IconPlus />
</Button>
