<script lang="ts">
	import type { User } from "$lib/models/user.models.js";
	import { Card, Button, Input } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	let loginInfo: any = {
		email: '',
		password: '',

	};

	function handleLogin() {
		// Your login logic here, e.g., calling an API to authenticate the user
		console.log("Logging in user:", loginInfo);
	}

	function handleForgotPassword() {
		// Redirect to Forgot Password page or trigger a password reset action
		goto('../reset_password');
	}
</script>

<Card class="mx-auto mt-10 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-5">
	<h4 class="text-lg font-bold text-center mb-4">Login</h4>
	<form on:submit|preventDefault={handleLogin}>
		<div class="mb-4">
			<Input
				bind:value={loginInfo.email}
				label="Email"
				type="email"
				placeholder="Enter your email"
				required
			/>
		</div>
		<div class="mb-4">
			<Input
				bind:value={loginInfo.password}
				label="Password"
				type="password"
				placeholder="Enter your password"
				required
			/>
		</div>
		<div class="flex justify-between items-center mt-4">
			<Button class="w-full" type="submit">Login</Button>
		</div>
	</form>
	<p class="text-center text-sm mt-4">
		<button class="text-blue-500 hover:underline" on:click={handleForgotPassword}>Forgot your password?</button>
	</p>
</Card>
