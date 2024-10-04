import { env } from '@/env';
import mongoose from 'mongoose';

export async function connectDataBase() {
	await mongoose
		.connect(env.DATABASE_URL)
		.then(() => {
			console.log('Connected to Database!');
		})
		.catch(() => console.log('Error: connected to database!'));
}
