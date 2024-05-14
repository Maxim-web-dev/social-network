import { FC, FormEvent, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/app/stores/auth'

export const Login: FC = () => {
	const [email, setEmail] = useState<string>('')
	const { isLoggedIn, fetchLogin } = useAuthStore()

	const navigate = useNavigate()
	if (isLoggedIn) return <Navigate to='/home' />

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			navigate('/verify')
			fetchLogin(email)
		} catch (error) {
			console.log(error)
			alert('Произошла ошибка')
		}
	}
	
	return (
		<form onSubmit={onSubmit}>
			<div className='w-full h-[100vh] flex justify-center items-center'>
				<div className='w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow'>
					<div className='flex flex-col space-y-1.5 p-6'>
						<h3 className='text-2xl font-semibold leading-none tracking-tight'>
							Вход
						</h3>
						<p className='text-sm text-muted-foreground'>
							Введите вашу почту. Мы отправим код для входа
						</p>
					</div>
					<div className='grid gap-4 p-6 pt-0'>
						<div className='grid gap-2'>
							<Input
								type='email'
								label='Email'
								isRequired
								size='sm'
								variant='bordered'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
					</div>
					<div className='flex items-center p-6 pt-0'>
						<Button type='submit' className='w-full' variant='light'>
							Войти
						</Button>
					</div>
				</div>
			</div>
		</form>
	)
}
