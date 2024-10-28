'use server'

import { createAdminClient } from "@/config/appwrite"
import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"
import { checkAuth } from "./checkAuth"
import { revalidatePath } from "next/cache"
import { checkRoomAvailability } from "./checkRoomAvailability"
import { ID } from "node-appwrite"	

export const bookRoom = async (prev, formData) => {
  const sessionCookie = cookies().get("appwrite-session")
	if(!sessionCookie)
		redirect('/login')

	try {
		const {databases} = await createAdminClient(sessionCookie.value)

		const {user} = await checkAuth()

		if(!user)
			return {
				error: "User not found"
			}
		
		const checkInDate = formData.get('check_in_date')
		const checkInTime = formData.get('check_in_time')
		const checkOutDate = formData.get('check_out_date')
		const checkOutTime = formData.get('check_out_time')
		const roomId = formData.get('room_id')

		const checkInDateTime = `${checkInDate}T${checkInTime}`
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`

		const isAvailable = await checkRoomAvailability(
			roomId, 
			checkInDateTime, 
			checkOutDateTime
		)

		if(!isAvailable)
			return {
				error: "This room is already booked for the selected time"
			}

		const bookingData = {
			check_in: checkInDateTime,
			check_out: checkOutDateTime,
			user_id: user.id,
			room_id: roomId
		}

		await databases.createDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      ID.unique(),
      bookingData
		)

		revalidatePath('/bookings', 'layout')

		return {
			success: true
		}
	} catch (error) {
		console.log('Failed to book room', error)
    return {
      error: 'Something went wrong booking the room',
    }
	}
}