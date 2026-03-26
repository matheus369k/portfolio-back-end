import { env } from '@/env.js';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export const analyticsDataClient = new BetaAnalyticsDataClient({
	credentials: JSON.parse(env.GOOGLE_CREDENTIALS || ''),
});
