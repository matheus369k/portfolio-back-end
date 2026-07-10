import models from '@/models/models'
import project from '@/models/schemas/project'
import { beforeEach, describe, it, vi, expect } from 'vitest'
import { ProjectsControllers } from './project'
import { createId } from '@paralleldrive/cuid2'

describe('Projects Controllers', () => {
	const mockedProjectsModel = vi.mocked(models.Projects(project))
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

	describe('CreateOne Controller', () => {
		const spyCreateProject = vi.spyOn(mockedProjectsModel, 'create')
		const defaultResponse = {
			...fakerProject,
			create_at: Date.now(),
			property_id: null,
			id: createId(),
		}

		beforeEach(() => {
			spyCreateProject.mockImplementation(() => defaultResponse as never)
		})

		it('should create a new project', async () => {
			await new ProjectsControllers(mockedProjectsModel).createOne(fakerProject)

			expect(mockedProjectsModel.create).toHaveBeenCalledWith(fakerProject)
		})

		it('should returned projectId to end', async () => {
			const response = await new ProjectsControllers(mockedProjectsModel).createOne(fakerProject)

			expect(response).toMatchObject({ projectId: defaultResponse.id })
		})

		it('should dispatch error when not receive nothing', () => {
			spyCreateProject.mockImplementation(() => undefined as never)

			expect(new ProjectsControllers(mockedProjectsModel).createOne(fakerProject)).rejects.toThrow(
				'error to tried create a new project!',
			)
		})
	})

	describe('GetForType Controller', () => {
		const spyFindProject = vi.spyOn(mockedProjectsModel, 'find')
		const spyLimitProject = vi.fn()
		const defaultResponse = Array.from({ length: 3 }).map(() => ({
			...fakerProject,
			create_at: Date.now(),
			property_id: null,
			id: createId(),
		}))

		beforeEach(() => {
			spyFindProject.mockImplementation(
				() =>
					({
						limit: spyLimitProject.mockResolvedValue(defaultResponse),
					}) as never,
			)
		})

		it('should receive type in find', async () => {
			await new ProjectsControllers(mockedProjectsModel).getForType({ max: 3, type: 'full-stack' })

			expect(spyFindProject).toHaveBeenCalledWith({ type: 'full-stack' })
		})

		it('should add type empty in find when receive type all', async () => {
			await new ProjectsControllers(mockedProjectsModel).getForType({ max: 3, type: 'all' })

			expect(spyFindProject).toHaveBeenCalledWith({})
		})

		it('should receive limited quantity in limit', async () => {
			await new ProjectsControllers(mockedProjectsModel).getForType({ max: 3, type: 'all' })

			expect(spyLimitProject).toHaveBeenCalledWith(3)
		})

		it('should returned projects data', async () => {
			const response = await new ProjectsControllers(mockedProjectsModel).getForType({
				max: 3,
				type: 'all',
			})

			expect(response).toMatchObject({ projects: defaultResponse })
		})

		it('should dispatch error when not receive nothing', () => {
			spyFindProject.mockImplementation(
				() =>
					({
						limit: spyLimitProject.mockResolvedValue(undefined),
					}) as never,
			)

			expect(
				new ProjectsControllers(mockedProjectsModel).getForType({ max: 3, type: 'all' }),
			).rejects.toThrow('not found projects!')
		})
	})

	describe('UpdatePropertyId Controller', () => {
		const spyFindByIdAndUpdateProjects = vi.spyOn(mockedProjectsModel, 'findByIdAndUpdate')
		const propertyId = 8767428
		const defaultResponse = {
			...fakerProject,
			create_at: Date.now(),
			property_id: null,
			id: createId(),
		}

		beforeEach(() => {
			spyFindByIdAndUpdateProjects.mockImplementation(
				() =>
					({
						...defaultResponse,
						property_id: propertyId,
					}) as never,
			)
		})

		it('should receive projectId and new value from property_id in findByIdAndUpdate', async () => {
			await new ProjectsControllers(mockedProjectsModel).updatePropertyId({
				id: defaultResponse.id,
				property_id: propertyId,
			})

			expect(spyFindByIdAndUpdateProjects).toHaveBeenCalledWith(defaultResponse.id, {
				property_id: propertyId,
			})
		})

		it('should dispatch error when not receive nothing', async () => {
			spyFindByIdAndUpdateProjects.mockImplementation(() => undefined as never)

			expect(
				new ProjectsControllers(mockedProjectsModel).updatePropertyId({
					id: defaultResponse.id,
					property_id: propertyId,
				}),
			).rejects.toThrow('error to tried updated project propertyId!')
		})
	})

	describe('DeleteById Controller', () => {
		const spyFindByIdAndDelete = vi.spyOn(mockedProjectsModel, 'findByIdAndDelete')
		const spyFindById = vi.spyOn(mockedProjectsModel, 'findById')
		const defaultResponse = {
			...fakerProject,
			create_at: Date.now(),
			property_id: null,
			id: createId(),
		}

		beforeEach(() => {
			spyFindByIdAndDelete.mockImplementation(() => undefined as never)
			spyFindById.mockImplementation(() => undefined as never)
		})

		it('should receive projectId in findByIdAndDelete', async () => {
			await new ProjectsControllers(mockedProjectsModel).deleteById({
				id: defaultResponse.id,
			})

			expect(spyFindByIdAndDelete).toHaveBeenCalledWith(defaultResponse.id)
		})

		it('should receive projectId in findById', async () => {
			await new ProjectsControllers(mockedProjectsModel).deleteById({
				id: defaultResponse.id,
			})

			expect(spyFindById).toHaveBeenCalledWith(defaultResponse.id)
		})

		it('should dispatch error when receive anything', async () => {
			spyFindById.mockImplementation(() => defaultResponse as never)

			expect(
				new ProjectsControllers(mockedProjectsModel).deleteById({
					id: defaultResponse.id,
				}),
			).rejects.toThrow('error to tried delete project!')
		})
	})
})
