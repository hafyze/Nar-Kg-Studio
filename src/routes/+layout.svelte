<script>
	import '../app.css';
	import { Button, DarkMode, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from "flowbite-svelte";
  import FeedbackForm from '$lib/components/FeedbackForm.svelte';

</script>


<div>
    <div class="relative px-8">
        <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
            <NavBrand href="/">
                <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">NAR Kampung Studio</span>
              </NavBrand>
			  <div class="flex md:order-2">
				<Button size="sm" href="/booking">Book Now</Button>
				<NavHamburger /> 
			  </div>              <NavUl>
                <NavLi href="/">Home</NavLi>
                <NavLi href="/attraction">Attractions</NavLi>
                <NavLi href="/about">About</NavLi>
                <NavLi href="/pricing">Pricing</NavLi>
                <NavLi href="/contact">Contact</NavLi>
                <DarkMode btnClass="text-center"/>
              </NavUl>
        </Navbar>
    </div>

    <div class="pt-36">
        <slot></slot>
        <FeedbackForm />
    </div>
</div>