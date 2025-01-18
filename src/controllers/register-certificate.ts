import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

interface RegisterCertificatesProps {
	title: string;
	image_url: string;
	validation_code: string;
	verification_url: string;
	order: number;
}

export async function registerCertificates({
	title,
	image_url,
	validation_code,
	verification_url,
	order,
}: RegisterCertificatesProps) {
	const certificates = await db.Certificates.create({
		title,
		image_url,
		validation_code,
		verification_url,
		order,
	});

	if (!certificates) {
		throw new ClientError('Error to create certificate!');
	}

	return {
		certificatesId: certificates.id,
	};
}
