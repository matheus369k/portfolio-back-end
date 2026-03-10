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

type GetProjectsProps = {
	max: number;
	type: string;
};

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

export async function updateViewOfProject({ id }: { id: string }) {
	const project = await db.Projects.findByIdAndUpdate(id, { $inc: { access_total: 1 } });

	if (!project) {
		throw new ClientError('Not found Project!');
	}
}

export async function deleteProject({ id }: { id: string }) {
	await db.Projects.findByIdAndDelete({
		_id: id,
	});

	const project = await db.Projects.findById({
		_id: id,
	});

	if (project) {
		throw new ClientError('Error to delete project!');
	}
}
