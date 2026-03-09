import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { getCertificate } from '@/controllers/get-certificates.js';
import { getProjects } from '@/controllers/get-projects.js';
import { getTools } from '@/controllers/get-tools.js';
import { z } from 'zod/v4';

export const CheckHealth: FastifyPluginCallbackZod = async (app) => {
	app.get('/hearth', async (_, reply) => {
		reply.status(200).send('ok');
	});
};

export const getToolsRoute: FastifyPluginCallbackZod = async (app) => {
	app.get('/tools', async (_, reply) => {
		const { tools } = await getTools();
		return reply.status(200).send({
			tools,
		});
	});
};

export const getCertificatesRouter: FastifyPluginCallbackZod = async (app) => {
	app
		.get(
			'/certificates/:max',
			{
				schema: {
					params: z.object({
						max: z.coerce.number().default(0),
					}),
				},
			},
			async (request, reply) => {
				const { max } = request.params;
				const { certificates } = await getCertificate(max);
				return reply.status(200).send({
					certificates,
				});
			},
		)
		.get('/certificates', async (_, reply) => {
			const { certificates } = await getCertificate();

			return reply.status(200).send({
				certificates,
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
		const { projects } = await getProjects(request.query);

		return reply.status(200).send({
			projects,
		});
	});
};
