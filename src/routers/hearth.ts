import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';

export const CheckHearth: FastifyPluginCallbackZod = async (app) => {
	app.get('/hearth', async (_, reply) => {
		reply.status(200).send('ok');
	});
};
