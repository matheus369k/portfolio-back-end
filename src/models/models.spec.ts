import mongoose from 'mongoose'
import { describe, expect, it, vi } from 'vitest'
import models from './models'
import tool from './schemas/tool'
import project from './schemas/project'
import certificate from './schemas/certificate'

vi.spyOn(mongoose, 'model')

describe('Mongo Models DB', () => {
	const mockedMongoose = vi.mocked(mongoose)

	it('should receive corrected props when executed tool model', () => {
		models.Tools(tool)

		expect(mockedMongoose.model).toHaveBeenNthCalledWith(1, ...['tools_front', tool])
		expect(mockedMongoose.model).toHaveBeenNthCalledWith(2, ...['tools_back', tool])
		expect(mockedMongoose.model).toHaveBeenNthCalledWith(3, ...['tools_another', tool])
	})

	it('should receive corrected props when executed project model', () => {
		models.Projects(project)

		expect(mockedMongoose.model).toHaveBeenCalledWith(...['project', project])
	})

	it('should receive corrected props when executed certificate model', () => {
		models.Certificates(certificate)

		expect(mockedMongoose.model).toHaveBeenCalledWith(...['certificate', certificate])
	})
})
