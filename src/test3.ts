async function test3() {
  console.log('before loading chunk');
  const { bar } = await import('./test3.chunk');
  bar();
}

test3();