import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

interface RegisterProjectProps {
	name: string;
	slug: string;
	tools: string[];
	images_url: {
		png: string;
		gif: string;
	};
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
	images_url,
	description,
	links
}: RegisterProjectProps) {
	const project = await db.Projects.create({
		name,
		slug,
		tools,
		images_url,
		description,
		links,
	});

	if (!project) {
		throw new ClientError('Error to create project');
	}

	return {
		projectId: project.id,
	};
}
