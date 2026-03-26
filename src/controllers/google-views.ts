import { analyticsDataClient } from '@/config/google-analitycs.js';

export async function googleProjectTotalViews(propertyId?: string | number) {
	try {
		if (!propertyId) {
			throw new Error('not receive propertyId prop');
		}

		const [response] = await analyticsDataClient.runReport({
			property: `properties/${propertyId}`,
			dateRanges: [
				{
					startDate: '2020-01-01',
					endDate: 'today',
				},
			],
			metrics: [{ name: 'screenPageViews' }],
		});

		return {
			totalViews: response?.rows?.[0]?.metricValues?.[0]?.value || '0',
		};
	} catch {
		return {
			totalViews: '0',
		};
	}
}
