import { connectDataBase } from '@/config/database.js';
import { db } from '@/models/index.js';
import mongoose from 'mongoose';

async function seed() {
	await connectDataBase();

	await db.Projects.deleteMany({});
	await db.Certificates.deleteMany({});
	await Promise.all([
		await db.Tools.front_end.deleteMany({}),
		await db.Tools.back_end.deleteMany({}),
		await db.Tools.another.deleteMany({}),
	]);

	await db.Projects.insertMany([
		{
			image_url:
				'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/projects-images/coffee-delivery.jpg',
			links: {
				deploy: 'https://matheus369k.github.io/coffee-delivery/',
				repository: 'https://github.com/matheus369k/coffee-delivery',
			},
			slug: 'coffee-delivery',
			name: 'Coffee Delivery',
			tools: [
				'react',
				'vite',
				'typescript',
				'styled-components',
				'jest',
				'testing-library',
				'react-hook-form',
				'zod',
				'react-router-dom',
				'eslint',
				'prettier',
				'axios',
			],
			description:
				'Coffee Delivery e uma plataforma fictícia que, tem como objetivo criar e oferecer uma experiência de compra de café prática e conveniente. Você pode escolher entre uma variedade de tipos de café e métodos de preparo, tudo de forma fácil e rápida. Compre diretamente pelo site e receba o seu café fresco diretamente em casa, sem precisar sair de casa',
			order: 1,
		},
		{
			image_url:
				'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/projects-images/eletrocado.jpg',
			links: {
				deploy: 'https://matheus369k.github.io/mercado-eletrocado/',
				repository: 'https://github.com/matheus369k/mercado-eletrocado',
			},
			slug: 'eletrocado',
			name: 'Eletrocado',
			tools: ['react', 'vite', 'css', 'typescript', 'react-router-dom', 'eslint', 'redux', 'axios'],
			description:
				'Eletrocado e uma plataforma de E-commerce fictícia especializado em produtos eletrônicos. O site oferece uma ampla variedade de produtos eletrônicos, desde smartphones e tablets até notebooks e acessórios. Os usuários podem explorar os produtos disponíveis, adicionar itens ao carrinho de compras e finalizar as compras de forma rápida e segura.',
			order: 3,
		},
		{
			image_url:
				'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/projects-images/play-movies-series.jpg',
			links: {
				deploy: 'https://matheus369k.github.io/play-movies-series/',
				repository: 'https://github.com/matheus369k/play-movies-series',
			},
			slug: 'play-movies-and-series',
			name: 'Play Movies and Series',
			tools: [
				'react',
				'vite',
				'typescript',
				'tailwindcss',
				'jest',
				'testing-library',
				'react-router-dom',
				'eslint',
				'babel',
				'axios',
			],
			description:
				'Play Movies and Series e uma plataforma de streaming fictícia, com o objetivo de simular um site de streaming real, onde os usuários podem ter acesso a filmes e séries online. A plataforma oferece uma ampla variedade de conteúdo, incluindo filmes e séries de diferentes gêneros. Os usuários podem navegar pela biblioteca de conteúdo disponível, pesquisar por títulos específicos.',
			order: 2,
		},
		{
			image_url:
				'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/projects-images/manage-landing-page.jpg',
			links: {
				deploy: 'https://matheus369k.github.io/manage-landing-page-master/',
				repository: 'https://github.com/matheus369k/manage-landing-page-master',
			},
			slug: 'manage-landing-page',
			name: 'Manage Landing Page',
			tools: ['html', 'sass', 'javascript', 'jquery'],
			description:
				'O projeto tem como objetivo criar uma landing page responsiva e atraente para a empresa fictícia Manage. A landing page foi desenvolvida utilizando HTML, CSS e JavaScript, com foco em uma interface limpa e intuitiva. O objetivo principal é promover a empresa e seus serviços de forma eficaz, atraindo visitantes e convertendo-os em clientes.',
			order: 4,
		},
	]);
	await db.Certificates.insertMany([
		{
			title: 'Aprofundando em Hooks',
			description:
				'Roteamento, renderizações no React e fluxo do useEffect, gerenciamento de estados via Contextos do React e Reducers, immer, estilização via CSS-in-JS e formulários',
			link: 'https://app.rocketseat.com.br/certificates/49dba041-ff6c-4734-bcc6-29e8447ab250',
			emission_data: '03-01-2025',
			order: 2,
		},
		{
			title: 'HTTP e Performance',
			description:
				'Acessibilidade, modal, requisição HTTP, conexão com API, gerenciamento de estados via contexto, performance.',
			link: 'https://app.rocketseat.com.br/certificates/9fe561e0-1254-43da-b21b-e5e87d7e6ebf',
			emission_data: '03-04-2025',
			order: 3,
		},
		{
			title: 'Fundamentos do React',
			description:
				'Fundamentos do React, componentes, propriedades, estados, imutabilidades, hooks e Typescript',
			link: 'https://app.rocketseat.com.br/certificates/d88cdf3d-dfa2-4d9e-8879-49fcd2d12a8f',
			emission_data: '06-13-2024',
			order: 4,
		},
		{
			title: 'NLW Pocket: Javascript - Full-stack Intermediário',
			description:
				'Desenvolvimento de uma aplicação back-end em Node.js, aplicação dos conceitos de API REST, utilizando TypeScript, Fastify como framework, integração do DrizzleORM + PostgreSQL, Docker e Zod para validação de dados. Desenvolvimento de uma aplicação front-end em ReactJS, aplicação dos conceitos de Propriedades, Estados e Componentes, tipagem com Typescript, tooling com Vite, interface responsiva com TailwindCSS, consumo de API Node.js, gerenciamento de dados assíncronos com TanStack Query.',
			link: 'https://app.rocketseat.com.br/certificates/b4f9901f-3376-430d-89bd-609c1e2c2435',
			emission_data: '09-15-2024',
			order: 1,
		},
		{
			title: 'NLW Journey - Nodejs',
			description:
				'Desenvolvimento de uma aplicação back-end em Node.js, aplicação dos conceitos de API REST, utilizando TypeScript, Fastify como framework, integração do Prisma ORM + SQLite e Zod para validação de dados.',
			link: 'https://app.rocketseat.com.br/certificates/a0e4b86b-5e71-4c6f-a2dd-2ab7ed427935',
			emission_data: '07-12-2024',
			order: 5,
		},
	]);

	await Promise.all([
		db.Tools.front_end.insertMany([
			{
				name: 'html',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/html.svg',
			},
			{
				name: 'css',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/css.svg',
			},
			{
				name: 'javascript',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/javascript.svg',
			},
			{
				name: 'react',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/react.svg',
			},
			{
				name: 'typescript',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/typescript.svg',
			},
			{
				name: 'tailwindcss',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/tailwindcss.svg',
			},
			{
				name: 'styled-components',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/styled-components.svg',
			},
			{
				name: 'vitejs',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/vitejs.svg',
			},
			{
				name: 'sass',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/sass.svg',
			},
			{
				name: 'next-js',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/next-js.svg',
			},
			{
				name: 'jquery',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/jquery.svg',
			},
			{
				name: 'redux',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/redux.svg',
			},
		]),
		db.Tools.back_end.insertMany([
			{
				name: 'javascript',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/javascript.svg',
			},
			{
				name: 'typescript',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/typescript.svg',
			},
			{
				name: 'nodejs',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/nodejs.svg',
			},
			{
				name: 'fastify',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/fastify.svg',
			},
			{
				name: 'express',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/express.svg',
			},
		]),
		db.Tools.another.insertMany([
			{
				name: 'babel',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/babel.svg',
			},
			{
				name: 'webpack',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/webpack.svg',
			},
			{
				name: 'git',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/git.svg',
			},
			{
				name: 'jest',
				svg_url:
					'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/tools/jest.svg',
			},
		]),
	]);
}

seed().finally(() => {
	mongoose.connection.close();
	console.log('Close to Database!');
});
