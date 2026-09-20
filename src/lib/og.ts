import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { SITE } from '../consts'

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

/** Minimal `createElement` so this file needs no JSX pipeline. */
type Node = { type: string; props: Record<string, unknown> }

const h = (type: string, props: Record<string, unknown>, ...children: unknown[]): Node => ({
  type,
  props:
    children.length === 0
      ? props
      : { ...props, children: children.length === 1 ? children[0] : children },
})

const fromFontsource = (file: string) =>
  readFile(fileURLToPath(import.meta.resolve(`@fontsource/inter/files/${file}`)))

// Resolved from the project root: this module only ever runs during the build,
// where `import.meta.url` points at a bundled chunk rather than at `src/`.
const asset = (path: string) => readFile(resolve(process.cwd(), 'src/assets', path))

export async function renderOgImage(): Promise<Uint8Array<ArrayBuffer>> {
  const [regular, bold, avatar] = await Promise.all([
    fromFontsource('inter-latin-400-normal.woff'),
    fromFontsource('inter-latin-800-normal.woff'),
    asset('avatar.png'),
  ])

  const card = h(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 72,
        padding: 80,
        backgroundColor: '#16202b',
        // Accent bloom behind the portrait, matching the site's hover colour.
        backgroundImage:
          'radial-gradient(circle at 28% 48%, rgba(27,196,163,0.20) 0%, rgba(27,196,163,0) 52%)',
        position: 'relative',
        fontFamily: 'Inter',
      },
    },
    h('img', {
      src: `data:image/png;base64,${avatar.toString('base64')}`,
      width: 331,
      height: 400,
    }),
    h('div', { style: { display: 'flex', width: 4, height: 360, backgroundColor: '#2b3d4f' } }),
    h('div', {
      style: {
        position: 'absolute',
        bottom: 56,
        right: 80,
        display: 'flex',
        fontSize: 26,
        color: '#7f93a8',
      },
      children: SITE.url.replace('https://', ''),
    }),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
      h(
        'div',
        { style: { display: 'flex', fontSize: 84, fontWeight: 800, color: '#f4f7fa' } },
        SITE.title,
      ),
      h(
        'div',
        { style: { display: 'flex', fontSize: 44, fontWeight: 800, color: '#2ee0bb' } },
        SITE.handle,
      ),
      h(
        'div',
        { style: { display: 'flex', fontSize: 32, color: '#c7d2dd', marginTop: 8 } },
        SITE.tagline,
      ),
    ),
  )

  const svg = await satori(card as never, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: 'Inter', data: regular, weight: 400, style: 'normal' },
      { name: 'Inter', data: bold, weight: 800, style: 'normal' },
    ],
  })

  // Copied into a plain ArrayBuffer: resvg hands back a Node Buffer, whose backing
  // store is typed as ArrayBufferLike and so is not accepted as a response body.
  const png = new Resvg(svg).render().asPng()
  const bytes = new Uint8Array(new ArrayBuffer(png.byteLength))
  bytes.set(png)

  return bytes
}
