import type { ArgsDef, ParsedArgs } from 'citty'
import { defineCommand, runMain } from 'citty'
import { DESCRIPTION, NAME, VERSION } from './constants'
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
