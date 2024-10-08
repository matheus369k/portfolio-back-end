import { db } from '@/models';

interface RegisterCertificatesProps {
	title: string;
	image_url: string;
	validation_code: string;
	verification_url: string;
}

export async function registerCertificates({
	title,
	image_url,
	validation_code,
	verification_url,
}: RegisterCertificatesProps) {
	const certificates = await db.Certificates.create({
		title,
		image_url,
		validation_code,
		verification_url,
	});

	if (!certificates) {
		throw new Error('Error to create certificate!');
	}

	return {
		certificatesId: certificates.id,
	};
}