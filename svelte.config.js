import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		prerender: {
			default: true
		},
		adapter: adapter({
			fallback: 'index.html',
			precompress: false
		})
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
