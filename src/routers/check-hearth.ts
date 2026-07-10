import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'

class CheckHearthRoutes {
	isOn: FastifyPluginCallbackZod = async (app) => {
		app.get('/hearth', async (_, reply) => {
			reply.status(200).send('server on...')
		})
	}
}

const checkHearthRoutes = new CheckHearthRoutes()
export default checkHearthRoutes
