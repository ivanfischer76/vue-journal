import cloudinary from 'cloudinary'

import uploadImage from '@/modules/daybook/helpers/uploadImage'
import axios from 'axios'

cloudinary.config({
	// éstas variables están declaradas en /tests/jest/setEnvVars.js, no en .env
	cloud_name: process.env.CLOUD_NAME, 
	api_key: process.env.API_KEY_CLOUDYNARY, 
	api_secret: process.env.API_SECRET_CLOUDINARY, 
})

describe('Pruebas en el uploadImage', () => {
	// test('debe cargar un archivo y retornar el url', async( done ) => {
	test('debe cargar un archivo y retornar el url', async( done ) => {
		// tomamos un imagen de la web, en este caso de cloudinary
		const { data } = await axios.get(process.env.IMAGE_CLOUDINARY, { 
			responseType: 'arraybuffer'
		})
		const file = new File([data], 'foto.jpg')
		// con la imagen realizamos a prueba
		const url = await uploadImage(file)
		expect(typeof url).toBe('string')
		// quitar el archivo subido
		const segments = url.split('/')
		const imageId = segments[segments.length -1].replace('.jpg', '')
		cloudinary.v2.api.delete_resources(imageId, {}, () => {
			done()
		})
	})
})