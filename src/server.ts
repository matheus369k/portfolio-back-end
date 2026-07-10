import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import certificatesRoutes from './routers/certificate.js'
import { errorHandler } from './errors/error-handler.js'
import mailRoutes from './routers/mail.js'
import websiteViewsRoutes from './routers/website-views.js'
import checkHearthRoutes from './routers/check-hearth.js'
import toolsRoutes from './routers/tool.js'
import projectsRoutes from './routers/project.js'
import cors from '@fastify/cors'
import { env } from '@/util/env.js'
import fastify from 'fastify'
import database from './database/database.js'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(cors, {
	origin: env.FRONTEND_URL,
})

app.setErrorHandler(errorHandler)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(websiteViewsRoutes.getTotal)
app.register(checkHearthRoutes.isOn)

app.register(mailRoutes.sendOne)

app.register(toolsRoutes.createOne)
app.register(toolsRoutes.deleteById)
app.register(toolsRoutes.getAll)

app.register(certificatesRoutes.createOne)
app.register(certificatesRoutes.getWithLimite)
app.register(certificatesRoutes.getAll)
app.register(certificatesRoutes.deleteById)

app.register(projectsRoutes.updatePropertyId)
app.register(projectsRoutes.deleteById)
app.register(projectsRoutes.createOne)
app.register(projectsRoutes.getForType)

app.listen({ port: env.PORT, host: env.HOST }).then((url) => {
	database
		.connect({
			url: env.DATABASE_URL,
			options: {
				pass: env.DATABASE_PASSWORD,
				user: env.DATABASE_USERNAME,
			},
		})
		.then(() => {
			console.log(`HTTP server running in ${url}...`)
		})
})
