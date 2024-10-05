import { db } from '@/models';

export async function getCertificate(max?: number) {
	const certificates = max ? await db.Certificates.find().limit(max) : await db.Certificates.find();

	if (!certificates) {
		throw new Error('Certificates not found!');
	}

	return {
		certificates,
	};
}
