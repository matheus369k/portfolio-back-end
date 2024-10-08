import { db } from "@/models";

export async function deleteTool({ id }: { id: string }) {
	await db.Tools.findByIdAndDelete({
		_id: id,
	});

	const tool = await db.Tools.findById({
		_id: id,
	});

	if (tool) {
		throw new Error('Error to delete tool!');
	}
}