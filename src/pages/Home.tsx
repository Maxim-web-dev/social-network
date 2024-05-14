import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthStore } from '@/app/stores/auth'

export const Home: FC = () => {
	const { email, name, username, isLoggedIn, logOut } = useAuthStore()
	console.log(email, name, username);

	if (!isLoggedIn) return <Navigate to='/login' />
	return (
		<div className='w-full h-[100vh]'>
			<button onClick={() => logOut()}>Выйти</button>
			{email}
			{name}
			{username}
		</div>
	)
}
