<script lang="ts">
	import type { UserLogin } from "$lib/models/user.models.js";
	import type { User } from "$lib/services/api.service.js";
    import { Card } from 'flowbite-svelte';

    let loginInfo: UserLogin = {
        email: '',
        firstName: '',
        lastName: '',
        password:'',
        username: ''
    }
</script>

<!-- Feel free to edit below -->
<Card class="mx-auto mt-10">
    <h4>Form</h4>
</Card>