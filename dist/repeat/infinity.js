const infinityRunFn = (runnerFn) => {
    let flag = true;
    let index = 0;
    const stop = () => { flag = false; };
    while (flag) {
        runnerFn({ stop, index });
        index += 1;
    }
};
const infinityWithContextFn = (context) => {
    const runWithContextFn = (runnerFn) => {
        let flag = true;
        let index = 0;
        const stop = () => { flag = false; };
        while (flag) {
            runnerFn({ stop, index, context });
            index += 1;
        }
        return context;
    };
    return {
        run: runWithContextFn,
    };
};
const infinityRunAsyncFn = async (runnerFn) => {
    let flag = true;
    let index = 0;
    const stop = () => { flag = false; };
    while (flag) {
        await runnerFn({ stop, index });
        index += 1;
    }
};
const infinityWithContextAsyncFn = (context) => {
    const runWithContextFn = async (runnerFn) => {
        let flag = true;
        let index = 0;
        const stop = () => { flag = false; };
        while (flag) {
            await runnerFn({ stop, index, context });
            index += 1;
        }
        return context;
    };
    return {
        run: runWithContextFn,
    };
};
export const infinity = {
    withContext: infinityWithContextFn,
    run: infinityRunFn,
    async: {
        withContext: infinityWithContextAsyncFn,
        run: infinityRunAsyncFn,
    },
};
