const Express = require('express')
const path = require('path')

const app = Express()
const port = process.env.PORT || 3000
const host = process.env.HOST || "0.0.0.0"
const env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.dev.config.js')
  const compiler = require('webpack')(config[1])
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    noInfo: true,
    publicPath: config[1].output.publicPath,
    devServer: { compress: true }
  }))
  app.use(webpackHotMiddleware(compiler))

  console.log(
    "\n##########################\n" +
    "- Mode: Develop \n" +
    "- Listening on port: " + port +
    "\n##########################\n"
  )
} else {
  console.log(
    "\n##########################\n" +
    "- Mode: Production \n" +
    "- Listening on port: " + port +
    "\n##########################\n"
  )
}

app.use(Express.static(path.resolve(__dirname + '/../public'), { maxAge: 86400000 }))
app.use('/static', Express.static(path.resolve(__dirname + '/../dist'), { maxAge: 86400000 }))

app.use(require('../dist/SSR').default)

app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
