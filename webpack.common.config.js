const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const cssnext = require('postcss-cssnext');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      ifDev(env, new webpack.HotModuleReplacementPlugin()),
      ifProd(env, new webpack.NoErrorsPlugin()),
      ifProd(env, new webpack.optimize.DedupePlugin()),
      ifProd(env, new webpack.optimize.OccurrenceOrderPlugin()),
      ifProd(env, new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false
        }
      }))
    ]),
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: __dirname,
          query: {
            plugins: [
              ['import', { libraryName: 'antd', style: 'css' }]
            ],
          }
        },
        {
          test: /\.(scss|css$)$/,
          include: [/node_modules\/.*antd/],
          loader: ExtractTextPlugin.extract('style', 'css')
        },
        {
          test: /\.(scss|css$)$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
        },
        {
          test: /\.(png|jpg|svg|ico)$/,
          loader: "file?name=images/[name].[ext]"
        },
        {
          test: /\.(ttf|woff|eot|ttf|otf|woff2)$/,
          loader: "file?name=fonts/[name].[ext]"
        },
      ]
    },
    postcss: function(webpack) {
      return {
        plugins: [
          cssnext
        ]
      };
    }
  }
}

function server(env) {
  return {
    name: 'server',
    devtool: 'eval',
    entry: './src/server.js',
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
          'client': JSON.stringify(true),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
    ]),
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: __dirname,
        },
        {
          test: /\.(scss|css$)$/,
          exclude: /node_modules/,
          loader: 'css/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        },
        {
          test: /\.(png|jpg|svg|ico)$/,
          loader: "file?name=images/[name].[ext]"
        },
        {
          test: /\.(ttf|woff|eot|ttf|otf|woff2)$/,
          loader: "file?name=fonts/[name].[ext]"
        },
      ]
    }
  }
}

module.exports = function(env) {
  return [server(env), client(env)]
}
