<script lang="ts">
	import { getUserContext } from '$stores/user.svelte';

	const userContext = getUserContext();
</script>

<svelte:head>
	<title>Home | Routinify</title>
</svelte:head>

<p>Hello {userContext.user.nickname} from Routinify.me !</p>
