import type { RunnerWithValueOptions, RunnerWithValueAndContextOptions } from './@types';

export interface RepeatFromArray {
  <TArrayItem>(array: TArrayItem[]): {
    run: (runnerFn: (options: RunnerWithValueOptions<TArrayItem>) => void) => void;
    withContext: <TContext>(context: TContext) => {
      run: (runnerFn: (options: RunnerWithValueAndContextOptions<TArrayItem, TContext>) => void) => TContext;
    };
  }
}

export const fromArray = <TArrayItem>(array: TArrayItem[]) => {
  const runFn = (runnerFn: (options: RunnerWithValueOptions<TArrayItem>) => void): void => {
    let index = 0;
    const stop = () => { index = array.length + 1; };
    while (index < array.length) {
      runnerFn({ stop, index, value: array[index] });
      index += 1;
    }
  };

  const withContextFn = <TContext>(context: TContext) => {
    const runWithContextFn = (
      runnerFn: (options: RunnerWithValueAndContextOptions<TArrayItem, TContext>) => void,
    ): TContext => {
      let index = 0;
      const stop = () => { index = array.length + 1; };
      while (index < array.length) {
        runnerFn({ stop, index, value: array[index], context });
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
    run: runFn,
  };
};
