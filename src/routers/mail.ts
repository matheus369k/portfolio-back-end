import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import emailjs from '@emailjs/nodejs'
import { z } from 'zod/v4'
import { env } from '@/util/env'

const SendEmailRouterSchema = {
	schema: {
		body: z.object({
			email: z.email(),
			from_name: z.string().min(3),
			message: z.string().min(2),
		}),
	},
}

class MailRoutes {
	sendOne: FastifyPluginCallbackZod = async (app) => {
		app.post('/invite-email', SendEmailRouterSchema, async (request, reply) => {
			const { email, from_name, message } = request.body
			await emailjs.send(
				env.EMAIL_SERVER_ID,
				env.EMAIL_TEMPLATE_ID,
				{
					email,
					from_name,
					message,
				},
				{
					publicKey: env.EMAIL_PUBLIC_KEY,
					privateKey: env.EMAIL_PRIVATE_KEY,
				},
			)

			return reply.status(201).send('ok')
		})
	}
}

const mailRoutes = new MailRoutes()
export default mailRoutes
