
import axios from 'axios'

const journalApi = axios.create({
	baseURL: 'https://vue-demos-88b93-default-rtdb.firebaseio.com'
})

export default journalApi