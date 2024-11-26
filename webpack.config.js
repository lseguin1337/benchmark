const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

function config(isIE, fileSuffix) {
  return {
    mode: 'production',
    entry: `./src/test${fileSuffix}.ts`,
    output: {
      filename: `bundle${isIE ? '-es5' : '-es2017'}.js`,
      path: path.resolve(__dirname, 'dist', `test${fileSuffix}`)
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            ...(isIE ? ['babel-loader'] : []), // convert es2017 into es5 using babel
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
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
    plugins: isIE ? [
      new webpack.ProvidePlugin({
        Promise: ['promise-polyfill', 'default'] // import Promise polyfill for IE
      })
    ] : [],
  }
}

const files = fs.readdirSync(__dirname + '/src').filter(file => /^test/.test(file)).map((name) => name.match(/^test([0-9]+)\.ts$/)[1]);

module.exports = files.flatMap((fileIndex) => {
  return [
    config(true, fileIndex),
    config(false, fileIndex),
  ];
});