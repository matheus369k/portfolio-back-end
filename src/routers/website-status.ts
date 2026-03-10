import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';

export const checkHearth: FastifyPluginCallbackZod = async (app) => {
	app.get('/hearth', async (_, reply) => {
		reply.status(200).send('ok');
	});
};

export const createWebsiteViews: FastifyPluginCallbackZod = async (app) => {
	app.post('/website-views', async (_, reply) => {
		const websiteViewsAlreadyCreated = await db.WebsiteStatus.countDocuments();

		if (websiteViewsAlreadyCreated > 0) {
			throw new ClientError('Already created');
		}

		const websiteViews = await db.WebsiteStatus.insertOne({});

		if (!websiteViews) {
			throw new ClientError('Error to try create website views');
		}

		return reply.status(201).send({ status: 'ok' });
	});
};

export const getWebsiteViews: FastifyPluginCallbackZod = async (app) => {
	app.get('/website-views', async (_, reply) => {
		const websiteViews = await db.WebsiteStatus.find({});

		if (!websiteViews) {
			throw new ClientError('Not found website views');
		}

		return reply.send(websiteViews);
	});
};

export const updateWebsiteViews: FastifyPluginCallbackZod = async (app) => {
	app.patch('/website-views', async (request, reply) => {
		const websiteViews = await db.WebsiteStatus.updateOne({ $inc: { views: 1 } });

		if (!websiteViews) {
			throw new ClientError('Error to try create website views');
		}

		return reply.status(201).send({ status: 'ok' });
	});
};
