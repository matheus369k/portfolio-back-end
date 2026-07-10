import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getAndAddProjectsViews } from './get-projects-views'
import { analyticsDataClient } from './google-analitycs'

describe('GetAddProjectsViews Function', () => {
	const fakerProjects = Array.from({ length: 3 }).map((_, index) => ({
		type: 'full-stack',
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
		create_at: Date.now(),
		property_id: index.toString(),
		id: index.toString(),
	}))
	const mockedGoogleAnalytics = vi.mocked(analyticsDataClient)
	const spyGoogleAnalyticsRunReport = vi.spyOn(mockedGoogleAnalytics, 'runReport')
	const propertyId = fakerProjects[0].property_id
	const totalViews = '228'

	beforeEach(() => {
		spyGoogleAnalyticsRunReport.mockImplementation((props) => {
			const id = props?.property?.split('/')[1]
			if (propertyId !== id) return undefined

			return [
				{
					rows: [
						{
							metricValues: [
								{
									value: totalViews,
								},
							],
						},
					],
				},
			]
		})
	})

	it('should add access_total in all projects', async () => {
		const products = await getAndAddProjectsViews(fakerProjects as never)

		const fakerProjectsWithAccess = fakerProjects.map((fakerProject, index) => {
			const { type, create_at, property_id, id, ...props } = fakerProject
			const access_total = !index /* isFirst */ ? totalViews : '0'
			return {
				...props,
				access_total,
			}
		})

		expect(products).toMatchObject(fakerProjectsWithAccess)
	})

	it('should returned access_total with 0 when property_id is null', async () => {
		const fakerProjectsWithPropertyIdNull = fakerProjects.map((fakerProject) => ({
			...fakerProject,
			property_id: null,
		}))
		const products = await getAndAddProjectsViews(fakerProjectsWithPropertyIdNull as never)

		const fakerProjectsWithAccess = fakerProjects.map((fakerProject) => {
			const { type, create_at, property_id, id, ...props } = fakerProject

			return {
				...props,
				access_total: '0',
			}
		})

		expect(products).toMatchObject(fakerProjectsWithAccess)
	})
})
