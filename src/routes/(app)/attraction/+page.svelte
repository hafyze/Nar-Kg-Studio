<script lang="ts">
	import { Heading, P } from "flowbite-svelte";
</script>

<div class="bg-gray-100 dark:bg-gray-800 py-10">
	<div class="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
		<Heading class="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">Attractions</Heading>

		<!-- Attraction content -->
		<div class="space-y-6">
			<!-- Teluk Bayu -->
			<div class="flex items-center space-x-4 border-b pb-4 border-gray-300 dark:border-gray-700">
				<img 
					src="/images/beach-1.jpeg" 
					alt="Teluk Bayu Beach" 
					class="w-24 h-24 rounded-lg object-cover border border-gray-300 dark:border-gray-700"
				/>

				<!-- Description -->
				<div>
					<P class="text-xl font-semibold text-gray-700 dark:text-gray-200">Teluk Bayu Beach</P>
					<p class="text-gray-600 dark:text-gray-400 mt-1">
						Wanting to go to the beach? Here is the direction to head there.
					</p>
					<a 
						href="https://maps.app.goo.gl/JvhvwZdzE5dcx3nx5"
						class="inline-block mt-2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
						target="_blank"
					>
						Get Directions →
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
