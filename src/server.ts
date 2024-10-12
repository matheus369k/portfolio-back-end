import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { connectDataBase } from '@/config/database.js';
import * as deleteRoutes from './router/delete.js';
import { errorHandler } from './error-handler.js';
import * as postRoutes from './router/post.js';
import * as getRoutes from './router/get.js';
import Fastify from 'fastify';
import { env } from '@/env.js';

const app = Fastify();

app.setErrorHandler(errorHandler);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getRoutes.getToolsRoute);
app.register(getRoutes.getProjectsRouter);
app.register(getRoutes.getCertificatesRouter);

app.register(postRoutes.inviteEmailRouter);
app.register(postRoutes.registerToolsRouter);
app.register(postRoutes.registerProjectsRouter);
app.register(postRoutes.registerCertificatesRouter);

app.register(deleteRoutes.deleteToolRouter);
app.register(deleteRoutes.deleteProjectsRouter);
app.register(deleteRoutes.deleteCertificatesRouter);

app.listen({ port: env.PORT }).then(() => {
	connectDataBase()
		.then(() => {
			console.log('HTTP server running!');
		})
		.catch((error) => {
			console.log(error.message);
		});
});
