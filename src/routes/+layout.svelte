<script lang="ts">
	import '../app.css';
	import { ToastContainer } from '$ui/feedback';

	let { children } = $props();
</script>

{@render children()}
<ToastContainer />
