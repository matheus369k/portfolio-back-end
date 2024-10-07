import fastify from 'fastify';

import { env } from '@/env';
import { connectDataBase } from '@/config/database';
import * as routes from './router';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(routes.getToolsRoute);
app.register(routes.registerToolsRouter);
app.register(routes.getCertificatesRouter);
app.register(routes.registerCertificatesRouter);
app.register(routes.getProjectsRouter);
app.register(routes.registerProjectsRouter);

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