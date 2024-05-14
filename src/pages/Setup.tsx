import { FC, FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'

import { useAuthStore,  } from '@/app/stores/auth'

export const Setup: FC = () => {
	const [nameField, setName] = useState<string>('')
	const [usernameField, setUsername] = useState<string>('')

	const { isLoggedIn, fetchSetup, email, name, username } = useAuthStore()
	const navigate = useNavigate()
	const isSetup = Boolean(name !== null && username !== null )
	
	if (isSetup) return <Navigate to='/home' />
	console.log(isSetup);
	

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await fetchSetup( email, nameField, usernameField )
			navigate('/home')
		} catch (error) {
			console.log(error)
			alert('Произошла ошибка')
		}
	}
	return (
		<div className='w-full h-[100vh] flex justify-center items-center'>
			<div className='rounded-xl border bg-card text-card-foreground shadow w-[30vw] p-5'>
				<form onSubmit={onSubmit} className='flex flex-col gap-5'>
					<Input
						label='Имя'
						isRequired
						value={nameField}
						onChange={e => setName(e.target.value)}
					/>
					<Input
						label='username'
						isRequired
						value={usernameField}
						onChange={e => setUsername(e.target.value)}
						startContent={
							<div className='pointer-events-none flex items-center'>
								<span className='text-default-900 text-small'>@</span>
							</div>
						}
					/>
					<Button type='submit' variant='light'>
						Готово
					</Button>
				</form>
			</div>
		</div>
	)
}
