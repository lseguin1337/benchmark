const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");

function config(testId, target, activePromisePolyfill) {
  return {
    mode: 'production',
    entry: `./src/test${testId}.ts`,
    output: {
      filename: `bundle-${target}.js`,
      path: path.resolve(__dirname, 'dist', `test${testId}`)
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                context: __dirname,
                configFile: path.resolve(__dirname, `tsconfig.${target}.json`),
              }
            }
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
        ...(activePromisePolyfill ? {
          // Promise: ['promise-polyfill', 'default'],
          Promise: ['core-js-pure/stable/promise/index.js']
        } : null),
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        // To garanti we have one single chunk in the end
        maxChunks: 1
      }),
      // just to be able to run the test into a browser
      new HtmlWebpackPlugin({
        filename: `index-${target}.html`,
        template: path.resolve(__dirname, './index.html'),
      }),
    ],
  }
}

module.exports = fs.readdirSync(__dirname + '/src')
  .map((name) => name.match(/^test([0-9]+)\.ts$/)?.[1])
  .filter((name) => !!name)
  .flatMap((testId) => {
    return [
      config(testId, 'es5', true),
      config(testId, 'es6', false),
      config(testId, 'es2017', false),
    ];
  });