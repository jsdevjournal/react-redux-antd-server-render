const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const cssnext = require('postcss-cssnext');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/styles/ant-default-vars.less'), 'utf8'));

process.noDeprecation = true

function ifProd(env, plugin) {
  if (env === 'prod') return plugin
  return undefined
}

function ifDev(env, plugin) {
  if (env === 'dev') return plugin
  return undefined
}

function noUndefined(array) {
  return array.filter(function(item) {
    return !!item
  })
}

function client(env) {
  return {
    name: 'client',
    devtool: env === 'prod' ? 'source-map' : 'eval',
    entry: {
      bundle: noUndefined([
        'babel-polyfill',
        'whatwg-fetch',
        ifDev(env, 'webpack-hot-middleware/client'),
        './src/client'
      ])
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/static/'
    },
    plugins: noUndefined([
      new CompressionPlugin(),
      new ExtractTextPlugin('style.css'),
      new webpack.DefinePlugin({
        "process.env": {
          'client': JSON.stringify(true),
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }
      }),
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        options: {
          postcss: cssnext,
          // required to avoid issue css-loader?modules
          // this is normally the default value, but when we use
          // LoaderOptionsPlugin, we must specify it again, otherwise,
          // context is missing (and css modules names can be broken)!
          context: __dirname,
        },
      }),
      ifDev(env, new webpack.HotModuleReplacementPlugin()),
      ifProd(env, new webpack.NoEmitOnErrorsPlugin()),
      ifProd(env, new webpack.ExtendedAPIPlugin()),
      ifProd(env, new webpack.LoaderOptionsPlugin({
        minimize: true
      })),
      ifProd(env, new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      })),
    ]),
    resolve: {
      modules: [
        path.join(__dirname, 'src'),
        'node_modules'
      ],
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: __dirname,
          query: {
            plugins: [
              ['import', { libraryName: 'antd', style: true }]
            ],
          }
        },
        {
          test: /\.less$/,
          include: [/node_modules\/.*antd/],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'less-loader?{"modifyVars":'+JSON.stringify(themeVariables)+'}'],
          })
        },
        {
          test: /\.(scss|css$)$/,
          include: [/node_modules\/react-credit-cards/],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader'],
          })
        },
        {
          test: /\.(scss|css$)$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader'],
          })
        },
        {
          test: /\.(png|jpg|svg|ico)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
        {
          test: /\.(ttf|woff|eot|ttf|otf|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        },
      ]
    }
  }
}

function server(env) {
  return {
    name: 'server',
    devtool: 'eval',
    entry: ['babel-polyfill', './src/server.js'],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'SSR.js',
      libraryTarget: 'commonjs2',
      publicPath: '/static/'
    },
    target: 'node',
    externals: nodeExternals(),
    plugins: noUndefined([
      new webpack.DefinePlugin({
        "process.env": {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }
      }),
    ]),
    resolve: {
      modules: [
        path.join(__dirname, 'src'),
        'node_modules'
      ],
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: __dirname,
        },
        {
          test: /\.(scss|css$)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'css-loader/locals',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'sass-loader',
            }
          ]
        },
        {
          test: /\.(png|jpg|svg|ico)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
        {
          test: /\.(ttf|woff|eot|ttf|otf|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        },
      ]
    }
  }
}

module.exports = function(env) {
  return [server(env), client(env)]
}
