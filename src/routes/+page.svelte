<script lang="ts">
    import { Carousel, Thumbnails } from "flowbite-svelte";
    import { images } from "./imageData/+server.js";
    import Controls from "flowbite-svelte/Controls.svelte";
    import Indicators from "flowbite-svelte/Indicators.svelte";
  
    let index = 0;
    let forward = true;
  </script>
  
  <div class="max-w-4xl space-y-4 mx-auto">
    <!-- Carousel Component -->
    <Carousel 
      imgClass="object-contain h-full rounded-sm"
      {images} {forward} let:Indicators let:Controls bind:index>
      <Controls />
      <Indicators />
    </Carousel>
  
    <!-- Thumbnails Component -->
    <Thumbnails {images} {forward} bind:index 
      imgClass="object-contain w-[80px] h-auto sm:w-[100px] md:w-[120px] lg:w-[150px]" />
  </div>
  