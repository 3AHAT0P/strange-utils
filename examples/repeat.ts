import { repeat } from '@strange-utils/repeat';

const testTimes = async () => {
  repeat.times(7)
    .run(({ stop, index }) => {
      if (index < 2) return;
      if (index >= 5) return stop();
      console.log(index);
    });

  const { value } = repeat.times(7)
    .withContext({ value: 0 })
    .run(({ index, context }) => {
      if (index < 2) return;
      console.log(index, JSON.stringify(context));
      context.value += index;
    });
  console.log('VALUE', value);

  const t1 = Date.now();
  const { val } = await repeat.times(7)
    .async
    .withContext({ val: 0 })
    .run(async ({ index, context }) => {
      if (index < 2) return;
      await new Promise((r) => setTimeout(r, 1000));
      console.log('ASYNC', index, JSON.stringify(context));
      context.val += index;
    });
  console.log('ASYNC VAL', val);
  console.log(Date.now() - t1);
};

void testTimes();

const testInfinity = () => {
  repeat.infinity
    .run(({ stop, index }) => {
      if (index < 2) return;
      if (index >= 15) return stop();
      console.log(index);
    });

  const { value } = repeat.infinity
    .withContext({ value: 0 })
    .run(({ stop, index, context }) => {
      if (index < 2) return;
      if (index >= 5) return stop();
      console.log(index, JSON.stringify(context));
      context.value += index;
    });
  console.log('VALUE', value);
};

testInfinity();

const testFromArray = () => {
  repeat.fromArray([2, 3, 4, 5, 4, 0, -1])
    .run(({ stop, index, value }) => {
      if (value === 4) return;
      if (value < 0) return stop();
      console.log(index);
    });

  const { sum } = repeat.fromArray([2, 3, 4, 5, 0, -1])
    .withContext({ sum: 0 })
    .run(({ value, context }) => {
      console.log(value, JSON.stringify(context));
      context.sum += value;
    });
  console.log('VALUE', sum);
};

testFromArray();
