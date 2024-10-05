import { db } from '@/models';

export async function getTools() {
	const tools = await db.Tools.find();

	if (!tools) {
		throw new Error('Tools Not found');
	}

	return {
		tools,
	};
}
