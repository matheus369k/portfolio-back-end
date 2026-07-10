import { env } from '@/util/env.js'
import { BetaAnalyticsDataClient } from '@google-analytics/data'

export const analyticsDataClient = new BetaAnalyticsDataClient({
	credentials: JSON.parse(env.GOOGLE_CREDENTIALS),
})
