import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

interface RegisterToolProps {
	name: string;
	svg_url: string;
	category: 'front_end' | 'back_end' | 'another';
}

export async function registerTool({ category, name, svg_url }: RegisterToolProps) {
	const tool = await db.Tools[category].create({
		name,
		svg_url,
	});

	if (!tool) {
		throw new ClientError('Error to create tool!');
	}

	return {
		toolId: tool.id,
	};
}

export async function getTools() {
	const [front_end, back_end, another] = await Promise.all([
		db.Tools.front_end.find({}),
		db.Tools.back_end.find({}),
		db.Tools.another.find({}),
	]);

	if (!front_end || !back_end || !another) {
		throw new ClientError('Tools Not found');
	}

	return {
		tools: { front_end, back_end, another },
	};
}

const categories = ['front_end', 'back_end', 'another'];

export async function deleteTool({ id }: { id: string }) {
	for (const category of categories) {
		await db.Tools[category as 'front_end' | 'back_end' | 'another'].findByIdAndDelete({
			_id: id,
		});

		const result = await db.Tools[category as 'front_end' | 'back_end' | 'another'].findById({
			_id: id,
		});

		if (result) {
			throw new ClientError('Error to delete tool!');
		}
	}
}
