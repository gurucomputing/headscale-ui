# Architecture
Headscale-UI is based on the [svelte-kit](https://kit.svelte.dev/) framework and designed to compile to static HTML/JS/CSS. As such, once built (with `npm run build` or by downloading the packages), Headscale-UI can be hosted on any static file server (including headscale's static file server, once support has been added)

## App Design
Headscale-UI uses the `static` adapter built into svelte-kit, meaning that several svelte-kit functions are not feasible in a static deploymnet. Backend services (such as any route ending in `.js` or `.ts`) cannot be used, and most if not all script functions should be defined within the `onMount` function of svelte.

### Client Side Design
All Headscale-UI features and functions should be client side only. *Any* backend features should be considered to be implemented in a separate backend. This can be the [Headscale](https://github.com/juanfont/headscale) application itself (preferred), or potentially implementing a Backend-as-a-Service API such as [Supabase](https://supabase.com/).

## Dependencies
Dependencies are kept to a minimum and kept to large, actively maintained repositories. Great care should be taken before suggesting or adding any additional dependencies: headscale is a sensitive tool and attack surfaces must be kept minimal.

### Dev Dependencies
* [SvelteKit](https://kit.svelte.dev/) - The HTML/JS Framework and Toolkit
* [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
* [DaisyUI](https://daisyui.com/) - CSS Theme and Components
* [Typescript](https://www.typescriptlang.org/) - for static type checking
* [Prettier](https://prettier.io/) - for Code Formatting
* [Fuse.js](https://fusejs.io/) - for intelligent searching
