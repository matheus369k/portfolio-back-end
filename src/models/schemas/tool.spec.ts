import mongoose from 'mongoose'
import { it, vi, describe, expect } from 'vitest'
import tool from './tool'

vi.spyOn(mongoose, 'Schema')

describe('Mongo Tool Schema', () => {
	const mockedMongoose = vi.mocked(mongoose)

	it('should some type', () => {
		expect(tool.obj).toMatchObject(
			new mockedMongoose.Schema({
				name: {
					type: String,
					required: true,
				},
				svg_url: {
					type: String,
					required: true,
				},
				create_at: {
					type: Date,
					default: Date.now,
				},
			}).obj,
		)
	})
})
