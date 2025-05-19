<script lang="ts">
  import { onMount } from 'svelte';
  import flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.css';
  import { createEventDispatcher } from 'svelte';

  let pickerEl: HTMLInputElement;

  // Now expect Date[] instead of string[]
  export let selectedDates: Date[] = [];

  const dispatch = createEventDispatcher<{ change: Date[] }>();

  onMount(() => {
    const fp = flatpickr(pickerEl, {
      mode: 'range',
      dateFormat: 'd-m-Y',
      minDate: 'today',
      // give it real Date objects
      defaultDate: selectedDates,
      onChange: (dates: Date[]) => {
        if (dates.length === 2) {
          // dispatch the Date objects directly
          dispatch('change', dates);
        }
      }
    });

    return () => fp.destroy();
  });
</script>

<input
  type="text"
  bind:this={pickerEl}
  class="w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
  placeholder="Select date range"
/>
