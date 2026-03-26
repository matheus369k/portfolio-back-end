import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';
import { googleProjectTotalViews } from './google-views.js';

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
	const projects = await db.Projects.find(findForType).limit(max);

	if (!projects) {
		throw new ClientError('Project not found!');
	}

	const projectsWithTotalViews = [];
	for (const project of projects) {
		const { totalViews } = await googleProjectTotalViews(project.property_id);

		const { __v, property_id, create_at, ...restProject } = project.toObject();
		projectsWithTotalViews.push({
			...restProject,
			access_total: totalViews,
		});
	}

	const ordinationProjects = projectsWithTotalViews.toSorted((curr, prev) => {
		return Number(prev.access_total) - Number(curr.access_total);
	});

	return {
		projects: ordinationProjects,
	};
}

type UpdatePropertyIdProject = {
	property_id: number;
	id: string;
};

export async function updatePropertyIdProject({ id, property_id }: UpdatePropertyIdProject) {
	const project = await db.Projects.findByIdAndUpdate(id, { property_id });

	if (!project) {
		throw new ClientError('Not found Project!');
	}
}

export async function deleteProject({ id }: { id: string }) {
	await db.Projects.findByIdAndDelete(id);

	const project = await db.Projects.findById(id);

	if (project) {
		throw new ClientError('Error to delete project!');
	}
}
