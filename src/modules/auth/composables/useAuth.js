import { useStore } from 'vuex'
import { computed } from 'vue'

const useAuth = () => {
	const store = useStore()

	const checkAuthStatus = async() => {
		const resp = await store.dispatch('auth/checkAuthentication')
		return resp
	}
	
	const createUser = async(user) => {
		const resp = await store.dispatch('auth/createUser', user)
		return resp
	}

	const loginUser = async(user) => {
		const resp = await store.dispatch('auth/signInUser', user)
		return resp
	}

	const logout = () => {
		store.commit('auth/logout')
		//limpiar entradas
		store.commit('journal/clearEntries')
	}

	return {
		checkAuthStatus,
		createUser,
		loginUser,
		logout,

		authStatus: computed(() => store.getters['auth/currentState']),
		username: computed(() => store.getters['auth/username'])
	}
}

export default useAuth