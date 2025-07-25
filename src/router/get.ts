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

export const getProjectsRouter: FastifyPluginCallbackZod = async (app) => {
	app
		.get(
			'/projects/:max',
			{
				schema: {
					params: z.object({
						max: z.coerce.number(),
					}),
				},
			},
			async (request, reply) => {
				const { max } = request.params;
				const { projects } = await getProjects(max);
				return reply.status(200).send({
					projects,
				});
			},
		)
		.get('/projects', async (request, reply) => {
			const { projects } = await getProjects();
			return reply.status(200).send({
				projects,
			});
		});
};
