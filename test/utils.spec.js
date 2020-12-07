const { strictEqual } = require('assert')
const { sanitizeFilename, isYamlExt } = require('../src/utils.js')

describe('utils', function () {
  describe('sanitizeFilename', function () {
    it('./test/openapi.yaml', function () {
      strictEqual(sanitizeFilename('./test/openapi.yaml'), './test/openapi.yaml')
    })
    it('../test/openapi.yaml', function () {
      strictEqual(sanitizeFilename('../test/openapi.yaml'), 'test/openapi.yaml')
    })
    it('./../../test/openapi.yaml', function () {
      strictEqual(sanitizeFilename('./../../test/openapi.yaml'), './test/openapi.yaml')
    })
    it('./../../test/..\\openapi.yaml', function () {
      strictEqual(sanitizeFilename('./../../test/..\\openapi.yaml'), './test/openapi.yaml')
    })
  })
  describe('isYamlExt', function () {
    it('openapi.yml', function () {
      strictEqual(isYamlExt('openapi.yml'), true)
    })
    it('openapi.yaml', function () {
      strictEqual(isYamlExt('openapi.yaml'), true)
    })
    it('openapi.yaml.bak', function () {
      strictEqual(isYamlExt('openapi.yaml.bak'), false)
    })
    it('null', function () {
      strictEqual(isYamlExt(null), false)
    })
  })
})
