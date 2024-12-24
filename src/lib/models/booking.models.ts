export interface Booking {
    id: string
    name: string
    email: string
    phone: string
    checkIn: Date
    checkOut: Date
    remarks: string
    pricePerNight: number
    totalPrice: number
}