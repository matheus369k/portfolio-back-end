import { db } from '@/models';

export async function getProjects(slug: string) {
	const project = await db.Projects.findOne({
		slug,
	});

	if (!project) {
		throw new Error('Project not found!');
	}

	return {
		project,
	};
}
