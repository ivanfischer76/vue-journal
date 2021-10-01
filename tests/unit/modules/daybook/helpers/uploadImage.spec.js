import cloudinary from 'cloudinary'

import uploadImage from '@/modules/daybook/helpers/uploadImage'
import axios from 'axios'

cloudinary.config({
	cloud_name: '',
	api_key: '',
	api_secret: '',
})

describe('Pruebas en el uploadImage', () => {
	// test('debe cargar un archivo y retornar el url', async( done ) => {
	test('debe cargar un archivo y retornar el url', async() => {
		// tomamos un imagen de la web, en este caso de cloudinary
		// const { data } = await axios.get('https://res.cloudinary.com/demo/image/upload/v1618440070/samples/landscapes/nature-mountains.jpg', {
		// 	responseType: 'arraybuffer'
		// })
		// const file = new File([data], 'foto.jpg')
		// // con la imagen realizamos a prueba
		// const url = await uploadImage(file)
		// expect(typeof url).toBe('string')
		// quitar el archivo subido
		// const segments = url.split('/')
		// const imageId = segments[segments.length -1].replace('.jpg', '')
		// cloudinary.v2.api.delete_resources(imageId, {}, () => {
		// 	done()
		// })
	})
})