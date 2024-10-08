import { db } from '@/models';

export async function deleteProject({ id }: { id: string }) {
	await db.Projects.findByIdAndDelete({
		_id: id,
	});

	const project = await db.Projects.findById({
		_id: id,
	});

	if (project) {
		throw new Error('Error to delete project!');
	}
}
