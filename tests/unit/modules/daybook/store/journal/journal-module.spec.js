import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'
import authApi from '@/api/authApi'


const createVuexStore = ( initialState ) => createStore({
	modules: {
		journal: {
			...journal,
			state: { ...initialState}
		}
	}
})	

describe('Vuex - Pruebas en el Journal Module', () => {

	beforeAll( async() => {
		const { data } = await authApi.post(':signInWithPassword', {
			email: 'test@test.com',
			password: '123456',
			returnSecureToken: true
		})
		localStorage.setItem('idToken', data.idToken)
	})


	//Básicas
	test('este es el estado inicial, debe tener este state', () => {
		const store = createVuexStore( journalState )
		const { isLoading, entries } = store.state.journal
		expect(isLoading).toBeFalsy()
		expect(entries).toEqual(journalState.entries)

	})
	// Mutations =======================================
	// setEntry
	test('mutation: setEntries', () => {
		const store = createVuexStore({ isLoading: true, entries: [] })
		store.commit('journal/setEntries', journalState.entries)
		expect(store.state.journal.entries.length).toBe(2)
		expect(store.state.journal.isLoading).toBeFalsy()
	})
	// updateEntry
	test('mutation: updateEntry', () => {
		const store = createVuexStore( journalState )
		const updatedEntry	 = {
			id: '-MkskN2KlHH3gxLfg3H5',
			date: 1633039767044,
			text: 'hola mundo desde pruebas'
		}
		store.commit('journal/updateEntry', updatedEntry)
		expect(store.state.journal.entries.length).toBe(2)
		expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)
	})
	// addEntry y deleteEntry
	test('mutation: addEntry y deleteEntry', () => {
		const store = createVuexStore( journalState )
		const newEntry	 = { id: 'abc-123',	text: 'hola mundo' }
		store.commit('journal/addEntry', newEntry)
		expect(store.state.journal.entries.length).toBe(3)
		expect(store.state.journal.entries.find(e => e.id === 'abc-123')).toBeTruthy()
		store.commit('journal/deleteEntry', 'abc-123')
		expect(store.state.journal.entries.length).toBe(2)
		expect(store.state.journal.entries.find(e => e.id === 'abc-123')).toBeFalsy()
	})
	// Getters ====================================
	test('getters: getEntriesByTerm getEntryById', () => {
		const store = createVuexStore( journalState )
		const [entry1, entry2] = journalState.entries
		expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
		expect(store.getters['journal/getEntriesByTerm']('segunda').length).toBe(1)
		expect(store.getters['journal/getEntriesByTerm']('segunda')).toEqual([entry2])
		expect(store.getters['journal/getEntriesById'](entry1.id)).toEqual(entry1)
	})
	// Actions =====================================
	// loadEntries
	test('actions: loadEntries', async() => {
		const store = createVuexStore({ isLoading: true, entries: [] })
		// estímulo
		await store.dispatch('journal/loadEntries')
		//resultados esperados
		expect(store.state.journal.entries.length).toBe(5)
	})
	//updateEntry
	test('actions: updateEntry', async() => {
		const store = createVuexStore( journalState )
		const updatedEntry = {
			id: '-MkskN2KlHH3gxLfg3H5',
			date: 1633039767044,
			text: 'nuevo cambio',
			otroCampo: true,
			otroMas: { id: 1, name: 'blabla' }
		}
		await store.dispatch('journal/updateEntry', updatedEntry)
		expect(store.state.journal.entries.length).toBe(2)
		expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual({
			id: '-MkskN2KlHH3gxLfg3H5',
			date: 1633039767044,
			text: 'nuevo cambio',
		})
	})
	//createEntry y deleteEntry
	test('actions: createEntry y deleteEntry', async() => {
		const store = createVuexStore( journalState )
		const newEntry = { date: 1633039767044, text: 'Nueva entrada desde las pruebas' }
		// createEntry
		const id = await store.dispatch('journal/createEntry', newEntry)
		expect(typeof id).toBe('string')
		expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy()
		// deleteEntry
		await store.dispatch('journal/deleteEntry', id)
		expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy()
	})
})