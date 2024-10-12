import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

export async function getProjects(max = 0) {
	const project = await db.Projects.find().limit(max);

	if (!project) {
		throw new ClientError('Project not found!');
	}

	return {
		project,
	};
}
