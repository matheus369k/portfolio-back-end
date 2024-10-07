import { getTools } from '@/controllers/get-tools';
import type { FastifyInstance } from 'fastify';
import { db } from '@/models';
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

export async function registerToolsRouter(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/tools',
		{
			schema: {
				body: z.object({
					name: z.string(),
					svg_url: z.string().url(),
				}),
			},
		},
		async (request) => {
			const { name, svg_url } = request.body;
			await db.Tools.create({
				name,
				svg_url,
			});
		},
	);
}

export async function registerCertificatesRouter(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/certificates',
		{
			schema: {
				body: z.object({
					title: z.string().min(5),
					validation_code: z.string().min(14),
					image_url: z.string().url(),
					verification_url: z.string().url(),
				}),
			},
		},
		async (request) => {
			const { image_url, title, validation_code, verification_url } = request.body;
			await db.Certificates.create({
				title,
				image_url,
				validation_code,
				verification_url,
			});
		},
	);
}

export async function registerProjectsRouter(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/projects',
		{
			schema: {
				body: z.object({
					slug: z.string(),
					name: z.string(),
					images_url: z.object({
						png: z.string(),
						gif: z.string(),
					}),
					tools: z.array(z.string()),
					description: z.string(),
				}),
			},
		},
		async (request) => {
			const { slug, description, images_url, name, tools } = request.body;

			await db.Projects.create({
				name,
				slug,
				tools,
				images_url,
				description,
			});
		},
	);
}
