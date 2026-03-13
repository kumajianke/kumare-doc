import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({
			pages: 'dist',
		}),
		prerender: {
			handleMissingId: "warn"
		},
		paths: {
			// 当我们在本地开发时路径是根目录，打包发布时路径改成你的仓库名
			base: process.argv.includes('dev') ? '' : '/'
		}
	},

}

export default config
