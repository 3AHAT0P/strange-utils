import type { RunnerWithValueOptions, RunnerWithValueAndContextOptions } from './@types';
export interface RepeatFromArray {
    <TArrayItem>(array: TArrayItem[]): {
        run: (runnerFn: (options: RunnerWithValueOptions<TArrayItem>) => void) => void;
        withContext: <TContext>(context: TContext) => {
            run: (runnerFn: (options: RunnerWithValueAndContextOptions<TArrayItem, TContext>) => void) => TContext;
        };
    };
}
export declare const fromArray: <TArrayItem>(array: TArrayItem[]) => {
    withContext: <TContext>(context: TContext) => {
        run: (runnerFn: (options: RunnerWithValueAndContextOptions<TArrayItem, TContext>) => void) => TContext;
    };
    run: (runnerFn: (options: RunnerWithValueOptions<TArrayItem>) => void) => void;
};
