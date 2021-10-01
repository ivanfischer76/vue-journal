import { createStore } from "vuex"
import { shallowMount } from "@vue/test-utils"
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'
import EntryView from '@/modules/daybook/views/EntryView'
import Swal from  'sweetalert2'

const createVuexStore = ( initialState ) => createStore({
	modules: {
		journal: {
			...journal,
			state: { ...initialState}
		}
	}
})

jest.mock('sweetalert2', () => ({
	fire: jest.fn(),
	showLoading: jest.fn(),
	close: jest.fn()
}))

describe('Pruebas en el EntryView', () => {
	const store = createVuexStore ( journalState )
	store.dispatch = jest.fn() //evita que se disparen los dispatch y borren cosas
	const mockRouter = {
		push: jest.fn()
	}
	let wrapper 
	beforeEach(() => {
		jest.clearAllMocks()
		wrapper = shallowMount( EntryView, {
			props: {
				id: '-MkrF2ex-rNJra06xK24'
			},
			global: {
				mocks: {
					$router: mockRouter
				},
				plugins: [ store ]
			}
		})
	})

	test('debe sacar al usuario porque el id no existe', () => {
		const wrapper = shallowMount( EntryView, {
			props: {
				id: 'Este ID no existe en el store'
			},
			global: {
				mocks: {
					$router: mockRouter
				},
				plugins: [ store ],
			}
		})
		expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
	})

	test('debe mostrar la entrada correctamente', () => {
		expect(wrapper.html()).toMatchSnapshot()
		expect(mockRouter.push).not.toHaveBeenCalled()
	})

	test('debe borrar la entrada y salir', (done) => {
		Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }))
		// estímulo
		wrapper.find('.btn-danger').trigger('click')
		// respuesta esperada	
		expect(Swal.fire).toHaveBeenCalledWith({
			title: '¿Está seguro?',
			text: 'Una ve borrado, no se puede recuperar',
			showDenyButton: true,
			confirmButtonText: 'Si, estoy seguro'
		})
		//el setTimeout resuelve un problema de tiempo de respuesta
		setTimeout( () => {
			expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-MkrF2ex-rNJra06xK24')
			expect(mockRouter.push).toHaveBeenCalled()
			done()
		}, 1000)
	})
})