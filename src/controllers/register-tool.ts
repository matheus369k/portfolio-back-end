import { db } from '@/models';

export async function registerTool(name: string, svg_url: string) {
	const tool = await db.Tools.create({
		name,
		svg_url,
	});

	if (!tool) {
		throw new Error('Error to create tool!');
	}

	return {
		toolId: tool.id,
	};
}
