import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

export async function getTools() {
	const front_end = await db.Tools.front_end.find({});
	const back_end = await db.Tools.back_end.find({});
	const another = await db.Tools.another.find({});

	if (!front_end || !back_end || !another) {
		throw new ClientError('Tools Not found');
	}

	return {
		tools: { front_end, back_end, another },
	};
}
