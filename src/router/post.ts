import { registerCertificates } from '@/controllers/register-certificate.js';
import { registerProject } from '@/controllers/register-project.js';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { registerTool } from '@/controllers/register-tool.js';
import { inviteEmail } from '@/controllers/invite-email.js';
import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

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

			const { toolId } = await registerTool(name, svg_url);

			return {
				toolId,
			};
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
					description: z.string().min(14),
					emission_data: z.string().date(),
					link: z.string().url(),
					order: z.number(),
				}),
			},
		},
		async (request) => {
			const { title, description, emission_data, link, order } = request.body;

			const { certificatesId } = await registerCertificates({
				title,
				description,
				emission_data,
				link,
				order,
			});

			return {
				certificatesId,
			};
		},
	);
}

export async function registerProjectsRouter(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/projects',
		{
			schema: {
				body: z.object({
					order: z.number(),
					name: z.string(),
					slug: z.string(),
					image_url: z.string(),
					tools: z.array(z.string()),
					description: z.string(),
					links: z.object({
						deploy: z.string().url(),
						repository: z.string().url(),
					}),
				}),
			},
		},
		async (request) => {
			const { slug, description, image_url, name, tools, links, order } = request.body;

			const { projectId } = await registerProject({
				order,
				slug,
				description,
				image_url,
				name,
				tools,
				links,
			});

			return {
				projectId,
			};
		},
	);
}

export async function inviteEmailRouter(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/invite-email',
		{
			schema: {
				body: z.object({
					email: z.string().email(),
					from_name: z.string().min(3),
					message: z.string().min(2),
				}),
			},
		},
		async (request) => {
			const { email, from_name, message } = request.body;

			await inviteEmail({
				email,
				from_name,
				message,
			});
		},
	);
}
