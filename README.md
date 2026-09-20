# batazor.ru

Personal landing page for [Victor Login (@batazor)](https://batazor.ru).

## Stack

|             |                                                                                        |
| ----------- | -------------------------------------------------------------------------------------- |
| Framework   | [Astro 7](https://astro.build) — static output, zero client JS except the theme toggle |
| Styling     | [Tailwind CSS 4](https://tailwindcss.com) via the Vite plugin                          |
| Fonts       | Inter, self-hosted at build time through Astro's Fonts API                             |
| Icons       | Inline SVG (Simple Icons paths), no icon runtime                                       |
| Social card | 1200×630 PNG rendered at build time with `satori` + `resvg`                            |
| Live data   | Top repositories pulled from the GitHub API during the build                           |
| Tooling     | TypeScript (strict), Prettier, pnpm                                                    |
| Hosting     | GitHub Pages, built from `docs/` by GitHub Actions                                     |

## Develop

```bash
pnpm install
pnpm dev
```

| Command        | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `pnpm dev`     | Dev server at http://localhost:4321                          |
| `pnpm build`   | Production build into `docs/`                                |
| `pnpm preview` | Serve the production build locally                           |
| `pnpm check`   | `astro check` — type-checks `.astro` and `.ts` files         |
| `pnpm format`  | Format with Prettier                                         |
| `pnpm icons`   | Regenerate the raster app icons from `src/assets/avatar.png` |

## Content

Name, handle, tagline and social links live in [`src/consts.ts`](src/consts.ts) — edit there rather
than in the markup. Adding a network also needs its SVG path in
[`src/components/Icon.astro`](src/components/Icon.astro).

## Generated assets

`/og.png` is rendered on every build from [`src/lib/og.ts`](src/lib/og.ts) — change the card there,
not in an image editor. The raster app icons in `public/` are produced by `pnpm icons` and
committed; `public/favicon.svg` is hand-authored and follows the OS colour scheme.

The "Open source" list is fetched from the GitHub API during the build
([`src/lib/github.ts`](src/lib/github.ts)). If the API is unreachable or rate-limited the section is
omitted and the build still succeeds, so a network hiccup can never break a deploy.

## Deploy

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): install →
type-check → format check → build → publish to GitHub Pages. A nightly cron reruns the same workflow
so the GitHub numbers on the page stay current. The custom domain is pinned by `public/CNAME`, which
is copied into the build output.
