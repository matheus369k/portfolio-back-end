import { registerCertificates } from '@/controllers/register-certificate.js';
import { registerProject } from '@/controllers/register-project.js';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { registerTool } from '@/controllers/register-tool.js';
import { inviteEmail } from '@/controllers/invite-email.js';
import { z } from 'zod/v4';

export const registerToolsRouter: FastifyPluginCallbackZod = async (app) => {
	app.post(
		'/tools',
		{
			schema: {
				body: z.object({
					category: z.enum(['front_end', 'back_end', 'another']),
					name: z.string(),
					svg_url: z.string().url(),
				}),
			},
		},
		async (request, reply) => {
			const { name, svg_url, category } = request.body;
			const { toolId } = await registerTool({ name, svg_url, category });
			return reply.status(201).send({
				toolId,
			});
		},
	);
};

export const registerCertificatesRouter: FastifyPluginCallbackZod = async (app) => {
	app.post(
		'/certificates',
		{
			schema: {
				body: z.object({
					title: z.string().min(5),
					description: z.string().min(14),
					emission_data: z.coerce.date(),
					link: z.string().url(),
					order: z.coerce.number(),
				}),
			},
		},
		async (request, reply) => {
			const { title, description, emission_data, link, order } = request.body;
			const { certificatesId } = await registerCertificates({
				title,
				description,
				emission_data,
				link,
				order,
			});
			return reply.status(201).send({
				certificatesId,
			});
		},
	);
};

export const registerProjectsRouter: FastifyPluginCallbackZod = async (app) => {
	app.post(
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
		async (request, reply) => {
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
			return reply.status(201).send({
				projectId,
			});
		},
	);
};

export const inviteEmailRouter: FastifyPluginCallbackZod = async (app) => {
	app.post(
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
		async (request, reply) => {
			const { email, from_name, message } = request.body;
			await inviteEmail({
				email,
				from_name,
				message,
			});
			return reply.status(201).send('ok');
		},
	);
};
