import fastify from 'fastify';

import { env } from '@/env';
import { connectDataBase } from '@/config/database';
import * as getRoutes from './router/get';
import * as postRoutes from './router/post';
import * as deleteRoutes from './router/delete';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getRoutes.getToolsRoute);
app.register(getRoutes.getCertificatesRouter);
app.register(getRoutes.getProjectsRouter);

app.register(postRoutes.registerToolsRouter);
app.register(postRoutes.registerCertificatesRouter);
app.register(postRoutes.registerProjectsRouter);

app.register(deleteRoutes.deleteToolRouter);
app.register(deleteRoutes.deleteCertificatesRouter);
app.register(deleteRoutes.deleteProjectsRouter);

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
