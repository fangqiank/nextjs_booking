import {createContext, useContext, useState, useEffect} from 'react'
import { checkAuth } from '@/app/actions/checkAuth'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [currentUser, setcurrentUser] = useState(null)

	useEffect(() => {
		const checkAuthentication = async () => {
			const {isAuthenticated, user} = await checkAuth()
			// console.log(isAuthenticated);
			setIsAuthenticated(isAuthenticated)
			setcurrentUser(user)
		}
	
		checkAuthentication()
	}, [])
	
  return (
    <AuthContext.Provider 
			value={{
				isAuthenticated,
				setIsAuthenticated,
				currentUser,
				setcurrentUser
			}}
	>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
	const context = useContext(AuthContext)

	if(!context)
		throw new Error('useAuth must be used within AuthProvider')
	
	return context
}