import authApi from '@/api/authApi'

export const checkAuthentication = async({commit}) => {
	const idToken = localStorage.getItem('idToken')
	const refreshToken = localStorage.getItem('refreshToken')

	if(!idToken){
		commit('logout')
		return {
			ok: false,
			message: 'No hay token'
		}
	}

	try {
		const { data } = await authApi.post(':lookup', { idToken })
		const { displayName, email } = data.users[0]
		const user = {
			name: displayName,
			email
		}
		commit('loginUser', { user, idToken, refreshToken })
		return { ok: true }
	} catch (error) {
		commit('logout')
		return {
			ok:false,
			message: error.response.data.error.message
		}
	}
}

export const createUser = async({commit}, user) => {
	const { name, email, password } = user
	try {
		// registrar el usuario en firebase
		const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true })
		const { idToken, refreshToken } = data
		// actualizar el nombre del usuario en firebase
		const resp = await authApi.post(':update', { displayName: name , idToken })
		// eliminamos el password para que no quede guardado en el state
		delete user.password
		commit('loginUser', { user, idToken, refreshToken })
		return { ok: true }
	} catch (error) {
		return { ok: false, message: error.response.data.error.message }
	}
}

export const signInUser = async({commit}, user) => {
	const { email, password } = user
	try {
		// registrar el usuario en firebase
		const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true })
		const { displayName, idToken, refreshToken } = data
		user.name = displayName
		commit('loginUser', { user, idToken, refreshToken })
		return { ok: true }
	} catch (error) {
		return { ok: false, message: error.response.data.error.message }
	}
}




// export const myAction = async({commit}) => {

// }