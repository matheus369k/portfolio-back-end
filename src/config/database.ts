import { env } from '@/env.js';
import mongoose from 'mongoose';

export async function connectDataBase() {
	await mongoose
		.connect(env.DATABASE_URL)
		.then(() => {
			console.log('Connected to Database!');
		})
		.catch((error) => {
			throw new Error(`Error: connected to database! type:${(error as Error).message}`);
		});
}
