import { BadRequestError } from '@/errors/client-error'
import type { BetaAnalyticsDataClient } from '@google-analytics/data'

export class GoogleAnalytics {
	private analyticsDataClient: BetaAnalyticsDataClient

	constructor(analyticsDataClient: BetaAnalyticsDataClient) {
		this.analyticsDataClient = analyticsDataClient
	}

	async getTotalViews(propertyId?: string | number) {
		try {
			if (!propertyId) {
				throw new BadRequestError('not receive propertyId')
			}

			const [response] = await this.analyticsDataClient.runReport({
				property: `properties/${propertyId}`,
				dateRanges: [
					{
						startDate: '2020-01-01',
						endDate: 'today',
					},
				],
				metrics: [{ name: 'screenPageViews' }],
			},{
				timeout: 5000
			})

			return {
				totalViews: response?.rows?.[0]?.metricValues?.[0]?.value || '0',
			}
		} catch {
			return {
				totalViews: '0',
			}
		}
	}
}
