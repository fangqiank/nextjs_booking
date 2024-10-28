'use server'

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 67130aaf0022d28340e6
export const getSingleRoom = async (roomId) => {
  try {
		const {databases} = await createAdminClient()

		const room = await databases.getDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      roomId
		)

		revalidatePath('/', 'layout')

		return room
	} catch (error) {
		console.log('Failed to get room', error)
    redirect('/error')
	}
};