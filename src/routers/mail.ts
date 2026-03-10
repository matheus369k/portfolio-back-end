import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { inviteEmail } from '@/controllers/invite-email.js';
import { z } from 'zod/v4';

const InviteEmailRouterSchema = {
	schema: {
		body: z.object({
			email: z.string().email(),
			from_name: z.string().min(3),
			message: z.string().min(2),
		}),
	},
};

export const inviteEmailRouter: FastifyPluginCallbackZod = async (app) => {
	app.post('/invite-email', InviteEmailRouterSchema, async (request, reply) => {
		const { email, from_name, message } = request.body;
		await inviteEmail({
			email,
			from_name,
			message,
		});

		return reply.status(201).send('ok');
	});
};
