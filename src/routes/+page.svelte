<script lang="ts">
    import { onMount } from "svelte";
    import { Carousel, Thumbnails, Card, Spinner } from "flowbite-svelte";
    import { MapPinOutline } from 'flowbite-svelte-icons';

    let images: any = [];
    let index = 0;
    let forward = true;
    let loading = true;
    let hCard = true;
  
    // For the dynamic content toggle
    let showCountryside: boolean = true; // Controls which content to display
    console.log("Chimpanzini bananinin")
    // Fetch images data from the server-side endpoint
    onMount(async () => {
      const res = await fetch('/imageData');
      images = await res.json();
      loading = false;
    });
  
    // Function to update dynamic card content
    function toggleCardContent() {
      showCountryside = !showCountryside; // Toggle between countryside and urban
    }
</script>
  <div class="bg-blue-500 text-white text-center py-2 rounded-md mb-4">
    <p class="text-lg ">Starting from just <span class="text-2xl font-bold">RM120</span> per night!</p>
  </div>

  <div class="max-w-4xl space-y-4 mx-auto">
    {#if !loading}
      <Carousel 
        imgClass="object-scale-down h-full rounded-sm"
        {images} {forward} let:Indicators let:Controls bind:index>
        <Controls />
        <Indicators />
      </Carousel>
  
      <Thumbnails {images} {forward} bind:index 
        imgClass="object-contain w-[80px] h-auto sm:w-[100px] md:w-[120px] lg:w-[150px]" />
    {:else}
      <p><Spinner /> Loading...</p>
    {/if}
  </div>
  
  <!-- Why Stay Here Section -->
  <div class="mt-10 text-black dark:text-white">
    <h2 class="text-center text-3xl font-bold mb-6">Why Should You Stay Here?</h2>
  
    <div class="mx-4 md:mx-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Card 1: Countryside Experience -->
      <Card img="/images/countryside.jpg" horizontal size="xl" class="shadow-lg">
        <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">A Countryside Escape</h5>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Nestled on a serene hillside, this peaceful getaway offers the charm of rural life, with roaming chickens, playful cats, and the soothing sounds of nature all around. Experience the perfect balance of seclusion and modern comfort.
        </p>
      </Card>      
      
      <!-- Card 2: Airport Proximity -->
      <Card img="/images/penang-international-airport.jpg" horizontal size="xl" reverse={hCard} class="shadow-lg">
        <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Close to the Airport</h5>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Only 5 minutes away from Penang International Airport, perfect for travelers seeking convenience.
        </p>
      </Card>
  
      <!-- Card 3: Beach Experience -->
      <Card img="/images/beach-1.jpeg" horizontal size="xl" class="shadow-lg">
        <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Relax at a Beach Just Minutes Away</h5>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Unwind by the shore within a 5-minute reach. Enjoy golden sands, crystal-clear waters, and serene coastal vibes, perfect for your next quick getaway.
        </p>
      </Card>
  
      <!-- Dynamic Card (Balik Pulau or Queensbay Mall) -->
      <Card reverse={hCard} img={showCountryside ? "/images/balik-pulau.jpg" : "/images/queensbay.jpg"} 
            horizontal size="xl" class="shadow-lg">
        <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {showCountryside ? "Discover Balik Pulau" : "Shop & Dine at Queensbay Mall"}
        </h5>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          {showCountryside 
            ? "A short drive takes you to the lush countryside of Balik Pulau. Explore rolling hills, fruit orchards, and charming local villages for a refreshing change of scenery."
            : "30~ minutes away, Queensbay Mall offers an unparalleled shopping and dining experience, perfect for all ages. From global brands to local delicacies, there’s something for everyone!"
          }
        </p>
        <button on:click={toggleCardContent} class="px-2 my-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
            <!-- Icon next to the text -->
            <MapPinOutline class="mr-2 h-5 w-5" />
            {showCountryside ? "Show Urban Experience" : "Show Countryside Experience"}
        </button>        
      </Card>
    </div>
  </div>
  