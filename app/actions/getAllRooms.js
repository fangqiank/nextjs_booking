'use server'

import { createAdminClient } from "@/config/appwrite"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const getAllRooms = async () => {
  try{
		const {databases} = await createAdminClient()

		const {documents} = await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
			process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
		)

		revalidatePath('/', 'layout')

		return documents
	}catch(err){
		console.log('Failed to get rooms', err)
		redirect('/error')
	}
}