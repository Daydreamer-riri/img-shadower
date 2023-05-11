import { readFileSync } from 'node:fs'

const { version, name, description } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url)).toString(),
)

export const VERSION = version as string
export const NAME = name as string
export const DESCRIPTION = description as string
