import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

const categories = ['front_end', 'back_end', 'another'];

export async function deleteTool({ id }: { id: string }) {
	for (const category of categories) {
		await db.Tools[category as 'front_end' | 'back_end' | 'another'].findByIdAndDelete({
			_id: id,
		});

		const result = await db.Tools[category as 'front_end' | 'back_end' | 'another'].findById({
			_id: id,
		});

		console.log(result);

		if (result) {
			throw new ClientError('Error to delete tool!');
		}
	}
}
