import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

type GetProjectsProps = { max: number; type: string };

export async function getProjects({ max, type }: GetProjectsProps) {
	const findForType = type === 'all' ? {} : { type };
	const projects = await db.Projects.find(findForType).limit(max).sort({ access_total: 'desc' });

	if (!projects) {
		throw new ClientError('Project not found!');
	}

	return {
		projects,
	};
}
