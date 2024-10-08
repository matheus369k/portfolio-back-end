import { db } from '@/models';

export async function deleteCertificate({ id }: { id: string }) {
	await db.Certificates.findByIdAndDelete({
		_id: id,
	});

	const certificates = await db.Certificates.findById({
		_id: id,
	});

	if (certificates) {
		throw new Error('Error to delete certificate!');
	}
}
