<script lang="ts">
    import { onMount } from "svelte";
    import { Carousel, Thumbnails, Card } from "flowbite-svelte";
  
    let images: any = [];
    let index = 0;
    let forward = true;
    let loading = true;
    let hCard = true;
  
    // Fetch images data from the server-side endpoint
    onMount(async () => {
      const res = await fetch('/imageData');
      images = await res.json();
      loading = false;
    });
  </script>
  
  <div class="max-w-4xl space-y-4 mx-auto">
    {#if !loading} 
      <Carousel 
        imgClass="object-contain h-full rounded-sm"
        {images} {forward} let:Indicators let:Controls bind:index>
        <Controls />
        <Indicators />
      </Carousel>
  
      <Thumbnails {images} {forward} bind:index 
        imgClass="object-contain w-[80px] h-auto sm:w-[100px] md:w-[120px] lg:w-[150px]" />
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
  
  <!-- Why Stay Here Section -->
  <div class="mt-10 text-black dark:text-white">
    <h2 class="text-center text-3xl font-bold mb-6">Why Should You Stay Here?</h2>
  
    <div class="mx-4 md:mx-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Card 1: Airport Proximity -->
      <Card img="/images/penang-international-airport.jpg" horizontal size="xl" class="shadow-lg">
        <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Close to the Airport</h5>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Only 5 minutes away from Penang International Airport, perfect for travelers seeking convenience.
        </p>
      </Card>
  
      <!-- Card 2: Countryside Experience -->
      <Card img="/images/countryside.jpg" horizontal size="xl" reverse={hCard} class="shadow-lg">
        <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Peaceful Countryside Escape</h5>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Enjoy a serene getaway with a countryside experience, yet stay connected to modern amenities.
        </p>
      </Card>
    </div>
  </div>
  