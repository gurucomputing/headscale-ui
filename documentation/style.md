# Style
Rough style guide for development in Headscale-UI. Documentation will be improved as style gets more defined

## CSS
all `<style>` sections should be defined as PostCSS using the `lang=postcss` tag.

CSS should be written as tailwind classes. Where (when) tailwind classes become cumbersome (10+ classes for an HTML object), classes should instead be broken into a separate `<style>` section of the svelte component with common naming conventions (such as `.btn-primary` for common buttons). Any styles defined this way should not conflict with style names defined in the `/src/app.css` files.

`<style>` classes that span multiple components should be defined in the `/src/app.css` file.

## Typescript
All `<script>` sections within a svelte component should be defined as `lang=ts` to take advantage of typescript static typing.

## Naming Conventions
* Svelte pages are defined in the `/src/routes` directory and should follow a lower case, single word description, followed by extension and `.svelte`. (such as `settings.html.svelte`).
* Svelte components ate defined in the `/src/lib` directory and should be kept in subfolders. Subfolders should be defined by the route page, followed by the component name. Svelte components are defined by single word, Capitalized descriptions (such as `UserCard`.svelte
* Variables are defined using camelCase variables where possible.