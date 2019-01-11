const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'inferno': 'inferno/dist/index.dev.esm.js',
    },
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("styles.css"),
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};