declare type SimpleFNG<A extends any[] = any[], R = void> = (...arg: A) => R;
declare type SimpleFN = SimpleFNG<any[], any>;
declare type PipeHelperCheckRest<P extends readonly SimpleFN[], A = any, Rest extends readonly SimpleFN[] = P, R extends readonly SimpleFN[] = []> = Rest extends [infer InferFn, ...infer Rest1] ? (Rest1 extends readonly SimpleFN[] ? PipeHelperCheckInferFnArg<InferFn, P, A, Rest1, R> : never) : Rest;
declare type PipeHelperCheckInferFnArg<TFn, P extends readonly SimpleFN[], A = any, Rest extends readonly SimpleFN[] = P, R extends readonly SimpleFN[] = []> = TFn extends SimpleFNG<[A], infer InferReturn> ? CheckPipes<P, InferReturn, Rest, [...R, TFn]> : PipeHelperCheckInferFnArgFallback<TFn, P, A, Rest, R>;
declare type PipeHelperCheckInferFnArgFallback<TFn, P extends readonly SimpleFN[], A = any, Rest extends readonly SimpleFN[] = P, R extends readonly SimpleFN[] = []> = TFn extends SimpleFNG<[any], infer InferReturn> ? CheckPipes<P, any, Rest, [...R, SimpleFNG<[A], InferReturn>]> : never;
declare type CheckPipes<P extends readonly SimpleFN[], A = any, Rest extends readonly SimpleFN[] = P, R extends readonly SimpleFN[] = []> = P['length'] extends R['length'] ? R : PipeHelperCheckRest<P, A, Rest, R>;
declare type PipedFunc<F extends readonly SimpleFN[], A extends any[] = Parameters<F[0]>, R = A[0]> = F extends [SimpleFNG<[R], infer InferReturn>, ...infer Rest] ? Rest extends readonly SimpleFN[] ? (Rest extends {
    'length': 0;
} ? SimpleFNG<A, InferReturn> : PipedFunc<Rest, A, InferReturn>) : never : never;
export interface Pipe {
    <F extends readonly SimpleFN[], R extends CheckPipes<F>>(...args: CheckPipes<F> & F): PipedFunc<R>;
}
export declare const pipe: Pipe;
export {};
