<script lang="ts">
	import { Card, Button, Input } from 'flowbite-svelte';

	let email = '';

	function handlePasswordReset() {
		// Trigger password reset logic here, e.g., send a password reset link
		console.log("Password reset for email:", email);
	}
</script>

<Card class="mx-auto mt-10 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-5">
	<h4 class="text-lg font-bold text-center mb-4">Forgot Password</h4>
	<p class="text-center text-sm mb-4">Enter your email to receive a password reset link.</p>
	<form on:submit|preventDefault={handlePasswordReset}>
		<div class="mb-4">
			<Input
				bind:value={email}
				label="Email"
				type="email"
				placeholder="Enter your email"
				required
			/>
		</div>
		<Button class="w-full mt-4" type="submit">Send Reset Link</Button>
	</form>
</Card>
