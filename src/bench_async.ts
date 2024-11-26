export async function asyncBench(fn: () => any, count = 1000) {
  const start = performance.now();
  console.log(`Start asyncBench`);
  for (let i = 0; i < count; i++) {
    await fn();
  }
  console.log(`Ended asyncBench in ${performance.now() - start}`);
}