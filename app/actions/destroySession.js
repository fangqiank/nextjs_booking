'use server'

import {createSessionClient} from '@/config/appwrite'
import { cookies } from 'next/headers'

export const destroySession = async () => {
  const sessionCookie = cookies().get('appwrite-session')

  if (!sessionCookie) {
    return {
			error: 'No session cookie'
		}
  }

	try {
		// console.log(sessionCookie.value);
		const {account} = await createSessionClient(sessionCookie.value)

		await account.deleteSessions('current')
		
		cookies().delete('appwrite-session')

		return {
			success: true
		}
	} catch (error) {
		return {
			error: 'Error destroying session'
		}
	}
}