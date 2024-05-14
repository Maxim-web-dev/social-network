import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

import { useAuthStore } from '@/app/stores/auth'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components'

export const Verify = () => {
	const [code, setCode] = useState('')
	const [error, setError] = useState(false)
	const { isLoggedIn, email, fetchVerifyCode, setLoggedIn, name, username } = useAuthStore()

	const navigate = useNavigate()
	const isSetup = Boolean(name !== null && username !== null )
	
	if (isLoggedIn && isSetup) {
		return <Navigate to='/home' />
	} else if (isLoggedIn && !isSetup) {
		return <Navigate to='/setup' />
	}

	const goBack = () => navigate('/login')

	const sendCode = async () => {
		try {
			const { token, isNewUser }  = await fetchVerifyCode(code, email)
			localStorage.setItem('token', token)
			
			if (isNewUser === true) {
				navigate('/setup')
			} else { 
				setLoggedIn(true)
			}
		} catch (error) {
			console.log(error)
			setError(true)
		}
	}
	if (code.length === 6) sendCode()
	return (
		<div>
			<div className='w-full h-[100vh] flex justify-center items-center'>
				<div className='w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow'>
					<div className='flex flex-col space-y-1.5 p-6'>
						<div className='flex items-center'>
							<button onClick={goBack}>
								<ChevronLeft size={23} className='mr-1' />
							</button>
							<h3 className='text-2xl font-semibold leading-none tracking-tight'>
								Вход
							</h3>
						</div>
						<p className='text-sm text-muted-foreground'>
							Введите код, который мы отправили вам.
						</p>
					</div>
					<div className='flex flex-col items-center justify-center w-full p-6 pt-0'>
						<InputOTP maxLength={6} value={code} onChange={setCode}>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
							</InputOTPGroup>
							<InputOTPSeparator />
							<InputOTPGroup>
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
						{error && (
							<p className='text-sm text-red-500 mt-2'>Неправильный код</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
