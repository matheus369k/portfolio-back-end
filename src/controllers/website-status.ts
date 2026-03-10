import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';

export async function createWebsiteViews() {
	const websiteViewsAlreadyCreated = await db.WebsiteStatus.countDocuments();

	if (websiteViewsAlreadyCreated > 0) {
		throw new ClientError('Already created');
	}

	const websiteViews = await db.WebsiteStatus.insertOne({});

	if (!websiteViews) {
		throw new ClientError('Error to try create website views');
	}
}

export async function getWebsiteViews() {
	const websiteViews = await db.WebsiteStatus.find({});

	if (!websiteViews) {
		throw new ClientError('Not found website views');
	}

	return { websiteViews };
}

export async function updateWebsiteViews() {
	const websiteViews = await db.WebsiteStatus.updateOne({ $inc: { views: 1 } });

	if (!websiteViews) {
		throw new ClientError('Error to try create website views');
	}
}
