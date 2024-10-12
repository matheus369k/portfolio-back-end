import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

export async function getTools() {
	const tools = await db.Tools.find();

	if (!tools) {
		throw new ClientError('Tools Not found');
	}

	return {
		tools,
	};
}
