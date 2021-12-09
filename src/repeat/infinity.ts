import type { RunnerOptions, RunnerWithContextOptions } from './@types';

export interface RepeatInfinity {
  run: (runnerFn: (options: RunnerOptions) => void) => void;
  withContext: <TContext>(context: TContext) => {
    run: (runnerFn: (options: RunnerWithContextOptions<TContext>) => void) => TContext;
  };
  async: {
    run: (runnerFn: (options: RunnerOptions) => Promise<void>) => Promise<void>;
    withContext: <TContext>(context: TContext) => {
      run: (runnerFn: (options: RunnerWithContextOptions<TContext>) => Promise<void>) => Promise<TContext>;
    };
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
};

const infinityRunAsyncFn = async (runnerFn: (options: RunnerOptions) => Promise<void>): Promise<void> => {
  let flag = true;
  let index = 0;
  const stop = () => { flag = false; };
  while (flag) {
    await runnerFn({ stop, index });
    index += 1;
  }
};

const infinityWithContextAsyncFn = <TContext>(context: TContext) => {
  const runWithContextFn = async (
    runnerFn: (options: RunnerWithContextOptions<TContext>) => Promise<void>,
  ): Promise<TContext> => {
    let flag = true;
    let index = 0;
    const stop = () => { flag = false; };
    while (flag) {
      await runnerFn({ stop, index, context });
      index += 1;
    }
    return context;
  };
  return {
    run: runWithContextFn,
  };
};


export const infinity: RepeatInfinity = {
  withContext: infinityWithContextFn,
  run: infinityRunFn,
  async: {
    withContext: infinityWithContextAsyncFn,
    run: infinityRunAsyncFn,
  },
};
