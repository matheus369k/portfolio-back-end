import emailjs from '@emailjs/nodejs'
import fastify from 'fastify'
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import mailRoutes from './mail'
import { env } from '@/util/env'

describe('Mail Routes', () => {
	const fakerMail = {
		email: 'john.dol@gmail.com',
		from_name: 'John Dol',
		message: 'Hi July, do you need buy some thing, when you are leaving from school..',
	}

	describe('Send Route', () => {
		const spyEmailjsSend = vi.spyOn(emailjs, 'send')
		const app = fastify().withTypeProvider<ZodTypeProvider>()

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(mailRoutes.sendOne)
			spyEmailjsSend.mockImplementation(vi.fn as never)
		})

		it('should receive IDs, body of email and KEYs of the them', async () => {
			await app.inject({
				url: '/invite-email',
				method: 'post',
				payload: fakerMail,
			})

			expect(spyEmailjsSend).toHaveBeenCalledWith(
				env.EMAIL_SERVER_ID,
				env.EMAIL_TEMPLATE_ID,
				{ ...fakerMail },
				{
					publicKey: env.EMAIL_PUBLIC_KEY,
					privateKey: env.EMAIL_PRIVATE_KEY,
				},
			)
		})

		it('should returned 201 when finished with success', async () => {
			const response = await app.inject({
				url: '/invite-email',
				method: 'post',
				payload: fakerMail,
			})

			expect(response.statusCode).toBe(201)
		})

		it('should dispatch error 400 when receive one prop invalid', async () => {
			for (const key in fakerMail) {
				const response = await app.inject({
					url: '/invite-email',
					method: 'post',
					payload: {
						...fakerMail,
						[key]: {
							function() {
								console.log('injected virus')
							},
						},
					},
				})

				expect(response.statusCode).toBe(400)
			}
		})
	})
})
