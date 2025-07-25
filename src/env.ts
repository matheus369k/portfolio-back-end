import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const schemaEnv = z.object({
	FRONTEND_URL: z.string().url().default('*'),
	PORT: z.coerce.number().default(3333),
	HOST: z.coerce.string().default('0.0.0.0'),
	DATABASE_URL: z.string().url(),
	DATABASE_USERNAME: z.string(),
	DATABASE_PASSWORD: z.string(),
	EMAIL_SERVER_ID: z.string(),
	EMAIL_TEMPLATE_ID: z.string(),
	EMAIL_PUBLIC_KEY: z.string(),
	EMAIL_PRIVATE_KEY: z.string(),
});

export const env = schemaEnv.parse(process.env);
