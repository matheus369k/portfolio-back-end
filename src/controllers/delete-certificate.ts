import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

export async function deleteCertificate({ id }: { id: string }) {
	await db.Certificates.findByIdAndDelete({
		_id: id,
	});

	const certificates = await db.Certificates.findById({
		_id: id,
	});

	if (certificates) {
		throw new ClientError('Error to delete certificate!');
	}
}
