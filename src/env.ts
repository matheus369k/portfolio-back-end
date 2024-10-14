import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const schemaEnv = z.object({
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string().url(),
	EMAIL_SERVER_ID: z.string(),
	EMAIL_TEMPLATE_ID: z.string(),
	EMAIL_PUBLIC_KEY: z.string(),
	EMAIL_PRIVATE_KEY: z.string(),
});

export const env = schemaEnv.parse(process.env);
