import { Heading } from "@/components/Heading"
import { BookingRoomCard } from "@/components/BookingRoomCard"
import { getMyBookings } from "../actions/getMyBookings"
const BookingsPage = async () => {
	const bookings = await getMyBookings()

	return (
		<>
			<Heading title='My Bookings' />

			{bookings.length === 0 ? (
				<p className="text-gray-600 mt-4">
					You have no bookings
				</p>
			) : (
				bookings.map(booking => (
					<BookingRoomCard
						key={booking.$id}
						booking={booking} 
					/>
				))
			)}
		</>
	)
}

export default BookingsPage
