import { describe, expect, it } from 'vitest'
import { ordinationProjectsForViews } from './ordination-projects-for-views'

describe('OrdinationProjectsForViews Function', () => {
	const fakerProjects = Array.from({ length: 3 }).map(() => ({
		image_url:
			'https://raw.githubusercontent.com/matheus369k/matheus369k.github.io/refs/heads/main/portfolio-images/projects-images/coffee-delivery.jpg',
		links: [
			{
				name: 'site',
				link: 'https://matheus369k.github.io/coffee-delivery/',
			},
			{
				name: 'repositório',
				link: 'https://github.com/matheus369k/coffee-delivery',
			},
		],
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
		access_total: Math.ceil(Math.random() * 10).toString(),
	}))

	it('should ordination from lesser to bigger', () => {
		const projects = ordinationProjectsForViews(fakerProjects as never)

		for (let index = 0; index < projects.length; index++) {
			const isLast = index === projects.length - 1
			const currProjectAccess = Number(projects[index].access_total)

			if (isLast) {
				expect(currProjectAccess).toBeLessThanOrEqual(Number(projects[index - 1].access_total))
				return
			}

			expect(currProjectAccess).toBeGreaterThanOrEqual(Number(projects[index + 1].access_total))
		}
	})
})
