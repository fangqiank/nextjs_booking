'use server'

import { createSessionClient } from "@/config/appwrite"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Query } from "node-appwrite"

export const getMyRooms = async () => {
	const sessionCookie = cookies().get('appwrite-session')
	if(!sessionCookie)
		redirect('/login')

	try {
		const {account, databases} = await createSessionClient(sessionCookie.value)

		const user = await account.get()
		// console.log(user)
		const userId = user.$id

		const {documents} = await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
			[Query.equal('user_id', userId)]
		)

		// console.log(documents);

		return documents
	} catch (error) {
		console.log('Failed to get user rooms', error)
    redirect('/error')
	}
}