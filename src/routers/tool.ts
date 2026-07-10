import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import * as controllers from '@/controllers/tool.js'
import { z } from 'zod/v4'
import tool from '@/models/schemas/tool'
import models from '@/models/models'

const CreateOneToolRouterSchema = {
	schema: {
		body: z.object({
			category: z.enum(['front_end', 'back_end', 'another']),
			name: z.string(),
			svg_url: z.string().url(),
		}),
	},
}

const DeleteByIdToolRouterSchema = {
	schema: {
		params: z.object({
			id: z.string(),
		}),
	},
}

class ToolsRoutes {
	private readonly baseRoute = '/tools'
	private readonly toolsControllers = new controllers.ToolsControllers(models.Tools(tool))

	createOne: FastifyPluginCallbackZod = async (app) => {
		app.post(this.baseRoute, CreateOneToolRouterSchema, async (request, reply) => {
			const { name, svg_url, category } = request.body
			const { toolId } = await this.toolsControllers.createOne({
				category,
				svg_url,
				name,
			})

			return reply.status(201).send({
				toolId,
			})
		})
	}

	getAll: FastifyPluginCallbackZod = async (app) => {
		app.get(this.baseRoute, async (_, reply) => {
			const { tools } = await this.toolsControllers.getAll()

			return reply.status(200).send({
				tools,
			})
		})
	}

	deleteById: FastifyPluginCallbackZod = async (app) => {
		app.delete(`${this.baseRoute}/:id`, DeleteByIdToolRouterSchema, async (request, reply) => {
			const { id } = request.params
			await this.toolsControllers.deleteById({ id })

			return reply.status(204).send('deleted')
		})
	}
}

const toolsRoutes = new ToolsRoutes()
export default toolsRoutes
