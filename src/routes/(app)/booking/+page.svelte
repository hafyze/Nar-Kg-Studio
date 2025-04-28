<script lang="ts">
	import { Input, Textarea, Button } from 'flowbite-svelte';
	import { DateInput } from 'date-picker-svelte';
	import type { Booking } from '$lib/models/booking.models.js';
	import { onMount } from 'svelte';
	import { Toast } from 'flowbite-svelte';
	import { BanOutline, CheckOutline, InfoCircleOutline } from 'flowbite-svelte-icons';
	import { DatePicker } from "@svelte-plugins/datepicker";

	let showToast = false;
	let toastMessage = '';
	let toastType: 'error' | 'warning' | 'info' | 'success' = 'info';
	const pricePerNight = 120;

	let booking: Booking = {
		id: '',
		name: '',
		email: '',
		phone: '',
		checkIn: new Date(),
		checkOut: new Date(),
		remarks: '',
		totalPrice: 0,
		paid: false
	};

	let bookedDates: Date[] = [];

	function formatDate(date: Date): string {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	}

	// Function to calculate total price
	function calculatePrice() {
		if (booking.checkIn && booking.checkOut) {
			const checkInDate = booking.checkIn.getTime(); // Directly use Date object
			const checkOutDate = booking.checkOut.getTime(); // Directly use Date object

			const diffTime = Math.max(checkOutDate - checkInDate, 0);
			const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
			booking.totalPrice = nights * pricePerNight;
		} else {
			booking.totalPrice = 0;
		}
	}

	function showToastMessage(message: string, type: 'error' | 'warning' | 'info' | 'success') {
		toastMessage = message;
		toastType = type;
		showToast = true;

		// Auto-hide toast after 3 seconds
		setTimeout(() => {
			showToast = false;
		}, 3000);
	}

	// Automatically Runs when there is changes
	$: booking.checkIn, booking.checkOut, calculatePrice();

	async function getBookedDates() {
	try {
		const response = await fetch('/api/getBookedDates');
		if (!response.ok) throw new Error('Failed to fetch booked dates');
		const data = await response.json();
		bookedDates = [];

		data.bookedDates.forEach(({ checkIn, checkOut }: { checkIn: string; checkOut: string }) => {
			const start = new Date(checkIn);
			start.setHours(0, 0, 0, 0); 

			const end = new Date(checkOut);
			end.setHours(0, 0, 0, 0); 

			for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
				const normalizedDate = new Date(d);
				normalizedDate.setHours(0, 0, 0, 0);
				bookedDates.push(normalizedDate);
			}
		});

		console.log('Booked dates:', bookedDates);
	} catch (error) {
		console.error('Error fetching booked dates:', error);
	}
}


	async function onSubmit() {
		const formattedBooking = {
			name: booking.name,
			email: booking.email,
			phone: booking.phone,
			checkIn: formatDate(booking.checkIn),
			checkOut: formatDate(booking.checkOut),
			remarks: booking.remarks,
			totalPrice: booking.totalPrice,
			paid: false
		};

		try {
			const response = await fetch('/api/submitBooking', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formattedBooking)
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error('Error:', errorData.error);
				alert('Failed to submit booking. Please try again.');
				return;
			}

			const result = await response.json();
			console.log('Success:', result);
			alert('Booking submitted successfully!');
		} catch (error) {
			console.error('Unexpected error:', error);
			alert('An unexpected error occurred. Please try again.');
		}
	}

	onMount(getBookedDates);
</script>

<!-- Development Notice -->
<div class="fixed left-0 right-0 top-20 z-50 bg-yellow-500 py-2 text-center text-black shadow-md">
	<p class="flex items-center justify-center gap-2 text-sm font-semibold">
		🚧 <span
			>This page is still under development. <strong>BOOKING will NOT work as expected.</strong
			></span
		> 🚧
	</p>
</div>

<!-- Contact Notice -->
<div class="top-50 fixed left-0 right-0 z-50 bg-red-400 py-2 text-center text-white shadow-md">
	<p class="flex items-center justify-center gap-2 text-sm font-semibold">
		📞 <span>Please contact us directly through <strong>WhatsApp</strong> for inquiries.</span>
		<a
			href="https://wa.me/601111384191"
			target="_blank"
			class="text-white underline hover:text-gray-200"
		>
			Chat Now
		</a>
	</p>
</div>

<div
	class="mx-auto mt-10 max-w-4xl rounded-lg border border-gray-200 bg-gray-100 p-6 shadow dark:border-gray-700 dark:bg-gray-800"
