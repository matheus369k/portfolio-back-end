import { ClientError } from '@/errors/client-error.js';
import emailjs from '@emailjs/nodejs';
import { env } from '@/env.js';

interface inviteEmailProps {
	email: string;
	from_name: string;
	message: string;
}

export async function inviteEmail({ email, from_name, message }: inviteEmailProps) {
	try {
		await emailjs.send(
		env.EMAIL_SERVER_ID,
		env.EMAIL_TEMPLATE_ID,
		{
			email,
			from_name,
			message,
		},
		{
			publicKey: env.EMAIL_PUBLIC_KEY,
			privateKey: env.EMAIL_PRIVATE_KEY,
		},
	);	
	} catch (error) {
		throw new ClientError(`Error: ${(error as Error).message}`);
	}
}
