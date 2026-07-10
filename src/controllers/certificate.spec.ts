import { beforeEach, describe, expect, it, vi } from 'vitest'
import models from '@/models/models'
import { CertificatesControllers } from './certificate'
import certificate from '@/models/schemas/certificate'
import { createId } from '@paralleldrive/cuid2'

describe('Certificate Controllers', () => {
	const mockedCertificateModel = vi.mocked(models.Certificates(certificate))
	const fakerCertificate = {
		title: 'Aprofundando em Hooks',
		description:
			'Roteamento, renderizações no React e fluxo do useEffect, gerenciamento de estados via Contextos do React e Reducers, immer, estilização via CSS-in-JS e formulários',
		link: 'https://app.rocketseat.com.br/certificates/49dba041-ff6c-4734-bcc6-29e8447ab250',
		emission_data: new Date('03-01-2025'),
		order: 2,
	}

	describe('CreateOne controller', () => {
		const spyCreateCertificate = vi.spyOn(mockedCertificateModel, 'create')
		const defaultResponse = {
			...fakerCertificate,
			create_at: Date.now(),
			id: createId(),
		}

		beforeEach(() => {
			spyCreateCertificate.mockImplementation(() => defaultResponse as never)
		})

		it('should create a new certificate', async () => {
			await new CertificatesControllers(mockedCertificateModel).createOne(fakerCertificate)

			expect(mockedCertificateModel.create).toHaveBeenCalledWith(fakerCertificate)
		})

		it('should returned certificateId to end', async () => {
			const response = await new CertificatesControllers(mockedCertificateModel).createOne(
				fakerCertificate,
			)

			expect(response).toMatchObject({ certificatesId: defaultResponse.id })
		})

		it('should dispatch error when not receive nothing', async () => {
			spyCreateCertificate.mockImplementation(() => undefined as never)

			expect(
				new CertificatesControllers(mockedCertificateModel).createOne(fakerCertificate),
			).rejects.toThrow('error to tried create a new certificate!')
		})
	})

	describe('GetAll controller', () => {
		const spyFindCertificate = vi.spyOn(mockedCertificateModel, 'find')
		const spySortCertificate = vi.fn()
		const defaultResponse = Array.from({ length: 3 }).map((_, index) => ({
			...fakerCertificate,
			create_at: Date.now(),
			order: index + 1,
			id: createId(),
		}))

		beforeEach(() => {
			spyFindCertificate.mockImplementation(() => {
				return {
					sort: spySortCertificate.mockResolvedValue(defaultResponse),
				} as never
			})
		})

		it('should receive property order and asc in sort for ordination datas', async () => {
			await new CertificatesControllers(mockedCertificateModel).getAll()

			expect(spySortCertificate).toHaveBeenCalledWith({
				order: 'asc',
			})
		})

		it('not should insert nothing props in find for get all', async () => {
			await new CertificatesControllers(mockedCertificateModel).getAll()

			expect(spyFindCertificate).toHaveBeenCalledWith()
		})

		it('should returned data certificates', async () => {
			const response = await new CertificatesControllers(mockedCertificateModel).getAll()

			expect(response.certificates).toMatchObject(defaultResponse)
		})

		it('should dispatch error when not receive nothing', async () => {
			spyFindCertificate.mockImplementation(() => {
				return {
					sort: spySortCertificate.mockResolvedValue(undefined),
				} as never
			})

			expect(new CertificatesControllers(mockedCertificateModel).getAll()).rejects.toThrow(
				'not found certificates!',
			)
		})
	})

	describe('GetWithLimit controller', () => {
		const spyFindCertificate = vi.spyOn(mockedCertificateModel, 'find')
		const spySortCertificate = vi.fn()
		const spyLimitCertificate = vi.fn()
		const defaultResponse = Array.from({ length: 3 }).map((_, index) => ({
			...fakerCertificate,
			create_at: Date.now(),
			order: index + 1,
			id: createId(),
		}))

		beforeEach(() => {
			spyFindCertificate.mockImplementation(
				() =>
					({
						limit: spyLimitCertificate.mockReturnValue({
							sort: spySortCertificate.mockResolvedValue(defaultResponse),
						}),
					}) as never,
			)
		})

		it('should receive property order and asc in sort for ordination datas', async () => {
			await new CertificatesControllers(mockedCertificateModel).getWithLimite()

			expect(spySortCertificate).toHaveBeenCalledWith({
				order: 'asc',
			})
		})

		it('should receive 0 in limit when not add value in getWithLimite', async () => {
			await new CertificatesControllers(mockedCertificateModel).getWithLimite()

			expect(spyLimitCertificate).toHaveBeenCalledWith(0)
		})

		it('should receive custom max in limit when add value in getWithLimite', async () => {
			await new CertificatesControllers(mockedCertificateModel).getWithLimite(6)

			expect(spyLimitCertificate).toHaveBeenCalledWith(6)
		})

		it('not should insert nothing props in find for get all', async () => {
			await new CertificatesControllers(mockedCertificateModel).getWithLimite()

			expect(spyFindCertificate).toHaveBeenCalledWith()
		})

		it('should returned data certificates', async () => {
			const response = await new CertificatesControllers(mockedCertificateModel).getWithLimite()

			expect(response.certificates).toMatchObject(defaultResponse)
		})

		it('should dispatch error when not receive nothing', async () => {
			spyFindCertificate.mockImplementation(
				() =>
					({
						limit: spyLimitCertificate.mockReturnValue({
							sort: spySortCertificate.mockResolvedValue(undefined),
						}),
					}) as never,
			)

			expect(new CertificatesControllers(mockedCertificateModel).getWithLimite()).rejects.toThrow(
				'not found certificates!',
			)
		})
	})

	describe('DeleteById controller', () => {
		const spyFindByIdCertificate = vi.spyOn(mockedCertificateModel, 'findById')
		const spyFindByIdAndDeleteCertificate = vi.spyOn(mockedCertificateModel, 'findByIdAndDelete')
		const certificateId = createId()

		beforeEach(() => {
			spyFindByIdCertificate.mockImplementation(() => undefined as never)
			spyFindByIdAndDeleteCertificate.mockImplementation(() => undefined as never)
		})

		it('should receive certificate id in findByIdAndDelete', async () => {
			await new CertificatesControllers(mockedCertificateModel).deleteById({ id: certificateId })

			expect(spyFindByIdAndDeleteCertificate).toHaveBeenCalledWith({ _id: certificateId })
		})

		it('should receive certificate id in findById', async () => {
			await new CertificatesControllers(mockedCertificateModel).deleteById({ id: certificateId })

			expect(spyFindByIdCertificate).toHaveBeenCalledWith({ _id: certificateId })
		})

		it('should dispatch error when not receive anything', async () => {
			spyFindByIdCertificate.mockImplementation(() => {
				return {
					...fakerCertificate,
					create_at: Date.now(),
					id: createId(),
				} as never
			})

			expect(
				new CertificatesControllers(mockedCertificateModel).deleteById({ id: certificateId }),
			).rejects.toThrow('error to tried delete certificate!')
		})
	})
})
