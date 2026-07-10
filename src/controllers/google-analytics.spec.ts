import { analyticsDataClient } from '@/util/google-analitycs'
import { createId } from '@paralleldrive/cuid2'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GoogleAnalytics } from './google-analytics'

describe('GoogleAnalytics Controllers', () => {
	const mockedGoogleAnalytics = vi.mocked(analyticsDataClient)
	const propertyId = createId()

	describe('GetTotalViews Controller', () => {
		const spyGoogleAnalyticsRunReport = vi.spyOn(mockedGoogleAnalytics, 'runReport')
		const totalViews = 228

		beforeEach(() => {
			spyGoogleAnalyticsRunReport.mockImplementation((props) => {
				const id = props?.property?.split('/')[1]
				if (propertyId !== id) return undefined

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
		})

		it('should configuration runReport corrected', async () => {
			await new GoogleAnalytics(mockedGoogleAnalytics).getTotalViews(propertyId)

			expect(spyGoogleAnalyticsRunReport).toHaveBeenCalledWith({
				property: `properties/${propertyId}`,
				dateRanges: [
					{
						startDate: '2020-01-01',
						endDate: 'today',
					},
				],
				metrics: [{ name: 'screenPageViews' }],
			})
		})

		it('should returned 0 when not receive propertyId', async () => {
			const response = await new GoogleAnalytics(mockedGoogleAnalytics).getTotalViews(undefined)

			expect(response).toMatchObject({ totalViews: '0' })
		})

		it('should returned 0 when not found datas with id equal from propertyId', async () => {
			const response = await new GoogleAnalytics(mockedGoogleAnalytics).getTotalViews(undefined)

			expect(response).toMatchObject({ totalViews: '0' })
		})

		it(`should returned ${totalViews} in totalViews when is find datas`, async () => {
			const response = await new GoogleAnalytics(mockedGoogleAnalytics).getTotalViews(propertyId)

			expect(response).toMatchObject({ totalViews })
		})
	})
})
