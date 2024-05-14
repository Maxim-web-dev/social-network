import  { FC } from 'react'
import { Link } from 'react-router-dom'

export const Error: FC = () => {
	return (
		<div className='w-full h-[100vh] flex justify-center items-center'>
			<h1>Error!</h1>
			<Link to='/home'>Домой</Link>
		</div>
	)
}

