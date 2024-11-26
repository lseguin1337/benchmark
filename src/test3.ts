async function test3() {
  console.log('before loading chunk');
  const { bar } = await import('./_testchunk3');
  bar();
}

test3();