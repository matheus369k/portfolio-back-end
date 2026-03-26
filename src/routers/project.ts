import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import * as controllers from '@/controllers/project.js';
import { z } from 'zod/v4';

const RegisterProjectsRouterSchema = {
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
};

export const registerProjectsRouter: FastifyPluginCallbackZod = async (app) => {
	app.post('/projects', RegisterProjectsRouterSchema, async (request, reply) => {
		const { slug, description, image_url, name, tools, links, type } = request.body;
		const { projectId } = await controllers.registerProject({
			type,
			slug,
			description,
			image_url,
			name,
			tools,
			links,
		});
		return reply.status(201).send({
			projectId,
		});
	});
};

const getProjectsRouterSchema = {
	schema: {
		querystring: z.object({
			max: z.coerce.number().default(0),
			type: z.enum(['all', 'landing-page', 'full-stack']).default('all'),
		}),
	},
};

export const getProjectsRouter: FastifyPluginCallbackZod = async (app) => {
	app.get('/projects', getProjectsRouterSchema, async (request, reply) => {
		const { max, type } = request.query;
		const { projects } = await controllers.getProjects({ max, type });

		return reply.status(200).send({
			projects,
		});
	});
};

const UpdateProjectsPropertyIdRouterSchema = {
	schema: {
		body: z.object({
			property_id: z.coerce.number(),
		}),
		params: z.object({
			id: z.string(),
		}),
	},
};

export const updateProjectPropertyIdRouter: FastifyPluginCallbackZod = async (app) => {
	app.patch('/projects/:id', UpdateProjectsPropertyIdRouterSchema, async (request, reply) => {
		await controllers.updatePropertyIdProject({
			property_id: request.body.property_id,
			id: request.params.id,
		});

		return reply.status(201).send({ status: 'ok' });
	});
};

const DeleteProjectsRouterSchema = {
	schema: {
		params: z.object({
			id: z.string(),
		}),
	},
};

export const deleteProjectsRouter: FastifyPluginCallbackZod = async (app) => {
	app.delete('/projects/:id', DeleteProjectsRouterSchema, async (request, reply) => {
		const { id } = request.params;
		await controllers.deleteProject({ id });

		return reply.status(204).send('deleted');
	});
};
