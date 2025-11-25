<script lang="ts">
    import { onMount } from "svelte";
    import emailjs from '@emailjs/browser';
    import { Label, Input, Textarea, Button, InputAddon, ButtonGroup } from 'flowbite-svelte';
    import { UserCircleSolid } from 'flowbite-svelte-icons';
  
    export let serviceId = "service_1zbrasg";
    export let templateId = "template_ojheeft";
    export let publicKey = "eLL5TV0DO9TolldJp";
  
    let name = "";
    let feedback = "";
  
    async function sendFeedback(event: any) {
      event.preventDefault();
  
      const templateParams = {
        from_name: name,
        message: feedback,
      };
  
      try {
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        alert("Feedback sent successfully!");
      } catch (error) {
        console.error("Failed to send feedback", error);
        alert("There was an error sending your feedback. Please try again.");
      }
    }
  
    onMount(() => {
      // Initialize EmailJS if necessary
      emailjs.init(publicKey);
    });
  </script>
  
  <footer class= "py-8 dark:text-white">
    <div class="container mx-auto text-center max-w-lg p-2">
      <h3 class="text-lg font-bold mb-4">We Value Your Feedback</h3>
      <p>Please write a feedback you have regarding your stay, and website experience 😊</p>
      <form on:submit={sendFeedback} class="space-y-6">
        <!-- Name Input Field -->
        <div class="mb-4">
          <Label for="name" class="block text-sm font-medium mt-2 mb-2">Your Name</Label>
          <div class="flex items-center">
            <ButtonGroup class="w-full">
                <InputAddon>
                    <UserCircleSolid class="w-4 h-4 text-gray-400" />
                  </InputAddon>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    bind:value={name}
                    class="py-3 px-4 text-gray-700"
                    required
                  />
            </ButtonGroup>
            
          </div>
        </div>
  
        <!-- Feedback Textarea Field -->
        <div class="mb-4">
          <Label for="feedback" class="block text-sm font-medium text-white mb-2">Your Feedback</Label>
          <Textarea
            id="feedback"
            placeholder="Write your feedback here"
            bind:value={feedback}
            class="w-full py-3 px-4 rounded-lg text-gray-700"
            required
          ></Textarea>
        </div>
  
        <!-- Submit Button -->
        <div class="flex justify-center">
          <Button
            type="submit"
            class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Send Feedback
          </Button>
        </div>
      </form>
    </div>
  </footer>

  