// @TODO:

let p!: Pipe.Pipe;
let p2!: AsyncPipe.AsyncPipe;

const n = p(
  () => 1,
  (x: number) => Number(x),
  (x: number) => ({ x }),
  () => ({ x: 1 }),
);
const y = n();

const n2 = p(
  (x: string) => x + 1,
  (x: number) => Number(x),
  (x: number) => ({ x }),
  () => ({ x: 1 }),
);
const y2 = n2();

const n3 = p2(
  async () => 1,
  async(x) => Number(x),
  async(x: number) => ({ x }),
  async() => ({ x: 1 }),
);
const y3 = n3();

const n4 = p2(
  async(x: string) => x + 1,
  async(x: number) => Number(x),
  async(x: number) => ({ x }),
  async() => ({ x: 1 }),
);
const y4 = n4();