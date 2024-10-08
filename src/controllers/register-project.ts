import { db } from '@/models';

interface RegisterProjectProps {
	name: string;
	slug: string;
	tools: string[];
	images_url: {
		png: string;
		gif: string;
	};
	description: string;
}

export async function registerProject({
	name,
	slug,
	tools,
	images_url,
	description,
}: RegisterProjectProps) {
	const project = await db.Projects.create({
		name,
		slug,
		tools,
		images_url,
		description,
	});

	if (!project) {
		throw new Error('Error to create project');
	}

	return {
		projectId: project.id,
	};
}
