import models from '@/models/models'
import tool from '@/models/schemas/tool'
import { createId } from '@paralleldrive/cuid2'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ToolsControllers } from './tool'

describe('Tool Controllers', () => {
	const mockedToolModel = vi.mocked(models.Tools(tool))
	const fakerTool = {
		name: 'test',
		svg_url: 'https://tool-images.com/tools/test.svg',
	}

	describe('CreateOne Controller', () => {
		const spyCreateTool = vi.spyOn(mockedToolModel.front_end, 'create')
		const defaultResponse = {
			...fakerTool,
			create_at: Date.now(),
			id: createId(),
		}

		beforeEach(() => {
			spyCreateTool.mockImplementation(() => defaultResponse as never)
		})

		it('should create a new tool', async () => {
			await new ToolsControllers(mockedToolModel).createOne({
				...fakerTool,
				category: 'front_end',
			})

			expect(mockedToolModel.front_end.create).toHaveBeenCalledWith(fakerTool)
		})

		it('should returned toolId to end', async () => {
			const response = await new ToolsControllers(mockedToolModel).createOne({
				...fakerTool,
				category: 'front_end',
			})

			expect(response).toMatchObject({ toolId: defaultResponse.id })
		})

		it('should dispatch error when not receive nothing', async () => {
			spyCreateTool.mockImplementation(() => undefined as never)

			expect(
				new ToolsControllers(mockedToolModel).createOne({
					...fakerTool,
					category: 'front_end',
				}),
			).rejects.toThrow('error to tried create a new tool!')
		})
	})

	describe('GetAll Controller', () => {
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

		it('not should insert nothing props in find for get all', async () => {
			await new ToolsControllers(mockedToolModel).getAll()

			expect(spyFindToolFront).toHaveBeenCalledWith()
			expect(spyFindToolBack).toHaveBeenCalledWith()
			expect(spyFindToolAnother).toHaveBeenCalledWith()
		})

		it('should returned data tools', async () => {
			const response = await new ToolsControllers(mockedToolModel).getAll()

			expect(response.tools).toMatchObject({
				front_end: defaultResponse,
				back_end: defaultResponse,
				another: defaultResponse,
			})
		})

		it('should dispatch error when not receive nothing', async () => {
			spyFindToolFront.mockImplementation(() => undefined as never)
			spyFindToolBack.mockImplementation(() => undefined as never)
			spyFindToolAnother.mockImplementation(() => undefined as never)

			expect(new ToolsControllers(mockedToolModel).getAll()).rejects.toThrow('not found tools!')
		})
	})

	describe('DeleteById', () => {
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

		it('should receive toolId in all findByIdAndDelete', async () => {
			await new ToolsControllers(mockedToolModel).deleteById({ id: defaultResponse.id })

			expect(spyFindByIdAndDeleteToolFront).toHaveBeenCalledWith({ _id: defaultResponse.id })
			expect(spyFindByIdAndDeleteToolBack).toHaveBeenCalledWith({ _id: defaultResponse.id })
			expect(spyFindByIdAndDeleteToolAnother).toHaveBeenCalledWith({ _id: defaultResponse.id })
		})

		it('should receive toolId in all findById', async () => {
			await new ToolsControllers(mockedToolModel).deleteById({ id: defaultResponse.id })

			expect(spyFindByIdToolFront).toHaveBeenCalledWith({ _id: defaultResponse.id })
			expect(spyFindByIdToolBack).toHaveBeenCalledWith({ _id: defaultResponse.id })
			expect(spyFindByIdToolAnother).toHaveBeenCalledWith({ _id: defaultResponse.id })
		})

		it('should dispatch error when not receive anything', async () => {
			spyFindByIdToolFront.mockImplementation(() => {
				return defaultResponse as never
			})

			expect(
				new ToolsControllers(mockedToolModel).deleteById({ id: defaultResponse.id }),
			).rejects.toThrow('error to tried delete tool!')
		})
	})
})
