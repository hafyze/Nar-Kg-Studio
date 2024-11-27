<script lang="ts">
    import { onMount } from "svelte";
    import { Carousel, Thumbnails } from "flowbite-svelte";
    import Controls from "flowbite-svelte/Controls.svelte";
    import Indicators from "flowbite-svelte/Indicators.svelte";
    
    let images: any = [];
    let index = 0;
    let forward = true;
    let loading = true;
  
    // Fetch images data from the server-side endpoint
    onMount(async () => {
      const res = await fetch('/imageData');
      images = await res.json();
      loading = false;
    });
  </script>
  
  <div class="max-w-4xl space-y-4 mx-auto">
    <!-- Ensure carousel only renders after images are loaded -->
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
  