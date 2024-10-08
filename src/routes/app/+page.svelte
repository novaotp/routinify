<script lang="ts">
	import { getUserContext } from '$stores/user.svelte';

	const userContext = getUserContext();
</script>

<p>Hello {userContext.user.nickname} from Routinify.me !</p>
