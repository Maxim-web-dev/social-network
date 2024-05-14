import { create } from 'zustand'
import axios from '../axios'

type Store = {
	isLoggedIn: boolean,
	email: string,
	username: string | null,
	name: string | null,
	fetchMe: () => Promise<any>,
	fetchLogin: (email: string) => Promise<any>,
	fetchVerifyCode: (code: string, email: string) => Promise<any>,
	fetchSetup: (email: string, username: string, name: string) => Promise<any>,
	setLoggedIn: (boolean: boolean) => void,
	logOut: () => void,
}

export const useAuthStore = create<Store>()(set => ({
	isLoggedIn: false,
	email: '',
	username: null,
	name: null,
	fetchMe: async () => {
		const token = localStorage.getItem('token')
		if (!token) return console.log('No token')
		if (token) console.log('Token:', token)

		const { data } = await axios.post('/me', { token })
		console.log(data);
		
		if (data.isValid === true) {
			set({ isLoggedIn: true, email: data.email, username: data.username, name: data.name })
		}
	},
	fetchLogin: async (email) => {
		await axios.post('/login', { email: email })
		set({ email })
	},
	fetchVerifyCode: async (code, email) => {
		const { data } = await axios.post('/code', { code, email })
		set({ isLoggedIn: true })
		return data
	},
	fetchSetup: async (email, username, name) => {
		await axios.post('/setup', { email, username, name })
		set({ isLoggedIn: true, email, username, name })
	},
	setLoggedIn: (boolean) => set({ isLoggedIn: boolean }),
	logOut: () => {
		localStorage.removeItem('token')
		set({ isLoggedIn: false, email: '', username: null, name: null })
	}
}))

// export const isSetup = () => Boolean(useAuthStore.getState().username !== null || useAuthStore.getState().name !== null)