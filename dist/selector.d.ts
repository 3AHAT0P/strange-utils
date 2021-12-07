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
export declare const createSelector: <TArgument = any, TReturn = void>() => Selector<TArgument, TReturn>;
