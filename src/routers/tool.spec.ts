import fastify from 'fastify'
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import toolsRoutes from './tool'
import models from '@/models/models'
import tool from '@/models/schemas/tool'
import { createId } from '@paralleldrive/cuid2'

describe('Tools Routes', () => {
	const mockedToolModel = vi.mocked(models.Tools(tool))
	const fakerTool = {
		name: 'test',
		svg_url: 'https://tool-images.com/tools/test.svg',
	}

	describe('CreateOne Route', () => {
		const app = fastify().withTypeProvider<ZodTypeProvider>()
		const spyCreateTool = vi.spyOn(mockedToolModel.front_end, 'create')
		const defaultResponse = {
			...fakerTool,
			create_at: Date.now(),
			id: createId(),
		}

		beforeEach(() => {
			spyCreateTool.mockImplementation(() => defaultResponse as never)
		})

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(toolsRoutes.createOne)
		})

		it('should sender all props for database', async () => {
			await app.inject({
				url: '/tools',
				method: 'post',
				payload: {
					...fakerTool,
					category: 'front_end',
				},
			})

			expect(spyCreateTool).toHaveBeenCalledWith(fakerTool)
		})

		it('should returned projectId when finished with success', async () => {
			const response = await app.inject({
				url: '/tools',
				method: 'post',
				payload: {
					...fakerTool,
					category: 'front_end',
				},
			})

			expect(JSON.parse(response.body)).toMatchObject({ toolId: defaultResponse.id })
		})

		it('should returned statusCode 201 when finished with success', async () => {
			const response = await app.inject({
				url: '/tools',
				method: 'post',
				payload: {
					...fakerTool,
					category: 'front_end',
				},
			})

			expect(response.statusCode).toBe(201)
		})

		it('should catch error when dispatch one', async () => {
			spyCreateTool.mockImplementation(() => undefined as never)

			const response = await app.inject({
				url: '/tools',
				method: 'post',
				payload: {
					...fakerTool,
					category: 'front_end',
				},
			})

			expect(response.statusCode).toBe(404)
		})

		it('should dispatch error 400 when receive one prop invalid', async () => {
			const body = { ...fakerTool, category: 'front_end' }
			for (const key in body) {
				const response = await app.inject({
					url: '/tools',
					method: 'post',
					payload: {
						...body,
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
		const spyFindToolFront = vi.spyOn(mockedToolModel.front_end, 'find')
		const spyFindToolBack = vi.spyOn(mockedToolModel.back_end, 'find')
		const spyFindToolAnother = vi.spyOn(mockedToolModel.another, 'find')
		const defaultResponse = {
			...fakerTool,
			create_at: Date.now(),
			id: createId(),
		}

		beforeEach(() => {
			spyFindToolFront.mockImplementation(() => {
				return defaultResponse as never
			})
			spyFindToolBack.mockImplementation(() => {
				return defaultResponse as never
			})
			spyFindToolAnother.mockImplementation(() => {
				return defaultResponse as never
			})
		})

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(toolsRoutes.getAll)
		})
		it('should find datas from database', async () => {
			await app.inject({
				url: '/tools',
				method: 'get',
			})

			expect(spyFindToolFront).toHaveBeenCalled()
			expect(spyFindToolBack).toHaveBeenCalled()
			expect(spyFindToolAnother).toHaveBeenCalled()
		})

		it('should returned datas when finished with success', async () => {
			const response = await app.inject({
				url: '/tools',
				method: 'get',
			})

			expect(JSON.parse(response.body)).toMatchObject({
				tools: {
					front_end: defaultResponse,
					back_end: defaultResponse,
					another: defaultResponse,
				},
			})
		})

		it('should returned statusCode 200 when finished with success', async () => {
			const response = await app.inject({
				url: '/tools',
				method: 'get',
			})

			expect(response.statusCode).toBe(200)
		})

		it('should catch error when dispatch one', async () => {
			spyFindToolFront.mockImplementation(() => {
				return undefined as never
			})

			const response = await app.inject({
				url: '/tools',
				method: 'get',
			})

			expect(response.statusCode).toBe(404)
		})
	})

	describe('DeleteById Route', () => {
		const app = fastify().withTypeProvider<ZodTypeProvider>()
		const spyFindByIdToolFront = vi.spyOn(mockedToolModel.front_end, 'findById')
		const spyFindByIdToolBack = vi.spyOn(mockedToolModel.back_end, 'findById')
		const spyFindByIdToolAnother = vi.spyOn(mockedToolModel.another, 'findById')

		const spyFindByIdAndDeleteToolFront = vi.spyOn(mockedToolModel.front_end, 'findByIdAndDelete')
		const spyFindByIdAndDeleteToolBack = vi.spyOn(mockedToolModel.back_end, 'findByIdAndDelete')
		const spyFindByIdAndDeleteToolAnother = vi.spyOn(mockedToolModel.another, 'findByIdAndDelete')
		const defaultResponse = {
			...fakerTool,
			create_at: Date.now(),
			id: createId(),
		}

		beforeEach(() => {
			spyFindByIdToolFront.mockImplementation(() => undefined as never)
			spyFindByIdToolBack.mockImplementation(() => undefined as never)
			spyFindByIdToolAnother.mockImplementation(() => undefined as never)

			spyFindByIdAndDeleteToolFront.mockImplementation(() => undefined as never)
			spyFindByIdAndDeleteToolBack.mockImplementation(() => undefined as never)
			spyFindByIdAndDeleteToolAnother.mockImplementation(() => undefined as never)
		})

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(toolsRoutes.deleteById)
		})

		it('should receive 204 when is success', async () => {
			const response = await app.inject({
				url: `/tools/${defaultResponse.id}`,
				method: 'delete',
			})

			expect(response.statusCode).toBe(204)
		})

		it('should receive toolId in all findByIdAndDelete', async () => {
			await app.inject({
				url: `/tools/${defaultResponse.id}`,
				method: 'delete',
			})

			expect(spyFindByIdAndDeleteToolFront).toHaveBeenCalledWith({ _id: defaultResponse.id })
			expect(spyFindByIdAndDeleteToolBack).toHaveBeenCalledWith({ _id: defaultResponse.id })
			expect(spyFindByIdAndDeleteToolAnother).toHaveBeenCalledWith({ _id: defaultResponse.id })
		})

		it('should receive toolId in all findById', async () => {
			await app.inject({
				url: `/tools/${defaultResponse.id}`,
				method: 'delete',
			})

			expect(spyFindByIdToolFront).toHaveBeenCalledWith({ _id: defaultResponse.id })
			expect(spyFindByIdToolBack).toHaveBeenCalledWith({ _id: defaultResponse.id })
			expect(spyFindByIdToolAnother).toHaveBeenCalledWith({ _id: defaultResponse.id })
		})

		it('should dispatch error when not receive anything', async () => {
			spyFindByIdToolFront.mockImplementation(() => {
				return defaultResponse as never
			})

			const response = await app.inject({
				url: `/tools/${defaultResponse.id}`,
				method: 'delete',
			})

			expect(response.statusCode).toBe(500)
		})
	})
})
