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
export declare const infinity: RepeatInfinity;
