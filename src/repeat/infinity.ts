export interface RepeatInfinity {
  withContext: <TContext>(context: TContext) => {
    run: (runnerFn: (options: RunnerWithContextOptions<TContext>) => void) => TContext;
  };
  run: (runnerFn: (options: RunnerOptions) => void) => void;
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

export const infinity = {
  withContext: infinityWithContextFn,
  run: infinityRunFn,
};
