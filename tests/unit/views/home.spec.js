import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'

describe('pruebas en el Home View', () => {
	test('debe renderizar el componente correctamente', () => {
		const wrapper = shallowMount(Home)
		expect(wrapper.html()).toMatchSnapshot()
	})

	test('hacer click en un botón debe redireccionar a no-entry', () => {
		const mockRouter = {
			push: jest.fn()
		}
		const wrapper = shallowMount(Home, {
			global: {
				mocks: {
					$router: mockRouter
				}
			}
		})
		// estímulo
		wrapper.find('button').trigger('click')
		// resultado esperado
		expect(mockRouter.push).toHaveBeenCalled()
		expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})
	})
})