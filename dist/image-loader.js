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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fetchImage = __webpack_require__(2);

var _fetchImage2 = _interopRequireDefault(_fetchImage);

var _parseImage = __webpack_require__(4);

var _parseImage2 = _interopRequireDefault(_parseImage);

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

		this.images = this.images.map(_parseImage2.default);
	}

	_createClass(Loader, [{
		key: 'onImageLoad',
		value: function onImageLoad(loadedImage) {
			if (!loadedImage.error) this.loadedImages += 1;

			var loaderStatus = {
				all: this.images.length,
				loaded: this.loadedImages,
				percent: Math.round(100 * this.loadedImages / this.images.length)
			};

			this.callback(loaderStatus, loadedImage);

			return loadedImage;
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
var ADD_EVENT_LISTENER = 'addEventListener';

function fetchImage(image) {
	var imageEl = new window.Image();

	var imagePromise = new Promise(function (resolve, reject) {
		imageEl[ADD_EVENT_LISTENER]('load', function (event) {
			resolve({
				time: Math.round(event.timeStamp),
				error: false,
				url: image.url,
				ref: image.ref
			});
		});

		imageEl[ADD_EVENT_LISTENER]('error', function (err) {
			resolve({
				time: null,
				error: true,
				url: image.url,
				ref: image.ref
			});
		});
	});

	imageEl.src = image.url;

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isFunction = exports.isFunction = function isFunction(x) {
  return typeof x === 'function';
};
var isString = exports.isString = function isString(x) {
  return typeof x === 'string' || x instanceof String;
};
var isArray = exports.isArray = function isArray(x) {
  return Array.isArray(x);
};
var isObject = exports.isObject = function isObject(x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = parseImage;

var _utils = __webpack_require__(3);

function parseImage(image) {
	if (!image) {
		throw new Error('No arguments have passed to parseImage function');
	}

	if ((0, _utils.isObject)(image) && !image.url) {
		throw new Error('Image object must have an url property');
	}

	var url = (0, _utils.isObject)(image) ? image.url : image;
	var ref = image.ref || {};

	if (!(0, _utils.isString)(url)) {
		throw new Error('Image url must be a string');
	}

	return { url: url, ref: ref };
}

/***/ })
/******/ ])["default"];