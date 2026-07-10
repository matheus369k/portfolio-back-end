import type { ProjectSchema } from '@/models/schemas/types'
import type { InferSchemaType } from 'mongoose'

type OrdinationProjectsForViewsProps = Omit<
	InferSchemaType<ProjectSchema>,
	'property_id' | 'create_at'
> & {
	access_total: string
}

export function ordinationProjectsForViews(projects: OrdinationProjectsForViewsProps[]) {
	return projects.toSorted((curr, prev) => {
		return Number(prev.access_total) - Number(curr.access_total)
	})
}
