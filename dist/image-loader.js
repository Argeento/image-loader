var imageLoader =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = imageLoader;

var _fetchImage = __webpack_require__(1);

var _fetchImage2 = _interopRequireDefault(_fetchImage);

var _createConfig = __webpack_require__(2);

var _createConfig2 = _interopRequireDefault(_createConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function imageLoader() {
	var config = _createConfig2.default.apply(undefined, arguments);

	if (config.loadFromDOM) {
		var _config$images;

		var imagesEl = [].concat(_toConsumableArray(document.querySelectorAll('img')));
		var urls = imagesEl.map(function (img) {
			return img.src;
		});

		(_config$images = config.images).push.apply(_config$images, _toConsumableArray(urls));
	}

	return Promise.all(config.images.map(_fetchImage2.default));
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Try to download an image from URL
 *
 * @param {string} url URL to image
 * @param {class} ImageDependency Dependency injection
 * @return {promise} Resolve or reject a Promise based on image status
*/

function fetchImage(url, ImageDependency) {
	var image = typeof ImageDependency === 'function' ? new ImageDependency() : new Image();

	var imagePromise = new Promise(function (resolve, reject) {
		image.addEventListener('load', function (event) {
			resolve({
				time: event.timeStamp,
				url: url
			});
		});

		// eslint-disable-next-line
		image.addEventListener('error', function (err) {
			var message = 'ImageLoader: Cannot load image from "' + url + '"';
			reject(new Error(message));
		});
	});

	image.src = url;

	return imagePromise;
}

exports.default = fetchImage;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// helpers
var isFunction = function isFunction(x) {
	return typeof x === 'function';
};
var isString = function isString(x) {
	return typeof x === 'string' || x instanceof String;
};
var isArray = function isArray(x) {
	return Array.isArray(x);
};

/**
 * Create config object from passed arguments
 *
 * @param {string, array, function} [arg1] single URL / array of URLs / callback
 * @param {function} [arg2] callback
 * @return {object} image-loader config
*/

function createConfig(arg1, arg2) {
	var config = {
		loadFromDOM: false,
		images: [],
		callback: function callback() {}
	};

	if (isFunction(arg1) || !arg1 && !arg2) {
		config.loadFromDOM = true;
	}

	if (isFunction(arg1)) {
		config.callback = arg1;
	}

	if (isFunction(arg2)) {
		config.callback = arg2;
	}

	if (isString(arg1)) {
		config.images.push(arg1);
	}

	if (isArray(arg1)) {
		var _config$images;

		(_config$images = config.images).push.apply(_config$images, _toConsumableArray(arg1));
	}

	return config;
}

exports.default = createConfig;

/***/ })
/******/ ])["default"];