import { ClientError } from '@/errors/client-error.js'
import models from '@/models/models'

interface RegisterToolProps {
	name: string
	svg_url: string
	category: 'front_end' | 'back_end' | 'another'
}

export async function registerTool({ category, name, svg_url }: RegisterToolProps) {
	const tool = await models.Tools()[category].create({
		name,
		svg_url,
	})

	if (!tool) {
		throw new ClientError('Error to create tool!')
	}

	return {
		toolId: tool.id,
	}
}

export async function getTools() {
	const [front_end, back_end, another] = await Promise.all([
		models.Tools().front_end.find({}),
		models.Tools().back_end.find({}),
		models.Tools().another.find({}),
	])

	if (!front_end || !back_end || !another) {
		throw new ClientError('Tools Not found')
	}

	return {
		tools: { front_end, back_end, another },
	}
}

const categories = ['front_end', 'back_end', 'another']

export async function deleteTool({ id }: { id: string }) {
	for (const category of categories) {
		await models.Tools()[category as 'front_end' | 'back_end' | 'another'].findByIdAndDelete({
			_id: id,
		})

		const result = await models.Tools()[category as 'front_end' | 'back_end' | 'another'].findById({
			_id: id,
		})

		if (result) {
			throw new ClientError('Error to delete tool!')
		}
	}
}
