'use server'

import { createAdminClient } from "@/config/appwrite"

export const createUser = async (prev, formData) => {
	const name = formData.get('name')
	const email = formData.get('email')
	const password = formData.get('password')
	const confirmPassword = formData.get('confirm-password')

	if(!email || !name || !password)
		return {
			error: "Please fill all the fields"
		}
	
	if(password.length < 8)
		return {
			error: "Password must be at least 8 characters long"
		}

	if(password !== confirmPassword)
		return {
			error: "Passwords do not match"
		}
	
	const {account} = await createAdminClient()

	try{
		await account.create(
			ID.unique(),
			email,
			password,
			name
		)

		return {
			success: true
		}
	}catch(err){
		console.log(err);
		return {
			error: 'Could not register user'
		}
	}
}