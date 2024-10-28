'use client'

import { toast } from "react-toastify"
import { cancelBooking } from "@/app/actions/cancelBooking"
export const CancelBookingButton = ({bookingId}) => {
	const handleCancelClick = async () => {
		if(!confirm('Are you sure you want to cancel this booking?'))
			return

		try{
			const result = await cancelBooking(bookingId)

			if(result.success)
				toast.success('Booking cancelled successfully')
		}catch(err){
			console.log('Failed to cancel booking', err)
			return {
				error: 'Failed to cancel booking'
			}
		}
	} 

	return (
		<button
			className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
			onClick={handleCancelClick}
		>
			Cancle Booking
		</button>
	)
}
