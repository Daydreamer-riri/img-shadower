import fs from 'node:fs'
import { extname, isAbsolute, resolve } from 'node:path'
import { cwd } from 'node:process'
import sizeOf from 'image-size'
import mime from 'mime/lite'
import type { Args } from './cli'
import { draw } from './draw'
import { asPng } from './asPng'

export type { Args }
export interface Rect {
  width: number
  height: number
}

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
    const outputPath = resolve(cwd(), output)

    const { width, height } = sizeOf(file)
    if (!width || !height)
      throw new Error('Can\'t get size')

    const rect = { width, height }

    const svg = await draw(file, type, rect, args)
    if (output.endsWith('.png')) {
      const pngBuffer = asPng(svg)
      fs.writeFileSync(outputPath, pngBuffer)
    }
    else {
      fs.writeFileSync(outputPath, svg.toString())
    }
  }
  catch (e) {
    console.error(e)
  }
}
