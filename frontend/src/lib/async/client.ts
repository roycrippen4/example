import io from 'socket.io-client';
import type { Writable } from 'svelte/store';
const socket = io('http://localhost:3001');

socket.on('connect', () => {
	console.log('Connected to the backend!');
});

export function fileExists(path: string, store: Writable<boolean>): void {
	socket.emit('file_exists_request', path);
	socket.on('file_exists_response', (exists: boolean) => {
		store.set(exists);
		console.log(`File ${path} exists: ${exists}`);
	});
}
