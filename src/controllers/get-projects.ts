import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

export async function getProjects(max = 0) {
	const projects = await db.Projects.find().limit(max);

	if (!projects) {
		throw new ClientError('Project not found!');
	}

	return {
		projects,
	};
}
