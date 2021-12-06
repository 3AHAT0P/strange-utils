export interface Selector<TArgument = any, TReturn = void> {
  (value: TArgument): TReturn;
  when: {
    (conditionFn: (value: TArgument) => boolean): {
      do: (runnerFn: (value: TArgument) => TReturn) => Selector<TArgument, TReturn>;
    };
    isEqual: (caseValue: TArgument) => {
      do: (runnerFn: (value: TArgument) => TReturn) => Selector<TArgument, TReturn>;
    };
  };
  fallback: (runnerFn: (value: TArgument) => TReturn) => Selector<TArgument, TReturn>;
}

export const createSelector = <TArgument = any, TReturn = void>(): Selector<TArgument, TReturn> => {
  type ConditionFn = (value: TArgument) => boolean;
  type RunnerFn = (value: TArgument) => TReturn;
  type Case = [ConditionFn | null, RunnerFn];

  const cases: Case[] = [];

  const selector = (value: TArgument): TReturn => {
    let fallback!: RunnerFn;
    for (const [cond, runner] of cases) {
      if (cond === null) fallback = runner;
      else if (cond(value)) return runner(value);
    }
    if (fallback != null) return fallback(value);

    throw new Error('fallback function is not defined');
  };

  let currentConditionFn: ConditionFn | null = null;

  const doFn = (runnerFn: RunnerFn) => {
    cases.push([currentConditionFn, runnerFn]);
    currentConditionFn = null;
    return selector;
  };

  const isEqualFn = (caseValue: TArgument) => {
    currentConditionFn = (value) => value === caseValue;
    return { do: doFn };
  }

  const whenFn = (conditionFn: ConditionFn) => {
    currentConditionFn = conditionFn;
    return { do: doFn };
  }

  whenFn.isEqual = isEqualFn;

  const fallbackFn = (runnerFn: RunnerFn) => {
    cases.push([null, runnerFn])
    return selector;
  }

  // fill up selector operations 
  selector.when = whenFn;
  selector.fallback = fallbackFn;

  return selector;
};
