import mongoose from 'mongoose'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { env } from '@/util/env'
import database from './database'

const spyConnect = vi.spyOn(mongoose, 'connect')
vi.spyOn(mongoose, 'disconnect')

describe('Database', () => {
	const mockedMongoose = vi.mocked(mongoose)
	const connectedOptions = [
		env.DATABASE_URL,
		{
			pass: env.DATABASE_PASSWORD,
			user: env.DATABASE_USERNAME,
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
		},
	]

	beforeEach(() => {
		spyConnect.mockImplementation(() => vi.fn() as never)
	})

	it('should connected in database', async () => {
		await database.connect({
			url: env.DATABASE_URL,
			options: {
				pass: env.DATABASE_PASSWORD,
				user: env.DATABASE_USERNAME,
			},
		})

		expect(mockedMongoose.connect).toHaveBeenCalledWith(...connectedOptions)
	})

	it('should disconnected in database', async () => {
		spyConnect.mockImplementation(() => ({ connection: { on: vi.fn() } }) as never)

		await database.connect({
			url: env.DATABASE_URL,
			options: {
				pass: env.DATABASE_PASSWORD,
				user: env.DATABASE_USERNAME,
			},
		})

		expect(mockedMongoose.disconnect).toHaveBeenCalledTimes(0)

		await database.disconnect()

		expect(mockedMongoose.disconnect).toHaveBeenCalledTimes(1)
	})

	it('not should disconnected when do not exited one', async () => {
		expect(mockedMongoose.disconnect).toHaveBeenCalledTimes(0)

		await database.disconnect()

		expect(mockedMongoose.disconnect).toHaveBeenCalledTimes(0)
	})

	it('not should create new connection with database when existed one', async () => {
		spyConnect.mockImplementation(() => ({ connection: { on: vi.fn() } }) as never)

		expect(mockedMongoose.connect).toHaveBeenCalledTimes(0)

		await database.connect({
			url: env.DATABASE_URL,
			options: {
				pass: env.DATABASE_PASSWORD,
				user: env.DATABASE_USERNAME,
			},
		})

		expect(mockedMongoose.connect).toHaveBeenCalledTimes(1)

		await database.connect({
			url: env.DATABASE_URL,
			options: {
				pass: env.DATABASE_PASSWORD,
				user: env.DATABASE_USERNAME,
			},
		})

		expect(mockedMongoose.connect).toHaveBeenCalledTimes(1)
	})

	it('not should disconnected when do not exited one', async () => {
		spyConnect.mockImplementation(() => ({ connection: { on: vi.fn() } }) as never)

		await database.connect({
			url: env.DATABASE_URL,
			options: {
				pass: env.DATABASE_PASSWORD,
				user: env.DATABASE_USERNAME,
			},
		})

		expect(mockedMongoose.disconnect).toHaveBeenCalledTimes(0)

		await database.disconnect()

		expect(mockedMongoose.disconnect).toHaveBeenCalledTimes(1)

		await database.disconnect()

		expect(mockedMongoose.disconnect).toHaveBeenCalledTimes(1)
	})
})
