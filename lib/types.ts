export type Gaknime = {
  id: number
  title: string
  description: string
  thumbnail: string
  tags: string[]
  genres: string[]
  episodes: Episode[]
}

export type Episode = {
  title: string
  code: string
  noPrefix: boolean
}

export type Banner = {
  gaknime: Gaknime
  catchPhrase: string
  directory: string
}
