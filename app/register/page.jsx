'use client'

import { useRouter } from 'next/navigation'
import {useEffect} from 'react'
import {useFormState} from 'react-dom'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { createUser } from '@/app/actions/createUser'

const RegisterPage = () => {
	const [state, formAction] = useFormState(createUser, {})

	const router = useRouter()

	useEffect(() => {
		if(state.error)
			toast.error(state.error)
		if(state.success){
			toast.success('You can now log lin!')
			router.push('/login')
		}
	}, [state])
	

	return (
		<div className='flex items-center justify-center'>
			<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
				<form action={formAction}>
					<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
						Register
					</h2>

					<div className="mb-4">
						<label 
							for="name" 
							className="block text-gray-700 font-bold mb-2"
						>
							Name
						</label>
						<input 
							type="text" 
							id="name" 
							name="name" 
							className="border rounded w-full py-2 px-3"
							autoComplete='name'
							required
						/>
					</div>

					<div className="mb-4">
						<label 
							for="email" 
							className="block text-gray-700 font-bold mb-2"
						>
							Email
						</label>
						<input 
							type="email" 
							id="email" 
							name="email" 
							className="border rounded w-full py-2 px-3"
							autoComplete='email'
							required
						/>
					</div>

		      <div className="mb-4">
						<label 
							for="password" 
							className="block text-gray-700 font-bold mb-2"
						>
							PAssword
						</label>
						<input 
							type="password" 
							id="password" 
							name="password" 
							className="border rounded w-full py-2 px-3"
							autoComplete='password'
							required
						/>
					</div>	

					<div className="mb-4">
						<label 
							for="confirm-password" 
							className="block text-gray-700 font-bold mb-2"
						>
							Confirm Password
						</label>
						<input 
							type="password" 
							id="confirm-password" 
							name="confirm-password" 
							className="border rounded w-full py-2 px-3"
							autoComplete='confirm-password'
							required
						/>
					</div>

					<div className="flex flex-col gap-5">
						<button 
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
							type='submit'
						>
							Register
						</button>
					</div>

					<p>
						Already have an account?
						<Link 
							href="/login"
							className='text-blue-500'
						>
							Login
						</Link>
					</p>

				</form>
			</div>
		</div>
	)
}

export default RegisterPage