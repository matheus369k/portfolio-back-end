import { z } from 'zod';

const schemaEnv = z.object({
	PORT: z.coerce.number().default(3000),
	DATABASE_URL: z.string().url(),
});

export const env = schemaEnv.parse(process.env);
