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

var _Loader = __webpack_require__(1);

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function imageLoader() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	var loader = new (Function.prototype.bind.apply(_Loader2.default, [null].concat(args)))();
	return loader.fetchImages();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fetchImage = __webpack_require__(2);

var _fetchImage2 = _interopRequireDefault(_fetchImage);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = function () {
	function Loader(arg1, arg2) {
		var _images;

		_classCallCheck(this, Loader);

		this.loadFromDOM = false;
		this.images = [];
		this.loadedImages = 0;
		this.callback = function () {};

		if ((0, _utils.isFunction)(arg1) || !arg1 && !arg2) this.loadFromDOM = true;
		if ((0, _utils.isFunction)(arg1)) this.callback = arg1;
		if ((0, _utils.isFunction)(arg2)) this.callback = arg2;
		if ((0, _utils.isString)(arg1)) this.images.push(arg1);
		if ((0, _utils.isArray)(arg1)) (_images = this.images).push.apply(_images, _toConsumableArray(arg1));

		if (this.loadFromDOM) {
			var _images2;

			var imagesEl = [].concat(_toConsumableArray(document.querySelectorAll('img')));
			var images = imagesEl.map(function (img) {
				return img.src;
			});

			(_images2 = this.images).push.apply(_images2, _toConsumableArray(images));
		}
	}

	_createClass(Loader, [{
		key: 'onImageLoad',
		value: function onImageLoad(imageInfo) {
			if (!imageInfo.error) this.loadedImages += 1;

			this.callback(_extends({
				all: this.images.length,
				loaded: this.loadedImages,
				percent: Math.round(100 * this.loadedImages / this.images.length)
			}, imageInfo));

			return imageInfo;
		}
	}, {
		key: 'fetchImages',
		value: function fetchImages() {
			var _this = this;

			var attachUserCallback = function attachUserCallback(imagePromise) {
				return imagePromise.then(function (imageInfo) {
					return _this.onImageLoad(imageInfo);
				});
			};

			var imagePromises = this.images.map(_fetchImage2.default).map(attachUserCallback);

			return Promise.all(imagePromises);
		}
	}]);

	return Loader;
}();

exports.default = Loader;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Try to download an image from URL
 *
 * @param {string} url URL to image
 * @return {promise} Resolve a Promise based on image status
*/

var ADD_EVENT_LISTENER = 'addEventListener';

function fetchImage(url) {
	var image = new window.Image();

	var imagePromise = new Promise(function (resolve, reject) {
		image[ADD_EVENT_LISTENER]('load', function (event) {
			// imageInfo
			resolve({
				time: Math.round(event.timeStamp),
				error: false,
				url: url
			});
		});

		image[ADD_EVENT_LISTENER]('error', function (err) {
			// imageInfo
			resolve({
				time: null,
				error: true,
				url: url
			});
		});
	});

	image.src = url;

	return imagePromise;
}

exports.default = fetchImage;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isFunction = exports.isFunction = function isFunction(x) {
  return typeof x === 'function';
};
var isString = exports.isString = function isString(x) {
  return typeof x === 'string' || x instanceof String;
};
var isArray = exports.isArray = function isArray(x) {
  return Array.isArray(x);
};

/***/ })
/******/ ])["default"];