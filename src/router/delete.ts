import { deleteCertificate } from '@/controllers/delete-certificate.js';
import { deleteProject } from '@/controllers/delete-project.js';
import { deleteTool } from '@/controllers/delete-tool.js';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export async function deleteToolRouter(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().delete(
		'/tools/:id',
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (request) => {
			const { id } = request.params;

			await deleteTool({ id });
		},
	);
}

export async function deleteCertificatesRouter(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().delete(
		'/certificates/:id',
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (request) => {
			const { id } = request.params;

			await deleteCertificate({ id });
		},
	);
}

export async function deleteProjectsRouter(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().delete(
		'/projects/:id',
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (request) => {
			const { id } = request.params;

			await deleteProject({ id });
		},
	);
}
