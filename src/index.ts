import fs from 'node:fs'
import { extname, isAbsolute, resolve } from 'node:path'
import { cwd } from 'node:process'
import mime from 'mime/lite'
import type { Args } from './cli'
import { draw } from './draw'

export type { Args }

export async function main(args: Args) {
  const { input, output } = args
  const path = isAbsolute(input) ? input : resolve(cwd(), input)
  const type = mime.getType(extname(path))!

  if (!fs.existsSync(path)) {
    console.error('The target file does not exist.')
    return
  }

  if (type.split('/')[0] !== 'image') {
    console.error('The target file is not an image.')
    return
  }

  try {
    const file = fs.readFileSync(path)
    const svg = await draw(file, type, args)
    fs.writeFileSync(resolve(cwd(), output), svg.toString())
  }
  catch (e) {
    console.error(e)
  }
}
