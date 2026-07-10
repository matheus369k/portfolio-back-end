import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { CertificatesControllers } from '@/controllers/certificate.js'
import models from '@/models/models'
import certificate from '@/models/schemas/certificate'

const CreateOneRouterSchema = {
	schema: {
		body: z.object({
			title: z.string().min(5),
			description: z.string().min(14),
			emission_data: z.coerce.date(),
			link: z.string().url(),
			order: z.coerce.number(),
		}),
	},
}

const GetWithLimiteRouterSchema = {
	schema: {
		params: z.object({
			max: z.coerce.number().default(0),
		}),
	},
}

const DeleteByIdRouterSchema = {
	schema: {
		params: z.object({
			id: z.string(),
		}),
	},
}

class CertificatesRoutes {
	private readonly baseRoute = '/certificates'
	private readonly certificatesControllers = new CertificatesControllers(
		models.Certificates(certificate),
	)

	createOne: FastifyPluginCallbackZod = async (app) => {
		app.post(this.baseRoute, CreateOneRouterSchema, async (request, reply) => {
			const { title, description, emission_data, link, order } = request.body
			const { certificatesId } = await this.certificatesControllers.createOne({
				emission_data,
				description,
				order,
				title,
				link,
			})
			return reply.status(201).send({
				certificatesId,
			})
		})
	}

	getAll: FastifyPluginCallbackZod = async (app) => {
		app.get(this.baseRoute, async (_, reply) => {
			const { certificates } = await this.certificatesControllers.getAll()

			return reply.status(200).send({
				certificates,
			})
		})
	}

	getWithLimite: FastifyPluginCallbackZod = async (app) => {
		app.get(`${this.baseRoute}/:max`, GetWithLimiteRouterSchema, async (request, reply) => {
			const { max } = request.params
			const { certificates } = await this.certificatesControllers.getWithLimite(max)
			return reply.status(200).send({
				certificates,
			})
		})
	}

	deleteById: FastifyPluginCallbackZod = async (app) => {
		app.delete(`${this.baseRoute}/:id`, DeleteByIdRouterSchema, async (request, reply) => {
			const { id } = request.params
			await this.certificatesControllers.deleteById({ id })

			return reply.status(204).send('deleted')
		})
	}
}

const certificatesRoutes = new CertificatesRoutes()
export default certificatesRoutes
