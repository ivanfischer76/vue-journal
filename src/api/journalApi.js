
import axios from 'axios'

const journalApi = axios.create({
	// colocar la url de nuestro proyecto de firebase
	baseURL: process.env.VUE_APP_BASE_URL
})

journalApi.interceptors.request.use( (config) => {
	config. params = {
		auth: localStorage.getItem('idToken')
	}
	return config
})


// console.log(process.env.NODE_ENV)  //test durante testing
export default journalApi