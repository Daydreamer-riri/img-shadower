import satori from 'satori'
import sizeOf from 'image-size'
import { elevations } from './elevations'
import { DEFAULT_ELEVATION } from './constants'
import type { Args } from '.'

export async function draw(imageData: Buffer, type: string, { border, elevation }: Args) {
  const { width, height } = sizeOf(imageData)
  if (!width || !height)
    throw new Error('Can\'t get size')

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
        },
        children: [
          {
            type: 'img',
            props: {
              src: `data:${type};base64,${imageData.toString('base64')}`,
              style: {
                transform: 'scale(0.8)',
                borderRadius: '16px',
                boxShadow: elevations?.[elevation] ?? elevations[DEFAULT_ELEVATION],
              },
              width,
              height,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                height: `${height}px`,
                width: `${width}px`,
                transform: 'scale(0.8)',
                borderRadius: '16px',
                position: 'absolute',
                border: `1px solid ${border}`,
              },

            },
          },
        ],
      },
    },
    {
      width,
      height,
      fonts: [],
    },
  )
  return svg
}
