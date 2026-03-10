import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

export async function updateViewOfProject({ id }: { id: string }) {
	const project = await db.Projects.findByIdAndUpdate(id, { $inc: { access_total: 1 } });

	if (!project) {
		throw new ClientError('Not found Project!');
	}
}
