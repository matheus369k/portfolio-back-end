import fastify from 'fastify';

import { env } from '@/env';
import { connectDataBase } from '@/config/database';

const app = fastify();

app.listen({
	port: env.PORT,
}).then(async ()=> {
    try {
        await connectDataBase();
        console.log("HTTP server running!")
    } catch (error: unknown) {
        console.log((error as Error).message);
    }
});
