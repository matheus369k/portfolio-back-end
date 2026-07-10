import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import * as controllers from '@/controllers/project.js'
import { z } from 'zod/v4'
import models from '@/models/models'
import project from '@/models/schemas/project'
import { ordinationProjectsForViews } from '@/util/ordination-projects-for-views'
import { getAndAddProjectsViews } from '@/util/get-projects-views'

const CreateOneProjectRouterSchema = {
	schema: {
		body: z.object({
			name: z.string(),
			slug: z.string(),
			image_url: z.string(),
			tools: z.array(z.string()),
			description: z.string(),
			links: z.array(
				z.object({
					name: z.string(),
					link: z.url(),
				}),
			),
			type: z.string(),
		}),
	},
}

const GetForTypeProjectsRouterSchema = {
	schema: {
		querystring: z.object({
			max: z.coerce.number().default(0),
			type: z.enum(['all', 'landing-page', 'full-stack']).default('all'),
		}),
	},
}

const UpdatePropertyIdProjectRouterSchema = {
	schema: {
		body: z.object({
			property_id: z.coerce.number(),
		}),
		params: z.object({
			id: z.string(),
		}),
	},
}

const DeleteByIdProjectRouterSchema = {
	schema: {
		params: z.object({
			id: z.string(),
		}),
	},
}

class ProjectsRoutes {
	private readonly baseRoute = '/projects'
	private readonly projectsControllers = new controllers.ProjectsControllers(
		models.Projects(project),
	)

	createOne: FastifyPluginCallbackZod = async (app) => {
		app.post(this.baseRoute, CreateOneProjectRouterSchema, async (request, reply) => {
			const { slug, description, image_url, name, tools, links, type } = request.body
			const { projectId } = await this.projectsControllers.createOne({
				description,
				image_url,
				links,
				tools,
				type,
				slug,
				name,
			})
			return reply.status(201).send({
				projectId,
			})
		})
	}

	getForType: FastifyPluginCallbackZod = async (app) => {
		app.get(this.baseRoute, GetForTypeProjectsRouterSchema, async (request, reply) => {
			const { max, type } = request.query
			const { projects } = await this.projectsControllers.getForType({ max, type })

			const projectsWithTotalViews = await getAndAddProjectsViews(projects)
			const ordinationProjects = ordinationProjectsForViews(projectsWithTotalViews)

			return reply.status(200).send({
				projects: ordinationProjects,
			})
		})
	}

	updatePropertyId: FastifyPluginCallbackZod = async (app) => {
		app.patch(
			`${this.baseRoute}/:id`,
			UpdatePropertyIdProjectRouterSchema,
			async (request, reply) => {
				await this.projectsControllers.updatePropertyId({
					property_id: request.body.property_id,
					id: request.params.id,
				})

				return reply.status(201).send({ status: 'ok' })
			},
		)
	}

	deleteById: FastifyPluginCallbackZod = async (app) => {
		app.delete(`${this.baseRoute}/:id`, DeleteByIdProjectRouterSchema, async (request, reply) => {
			const { id } = request.params
			await this.projectsControllers.deleteById({ id })

			return reply.status(204).send('deleted')
		})
	}
}

const projectsRoutes = new ProjectsRoutes()
export default projectsRoutes
