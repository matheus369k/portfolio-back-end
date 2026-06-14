import mongoose from 'mongoose'
import { it, vi, describe, expect } from 'vitest'
import certificate from './certificate'

vi.spyOn(mongoose, 'Schema')

describe('Mongo Certificate Schema', () => {
	const mockedMongoose = vi.mocked(mongoose)

	it('should some type', () => {
		expect(certificate.obj).toMatchObject(
			new mockedMongoose.Schema({
				order: {
					type: Number,
					required: true,
				},
				title: {
					type: String,
					required: true,
				},
				description: {
					type: String,
					required: true,
				},
				emission_data: {
					type: Date,
					required: true,
				},
				link: {
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
