import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { getCertificate } from '@/controllers/get-certificates.js';
import { getProjects } from '@/controllers/get-projects.js';
import { getTools } from '@/controllers/get-tools.js';
import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function getToolsRoute(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get('/tools', async () => {
		const { tools } = await getTools();

		return {
			tools,
		};
	});
}

export async function getCertificatesRouter(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.get(
			'/certificates/:max',
			{
				schema: {
					params: z.object({
						max: z.coerce.number(),
					}),
				},
			},
			async (request) => {
				const { max } = request.params;

				const { certificates } = await getCertificate(max);

				return {
					certificates,
				};
			},
		)
		.get('/certificates', async () => {
			const { certificates } = await getCertificate();

			return {
				certificates,
			};
		});
}

export async function getProjectsRouter(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.get(
			'/projects/:max',
			{
				schema: {
					params: z.object({
						max: z.coerce.number(),
					}),
				},
			},
			async (request) => {
				const { max } = request.params;

				const { projects } = await getProjects(max);

				return {
					projects,
				};
			},
		)
		.get('/projects', async (request) => {
			const { projects } = await getProjects();

			return {
				projects,
			};
		});
}
