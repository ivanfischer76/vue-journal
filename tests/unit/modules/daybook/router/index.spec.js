import daybookRouter from '@/modules/daybook/router'

describe('Pruebas sobre el router modules del Daybook', () => {
	test('el router debe tener esta configuración', async() => {
		// comprueba que el objeto esté de esta manera, si cambiamos el orden la prueba falla
		expect(daybookRouter).toMatchObject({
			name: 'daybook',
			component: expect.any(Function),
			children: [
				{
					path: '',
					name: 'no-entry',
					component: expect.any(Function),
				},
				{
					path: ':id',
					name: 'entry',
					component: expect.any(Function),
					props: expect.any(Function)
				}
			]
		})
		// estático: las rutas deben estar definidas en ese orden
		// expect((await daybookRouter.children[0].component()).default.name).toBe('NoEntrySelected')
		// expect((await daybookRouter.children[1].component()).default.name).toBe('EntryView')
		// dinámico: las rutas puedene star definidas en cualquier orden, sólo se comprueban que estén, no importa el orden
		const promisesRoutes = []
		daybookRouter.children.forEach(child => promisesRoutes.push(child.component()))
		const routes = (await Promise.all(promisesRoutes)).map( r => r.default.name)
		expect(routes).toContain('EntryView')
		expect(routes).toContain('NoEntrySelected')
	})

	test('debe retornar el id de la ruta', () => {
		const route = {
			params: {
				id: 'abc123'
			}
		}
		// estático
		// expect(daybookRouter.children[1].props(route)).toEqual({ id: 'abc123' })
		// dinámico
		const entryRoute = daybookRouter.children.find(route => route.name === 'entry')
		expect(entryRoute.props(route)).toEqual({ id: 'abc123' })
	})
})