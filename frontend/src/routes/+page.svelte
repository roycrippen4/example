<script lang="ts">
	import { fileExists } from '$lib';
	import { writable } from 'svelte/store';

	const exists = writable(false);

	function onSubmit() {
		const input = document.querySelector('input');
		if (input && input.value) {
			fileExists(input.value, exists);
		}
	}
</script>

<h1>Welcome to SvelteKit</h1>
<input placeholder="absolute path to a file" />
<button on:click={onSubmit}>Submit</button>
<h1>{$exists}</h1>
