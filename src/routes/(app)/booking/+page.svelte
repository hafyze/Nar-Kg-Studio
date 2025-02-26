<script lang="ts">
	import { Input, Textarea, Button } from 'flowbite-svelte';
	import { DateInput } from 'date-picker-svelte';
	import type { Booking } from '$lib/models/booking.models.js';
	import { onMount } from 'svelte';
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

	$: booking.checkIn, booking.checkOut, calculatePrice();

	async function getBookedDates() {
		try {
			const response = await fetch('/api/getBookedDates');
			if (!response.ok) throw new Error('Failed to fetch booked dates');
			const data = await response.json();

			bookedDates = [];
			data.bookedDates.forEach(({ checkIn, checkOut }: { checkIn: string; checkOut: string }) => {
				const start = new Date(checkIn);
				const end = new Date(checkOut);
				for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
					bookedDates.push(new Date(d));
				}
			});
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
			<DateInput
				bind:value={booking.checkIn}
				format="dd-MM-yyyy"
				class="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
				on:change={() => {
					const today = new Date();
					today.setHours(0, 0, 0, 0);

					// Ensure check-in date is not in the past
					if (booking.checkIn < today) {
						alert('Check-in date cannot be in the past!');
						booking.checkIn = today;
						return;
					}

					// Prevent booking on already booked dates
					if (bookedDates.some((date) => date.toDateString() === booking.checkIn.toDateString())) {
						alert('Selected check-in date is already booked!');
						booking.checkIn = new Date(); // Reset to default
						return;
					}

					// Reset check-out date if check-in is changed
					if (booking.checkOut && booking.checkOut <= booking.checkIn) {
						alert('Check-out date must be after check-in date.');
						booking.checkOut = new Date();
					}
				}}
			/>
		</div>

		<!-- Check-Out Date -->
		<div class="mb-4">
			<label for="checkOut" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				Check-Out Date
			</label>
			<DateInput
				bind:value={booking.checkOut}
				format="dd-MM-yyyy"
				class="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
				on:change={() => {
					const today = new Date();
					today.setHours(0, 0, 0, 0);

					// Ensure check-in date is not in the past
					if (booking.checkIn < today) {
						alert('Check-in date cannot be in the past!');
						booking.checkIn = today;
						return;
					}

					// Prevent booking on already booked dates
					if (bookedDates.some((date) => date.toDateString() === booking.checkIn.toDateString())) {
						alert('Selected check-in date is already booked!');
						booking.checkIn = new Date(); // Reset to default
						return;
					}

					// Reset check-out date if check-in is changed
					if (booking.checkOut && booking.checkOut <= booking.checkIn) {
						alert('Check-out date must be after check-in date.');
						booking.checkOut = new Date();
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
	</section>
</div>

<style>
	:global(.datepicker-wrapper) {
		z-index: 10; /* Ensure datepicker appears above other elements */
	}
</style>
