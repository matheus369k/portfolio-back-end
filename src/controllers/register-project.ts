import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

interface RegisterProjectProps {
	name: string;
	slug: string;
	tools: string[];
	image_url: string;
	links: {
		name: string;
		link: string;
	}[];
	description: string;
	type: string;
}

export async function registerProject({
	name,
	slug,
	tools,
	image_url,
	description,
	links,
	type,
}: RegisterProjectProps) {
	const project = await db.Projects.create({
		name,
		slug,
		tools,
		image_url,
		description,
		links,
		type,
	});

	if (!project) {
		throw new ClientError('Error to create project');
	}

	return {
		projectId: project.id,
	};
}
