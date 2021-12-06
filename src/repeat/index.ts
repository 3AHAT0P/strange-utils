// @TODO: 

interface RunnerOptions {
  stop: () => void;
  index: number;
}
interface RunnerWithContextOptions<TContext = undefined> extends RunnerOptions {
  context: TContext;
}
interface RunnerWithValueOptions<TValue = void> extends RunnerOptions {
  value: TValue;
}
interface RunnerWithValueAndContextOptions<TValue = void, TContext = undefined> extends RunnerWithValueOptions<TValue>, RunnerWithContextOptions<TContext> { }

const times = (count: number) => {
  const runFn = (runnerFn: (options: RunnerOptions) => void): void => {
    let index = 0;
    const stop = () => { index = count + 1; };
    while (index < count) {
      runnerFn({ stop, index });
      index += 1;
    }
  };

  const withContextFn = <TContext>(context: TContext) => {
    const runWithContextFn = (runnerFn: (options: RunnerWithContextOptions<TContext>) => void): TContext => {
      let index = 0;
      const stop = () => { index = count + 1; };
      while (index < count) {
        runnerFn({ stop, index, context });
        index += 1;
      }
      return context;
    };
    return {
      run: runWithContextFn,
    };
  };

  const runAsyncFn = async (runnerFn: (options: RunnerOptions) => Promise<void> | void): Promise<void> => {
    let index = 0;
    const stop = () => { index = count + 1; };
    while (index < count) {
      await runnerFn({ stop, index });
      index += 1;
    }
  };

  const withContextAsyncFn = <TContext>(context: TContext) => {
    const runWithContextFn = async (runnerFn: (options: RunnerWithContextOptions<TContext>) => Promise<void> | void): Promise<TContext> => {
      let index = 0;
      const stop = () => { index = count + 1; };
      while (index < count) {
        await runnerFn({ stop, index, context });
        index += 1;
      }
      return context;
    };
    return {
      run: runWithContextFn,
    };
  };

  return {
    withContext: withContextFn,
    async: {
      run: runAsyncFn,
      withContext: withContextAsyncFn,
    },
    run: runFn,
  };
}

const infinityRunFn = (runnerFn: (options: RunnerOptions) => void): void => {
  let flag = true;
  let index = 0;
  const stop = () => { flag = false; };
  while (flag) {
    runnerFn({ stop, index });
    index += 1;
  }
};

const infinityWithContextFn = <TContext>(context: TContext) => {
  const runWithContextFn = (runnerFn: (options: RunnerWithContextOptions<TContext>) => void): TContext => {
    let flag = true;
    let index = 0;
    const stop = () => { flag = false; };
    while (flag) {
      runnerFn({ stop, index, context });
      index += 1;
    }
    return context;
  };
  return {
    run: runWithContextFn,
  };
}

const infinity = {
  withContext: infinityWithContextFn,
  run: infinityRunFn,
};

const fromArray = <TArrayItem>(array: TArrayItem[]) => {
  const runFn = (runnerFn: (options: RunnerWithValueOptions<TArrayItem>) => void): void => {
    let index = 0;
    const stop = () => { index = array.length + 1; };
    while (index < array.length) {
      runnerFn({ stop, index, value: array[index] })
      index += 1;
    }
  };

  const withContextFn = <TContext>(context: TContext) => {
    const runWithContextFn = (runnerFn: (options: RunnerWithValueAndContextOptions<TArrayItem, TContext>) => void): TContext => {
      let index = 0;
      const stop = () => { index = array.length + 1; };
      while (index < array.length) {
        runnerFn({ stop, index, value: array[index], context })
        index += 1;
      }
      return context;
    };
    return {
      run: runWithContextFn,
    };
  }
  return {
    withContext: withContextFn,
    run: runFn,
  };
}

const repeat = {
  times,
  infinity,
  fromArray,
};

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

testTimes();

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

  const { value } = repeat.fromArray([2, 3, 4, 5, 0, -1])
    .withContext({ value: 0 })
    .run(({ value, context }) => {
      console.log(value, JSON.stringify(context));
      context.value += value;
    });
  console.log('VALUE', value);
};

testFromArray();