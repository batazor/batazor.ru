import type { APIRoute } from 'astro'
import { renderOgImage } from '../lib/og'

export const GET: APIRoute = async () =>
  new Response(await renderOgImage(), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
