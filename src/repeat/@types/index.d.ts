interface RunnerOptions {
  stop: () => void;
  index: number;
}

interface RunnerWithContextOptions<TContext = undefined> extends RunnerOptions {
  context: TContext;
}

interface RunnerWithValueOptions<TValue = void> extends RunnerOptions {
  value: TValue;
}

interface RunnerWithValueAndContextOptions<
  TValue = void, TContext = undefined,
> extends RunnerWithValueOptions<TValue>, RunnerWithContextOptions<TContext> { }
