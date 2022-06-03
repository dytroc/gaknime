import { readdir, readFile } from "fs/promises"
import { join } from "path"
import { Banner, Gaknime } from "./types"
import yaml from "yaml"
import { z } from "zod"

const episodeSchema = z.object({
  title: z.string(),
  code: z.string(),
  noPrefix: z.boolean().default(false),
})

const schema = z.object({
  title: z.string(),
  thumbnail: z.string(),
  tags: z.array(z.string()).min(1).default(["없음"]),
  genres: z.array(z.string()).min(1).default(["없음"]),
  episodes: z.array(episodeSchema),
  id: z.number().int(),
  description: z.string(),
})

const bannerSchema = z.object({
  catchPhrase: z.string(),
  ref: z.number().int(),
})

export const loadGaknimes = async (): Promise<Gaknime[]> => {
  const root = join(process.cwd(), "gaknimes")
  const files = await readdir(root)

  const output: Gaknime[] = []

  for (const file of files) {
    const data = yaml.parseAllDocuments(
      await (await readFile(join(root, file))).toString()
    )
    for (const doc of data) {
      const json = doc.toJSON()
      const res = await schema.safeParseAsync(json)
      if (res.success) {
        output.push(res.data)
      } else {
        console.warn(
          `Failed validate gaknime: #${data.indexOf(doc) + 1} of ${file}`
        )
      }
    }
  }

  return output
}

export const loadBanners = async (gaknimes: Gaknime[]): Promise<Banner[]> => {
  const root = join(process.cwd(), "public", "banners")
  const files = await readdir(root)

  const output: Banner[] = []

  for (const file of files) {
    const json = JSON.parse(
      (await readFile(join(root, file, "meta.json"))).toString()
    )
    const res = await bannerSchema.safeParseAsync(json)
    if (res.success) {
      const gaknime = gaknimes.find((x) => x.id === res.data.ref)
      if (!gaknime) {
        console.warn(`Cannot find gaknime #${res.data.ref} - ${file}`)
        continue
      }
      output.push({
        catchPhrase: res.data.catchPhrase,
        gaknime,
        directory: file,
      })
    } else {
      console.warn(`Failed validate banner: ${file}`)
    }
  }

  return output
}
