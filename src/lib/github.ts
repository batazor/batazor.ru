/**
 * Top repositories by star count, fetched once at build time.
 *
 * The GitHub search API allows only 10 unauthenticated requests per minute, and any
 * API can have a bad day, so two guards apply: the result is memoised per process,
 * and a failed request falls back to a committed snapshot. The section therefore
 * never disappears from a deploy, and a network hiccup never fails the build.
 *
 * Refresh the snapshot with `pnpm repos:snapshot`.
 */
import snapshot from '../data/repos.json' with { type: 'json' }

export type Repo = {
  name: string
  url: string
  description: string | null
  stars: number
}

type SearchResponse = {
  items?: Array<{
    name: string
    html_url: string
    description: string | null
    stargazers_count: number
  }>
}

const USER = 'batazor'
const COUNT = 3

// Search ranks by stars server-side, so the result stays correct however many
// repositories the account grows to — unlike paging /users/:user/repos by hand.
const ENDPOINT =
  `https://api.github.com/search/repositories` +
  `?q=${encodeURIComponent(`user:${USER} fork:false archived:false`)}` +
  `&sort=stars&order=desc&per_page=${COUNT}`

let cached: Promise<Repo[]> | undefined

async function request(): Promise<Repo[]> {
  const token = process.env.GITHUB_TOKEN

  const response = await fetch(ENDPOINT, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': `${USER}.ru-build`,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  const { items = [] } = (await response.json()) as SearchResponse

  return items.map((repo) => ({
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    stars: repo.stargazers_count,
  }))
}

export function fetchTopRepos({ allowFallback = true } = {}): Promise<Repo[]> {
  cached ??= request().catch((error: unknown) => {
    if (!allowFallback) throw error

    console.warn(`[github] ${error} — falling back to the committed snapshot`)
    return snapshot as Repo[]
  })

  return cached
}
