#!/usr/bin/env node

const { version } = require('../package.json')
const path = require('path')
const server = require('..')
const { isYamlExt } = require('../src/utils.js')

const help = () => `
    openapi-editor [opts] filename.yaml

    -h, --help            print help and exit
    -v, --version         print version and exit
    -p, --port <number>   port to start server
`

function argv (args) {
  const argv = args || process.argv.slice(2)
  const cmd = {
    port: 8000,
    file: 'openapi-petstore.yaml'
  }

  while (argv.length) {
    const arg = argv.shift()

    switch (arg) {
      case '-h':
      case '--help':
        cmd.help = help()
        break
      case '-v':
      case '--version':
        cmd.version = version
        break
      case '-p':
      case '--port': {
        const port = Number(argv.shift())
        if (port > 0 && port <= 65535) {
          cmd.port = port
        }
        break
      }
      default: {
        const basename = path.basename(arg)
        if (isYamlExt(basename)) {
          cmd.file = basename
        }
      }
    }
  }
  return cmd
}

function main () {
  const cmd = argv()

  if (cmd.help) {
    console.log(cmd.help)
  } else if (cmd.version) {
    console.log(cmd.version)
  } else {
    server(cmd)
  }
}

main()
