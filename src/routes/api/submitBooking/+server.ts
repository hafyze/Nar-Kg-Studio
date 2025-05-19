import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

export  async function POST(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        const checkInDate = req.body.checkIn.split('-').reverse().join('-'); // Convert to 'yyyy-MM-dd'
        const checkOutDate = req.body.checkOut.split('-').reverse().join('-'); // Convert to 'yyyy-MM-dd'

        // Prepare the booking data
        const booking = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            check_in: checkInDate,
            check_out: checkOutDate,
            remarks: req.body.remarks,
            total_price: req.body.totalPrice,
            paid: false,
        };

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
