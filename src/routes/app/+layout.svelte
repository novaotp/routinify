<script lang="ts">
	import { setUserContext } from '$stores/user.svelte';

	let { children, data } = $props();

	setUserContext(data.user);
</script>

{@render children()}
