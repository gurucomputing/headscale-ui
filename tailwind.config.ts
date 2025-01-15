import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},

	daisyui: {
		themes: [
			{
				hsui: {
					"primary": "#065f46",
					"secondary": "#0369a1",
					"accent": "#6b21a8",
					"neutral": "#78716c",
					"base-100": "#FFFFFF",
					"info": "#3ABFF8",
					"success": "#36D399",
					"warning": "#FBBD23",
					"error": "#F87272",
				},
			},
			"light",
			"dark",
			"cupcake",
			"bumblebee",
			"emerald",
			"corporate",
			"synthwave",
			"retro",
			"cyberpunk",
			"valentine",
			"halloween",
			"garden",
			"forest",
			"aqua",
			"lofi",
			"pastel",
			"fantasy",
			"wireframe",
			"black",
			"luxury",
			"dracula",
			"cmyk",
			"autumn",
			"business",
			"acid",
			"lemonade",
			"night",
			"coffee",
			"winter",
			"dim",
			"nord",
			"sunset"
		]
	},

	plugins: [typography, containerQueries, daisyui]
} satisfies Config;
