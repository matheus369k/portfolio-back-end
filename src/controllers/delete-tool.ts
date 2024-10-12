import { ClientError } from "@/errors/client-error.js";
import { db } from '@/models/index.js';

export async function deleteTool({ id }: { id: string }) {
	await db.Tools.findByIdAndDelete({
		_id: id,
	});

	const tool = await db.Tools.findById({
		_id: id,
	});

	if (tool) {
		throw new ClientError('Error to delete tool!');
	}
}