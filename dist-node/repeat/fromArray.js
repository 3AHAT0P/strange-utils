"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromArray = void 0;
const fromArray = (array) => {
    const runFn = (runnerFn) => {
        let index = 0;
        const stop = () => { index = array.length + 1; };
        while (index < array.length) {
            runnerFn({ stop, index, value: array[index] });
            index += 1;
        }
    };
    const withContextFn = (context) => {
        const runWithContextFn = (runnerFn) => {
            let index = 0;
            const stop = () => { index = array.length + 1; };
            while (index < array.length) {
                runnerFn({ stop, index, value: array[index], context });
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
        run: runFn,
    };
};
exports.fromArray = fromArray;
