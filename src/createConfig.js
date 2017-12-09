// helpers
const isFunction = x => typeof x === 'function'
const isString = x => typeof x === 'string' || x instanceof String
const isArray = x => Array.isArray(x)

/**
 * Create config object from passed arguments
 *
 * @param {string, array, function} [arg1] single URL / array of URLs / callback
 * @param {function} [arg2] callback
 * @return {object} image-loader config
*/

function createConfig (arg1, arg2) {
	const config = {
		loadFromDOM: false,
		images: [],
		callback: () => {}
	}

	if (isFunction(arg1) || (!arg1 && !arg2)) {
		config.loadFromDOM = true
	}

	if (isFunction(arg1)) {
		config.callback = arg1
	}

	if (isFunction(arg2)) {
		config.callback = arg2
	}

	if (isString(arg1)) {
		config.images.push(arg1)
	}

	if (isArray(arg1)) {
		config.images.push(...arg1)
	}

	return config
}

export default createConfig
