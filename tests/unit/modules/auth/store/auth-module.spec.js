import axios from 'axios'
import createVuexStore from '../../../mock-data/mock-store'

describe('Vuex: Pruebas en el auth-module', () => {
	test('estado inicial', () => {
		const store = createVuexStore({
			idToken: null,
			refreshToken: null,
			status: 'authenticating', //'authenticated', 'not'authenticated', 'authenticating'
			user: null
		})
		const { idToken, refreshToken, status, user } = store.state.auth
		expect(idToken).toBe(null)
		expect(refreshToken).toBe(null)
		expect(status).toBe('authenticating')
		expect(user).toBe(null)
	})

	//mutations
	test('Mutations: loginUser', () => {
		//estado inicial
		const store = createVuexStore({
			idToken: null,
			refreshToken: null,
			status: 'authenticating', //'authenticated', 'not'authenticated', 'authenticating'
			user: null
		})
		const payload = {
			user: { name: 'test', email: 'test@test.com' },
			idToken: 'abcd-1234',
			refreshToken: 'xyz-123'
		}
		store.commit('auth/loginUser', payload )
		const { idToken, refreshToken, status, user } = store.state.auth
		expect(idToken).toBe('abcd-1234')
		expect(refreshToken).toBe('xyz-123')
		expect(status).toBe('authenticated')
		expect(user).toEqual({ name: 'test', email: 'test@test.com' })
	})

	test('Mutations: logout', () => {
		localStorage.setItem('idToken', 'abc-123')	
		localStorage.setItem('refreshToken', 'xyz-456')		
		//estado inicial
		const store = createVuexStore({
			idToken: 'abcd-1234',
			refreshToken: 'xyz-123',
			status: 'authenticated', //'authenticated', 'not'authenticated', 'authenticating'
			user: { name: 'test', email: 'test@test.com' }
		})
		store.commit('auth/logout' )
		const { idToken, refreshToken, status, user } = store.state.auth
		expect(idToken).toBe(null)
		expect(refreshToken).toBe(null)
		expect(status).toBe('not-authenticated')
		expect(user).toBeFalsy()
		expect(localStorage.getItem('idToken')).toBeFalsy()
		expect(localStorage.getItem('refreshToken')).toBeFalsy()
	})

	//Getters
	test('Getter: username, currentState', () => {
		//estado inicial
		const store = createVuexStore({
			idToken: 'abcd-1234',
			refreshToken: 'xyz-123',
			status: 'authenticated', //'authenticated', 'not'authenticated', 'authenticating'
			user: { name: 'test', email: 'test@test.com' }
		})
		expect(store.getters['auth/currentState']).toBe('authenticated')	
		expect(store.getters['auth/username']).toBe('test')	
	})

	//Actions
	test('Actions: createUser - Error usuario ya existe', async() => {
		//estado inicial
		const store = createVuexStore({
			idToken: null,
			refreshToken: null,
			status: 'not-authenticated', //'authenticated', 'not'authenticated', 'authenticating'
			user: null
		})
		const newUser = { name: 'User Test', email: 'test@test.com', password: '123456' }
		const resp = await store.dispatch('auth/createUser', newUser)
		expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' })
		// comprobar que todo sigue igual en el state del storage
		const { idToken, refreshToken, status, user } = store.state.auth
		expect(idToken).toBe(null)
		expect(refreshToken).toBe(null)
		expect(status).toBe('not-authenticated')
		expect(user).toBeFalsy()
	})

	test('Actions: reateUser signInUser - Crea el usuario', async() => {
		//estado inicial
		const store = createVuexStore({
			idToken: null,
			refreshToken: null,
			status: 'not-authenticated', //'authenticated', 'not'authenticated', 'authenticating'
			user: null
		})
		const newUser = { name: 'Test User', email: 'test2@test.com', password: '123456' }
		// SignIn
		await store.dispatch('auth/signInUser', newUser)
		const { idToken } = store.state.auth
		// borrar el usuario
		const url = process.env.BASE_AUTH_URL+':delete?key='+process.env.API_KEY_FIREBASE_AUTH
		const deleteResp = await axios.post( url, {
			idToken
		})
		// crear el usuario
		const resp = await store.dispatch('auth/createUser', newUser)
		expect(resp).toEqual({ ok: true })
		const { idToken:token, refreshToken, status, user } = store.state.auth
		expect(typeof token).toBe('string')
		expect(typeof refreshToken).toBe('string')
		expect(status).toBe('authenticated')
		expect(user).toMatchObject({ name: 'Test User', email: 'test2@test.com' })

	})

	test('Actions: checkAuthentication - POSITIVA', async() => {
		//estado inicial
		const store = createVuexStore({
			idToken: null,
			refreshToken: null,
			status: 'not-authenticated', //'authenticated', 'not'authenticated', 'authenticating'
			user: null
		})
		// SignIn
		await store.dispatch('auth/signInUser', { email: 'test@test.com', password: '123456' })
		const { idToken, refreshToken } = store.state.auth
		store.commit('auth/logout')
		localStorage.setItem('idToken', idToken)
		localStorage.setItem('refreshToken', refreshToken)
		const checkResp = await store.dispatch('auth/checkAuthentication')
		const { idToken:token, refreshToken:rtoken, status, user } = store.state.auth
		expect(checkResp).toEqual({ ok: true })
		expect(typeof token).toBe('string')
		expect(typeof rtoken).toBe('string')
		expect(status).toBe('authenticated')
		expect(user).toMatchObject({ name: 'User Test', email: 'test@test.com' })
	})

	test('Actions: checkAuthentication - NEGATIVA', async() => {
		//estado inicial
		const store = createVuexStore({
			idToken: null,
			refreshToken: null,
			status: 'authenticating', //'authenticated', 'not'authenticated', 'authenticating'
			user: null
		})
		//purgamos el localStorage
		localStorage.removeItem('idToken')
		localStorage.removeItem('refreshTokenToken')
		//disparamos la acción
		const checkResp1 = await store.dispatch('auth/checkAuthentication')
		expect(checkResp1).toEqual({ ok: false, message: 'No hay token' })
		expect(store.state.auth.status).toBe('not-authenticated')
		localStorage.setItem('idToken', 'abc-123')
		const checkResp2 = await store.dispatch('auth/checkAuthentication')
		expect(checkResp1).toEqual({ ok: false, message: 'No hay token' })
		expect(store.state.auth.status).toBe('not-authenticated')
	})
})