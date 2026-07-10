import fastify from 'fastify'
import { beforeAll, describe, expect, it } from 'vitest'
import checkHearthRoutes from './check-hearth'

describe('CheckHearth Routes', () => {
	const app = fastify()

	describe('IsOn Route', () => {
		beforeAll(() => {
			app.register(checkHearthRoutes.isOn)
		})

		it('should returned 200 when finished', async () => {
			const response = await app.inject({
				url: '/hearth',
				method: 'get',
			})

			expect(response.statusCode).toBe(200)
		})
	})
})
