import type { RunnerOptions, RunnerWithContextOptions } from './@types';
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
    };
}
export declare const times: RepeatTimes;
