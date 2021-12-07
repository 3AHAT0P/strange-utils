export declare const repeat: {
    times: import("./times").RepeatTimes;
    infinity: {
        withContext: <TContext>(context: TContext) => {
            run: (runnerFn: (options: RunnerWithContextOptions<TContext>) => void) => TContext;
        };
        run: (runnerFn: (options: RunnerOptions) => void) => void;
    };
    fromArray: <TArrayItem>(array: TArrayItem[]) => {
        withContext: <TContext_1>(context: TContext_1) => {
            run: (runnerFn: (options: RunnerWithValueAndContextOptions<TArrayItem, TContext_1>) => void) => TContext_1;
        };
        run: (runnerFn: (options: RunnerWithValueOptions<TArrayItem>) => void) => void;
    };
};
