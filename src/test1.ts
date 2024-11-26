import { asyncBench } from './bench_async';

async function test1() {
  await new Promise(resolve => setTimeout(resolve, 0));
}

asyncBench(test1, 1000);