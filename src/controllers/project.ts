import { ClientError, NotFoundError } from '@/errors/client-error.js'
import type { ProjectModel } from '@/models/types.js'

type CreateOneProjectProps = {
	name: string
	slug: string
	tools: string[]
	image_url: string
	links: {
		name: string
		link: string
	}[]
	description: string
	type: string
}

type GetForTypeProjectsProps = {
	max: number
	type: string
}

type UpdatePropertyIdProjectProps = {
	property_id: number
	id: string
}

export class ProjectsControllers {
	private projectModel: ProjectModel

	constructor(projectModel: ProjectModel) {
		this.projectModel = projectModel
	}

	async createOne(props: CreateOneProjectProps) {
		const { name, slug, tools, image_url, description, links, type } = props
		const project = await this.projectModel.create({
			description,
			image_url,
			links,
			tools,
			slug,
			name,
			type,
		})

		if (!project) {
			throw new NotFoundError('error to tried create a new project!')
		}

		return {
			projectId: project.id,
		}
	}

	async getForType({ max, type }: GetForTypeProjectsProps) {
		const findForType = type === 'all' ? {} : { type }
		const projects = await this.projectModel.find(findForType).limit(max)

		if (!projects) {
			throw new NotFoundError('not found projects!')
		}

		return {
			projects,
		}
	}

	async updatePropertyId({ id, property_id }: UpdatePropertyIdProjectProps) {
		const project = await this.projectModel.findByIdAndUpdate(id, { property_id })

		if (!project) {
			throw new NotFoundError('error to tried updated project propertyId!')
		}
	}

	async deleteById({ id }: { id: string }) {
		await this.projectModel.findByIdAndDelete(id)

		const project = await this.projectModel.findById(id)

		if (project) {
			throw new ClientError('error to tried delete project!')
		}
	}
}
