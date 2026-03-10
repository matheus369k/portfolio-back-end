import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { connectDataBase } from '@/config/database.js';
import * as certificateRoutes from './routers/certificate.js';
import { errorHandler } from './error-handler.js';
import * as mailRoutes from './routers/mail.js';
import * as hearthRoutes from './routers/hearth.js';
import * as toolRoutes from './routers/tool.js';
import * as projectRoutes from './routers/project.js';
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

app.register(hearthRoutes.CheckHearth);
app.register(mailRoutes.inviteEmailRouter);

app.register(toolRoutes.registerToolsRouter);
app.register(toolRoutes.deleteToolRouter);
app.register(toolRoutes.getToolsRoute);

app.register(certificateRoutes.registerCertificatesRouter);
app.register(certificateRoutes.deleteCertificatesRouter);
app.register(certificateRoutes.getCertificatesRouter);

app.register(projectRoutes.registerProjectsRouter);
app.register(projectRoutes.deleteProjectsRouter);
app.register(projectRoutes.getProjectsRouter);

app.listen({ port: env.PORT, host: env.HOST }).then(() => {
	connectDataBase()
		.then(() => {
			console.log('HTTP server running!');
		})
		.catch((error) => {
			console.log(error.message);
		});
});
