import React from 'react'
import Link from 'next/link'
import { CancelBookingButton } from './CancelBookingButton'
export const BookingRoomCard = ({booking}) => {
	const {room_id} = booking

	const formatDate = (dateString) => {
		const date = new Date(dateString)

		const options = { month: 'short'}
		const month = date.toLocaleString('en-US', options, {
			timeZone: 'UTC'
		})

		const day = date.getUTCDate()

		const timeOptions = {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
			timeZone: 'UTC'
		}

		const time = date.toLocaleString('en-US', timeOptions)

		return `${month} ${day} at ${time}`
	}

	return (
		<div className='bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center'>
			<div>
				<h4 className="text-lg font-semibold">{room_id.name}</h4>
				<p className="text-gray-600 text-sm">
					<strong>Check In:</strong> {formatDate(booking.check_in)}
				</p>
				<p className="text-gray-600 text-sm">
					<strong>Check Out:</strong> {formatDate(booking.check_out)}
				</p>
			</div>

			<div className="flex flex-col sm:flex-row w-full rounded mb-2 sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
				<Link
					href={`/rooms/${room_id.$id}`}
					className='bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700'
				>
					View Room
				</Link>

				<CancelBookingButton bookingId={booking.$id} />
			</div>
		</div>
	)
}