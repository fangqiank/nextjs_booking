'use server'

import { createAdminClient } from "@/config/appwrite"
import { cookies } from "next/headers"

export const createSession = async (_, formData) => {
	const email = formData.get('email')	
	const password = formData.get('password')

	if(!email || !password)
		return {
			error: "Please fill all the fields"
		}
	
	const {account} = await createAdminClient()
	// console.log(account);

	try{
		const session = await account.createEmailPasswordSession(
			email,
			password
		)

		cookies().set('appwrite-session', session.secret, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			path: '/',
			expires: new Date(session.expire)
		})

		return {
			success: true,
		}
	}catch(err){
		console.log('Autentication Error: ',err);
		return {
			error: 'Invalid Credentials'
		}
	}
}