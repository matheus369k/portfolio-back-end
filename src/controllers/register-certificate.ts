import { ClientError } from '@/errors/client-error.js';
import { db } from '@/models/index.js';

interface RegisterCertificatesProps {
	order: number;
	title: string;
	description: string;
	emission_data: Date;
	link: string;
}

export async function registerCertificates({
	title,
	description,
	emission_data,
	link,
	order,
}: RegisterCertificatesProps) {
	const certificates = await db.Certificates.create({
		emission_data,
		description,
		title,
		order,
		link,
	});

	if (!certificates) {
		throw new ClientError('Error to create certificate!');
	}

	return {
		certificatesId: certificates.id,
	};
}
