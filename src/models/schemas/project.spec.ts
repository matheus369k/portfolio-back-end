import mongoose from 'mongoose'
import { it, vi, describe, expect } from 'vitest'
import project from './project'

vi.spyOn(mongoose, 'Schema')

describe('Mongo Project Schema', () => {
	const mockedMongoose = vi.mocked(mongoose)

	it('should some type', () => {
		expect(project.obj).toMatchObject(
			new mockedMongoose.Schema({
				property_id: {
					type: Number || null,
					default: null,
				},
				slug: {
					type: String,
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				image_url: {
					type: String,
					required: true,
				},
				links: [
					{
						name: {
							type: String,
							required: true,
						},
						link: {
							type: String,
							required: true,
						},
					},
				],
				tools: [String],
				description: {
					type: String,
					required: true,
				},
				type: {
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
