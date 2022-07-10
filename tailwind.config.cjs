const config = {
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
		],
	},

	plugins: [require("@tailwindcss/typography"), require("daisyui")]
};

module.exports = config;
