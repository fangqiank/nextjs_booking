'use server'

import { DateTime } from "luxon";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { createAdminClient } from "@/config/appwrite";
import { Query } from "node-appwrite";
const toUtcDateTime = (dateString) => {
  return DateTime.fromISO(dateString, {
		zone: 'utc'
	}).toUTC()
}

const dateRangesOverLap = (checkInA, checkOutA, checkInB, checkOutB) => {
  return checkInA < checkOutB && checkOutA > checkInB
}

export const checkRoomAvailability = async (roomId, checkIn, checkOut) => {
 const sessionCookie = cookies().get('appwrite-session')
 if(!sessionCookie)
   redirect('/login')
	
 try {
	const {databases} = await createAdminClient(sessionCookie.value)

	const checkInDateTime = toUtcDateTime(checkIn)
	const checkOutDateTime = toUtcDateTime(checkOut)

	const {documents} = await databases.listDocuments(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
		process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
		[Query.equal('room_id', roomId)])

		for(const booking of documents ){
			const bookingCheckInDateTime = toUtcDateTime(booking.check_in)
			const bookingCheckOutDateTime = toUtcDateTime(booking.check_out)

			if(dateRangesOverLap(checkInDateTime, checkOutDateTime, bookingCheckInDateTime, bookingCheckOutDateTime)){
				return false
			}
		}

		return true
 } catch (error) {
	console.log('Failed to check availability', error);
    return {
      error: 'Failed to check availability',
    }
 }
}