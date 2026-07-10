import models from '@/models/models'
import certificate from '@/models/schemas/certificate'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import certificatesRoutes from './certificate'
import fastify from 'fastify'
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createId } from '@paralleldrive/cuid2'

describe('Certificate Routes', () => {
	const fakerCertificate = {
		title: 'Aprofundando em Hooks',
		description:
			'Roteamento, renderizações no React e fluxo do useEffect, gerenciamento de estados via Contextos do React e Reducers, immer, estilização via CSS-in-JS e formulários',
		link: 'https://app.rocketseat.com.br/certificates/49dba041-ff6c-4734-bcc6-29e8447ab250',
		emission_data: new Date('03-01-2025'),
		order: 2,
	}

	describe('CreateOne Route', () => {
		const spyCreateCertificate = vi.spyOn(models.Certificates(certificate), 'create')
		const app = fastify().withTypeProvider<ZodTypeProvider>()
		const defaultResponse = {
			...fakerCertificate,
			create_at: Date.now(),
			id: createId(),
		}

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(certificatesRoutes.createOne)
		})

		beforeEach(() => {
			spyCreateCertificate.mockImplementation(() => defaultResponse as never)
		})

		it('should sender all props to database', async () => {
			await app.inject({
				url: '/certificates',
				method: 'post',
				payload: fakerCertificate,
			})

			expect(spyCreateCertificate).toHaveBeenCalledWith(fakerCertificate)
		})

		it('should returned certificateId when finished with success', async () => {
			const response = await app.inject({
				url: '/certificates',
				method: 'post',
				payload: fakerCertificate,
			})

			expect(JSON.parse(response.body)).toMatchObject({
				certificatesId: defaultResponse.id,
			})
		})

		it('should returned statusCode 201 when finished with success', async () => {
			const response = await app.inject({
				url: '/certificates',
				method: 'post',
				payload: fakerCertificate,
			})

			expect(response.statusCode).toBe(201)
		})

		it('should catch error when dispatch one', async () => {
			spyCreateCertificate.mockImplementation(() => undefined as never)

			const response = await app.inject({
				url: '/certificates',
				method: 'post',
				payload: fakerCertificate,
			})

			expect(response.statusCode).toBe(404)
		})

		it('should dispatch error 400 when receive one prop invalid', async () => {
			for (const key in fakerCertificate) {
				const response = await app.inject({
					url: '/certificates',
					method: 'post',
					payload: {
						...fakerCertificate,
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

	describe('GetAll Route', () => {
		const app = fastify().withTypeProvider<ZodTypeProvider>()
		const spyFindCertificate = vi.spyOn(models.Certificates(certificate), 'find')
		const spySortCertificate = vi.fn()
		const defaultResponse = Array.from({ length: 3 }).map((_, index) => ({
			...fakerCertificate,
			emission_data: fakerCertificate.emission_data.toDateString(),
			create_at: Date.now(),
			order: index + 1,
			id: createId(),
		}))

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(certificatesRoutes.getAll)
			spyFindCertificate.mockImplementation(() => {
				return {
					sort: spySortCertificate.mockResolvedValue(defaultResponse),
				} as never
			})
		})

		it('should find all datas from database', async () => {
			await app.inject({
				url: '/certificates',
				method: 'get',
			})

			expect(spySortCertificate).toHaveBeenCalled()
		})

		it('should returned all datas when finished with success', async () => {
			const response = await app.inject({
				url: '/certificates',
				method: 'get',
			})

			expect(JSON.parse(response.body)).toMatchObject({
				certificates: defaultResponse,
			})
		})

		it('should returned statusCode 200 when finished with success', async () => {
			const response = await app.inject({
				url: '/certificates',
				method: 'get',
			})

			expect(response.statusCode).toBe(200)
		})

		it('should catch error when dispatch one', async () => {
			spyFindCertificate.mockImplementation(() => {
				return {
					sort: spySortCertificate.mockResolvedValue(undefined),
				} as never
			})

			const response = await app.inject({
				url: '/certificates',
				method: 'get',
			})

			expect(response.statusCode).toBe(404)
		})
	})

	describe('GetWithLimite Route', () => {
		const app = fastify().withTypeProvider<ZodTypeProvider>()
		const spyFindCertificate = vi.spyOn(models.Certificates(certificate), 'find')
		const spySortCertificate = vi.fn()
		const spyLimitCertificate = vi.fn()
		const defaultResponse = Array.from({ length: 3 }).map((_, index) => ({
			...fakerCertificate,
			emission_data: fakerCertificate.emission_data.toDateString(),
			create_at: Date.now(),
			order: index + 1,
			id: createId(),
		}))

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(certificatesRoutes.getWithLimite)
			spyFindCertificate.mockImplementation(
				() =>
					({
						limit: spyLimitCertificate.mockReturnValue({
							sort: spySortCertificate.mockResolvedValue(defaultResponse),
						}),
					}) as never,
			)
		})

		it('should find datas from database', async () => {
			await app.inject({
				url: '/certificates/4',
				method: 'get',
			})

			expect(spySortCertificate).toHaveBeenCalled()
		})

		it('should returned datas when finished with success', async () => {
			const response = await app.inject({
				url: '/certificates/4',
				method: 'get',
			})

			expect(JSON.parse(response.body)).toMatchObject({
				certificates: defaultResponse,
			})
		})

		it('should returned statusCode 200 when finished with success', async () => {
			const response = await app.inject({
				url: '/certificates/4',
				method: 'get',
			})

			expect(response.statusCode).toBe(200)
		})

		it('should catch error when dispatch one', async () => {
			spyFindCertificate.mockImplementation(
				() =>
					({
						limit: spyLimitCertificate.mockReturnValue({
							sort: spySortCertificate.mockResolvedValue(undefined),
						}),
					}) as never,
			)

			const response = await app.inject({
				url: '/certificates/4',
				method: 'get',
			})

			expect(response.statusCode).toBe(404)
		})
	})

	describe('DeleteById Route', () => {
		const app = fastify().withTypeProvider<ZodTypeProvider>()
		const certificateId = createId()
		const spyFindByIdCertificate = vi.spyOn(models.Certificates(certificate), 'findById')
		const spyFindByIdAndDeleteCertificate = vi.spyOn(
			models.Certificates(certificate),
			'findByIdAndDelete',
		)

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(certificatesRoutes.deleteById)
			spyFindByIdCertificate.mockImplementation(() => undefined as never)
			spyFindByIdAndDeleteCertificate.mockImplementation(() => undefined as never)
		})

		it('should delete certificate from database', async () => {
			await app.inject({
				url: `/certificates/${certificateId}`,
				method: 'delete',
			})

			expect(spyFindByIdAndDeleteCertificate).toHaveBeenCalledWith({ _id: certificateId })
		})

		it('should returned statusCode 204 when finished with success', async () => {
			const response = await app.inject({
				url: `/certificates/${certificateId}`,
				method: 'delete',
			})

			expect(response.statusCode).toBe(204)
		})

		it('should catch error when dispatch one', async () => {
			spyFindByIdCertificate.mockImplementation(() => {
				return {
					...fakerCertificate,
					emission_data: fakerCertificate.emission_data.toDateString(),
					create_at: Date.now(),
					id: createId(),
				} as never
			})

			const response = await app.inject({
				url: `/certificates/${certificateId}`,
				method: 'delete',
			})

			expect(response.statusCode).toBe(500)
		})
	})
})
