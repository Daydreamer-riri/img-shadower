import type { ArgsDef, ParsedArgs } from 'citty'
import { defineCommand, runMain } from 'citty'
import { DEFAULT_ELEVATION, DESCRIPTION, NAME, VERSION } from './constants'
import { main } from '.'

const commandArgs = {
  input: {
    type: 'string',
    required: true,
    alias: 'i',
    description: 'input file',
  },
  output: {
    type: 'string',
    alias: 'o',
    required: true,
    description: 'output file',
  },
  border: {
    type: 'string',
    alias: 'b',
    default: '#a8a8a8',
    description: 'border color',
  },
  elevation: {
    type: 'string',
    alias: 'e',
    default: `${DEFAULT_ELEVATION}`,
    description: 'elevation',
  },
} as const

export type Args = ParsedArgs<typeof commandArgs>

const mainCommand = defineCommand({
  meta: {
    name: NAME,
    version: VERSION,
    description: DESCRIPTION,
  },
  args: commandArgs as ArgsDef,
  run(context) {
    const { args } = context
    run(args as any)
  },
})

function run(args: Args) {
  main(args)
}

runMain(mainCommand)
