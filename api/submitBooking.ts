import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        // Convert checkIn and checkOut from string 'dd-MM-yyyy' to Date objects
        const booking = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            check_in: new Date(req.body.checkIn.split('-').reverse().join('-')), // Convert to 'yyyy-MM-dd'
            check_out: new Date(req.body.checkOut.split('-').reverse().join('-')), // Convert to 'yyyy-MM-dd'
            remarks: req.body.remarks,
            total_price: req.body.totalPrice,
        };
        console.log("booking, ", booking)
        // Save booking to Supabase
        const { data, error } = await supabase
            .from('bookings')
            .insert([booking]);

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(200).json({ message: 'Booking saved successfully!', data });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
