import { GoogleAnalytics } from '@/controllers/google-analytics'
import type { ProjectSchema } from '@/models/schemas/types'
import type { InferSchemaType } from 'mongoose'
import { analyticsDataClient } from './google-analitycs'

type GetAndAddProjectsViewsProps = InferSchemaType<ProjectSchema>[]
type OrdinationProjectsForViewsProps = Omit<
	InferSchemaType<ProjectSchema>,
	'property_id' | 'create_at'
> & {
	access_total: string
}

export async function getAndAddProjectsViews(projects: GetAndAddProjectsViewsProps) {
	const projectsWithTotalViews = []

	for (const project of projects) {
		const propertyId = project?.property_id ?? ''
		const { totalViews } = await new GoogleAnalytics(analyticsDataClient).getTotalViews(propertyId)

		const { description, image_url, links, name, slug, tools } = project
		projectsWithTotalViews.push({
			access_total: totalViews,
			description,
			image_url,
			links,
			name,
			slug,
			tools,
		} as OrdinationProjectsForViewsProps)
	}

	return projectsWithTotalViews
}
