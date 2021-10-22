
import axios from 'axios'

const authApi = axios.create({
	// colocar la url de nuestro proyecto de firebase
	baseURL: process.env.VUE_APP_BASE_AUTH_URL,
	params: {
		key: process.env.VUE_APP_API_KEY_FIREBASE_AUTH
	}
})
// console.log(process.env.NODE_ENV)  //test durante testing
export default authApi