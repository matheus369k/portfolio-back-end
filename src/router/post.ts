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
					validation_code: z.string().min(14),
					image_url: z.string().url(),
					verification_url: z.string().url(),
				}),
			},
		},
		async (request) => {
			const { image_url, title, validation_code, verification_url } = request.body;

			const { certificatesId } = await registerCertificates({
				image_url,
				title,
				validation_code,
				verification_url,
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
					name: z.string(),
					slug: z.string(),
					images_url: z.object({
						png: z.string(),
						gif: z.string(),
					}),
					tools: z.array(z.string()),
					description: z.string(),
					links: z.object({
						deploy: z.string().url(),
						repository: z.string().url(),
					})
				}),
			},
		},
		async (request) => {
			const { slug, description, images_url, name, tools, links } = request.body;

			const { projectId } = await registerProject({
				slug,
				description,
				images_url,
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
