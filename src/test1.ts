import { asyncBench } from './bench';

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 0));
}

asyncBench(wait, 1000);