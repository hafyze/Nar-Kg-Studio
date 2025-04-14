<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';
</script>

<div class="bg-gray-100 py-10 dark:bg-gray-800">
	<div class="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
		<Heading class="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-gray-100"
			>Attractions</Heading
		>

		<!-- Attraction content -->
		<div class="space-y-6">
			<!-- Teluk Bayu -->
			<div class="flex items-center space-x-4 border-b border-gray-300 pb-4 dark:border-gray-700">
				<img
					src="/images/beach-1.jpeg"
					alt="Teluk Bayu Beach"
					class="h-24 w-24 rounded-lg border border-gray-300 object-cover dark:border-gray-700"
				/>

				<!-- Description -->
				<div>
					<P class="text-xl font-semibold text-gray-700 dark:text-gray-200">Teluk Bayu Beach</P>
					<p class="mt-1 text-gray-600 dark:text-gray-400">
						Wanting to go to the beach? Here is the direction to head there.
					</p>
					<a
						href="https://maps.app.goo.gl/JvhvwZdzE5dcx3nx5"
						class="mt-2 inline-block text-sm font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						target="_blank"
					>
						Get Directions →
					</a>
				</div>
			</div>

			<!-- Queensbay Mall -->
			<div class="flex items-center space-x-4 border-b border-gray-300 pb-4 dark:border-gray-700">
				<img
					src="/images/queensbay.jpg"
					alt="queensbay mall"
					class="h-24 w-24 rounded-lg border border-gray-300 object-cover dark:border-gray-700"
				/>

				<!-- description -->
				<div>
					<P class="text-xl font-semibold text-gray-700 dark:text-gray-200">Queensbay Mall</P>
					<p class="mt-1 text-gray-600 dark:text-gray-400">
						One of the ﬁnest shopping malls in Penang Island, is located in the heart of Bayan Lepas
					</p>
					<a
						href="https://maps.app.goo.gl/xy1WfZ9rZmR6jCs89"
						class="mt-2 inline-block text-sm font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						target="_blank"
					>
						Get Directions →
					</a>
				</div>
			</div>

			<!-- Sunshine Square -->
			<div class="flex items-center space-x-4 border-b border-gray-300 pb-4 dark:border-gray-700">
				<img
					src="/images/sunshine.jpg"
					alt="queensbay mall"
					class="h-24 w-24 rounded-lg border border-gray-300 object-cover dark:border-gray-700"
				/>

				<!-- description -->
				<div>
					<P class="text-xl font-semibold text-gray-700 dark:text-gray-200">Sunshine Square</P>
					<p class="mt-1 text-gray-600 dark:text-gray-400">
						A long-standing local mall in Bayan Baru, known for its department store and convenient everyday shopping.
					</p>
					<a
						href="https://maps.app.goo.gl/FwQ9nZwzUjzoRMEo9"
						class="mt-2 inline-block text-sm font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						target="_blank"
					>
						Get Directions →
					</a>
				</div>
			</div>
			<!-- Penang Street Art -->
			<div class="flex items-center space-x-4 border-b border-gray-300 pb-4 dark:border-gray-700">
				<img
					src="/images/penang_street_art.jpg"
					alt="queensbay mall"
					class="h-24 w-24 rounded-lg border border-gray-300 object-cover dark:border-gray-700"
				/>

				<!-- description -->
				<div>
					<P class="text-xl font-semibold text-gray-700 dark:text-gray-200">Penang Street Art</P>
					<p class="mt-1 text-gray-600 dark:text-gray-400">
						Explore iconic murals and interactive wall art throughout George Town.
					</p>
					<a
						href="https://maps.app.goo.gl/vuWcJqYFB1pWiVZq9"
						class="mt-2 inline-block text-sm font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
						target="_blank"
					>
						Get Directions →
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
