"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = void 0;
const pipe = (...fns) => (arg) => {
    let result = arg;
    for (const f of fns)
        result = f(result);
    return result;
};
exports.pipe = pipe;
