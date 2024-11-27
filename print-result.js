const fs = require('fs');

const tests = fs.readdirSync(__dirname + '/dist').map((file) => `${__dirname}/dist/${file}`);

function gain(origin, dest) {
  return (((1 - (dest / origin)) * 100) * -1).toFixed(2) + '%';
}

for (const test of tests) {
  const es5 = fs.statSync(`${test}/bundle-es5.js`).size;
  const es6 = fs.statSync(`${test}/bundle-es6.js`).size;
  const es2017 = fs.statSync(`${test}/bundle-es2017.js`).size;
  console.log({
    test,
    bundleSizes: { es5, es6, es2017, gainEs5vsEs2017: gain(es5, es2017), gainEs5vsEs6: gain(es5, es6) },
  });
}