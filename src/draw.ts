import satori from 'satori'
import sizeOf from 'image-size'

export async function draw(imageData: Buffer, type: string, border: string) {
  const { width, height } = sizeOf(imageData)
  if (!width || !height)
    throw new Error('Can\'t get size')

  const relHeight = height * 0.8
  const boxShadow = `,
    0 0.2px 0.3px hsl(0deg 0% 0% / 0),
    0 ${relHeight / 20}px ${relHeight * 3 / 40}px hsl(0deg 0% 0% / 0.2),
    0 ${relHeight / 24}px ${relHeight / 16}px hsl(0deg 0% 0% / 0.4),
    `

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
                boxShadow,
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
