
import axios from 'axios'

const journalApi = axios.create({
	// colocar la url de nuestro proyecto de firebase
	baseURL: ''
})
// console.log(process.env.NODE_ENV)  //test durante testing
export default journalApi