export const isFunction = x => typeof x === 'function'
export const isString = x => typeof x === 'string' || x instanceof String
export const isArray = x => Array.isArray(x)
export const isObject = x => typeof x === 'object' && x !== null
