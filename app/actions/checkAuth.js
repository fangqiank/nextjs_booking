'use server'

import {createSessionClient} from '@/config/appwrite'
import {cookies} from 'next/headers'

export const checkAuth = async () => {
	const sessionCookie = cookies().get('appwrite-session')

	if(!sessionCookie){
		return {
			isAuthenticated: false
		}
	}

	try {
		const {account} = await createSessionClient(sessionCookie.value)

		const user = await account.get()
		// console.log(user.$id);

		return {
			isAuthenticated: true,
			user: {
				id: user.$id,
				name: user.name,
				email: user.email
			}
		}
	} catch (error) {
		return {
			isAuthenticated: false
		}
	}
}
