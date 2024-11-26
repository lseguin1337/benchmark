const fs = require('fs');

const tests = fs.readdirSync(__dirname + '/dist').map((file) => `${__dirname}/dist/${file}`);

for (const test of tests) {
  const es5 = fs.statSync(`${test}/bundle-es5.js`).size;
  const es2017 = fs.statSync(`${test}/bundle-es2017.js`).size;
  console.log({
    test,
    bundleSizes: { es5, es2017, percent: ((es5 / es2017) * 100).toFixed(2) + '%' },
  });
}