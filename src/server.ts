import fastify from 'fastify';

import { env } from '@/env';
import { connectDataBase } from '@/config/database';
import { getToolsRoute, registerToolsRouter } from './router';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getToolsRoute);
app.register(registerToolsRouter);

app
	.listen({
		port: env.PORT,
	})
	.then(async () => {
		try {
			await connectDataBase();
			console.log('HTTP server running!');
		} catch (error: unknown) {
			console.log((error as Error).message);
		}
	});
