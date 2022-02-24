"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSelector = void 0;
const createSelector = () => {
    const cases = [];
    const selector = (value) => {
        let fallback;
        for (const [cond, runner] of cases) {
            if (cond === null)
                fallback = runner;
            else if (cond(value))
                return runner(value);
        }
        if (fallback != null)
            return fallback(value);
        throw new Error('fallback function is not defined');
    };
    let currentConditionFn = null;
    const doFn = (runnerFn) => {
        cases.push([currentConditionFn, runnerFn]);
        currentConditionFn = null;
        return selector;
    };
    const isEqualFn = (caseValue) => {
        currentConditionFn = (value) => value === caseValue;
        return { do: doFn };
    };
    const whenFn = (conditionFn) => {
        currentConditionFn = conditionFn;
        return { do: doFn };
    };
    whenFn.isEqual = isEqualFn;
    const fallbackFn = (runnerFn) => {
        cases.push([null, runnerFn]);
        return selector;
    };
    selector.when = whenFn;
    selector.fallback = fallbackFn;
    return selector;
};
exports.createSelector = createSelector;
