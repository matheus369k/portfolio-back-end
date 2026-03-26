import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { env } from '@/env.js';
import { googleProjectTotalViews } from '@/controllers/google-views.js';

export const checkHearthRouter: FastifyPluginCallbackZod = async (app) => {
	app.get('/hearth', async (_, reply) => {
		reply.status(200).send('ok');
	});
};

export const getWebsiteViewsRouter: FastifyPluginCallbackZod = async (app) => {
	app.get('/website-views', async (_, reply) => {
		const websitePropertyId = env.WEBSITE_PROPERTY_ID;
		if (!websitePropertyId) {
			throw new Error('not found google property from google analytics portfolio');
		}

		const { totalViews } = await googleProjectTotalViews(websitePropertyId);

		return reply.status(200).send({ accessTotal: totalViews });
	});
};
