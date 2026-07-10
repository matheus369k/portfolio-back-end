import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { env } from '@/util/env.js'
import { GoogleAnalytics } from '@/controllers/google-analytics.js'
import { ClientError } from '@/errors/client-error'
import { analyticsDataClient } from '@/util/google-analitycs'

class WebsiteViewsRoutes {
	getTotal: FastifyPluginCallbackZod = async (app) => {
		app.get('/website-views', async (_, reply) => {
			const websitePropertyId = env.WEBSITE_PROPERTY_ID
			if (!websitePropertyId) {
				throw new ClientError('not found google property from google analytics')
			}

			const { totalViews } = await new GoogleAnalytics(analyticsDataClient).getTotalViews(
				websitePropertyId,
			)

			return reply.status(200).send({ accessTotal: totalViews })
		})
	}
}

const websiteViewsRoutes = new WebsiteViewsRoutes()
export default websiteViewsRoutes
