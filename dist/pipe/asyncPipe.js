export const asyncPipe = (...fns) => async (arg) => {
    let result = arg;
    for (const f of fns)
        result = await f(result);
    return result;
};
