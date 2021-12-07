import { pipe, asyncPipe } from '@strange-utils/pipe';

// Correct example
const n = pipe(
  () => 1,
  (x: number) => Number(x),
  (x: number) => ({ x }),
  () => ({ x: 1 }),
);
const y: { x: number; } = n();
console.log(y);

// const n2 = pipe(
//   (x: string) => x + 1, // <-- TypeError on this line
//   (x: number) => Number(x),
//   (x: number) => ({ x }),
//   () => ({ x: 1 }),
// );
// const y2: { x: number; } = n2('A');
// console.log(y2);

// Correct example
const n3 = asyncPipe(
  async () => 1,
  async (x) => Number(x),
  async (x: number) => ({ x }),
  async () => ({ x: 1 }),
);
const y3: Promise<{ x: number; }> = n3();
console.log(y3);

// const n4 = asyncPipe(
//   async (x: string) => x + 1, // <-- TypeError on this line
//   async (x: number) => Number(x),
//   async (x: number) => ({ x }),
//   async () => ({ x: 1 }),
// );
// const y4: Promise<{ x: number; }> = n4('A');
// console.log(y4);
