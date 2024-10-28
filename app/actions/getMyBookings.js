'use server'

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createSessionClient } from "@/config/appwrite"
import { checkAuth } from "./checkAuth"
import { Query } from "node-appwrite" 

export const getMyBookings = async () => {
	const sessionCookie =  cookies().get('appwrite-session')
	if(!sessionCookie)
		redirect('/login')

	try {
		const {databases} = await createSessionClient(sessionCookie.value)

		const {user} = await checkAuth()

		if(!user){
			return{
				error: 'You must be logged in to view your bookings'
			}
		}

		const {documents} = await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS, 
			[Query.equal('user_id', user.id)]
		)

		return documents
	} catch (error) {
		console.log('Failed to get user bookings', error)
		return {
			error: 'Failed to get user bookings'
		}		
	}
}