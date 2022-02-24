export interface RunnerOptions {
    stop: () => void;
    index: number;
}
export interface RunnerWithContextOptions<TContext = undefined> extends RunnerOptions {
    context: TContext;
}
export interface RunnerWithValueOptions<TValue = void> extends RunnerOptions {
    value: TValue;
}
export interface RunnerWithValueAndContextOptions<TValue = void, TContext = undefined> extends RunnerWithValueOptions<TValue>, RunnerWithContextOptions<TContext> {
}
