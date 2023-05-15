import { Resvg } from '@resvg/resvg-js'

export function asPng(svg: string) {
  const resvg = new Resvg(svg, {
    background: 'rgba(0, 0, 0, 0)',
    fitTo: {
      mode: 'original',
    },
  })
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()
  return pngBuffer
}
