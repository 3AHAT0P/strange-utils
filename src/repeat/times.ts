export interface RepeatTimes {
  (count: number): {
    run: (runnerFn: (options: RunnerOptions) => void) => void;
    withContext: <TContext>(context: TContext) => {
      run: (runnerFn: (options: RunnerWithContextOptions<TContext>) => void) => TContext;
    };
    async: {
      run: (runnerFn: (options: RunnerOptions) => Promise<void> | void) => Promise<void>;
      withContext: <TContext>(context: TContext) => {
        run: (runnerFn: (options: RunnerWithContextOptions<TContext>) => Promise<void> | void) => Promise<TContext>;
      };
    };
  }
}

export const times: RepeatTimes = (count: number) => {
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
    const runWithContextFn = async (
      runnerFn: (options: RunnerWithContextOptions<TContext>) => Promise<void> | void,
    ): Promise<TContext> => {
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
};
