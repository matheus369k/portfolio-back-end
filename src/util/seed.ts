import { connectDataBase } from '@/config/database.js';
import { db } from '@/models/index.js';
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
			description: 'Desenvolvedor HTML e CSS',
			emission_data: '2023-06-12',
			link: 'http://localhost:3000/link',
			order: 3,
			title: 'Desenvolvedor CSS e HTML',
		},
		{
			description: 'Desenvolvedor JavaScript',
			emission_data: '2023-03-12',
			link: 'http://localhost:3000/link',
			order: 2,
			title: 'Desenvolvedor JavaScript',
		},
		{
			description: 'Desenvolvedor Typescript',
			emission_data: '2023-01-12',
			link: 'http://localhost:3000/link',
			order: 2,
			title: 'Desenvolvedor Typescript',
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
