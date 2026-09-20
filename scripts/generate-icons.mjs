// Regenerates the raster app icons from the portrait: `pnpm icons`.
// The SVG favicon is hand-authored (public/favicon.svg) and not touched here.
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'

const SOURCE = resolve('src/assets/avatar.png')
const OUT = resolve('public')
const BACKGROUND = { r: 22, g: 32, b: 43, alpha: 1 } // --color-ink-900

/** The portrait on a solid brand plate, so home-screen icons are never transparent. */
const icon = async (size, name, padding) => {
  const inner = size - padding * 2
  // `cover` crops the portrait to a square so the head fills the plate instead of
  // sitting in a letterbox; `attention` keeps the crop on the subject.
  const portrait = await sharp(SOURCE)
    .resize(inner, inner, { fit: 'cover', position: sharp.strategy.attention })
    .toBuffer()

  await sharp({ create: { width: size, height: size, channels: 4, background: BACKGROUND } })
    .composite([{ input: portrait, top: padding, left: padding }])
    .png()
    .toFile(resolve(OUT, name))

  console.log(`${name} ${size}x${size}`)
}

await mkdir(OUT, { recursive: true })
await Promise.all([
  icon(180, 'apple-touch-icon.png', 12),
  icon(192, 'icon-192.png', 12),
  icon(512, 'icon-512.png', 34),
])
