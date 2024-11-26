import { syncBench } from "./bench_sync";

class Foo {
  bar1() {}
  bar2() {}
  bar3() {}
}

function test2() {
  const foo = new Foo();
  foo.bar1();
  foo.bar2();
  foo.bar3();
  return foo;
}

syncBench(test2, 1000);