import { z } from 'zod';

const schemaEnv = z.object({
	PORT: z.coerce.number().default(3000),
	DATABASE_URL: z.string().url(),
	EMAIL_SERVER_ID: z.string(),
	EMAIL_TEMPLATE_ID: z.string(),
	EMAIL_PUBLIC_KEY: z.string(),
	EMAIL_PRIVATE_KEY: z.string(),
});

export const env = schemaEnv.parse(process.env);
