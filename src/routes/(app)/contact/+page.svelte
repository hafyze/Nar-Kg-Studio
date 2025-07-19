<script>
    import { Card, Avatar, Button } from 'flowbite-svelte';
    import { EnvelopeOutline, PhoneOutline, MapPinAltOutline, WhatsappSolid } from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>Contacts</title>
</svelte:head>

<div class="">
    <Card padding="md" class="mx-auto w-3/4">
        <div class="flex flex-col items-center pb-4">
            <h5 class="mb-2 text-xl font-medium text-white-800">Contact Us</h5>
            <div class="flex flex-col space-y-4">
                <!-- Email -->
                <div class="flex items-center">
                    <EnvelopeOutline class="mr-2 text-gray-500" />
                    <a href="mailto:info@company.com" class="text-blue-500">narkampungstudio@gmail.com</a>
                </div>
                <!-- Phone -->
                <div class="flex items-center">
                    <PhoneOutline class="mr-2 text-gray-500" />
                    <span class="text-white-800">+60 111 138 4191</span>
                </div>
                <!-- Location -->
                <div class="flex items-center">
                    <MapPinAltOutline class="mr-2 text-gray-500" />
                    <span class="text-white-800">
                        Kampung Teluk Kumbar, 11950 Bayan Lepas, Penang
                        <a class="text-xs italic text-blue-500" href="https://maps.app.goo.gl/bWq8Ak5bMY7PH5zD6" target="_blank">direction</a>
                    </span>
                </div>
            </div>
            <div class="flex mt-4 space-x-3 rtl:space-x-reverse">
                <Button
                    color="green"
                    href="https://wa.me/601111384191?text=Hi%20Narkampung%20Studio!%20I%20would%20like%20to%20know%20more."
                    target="_blank"
                >
                    <WhatsappSolid /> Whatsapp us now
                </Button>
            </div>
        </div>
    </Card>
</div>

<div class="w-full h-full">
    <Card class="mt-8 mx-auto w-3/4">
        <div class="flex flex-col items-center pb-4">
            <h5 class="mb-2 text-xl font-medium">Map Location</h5>    
            <iframe 
                title="Map Location" 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d290.7033703332225!2d100.23931180522374!3d5.287746002498194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smy!4v1734020234426!5m2!1sen!2smy" 
                class="w-full h-[300px]"
                style="border:0;" 
                allowfullscreen 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    </Card>
</div>
