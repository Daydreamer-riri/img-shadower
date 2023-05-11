import fs from 'node:fs'
import { extname, isAbsolute, resolve } from 'node:path'
import { cwd } from 'node:process'
import mime from 'mime/lite'
import type { Args } from './cli'
import { draw } from './draw'

export async function main(args: Args) {
  const res = readImg(args.input)
  if (!res)
    return

  const [file, type] = res

  const svg = await draw(file, type) as string
  if (!svg)
    return

  fs.writeFileSync(resolve(cwd(), args.output), svg.toString())
}

export function readImg(input: string): [Buffer, string] | undefined {
  const path = isAbsolute(input) ? input : resolve(cwd(), input)
  if (!fs.existsSync(path)) {
    console.error('The target file does not exist.')
    return
  }
  const type = mime.getType(extname(path))!
  if (type.split('/')[0] !== 'image')
    console.error('The target file is not an image.')

  const file = fs.readFileSync(path)
  return [file, type]
}
