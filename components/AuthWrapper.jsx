'use client'

import { AuthProvider } from '@/context/authContext';

export const AuthWrapper = ({ children }) => {
  return (
		<AuthProvider>
			{children}
		</AuthProvider>
	)
}
