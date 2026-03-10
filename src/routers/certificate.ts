import { deleteCertificate } from '@/controllers/delete-certificate.js';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { getCertificate } from '@/controllers/get-certificates.js';
import { registerCertificates } from '@/controllers/register-certificate.js';
import { z } from 'zod/v4';

const RegisterCertificatesRouterSchema = {
	schema: {
		body: z.object({
			title: z.string().min(5),
			description: z.string().min(14),
			emission_data: z.coerce.date(),
			link: z.string().url(),
			order: z.coerce.number(),
		}),
	},
};

export const registerCertificatesRouter: FastifyPluginCallbackZod = async (app) => {
	app.post('/certificates', RegisterCertificatesRouterSchema, async (request, reply) => {
		const { title, description, emission_data, link, order } = request.body;
		const { certificatesId } = await registerCertificates({
			title,
			description,
			emission_data,
			link,
			order,
		});
		return reply.status(201).send({
			certificatesId,
		});
	});
};

const GetCertificatesRouterSchema = {
	schema: {
		params: z.object({
			max: z.coerce.number().default(0),
		}),
	},
};

export const getCertificatesRouter: FastifyPluginCallbackZod = async (app) => {
	app
		.get('/certificates/:max', GetCertificatesRouterSchema, async (request, reply) => {
			const { max } = request.params;
			const { certificates } = await getCertificate(max);
			return reply.status(200).send({
				certificates,
			});
		})
		.get('/certificates', async (_, reply) => {
			const { certificates } = await getCertificate();

			return reply.status(200).send({
				certificates,
			});
		});
};

const DeleteCertificatesRouterSchema = {
	schema: {
		params: z.object({
			id: z.string(),
		}),
	},
};

export const deleteCertificatesRouter: FastifyPluginCallbackZod = async (app) => {
	app.delete('/certificates/:id', DeleteCertificatesRouterSchema, async (request, reply) => {
		const { id } = request.params;
		await deleteCertificate({ id });

		return reply.status(204).send('deleted');
	});
};
