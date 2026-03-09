import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

export async function getProjects(max: undefined | number) {
	const limited = max || 0;
	const projects = await db.Projects.find().limit(limited).sort({ order: 'asc' });

	if (!projects) {
		throw new ClientError('Project not found!');
	}

	return {
		projects,
	};
}
