const sanitizeFilename = (filename = '') =>
  String(filename).replace(/\.{2,}[/\\]/g, '').replace(/^[/\\]/, '')

const isYamlExt = (uri) => /.ya?ml$/.test(uri)

const httpError = (status, err) => {
  err.status = status
  return err
}

module.exports = {
  sanitizeFilename,
  isYamlExt,
  httpError
}
