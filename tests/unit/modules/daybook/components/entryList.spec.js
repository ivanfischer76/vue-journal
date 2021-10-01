// import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'
import { createStore } from "vuex"
import { shallowMount } from "@vue/test-utils"
import journal from '@/modules/daybook/store/journal'
import EntryList from '@/modules/daybook/components/EntryList'
import { journalState } from '../../../mock-data/test-journal-state'

const createVuexStore = ( initialState ) => createStore({
	modules: {
		journal: {
			...journal,
			state: { ...initialState}
		}
	}
})

describe('Pruebas en el EntryList', () => {
	// const journalMockModule = {
	// 	namespaced: true,
	// 	getters: {
	// 		// getEntriesByTerm: jest.fn()
	// 		getEntriesByTerm
	// 	},
	// 	state: () => ({
	// 		isLoading: false,
	// 		entries: journalState.entries
	// 	})
	// }	
	// const store = createStore({
	// 	modules: {
	// 		journal: { ...journalMockModule }
	// 	}
	// })
	const store = createVuexStore ( journalState )
	const mockRouter = {
		push: jest.fn()
	}
	let wrapper 
	beforeEach(() => {
		jest.clearAllMocks()
		wrapper = shallowMount( EntryList, {
			global: {
				mocks: {
					$router: mockRouter
				},
				plugins: [ store ]
			}
		})
	})

	test('debe llamar el getEntriesByTerm sin término y mostrar 5 entradas', () => {
		expect(wrapper.findAll('entry-stub').length).toBe(2)
		expect(wrapper.html()).toMatchSnapshot()
	})

	test('debe llamar al getEntriesByTerm y filtrar las entradas', async() => {
		const input = wrapper.find('input')
		await input.setValue('segunda')
		expect(wrapper.findAll('entry-stub').length).toBe(1)
	})

	test('el botón de nuevo debe redireccionar a /new', () => {
		wrapper.find('button').trigger('click')
		expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new'} })
	})
})