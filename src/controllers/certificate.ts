import { ClientError } from '@/errors/client-error.js'
import models from '@/models/models.js'

interface RegisterCertificatesProps {
	order: number
	title: string
	description: string
	emission_data: Date
	link: string
}

export async function registerCertificates({
	title,
	description,
	emission_data,
	link,
	order,
}: RegisterCertificatesProps) {
	const certificates = await models.Certificates().create({
		emission_data,
		description,
		title,
		order,
		link,
	})

	if (!certificates) {
		throw new ClientError('Error to create certificate!')
	}

	return {
		certificatesId: certificates.id,
	}
}

export async function getCertificate(max = 0) {
	const certificates = await models.Certificates().find().limit(max).sort({
		order: 'asc',
	})

	if (!certificates) {
		throw new ClientError('Certificates not found!')
	}

	return {
		certificates,
	}
}

export async function deleteCertificate({ id }: { id: string }) {
	await models.Certificates().findByIdAndDelete({
		_id: id,
	})

	const certificates = await models.Certificates().findById({
		_id: id,
	})

	if (certificates) {
		throw new ClientError('Error to delete certificate!')
	}
}
