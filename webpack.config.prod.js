var path = require('path')
var webpack = require('webpack')
var renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var srcPath = path.resolve(__dirname, 'src')
var indexHtmlPath = path.resolve(__dirname, 'index.html')
var faviconPath = path.resolve(__dirname, 'favicon.ico')

module.exports = {
  context: srcPath,
  entry: path.join(srcPath, 'index.js'),
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    loaders: [
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!less'),
      }, {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      }, {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.(jpg|jpeg|png|gif|eot|svg|ttf|woff|woff2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=[name].[hash].[ext]',
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
  },
  plugins: [
    new ExtractTextPlugin('[name].[hash].css'),
    new HtmlWebpackPlugin({
      inject: true,
      template: indexHtmlPath,
      favicon: faviconPath,
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
