<script lang="ts">
	import { Input, Textarea, Button } from 'flowbite-svelte';
	import { Datepicker } from 'flowbite-svelte';

	let name = '';
	let email = '';
	let phone = '';
	let checkIn: any = null;
	let checkOut: any = null;
	let remarks = '';
	let pricePerNight = 120; // Room price in RM
	let totalPrice = 0;

	function calculatePrice() {
		if (checkIn && checkOut) {
			// Ensure that checkIn and checkOut are valid dates
			const checkInDate = new Date(checkIn).getTime();
			const checkOutDate = new Date(checkOut).getTime();

			// Calculate the number of nights
			const diffTime = Math.max(checkOutDate - checkInDate, 0);
			const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
			totalPrice = nights * pricePerNight;
		} else {
			totalPrice = 0; // Reset total price if dates are invalid
		}
	}

	$: calculatePrice(); // Automatically recalculate when checkIn or checkOut changes
</script>

<div
	class="mx-auto mt-10 max-w-4xl rounded-lg border border-gray-200 bg-gray-100 p-6 shadow dark:border-gray-700 dark:bg-gray-800"
>
	<!-- Room Information Section -->
	<section class="mb-8">
		<h1 class="mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100">Deluxe Room</h1>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<img src="/images/bed.jpg" alt="Room" class="h-64 w-full rounded-lg object-cover" />
			<div>
				<ul class="list-disc pl-5 text-gray-700 dark:text-gray-300">
					<li class="mb-2">Air-conditioned room with queen-sized bed</li>
					<li class="mb-2">Private bathroom with hot shower</li>
					<li class="mb-2">Complimentary bottled water and coffee</li>
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
			<Input bind:value={name} placeholder="Enter your full name" required class="w-full" />
		</div>

		<!-- Email Input -->
		<div class="mb-4">
			<Input
				bind:value={email}
				type="email"
				placeholder="Enter your email"
				required
				class="w-full"
			/>
		</div>

		<!-- Phone Input -->
		<div class="mb-4">
			<Input
				bind:value={phone}
				type="tel"
				placeholder="Enter your phone number"
				required
				class="w-full"
			/>
		</div>

		<!-- Check-In Date -->
		<div class="mb-4">
			<label for="checkIn" class=" text-sm font-medium text-gray-700 dark:text-gray-300">
				Check-In Date
			</label>
            <Datepicker 
                id="checkIn" 
                bind:value={checkIn} 
                required 
                datepickerTitle="" 
                datepickerFormat="dd-MM-yyyy"
                datepickerOrientation="top"
                datepickerButtons
                inputClass="pl-[2.5rem] text-center text-gray-700 dark:text-gray-300 dark:bg-gray-700 w-full rounded-lg"
            />
		</div>

		<!-- Check-Out Date -->
		<div class="mb-4">
			<label for="checkOut" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				Check-Out Date
			</label>
			<Datepicker 
                id="checkOut" 
                bind:value={checkOut} 
                required 
                datepickerTitle="" 
                datepickerFormat="dd-MM-yyyy"
                datepickerOrientation="top"
                datepickerButtons
                inputClass="pl-[2.5rem] text-center text-gray-700 dark:text-gray-300 dark:bg-gray-700 w-full rounded-lg"
            />
		</div>

		<!-- Remarks -->
		<div class="mb-4">
			<Textarea
				bind:value={remarks}
				placeholder="Enter additional requests or remarks"
				class="w-full"
			/>
		</div>

		<!-- Total Price -->
		<div class="mb-6">
			<p class="text-lg font-medium text-gray-800 dark:text-gray-100">
				Total Price: <span class="text-green-600">RM {totalPrice}</span>
			</p>
		</div>

		<!-- Submit Button -->
		<Button class="w-full">Submit Booking</Button>
	</section>
</div>

<style>
	:global(.datepicker-wrapper) {
		z-index: 10; /* Ensure datepicker appears above other elements */
	}
</style>
