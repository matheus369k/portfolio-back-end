import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

export async function registerTool(name: string, svg_url: string) {
	const tool = await db.Tools.create({
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
