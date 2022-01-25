/* eslint-disable global-require */
const { resolve } = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// eslint-disable-next-line import/no-extraneous-dependencies
// const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
  devtool: 'source-map',
  entry: './src/index.jsx',
  mode: 'development',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    hot: true,
    open: true,
    static: {
      directory: resolve(__dirname, 'dist'),
    },
    // contentBase: resolve(__dirname, 'dist'),
    port: 3000,
    host: 'localhost',
    // index: 'index.html',
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        use: ['eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|less|css)$/i,
        use: [
          // {
          //   loader: MiniCSSExtractPlugin.loader,
          //   options: {
          //     publicPath: '../',
          //   },
          // },
          'style-loader',
          'css-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: () => [
          //       require('autoprefixer'),
          //     ],
          //   },
          // },
          'sass-loader',
        ],
        // exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    // new MiniCSSExtractPlugin({
    //   filename: 'css/main.css',
    // }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/src/img`,
          to: 'images',
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
}

module.exports = config
