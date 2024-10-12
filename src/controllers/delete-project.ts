import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

export async function deleteProject({ id }: { id: string }) {
	await db.Projects.findByIdAndDelete({
		_id: id,
	});

	const project = await db.Projects.findById({
		_id: id,
	});

	if (project) {
		throw new ClientError('Error to delete project!');
	}
}
