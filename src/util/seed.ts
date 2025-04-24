import { connectDataBase } from '@/config/database.js';
import { db } from '@/models/index.js';
import { createId } from '@paralleldrive/cuid2';
import mongoose from 'mongoose';

async function seed() {
	await connectDataBase();

	await db.Projects.deleteMany({});
	await db.Certificates.deleteMany({});
	await db.Tools.deleteMany({});

	await db.Projects.insertMany([
		{
			order: 2,
			name: 'Todo',
			slug: 'todo',
			image_url: 'http://localhost:3000/png',
			links: {
				deploy: 'http://localhost:3000/deploy',
				repository: 'http://localhost:3000/repositorey',
			},
			tools: ['HTML', 'CSS', 'Javascript'],
			description: 'Aplicação para registar e adicionar estados a tarefas ja completas.',
		},
		{
			order: 1,
			name: 'Pokedex',
			slug: 'pokedex',
			image_url: 'http://localhost:3000/gif',
			links: {
				deploy: 'http://localhost:3000/deploy',
				repository: 'http://localhost:3000/repositorey',
			},
			tools: ['React', 'Typescript', 'TailwindCSS'],
			description: 'Aplicação e um grande guia sobre os monstros do anime Pokemon.',
		},
	]);
	await db.Certificates.insertMany([
		{
			order: 3,
			title: 'Desenvolvedor CSS e HTML',
			validation_code: `${createId()}`,
			image_url: 'http://localhost:3000/desenvolvedor-css-e-html',
			verification_url: 'http://localhost:3000/verification',
		},
		{
			order: 2,
			title: 'Desenvolvedor Javascript',
			validation_code: `${createId()}`,
			image_url: 'http://localhost:3000/desenvolvedor-javascript',
			verification_url: 'http://localhost:3000/verification',
		},
		{
			order: 1,
			title: 'Desenvolvedor Fullstack',
			validation_code: `${createId()}`,
			image_url: 'http://localhost:3000/desenvolvedor-fullstack',
			verification_url: 'http://localhost:3000/verification',
		},
	]);
	await db.Tools.insertMany([
		{
			name: 'react',
			svg_url: 'http://localhost:3000/react',
		},
		{
			name: 'vite',
			svg_url: 'http://localhost:3000/vite',
		},
		{
			name: 'javascript',
			svg_url: 'http://localhost:3000/javascript',
		},
		{
			name: 'typescript',
			svg_url: 'http://localhost:3000/typescript',
		},
	]);
}

seed().finally(() => {
	mongoose.connection.close();
	console.log('Close to Database!');
});
