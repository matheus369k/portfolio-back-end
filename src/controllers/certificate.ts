import { ClientError, NotFoundError } from '@/errors/client-error.js'
import type { CertificateModel } from '@/models/types'

type CreateOneProps = {
	order: number
	title: string
	description: string
	emission_data: Date
	link: string
}

export class CertificatesControllers {
	private certificateModel: CertificateModel

	constructor(certificateModel: CertificateModel) {
		this.certificateModel = certificateModel
	}

	async createOne(props: CreateOneProps) {
		const { title, description, emission_data, link, order } = props
		const certificates = await this.certificateModel.create({
			emission_data,
			description,
			title,
			order,
			link,
		})

		if (!certificates) {
			throw new NotFoundError('error to tried create a new certificate!')
		}

		return {
			certificatesId: certificates.id,
		}
	}

	async getAll() {
		const certificates = await this.certificateModel.find().sort({
			order: 'asc',
		})

		if (!certificates) {
			throw new NotFoundError('not found certificates!')
		}

		return {
			certificates,
		}
	}

	async getWithLimite(max = 0) {
		const certificates = await this.certificateModel.find().limit(max).sort({
			order: 'asc',
		})

		if (!certificates) {
			throw new NotFoundError('not found certificates!')
		}

		return {
			certificates,
		}
	}

	async deleteById({ id }: { id: string }) {
		await this.certificateModel.findByIdAndDelete({
			_id: id,
		})

		const certificates = await this.certificateModel.findById({
			_id: id,
		})

		if (certificates) {
			throw new ClientError('error to tried delete certificate!')
		}
	}
}
