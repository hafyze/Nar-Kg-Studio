// src/routes/api/getBookedDates/+server.ts
import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

const supabase = createClient(
	process.env.SUPABASE_URL || SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY || SUPABASE_ANON_KEY
);

export async function GET() {
	const { data, error } = await supabase
		.from('bookings')
		.select('check_in, check_out')
		.order('check_in', { ascending: true });

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	const bookedDates = data.map(({ check_in, check_out }) => ({
		checkIn: check_in,
		checkOut: check_out
	}));

	return json({ bookedDates });
}