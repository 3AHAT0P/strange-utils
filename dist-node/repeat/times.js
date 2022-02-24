"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.times = void 0;
const times = (count) => {
    const runFn = (runnerFn) => {
        let index = 0;
        const stop = () => { index = count + 1; };
        while (index < count) {
            runnerFn({ stop, index });
            index += 1;
        }
    };
    const withContextFn = (context) => {
        const runWithContextFn = (runnerFn) => {
            let index = 0;
            const stop = () => { index = count + 1; };
            while (index < count) {
                runnerFn({ stop, index, context });
                index += 1;
            }
            return context;
        };
        return {
            run: runWithContextFn,
        };
    };
    const runAsyncFn = async (runnerFn) => {
        let index = 0;
        const stop = () => { index = count + 1; };
        while (index < count) {
            await runnerFn({ stop, index });
            index += 1;
        }
    };
    const withContextAsyncFn = (context) => {
        const runWithContextFn = async (runnerFn) => {
            let index = 0;
            const stop = () => { index = count + 1; };
            while (index < count) {
                await runnerFn({ stop, index, context });
                index += 1;
            }
            return context;
        };
        return {
            run: runWithContextFn,
        };
    };
    return {
        withContext: withContextFn,
        async: {
            run: runAsyncFn,
            withContext: withContextAsyncFn,
        },
        run: runFn,
    };
};
exports.times = times;
