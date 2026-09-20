export const SITE = {
  url: 'https://batazor.ru',
  title: 'Victor Login',
  handle: '@batazor',
  tagline: 'Software developer',
  description:
    'Victor Login (@batazor) — software developer. Contact information and links to my social profiles.',
  locale: 'en',
  /** Stable, unhashed portrait URL used by structured data. */
  portrait: '/batazor.png',
} as const

export type SocialId = 'github' | 'x' | 'linkedin'

export type SocialLink = {
  id: SocialId
  label: string
  href: string
}

export const SOCIALS: readonly SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/batazor' },
  { id: 'x', label: 'X', href: 'https://x.com/batazor' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/batazor/' },
] as const
