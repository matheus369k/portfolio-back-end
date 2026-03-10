import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { registerTool } from '@/controllers/register-tool.js';
import { deleteTool } from '@/controllers/delete-tool.js';
import { getTools } from '@/controllers/get-tools.js';
import { z } from 'zod/v4';

const registerToolsRouterSchema = {
	schema: {
		body: z.object({
			category: z.enum(['front_end', 'back_end', 'another']),
			name: z.string(),
			svg_url: z.string().url(),
		}),
	},
};

export const registerToolsRouter: FastifyPluginCallbackZod = async (app) => {
	app.post('/tools', registerToolsRouterSchema, async (request, reply) => {
		const { name, svg_url, category } = request.body;
		const { toolId } = await registerTool({ name, svg_url, category });

		return reply.status(201).send({
			toolId,
		});
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

const deleteToolRouterSchema = {
	schema: {
		params: z.object({
			id: z.string(),
		}),
	},
};

export const deleteToolRouter: FastifyPluginCallbackZod = async (app) => {
	app.delete('/tools/:id', deleteToolRouterSchema, async (request, reply) => {
		const { id } = request.params;
		await deleteTool({ id });

		return reply.status(204).send('deleted');
	});
};
