import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { connectDataBase } from '@/config/database.js';
import * as deleteRoutes from './router/delete.js';
import { errorHandler } from './error-handler.js';
import * as postRoutes from './router/post.js';
import * as getRoutes from './router/get.js';
import cors from '@fastify/cors';
import { env } from '@/env.js';
import fastify from 'fastify';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(cors, {
	origin: env.FRONTEND_URL,
});

app.setErrorHandler(errorHandler);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getRoutes.CheckHealth);
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

app.listen({ port: env.PORT, host: env.HOST }).then(() => {
	connectDataBase()
		.then(() => {
			console.log('HTTP server running!');
		})
		.catch((error) => {
			console.log(error.message);
		});
});
