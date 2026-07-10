import { ClientError, NotFoundError } from '@/errors/client-error.js'
import type { ToolModel } from '@/models/types'

type ToolCategories = 'front_end' | 'back_end' | 'another'

type CreateOneToolProps = {
	name: string
	svg_url: string
	category: ToolCategories
}

export class ToolsControllers {
	private readonly categories = ['front_end', 'back_end', 'another']
	private toolModel: ToolModel

	constructor(toolModel: ToolModel) {
		this.toolModel = toolModel
	}

	async createOne(props: CreateOneToolProps) {
		const { name, svg_url, category } = props
		const tool = await this.toolModel[category].create({
			name,
			svg_url,
		})

		if (!tool) {
			throw new NotFoundError('error to tried create a new tool!')
		}

		return {
			toolId: tool.id,
		}
	}

	async getAll() {
		const [front_end, back_end, another] = await Promise.all([
			this.toolModel.front_end.find(),
			this.toolModel.back_end.find(),
			this.toolModel.another.find(),
		])

		if (!front_end || !back_end || !another) {
			throw new NotFoundError('not found tools!')
		}

		return {
			tools: { front_end, back_end, another },
		}
	}

	async deleteById({ id }: { id: string }) {
		for (const category of this.categories) {
			await this.toolModel[category as ToolCategories].findByIdAndDelete({
				_id: id,
			})

			const tool = await this.toolModel[category as ToolCategories].findById({
				_id: id,
			})

			if (tool) {
				throw new ClientError('error to tried delete tool!')
			}
		}
	}
}
