import { getTools } from '@/controllers/get-tools';
import type { FastifyInstance } from 'fastify';
import { db } from '@/models';
import z from 'zod';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

export async function getToolsRoute(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get('/tools', async () => {
		const { tools } = await getTools();

		return {
			tools,
		};
	});
}

export async function registerToolsRouter(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post('/tools', async (request) => {
		const { name, svg_url } = request.body as { name: string; svg_url: string };
		await db.Tools.create({
			name,
			svg_url,
		});
	});
}
