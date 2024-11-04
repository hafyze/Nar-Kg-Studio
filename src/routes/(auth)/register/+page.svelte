<script lang="ts">
	import { Card, Button, Input } from 'flowbite-svelte';

	let loginInfo: any = {
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		username: ''
	};

	function handleRegister() {
		// Your registration logic here, e.g., calling an API to register the user
		console.log("Registering user:", loginInfo);
	}
</script>

<Card class="mx-auto mt-10 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-5">
	<h4 class="text-lg font-bold text-center mb-4">Register</h4>
	<form on:submit|preventDefault={handleRegister}>
		<div class="mb-4">
			<Input
				bind:value={loginInfo.firstName}
				label="First Name"
				placeholder="Enter your first name"
				required
			/>
		</div>
		<div class="mb-4">
			<Input
				bind:value={loginInfo.lastName}
				label="Last Name"
				placeholder="Enter your last name"
				required
			/>
		</div>
		<div class="mb-4">
			<Input
				bind:value={loginInfo.username}
				label="Username"
				placeholder="Choose a username"
				required
			/>
		</div>
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
		<Button class="w-full mt-4" type="submit">Register</Button>
	</form>
</Card>
