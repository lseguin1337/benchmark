const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");

function config(isIE, fileSuffix) {
  const outputSuffix = `${isIE ? '-es5' : '-es2017'}`;
  return {
    mode: 'production',
    entry: `./src/test${fileSuffix}.ts`,
    output: {
      filename: `bundle${outputSuffix}.js`,
      path: path.resolve(__dirname, 'dist', `test${fileSuffix}`)
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            ...(isIE ? ['babel-loader'] : []), // convert es2017 into es5 using babel
            'ts-loader'
          ],
          exclude: /node_modules/,
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new webpack.ProvidePlugin({
        ...(isIE ? {
          // declare Promise for IE use case
          Promise: ['promise-polyfill', 'default']
        } : null),
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        // To garanti we have one single chunk in the end
        maxChunks: 1
      }),
      // just to be able to run the test into a browser
      new HtmlWebpackPlugin({
        filename: `index${outputSuffix}.html`,
        template: path.resolve(__dirname, './index.html'),
      }),
    ],
  }
}

const files = fs.readdirSync(__dirname + '/src')
  .map((name) => name.match(/^test([0-9]+)\.ts$/)?.[1])
  .filter((name) => !!name);

module.exports = files.flatMap((fileIndex) => {
  return [
    config(true, fileIndex),
    config(false, fileIndex),
  ];
});