export const pipe = (...fns) => (arg) => {
    let result = arg;
    for (const f of fns)
        result = f(result);
    return result;
};
