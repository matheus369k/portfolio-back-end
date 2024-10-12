import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

export async function getCertificate(max = 0) {
	const certificates = await db.Certificates.find().limit(max);

	if (!certificates) {
		throw new ClientError('Certificates not found!');
	}

	return {
		certificates,
	};
}
