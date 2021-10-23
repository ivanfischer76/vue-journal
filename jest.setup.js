// con este archivo y esta configuración las pruebas al router con el 
// options API van a fallar si la siguiente línea de jest.config.js no está comentada
// setupFilesAfterEnv: ['/media/ivan/datos/Proyectos/Udemy/Vuejs-fh/07-journal-app/jest.setup.js'],
// sino, se pueden hacer esta configuración en cada archivo de pruebas 
// del composition API que necesite del router

// si sólo se trabaja con el composition APi se puede generar este archivo y agregar la 
// siguiente línea al jest.setup.js para que quede definido de manera global
// setupFilesAfterEnv: ['/media/ivan/datos/Proyectos/Udemy/Vuejs-fh/07-journal-app/jest.setup.js'],

import {
	VueRouterMock,
	createRouterMock,
	injectRouterMock,
} from 'vue-router-mock'
import { config } from '@vue/test-utils'

// create one router per test file
const router = createRouterMock()
beforeEach(() => {
	injectRouterMock(router)
})

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock)