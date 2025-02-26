import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    try {
        // Fetch only necessary fields (check_in and check_out)
        const { data, error } = await supabase
            .from('bookings')
            .select('check_in, check_out')
            .order('check_in', { ascending: true });

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        // Convert the fetched dates into an array of booked date ranges
        const bookedDates = data.map(({ check_in, check_out }) => ({
            checkIn: new Date(check_in).toISOString(),
            checkOut: new Date(check_out).toISOString()
        }));
        
        console.log("Raw data from Supabase:", data);
        console.log("Processed bookedDates:", bookedDates);
        
        res.status(200).json({ bookedDates });
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: 'Unexpected server error' });
    }
}
