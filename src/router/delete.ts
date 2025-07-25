import { deleteCertificate } from '@/controllers/delete-certificate.js';
import { deleteProject } from '@/controllers/delete-project.js';
import { deleteTool } from '@/controllers/delete-tool.js';
import type { FastifyPluginCallbackZod, FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';

export const deleteToolRouter: FastifyPluginCallbackZod = async (app) => {
	app.delete(
		'/tools/:id',
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			await deleteTool({ id });

			return reply.status(204).send('deleted');
		},
	);
};

export const deleteCertificatesRouter: FastifyPluginCallbackZod = async (app) => {
	app.delete(
		'/certificates/:id',
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			await deleteCertificate({ id });

			return reply.status(204).send('deleted');
		},
	);
};

export const deleteProjectsRouter: FastifyPluginCallbackZod = async (app) => {
	app.delete(
		'/projects/:id',
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			await deleteProject({ id });

			return reply.status(204).send('deleted');
		},
	);
};