>
	<!-- Room Information Section -->
	<section class="mb-8">
		<h1 class="mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100">Studio Room</h1>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<img src="/images/bed.jpg" alt="Room" class="h-64 w-full rounded-lg object-cover" />
			<div>
				<ul class="list-disc pl-5 text-gray-700 dark:text-gray-300">
					<li class="mb-2">Air-conditioned room with queen-sized bed</li>
					<li class="mb-2">Private bathroom with hot shower</li>
					<li class="mb-2">Complimentary bottled water</li>
				</ul>
			</div>
		</div>
		<p class="mt-4 text-lg font-medium text-gray-800 dark:text-gray-100">
			Price: <span class="rounded-full bg-white p-2 text-black">RM {pricePerNight} per night</span>
		</p>
	</section>

	<!-- Booking Form Section -->
	<section>
		<h2 class="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">Book Your Stay</h2>

		<!-- Name Input -->
		<div class="mb-4">
			<label for="name" class=" text-sm font-medium text-gray-700 dark:text-gray-300">
				Full Name
			</label>
			<Input bind:value={booking.name} placeholder="Enter your full name" required class="w-full" />
		</div>

		<!-- Email Input -->
		<div class="mb-4">
			<label for="email" class=" text-sm font-medium text-gray-700 dark:text-gray-300">
				E-mail
			</label>
			<Input
				bind:value={booking.email}
				type="email"
				placeholder="Enter your email"
				required
				class="w-full"
			/>
		</div>

		<!-- Phone Input -->
		<div class="mb-4">
			<label for="phone" class=" text-sm font-medium text-gray-700 dark:text-gray-300">
				Phone Number
			</label>
			<Input
				bind:value={booking.phone}
				type="tel"
				placeholder="Enter your phone number"
				required
				class="w-full"
			/>
		</div>

		<!-- Check-In Date -->
		<div class="mb-4">
			<label for="checkIn" class="text-sm font-medium text-gray-700 dark:text-gray-300">
				Check-In Date
			</label>
			<DatePicker
				bind:date={booking.checkIn}
				format="dd-MM-yyyy"
				startOfWeek={1}
				disableDates={bookedDates}
				class="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
				on:dateSelected={() => {
					const today = new Date();
					today.setHours(0, 0, 0, 0);

					if (booking.checkIn < today) {
						showToastMessage('Check-in date cannot be in the past!', 'error');
						booking.checkIn = today;
						return;
					}
				}}
			/>

		</div>

		<!-- Check-Out Date -->
		<div class="mb-4">
			<label for="checkOut" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				Check-Out Date
			</label>
			<DatePicker
				bind:date={booking.checkOut}
				format="dd-MM-yyyy"
				startOfWeek={1}
				disableDates={bookedDates}
				class="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
				on:dateSelected={() => {
					const today = new Date();
					today.setHours(0, 0, 0, 0);

					if (booking.checkOut < today) {
						showToastMessage('Check-out date cannot be in the past!', 'error');
						booking.checkOut = new Date(today);
						booking.checkOut.setDate(booking.checkOut.getDate() + 1);
						return;
					}

					// Ensure check-out is at least 1 night after check-in
					if (booking.checkOut <= booking.checkIn) {
						showToastMessage('Check-out date must be after check-in!', 'error');
						booking.checkOut = new Date(booking.checkIn);
						booking.checkOut.setDate(booking.checkOut.getDate() + 1);
					}
				}}
			/>
		</div>

		<!-- Remarks -->
		<div class="mb-4">
			<Textarea
				bind:value={booking.remarks}
				placeholder="Enter additional requests or remarks"
				class="w-full"
			/>
		</div>

		<!-- Total Price -->
		<div class="mb-6">
			<p class="text-lg font-medium text-gray-800 dark:text-gray-100">
				Total Price: <span class="rounded-xl bg-white p-2 text-black">RM {booking.totalPrice}</span>
			</p>
		</div>

		<!-- Submit Button -->
		<Button class="w-full" on:click={onSubmit}>Submit Booking</Button>

		<!-- Toast Component -->
		{#if showToast}
			<Toast>
				{#if toastType === 'error'}
					<BanOutline
						slot="icon"
						class="h-6 w-6 bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
					/>
				{:else if toastType === 'warning'}
					<BanOutline
						slot="icon"
						class="h-6 w-6 bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200"
					/>
				{:else if toastType === 'info'}
					<InfoCircleOutline
						slot="icon"
						class="h-6 w-6 bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200"
					/>
				{:else}
					<CheckOutline
						slot="icon"
						class="h-6 w-6 bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
					/>
				{/if}
				{toastMessage}
			</Toast>
		{/if}
	</section>
</div>

<style>
	:global(.datepicker-wrapper) {
		z-index: 10; /* Ensure datepicker appears above other elements */
	}
</style>
