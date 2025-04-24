import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

interface RegisterProjectProps {
	name: string;
	slug: string;
	tools: string[];
	order: number;
	image_url: string;
	links: {
		deploy: string;
		repository: string;
	};
	description: string;
}

export async function registerProject({
	name,
	slug,
	tools,
	image_url,
	description,
	order,
	links,
}: RegisterProjectProps) {
	const project = await db.Projects.create({
		name,
		slug,
		tools,
		image_url,
		description,
		links,
		order,
	});

	if (!project) {
		throw new ClientError('Error to create project');
	}

	return {
		projectId: project.id,
	};
}
