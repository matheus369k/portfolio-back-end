import { getTools } from '@/controllers/get-tools';
import type { FastifyInstance } from 'fastify';
import z from 'zod';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { getCertificate } from '@/controllers/get-certificates';
import { getProjects } from '@/controllers/get-projects';


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
	app.withTypeProvider<ZodTypeProvider>().get(
		'/projects/:slug',
		{
			schema: {
				params: z.object({
					slug: z.string(),
				}),
			},
		},
		async (request) => {
			const { slug } = request.params;

			const { project } = await getProjects(slug);

			return {
				project,
			};
		},
	);
}
