'use client'

import {useFormState} from 'react-dom'
import { createRoom } from '@/app/actions/createRoom'
import { useRouter } from 'next/navigation'
import {useEffect} from 'react'
import { toast } from 'react-toastify'
import { Heading } from '@/components/Heading'
const AddRoomPage = () => {
	const [state, formAction] = useFormState(createRoom, {})
	// console.log(state)

	const router = useRouter()

	useEffect(() => {
		if(state?.error)
			toast.error(state.error)
		if(state?.success){
			toast.success('Room has been created!')
			router.push('/')
		}
	}, [state])

	return (
		<>
			<Heading  title='Add a room' />

			<div className="bg-white shadow-lg rounded-lg p-6 w-full">
				<form action={formAction}>
					<div className="mb-4">
						<label 
							className="block text-gray-700 font-bold mb-2"
							htmlFor='name'
						>
							Room Name
						</label>
						<input 
							type="text"
							id='name'
							name='name'
							className='border rounded w-full py-2 px-3'
							placeholder='Enter a room name'
							required 
						/>
					</div>

					<div className="mb-4">
						<label 
							className="block text-gray-700 font-bold mb-2"
							htmlFor='description'
						>
							Description
						</label>
						<textarea
							id='description'
							name='description'
							className='border rounded w-full py-2 px-3 h-24'
							placeholder='Enter a room name'
							required 
						/>
					</div>

					<div className="mb-4">
						<label 
							className="block text-gray-700 font-bold mb-2"
							htmlFor='sqft'
						>
							Square Feet
						</label>
						<input 
							type="number"
							id='sqft'
							name='sqft'
							className='border rounded w-full py-2 px-3'
							placeholder='Enter room size in ft'
							required 
						/>
					</div>

					<div className="mb-4">
						<label 
							className="block text-gray-700 font-bold mb-2"
							htmlFor='capacity'
						>
							Capacity
						</label>
						<input 
							type="number"
							id='capacity'
							name='capacity'
							className='border rounded w-full py-2 px-3'
							placeholder='Number of people'
							required 
						/>
					</div>

					<div className="mb-4">
						<label 
							className="block text-gray-700 font-bold mb-2"
							htmlFor='price_per_hour'
						>
							Price Per Hour
						</label>
						<input 
							type="number"
							id='price_per_hour'
							name='price_per_hour'
							className='border rounded w-full py-2 px-3'
							placeholder='Enter price per hour'
							required 
						/>
					</div>

					<div className="mb-4">
						<label 
							className="block text-gray-700 font-bold mb-2"
							htmlFor='address'
						>
							Address
						</label>
						<input 
							type="text"
							id='address'
							name='address'
							className='border rounded w-full py-2 px-3'
							placeholder='Enter a full address'
							required 
						/>
					</div>

					<div className="mb-4">
						<label 
							className="block text-gray-700 font-bold mb-2"
							htmlFor='location'
						>
							Location
						</label>
						<input 
							type="text"
							id='location'
							name='location'
							className='border rounded w-full py-2 px-3'
							placeholder='Location (Building, Floor, Room)'
							required 
						/>
					</div>

					<div className="mb-4">
						<label 
							className="block text-gray-700 font-bold mb-2"
							htmlFor='availability'
						>
							Availability
						</label>
						<input 
							type="text"
							id='availability'
							name='availability'
							className='border rounded w-full py-2 px-3'
							placeholder='Availability (Monday - Friday, 9am - 5pm)'
							required 
						/>
					</div>

					<div className="mb-4">
						<label 
							className="block text-gray-700 font-bold mb-2"
							htmlFor='amenities'
						>
							Amenities
						</label>
						<input 
							type="text"
							id='amenities'
							name='amenities'
							className='border rounded w-full py-2 px-3'
							placeholder='Amenities CSV (projector, whiteboard, etc.)'
							required 
						/>
					</div>

					<div className="mb-8">
						<label 
							className="block text-gray-700 font-bold mb-2"
							htmlFor='image'
						>
							Image
						</label>
						<input 
							type="file"
							id='image'
							name='image'
							className='border rounded w-full py-2 px-3'
						/>
					</div>

					<div className='flex flex-col gap-5'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              Save
            </button>
          </div>
				</form>
			</div>
		</>
	)
}

export default AddRoomPage


