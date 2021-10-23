import { shallowMount } from '@vue/test-utils'
import Login from '@/modules/auth/views/Login.vue'
import createVuexStore from '../../../mock-data/mock-store'
import Swal from 'sweetalert2'

import {
	VueRouterMock,
	createRouterMock,
	injectRouterMock,
} from 'vue-router-mock'
import { config } from '@vue/test-utils'

// create one router per test file
const router = createRouterMock()
beforeEach(() => {
	injectRouterMock(router)
})

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock)

jest.mock('sweetalert2', () => ({
	fire: jest.fn(),
	showLoading: jest.fn(),
	close: jest.fn()
}))

describe('Pruebas en el Login Component', () => {

	const store = createVuexStore({
		idToken: null,
		refreshToken: null,
		status: 'not-authenticated', //'authenticated', 'not'authenticated', 'authenticating'
		user: null
	})

	store.dispatch = jest.fn()

	beforeEach(() => jest.clearAllMocks())

	test('debe hacer match con el snapshot', () => {
		const wrapper = shallowMount( Login, {
			global: {
				plugins: [ store ]
			}
		})
		expect(wrapper.html()).toMatchSnapshot()
	})

	test('credenciales incorrectas, deben disparar el Swal', async() => {
		store.dispatch.mockReturnValueOnce({ ok: false, message: 'Error en credenciales' })
		const wrapper = shallowMount( Login, {
			global: {
				plugins: [ store ]
			}
		})
		await wrapper.find('form').trigger('submit')
		expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', {email: '', password: ''})
		expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error en credenciales', 'error')
	})

	test('credenciales correctas, debe redirigir a la ruta no-entry', async() => {
		store.dispatch.mockReturnValueOnce({ ok: true })
		const wrapper = shallowMount( Login, {
			global: {
				plugins: [ store ]
			}
		})
		const [ txtEmail, txtPassword ] = wrapper.findAll('input')
		await txtEmail.setValue('test@test.com')
		await txtPassword.setValue('123456')
		await wrapper.find('form').trigger('submit')
		expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', {email: 'test@test.com', password: '123456'})
		expect(wrapper.router.push).toHaveBeenCalledWith({name: 'no-entry'})
	})
})

