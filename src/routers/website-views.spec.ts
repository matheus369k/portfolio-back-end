import { env } from '@/util/env'
import fastify from 'fastify'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import websiteViewsRoutes from './website-views'
import { analyticsDataClient } from '@/util/google-analitycs'

describe('WebsiteViews Routes', () => {
	describe('GetTotal Route', () => {
		const spyGoogleAnalyticsRunReport = vi.spyOn(analyticsDataClient, 'runReport')
		const totalViews = 228
		const app = fastify()

		beforeAll(() => {
			spyGoogleAnalyticsRunReport.mockImplementation((props) => {
				const propertyId = props?.property?.split('/')[1]
				if (env.WEBSITE_PROPERTY_ID !== propertyId) {
					return undefined
				}

				return [
					{
						rows: [
							{
								metricValues: [
									{
										value: totalViews,
									},
								],
							},
						],
					},
				]
			})

			app.register(websiteViewsRoutes.getTotal)
		})

		it(`should returned ${totalViews} in accessTotal`, async () => {
			const response = await app.inject({
				url: '/website-views',
				method: 'get',
			})

			expect(JSON.parse(response.body)).toMatchObject({ accessTotal: totalViews })
		})

		it('should returned status code 200', async () => {
			const response = await app.inject({
				url: '/website-views',
				method: 'get',
			})

			expect(response.statusCode).toBe(200)
		})

		it('should dispatch error when not find WEBSITE_PROPERTY_ID', async () => {
			const spyWebsitePropertyId = vi.spyOn(env, 'WEBSITE_PROPERTY_ID', 'set')
			spyWebsitePropertyId.mockReturnValue(undefined)

			const response = await app.inject({
				url: '/website-views',
				method: 'get',
			})

			expect(JSON.parse(response.body).message).toBe(
				'not found google property from google analytics',
			)

			spyWebsitePropertyId.mockRestore()
		})
	})
})
