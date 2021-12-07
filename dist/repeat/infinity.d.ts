export interface RepeatInfinity {
    withContext: <TContext>(context: TContext) => {
        run: (runnerFn: (options: RunnerWithContextOptions<TContext>) => void) => TContext;
    };
    run: (runnerFn: (options: RunnerOptions) => void) => void;
}
export declare const infinity: {
    withContext: <TContext>(context: TContext) => {
        run: (runnerFn: (options: RunnerWithContextOptions<TContext>) => void) => TContext;
    };
    run: (runnerFn: (options: RunnerOptions) => void) => void;
};
