import models from '@/models/models'
import project from '@/models/schemas/project'
import { createId } from '@paralleldrive/cuid2'
import fastify from 'fastify'
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import projectsRoutes from './project'

vi.mock(import('@/controllers/google-analytics.js'), async (importOriginal) => {
	const originalModule = await importOriginal()

	return {
		...originalModule,
		GoogleAnalytics: class GoogleAnalytics {
			getTotalViews() {
				return {
					totalViews: Math.ceil(Math.random() * 10),
				}
			}
		},
	} as never
})

describe('Project Routes', () => {
	const fakerProject = {
		type: 'full-stack',
		image_url:
			'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/projects-images/coffee-delivery.jpg',
		links: [
			{
				name: 'site',
				link: 'https://matheus369k.github.io/coffee-delivery/',
			},
			{
				name: 'repositório',
				link: 'https://github.com/matheus369k/coffee-delivery',
			},
		],
		slug: 'coffee-delivery',
		name: 'Coffee Delivery',
		tools: [
			'react',
			'vite',
			'typescript',
			'styled-components',
			'jest',
			'testing-library',
			'react-hook-form',
			'zod',
			'react-router-dom',
			'eslint',
			'prettier',
			'axios',
		],
		description:
			'Coffee Delivery e uma plataforma fictícia que, tem como objetivo criar e oferecer uma experiência de compra de café prática e conveniente. Você pode escolher entre uma variedade de tipos de café e métodos de preparo, tudo de forma fácil e rápida. Compre diretamente pelo site e receba o seu café fresco diretamente em casa, sem precisar sair de casa',
	}

	describe('CreateOne Route', () => {
		const app = fastify().withTypeProvider<ZodTypeProvider>()
		const spyCreateProjects = vi.spyOn(models.Projects(project), 'create')
		const defaultResponse = {
			...fakerProject,
			create_at: Date.now(),
			property_id: null,
			id: createId(),
		}

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(projectsRoutes.createOne)
		})

		beforeEach(() => {
			spyCreateProjects.mockImplementation(() => defaultResponse as never)
		})

		it('should sender all props for database', async () => {
			await app.inject({
				url: '/projects',
				method: 'post',
				payload: fakerProject,
			})

			expect(spyCreateProjects).toHaveBeenCalledWith(fakerProject)
		})

		it('should returned projectId when finished with success', async () => {
			const response = await app.inject({
				url: '/projects',
				method: 'post',
				payload: fakerProject,
			})

			expect(JSON.parse(response.body)).toMatchObject({ projectId: defaultResponse.id })
		})

		it('should returned statusCode 201 when finished with success', async () => {
			const response = await app.inject({
				url: '/projects',
				method: 'post',
				payload: fakerProject,
			})

			expect(response.statusCode).toBe(201)
		})

		it('should catch error when dispatch one', async () => {
			spyCreateProjects.mockImplementation(() => undefined as never)

			const response = await app.inject({
				url: '/projects',
				method: 'post',
				payload: fakerProject,
			})

			expect(response.statusCode).toBe(404)
		})

		it('should dispatch error 400 when receive one prop invalid', async () => {
			for (const key in fakerProject) {
				const response = await app.inject({
					url: '/projects',
					method: 'post',
					payload: {
						...fakerProject,
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

	describe('GetForType Route', () => {
		const spyFindProjects = vi.spyOn(models.Projects(project), 'find')
		const spyLimitProjects = vi.fn()
		const defaultResponse = Array.from({ length: 3 }).map(() => ({
			...fakerProject,
			create_at: Date.now(),
			property_id: null,
			id: createId(),
		}))

		const app = fastify().withTypeProvider<ZodTypeProvider>()

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(projectsRoutes.getForType)
		})

		beforeEach(() => {
			spyFindProjects.mockImplementation(
				() =>
					({
						limit: spyLimitProjects.mockResolvedValue(defaultResponse),
					}) as never,
			)
		})

		it('should receive type in find', async () => {
			await app.inject({
				url: `/projects?type=${fakerProject.type}&max=3`,
				method: 'get',
			})

			expect(spyFindProjects).toHaveBeenCalledWith({ type: fakerProject.type })
		})

		it('should receive max in limit', async () => {
			await app.inject({
				url: `/projects?type=${fakerProject.type}&max=3`,
				method: 'get',
			})

			expect(spyLimitProjects).toHaveBeenCalledWith(3)
		})

		it('should ordination returned data using access count in each project', async () => {
			const response = await app.inject({
				url: `/projects?type=${fakerProject.type}&max=3`,
				method: 'get',
			})

			const projects = JSON.parse(response.body).projects
			expect(projects[0].access_total).toBeGreaterThanOrEqual(projects[1].access_total)
			expect(projects[1].access_total).toBeGreaterThanOrEqual(projects[2].access_total)
			expect(projects[2].access_total).toBeLessThanOrEqual(projects[1].access_total)
		})

		it('should add type empty in find when receive type all', async () => {
			await app.inject({
				url: '/projects?type=all&max=3',
				method: 'get',
			})

			expect(spyFindProjects).toHaveBeenCalledWith({})
		})

		it('should returned all datas when finished with success', async () => {
			const response = await app.inject({
				url: `/projects?type=${fakerProject.type}&max=3`,
				method: 'get',
			})

			expect(JSON.parse(response.body)).toMatchObject({
				projects: defaultResponse.map(({ property_id, id, type, create_at, ...props }) => ({
					...props,
				})),
			})
		})

		it('should returned statusCode 200 when finished with success', async () => {
			const response = await app.inject({
				url: `/projects?type=${fakerProject.type}&max=3`,
				method: 'get',
			})

			expect(response.statusCode).toBe(200)
		})

		it('should catch error when dispatch one', async () => {
			spyFindProjects.mockImplementation(
				() =>
					({
						limit: spyLimitProjects.mockResolvedValue(undefined),
					}) as never,
			)

			const response = await app.inject({
				url: `/projects?type=${fakerProject.type}&max=3`,
				method: 'get',
			})

			expect(response.statusCode).toBe(404)
		})

		it('should dispatch error 400 when receive one prop invalid', async () => {
			const querystring = { type: 'all', max: '3' }
			for (const key in querystring) {
				const response = await app.inject({
					url: '/projects',
					method: 'get',
					query: {
						...querystring,
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

	describe('UpdatePropertyId Route', () => {
		const spyFindByIdAndUpdateProject = vi.spyOn(models.Projects(project), 'findByIdAndUpdate')
		const app = fastify().withTypeProvider<ZodTypeProvider>()
		const propertyId = 8767428
		const defaultResponse = {
			...fakerProject,
			create_at: Date.now(),
			property_id: null,
			id: createId(),
		}

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(projectsRoutes.updatePropertyId)
		})

		beforeEach(() => {
			spyFindByIdAndUpdateProject.mockImplementation(
				() =>
					({
						...defaultResponse,
						property_id: propertyId,
					}) as never,
			)
		})

		it('should sender projectId and property to be updated in findByIdAndUpdate', async () => {
			await app.inject({
				url: `/projects/${defaultResponse.id}`,
				method: 'patch',
				payload: {
					property_id: propertyId,
				},
			})

			expect(spyFindByIdAndUpdateProject).toHaveBeenCalledWith(defaultResponse.id, {
				property_id: propertyId,
			})
		})

		it('should returned statusCode 201 when finished with success', async () => {
			const response = await app.inject({
				url: `/projects/${defaultResponse.id}`,
				method: 'patch',
				payload: {
					property_id: propertyId,
				},
			})

			expect(response.statusCode).toBe(201)
		})

		it('should catch error when dispatch one', async () => {
			spyFindByIdAndUpdateProject.mockImplementation(() => undefined as never)
			const response = await app.inject({
				url: `/projects/${defaultResponse.id}`,
				method: 'patch',
				payload: {
					property_id: propertyId,
				},
			})

			expect(response.statusCode).toBe(404)
		})

		it('should dispatch error 400 when receive one prop invalid', async () => {
			const response = await app.inject({
				url: `/projects/${defaultResponse.id}`,
				method: 'patch',
				payload: {
					property_id: {
						function() {
							console.log('injected virus')
						},
					},
				},
			})

			expect(response.statusCode).toBe(400)
		})
	})

	describe('DeleteById Route', () => {
		const spyFindByIdProject = vi.spyOn(models.Projects(project), 'findById')
		const spyFindByIdAndDeleteProject = vi.spyOn(models.Projects(project), 'findByIdAndDelete')
		const app = fastify().withTypeProvider<ZodTypeProvider>()
		const defaultResponse = {
			...fakerProject,
			create_at: Date.now(),
			property_id: null,
			id: createId(),
		}

		beforeAll(() => {
			app.setValidatorCompiler(validatorCompiler)
			app.setSerializerCompiler(serializerCompiler)

			app.register(projectsRoutes.deleteById)
		})

		beforeEach(() => {
			spyFindByIdAndDeleteProject.mockImplementation(() => undefined as never)
			spyFindByIdProject.mockImplementation(() => undefined as never)
		})

		it('should delete project from database', async () => {
			await app.inject({
				url: `/projects/${defaultResponse.id}`,
				method: 'delete',
			})

			expect(spyFindByIdAndDeleteProject).toHaveBeenCalledWith(defaultResponse.id)
		})

		it('should returned statusCode 204 when finished with success', async () => {
			const response = await app.inject({
				url: `/projects/${defaultResponse.id}`,
				method: 'delete',
			})

			expect(response.statusCode).toBe(204)
		})

		it('should catch error when dispatch one', async () => {
			spyFindByIdProject.mockImplementation(() => {
				return defaultResponse as never
			})

			const response = await app.inject({
				url: `/projects/${defaultResponse.id}`,
				method: 'delete',
			})

			expect(response.statusCode).toBe(500)
		})
	})
})
