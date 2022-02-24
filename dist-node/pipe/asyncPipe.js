"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncPipe = void 0;
const asyncPipe = (...fns) => async (arg) => {
    let result = arg;
    for (const f of fns)
        result = await f(result);
    return result;
};
exports.asyncPipe = asyncPipe;
