const fs = require('fs')
const path = require('path')
const express = require('express')
const multer  = require('multer')

function setupApp ({port, file = 'openapi-petstore.yaml'} = {}) {
  const app = express()
  const cwd = process.cwd()
  const upload = multer({ dest: cwd })

  const logger = (req, res, next) => {
    const time = Date.now()
    res.on('finish', () => {
      const { method, url } = req
      const { statusCode } = res
      // eslint-disable-next-line no-console
      console.log('%s %s %s %s', method, url, statusCode, Date.now() - time)
    })
    next()
  }

  // app.use(logger)

  app.get('/', (req, res, next) => {
    const { file: qfile } = req.query
    if (!qfile) {
      res.redirect('/?file=' + encodeURIComponent(file))
      return
    }
    next()
  })

  app.post('/upload', upload.single(), function (req, res, next) {
    const { file, yaml } = req.body
    const filename = path.resolve(cwd, file)
    console.log('INFO: writing to %s', filename)
    fs.writeFile(filename, yaml, 'utf8', (err) => {
      if (err) {
        next(err)
      } else {
        res.end()
      }
    })
  })
  app.use('/', express.static(`${__dirname}/public`))
  app.use('/',
    (req, res, next) => {
      let err
      if (!/.ya?ml$/.test(req.url)) {
        err = new Error('Not Found ' + req.url)
        err.status = 404
      }
      next(err)
    },
    express.static(cwd)
  )

  app.use((err, req, res, next) => {
    console.error('ERROR: %s', err.message)
    res.status(err.status || 500).end()
  })

  if (port) {
    app.listen(port, '127.0.0.1', () => {
      console.log(`openapi editor running on http://localhost:${port}`)
    })
  }

  return app
}

module.exports = setupApp

if (module === require.main) {
  const port = process.env.PORT || 8000
  setupApp({port})
}
