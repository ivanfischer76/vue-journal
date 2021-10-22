import axios from 'axios'

const uploadImage = async(file) => {
	if(!file) return
	try{
		const formData = new FormData()
		formData.append('upload_preset', 'curso-vue-fh')
		formData.append('file', file)
		// cambiar 'demo' por el usuario de cloudinary
		const url = process.env.VUE_APP_IMAGE_URL
		const { data } = await axios.post(url, formData)

		return data.secure_url
	}catch(error){
		console.error('Error al cargar la imagen, revisar logs')
		console.log(error)
		return null
	}
}

export default uploadImage