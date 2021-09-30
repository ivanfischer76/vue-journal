
import axios from 'axios'

const journalApi = axios.create({
	// colocar la url de nuestro proyecto de firebase
	baseURL: ''
})

export default journalApi