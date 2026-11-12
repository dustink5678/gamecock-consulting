/** Prefix public asset paths with Vite's base (needed for GitHub Pages). */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
