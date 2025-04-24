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
