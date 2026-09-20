// Refreshes the committed fallback used when the GitHub API is unreachable at build
// time: `pnpm repos:snapshot`.
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fetchTopRepos } from '../src/lib/github.ts'

const repos = await fetchTopRepos({ allowFallback: false })

if (repos.length === 0) {
  console.error('GitHub returned nothing — snapshot left untouched.')
  process.exit(1)
}

const target = resolve('src/data/repos.json')
await writeFile(target, `${JSON.stringify(repos, null, 2)}\n`)
console.log(`Wrote ${repos.length} repositories to ${target}`)
