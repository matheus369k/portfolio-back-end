import { env } from '@/env';
import emailjs from '@emailjs/nodejs';

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
		throw new Error(`Error: ${(error as Error).message}`);
	}
}
