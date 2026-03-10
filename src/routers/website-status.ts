import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import * as controllers from '@/controllers/website-status.js';
import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

export const checkHearthRouter: FastifyPluginCallbackZod = async (app) => {
	app.get('/hearth', async (_, reply) => {
		reply.status(200).send('ok');
	});
};

export const createWebsiteViewsRouter: FastifyPluginCallbackZod = async (app) => {
	app.post('/website-views', async (_, reply) => {
		await controllers.createWebsiteViews();

		return reply.status(201).send({ status: 'ok' });
	});
};

export const getWebsiteViewsRouter: FastifyPluginCallbackZod = async (app) => {
	app.get('/website-views', async (_, reply) => {
		const { websiteViews } = await controllers.getWebsiteViews();

		return reply.send(websiteViews);
	});
};

export const updateWebsiteViewsRouter: FastifyPluginCallbackZod = async (app) => {
	app.patch('/website-views', async (_, reply) => {
		await controllers.updateWebsiteViews();

		return reply.status(201).send({ status: 'ok' });
	});
};
