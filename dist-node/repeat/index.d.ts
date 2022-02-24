export declare const repeat: {
    times: import("./times").RepeatTimes;
    infinity: import("./infinity").RepeatInfinity;
    fromArray: <TArrayItem>(array: TArrayItem[]) => {
        withContext: <TContext>(context: TContext) => {
            run: (runnerFn: (options: import("./@types").RunnerWithValueAndContextOptions<TArrayItem, TContext>) => void) => TContext;
        };
        run: (runnerFn: (options: import("./@types").RunnerWithValueOptions<TArrayItem>) => void) => void;
    };
};
