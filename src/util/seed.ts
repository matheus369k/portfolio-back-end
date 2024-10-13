import { connectDataBase } from '@/config/database.js';
import { db } from '@/models/index.js';
import {createId} from '@paralleldrive/cuid2';
import mongoose from 'mongoose';

async function seed() {
	await connectDataBase();

	await db.Projects.deleteMany({});
	await db.Certificates.deleteMany({});
	await db.Tools.deleteMany({});

	await db.Projects.insertMany([
		{
			name: 'Todo',
			slug: 'todo',
			images_url: {
				png: 'http://localhost:3000/png',
				gif: 'http://localhost:3000/gif',
			},
			tools: ['HTML', 'CSS', 'Javascript'],
			description: 'Aplicação para registar e adicionar estados a tarefas ja completas.',
		},
		{
			name: 'Pokedex',
			slug: 'pokedex',
			images_url: {
				png: 'http://localhost:3000/png',
				gif: 'http://localhost:3000/gif',
			},
			tools: ['React', 'Typescript', 'TailwindCSS'],
			description: 'Aplicação e um grande guia sobre os monstros do anime Pokemon.',
		},
	]);
	await db.Certificates.insertMany([
		{
			title: 'Desenvolvedor CSS e HTML',
			validation_code: `${createId()}`,
			image_url: 'http://localhost:3000/desenvolvedor-css-e-html',
			verification_url: 'http://localhost:3000/verification',
		},
		{
			title: 'Desenvolvedor Javascript',
			validation_code: `${createId()}`,
			image_url: 'http://localhost:3000/desenvolvedor-javascript',
			verification_url: 'http://localhost:3000/verification',
		},
		{
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
