import journalApi from '@/api/journalApi'

export const loadEntries = async ({commit}) => {
	const { data } = await journalApi.get('/entries.json')
	if(!data){
		commit('setEntries', [])
		return
	}
	const entries = []
	for(let id of Object.keys(data)){
		entries.push({
			id,
			...data[id]
		})
	}
	commit('setEntries', entries)
}

export const updateEntry = async({commit}, entry) => {
	const { id, ...rest} = entry
	const dataToSave = { ...rest }
	const resp = await journalApi.put(`/entries/${entry.id}.json`, dataToSave)
	commit('updateEntry', { ...entry }) 
	// { ...entry } es para que no lo pase por referencia porque sino al modificaro 
	// intentaría modificar el state directamente y no se permite
}

export const createEntry = async({commit}, entry) => {
	const { data } = await journalApi.post(`/entries.json`, entry)
	entry.id = data.name
	commit('addEntry', { ...entry }) 
	return entry.id
}

export const deleteEntry = async({commit}, id) => {
	const resp = await journalApi.delete(`/entries/${id}.json`)
	commit('deleteEntry', id)
	return id
}

// export const myAction = async({commit}) => {

// }