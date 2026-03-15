import { defaultTheme } from '@sveltepress/theme-default'
import { sveltepress } from '@sveltepress/vite'
import { defineConfig } from 'vite'
import remarkMermaid from './src/lib/remark-mermaid.js'
import { searchIndexPlugin } from './searchPlugin.ts'

const config = defineConfig({

	server: {
		allowedHosts: ["*"]
	},
	plugins: [
		searchIndexPlugin(),
		sveltepress({
			remarkPlugins: [remarkMermaid],
			theme: defaultTheme({

				sidebar: {

					"/": [{
						title: "🏠 主页",
						to: "/",
					}, {
						title: "规范",
						items: [{
							title: "总览",
							to: "/rule"
						}, {
							title: "Elysia",
							to: "/rule/elysia"
						}]
					}, {
						title: "牛邮裹文档",
						items: [{
							title: "user应用",
							to: "/6ugo/users"
						}, {
							title: "admin应用",
							to: "/6ugo/admin"
						}, {
							title: "社区应用",
							to: "/6ugo/community"
						}, {
							title: "卡号应用",
							to: "/6ugo/card"
						}]
					}, {
						title: "技术文档",
						items: [{
							title: "锁",
							to: "/6ugo/note/lock"
						}]
					}, {
						title: "笔记",
						items: [{
							title: "快速学习",
							items: [{
								title: "KNN",
								to: "/6ugo/note/sklearn/KNN"
							}]
						}]
					}]
				},
				github: 'https://github.com/Blackman99/sveltepress',
				logo: '/sveltepress.svg',
			}),
			siteConfig: {
				title: '牛邮裹 后端开发文档',
				description: '@ 基于`库码内部参考代码规范文档`',
			},
		}),
	],
})

export default config;

