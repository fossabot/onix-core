import { isFunction } from '../Types';

export const createChainedFunction = (...funcs) => {
    return funcs
        .filter(f => (isFunction(f)))
        .reduce((acc, f) => {
            if (typeof f !== 'function') {
                throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
            }

            if (acc === null) {
                return f;
            }

            return function chainedFunction(...args) {
                acc.apply(this, args);
                f.apply(this, args);
            };
    }, null);
}