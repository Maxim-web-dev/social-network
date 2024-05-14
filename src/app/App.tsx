import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'
import { useEffect } from 'react'
import { NextUIProvider } from '@nextui-org/react'

import { Home, Login, Setup, Verify } from '@/pages'
import { useAuthStore } from './stores/auth'

const App = () => {
	const { fetchMe } = useAuthStore()
  useEffect(() => {
    fetchMe()
  }, [])
	const routes = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/setup' element={<Setup />} />
				<Route path='/verify' element={<Verify />} />
			</>
		)
	)
	return (
		<NextUIProvider>
			<RouterProvider router={routes} />
		</NextUIProvider>
	)
}

export default App
