/* prebid.js v4.2.0
Updated : 2020-08-13 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["pbjsChunk"];
/******/ 	window["pbjsChunk"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		323: 0
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 828);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "internal", function() { return internal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return bind; });
/* harmony export (immutable) */ __webpack_exports__["getUniqueIdentifierStr"] = getUniqueIdentifierStr;
/* harmony export (immutable) */ __webpack_exports__["generateUUID"] = generateUUID;
/* harmony export (immutable) */ __webpack_exports__["getBidIdParameter"] = getBidIdParameter;
/* harmony export (immutable) */ __webpack_exports__["tryAppendQueryString"] = tryAppendQueryString;
/* harmony export (immutable) */ __webpack_exports__["parseQueryStringParameters"] = parseQueryStringParameters;
/* harmony export (immutable) */ __webpack_exports__["transformAdServerTargetingObj"] = transformAdServerTargetingObj;
/* harmony export (immutable) */ __webpack_exports__["getAdUnitSizes"] = getAdUnitSizes;
/* harmony export (immutable) */ __webpack_exports__["parseSizesInput"] = parseSizesInput;
/* harmony export (immutable) */ __webpack_exports__["parseGPTSingleSizeArray"] = parseGPTSingleSizeArray;
/* harmony export (immutable) */ __webpack_exports__["parseGPTSingleSizeArrayToRtbSize"] = parseGPTSingleSizeArrayToRtbSize;
/* harmony export (immutable) */ __webpack_exports__["getWindowTop"] = getWindowTop;
/* harmony export (immutable) */ __webpack_exports__["getWindowSelf"] = getWindowSelf;
/* harmony export (immutable) */ __webpack_exports__["getWindowLocation"] = getWindowLocation;
/* harmony export (immutable) */ __webpack_exports__["logMessage"] = logMessage;
/* harmony export (immutable) */ __webpack_exports__["logInfo"] = logInfo;
/* harmony export (immutable) */ __webpack_exports__["logWarn"] = logWarn;
/* harmony export (immutable) */ __webpack_exports__["logError"] = logError;
/* harmony export (immutable) */ __webpack_exports__["hasConsoleLogger"] = hasConsoleLogger;
/* harmony export (immutable) */ __webpack_exports__["debugTurnedOn"] = debugTurnedOn;
/* harmony export (immutable) */ __webpack_exports__["createInvisibleIframe"] = createInvisibleIframe;
/* harmony export (immutable) */ __webpack_exports__["getParameterByName"] = getParameterByName;
/* harmony export (immutable) */ __webpack_exports__["isA"] = isA;
/* harmony export (immutable) */ __webpack_exports__["isFn"] = isFn;
/* harmony export (immutable) */ __webpack_exports__["isStr"] = isStr;
/* harmony export (immutable) */ __webpack_exports__["isArray"] = isArray;
/* harmony export (immutable) */ __webpack_exports__["isNumber"] = isNumber;
/* harmony export (immutable) */ __webpack_exports__["isPlainObject"] = isPlainObject;
/* harmony export (immutable) */ __webpack_exports__["isBoolean"] = isBoolean;
/* harmony export (immutable) */ __webpack_exports__["isEmpty"] = isEmpty;
/* harmony export (immutable) */ __webpack_exports__["isEmptyStr"] = isEmptyStr;
/* harmony export (immutable) */ __webpack_exports__["_each"] = _each;
/* harmony export (immutable) */ __webpack_exports__["contains"] = contains;
/* harmony export (immutable) */ __webpack_exports__["_map"] = _map;
/* harmony export (immutable) */ __webpack_exports__["hasOwn"] = hasOwn;
/* harmony export (immutable) */ __webpack_exports__["insertElement"] = insertElement;
/* harmony export (immutable) */ __webpack_exports__["triggerPixel"] = triggerPixel;
/* harmony export (immutable) */ __webpack_exports__["callBurl"] = callBurl;
/* harmony export (immutable) */ __webpack_exports__["insertHtmlIntoIframe"] = insertHtmlIntoIframe;
/* harmony export (immutable) */ __webpack_exports__["insertUserSyncIframe"] = insertUserSyncIframe;
/* harmony export (immutable) */ __webpack_exports__["createTrackPixelHtml"] = createTrackPixelHtml;
/* harmony export (immutable) */ __webpack_exports__["createTrackPixelIframeHtml"] = createTrackPixelIframeHtml;
/* harmony export (immutable) */ __webpack_exports__["getValueString"] = getValueString;
/* harmony export (immutable) */ __webpack_exports__["uniques"] = uniques;
/* harmony export (immutable) */ __webpack_exports__["flatten"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["getBidRequest"] = getBidRequest;
/* harmony export (immutable) */ __webpack_exports__["getKeys"] = getKeys;
/* harmony export (immutable) */ __webpack_exports__["getValue"] = getValue;
/* harmony export (immutable) */ __webpack_exports__["getKeyByValue"] = getKeyByValue;
/* harmony export (immutable) */ __webpack_exports__["getBidderCodes"] = getBidderCodes;
/* harmony export (immutable) */ __webpack_exports__["isGptPubadsDefined"] = isGptPubadsDefined;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHighestCpm", function() { return getHighestCpm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOldestHighestCpmBid", function() { return getOldestHighestCpmBid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLatestHighestCpmBid", function() { return getLatestHighestCpmBid; });
/* harmony export (immutable) */ __webpack_exports__["shuffle"] = shuffle;
/* harmony export (immutable) */ __webpack_exports__["adUnitsFilter"] = adUnitsFilter;
/* harmony export (immutable) */ __webpack_exports__["deepClone"] = deepClone;
/* harmony export (immutable) */ __webpack_exports__["inIframe"] = inIframe;
/* harmony export (immutable) */ __webpack_exports__["isSafariBrowser"] = isSafariBrowser;
/* harmony export (immutable) */ __webpack_exports__["replaceAuctionPrice"] = replaceAuctionPrice;
/* harmony export (immutable) */ __webpack_exports__["timestamp"] = timestamp;
/* harmony export (immutable) */ __webpack_exports__["hasDeviceAccess"] = hasDeviceAccess;
/* harmony export (immutable) */ __webpack_exports__["checkCookieSupport"] = checkCookieSupport;
/* harmony export (immutable) */ __webpack_exports__["delayExecution"] = delayExecution;
/* harmony export (immutable) */ __webpack_exports__["groupBy"] = groupBy;
/* harmony export (immutable) */ __webpack_exports__["getDefinedParams"] = getDefinedParams;
/* harmony export (immutable) */ __webpack_exports__["isValidMediaTypes"] = isValidMediaTypes;
/* harmony export (immutable) */ __webpack_exports__["getBidderRequest"] = getBidderRequest;
/* harmony export (immutable) */ __webpack_exports__["getUserConfiguredParams"] = getUserConfiguredParams;
/* harmony export (immutable) */ __webpack_exports__["getOrigin"] = getOrigin;
/* harmony export (immutable) */ __webpack_exports__["getDNT"] = getDNT;
/* harmony export (immutable) */ __webpack_exports__["isAdUnitCodeMatchingSlot"] = isAdUnitCodeMatchingSlot;
/* harmony export (immutable) */ __webpack_exports__["isSlotMatchingAdUnitCode"] = isSlotMatchingAdUnitCode;
/* harmony export (immutable) */ __webpack_exports__["getGptSlotInfoForAdUnitCode"] = getGptSlotInfoForAdUnitCode;
/* harmony export (immutable) */ __webpack_exports__["unsupportedBidderMessage"] = unsupportedBidderMessage;
/* harmony export (immutable) */ __webpack_exports__["isInteger"] = isInteger;
/* harmony export (immutable) */ __webpack_exports__["convertCamelToUnderscore"] = convertCamelToUnderscore;
/* harmony export (immutable) */ __webpack_exports__["cleanObj"] = cleanObj;
/* harmony export (immutable) */ __webpack_exports__["pick"] = pick;
/* harmony export (immutable) */ __webpack_exports__["transformBidderParamKeywords"] = transformBidderParamKeywords;
/* harmony export (immutable) */ __webpack_exports__["convertTypes"] = convertTypes;
/* harmony export (immutable) */ __webpack_exports__["isArrayOfNums"] = isArrayOfNums;
/* harmony export (immutable) */ __webpack_exports__["fill"] = fill;
/* harmony export (immutable) */ __webpack_exports__["chunk"] = chunk;
/* harmony export (immutable) */ __webpack_exports__["getMinValueFromArray"] = getMinValueFromArray;
/* harmony export (immutable) */ __webpack_exports__["getMaxValueFromArray"] = getMaxValueFromArray;
/* harmony export (immutable) */ __webpack_exports__["compareOn"] = compareOn;
/* harmony export (immutable) */ __webpack_exports__["parseQS"] = parseQS;
/* harmony export (immutable) */ __webpack_exports__["formatQS"] = formatQS;
/* harmony export (immutable) */ __webpack_exports__["parseUrl"] = parseUrl;
/* harmony export (immutable) */ __webpack_exports__["buildUrl"] = buildUrl;
/* harmony export (immutable) */ __webpack_exports__["deepEqual"] = deepEqual;
/* harmony export (immutable) */ __webpack_exports__["mergeDeep"] = mergeDeep;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_just_clone__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_just_clone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_just_clone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_dlv_index_js__ = __webpack_require__(159);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deepAccess", function() { return __WEBPACK_IMPORTED_MODULE_4_dlv_index_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_dset__ = __webpack_require__(160);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deepSetValue", function() { return __WEBPACK_IMPORTED_MODULE_5_dset__["a"]; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable no-console */





var CONSTANTS = __webpack_require__(5);



var tArr = 'Array';
var tStr = 'String';
var tFn = 'Function';
var tNumb = 'Number';
var tObject = 'Object';
var tBoolean = 'Boolean';
var toString = Object.prototype.toString;
var consoleExists = Boolean(window.console);
var consoleLogExists = Boolean(consoleExists && window.console.log);
var consoleInfoExists = Boolean(consoleExists && window.console.info);
var consoleWarnExists = Boolean(consoleExists && window.console.warn);
var consoleErrorExists = Boolean(consoleExists && window.console.error); // this allows stubbing of utility functions that are used internally by other utility functions

var internal = {
  checkCookieSupport: checkCookieSupport,
  createTrackPixelIframeHtml: createTrackPixelIframeHtml,
  getWindowSelf: getWindowSelf,
  getWindowTop: getWindowTop,
  getWindowLocation: getWindowLocation,
  insertUserSyncIframe: insertUserSyncIframe,
  insertElement: insertElement,
  isFn: isFn,
  triggerPixel: triggerPixel,
  logError: logError,
  logWarn: logWarn,
  logMessage: logMessage,
  logInfo: logInfo,
  parseQS: parseQS,
  formatQS: formatQS,
  deepEqual: deepEqual
};
var uniqueRef = {};
var bind = function (a, b) {
  return b;
}.bind(null, 1, uniqueRef)() === uniqueRef ? Function.prototype.bind : function (bind) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    return self.apply(bind, args.concat(Array.prototype.slice.call(arguments)));
  };
};
/* utility method to get incremental integer starting from 1 */

var getIncrementalInteger = function () {
  var count = 0;
  return function () {
    count++;
    return count;
  };
}(); // generate a random string (to be used as a dynamic JSONP callback)


function getUniqueIdentifierStr() {
  return getIncrementalInteger() + Math.random().toString(16).substr(2);
}
/**
 * Returns a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
 * where each x is replaced with a random hexadecimal digit from 0 to f,
 * and y is replaced with a random hexadecimal digit from 8 to b.
 * https://gist.github.com/jed/982883 via node-uuid
 */

function generateUUID(placeholder) {
  return placeholder ? (placeholder ^ _getRandomData() >> placeholder / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, generateUUID);
}
/**
 * Returns random data using the Crypto API if available and Math.random if not
 * Method is from https://gist.github.com/jed/982883 like generateUUID, direct link https://gist.github.com/jed/982883#gistcomment-45104
 */

function _getRandomData() {
  if (window && window.crypto && window.crypto.getRandomValues) {
    return crypto.getRandomValues(new Uint8Array(1))[0] % 16;
  } else {
    return Math.random() * 16;
  }
}

function getBidIdParameter(key, paramsObj) {
  if (paramsObj && paramsObj[key]) {
    return paramsObj[key];
  }

  return '';
}
function tryAppendQueryString(existingUrl, key, value) {
  if (value) {
    return existingUrl + key + '=' + encodeURIComponent(value) + '&';
  }

  return existingUrl;
} // parse a query string object passed in bid params
// bid params should be an object such as {key: "value", key1 : "value1"}
// aliases to formatQS

function parseQueryStringParameters(queryObj) {
  var result = '';

  for (var k in queryObj) {
    if (queryObj.hasOwnProperty(k)) {
      result += k + '=' + encodeURIComponent(queryObj[k]) + '&';
    }
  }

  result = result.replace(/&$/, '');
  return result;
} // transform an AdServer targeting bids into a query string to send to the adserver

function transformAdServerTargetingObj(targeting) {
  // we expect to receive targeting for a single slot at a time
  if (targeting && Object.getOwnPropertyNames(targeting).length > 0) {
    return getKeys(targeting).map(function (key) {
      return "".concat(key, "=").concat(encodeURIComponent(getValue(targeting, key)));
    }).join('&');
  } else {
    return '';
  }
}
/**
 * Read an adUnit object and return the sizes used in an [[728, 90]] format (even if they had [728, 90] defined)
 * Preference is given to the `adUnit.mediaTypes.banner.sizes` object over the `adUnit.sizes`
 * @param {object} adUnit one adUnit object from the normal list of adUnits
 * @returns {Array.<number[]>} array of arrays containing numeric sizes
 */

function getAdUnitSizes(adUnit) {
  if (!adUnit) {
    return;
  }

  var sizes = [];

  if (adUnit.mediaTypes && adUnit.mediaTypes.banner && Array.isArray(adUnit.mediaTypes.banner.sizes)) {
    var bannerSizes = adUnit.mediaTypes.banner.sizes;

    if (Array.isArray(bannerSizes[0])) {
      sizes = bannerSizes;
    } else {
      sizes.push(bannerSizes);
    } // TODO - remove this else block when we're ready to deprecate adUnit.sizes for bidders

  } else if (Array.isArray(adUnit.sizes)) {
    if (Array.isArray(adUnit.sizes[0])) {
      sizes = adUnit.sizes;
    } else {
      sizes.push(adUnit.sizes);
    }
  }

  return sizes;
}
/**
 * Parse a GPT-Style general size Array like `[[300, 250]]` or `"300x250,970x90"` into an array of sizes `["300x250"]` or '['300x250', '970x90']'
 * @param  {(Array.<number[]>|Array.<number>)} sizeObj Input array or double array [300,250] or [[300,250], [728,90]]
 * @return {Array.<string>}  Array of strings like `["300x250"]` or `["300x250", "728x90"]`
 */

function parseSizesInput(sizeObj) {
  var parsedSizes = []; // if a string for now we can assume it is a single size, like "300x250"

  if (typeof sizeObj === 'string') {
    // multiple sizes will be comma-separated
    var sizes = sizeObj.split(','); // regular expression to match strigns like 300x250
    // start of line, at least 1 number, an "x" , then at least 1 number, and the then end of the line

    var sizeRegex = /^(\d)+x(\d)+$/i;

    if (sizes) {
      for (var curSizePos in sizes) {
        if (hasOwn(sizes, curSizePos) && sizes[curSizePos].match(sizeRegex)) {
          parsedSizes.push(sizes[curSizePos]);
        }
      }
    }
  } else if (_typeof(sizeObj) === 'object') {
    var sizeArrayLength = sizeObj.length; // don't process empty array

    if (sizeArrayLength > 0) {
      // if we are a 2 item array of 2 numbers, we must be a SingleSize array
      if (sizeArrayLength === 2 && typeof sizeObj[0] === 'number' && typeof sizeObj[1] === 'number') {
        parsedSizes.push(parseGPTSingleSizeArray(sizeObj));
      } else {
        // otherwise, we must be a MultiSize array
        for (var i = 0; i < sizeArrayLength; i++) {
          parsedSizes.push(parseGPTSingleSizeArray(sizeObj[i]));
        }
      }
    }
  }

  return parsedSizes;
} // Parse a GPT style single size array, (i.e [300, 250])
// into an AppNexus style string, (i.e. 300x250)

function parseGPTSingleSizeArray(singleSize) {
  if (isValidGPTSingleSize(singleSize)) {
    return singleSize[0] + 'x' + singleSize[1];
  }
} // Parse a GPT style single size array, (i.e [300, 250])
// into OpenRTB-compatible (imp.banner.w/h, imp.banner.format.w/h, imp.video.w/h) object(i.e. {w:300, h:250})

function parseGPTSingleSizeArrayToRtbSize(singleSize) {
  if (isValidGPTSingleSize(singleSize)) {
    return {
      w: singleSize[0],
      h: singleSize[1]
    };
  }
}

function isValidGPTSingleSize(singleSize) {
  // if we aren't exactly 2 items in this array, it is invalid
  return isArray(singleSize) && singleSize.length === 2 && !isNaN(singleSize[0]) && !isNaN(singleSize[1]);
}

function getWindowTop() {
  return window.top;
}
function getWindowSelf() {
  return window.self;
}
function getWindowLocation() {
  return window.location;
}
/**
 * Wrappers to console.(log | info | warn | error). Takes N arguments, the same as the native methods
 */

function logMessage() {
  if (debugTurnedOn() && consoleLogExists) {
    console.log.apply(console, decorateLog(arguments, 'MESSAGE:'));
  }
}
function logInfo() {
  if (debugTurnedOn() && consoleInfoExists) {
    console.info.apply(console, decorateLog(arguments, 'INFO:'));
  }
}
function logWarn() {
  if (debugTurnedOn() && consoleWarnExists) {
    console.warn.apply(console, decorateLog(arguments, 'WARNING:'));
  }
}
function logError() {
  if (debugTurnedOn() && consoleErrorExists) {
    console.error.apply(console, decorateLog(arguments, 'ERROR:'));
  }
}

function decorateLog(args, prefix) {
  args = [].slice.call(args);
  prefix && args.unshift(prefix);
  args.unshift('display: inline-block; color: #fff; background: #3b88c3; padding: 1px 4px; border-radius: 3px;');
  args.unshift('%cPrebid');
  return args;
}

function hasConsoleLogger() {
  return consoleLogExists;
}
function debugTurnedOn() {
  return !!__WEBPACK_IMPORTED_MODULE_0__config_js__["b" /* config */].getConfig('debug');
}
function createInvisibleIframe() {
  var f = document.createElement('iframe');
  f.id = getUniqueIdentifierStr();
  f.height = 0;
  f.width = 0;
  f.border = '0px';
  f.hspace = '0';
  f.vspace = '0';
  f.marginWidth = '0';
  f.marginHeight = '0';
  f.style.border = '0';
  f.scrolling = 'no';
  f.frameBorder = '0';
  f.src = 'about:blank';
  f.style.display = 'none';
  return f;
}
/*
 *   Check if a given parameter name exists in query string
 *   and if it does return the value
 */

function getParameterByName(name) {
  return parseQS(getWindowLocation().search)[name] || '';
}
/**
 * Return if the object is of the
 * given type.
 * @param {*} object to test
 * @param {String} _t type string (e.g., Array)
 * @return {Boolean} if object is of type _t
 */

function isA(object, _t) {
  return toString.call(object) === '[object ' + _t + ']';
}
function isFn(object) {
  return isA(object, tFn);
}
function isStr(object) {
  return isA(object, tStr);
}
function isArray(object) {
  return isA(object, tArr);
}
function isNumber(object) {
  return isA(object, tNumb);
}
function isPlainObject(object) {
  return isA(object, tObject);
}
function isBoolean(object) {
  return isA(object, tBoolean);
}
/**
 * Return if the object is "empty";
 * this includes falsey, no keys, or no items at indices
 * @param {*} object object to test
 * @return {Boolean} if object is empty
 */

function isEmpty(object) {
  if (!object) return true;

  if (isArray(object) || isStr(object)) {
    return !(object.length > 0);
  }

  for (var k in object) {
    if (hasOwnProperty.call(object, k)) return false;
  }

  return true;
}
/**
 * Return if string is empty, null, or undefined
 * @param str string to test
 * @returns {boolean} if string is empty
 */

function isEmptyStr(str) {
  return isStr(str) && (!str || str.length === 0);
}
/**
 * Iterate object with the function
 * falls back to es5 `forEach`
 * @param {Array|Object} object
 * @param {Function(value, key, object)} fn
 */

function _each(object, fn) {
  if (isEmpty(object)) return;
  if (isFn(object.forEach)) return object.forEach(fn, this);
  var k = 0;
  var l = object.length;

  if (l > 0) {
    for (; k < l; k++) {
      fn(object[k], k, object);
    }
  } else {
    for (k in object) {
      if (hasOwnProperty.call(object, k)) fn.call(this, object[k], k);
    }
  }
}
function contains(a, obj) {
  if (isEmpty(a)) {
    return false;
  }

  if (isFn(a.indexOf)) {
    return a.indexOf(obj) !== -1;
  }

  var i = a.length;

  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }

  return false;
}
/**
 * Map an array or object into another array
 * given a function
 * @param {Array|Object} object
 * @param {Function(value, key, object)} callback
 * @return {Array}
 */

function _map(object, callback) {
  if (isEmpty(object)) return [];
  if (isFn(object.map)) return object.map(callback);
  var output = [];

  _each(object, function (value, key) {
    output.push(callback(value, key, object));
  });

  return output;
}
function hasOwn(objectToCheck, propertyToCheckFor) {
  if (objectToCheck.hasOwnProperty) {
    return objectToCheck.hasOwnProperty(propertyToCheckFor);
  } else {
    return typeof objectToCheck[propertyToCheckFor] !== 'undefined' && objectToCheck.constructor.prototype[propertyToCheckFor] !== objectToCheck[propertyToCheckFor];
  }
}
;
/*
* Inserts an element(elm) as targets child, by default as first child
* @param {HTMLElement} elm
* @param {HTMLElement} [doc]
* @param {HTMLElement} [target]
* @param {Boolean} [asLastChildChild]
* @return {HTMLElement}
*/

function insertElement(elm, doc, target, asLastChildChild) {
  doc = doc || document;
  var parentEl;

  if (target) {
    parentEl = doc.getElementsByTagName(target);
  } else {
    parentEl = doc.getElementsByTagName('head');
  }

  try {
    parentEl = parentEl.length ? parentEl : doc.getElementsByTagName('body');

    if (parentEl.length) {
      parentEl = parentEl[0];
      var insertBeforeEl = asLastChildChild ? null : parentEl.firstChild;
      return parentEl.insertBefore(elm, insertBeforeEl);
    }
  } catch (e) {}
}
/**
 * Inserts an image pixel with the specified `url` for cookie sync
 * @param {string} url URL string of the image pixel to load
 * @param  {function} [done] an optional exit callback, used when this usersync pixel is added during an async process
 */

function triggerPixel(url, done) {
  var img = new Image();

  if (done && internal.isFn(done)) {
    img.addEventListener('load', done);
    img.addEventListener('error', done);
  }

  img.src = url;
}
function callBurl(_ref) {
  var source = _ref.source,
      burl = _ref.burl;

  if (source === CONSTANTS.S2S.SRC && burl) {
    internal.triggerPixel(burl);
  }
}
/**
 * Inserts an empty iframe with the specified `html`, primarily used for tracking purposes
 * (though could be for other purposes)
 * @param {string} htmlCode snippet of HTML code used for tracking purposes
 */

function insertHtmlIntoIframe(htmlCode) {
  if (!htmlCode) {
    return;
  }

  var iframe = document.createElement('iframe');
  iframe.id = getUniqueIdentifierStr();
  iframe.width = 0;
  iframe.height = 0;
  iframe.hspace = '0';
  iframe.vspace = '0';
  iframe.marginWidth = '0';
  iframe.marginHeight = '0';
  iframe.style.display = 'none';
  iframe.style.height = '0px';
  iframe.style.width = '0px';
  iframe.scrolling = 'no';
  iframe.frameBorder = '0';
  iframe.allowtransparency = 'true';
  internal.insertElement(iframe, document, 'body');
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(htmlCode);
  iframe.contentWindow.document.close();
}
/**
 * Inserts empty iframe with the specified `url` for cookie sync
 * @param  {string} url URL to be requested
 * @param  {string} encodeUri boolean if URL should be encoded before inserted. Defaults to true
 * @param  {function} [done] an optional exit callback, used when this usersync pixel is added during an async process
 */

function insertUserSyncIframe(url, done) {
  var iframeHtml = internal.createTrackPixelIframeHtml(url, false, 'allow-scripts allow-same-origin');
  var div = document.createElement('div');
  div.innerHTML = iframeHtml;
  var iframe = div.firstChild;

  if (done && internal.isFn(done)) {
    iframe.addEventListener('load', done);
    iframe.addEventListener('error', done);
  }

  internal.insertElement(iframe, document, 'html', true);
}
;
/**
 * Creates a snippet of HTML that retrieves the specified `url`
 * @param  {string} url URL to be requested
 * @return {string}     HTML snippet that contains the img src = set to `url`
 */

function createTrackPixelHtml(url) {
  if (!url) {
    return '';
  }

  var escapedUrl = encodeURI(url);
  var img = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
  img += '<img src="' + escapedUrl + '"></div>';
  return img;
}
;
/**
 * Creates a snippet of Iframe HTML that retrieves the specified `url`
 * @param  {string} url plain URL to be requested
 * @param  {string} encodeUri boolean if URL should be encoded before inserted. Defaults to true
 * @param  {string} sandbox string if provided the sandbox attribute will be included with the given value
 * @return {string}     HTML snippet that contains the iframe src = set to `url`
 */

function createTrackPixelIframeHtml(url) {
  var encodeUri = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var sandbox = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (!url) {
    return '';
  }

  if (encodeUri) {
    url = encodeURI(url);
  }

  if (sandbox) {
    sandbox = "sandbox=\"".concat(sandbox, "\"");
  }

  return "<iframe ".concat(sandbox, " id=\"").concat(getUniqueIdentifierStr(), "\"\n      frameborder=\"0\"\n      allowtransparency=\"true\"\n      marginheight=\"0\" marginwidth=\"0\"\n      width=\"0\" hspace=\"0\" vspace=\"0\" height=\"0\"\n      style=\"height:0px;width:0px;display:none;\"\n      scrolling=\"no\"\n      src=\"").concat(url, "\">\n    </iframe>");
}
function getValueString(param, val, defaultValue) {
  if (val === undefined || val === null) {
    return defaultValue;
  }

  if (isStr(val)) {
    return val;
  }

  if (isNumber(val)) {
    return val.toString();
  }

  internal.logWarn('Unsuported type for param: ' + param + ' required type: String');
}
function uniques(value, index, arry) {
  return arry.indexOf(value) === index;
}
function flatten(a, b) {
  return a.concat(b);
}
function getBidRequest(id, bidderRequests) {
  if (!id) {
    return;
  }

  var bidRequest;
  bidderRequests.some(function (bidderRequest) {
    var result = __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default()(bidderRequest.bids, function (bid) {
      return ['bidId', 'adId', 'bid_id'].some(function (type) {
        return bid[type] === id;
      });
    });

    if (result) {
      bidRequest = result;
    }

    return result;
  });
  return bidRequest;
}
function getKeys(obj) {
  return Object.keys(obj);
}
function getValue(obj, key) {
  return obj[key];
}
/**
 * Get the key of an object for a given value
 */

function getKeyByValue(obj, value) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] === value) {
        return prop;
      }
    }
  }
}
function getBidderCodes() {
  var adUnits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pbjs.adUnits;
  // this could memoize adUnits
  return adUnits.map(function (unit) {
    return unit.bids.map(function (bid) {
      return bid.bidder;
    }).reduce(flatten, []);
  }).reduce(flatten).filter(uniques);
}
function isGptPubadsDefined() {
  if (window.googletag && isFn(window.googletag.pubads) && isFn(window.googletag.pubads().getSlots)) {
    return true;
  }
} // This function will get highest cpm value bid, in case of tie it will return the bid with lowest timeToRespond

var getHighestCpm = getHighestCpmCallback('timeToRespond', function (previous, current) {
  return previous > current;
}); // This function will get the oldest hightest cpm value bid, in case of tie it will return the bid which came in first
// Use case for tie: https://github.com/prebid/Prebid.js/issues/2448

var getOldestHighestCpmBid = getHighestCpmCallback('responseTimestamp', function (previous, current) {
  return previous > current;
}); // This function will get the latest hightest cpm value bid, in case of tie it will return the bid which came in last
// Use case for tie: https://github.com/prebid/Prebid.js/issues/2539

var getLatestHighestCpmBid = getHighestCpmCallback('responseTimestamp', function (previous, current) {
  return previous < current;
});

function getHighestCpmCallback(useTieBreakerProperty, tieBreakerCallback) {
  return function (previous, current) {
    if (previous.cpm === current.cpm) {
      return tieBreakerCallback(previous[useTieBreakerProperty], current[useTieBreakerProperty]) ? current : previous;
    }

    return previous.cpm < current.cpm ? current : previous;
  };
}
/**
 * Fisher–Yates shuffle
 * http://stackoverflow.com/a/6274398
 * https://bost.ocks.org/mike/shuffle/
 * istanbul ignore next
 */


function shuffle(array) {
  var counter = array.length; // while there are elements in the array

  while (counter > 0) {
    // pick a random index
    var index = Math.floor(Math.random() * counter); // decrease counter by 1

    counter--; // and swap the last element with it

    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
function adUnitsFilter(filter, bid) {
  return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(filter, bid && bid.adUnitCode);
}
function deepClone(obj) {
  return __WEBPACK_IMPORTED_MODULE_1_just_clone___default()(obj);
}
function inIframe() {
  try {
    return internal.getWindowSelf() !== internal.getWindowTop();
  } catch (e) {
    return true;
  }
}
function isSafariBrowser() {
  return /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
}
function replaceAuctionPrice(str, cpm) {
  if (!str) return;
  return str.replace(/\$\{AUCTION_PRICE\}/g, cpm);
}
function timestamp() {
  return new Date().getTime();
}
/**
 * When the deviceAccess flag config option is false, no cookies should be read or set
 * @returns {boolean}
 */

function hasDeviceAccess() {
  return __WEBPACK_IMPORTED_MODULE_0__config_js__["b" /* config */].getConfig('deviceAccess') !== false;
}
/**
 * @returns {(boolean|undefined)}
 */

function checkCookieSupport() {
  if (window.navigator.cookieEnabled || !!document.cookie.length) {
    return true;
  }
}
/**
 * Given a function, return a function which only executes the original after
 * it's been called numRequiredCalls times.
 *
 * Note that the arguments from the previous calls will *not* be forwarded to the original function.
 * Only the final call's arguments matter.
 *
 * @param {function} func The function which should be executed, once the returned function has been executed
 *   numRequiredCalls times.
 * @param {int} numRequiredCalls The number of times which the returned function needs to be called before
 *   func is.
 */

function delayExecution(func, numRequiredCalls) {
  if (numRequiredCalls < 1) {
    throw new Error("numRequiredCalls must be a positive number. Got ".concat(numRequiredCalls));
  }

  var numCalls = 0;
  return function () {
    numCalls++;

    if (numCalls === numRequiredCalls) {
      func.apply(this, arguments);
    }
  };
}
/**
 * https://stackoverflow.com/a/34890276/428704
 * @export
 * @param {array} xs
 * @param {string} key
 * @returns {Object} {${key_value}: ${groupByArray}, key_value: {groupByArray}}
 */

function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
/**
 * Build an object consisting of only defined parameters to avoid creating an
 * object with defined keys and undefined values.
 * @param {Object} object The object to pick defined params out of
 * @param {string[]} params An array of strings representing properties to look for in the object
 * @returns {Object} An object containing all the specified values that are defined
 */

function getDefinedParams(object, params) {
  return params.filter(function (param) {
    return object[param];
  }).reduce(function (bid, param) {
    return _extends(bid, _defineProperty({}, param, object[param]));
  }, {});
}
/**
 * @typedef {Object} MediaTypes
 * @property {Object} banner banner configuration
 * @property {Object} native native configuration
 * @property {Object} video video configuration
 */

/**
 * Validates an adunit's `mediaTypes` parameter
 * @param {MediaTypes} mediaTypes mediaTypes parameter to validate
 * @return {boolean} If object is valid
 */

function isValidMediaTypes(mediaTypes) {
  var SUPPORTED_MEDIA_TYPES = ['banner', 'native', 'video'];
  var SUPPORTED_STREAM_TYPES = ['instream', 'outstream', 'adpod'];
  var types = Object.keys(mediaTypes);

  if (!types.every(function (type) {
    return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(SUPPORTED_MEDIA_TYPES, type);
  })) {
    return false;
  }

  if (mediaTypes.video && mediaTypes.video.context) {
    return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(SUPPORTED_STREAM_TYPES, mediaTypes.video.context);
  }

  return true;
}
function getBidderRequest(bidRequests, bidder, adUnitCode) {
  return __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default()(bidRequests, function (request) {
    return request.bids.filter(function (bid) {
      return bid.bidder === bidder && bid.adUnitCode === adUnitCode;
    }).length > 0;
  }) || {
    start: null,
    auctionId: null
  };
}
/**
 * Returns user configured bidder params from adunit
 * @param {Object} adUnits
 * @param {string} adUnitCode code
 * @param {string} bidder code
 * @return {Array} user configured param for the given bidder adunit configuration
 */

function getUserConfiguredParams(adUnits, adUnitCode, bidder) {
  return adUnits.filter(function (adUnit) {
    return adUnit.code === adUnitCode;
  }).map(function (adUnit) {
    return adUnit.bids;
  }).reduce(flatten, []).filter(function (bidderData) {
    return bidderData.bidder === bidder;
  }).map(function (bidderData) {
    return bidderData.params || {};
  });
}
/**
 * Returns the origin
 */

function getOrigin() {
  // IE10 does not have this property. https://gist.github.com/hbogs/7908703
  if (!window.location.origin) {
    return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  } else {
    return window.location.origin;
  }
}
/**
 * Returns Do Not Track state
 */

function getDNT() {
  return navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.msDoNotTrack === '1' || navigator.doNotTrack === 'yes';
}

var compareCodeAndSlot = function compareCodeAndSlot(slot, adUnitCode) {
  return slot.getAdUnitPath() === adUnitCode || slot.getSlotElementId() === adUnitCode;
};
/**
 * Returns filter function to match adUnitCode in slot
 * @param {Object} slot GoogleTag slot
 * @return {function} filter function
 */


function isAdUnitCodeMatchingSlot(slot) {
  return function (adUnitCode) {
    return compareCodeAndSlot(slot, adUnitCode);
  };
}
/**
 * Returns filter function to match adUnitCode in slot
 * @param {string} adUnitCode AdUnit code
 * @return {function} filter function
 */

function isSlotMatchingAdUnitCode(adUnitCode) {
  return function (slot) {
    return compareCodeAndSlot(slot, adUnitCode);
  };
}
/**
 * @summary Uses the adUnit's code in order to find a matching gptSlot on the page
 */

function getGptSlotInfoForAdUnitCode(adUnitCode) {
  var matchingSlot;

  if (isGptPubadsDefined()) {
    // find the first matching gpt slot on the page
    matchingSlot = __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default()(window.googletag.pubads().getSlots(), isSlotMatchingAdUnitCode(adUnitCode));
  }

  if (matchingSlot) {
    return {
      gptSlot: matchingSlot.getAdUnitPath(),
      divId: matchingSlot.getSlotElementId()
    };
  }

  return {};
}
;
/**
 * Constructs warning message for when unsupported bidders are dropped from an adunit
 * @param {Object} adUnit ad unit from which the bidder is being dropped
 * @param {string} bidder bidder code that is not compatible with the adUnit
 * @return {string} warning message to display when condition is met
 */

function unsupportedBidderMessage(adUnit, bidder) {
  var mediaType = Object.keys(adUnit.mediaTypes || {
    'banner': 'banner'
  }).join(', ');
  return "\n    ".concat(adUnit.code, " is a ").concat(mediaType, " ad unit\n    containing bidders that don't support ").concat(mediaType, ": ").concat(bidder, ".\n    This bidder won't fetch demand.\n  ");
}
/**
 * Checks input is integer or not
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
 * @param {*} value
 */

function isInteger(value) {
  if (Number.isInteger) {
    return Number.isInteger(value);
  } else {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  }
}
/**
 * Converts a string value in camel-case to underscore eg 'placementId' becomes 'placement_id'
 * @param {string} value string value to convert
 */

function convertCamelToUnderscore(value) {
  return value.replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
    return '_' + y.toLowerCase();
  }).replace(/^_/, '');
}
/**
 * Returns a new object with undefined properties removed from given object
 * @param obj the object to clean
 */

function cleanObj(obj) {
  return Object.keys(obj).reduce(function (newObj, key) {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }

    return newObj;
  }, {});
}
/**
 * Create a new object with selected properties.  Also allows property renaming and transform functions.
 * @param obj the original object
 * @param properties An array of desired properties
 */

function pick(obj, properties) {
  if (_typeof(obj) !== 'object') {
    return {};
  }

  return properties.reduce(function (newObj, prop, i) {
    if (typeof prop === 'function') {
      return newObj;
    }

    var newProp = prop;
    var match = prop.match(/^(.+?)\sas\s(.+?)$/i);

    if (match) {
      prop = match[1];
      newProp = match[2];
    }

    var value = obj[prop];

    if (typeof properties[i + 1] === 'function') {
      value = properties[i + 1](value, newObj);
    }

    if (typeof value !== 'undefined') {
      newObj[newProp] = value;
    }

    return newObj;
  }, {});
}
/**
 * Converts an object of arrays (either strings or numbers) into an array of objects containing key and value properties
 * normally read from bidder params
 * eg { foo: ['bar', 'baz'], fizz: ['buzz'] }
 * becomes [{ key: 'foo', value: ['bar', 'baz']}, {key: 'fizz', value: ['buzz']}]
 * @param {Object} keywords object of arrays representing keyvalue pairs
 * @param {string} paramName name of parent object (eg 'keywords') containing keyword data, used in error handling
 */

function transformBidderParamKeywords(keywords) {
  var paramName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'keywords';
  var arrs = [];

  _each(keywords, function (v, k) {
    if (isArray(v)) {
      var values = [];

      _each(v, function (val) {
        val = getValueString(paramName + '.' + k, val);

        if (val || val === '') {
          values.push(val);
        }
      });

      v = values;
    } else {
      v = getValueString(paramName + '.' + k, v);

      if (isStr(v)) {
        v = [v];
      } else {
        return;
      } // unsuported types - don't send a key

    }

    arrs.push({
      key: k,
      value: v
    });
  });

  return arrs;
}
/**
 * Try to convert a value to a type.
 * If it can't be done, the value will be returned.
 *
 * @param {string} typeToConvert The target type. e.g. "string", "number", etc.
 * @param {*} value The value to be converted into typeToConvert.
 */

function tryConvertType(typeToConvert, value) {
  if (typeToConvert === 'string') {
    return value && value.toString();
  } else if (typeToConvert === 'number') {
    return Number(value);
  } else {
    return value;
  }
}

function convertTypes(types, params) {
  Object.keys(types).forEach(function (key) {
    if (params[key]) {
      if (isFn(types[key])) {
        params[key] = types[key](params[key]);
      } else {
        params[key] = tryConvertType(types[key], params[key]);
      } // don't send invalid values


      if (isNaN(params[key])) {
        delete params.key;
      }
    }
  });
  return params;
}
function isArrayOfNums(val, size) {
  return isArray(val) && (size ? val.length === size : true) && val.every(function (v) {
    return isInteger(v);
  });
}
/**
 * Creates an array of n length and fills each item with the given value
 */

function fill(value, length) {
  var newArray = [];

  for (var i = 0; i < length; i++) {
    var valueToPush = isPlainObject(value) ? deepClone(value) : value;
    newArray.push(valueToPush);
  }

  return newArray;
}
/**
 * http://npm.im/chunk
 * Returns an array with *size* chunks from given array
 *
 * Example:
 * ['a', 'b', 'c', 'd', 'e'] chunked by 2 =>
 * [['a', 'b'], ['c', 'd'], ['e']]
 */

function chunk(array, size) {
  var newArray = [];

  for (var i = 0; i < Math.ceil(array.length / size); i++) {
    var start = i * size;
    var end = start + size;
    newArray.push(array.slice(start, end));
  }

  return newArray;
}
function getMinValueFromArray(array) {
  return Math.min.apply(Math, _toConsumableArray(array));
}
function getMaxValueFromArray(array) {
  return Math.max.apply(Math, _toConsumableArray(array));
}
/**
 * This function will create compare function to sort on object property
 * @param {string} property
 * @returns {function} compare function to be used in sorting
 */

function compareOn(property) {
  return function compare(a, b) {
    if (a[property] < b[property]) {
      return 1;
    }

    if (a[property] > b[property]) {
      return -1;
    }

    return 0;
  };
}
function parseQS(query) {
  return !query ? {} : query.replace(/^\?/, '').split('&').reduce(function (acc, criteria) {
    var _criteria$split = criteria.split('='),
        _criteria$split2 = _slicedToArray(_criteria$split, 2),
        k = _criteria$split2[0],
        v = _criteria$split2[1];

    if (/\[\]$/.test(k)) {
      k = k.replace('[]', '');
      acc[k] = acc[k] || [];
      acc[k].push(v);
    } else {
      acc[k] = v || '';
    }

    return acc;
  }, {});
}
function formatQS(query) {
  return Object.keys(query).map(function (k) {
    return Array.isArray(query[k]) ? query[k].map(function (v) {
      return "".concat(k, "[]=").concat(v);
    }).join('&') : "".concat(k, "=").concat(query[k]);
  }).join('&');
}
function parseUrl(url, options) {
  var parsed = document.createElement('a');

  if (options && 'noDecodeWholeURL' in options && options.noDecodeWholeURL) {
    parsed.href = url;
  } else {
    parsed.href = decodeURIComponent(url);
  } // in window.location 'search' is string, not object


  var qsAsString = options && 'decodeSearchAsString' in options && options.decodeSearchAsString;
  return {
    href: parsed.href,
    protocol: (parsed.protocol || '').replace(/:$/, ''),
    hostname: parsed.hostname,
    port: +parsed.port,
    pathname: parsed.pathname.replace(/^(?!\/)/, '/'),
    search: qsAsString ? parsed.search : internal.parseQS(parsed.search || ''),
    hash: (parsed.hash || '').replace(/^#/, ''),
    host: parsed.host || window.location.host
  };
}
function buildUrl(obj) {
  return (obj.protocol || 'http') + '://' + (obj.host || obj.hostname + (obj.port ? ":".concat(obj.port) : '')) + (obj.pathname || '') + (obj.search ? "?".concat(internal.formatQS(obj.search || '')) : '') + (obj.hash ? "#".concat(obj.hash) : '');
}
/**
 * This function deeply compares two objects checking for their equivalence.
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {boolean}
 */

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;else if (_typeof(obj1) === 'object' && obj1 !== null && _typeof(obj2) === 'object' && obj2 !== null) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

    for (var prop in obj1) {
      if (obj2.hasOwnProperty(prop)) {
        if (!deepEqual(obj1[prop], obj2[prop])) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
}
function mergeDeep(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.length) return target;
  var source = sources.shift();

  if (isPlainObject(target) && isPlainObject(source)) {
    for (var key in source) {
      if (isPlainObject(source[key])) {
        if (!target[key]) _extends(target, _defineProperty({}, key, {}));
        mergeDeep(target[key], source[key]);
      } else if (isArray(source[key])) {
        if (!target[key]) {
          _extends(target, _defineProperty({}, key, source[key]));
        } else if (isArray(target[key])) {
          target[key] = target[key].concat(source[key]);
        }
      } else {
        _extends(target, _defineProperty({}, key, source[key]));
      }
    }
  }

  return mergeDeep.apply(void 0, [target].concat(sources));
}

/***/ }),

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storage", function() { return storage; });
/* harmony export (immutable) */ __webpack_exports__["registerBidder"] = registerBidder;
/* harmony export (immutable) */ __webpack_exports__["newBidder"] = newBidder;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerSyncInner", function() { return registerSyncInner; });
/* harmony export (immutable) */ __webpack_exports__["preloadBidderMappingFile"] = preloadBidderMappingFile;
/* harmony export (immutable) */ __webpack_exports__["getIabSubCategory"] = getIabSubCategory;
/* harmony export (immutable) */ __webpack_exports__["isValid"] = isValid;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adapter_js__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bidfactory_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userSync_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__native_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__video_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__events_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__events_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__events_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__storageManager_js__ = __webpack_require__(9);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
















var storage = Object(__WEBPACK_IMPORTED_MODULE_14__storageManager_js__["a" /* getCoreStorageManager */])('bidderFactory');
/**
 * This file aims to support Adapters during the Prebid 0.x -> 1.x transition.
 *
 * Prebid 1.x and Prebid 0.x will be in separate branches--perhaps for a long time.
 * This function defines an API for adapter construction which is compatible with both versions.
 * Adapters which use it can maintain their code in master, and only this file will need to change
 * in the 1.x branch.
 *
 * Typical usage looks something like:
 *
 * const adapter = registerBidder({
 *   code: 'myBidderCode',
 *   aliases: ['alias1', 'alias2'],
 *   supportedMediaTypes: ['video', 'native'],
 *   isBidRequestValid: function(paramsObject) { return true/false },
 *   buildRequests: function(bidRequests, bidderRequest) { return some ServerRequest(s) },
 *   interpretResponse: function(oneServerResponse) { return some Bids, or throw an error. }
 * });
 *
 * @see BidderSpec for the full API and more thorough descriptions.
 */

/**
 * @typedef {object} BidderSpec An object containing the adapter-specific functions needed to
 * make a Bidder.
 *
 * @property {string} code A code which will be used to uniquely identify this bidder. This should be the same
 *   one as is used in the call to registerBidAdapter
 * @property {string[]} [aliases] A list of aliases which should also resolve to this bidder.
 * @property {MediaType[]} [supportedMediaTypes]: A list of Media Types which the adapter supports.
 * @property {function(object): boolean} isBidRequestValid Determines whether or not the given bid has all the params
 *   needed to make a valid request.
 * @property {function(BidRequest[], bidderRequest): ServerRequest|ServerRequest[]} buildRequests Build the request to the Server
 *   which requests Bids for the given array of Requests. Each BidRequest in the argument array is guaranteed to have
 *   passed the isBidRequestValid() test.
 * @property {function(ServerResponse, BidRequest): Bid[]} interpretResponse Given a successful response from the Server,
 *   interpret it and return the Bid objects. This function will be run inside a try/catch.
 *   If it throws any errors, your bids will be discarded.
 * @property {function(SyncOptions, ServerResponse[]): UserSync[]} [getUserSyncs] Given an array of all the responses
 *   from the server, determine which user syncs should occur. The argument array will contain every element
 *   which has been sent through to interpretResponse. The order of syncs in this array matters. The most
 *   important ones should come first, since publishers may limit how many are dropped on their page.
 * @property {function(object): object} transformBidParams Updates bid params before creating bid request
 }}
 */

/**
 * @typedef {object} BidRequest
 *
 * @property {string} bidId A string which uniquely identifies this BidRequest in the current Auction.
 * @property {object} params Any bidder-specific params which the publisher used in their bid request.
 */

/**
 * @typedef {object} ServerRequest
 *
 * @property {('GET'|'POST')} method The type of request which this is.
 * @property {string} url The endpoint for the request. For example, "//bids.example.com".
 * @property {string|object} data Data to be sent in the request.
 * @property {object} options Content-Type set in the header of the bid request, overrides default 'text/plain'.
 *   If this is a GET request, they'll become query params. If it's a POST request, they'll be added to the body.
 *   Strings will be added as-is. Objects will be unpacked into query params based on key/value mappings, or
 *   JSON-serialized into the Request body.
 */

/**
 * @typedef {object} ServerResponse
 *
 * @property {*} body The response body. If this is legal JSON, then it will be parsed. Otherwise it'll be a
 *   string with the body's content.
 * @property {{get: function(string): string} headers The response headers.
 *   Call this like `ServerResponse.headers.get("Content-Type")`
 */

/**
 * @typedef {object} Bid
 *
 * @property {string} requestId The specific BidRequest which this bid is aimed at.
 *   This should match the BidRequest.bidId which this Bid targets.
 * @property {string} ad A URL which can be used to load this ad, if it's chosen by the publisher.
 * @property {string} currency The currency code for the cpm value
 * @property {number} cpm The bid price, in US cents per thousand impressions.
 * @property {number} ttl Time-to-live - how long (in seconds) Prebid can use this bid.
 * @property {boolean} netRevenue Boolean defining whether the bid is Net or Gross.  The default is true (Net).
 * @property {number} height The height of the ad, in pixels.
 * @property {number} width The width of the ad, in pixels.
 *
 * @property {object} [native] Object for storing native creative assets
 * @property {object} [video] Object for storing video response data
 * @property {object} [meta] Object for storing bid meta data
 * @property {string} [meta.primaryCatId] The IAB primary category ID
 * @property [Renderer] renderer A Renderer which can be used as a default for this bid,
 *   if the publisher doesn't override it. This is only relevant for Outstream Video bids.
 */

/**
 * @typedef {Object} SyncOptions
 *
 * An object containing information about usersyncs which the adapter should obey.
 *
 * @property {boolean} iframeEnabled True if iframe usersyncs are allowed, and false otherwise
 * @property {boolean} pixelEnabled True if image usersyncs are allowed, and false otherwise
 */

/**
 * TODO: Move this to the UserSync module after that PR is merged.
 *
 * @typedef {object} UserSync
 *
 * @property {('image'|'iframe')} type The type of user sync to be done.
 * @property {string} url The URL which makes the sync happen.
 */
// common params for all mediaTypes

var COMMON_BID_RESPONSE_KEYS = ['requestId', 'cpm', 'ttl', 'creativeId', 'netRevenue', 'currency'];
var DEFAULT_REFRESHIN_DAYS = 1;
/**
 * Register a bidder with prebid, using the given spec.
 *
 * If possible, Adapter modules should use this function instead of adapterManager.registerBidAdapter().
 *
 * @param {BidderSpec} spec An object containing the bare-bones functions we need to make a Bidder.
 */

function registerBidder(spec) {
  var mediaTypes = Array.isArray(spec.supportedMediaTypes) ? {
    supportedMediaTypes: spec.supportedMediaTypes
  } : undefined;

  function putBidder(spec) {
    var bidder = newBidder(spec);
    __WEBPACK_IMPORTED_MODULE_1__adapterManager_js__["default"].registerBidAdapter(bidder, spec.code, mediaTypes);
  }

  putBidder(spec);

  if (Array.isArray(spec.aliases)) {
    spec.aliases.forEach(function (alias) {
      var aliasCode = alias;
      var gvlid;

      if (Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["isPlainObject"])(alias)) {
        aliasCode = alias.code;
        gvlid = alias.gvlid;
      }

      __WEBPACK_IMPORTED_MODULE_1__adapterManager_js__["default"].aliasRegistry[aliasCode] = spec.code;
      putBidder(_extends({}, spec, {
        code: aliasCode,
        gvlid: gvlid
      }));
    });
  }
}
/**
 * Make a new bidder from the given spec. This is exported mainly for testing.
 * Adapters will probably find it more convenient to use registerBidder instead.
 *
 * @param {BidderSpec} spec
 */

function newBidder(spec) {
  return _extends(new __WEBPACK_IMPORTED_MODULE_0__adapter_js__["a" /* default */](spec.code), {
    getSpec: function getSpec() {
      return Object.freeze(spec);
    },
    registerSyncs: registerSyncs,
    callBids: function callBids(bidderRequest, addBidResponse, done, ajax, onTimelyResponse, configEnabledCallback) {
      if (!Array.isArray(bidderRequest.bids)) {
        return;
      }

      var adUnitCodesHandled = {};

      function addBidWithCode(adUnitCode, bid) {
        adUnitCodesHandled[adUnitCode] = true;

        if (isValid(adUnitCode, bid, [bidderRequest])) {
          addBidResponse(adUnitCode, bid);
        }
      } // After all the responses have come back, call done() and
      // register any required usersync pixels.


      var responses = [];

      function afterAllResponses() {
        done();
        __WEBPACK_IMPORTED_MODULE_8__events_js___default.a.emit(__WEBPACK_IMPORTED_MODULE_7__constants_json___default.a.EVENTS.BIDDER_DONE, bidderRequest);
        registerSyncs(responses, bidderRequest.gdprConsent, bidderRequest.uspConsent);
      }

      var validBidRequests = bidderRequest.bids.filter(filterAndWarn);

      if (validBidRequests.length === 0) {
        afterAllResponses();
        return;
      }

      var bidRequestMap = {};
      validBidRequests.forEach(function (bid) {
        bidRequestMap[bid.bidId] = bid; // Delete this once we are 1.0

        if (!bid.adUnitCode) {
          bid.adUnitCode = bid.placementCode;
        }
      });
      var requests = spec.buildRequests(validBidRequests, bidderRequest);

      if (!requests || requests.length === 0) {
        afterAllResponses();
        return;
      }

      if (!Array.isArray(requests)) {
        requests = [requests];
      } // Callbacks don't compose as nicely as Promises. We should call done() once _all_ the
      // Server requests have returned and been processed. Since `ajax` accepts a single callback,
      // we need to rig up a function which only executes after all the requests have been responded.


      var onResponse = Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["delayExecution"])(configEnabledCallback(afterAllResponses), requests.length);
      requests.forEach(processRequest);

      function formatGetParameters(data) {
        if (data) {
          return "?".concat(_typeof(data) === 'object' ? Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["parseQueryStringParameters"])(data) : data);
        }

        return '';
      }

      function processRequest(request) {
        switch (request.method) {
          case 'GET':
            ajax("".concat(request.url).concat(formatGetParameters(request.data)), {
              success: configEnabledCallback(onSuccess),
              error: onFailure
            }, undefined, _extends({
              method: 'GET',
              withCredentials: true
            }, request.options));
            break;

          case 'POST':
            ajax(request.url, {
              success: configEnabledCallback(onSuccess),
              error: onFailure
            }, typeof request.data === 'string' ? request.data : JSON.stringify(request.data), _extends({
              method: 'POST',
              contentType: 'text/plain',
              withCredentials: true
            }, request.options));
            break;

          default:
            Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logWarn"])("Skipping invalid request from ".concat(spec.code, ". Request type ").concat(request.type, " must be GET or POST"));
            onResponse();
        } // If the server responds successfully, use the adapter code to unpack the Bids from it.
        // If the adapter code fails, no bids should be added. After all the bids have been added, make
        // sure to call the `onResponse` function so that we're one step closer to calling done().


        function onSuccess(response, responseObj) {
          onTimelyResponse(spec.code);

          try {
            response = JSON.parse(response);
          } catch (e) {
            /* response might not be JSON... that's ok. */
          } // Make response headers available for #1742. These are lazy-loaded because most adapters won't need them.


          response = {
            body: response,
            headers: headerParser(responseObj)
          };
          responses.push(response);
          var bids;

          try {
            bids = spec.interpretResponse(response, request);
          } catch (err) {
            Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logError"])("Bidder ".concat(spec.code, " failed to interpret the server's response. Continuing without bids"), null, err);
            onResponse();
            return;
          }

          if (bids) {
            if (Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["isArray"])(bids)) {
              bids.forEach(addBidUsingRequestMap);
            } else {
              addBidUsingRequestMap(bids);
            }
          }

          onResponse(bids);

          function addBidUsingRequestMap(bid) {
            var bidRequest = bidRequestMap[bid.requestId];

            if (bidRequest) {
              // creating a copy of original values as cpm and currency are modified later
              bid.originalCpm = bid.cpm;
              bid.originalCurrency = bid.currency;
              bid.meta = bid.meta || _extends({}, bid[bidRequest.bidder]);

              var prebidBid = _extends(Object(__WEBPACK_IMPORTED_MODULE_3__bidfactory_js__["a" /* createBid */])(__WEBPACK_IMPORTED_MODULE_7__constants_json___default.a.STATUS.GOOD, bidRequest), bid);

              addBidWithCode(bidRequest.adUnitCode, prebidBid);
            } else {
              Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logWarn"])("Bidder ".concat(spec.code, " made bid for unknown request ID: ").concat(bid.requestId, ". Ignoring."));
            }
          }

          function headerParser(xmlHttpResponse) {
            return {
              get: responseObj.getResponseHeader.bind(responseObj)
            };
          }
        } // If the server responds with an error, there's not much we can do. Log it, and make sure to
        // call onResponse() so that we're one step closer to calling done().


        function onFailure(err) {
          onTimelyResponse(spec.code);
          Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logError"])("Server call for ".concat(spec.code, " failed: ").concat(err, ". Continuing without bids."));
          onResponse();
        }
      }
    }
  });

  function registerSyncs(responses, gdprConsent, uspConsent) {
    registerSyncInner(spec, responses, gdprConsent, uspConsent);
  }

  function filterAndWarn(bid) {
    if (!spec.isBidRequestValid(bid)) {
      Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logWarn"])("Invalid bid sent to bidder ".concat(spec.code, ": ").concat(JSON.stringify(bid)));
      return false;
    }

    return true;
  }
}
var registerSyncInner = Object(__WEBPACK_IMPORTED_MODULE_13__hook_js__["b" /* hook */])('async', function (spec, responses, gdprConsent, uspConsent) {
  var aliasSyncEnabled = __WEBPACK_IMPORTED_MODULE_2__config_js__["b" /* config */].getConfig('userSync.aliasSyncEnabled');

  if (spec.getUserSyncs && (aliasSyncEnabled || !__WEBPACK_IMPORTED_MODULE_1__adapterManager_js__["default"].aliasRegistry[spec.code])) {
    var filterConfig = __WEBPACK_IMPORTED_MODULE_2__config_js__["b" /* config */].getConfig('userSync.filterSettings');
    var syncs = spec.getUserSyncs({
      iframeEnabled: !!(filterConfig && (filterConfig.iframe || filterConfig.all)),
      pixelEnabled: !!(filterConfig && (filterConfig.image || filterConfig.all))
    }, responses, gdprConsent, uspConsent);

    if (syncs) {
      if (!Array.isArray(syncs)) {
        syncs = [syncs];
      }

      syncs.forEach(function (sync) {
        __WEBPACK_IMPORTED_MODULE_4__userSync_js__["a" /* userSync */].registerSync(sync.type, spec.code, sync.url);
      });
    }
  }
}, 'registerSyncs');
function preloadBidderMappingFile(fn, adUnits) {
  if (!__WEBPACK_IMPORTED_MODULE_2__config_js__["b" /* config */].getConfig('adpod.brandCategoryExclusion')) {
    return fn.call(this, adUnits);
  }

  var adPodBidders = adUnits.filter(function (adUnit) {
    return Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["deepAccess"])(adUnit, 'mediaTypes.video.context') === __WEBPACK_IMPORTED_MODULE_12__mediaTypes_js__["a" /* ADPOD */];
  }).map(function (adUnit) {
    return adUnit.bids.map(function (bid) {
      return bid.bidder;
    });
  }).reduce(__WEBPACK_IMPORTED_MODULE_11__utils_js__["flatten"], []).filter(__WEBPACK_IMPORTED_MODULE_11__utils_js__["uniques"]);
  adPodBidders.forEach(function (bidder) {
    var bidderSpec = __WEBPACK_IMPORTED_MODULE_1__adapterManager_js__["default"].getBidAdapter(bidder);

    if (bidderSpec.getSpec().getMappingFileInfo) {
      var info = bidderSpec.getSpec().getMappingFileInfo();
      var refreshInDays = info.refreshInDays ? info.refreshInDays : DEFAULT_REFRESHIN_DAYS;
      var key = info.localStorageKey ? info.localStorageKey : bidderSpec.getSpec().code;
      var mappingData = storage.getDataFromLocalStorage(key);

      try {
        mappingData = mappingData ? JSON.parse(mappingData) : undefined;

        if (!mappingData || Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["timestamp"])() > mappingData.lastUpdated + refreshInDays * 24 * 60 * 60 * 1000) {
          Object(__WEBPACK_IMPORTED_MODULE_10__ajax_js__["a" /* ajax */])(info.url, {
            success: function success(response) {
              try {
                response = JSON.parse(response);
                var mapping = {
                  lastUpdated: Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["timestamp"])(),
                  mapping: response.mapping
                };
                storage.setDataInLocalStorage(key, JSON.stringify(mapping));
              } catch (error) {
                Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logError"])("Failed to parse ".concat(bidder, " bidder translation mapping file"));
              }
            },
            error: function error() {
              Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logError"])("Failed to load ".concat(bidder, " bidder translation file"));
            }
          });
        }
      } catch (error) {
        Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logError"])("Failed to parse ".concat(bidder, " bidder translation mapping file"));
      }
    }
  });
  fn.call(this, adUnits);
}
Object(__WEBPACK_IMPORTED_MODULE_13__hook_js__["a" /* getHook */])('checkAdUnitSetup').before(preloadBidderMappingFile);
/**
 * Reads the data stored in localstorage and returns iab subcategory
 * @param {string} bidderCode bidderCode
 * @param {string} category bidders category
 */

function getIabSubCategory(bidderCode, category) {
  var bidderSpec = __WEBPACK_IMPORTED_MODULE_1__adapterManager_js__["default"].getBidAdapter(bidderCode);

  if (bidderSpec.getSpec().getMappingFileInfo) {
    var info = bidderSpec.getSpec().getMappingFileInfo();
    var key = info.localStorageKey ? info.localStorageKey : bidderSpec.getBidderCode();
    var data = storage.getDataFromLocalStorage(key);

    if (data) {
      try {
        data = JSON.parse(data);
      } catch (error) {
        Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logError"])("Failed to parse ".concat(bidderCode, " mapping data stored in local storage"));
      }

      return data.mapping[category] ? data.mapping[category] : null;
    }
  }
} // check that the bid has a width and height set

function validBidSize(adUnitCode, bid, bidRequests) {
  if ((bid.width || parseInt(bid.width, 10) === 0) && (bid.height || parseInt(bid.height, 10) === 0)) {
    bid.width = parseInt(bid.width, 10);
    bid.height = parseInt(bid.height, 10);
    return true;
  }

  var adUnit = Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["getBidderRequest"])(bidRequests, bid.bidderCode, adUnitCode);
  var sizes = adUnit && adUnit.bids && adUnit.bids[0] && adUnit.bids[0].sizes;
  var parsedSizes = Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["parseSizesInput"])(sizes); // if a banner impression has one valid size, we assign that size to any bid
  // response that does not explicitly set width or height

  if (parsedSizes.length === 1) {
    var _parsedSizes$0$split = parsedSizes[0].split('x'),
        _parsedSizes$0$split2 = _slicedToArray(_parsedSizes$0$split, 2),
        width = _parsedSizes$0$split2[0],
        height = _parsedSizes$0$split2[1];

    bid.width = parseInt(width, 10);
    bid.height = parseInt(height, 10);
    return true;
  }

  return false;
} // Validate the arguments sent to us by the adapter. If this returns false, the bid should be totally ignored.


function isValid(adUnitCode, bid, bidRequests) {
  function hasValidKeys() {
    var bidKeys = Object.keys(bid);
    return COMMON_BID_RESPONSE_KEYS.every(function (key) {
      return __WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_includes_js___default()(bidKeys, key) && !__WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_includes_js___default()([undefined, null], bid[key]);
    });
  }

  function errorMessage(msg) {
    return "Invalid bid from ".concat(bid.bidderCode, ". Ignoring bid: ").concat(msg);
  }

  if (!adUnitCode) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logWarn"])('No adUnitCode was supplied to addBidResponse.');
    return false;
  }

  if (!bid) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logWarn"])("Some adapter tried to add an undefined bid for ".concat(adUnitCode, "."));
    return false;
  }

  if (!hasValidKeys()) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logError"])(errorMessage("Bidder ".concat(bid.bidderCode, " is missing required params. Check http://prebid.org/dev-docs/bidder-adapter-1.html for list of params.")));
    return false;
  }

  if (bid.mediaType === 'native' && !Object(__WEBPACK_IMPORTED_MODULE_5__native_js__["f" /* nativeBidIsValid */])(bid, bidRequests)) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logError"])(errorMessage('Native bid missing some required properties.'));
    return false;
  }

  if (bid.mediaType === 'video' && !Object(__WEBPACK_IMPORTED_MODULE_6__video_js__["d" /* isValidVideoBid */])(bid, bidRequests)) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logError"])(errorMessage("Video bid does not have required vastUrl or renderer property"));
    return false;
  }

  if (bid.mediaType === 'banner' && !validBidSize(adUnitCode, bid, bidRequests)) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils_js__["logError"])(errorMessage("Banner bids require a width and height"));
    return false;
  }

  return true;
}

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(96);

module.exports = parent;


/***/ }),

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(28);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);
var isArray = __webpack_require__(102);
var wellKnownSymbol = __webpack_require__(19);

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(48);

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(22);
var createNonEnumerableProperty = __webpack_require__(29);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(75);

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(106);
var entryUnbind = __webpack_require__(52);

module.exports = entryUnbind('Array', 'includes');


/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var $includes = __webpack_require__(76).includes;
var addToUnscopables = __webpack_require__(51);
var arrayMethodUsesToLength = __webpack_require__(60);

var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: !USES_TO_LENGTH }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(58);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(109);
__webpack_require__(126);
__webpack_require__(87);
__webpack_require__(128);
var path = __webpack_require__(42);

module.exports = path.Set;


/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(110);
var collectionStrong = __webpack_require__(115);

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
module.exports = collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Renderer;
/* harmony export (immutable) */ __webpack_exports__["c"] = isRendererRequired;
/* harmony export (immutable) */ __webpack_exports__["b"] = executeRenderer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adloader_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js__);



var moduleCode = 'outstream';
/**
 * @typedef {object} Renderer
 *
 * A Renderer stores some functions which are used to render a particular Bid.
 * These are used in Outstream Video Bids, returned on the Bid by the adapter, and will
 * be used to render that bid unless the Publisher overrides them.
 */

function Renderer(options) {
  var _this = this;

  var url = options.url,
      config = options.config,
      id = options.id,
      callback = options.callback,
      loaded = options.loaded,
      adUnitCode = options.adUnitCode;
  this.url = url;
  this.config = config;
  this.handlers = {};
  this.id = id; // a renderer may push to the command queue to delay rendering until the
  // render function is loaded by loadExternalScript, at which point the the command
  // queue will be processed

  this.loaded = loaded;
  this.cmd = [];

  this.push = function (func) {
    if (typeof func !== 'function') {
      __WEBPACK_IMPORTED_MODULE_1__utils_js__["logError"]('Commands given to Renderer.push must be wrapped in a function');
      return;
    }

    _this.loaded ? func.call() : _this.cmd.push(func);
  }; // bidders may override this with the `callback` property given to `install`


  this.callback = callback || function () {
    _this.loaded = true;

    _this.process();
  }; // use a function, not an arrow, in order to be able to pass "arguments" through


  this.render = function () {
    if (!isRendererDefinedOnAdUnit(adUnitCode)) {
      // we expect to load a renderer url once only so cache the request to load script
      Object(__WEBPACK_IMPORTED_MODULE_0__adloader_js__["a" /* loadExternalScript */])(url, moduleCode, this.callback);
    } else {
      __WEBPACK_IMPORTED_MODULE_1__utils_js__["logWarn"]("External Js not loaded by Renderer since renderer url and callback is already defined on adUnit ".concat(adUnitCode));
    }

    if (this._render) {
      this._render.apply(this, arguments); // _render is expected to use push as appropriate

    } else {
      __WEBPACK_IMPORTED_MODULE_1__utils_js__["logWarn"]("No render function was provided, please use .setRender on the renderer");
    }
  }.bind(this); // bind the function to this object to avoid 'this' errors

}

Renderer.install = function (_ref) {
  var url = _ref.url,
      config = _ref.config,
      id = _ref.id,
      callback = _ref.callback,
      loaded = _ref.loaded,
      adUnitCode = _ref.adUnitCode;
  return new Renderer({
    url: url,
    config: config,
    id: id,
    callback: callback,
    loaded: loaded,
    adUnitCode: adUnitCode
  });
};

Renderer.prototype.getConfig = function () {
  return this.config;
};

Renderer.prototype.setRender = function (fn) {
  this._render = fn;
};

Renderer.prototype.setEventHandlers = function (handlers) {
  this.handlers = handlers;
};

Renderer.prototype.handleVideoEvent = function (_ref2) {
  var id = _ref2.id,
      eventName = _ref2.eventName;

  if (typeof this.handlers[eventName] === 'function') {
    this.handlers[eventName]();
  }

  __WEBPACK_IMPORTED_MODULE_1__utils_js__["logMessage"]("Prebid Renderer event for id ".concat(id, " type ").concat(eventName));
};
/*
 * Calls functions that were pushed to the command queue before the
 * renderer was loaded by `loadExternalScript`
 */


Renderer.prototype.process = function () {
  while (this.cmd.length > 0) {
    try {
      this.cmd.shift().call();
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_1__utils_js__["logError"]('Error processing Renderer command: ', error);
    }
  }
};
/**
 * Checks whether creative rendering should be done by Renderer or not.
 * @param {Object} renderer Renderer object installed by adapter
 * @returns {Boolean}
 */


function isRendererRequired(renderer) {
  return !!(renderer && renderer.url);
}
/**
 * Render the bid returned by the adapter
 * @param {Object} renderer Renderer object installed by adapter
 * @param {Object} bid Bid response
 */

function executeRenderer(renderer, bid) {
  renderer.render(bid);
}

function isRendererDefinedOnAdUnit(adUnitCode) {
  var adUnits = pbjs.adUnits;
  var adUnit = __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default()(adUnits, function (adUnit) {
    return adUnit.code === adUnitCode;
  });
  return !!(adUnit && adUnit.renderer && adUnit.renderer.url && adUnit.renderer.render);
}

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var global = __webpack_require__(22);
var InternalMetadataModule = __webpack_require__(78);
var fails = __webpack_require__(28);
var createNonEnumerableProperty = __webpack_require__(29);
var iterate = __webpack_require__(17);
var anInstance = __webpack_require__(81);
var isObject = __webpack_require__(23);
var setToStringTag = __webpack_require__(64);
var defineProperty = __webpack_require__(31).f;
var forEach = __webpack_require__(56).forEach;
var DESCRIPTORS = __webpack_require__(27);
var InternalStateModule = __webpack_require__(54);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var exported = {};
  var Constructor;

  if (!DESCRIPTORS || typeof NativeConstructor != 'function'
    || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))
  ) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else {
    Constructor = wrapper(function (target, iterable) {
      setInternalState(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
        type: CONSTRUCTOR_NAME,
        collection: new NativeConstructor()
      });
      if (iterable != undefined) iterate(iterable, target[ADDER], target, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    forEach(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
        createNonEnumerableProperty(Constructor.prototype, KEY, function (a, b) {
          var collection = getInternalState(this).collection;
          if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
          var result = collection[KEY](a === 0 ? 0 : a, b);
          return IS_ADDER ? this : result;
        });
      }
    });

    IS_WEAK || defineProperty(Constructor.prototype, 'size', {
      configurable: true,
      get: function () {
        return getInternalState(this).collection.size;
      }
    });
  }

  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: true }, exported);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(28);

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(63);
var classof = __webpack_require__(62);

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(22);
var inspectSource = __webpack_require__(114);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(74);

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__(31).f;
var create = __webpack_require__(82);
var redefineAll = __webpack_require__(120);
var bind = __webpack_require__(21);
var anInstance = __webpack_require__(81);
var iterate = __webpack_require__(17);
var defineIterator = __webpack_require__(66);
var setSpecies = __webpack_require__(125);
var DESCRIPTORS = __webpack_require__(27);
var fastKey = __webpack_require__(78).fastKey;
var InternalStateModule = __webpack_require__(54);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(27);
var definePropertyModule = __webpack_require__(31);
var anObject = __webpack_require__(15);
var objectKeys = __webpack_require__(117);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(118);
var enumBugKeys = __webpack_require__(83);

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(24);
var toIndexedObject = __webpack_require__(47);
var indexOf = __webpack_require__(76).indexOf;
var hiddenKeys = __webpack_require__(53);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(25);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(105);

module.exports = parent;


/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(84);

module.exports = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else redefine(target, key, src[key], options);
  } return target;
};


/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(85).IteratorPrototype;
var create = __webpack_require__(82);
var createPropertyDescriptor = __webpack_require__(46);
var setToStringTag = __webpack_require__(64);
var Iterators = __webpack_require__(37);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(28);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var aPossiblePrototype = __webpack_require__(124);

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(25);
var definePropertyModule = __webpack_require__(31);
var wellKnownSymbol = __webpack_require__(19);
var DESCRIPTORS = __webpack_require__(27);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ 126:
/***/ (function(module, exports) {

// empty


/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(58);
var requireObjectCoercible = __webpack_require__(49);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(129);
var DOMIterables = __webpack_require__(130);
var global = __webpack_require__(22);
var classof = __webpack_require__(62);
var createNonEnumerableProperty = __webpack_require__(29);
var Iterators = __webpack_require__(37);
var wellKnownSymbol = __webpack_require__(19);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  Iterators[COLLECTION_NAME] = Iterators.Array;
}


/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(47);
var addToUnscopables = __webpack_require__(51);
var Iterators = __webpack_require__(37);
var InternalStateModule = __webpack_require__(54);
var defineIterator = __webpack_require__(66);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getHook; });
/* harmony export (immutable) */ __webpack_exports__["d"] = setupBeforeHookFnOnce;
/* harmony export (immutable) */ __webpack_exports__["c"] = module;
/* harmony export (immutable) */ __webpack_exports__["e"] = submodule;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval_index_js__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval_index_js__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var hook = __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval_index_js___default()({
  ready: __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval_index_js___default.a.SYNC | __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval_index_js___default.a.ASYNC | __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval_index_js___default.a.QUEUE
});
var getHook = hook.get;
function setupBeforeHookFnOnce(baseFn, hookFn) {
  var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;
  var result = baseFn.getHooks({
    hook: hookFn
  });

  if (result.length === 0) {
    baseFn.before(hookFn, priority);
  }
}
function module(name, install) {
  hook('async', function (submodules) {
    submodules.forEach(function (args) {
      return install.apply(void 0, _toConsumableArray(args));
    });
  }, name)([]); // will be queued until hook.ready() called in pbjs.processQueue();
}
function submodule(name) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  getHook(name).before(function (next, modules) {
    modules.push(args);
    next(modules);
  });
}

/***/ }),

/***/ 130:
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(14);
var from = __webpack_require__(132);

// `Set.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
$({ target: 'Set', stat: true }, {
  from: from
});


/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var aFunction = __webpack_require__(18);
var bind = __webpack_require__(21);
var iterate = __webpack_require__(17);

module.exports = function from(source /* , mapFn, thisArg */) {
  var length = arguments.length;
  var mapFn = length > 1 ? arguments[1] : undefined;
  var mapping, A, n, boundFunction;
  aFunction(this);
  mapping = mapFn !== undefined;
  if (mapping) aFunction(mapFn);
  if (source == undefined) return new this();
  A = [];
  if (mapping) {
    n = 0;
    boundFunction = bind(mapFn, length > 2 ? arguments[2] : undefined, 2);
    iterate(source, function (nextItem) {
      A.push(boundFunction(nextItem, n++));
    });
  } else {
    iterate(source, A.push, A);
  }
  return new this(A);
};


/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(14);
var of = __webpack_require__(134);

// `Set.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
$({ target: 'Set', stat: true }, {
  of: of
});


/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
module.exports = function of() {
  var length = arguments.length;
  var A = new Array(length);
  while (length--) A[length] = arguments[length];
  return new this(A);
};


/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var collectionAddAll = __webpack_require__(136);

// `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  addAll: function addAll(/* ...elements */) {
    return collectionAddAll.apply(this, arguments);
  }
});


/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);

// https://github.com/tc39/collection-methods
module.exports = function (/* ...elements */) {
  var set = anObject(this);
  var adder = aFunction(set.add);
  for (var k = 0, len = arguments.length; k < len; k++) {
    adder.call(set, arguments[k]);
  }
  return set;
};


/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var collectionDeleteAll = __webpack_require__(138);

// `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  deleteAll: function deleteAll(/* ...elements */) {
    return collectionDeleteAll.apply(this, arguments);
  }
});


/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);

// https://github.com/tc39/collection-methods
module.exports = function (/* ...elements */) {
  var collection = anObject(this);
  var remover = aFunction(collection['delete']);
  var allDeleted = true;
  var wasDeleted;
  for (var k = 0, len = arguments.length; k < len; k++) {
    wasDeleted = remover.call(collection, arguments[k]);
    allDeleted = allDeleted && wasDeleted;
  }
  return !!allDeleted;
};


/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var anObject = __webpack_require__(15);
var bind = __webpack_require__(21);
var getSetIterator = __webpack_require__(34);
var iterate = __webpack_require__(17);

// `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  every: function every(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return !iterate(iterator, function (value) {
      if (!boundFunction(value, value, set)) return iterate.stop();
    }, undefined, false, true).stopped;
  }
});


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(22);
var getOwnPropertyDescriptor = __webpack_require__(98).f;
var isForced = __webpack_require__(100);
var path = __webpack_require__(42);
var bind = __webpack_require__(21);
var createNonEnumerableProperty = __webpack_require__(29);
var has = __webpack_require__(24);

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return NativeConstructor.apply(this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : (global[TARGET] || {}).prototype;

  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

    // bind timers to global for call from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global);
    // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && typeof sourceProperty == 'function') resultProperty = bind(Function.call, sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!has(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
      // export real prototype methods
      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};


/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var getBuiltIn = __webpack_require__(25);
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var speciesConstructor = __webpack_require__(38);
var iterate = __webpack_require__(17);

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  difference: function difference(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    var remover = aFunction(newSet['delete']);
    iterate(iterable, function (value) {
      remover.call(newSet, value);
    });
    return newSet;
  }
});


/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var getBuiltIn = __webpack_require__(25);
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var bind = __webpack_require__(21);
var speciesConstructor = __webpack_require__(38);
var getSetIterator = __webpack_require__(34);
var iterate = __webpack_require__(17);

// `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var adder = aFunction(newSet.add);
    iterate(iterator, function (value) {
      if (boundFunction(value, value, set)) adder.call(newSet, value);
    }, undefined, false, true);
    return newSet;
  }
});


/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var anObject = __webpack_require__(15);
var bind = __webpack_require__(21);
var getSetIterator = __webpack_require__(34);
var iterate = __webpack_require__(17);

// `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  find: function find(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (value) {
      if (boundFunction(value, value, set)) return iterate.stop(value);
    }, undefined, false, true).result;
  }
});


/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var getBuiltIn = __webpack_require__(25);
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var speciesConstructor = __webpack_require__(38);
var iterate = __webpack_require__(17);

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  intersection: function intersection(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var hasCheck = aFunction(set.has);
    var adder = aFunction(newSet.add);
    iterate(iterable, function (value) {
      if (hasCheck.call(set, value)) adder.call(newSet, value);
    });
    return newSet;
  }
});


/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var iterate = __webpack_require__(17);

// `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  isDisjointFrom: function isDisjointFrom(iterable) {
    var set = anObject(this);
    var hasCheck = aFunction(set.has);
    return !iterate(iterable, function (value) {
      if (hasCheck.call(set, value) === true) return iterate.stop();
    }).stopped;
  }
});


/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var getBuiltIn = __webpack_require__(25);
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var getIterator = __webpack_require__(88);
var iterate = __webpack_require__(17);

// `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  isSubsetOf: function isSubsetOf(iterable) {
    var iterator = getIterator(this);
    var otherSet = anObject(iterable);
    var hasCheck = otherSet.has;
    if (typeof hasCheck != 'function') {
      otherSet = new (getBuiltIn('Set'))(iterable);
      hasCheck = aFunction(otherSet.has);
    }
    return !iterate(iterator, function (value) {
      if (hasCheck.call(otherSet, value) === false) return iterate.stop();
    }, undefined, false, true).stopped;
  }
});


/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var iterate = __webpack_require__(17);

// `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  isSupersetOf: function isSupersetOf(iterable) {
    var set = anObject(this);
    var hasCheck = aFunction(set.has);
    return !iterate(iterable, function (value) {
      if (hasCheck.call(set, value) === false) return iterate.stop();
    }).stopped;
  }
});


/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var anObject = __webpack_require__(15);
var getSetIterator = __webpack_require__(34);
var iterate = __webpack_require__(17);

// `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  join: function join(separator) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var sep = separator === undefined ? ',' : String(separator);
    var result = [];
    iterate(iterator, result.push, result, false, true);
    return result.join(sep);
  }
});


/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var getBuiltIn = __webpack_require__(25);
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var bind = __webpack_require__(21);
var speciesConstructor = __webpack_require__(38);
var getSetIterator = __webpack_require__(34);
var iterate = __webpack_require__(17);

// `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  map: function map(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var adder = aFunction(newSet.add);
    iterate(iterator, function (value) {
      adder.call(newSet, boundFunction(value, value, set));
    }, undefined, false, true);
    return newSet;
  }
});


/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var getSetIterator = __webpack_require__(34);
var iterate = __webpack_require__(17);

// `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aFunction(callbackfn);
    iterate(iterator, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, value, set);
      }
    }, undefined, false, true);
    if (noInitial) throw TypeError('Reduce of empty set with no initial value');
    return accumulator;
  }
});


/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var anObject = __webpack_require__(15);
var bind = __webpack_require__(21);
var getSetIterator = __webpack_require__(34);
var iterate = __webpack_require__(17);

// `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  some: function some(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (value) {
      if (boundFunction(value, value, set)) return iterate.stop();
    }, undefined, false, true).stopped;
  }
});


/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var getBuiltIn = __webpack_require__(25);
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var speciesConstructor = __webpack_require__(38);
var iterate = __webpack_require__(17);

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  symmetricDifference: function symmetricDifference(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    var remover = aFunction(newSet['delete']);
    var adder = aFunction(newSet.add);
    iterate(iterable, function (value) {
      remover.call(newSet, value) || adder.call(newSet, value);
    });
    return newSet;
  }
});


/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var IS_PURE = __webpack_require__(16);
var getBuiltIn = __webpack_require__(25);
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var speciesConstructor = __webpack_require__(38);
var iterate = __webpack_require__(17);

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  union: function union(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    iterate(iterable, aFunction(newSet.add), newSet);
    return newSet;
  }
});


/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
__webpack_require__(154);
var path = __webpack_require__(42);

module.exports = path.Array.from;


/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(14);
var from = __webpack_require__(155);
var checkCorrectnessOfIteration = __webpack_require__(157);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(21);
var toObject = __webpack_require__(57);
var callWithSafeIterationClosing = __webpack_require__(80);
var isArrayIteratorMethod = __webpack_require__(79);
var toLength = __webpack_require__(50);
var createProperty = __webpack_require__(156);
var getIteratorMethod = __webpack_require__(61);

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(55);
var definePropertyModule = __webpack_require__(31);
var createPropertyDescriptor = __webpack_require__(46);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(19);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ 158:
/***/ (function(module, exports) {

module.exports = clone;

/*
  Identical to `just-extend(true, {}, obj1)`

  var arr = [1, 2, 3];
  var subObj = {aa: 1};
  var obj = {a: 3, b: 5, c: arr, d: subObj};
  var objClone = clone(obj);
  arr.push(4);
  subObj.bb = 2;
  obj; // {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1}}  
  objClone; // {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1, bb: 2}}
*/

function clone(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    // include prototype properties
    var value = obj[key];
    if (value && typeof value == 'object') {
      result[key] = clone(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}


/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = dlv;
function dlv(obj, key, def, p, undef) {
	key = key.split ? key.split('.') : key;
	for (p = 0; p < key.length; p++) {
		obj = obj ? obj[key[p]] : undef;
	}
	return obj === undef ? def : obj;
}


/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (obj, keys, val) {
	keys.split && (keys=keys.split('.'));
	var i=0, l=keys.length, t=obj, x;
	for (; i < l; ++i) {
		x = t[keys[i]];
		t = t[keys[i]] = (i === l - 1 ? val : (x != null ? x : (!!~keys[i+1].indexOf('.') || !(+keys[i+1] > -1)) ? {} : []));
	}
});


/***/ }),

/***/ 161:
/***/ (function(module, exports) {

/*
* @license MIT
* Fun Hooks v0.9.9
* (c) @snapwich
*/
create.SYNC = 1;
create.ASYNC = 2;
create.QUEUE = 4;

var packageName = "fun-hooks";

function hasProxy() {
  return !!(typeof Proxy === "function" && Proxy.revocable);
}

var defaults = Object.freeze({
  useProxy: true,
  ready: 0
});

var hookableMap = new WeakMap();

// detect incorrectly implemented reduce and if found use polyfill
// https://github.com/prebid/Prebid.js/issues/3576
// polyfill from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
var reduce =
  [1]
    .reduce(function(a, b, c) {
      return [a, b, c];
    }, 2)
    .toString() === "2,1,0"
    ? Array.prototype.reduce
    : function(callback, initial) {
        var o = Object(this);
        var len = o.length >>> 0;
        var k = 0;
        var value;
        if (initial) {
          value = initial;
        } else {
          while (k < len && !(k in o)) {
            k++;
          }
          value = o[k++];
        }
        while (k < len) {
          if (k in o) {
            value = callback(value, o[k], k, o);
          }
          k++;
        }
        return value;
      };

function rest(args, skip) {
  return Array.prototype.slice.call(args, skip);
}

var assign =
  Object.assign ||
  function assign(target) {
    return reduce.call(
      rest(arguments, 1),
      function(target, obj) {
        if (obj) {
          Object.keys(obj).forEach(function(prop) {
            target[prop] = obj[prop];
          });
        }
        return target;
      },
      target
    );
  };

function runAll(queue) {
  var queued;
  // eslint-disable-next-line no-cond-assign
  while ((queued = queue.shift())) {
    queued();
  }
}

function create(config) {
  var hooks = {};
  var postReady = [];

  config = assign({}, defaults, config);

  function dispatch(arg1, arg2) {
    if (typeof arg1 === "function") {
      return hookFn.call(null, "sync", arg1, arg2);
    } else if (typeof arg1 === "string" && typeof arg2 === "function") {
      return hookFn.apply(null, arguments);
    } else if (typeof arg1 === "object") {
      return hookObj.apply(null, arguments);
    }
  }

  var ready;
  if (config.ready) {
    dispatch.ready = function() {
      ready = true;
      runAll(postReady);
    };
  } else {
    ready = true;
  }

  function hookObj(obj, props, objName) {
    var walk = true;
    if (typeof props === "undefined") {
      props = Object.getOwnPropertyNames(obj);
      walk = false;
    }
    var objHooks = {};
    var doNotHook = ["constructor"];
    do {
      props = props.filter(function(prop) {
        return (
          typeof obj[prop] === "function" &&
          !(doNotHook.indexOf(prop) !== -1) &&
          !prop.match(/^_/)
        );
      });
      props.forEach(function(prop) {
        var parts = prop.split(":");
        var name = parts[0];
        var type = parts[1] || "sync";
        if (!objHooks[name]) {
          var fn = obj[name];
          objHooks[name] = obj[name] = hookFn(
            type,
            fn,
            objName ? [objName, name] : undefined
          );
        }
      });
      obj = Object.getPrototypeOf(obj);
    } while (walk && obj);
    return objHooks;
  }

  /**
   * Navigates a string path to return a hookable function.  If not found, creates a placeholder for hooks.
   * @param {(Array<string> | string)} path
   */
  function get(path) {
    var parts = Array.isArray(path) ? path : path.split(".");
    return reduce.call(
      parts,
      function(memo, part, i) {
        var item = memo[part];
        var installed = false;
        if (item) {
          return item;
        } else if (i === parts.length - 1) {
          if (!ready) {
            postReady.push(function() {
              if (!installed) {
                // eslint-disable-next-line no-console
                console.warn(
                  packageName +
                    ": referenced '" +
                    path +
                    "' but it was never created"
                );
              }
            });
          }
          return (memo[part] = newHookable(function(fn) {
            memo[part] = fn;
            installed = true;
          }));
        }
        return (memo[part] = {});
      },
      hooks
    );
  }

  function newHookable(onInstall) {
    var before = [];
    var after = [];
    var generateTrap = function() {};

    var api = {
      before: function(hook, priority) {
        return add.call(this, before, "before", hook, priority);
      },
      after: function(hook, priority) {
        return add.call(this, after, "after", hook, priority);
      },
      getHooks: function(match) {
        var hooks = before.concat(after);
        if (typeof match === "object") {
          hooks = hooks.filter(function(entry) {
            return Object.keys(match).every(function(prop) {
              return entry[prop] === match[prop];
            });
          });
        }
        try {
          assign(hooks, {
            remove: function() {
              hooks.forEach(function(entry) {
                entry.remove();
              });
              return this;
            }
          });
        } catch (e) {
          console.error(
            "error adding `remove` to array, did you modify Array.prototype?"
          );
        }
        return hooks;
      },
      removeAll: function() {
        return this.getHooks().remove();
      }
    };

    var meta = {
      install: function(type, fn, generate) {
        this.type = type;
        generateTrap = generate;
        generate(before, after);
        onInstall && onInstall(fn);
      }
    };

    // store meta data related to hookable. use `api.after` since `api` reference is not available on our proxy.
    hookableMap.set(api.after, meta);

    return api;

    function add(store, type, hook, priority) {
      var entry = {
        hook: hook,
        type: type,
        priority: priority || 10,
        remove: function() {
          var index = store.indexOf(entry);
          if (index !== -1) {
            store.splice(index, 1);
            generateTrap(before, after);
          }
        }
      };
      store.push(entry);
      store.sort(function(a, b) {
        return b.priority - a.priority;
      });
      generateTrap(before, after);
      return this;
    }
  }

  function hookFn(type, fn, name) {
    // check if function has already been wrapped
    var meta = fn.after && hookableMap.get(fn.after);
    if (meta) {
      if (meta.type !== type) {
        throw packageName + ": recreated hookable with different type";
      } else {
        return fn;
      }
    }

    var hookable = name ? get(name) : newHookable();

    var trap;
    var hookedFn;
    var handlers = {
      get: function(target, prop) {
        return hookable[prop] || Reflect.get.apply(Reflect, arguments);
      }
    };

    if (!ready) {
      postReady.push(setTrap);
    }

    if (config.useProxy && hasProxy()) {
      hookedFn = new Proxy(fn, handlers);
    } else {
      hookedFn = function() {
        return handlers.apply
          ? handlers.apply(fn, this, rest(arguments))
          : fn.apply(this, arguments);
      };
      assign(hookedFn, hookable);
    }

    hookableMap.get(hookedFn.after).install(type, hookedFn, generateTrap);

    return hookedFn;

    // eslint-disable-next-line no-redeclare
    function generateTrap(before, after) {
      var order = [];
      var targetIndex;
      if (before.length || after.length) {
        before.forEach(addToOrder);
        // placeholder for target function wrapper
        targetIndex = order.push(undefined) - 1;
        after.forEach(addToOrder);
        trap = function(target, thisArg, args) {
          var curr = 0;
          var result;
          var callback =
            type === "async" &&
            typeof args[args.length - 1] === "function" &&
            args.pop();
          function bail(value) {
            if (type === "sync") {
              result = value;
            } else if (callback) {
              callback.apply(null, arguments);
            }
          }
          function next(value) {
            if (order[curr]) {
              var args = rest(arguments);
              next.bail = bail;
              args.unshift(next);
              return order[curr++].apply(thisArg, args);
            }
            if (type === "sync") {
              result = value;
            } else if (callback) {
              callback.apply(null, arguments);
            }
          }
          order[targetIndex] = function() {
            var args = rest(arguments, 1);
            if (type === "async" && callback) {
              delete next.bail;
              args.push(next);
            }
            var result = target.apply(thisArg, args);
            if (type === "sync") {
              next(result);
            }
          };
          next.apply(null, args);
          return result;
        };
      } else {
        trap = undefined;
      }
      setTrap();

      function addToOrder(entry) {
        order.push(entry.hook);
      }
    }

    function setTrap() {
      if (
        ready ||
        (type === "sync" && !(config.ready & create.SYNC)) ||
        (type === "async" && !(config.ready & create.ASYNC))
      ) {
        handlers.apply = trap;
      } else if (type === "sync" || !(config.ready & create.QUEUE)) {
        handlers.apply = function() {
          throw packageName + ": hooked function not ready";
        };
      } else {
        handlers.apply = function() {
          var args = arguments;
          postReady.push(function() {
            hookedFn.apply(args[1], args[2]);
          });
        };
      }
    }
  }

  dispatch.get = get;
  return dispatch;
}

/* global module */
module.exports = create;


/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var isArrayIteratorMethod = __webpack_require__(79);
var toLength = __webpack_require__(50);
var bind = __webpack_require__(21);
var getIteratorMethod = __webpack_require__(61);
var callWithSafeIterationClosing = __webpack_require__(80);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(22);
var shared = __webpack_require__(73);
var has = __webpack_require__(24);
var uid = __webpack_require__(59);
var NATIVE_SYMBOL = __webpack_require__(75);
var USE_SYMBOL_AS_UID = __webpack_require__(104);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return VIDEO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BANNER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADPOD; });
/**
 * This file contains the valid Media Types in Prebid.
 *
 * All adapters are assumed to support banner ads. Other media types are specified by Adapters when they
 * register themselves with prebid-core.
 */

/**
 * @typedef {('native'|'video'|'banner')} MediaType
 * @typedef {('adpod')} VideoContext
 */

/** @type MediaType */
var NATIVE = 'native';
/** @type MediaType */

var VIDEO = 'video';
/** @type MediaType */

var BANNER = 'banner';
/** @type VideoContext */

var ADPOD = 'adpod';

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getGlobal;
// if $$PREBID_GLOBAL$$ already exists in global document scope, use it, if not, create the object
// global defination should happen BEFORE imports to avoid global undefined errors.
window.pbjs = window.pbjs || {};
window.pbjs.cmd = window.pbjs.cmd || [];
window.pbjs.que = window.pbjs.que || []; // create a pbjs global pointer

window._pbjsGlobals = window._pbjsGlobals || [];

window._pbjsGlobals.push("pbjs");

function getGlobal() {
  return window.pbjs;
}

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(18);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(216);
var entryUnbind = __webpack_require__(52);

module.exports = entryUnbind('Array', 'findIndex');


/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var $findIndex = __webpack_require__(56).findIndex;
var addToUnscopables = __webpack_require__(51);
var arrayMethodUsesToLength = __webpack_require__(60);

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listenMessagesFromCreative;
/* unused harmony export _sendAdToCreative */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__native_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auctionManager_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js__);
/* Secure Creatives
  Provides support for rendering creatives into cross domain iframes such as SafeFrame to prevent
   access to a publisher page from creative payloads.
 */








var BID_WON = __WEBPACK_IMPORTED_MODULE_2__constants_json__["EVENTS"].BID_WON;
function listenMessagesFromCreative() {
  window.addEventListener('message', receiveMessage, false);
}

function receiveMessage(ev) {
  var key = ev.message ? 'message' : 'data';
  var data = {};

  try {
    data = JSON.parse(ev[key]);
  } catch (e) {
    return;
  }

  if (data && data.adId) {
    var adObject = __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js___default()(__WEBPACK_IMPORTED_MODULE_4__auctionManager_js__["a" /* auctionManager */].getBidsReceived(), function (bid) {
      return bid.adId === data.adId;
    });

    if (adObject && data.message === 'Prebid Request') {
      _sendAdToCreative(adObject, ev); // save winning bids


      __WEBPACK_IMPORTED_MODULE_4__auctionManager_js__["a" /* auctionManager */].addWinningBid(adObject);
      __WEBPACK_IMPORTED_MODULE_0__events_js___default.a.emit(BID_WON, adObject);
    } // handle this script from native template in an ad server
    // window.parent.postMessage(JSON.stringify({
    //   message: 'Prebid Native',
    //   adId: '%%PATTERN:hb_adid%%'
    // }), '*');


    if (adObject && data.message === 'Prebid Native') {
      if (data.action === 'assetRequest') {
        var message = Object(__WEBPACK_IMPORTED_MODULE_1__native_js__["c" /* getAssetMessage */])(data, adObject);
        ev.source.postMessage(JSON.stringify(message), ev.origin);
        return;
      }

      var trackerType = Object(__WEBPACK_IMPORTED_MODULE_1__native_js__["b" /* fireNativeTrackers */])(data, adObject);

      if (trackerType === 'click') {
        return;
      }

      __WEBPACK_IMPORTED_MODULE_4__auctionManager_js__["a" /* auctionManager */].addWinningBid(adObject);
      __WEBPACK_IMPORTED_MODULE_0__events_js___default.a.emit(BID_WON, adObject);
    }
  }
}

function _sendAdToCreative(adObject, ev) {
  var adId = adObject.adId,
      ad = adObject.ad,
      adUrl = adObject.adUrl,
      width = adObject.width,
      height = adObject.height,
      renderer = adObject.renderer,
      cpm = adObject.cpm; // rendering for outstream safeframe

  if (Object(__WEBPACK_IMPORTED_MODULE_6__Renderer_js__["c" /* isRendererRequired */])(renderer)) {
    Object(__WEBPACK_IMPORTED_MODULE_6__Renderer_js__["b" /* executeRenderer */])(renderer, adObject);
  } else if (adId) {
    resizeRemoteCreative(adObject);
    ev.source.postMessage(JSON.stringify({
      message: 'Prebid Response',
      ad: Object(__WEBPACK_IMPORTED_MODULE_3__utils_js__["replaceAuctionPrice"])(ad, cpm),
      adUrl: Object(__WEBPACK_IMPORTED_MODULE_3__utils_js__["replaceAuctionPrice"])(adUrl, cpm),
      adId: adId,
      width: width,
      height: height
    }), ev.origin);
  }
}

function resizeRemoteCreative(_ref) {
  var adId = _ref.adId,
      adUnitCode = _ref.adUnitCode,
      width = _ref.width,
      height = _ref.height;
  // resize both container div + iframe
  ['div', 'iframe'].forEach(function (elmType) {
    // not select element that gets removed after dfp render
    var element = getElementByAdUnit(elmType + ':not([style*="display: none"])');

    if (element) {
      var elementStyle = element.style;
      elementStyle.width = width + 'px';
      elementStyle.height = height + 'px';
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_3__utils_js__["logWarn"])("Unable to locate matching page element for adUnitCode ".concat(adUnitCode, ".  Can't resize it to ad's dimensions.  Please review setup."));
    }
  });

  function getElementByAdUnit(elmType) {
    var id = getElementIdBasedOnAdServer(adId, adUnitCode);
    var parentDivEle = document.getElementById(id);
    return parentDivEle && parentDivEle.querySelector(elmType);
  }

  function getElementIdBasedOnAdServer(adId, adUnitCode) {
    if (window.googletag) {
      return getDfpElementId(adId);
    } else if (window.apntag) {
      return getAstElementId(adUnitCode);
    } else {
      return adUnitCode;
    }
  }

  function getDfpElementId(adId) {
    return __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js___default()(window.googletag.pubads().getSlots(), function (slot) {
      return __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js___default()(slot.getTargetingKeys(), function (key) {
        return __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(slot.getTargeting(key), adId);
      });
    }).getSlotElementId();
  }

  function getAstElementId(adUnitCode) {
    var astTag = window.apntag.getTag(adUnitCode);
    return astTag && astTag.targetId;
  }
}

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export addBidResponseBound */
/* unused harmony export addBidderRequestsBound */
/* unused harmony export enableOverrides */
/* unused harmony export disableOverrides */
/* unused harmony export bidExcluded */
/* unused harmony export bidderExcluded */
/* unused harmony export applyBidOverrides */
/* unused harmony export addBidResponseHook */
/* unused harmony export addBidderRequestsHook */
/* unused harmony export getConfig */
/* harmony export (immutable) */ __webpack_exports__["a"] = sessionLoader;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auction_js__ = __webpack_require__(40);



var OVERRIDE_KEY = "pbjs:debugging";
var addBidResponseBound;
var addBidderRequestsBound;

function logMessage(msg) {
  Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["logMessage"])('DEBUG: ' + msg);
}

function logWarn(msg) {
  Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["logWarn"])('DEBUG: ' + msg);
}

function addHooks(overrides) {
  addBidResponseBound = addBidResponseHook.bind(overrides);
  __WEBPACK_IMPORTED_MODULE_2__auction_js__["c" /* addBidResponse */].before(addBidResponseBound, 5);
  addBidderRequestsBound = addBidderRequestsHook.bind(overrides);
  __WEBPACK_IMPORTED_MODULE_2__auction_js__["e" /* addBidderRequests */].before(addBidderRequestsBound, 5);
}

function removeHooks() {
  __WEBPACK_IMPORTED_MODULE_2__auction_js__["c" /* addBidResponse */].getHooks({
    hook: addBidResponseBound
  }).remove();
  __WEBPACK_IMPORTED_MODULE_2__auction_js__["e" /* addBidderRequests */].getHooks({
    hook: addBidderRequestsBound
  }).remove();
}

function enableOverrides(overrides) {
  var fromSession = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  __WEBPACK_IMPORTED_MODULE_0__config_js__["b" /* config */].setConfig({
    'debug': true
  });
  removeHooks();
  addHooks(overrides);
  logMessage("bidder overrides enabled".concat(fromSession ? ' from session' : ''));
}
function disableOverrides() {
  removeHooks();
  logMessage('bidder overrides disabled');
}
/**
 * @param {{bidder:string, adUnitCode:string}} overrideObj
 * @param {string} bidderCode
 * @param {string} adUnitCode
 * @returns {boolean}
 */

function bidExcluded(overrideObj, bidderCode, adUnitCode) {
  if (overrideObj.bidder && overrideObj.bidder !== bidderCode) {
    return true;
  }

  if (overrideObj.adUnitCode && overrideObj.adUnitCode !== adUnitCode) {
    return true;
  }

  return false;
}
/**
 * @param {string[]} bidders
 * @param {string} bidderCode
 * @returns {boolean}
 */

function bidderExcluded(bidders, bidderCode) {
  return Array.isArray(bidders) && bidders.indexOf(bidderCode) === -1;
}
/**
 * @param {Object} overrideObj
 * @param {Object} bidObj
 * @param {Object} bidType
 * @returns {Object} bidObj with overridden properties
 */

function applyBidOverrides(overrideObj, bidObj, bidType) {
  return Object.keys(overrideObj).filter(function (key) {
    return ['adUnitCode', 'bidder'].indexOf(key) === -1;
  }).reduce(function (result, key) {
    logMessage("bidder overrides changed '".concat(result.adUnitCode, "/").concat(result.bidderCode, "' ").concat(bidType, ".").concat(key, " from '").concat(result[key], ".js' to '").concat(overrideObj[key], "'"));
    result[key] = overrideObj[key];
    return result;
  }, bidObj);
}
function addBidResponseHook(next, adUnitCode, bid) {
  var overrides = this;

  if (bidderExcluded(overrides.bidders, bid.bidderCode)) {
    logWarn("bidder '".concat(bid.bidderCode, "' excluded from auction by bidder overrides"));
    return;
  }

  if (Array.isArray(overrides.bids)) {
    overrides.bids.forEach(function (overrideBid) {
      if (!bidExcluded(overrideBid, bid.bidderCode, adUnitCode)) {
        applyBidOverrides(overrideBid, bid, 'bidder');
      }
    });
  }

  next(adUnitCode, bid);
}
function addBidderRequestsHook(next, bidderRequests) {
  var overrides = this;
  var includedBidderRequests = bidderRequests.filter(function (bidderRequest) {
    if (bidderExcluded(overrides.bidders, bidderRequest.bidderCode)) {
      logWarn("bidRequest '".concat(bidderRequest.bidderCode, "' excluded from auction by bidder overrides"));
      return false;
    }

    return true;
  });

  if (Array.isArray(overrides.bidRequests)) {
    includedBidderRequests.forEach(function (bidderRequest) {
      overrides.bidRequests.forEach(function (overrideBid) {
        bidderRequest.bids.forEach(function (bid) {
          if (!bidExcluded(overrideBid, bidderRequest.bidderCode, bid.adUnitCode)) {
            applyBidOverrides(overrideBid, bid, 'bidRequest');
          }
        });
      });
    });
  }

  next(includedBidderRequests);
}
function getConfig(debugging) {
  if (!debugging.enabled) {
    disableOverrides();

    try {
      window.sessionStorage.removeItem(OVERRIDE_KEY);
    } catch (e) {}
  } else {
    try {
      window.sessionStorage.setItem(OVERRIDE_KEY, JSON.stringify(debugging));
    } catch (e) {}

    enableOverrides(debugging);
  }
}
__WEBPACK_IMPORTED_MODULE_0__config_js__["b" /* config */].getConfig('debugging', function (_ref) {
  var debugging = _ref.debugging;
  return getConfig(debugging);
});
function sessionLoader(storage) {
  var overrides;

  try {
    storage = storage || window.sessionStorage;
    overrides = JSON.parse(storage.getItem(OVERRIDE_KEY));
  } catch (e) {}

  if (overrides) {
    enableOverrides(overrides, true);
  }
}

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 24:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(42);
var global = __webpack_require__(22);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export newAuctionManager */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return auctionManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auction_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js__);
/**
 * AuctionManager modules is responsible for creating auction instances.
 * This module is the gateway for Prebid core to access auctions.
 * It stores all created instances of auction and can be used to get consolidated values from auction.
 */

/**
 * @typedef {Object} AuctionManager
 *
 * @property {function(): Array} getBidsRequested - returns consolidated bid requests
 * @property {function(): Array} getBidsReceived - returns consolidated bid received
 * @property {function(): Array} getAdUnits - returns consolidated adUnits
 * @property {function(): Array} getAdUnitCodes - returns consolidated adUnitCodes
 * @property {function(): Object} createAuction - creates auction instance and stores it for future reference
 * @property {function(): Object} findBidByAdId - find bid received by adId. This function will be called by $$PREBID_GLOBAL$$.renderAd
 * @property {function(): Object} getStandardBidderAdServerTargeting - returns standard bidder targeting for all the adapters. Refer http://prebid.org/dev-docs/publisher-api-reference.html#module_pbjs.bidderSettings for more details
 */




var CONSTANTS = __webpack_require__(5);
/**
 * Creates new instance of auctionManager. There will only be one instance of auctionManager but
 * a factory is created to assist in testing.
 *
 * @returns {AuctionManager} auctionManagerInstance
 */


function newAuctionManager() {
  var _auctions = [];
  var auctionManager = {};

  auctionManager.addWinningBid = function (bid) {
    var auction = __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default()(_auctions, function (auction) {
      return auction.getAuctionId() === bid.auctionId;
    });

    if (auction) {
      bid.status = CONSTANTS.BID_STATUS.RENDERED;
      auction.addWinningBid(bid);
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["logWarn"])("Auction not found when adding winning bid");
    }
  };

  auctionManager.getAllWinningBids = function () {
    return _auctions.map(function (auction) {
      return auction.getWinningBids();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils_js__["flatten"], []);
  };

  auctionManager.getBidsRequested = function () {
    return _auctions.map(function (auction) {
      return auction.getBidRequests();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils_js__["flatten"], []);
  };

  auctionManager.getNoBids = function () {
    return _auctions.map(function (auction) {
      return auction.getNoBids();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils_js__["flatten"], []);
  };

  auctionManager.getBidsReceived = function () {
    return _auctions.map(function (auction) {
      if (auction.getAuctionStatus() === __WEBPACK_IMPORTED_MODULE_1__auction_js__["a" /* AUCTION_COMPLETED */]) {
        return auction.getBidsReceived();
      }
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils_js__["flatten"], []).filter(function (bid) {
      return bid;
    });
  };

  auctionManager.getAdUnits = function () {
    return _auctions.map(function (auction) {
      return auction.getAdUnits();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils_js__["flatten"], []);
  };

  auctionManager.getAdUnitCodes = function () {
    return _auctions.map(function (auction) {
      return auction.getAdUnitCodes();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils_js__["flatten"], []).filter(__WEBPACK_IMPORTED_MODULE_0__utils_js__["uniques"]);
  };

  auctionManager.createAuction = function (_ref) {
    var adUnits = _ref.adUnits,
        adUnitCodes = _ref.adUnitCodes,
        callback = _ref.callback,
        cbTimeout = _ref.cbTimeout,
        labels = _ref.labels,
        auctionId = _ref.auctionId;
    var auction = Object(__WEBPACK_IMPORTED_MODULE_1__auction_js__["k" /* newAuction */])({
      adUnits: adUnits,
      adUnitCodes: adUnitCodes,
      callback: callback,
      cbTimeout: cbTimeout,
      labels: labels,
      auctionId: auctionId
    });

    _addAuction(auction);

    return auction;
  };

  auctionManager.findBidByAdId = function (adId) {
    return __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default()(_auctions.map(function (auction) {
      return auction.getBidsReceived();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils_js__["flatten"], []), function (bid) {
      return bid.adId === adId;
    });
  };

  auctionManager.getStandardBidderAdServerTargeting = function () {
    return Object(__WEBPACK_IMPORTED_MODULE_1__auction_js__["j" /* getStandardBidderSettings */])()[CONSTANTS.JSON_MAPPING.ADSERVER_TARGETING];
  };

  auctionManager.setStatusForBids = function (adId, status) {
    var bid = auctionManager.findBidByAdId(adId);
    if (bid) bid.status = status;

    if (bid && status === CONSTANTS.BID_STATUS.BID_TARGETING_SET) {
      var auction = __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default()(_auctions, function (auction) {
        return auction.getAuctionId() === bid.auctionId;
      });
      if (auction) auction.setBidTargeting(bid);
    }
  };

  auctionManager.getLastAuctionId = function () {
    return _auctions.length && _auctions[_auctions.length - 1].getAuctionId();
  };

  function _addAuction(auction) {
    _auctions.push(auction);
  }

  return auctionManager;
}
var auctionManager = newAuctionManager();

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(28);

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(27);
var definePropertyModule = __webpack_require__(31);
var createPropertyDescriptor = __webpack_require__(46);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RANDOM; });
/* unused harmony export newConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cpmBucketManager_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_set__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_js__ = __webpack_require__(0);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
 * Module for getting and setting Prebid configuration.
 */

/**
 * @typedef {Object} MediaTypePriceGranularity
 *
 * @property {(string|Object)} [banner]
 * @property {(string|Object)} [native]
 * @property {(string|Object)} [video]
 * @property {(string|Object)} [video-instream]
 * @property {(string|Object)} [video-outstream]
 */






var from = __webpack_require__(89);

var utils = __webpack_require__(0);

var CONSTANTS = __webpack_require__(5);

var DEFAULT_DEBUG = utils.getParameterByName(CONSTANTS.DEBUG_MODE).toUpperCase() === 'TRUE';
var DEFAULT_BIDDER_TIMEOUT = 3000;
var DEFAULT_PUBLISHER_DOMAIN = window.location.origin;
var DEFAULT_ENABLE_SEND_ALL_BIDS = true;
var DEFAULT_DISABLE_AJAX_TIMEOUT = false;
var DEFAULT_BID_CACHE = false;
var DEFAULT_DEVICE_ACCESS = true;
var DEFAULT_TIMEOUTBUFFER = 400;
var RANDOM = 'random';
var FIXED = 'fixed';
var VALID_ORDERS = {};
VALID_ORDERS[RANDOM] = true;
VALID_ORDERS[FIXED] = true;
var DEFAULT_BIDDER_SEQUENCE = RANDOM;
var GRANULARITY_OPTIONS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  AUTO: 'auto',
  DENSE: 'dense',
  CUSTOM: 'custom'
};
var ALL_TOPICS = '*';
/**
 * @typedef {object} PrebidConfig
 *
 * @property {string} cache.url Set a url if we should use prebid-cache to store video bids before adding
 *   bids to the auction. **NOTE** This must be set if you want to use the dfpAdServerVideo module.
 */

function newConfig() {
  var listeners = [];
  var defaults;
  var config;
  var bidderConfig;
  var currBidder = null;

  function resetConfig() {
    defaults = {};
    var newConfig = {
      // `debug` is equivalent to legacy `pbjs.logging` property
      _debug: DEFAULT_DEBUG,

      get debug() {
        return this._debug;
      },

      set debug(val) {
        this._debug = val;
      },

      // default timeout for all bids
      _bidderTimeout: DEFAULT_BIDDER_TIMEOUT,

      get bidderTimeout() {
        return this._bidderTimeout;
      },

      set bidderTimeout(val) {
        this._bidderTimeout = val;
      },

      // domain where prebid is running for cross domain iframe communication
      _publisherDomain: DEFAULT_PUBLISHER_DOMAIN,

      get publisherDomain() {
        return this._publisherDomain;
      },

      set publisherDomain(val) {
        this._publisherDomain = val;
      },

      // calls existing function which may be moved after deprecation
      _priceGranularity: GRANULARITY_OPTIONS.MEDIUM,

      set priceGranularity(val) {
        if (validatePriceGranularity(val)) {
          if (typeof val === 'string') {
            this._priceGranularity = hasGranularity(val) ? val : GRANULARITY_OPTIONS.MEDIUM;
          } else if (utils.isPlainObject(val)) {
            this._customPriceBucket = val;
            this._priceGranularity = GRANULARITY_OPTIONS.CUSTOM;
            utils.logMessage('Using custom price granularity');
          }
        }
      },

      get priceGranularity() {
        return this._priceGranularity;
      },

      _customPriceBucket: {},

      get customPriceBucket() {
        return this._customPriceBucket;
      },

      /**
       * mediaTypePriceGranularity
       * @type {MediaTypePriceGranularity}
       */
      _mediaTypePriceGranularity: {},

      get mediaTypePriceGranularity() {
        return this._mediaTypePriceGranularity;
      },

      set mediaTypePriceGranularity(val) {
        var _this = this;

        this._mediaTypePriceGranularity = Object.keys(val).reduce(function (aggregate, item) {
          if (validatePriceGranularity(val[item])) {
            if (typeof val === 'string') {
              aggregate[item] = hasGranularity(val[item]) ? val[item] : _this._priceGranularity;
            } else if (utils.isPlainObject(val)) {
              aggregate[item] = val[item];
              utils.logMessage("Using custom price granularity for ".concat(item));
            }
          } else {
            utils.logWarn("Invalid price granularity for media type: ".concat(item));
          }

          return aggregate;
        }, {});
      },

      _sendAllBids: DEFAULT_ENABLE_SEND_ALL_BIDS,

      get enableSendAllBids() {
        return this._sendAllBids;
      },

      set enableSendAllBids(val) {
        this._sendAllBids = val;
      },

      _useBidCache: DEFAULT_BID_CACHE,

      get useBidCache() {
        return this._useBidCache;
      },

      set useBidCache(val) {
        this._useBidCache = val;
      },

      /**
       * deviceAccess set to false will disable setCookie, getCookie, hasLocalStorage
       * @type {boolean}
       */
      _deviceAccess: DEFAULT_DEVICE_ACCESS,

      get deviceAccess() {
        return this._deviceAccess;
      },

      set deviceAccess(val) {
        this._deviceAccess = val;
      },

      _bidderSequence: DEFAULT_BIDDER_SEQUENCE,

      get bidderSequence() {
        return this._bidderSequence;
      },

      set bidderSequence(val) {
        if (VALID_ORDERS[val]) {
          this._bidderSequence = val;
        } else {
          utils.logWarn("Invalid order: ".concat(val, ". Bidder Sequence was not set."));
        }
      },

      // timeout buffer to adjust for bidder CDN latency
      _timeoutBuffer: DEFAULT_TIMEOUTBUFFER,

      get timeoutBuffer() {
        return this._timeoutBuffer;
      },

      set timeoutBuffer(val) {
        this._timeoutBuffer = val;
      },

      _disableAjaxTimeout: DEFAULT_DISABLE_AJAX_TIMEOUT,

      get disableAjaxTimeout() {
        return this._disableAjaxTimeout;
      },

      set disableAjaxTimeout(val) {
        this._disableAjaxTimeout = val;
      }

    };

    if (config) {
      callSubscribers(Object.keys(config).reduce(function (memo, topic) {
        if (config[topic] !== newConfig[topic]) {
          memo[topic] = newConfig[topic] || {};
        }

        return memo;
      }, {}));
    }

    config = newConfig;
    bidderConfig = {};

    function hasGranularity(val) {
      return __WEBPACK_IMPORTED_MODULE_1_core_js_pure_features_array_find_js___default()(Object.keys(GRANULARITY_OPTIONS), function (option) {
        return val === GRANULARITY_OPTIONS[option];
      });
    }

    function validatePriceGranularity(val) {
      if (!val) {
        utils.logError('Prebid Error: no value passed to `setPriceGranularity()`');
        return false;
      }

      if (typeof val === 'string') {
        if (!hasGranularity(val)) {
          utils.logWarn('Prebid Warning: setPriceGranularity was called with invalid setting, using `medium` as default.');
        }
      } else if (utils.isPlainObject(val)) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_0__cpmBucketManager_js__["b" /* isValidPriceConfig */])(val)) {
          utils.logError('Invalid custom price value passed to `setPriceGranularity()`');
          return false;
        }
      }

      return true;
    }
  }
  /**
   * Returns base config with bidder overrides (if there is currently a bidder)
   * @private
   */


  function _getConfig() {
    if (currBidder && bidderConfig && utils.isPlainObject(bidderConfig[currBidder])) {
      var currBidderConfig = bidderConfig[currBidder];
      var configTopicSet = new __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_set___default.a(Object.keys(config).concat(Object.keys(currBidderConfig)));
      return from(configTopicSet).reduce(function (memo, topic) {
        if (typeof currBidderConfig[topic] === 'undefined') {
          memo[topic] = config[topic];
        } else if (typeof config[topic] === 'undefined') {
          memo[topic] = currBidderConfig[topic];
        } else {
          if (utils.isPlainObject(currBidderConfig[topic])) {
            memo[topic] = Object(__WEBPACK_IMPORTED_MODULE_4__utils_js__["mergeDeep"])({}, config[topic], currBidderConfig[topic]);
          } else {
            memo[topic] = currBidderConfig[topic];
          }
        }

        return memo;
      }, {});
    }

    return _extends({}, config);
  }
  /*
   * Returns configuration object if called without parameters,
   * or single configuration property if given a string matching a configuration
   * property name.  Allows deep access e.g. getConfig('currency.adServerCurrency')
   *
   * If called with callback parameter, or a string and a callback parameter,
   * subscribes to configuration updates. See `subscribe` function for usage.
   */


  function getConfig() {
    if (arguments.length <= 1 && typeof (arguments.length <= 0 ? undefined : arguments[0]) !== 'function') {
      var option = arguments.length <= 0 ? undefined : arguments[0];
      return option ? utils.deepAccess(_getConfig(), option) : _getConfig();
    }

    return subscribe.apply(void 0, arguments);
  }
  /**
   * Internal API for modules (such as prebid-server) that might need access to all bidder config
   */


  function getBidderConfig() {
    return bidderConfig;
  }
  /*
   * Sets configuration given an object containing key-value pairs and calls
   * listeners that were added by the `subscribe` function
   */


  function setConfig(options) {
    if (!utils.isPlainObject(options)) {
      utils.logError('setConfig options must be an object');
      return;
    }

    var topics = Object.keys(options);
    var topicalConfig = {};
    topics.forEach(function (topic) {
      var option = options[topic];

      if (utils.isPlainObject(defaults[topic]) && utils.isPlainObject(option)) {
        option = _extends({}, defaults[topic], option);
      }

      topicalConfig[topic] = config[topic] = option;
    });
    callSubscribers(topicalConfig);
  }
  /**
   * Sets configuration defaults which setConfig values can be applied on top of
   * @param {object} options
   */


  function setDefaults(options) {
    if (!utils.isPlainObject(defaults)) {
      utils.logError('defaults must be an object');
      return;
    }

    _extends(defaults, options); // Add default values to config as well


    _extends(config, options);
  }
  /*
   * Adds a function to a set of listeners that are invoked whenever `setConfig`
   * is called. The subscribed function will be passed the options object that
   * was used in the `setConfig` call. Topics can be subscribed to to only get
   * updates when specific properties are updated by passing a topic string as
   * the first parameter.
   *
   * Returns an `unsubscribe` function for removing the subscriber from the
   * set of listeners
   *
   * Example use:
   * // subscribe to all configuration changes
   * subscribe((config) => console.log('config set:', config));
   *
   * // subscribe to only 'logging' changes
   * subscribe('logging', (config) => console.log('logging set:', config));
   *
   * // unsubscribe
   * const unsubscribe = subscribe(...);
   * unsubscribe(); // no longer listening
   */


  function subscribe(topic, listener) {
    var callback = listener;

    if (typeof topic !== 'string') {
      // first param should be callback function in this case,
      // meaning it gets called for any config change
      callback = topic;
      topic = ALL_TOPICS;
    }

    if (typeof callback !== 'function') {
      utils.logError('listener must be a function');
      return;
    }

    var nl = {
      topic: topic,
      callback: callback
    };
    listeners.push(nl); // save and call this function to remove the listener

    return function unsubscribe() {
      listeners.splice(listeners.indexOf(nl), 1);
    };
  }
  /*
   * Calls listeners that were added by the `subscribe` function
   */


  function callSubscribers(options) {
    var TOPICS = Object.keys(options); // call subscribers of a specific topic, passing only that configuration

    listeners.filter(function (listener) {
      return __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js___default()(TOPICS, listener.topic);
    }).forEach(function (listener) {
      listener.callback(_defineProperty({}, listener.topic, options[listener.topic]));
    }); // call subscribers that didn't give a topic, passing everything that was set

    listeners.filter(function (listener) {
      return listener.topic === ALL_TOPICS;
    }).forEach(function (listener) {
      return listener.callback(options);
    });
  }

  function setBidderConfig(config) {
    try {
      check(config);
      config.bidders.forEach(function (bidder) {
        if (!bidderConfig[bidder]) {
          bidderConfig[bidder] = {};
        }

        Object.keys(config.config).forEach(function (topic) {
          var option = config.config[topic];

          if (utils.isPlainObject(option)) {
            bidderConfig[bidder][topic] = _extends({}, bidderConfig[bidder][topic] || {}, option);
          } else {
            bidderConfig[bidder][topic] = option;
          }
        });
      });
    } catch (e) {
      utils.logError(e);
    }

    function check(obj) {
      if (!utils.isPlainObject(obj)) {
        throw 'setBidderConfig bidder options must be an object';
      }

      if (!(Array.isArray(obj.bidders) && obj.bidders.length)) {
        throw 'setBidderConfig bidder options must contain a bidders list with at least 1 bidder';
      }

      if (!utils.isPlainObject(obj.config)) {
        throw 'setBidderConfig bidder options must contain a config object';
      }
    }
  }
  /**
   * Internal functions for core to execute some synchronous code while having an active bidder set.
   */


  function runWithBidder(bidder, fn) {
    currBidder = bidder;

    try {
      return fn();
    } finally {
      currBidder = null;
    }
  }

  function callbackWithBidder(bidder) {
    return function (cb) {
      return function () {
        if (typeof cb === 'function') {
          var _utils$bind;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return runWithBidder(bidder, (_utils$bind = utils.bind).call.apply(_utils$bind, [cb, this].concat(args)));
        } else {
          utils.logWarn('config.callbackWithBidder callback is not a function');
        }
      };
    };
  }

  function getCurrentBidder() {
    return currBidder;
  }

  resetConfig();
  return {
    getCurrentBidder: getCurrentBidder,
    getConfig: getConfig,
    setConfig: setConfig,
    setDefaults: setDefaults,
    resetConfig: resetConfig,
    runWithBidder: runWithBidder,
    callbackWithBidder: callbackWithBidder,
    setBidderConfig: setBidderConfig,
    getBidderConfig: getBidderConfig
  };
}
var config = newConfig();

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export detectReferer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getRefererInfo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * The referer detection module attempts to gather referer information from the current page that prebid.js resides in.
 * The information that it tries to collect includes:
 * The detected top url in the nav bar,
 * Whether it was able to reach the top most window (if for example it was embedded in several iframes),
 * The number of iframes it was embedded in if applicable,
 * A list of the domains of each embedded window if applicable.
 * Canonical URL which refers to an HTML link element, with the attribute of rel="canonical", found in the <head> element of your webpage
 */

function detectReferer(win) {
  /**
   * Returns number of frames to reach top from current frame where prebid.js sits
   * @returns {Array} levels
   */
  function getLevels() {
    var levels = walkUpWindows();
    var ancestors = getAncestorOrigins();

    if (ancestors) {
      for (var i = 0, l = ancestors.length; i < l; i++) {
        levels[i].ancestor = ancestors[i];
      }
    }

    return levels;
  }
  /**
   * This function would return a read-only array of hostnames for all the parent frames.
   * win.location.ancestorOrigins is only supported in webkit browsers. For non-webkit browsers it will return undefined.
   * @returns {(undefined|Array)} Ancestor origins or undefined
   */


  function getAncestorOrigins() {
    try {
      if (!win.location.ancestorOrigins) {
        return;
      }

      return win.location.ancestorOrigins;
    } catch (e) {// Ignore error
    }
  }
  /**
   * This function would try to get referer and urls for all parent frames in case of win.location.ancestorOrigins undefined.
   * @param {Array} levels
   * @returns {Object} urls for all parent frames and top most detected referer url
   */


  function getPubUrlStack(levels) {
    var stack = [];
    var defUrl = null;
    var frameLocation = null;
    var prevFrame = null;
    var prevRef = null;
    var ancestor = null;
    var detectedRefererUrl = null;
    var i;

    for (i = levels.length - 1; i >= 0; i--) {
      try {
        frameLocation = levels[i].location;
      } catch (e) {// Ignore error
      }

      if (frameLocation) {
        stack.push(frameLocation);

        if (!detectedRefererUrl) {
          detectedRefererUrl = frameLocation;
        }
      } else if (i !== 0) {
        prevFrame = levels[i - 1];

        try {
          prevRef = prevFrame.referrer;
          ancestor = prevFrame.ancestor;
        } catch (e) {// Ignore error
        }

        if (prevRef) {
          stack.push(prevRef);

          if (!detectedRefererUrl) {
            detectedRefererUrl = prevRef;
          }
        } else if (ancestor) {
          stack.push(ancestor);

          if (!detectedRefererUrl) {
            detectedRefererUrl = ancestor;
          }
        } else {
          stack.push(defUrl);
        }
      } else {
        stack.push(defUrl);
      }
    }

    return {
      stack: stack,
      detectedRefererUrl: detectedRefererUrl
    };
  }
  /**
   * This function returns canonical URL which refers to an HTML link element, with the attribute of rel="canonical", found in the <head> element of your webpage
   * @param {Object} doc document
   */


  function getCanonicalUrl(doc) {
    try {
      var element = doc.querySelector("link[rel='canonical']");

      if (element !== null) {
        return element.href;
      }
    } catch (e) {}

    return null;
  }
  /**
   * Walk up to the top of the window to detect origin, number of iframes, ancestor origins and canonical url
   */


  function walkUpWindows() {
    var acc = [];
    var currentWindow;

    do {
      try {
        currentWindow = currentWindow ? currentWindow.parent : win;

        try {
          var isTop = currentWindow == win.top;
          var refData = {
            referrer: currentWindow.document.referrer || null,
            location: currentWindow.location.href || null,
            isTop: isTop
          };

          if (isTop) {
            refData = _extends(refData, {
              canonicalUrl: getCanonicalUrl(currentWindow.document)
            });
          }

          acc.push(refData);
        } catch (e) {
          acc.push({
            referrer: null,
            location: null,
            isTop: currentWindow == win.top
          });
          Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["logWarn"])('Trying to access cross domain iframe. Continuing without referrer and location');
        }
      } catch (e) {
        acc.push({
          referrer: null,
          location: null,
          isTop: false
        });
        return acc;
      }
    } while (currentWindow != win.top);

    return acc;
  }
  /**
   * Referer info
   * @typedef {Object} refererInfo
   * @property {string} referer detected top url
   * @property {boolean} reachedTop whether prebid was able to walk upto top window or not
   * @property {number} numIframes number of iframes
   * @property {string} stack comma separated urls of all origins
   * @property {string} canonicalUrl canonical URL refers to an HTML link element, with the attribute of rel="canonical", found in the <head> element of your webpage
   */

  /**
   * Get referer info
   * @returns {refererInfo}
   */


  function refererInfo() {
    try {
      var levels = getLevels();
      var numIframes = levels.length - 1;
      var reachedTop = levels[numIframes].location !== null || numIframes > 0 && levels[numIframes - 1].referrer !== null;
      var stackInfo = getPubUrlStack(levels);
      var canonicalUrl;

      if (levels[levels.length - 1].canonicalUrl) {
        canonicalUrl = levels[levels.length - 1].canonicalUrl;
      }

      return {
        referer: stackInfo.detectedRefererUrl,
        reachedTop: reachedTop,
        numIframes: numIframes,
        stack: stackInfo.stack,
        canonicalUrl: canonicalUrl
      };
    } catch (e) {// Ignore error
    }
  }

  return refererInfo;
}
var getRefererInfo = detectReferer(window);

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(27);
var IE8_DOM_DEFINE = __webpack_require__(71);
var anObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(55);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createBid;
var utils = __webpack_require__(0);
/**
 Required paramaters
 bidderCode,
 height,
 width,
 statusCode
 Optional paramaters
 adId,
 cpm,
 ad,
 adUrl,
 dealId,
 priceKeyString;
 */


function Bid(statusCode, bidRequest) {
  var _bidSrc = bidRequest && bidRequest.src || 'client';

  var _statusCode = statusCode || 0;

  this.bidderCode = bidRequest && bidRequest.bidder || '';
  this.width = 0;
  this.height = 0;
  this.statusMessage = _getStatus();
  this.adId = utils.getUniqueIdentifierStr();
  this.requestId = bidRequest && bidRequest.bidId;
  this.mediaType = 'banner';
  this.source = _bidSrc;

  function _getStatus() {
    switch (_statusCode) {
      case 0:
        return 'Pending';

      case 1:
        return 'Bid available';

      case 2:
        return 'Bid returned empty or error response';

      case 3:
        return 'Bid timed out';
    }
  }

  this.getStatusCode = function () {
    return _statusCode;
  }; // returns the size of the bid creative. Concatenation of width and height by ‘x’.


  this.getSize = function () {
    return this.width + 'x' + this.height;
  };
} // Bid factory function.


function createBid(statusCode, bidRequest) {
  return new Bid(statusCode, bidRequest);
}

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(340);

module.exports = parent;


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(16);
var getIterator = __webpack_require__(88);

module.exports = IS_PURE ? getIterator : function (it) {
  // eslint-disable-next-line no-undef
  return Set.prototype.values.call(it);
};


/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(341);
var entryUnbind = __webpack_require__(52);

module.exports = entryUnbind('String', 'includes');


/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var notARegExp = __webpack_require__(342);
var requireObjectCoercible = __webpack_require__(49);
var correctIsRegExpLogic = __webpack_require__(344);

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__(343);

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);
var classof = __webpack_require__(48);
var wellKnownSymbol = __webpack_require__(19);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(19);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return nativeAdapters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NATIVE_TARGETING_KEYS; });
/* harmony export (immutable) */ __webpack_exports__["g"] = processNativeAdUnitParams;
/* unused harmony export nativeAdUnit */
/* unused harmony export nativeBidder */
/* unused harmony export hasNonNativeBidder */
/* harmony export (immutable) */ __webpack_exports__["f"] = nativeBidIsValid;
/* harmony export (immutable) */ __webpack_exports__["b"] = fireNativeTrackers;
/* harmony export (immutable) */ __webpack_exports__["d"] = getNativeTargeting;
/* harmony export (immutable) */ __webpack_exports__["c"] = getAssetMessage;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_pure_features_array_includes_js__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var CONSTANTS = __webpack_require__(5);

var nativeAdapters = [];
var NATIVE_TARGETING_KEYS = Object.keys(CONSTANTS.NATIVE_KEYS).map(function (key) {
  return CONSTANTS.NATIVE_KEYS[key];
});
var IMAGE = {
  image: {
    required: true
  },
  title: {
    required: true
  },
  sponsoredBy: {
    required: true
  },
  clickUrl: {
    required: true
  },
  body: {
    required: false
  },
  icon: {
    required: false
  }
};
var SUPPORTED_TYPES = {
  image: IMAGE
};
/**
 * Recieves nativeParams from an adUnit. If the params were not of type 'type',
 * passes them on directly. If they were of type 'type', translate
 * them into the predefined specific asset requests for that type of native ad.
 */

function processNativeAdUnitParams(params) {
  if (params && params.type && typeIsSupported(params.type)) {
    return SUPPORTED_TYPES[params.type];
  }

  return params;
}
/**
 * Check if the native type specified in the adUnit is supported by Prebid.
 */

function typeIsSupported(type) {
  if (!(type && __WEBPACK_IMPORTED_MODULE_1_core_js_pure_features_array_includes_js___default()(Object.keys(SUPPORTED_TYPES), type))) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["logError"])("".concat(type, " nativeParam is not supported"));
    return false;
  }

  return true;
}
/**
 * Helper functions for working with native-enabled adUnits
 * TODO: abstract this and the video helper functions into general
 * adunit validation helper functions
 */


var nativeAdUnit = function nativeAdUnit(adUnit) {
  var mediaType = adUnit.mediaType === 'native';
  var mediaTypes = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(adUnit, 'mediaTypes.native');
  return mediaType || mediaTypes;
};
var nativeBidder = function nativeBidder(bid) {
  return __WEBPACK_IMPORTED_MODULE_1_core_js_pure_features_array_includes_js___default()(nativeAdapters, bid.bidder);
};
var hasNonNativeBidder = function hasNonNativeBidder(adUnit) {
  return adUnit.bids.filter(function (bid) {
    return !nativeBidder(bid);
  }).length;
};
/**
 * Validate that the native assets on this bid contain all assets that were
 * marked as required in the adUnit configuration.
 * @param {Bid} bid Native bid to validate
 * @param {BidRequest[]} bidRequests All bid requests for an auction
 * @return {Boolean} If object is valid
 */

function nativeBidIsValid(bid, bidRequests) {
  var bidRequest = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["getBidRequest"])(bid.requestId, bidRequests);

  if (!bidRequest) {
    return false;
  } // all native bid responses must define a landing page url


  if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(bid, 'native.clickUrl')) {
    return false;
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(bid, 'native.image')) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(bid, 'native.image.height') || !Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(bid, 'native.image.width')) {
      return false;
    }
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(bid, 'native.icon')) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(bid, 'native.icon.height') || !Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(bid, 'native.icon.width')) {
      return false;
    }
  }

  var requestedAssets = bidRequest.nativeParams;

  if (!requestedAssets) {
    return true;
  }

  var requiredAssets = Object.keys(requestedAssets).filter(function (key) {
    return requestedAssets[key].required;
  });
  var returnedAssets = Object.keys(bid['native']).filter(function (key) {
    return bid['native'][key];
  });
  return requiredAssets.every(function (asset) {
    return __WEBPACK_IMPORTED_MODULE_1_core_js_pure_features_array_includes_js___default()(returnedAssets, asset);
  });
}
/*
 * Native responses may have associated impression or click trackers.
 * This retrieves the appropriate tracker urls for the given ad object and
 * fires them. As a native creatives may be in a cross-origin frame, it may be
 * necessary to invoke this function via postMessage. secureCreatives is
 * configured to fire this function when it receives a `message` of 'Prebid Native'
 * and an `adId` with the value of the `bid.adId`. When a message is posted with
 * these parameters, impression trackers are fired. To fire click trackers, the
 * message should contain an `action` set to 'click'.
 *
 * // Native creative template example usage
 * <a href="%%CLICK_URL_UNESC%%%%PATTERN:hb_native_linkurl%%"
 *    target="_blank"
 *    onclick="fireTrackers('click')">
 *    %%PATTERN:hb_native_title%%
 * </a>
 *
 * <script>
 *   function fireTrackers(action) {
 *     var message = {message: 'Prebid Native', adId: '%%PATTERN:hb_adid%%'};
 *     if (action === 'click') {message.action = 'click';} // fires click trackers
 *     window.parent.postMessage(JSON.stringify(message), '*');
 *   }
 *   fireTrackers(); // fires impressions when creative is loaded
 * </script>
 */

function fireNativeTrackers(message, adObject) {
  var trackers;

  if (message.action === 'click') {
    trackers = adObject['native'] && adObject['native'].clickTrackers;
  } else {
    trackers = adObject['native'] && adObject['native'].impressionTrackers;

    if (adObject['native'] && adObject['native'].javascriptTrackers) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["insertHtmlIntoIframe"])(adObject['native'].javascriptTrackers);
    }
  }

  (trackers || []).forEach(__WEBPACK_IMPORTED_MODULE_0__utils_js__["triggerPixel"]);
  return message.action;
}
/**
 * Gets native targeting key-value pairs
 * @param {Object} bid
 * @return {Object} targeting
 */

function getNativeTargeting(bid, bidReq) {
  var keyValues = {};
  Object.keys(bid['native']).forEach(function (asset) {
    var key = CONSTANTS.NATIVE_KEYS[asset];
    var value = getAssetValue(bid['native'][asset]);
    var sendPlaceholder = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(bidReq, "mediaTypes.native.".concat(asset, ".sendId"));

    if (sendPlaceholder) {
      var placeholder = "".concat(key, ":").concat(bid.adId);
      value = placeholder;
    }

    if (key && value) {
      keyValues[key] = value;
    }
  });
  return keyValues;
}
/**
 * Constructs a message object containing asset values for each of the
 * requested data keys.
 */

function getAssetMessage(data, adObject) {
  var message = {
    message: 'assetResponse',
    adId: data.adId,
    assets: []
  };
  data.assets.forEach(function (asset) {
    var key = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["getKeyByValue"])(CONSTANTS.NATIVE_KEYS, asset);
    var value = getAssetValue(adObject.native[key]);
    message.assets.push({
      key: key,
      value: value
    });
  });
  return message;
}
/**
 * Native assets can be a string or an object with a url prop. Returns the value
 * appropriate for sending in adserver targeting or placeholder replacement.
 */

function getAssetValue(value) {
  if (_typeof(value) === 'object' && value.url) {
    return value.url;
  }

  return value;
}

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OUTSTREAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INSTREAM; });
/* unused harmony export videoAdUnit */
/* unused harmony export videoBidder */
/* unused harmony export hasNonVideoBidder */
/* harmony export (immutable) */ __webpack_exports__["d"] = isValidVideoBid;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return checkVideoBidSetup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hook_js__ = __webpack_require__(13);





var VIDEO_MEDIA_TYPE = 'video';
var OUTSTREAM = 'outstream';
var INSTREAM = 'instream';
/**
 * Helper functions for working with video-enabled adUnits
 */

var videoAdUnit = function videoAdUnit(adUnit) {
  var mediaType = adUnit.mediaType === VIDEO_MEDIA_TYPE;
  var mediaTypes = Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["deepAccess"])(adUnit, 'mediaTypes.video');
  return mediaType || mediaTypes;
};
var videoBidder = function videoBidder(bid) {
  return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(__WEBPACK_IMPORTED_MODULE_0__adapterManager_js__["default"].videoAdapters, bid.bidder);
};
var hasNonVideoBidder = function hasNonVideoBidder(adUnit) {
  return adUnit.bids.filter(function (bid) {
    return !videoBidder(bid);
  }).length;
};
/**
 * @typedef {object} VideoBid
 * @property {string} adId id of the bid
 */

/**
 * Validate that the assets required for video context are present on the bid
 * @param {VideoBid} bid Video bid to validate
 * @param {BidRequest[]} bidRequests All bid requests for an auction
 * @return {Boolean} If object is valid
 */

function isValidVideoBid(bid, bidRequests) {
  var bidRequest = Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["getBidRequest"])(bid.requestId, bidRequests);
  var videoMediaType = bidRequest && Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["deepAccess"])(bidRequest, 'mediaTypes.video');
  var context = videoMediaType && Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["deepAccess"])(videoMediaType, 'context'); // if context not defined assume default 'instream' for video bids
  // instream bids require a vast url or vast xml content

  return checkVideoBidSetup(bid, bidRequest, videoMediaType, context);
}
var checkVideoBidSetup = Object(__WEBPACK_IMPORTED_MODULE_4__hook_js__["b" /* hook */])('sync', function (bid, bidRequest, videoMediaType, context) {
  if (!bidRequest || videoMediaType && context !== OUTSTREAM) {
    // xml-only video bids require a prebid cache url
    if (!__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('cache.url') && bid.vastXml && !bid.vastUrl) {
      Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["logError"])("\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling prebid cache with pbjs.setConfig({ cache: {url: \"...\"} });\n      ");
      return false;
    }

    return !!(bid.vastUrl || bid.vastXml);
  } // outstream bids require a renderer on the bid or pub-defined on adunit


  if (context === OUTSTREAM) {
    return !!(bid.renderer || bidRequest.renderer);
  }

  return true;
}, 'checkVideoBidSetup');

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(18);
var wellKnownSymbol = __webpack_require__(19);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadExternalScript;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(0);


var _requestCache = {}; // The below list contains modules or vendors whom Prebid allows to load external JS.

var _approvedLoadExternalJSList = ['criteo', 'outstream', 'adagio', 'browsi'];
/**
 * Loads external javascript. Can only be used if external JS is approved by Prebid. See https://github.com/prebid/prebid-js-external-js-template#policy
 * Each unique URL will be loaded at most 1 time.
 * @param {string} url the url to load
 * @param {string} moduleCode bidderCode or module code of the module requesting this resource
 * @param {function} [callback] callback function to be called after the script is loaded.
 */

function loadExternalScript(url, moduleCode, callback) {
  if (!moduleCode || !url) {
    __WEBPACK_IMPORTED_MODULE_1__utils_js__["logError"]('cannot load external script without url and moduleCode');
    return;
  }

  if (!__WEBPACK_IMPORTED_MODULE_0_core_js_pure_features_array_includes_js___default()(_approvedLoadExternalJSList, moduleCode)) {
    __WEBPACK_IMPORTED_MODULE_1__utils_js__["logError"]("".concat(moduleCode, " not whitelisted for loading external JavaScript"));
    return;
  } // only load each asset once


  if (_requestCache[url]) {
    if (callback && typeof callback === 'function') {
      if (_requestCache[url].loaded) {
        // invokeCallbacks immediately
        callback();
      } else {
        // queue the callback
        _requestCache[url].callbacks.push(callback);
      }
    }

    return _requestCache[url].tag;
  }

  _requestCache[url] = {
    loaded: false,
    tag: null,
    callbacks: []
  };

  if (callback && typeof callback === 'function') {
    _requestCache[url].callbacks.push(callback);
  }

  __WEBPACK_IMPORTED_MODULE_1__utils_js__["logWarn"]("module ".concat(moduleCode, " is loading external JavaScript"));
  return requestResource(url, function () {
    _requestCache[url].loaded = true;

    try {
      for (var i = 0; i < _requestCache[url].callbacks.length; i++) {
        _requestCache[url].callbacks[i]();
      }
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_1__utils_js__["logError"]('Error executing callback', 'adloader.js:loadExternalScript', e);
    }
  });

  function requestResource(tagSrc, callback) {
    var jptScript = document.createElement('script');
    jptScript.type = 'text/javascript';
    jptScript.async = true;
    _requestCache[url].tag = jptScript;

    if (jptScript.readyState) {
      jptScript.onreadystatechange = function () {
        if (jptScript.readyState === 'loaded' || jptScript.readyState === 'complete') {
          jptScript.onreadystatechange = null;
          callback();
        }
      };
    } else {
      jptScript.onload = function () {
        callback();
      };
    }

    jptScript.src = tagSrc; // add the new script tag to the page

    __WEBPACK_IMPORTED_MODULE_1__utils_js__["insertElement"](jptScript);
    return jptScript;
  }
}
;

/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ajax; });
/* harmony export (immutable) */ __webpack_exports__["b"] = ajaxBuilder;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(3);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var utils = __webpack_require__(0);

var XHR_DONE = 4;
/**
 * Simple IE9+ and cross-browser ajax request function
 * Note: x-domain requests in IE9 do not support the use of cookies
 *
 * @param url string url
 * @param callback {object | function} callback
 * @param data mixed data
 * @param options object
 */

var ajax = ajaxBuilder();
function ajaxBuilder() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      request = _ref.request,
      done = _ref.done;

  return function (url, callback, data) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    try {
      var x;
      var method = options.method || (data ? 'POST' : 'GET');
      var parser = document.createElement('a');
      parser.href = url;
      var callbacks = _typeof(callback) === 'object' && callback !== null ? callback : {
        success: function success() {
          utils.logMessage('xhr success');
        },
        error: function error(e) {
          utils.logError('xhr error', null, e);
        }
      };

      if (typeof callback === 'function') {
        callbacks.success = callback;
      }

      x = new window.XMLHttpRequest();

      x.onreadystatechange = function () {
        if (x.readyState === XHR_DONE) {
          if (typeof done === 'function') {
            done(parser.origin);
          }

          var status = x.status;

          if (status >= 200 && status < 300 || status === 304) {
            callbacks.success(x.responseText, x);
          } else {
            callbacks.error(x.statusText, x);
          }
        }
      }; // Disabled timeout temporarily to avoid xhr failed requests. https://github.com/prebid/Prebid.js/issues/2648


      if (!__WEBPACK_IMPORTED_MODULE_0__config_js__["b" /* config */].getConfig('disableAjaxTimeout')) {
        x.ontimeout = function () {
          utils.logError('  xhr timeout after ', x.timeout, 'ms');
        };
      }

      if (method === 'GET' && data) {
        var urlInfo = utils.parseUrl(url, options);

        _extends(urlInfo.search, data);

        url = utils.buildUrl(urlInfo);
      }

      x.open(method, url, true); // IE needs timoeut to be set after open - see #1410
      // Disabled timeout temporarily to avoid xhr failed requests. https://github.com/prebid/Prebid.js/issues/2648

      if (!__WEBPACK_IMPORTED_MODULE_0__config_js__["b" /* config */].getConfig('disableAjaxTimeout')) {
        x.timeout = timeout;
      }

      if (options.withCredentials) {
        x.withCredentials = true;
      }

      utils._each(options.customHeaders, function (value, header) {
        x.setRequestHeader(header, value);
      });

      if (options.preflight) {
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      }

      x.setRequestHeader('Content-Type', options.contentType || 'text/plain');

      if (typeof request === 'function') {
        request(parser.origin);
      }

      if (method === 'POST' && data) {
        x.send(data);
      } else {
        x.send();
      }
    } catch (error) {
      utils.logError('xhr construction', error);
    }
  };
}

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AUCTION_STARTED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AUCTION_IN_PROGRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUCTION_COMPLETED; });
/* harmony export (immutable) */ __webpack_exports__["k"] = newAuction;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addBidResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return addBidderRequests; });
/* unused harmony export bidsBackCallback */
/* unused harmony export auctionCallbacks */
/* harmony export (immutable) */ __webpack_exports__["g"] = doCallbacksIfTimedout;
/* harmony export (immutable) */ __webpack_exports__["d"] = addBidToAuction;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return callPrebidCache; });
/* unused harmony export getMediaTypeGranularity */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getPriceGranularity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getPriceByGranularity; });
/* harmony export (immutable) */ __webpack_exports__["j"] = getStandardBidderSettings;
/* unused harmony export getKeyValueTargetingPairs */
/* unused harmony export adjustBids */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cpmBucketManager_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__native_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__videoCache_js__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__userSync_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__video_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mediaTypes_js__ = __webpack_require__(2);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Module for auction instances.
 *
 * In Prebid 0.x, $$PREBID_GLOBAL$$ had _bidsRequested and _bidsReceived as public properties.
 * Starting 1.0, Prebid will support concurrent auctions. Each auction instance will store private properties, bidsRequested and bidsReceived.
 *
 * AuctionManager will create instance of auction and will store all the auctions.
 *
 */

/**
  * @typedef {Object} AdUnit An object containing the adUnit configuration.
  *
  * @property {string} code A code which will be used to uniquely identify this bidder. This should be the same
  *   one as is used in the call to registerBidAdapter
  * @property {Array.<size>} sizes A list of size for adUnit.
  * @property {object} params Any bidder-specific params which the publisher used in their bid request.
  *   This is guaranteed to have passed the spec.areParamsValid() test.
  */

/**
 * @typedef {Array.<number>} size
 */

/**
 * @typedef {Array.<string>} AdUnitCode
 */

/**
 * @typedef {Object} BidderRequest
 *
 * @property {string} bidderCode - adUnit bidder
 * @property {number} auctionId - random UUID
 * @property {string} bidderRequestId - random string, unique key set on all bidRequest.bids[]
 * @property {Array.<Bid>} bids
 * @property {number} auctionStart - Date.now() at auction start
 * @property {number} timeout - callback timeout
 * @property {refererInfo} refererInfo - referer info object
 * @property {string} [tid] - random UUID (used for s2s)
 * @property {string} [src] - s2s or client (used for s2s)
 */

/**
 * @typedef {Object} BidReceived
 * //TODO add all properties
 */

/**
 * @typedef {Object} Auction
 *
 * @property {function(): string} getAuctionStatus - returns the auction status which can be any one of 'started', 'in progress' or 'completed'
 * @property {function(): AdUnit[]} getAdUnits - return the adUnits for this auction instance
 * @property {function(): AdUnitCode[]} getAdUnitCodes - return the adUnitCodes for this auction instance
 * @property {function(): BidRequest[]} getBidRequests - get all bid requests for this auction instance
 * @property {function(): BidReceived[]} getBidsReceived - get all bid received for this auction instance
 * @property {function(): void} startAuctionTimer - sets the bidsBackHandler callback and starts the timer for auction
 * @property {function(): void} callBids - sends requests to all adapters for bids
 */











var syncUsers = __WEBPACK_IMPORTED_MODULE_6__userSync_js__["a" /* userSync */].syncUsers;

var utils = __webpack_require__(0);

var adapterManager = __webpack_require__(7).default;

var events = __webpack_require__(8);

var CONSTANTS = __webpack_require__(5);

var AUCTION_STARTED = 'started';
var AUCTION_IN_PROGRESS = 'inProgress';
var AUCTION_COMPLETED = 'completed'; // register event for bid adjustment

events.on(CONSTANTS.EVENTS.BID_ADJUSTMENT, function (bid) {
  adjustBids(bid);
});
var MAX_REQUESTS_PER_ORIGIN = 4;
var outstandingRequests = {};
var sourceInfo = {};
var queuedCalls = [];
/**
  * Creates new auction instance
  *
  * @param {Object} requestConfig
  * @param {AdUnit} requestConfig.adUnits
  * @param {AdUnitCode} requestConfig.adUnitCodes
  * @param {function():void} requestConfig.callback
  * @param {number} requestConfig.cbTimeout
  * @param {Array.<string>} requestConfig.labels
  * @param {string} requestConfig.auctionId
  *
  * @returns {Auction} auction instance
  */

function newAuction(_ref) {
  var adUnits = _ref.adUnits,
      adUnitCodes = _ref.adUnitCodes,
      callback = _ref.callback,
      cbTimeout = _ref.cbTimeout,
      labels = _ref.labels,
      auctionId = _ref.auctionId;
  var _adUnits = adUnits;
  var _labels = labels;
  var _adUnitCodes = adUnitCodes;
  var _bidderRequests = [];
  var _bidsReceived = [];
  var _noBids = [];

  var _auctionStart;

  var _auctionEnd;

  var _auctionId = auctionId || utils.generateUUID();

  var _auctionStatus;

  var _callback = callback;

  var _timer;

  var _timeout = cbTimeout;
  var _winningBids = [];

  var _timelyBidders = new Set();

  function addBidRequests(bidderRequests) {
    _bidderRequests = _bidderRequests.concat(bidderRequests);
  }

  function addBidReceived(bidsReceived) {
    _bidsReceived = _bidsReceived.concat(bidsReceived);
  }

  function addNoBid(noBid) {
    _noBids = _noBids.concat(noBid);
  }

  function getProperties() {
    return {
      auctionId: _auctionId,
      timestamp: _auctionStart,
      auctionEnd: _auctionEnd,
      auctionStatus: _auctionStatus,
      adUnits: _adUnits,
      adUnitCodes: _adUnitCodes,
      labels: _labels,
      bidderRequests: _bidderRequests,
      noBids: _noBids,
      bidsReceived: _bidsReceived,
      winningBids: _winningBids,
      timeout: _timeout
    };
  }

  function startAuctionTimer() {
    var timedOut = true;
    var timeoutCallback = executeCallback.bind(null, timedOut);
    var timer = setTimeout(timeoutCallback, _timeout);
    _timer = timer;
  }

  function executeCallback(timedOut, cleartimer) {
    // clear timer when done calls executeCallback
    if (cleartimer) {
      clearTimeout(_timer);
    }

    if (_auctionEnd === undefined) {
      var timedOutBidders = [];

      if (timedOut) {
        utils.logMessage("Auction ".concat(_auctionId, " timedOut"));
        timedOutBidders = getTimedOutBids(_bidderRequests, _timelyBidders);

        if (timedOutBidders.length) {
          events.emit(CONSTANTS.EVENTS.BID_TIMEOUT, timedOutBidders);
        }
      }

      _auctionStatus = AUCTION_COMPLETED;
      _auctionEnd = Date.now();
      events.emit(CONSTANTS.EVENTS.AUCTION_END, getProperties());
      bidsBackCallback(_adUnits, function () {
        try {
          if (_callback != null) {
            var _adUnitCodes2 = _adUnitCodes;

            var bids = _bidsReceived.filter(utils.bind.call(__WEBPACK_IMPORTED_MODULE_0__utils_js__["adUnitsFilter"], this, _adUnitCodes2)).reduce(groupByPlacement, {});

            _callback.apply(pbjs, [bids, timedOut, _auctionId]);

            _callback = null;
          }
        } catch (e) {
          utils.logError('Error executing bidsBackHandler', null, e);
        } finally {
          // Calling timed out bidders
          if (timedOutBidders.length) {
            adapterManager.callTimedOutBidders(adUnits, timedOutBidders, _timeout);
          } // Only automatically sync if the publisher has not chosen to "enableOverride"


          var userSyncConfig = __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('userSync') || {};

          if (!userSyncConfig.enableOverride) {
            // Delay the auto sync by the config delay
            syncUsers(userSyncConfig.syncDelay);
          }
        }
      });
    }
  }

  function auctionDone() {
    // when all bidders have called done callback atleast once it means auction is complete
    utils.logInfo("Bids Received for Auction with id: ".concat(_auctionId), _bidsReceived);
    _auctionStatus = AUCTION_COMPLETED;
    executeCallback(false, true);
  }

  function onTimelyResponse(bidderCode) {
    _timelyBidders.add(bidderCode);
  }

  function callBids() {
    _auctionStatus = AUCTION_STARTED;
    _auctionStart = Date.now();
    var bidRequests = adapterManager.makeBidRequests(_adUnits, _auctionStart, _auctionId, _timeout, _labels);
    utils.logInfo("Bids Requested for Auction with id: ".concat(_auctionId), bidRequests);

    if (bidRequests.length < 1) {
      utils.logWarn('No valid bid requests returned for auction');
      auctionDone();
    } else {
      addBidderRequests.call({
        dispatch: addBidderRequestsCallback,
        context: this
      }, bidRequests);
    }
  }
  /**
   * callback executed after addBidderRequests completes
   * @param {BidRequest[]} bidRequests
   */


  function addBidderRequestsCallback(bidRequests) {
    var _this = this;

    bidRequests.forEach(function (bidRequest) {
      addBidRequests(bidRequest);
    });
    var requests = {};
    var call = {
      bidRequests: bidRequests,
      run: function run() {
        startAuctionTimer();
        _auctionStatus = AUCTION_IN_PROGRESS;
        events.emit(CONSTANTS.EVENTS.AUCTION_INIT, getProperties());
        var callbacks = auctionCallbacks(auctionDone, _this);
        adapterManager.callBids(_adUnits, bidRequests, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          addBidResponse.apply({
            dispatch: callbacks.addBidResponse,
            bidderRequest: this
          }, args);
        }, callbacks.adapterDone, {
          request: function request(source, origin) {
            increment(outstandingRequests, origin);
            increment(requests, source);

            if (!sourceInfo[source]) {
              sourceInfo[source] = {
                SRA: true,
                origin: origin
              };
            }

            if (requests[source] > 1) {
              sourceInfo[source].SRA = false;
            }
          },
          done: function done(origin) {
            outstandingRequests[origin]--;

            if (queuedCalls[0]) {
              if (runIfOriginHasCapacity(queuedCalls[0])) {
                queuedCalls.shift();
              }
            }
          }
        }, _timeout, onTimelyResponse);
      }
    };

    if (!runIfOriginHasCapacity(call)) {
      utils.logWarn('queueing auction due to limited endpoint capacity');
      queuedCalls.push(call);
    }

    function runIfOriginHasCapacity(call) {
      var hasCapacity = true;
      var maxRequests = __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('maxRequestsPerOrigin') || MAX_REQUESTS_PER_ORIGIN;
      call.bidRequests.some(function (bidRequest) {
        var requests = 1;
        var source = typeof bidRequest.src !== 'undefined' && bidRequest.src === CONSTANTS.S2S.SRC ? 's2s' : bidRequest.bidderCode; // if we have no previous info on this source just let them through

        if (sourceInfo[source]) {
          if (sourceInfo[source].SRA === false) {
            // some bidders might use more than the MAX_REQUESTS_PER_ORIGIN in a single auction.  In those cases
            // set their request count to MAX_REQUESTS_PER_ORIGIN so the auction isn't permanently queued waiting
            // for capacity for that bidder
            requests = Math.min(bidRequest.bids.length, maxRequests);
          }

          if (outstandingRequests[sourceInfo[source].origin] + requests > maxRequests) {
            hasCapacity = false;
          }
        } // return only used for terminating this .some() iteration early if it is determined we don't have capacity


        return !hasCapacity;
      });

      if (hasCapacity) {
        call.run();
      }

      return hasCapacity;
    }

    function increment(obj, prop) {
      if (typeof obj[prop] === 'undefined') {
        obj[prop] = 1;
      } else {
        obj[prop]++;
      }
    }
  }

  function addWinningBid(winningBid) {
    _winningBids = _winningBids.concat(winningBid);
    adapterManager.callBidWonBidder(winningBid.bidder, winningBid, adUnits);
  }

  function setBidTargeting(bid) {
    adapterManager.callSetTargetingBidder(bid.bidder, bid);
  }

  return {
    addBidReceived: addBidReceived,
    addNoBid: addNoBid,
    executeCallback: executeCallback,
    callBids: callBids,
    addWinningBid: addWinningBid,
    setBidTargeting: setBidTargeting,
    getWinningBids: function getWinningBids() {
      return _winningBids;
    },
    getTimeout: function getTimeout() {
      return _timeout;
    },
    getAuctionId: function getAuctionId() {
      return _auctionId;
    },
    getAuctionStatus: function getAuctionStatus() {
      return _auctionStatus;
    },
    getAdUnits: function getAdUnits() {
      return _adUnits;
    },
    getAdUnitCodes: function getAdUnitCodes() {
      return _adUnitCodes;
    },
    getBidRequests: function getBidRequests() {
      return _bidderRequests;
    },
    getBidsReceived: function getBidsReceived() {
      return _bidsReceived;
    },
    getNoBids: function getNoBids() {
      return _noBids;
    }
  };
}
var addBidResponse = Object(__WEBPACK_IMPORTED_MODULE_7__hook_js__["b" /* hook */])('async', function (adUnitCode, bid) {
  this.dispatch.call(this.bidderRequest, adUnitCode, bid);
}, 'addBidResponse');
var addBidderRequests = Object(__WEBPACK_IMPORTED_MODULE_7__hook_js__["b" /* hook */])('sync', function (bidderRequests) {
  this.dispatch.call(this.context, bidderRequests);
}, 'addBidderRequests');
var bidsBackCallback = Object(__WEBPACK_IMPORTED_MODULE_7__hook_js__["b" /* hook */])('async', function (adUnits, callback) {
  if (callback) {
    callback();
  }
}, 'bidsBackCallback');
function auctionCallbacks(auctionDone, auctionInstance) {
  var outstandingBidsAdded = 0;
  var allAdapterCalledDone = false;
  var bidderRequestsDone = new Set();
  var bidResponseMap = {};

  function afterBidAdded() {
    outstandingBidsAdded--;

    if (allAdapterCalledDone && outstandingBidsAdded === 0) {
      auctionDone();
    }
  }

  function addBidResponse(adUnitCode, bid) {
    var bidderRequest = this;
    bidResponseMap[bid.requestId] = true;
    outstandingBidsAdded++;
    var auctionId = auctionInstance.getAuctionId();
    var bidResponse = getPreparedBidForAuction({
      adUnitCode: adUnitCode,
      bid: bid,
      bidderRequest: bidderRequest,
      auctionId: auctionId
    });

    if (bidResponse.mediaType === 'video') {
      tryAddVideoBid(auctionInstance, bidResponse, bidderRequest, afterBidAdded);
    } else {
      addBidToAuction(auctionInstance, bidResponse);
      afterBidAdded();
    }
  }

  function adapterDone() {
    var bidderRequest = this;
    bidderRequestsDone.add(bidderRequest);
    allAdapterCalledDone = auctionInstance.getBidRequests().every(function (bidderRequest) {
      return bidderRequestsDone.has(bidderRequest);
    });
    bidderRequest.bids.forEach(function (bid) {
      if (!bidResponseMap[bid.bidId]) {
        auctionInstance.addNoBid(bid);
        events.emit(CONSTANTS.EVENTS.NO_BID, bid);
      }
    });

    if (allAdapterCalledDone && outstandingBidsAdded === 0) {
      auctionDone();
    }
  }

  return {
    addBidResponse: addBidResponse,
    adapterDone: adapterDone
  };
}
function doCallbacksIfTimedout(auctionInstance, bidResponse) {
  if (bidResponse.timeToRespond > auctionInstance.getTimeout() + __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('timeoutBuffer')) {
    auctionInstance.executeCallback(true);
  }
} // Add a bid to the auction.

function addBidToAuction(auctionInstance, bidResponse) {
  var bidderRequests = auctionInstance.getBidRequests();
  var bidderRequest = __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default()(bidderRequests, function (bidderRequest) {
    return bidderRequest.bidderCode === bidResponse.bidderCode;
  });
  setupBidTargeting(bidResponse, bidderRequest);
  events.emit(CONSTANTS.EVENTS.BID_RESPONSE, bidResponse);
  auctionInstance.addBidReceived(bidResponse);
  doCallbacksIfTimedout(auctionInstance, bidResponse);
} // Video bids may fail if the cache is down, or there's trouble on the network.

function tryAddVideoBid(auctionInstance, bidResponse, bidRequests, afterBidAdded) {
  var addBid = true;
  var bidderRequest = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["getBidRequest"])(bidResponse.requestId, [bidRequests]);
  var videoMediaType = bidderRequest && Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(bidderRequest, 'mediaTypes.video');
  var context = videoMediaType && Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(videoMediaType, 'context');

  if (__WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('cache.url') && context !== __WEBPACK_IMPORTED_MODULE_9__video_js__["b" /* OUTSTREAM */]) {
    if (!bidResponse.videoCacheKey) {
      addBid = false;
      callPrebidCache(auctionInstance, bidResponse, afterBidAdded, bidderRequest);
    } else if (!bidResponse.vastUrl) {
      utils.logError('videoCacheKey specified but not required vastUrl for video bid');
      addBid = false;
    }
  }

  if (addBid) {
    addBidToAuction(auctionInstance, bidResponse);
    afterBidAdded();
  }
}

var callPrebidCache = Object(__WEBPACK_IMPORTED_MODULE_7__hook_js__["b" /* hook */])('async', function (auctionInstance, bidResponse, afterBidAdded, bidderRequest) {
  Object(__WEBPACK_IMPORTED_MODULE_3__videoCache_js__["b" /* store */])([bidResponse], function (error, cacheIds) {
    if (error) {
      utils.logWarn("Failed to save to the video cache: ".concat(error, ". Video bid must be discarded."));
      doCallbacksIfTimedout(auctionInstance, bidResponse);
    } else {
      if (cacheIds[0].uuid === '') {
        utils.logWarn("Supplied video cache key was already in use by Prebid Cache; caching attempt was rejected. Video bid must be discarded.");
        doCallbacksIfTimedout(auctionInstance, bidResponse);
      } else {
        bidResponse.videoCacheKey = cacheIds[0].uuid;

        if (!bidResponse.vastUrl) {
          bidResponse.vastUrl = Object(__WEBPACK_IMPORTED_MODULE_3__videoCache_js__["a" /* getCacheUrl */])(bidResponse.videoCacheKey);
        }

        addBidToAuction(auctionInstance, bidResponse);
        afterBidAdded();
      }
    }
  }, bidderRequest);
}, 'callPrebidCache'); // Postprocess the bids so that all the universal properties exist, no matter which bidder they came from.
// This should be called before addBidToAuction().

function getPreparedBidForAuction(_ref2) {
  var adUnitCode = _ref2.adUnitCode,
      bid = _ref2.bid,
      bidderRequest = _ref2.bidderRequest,
      auctionId = _ref2.auctionId;
  var start = bidderRequest.start;

  var bidObject = _extends({}, bid, {
    auctionId: auctionId,
    responseTimestamp: Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["timestamp"])(),
    requestTimestamp: start,
    cpm: parseFloat(bid.cpm) || 0,
    bidder: bid.bidderCode,
    adUnitCode: adUnitCode
  });

  bidObject.timeToRespond = bidObject.responseTimestamp - bidObject.requestTimestamp; // Let listeners know that now is the time to adjust the bid, if they want to.
  //
  // CAREFUL: Publishers rely on certain bid properties to be available (like cpm),
  // but others to not be set yet (like priceStrings). See #1372 and #1389.

  events.emit(CONSTANTS.EVENTS.BID_ADJUSTMENT, bidObject); // a publisher-defined renderer can be used to render bids

  var bidReq = bidderRequest.bids && __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default()(bidderRequest.bids, function (bid) {
    return bid.adUnitCode == adUnitCode;
  });
  var adUnitRenderer = bidReq && bidReq.renderer;

  if (adUnitRenderer && adUnitRenderer.url) {
    bidObject.renderer = __WEBPACK_IMPORTED_MODULE_4__Renderer_js__["a" /* Renderer */].install({
      url: adUnitRenderer.url
    });
    bidObject.renderer.setRender(adUnitRenderer.render);
  } // Use the config value 'mediaTypeGranularity' if it has been defined for mediaType, else use 'customPriceBucket'


  var mediaTypeGranularity = getMediaTypeGranularity(bid.mediaType, bidReq, __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('mediaTypePriceGranularity'));
  var priceStringsObj = Object(__WEBPACK_IMPORTED_MODULE_1__cpmBucketManager_js__["a" /* getPriceBucketString */])(bidObject.cpm, _typeof(mediaTypeGranularity) === 'object' ? mediaTypeGranularity : __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('customPriceBucket'), __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('currency.granularityMultiplier'));
  bidObject.pbLg = priceStringsObj.low;
  bidObject.pbMg = priceStringsObj.med;
  bidObject.pbHg = priceStringsObj.high;
  bidObject.pbAg = priceStringsObj.auto;
  bidObject.pbDg = priceStringsObj.dense;
  bidObject.pbCg = priceStringsObj.custom;
  return bidObject;
}

function setupBidTargeting(bidObject, bidderRequest) {
  var keyValues;

  if (bidObject.bidderCode && (bidObject.cpm > 0 || bidObject.dealId)) {
    var bidReq = __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default()(bidderRequest.bids, function (bid) {
      return bid.adUnitCode === bidObject.adUnitCode;
    });
    keyValues = getKeyValueTargetingPairs(bidObject.bidderCode, bidObject, bidReq);
  } // use any targeting provided as defaults, otherwise just set from getKeyValueTargetingPairs


  bidObject.adserverTargeting = _extends(bidObject.adserverTargeting || {}, keyValues);
}
/**
 * @param {MediaType} mediaType
 * @param {Bid} [bidReq]
 * @param {MediaTypePriceGranularity} [mediaTypePriceGranularity]
 * @returns {(Object|string|undefined)}
 */


function getMediaTypeGranularity(mediaType, bidReq, mediaTypePriceGranularity) {
  if (mediaType && mediaTypePriceGranularity) {
    if (mediaType === __WEBPACK_IMPORTED_MODULE_10__mediaTypes_js__["d" /* VIDEO */]) {
      var context = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(bidReq, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_10__mediaTypes_js__["d" /* VIDEO */], ".context"), 'instream');

      if (mediaTypePriceGranularity["".concat(__WEBPACK_IMPORTED_MODULE_10__mediaTypes_js__["d" /* VIDEO */], "-").concat(context)]) {
        return mediaTypePriceGranularity["".concat(__WEBPACK_IMPORTED_MODULE_10__mediaTypes_js__["d" /* VIDEO */], "-").concat(context)];
      }
    }

    return mediaTypePriceGranularity[mediaType];
  }
}
/**
 * This function returns the price granularity defined. It can be either publisher defined or default value
 * @param {string} mediaType
 * @param {BidRequest} bidReq
 * @returns {string} granularity
 */

var getPriceGranularity = function getPriceGranularity(mediaType, bidReq) {
  // Use the config value 'mediaTypeGranularity' if it has been set for mediaType, else use 'priceGranularity'
  var mediaTypeGranularity = getMediaTypeGranularity(mediaType, bidReq, __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('mediaTypePriceGranularity'));
  var granularity = typeof mediaType === 'string' && mediaTypeGranularity ? typeof mediaTypeGranularity === 'string' ? mediaTypeGranularity : 'custom' : __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('priceGranularity');
  return granularity;
};
/**
 * This function returns a function to get bid price by price granularity
 * @param {string} granularity
 * @returns {function}
 */

var getPriceByGranularity = function getPriceByGranularity(granularity) {
  return function (bid) {
    if (granularity === CONSTANTS.GRANULARITY_OPTIONS.AUTO) {
      return bid.pbAg;
    } else if (granularity === CONSTANTS.GRANULARITY_OPTIONS.DENSE) {
      return bid.pbDg;
    } else if (granularity === CONSTANTS.GRANULARITY_OPTIONS.LOW) {
      return bid.pbLg;
    } else if (granularity === CONSTANTS.GRANULARITY_OPTIONS.MEDIUM) {
      return bid.pbMg;
    } else if (granularity === CONSTANTS.GRANULARITY_OPTIONS.HIGH) {
      return bid.pbHg;
    } else if (granularity === CONSTANTS.GRANULARITY_OPTIONS.CUSTOM) {
      return bid.pbCg;
    }
  };
};
/**
 * @param {string} mediaType
 * @param {string} bidderCode
 * @param {BidRequest} bidReq
 * @returns {*}
 */

function getStandardBidderSettings(mediaType, bidderCode, bidReq) {
  // factory for key value objs
  function createKeyVal(key, value) {
    return {
      key: key,
      val: typeof value === 'function' ? function (bidResponse) {
        return value(bidResponse);
      } : function (bidResponse) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["getValue"])(bidResponse, value);
      }
    };
  }

  var TARGETING_KEYS = CONSTANTS.TARGETING_KEYS;
  var granularity = getPriceGranularity(mediaType, bidReq);
  var bidderSettings = pbjs.bidderSettings;

  if (!bidderSettings[CONSTANTS.JSON_MAPPING.BD_SETTING_STANDARD]) {
    bidderSettings[CONSTANTS.JSON_MAPPING.BD_SETTING_STANDARD] = {};
  }

  if (!bidderSettings[CONSTANTS.JSON_MAPPING.BD_SETTING_STANDARD][CONSTANTS.JSON_MAPPING.ADSERVER_TARGETING]) {
    bidderSettings[CONSTANTS.JSON_MAPPING.BD_SETTING_STANDARD][CONSTANTS.JSON_MAPPING.ADSERVER_TARGETING] = [createKeyVal(TARGETING_KEYS.BIDDER, 'bidderCode'), createKeyVal(TARGETING_KEYS.AD_ID, 'adId'), createKeyVal(TARGETING_KEYS.PRICE_BUCKET, getPriceByGranularity(granularity)), createKeyVal(TARGETING_KEYS.SIZE, 'size'), createKeyVal(TARGETING_KEYS.DEAL, 'dealId'), createKeyVal(TARGETING_KEYS.SOURCE, 'source'), createKeyVal(TARGETING_KEYS.FORMAT, 'mediaType')];
  }

  if (mediaType === 'video') {
    var adserverTargeting = bidderSettings[CONSTANTS.JSON_MAPPING.BD_SETTING_STANDARD][CONSTANTS.JSON_MAPPING.ADSERVER_TARGETING]; // Adding hb_uuid + hb_cache_id

    [TARGETING_KEYS.UUID, TARGETING_KEYS.CACHE_ID].forEach(function (targetingKeyVal) {
      if (typeof __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default()(adserverTargeting, function (kvPair) {
        return kvPair.key === targetingKeyVal;
      }) === 'undefined') {
        adserverTargeting.push(createKeyVal(targetingKeyVal, 'videoCacheKey'));
      }
    }); // Adding hb_cache_host

    if (__WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('cache.url') && (!bidderCode || utils.deepAccess(bidderSettings, "".concat(bidderCode, ".sendStandardTargeting")) !== false)) {
      var urlInfo = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["parseUrl"])(__WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('cache.url'));

      if (typeof __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default()(adserverTargeting, function (targetingKeyVal) {
        return targetingKeyVal.key === TARGETING_KEYS.CACHE_HOST;
      }) === 'undefined') {
        adserverTargeting.push(createKeyVal(TARGETING_KEYS.CACHE_HOST, function (bidResponse) {
          return utils.deepAccess(bidResponse, "adserverTargeting.".concat(TARGETING_KEYS.CACHE_HOST)) ? bidResponse.adserverTargeting[TARGETING_KEYS.CACHE_HOST] : urlInfo.hostname;
        }));
      }
    }
  }

  return bidderSettings[CONSTANTS.JSON_MAPPING.BD_SETTING_STANDARD];
}
function getKeyValueTargetingPairs(bidderCode, custBidObj, bidReq) {
  if (!custBidObj) {
    return {};
  }

  var keyValues = {};
  var bidderSettings = pbjs.bidderSettings; // 1) set the keys from "standard" setting or from prebid defaults

  if (bidderSettings) {
    // initialize default if not set
    var standardSettings = getStandardBidderSettings(custBidObj.mediaType, bidderCode, bidReq);
    setKeys(keyValues, standardSettings, custBidObj); // 2) set keys from specific bidder setting override if they exist

    if (bidderCode && bidderSettings[bidderCode] && bidderSettings[bidderCode][CONSTANTS.JSON_MAPPING.ADSERVER_TARGETING]) {
      setKeys(keyValues, bidderSettings[bidderCode], custBidObj);
      custBidObj.sendStandardTargeting = bidderSettings[bidderCode].sendStandardTargeting;
    }
  } // set native key value targeting


  if (custBidObj['native']) {
    keyValues = _extends({}, keyValues, Object(__WEBPACK_IMPORTED_MODULE_2__native_js__["d" /* getNativeTargeting */])(custBidObj, bidReq));
  }

  return keyValues;
}

function setKeys(keyValues, bidderSettings, custBidObj) {
  var targeting = bidderSettings[CONSTANTS.JSON_MAPPING.ADSERVER_TARGETING];
  custBidObj.size = custBidObj.getSize();

  utils._each(targeting, function (kvPair) {
    var key = kvPair.key;
    var value = kvPair.val;

    if (keyValues[key]) {
      utils.logWarn('The key: ' + key + ' is getting ovewritten');
    }

    if (utils.isFn(value)) {
      try {
        value = value(custBidObj);
      } catch (e) {
        utils.logError('bidmanager', 'ERROR', e);
      }
    }

    if ((typeof bidderSettings.suppressEmptyKeys !== 'undefined' && bidderSettings.suppressEmptyKeys === true || key === CONSTANTS.TARGETING_KEYS.DEAL) && ( // hb_deal is suppressed automatically if not set
    utils.isEmptyStr(value) || value === null || value === undefined)) {
      utils.logInfo("suppressing empty key '" + key + "' from adserver targeting");
    } else {
      keyValues[key] = value;
    }
  });

  return keyValues;
}

function adjustBids(bid) {
  var code = bid.bidderCode;
  var bidPriceAdjusted = bid.cpm;
  var bidCpmAdjustment;

  if (pbjs.bidderSettings) {
    if (code && pbjs.bidderSettings[code] && typeof pbjs.bidderSettings[code].bidCpmAdjustment === 'function') {
      bidCpmAdjustment = pbjs.bidderSettings[code].bidCpmAdjustment;
    } else if (pbjs.bidderSettings[CONSTANTS.JSON_MAPPING.BD_SETTING_STANDARD] && typeof pbjs.bidderSettings[CONSTANTS.JSON_MAPPING.BD_SETTING_STANDARD].bidCpmAdjustment === 'function') {
      bidCpmAdjustment = pbjs.bidderSettings[CONSTANTS.JSON_MAPPING.BD_SETTING_STANDARD].bidCpmAdjustment;
    }

    if (bidCpmAdjustment) {
      try {
        bidPriceAdjusted = bidCpmAdjustment(bid.cpm, _extends({}, bid));
      } catch (e) {
        utils.logError('Error during bid adjustment', 'bidmanager.js', e);
      }
    }
  }

  if (bidPriceAdjusted >= 0) {
    bid.cpm = bidPriceAdjusted;
  }
}
/**
 * groupByPlacement is a reduce function that converts an array of Bid objects
 * to an object with placement codes as keys, with each key representing an object
 * with an array of `Bid` objects for that placement
 * @returns {*} as { [adUnitCode]: { bids: [Bid, Bid, Bid] } }
 */

function groupByPlacement(bidsByPlacement, bid) {
  if (!bidsByPlacement[bid.adUnitCode]) {
    bidsByPlacement[bid.adUnitCode] = {
      bids: []
    };
  }

  bidsByPlacement[bid.adUnitCode].bids.push(bid);
  return bidsByPlacement;
}
/**
 * Returns a list of bids that we haven't received a response yet where the bidder did not call done
 * @param {BidRequest[]} bidderRequests List of bids requested for auction instance
 * @param {Set} timelyBidders Set of bidders which responded in time
 *
 * @typedef {Object} TimedOutBid
 * @property {string} bidId The id representing the bid
 * @property {string} bidder The string name of the bidder
 * @property {string} adUnitCode The code used to uniquely identify the ad unit on the publisher's page
 * @property {string} auctionId The id representing the auction
 *
 * @return {Array<TimedOutBid>} List of bids that Prebid hasn't received a response for
 */


function getTimedOutBids(bidderRequests, timelyBidders) {
  var timedOutBids = bidderRequests.map(function (bid) {
    return (bid.bids || []).filter(function (bid) {
      return !timelyBidders.has(bid.bidder);
    });
  }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils_js__["flatten"], []).map(function (bid) {
    return {
      bidId: bid.bidId,
      bidder: bid.bidder,
      adUnitCode: bid.adUnitCode,
      auctionId: bid.auctionId
    };
  });
  return timedOutBids;
}

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TARGETING_KEYS */
/* unused harmony export filters */
/* unused harmony export getHighestCpmBidsFromBidPool */
/* unused harmony export sortByDealAndPriceBucketOrCpm */
/* unused harmony export newTargeting */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return targeting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__native_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auctionManager_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sizeMapping_js__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_includes_js__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









var utils = __webpack_require__(0);

var CONSTANTS = __webpack_require__(5);

var pbTargetingKeys = [];
var MAX_DFP_KEYLENGTH = 20;
var TTL_BUFFER = 1000;
var TARGETING_KEYS = Object.keys(CONSTANTS.TARGETING_KEYS).map(function (key) {
  return CONSTANTS.TARGETING_KEYS[key];
}); // return unexpired bids

var isBidNotExpired = function isBidNotExpired(bid) {
  return bid.responseTimestamp + bid.ttl * 1000 + TTL_BUFFER > Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["timestamp"])();
}; // return bids whose status is not set. Winning bids can only have a status of `rendered`.


var isUnusedBid = function isUnusedBid(bid) {
  return bid && (bid.status && !__WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_includes_js___default()([CONSTANTS.BID_STATUS.RENDERED], bid.status) || !bid.status);
};

var filters = {
  isBidNotExpired: isBidNotExpired,
  isUnusedBid: isUnusedBid
}; // If two bids are found for same adUnitCode, we will use the highest one to take part in auction
// This can happen in case of concurrent auctions
// If adUnitBidLimit is set above 0 return top N number of bids

function getHighestCpmBidsFromBidPool(bidsReceived, highestCpmCallback) {
  var adUnitBidLimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var bids = [];
  var dealPrioritization = __WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].getConfig('sendBidsControl.dealPrioritization'); // bucket by adUnitcode

  var buckets = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["groupBy"])(bidsReceived, 'adUnitCode'); // filter top bid for each bucket by bidder

  Object.keys(buckets).forEach(function (bucketKey) {
    var bucketBids = [];
    var bidsByBidder = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["groupBy"])(buckets[bucketKey], 'bidderCode');
    Object.keys(bidsByBidder).forEach(function (key) {
      return bucketBids.push(bidsByBidder[key].reduce(highestCpmCallback));
    }); // if adUnitBidLimit is set, pass top N number bids

    if (adUnitBidLimit > 0) {
      bucketBids = dealPrioritization ? bucketBids.sort(sortByDealAndPriceBucketOrCpm(true)) : bucketBids.sort(function (a, b) {
        return b.cpm - a.cpm;
      });
      bids.push.apply(bids, _toConsumableArray(bucketBids.slice(0, adUnitBidLimit)));
    } else {
      bids.push.apply(bids, _toConsumableArray(bucketBids));
    }
  });
  return bids;
}
/**
* A descending sort function that will sort the list of objects based on the following two dimensions:
*  - bids with a deal are sorted before bids w/o a deal
*  - then sort bids in each grouping based on the hb_pb value
* eg: the following list of bids would be sorted like:
*  [{
*    "hb_adid": "vwx",
*    "hb_pb": "28",
*    "hb_deal": "7747"
*  }, {
*    "hb_adid": "jkl",
*    "hb_pb": "10",
*    "hb_deal": "9234"
*  }, {
*    "hb_adid": "stu",
*    "hb_pb": "50"
*  }, {
*    "hb_adid": "def",
*    "hb_pb": "2"
*  }]
*/

function sortByDealAndPriceBucketOrCpm() {
  var useCpm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return function (a, b) {
    if (a.adserverTargeting.hb_deal !== undefined && b.adserverTargeting.hb_deal === undefined) {
      return -1;
    }

    if (a.adserverTargeting.hb_deal === undefined && b.adserverTargeting.hb_deal !== undefined) {
      return 1;
    } // assuming both values either have a deal or don't have a deal - sort by the hb_pb param


    if (useCpm) {
      return b.cpm - a.cpm;
    }

    return b.adserverTargeting.hb_pb - a.adserverTargeting.hb_pb;
  };
}
/**
 * @typedef {Object.<string,string>} targeting
 * @property {string} targeting_key
 */

/**
 * @typedef {Object.<string,Object.<string,string[]>[]>[]} targetingArray
 */

function newTargeting(auctionManager) {
  var targeting = {};
  var latestAuctionForAdUnit = {};

  targeting.setLatestAuctionForAdUnit = function (adUnitCode, auctionId) {
    latestAuctionForAdUnit[adUnitCode] = auctionId;
  };

  targeting.resetPresetTargeting = function (adUnitCode, customSlotMatching) {
    if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["isGptPubadsDefined"])()) {
      var adUnitCodes = getAdUnitCodes(adUnitCode);
      var adUnits = auctionManager.getAdUnits().filter(function (adUnit) {
        return __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_includes_js___default()(adUnitCodes, adUnit.code);
      });
      window.googletag.pubads().getSlots().forEach(function (slot) {
        var customSlotMatchingFunc = utils.isFn(customSlotMatching) && customSlotMatching(slot);
        pbTargetingKeys.forEach(function (key) {
          // reset only registered adunits
          adUnits.forEach(function (unit) {
            if (unit.code === slot.getAdUnitPath() || unit.code === slot.getSlotElementId() || utils.isFn(customSlotMatchingFunc) && customSlotMatchingFunc(unit.code)) {
              slot.setTargeting(key, null);
            }
          });
        });
      });
    }
  };

  targeting.resetPresetTargetingAST = function (adUnitCode) {
    var adUnitCodes = getAdUnitCodes(adUnitCode);
    adUnitCodes.forEach(function (unit) {
      var astTag = window.apntag.getTag(unit);

      if (astTag && astTag.keywords) {
        var currentKeywords = Object.keys(astTag.keywords);
        var newKeywords = {};
        currentKeywords.forEach(function (key) {
          if (!__WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_includes_js___default()(pbTargetingKeys, key.toLowerCase())) {
            newKeywords[key] = astTag.keywords[key];
          }
        });
        window.apntag.modifyTag(unit, {
          keywords: newKeywords
        });
      }
    });
  };
  /**
   * checks if bid has targeting set and belongs based on matching ad unit codes
   * @return {boolean} true or false
   */


  function bidShouldBeAddedToTargeting(bid, adUnitCodes) {
    return bid.adserverTargeting && adUnitCodes && (utils.isArray(adUnitCodes) && __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_includes_js___default()(adUnitCodes, bid.adUnitCode) || typeof adUnitCodes === 'string' && bid.adUnitCode === adUnitCodes);
  }

  ;
  /**
   * Returns targeting for any bids which have deals if alwaysIncludeDeals === true
   */

  function getDealBids(adUnitCodes, bidsReceived) {
    if (__WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].getConfig('targetingControls.alwaysIncludeDeals') === true) {
      var standardKeys = TARGETING_KEYS.concat(__WEBPACK_IMPORTED_MODULE_2__native_js__["a" /* NATIVE_TARGETING_KEYS */]); // we only want the top bid from bidders who have multiple entries per ad unit code

      var bids = getHighestCpmBidsFromBidPool(bidsReceived, __WEBPACK_IMPORTED_MODULE_0__utils_js__["getHighestCpm"]); // populate targeting keys for the remaining bids if they have a dealId

      return bids.map(function (bid) {
        if (bid.dealId && bidShouldBeAddedToTargeting(bid, adUnitCodes)) {
          return _defineProperty({}, bid.adUnitCode, getTargetingMap(bid, standardKeys.filter(function (key) {
            return typeof bid.adserverTargeting[key] !== 'undefined';
          })));
        }
      }).filter(function (bid) {
        return bid;
      }); // removes empty elements in array
    }

    return [];
  }

  ;
  /**
   * Returns all ad server targeting for all ad units.
   * @param {string=} adUnitCode
   * @return {Object.<string,targeting>} targeting
   */

  targeting.getAllTargeting = function (adUnitCode) {
    var bidsReceived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getBidsReceived();
    var adUnitCodes = getAdUnitCodes(adUnitCode); // Get targeting for the winning bid. Add targeting for any bids that have
    // `alwaysUseBid=true`. If sending all bids is enabled, add targeting for losing bids.

    var targeting = getWinningBidTargeting(adUnitCodes, bidsReceived).concat(getCustomBidTargeting(adUnitCodes, bidsReceived)).concat(__WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].getConfig('enableSendAllBids') ? getBidLandscapeTargeting(adUnitCodes, bidsReceived) : getDealBids(adUnitCodes, bidsReceived)); // store a reference of the targeting keys

    targeting.map(function (adUnitCode) {
      Object.keys(adUnitCode).map(function (key) {
        adUnitCode[key].map(function (targetKey) {
          if (pbTargetingKeys.indexOf(Object.keys(targetKey)[0]) === -1) {
            pbTargetingKeys = Object.keys(targetKey).concat(pbTargetingKeys);
          }
        });
      });
    });
    targeting = flattenTargeting(targeting);
    var auctionKeysThreshold = __WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].getConfig('targetingControls.auctionKeyMaxChars');

    if (auctionKeysThreshold) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["logInfo"])("Detected 'targetingControls.auctionKeyMaxChars' was active for this auction; set with a limit of ".concat(auctionKeysThreshold, " characters.  Running checks on auction keys..."));
      targeting = filterTargetingKeys(targeting, auctionKeysThreshold);
    } // make sure at least there is a entry per adUnit code in the targetingSet so receivers of SET_TARGETING call's can know what ad units are being invoked


    adUnitCodes.forEach(function (code) {
      if (!targeting[code]) {
        targeting[code] = {};
      }
    });
    return targeting;
  }; // create an encoded string variant based on the keypairs of the provided object
  //  - note this will encode the characters between the keys (ie = and &)


  function convertKeysToQueryForm(keyMap) {
    return Object.keys(keyMap).reduce(function (queryString, key) {
      var encodedKeyPair = "".concat(key, "%3d").concat(encodeURIComponent(keyMap[key]), "%26");
      return queryString += encodedKeyPair;
    }, '');
  }

  function filterTargetingKeys(targeting, auctionKeysThreshold) {
    // read each targeting.adUnit object and sort the adUnits into a list of adUnitCodes based on priorization setting (eg CPM)
    var targetingCopy = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepClone"])(targeting);
    var targetingMap = Object.keys(targetingCopy).map(function (adUnitCode) {
      return {
        adUnitCode: adUnitCode,
        adserverTargeting: targetingCopy[adUnitCode]
      };
    }).sort(sortByDealAndPriceBucketOrCpm()); // iterate through the targeting based on above list and transform the keys into the query-equivalent and count characters

    return targetingMap.reduce(function (accMap, currMap, index, arr) {
      var adUnitQueryString = convertKeysToQueryForm(currMap.adserverTargeting); // for the last adUnit - trim last encoded ampersand from the converted query string

      if (index + 1 === arr.length) {
        adUnitQueryString = adUnitQueryString.slice(0, -3);
      } // if under running threshold add to result


      var code = currMap.adUnitCode;
      var querySize = adUnitQueryString.length;

      if (querySize <= auctionKeysThreshold) {
        auctionKeysThreshold -= querySize;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["logInfo"])("AdUnit '".concat(code, "' auction keys comprised of ").concat(querySize, " characters.  Deducted from running threshold; new limit is ").concat(auctionKeysThreshold), targetingCopy[code]);
        accMap[code] = targetingCopy[code];
      } else {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["logWarn"])("The following keys for adUnitCode '".concat(code, "' exceeded the current limit of the 'auctionKeyMaxChars' setting.\nThe key-set size was ").concat(querySize, ", the current allotted amount was ").concat(auctionKeysThreshold, ".\n"), targetingCopy[code]);
      }

      if (index + 1 === arr.length && Object.keys(accMap).length === 0) {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["logError"])('No auction targeting keys were permitted due to the setting in setConfig(targetingControls.auctionKeyMaxChars).  Please review setup and consider adjusting.');
      }

      return accMap;
    }, {});
  }
  /**
   * Converts targeting array and flattens to make it easily iteratable
   * e.g: Sample input to this function
   * ```
   * [
   *    {
   *      "div-gpt-ad-1460505748561-0": [{"hb_bidder": ["appnexusAst"]}]
   *    },
   *    {
   *      "div-gpt-ad-1460505748561-0": [{"hb_bidder_appnexusAs": ["appnexusAst"]}]
   *    }
   * ]
   * ```
   * Resulting array
   * ```
   * {
   *  "div-gpt-ad-1460505748561-0": {
   *    "hb_bidder": "appnexusAst",
   *    "hb_bidder_appnexusAs": "appnexusAst"
   *  }
   * }
   * ```
   *
   * @param {targetingArray}  targeting
   * @return {Object.<string,targeting>}  targeting
   */


  function flattenTargeting(targeting) {
    var targetingObj = targeting.map(function (targeting) {
      return _defineProperty({}, Object.keys(targeting)[0], targeting[Object.keys(targeting)[0]].map(function (target) {
        return _defineProperty({}, Object.keys(target)[0], target[Object.keys(target)[0]].join(', '));
      }).reduce(function (p, c) {
        return _extends(c, p);
      }, {}));
    }).reduce(function (accumulator, targeting) {
      var key = Object.keys(targeting)[0];
      accumulator[key] = _extends({}, accumulator[key], targeting[key]);
      return accumulator;
    }, {});
    return targetingObj;
  }
  /**
   * Sets targeting for DFP
   * @param {Object.<string,Object.<string,string>>} targetingConfig
   */


  targeting.setTargetingForGPT = function (targetingConfig, customSlotMatching) {
    window.googletag.pubads().getSlots().forEach(function (slot) {
      Object.keys(targetingConfig).filter(customSlotMatching ? customSlotMatching(slot) : Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["isAdUnitCodeMatchingSlot"])(slot)).forEach(function (targetId) {
        return Object.keys(targetingConfig[targetId]).forEach(function (key) {
          var valueArr = targetingConfig[targetId][key].split(',');
          valueArr = valueArr.length > 1 ? [valueArr] : valueArr;
          valueArr.map(function (value) {
            utils.logMessage("Attempting to set key value for slot: ".concat(slot.getSlotElementId(), " key: ").concat(key, " value: ").concat(value));
            return value;
          }).forEach(function (value) {
            slot.setTargeting(key, value);
          });
        });
      });
    });
  };
  /**
   * normlizes input to a `adUnit.code` array
   * @param  {(string|string[])} adUnitCode [description]
   * @return {string[]}     AdUnit code array
   */


  function getAdUnitCodes(adUnitCode) {
    if (typeof adUnitCode === 'string') {
      return [adUnitCode];
    } else if (utils.isArray(adUnitCode)) {
      return adUnitCode;
    }

    return auctionManager.getAdUnitCodes() || [];
  }

  function getBidsReceived() {
    var bidsReceived = auctionManager.getBidsReceived();

    if (!__WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].getConfig('useBidCache')) {
      bidsReceived = bidsReceived.filter(function (bid) {
        return latestAuctionForAdUnit[bid.adUnitCode] === bid.auctionId;
      });
    }

    bidsReceived = bidsReceived.filter(function (bid) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(bid, 'video.context') !== __WEBPACK_IMPORTED_MODULE_5__mediaTypes_js__["a" /* ADPOD */];
    }).filter(function (bid) {
      return bid.mediaType !== 'banner' || Object(__WEBPACK_IMPORTED_MODULE_4__sizeMapping_js__["c" /* sizeSupported */])([bid.width, bid.height]);
    }).filter(filters.isUnusedBid).filter(filters.isBidNotExpired);
    return getHighestCpmBidsFromBidPool(bidsReceived, __WEBPACK_IMPORTED_MODULE_0__utils_js__["getOldestHighestCpmBid"]);
  }
  /**
   * Returns top bids for a given adUnit or set of adUnits.
   * @param  {(string|string[])} adUnitCode adUnitCode or array of adUnitCodes
   * @return {[type]}            [description]
   */


  targeting.getWinningBids = function (adUnitCode) {
    var bidsReceived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getBidsReceived();
    var adUnitCodes = getAdUnitCodes(adUnitCode);
    return bidsReceived.filter(function (bid) {
      return __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_includes_js___default()(adUnitCodes, bid.adUnitCode);
    }).filter(function (bid) {
      return bid.cpm > 0;
    }).map(function (bid) {
      return bid.adUnitCode;
    }).filter(__WEBPACK_IMPORTED_MODULE_0__utils_js__["uniques"]).map(function (adUnitCode) {
      return bidsReceived.filter(function (bid) {
        return bid.adUnitCode === adUnitCode ? bid : null;
      }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils_js__["getHighestCpm"]);
    });
  };
  /**
   * @param  {(string|string[])} adUnitCode adUnitCode or array of adUnitCodes
   * Sets targeting for AST
   */


  targeting.setTargetingForAst = function (adUnitCodes) {
    var astTargeting = targeting.getAllTargeting(adUnitCodes);

    try {
      targeting.resetPresetTargetingAST(adUnitCodes);
    } catch (e) {
      utils.logError('unable to reset targeting for AST' + e);
    }

    Object.keys(astTargeting).forEach(function (targetId) {
      return Object.keys(astTargeting[targetId]).forEach(function (key) {
        utils.logMessage("Attempting to set targeting for targetId: ".concat(targetId, " key: ").concat(key, " value: ").concat(astTargeting[targetId][key])); // setKeywords supports string and array as value

        if (utils.isStr(astTargeting[targetId][key]) || utils.isArray(astTargeting[targetId][key])) {
          var keywordsObj = {};
          var regex = /pt[0-9]/;

          if (key.search(regex) < 0) {
            keywordsObj[key.toUpperCase()] = astTargeting[targetId][key];
          } else {
            // pt${n} keys should not be uppercased
            keywordsObj[key] = astTargeting[targetId][key];
          }

          window.apntag.setKeywords(targetId, keywordsObj, {
            overrideKeyValue: true
          });
        }
      });
    });
  };
  /**
   * Get targeting key value pairs for winning bid.
   * @param {string[]}    AdUnit code array
   * @return {targetingArray}   winning bids targeting
   */


  function getWinningBidTargeting(adUnitCodes, bidsReceived) {
    var winners = targeting.getWinningBids(adUnitCodes, bidsReceived);
    var standardKeys = getStandardKeys();
    winners = winners.map(function (winner) {
      return _defineProperty({}, winner.adUnitCode, Object.keys(winner.adserverTargeting).filter(function (key) {
        return typeof winner.sendStandardTargeting === 'undefined' || winner.sendStandardTargeting || standardKeys.indexOf(key) === -1;
      }).reduce(function (acc, key) {
        var targetingValue = [winner.adserverTargeting[key]];

        var targeting = _defineProperty({}, key.substring(0, MAX_DFP_KEYLENGTH), targetingValue);

        if (key === CONSTANTS.TARGETING_KEYS.DEAL) {
          var bidderCodeTargetingKey = "".concat(key, "_").concat(winner.bidderCode).substring(0, MAX_DFP_KEYLENGTH);

          var bidderCodeTargeting = _defineProperty({}, bidderCodeTargetingKey, targetingValue);

          return [].concat(_toConsumableArray(acc), [targeting, bidderCodeTargeting]);
        }

        return [].concat(_toConsumableArray(acc), [targeting]);
      }, []));
    });
    return winners;
  }

  function getStandardKeys() {
    return auctionManager.getStandardBidderAdServerTargeting() // in case using a custom standard key set
    .map(function (targeting) {
      return targeting.key;
    }).concat(TARGETING_KEYS).filter(__WEBPACK_IMPORTED_MODULE_0__utils_js__["uniques"]); // standard keys defined in the library.
  }
  /**
   * Merge custom adserverTargeting with same key name for same adUnitCode.
   * e.g: Appnexus defining custom keyvalue pair foo:bar and Rubicon defining custom keyvalue pair foo:baz will be merged to foo: ['bar','baz']
   *
   * @param {Object[]} acc Accumulator for reducer. It will store updated bidResponse objects
   * @param {Object} bid BidResponse
   * @param {number} index current index
   * @param {Array} arr original array
   */


  function mergeAdServerTargeting(acc, bid, index, arr) {
    function concatTargetingValue(key) {
      return function (currentBidElement) {
        if (!utils.isArray(currentBidElement.adserverTargeting[key])) {
          currentBidElement.adserverTargeting[key] = [currentBidElement.adserverTargeting[key]];
        }

        currentBidElement.adserverTargeting[key] = currentBidElement.adserverTargeting[key].concat(bid.adserverTargeting[key]).filter(__WEBPACK_IMPORTED_MODULE_0__utils_js__["uniques"]);
        delete bid.adserverTargeting[key];
      };
    }

    function hasSameAdunitCodeAndKey(key) {
      return function (currentBidElement) {
        return currentBidElement.adUnitCode === bid.adUnitCode && currentBidElement.adserverTargeting[key];
      };
    }

    Object.keys(bid.adserverTargeting).filter(getCustomKeys()).forEach(function (key) {
      if (acc.length) {
        acc.filter(hasSameAdunitCodeAndKey(key)).forEach(concatTargetingValue(key));
      }
    });
    acc.push(bid);
    return acc;
  }

  function getCustomKeys() {
    var standardKeys = getStandardKeys().concat(__WEBPACK_IMPORTED_MODULE_2__native_js__["a" /* NATIVE_TARGETING_KEYS */]);
    return function (key) {
      return standardKeys.indexOf(key) === -1;
    };
  }

  function truncateCustomKeys(bid) {
    return _defineProperty({}, bid.adUnitCode, Object.keys(bid.adserverTargeting) // Get only the non-standard keys of the losing bids, since we
    // don't want to override the standard keys of the winning bid.
    .filter(getCustomKeys()).map(function (key) {
      return _defineProperty({}, key.substring(0, MAX_DFP_KEYLENGTH), [bid.adserverTargeting[key]]);
    }));
  }
  /**
   * Get custom targeting key value pairs for bids.
   * @param {string[]}    AdUnit code array
   * @return {targetingArray}   bids with custom targeting defined in bidderSettings
   */


  function getCustomBidTargeting(adUnitCodes, bidsReceived) {
    return bidsReceived.filter(function (bid) {
      return __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_includes_js___default()(adUnitCodes, bid.adUnitCode);
    }).map(function (bid) {
      return _extends({}, bid);
    }).reduce(mergeAdServerTargeting, []).map(truncateCustomKeys).filter(function (bid) {
      return bid;
    }); // removes empty elements in array;
  }
  /**
   * Get targeting key value pairs for non-winning bids.
   * @param {string[]}    AdUnit code array
   * @return {targetingArray}   all non-winning bids targeting
   */


  function getBidLandscapeTargeting(adUnitCodes, bidsReceived) {
    var standardKeys = TARGETING_KEYS.concat(__WEBPACK_IMPORTED_MODULE_2__native_js__["a" /* NATIVE_TARGETING_KEYS */]);
    var adUnitBidLimit = __WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].getConfig('sendBidsControl.bidLimit');
    var bids = getHighestCpmBidsFromBidPool(bidsReceived, __WEBPACK_IMPORTED_MODULE_0__utils_js__["getHighestCpm"], adUnitBidLimit); // populate targeting keys for the remaining bids

    return bids.map(function (bid) {
      if (bidShouldBeAddedToTargeting(bid, adUnitCodes)) {
        return _defineProperty({}, bid.adUnitCode, getTargetingMap(bid, standardKeys.filter(function (key) {
          return typeof bid.adserverTargeting[key] !== 'undefined';
        })));
      }
    }).filter(function (bid) {
      return bid;
    }); // removes empty elements in array
  }

  function getTargetingMap(bid, keys) {
    return keys.map(function (key) {
      return _defineProperty({}, "".concat(key, "_").concat(bid.bidderCode).substring(0, MAX_DFP_KEYLENGTH), [bid.adserverTargeting[key]]);
    });
  }

  targeting.isApntagDefined = function () {
    if (window.apntag && utils.isFn(window.apntag.setKeywords)) {
      return true;
    }
  };

  return targeting;
}
var targeting = newTargeting(__WEBPACK_IMPORTED_MODULE_3__auctionManager_js__["a" /* auctionManager */]);

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export USERSYNC_DEFAULT_CONFIG */
/* unused harmony export newUserSync */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return userSync; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__storageManager_js__ = __webpack_require__(9);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var USERSYNC_DEFAULT_CONFIG = {
  syncEnabled: true,
  filterSettings: {
    image: {
      bidders: '*',
      filter: 'include'
    }
  },
  syncsPerBidder: 5,
  syncDelay: 3000,
  auctionDelay: 0
}; // Set userSync default values

__WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].setDefaults({
  'userSync': __WEBPACK_IMPORTED_MODULE_0__utils_js__["deepClone"](USERSYNC_DEFAULT_CONFIG)
});
var storage = Object(__WEBPACK_IMPORTED_MODULE_3__storageManager_js__["a" /* getCoreStorageManager */])('usersync');
/**
 * Factory function which creates a new UserSyncPool.
 *
 * @param {UserSyncDependencies} userSyncDependencies Configuration options and dependencies which the
 *   UserSync object needs in order to behave properly.
 */

function newUserSync(userSyncDependencies) {
  var publicApi = {}; // A queue of user syncs for each adapter
  // Let getDefaultQueue() set the defaults

  var queue = getDefaultQueue(); // Whether or not user syncs have been trigger on this page load for a specific bidder

  var hasFiredBidder = new Set(); // How many bids for each adapter

  var numAdapterBids = {}; // for now - default both to false in case filterSettings config is absent/misconfigured

  var permittedPixels = {
    image: true,
    iframe: false
  }; // Use what is in config by default

  var usConfig = userSyncDependencies.config; // Update if it's (re)set

  __WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].getConfig('userSync', function (conf) {
    // Added this logic for https://github.com/prebid/Prebid.js/issues/4864
    // if userSync.filterSettings does not contain image/all configs, merge in default image config to ensure image pixels are fired
    if (conf.userSync) {
      var fs = conf.userSync.filterSettings;

      if (__WEBPACK_IMPORTED_MODULE_0__utils_js__["isPlainObject"](fs)) {
        if (!fs.image && !fs.all) {
          conf.userSync.filterSettings.image = {
            bidders: '*',
            filter: 'include'
          };
        }
      }
    }

    usConfig = _extends(usConfig, conf.userSync);
  });
  /**
   * @function getDefaultQueue
   * @summary Returns the default empty queue
   * @private
   * @return {object} A queue with no syncs
   */

  function getDefaultQueue() {
    return {
      image: [],
      iframe: []
    };
  }
  /**
   * @function fireSyncs
   * @summary Trigger all user syncs in the queue
   * @private
   */


  function fireSyncs() {
    if (!usConfig.syncEnabled || !userSyncDependencies.browserSupportsCookies) {
      return;
    }

    try {
      // Image pixels
      fireImagePixels(); // Iframe syncs

      loadIframes();
    } catch (e) {
      return __WEBPACK_IMPORTED_MODULE_0__utils_js__["logError"]('Error firing user syncs', e);
    } // Reset the user sync queue


    queue = getDefaultQueue();
  }

  function forEachFire(queue, fn) {
    // Randomize the order of the pixels before firing
    // This is to avoid giving any bidder who has registered multiple syncs
    // any preferential treatment and balancing them out
    __WEBPACK_IMPORTED_MODULE_0__utils_js__["shuffle"](queue).forEach(function (sync) {
      fn(sync);
      hasFiredBidder.add(sync[0]);
    });
  }
  /**
   * @function fireImagePixels
   * @summary Loops through user sync pixels and fires each one
   * @private
   */


  function fireImagePixels() {
    if (!permittedPixels.image) {
      return;
    }

    forEachFire(queue.image, function (sync) {
      var _sync = _slicedToArray(sync, 2),
          bidderName = _sync[0],
          trackingPixelUrl = _sync[1];

      __WEBPACK_IMPORTED_MODULE_0__utils_js__["logMessage"]("Invoking image pixel user sync for bidder: ".concat(bidderName)); // Create image object and add the src url

      __WEBPACK_IMPORTED_MODULE_0__utils_js__["triggerPixel"](trackingPixelUrl);
    });
  }
  /**
   * @function loadIframes
   * @summary Loops through iframe syncs and loads an iframe element into the page
   * @private
   */


  function loadIframes() {
    if (!permittedPixels.iframe) {
      return;
    }

    forEachFire(queue.iframe, function (sync) {
      var _sync2 = _slicedToArray(sync, 2),
          bidderName = _sync2[0],
          iframeUrl = _sync2[1];

      __WEBPACK_IMPORTED_MODULE_0__utils_js__["logMessage"]("Invoking iframe user sync for bidder: ".concat(bidderName)); // Insert iframe into DOM

      __WEBPACK_IMPORTED_MODULE_0__utils_js__["insertUserSyncIframe"](iframeUrl);
    });
  }
  /**
   * @function incrementAdapterBids
   * @summary Increment the count of user syncs queue for the adapter
   * @private
   * @params {object} numAdapterBids The object contain counts for all adapters
   * @params {string} bidder The name of the bidder adding a sync
   * @returns {object} The updated version of numAdapterBids
   */


  function incrementAdapterBids(numAdapterBids, bidder) {
    if (!numAdapterBids[bidder]) {
      numAdapterBids[bidder] = 1;
    } else {
      numAdapterBids[bidder] += 1;
    }

    return numAdapterBids;
  }
  /**
   * @function registerSync
   * @summary Add sync for this bidder to a queue to be fired later
   * @public
   * @params {string} type The type of the sync including image, iframe
   * @params {string} bidder The name of the adapter. e.g. "rubicon"
   * @params {string} url Either the pixel url or iframe url depending on the type
    * @example <caption>Using Image Sync</caption>
   * // registerSync(type, adapter, pixelUrl)
   * userSync.registerSync('image', 'rubicon', 'http://example.com/pixel')
   */


  publicApi.registerSync = function (type, bidder, url) {
    if (hasFiredBidder.has(bidder)) {
      return __WEBPACK_IMPORTED_MODULE_0__utils_js__["logMessage"]("already fired syncs for \"".concat(bidder, "\", ignoring registerSync call"));
    }

    if (!usConfig.syncEnabled || !__WEBPACK_IMPORTED_MODULE_0__utils_js__["isArray"](queue[type])) {
      return __WEBPACK_IMPORTED_MODULE_0__utils_js__["logWarn"]("User sync type \"".concat(type, "\" not supported"));
    }

    if (!bidder) {
      return __WEBPACK_IMPORTED_MODULE_0__utils_js__["logWarn"]("Bidder is required for registering sync");
    }

    if (usConfig.syncsPerBidder !== 0 && Number(numAdapterBids[bidder]) >= usConfig.syncsPerBidder) {
      return __WEBPACK_IMPORTED_MODULE_0__utils_js__["logWarn"]("Number of user syncs exceeded for \"".concat(bidder, "\""));
    }

    var canBidderRegisterSync = publicApi.canBidderRegisterSync(type, bidder);

    if (!canBidderRegisterSync) {
      return __WEBPACK_IMPORTED_MODULE_0__utils_js__["logWarn"]("Bidder \"".concat(bidder, "\" not permitted to register their \"").concat(type, "\" userSync pixels."));
    } // the bidder's pixel has passed all checks and is allowed to register


    queue[type].push([bidder, url]);
    numAdapterBids = incrementAdapterBids(numAdapterBids, bidder);
  };
  /**
   * @function shouldBidderBeBlocked
   * @summary Check filterSettings logic to determine if the bidder should be prevented from registering their userSync tracker
   * @private
   * @param {string} type The type of the sync; either image or iframe
   * @param {string} bidder The name of the adapter. e.g. "rubicon"
   * @returns {boolean} true => bidder is not allowed to register; false => bidder can register
    */


  function shouldBidderBeBlocked(type, bidder) {
    var filterConfig = usConfig.filterSettings; // apply the filter check if the config object is there (eg filterSettings.iframe exists) and if the config object is properly setup

    if (isFilterConfigValid(filterConfig, type)) {
      permittedPixels[type] = true;
      var activeConfig = filterConfig.all ? filterConfig.all : filterConfig[type];
      var biddersToFilter = activeConfig.bidders === '*' ? [bidder] : activeConfig.bidders;
      var filterType = activeConfig.filter || 'include'; // set default if undefined
      // return true if the bidder is either: not part of the include (ie outside the whitelist) or part of the exclude (ie inside the blacklist)

      var checkForFiltering = {
        'include': function include(bidders, bidder) {
          return !__WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js___default()(bidders, bidder);
        },
        'exclude': function exclude(bidders, bidder) {
          return __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js___default()(bidders, bidder);
        }
      };
      return checkForFiltering[filterType](biddersToFilter, bidder);
    }

    return false;
  }
  /**
   * @function isFilterConfigValid
   * @summary Check if the filterSettings object in the userSync config is setup properly
   * @private
   * @param {object} filterConfig sub-config object taken from filterSettings
   * @param {string} type The type of the sync; either image or iframe
   * @returns {boolean} true => config is setup correctly, false => setup incorrectly or filterConfig[type] is not present
   */


  function isFilterConfigValid(filterConfig, type) {
    if (filterConfig.all && filterConfig[type]) {
      __WEBPACK_IMPORTED_MODULE_0__utils_js__["logWarn"]("Detected presence of the \"filterSettings.all\" and \"filterSettings.".concat(type, "\" in userSync config.  You cannot mix \"all\" with \"iframe/image\" configs; they are mutually exclusive."));
      return false;
    }

    var activeConfig = filterConfig.all ? filterConfig.all : filterConfig[type];
    var activeConfigName = filterConfig.all ? 'all' : type; // if current pixel type isn't part of the config's logic, skip rest of the config checks...
    // we return false to skip subsequent filter checks in shouldBidderBeBlocked() function

    if (!activeConfig) {
      return false;
    }

    var filterField = activeConfig.filter;
    var biddersField = activeConfig.bidders;

    if (filterField && filterField !== 'include' && filterField !== 'exclude') {
      __WEBPACK_IMPORTED_MODULE_0__utils_js__["logWarn"]("UserSync \"filterSettings.".concat(activeConfigName, ".filter\" setting '").concat(filterField, "' is not a valid option; use either 'include' or 'exclude'."));
      return false;
    }

    if (biddersField !== '*' && !(Array.isArray(biddersField) && biddersField.length > 0 && biddersField.every(function (bidderInList) {
      return __WEBPACK_IMPORTED_MODULE_0__utils_js__["isStr"](bidderInList) && bidderInList !== '*';
    }))) {
      __WEBPACK_IMPORTED_MODULE_0__utils_js__["logWarn"]("Detected an invalid setup in userSync \"filterSettings.".concat(activeConfigName, ".bidders\"; use either '*' (to represent all bidders) or an array of bidders."));
      return false;
    }

    return true;
  }
  /**
   * @function syncUsers
   * @summary Trigger all the user syncs based on publisher-defined timeout
   * @public
   * @params {int} timeout The delay in ms before syncing data - default 0
   */


  publicApi.syncUsers = function () {
    var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (timeout) {
      return setTimeout(fireSyncs, Number(timeout));
    }

    fireSyncs();
  };
  /**
   * @function triggerUserSyncs
   * @summary A `syncUsers` wrapper for determining if enableOverride has been turned on
   * @public
   */


  publicApi.triggerUserSyncs = function () {
    if (usConfig.enableOverride) {
      publicApi.syncUsers();
    }
  };

  publicApi.canBidderRegisterSync = function (type, bidder) {
    if (usConfig.filterSettings) {
      if (shouldBidderBeBlocked(type, bidder)) {
        return false;
      }
    }

    return true;
  };

  return publicApi;
}
var browserSupportsCookies = !__WEBPACK_IMPORTED_MODULE_0__utils_js__["isSafariBrowser"]() && storage.cookiesAreEnabled();
var userSync = newUserSync({
  config: __WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].getConfig('userSync'),
  browserSupportsCookies: browserSupportsCookies
});
/**
 * @typedef {Object} UserSyncDependencies
 *
 * @property {UserSyncConfig} config
 * @property {boolean} browserSupportsCookies True if the current browser supports cookies, and false otherwise.
 */

/**
 * @typedef {Object} UserSyncConfig
 *
 * @property {boolean} enableOverride
 * @property {boolean} syncEnabled
 * @property {int} syncsPerBidder
 * @property {string[]} enabledBidders
 * @property {Object} filterSettings
 */

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getPriceBucketString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isValidPriceConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_pure_features_array_find_js__);


var utils = __webpack_require__(0);

var _defaultPrecision = 2;
var _lgPriceConfig = {
  'buckets': [{
    'max': 5,
    'increment': 0.5
  }]
};
var _mgPriceConfig = {
  'buckets': [{
    'max': 20,
    'increment': 0.1
  }]
};
var _hgPriceConfig = {
  'buckets': [{
    'max': 20,
    'increment': 0.01
  }]
};
var _densePriceConfig = {
  'buckets': [{
    'max': 3,
    'increment': 0.01
  }, {
    'max': 8,
    'increment': 0.05
  }, {
    'max': 20,
    'increment': 0.5
  }]
};
var _autoPriceConfig = {
  'buckets': [{
    'max': 5,
    'increment': 0.05
  }, {
    'max': 10,
    'increment': 0.1
  }, {
    'max': 20,
    'increment': 0.5
  }]
};

function getPriceBucketString(cpm, customConfig) {
  var granularityMultiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var cpmFloat = parseFloat(cpm);

  if (isNaN(cpmFloat)) {
    cpmFloat = '';
  }

  return {
    low: cpmFloat === '' ? '' : getCpmStringValue(cpm, _lgPriceConfig, granularityMultiplier),
    med: cpmFloat === '' ? '' : getCpmStringValue(cpm, _mgPriceConfig, granularityMultiplier),
    high: cpmFloat === '' ? '' : getCpmStringValue(cpm, _hgPriceConfig, granularityMultiplier),
    auto: cpmFloat === '' ? '' : getCpmStringValue(cpm, _autoPriceConfig, granularityMultiplier),
    dense: cpmFloat === '' ? '' : getCpmStringValue(cpm, _densePriceConfig, granularityMultiplier),
    custom: cpmFloat === '' ? '' : getCpmStringValue(cpm, customConfig, granularityMultiplier)
  };
}

function getCpmStringValue(cpm, config, granularityMultiplier) {
  var cpmStr = '';

  if (!isValidPriceConfig(config)) {
    return cpmStr;
  }

  var cap = config.buckets.reduce(function (prev, curr) {
    if (prev.max > curr.max) {
      return prev;
    }

    return curr;
  }, {
    'max': 0
  });
  var bucketFloor = 0;
  var bucket = __WEBPACK_IMPORTED_MODULE_0_core_js_pure_features_array_find_js___default()(config.buckets, function (bucket) {
    if (cpm > cap.max * granularityMultiplier) {
      // cpm exceeds cap, just return the cap.
      var precision = bucket.precision;

      if (typeof precision === 'undefined') {
        precision = _defaultPrecision;
      }

      cpmStr = (bucket.max * granularityMultiplier).toFixed(precision);
    } else if (cpm <= bucket.max * granularityMultiplier && cpm >= bucketFloor * granularityMultiplier) {
      bucket.min = bucketFloor;
      return bucket;
    } else {
      bucketFloor = bucket.max;
    }
  });

  if (bucket) {
    cpmStr = getCpmTarget(cpm, bucket, granularityMultiplier);
  }

  return cpmStr;
}

function isValidPriceConfig(config) {
  if (utils.isEmpty(config) || !config.buckets || !Array.isArray(config.buckets)) {
    return false;
  }

  var isValid = true;
  config.buckets.forEach(function (bucket) {
    if (!bucket.max || !bucket.increment) {
      isValid = false;
    }
  });
  return isValid;
}

function getCpmTarget(cpm, bucket, granularityMultiplier) {
  var precision = typeof bucket.precision !== 'undefined' ? bucket.precision : _defaultPrecision;
  var increment = bucket.increment * granularityMultiplier;
  var bucketMin = bucket.min * granularityMultiplier; // start increments at the bucket min and then add bucket min back to arrive at the correct rounding
  // note - we're padding the values to avoid using decimals in the math prior to flooring
  // this is done as JS can return values slightly below the expected mark which would skew the price bucket target
  //   (eg 4.01 / 0.01 = 400.99999999999994)
  // min precison should be 2 to move decimal place over.

  var pow = Math.pow(10, precision + 2);
  var cpmToFloor = (cpm * pow - bucketMin * pow) / (increment * pow);
  var cpmTarget = Math.floor(cpmToFloor) * increment + bucketMin; // force to 10 decimal places to deal with imprecise decimal/binary conversions
  //    (for example 0.1 * 3 = 0.30000000000000004)

  cpmTarget = Number(cpmTarget.toFixed(10));
  return cpmTarget.toFixed(precision);
}



/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(467);

module.exports = parent;


/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(468);
var path = __webpack_require__(42);

module.exports = path.Number.isInteger;


/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(14);
var isInteger = __webpack_require__(469);

// `Number.isInteger` method
// https://tc39.github.io/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isInteger
});


/***/ }),

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);

var floor = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.github.io/ecma262/#sec-number.isinteger
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(70);
var requireObjectCoercible = __webpack_require__(49);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 48:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 49:
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = {"JSON_MAPPING":{"PL_CODE":"code","PL_SIZE":"sizes","PL_BIDS":"bids","BD_BIDDER":"bidder","BD_ID":"paramsd","BD_PL_ID":"placementId","ADSERVER_TARGETING":"adserverTargeting","BD_SETTING_STANDARD":"standard"},"DEBUG_MODE":"pbjs_debug","STATUS":{"GOOD":1,"NO_BID":2},"CB":{"TYPE":{"ALL_BIDS_BACK":"allRequestedBidsBack","AD_UNIT_BIDS_BACK":"adUnitBidsBack","BID_WON":"bidWon","REQUEST_BIDS":"requestBids"}},"EVENTS":{"AUCTION_INIT":"auctionInit","AUCTION_END":"auctionEnd","BID_ADJUSTMENT":"bidAdjustment","BID_TIMEOUT":"bidTimeout","BID_REQUESTED":"bidRequested","BID_RESPONSE":"bidResponse","NO_BID":"noBid","BID_WON":"bidWon","BIDDER_DONE":"bidderDone","SET_TARGETING":"setTargeting","BEFORE_REQUEST_BIDS":"beforeRequestBids","REQUEST_BIDS":"requestBids","ADD_AD_UNITS":"addAdUnits","AD_RENDER_FAILED":"adRenderFailed","BIDDER_BLOCKED":"bidderBlocked"},"AD_RENDER_FAILED_REASON":{"PREVENT_WRITING_ON_MAIN_DOCUMENT":"preventWritingOnMainDocuemnt","NO_AD":"noAd","EXCEPTION":"exception","CANNOT_FIND_AD":"cannotFindAd","MISSING_DOC_OR_ADID":"missingDocOrAdid"},"EVENT_ID_PATHS":{"bidWon":"adUnitCode"},"GRANULARITY_OPTIONS":{"LOW":"low","MEDIUM":"medium","HIGH":"high","AUTO":"auto","DENSE":"dense","CUSTOM":"custom"},"TARGETING_KEYS":{"BIDDER":"hb_bidder","AD_ID":"hb_adid","PRICE_BUCKET":"hb_pb","SIZE":"hb_size","DEAL":"hb_deal","SOURCE":"hb_source","FORMAT":"hb_format","UUID":"hb_uuid","CACHE_ID":"hb_cache_id","CACHE_HOST":"hb_cache_host"},"NATIVE_KEYS":{"title":"hb_native_title","body":"hb_native_body","body2":"hb_native_body2","privacyLink":"hb_native_privacy","privacyIcon":"hb_native_privicon","sponsoredBy":"hb_native_brand","image":"hb_native_image","icon":"hb_native_icon","clickUrl":"hb_native_linkurl","displayUrl":"hb_native_displayurl","cta":"hb_native_cta","rating":"hb_native_rating","address":"hb_native_address","downloads":"hb_native_downloads","likes":"hb_native_likes","phone":"hb_native_phone","price":"hb_native_price","salePrice":"hb_native_saleprice"},"S2S":{"SRC":"s2s","DEFAULT_ENDPOINT":"https://prebid.adnxs.com/pbs/v1/openrtb2/auction","SYNCED_BIDDERS_KEY":"pbjsSyncs"},"BID_STATUS":{"BID_TARGETING_SET":"targetingSet","RENDERED":"rendered","BID_REJECTED":"bidRejected"}}

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(58);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 51:
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(25);

module.exports = getBuiltIn;


/***/ }),

/***/ 53:
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(113);
var global = __webpack_require__(22);
var isObject = __webpack_require__(23);
var createNonEnumerableProperty = __webpack_require__(29);
var objectHas = __webpack_require__(24);
var sharedKey = __webpack_require__(65);
var hiddenKeys = __webpack_require__(53);

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(21);
var IndexedObject = __webpack_require__(70);
var toObject = __webpack_require__(57);
var toLength = __webpack_require__(50);
var arraySpeciesCreate = __webpack_require__(101);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(49);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ 59:
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(27);
var fails = __webpack_require__(28);
var has = __webpack_require__(24);

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(62);
var Iterators = __webpack_require__(37);
var wellKnownSymbol = __webpack_require__(19);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(63);
var classofRaw = __webpack_require__(48);
var wellKnownSymbol = __webpack_require__(19);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(19);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(63);
var defineProperty = __webpack_require__(31).f;
var createNonEnumerableProperty = __webpack_require__(29);
var has = __webpack_require__(24);
var toString = __webpack_require__(112);
var wellKnownSymbol = __webpack_require__(19);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!has(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty(target, 'toString', toString);
    }
  }
};


/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(73);
var uid = __webpack_require__(59);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var createIteratorConstructor = __webpack_require__(121);
var getPrototypeOf = __webpack_require__(86);
var setPrototypeOf = __webpack_require__(123);
var setToStringTag = __webpack_require__(64);
var createNonEnumerableProperty = __webpack_require__(29);
var redefine = __webpack_require__(84);
var wellKnownSymbol = __webpack_require__(19);
var IS_PURE = __webpack_require__(16);
var Iterators = __webpack_require__(37);
var IteratorsCore = __webpack_require__(85);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return adunitCounter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);

var adUnits = {};

function ensureAdUnit(adunit, bidderCode) {
  var adUnit = adUnits[adunit] = adUnits[adunit] || {
    bidders: {}
  };

  if (bidderCode) {
    return adUnit.bidders[bidderCode] = adUnit.bidders[bidderCode] || {};
  }

  return adUnit;
}

function incrementAdUnitCount(adunit, counter, bidderCode) {
  var adUnit = ensureAdUnit(adunit, bidderCode);
  adUnit[counter] = (adUnit[counter] || 0) + 1;
  return adUnit[counter];
}
/**
 * Increments and returns current Adunit counter
 * @param {string} adunit id
 * @returns {number} current adunit count
 */


function incrementRequestsCounter(adunit) {
  return incrementAdUnitCount(adunit, 'requestsCounter');
}
/**
 * Increments and returns current Adunit requests counter for a bidder
 * @param {string} adunit id
 * @param {string} bidderCode code
 * @returns {number} current adunit bidder requests count
 */


function incrementBidderRequestsCounter(adunit, bidderCode) {
  return incrementAdUnitCount(adunit, 'requestsCounter', bidderCode);
}
/**
 * Increments and returns current Adunit wins counter for a bidder
 * @param {string} adunit id
 * @param {string} bidderCode code
 * @returns {number} current adunit bidder requests count
 */


function incrementBidderWinsCounter(adunit, bidderCode) {
  return incrementAdUnitCount(adunit, 'winsCounter', bidderCode);
}
/**
 * Returns current Adunit counter
 * @param {string} adunit id
 * @returns {number} current adunit count
 */


function getRequestsCounter(adunit) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(adUnits, "".concat(adunit, ".requestsCounter")) || 0;
}
/**
 * Returns current Adunit requests counter for a specific bidder code
 * @param {string} adunit id
 * @param {string} bidder code
 * @returns {number} current adunit bidder requests count
 */


function getBidderRequestsCounter(adunit, bidder) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(adUnits, "".concat(adunit, ".bidders.").concat(bidder, ".requestsCounter")) || 0;
}
/**
 * Returns current Adunit requests counter for a specific bidder code
 * @param {string} adunit id
 * @param {string} bidder code
 * @returns {number} current adunit bidder requests count
 */


function getBidderWinsCounter(adunit, bidder) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["deepAccess"])(adUnits, "".concat(adunit, ".bidders.").concat(bidder, ".winsCounter")) || 0;
}
/**
 * A module which counts how many times an adunit was called
 * @module adunitCounter
 */


var adunitCounter = {
  incrementRequestsCounter: incrementRequestsCounter,
  incrementBidderRequestsCounter: incrementBidderRequestsCounter,
  incrementBidderWinsCounter: incrementBidderWinsCounter,
  getRequestsCounter: getRequestsCounter,
  getBidderRequestsCounter: getBidderRequestsCounter,
  getBidderWinsCounter: getBidderWinsCounter
};


/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adUnitSetupChecks", function() { return adUnitSetupChecks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkAdUnitSetup", function() { return checkAdUnitSetup; });
/* harmony export (immutable) */ __webpack_exports__["executeStorageCallbacks"] = executeStorageCallbacks;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prebidGlobal_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__secureCreatives_js__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userSync_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__targeting_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__debugging_js__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__adUnits_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__bidfactory_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__storageManager_js__ = __webpack_require__(9);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/** @module pbjs */














var pbjs = Object(__WEBPACK_IMPORTED_MODULE_0__prebidGlobal_js__["a" /* getGlobal */])();

var CONSTANTS = __webpack_require__(5);

var utils = __webpack_require__(0);

var adapterManager = __webpack_require__(7).default;

var events = __webpack_require__(8);

var triggerUserSyncs = __WEBPACK_IMPORTED_MODULE_3__userSync_js__["a" /* userSync */].triggerUserSyncs;
/* private variables */

var _CONSTANTS$EVENTS = CONSTANTS.EVENTS,
    ADD_AD_UNITS = _CONSTANTS$EVENTS.ADD_AD_UNITS,
    BID_WON = _CONSTANTS$EVENTS.BID_WON,
    REQUEST_BIDS = _CONSTANTS$EVENTS.REQUEST_BIDS,
    SET_TARGETING = _CONSTANTS$EVENTS.SET_TARGETING,
    AD_RENDER_FAILED = _CONSTANTS$EVENTS.AD_RENDER_FAILED;
var _CONSTANTS$AD_RENDER_ = CONSTANTS.AD_RENDER_FAILED_REASON,
    PREVENT_WRITING_ON_MAIN_DOCUMENT = _CONSTANTS$AD_RENDER_.PREVENT_WRITING_ON_MAIN_DOCUMENT,
    NO_AD = _CONSTANTS$AD_RENDER_.NO_AD,
    EXCEPTION = _CONSTANTS$AD_RENDER_.EXCEPTION,
    CANNOT_FIND_AD = _CONSTANTS$AD_RENDER_.CANNOT_FIND_AD,
    MISSING_DOC_OR_ADID = _CONSTANTS$AD_RENDER_.MISSING_DOC_OR_ADID;
var eventValidators = {
  bidWon: checkDefinedPlacement
}; // initialize existing debugging sessions if present

Object(__WEBPACK_IMPORTED_MODULE_8__debugging_js__["a" /* sessionLoader */])();
/* Public vars */

pbjs.bidderSettings = pbjs.bidderSettings || {}; // let the world know we are loaded

pbjs.libLoaded = true; // version auto generated from build

pbjs.version = "v4.2.0";
utils.logInfo("Prebid.js v4.2.0 loaded"); // create adUnit array

pbjs.adUnits = pbjs.adUnits || []; // Allow publishers who enable user sync override to trigger their sync

pbjs.triggerUserSyncs = triggerUserSyncs;

function checkDefinedPlacement(id) {
  var adUnitCodes = __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].getBidsRequested().map(function (bidSet) {
    return bidSet.bids.map(function (bid) {
      return bid.adUnitCode;
    });
  }).reduce(__WEBPACK_IMPORTED_MODULE_1__utils_js__["flatten"]).filter(__WEBPACK_IMPORTED_MODULE_1__utils_js__["uniques"]);

  if (!utils.contains(adUnitCodes, id)) {
    utils.logError('The "' + id + '" placement is not defined.');
    return;
  }

  return true;
}

function setRenderSize(doc, width, height) {
  if (doc.defaultView && doc.defaultView.frameElement) {
    doc.defaultView.frameElement.width = width;
    doc.defaultView.frameElement.height = height;
  }
}

function validateSizes(sizes, targLength) {
  var cleanSizes = [];

  if (utils.isArray(sizes) && (targLength ? sizes.length === targLength : sizes.length > 0)) {
    // check if an array of arrays or array of numbers
    if (sizes.every(function (sz) {
      return Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["isArrayOfNums"])(sz, 2);
    })) {
      cleanSizes = sizes;
    } else if (Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["isArrayOfNums"])(sizes, 2)) {
      cleanSizes.push(sizes);
    }
  }

  return cleanSizes;
}

function validateBannerMediaType(adUnit) {
  var validatedAdUnit = utils.deepClone(adUnit);
  var banner = validatedAdUnit.mediaTypes.banner;
  var bannerSizes = validateSizes(banner.sizes);

  if (bannerSizes.length > 0) {
    banner.sizes = bannerSizes; // Deprecation Warning: This property will be deprecated in next release in favor of adUnit.mediaTypes.banner.sizes

    validatedAdUnit.sizes = bannerSizes;
  } else {
    utils.logError('Detected a mediaTypes.banner object without a proper sizes field.  Please ensure the sizes are listed like: [[300, 250], ...].  Removing invalid mediaTypes.banner object from request.');
    delete validatedAdUnit.mediaTypes.banner;
  }

  return validatedAdUnit;
}

function validateVideoMediaType(adUnit) {
  var validatedAdUnit = utils.deepClone(adUnit);
  var video = validatedAdUnit.mediaTypes.video;

  if (video.playerSize) {
    var tarPlayerSizeLen = typeof video.playerSize[0] === 'number' ? 2 : 1;
    var videoSizes = validateSizes(video.playerSize, tarPlayerSizeLen);

    if (videoSizes.length > 0) {
      if (tarPlayerSizeLen === 2) {
        utils.logInfo('Transforming video.playerSize from [640,480] to [[640,480]] so it\'s in the proper format.');
      }

      video.playerSize = videoSizes; // Deprecation Warning: This property will be deprecated in next release in favor of adUnit.mediaTypes.video.playerSize

      validatedAdUnit.sizes = videoSizes;
    } else {
      utils.logError('Detected incorrect configuration of mediaTypes.video.playerSize.  Please specify only one set of dimensions in a format like: [[640, 480]]. Removing invalid mediaTypes.video.playerSize property from request.');
      delete validatedAdUnit.mediaTypes.video.playerSize;
    }
  }

  return validatedAdUnit;
}

function validateNativeMediaType(adUnit) {
  var validatedAdUnit = utils.deepClone(adUnit);
  var native = validatedAdUnit.mediaTypes.native;

  if (native.image && native.image.sizes && !Array.isArray(native.image.sizes)) {
    utils.logError('Please use an array of sizes for native.image.sizes field.  Removing invalid mediaTypes.native.image.sizes property from request.');
    delete validatedAdUnit.mediaTypes.native.image.sizes;
  }

  if (native.image && native.image.aspect_ratios && !Array.isArray(native.image.aspect_ratios)) {
    utils.logError('Please use an array of sizes for native.image.aspect_ratios field.  Removing invalid mediaTypes.native.image.aspect_ratios property from request.');
    delete validatedAdUnit.mediaTypes.native.image.aspect_ratios;
  }

  if (native.icon && native.icon.sizes && !Array.isArray(native.icon.sizes)) {
    utils.logError('Please use an array of sizes for native.icon.sizes field.  Removing invalid mediaTypes.native.icon.sizes property from request.');
    delete validatedAdUnit.mediaTypes.native.icon.sizes;
  }

  return validatedAdUnit;
}

var adUnitSetupChecks = {
  validateBannerMediaType: validateBannerMediaType,
  validateVideoMediaType: validateVideoMediaType,
  validateNativeMediaType: validateNativeMediaType,
  validateSizes: validateSizes
};
var checkAdUnitSetup = Object(__WEBPACK_IMPORTED_MODULE_7__hook_js__["b" /* hook */])('sync', function (adUnits) {
  var validatedAdUnits = [];
  adUnits.forEach(function (adUnit) {
    var mediaTypes = adUnit.mediaTypes;
    var validatedBanner, validatedVideo, validatedNative;

    if (!mediaTypes || Object.keys(mediaTypes).length === 0) {
      utils.logError("Detected adUnit.code '".concat(adUnit.code, "' did not have a 'mediaTypes' object defined.  This is a required field for the auction, so this adUnit has been removed."));
      return;
    }

    if (mediaTypes.banner) {
      validatedBanner = validateBannerMediaType(adUnit);
    }

    if (mediaTypes.video) {
      validatedVideo = validatedBanner ? validateVideoMediaType(validatedBanner) : validateVideoMediaType(adUnit);
    }

    if (mediaTypes.native) {
      validatedNative = validatedVideo ? validateNativeMediaType(validatedVideo) : validatedBanner ? validateNativeMediaType(validatedBanner) : validateNativeMediaType(adUnit);
    }

    var validatedAdUnit = _extends({}, validatedBanner, validatedVideo, validatedNative);

    validatedAdUnits.push(validatedAdUnit);
  });
  return validatedAdUnits;
}, 'checkAdUnitSetup'); /// ///////////////////////////////
//                              //
//    Start Public APIs         //
//                              //
/// ///////////////////////////////

/**
 * This function returns the query string targeting parameters available at this moment for a given ad unit. Note that some bidder's response may not have been received if you call this function too quickly after the requests are sent.
 * @param  {string} [adunitCode] adUnitCode to get the bid responses for
 * @alias module:pbjs.getAdserverTargetingForAdUnitCodeStr
 * @return {Array}  returnObj return bids array
 */

pbjs.getAdserverTargetingForAdUnitCodeStr = function (adunitCode) {
  utils.logInfo("Invoking pbjs.getAdserverTargetingForAdUnitCodeStr", arguments); // call to retrieve bids array

  if (adunitCode) {
    var res = pbjs.getAdserverTargetingForAdUnitCode(adunitCode);
    return utils.transformAdServerTargetingObj(res);
  } else {
    utils.logMessage('Need to call getAdserverTargetingForAdUnitCodeStr with adunitCode');
  }
};
/**
 * This function returns the query string targeting parameters available at this moment for a given ad unit. Note that some bidder's response may not have been received if you call this function too quickly after the requests are sent.
 * @param adUnitCode {string} adUnitCode to get the bid responses for
 * @alias module:pbjs.getAdserverTargetingForAdUnitCode
 * @returns {Object}  returnObj return bids
 */


pbjs.getAdserverTargetingForAdUnitCode = function (adUnitCode) {
  return pbjs.getAdserverTargeting(adUnitCode)[adUnitCode];
};
/**
 * returns all ad server targeting for all ad units
 * @return {Object} Map of adUnitCodes and targeting values []
 * @alias module:pbjs.getAdserverTargeting
 */


pbjs.getAdserverTargeting = function (adUnitCode) {
  utils.logInfo("Invoking pbjs.getAdserverTargeting", arguments);
  return __WEBPACK_IMPORTED_MODULE_6__targeting_js__["a" /* targeting */].getAllTargeting(adUnitCode);
};

function getBids(type) {
  var responses = __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */][type]().filter(utils.bind.call(__WEBPACK_IMPORTED_MODULE_1__utils_js__["adUnitsFilter"], this, __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].getAdUnitCodes())); // find the last auction id to get responses for most recent auction only

  var currentAuctionId = __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].getLastAuctionId();
  return responses.map(function (bid) {
    return bid.adUnitCode;
  }).filter(__WEBPACK_IMPORTED_MODULE_1__utils_js__["uniques"]).map(function (adUnitCode) {
    return responses.filter(function (bid) {
      return bid.auctionId === currentAuctionId && bid.adUnitCode === adUnitCode;
    });
  }).filter(function (bids) {
    return bids && bids[0] && bids[0].adUnitCode;
  }).map(function (bids) {
    return _defineProperty({}, bids[0].adUnitCode, {
      bids: bids
    });
  }).reduce(function (a, b) {
    return _extends(a, b);
  }, {});
}
/**
 * This function returns the bids requests involved in an auction but not bid on
 * @alias module:pbjs.getNoBids
 * @return {Object}            map | object that contains the bidRequests
 */


pbjs.getNoBids = function () {
  utils.logInfo("Invoking pbjs.getNoBids", arguments);
  return getBids('getNoBids');
};
/**
 * This function returns the bid responses at the given moment.
 * @alias module:pbjs.getBidResponses
 * @return {Object}            map | object that contains the bidResponses
 */


pbjs.getBidResponses = function () {
  utils.logInfo("Invoking pbjs.getBidResponses", arguments);
  return getBids('getBidsReceived');
};
/**
 * Returns bidResponses for the specified adUnitCode
 * @param  {string} adUnitCode adUnitCode
 * @alias module:pbjs.getBidResponsesForAdUnitCode
 * @return {Object}            bidResponse object
 */


pbjs.getBidResponsesForAdUnitCode = function (adUnitCode) {
  var bids = __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].getBidsReceived().filter(function (bid) {
    return bid.adUnitCode === adUnitCode;
  });
  return {
    bids: bids
  };
};
/**
 * Set query string targeting on one or more GPT ad units.
 * @param {(string|string[])} adUnit a single `adUnit.code` or multiple.
 * @param {function(object)} customSlotMatching gets a GoogleTag slot and returns a filter function for adUnitCode, so you can decide to match on either eg. return slot => { return adUnitCode => { return slot.getSlotElementId() === 'myFavoriteDivId'; } };
 * @alias module:pbjs.setTargetingForGPTAsync
 */


pbjs.setTargetingForGPTAsync = function (adUnit, customSlotMatching) {
  utils.logInfo("Invoking pbjs.setTargetingForGPTAsync", arguments);

  if (!Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["isGptPubadsDefined"])()) {
    utils.logError('window.googletag is not defined on the page');
    return;
  } // get our ad unit codes


  var targetingSet = __WEBPACK_IMPORTED_MODULE_6__targeting_js__["a" /* targeting */].getAllTargeting(adUnit); // first reset any old targeting

  __WEBPACK_IMPORTED_MODULE_6__targeting_js__["a" /* targeting */].resetPresetTargeting(adUnit, customSlotMatching); // now set new targeting keys

  __WEBPACK_IMPORTED_MODULE_6__targeting_js__["a" /* targeting */].setTargetingForGPT(targetingSet, customSlotMatching);
  Object.keys(targetingSet).forEach(function (adUnitCode) {
    Object.keys(targetingSet[adUnitCode]).forEach(function (targetingKey) {
      if (targetingKey === 'hb_adid') {
        __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].setStatusForBids(targetingSet[adUnitCode][targetingKey], CONSTANTS.BID_STATUS.BID_TARGETING_SET);
      }
    });
  }); // emit event

  events.emit(SET_TARGETING, targetingSet);
};
/**
 * Set query string targeting on all AST (AppNexus Seller Tag) ad units. Note that this function has to be called after all ad units on page are defined. For working example code, see [Using Prebid.js with AppNexus Publisher Ad Server](http://prebid.org/dev-docs/examples/use-prebid-with-appnexus-ad-server.html).
 * @param  {(string|string[])} adUnitCode adUnitCode or array of adUnitCodes
 * @alias module:pbjs.setTargetingForAst
 */


pbjs.setTargetingForAst = function (adUnitCodes) {
  utils.logInfo("Invoking pbjs.setTargetingForAn", arguments);

  if (!__WEBPACK_IMPORTED_MODULE_6__targeting_js__["a" /* targeting */].isApntagDefined()) {
    utils.logError('window.apntag is not defined on the page');
    return;
  }

  __WEBPACK_IMPORTED_MODULE_6__targeting_js__["a" /* targeting */].setTargetingForAst(adUnitCodes); // emit event

  events.emit(SET_TARGETING, __WEBPACK_IMPORTED_MODULE_6__targeting_js__["a" /* targeting */].getAllTargeting());
};

function emitAdRenderFail(_ref2) {
  var reason = _ref2.reason,
      message = _ref2.message,
      bid = _ref2.bid,
      id = _ref2.id;
  var data = {
    reason: reason,
    message: message
  };
  if (bid) data.bid = bid;
  if (id) data.adId = id;
  utils.logError(message);
  events.emit(AD_RENDER_FAILED, data);
}
/**
 * This function will render the ad (based on params) in the given iframe document passed through.
 * Note that doc SHOULD NOT be the parent document page as we can't doc.write() asynchronously
 * @param  {HTMLDocument} doc document
 * @param  {string} id bid id to locate the ad
 * @alias module:pbjs.renderAd
 */


pbjs.renderAd = function (doc, id) {
  utils.logInfo("Invoking pbjs.renderAd", arguments);
  utils.logMessage('Calling renderAd with adId :' + id);

  if (doc && id) {
    try {
      // lookup ad by ad Id
      var bid = __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].findBidByAdId(id);

      if (bid) {
        // replace macros according to openRTB with price paid = bid.cpm
        bid.ad = utils.replaceAuctionPrice(bid.ad, bid.cpm);
        bid.adUrl = utils.replaceAuctionPrice(bid.adUrl, bid.cpm); // save winning bids

        __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].addWinningBid(bid); // emit 'bid won' event here

        events.emit(BID_WON, bid);
        var height = bid.height,
            width = bid.width,
            ad = bid.ad,
            mediaType = bid.mediaType,
            adUrl = bid.adUrl,
            renderer = bid.renderer;
        var creativeComment = document.createComment("Creative ".concat(bid.creativeId, " served by ").concat(bid.bidder, " Prebid.js Header Bidding"));
        utils.insertElement(creativeComment, doc, 'body');

        if (Object(__WEBPACK_IMPORTED_MODULE_11__Renderer_js__["c" /* isRendererRequired */])(renderer)) {
          Object(__WEBPACK_IMPORTED_MODULE_11__Renderer_js__["b" /* executeRenderer */])(renderer, bid);
        } else if (doc === document && !utils.inIframe() || mediaType === 'video') {
          var message = "Error trying to write ad. Ad render call ad id ".concat(id, " was prevented from writing to the main document.");
          emitAdRenderFail({
            reason: PREVENT_WRITING_ON_MAIN_DOCUMENT,
            message: message,
            bid: bid,
            id: id
          });
        } else if (ad) {
          // will check if browser is firefox and below version 67, if so execute special doc.open()
          // for details see: https://github.com/prebid/Prebid.js/pull/3524
          // TODO remove this browser specific code at later date (when Firefox < 67 usage is mostly gone)
          if (navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('firefox/') > -1) {
            var firefoxVerRegx = /firefox\/([\d\.]+)/;
            var firefoxVer = navigator.userAgent.toLowerCase().match(firefoxVerRegx)[1]; // grabs the text in the 1st matching group

            if (firefoxVer && parseInt(firefoxVer, 10) < 67) {
              doc.open('text/html', 'replace');
            }
          }

          doc.write(ad);
          doc.close();
          setRenderSize(doc, width, height);
          utils.callBurl(bid);
        } else if (adUrl) {
          var iframe = utils.createInvisibleIframe();
          iframe.height = height;
          iframe.width = width;
          iframe.style.display = 'inline';
          iframe.style.overflow = 'hidden';
          iframe.src = adUrl;
          utils.insertElement(iframe, doc, 'body');
          setRenderSize(doc, width, height);
          utils.callBurl(bid);
        } else {
          var _message = "Error trying to write ad. No ad for bid response id: ".concat(id);

          emitAdRenderFail({
            reason: NO_AD,
            message: _message,
            bid: bid,
            id: id
          });
        }
      } else {
        var _message2 = "Error trying to write ad. Cannot find ad by given id : ".concat(id);

        emitAdRenderFail({
          reason: CANNOT_FIND_AD,
          message: _message2,
          id: id
        });
      }
    } catch (e) {
      var _message3 = "Error trying to write ad Id :".concat(id, " to the page:").concat(e.message);

      emitAdRenderFail({
        reason: EXCEPTION,
        message: _message3,
        id: id
      });
    }
  } else {
    var _message4 = "Error trying to write ad Id :".concat(id, " to the page. Missing document or adId");

    emitAdRenderFail({
      reason: MISSING_DOC_OR_ADID,
      message: _message4,
      id: id
    });
  }
};
/**
 * Remove adUnit from the $$PREBID_GLOBAL$$ configuration, if there are no addUnitCode(s) it will remove all
 * @param  {string| Array} adUnitCode the adUnitCode(s) to remove
 * @alias module:pbjs.removeAdUnit
 */


pbjs.removeAdUnit = function (adUnitCode) {
  utils.logInfo("Invoking pbjs.removeAdUnit", arguments);

  if (!adUnitCode) {
    pbjs.adUnits = [];
    return;
  }

  var adUnitCodes;

  if (utils.isArray(adUnitCode)) {
    adUnitCodes = adUnitCode;
  } else {
    adUnitCodes = [adUnitCode];
  }

  adUnitCodes.forEach(function (adUnitCode) {
    for (var i = pbjs.adUnits.length - 1; i >= 0; i--) {
      if (pbjs.adUnits[i].code === adUnitCode) {
        pbjs.adUnits.splice(i, 1);
      }
    }
  });
};
/**
 * @param {Object} requestOptions
 * @param {function} requestOptions.bidsBackHandler
 * @param {number} requestOptions.timeout
 * @param {Array} requestOptions.adUnits
 * @param {Array} requestOptions.adUnitCodes
 * @param {Array} requestOptions.labels
 * @param {String} requestOptions.auctionId
 * @alias module:pbjs.requestBids
 */


pbjs.requestBids = Object(__WEBPACK_IMPORTED_MODULE_7__hook_js__["b" /* hook */])('async', function () {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      bidsBackHandler = _ref3.bidsBackHandler,
      timeout = _ref3.timeout,
      adUnits = _ref3.adUnits,
      adUnitCodes = _ref3.adUnitCodes,
      labels = _ref3.labels,
      auctionId = _ref3.auctionId;

  events.emit(REQUEST_BIDS);
  var cbTimeout = timeout || __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* config */].getConfig('bidderTimeout');
  adUnits = adUnits || pbjs.adUnits;
  utils.logInfo("Invoking pbjs.requestBids", arguments);
  adUnits = checkAdUnitSetup(adUnits);

  if (adUnitCodes && adUnitCodes.length) {
    // if specific adUnitCodes supplied filter adUnits for those codes
    adUnits = adUnits.filter(function (unit) {
      return __WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_includes_js___default()(adUnitCodes, unit.code);
    });
  } else {
    // otherwise derive adUnitCodes from adUnits
    adUnitCodes = adUnits && adUnits.map(function (unit) {
      return unit.code;
    });
  }
  /*
   * for a given adunit which supports a set of mediaTypes
   * and a given bidder which supports a set of mediaTypes
   * a bidder is eligible to participate on the adunit
   * if it supports at least one of the mediaTypes on the adunit
   */


  adUnits.forEach(function (adUnit) {
    // get the adunit's mediaTypes, defaulting to banner if mediaTypes isn't present
    var adUnitMediaTypes = Object.keys(adUnit.mediaTypes || {
      'banner': 'banner'
    }); // get the bidder's mediaTypes

    var allBidders = adUnit.bids.map(function (bid) {
      return bid.bidder;
    });
    var bidderRegistry = adapterManager.bidderRegistry;
    var s2sConfig = __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* config */].getConfig('s2sConfig');
    var s2sBidders = s2sConfig && s2sConfig.bidders;
    var bidders = s2sBidders ? allBidders.filter(function (bidder) {
      return !__WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_includes_js___default()(s2sBidders, bidder);
    }) : allBidders;
    adUnit.transactionId = utils.generateUUID();
    bidders.forEach(function (bidder) {
      var adapter = bidderRegistry[bidder];
      var spec = adapter && adapter.getSpec && adapter.getSpec(); // banner is default if not specified in spec

      var bidderMediaTypes = spec && spec.supportedMediaTypes || ['banner']; // check if the bidder's mediaTypes are not in the adUnit's mediaTypes

      var bidderEligible = adUnitMediaTypes.some(function (type) {
        return __WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_includes_js___default()(bidderMediaTypes, type);
      });

      if (!bidderEligible) {
        // drop the bidder from the ad unit if it's not compatible
        utils.logWarn(utils.unsupportedBidderMessage(adUnit, bidder));
        adUnit.bids = adUnit.bids.filter(function (bid) {
          return bid.bidder !== bidder;
        });
      } else {
        __WEBPACK_IMPORTED_MODULE_10__adUnits_js__["a" /* adunitCounter */].incrementBidderRequestsCounter(adUnit.code, bidder);
      }
    });
    __WEBPACK_IMPORTED_MODULE_10__adUnits_js__["a" /* adunitCounter */].incrementRequestsCounter(adUnit.code);
  });

  if (!adUnits || adUnits.length === 0) {
    utils.logMessage('No adUnits configured. No bids requested.');

    if (typeof bidsBackHandler === 'function') {
      // executeCallback, this will only be called in case of first request
      try {
        bidsBackHandler();
      } catch (e) {
        utils.logError('Error executing bidsBackHandler', null, e);
      }
    }

    return;
  }

  var auction = __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].createAuction({
    adUnits: adUnits,
    adUnitCodes: adUnitCodes,
    callback: bidsBackHandler,
    cbTimeout: cbTimeout,
    labels: labels,
    auctionId: auctionId
  });
  var adUnitsLen = adUnits.length;

  if (adUnitsLen > 15) {
    utils.logInfo("Current auction ".concat(auction.getAuctionId(), " contains ").concat(adUnitsLen, " adUnits."), adUnits);
  }

  adUnitCodes.forEach(function (code) {
    return __WEBPACK_IMPORTED_MODULE_6__targeting_js__["a" /* targeting */].setLatestAuctionForAdUnit(code, auction.getAuctionId());
  });
  auction.callBids();
});
function executeStorageCallbacks(fn, reqBidsConfigObj) {
  runAll(__WEBPACK_IMPORTED_MODULE_13__storageManager_js__["c" /* storageCallbacks */]);
  fn.call(this, reqBidsConfigObj);

  function runAll(queue) {
    var queued;

    while (queued = queue.shift()) {
      queued();
    }
  }
} // This hook will execute all storage callbacks which were registered before gdpr enforcement hook was added. Some bidders, user id modules use storage functions when module is parsed but gdpr enforcement hook is not added at that stage as setConfig callbacks are yet to be called. Hence for such calls we execute all the stored callbacks just before requestBids. At this hook point we will know for sure that gdprEnforcement module is added or not

pbjs.requestBids.before(executeStorageCallbacks, 49);
/**
 *
 * Add adunit(s)
 * @param {Array|Object} adUnitArr Array of adUnits or single adUnit Object.
 * @alias module:pbjs.addAdUnits
 */

pbjs.addAdUnits = function (adUnitArr) {
  utils.logInfo("Invoking pbjs.addAdUnits", arguments);

  if (utils.isArray(adUnitArr)) {
    pbjs.adUnits.push.apply(pbjs.adUnits, adUnitArr);
  } else if (_typeof(adUnitArr) === 'object') {
    pbjs.adUnits.push(adUnitArr);
  } // emit event


  events.emit(ADD_AD_UNITS);
};
/**
 * @param {string} event the name of the event
 * @param {Function} handler a callback to set on event
 * @param {string} id an identifier in the context of the event
 * @alias module:pbjs.onEvent
 *
 * This API call allows you to register a callback to handle a Prebid.js event.
 * An optional `id` parameter provides more finely-grained event callback registration.
 * This makes it possible to register callback events for a specific item in the
 * event context. For example, `bidWon` events will accept an `id` for ad unit code.
 * `bidWon` callbacks registered with an ad unit code id will be called when a bid
 * for that ad unit code wins the auction. Without an `id` this method registers the
 * callback for every `bidWon` event.
 *
 * Currently `bidWon` is the only event that accepts an `id` parameter.
 */


pbjs.onEvent = function (event, handler, id) {
  utils.logInfo("Invoking pbjs.onEvent", arguments);

  if (!utils.isFn(handler)) {
    utils.logError('The event handler provided is not a function and was not set on event "' + event + '".');
    return;
  }

  if (id && !eventValidators[event].call(null, id)) {
    utils.logError('The id provided is not valid for event "' + event + '" and no handler was set.');
    return;
  }

  events.on(event, handler, id);
};
/**
 * @param {string} event the name of the event
 * @param {Function} handler a callback to remove from the event
 * @param {string} id an identifier in the context of the event (see `$$PREBID_GLOBAL$$.onEvent`)
 * @alias module:pbjs.offEvent
 */


pbjs.offEvent = function (event, handler, id) {
  utils.logInfo("Invoking pbjs.offEvent", arguments);

  if (id && !eventValidators[event].call(null, id)) {
    return;
  }

  events.off(event, handler, id);
};
/*
 * Wrapper to register bidderAdapter externally (adapterManager.registerBidAdapter())
 * @param  {Function} bidderAdaptor [description]
 * @param  {string} bidderCode [description]
 * @alias module:pbjs.registerBidAdapter
 */


pbjs.registerBidAdapter = function (bidderAdaptor, bidderCode) {
  utils.logInfo("Invoking pbjs.registerBidAdapter", arguments);

  try {
    adapterManager.registerBidAdapter(bidderAdaptor(), bidderCode);
  } catch (e) {
    utils.logError('Error registering bidder adapter : ' + e.message);
  }
};
/**
 * Wrapper to register analyticsAdapter externally (adapterManager.registerAnalyticsAdapter())
 * @param  {Object} options [description]
 * @alias module:pbjs.registerAnalyticsAdapter
 */


pbjs.registerAnalyticsAdapter = function (options) {
  utils.logInfo("Invoking pbjs.registerAnalyticsAdapter", arguments);

  try {
    adapterManager.registerAnalyticsAdapter(options);
  } catch (e) {
    utils.logError('Error registering analytics adapter : ' + e.message);
  }
};
/**
 * Wrapper to bidfactory.createBid()
 * @param  {string} statusCode [description]
 * @alias module:pbjs.createBid
 * @return {Object} bidResponse [description]
 */


pbjs.createBid = function (statusCode) {
  utils.logInfo("Invoking pbjs.createBid", arguments);
  return Object(__WEBPACK_IMPORTED_MODULE_12__bidfactory_js__["a" /* createBid */])(statusCode);
};
/**
 * Enable sending analytics data to the analytics provider of your
 * choice.
 *
 * For usage, see [Integrate with the Prebid Analytics
 * API](http://prebid.org/dev-docs/integrate-with-the-prebid-analytics-api.html).
 *
 * For a list of analytics adapters, see [Analytics for
 * Prebid](http://prebid.org/overview/analytics.html).
 * @param  {Object} config
 * @param {string} config.provider The name of the provider, e.g., `"ga"` for Google Analytics.
 * @param {Object} config.options The options for this particular analytics adapter.  This will likely vary between adapters.
 * @alias module:pbjs.enableAnalytics
 */


pbjs.enableAnalytics = function (config) {
  if (config && !utils.isEmpty(config)) {
    utils.logInfo("Invoking pbjs.enableAnalytics for: ", config);
    adapterManager.enableAnalytics(config);
  } else {
    utils.logError("pbjs.enableAnalytics should be called with option {}");
  }
};
/**
 * @alias module:pbjs.aliasBidder
 */


pbjs.aliasBidder = function (bidderCode, alias, options) {
  utils.logInfo("Invoking pbjs.aliasBidder", arguments);

  if (bidderCode && alias) {
    adapterManager.aliasBidAdapter(bidderCode, alias, options);
  } else {
    utils.logError('bidderCode and alias must be passed as arguments', "pbjs.aliasBidder");
  }
};
/**
 * The bid response object returned by an external bidder adapter during the auction.
 * @typedef {Object} AdapterBidResponse
 * @property {string} pbAg Auto granularity price bucket; CPM <= 5 ? increment = 0.05 : CPM > 5 && CPM <= 10 ? increment = 0.10 : CPM > 10 && CPM <= 20 ? increment = 0.50 : CPM > 20 ? priceCap = 20.00.  Example: `"0.80"`.
 * @property {string} pbCg Custom price bucket.  For example setup, see {@link setPriceGranularity}.  Example: `"0.84"`.
 * @property {string} pbDg Dense granularity price bucket; CPM <= 3 ? increment = 0.01 : CPM > 3 && CPM <= 8 ? increment = 0.05 : CPM > 8 && CPM <= 20 ? increment = 0.50 : CPM > 20? priceCap = 20.00.  Example: `"0.84"`.
 * @property {string} pbLg Low granularity price bucket; $0.50 increment, capped at $5, floored to two decimal places.  Example: `"0.50"`.
 * @property {string} pbMg Medium granularity price bucket; $0.10 increment, capped at $20, floored to two decimal places.  Example: `"0.80"`.
 * @property {string} pbHg High granularity price bucket; $0.01 increment, capped at $20, floored to two decimal places.  Example: `"0.84"`.
 *
 * @property {string} bidder The string name of the bidder.  This *may* be the same as the `bidderCode`.  For For a list of all bidders and their codes, see [Bidders' Params](http://prebid.org/dev-docs/bidders.html).
 * @property {string} bidderCode The unique string that identifies this bidder.  For a list of all bidders and their codes, see [Bidders' Params](http://prebid.org/dev-docs/bidders.html).
 *
 * @property {string} requestId The [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) representing the bid request.
 * @property {number} requestTimestamp The time at which the bid request was sent out, expressed in milliseconds.
 * @property {number} responseTimestamp The time at which the bid response was received, expressed in milliseconds.
 * @property {number} timeToRespond How long it took for the bidder to respond with this bid, expressed in milliseconds.
 *
 * @property {string} size The size of the ad creative, expressed in `"AxB"` format, where A and B are numbers of pixels.  Example: `"320x50"`.
 * @property {string} width The width of the ad creative in pixels.  Example: `"320"`.
 * @property {string} height The height of the ad creative in pixels.  Example: `"50"`.
 *
 * @property {string} ad The actual ad creative content, often HTML with CSS, JavaScript, and/or links to additional content.  Example: `"<div id='beacon_-YQbipJtdxmMCgEPHExLhmqzEm' style='position: absolute; left: 0px; top: 0px; visibility: hidden;'><img src='http://aplus-...'/></div><iframe src=\"http://aax-us-east.amazon-adsystem.com/e/is/8dcfcd..." width=\"728\" height=\"90\" frameborder=\"0\" ...></iframe>",`.
 * @property {number} ad_id The ad ID of the creative, as understood by the bidder's system.  Used by the line item's [creative in the ad server](http://prebid.org/adops/send-all-bids-adops.html#step-3-add-a-creative).
 * @property {string} adUnitCode The code used to uniquely identify the ad unit on the publisher's page.
 *
 * @property {string} statusMessage The status of the bid.  Allowed values: `"Bid available"` or `"Bid returned empty or error response"`.
 * @property {number} cpm The exact bid price from the bidder, expressed to the thousandths place.  Example: `"0.849"`.
 *
 * @property {Object} adserverTargeting An object whose values represent the ad server's targeting on the bid.
 * @property {string} adserverTargeting.hb_adid The ad ID of the creative, as understood by the ad server.
 * @property {string} adserverTargeting.hb_pb The price paid to show the creative, as logged in the ad server.
 * @property {string} adserverTargeting.hb_bidder The winning bidder whose ad creative will be served by the ad server.
*/

/**
 * Get all of the bids that have been rendered.  Useful for [troubleshooting your integration](http://prebid.org/dev-docs/prebid-troubleshooting-guide.html).
 * @return {Array<AdapterBidResponse>} A list of bids that have been rendered.
*/


pbjs.getAllWinningBids = function () {
  return __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].getAllWinningBids();
};
/**
 * Get all of the bids that have won their respective auctions.
 * @return {Array<AdapterBidResponse>} A list of bids that have won their respective auctions.
 */


pbjs.getAllPrebidWinningBids = function () {
  return __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].getBidsReceived().filter(function (bid) {
    return bid.status === CONSTANTS.BID_STATUS.BID_TARGETING_SET;
  });
};
/**
 * Get array of highest cpm bids for all adUnits, or highest cpm bid
 * object for the given adUnit
 * @param {string} adUnitCode - optional ad unit code
 * @alias module:pbjs.getHighestCpmBids
 * @return {Array} array containing highest cpm bid object(s)
 */


pbjs.getHighestCpmBids = function (adUnitCode) {
  return __WEBPACK_IMPORTED_MODULE_6__targeting_js__["a" /* targeting */].getWinningBids(adUnitCode);
};
/**
 * Mark the winning bid as used, should only be used in conjunction with video
 * @typedef {Object} MarkBidRequest
 * @property {string} adUnitCode The ad unit code
 * @property {string} adId The id representing the ad we want to mark
 *
 * @alias module:pbjs.markWinningBidAsUsed
*/


pbjs.markWinningBidAsUsed = function (markBidRequest) {
  var bids = [];

  if (markBidRequest.adUnitCode && markBidRequest.adId) {
    bids = __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].getBidsReceived().filter(function (bid) {
      return bid.adId === markBidRequest.adId && bid.adUnitCode === markBidRequest.adUnitCode;
    });
  } else if (markBidRequest.adUnitCode) {
    bids = __WEBPACK_IMPORTED_MODULE_6__targeting_js__["a" /* targeting */].getWinningBids(markBidRequest.adUnitCode);
  } else if (markBidRequest.adId) {
    bids = __WEBPACK_IMPORTED_MODULE_5__auctionManager_js__["a" /* auctionManager */].getBidsReceived().filter(function (bid) {
      return bid.adId === markBidRequest.adId;
    });
  } else {
    utils.logWarn('Inproper usage of markWinningBidAsUsed. It\'ll need an adUnitCode and/or adId to function.');
  }

  if (bids.length > 0) {
    bids[0].status = CONSTANTS.BID_STATUS.RENDERED;
  }
};
/**
 * Get Prebid config options
 * @param {Object} options
 * @alias module:pbjs.getConfig
 */


pbjs.getConfig = __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* config */].getConfig;
/**
 * Set Prebid config options.
 * (Added in version 0.27.0).
 *
 * `setConfig` is designed to allow for advanced configuration while
 * reducing the surface area of the public API.  For more information
 * about the move to `setConfig` (and the resulting deprecations of
 * some other public methods), see [the Prebid 1.0 public API
 * proposal](https://gist.github.com/mkendall07/51ee5f6b9f2df01a89162cf6de7fe5b6).
 *
 * #### Troubleshooting your configuration
 *
 * If you call `pbjs.setConfig` without an object, e.g.,
 *
 * `pbjs.setConfig('debug', 'true'))`
 *
 * then Prebid.js will print an error to the console that says:
 *
 * ```
 * ERROR: setConfig options must be an object
 * ```
 *
 * If you don't see that message, you can assume the config object is valid.
 *
 * @param {Object} options Global Prebid configuration object. Must be JSON - no JavaScript functions are allowed.
 * @param {string} options.bidderSequence The order in which bidders are called.  Example: `pbjs.setConfig({ bidderSequence: "fixed" })`.  Allowed values: `"fixed"` (order defined in `adUnit.bids` array on page), `"random"`.
 * @param {boolean} options.debug Turn debug logging on/off. Example: `pbjs.setConfig({ debug: true })`.
 * @param {string} options.priceGranularity The bid price granularity to use.  Example: `pbjs.setConfig({ priceGranularity: "medium" })`. Allowed values: `"low"` ($0.50), `"medium"` ($0.10), `"high"` ($0.01), `"auto"` (sliding scale), `"dense"` (like `"auto"`, with smaller increments at lower CPMs), or a custom price bucket object, e.g., `{ "buckets" : [{"min" : 0,"max" : 20,"increment" : 0.1,"cap" : true}]}`.
 * @param {boolean} options.enableSendAllBids Turn "send all bids" mode on/off.  Example: `pbjs.setConfig({ enableSendAllBids: true })`.
 * @param {number} options.bidderTimeout Set a global bidder timeout, in milliseconds.  Example: `pbjs.setConfig({ bidderTimeout: 3000 })`.  Note that it's still possible for a bid to get into the auction that responds after this timeout. This is due to how [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) works in JS: it queues the callback in the event loop in an approximate location that should execute after this time but it is not guaranteed.  For more information about the asynchronous event loop and `setTimeout`, see [How JavaScript Timers Work](https://johnresig.com/blog/how-javascript-timers-work/).
 * @param {string} options.publisherDomain The publisher's domain where Prebid is running, for cross-domain iFrame communication.  Example: `pbjs.setConfig({ publisherDomain: "https://www.theverge.com" })`.
 * @param {Object} options.s2sConfig The configuration object for [server-to-server header bidding](http://prebid.org/dev-docs/get-started-with-prebid-server.html).  Example:
 * @alias module:pbjs.setConfig
 * ```
 * pbjs.setConfig({
 *     s2sConfig: {
 *         accountId: '1',
 *         enabled: true,
 *         bidders: ['appnexus', 'pubmatic'],
 *         timeout: 1000,
 *         adapter: 'prebidServer',
 *         endpoint: 'https://prebid.adnxs.com/pbs/v1/auction'
 *     }
 * })
 * ```
 */

pbjs.setConfig = __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* config */].setConfig;
pbjs.setBidderConfig = __WEBPACK_IMPORTED_MODULE_4__config_js__["b" /* config */].setBidderConfig;
pbjs.que.push(function () {
  return Object(__WEBPACK_IMPORTED_MODULE_2__secureCreatives_js__["a" /* listenMessagesFromCreative */])();
});
/**
 * This queue lets users load Prebid asynchronously, but run functions the same way regardless of whether it gets loaded
 * before or after their script executes. For example, given the code:
 *
 * <script src="url/to/Prebid.js" async></script>
 * <script>
 *   var pbjs = pbjs || {};
 *   pbjs.cmd = pbjs.cmd || [];
 *   pbjs.cmd.push(functionToExecuteOncePrebidLoads);
 * </script>
 *
 * If the page's script runs before prebid loads, then their function gets added to the queue, and executed
 * by prebid once it's done loading. If it runs after prebid loads, then this monkey-patch causes their
 * function to execute immediately.
 *
 * @memberof pbjs
 * @param  {function} command A function which takes no arguments. This is guaranteed to run exactly once, and only after
 *                            the Prebid script has been fully loaded.
 * @alias module:pbjs.cmd.push
 */

pbjs.cmd.push = function (command) {
  if (typeof command === 'function') {
    try {
      command.call();
    } catch (e) {
      utils.logError('Error processing command :', e.message, e.stack);
    }
  } else {
    utils.logError("Commands written into pbjs.cmd.push must be wrapped in a function");
  }
};

pbjs.que.push = pbjs.cmd.push;

function processQueue(queue) {
  queue.forEach(function (cmd) {
    if (typeof cmd.called === 'undefined') {
      try {
        cmd.call();
        cmd.called = true;
      } catch (e) {
        utils.logError('Error processing command :', 'prebid.js', e);
      }
    }
  });
}
/**
 * @alias module:pbjs.processQueue
 */


pbjs.processQueue = function () {
  __WEBPACK_IMPORTED_MODULE_7__hook_js__["b" /* hook */].ready();
  processQueue(pbjs.que);
  processQueue(pbjs.cmd);
};

/* harmony default export */ __webpack_exports__["default"] = (pbjs);

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = registerVideoSupport;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prebidGlobal_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(0);


var prebid = Object(__WEBPACK_IMPORTED_MODULE_0__prebidGlobal_js__["a" /* getGlobal */])();
/**
 * This file defines the plugin points in prebid-core for AdServer-specific functionality.
 *
 * Its main job is to expose functions for AdServer modules to append functionality to the Prebid public API.
 * For a given Ad Server with name "adServerName", these functions will only change the API in the
 * $$PREBID_GLOBAL$$.adServers[adServerName] namespace.
 */

/**
 * @typedef {Object} CachedVideoBid
 *
 * @property {string} videoCacheId The ID which can be used to retrieve this video from prebid-server.
 *   This is the same ID given to the callback in the videoCache's store function.
 */

/**
 * @function VideoAdUrlBuilder
 *
 * @param {CachedVideoBid} bid The winning Bid which the ad server should show, assuming it beats out
 *   the competition.
 *
 * @param {Object} options Options required by the Ad Server to make a valid AdServer URL.
 *   This object will have different properties depending on the specific ad server supported.
 *   For more information, see the docs inside the ad server module you're supporting.
 *
 * @return {string} A URL which can be passed into the Video player to play an ad.
 */

/**
 * @typedef {Object} VideoSupport
 *
 * @function {VideoAdUrlBuilder} buildVideoAdUrl
 */

/**
 * Enable video support for the Ad Server.
 *
 * @property {string} name The identifying name for this adserver.
 * @property {VideoSupport} videoSupport An object with the functions needed to support video in Prebid.
 */

function registerVideoSupport(name, videoSupport) {
  prebid.adServers = prebid.adServers || {};
  prebid.adServers[name] = prebid.adServers[name] || {};
  Object.keys(videoSupport).forEach(function (key) {
    if (prebid.adServers[name][key]) {
      Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["logWarn"])("Attempting to add an already registered function property ".concat(key, " for AdServer ").concat(name, "."));
      return;
    }

    prebid.adServers[name][key] = videoSupport[key];
  });
}

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gdprDataHandler", function() { return gdprDataHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uspDataHandler", function() { return uspDataHandler; });
/* harmony export (immutable) */ __webpack_exports__["setS2STestingModule"] = setS2STestingModule;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sizeMapping_js__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__native_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__adUnits_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__refererDetection_js__ = __webpack_require__(30);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/** @module adaptermanger */












var utils = __webpack_require__(0);

var CONSTANTS = __webpack_require__(5);

var events = __webpack_require__(8);

var s2sTestingModule; // store s2sTesting module if it's loaded

var adapterManager = {};

var _bidderRegistry = adapterManager.bidderRegistry = {};

var _aliasRegistry = adapterManager.aliasRegistry = {};

var _s2sConfig = {};
__WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('s2sConfig', function (config) {
  _s2sConfig = config.s2sConfig;
});
var _analyticsRegistry = {};
/**
 * @typedef {object} LabelDescriptor
 * @property {boolean} labelAll describes whether or not this object expects all labels to match, or any label to match
 * @property {Array<string>} labels the labels listed on the bidder or adUnit
 * @property {Array<string>} activeLabels the labels specified as being active by requestBids
 */

function getBids(_ref) {
  var bidderCode = _ref.bidderCode,
      auctionId = _ref.auctionId,
      bidderRequestId = _ref.bidderRequestId,
      adUnits = _ref.adUnits,
      labels = _ref.labels,
      src = _ref.src;
  return adUnits.reduce(function (result, adUnit) {
    var _resolveStatus = Object(__WEBPACK_IMPORTED_MODULE_1__sizeMapping_js__["b" /* resolveStatus */])(Object(__WEBPACK_IMPORTED_MODULE_1__sizeMapping_js__["a" /* getLabels */])(adUnit, labels), adUnit.mediaTypes, adUnit.sizes),
        active = _resolveStatus.active,
        filteredMediaTypes = _resolveStatus.mediaTypes,
        filterResults = _resolveStatus.filterResults;

    if (!active) {
      utils.logInfo("Size mapping disabled adUnit \"".concat(adUnit.code, "\""));
    } else if (filterResults) {
      utils.logInfo("Size mapping filtered adUnit \"".concat(adUnit.code, "\" banner sizes from "), filterResults.before, 'to ', filterResults.after);
    }

    if (active) {
      result.push(adUnit.bids.filter(function (bid) {
        return bid.bidder === bidderCode;
      }).reduce(function (bids, bid) {
        var nativeParams = adUnit.nativeParams || utils.deepAccess(adUnit, 'mediaTypes.native');

        if (nativeParams) {
          bid = _extends({}, bid, {
            nativeParams: Object(__WEBPACK_IMPORTED_MODULE_2__native_js__["g" /* processNativeAdUnitParams */])(nativeParams)
          });
        }

        bid = _extends({}, bid, Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["getDefinedParams"])(adUnit, ['fpd', 'mediaType', 'renderer', 'storedAuctionResponse']));

        var _resolveStatus2 = Object(__WEBPACK_IMPORTED_MODULE_1__sizeMapping_js__["b" /* resolveStatus */])(Object(__WEBPACK_IMPORTED_MODULE_1__sizeMapping_js__["a" /* getLabels */])(bid, labels), filteredMediaTypes),
            active = _resolveStatus2.active,
            mediaTypes = _resolveStatus2.mediaTypes,
            filterResults = _resolveStatus2.filterResults;

        if (!active) {
          utils.logInfo("Size mapping deactivated adUnit \"".concat(adUnit.code, "\" bidder \"").concat(bid.bidder, "\""));
        } else if (filterResults) {
          utils.logInfo("Size mapping filtered adUnit \"".concat(adUnit.code, "\" bidder \"").concat(bid.bidder, "\" banner sizes from "), filterResults.before, 'to ', filterResults.after);
        }

        if (utils.isValidMediaTypes(mediaTypes)) {
          bid = _extends({}, bid, {
            mediaTypes: mediaTypes
          });
        } else {
          utils.logError("mediaTypes is not correctly configured for adunit ".concat(adUnit.code));
        }

        if (active) {
          bids.push(_extends({}, bid, {
            adUnitCode: adUnit.code,
            transactionId: adUnit.transactionId,
            sizes: utils.deepAccess(mediaTypes, 'banner.sizes') || utils.deepAccess(mediaTypes, 'video.playerSize') || [],
            bidId: bid.bid_id || utils.getUniqueIdentifierStr(),
            bidderRequestId: bidderRequestId,
            auctionId: auctionId,
            src: src,
            bidRequestsCount: __WEBPACK_IMPORTED_MODULE_9__adUnits_js__["a" /* adunitCounter */].getRequestsCounter(adUnit.code),
            bidderRequestsCount: __WEBPACK_IMPORTED_MODULE_9__adUnits_js__["a" /* adunitCounter */].getBidderRequestsCounter(adUnit.code, bid.bidder),
            bidderWinsCount: __WEBPACK_IMPORTED_MODULE_9__adUnits_js__["a" /* adunitCounter */].getBidderWinsCounter(adUnit.code, bid.bidder)
          }));
        }

        return bids;
      }, []));
    }

    return result;
  }, []).reduce(__WEBPACK_IMPORTED_MODULE_0__utils_js__["flatten"], []).filter(function (val) {
    return val !== '';
  });
}

var hookedGetBids = Object(__WEBPACK_IMPORTED_MODULE_6__hook_js__["b" /* hook */])('sync', getBids, 'getBids');

function getAdUnitCopyForPrebidServer(adUnits) {
  var adaptersServerSide = _s2sConfig.bidders;
  var adUnitsCopy = utils.deepClone(adUnits);
  adUnitsCopy.forEach(function (adUnit) {
    // filter out client side bids
    adUnit.bids = adUnit.bids.filter(function (bid) {
      return __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(adaptersServerSide, bid.bidder) && (!doingS2STesting() || bid.finalSource !== s2sTestingModule.CLIENT);
    }).map(function (bid) {
      bid.bid_id = utils.getUniqueIdentifierStr();
      return bid;
    });
  }); // don't send empty requests

  adUnitsCopy = adUnitsCopy.filter(function (adUnit) {
    return adUnit.bids.length !== 0;
  });
  return adUnitsCopy;
}

function getAdUnitCopyForClientAdapters(adUnits) {
  var adUnitsClientCopy = utils.deepClone(adUnits); // filter out s2s bids

  adUnitsClientCopy.forEach(function (adUnit) {
    adUnit.bids = adUnit.bids.filter(function (bid) {
      return !doingS2STesting() || bid.finalSource !== s2sTestingModule.SERVER;
    });
  }); // don't send empty requests

  adUnitsClientCopy = adUnitsClientCopy.filter(function (adUnit) {
    return adUnit.bids.length !== 0;
  });
  return adUnitsClientCopy;
}

var gdprDataHandler = {
  consentData: null,
  setConsentData: function setConsentData(consentInfo) {
    gdprDataHandler.consentData = consentInfo;
  },
  getConsentData: function getConsentData() {
    return gdprDataHandler.consentData;
  }
};
var uspDataHandler = {
  consentData: null,
  setConsentData: function setConsentData(consentInfo) {
    uspDataHandler.consentData = consentInfo;
  },
  getConsentData: function getConsentData() {
    return uspDataHandler.consentData;
  }
};
adapterManager.makeBidRequests = Object(__WEBPACK_IMPORTED_MODULE_6__hook_js__["b" /* hook */])('sync', function (adUnits, auctionStart, auctionId, cbTimeout, labels) {
  /**
   * emit and pass adunits for external modification
   * @see {@link https://github.com/prebid/Prebid.js/issues/4149|Issue}
   */
  events.emit(CONSTANTS.EVENTS.BEFORE_REQUEST_BIDS, adUnits);
  var bidRequests = [];
  var bidderCodes = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["getBidderCodes"])(adUnits);

  if (__WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('bidderSequence') === __WEBPACK_IMPORTED_MODULE_5__config_js__["a" /* RANDOM */]) {
    bidderCodes = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["shuffle"])(bidderCodes);
  }

  var refererInfo = Object(__WEBPACK_IMPORTED_MODULE_10__refererDetection_js__["a" /* getRefererInfo */])();
  var clientBidderCodes = bidderCodes;
  var clientTestAdapters = [];

  if (_s2sConfig.enabled) {
    // if s2sConfig.bidderControl testing is turned on
    if (doingS2STesting()) {
      // get all adapters doing client testing
      var bidderMap = s2sTestingModule.getSourceBidderMap(adUnits);
      clientTestAdapters = bidderMap[s2sTestingModule.CLIENT];
    } // these are called on the s2s adapter


    var adaptersServerSide = _s2sConfig.bidders; // don't call these client side (unless client request is needed for testing)

    clientBidderCodes = bidderCodes.filter(function (elm) {
      return !__WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(adaptersServerSide, elm) || __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(clientTestAdapters, elm);
    });

    var adUnitsContainServerRequests = function adUnitsContainServerRequests(adUnits) {
      return Boolean(__WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default()(adUnits, function (adUnit) {
        return __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default()(adUnit.bids, function (bid) {
          return (bid.bidSource || _s2sConfig.bidderControl && _s2sConfig.bidderControl[bid.bidder]) && bid.finalSource === s2sTestingModule.SERVER;
        });
      }));
    };

    if (isTestingServerOnly() && adUnitsContainServerRequests(adUnits)) {
      clientBidderCodes.length = 0;
    }

    var adUnitsS2SCopy = getAdUnitCopyForPrebidServer(adUnits);
    var tid = utils.generateUUID();
    adaptersServerSide.forEach(function (bidderCode) {
      var bidderRequestId = utils.getUniqueIdentifierStr();
      var bidderRequest = {
        bidderCode: bidderCode,
        auctionId: auctionId,
        bidderRequestId: bidderRequestId,
        tid: tid,
        bids: hookedGetBids({
          bidderCode: bidderCode,
          auctionId: auctionId,
          bidderRequestId: bidderRequestId,
          'adUnits': utils.deepClone(adUnitsS2SCopy),
          labels: labels,
          src: CONSTANTS.S2S.SRC
        }),
        auctionStart: auctionStart,
        timeout: _s2sConfig.timeout,
        src: CONSTANTS.S2S.SRC,
        refererInfo: refererInfo
      };

      if (bidderRequest.bids.length !== 0) {
        bidRequests.push(bidderRequest);
      }
    }); // update the s2sAdUnits object and remove all bids that didn't pass sizeConfig/label checks from getBids()
    // this is to keep consistency and only allow bids/adunits that passed the checks to go to pbs

    adUnitsS2SCopy.forEach(function (adUnitCopy) {
      var validBids = adUnitCopy.bids.filter(function (adUnitBid) {
        return __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default()(bidRequests, function (request) {
          return __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default()(request.bids, function (reqBid) {
            return reqBid.bidId === adUnitBid.bid_id;
          });
        });
      });
      adUnitCopy.bids = validBids;
    });
    bidRequests.forEach(function (request) {
      request.adUnitsS2SCopy = adUnitsS2SCopy.filter(function (adUnitCopy) {
        return adUnitCopy.bids.length > 0;
      });
    });
  } // client adapters


  var adUnitsClientCopy = getAdUnitCopyForClientAdapters(adUnits);
  clientBidderCodes.forEach(function (bidderCode) {
    var bidderRequestId = utils.getUniqueIdentifierStr();
    var bidderRequest = {
      bidderCode: bidderCode,
      auctionId: auctionId,
      bidderRequestId: bidderRequestId,
      bids: hookedGetBids({
        bidderCode: bidderCode,
        auctionId: auctionId,
        bidderRequestId: bidderRequestId,
        'adUnits': utils.deepClone(adUnitsClientCopy),
        labels: labels,
        src: 'client'
      }),
      auctionStart: auctionStart,
      timeout: cbTimeout,
      refererInfo: refererInfo
    };
    var adapter = _bidderRegistry[bidderCode];

    if (!adapter) {
      utils.logError("Trying to make a request for bidder that does not exist: ".concat(bidderCode));
    }

    if (adapter && bidderRequest.bids && bidderRequest.bids.length !== 0) {
      bidRequests.push(bidderRequest);
    }
  });

  if (gdprDataHandler.getConsentData()) {
    bidRequests.forEach(function (bidRequest) {
      bidRequest['gdprConsent'] = gdprDataHandler.getConsentData();
    });
  }

  if (uspDataHandler.getConsentData()) {
    bidRequests.forEach(function (bidRequest) {
      bidRequest['uspConsent'] = uspDataHandler.getConsentData();
    });
  }

  return bidRequests;
}, 'makeBidRequests');

adapterManager.callBids = function (adUnits, bidRequests, addBidResponse, doneCb, requestCallbacks, requestBidsTimeout, onTimelyResponse) {
  if (!bidRequests.length) {
    utils.logWarn('callBids executed with no bidRequests.  Were they filtered by labels or sizing?');
    return;
  }

  var _bidRequests$reduce = bidRequests.reduce(function (partitions, bidRequest) {
    partitions[Number(typeof bidRequest.src !== 'undefined' && bidRequest.src === CONSTANTS.S2S.SRC)].push(bidRequest);
    return partitions;
  }, [[], []]),
      _bidRequests$reduce2 = _slicedToArray(_bidRequests$reduce, 2),
      clientBidRequests = _bidRequests$reduce2[0],
      serverBidRequests = _bidRequests$reduce2[1];

  if (serverBidRequests.length) {
    // s2s should get the same client side timeout as other client side requests.
    var s2sAjax = Object(__WEBPACK_IMPORTED_MODULE_4__ajax_js__["b" /* ajaxBuilder */])(requestBidsTimeout, requestCallbacks ? {
      request: requestCallbacks.request.bind(null, 's2s'),
      done: requestCallbacks.done
    } : undefined);
    var adaptersServerSide = _s2sConfig.bidders;
    var s2sAdapter = _bidderRegistry[_s2sConfig.adapter];
    var tid = serverBidRequests[0].tid;
    var adUnitsS2SCopy = serverBidRequests[0].adUnitsS2SCopy;

    if (s2sAdapter) {
      var s2sBidRequest = {
        tid: tid,
        'ad_units': adUnitsS2SCopy
      };

      if (s2sBidRequest.ad_units.length) {
        var doneCbs = serverBidRequests.map(function (bidRequest) {
          bidRequest.start = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["timestamp"])();
          return doneCb.bind(bidRequest);
        }); // only log adapters that actually have adUnit bids

        var allBidders = s2sBidRequest.ad_units.reduce(function (adapters, adUnit) {
          return adapters.concat((adUnit.bids || []).reduce(function (adapters, bid) {
            return adapters.concat(bid.bidder);
          }, []));
        }, []);
        utils.logMessage("CALLING S2S HEADER BIDDERS ==== ".concat(adaptersServerSide.filter(function (adapter) {
          return __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(allBidders, adapter);
        }).join(','))); // fire BID_REQUESTED event for each s2s bidRequest

        serverBidRequests.forEach(function (bidRequest) {
          events.emit(CONSTANTS.EVENTS.BID_REQUESTED, bidRequest);
        }); // make bid requests

        s2sAdapter.callBids(s2sBidRequest, serverBidRequests, function (adUnitCode, bid) {
          var bidderRequest = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["getBidderRequest"])(serverBidRequests, bid.bidderCode, adUnitCode);

          if (bidderRequest) {
            addBidResponse.call(bidderRequest, adUnitCode, bid);
          }
        }, function () {
          return doneCbs.forEach(function (done) {
            return done();
          });
        }, s2sAjax);
      }
    } else {
      utils.logError('missing ' + _s2sConfig.adapter);
    }
  } // handle client adapter requests


  clientBidRequests.forEach(function (bidRequest) {
    bidRequest.start = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["timestamp"])(); // TODO : Do we check for bid in pool from here and skip calling adapter again ?

    var adapter = _bidderRegistry[bidRequest.bidderCode];
    utils.logMessage("CALLING BIDDER ======= ".concat(bidRequest.bidderCode));
    events.emit(CONSTANTS.EVENTS.BID_REQUESTED, bidRequest);
    var ajax = Object(__WEBPACK_IMPORTED_MODULE_4__ajax_js__["b" /* ajaxBuilder */])(requestBidsTimeout, requestCallbacks ? {
      request: requestCallbacks.request.bind(null, bidRequest.bidderCode),
      done: requestCallbacks.done
    } : undefined);
    var adapterDone = doneCb.bind(bidRequest);

    try {
      __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].runWithBidder(bidRequest.bidderCode, __WEBPACK_IMPORTED_MODULE_0__utils_js__["bind"].call(adapter.callBids, adapter, bidRequest, addBidResponse.bind(bidRequest), adapterDone, ajax, onTimelyResponse, __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].callbackWithBidder(bidRequest.bidderCode)));
    } catch (e) {
      utils.logError("".concat(bidRequest.bidderCode, " Bid Adapter emitted an uncaught error when parsing their bidRequest"), {
        e: e,
        bidRequest: bidRequest
      });
      adapterDone();
    }
  });
};

function doingS2STesting() {
  return _s2sConfig && _s2sConfig.enabled && _s2sConfig.testing && s2sTestingModule;
}

function isTestingServerOnly() {
  return Boolean(doingS2STesting() && _s2sConfig.testServerOnly);
}

;

function getSupportedMediaTypes(bidderCode) {
  var result = [];
  if (__WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(adapterManager.videoAdapters, bidderCode)) result.push('video');
  if (__WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(__WEBPACK_IMPORTED_MODULE_2__native_js__["e" /* nativeAdapters */], bidderCode)) result.push('native');
  return result;
}

adapterManager.videoAdapters = []; // added by adapterLoader for now

adapterManager.registerBidAdapter = function (bidAdaptor, bidderCode) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$supportedMediaT = _ref2.supportedMediaTypes,
      supportedMediaTypes = _ref2$supportedMediaT === void 0 ? [] : _ref2$supportedMediaT;

  if (bidAdaptor && bidderCode) {
    if (typeof bidAdaptor.callBids === 'function') {
      _bidderRegistry[bidderCode] = bidAdaptor;

      if (__WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(supportedMediaTypes, 'video')) {
        adapterManager.videoAdapters.push(bidderCode);
      }

      if (__WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(supportedMediaTypes, 'native')) {
        __WEBPACK_IMPORTED_MODULE_2__native_js__["e" /* nativeAdapters */].push(bidderCode);
      }
    } else {
      utils.logError('Bidder adaptor error for bidder code: ' + bidderCode + 'bidder must implement a callBids() function');
    }
  } else {
    utils.logError('bidAdaptor or bidderCode not specified');
  }
};

adapterManager.aliasBidAdapter = function (bidderCode, alias, options) {
  var existingAlias = _bidderRegistry[alias];

  if (typeof existingAlias === 'undefined') {
    var bidAdaptor = _bidderRegistry[bidderCode];

    if (typeof bidAdaptor === 'undefined') {
      // check if alias is part of s2sConfig and allow them to register if so (as base bidder may be s2s-only)
      var s2sConfig = __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].getConfig('s2sConfig');
      var s2sBidders = s2sConfig && s2sConfig.bidders;

      if (!(s2sBidders && __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(s2sBidders, alias))) {
        utils.logError('bidderCode "' + bidderCode + '" is not an existing bidder.', 'adapterManager.aliasBidAdapter');
      } else {
        _aliasRegistry[alias] = bidderCode;
      }
    } else {
      try {
        var newAdapter;
        var supportedMediaTypes = getSupportedMediaTypes(bidderCode); // Have kept old code to support backward compatibilitiy.
        // Remove this if loop when all adapters are supporting bidderFactory. i.e When Prebid.js is 1.0

        if (bidAdaptor.constructor.prototype != Object.prototype) {
          newAdapter = new bidAdaptor.constructor();
          newAdapter.setBidderCode(alias);
        } else {
          var spec = bidAdaptor.getSpec();
          var gvlid = options && options.gvlid;
          newAdapter = Object(__WEBPACK_IMPORTED_MODULE_3__adapters_bidderFactory_js__["newBidder"])(_extends({}, spec, {
            code: alias,
            gvlid: gvlid
          }));
          _aliasRegistry[alias] = bidderCode;
        }

        adapterManager.registerBidAdapter(newAdapter, alias, {
          supportedMediaTypes: supportedMediaTypes
        });
      } catch (e) {
        utils.logError(bidderCode + ' bidder does not currently support aliasing.', 'adapterManager.aliasBidAdapter');
      }
    }
  } else {
    utils.logMessage('alias name "' + alias + '" has been already specified.');
  }
};

adapterManager.registerAnalyticsAdapter = function (_ref3) {
  var adapter = _ref3.adapter,
      code = _ref3.code;

  if (adapter && code) {
    if (typeof adapter.enableAnalytics === 'function') {
      adapter.code = code;
      _analyticsRegistry[code] = adapter;
    } else {
      utils.logError("Prebid Error: Analytics adaptor error for analytics \"".concat(code, "\"\n        analytics adapter must implement an enableAnalytics() function"));
    }
  } else {
    utils.logError('Prebid Error: analyticsAdapter or analyticsCode not specified');
  }
};

adapterManager.enableAnalytics = function (config) {
  if (!utils.isArray(config)) {
    config = [config];
  }

  utils._each(config, function (adapterConfig) {
    var adapter = _analyticsRegistry[adapterConfig.provider];

    if (adapter) {
      adapter.enableAnalytics(adapterConfig);
    } else {
      utils.logError("Prebid Error: no analytics adapter found in registry for\n        ".concat(adapterConfig.provider, "."));
    }
  });
};

adapterManager.getBidAdapter = function (bidder) {
  return _bidderRegistry[bidder];
}; // the s2sTesting module is injected when it's loaded rather than being imported
// importing it causes the packager to include it even when it's not explicitly included in the build


function setS2STestingModule(module) {
  s2sTestingModule = module;
}

function tryCallBidderMethod(bidder, method, param) {
  try {
    var adapter = _bidderRegistry[bidder];
    var spec = adapter.getSpec();

    if (spec && spec[method] && typeof spec[method] === 'function') {
      utils.logInfo("Invoking ".concat(bidder, ".").concat(method));
      __WEBPACK_IMPORTED_MODULE_5__config_js__["b" /* config */].runWithBidder(bidder, __WEBPACK_IMPORTED_MODULE_0__utils_js__["bind"].call(spec[method], spec, param));
    }
  } catch (e) {
    utils.logWarn("Error calling ".concat(method, " of ").concat(bidder));
  }
}

adapterManager.callTimedOutBidders = function (adUnits, timedOutBidders, cbTimeout) {
  timedOutBidders = timedOutBidders.map(function (timedOutBidder) {
    // Adding user configured params & timeout to timeout event data
    timedOutBidder.params = utils.getUserConfiguredParams(adUnits, timedOutBidder.adUnitCode, timedOutBidder.bidder);
    timedOutBidder.timeout = cbTimeout;
    return timedOutBidder;
  });
  timedOutBidders = utils.groupBy(timedOutBidders, 'bidder');
  Object.keys(timedOutBidders).forEach(function (bidder) {
    tryCallBidderMethod(bidder, 'onTimeout', timedOutBidders[bidder]);
  });
};

adapterManager.callBidWonBidder = function (bidder, bid, adUnits) {
  // Adding user configured params to bidWon event data
  bid.params = utils.getUserConfiguredParams(adUnits, bid.adUnitCode, bid.bidder);
  __WEBPACK_IMPORTED_MODULE_9__adUnits_js__["a" /* adunitCounter */].incrementBidderWinsCounter(bid.adUnitCode, bid.bidder);
  tryCallBidderMethod(bidder, 'onBidWon', bid);
};

adapterManager.callSetTargetingBidder = function (bidder, bid) {
  tryCallBidderMethod(bidder, 'onSetTargeting', bid);
};

/* harmony default export */ __webpack_exports__["default"] = (adapterManager);

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(28);
var classof = __webpack_require__(48);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(27);
var fails = __webpack_require__(28);
var createElement = __webpack_require__(72);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(22);
var isObject = __webpack_require__(23);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(16);
var store = __webpack_require__(74);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(22);
var setGlobal = __webpack_require__(103);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(28);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(47);
var toLength = __webpack_require__(50);
var toAbsoluteIndex = __webpack_require__(107);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(108);
__webpack_require__(131);
__webpack_require__(133);
__webpack_require__(135);
__webpack_require__(137);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(148);
__webpack_require__(149);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(152);

module.exports = parent;


/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

var hiddenKeys = __webpack_require__(53);
var isObject = __webpack_require__(23);
var has = __webpack_require__(24);
var defineProperty = __webpack_require__(31).f;
var uid = __webpack_require__(59);
var FREEZING = __webpack_require__(111);

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(19);
var Iterators = __webpack_require__(37);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * events.js
 */
var utils = __webpack_require__(0);

var CONSTANTS = __webpack_require__(5);

var slice = Array.prototype.slice;
var push = Array.prototype.push; // define entire events
// var allEvents = ['bidRequested','bidResponse','bidWon','bidTimeout'];

var allEvents = utils._map(CONSTANTS.EVENTS, function (v) {
  return v;
});

var idPaths = CONSTANTS.EVENT_ID_PATHS; // keep a record of all events fired

var eventsFired = [];

module.exports = function () {
  var _handlers = {};
  var _public = {};
  /**
   *
   * @param {String} eventString  The name of the event.
   * @param {Array} args  The payload emitted with the event.
   * @private
   */

  function _dispatch(eventString, args) {
    utils.logMessage('Emitting event for: ' + eventString);
    var eventPayload = args[0] || {};
    var idPath = idPaths[eventString];
    var key = eventPayload[idPath];
    var event = _handlers[eventString] || {
      que: []
    };

    var eventKeys = utils._map(event, function (v, k) {
      return k;
    });

    var callbacks = []; // record the event:

    eventsFired.push({
      eventType: eventString,
      args: eventPayload,
      id: key
    });
    /** Push each specific callback to the `callbacks` array.
     * If the `event` map has a key that matches the value of the
     * event payload id path, e.g. `eventPayload[idPath]`, then apply
     * each function in the `que` array as an argument to push to the
     * `callbacks` array
     * */

    if (key && utils.contains(eventKeys, key)) {
      push.apply(callbacks, event[key].que);
    }
    /** Push each general callback to the `callbacks` array. */


    push.apply(callbacks, event.que);
    /** call each of the callbacks */

    utils._each(callbacks, function (fn) {
      if (!fn) return;

      try {
        fn.apply(null, args);
      } catch (e) {
        utils.logError('Error executing handler:', 'events.js', e);
      }
    });
  }

  function _checkAvailableEvent(event) {
    return utils.contains(allEvents, event);
  }

  _public.on = function (eventString, handler, id) {
    // check whether available event or not
    if (_checkAvailableEvent(eventString)) {
      var event = _handlers[eventString] || {
        que: []
      };

      if (id) {
        event[id] = event[id] || {
          que: []
        };
        event[id].que.push(handler);
      } else {
        event.que.push(handler);
      }

      _handlers[eventString] = event;
    } else {
      utils.logError('Wrong event name : ' + eventString + ' Valid event names :' + allEvents);
    }
  };

  _public.emit = function (event) {
    var args = slice.call(arguments, 1);

    _dispatch(event, args);
  };

  _public.off = function (eventString, handler, id) {
    var event = _handlers[eventString];

    if (utils.isEmpty(event) || utils.isEmpty(event.que) && utils.isEmpty(event[id])) {
      return;
    }

    if (id && (utils.isEmpty(event[id]) || utils.isEmpty(event[id].que))) {
      return;
    }

    if (id) {
      utils._each(event[id].que, function (_handler) {
        var que = event[id].que;

        if (_handler === handler) {
          que.splice(que.indexOf(_handler), 1);
        }
      });
    } else {
      utils._each(event.que, function (_handler) {
        var que = event.que;

        if (_handler === handler) {
          que.splice(que.indexOf(_handler), 1);
        }
      });
    }

    _handlers[eventString] = event;
  };

  _public.get = function () {
    return _handlers;
  };
  /**
   * This method can return a copy of all the events fired
   * @return {Array} array of events fired
   */


  _public.getEvents = function () {
    var arrayCopy = [];

    utils._each(eventsFired, function (value) {
      var newProp = _extends({}, value);

      arrayCopy.push(newProp);
    });

    return arrayCopy;
  };

  return _public;
}();

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ 81:
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var defineProperties = __webpack_require__(116);
var enumBugKeys = __webpack_require__(83);
var hiddenKeys = __webpack_require__(53);
var html = __webpack_require__(119);
var documentCreateElement = __webpack_require__(72);
var sharedKey = __webpack_require__(65);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ 828:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(68);


/***/ }),

/***/ 83:
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

var createNonEnumerableProperty = __webpack_require__(29);

module.exports = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
};


/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__(86);
var createNonEnumerableProperty = __webpack_require__(29);
var has = __webpack_require__(24);
var wellKnownSymbol = __webpack_require__(19);
var IS_PURE = __webpack_require__(16);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(24);
var toObject = __webpack_require__(57);
var sharedKey = __webpack_require__(65);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(122);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(127).charAt;
var InternalStateModule = __webpack_require__(54);
var defineIterator = __webpack_require__(66);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var getIteratorMethod = __webpack_require__(61);

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};


/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(153);

module.exports = parent;


/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return storageCallbacks; });
/* unused harmony export newStorageManager */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return validateStorageEnforcement; });
/* harmony export (immutable) */ __webpack_exports__["a"] = getCoreStorageManager;
/* harmony export (immutable) */ __webpack_exports__["b"] = getStorageManager;
/* unused harmony export resetData */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js__);



var moduleTypeWhiteList = ['core', 'prebid-module'];
var storageCallbacks = [];
/**
 * Storage options
 * @typedef {Object} storageOptions
 * @property {Number=} gvlid - Vendor id
 * @property {string} moduleName - Module name
 * @property {string=} moduleType - Module type, value can be anyone of core or prebid-module
 */

/**
 * Returns list of storage related functions with gvlid, module name and module type in its scope.
 * All three argument are optional here. Below shows the usage of of these
 * - GVL Id: Pass GVL id if you are a vendor
 * - Module name: All modules need to pass module name
 * - Module type: Some modules may need these functions but are not vendor. e.g prebid core files in src and modules like currency.
 * @param {storageOptions} options
 */

function newStorageManager() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      gvlid = _ref.gvlid,
      moduleName = _ref.moduleName,
      moduleType = _ref.moduleType;

  function isValid(cb) {
    if (__WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js___default()(moduleTypeWhiteList, moduleType)) {
      var result = {
        valid: true
      };
      return cb(result);
    } else {
      var value;
      var hookDetails = {
        hasEnforcementHook: false
      };
      validateStorageEnforcement(gvlid, moduleName, hookDetails, function (result) {
        if (result && result.hasEnforcementHook) {
          value = cb(result);
        } else {
          var _result = {
            hasEnforcementHook: false,
            valid: __WEBPACK_IMPORTED_MODULE_1__utils_js__["hasDeviceAccess"]()
          };
          value = cb(_result);
        }
      });
      return value;
    }
  }
  /**
   * @param {string} key
   * @param {string} value
   * @param {string} [expires='']
   * @param {string} [sameSite='/']
   * @param {string} [domain] domain (e.g., 'example.com' or 'subdomain.example.com').
   * If not specified, defaults to the host portion of the current document location.
   * If a domain is specified, subdomains are always included.
   * Domain must match the domain of the JavaScript origin. Setting cookies to foreign domains will be silently ignored.
   */


  var setCookie = function setCookie(key, value, expires, sameSite, domain, done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        var domainPortion = domain && domain !== '' ? " ;domain=".concat(encodeURIComponent(domain)) : '';
        var expiresPortion = expires && expires !== '' ? " ;expires=".concat(expires) : '';
        var isNone = sameSite != null && sameSite.toLowerCase() == 'none';
        var secure = isNone ? '; Secure' : '';
        document.cookie = "".concat(key, "=").concat(encodeURIComponent(value)).concat(expiresPortion, "; path=/").concat(domainPortion).concat(sameSite ? "; SameSite=".concat(sameSite) : '').concat(secure);
      }
    };

    if (done && typeof done === 'function') {
      storageCallbacks.push(function () {
        var result = isValid(cb);
        done(result);
      });
    } else {
      return isValid(cb);
    }
  };
  /**
   * @param {string} name
   * @returns {(string|null)}
   */


  var getCookie = function getCookie(name, done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        var m = window.document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]*)\\s*(;|$)');
        return m ? decodeURIComponent(m[2]) : null;
      }

      return null;
    };

    if (done && typeof done === 'function') {
      storageCallbacks.push(function () {
        var result = isValid(cb);
        done(result);
      });
    } else {
      return isValid(cb);
    }
  };
  /**
   * @returns {boolean}
   */


  var localStorageIsEnabled = function localStorageIsEnabled(done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        try {
          localStorage.setItem('prebid.cookieTest', '1');
          return localStorage.getItem('prebid.cookieTest') === '1';
        } catch (error) {}
      }

      return false;
    };

    if (done && typeof done === 'function') {
      storageCallbacks.push(function () {
        var result = isValid(cb);
        done(result);
      });
    } else {
      return isValid(cb);
    }
  };
  /**
   * @returns {boolean}
   */


  var cookiesAreEnabled = function cookiesAreEnabled(done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        if (__WEBPACK_IMPORTED_MODULE_1__utils_js__["checkCookieSupport"]()) {
          return true;
        }

        window.document.cookie = 'prebid.cookieTest';
        return window.document.cookie.indexOf('prebid.cookieTest') !== -1;
      }

      return false;
    };

    if (done && typeof done === 'function') {
      storageCallbacks.push(function () {
        var result = isValid(cb);
        done(result);
      });
    } else {
      return isValid(cb);
    }
  };
  /**
   * @param {string} key
   * @param {string} value
   */


  var setDataInLocalStorage = function setDataInLocalStorage(key, value, done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        window.localStorage.setItem(key, value);
      }
    };

    if (done && typeof done === 'function') {
      storageCallbacks.push(function () {
        var result = isValid(cb);
        done(result);
      });
    } else {
      return isValid(cb);
    }
  };
  /**
   * @param {string} key
   * @returns {(string|null)}
   */


  var getDataFromLocalStorage = function getDataFromLocalStorage(key, done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        return window.localStorage.getItem(key);
      }

      return null;
    };

    if (done && typeof done === 'function') {
      storageCallbacks.push(function () {
        var result = isValid(cb);
        done(result);
      });
    } else {
      return isValid(cb);
    }
  };
  /**
   * @param {string} key
   */


  var removeDataFromLocalStorage = function removeDataFromLocalStorage(key, done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        window.localStorage.removeItem(key);
      }
    };

    if (done && typeof done === 'function') {
      storageCallbacks.push(function () {
        var result = isValid(cb);
        done(result);
      });
    } else {
      return isValid(cb);
    }
  };
  /**
   * @returns {boolean}
   */


  var hasLocalStorage = function hasLocalStorage(done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        try {
          return !!window.localStorage;
        } catch (e) {
          __WEBPACK_IMPORTED_MODULE_1__utils_js__["logError"]('Local storage api disabled');
        }
      }

      return false;
    };

    if (done && typeof done === 'function') {
      storageCallbacks.push(function () {
        var result = isValid(cb);
        done(result);
      });
    } else {
      return isValid(cb);
    }
  };
  /**
   * Returns all cookie values from the jar whose names contain the `keyLike`
   * Needs to exist in `utils.js` as it follows the StorageHandler interface defined in live-connect-js. If that module were to be removed, this function can go as well.
   * @param {string} keyLike
   * @return {[]}
   */


  var findSimilarCookies = function findSimilarCookies(keyLike, done) {
    var cb = function cb(result) {
      if (result && result.valid) {
        var all = [];

        if (__WEBPACK_IMPORTED_MODULE_1__utils_js__["hasDeviceAccess"]()) {
          var cookies = document.cookie.split(';');

          while (cookies.length) {
            var cookie = cookies.pop();
            var separatorIndex = cookie.indexOf('=');
            separatorIndex = separatorIndex < 0 ? cookie.length : separatorIndex;
            var cookieName = decodeURIComponent(cookie.slice(0, separatorIndex).replace(/^\s+/, ''));

            if (cookieName.indexOf(keyLike) >= 0) {
              all.push(decodeURIComponent(cookie.slice(separatorIndex + 1)));
            }
          }
        }

        return all;
      }
    };

    if (done && typeof done === 'function') {
      storageCallbacks.push(function () {
        var result = isValid(cb);
        done(result);
      });
    } else {
      return isValid(cb);
    }
  };

  return {
    setCookie: setCookie,
    getCookie: getCookie,
    localStorageIsEnabled: localStorageIsEnabled,
    cookiesAreEnabled: cookiesAreEnabled,
    setDataInLocalStorage: setDataInLocalStorage,
    getDataFromLocalStorage: getDataFromLocalStorage,
    removeDataFromLocalStorage: removeDataFromLocalStorage,
    hasLocalStorage: hasLocalStorage,
    findSimilarCookies: findSimilarCookies
  };
}
/**
 * This hook validates the storage enforcement if gdprEnforcement module is included
 */

var validateStorageEnforcement = Object(__WEBPACK_IMPORTED_MODULE_0__hook_js__["b" /* hook */])('async', function (gvlid, moduleName, hookDetails, callback) {
  callback(hookDetails);
}, 'validateStorageEnforcement');
/**
 * This function returns storage functions to access cookies and localstorage. This function will bypass the gdpr enforcement requirement. Prebid as a software needs to use storage in some scenarios and is not a vendor so GDPR enforcement rules does not apply on Prebid.
 * @param {string} moduleName Module name
 */

function getCoreStorageManager(moduleName) {
  return newStorageManager({
    moduleName: moduleName,
    moduleType: 'core'
  });
}
/**
 * Note: Core modules or Prebid modules like Currency, SizeMapping should use getCoreStorageManager
 * This function returns storage functions to access cookies and localstorage. Bidders and User id modules should import this and use it in their module if needed. GVL ID and Module name are optional param but gvl id is needed for when gdpr enforcement module is used.
 * @param {Number=} gvlid Vendor id
 * @param {string=} moduleName BidderCode or module name
 */

function getStorageManager(gvlid, moduleName) {
  return newStorageManager({
    gvlid: gvlid,
    moduleName: moduleName
  });
}
function resetData() {
  storageCallbacks = [];
}

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Adapter;
function Adapter(code) {
  var bidderCode = code;

  function setBidderCode(code) {
    bidderCode = code;
  }

  function getBidderCode() {
    return bidderCode;
  }

  function callBids() {}

  return {
    callBids: callBids,
    setBidderCode: setBidderCode,
    getBidderCode: getBidderCode
  };
}

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export setSizeConfig */
/* harmony export (immutable) */ __webpack_exports__["a"] = getLabels;
/* harmony export (immutable) */ __webpack_exports__["c"] = sizeSupported;
/* harmony export (immutable) */ __webpack_exports__["b"] = resolveStatus;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var sizeConfig = [];
/**
 * @typedef {object} SizeConfig
 *
 * @property {string} [mediaQuery] A CSS media query string that will to be interpreted by window.matchMedia.  If the
 *  media query matches then the this config will be active and sizesSupported will filter bid and adUnit sizes.  If
 *  this property is not present then this SizeConfig will only be active if triggered manually by a call to
 *  pbjs.setConfig({labels:['label']) specifying one of the labels present on this SizeConfig.
 * @property {Array<Array>} sizesSupported The sizes to be accepted if this SizeConfig is enabled.
 * @property {Array<string>} labels The active labels to match this SizeConfig to an adUnits and/or bidders.
 */

/**
 *
 * @param {Array<SizeConfig>} config
 */

function setSizeConfig(config) {
  sizeConfig = config;
}
__WEBPACK_IMPORTED_MODULE_0__config_js__["b" /* config */].getConfig('sizeConfig', function (config) {
  return setSizeConfig(config.sizeConfig);
});
/**
 * Returns object describing the status of labels on the adUnit or bidder along with labels passed into requestBids
 * @param bidOrAdUnit the bidder or adUnit to get label info on
 * @param activeLabels the labels passed to requestBids
 * @returns {LabelDescriptor}
 */

function getLabels(bidOrAdUnit, activeLabels) {
  if (bidOrAdUnit.labelAll) {
    return {
      labelAll: true,
      labels: bidOrAdUnit.labelAll,
      activeLabels: activeLabels
    };
  }

  return {
    labelAll: false,
    labels: bidOrAdUnit.labelAny,
    activeLabels: activeLabels
  };
}
/**
 * Determines whether a single size is valid given configured sizes
 * @param {Array} size [width, height]
 * @param {Array<SizeConfig>} configs
 * @returns {boolean}
 */

function sizeSupported(size) {
  var configs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sizeConfig;
  var maps = evaluateSizeConfig(configs);

  if (!maps.shouldFilter) {
    return true;
  }

  return !!maps.sizesSupported[size];
}
/**
 * Resolves the unique set of the union of all sizes and labels that are active from a SizeConfig.mediaQuery match
 * @param {Array<string>} labels Labels specified on adUnit or bidder
 * @param {boolean} labelAll if true, all labels must match to be enabled
 * @param {Array<string>} activeLabels Labels passed in through requestBids
 * @param {object} mediaTypes A mediaTypes object describing the various media types (banner, video, native)
 * @param {Array<Array<number>>} sizes Sizes specified on adUnit (deprecated)
 * @param {Array<SizeConfig>} configs
 * @returns {{labels: Array<string>, sizes: Array<Array<number>>}}
 */

function resolveStatus() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$labels = _ref.labels,
      labels = _ref$labels === void 0 ? [] : _ref$labels,
      _ref$labelAll = _ref.labelAll,
      labelAll = _ref$labelAll === void 0 ? false : _ref$labelAll,
      _ref$activeLabels = _ref.activeLabels,
      activeLabels = _ref$activeLabels === void 0 ? [] : _ref$activeLabels;

  var mediaTypes = arguments.length > 1 ? arguments[1] : undefined;
  var sizes = arguments.length > 2 ? arguments[2] : undefined;
  var configs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : sizeConfig;
  var maps = evaluateSizeConfig(configs);

  if (!Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["isPlainObject"])(mediaTypes)) {
    // add support for deprecated adUnit.sizes by creating correct banner mediaTypes if they don't already exist
    if (sizes) {
      mediaTypes = {
        banner: {
          sizes: sizes
        }
      };
    } else {
      mediaTypes = {};
    }
  } else {
    mediaTypes = Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["deepClone"])(mediaTypes);
  }

  var oldSizes = Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["deepAccess"])(mediaTypes, 'banner.sizes');

  if (maps.shouldFilter && oldSizes) {
    mediaTypes.banner.sizes = oldSizes.filter(function (size) {
      return maps.sizesSupported[size];
    });
  }

  var allMediaTypes = Object.keys(mediaTypes);
  var results = {
    active: allMediaTypes.every(function (type) {
      return type !== 'banner';
    }) || allMediaTypes.some(function (type) {
      return type === 'banner';
    }) && Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["deepAccess"])(mediaTypes, 'banner.sizes.length') > 0 && (labels.length === 0 || !labelAll && (labels.some(function (label) {
      return maps.labels[label];
    }) || labels.some(function (label) {
      return __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js___default()(activeLabels, label);
    })) || labelAll && labels.reduce(function (result, label) {
      return !result ? result : maps.labels[label] || __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_includes_js___default()(activeLabels, label);
    }, true)),
    mediaTypes: mediaTypes
  };

  if (oldSizes && oldSizes.length !== mediaTypes.banner.sizes.length) {
    results.filterResults = {
      before: oldSizes,
      after: mediaTypes.banner.sizes
    };
  }

  return results;
}

function evaluateSizeConfig(configs) {
  return configs.reduce(function (results, config) {
    if (_typeof(config) === 'object' && typeof config.mediaQuery === 'string') {
      var ruleMatch = false; // TODO: (Prebid - 4.0) Remove empty mediaQuery string check. Disallow empty mediaQuery in sizeConfig.
      // Refer: https://github.com/prebid/Prebid.js/pull/4691, https://github.com/prebid/Prebid.js/issues/4810 for more details.

      if (config.mediaQuery === '') {
        ruleMatch = true;
      } else {
        try {
          ruleMatch = Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["getWindowTop"])().matchMedia(config.mediaQuery).matches;
        } catch (e) {
          Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["logWarn"])('Unfriendly iFrame blocks sizeConfig from being correctly evaluated');
          ruleMatch = matchMedia(config.mediaQuery).matches;
        }
      }

      if (ruleMatch) {
        if (Array.isArray(config.sizesSupported)) {
          results.shouldFilter = true;
        }

        ['labels', 'sizesSupported'].forEach(function (type) {
          return (config[type] || []).forEach(function (thing) {
            return results[type][thing] = true;
          });
        });
      }
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["logWarn"])('sizeConfig rule missing required property "mediaQuery"');
    }

    return results;
  }, {
    labels: {},
    sizesSupported: {},
    shouldFilter: false
  });
}

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(215);

module.exports = parent;


/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = store;
/* harmony export (immutable) */ __webpack_exports__["a"] = getCacheUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_js__ = __webpack_require__(0);
/**
 * This module interacts with the server used to cache video ad content to be restored later.
 * At a high level, the expected workflow goes like this:
 *
 *   - Request video ads from Bidders
 *   - Generate IDs for each valid bid, and cache the key/value pair on the server.
 *   - Return these IDs so that publishers can use them to fetch the bids later.
 *
 * This trickery helps integrate with ad servers, which set character limits on request params.
 */



/**
 * @typedef {object} CacheableUrlBid
 * @property {string} vastUrl A URL which loads some valid VAST XML.
 */

/**
 * @typedef {object} CacheablePayloadBid
 * @property {string} vastXml Some VAST XML which loads an ad in a video player.
 */

/**
 * A CacheableBid describes the types which the videoCache can store.
 *
 * @typedef {CacheableUrlBid|CacheablePayloadBid} CacheableBid
 */

/**
 * Function which wraps a URI that serves VAST XML, so that it can be loaded.
 *
 * @param {string} uri The URI where the VAST content can be found.
 * @param {string} impUrl An impression tracker URL for the delivery of the video ad
 * @return A VAST URL which loads XML from the given URI.
 */

function wrapURI(uri, impUrl) {
  // Technically, this is vulnerable to cross-script injection by sketchy vastUrl bids.
  // We could make sure it's a valid URI... but since we're loading VAST XML from the
  // URL they provide anyway, that's probably not a big deal.
  var vastImp = impUrl ? "<![CDATA[".concat(impUrl, "]]>") : "";
  return "<VAST version=\"3.0\">\n    <Ad>\n      <Wrapper>\n        <AdSystem>prebid.org wrapper</AdSystem>\n        <VASTAdTagURI><![CDATA[".concat(uri, "]]></VASTAdTagURI>\n        <Impression>").concat(vastImp, "</Impression>\n        <Creatives></Creatives>\n      </Wrapper>\n    </Ad>\n  </VAST>");
}
/**
 * Wraps a bid in the format expected by the prebid-server endpoints, or returns null if
 * the bid can't be converted cleanly.
 *
 * @param {CacheableBid} bid
 */


function toStorageRequest(bid) {
  var vastValue = bid.vastXml ? bid.vastXml : wrapURI(bid.vastUrl, bid.vastImpUrl);
  var payload = {
    type: 'xml',
    value: vastValue,
    ttlseconds: Number(bid.ttl)
  };

  if (__WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].getConfig('cache.vasttrack')) {
    payload.bidder = bid.bidder;
    payload.bidid = bid.requestId; // function has a thisArg set to bidderRequest for accessing the auctionStart

    if (__WEBPACK_IMPORTED_MODULE_2__utils_js__["isPlainObject"](this) && this.hasOwnProperty('auctionStart')) {
      payload.timestamp = this.auctionStart;
    }
  }

  if (typeof bid.customCacheKey === 'string' && bid.customCacheKey !== '') {
    payload.key = bid.customCacheKey;
  }

  return payload;
}
/**
 * A function which should be called with the results of the storage operation.
 *
 * @callback videoCacheStoreCallback
 *
 * @param {Error} [error] The error, if one occurred.
 * @param {?string[]} uuids An array of unique IDs. The array will have one element for each bid we were asked
 *   to store. It may include null elements if some of the bids were malformed, or an error occurred.
 *   Each non-null element in this array is a valid input into the retrieve function, which will fetch
 *   some VAST XML which can be used to render this bid's ad.
 */

/**
 * A function which bridges the APIs between the videoCacheStoreCallback and our ajax function's API.
 *
 * @param {videoCacheStoreCallback} done A callback to the "store" function.
 * @return {Function} A callback which interprets the cache server's responses, and makes up the right
 *   arguments for our callback.
 */


function shimStorageCallback(done) {
  return {
    success: function success(responseBody) {
      var ids;

      try {
        ids = JSON.parse(responseBody).responses;
      } catch (e) {
        done(e, []);
        return;
      }

      if (ids) {
        done(null, ids);
      } else {
        done(new Error("The cache server didn't respond with a responses property."), []);
      }
    },
    error: function error(statusText, responseBody) {
      done(new Error("Error storing video ad in the cache: ".concat(statusText, ": ").concat(JSON.stringify(responseBody))), []);
    }
  };
}
/**
 * If the given bid is for a Video ad, generate a unique ID and cache it somewhere server-side.
 *
 * @param {CacheableBid[]} bids A list of bid objects which should be cached.
 * @param {videoCacheStoreCallback} [done] An optional callback which should be executed after
 * @param {BidderRequest} [bidderRequest]
 * the data has been stored in the cache.
 */


function store(bids, done, bidderRequest) {
  var requestData = {
    puts: bids.map(toStorageRequest, bidderRequest)
  };
  Object(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* ajax */])(__WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].getConfig('cache.url'), shimStorageCallback(done), JSON.stringify(requestData), {
    contentType: 'text/plain',
    withCredentials: true
  });
}
function getCacheUrl(id) {
  return "".concat(__WEBPACK_IMPORTED_MODULE_1__config_js__["b" /* config */].getConfig('cache.url'), "?uuid=").concat(id);
}

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
var entryUnbind = __webpack_require__(52);

module.exports = entryUnbind('Array', 'find');


/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(14);
var $find = __webpack_require__(56).find;
var addToUnscopables = __webpack_require__(51);
var arrayMethodUsesToLength = __webpack_require__(60);

var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(27);
var propertyIsEnumerableModule = __webpack_require__(99);
var createPropertyDescriptor = __webpack_require__(46);
var toIndexedObject = __webpack_require__(47);
var toPrimitive = __webpack_require__(55);
var has = __webpack_require__(24);
var IE8_DOM_DEFINE = __webpack_require__(71);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ })

/******/ });
pbjsChunk([282],{

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(266);


/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_auctionManager_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_video_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_storageManager_js__ = __webpack_require__(9);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }











var BIDDER_CODE = 'appnexus';
var URL = 'https://ib.adnxs.com/ut/v3/prebid';
var VIDEO_TARGETING = ['id', 'minduration', 'maxduration', 'skippable', 'playback_method', 'frameworks', 'context', 'skipoffset'];
var USER_PARAMS = ['age', 'externalUid', 'segments', 'gender', 'dnt', 'language'];
var APP_DEVICE_PARAMS = ['geo', 'device_id']; // appid is collected separately

var DEBUG_PARAMS = ['enabled', 'dongle', 'member_id', 'debug_timeout'];
var VIDEO_MAPPING = {
  playback_method: {
    'unknown': 0,
    'auto_play_sound_on': 1,
    'auto_play_sound_off': 2,
    'click_to_play': 3,
    'mouse_over': 4,
    'auto_play_sound_unknown': 5
  },
  context: {
    'unknown': 0,
    'pre_roll': 1,
    'mid_roll': 2,
    'post_roll': 3,
    'outstream': 4,
    'in-banner': 5
  }
};
var NATIVE_MAPPING = {
  body: 'description',
  body2: 'desc2',
  cta: 'ctatext',
  image: {
    serverName: 'main_image',
    requiredParams: {
      required: true
    }
  },
  icon: {
    serverName: 'icon',
    requiredParams: {
      required: true
    }
  },
  sponsoredBy: 'sponsored_by',
  privacyLink: 'privacy_link',
  salePrice: 'saleprice',
  displayUrl: 'displayurl'
};
var SOURCE = 'pbjs';
var MAX_IMPS_PER_REQUEST = 15;
var mappingFileUrl = 'https://acdn.adnxs.com/prebid/appnexus-mapping/mappings.json';
var SCRIPT_TAG_START = '<script';
var VIEWABILITY_URL_START = /\/\/cdn\.adnxs\.com\/v/;
var VIEWABILITY_FILE_NAME = 'trk.js';
var GVLID = 32;
var storage = Object(__WEBPACK_IMPORTED_MODULE_9__src_storageManager_js__["b" /* getStorageManager */])(GVLID, BIDDER_CODE);
var spec = {
  code: BIDDER_CODE,
  gvlid: GVLID,
  aliases: [{
    code: 'appnexusAst',
    gvlid: 32
  }, {
    code: 'brealtime'
  }, {
    code: 'emxdigital',
    gvlid: 183
  }, {
    code: 'pagescience'
  }, {
    code: 'defymedia'
  }, {
    code: 'gourmetads'
  }, {
    code: 'matomy'
  }, {
    code: 'featureforward'
  }, {
    code: 'oftmedia'
  }, {
    code: 'districtm',
    gvlid: 144
  }, {
    code: 'adasta'
  }, {
    code: 'beintoo',
    gvlid: 618
  }],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.placementId || bid.params.member && bid.params.invCode);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var tags = bidRequests.map(bidToTag);
    var userObjBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasUserInfo);
    var userObj = {};

    if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('coppa') === true) {
      userObj = {
        'coppa': true
      };
    }

    if (userObjBid) {
      Object.keys(userObjBid.params.user).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(USER_PARAMS, param);
      }).forEach(function (param) {
        var uparam = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["convertCamelToUnderscore"](param);
        userObj[uparam] = userObjBid.params.user[param];
      });
    }

    var appDeviceObjBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasAppDeviceInfo);
    var appDeviceObj;

    if (appDeviceObjBid && appDeviceObjBid.params && appDeviceObjBid.params.app) {
      appDeviceObj = {};
      Object.keys(appDeviceObjBid.params.app).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(APP_DEVICE_PARAMS, param);
      }).forEach(function (param) {
        return appDeviceObj[param] = appDeviceObjBid.params.app[param];
      });
    }

    var appIdObjBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasAppId);
    var appIdObj;

    if (appIdObjBid && appIdObjBid.params && appDeviceObjBid.params.app && appDeviceObjBid.params.app.id) {
      appIdObj = {
        appid: appIdObjBid.params.app.id
      };
    }

    var debugObj = {};
    var debugObjParams = {};
    var debugCookieName = 'apn_prebid_debug';
    var debugCookie = storage.getCookie(debugCookieName) || null;

    if (debugCookie) {
      try {
        debugObj = JSON.parse(debugCookie);
      } catch (e) {
        __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"]('AppNexus Debug Auction Cookie Error:\n\n' + e);
      }
    } else {
      var debugBidRequest = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasDebug);

      if (debugBidRequest && debugBidRequest.debug) {
        debugObj = debugBidRequest.debug;
      }
    }

    if (debugObj && debugObj.enabled) {
      Object.keys(debugObj).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(DEBUG_PARAMS, param);
      }).forEach(function (param) {
        debugObjParams[param] = debugObj[param];
      });
    }

    var memberIdBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasMemberId);
    var member = memberIdBid ? parseInt(memberIdBid.params.member, 10) : 0;
    var schain = bidRequests[0].schain;
    var payload = {
      tags: _toConsumableArray(tags),
      user: userObj,
      sdk: {
        source: SOURCE,
        version: "4.2.0"
      },
      schain: schain
    };

    if (member > 0) {
      payload.member_id = member;
    }

    if (appDeviceObjBid) {
      payload.device = appDeviceObj;
    }

    if (appIdObjBid) {
      payload.app = appIdObj;
    }

    if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('adpod.brandCategoryExclusion')) {
      payload.brand_category_uniqueness = true;
    }

    if (debugObjParams.enabled) {
      payload.debug = debugObjParams;
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logInfo"]('AppNexus Debug Auction Settings:\n\n' + JSON.stringify(debugObjParams, null, 4));
    }

    if (bidderRequest && bidderRequest.gdprConsent) {
      // note - objects for impbus use underscore instead of camelCase
      payload.gdpr_consent = {
        consent_string: bidderRequest.gdprConsent.consentString,
        consent_required: bidderRequest.gdprConsent.gdprApplies
      };
    }

    if (bidderRequest && bidderRequest.uspConsent) {
      payload.us_privacy = bidderRequest.uspConsent;
    }

    if (bidderRequest && bidderRequest.refererInfo) {
      var refererinfo = {
        rd_ref: encodeURIComponent(bidderRequest.refererInfo.referer),
        rd_top: bidderRequest.refererInfo.reachedTop,
        rd_ifs: bidderRequest.refererInfo.numIframes,
        rd_stk: bidderRequest.refererInfo.stack.map(function (url) {
          return encodeURIComponent(url);
        }).join(',')
      };
      payload.referrer_detection = refererinfo;
    }

    var hasAdPodBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasAdPod);

    if (hasAdPodBid) {
      bidRequests.filter(hasAdPod).forEach(function (adPodBid) {
        var adPodTags = createAdPodRequest(tags, adPodBid); // don't need the original adpod placement because it's in adPodTags

        var nonPodTags = payload.tags.filter(function (tag) {
          return tag.uuid !== adPodBid.bidId;
        });
        payload.tags = [].concat(_toConsumableArray(nonPodTags), _toConsumableArray(adPodTags));
      });
    }

    var eids = [];
    var criteoId = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bidRequests[0], "userId.criteoId");

    if (criteoId) {
      eids.push({
        source: 'criteo.com',
        id: criteoId
      });
    }

    var tdid = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bidRequests[0], "userId.tdid");

    if (tdid) {
      eids.push({
        source: 'adserver.org',
        id: tdid,
        rti_partner: 'TDID'
      });
    }

    if (eids.length) {
      payload.eids = eids;
    }

    if (tags[0].publisher_id) {
      payload.publisher_id = tags[0].publisher_id;
    }

    var request = formatRequest(payload, bidderRequest);
    return request;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var _this = this;

    var bidderRequest = _ref.bidderRequest;
    serverResponse = serverResponse.body;
    var bids = [];

    if (!serverResponse || serverResponse.error) {
      var errorMessage = "in response for ".concat(bidderRequest.bidderCode, " adapter");

      if (serverResponse && serverResponse.error) {
        errorMessage += ": ".concat(serverResponse.error);
      }

      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"](errorMessage);
      return bids;
    }

    if (serverResponse.tags) {
      serverResponse.tags.forEach(function (serverBid) {
        var rtbBid = getRtbBid(serverBid);

        if (rtbBid) {
          if (rtbBid.cpm !== 0 && __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(_this.supportedMediaTypes, rtbBid.ad_type)) {
            var bid = newBid(serverBid, rtbBid, bidderRequest);
            bid.mediaType = parseMediaType(rtbBid);
            bids.push(bid);
          }
        }
      });
    }

    if (serverResponse.debug && serverResponse.debug.debug_info) {
      var debugHeader = 'AppNexus Debug Auction for Prebid\n\n';
      var debugText = debugHeader + serverResponse.debug.debug_info;
      debugText = debugText.replace(/(<td>|<th>)/gm, '\t') // Tables
      .replace(/(<\/td>|<\/th>)/gm, '\n') // Tables
      .replace(/^<br>/gm, '') // Remove leading <br>
      .replace(/(<br>\n|<br>)/gm, '\n') // <br>
      .replace(/<h1>(.*)<\/h1>/gm, '\n\n===== $1 =====\n\n') // Header H1
      .replace(/<h[2-6]>(.*)<\/h[2-6]>/gm, '\n\n*** $1 ***\n\n') // Headers
      .replace(/(<([^>]+)>)/igm, ''); // Remove any other tags

      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logMessage"]('https://console.appnexus.com/docs/understanding-the-debug-auction');
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logMessage"](debugText);
    }

    return bids;
  },

  /**
   * @typedef {Object} mappingFileInfo
   * @property {string} url  mapping file json url
   * @property {number} refreshInDays prebid stores mapping data in localstorage so you can return in how many days you want to update value stored in localstorage.
   * @property {string} localStorageKey unique key to store your mapping json in localstorage
   */

  /**
   * Returns mapping file info. This info will be used by bidderFactory to preload mapping file and store data in local storage
   * @returns {mappingFileInfo}
   */
  getMappingFileInfo: function getMappingFileInfo() {
    return {
      url: mappingFileUrl,
      refreshInDays: 2
    };
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: 'https://acdn.adnxs.com/dmp/async_usersync.html'
      }];
    }
  },
  transformBidParams: function transformBidParams(params, isOpenRtb) {
    params = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["convertTypes"]({
      'member': 'string',
      'invCode': 'string',
      'placementId': 'number',
      'keywords': __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["transformBidderParamKeywords"],
      'publisherId': 'number'
    }, params);

    if (isOpenRtb) {
      params.use_pmt_rule = typeof params.usePaymentRule === 'boolean' ? params.usePaymentRule : false;

      if (params.usePaymentRule) {
        delete params.usePaymentRule;
      }

      if (isPopulatedArray(params.keywords)) {
        params.keywords.forEach(deleteValues);
      }

      Object.keys(params).forEach(function (paramKey) {
        var convertedKey = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["convertCamelToUnderscore"](paramKey);

        if (convertedKey !== paramKey) {
          params[convertedKey] = params[paramKey];
          delete params[paramKey];
        }
      });
    }

    return params;
  },

  /**
   * Add element selector to javascript tracker to improve native viewability
   * @param {Bid} bid
   */
  onBidWon: function onBidWon(bid) {
    if (bid.native) {
      reloadViewabilityScriptWithCorrectParameters(bid);
    }
  }
};

function isPopulatedArray(arr) {
  return !!(__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](arr) && arr.length > 0);
}

function deleteValues(keyPairObj) {
  if (isPopulatedArray(keyPairObj.value) && keyPairObj.value[0] === '') {
    delete keyPairObj.value;
  }
}

function reloadViewabilityScriptWithCorrectParameters(bid) {
  var viewJsPayload = getAppnexusViewabilityScriptFromJsTrackers(bid.native.javascriptTrackers);

  if (viewJsPayload) {
    var prebidParams = 'pbjs_adid=' + bid.adId + ';pbjs_auc=' + bid.adUnitCode;
    var jsTrackerSrc = getViewabilityScriptUrlFromPayload(viewJsPayload);
    var newJsTrackerSrc = jsTrackerSrc.replace('dom_id=%native_dom_id%', prebidParams); // find iframe containing script tag

    var frameArray = document.getElementsByTagName('iframe'); // boolean var to modify only one script. That way if there are muliple scripts,
    // they won't all point to the same creative.

    var modifiedAScript = false; // first, loop on all ifames

    for (var i = 0; i < frameArray.length && !modifiedAScript; i++) {
      var currentFrame = frameArray[i];

      try {
        // IE-compatible, see https://stackoverflow.com/a/3999191/2112089
        var nestedDoc = currentFrame.contentDocument || currentFrame.contentWindow.document;

        if (nestedDoc) {
          // if the doc is present, we look for our jstracker
          var scriptArray = nestedDoc.getElementsByTagName('script');

          for (var j = 0; j < scriptArray.length && !modifiedAScript; j++) {
            var currentScript = scriptArray[j];

            if (currentScript.getAttribute('data-src') == jsTrackerSrc) {
              currentScript.setAttribute('src', newJsTrackerSrc);
              currentScript.setAttribute('data-src', '');

              if (currentScript.removeAttribute) {
                currentScript.removeAttribute('data-src');
              }

              modifiedAScript = true;
            }
          }
        }
      } catch (exception) {
        // trying to access a cross-domain iframe raises a SecurityError
        // this is expected and ignored
        if (!(exception instanceof DOMException && exception.name === 'SecurityError')) {
          // all other cases are raised again to be treated by the calling function
          throw exception;
        }
      }
    }
  }
}

function strIsAppnexusViewabilityScript(str) {
  var regexMatchUrlStart = str.match(VIEWABILITY_URL_START);
  var viewUrlStartInStr = regexMatchUrlStart != null && regexMatchUrlStart.length >= 1;
  var regexMatchFileName = str.match(VIEWABILITY_FILE_NAME);
  var fileNameInStr = regexMatchFileName != null && regexMatchFileName.length >= 1;
  return str.startsWith(SCRIPT_TAG_START) && fileNameInStr && viewUrlStartInStr;
}

function getAppnexusViewabilityScriptFromJsTrackers(jsTrackerArray) {
  var viewJsPayload;

  if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isStr"](jsTrackerArray) && strIsAppnexusViewabilityScript(jsTrackerArray)) {
    viewJsPayload = jsTrackerArray;
  } else if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](jsTrackerArray)) {
    for (var i = 0; i < jsTrackerArray.length; i++) {
      var currentJsTracker = jsTrackerArray[i];

      if (strIsAppnexusViewabilityScript(currentJsTracker)) {
        viewJsPayload = currentJsTracker;
      }
    }
  }

  return viewJsPayload;
}

function getViewabilityScriptUrlFromPayload(viewJsPayload) {
  // extracting the content of the src attribute
  // -> substring between src=" and "
  var indexOfFirstQuote = viewJsPayload.indexOf('src="') + 5; // offset of 5: the length of 'src=' + 1

  var indexOfSecondQuote = viewJsPayload.indexOf('"', indexOfFirstQuote);
  var jsTrackerSrc = viewJsPayload.substring(indexOfFirstQuote, indexOfSecondQuote);
  return jsTrackerSrc;
}

function hasPurpose1Consent(bidderRequest) {
  var result = true;

  if (bidderRequest && bidderRequest.gdprConsent) {
    if (bidderRequest.gdprConsent.gdprApplies && bidderRequest.gdprConsent.apiVersion === 2) {
      result = !!(__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bidderRequest.gdprConsent, 'vendorData.purpose.consents.1') === true);
    }
  }

  return result;
}

function formatRequest(payload, bidderRequest) {
  var request = [];
  var options = {};

  if (!hasPurpose1Consent(bidderRequest)) {
    options = {
      withCredentials: false
    };
  }

  if (payload.tags.length > MAX_IMPS_PER_REQUEST) {
    var clonedPayload = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepClone"](payload);
    __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["chunk"](payload.tags, MAX_IMPS_PER_REQUEST).forEach(function (tags) {
      clonedPayload.tags = tags;
      var payloadString = JSON.stringify(clonedPayload);
      request.push({
        method: 'POST',
        url: URL,
        data: payloadString,
        bidderRequest: bidderRequest,
        options: options
      });
    });
  } else {
    var payloadString = JSON.stringify(payload);
    request = {
      method: 'POST',
      url: URL,
      data: payloadString,
      bidderRequest: bidderRequest,
      options: options
    };
  }

  return request;
}

function newRenderer(adUnitCode, rtbBid) {
  var rendererOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var renderer = __WEBPACK_IMPORTED_MODULE_0__src_Renderer_js__["a" /* Renderer */].install({
    id: rtbBid.renderer_id,
    url: rtbBid.renderer_url,
    config: rendererOptions,
    loaded: false,
    adUnitCode: adUnitCode
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  renderer.setEventHandlers({
    impression: function impression() {
      return __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logMessage"]('AppNexus outstream video impression event');
    },
    loaded: function loaded() {
      return __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logMessage"]('AppNexus outstream video loaded event');
    },
    ended: function ended() {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logMessage"]('AppNexus outstream renderer video event');
      document.querySelector("#".concat(adUnitCode)).style.display = 'none';
    }
  });
  return renderer;
}
/**
 * Unpack the Server's Bid into a Prebid-compatible one.
 * @param serverBid
 * @param rtbBid
 * @param bidderRequest
 * @return Bid
 */


function newBid(serverBid, rtbBid, bidderRequest) {
  var bidRequest = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["getBidRequest"](serverBid.uuid, [bidderRequest]);
  var bid = {
    requestId: serverBid.uuid,
    cpm: rtbBid.cpm,
    creativeId: rtbBid.creative_id,
    dealId: rtbBid.deal_id,
    currency: 'USD',
    netRevenue: true,
    ttl: 300,
    adUnitCode: bidRequest.adUnitCode,
    appnexus: {
      buyerMemberId: rtbBid.buyer_member_id,
      dealPriority: rtbBid.deal_priority,
      dealCode: rtbBid.deal_code
    }
  };

  if (rtbBid.advertiser_id) {
    bid.meta = _extends({}, bid.meta, {
      advertiserId: rtbBid.advertiser_id
    });
  }

  if (rtbBid.rtb.video) {
    // shared video properties used for all 3 contexts
    _extends(bid, {
      width: rtbBid.rtb.video.player_width,
      height: rtbBid.rtb.video.player_height,
      vastImpUrl: rtbBid.notify_url,
      ttl: 3600
    });

    var videoContext = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.context');

    switch (videoContext) {
      case __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["a" /* ADPOD */]:
        var primaryCatId = Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__["getIabSubCategory"])(bidRequest.bidder, rtbBid.brand_category_id);
        bid.meta = _extends({}, bid.meta, {
          primaryCatId: primaryCatId
        });
        var dealTier = rtbBid.deal_priority;
        bid.video = {
          context: __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["a" /* ADPOD */],
          durationSeconds: Math.floor(rtbBid.rtb.video.duration_ms / 1000),
          dealTier: dealTier
        };
        bid.vastUrl = rtbBid.rtb.video.asset_url;
        break;

      case __WEBPACK_IMPORTED_MODULE_8__src_video_js__["b" /* OUTSTREAM */]:
        bid.adResponse = serverBid;
        bid.adResponse.ad = bid.adResponse.ads[0];
        bid.adResponse.ad.video = bid.adResponse.ad.rtb.video;
        bid.vastXml = rtbBid.rtb.video.content;

        if (rtbBid.renderer_url) {
          var videoBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidderRequest.bids, function (bid) {
            return bid.bidId === serverBid.uuid;
          });
          var rendererOptions = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](videoBid, 'renderer.options');
          bid.renderer = newRenderer(bid.adUnitCode, rtbBid, rendererOptions);
        }

        break;

      case __WEBPACK_IMPORTED_MODULE_8__src_video_js__["a" /* INSTREAM */]:
        bid.vastUrl = rtbBid.notify_url + '&redir=' + encodeURIComponent(rtbBid.rtb.video.asset_url);
        break;
    }
  } else if (rtbBid.rtb[__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]]) {
    var nativeAd = rtbBid.rtb[__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]]; // setting up the jsTracker:
    // we put it as a data-src attribute so that the tracker isn't called
    // until we have the adId (see onBidWon)

    var jsTrackerDisarmed = rtbBid.viewability.config.replace('src=', 'data-src=');
    var jsTrackers = nativeAd.javascript_trackers;

    if (jsTrackers == undefined) {
      jsTrackers = jsTrackerDisarmed;
    } else if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isStr"](jsTrackers)) {
      jsTrackers = [jsTrackers, jsTrackerDisarmed];
    } else {
      jsTrackers.push(jsTrackerDisarmed);
    }

    bid[__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]] = {
      title: nativeAd.title,
      body: nativeAd.desc,
      body2: nativeAd.desc2,
      cta: nativeAd.ctatext,
      rating: nativeAd.rating,
      sponsoredBy: nativeAd.sponsored,
      privacyLink: nativeAd.privacy_link,
      address: nativeAd.address,
      downloads: nativeAd.downloads,
      likes: nativeAd.likes,
      phone: nativeAd.phone,
      price: nativeAd.price,
      salePrice: nativeAd.saleprice,
      clickUrl: nativeAd.link.url,
      displayUrl: nativeAd.displayurl,
      clickTrackers: nativeAd.link.click_trackers,
      impressionTrackers: nativeAd.impression_trackers,
      javascriptTrackers: jsTrackers
    };

    if (nativeAd.main_img) {
      bid['native'].image = {
        url: nativeAd.main_img.url,
        height: nativeAd.main_img.height,
        width: nativeAd.main_img.width
      };
    }

    if (nativeAd.icon) {
      bid['native'].icon = {
        url: nativeAd.icon.url,
        height: nativeAd.icon.height,
        width: nativeAd.icon.width
      };
    }
  } else {
    _extends(bid, {
      width: rtbBid.rtb.banner.width,
      height: rtbBid.rtb.banner.height,
      ad: rtbBid.rtb.banner.content
    });

    try {
      if (rtbBid.rtb.trackers) {
        var url = rtbBid.rtb.trackers[0].impression_urls[0];
        var tracker = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["createTrackPixelHtml"](url);
        bid.ad += tracker;
      }
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"]('Error appending tracking pixel', error);
    }
  }

  return bid;
}

function bidToTag(bid) {
  var tag = {};
  tag.sizes = transformSizes(bid.sizes);
  tag.primary_size = tag.sizes[0];
  tag.ad_types = [];
  tag.uuid = bid.bidId;

  if (bid.params.placementId) {
    tag.id = parseInt(bid.params.placementId, 10);
  } else {
    tag.code = bid.params.invCode;
  }

  tag.allow_smaller_sizes = bid.params.allowSmallerSizes || false;
  tag.use_pmt_rule = bid.params.usePaymentRule || false;
  tag.prebid = true;
  tag.disable_psa = true;

  if (bid.params.reserve) {
    tag.reserve = bid.params.reserve;
  }

  if (bid.params.position) {
    tag.position = {
      'above': 1,
      'below': 2
    }[bid.params.position] || 0;
  }

  if (bid.params.trafficSourceCode) {
    tag.traffic_source_code = bid.params.trafficSourceCode;
  }

  if (bid.params.privateSizes) {
    tag.private_sizes = transformSizes(bid.params.privateSizes);
  }

  if (bid.params.supplyType) {
    tag.supply_type = bid.params.supplyType;
  }

  if (bid.params.pubClick) {
    tag.pubclick = bid.params.pubClick;
  }

  if (bid.params.extInvCode) {
    tag.ext_inv_code = bid.params.extInvCode;
  }

  if (bid.params.publisherId) {
    tag.publisher_id = parseInt(bid.params.publisherId, 10);
  }

  if (bid.params.externalImpId) {
    tag.external_imp_id = bid.params.externalImpId;
  }

  if (!__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isEmpty"](bid.params.keywords)) {
    var keywords = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["transformBidderParamKeywords"](bid.params.keywords);

    if (keywords.length > 0) {
      keywords.forEach(deleteValues);
    }

    tag.keywords = keywords;
  }

  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */] || __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]))) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]);

    if (tag.sizes.length === 0) {
      tag.sizes = transformSizes([1, 1]);
    }

    if (bid.nativeParams) {
      var nativeRequest = buildNativeRequest(bid.nativeParams);
      tag[__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]] = {
        layouts: [nativeRequest]
      };
    }
  }

  var videoMediaType = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */]));
  var context = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.context');

  if (videoMediaType && context === 'adpod') {
    tag.hb_source = 7;
  } else {
    tag.hb_source = 1;
  }

  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */] || videoMediaType) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */]);
  } // instream gets vastUrl, outstream gets vastXml


  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */] || videoMediaType && context !== 'outstream') {
    tag.require_asset_url = true;
  }

  if (bid.params.video) {
    tag.video = {}; // place any valid video params on the tag

    Object.keys(bid.params.video).filter(function (param) {
      return __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(VIDEO_TARGETING, param);
    }).forEach(function (param) {
      switch (param) {
        case 'context':
        case 'playback_method':
          var type = bid.params.video[param];
          type = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](type) ? type[0] : type;
          tag.video[param] = VIDEO_MAPPING[param][type];
          break;

        default:
          tag.video[param] = bid.params.video[param];
      }
    });
  }

  if (bid.renderer) {
    tag.video = _extends({}, tag.video, {
      custom_renderer_present: true
    });
  }

  var adUnit = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(__WEBPACK_IMPORTED_MODULE_5__src_auctionManager_js__["a" /* auctionManager */].getAdUnits(), function (au) {
    return bid.transactionId === au.transactionId;
  });

  if (adUnit && adUnit.mediaTypes && adUnit.mediaTypes.banner) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */]);
  }

  if (tag.ad_types.length === 0) {
    delete tag.ad_types;
  }

  return tag;
}
/* Turn bid request sizes into ut-compatible format */


function transformSizes(requestSizes) {
  var sizes = [];
  var sizeObj = {};

  if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](requestSizes) && requestSizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](requestSizes[0])) {
    sizeObj.width = parseInt(requestSizes[0], 10);
    sizeObj.height = parseInt(requestSizes[1], 10);
    sizes.push(sizeObj);
  } else if (_typeof(requestSizes) === 'object') {
    for (var i = 0; i < requestSizes.length; i++) {
      var size = requestSizes[i];
      sizeObj = {};
      sizeObj.width = parseInt(size[0], 10);
      sizeObj.height = parseInt(size[1], 10);
      sizes.push(sizeObj);
    }
  }

  return sizes;
}

function hasUserInfo(bid) {
  return !!bid.params.user;
}

function hasMemberId(bid) {
  return !!parseInt(bid.params.member, 10);
}

function hasAppDeviceInfo(bid) {
  if (bid.params) {
    return !!bid.params.app;
  }
}

function hasAppId(bid) {
  if (bid.params && bid.params.app) {
    return !!bid.params.app.id;
  }

  return !!bid.params.app;
}

function hasDebug(bid) {
  return !!bid.debug;
}

function hasAdPod(bid) {
  return bid.mediaTypes && bid.mediaTypes.video && bid.mediaTypes.video.context === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["a" /* ADPOD */];
}
/**
 * Expand an adpod placement into a set of request objects according to the
 * total adpod duration and the range of duration seconds. Sets minduration/
 * maxduration video property according to requireExactDuration configuration
 */


function createAdPodRequest(tags, adPodBid) {
  var _adPodBid$mediaTypes$ = adPodBid.mediaTypes.video,
      durationRangeSec = _adPodBid$mediaTypes$.durationRangeSec,
      requireExactDuration = _adPodBid$mediaTypes$.requireExactDuration;
  var numberOfPlacements = getAdPodPlacementNumber(adPodBid.mediaTypes.video);
  var maxDuration = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["getMaxValueFromArray"](durationRangeSec);
  var tagToDuplicate = tags.filter(function (tag) {
    return tag.uuid === adPodBid.bidId;
  });
  var request = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["fill"].apply(__WEBPACK_IMPORTED_MODULE_1__src_utils_js__, _toConsumableArray(tagToDuplicate).concat([numberOfPlacements]));

  if (requireExactDuration) {
    var divider = Math.ceil(numberOfPlacements / durationRangeSec.length);
    var chunked = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["chunk"](request, divider); // each configured duration is set as min/maxduration for a subset of requests

    durationRangeSec.forEach(function (duration, index) {
      chunked[index].map(function (tag) {
        setVideoProperty(tag, 'minduration', duration);
        setVideoProperty(tag, 'maxduration', duration);
      });
    });
  } else {
    // all maxdurations should be the same
    request.map(function (tag) {
      return setVideoProperty(tag, 'maxduration', maxDuration);
    });
  }

  return request;
}

function getAdPodPlacementNumber(videoParams) {
  var adPodDurationSec = videoParams.adPodDurationSec,
      durationRangeSec = videoParams.durationRangeSec,
      requireExactDuration = videoParams.requireExactDuration;
  var minAllowedDuration = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["getMinValueFromArray"](durationRangeSec);
  var numberOfPlacements = Math.floor(adPodDurationSec / minAllowedDuration);
  return requireExactDuration ? Math.max(numberOfPlacements, durationRangeSec.length) : numberOfPlacements;
}

function setVideoProperty(tag, key, value) {
  if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isEmpty"](tag.video)) {
    tag.video = {};
  }

  tag.video[key] = value;
}

function getRtbBid(tag) {
  return tag && tag.ads && tag.ads.length && __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(tag.ads, function (ad) {
    return ad.rtb;
  });
}

function buildNativeRequest(params) {
  var request = {}; // map standard prebid native asset identifier to /ut parameters
  // e.g., tag specifies `body` but /ut only knows `description`.
  // mapping may be in form {tag: '<server name>'} or
  // {tag: {serverName: '<server name>', requiredParams: {...}}}

  Object.keys(params).forEach(function (key) {
    // check if one of the <server name> forms is used, otherwise
    // a mapping wasn't specified so pass the key straight through
    var requestKey = NATIVE_MAPPING[key] && NATIVE_MAPPING[key].serverName || NATIVE_MAPPING[key] || key; // required params are always passed on request

    var requiredParams = NATIVE_MAPPING[key] && NATIVE_MAPPING[key].requiredParams;
    request[requestKey] = _extends({}, requiredParams, params[key]); // convert the sizes of image/icon assets to proper format (if needed)

    var isImageAsset = !!(requestKey === NATIVE_MAPPING.image.serverName || requestKey === NATIVE_MAPPING.icon.serverName);

    if (isImageAsset && request[requestKey].sizes) {
      var sizes = request[requestKey].sizes;

      if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArrayOfNums"](sizes) || __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](sizes) && sizes.length > 0 && sizes.every(function (sz) {
        return __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArrayOfNums"](sz);
      })) {
        request[requestKey].sizes = transformSizes(request[requestKey].sizes);
      }
    }

    if (requestKey === NATIVE_MAPPING.privacyLink) {
      request.privacy_supported = true;
    }
  });
  return request;
}
/**
 * This function hides google div container for outstream bids to remove unwanted space on page. Appnexus renderer creates a new iframe outside of google iframe to render the outstream creative.
 * @param {string} elementId element id
 */


function hidedfpContainer(elementId) {
  var el = document.getElementById(elementId).querySelectorAll("div[id^='google_ads']");

  if (el[0]) {
    el[0].style.setProperty('display', 'none');
  }
}

function outstreamRender(bid) {
  // push to render queue because ANOutstreamVideo may not be loaded yet
  hidedfpContainer(bid.adUnitCode);
  bid.renderer.push(function () {
    window.ANOutstreamVideo.renderAd({
      tagId: bid.adResponse.tag_id,
      sizes: [bid.getSize().split('x')],
      targetId: bid.adUnitCode,
      // target div id to render video
      uuid: bid.adResponse.uuid,
      adResponse: bid.adResponse,
      rendererOptions: bid.renderer.getConfig()
    }, handleOutstreamRendererEvents.bind(null, bid));
  });
}

function handleOutstreamRendererEvents(bid, id, eventName) {
  bid.renderer.handleVideoEvent({
    id: id,
    eventName: eventName
  });
}

function parseMediaType(rtbBid) {
  var adType = rtbBid.ad_type;

  if (adType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */]) {
    return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */];
  } else if (adType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]) {
    return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */];
  } else {
    return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */];
  }
}

Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[265]);
pbjsChunk([248],{

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(338);


/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allowAuction", function() { return allowAuction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userCMP", function() { return userCMP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consentTimeout", function() { return consentTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gdprScope", function() { return gdprScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticConsentData", function() { return staticConsentData; });
/* harmony export (immutable) */ __webpack_exports__["requestBidsHook"] = requestBidsHook;
/* harmony export (immutable) */ __webpack_exports__["resetConsentData"] = resetConsentData;
/* harmony export (immutable) */ __webpack_exports__["setConsentConfig"] = setConsentConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_string_includes_js__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_string_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_string_includes_js__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This module adds GDPR consentManagement support to prebid.js.  It interacts with
 * supported CMPs (Consent Management Platforms) to grab the user's consent information
 * and make it available for any GDPR supported adapters to read/pass this information to
 * their system.
 */





var DEFAULT_CMP = 'iab';
var DEFAULT_CONSENT_TIMEOUT = 10000;
var DEFAULT_ALLOW_AUCTION_WO_CONSENT = true;
var allowAuction = {
  value: DEFAULT_ALLOW_AUCTION_WO_CONSENT,
  definedInConfig: false
};
var userCMP;
var consentTimeout;
var gdprScope;
var staticConsentData;
var cmpVersion = 0;
var consentData;
var addedConsentHook = false; // add new CMPs here, with their dedicated lookup function

var cmpCallMap = {
  'iab': lookupIabConsent,
  'static': lookupStaticConsentData
};
/**
 * This function reads the consent string from the config to obtain the consent information of the user.
 * @param {function(string)} cmpSuccess acts as a success callback when the value is read from config; pass along consentObject (string) from CMP
 * @param {function(string)} cmpError acts as an error callback while interacting with the config string; pass along an error message (string)
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 */

function lookupStaticConsentData(cmpSuccess, cmpError, hookConfig) {
  cmpSuccess(staticConsentData, hookConfig);
}
/**
 * This function handles interacting with an IAB compliant CMP to obtain the consent information of the user.
 * Given the async nature of the CMP's API, we pass in acting success/error callback functions to exit this function
 * based on the appropriate result.
 * @param {function(string)} cmpSuccess acts as a success callback when CMP returns a value; pass along consentObject (string) from CMP
 * @param {function(string)} cmpError acts as an error callback while interacting with CMP; pass along an error message (string)
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 */


function lookupIabConsent(cmpSuccess, cmpError, hookConfig) {
  function findCMP() {
    var f = window;
    var cmpFrame;
    var cmpFunction;

    while (!cmpFrame) {
      try {
        if (typeof f.__tcfapi === 'function' || typeof f.__cmp === 'function') {
          if (typeof f.__tcfapi === 'function') {
            cmpVersion = 2;
            cmpFunction = f.__tcfapi;
          } else {
            cmpVersion = 1;
            cmpFunction = f.__cmp;
          }

          cmpFrame = f;
          break;
        }
      } catch (e) {} // need separate try/catch blocks due to the exception errors thrown when trying to check for a frame that doesn't exist in 3rd party env


      try {
        if (f.frames['__tcfapiLocator']) {
          cmpVersion = 2;
          cmpFrame = f;
          break;
        }
      } catch (e) {}

      try {
        if (f.frames['__cmpLocator']) {
          cmpVersion = 1;
          cmpFrame = f;
          break;
        }
      } catch (e) {}

      if (f === window.top) break;
      f = f.parent;
    }

    return {
      cmpFrame: cmpFrame,
      cmpFunction: cmpFunction
    };
  }

  function v2CmpResponseCallback(tcfData, success) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('Received a response from CMP', tcfData);

    if (success) {
      if (tcfData.eventStatus === 'tcloaded' || tcfData.eventStatus === 'useractioncomplete') {
        cmpSuccess(tcfData, hookConfig);
      } else if (tcfData.eventStatus === 'cmpuishown' && tcfData.tcString && tcfData.purposeOneTreatment === true) {
        cmpSuccess(tcfData, hookConfig);
      }
    } else {
      cmpError('CMP unable to register callback function.  Please check CMP setup.', hookConfig);
    }
  }

  function handleV1CmpResponseCallbacks() {
    var cmpResponse = {};

    function afterEach() {
      if (cmpResponse.getConsentData && cmpResponse.getVendorConsents) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('Received all requested responses from CMP', cmpResponse);
        cmpSuccess(cmpResponse, hookConfig);
      }
    }

    return {
      consentDataCallback: function consentDataCallback(consentResponse) {
        cmpResponse.getConsentData = consentResponse;
        afterEach();
      },
      vendorConsentsCallback: function vendorConsentsCallback(consentResponse) {
        cmpResponse.getVendorConsents = consentResponse;
        afterEach();
      }
    };
  }

  var v1CallbackHandler = handleV1CmpResponseCallbacks();
  var cmpCallbacks = {};

  var _findCMP = findCMP(),
      cmpFrame = _findCMP.cmpFrame,
      cmpFunction = _findCMP.cmpFunction;

  if (!cmpFrame) {
    return cmpError('CMP not found.', hookConfig);
  } // to collect the consent information from the user, we perform two calls to the CMP in parallel:
  // first to collect the user's consent choices represented in an encoded string (via getConsentData)
  // second to collect the user's full unparsed consent information (via getVendorConsents)
  // the following code also determines where the CMP is located and uses the proper workflow to communicate with it:
  // check to see if CMP is found on the same window level as prebid and call it directly if so
  // check to see if prebid is in a safeframe (with CMP support)
  // else assume prebid may be inside an iframe and use the IAB CMP locator code to see if CMP's located in a higher parent window. this works in cross domain iframes
  // if the CMP is not found, the iframe function will call the cmpError exit callback to abort the rest of the CMP workflow


  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isFn"](cmpFunction)) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('Detected CMP API is directly accessible, calling it now...');

    if (cmpVersion === 1) {
      cmpFunction('getConsentData', null, v1CallbackHandler.consentDataCallback);
      cmpFunction('getVendorConsents', null, v1CallbackHandler.vendorConsentsCallback);
    } else if (cmpVersion === 2) {
      cmpFunction('addEventListener', cmpVersion, v2CmpResponseCallback);
    }
  } else if (cmpVersion === 1 && inASafeFrame() && typeof window.$sf.ext.cmp === 'function') {
    // this safeframe workflow is only supported with TCF v1 spec; the v2 recommends to use the iframe postMessage route instead (even if you are in a safeframe).
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('Detected Prebid.js is encased in a SafeFrame and CMP is registered, calling it now...');
    callCmpWhileInSafeFrame('getConsentData', v1CallbackHandler.consentDataCallback);
    callCmpWhileInSafeFrame('getVendorConsents', v1CallbackHandler.vendorConsentsCallback);
  } else {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('Detected CMP is outside the current iframe where Prebid.js is located, calling it now...');

    if (cmpVersion === 1) {
      callCmpWhileInIframe('getConsentData', cmpFrame, v1CallbackHandler.consentDataCallback);
      callCmpWhileInIframe('getVendorConsents', cmpFrame, v1CallbackHandler.vendorConsentsCallback);
    } else if (cmpVersion === 2) {
      callCmpWhileInIframe('addEventListener', cmpFrame, v2CmpResponseCallback);
    }
  }

  function inASafeFrame() {
    return !!(window.$sf && window.$sf.ext);
  }

  function callCmpWhileInSafeFrame(commandName, callback) {
    function sfCallback(msgName, data) {
      if (msgName === 'cmpReturn') {
        var responseObj = commandName === 'getConsentData' ? data.vendorConsentData : data.vendorConsents;
        callback(responseObj);
      }
    } // find sizes from adUnits object


    var adUnits = hookConfig.adUnits;
    var width = 1;
    var height = 1;

    if (Array.isArray(adUnits) && adUnits.length > 0) {
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getAdUnitSizes"](adUnits[0]);
      width = sizes[0][0];
      height = sizes[0][1];
    }

    window.$sf.ext.register(width, height, sfCallback);
    window.$sf.ext.cmp(commandName);
  }

  function callCmpWhileInIframe(commandName, cmpFrame, moduleCallback) {
    var apiName = cmpVersion === 2 ? '__tcfapi' : '__cmp';
    /* Setup up a __cmp function to do the postMessage and stash the callback.
      This function behaves (from the caller's perspective identicially to the in-frame __cmp call */

    window[apiName] = function (cmd, arg, callback) {
      var callId = Math.random() + '';
      var callName = "".concat(apiName, "Call");

      var msg = _defineProperty({}, callName, {
        command: cmd,
        parameter: arg,
        callId: callId
      });

      if (cmpVersion !== 1) msg[callName].version = cmpVersion;
      cmpCallbacks[callId] = callback;
      cmpFrame.postMessage(msg, '*');
    };
    /** when we get the return message, call the stashed callback */


    window.addEventListener('message', readPostMessageResponse, false); // call CMP

    window[apiName](commandName, null, moduleCallback);

    function readPostMessageResponse(event) {
      var cmpDataPkgName = "".concat(apiName, "Return");
      var json = typeof event.data === 'string' && __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_string_includes_js___default()(event.data, cmpDataPkgName) ? JSON.parse(event.data) : event.data;

      if (json[cmpDataPkgName] && json[cmpDataPkgName].callId) {
        var payload = json[cmpDataPkgName]; // TODO - clean up this logic (move listeners?); we have duplicate messages responses because 2 eventlisteners are active from the 2 cmp requests running in parallel

        if (typeof cmpCallbacks[payload.callId] !== 'undefined') {
          cmpCallbacks[payload.callId](payload.returnValue, payload.success);
        }
      }
    }
  }
}
/**
 * If consentManagement module is enabled (ie included in setConfig), this hook function will attempt to fetch the
 * user's encoded consent string from the supported CMP.  Once obtained, the module will store this
 * data as part of a gdprConsent object which gets transferred to adapterManager's gdprDataHandler object.
 * This information is later added into the bidRequest object for any supported adapters to read/pass along to their system.
 * @param {object} reqBidsConfigObj required; This is the same param that's used in pbjs.requestBids.
 * @param {function} fn required; The next function in the chain, used by hook.js
 */


function requestBidsHook(fn, reqBidsConfigObj) {
  // preserves all module related variables for the current auction instance (used primiarily for concurrent auctions)
  var hookConfig = {
    context: this,
    args: [reqBidsConfigObj],
    nextFn: fn,
    adUnits: reqBidsConfigObj.adUnits || pbjs.adUnits,
    bidsBackHandler: reqBidsConfigObj.bidsBackHandler,
    haveExited: false,
    timer: null
  }; // in case we already have consent (eg during bid refresh)

  if (consentData) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('User consent information already known.  Pulling internally stored information...');
    return exitModule(null, hookConfig);
  }

  if (!__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(Object.keys(cmpCallMap), userCMP)) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("CMP framework (".concat(userCMP, ") is not a supported framework.  Aborting consentManagement module and resuming auction."));
    return hookConfig.nextFn.apply(hookConfig.context, hookConfig.args);
  }

  cmpCallMap[userCMP].call(this, processCmpData, cmpFailed, hookConfig); // only let this code run if module is still active (ie if the callbacks used by CMPs haven't already finished)

  if (!hookConfig.haveExited) {
    if (consentTimeout === 0) {
      processCmpData(undefined, hookConfig);
    } else {
      hookConfig.timer = setTimeout(cmpTimedOut.bind(null, hookConfig), consentTimeout);
    }
  }
}
/**
 * This function checks the consent data provided by CMP to ensure it's in an expected state.
 * If it's bad, we exit the module depending on config settings.
 * If it's good, then we store the value and exits the module.
 * @param {object} consentObject required; object returned by CMP that contains user's consent choices
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 */

function processCmpData(consentObject, hookConfig) {
  function checkV1Data(consentObject) {
    var gdprApplies = consentObject && consentObject.getConsentData && consentObject.getConsentData.gdprApplies;
    return !!(typeof gdprApplies !== 'boolean' || gdprApplies === true && !(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](consentObject.getConsentData.consentData) && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](consentObject.getVendorConsents) && Object.keys(consentObject.getVendorConsents).length > 1));
  }

  function checkV2Data() {
    // if CMP does not respond with a gdprApplies boolean, use defaultGdprScope (gdprScope)
    var gdprApplies = consentObject && typeof consentObject.gdprApplies === 'boolean' ? consentObject.gdprApplies : gdprScope;
    var tcString = consentObject && consentObject.tcString;
    return !!(typeof gdprApplies !== 'boolean' || gdprApplies === true && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](tcString));
  } // do extra things for static config


  if (userCMP === 'static') {
    cmpVersion = consentObject.getConsentData ? 1 : consentObject.getTCData ? 2 : 0; // remove extra layer in static v2 data object so it matches normal v2 CMP object for processing step

    if (cmpVersion === 2) {
      consentObject = consentObject.getTCData;
    }
  } // determine which set of checks to run based on cmpVersion


  var checkFn = cmpVersion === 1 ? checkV1Data : cmpVersion === 2 ? checkV2Data : null; // Raise deprecation warning if 'allowAuctionWithoutConsent' is used with TCF 2.

  if (allowAuction.definedInConfig && cmpVersion === 2) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("'allowAuctionWithoutConsent' ignored for TCF 2");
  } else if (!allowAuction.definedInConfig && cmpVersion === 1) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("'allowAuctionWithoutConsent' using system default: (".concat(DEFAULT_ALLOW_AUCTION_WO_CONSENT, ")."));
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isFn"](checkFn)) {
    if (checkFn(consentObject)) {
      cmpFailed("CMP returned unexpected value during lookup process.", hookConfig, consentObject);
    } else {
      clearTimeout(hookConfig.timer);
      storeConsentData(consentObject);
      exitModule(null, hookConfig);
    }
  } else {
    cmpFailed('Unable to derive CMP version to process data.  Consent object does not conform to TCF v1 or v2 specs.', hookConfig, consentObject);
  }
}
/**
 * General timeout callback when interacting with CMP takes too long.
 */


function cmpTimedOut(hookConfig) {
  cmpFailed('CMP workflow exceeded timeout threshold.', hookConfig);
}
/**
 * This function contains the controlled steps to perform when there's a problem with CMP.
 * @param {string} errMsg required; should be a short descriptive message for why the failure/issue happened.
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 * @param {object} extraArgs contains additional data that's passed along in the error/warning messages for easier debugging
*/


function cmpFailed(errMsg, hookConfig, extraArgs) {
  clearTimeout(hookConfig.timer); // still set the consentData to undefined when there is a problem as per config options

  if (allowAuction.value && cmpVersion === 1) {
    storeConsentData(undefined);
  }

  exitModule(errMsg, hookConfig, extraArgs);
}
/**
 * Stores CMP data locally in module and then invokes gdprDataHandler.setConsentData() to make information available in adaptermanger.js for later in the auction
 * @param {object} cmpConsentObject required; an object representing user's consent choices (can be undefined in certain use-cases for this function only)
 */


function storeConsentData(cmpConsentObject) {
  if (cmpVersion === 1) {
    consentData = {
      consentString: cmpConsentObject ? cmpConsentObject.getConsentData.consentData : undefined,
      vendorData: cmpConsentObject ? cmpConsentObject.getVendorConsents : undefined,
      gdprApplies: cmpConsentObject ? cmpConsentObject.getConsentData.gdprApplies : gdprScope
    };
  } else {
    consentData = {
      consentString: cmpConsentObject ? cmpConsentObject.tcString : undefined,
      vendorData: cmpConsentObject || undefined,
      gdprApplies: cmpConsentObject && typeof cmpConsentObject.gdprApplies === 'boolean' ? cmpConsentObject.gdprApplies : gdprScope
    };
  }

  consentData.apiVersion = cmpVersion;
  __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["gdprDataHandler"].setConsentData(consentData);
}
/**
 * This function handles the exit logic for the module.
 * While there are several paths in the module's logic to call this function, we only allow 1 of the 3 potential exits to happen before suppressing others.
 *
 * We prevent multiple exits to avoid conflicting messages in the console depending on certain scenarios.
 * One scenario could be auction was canceled due to timeout with CMP being reached.
 * While the timeout is the accepted exit and runs first, the CMP's callback still tries to process the user's data (which normally leads to a good exit).
 * In this case, the good exit will be suppressed since we already decided to cancel the auction.
 *
 * Three exit paths are:
 * 1. good exit where auction runs (CMP data is processed normally).
 * 2. bad exit but auction still continues (warning message is logged, CMP data is undefined and still passed along).
 * 3. bad exit with auction canceled (error message is logged).
 * @param {string} errMsg optional; only to be used when there was a 'bad' exit.  String is a descriptive message for the failure/issue encountered.
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 * @param {object} extraArgs contains additional data that's passed along in the error/warning messages for easier debugging
 */


function exitModule(errMsg, hookConfig, extraArgs) {
  if (hookConfig.haveExited === false) {
    hookConfig.haveExited = true;
    var context = hookConfig.context;
    var args = hookConfig.args;
    var nextFn = hookConfig.nextFn;

    if (errMsg) {
      if (allowAuction.value && cmpVersion === 1) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](errMsg + " 'allowAuctionWithoutConsent' activated.", extraArgs);
        nextFn.apply(context, args);
      } else {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](errMsg + ' Canceling auction as per consentManagement config.', extraArgs);

        if (typeof hookConfig.bidsBackHandler === 'function') {
          hookConfig.bidsBackHandler();
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Error executing bidsBackHandler');
        }
      }
    } else {
      nextFn.apply(context, args);
    }
  }
}
/**
 * Simply resets the module's consentData variable back to undefined, mainly for testing purposes
 */


function resetConsentData() {
  consentData = undefined;
  userCMP = undefined;
  cmpVersion = 0;
  __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["gdprDataHandler"].setConsentData(null);
}
/**
 * A configuration function that initializes some module variables, as well as add a hook into the requestBids function
 * @param {{cmp:string, timeout:number, allowAuctionWithoutConsent:boolean, defaultGdprScope:boolean}} config required; consentManagement module config settings; cmp (string), timeout (int), allowAuctionWithoutConsent (boolean)
 */

function setConsentConfig(config) {
  // if `config.gdpr` or `config.usp` exist, assume new config format.
  // else for backward compatability, just use `config`
  config = config.gdpr || config.usp ? config.gdpr : config;

  if (!config || _typeof(config) !== 'object') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('consentManagement config not defined, exiting consent manager');
    return;
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](config.cmpApi)) {
    userCMP = config.cmpApi;
  } else {
    userCMP = DEFAULT_CMP;
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("consentManagement config did not specify cmp.  Using system default setting (".concat(DEFAULT_CMP, ")."));
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](config.timeout)) {
    consentTimeout = config.timeout;
  } else {
    consentTimeout = DEFAULT_CONSENT_TIMEOUT;
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("consentManagement config did not specify timeout.  Using system default setting (".concat(DEFAULT_CONSENT_TIMEOUT, ")."));
  }

  if (typeof config.allowAuctionWithoutConsent === 'boolean') {
    allowAuction.value = config.allowAuctionWithoutConsent;
    allowAuction.definedInConfig = true;
  } // if true, then gdprApplies should be set to true


  gdprScope = config.defaultGdprScope === true;
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('consentManagement module has been activated...');

  if (userCMP === 'static') {
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](config.consentData)) {
      staticConsentData = config.consentData;
      consentTimeout = 0;
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("consentManagement config with cmpApi: 'static' did not specify consentData. No consents will be available to adapters.");
    }
  }

  if (!addedConsentHook) {
    pbjs.requestBids.before(requestBidsHook, 50);
  }

  addedConsentHook = true;
}
__WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('consentManagement', function (config) {
  return setConsentConfig(config.consentManagement);
});

/***/ })

},[337]);
pbjsChunk([194],{

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(465);


/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_number_is_integer_js__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_number_is_integer_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_number_is_integer_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_adapters_bidderFactory_js__ = __webpack_require__(1);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }







var BIDDER_CODE = 'ix';
var SECURE_BID_URL = 'https://htlb.casalemedia.com/cygnus';
var SUPPORTED_AD_TYPES = [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]];
var BANNER_ENDPOINT_VERSION = 7.2;
var VIDEO_ENDPOINT_VERSION = 8.1;
var CENT_TO_DOLLAR_FACTOR = 100;
var BANNER_TIME_TO_LIVE = 300;
var VIDEO_TIME_TO_LIVE = 3600; // 1hr

var NET_REVENUE = true;
var PRICE_TO_DOLLAR_FACTOR = {
  JPY: 1
};
var USER_SYNC_URL = 'https://js-sec.indexww.com/um/ixmatch.html';
/**
 * Transform valid bid request config object to banner impression object that will be sent to ad server.
 *
 * @param  {object} bid A valid bid request config object.
 * @return {object}     A impression object that will be sent to ad server.
 */

function bidToBannerImp(bid) {
  var imp = bidToImp(bid);
  imp.banner = {};
  imp.banner.w = bid.params.size[0];
  imp.banner.h = bid.params.size[1];
  imp.banner.topframe = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["inIframe"]() ? 0 : 1;
  return imp;
}
/**
 * Transform valid bid request config object to video impression object that will be sent to ad server.
 *
 * @param  {object} bid A valid bid request config object.
 * @return {object}     A impression object that will be sent to ad server.
 */


function bidToVideoImp(bid) {
  var imp = bidToImp(bid);
  imp.video = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](bid.params.video);
  imp.video.w = bid.params.size[0];
  imp.video.h = bid.params.size[1];
  var context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.context');

  if (context) {
    if (context === 'instream') {
      imp.video.placement = 1;
    } else if (context === 'outstream') {
      imp.video.placement = 4;
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("ix bidder params: video context '".concat(context, "' is not supported"));
    }
  }

  return imp;
}

function bidToImp(bid) {
  var imp = {};
  imp.id = bid.bidId;
  imp.ext = {};
  imp.ext.siteID = bid.params.siteId;

  if (bid.params.hasOwnProperty('id') && (typeof bid.params.id === 'string' || typeof bid.params.id === 'number')) {
    imp.ext.sid = String(bid.params.id);
  } else {
    imp.ext.sid = "".concat(bid.params.size[0], "x").concat(bid.params.size[1]);
  }

  if (bid.params.hasOwnProperty('bidFloor') && bid.params.hasOwnProperty('bidFloorCur')) {
    imp.bidfloor = bid.params.bidFloor;
    imp.bidfloorcur = bid.params.bidFloorCur;
  }

  return imp;
}
/**
 * Parses a raw bid for the relevant information.
 *
 * @param  {object} rawBid   The bid to be parsed.
 * @param  {string} currency Global currency in bid response.
 * @return {object} bid      The parsed bid.
 */


function parseBid(rawBid, currency, bidRequest) {
  var bid = {};

  if (PRICE_TO_DOLLAR_FACTOR.hasOwnProperty(currency)) {
    bid.cpm = rawBid.price / PRICE_TO_DOLLAR_FACTOR[currency];
  } else {
    bid.cpm = rawBid.price / CENT_TO_DOLLAR_FACTOR;
  }

  bid.requestId = rawBid.impid;
  bid.dealId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](rawBid, 'ext.dealid');
  bid.netRevenue = NET_REVENUE;
  bid.currency = currency;
  bid.creativeId = rawBid.hasOwnProperty('crid') ? rawBid.crid : '-'; // in the event of a video

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](rawBid, 'ext.vasturl')) {
    bid.vastUrl = rawBid.ext.vasturl;
    bid.width = bidRequest.video.w;
    bid.height = bidRequest.video.h;
    bid.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */];
    bid.ttl = VIDEO_TIME_TO_LIVE;
  } else {
    bid.ad = rawBid.adm;
    bid.width = rawBid.w;
    bid.height = rawBid.h;
    bid.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */];
    bid.ttl = BANNER_TIME_TO_LIVE;
  }

  bid.meta = {};
  bid.meta.networkId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](rawBid, 'ext.dspid');
  bid.meta.brandId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](rawBid, 'ext.advbrandid');
  bid.meta.brandName = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](rawBid, 'ext.advbrand');

  if (rawBid.adomain && rawBid.adomain.length > 0) {
    bid.meta.advertiserDomains = rawBid.adomain;
  }

  return bid;
}
/**
 * Determines whether or not the given object is valid size format.
 *
 * @param  {*}       size The object to be validated.
 * @return {boolean}      True if this is a valid size format, and false otherwise.
 */


function isValidSize(size) {
  return Array.isArray(size) && size.length === 2 && __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_number_is_integer_js___default()(size[0]) && __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_number_is_integer_js___default()(size[1]);
}
/**
 * Determines whether or not the given size object is an element of the size
 * array.
 *
 * @param  {array}  sizeArray The size array.
 * @param  {object} size      The size object.
 * @return {boolean}          True if the size object is an element of the size array, and false
 *                            otherwise.
 */


function includesSize(sizeArray, size) {
  if (isValidSize(sizeArray)) {
    return sizeArray[0] === size[0] && sizeArray[1] === size[1];
  }

  for (var i = 0; i < sizeArray.length; i++) {
    if (sizeArray[i][0] === size[0] && sizeArray[i][1] === size[1]) {
      return true;
    }
  }

  return false;
}
/**
 * Determines whether or not the given bidFloor parameters are valid.
 *
 * @param  {*}       bidFloor    The bidFloor parameter inside bid request config.
 * @param  {*}       bidFloorCur The bidFloorCur parameter inside bid request config.
 * @return {boolean}             True if this is a valid bidFloor parameters format, and false
 *                               otherwise.
 */


function isValidBidFloorParams(bidFloor, bidFloorCur) {
  var curRegex = /^[A-Z]{3}$/;
  return Boolean(typeof bidFloor === 'number' && typeof bidFloorCur === 'string' && bidFloorCur.match(curRegex));
}
/**
 * Finds the impression with the associated id.
 *
 * @param  {*}      id          Id of the impression.
 * @param  {array}  impressions List of impressions sent in the request.
 * @return {object}             The impression with the associated id.
 */


function getBidRequest(id, impressions) {
  if (!id) {
    return;
  }

  return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(impressions, function (imp) {
    return imp.id === id;
  });
}
/**
 * Adds a User ID module's response into user Eids array.
 *
 * @param  {array}  userEids       An array of objects containing user ids,
 *                                 will be attached to bid request later.
 * @param  {object} seenIdPartners An object with Identity partners names already added,
 *                                 updated with new partner name.
 * @param  {*}      id             The id obtained from User ID module.
 * @param  {string} source         The URL of the User ID module.
 * @param  {string} ixlPartnerName The name of the Identity Partner in IX Library.
 * @param  {string} rtiPartner     The name of the User ID provider in Prebid.
 * @return {boolean}               True if successfully added the ID to the userEids, false otherwise.
 */


function addUserEids(userEids, seenIdPartners, id, source, ixlPartnerName, rtiPartner) {
  if (id) {
    // mark the partnername that IX RTI uses
    seenIdPartners[ixlPartnerName] = 1;
    userEids.push({
      source: source,
      uids: [{
        id: id,
        ext: {
          rtiPartner: rtiPartner
        }
      }]
    });
    return true;
  }

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Tried to add a user ID from Prebid, the ID received was null');
  return false;
}
/**
 * Builds a request object to be sent to the ad server based on bid requests.
 *
 * @param  {array}  validBidRequests A list of valid bid request config objects.
 * @param  {object} bidderRequest    An object containing other info like gdprConsent.
 * @param  {array}  impressions      List of impression objects describing the bids.
 * @param  {array}  version          Endpoint version denoting banner or video.
 * @return {object}                  Info describing the request to the server.
 *
 */


function buildRequest(validBidRequests, bidderRequest, impressions, version) {
  var userEids = []; // Always use secure HTTPS protocol.

  var baseUrl = SECURE_BID_URL; // Dict for identity partners already populated from prebid

  var seenIdPartners = {}; // Get ids from Prebid User ID Modules

  var userId = validBidRequests[0].userId;

  if (userId && _typeof(userId) === 'object') {
    if (userId.idl_env) {
      addUserEids(userEids, seenIdPartners, userId.idl_env, 'liveramp.com', 'LiveRampIp', 'idl');
    }
  } // RTI ids will be included in the bid request if the function getIdentityInfo() is loaded
  // and if the data for the partner exist


  if (window.headertag && typeof window.headertag.getIdentityInfo === 'function') {
    var identityInfo = window.headertag.getIdentityInfo();

    if (identityInfo && _typeof(identityInfo) === 'object') {
      for (var partnerName in identityInfo) {
        if (identityInfo.hasOwnProperty(partnerName)) {
          // check if not already populated by prebid cache
          if (!seenIdPartners.hasOwnProperty(partnerName)) {
            var response = identityInfo[partnerName];

            if (!response.responsePending && response.data && _typeof(response.data) === 'object' && Object.keys(response.data).length) {
              userEids.push(response.data);
            }
          }
        }
      }
    }
  }

  var r = {}; // Since bidderRequestId are the same for different bid request, just use the first one.

  r.id = validBidRequests[0].bidderRequestId;
  r.imp = impressions;
  r.site = {};
  r.ext = {};
  r.ext.source = 'prebid'; // if an schain is provided, send it along

  if (validBidRequests[0].schain) {
    r.source = {
      ext: {
        schain: validBidRequests[0].schain
      }
    };
  }

  if (userEids.length > 0) {
    r.user = {};
    r.user.eids = userEids;
  }

  if (document.referrer && document.referrer !== '') {
    r.site.ref = document.referrer;
  } // Apply GDPR information to the request if GDPR is enabled.


  if (bidderRequest) {
    if (bidderRequest.gdprConsent) {
      var gdprConsent = bidderRequest.gdprConsent;

      if (gdprConsent.hasOwnProperty('gdprApplies')) {
        r.regs = {
          ext: {
            gdpr: gdprConsent.gdprApplies ? 1 : 0
          }
        };
      }

      if (gdprConsent.hasOwnProperty('consentString')) {
        r.user = r.user || {};
        r.user.ext = {
          consent: gdprConsent.consentString || ''
        };
      }
    }

    if (bidderRequest.uspConsent) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](r, 'regs.ext.us_privacy', bidderRequest.uspConsent);
    }

    if (bidderRequest.refererInfo) {
      r.site.page = bidderRequest.refererInfo.referer;
    }
  }

  var payload = {}; // Parse additional runtime configs.

  var bidderCode = bidderRequest && bidderRequest.bidderCode || 'ix';
  var otherIxConfig = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig(bidderCode);

  if (otherIxConfig) {
    // Append firstPartyData to r.site.page if firstPartyData exists.
    if (_typeof(otherIxConfig.firstPartyData) === 'object') {
      var firstPartyData = otherIxConfig.firstPartyData;
      var firstPartyString = '?';

      for (var key in firstPartyData) {
        if (firstPartyData.hasOwnProperty(key)) {
          firstPartyString += "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(firstPartyData[key]), "&");
        }
      }

      firstPartyString = firstPartyString.slice(0, -1);
      r.site.page += firstPartyString;
    } // Create t in payload if timeout is configured.


    if (typeof otherIxConfig.timeout === 'number') {
      payload.t = otherIxConfig.timeout;
    }
  } // Use the siteId in the first bid request as the main siteId.


  payload.s = validBidRequests[0].params.siteId;
  payload.v = version;
  payload.r = JSON.stringify(r);
  payload.ac = 'j';
  payload.sd = 1;

  if (version === VIDEO_ENDPOINT_VERSION) {
    payload.nf = 1;
  }

  return {
    method: 'GET',
    url: baseUrl,
    data: payload
  };
}
/**
 *
 * @param  {array}   bannerSizeList list of banner sizes
 * @param  {array}   bannerSize the size to be removed
 * @return {boolean} true if succesfully removed, false if not found
 */


function removeFromSizes(bannerSizeList, bannerSize) {
  for (var i = 0; i < bannerSizeList.length; i++) {
    if (bannerSize[0] == bannerSizeList[i][0] && bannerSize[1] == bannerSizeList[i][1]) {
      bannerSizeList.splice(i, 1);
      return true;
    }
  } // size not found


  return false;
}
/**
 * Updates the Object to track missing banner sizes.
 *
 * @param {object} validBidRequest    The bid request for an ad unit's with a configured size.
 * @param {object} missingBannerSizes The object containing missing banner sizes
 * @param {object} imp                The impression for the bidrequest
 */


function updateMissingSizes(validBidRequest, missingBannerSizes, imp) {
  var transactionID = validBidRequest.transactionId;

  if (missingBannerSizes.hasOwnProperty(transactionID)) {
    var currentSizeList = [];

    if (missingBannerSizes[transactionID].hasOwnProperty('missingSizes')) {
      currentSizeList = missingBannerSizes[transactionID].missingSizes;
    }

    removeFromSizes(currentSizeList, validBidRequest.params.size);
    missingBannerSizes[transactionID].missingSizes = currentSizeList;
  } else {
    // New Ad Unit
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequest, 'mediaTypes.banner.sizes')) {
      var sizeList = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](validBidRequest.mediaTypes.banner.sizes);
      removeFromSizes(sizeList, validBidRequest.params.size);
      var newAdUnitEntry = {
        'missingSizes': sizeList,
        'impression': imp
      };
      missingBannerSizes[transactionID] = newAdUnitEntry;
    }
  }
}
/**
 *
 * @param  {object} imp      Impression object to be modified
 * @param  {array}  newSize  The new size to be applied
 * @return {object} newImp   Updated impression object
 */


function createMissingBannerImp(imp, newSize) {
  var newImp = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](imp);
  newImp.ext.sid = "".concat(newSize[0], "x").concat(newSize[1]);
  newImp.banner.w = newSize[0];
  newImp.banner.h = newSize[1];
  return newImp;
}

var spec = {
  code: BIDDER_CODE,
  gvlid: 10,
  supportedMediaTypes: SUPPORTED_AD_TYPES,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param  {object}  bid The bid to validate.
   * @return {boolean}     True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!isValidSize(bid.params.size)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('ix bidder params: bid size has invalid format.');
      return false;
    }

    if (!includesSize(bid.sizes, bid.params.size)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('ix bidder params: bid size is not included in ad unit sizes.');
      return false;
    }

    if (bid.hasOwnProperty('mediaType') && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["contains"](SUPPORTED_AD_TYPES, bid.mediaType)) {
      return false;
    }

    if (bid.hasOwnProperty('mediaTypes') && !(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner.sizes') || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.playerSize'))) {
      return false;
    }

    if (typeof bid.params.siteId !== 'string' && typeof bid.params.siteId !== 'number') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('ix bidder params: siteId must be string or number value.');
      return false;
    }

    var hasBidFloor = bid.params.hasOwnProperty('bidFloor');
    var hasBidFloorCur = bid.params.hasOwnProperty('bidFloorCur');

    if (hasBidFloor || hasBidFloorCur) {
      if (!(hasBidFloor && hasBidFloorCur && isValidBidFloorParams(bid.params.bidFloor, bid.params.bidFloorCur))) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('ix bidder params: bidFloor / bidFloorCur parameter has invalid format.');
        return false;
      }
    }

    return true;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param  {array}  validBidRequests A list of valid bid request config objects.
   * @param  {object} bidderRequest    A object contains bids and other info like gdprConsent.
   * @return {object}                  Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var reqs = [];
    var bannerImps = [];
    var videoImps = [];
    var validBidRequest = null; // To capture the missing sizes i.e not configured for ix

    var missingBannerSizes = {};

    for (var i = 0; i < validBidRequests.length; i++) {
      validBidRequest = validBidRequests[i];

      if (validBidRequest.mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */] || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequest, 'mediaTypes.video')) {
        if (validBidRequest.mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */] || includesSize(validBidRequest.mediaTypes.video.playerSize, validBidRequest.params.size)) {
          videoImps.push(bidToVideoImp(validBidRequest));
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Bid size is not included in video playerSize');
        }
      }

      if (validBidRequest.mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */] || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequest, 'mediaTypes.banner') || !validBidRequest.mediaType && !validBidRequest.mediaTypes) {
        var imp = bidToBannerImp(validBidRequest);
        bannerImps.push(imp);
        updateMissingSizes(validBidRequest, missingBannerSizes, imp);
      }
    } // Finding the missing banner sizes ,and making impressions for them


    for (var transactionID in missingBannerSizes) {
      if (missingBannerSizes.hasOwnProperty(transactionID)) {
        var missingSizes = missingBannerSizes[transactionID].missingSizes;

        for (var _i = 0; _i < missingSizes.length; _i++) {
          var origImp = missingBannerSizes[transactionID].impression;
          var newImp = createMissingBannerImp(origImp, missingSizes[_i]);
          bannerImps.push(newImp);
        }
      }
    }

    if (bannerImps.length > 0) {
      reqs.push(buildRequest(validBidRequests, bidderRequest, bannerImps, BANNER_ENDPOINT_VERSION));
    }

    if (videoImps.length > 0) {
      reqs.push(buildRequest(validBidRequests, bidderRequest, videoImps, VIDEO_ENDPOINT_VERSION));
    }

    return reqs;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param  {object} serverResponse A successful response from the server.
   * @param  {object} bidderRequest  The bid request sent to the server.
   * @return {array}                 An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidderRequest) {
    var bids = [];
    var bid = null;

    if (!serverResponse.hasOwnProperty('body') || !serverResponse.body.hasOwnProperty('seatbid')) {
      return bids;
    }

    var responseBody = serverResponse.body;
    var seatbid = responseBody.seatbid;

    for (var i = 0; i < seatbid.length; i++) {
      if (!seatbid[i].hasOwnProperty('bid')) {
        continue;
      } // Transform rawBid in bid response to the format that will be accepted by prebid.


      var innerBids = seatbid[i].bid;
      var requestBid = JSON.parse(bidderRequest.data.r);

      for (var j = 0; j < innerBids.length; j++) {
        var bidRequest = getBidRequest(innerBids[j].impid, requestBid.imp);
        bid = parseBid(innerBids[j], responseBody.cur, bidRequest);
        bids.push(bid);
      }
    }

    return bids;
  },

  /**
   * Covert bid param types for S2S
   * @param {Object} params bid params
   * @param {Boolean} isOpenRtb boolean to check openrtb2 protocol
   * @return {Object} params bid params
   */
  transformBidParams: function transformBidParams(params, isOpenRtb) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["convertTypes"]({
      'siteID': 'number'
    }, params);
  },

  /**
   * Determine which user syncs should occur
   * @param {object} syncOptions
   * @param {array} serverResponses
   * @returns {array} User sync pixels
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    return syncOptions.iframeEnabled ? [{
      type: 'iframe',
      url: USER_SYNC_URL
    }] : [];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_5__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[464]);
pbjsChunk([25],{

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(592);


/***/ }),

/***/ 592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["resetSyncedStatus"] = resetSyncedStatus;
/* harmony export (immutable) */ __webpack_exports__["resetWurlMap"] = resetWurlMap;
/* harmony export (immutable) */ __webpack_exports__["PrebidServer"] = PrebidServer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapter_js__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_bidfactory_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_native_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_events_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_events_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__src_events_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__config_js__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_pure_features_array_find_js__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }















var getConfig = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig;
var TYPE = __WEBPACK_IMPORTED_MODULE_3__src_constants_json__["S2S"].SRC;
var _synced = false;
var DEFAULT_S2S_TTL = 60;
var DEFAULT_S2S_CURRENCY = 'USD';
var DEFAULT_S2S_NETREVENUE = true;

var _s2sConfig;
/**
 * @typedef {Object} AdapterOptions
 * @summary s2sConfig parameter that adds arguments to resulting OpenRTB payload that goes to Prebid Server
 * @example
 * // example of multiple bidder configuration
 * pbjs.setConfig({
 *    s2sConfig: {
 *       adapterOptions: {
 *          rubicon: {singleRequest: false}
 *          appnexus: {key: "value"}
 *       }
 *    }
 * });
 */

/**
 * @typedef {Object} S2SDefaultConfig
 * @property {boolean} enabled
 * @property {number} timeout
 * @property {number} maxBids
 * @property {string} adapter
 * @property {AdapterOptions} adapterOptions
 */

/**
 * @type {S2SDefaultConfig}
 */


var s2sDefaultConfig = {
  enabled: false,
  timeout: 1000,
  maxBids: 1,
  adapter: 'prebidServer',
  adapterOptions: {},
  syncUrlModifier: {}
};
__WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].setDefaults({
  's2sConfig': s2sDefaultConfig
});
/**
 * Set config for server to server header bidding
 * @typedef {Object} options - required
 * @property {boolean} enabled enables S2S bidding
 * @property {string[]} bidders bidders to request S2S
 * @property {string} endpoint endpoint to contact
 *  === optional params below ===
 * @property {number} [timeout] timeout for S2S bidders - should be lower than `pbjs.requestBids({timeout})`
 * @property {number} [defaultTtl] ttl for S2S bidders when pbs does not return a ttl on the response - defaults to 60`
 * @property {boolean} [cacheMarkup] whether to cache the adm result
 * @property {string} [adapter] adapter code to use for S2S
 * @property {string} [syncEndpoint] endpoint URL for syncing cookies
 * @property {Object} [extPrebid] properties will be merged into request.ext.prebid
 * @property {AdapterOptions} [adapterOptions] adds arguments to resulting OpenRTB payload to Prebid Server
 */

function setS2sConfig(options) {
  if (options.defaultVendor) {
    var vendor = options.defaultVendor;
    var optionKeys = Object.keys(options);

    if (__WEBPACK_IMPORTED_MODULE_11__config_js__["a" /* S2S_VENDORS */][vendor]) {
      // vendor keys will be set if either: the key was not specified by user
      // or if the user did not set their own distinct value (ie using the system default) to override the vendor
      Object.keys(__WEBPACK_IMPORTED_MODULE_11__config_js__["a" /* S2S_VENDORS */][vendor]).forEach(function (vendorKey) {
        if (s2sDefaultConfig[vendorKey] === options[vendorKey] || !__WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js___default()(optionKeys, vendorKey)) {
          options[vendorKey] = __WEBPACK_IMPORTED_MODULE_11__config_js__["a" /* S2S_VENDORS */][vendor][vendorKey];
        }
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('Incorrect or unavailable prebid server default vendor option: ' + vendor);
      return false;
    }
  }

  var keys = Object.keys(options);

  if (['accountId', 'bidders', 'endpoint'].filter(function (key) {
    if (!__WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js___default()(keys, key)) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"](key + ' missing in server to server config');
      return true;
    }

    return false;
  }).length > 0) {
    return;
  }

  _s2sConfig = options;
}

getConfig('s2sConfig', function (_ref) {
  var s2sConfig = _ref.s2sConfig;
  return setS2sConfig(s2sConfig);
});
/**
 * resets the _synced variable back to false, primiarily used for testing purposes
*/

function resetSyncedStatus() {
  _synced = false;
}
/**
 * @param  {Array} bidderCodes list of bidders to request user syncs for.
 */

function queueSync(bidderCodes, gdprConsent, uspConsent) {
  if (_synced) {
    return;
  }

  _synced = true;
  var payload = {
    uuid: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["generateUUID"](),
    bidders: bidderCodes,
    account: _s2sConfig.accountId
  };
  var userSyncLimit = _s2sConfig.userSyncLimit;

  if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isNumber"](userSyncLimit) && userSyncLimit > 0) {
    payload['limit'] = userSyncLimit;
  }

  if (gdprConsent) {
    // only populate gdpr field if we know CMP returned consent information (ie didn't timeout or have an error)
    if (typeof gdprConsent.consentString !== 'undefined') {
      payload.gdpr = gdprConsent.gdprApplies ? 1 : 0;
    } // attempt to populate gdpr_consent if we know gdprApplies or it may apply


    if (gdprConsent.gdprApplies !== false) {
      payload.gdpr_consent = gdprConsent.consentString;
    }
  } // US Privace (CCPA) support


  if (uspConsent) {
    payload.us_privacy = uspConsent;
  }

  var jsonPayload = JSON.stringify(payload);
  Object(__WEBPACK_IMPORTED_MODULE_12__src_ajax_js__["a" /* ajax */])(_s2sConfig.syncEndpoint, function (response) {
    try {
      response = JSON.parse(response);
      doAllSyncs(response.bidder_status);
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"](e);
    }
  }, jsonPayload, {
    contentType: 'text/plain',
    withCredentials: true
  });
}

function doAllSyncs(bidders) {
  if (bidders.length === 0) {
    return;
  }

  var thisSync = bidders.pop();

  if (thisSync.no_cookie) {
    doPreBidderSync(thisSync.usersync.type, thisSync.usersync.url, thisSync.bidder, __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["bind"].call(doAllSyncs, null, bidders));
  } else {
    doAllSyncs(bidders);
  }
}
/**
 * Modify the cookie sync url from prebid server to add new params.
 *
 * @param {string} type the type of sync, "image", "redirect", "iframe"
 * @param {string} url the url to sync
 * @param {string} bidder name of bidder doing sync for
 * @param {function} done an exit callback; to signify this pixel has either: finished rendering or something went wrong
 */


function doPreBidderSync(type, url, bidder, done) {
  if (_s2sConfig.syncUrlModifier && typeof _s2sConfig.syncUrlModifier[bidder] === 'function') {
    var newSyncUrl = _s2sConfig.syncUrlModifier[bidder](type, url, bidder);

    doBidderSync(type, newSyncUrl, bidder, done);
  } else {
    doBidderSync(type, url, bidder, done);
  }
}
/**
 * Run a cookie sync for the given type, url, and bidder
 *
 * @param {string} type the type of sync, "image", "redirect", "iframe"
 * @param {string} url the url to sync
 * @param {string} bidder name of bidder doing sync for
 * @param {function} done an exit callback; to signify this pixel has either: finished rendering or something went wrong
 */


function doBidderSync(type, url, bidder, done) {
  if (!url) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]("No sync url for bidder \"".concat(bidder, "\": ").concat(url));
    done();
  } else if (type === 'image' || type === 'redirect') {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"]("Invoking image pixel user sync for bidder: \"".concat(bidder, "\""));
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["triggerPixel"](url, done);
  } else if (type == 'iframe') {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"]("Invoking iframe user sync for bidder: \"".concat(bidder, "\""));
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["insertUserSyncIframe"](url, done);
  } else {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]("User sync type \"".concat(type, "\" not supported for bidder: \"").concat(bidder, "\""));
    done();
  }
}
/**
 * Do client-side syncs for bidders.
 *
 * @param {Array} bidders a list of bidder names
 */


function doClientSideSyncs(bidders) {
  bidders.forEach(function (bidder) {
    var clientAdapter = __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].getBidAdapter(bidder);

    if (clientAdapter && clientAdapter.registerSyncs) {
      clientAdapter.registerSyncs([]);
    }
  });
}

function _appendSiteAppDevice(request, pageUrl) {
  if (!request) return; // ORTB specifies app OR site

  if (_typeof(__WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('app')) === 'object') {
    request.app = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('app');
    request.app.publisher = {
      id: _s2sConfig.accountId
    };
  } else {
    request.site = {};

    if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](__WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('site'))) {
      request.site = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('site');
    } // set publisher.id if not already defined


    if (!__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](request.site, 'publisher.id')) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request.site, 'publisher.id', _s2sConfig.accountId);
    } // set site.page if not already defined


    if (!request.site.page) {
      request.site.page = pageUrl;
    }
  }

  if (_typeof(__WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('device')) === 'object') {
    request.device = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('device');
  }

  if (!request.device) {
    request.device = {};
  }

  if (!request.device.w) {
    request.device.w = window.innerWidth;
  }

  if (!request.device.h) {
    request.device.h = window.innerHeight;
  }
}

function addBidderFirstPartyDataToRequest(request) {
  var bidderConfig = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getBidderConfig();
  var fpdConfigs = Object.keys(bidderConfig).reduce(function (acc, bidder) {
    var currBidderConfig = bidderConfig[bidder];

    if (currBidderConfig.fpd) {
      var fpd = {};

      if (currBidderConfig.fpd.context) {
        fpd.site = currBidderConfig.fpd.context;
      }

      if (currBidderConfig.fpd.user) {
        fpd.user = currBidderConfig.fpd.user;
      }

      acc.push({
        bidders: [bidder],
        config: {
          fpd: fpd
        }
      });
    }

    return acc;
  }, []);

  if (fpdConfigs.length) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'ext.prebid.bidderconfig', fpdConfigs);
  }
} // https://iabtechlab.com/wp-content/uploads/2016/07/OpenRTB-Native-Ads-Specification-Final-1.2.pdf#page=40


var nativeDataIdMap = {
  sponsoredBy: 1,
  // sponsored
  body: 2,
  // desc
  rating: 3,
  likes: 4,
  downloads: 5,
  price: 6,
  salePrice: 7,
  phone: 8,
  address: 9,
  body2: 10,
  // desc2
  cta: 12 // ctatext

};
var nativeDataNames = Object.keys(nativeDataIdMap);
var nativeImgIdMap = {
  icon: 1,
  image: 3
};
var nativeEventTrackerEventMap = {
  impression: 1,
  'viewable-mrc50': 2,
  'viewable-mrc100': 3,
  'viewable-video50': 4
};
var nativeEventTrackerMethodMap = {
  img: 1,
  js: 2
}; // enable reverse lookup

[nativeDataIdMap, nativeImgIdMap, nativeEventTrackerEventMap, nativeEventTrackerMethodMap].forEach(function (map) {
  Object.keys(map).forEach(function (key) {
    map[map[key]] = key;
  });
});
/*
 * Protocol spec for OpenRTB endpoint
 * e.g., https://<prebid-server-url>/v1/openrtb2/auction
 */

var bidIdMap = {};
var nativeAssetCache = {}; // store processed native params to preserve

/**
 * map wurl to auction id and adId for use in the BID_WON event
 */

var wurlMap = {};
/**
 * @param {string} auctionId
 * @param {string} adId generated value set to bidObject.adId by bidderFactory Bid()
 * @param {string} wurl events.winurl passed from prebidServer as wurl
 */

function addWurl(auctionId, adId, wurl) {
  if ([auctionId, adId].every(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])) {
    wurlMap["".concat(auctionId).concat(adId)] = wurl;
  }
}
/**
 * @param {string} auctionId
 * @param {string} adId generated value set to bidObject.adId by bidderFactory Bid()
 */


function removeWurl(auctionId, adId) {
  if ([auctionId, adId].every(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])) {
    wurlMap["".concat(auctionId).concat(adId)] = undefined;
  }
}
/**
 * @param {string} auctionId
 * @param {string} adId generated value set to bidObject.adId by bidderFactory Bid()
 * @return {(string|undefined)} events.winurl which was passed as wurl
 */


function getWurl(auctionId, adId) {
  if ([auctionId, adId].every(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])) {
    return wurlMap["".concat(auctionId).concat(adId)];
  }
}
/**
 * remove all cached wurls
 */


function resetWurlMap() {
  wurlMap = {};
}
var OPEN_RTB_PROTOCOL = {
  buildRequest: function buildRequest(s2sBidRequest, bidRequests, adUnits) {
    var imps = [];
    var aliases = {};
    var firstBidRequest = bidRequests[0]; // transform ad unit into array of OpenRTB impression objects

    adUnits.forEach(function (adUnit) {
      var nativeParams = Object(__WEBPACK_IMPORTED_MODULE_7__src_native_js__["g" /* processNativeAdUnitParams */])(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adUnit, 'mediaTypes.native'));
      var nativeAssets;

      if (nativeParams) {
        try {
          nativeAssets = nativeAssetCache[adUnit.code] = Object.keys(nativeParams).reduce(function (assets, type) {
            var params = nativeParams[type];

            function newAsset(obj) {
              return _extends({
                required: params.required ? 1 : 0
              }, obj ? __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["cleanObj"](obj) : {});
            }

            switch (type) {
              case 'image':
              case 'icon':
                var imgTypeId = nativeImgIdMap[type];
                var asset = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["cleanObj"]({
                  type: imgTypeId,
                  w: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](params, 'sizes.0'),
                  h: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](params, 'sizes.1'),
                  wmin: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](params, 'aspect_ratios.0.min_width'),
                  hmin: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](params, 'aspect_ratios.0.min_height')
                });

                if (!(asset.w && asset.h || asset.hmin && asset.wmin)) {
                  throw 'invalid img sizes (must provide sizes or min_height & min_width if using aspect_ratios)';
                }

                if (Array.isArray(params.aspect_ratios)) {
                  // pass aspect_ratios as ext data I guess?
                  asset.ext = {
                    aspectratios: params.aspect_ratios.map(function (ratio) {
                      return "".concat(ratio.ratio_width, ":").concat(ratio.ratio_height);
                    })
                  };
                }

                assets.push(newAsset({
                  img: asset
                }));
                break;

              case 'title':
                if (!params.len) {
                  throw 'invalid title.len';
                }

                assets.push(newAsset({
                  title: {
                    len: params.len
                  }
                }));
                break;

              default:
                var dataAssetTypeId = nativeDataIdMap[type];

                if (dataAssetTypeId) {
                  assets.push(newAsset({
                    data: {
                      type: dataAssetTypeId,
                      len: params.len
                    }
                  }));
                }

            }

            return assets;
          }, []);
        } catch (e) {
          __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('error creating native request: ' + String(e));
        }
      }

      var videoParams = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adUnit, 'mediaTypes.video');
      var bannerParams = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adUnit, 'mediaTypes.banner');
      adUnit.bids.forEach(function (bid) {
        // OpenRTB response contains the adunit code and bidder name. These are
        // combined to create a unique key for each bid since an id isn't returned
        bidIdMap["".concat(adUnit.code).concat(bid.bidder)] = bid.bid_id; // check for and store valid aliases to add to the request

        if (__WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].aliasRegistry[bid.bidder]) {
          aliases[bid.bidder] = __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].aliasRegistry[bid.bidder];
        }
      });
      var mediaTypes = {};

      if (bannerParams && bannerParams.sizes) {
        var sizes = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["parseSizesInput"](bannerParams.sizes); // get banner sizes in form [{ w: <int>, h: <int> }, ...]

        var format = sizes.map(function (size) {
          var _size$split = size.split('x'),
              _size$split2 = _slicedToArray(_size$split, 2),
              width = _size$split2[0],
              height = _size$split2[1];

          var w = parseInt(width, 10);
          var h = parseInt(height, 10);
          return {
            w: w,
            h: h
          };
        });
        mediaTypes['banner'] = {
          format: format
        };
      }

      if (!__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isEmpty"](videoParams)) {
        if (videoParams.context === 'outstream' && !adUnit.renderer) {
          // Don't push oustream w/o renderer to request object.
          __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('Outstream bid without renderer cannot be sent to Prebid Server.');
        } else {
          mediaTypes['video'] = videoParams;
        }
      }

      if (nativeAssets) {
        try {
          mediaTypes['native'] = {
            request: JSON.stringify({
              // TODO: determine best way to pass these and if we allow defaults
              context: 1,
              plcmttype: 1,
              eventtrackers: [{
                event: 1,
                methods: [1]
              }],
              // TODO: figure out how to support privacy field
              // privacy: int
              assets: nativeAssets
            }),
            ver: '1.2'
          };
        } catch (e) {
          __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('error creating native request: ' + String(e));
        }
      } // get bidder params in form { <bidder code>: {...params} }


      var ext = adUnit.bids.reduce(function (acc, bid) {
        var adapter = __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].bidderRegistry[bid.bidder];

        if (adapter && adapter.getSpec().transformBidParams) {
          bid.params = adapter.getSpec().transformBidParams(bid.params, true);
        }

        acc[bid.bidder] = _s2sConfig.adapterOptions && _s2sConfig.adapterOptions[bid.bidder] ? _extends({}, bid.params, _s2sConfig.adapterOptions[bid.bidder]) : bid.params;
        return acc;
      }, {});
      var imp = {
        id: adUnit.code,
        ext: ext,
        secure: _s2sConfig.secure
      };
      /**
       * Prebid AdSlot
       * @type {(string|undefined)}
       */

      var pbAdSlot = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adUnit, 'fpd.context.pbAdSlot');

      if (typeof pbAdSlot === 'string' && pbAdSlot) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](imp, 'ext.context.data.pbadslot', pbAdSlot);
      }
      /**
       * GAM Ad Unit
       * @type {(string|undefined)}
       */


      var gamAdUnit = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adUnit, 'fpd.context.adServer.adSlot');

      if (typeof gamAdUnit === 'string' && gamAdUnit) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](imp, 'ext.context.data.adslot', gamAdUnit);
      }

      _extends(imp, mediaTypes); // if storedAuctionResponse has been set, pass SRID


      var storedAuctionResponseBid = __WEBPACK_IMPORTED_MODULE_13_core_js_pure_features_array_find_js___default()(firstBidRequest.bids, function (bid) {
        return bid.adUnitCode === adUnit.code && bid.storedAuctionResponse;
      });

      if (storedAuctionResponseBid) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](imp, 'ext.prebid.storedauctionresponse.id', storedAuctionResponseBid.storedAuctionResponse.toString());
      }

      if (imp.banner || imp.video || imp.native) {
        imps.push(imp);
      }
    });

    if (!imps.length) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('Request to Prebid Server rejected due to invalid media type(s) in adUnit.');
      return;
    }

    var request = {
      id: s2sBidRequest.tid,
      source: {
        tid: s2sBidRequest.tid
      },
      tmax: _s2sConfig.timeout,
      imp: imps,
      test: getConfig('debug') ? 1 : 0,
      ext: {
        prebid: {
          // set ext.prebid.auctiontimestamp with the auction timestamp. Data type is long integer.
          auctiontimestamp: firstBidRequest.auctionStart,
          targeting: {
            // includewinners is always true for openrtb
            includewinners: true,
            // includebidderkeys always false for openrtb
            includebidderkeys: false
          }
        }
      }
    }; // s2sConfig video.ext.prebid is passed through openrtb to PBS

    if (_s2sConfig.extPrebid && _typeof(_s2sConfig.extPrebid) === 'object') {
      request.ext.prebid = _extends(request.ext.prebid, _s2sConfig.extPrebid);
    }
    /**
     * @type {(string[]|string|undefined)} - OpenRTB property 'cur', currencies available for bids
     */


    var adServerCur = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency');

    if (adServerCur && typeof adServerCur === 'string') {
      // if the value is a string, wrap it with an array
      request.cur = [adServerCur];
    } else if (Array.isArray(adServerCur) && adServerCur.length) {
      // if it's an array, get the first element
      request.cur = [adServerCur[0]];
    }

    _appendSiteAppDevice(request, firstBidRequest.refererInfo.referer); // pass schain object if it is present


    var schain = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bidRequests, '0.bids.0.schain');

    if (schain) {
      request.source.ext = {
        schain: schain
      };
    }

    if (!__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isEmpty"](aliases)) {
      request.ext.prebid.aliases = aliases;
    }

    var bidUserIdAsEids = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bidRequests, '0.bids.0.userIdAsEids');

    if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isArray"](bidUserIdAsEids) && bidUserIdAsEids.length > 0) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'user.ext.eids', bidUserIdAsEids);
    }

    if (bidRequests) {
      if (firstBidRequest.gdprConsent) {
        // note - gdprApplies & consentString may be undefined in certain use-cases for consentManagement module
        var gdprApplies;

        if (typeof firstBidRequest.gdprConsent.gdprApplies === 'boolean') {
          gdprApplies = firstBidRequest.gdprConsent.gdprApplies ? 1 : 0;
        }

        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'regs.ext.gdpr', gdprApplies);
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'user.ext.consent', firstBidRequest.gdprConsent.consentString);
      } // US Privacy (CCPA) support


      if (firstBidRequest.uspConsent) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'regs.ext.us_privacy', firstBidRequest.uspConsent);
      }
    }

    if (getConfig('coppa') === true) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'regs.coppa', 1);
    }

    var commonFpd = getConfig('fpd') || {};

    if (commonFpd.context) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'site.ext.data', commonFpd.context);
    }

    if (commonFpd.user) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'user.ext.data', commonFpd.user);
    }

    addBidderFirstPartyDataToRequest(request);
    return request;
  },
  interpretResponse: function interpretResponse(response, bidderRequests) {
    var bids = [];

    if (response.seatbid) {
      // a seatbid object contains a `bid` array and a `seat` string
      response.seatbid.forEach(function (seatbid) {
        (seatbid.bid || []).forEach(function (bid) {
          var bidRequest;
          var key = "".concat(bid.impid).concat(seatbid.seat);

          if (bidIdMap[key]) {
            bidRequest = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["getBidRequest"](bidIdMap[key], bidderRequests);
          }

          var cpm = bid.price;
          var status = cpm !== 0 ? __WEBPACK_IMPORTED_MODULE_3__src_constants_json__["STATUS"].GOOD : __WEBPACK_IMPORTED_MODULE_3__src_constants_json__["STATUS"].NO_BID;
          var bidObject = Object(__WEBPACK_IMPORTED_MODULE_1__src_bidfactory_js__["a" /* createBid */])(status, bidRequest || {
            bidder: seatbid.seat,
            src: TYPE
          });
          bidObject.cpm = cpm;
          var serverResponseTimeMs = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](response, ['ext', 'responsetimemillis', seatbid.seat].join('.'));

          if (bidRequest && serverResponseTimeMs) {
            bidRequest.serverResponseTimeMs = serverResponseTimeMs;
          } // Look for seatbid[].bid[].ext.prebid.bidid and place it in the bidResponse object for use in analytics adapters as 'pbsBidId'


          var bidId = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.bidid');

          if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"](bidId)) {
            bidObject.pbsBidId = bidId;
          } // store wurl by auctionId and adId so it can be accessed from the BID_WON event handler


          if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"](__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.events.win'))) {
            addWurl(bidRequest.auctionId, bidObject.adId, __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.events.win'));
          }

          var extPrebidTargeting = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.targeting'); // If ext.prebid.targeting exists, add it as a property value named 'adserverTargeting'
          // The removal of hb_winurl and hb_bidid targeting values is temporary
          // once we get through the transition, this block will be removed.

          if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](extPrebidTargeting)) {
            // If wurl exists, remove hb_winurl and hb_bidid targeting attributes
            if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"](__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.events.win'))) {
              extPrebidTargeting = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["getDefinedParams"](extPrebidTargeting, Object.keys(extPrebidTargeting).filter(function (i) {
                return i.indexOf('hb_winurl') === -1 && i.indexOf('hb_bidid') === -1;
              }));
            }

            bidObject.adserverTargeting = extPrebidTargeting;
          }

          bidObject.seatBidId = bid.id;

          if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.type') === __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes_js__["d" /* VIDEO */]) {
            bidObject.mediaType = __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes_js__["d" /* VIDEO */];
            var sizes = bidRequest.sizes && bidRequest.sizes[0];
            bidObject.playerHeight = sizes[0];
            bidObject.playerWidth = sizes[1]; // try to get cache values from 'response.ext.prebid.cache.js'
            // else try 'bid.ext.prebid.targeting' as fallback

            if (bid.ext.prebid.cache && _typeof(bid.ext.prebid.cache.vastXml) === 'object' && bid.ext.prebid.cache.vastXml.cacheId && bid.ext.prebid.cache.vastXml.url) {
              bidObject.videoCacheKey = bid.ext.prebid.cache.vastXml.cacheId;
              bidObject.vastUrl = bid.ext.prebid.cache.vastXml.url;
            } else if (extPrebidTargeting && extPrebidTargeting.hb_uuid && extPrebidTargeting.hb_cache_host && extPrebidTargeting.hb_cache_path) {
              bidObject.videoCacheKey = extPrebidTargeting.hb_uuid; // build url using key and cache host

              bidObject.vastUrl = "https://".concat(extPrebidTargeting.hb_cache_host).concat(extPrebidTargeting.hb_cache_path, "?uuid=").concat(extPrebidTargeting.hb_uuid);
            }

            if (bid.adm) {
              bidObject.vastXml = bid.adm;
            }

            if (!bidObject.vastUrl && bid.nurl) {
              bidObject.vastUrl = bid.nurl;
            }
          } else if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.type') === __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes_js__["c" /* NATIVE */]) {
            var _trackers;

            bidObject.mediaType = __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes_js__["c" /* NATIVE */];
            var adm;

            if (typeof bid.adm === 'string') {
              adm = bidObject.adm = JSON.parse(bid.adm);
            } else {
              adm = bidObject.adm = bid.adm;
            }

            var trackers = (_trackers = {}, _defineProperty(_trackers, nativeEventTrackerMethodMap.img, adm.imptrackers || []), _defineProperty(_trackers, nativeEventTrackerMethodMap.js, adm.jstracker ? [adm.jstracker] : []), _trackers);

            if (adm.eventtrackers) {
              adm.eventtrackers.forEach(function (tracker) {
                switch (tracker.method) {
                  case nativeEventTrackerMethodMap.img:
                    trackers[nativeEventTrackerMethodMap.img].push(tracker.url);
                    break;

                  case nativeEventTrackerMethodMap.js:
                    trackers[nativeEventTrackerMethodMap.js].push(tracker.url);
                    break;
                }
              });
            }

            if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](adm) && Array.isArray(adm.assets)) {
              var origAssets = nativeAssetCache[bidRequest.adUnitCode];
              bidObject.native = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["cleanObj"](adm.assets.reduce(function (native, asset) {
                var origAsset = origAssets[asset.id];

                if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](asset.img)) {
                  native[origAsset.img.type ? nativeImgIdMap[origAsset.img.type] : 'image'] = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["pick"](asset.img, ['url', 'w as width', 'h as height']);
                } else if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](asset.title)) {
                  native['title'] = asset.title.text;
                } else if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](asset.data)) {
                  nativeDataNames.forEach(function (dataType) {
                    if (nativeDataIdMap[dataType] === origAsset.data.type) {
                      native[dataType] = asset.data.value;
                    }
                  });
                }

                return native;
              }, __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["cleanObj"]({
                clickUrl: adm.link,
                clickTrackers: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adm, 'link.clicktrackers'),
                impressionTrackers: trackers[nativeEventTrackerMethodMap.img],
                javascriptTrackers: trackers[nativeEventTrackerMethodMap.js]
              })));
            } else {
              __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('prebid server native response contained no assets');
            }
          } else {
            // banner
            if (bid.adm && bid.nurl) {
              bidObject.ad = bid.adm;
              bidObject.ad += __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["createTrackPixelHtml"](decodeURIComponent(bid.nurl));
            } else if (bid.adm) {
              bidObject.ad = bid.adm;
            } else if (bid.nurl) {
              bidObject.adUrl = bid.nurl;
            }
          }

          bidObject.width = bid.w;
          bidObject.height = bid.h;

          if (bid.dealid) {
            bidObject.dealId = bid.dealid;
          }

          bidObject.requestId = bidRequest.bidId || bidRequest.bid_Id;
          bidObject.creative_id = bid.crid;
          bidObject.creativeId = bid.crid;

          if (bid.burl) {
            bidObject.burl = bid.burl;
          }

          bidObject.currency = response.cur ? response.cur : DEFAULT_S2S_CURRENCY;
          bidObject.meta = bidObject.meta || {};

          if (bid.adomain) {
            bidObject.meta.advertiserDomains = bid.adomain;
          } // TODO: Remove when prebid-server returns ttl and netRevenue


          var configTtl = _s2sConfig.defaultTtl || DEFAULT_S2S_TTL;
          bidObject.ttl = bid.ttl ? bid.ttl : configTtl;
          bidObject.netRevenue = bid.netRevenue ? bid.netRevenue : DEFAULT_S2S_NETREVENUE;
          bids.push({
            adUnit: bid.impid,
            bid: bidObject
          });
        });
      });
    }

    return bids;
  }
};
/**
 * BID_WON event to request the wurl
 * @param {Bid} bid the winning bid object
 */

function bidWonHandler(bid) {
  var wurl = getWurl(bid.auctionId, bid.adId);

  if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"](wurl)) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"]("Invoking image pixel for wurl on BID_WIN: \"".concat(wurl, "\""));
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["triggerPixel"](wurl); // remove from wurl cache, since the wurl url was called

    removeWurl(bid.auctionId, bid.adId);
  }
}
/**
 * Bidder adapter for Prebid Server
 */


function PrebidServer() {
  var baseAdapter = new __WEBPACK_IMPORTED_MODULE_0__src_adapter_js__["a" /* default */]('prebidServer');
  /* Prebid executes this function when the page asks to send out bid requests */

  baseAdapter.callBids = function (s2sBidRequest, bidRequests, addBidResponse, done, ajax) {
    var adUnits = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepClone"](s2sBidRequest.ad_units); // at this point ad units should have a size array either directly or mapped so filter for that

    var validAdUnits = adUnits.filter(function (unit) {
      return unit.mediaTypes && (unit.mediaTypes.native || unit.mediaTypes.banner && unit.mediaTypes.banner.sizes || unit.mediaTypes.video && unit.mediaTypes.video.playerSize);
    }); // in case config.bidders contains invalid bidders, we only process those we sent requests for

    var requestedBidders = validAdUnits.map(function (adUnit) {
      return adUnit.bids.map(function (bid) {
        return bid.bidder;
      }).filter(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["uniques"]);
    }).reduce(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["flatten"]).filter(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["uniques"]);

    if (_s2sConfig && _s2sConfig.syncEndpoint) {
      var gdprConsent, uspConsent;

      if (Array.isArray(bidRequests) && bidRequests.length > 0) {
        gdprConsent = bidRequests[0].gdprConsent;
        uspConsent = bidRequests[0].uspConsent;
      }

      var syncBidders = _s2sConfig.bidders.map(function (bidder) {
        return __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].aliasRegistry[bidder] || bidder;
      }).filter(function (bidder, index, array) {
        return array.indexOf(bidder) === index;
      });

      queueSync(syncBidders, gdprConsent, uspConsent);
    }

    var request = OPEN_RTB_PROTOCOL.buildRequest(s2sBidRequest, bidRequests, validAdUnits);
    var requestJson = request && JSON.stringify(request);

    if (request && requestJson) {
      ajax(_s2sConfig.endpoint, {
        success: function success(response) {
          return handleResponse(response, requestedBidders, bidRequests, addBidResponse, done);
        },
        error: done
      }, requestJson, {
        contentType: 'text/plain',
        withCredentials: true
      });
    }
  };
  /* Notify Prebid of bid responses so bids can get in the auction */


  function handleResponse(response, requestedBidders, bidderRequests, addBidResponse, done) {
    var result;
    var bids = [];

    try {
      result = JSON.parse(response);
      bids = OPEN_RTB_PROTOCOL.interpretResponse(result, bidderRequests, requestedBidders);
      bids.forEach(function (_ref2) {
        var adUnit = _ref2.adUnit,
            bid = _ref2.bid;

        if (Object(__WEBPACK_IMPORTED_MODULE_8__src_adapters_bidderFactory_js__["isValid"])(adUnit, bid, bidderRequests)) {
          addBidResponse(adUnit, bid);
        }
      });
      bidderRequests.forEach(function (bidderRequest) {
        return __WEBPACK_IMPORTED_MODULE_9__src_events_js___default.a.emit(__WEBPACK_IMPORTED_MODULE_3__src_constants_json__["EVENTS"].BIDDER_DONE, bidderRequest);
      });
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"](error);
    }

    if (!result || result.status && __WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js___default()(result.status, 'Error')) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('error parsing response: ', result.status);
    }

    done();
    doClientSideSyncs(requestedBidders);
  } // Listen for bid won to call wurl


  __WEBPACK_IMPORTED_MODULE_9__src_events_js___default.a.on(__WEBPACK_IMPORTED_MODULE_3__src_constants_json__["EVENTS"].BID_WON, bidWonHandler);
  return _extends(this, {
    callBids: baseAdapter.callBids,
    setBidderCode: baseAdapter.setBidderCode,
    type: TYPE
  });
}
__WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].registerBidAdapter(new PrebidServer(), 'prebidServer');

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return S2S_VENDORS; });
// accountId and bidders params are not included here, should be configured by end-user
var S2S_VENDORS = {
  'appnexus': {
    adapter: 'prebidServer',
    enabled: true,
    endpoint: 'https://prebid.adnxs.com/pbs/v1/openrtb2/auction',
    syncEndpoint: 'https://prebid.adnxs.com/pbs/v1/cookie_sync',
    timeout: 1000
  },
  'rubicon': {
    adapter: 'prebidServer',
    enabled: true,
    endpoint: 'https://prebid-server.rubiconproject.com/openrtb2/auction',
    syncEndpoint: 'https://prebid-server.rubiconproject.com/cookie_sync',
    timeout: 500
  }
};

/***/ })

},[591]);
pbjsChunk([116],{

/***/ 664:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(665);


/***/ }),

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FASTLANE_ENDPOINT", function() { return FASTLANE_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIDEO_ENDPOINT", function() { return VIDEO_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYNC_ENDPOINT", function() { return SYNC_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["hasVideoMediaType"] = hasVideoMediaType;
/* harmony export (immutable) */ __webpack_exports__["masSizeOrdering"] = masSizeOrdering;
/* harmony export (immutable) */ __webpack_exports__["determineRubiconVideoSizeId"] = determineRubiconVideoSizeId;
/* harmony export (immutable) */ __webpack_exports__["getPriceGranularity"] = getPriceGranularity;
/* harmony export (immutable) */ __webpack_exports__["hasValidVideoParams"] = hasValidVideoParams;
/* harmony export (immutable) */ __webpack_exports__["hasValidSupplyChainParams"] = hasValidSupplyChainParams;
/* harmony export (immutable) */ __webpack_exports__["encodeParam"] = encodeParam;
/* harmony export (immutable) */ __webpack_exports__["resetUserSync"] = resetUserSync;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var DEFAULT_INTEGRATION = 'pbjs_lite';
var DEFAULT_PBS_INTEGRATION = 'pbjs'; // always use https, regardless of whether or not current page is secure

var FASTLANE_ENDPOINT = 'https://fastlane.rubiconproject.com/a/api/fastlane.json';
var VIDEO_ENDPOINT = 'https://prebid-server.rubiconproject.com/openrtb2/auction';
var SYNC_ENDPOINT = 'https://eus.rubiconproject.com/usync.html';
var GVLID = 52;
var DIGITRUST_PROP_NAMES = {
  FASTLANE: {
    id: 'dt.id',
    keyv: 'dt.keyv',
    pref: 'dt.pref'
  },
  PREBID_SERVER: {
    id: 'id',
    keyv: 'keyv'
  }
};
var sizeMap = {
  1: '468x60',
  2: '728x90',
  5: '120x90',
  7: '125x125',
  8: '120x600',
  9: '160x600',
  10: '300x600',
  13: '200x200',
  14: '250x250',
  15: '300x250',
  16: '336x280',
  17: '240x400',
  19: '300x100',
  31: '980x120',
  32: '250x360',
  33: '180x500',
  35: '980x150',
  37: '468x400',
  38: '930x180',
  39: '750x100',
  40: '750x200',
  41: '750x300',
  42: '2x4',
  43: '320x50',
  44: '300x50',
  48: '300x300',
  53: '1024x768',
  54: '300x1050',
  55: '970x90',
  57: '970x250',
  58: '1000x90',
  59: '320x80',
  60: '320x150',
  61: '1000x1000',
  64: '580x500',
  65: '640x480',
  66: '930x600',
  67: '320x480',
  68: '1800x1000',
  72: '320x320',
  73: '320x160',
  78: '980x240',
  79: '980x300',
  80: '980x400',
  83: '480x300',
  85: '300x120',
  90: '548x150',
  94: '970x310',
  95: '970x100',
  96: '970x210',
  101: '480x320',
  102: '768x1024',
  103: '480x280',
  105: '250x800',
  108: '320x240',
  113: '1000x300',
  117: '320x100',
  125: '800x250',
  126: '200x600',
  144: '980x600',
  145: '980x150',
  152: '1000x250',
  156: '640x320',
  159: '320x250',
  179: '250x600',
  195: '600x300',
  198: '640x360',
  199: '640x200',
  213: '1030x590',
  214: '980x360',
  221: '1x1',
  229: '320x180',
  230: '2000x1400',
  232: '580x400',
  234: '6x6',
  251: '2x2',
  256: '480x820',
  257: '400x600',
  258: '500x200',
  259: '998x200',
  264: '970x1000',
  265: '1920x1080',
  274: '1800x200',
  278: '320x500',
  282: '320x400',
  288: '640x380'
};

__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](sizeMap, function (item, key) {
  return sizeMap[item] = key;
});

var spec = {
  code: 'rubicon',
  gvlid: GVLID,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],

  /**
   * @param {object} bid
   * @return boolean
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (_typeof(bid.params) !== 'object') {
      return false;
    } // validate account, site, zone have numeric values


    for (var i = 0, props = ['accountId', 'siteId', 'zoneId']; i < props.length; i++) {
      bid.params[props[i]] = parseInt(bid.params[props[i]]);

      if (isNaN(bid.params[props[i]])) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Rubicon: wrong format of accountId or siteId or zoneId.');
        return false;
      }
    }

    var bidFormat = bidType(bid, true); // bidType is undefined? Return false

    if (!bidFormat) {
      return false;
    } else if (bidFormat === 'video') {
      // bidType is video, make sure it has required params
      return hasValidVideoParams(bid);
    } // bidType is banner? return true


    return true;
  },

  /**
   * @param {BidRequest[]} bidRequests
   * @param bidderRequest
   * @return BidRequest[]
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    // separate video bids because the requests are structured differently
    var requests = [];
    var videoRequests = bidRequests.filter(function (bidRequest) {
      return bidType(bidRequest) === 'video';
    }).map(function (bidRequest) {
      bidRequest.startTime = new Date().getTime();
      var data = {
        id: bidRequest.transactionId,
        test: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('debug') ? 1 : 0,
        cur: ['USD'],
        source: {
          tid: bidRequest.transactionId
        },
        tmax: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('TTL') || 1000,
        imp: [{
          exp: 300,
          id: bidRequest.adUnitCode,
          secure: 1,
          ext: _defineProperty({}, bidRequest.bidder, bidRequest.params),
          video: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video') || {}
        }],
        ext: {
          prebid: {
            cache: {
              vastxml: {
                returnCreative: false // don't return the VAST

              }
            },
            targeting: {
              includewinners: true,
              // includebidderkeys always false for openrtb
              includebidderkeys: false,
              pricegranularity: getPriceGranularity(__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */])
            },
            bidders: {
              rubicon: {
                integration: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('rubicon.int_type') || DEFAULT_PBS_INTEGRATION
              }
            }
          }
        }
      }; // Add alias if it is there

      if (bidRequest.bidder !== 'rubicon') {
        data.ext.prebid.aliases = _defineProperty({}, bidRequest.bidder, 'rubicon');
      }

      var bidFloor;

      if (typeof bidRequest.getFloor === 'function' && !__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('rubicon.disableFloors')) {
        var floorInfo = bidRequest.getFloor({
          currency: 'USD',
          mediaType: 'video',
          size: parseSizes(bidRequest, 'video')
        });
        bidFloor = _typeof(floorInfo) === 'object' && floorInfo.currency === 'USD' && !isNaN(parseInt(floorInfo.floor)) ? parseFloat(floorInfo.floor) : undefined;
      } else {
        bidFloor = parseFloat(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'params.floor'));
      }

      if (!isNaN(bidFloor)) {
        data.imp[0].bidfloor = bidFloor;
      } // if value is set, will overwrite with same value


      data.imp[0].ext[bidRequest.bidder].video.size_id = determineRubiconVideoSizeId(bidRequest);
      appendSiteAppDevice(data, bidRequest, bidderRequest);
      addVideoParameters(data, bidRequest);

      var digiTrust = _getDigiTrustQueryParams(bidRequest, 'PREBID_SERVER');

      if (digiTrust) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.ext.digitrust', digiTrust);
      }

      if (bidderRequest.gdprConsent) {
        // note - gdprApplies & consentString may be undefined in certain use-cases for consentManagement module
        var gdprApplies;

        if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') {
          gdprApplies = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;
        }

        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'regs.ext.gdpr', gdprApplies);
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.ext.consent', bidderRequest.gdprConsent.consentString);
      }

      if (bidderRequest.uspConsent) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'regs.ext.us_privacy', bidderRequest.uspConsent);
      }

      if (bidRequest.userId && _typeof(bidRequest.userId) === 'object' && (bidRequest.userId.tdid || bidRequest.userId.pubcid || bidRequest.userId.lipb || bidRequest.userId.idl_env)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.ext.eids', []);

        if (bidRequest.userId.tdid) {
          data.user.ext.eids.push({
            source: 'adserver.org',
            uids: [{
              id: bidRequest.userId.tdid,
              ext: {
                rtiPartner: 'TDID'
              }
            }]
          });
        }

        if (bidRequest.userId.pubcid) {
          data.user.ext.eids.push({
            source: 'pubcommon',
            uids: [{
              id: bidRequest.userId.pubcid
            }]
          });
        } // support liveintent ID


        if (bidRequest.userId.lipb && bidRequest.userId.lipb.lipbid) {
          data.user.ext.eids.push({
            source: 'liveintent.com',
            uids: [{
              id: bidRequest.userId.lipb.lipbid
            }]
          });
          data.user.ext.tpid = {
            source: 'liveintent.com',
            uid: bidRequest.userId.lipb.lipbid
          };

          if (Array.isArray(bidRequest.userId.lipb.segments) && bidRequest.userId.lipb.segments.length) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'rp.target.LIseg', bidRequest.userId.lipb.segments);
          }
        } // support identityLink (aka LiveRamp)


        if (bidRequest.userId.idl_env) {
          data.user.ext.eids.push({
            source: 'liveramp.com',
            uids: [{
              id: bidRequest.userId.idl_env
            }]
          });
        }
      }

      if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('coppa') === true) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'regs.coppa', 1);
      }

      if (bidRequest.schain && hasValidSupplyChainParams(bidRequest.schain)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'source.ext.schain', bidRequest.schain);
      }

      var siteData = _extends({}, bidRequest.params.inventory, __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.context'));

      var userData = _extends({}, bidRequest.params.visitor, __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.user'));

      if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](siteData) || !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](userData)) {
        var bidderData = {
          bidders: [bidderRequest.bidderCode],
          config: {
            fpd: {}
          }
        };

        if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](siteData)) {
          bidderData.config.fpd.site = siteData;
        }

        if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](userData)) {
          bidderData.config.fpd.user = userData;
        }

        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'ext.prebid.bidderconfig.0', bidderData);
      }
      /**
       * Prebid AdSlot
       * @type {(string|undefined)}
       */


      var pbAdSlot = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'fpd.context.pbAdSlot');

      if (typeof pbAdSlot === 'string' && pbAdSlot) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data.imp[0].ext, 'context.data.pbadslot', pbAdSlot);
      }
      /**
       * GAM Ad Unit
       * @type {(string|undefined)}
       */


      var gamAdUnit = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'fpd.context.adServer.adSlot');

      if (typeof gamAdUnit === 'string' && gamAdUnit) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data.imp[0].ext, 'context.data.adslot', gamAdUnit);
      } // if storedAuctionResponse has been set, pass SRID


      if (bidRequest.storedAuctionResponse) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data.imp[0], 'ext.prebid.storedauctionresponse.id', bidRequest.storedAuctionResponse.toString());
      } // set ext.prebid.auctiontimestamp using auction time


      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data.imp[0], 'ext.prebid.auctiontimestamp', bidderRequest.auctionStart);
      return {
        method: 'POST',
        url: VIDEO_ENDPOINT,
        data: data,
        bidRequest: bidRequest
      };
    });

    if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('rubicon.singleRequest') !== true) {
      // bids are not grouped if single request mode is not enabled
      requests = videoRequests.concat(bidRequests.filter(function (bidRequest) {
        return bidType(bidRequest) === 'banner';
      }).map(function (bidRequest) {
        var bidParams = spec.createSlotParams(bidRequest, bidderRequest);
        return {
          method: 'GET',
          url: FASTLANE_ENDPOINT,
          data: spec.getOrderedParams(bidParams).reduce(function (paramString, key) {
            var propValue = bidParams[key];
            return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](propValue) && propValue !== '' || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](propValue) ? "".concat(paramString).concat(encodeParam(key, propValue), "&") : paramString;
          }, '') + "slots=1&rand=".concat(Math.random()),
          bidRequest: bidRequest
        };
      }));
    } else {
      // single request requires bids to be grouped by site id into a single request
      // note: utils.groupBy wasn't used because deep property access was needed
      var nonVideoRequests = bidRequests.filter(function (bidRequest) {
        return bidType(bidRequest) === 'banner';
      });
      var groupedBidRequests = nonVideoRequests.reduce(function (groupedBids, bid) {
        (groupedBids[bid.params['siteId']] = groupedBids[bid.params['siteId']] || []).push(bid);
        return groupedBids;
      }, {}); // fastlane SRA has a limit of 10 slots

      var SRA_BID_LIMIT = 10; // multiple requests are used if bids groups have more than 10 bids

      requests = videoRequests.concat(Object.keys(groupedBidRequests).reduce(function (aggregate, bidGroupKey) {
        // for each partioned bidGroup, append a bidRequest to requests list
        partitionArray(groupedBidRequests[bidGroupKey], SRA_BID_LIMIT).forEach(function (bidsInGroup) {
          var combinedSlotParams = spec.combineSlotUrlParams(bidsInGroup.map(function (bidRequest) {
            return spec.createSlotParams(bidRequest, bidderRequest);
          })); // SRA request returns grouped bidRequest arrays not a plain bidRequest

          aggregate.push({
            method: 'GET',
            url: FASTLANE_ENDPOINT,
            data: spec.getOrderedParams(combinedSlotParams).reduce(function (paramString, key) {
              var propValue = combinedSlotParams[key];
              return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](propValue) && propValue !== '' || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](propValue) ? "".concat(paramString).concat(encodeParam(key, propValue), "&") : paramString;
            }, '') + "slots=".concat(bidsInGroup.length, "&rand=").concat(Math.random()),
            bidRequest: bidsInGroup
          });
        });
        return aggregate;
      }, []));
    }

    return requests;
  },
  getOrderedParams: function getOrderedParams(params) {
    var containsTgV = /^tg_v/;
    var containsTgI = /^tg_i/;
    var orderedParams = ['account_id', 'site_id', 'zone_id', 'size_id', 'alt_size_ids', 'p_pos', 'gdpr', 'gdpr_consent', 'us_privacy', 'rp_schain', 'tpid_tdid', 'tpid_liveintent.com', 'tg_v.LIseg', 'dt.id', 'dt.keyv', 'dt.pref', 'rf', 'p_geo.latitude', 'p_geo.longitude', 'kw'].concat(Object.keys(params).filter(function (item) {
      return containsTgV.test(item);
    })).concat(Object.keys(params).filter(function (item) {
      return containsTgI.test(item);
    })).concat(['tk_flint', 'x_source.tid', 'x_source.pchain', 'p_screen_res', 'rp_floor', 'rp_secure', 'tk_user_key']);
    return orderedParams.concat(Object.keys(params).filter(function (item) {
      return orderedParams.indexOf(item) === -1;
    }));
  },

  /**
   * @summary combines param values from an array of slots into a single semicolon delineated value
   * or just one value if they are all the same.
   * @param {Object[]} aSlotUrlParams - example [{p1: 'foo', p2: 'test'}, {p2: 'test'}, {p1: 'bar', p2: 'test'}]
   * @return {Object} - example {p1: 'foo;;bar', p2: 'test'}
   */
  combineSlotUrlParams: function combineSlotUrlParams(aSlotUrlParams) {
    // if only have params for one slot, return those params
    if (aSlotUrlParams.length === 1) {
      return aSlotUrlParams[0];
    } // reduce param values from all slot objects into an array of values in a single object


    var oCombinedSlotUrlParams = aSlotUrlParams.reduce(function (oCombinedParams, oSlotUrlParams, iIndex) {
      Object.keys(oSlotUrlParams).forEach(function (param) {
        if (!oCombinedParams.hasOwnProperty(param)) {
          oCombinedParams[param] = new Array(aSlotUrlParams.length); // initialize array;
        } // insert into the proper element of the array


        oCombinedParams[param].splice(iIndex, 1, oSlotUrlParams[param]);
      });
      return oCombinedParams;
    }, {}); // convert arrays into semicolon delimited strings

    var re = new RegExp('^([^;]*)(;\\1)+$'); // regex to test for duplication

    Object.keys(oCombinedSlotUrlParams).forEach(function (param) {
      var sValues = oCombinedSlotUrlParams[param].join(';'); // consolidate param values into one value if they are all the same

      var match = sValues.match(re);
      oCombinedSlotUrlParams[param] = match ? match[1] : sValues;
    });
    return oCombinedSlotUrlParams;
  },

  /**
   * @param {BidRequest} bidRequest
   * @param {Object} bidderRequest
   * @returns {Object} - object key values named and formatted as slot params
   */
  createSlotParams: function createSlotParams(bidRequest, bidderRequest) {
    bidRequest.startTime = new Date().getTime();
    var params = bidRequest.params; // use rubicon sizes if provided, otherwise adUnit.sizes

    var parsedSizes = parseSizes(bidRequest, 'banner');

    var _ref = params.latLong || [],
        _ref2 = _slicedToArray(_ref, 2),
        latitude = _ref2[0],
        longitude = _ref2[1];

    var configIntType = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('rubicon.int_type');
    var data = {
      'account_id': params.accountId,
      'site_id': params.siteId,
      'zone_id': params.zoneId,
      'size_id': parsedSizes[0],
      'alt_size_ids': parsedSizes.slice(1).join(',') || undefined,
      'rp_floor': (params.floor = parseFloat(params.floor)) > 0.01 ? params.floor : 0.01,
      'rp_secure': '1',
      'tk_flint': "".concat(configIntType || DEFAULT_INTEGRATION, "_v4.2.0"),
      'x_source.tid': bidRequest.transactionId,
      'x_source.pchain': params.pchain,
      'p_screen_res': _getScreenResolution(),
      'tk_user_key': params.userId,
      'p_geo.latitude': isNaN(parseFloat(latitude)) ? undefined : parseFloat(latitude).toFixed(4),
      'p_geo.longitude': isNaN(parseFloat(longitude)) ? undefined : parseFloat(longitude).toFixed(4),
      'tg_fl.eid': bidRequest.code,
      'rf': _getPageUrl(bidRequest, bidderRequest)
    }; // If floors module is enabled and we get USD floor back, send it in rp_hard_floor else undfined

    if (typeof bidRequest.getFloor === 'function' && !__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('rubicon.disableFloors')) {
      var floorInfo = bidRequest.getFloor({
        currency: 'USD',
        mediaType: 'banner',
        size: '*'
      });
      data['rp_hard_floor'] = _typeof(floorInfo) === 'object' && floorInfo.currency === 'USD' && !isNaN(parseInt(floorInfo.floor)) ? floorInfo.floor : undefined;
    } // add p_pos only if specified and valid
    // For SRA we need to explicitly put empty semi colons so AE treats it as empty, instead of copying the latter value


    data['p_pos'] = params.position === 'atf' || params.position === 'btf' ? params.position : '';

    if (bidRequest.userId) {
      if (bidRequest.userId.tdid) {
        data['tpid_tdid'] = bidRequest.userId.tdid;
      } // support liveintent ID


      if (bidRequest.userId.lipb && bidRequest.userId.lipb.lipbid) {
        data['tpid_liveintent.com'] = bidRequest.userId.lipb.lipbid;

        if (Array.isArray(bidRequest.userId.lipb.segments) && bidRequest.userId.lipb.segments.length) {
          data['tg_v.LIseg'] = bidRequest.userId.lipb.segments.join(',');
        }
      } // support identityLink (aka LiveRamp)


      if (bidRequest.userId.idl_env) {
        data['tpid_liveramp.com'] = bidRequest.userId.idl_env;
      }
    }

    if (bidderRequest.gdprConsent) {
      // add 'gdpr' only if 'gdprApplies' is defined
      if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') {
        data['gdpr'] = Number(bidderRequest.gdprConsent.gdprApplies);
      }

      data['gdpr_consent'] = bidderRequest.gdprConsent.consentString;
    }

    if (bidderRequest.uspConsent) {
      data['us_privacy'] = encodeURIComponent(bidderRequest.uspConsent);
    } // visitor properties


    var visitorData = _extends({}, params.visitor, __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.user'));

    Object.keys(visitorData).forEach(function (key) {
      if (visitorData[key] != null && key !== 'keywords') {
        data["tg_v.".concat(key)] = _typeof(visitorData[key]) === 'object' && !Array.isArray(visitorData[key]) ? JSON.stringify(visitorData[key]) : visitorData[key].toString(); // initialize array;
      }
    }); // inventory properties

    var inventoryData = _extends({}, params.inventory, __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.context'));

    Object.keys(inventoryData).forEach(function (key) {
      if (inventoryData[key] != null && key !== 'keywords') {
        data["tg_i.".concat(key)] = _typeof(inventoryData[key]) === 'object' && !Array.isArray(inventoryData[key]) ? JSON.stringify(inventoryData[key]) : inventoryData[key].toString();
      }
    }); // keywords

    var keywords = (params.keywords || []).concat(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.user'), 'keywords') || [], __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.context'), 'keywords') || []);
    data.kw = Array.isArray(keywords) && keywords.length ? keywords.join(',') : '';
    /**
     * Prebid AdSlot
     * @type {(string|undefined)}
     */

    var pbAdSlot = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'fpd.context.pbAdSlot');

    if (typeof pbAdSlot === 'string' && pbAdSlot) {
      data['tg_i.pbadslot'] = pbAdSlot.replace(/^\/+/, '');
    }
    /**
     * GAM Ad Unit
     * @type {(string|undefined)}
     */


    var gamAdUnit = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'fpd.context.adServer.adSlot');

    if (typeof gamAdUnit === 'string' && gamAdUnit) {
      data['tg_i.dfp_ad_unit_code'] = gamAdUnit.replace(/^\/+/, '');
    } // digitrust properties


    var digitrustParams = _getDigiTrustQueryParams(bidRequest, 'FASTLANE');

    _extends(data, digitrustParams);

    if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('coppa') === true) {
      data['coppa'] = 1;
    } // if SupplyChain is supplied and contains all required fields


    if (bidRequest.schain && hasValidSupplyChainParams(bidRequest.schain)) {
      data.rp_schain = spec.serializeSupplyChain(bidRequest.schain);
    }

    return data;
  },

  /**
   * Serializes schain params according to OpenRTB requirements
   * @param {Object} supplyChain
   * @returns {String}
   */
  serializeSupplyChain: function serializeSupplyChain(supplyChain) {
    var supplyChainIsValid = hasValidSupplyChainParams(supplyChain);
    if (!supplyChainIsValid) return '';
    var ver = supplyChain.ver,
        complete = supplyChain.complete,
        nodes = supplyChain.nodes;
    return "".concat(ver, ",").concat(complete, "!").concat(spec.serializeSupplyChainNodes(nodes));
  },

  /**
   * Properly sorts schain object params
   * @param {Array} nodes
   * @returns {String}
   */
  serializeSupplyChainNodes: function serializeSupplyChainNodes(nodes) {
    var nodePropOrder = ['asi', 'sid', 'hp', 'rid', 'name', 'domain'];
    return nodes.map(function (node) {
      return nodePropOrder.map(function (prop) {
        return encodeURIComponent(node[prop] || '');
      }).join(',');
    }).join('!');
  },

  /**
   * @param {*} responseObj
   * @param {BidRequest|Object.<string, BidRequest[]>} bidRequest - if request was SRA the bidRequest argument will be a keyed BidRequest array object,
   * non-SRA responses return a plain BidRequest object
   * @return {Bid[]} An array of bids which
   */
  interpretResponse: function interpretResponse(responseObj, _ref3) {
    var bidRequest = _ref3.bidRequest;
    responseObj = responseObj.body; // check overall response

    if (!responseObj || _typeof(responseObj) !== 'object') {
      return [];
    } // video response from PBS Java openRTB


    if (responseObj.seatbid) {
      var responseErrors = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](responseObj, 'ext.errors.rubicon');

      if (Array.isArray(responseErrors) && responseErrors.length > 0) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Rubicon: Error in video response');
      }

      var bids = [];
      responseObj.seatbid.forEach(function (seatbid) {
        (seatbid.bid || []).forEach(function (bid) {
          var bidObject = {
            requestId: bidRequest.bidId,
            currency: responseObj.cur || 'USD',
            creativeId: bid.crid,
            cpm: bid.price || 0,
            bidderCode: seatbid.seat,
            ttl: 300,
            netRevenue: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('rubicon.netRevenue') !== false,
            // If anything other than false, netRev is true
            width: bid.w || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.w') || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'params.video.playerWidth'),
            height: bid.h || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.h') || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'params.video.playerHeight')
          };

          if (bid.id) {
            bidObject.seatBidId = bid.id;
          }

          if (bid.dealid) {
            bidObject.dealId = bid.dealid;
          }

          var serverResponseTimeMs = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](responseObj, 'ext.responsetimemillis.rubicon');

          if (bidRequest && serverResponseTimeMs) {
            bidRequest.serverResponseTimeMs = serverResponseTimeMs;
          }

          if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'ext.prebid.type') === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]) {
            bidObject.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */];
            var extPrebidTargeting = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'ext.prebid.targeting'); // If ext.prebid.targeting exists, add it as a property value named 'adserverTargeting'

            if (extPrebidTargeting && _typeof(extPrebidTargeting) === 'object') {
              bidObject.adserverTargeting = extPrebidTargeting;
            } // try to get cache values from 'response.ext.prebid.cache.js'
            // else try 'bid.ext.prebid.targeting' as fallback


            if (bid.ext.prebid.cache && _typeof(bid.ext.prebid.cache.vastXml) === 'object' && bid.ext.prebid.cache.vastXml.cacheId && bid.ext.prebid.cache.vastXml.url) {
              bidObject.videoCacheKey = bid.ext.prebid.cache.vastXml.cacheId;
              bidObject.vastUrl = bid.ext.prebid.cache.vastXml.url;
            } else if (extPrebidTargeting && extPrebidTargeting.hb_uuid && extPrebidTargeting.hb_cache_host && extPrebidTargeting.hb_cache_path) {
              bidObject.videoCacheKey = extPrebidTargeting.hb_uuid; // build url using key and cache host

              bidObject.vastUrl = "https://".concat(extPrebidTargeting.hb_cache_host).concat(extPrebidTargeting.hb_cache_path, "?uuid=").concat(extPrebidTargeting.hb_uuid);
            }

            if (bid.adm) {
              bidObject.vastXml = bid.adm;
            }

            if (bid.nurl) {
              bidObject.vastUrl = bid.nurl;
            }

            if (!bidObject.vastUrl && bid.nurl) {
              bidObject.vastUrl = bid.nurl;
            }
          } else {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Rubicon: video response received non-video media type');
          }

          bids.push(bidObject);
        });
      });
      return bids;
    }

    var ads = responseObj.ads; // video ads array is wrapped in an object

    if (_typeof(bidRequest) === 'object' && !Array.isArray(bidRequest) && bidType(bidRequest) === 'video' && _typeof(ads) === 'object') {
      ads = ads[bidRequest.adUnitCode];
    } // check the ad response


    if (!Array.isArray(ads) || ads.length < 1) {
      return [];
    }

    return ads.reduce(function (bids, ad, i) {
      if (ad.status !== 'ok') {
        return bids;
      } // associate bidRequests; assuming ads matches bidRequest


      var associatedBidRequest = Array.isArray(bidRequest) ? bidRequest[i] : bidRequest;

      if (associatedBidRequest && _typeof(associatedBidRequest) === 'object') {
        var bid = {
          requestId: associatedBidRequest.bidId,
          currency: 'USD',
          creativeId: ad.creative_id || "".concat(ad.network || '', "-").concat(ad.advertiser || ''),
          cpm: ad.cpm || 0,
          dealId: ad.deal,
          ttl: 300,
          // 5 minutes
          netRevenue: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('rubicon.netRevenue') !== false,
          // If anything other than false, netRev is true
          rubicon: {
            advertiserId: ad.advertiser,
            networkId: ad.network
          },
          meta: {
            advertiserId: ad.advertiser,
            networkId: ad.network
          }
        };

        if (ad.creative_type) {
          bid.mediaType = ad.creative_type;
        }

        if (ad.creative_type === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]) {
          bid.width = associatedBidRequest.params.video.playerWidth;
          bid.height = associatedBidRequest.params.video.playerHeight;
          bid.vastUrl = ad.creative_depot_url;
          bid.impression_id = ad.impression_id;
          bid.videoCacheKey = ad.impression_id;
        } else {
          bid.ad = _renderCreative(ad.script, ad.impression_id);

          var _sizeMap$ad$size_id$s = sizeMap[ad.size_id].split('x').map(function (num) {
            return Number(num);
          });

          var _sizeMap$ad$size_id$s2 = _slicedToArray(_sizeMap$ad$size_id$s, 2);

          bid.width = _sizeMap$ad$size_id$s2[0];
          bid.height = _sizeMap$ad$size_id$s2[1];
        } // add server-side targeting


        bid.rubiconTargeting = (Array.isArray(ad.targeting) ? ad.targeting : []).reduce(function (memo, item) {
          memo[item.key] = item.values[0];
          return memo;
        }, {
          'rpfl_elemid': associatedBidRequest.adUnitCode
        });
        bids.push(bid);
      } else {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("Rubicon: bidRequest undefined at index position:".concat(i), bidRequest, responseObj);
      }

      return bids;
    }, []).sort(function (adA, adB) {
      return (adB.cpm || 0.0) - (adA.cpm || 0.0);
    });
  },
  getUserSyncs: function getUserSyncs(syncOptions, responses, gdprConsent, uspConsent) {
    if (!hasSynced && syncOptions.iframeEnabled) {
      // data is only assigned if params are available to pass to SYNC_ENDPOINT
      var params = '';

      if (gdprConsent && typeof gdprConsent.consentString === 'string') {
        // add 'gdpr' only if 'gdprApplies' is defined
        if (typeof gdprConsent.gdprApplies === 'boolean') {
          params += "?gdpr=".concat(Number(gdprConsent.gdprApplies), "&gdpr_consent=").concat(gdprConsent.consentString);
        } else {
          params += "?gdpr_consent=".concat(gdprConsent.consentString);
        }
      }

      if (uspConsent) {
        params += "".concat(params ? '&' : '?', "us_privacy=").concat(encodeURIComponent(uspConsent));
      }

      hasSynced = true;
      return {
        type: 'iframe',
        url: SYNC_ENDPOINT + params
      };
    }
  },

  /**
   * Covert bid param types for S2S
   * @param {Object} params bid params
   * @param {Boolean} isOpenRtb boolean to check openrtb2 protocol
   * @return {Object} params bid params
   */
  transformBidParams: function transformBidParams(params, isOpenRtb) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["convertTypes"]({
      'accountId': 'number',
      'siteId': 'number',
      'zoneId': 'number'
    }, params);
  }
};

function _getScreenResolution() {
  return [window.screen.width, window.screen.height].join('x');
}

function _getDigiTrustQueryParams() {
  var _digiTrustQueryParams;

  var bidRequest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var endpointName = arguments.length > 1 ? arguments[1] : undefined;

  if (!endpointName || !DIGITRUST_PROP_NAMES[endpointName]) {
    return null;
  }

  var propNames = DIGITRUST_PROP_NAMES[endpointName];

  function getDigiTrustId() {
    var bidRequestDigitrust = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'userId.digitrustid.data');

    if (bidRequestDigitrust) {
      return bidRequestDigitrust;
    }

    var digiTrustUser = window.DigiTrust && (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('digiTrustId') || window.DigiTrust.getUser({
      member: 'T9QSFKPDN9'
    }));
    return digiTrustUser && digiTrustUser.success && digiTrustUser.identity || null;
  }

  var digiTrustId = getDigiTrustId(); // Verify there is an ID and this user has not opted out

  if (!digiTrustId || digiTrustId.privacy && digiTrustId.privacy.optout) {
    return null;
  }

  var digiTrustQueryParams = (_digiTrustQueryParams = {}, _defineProperty(_digiTrustQueryParams, propNames.id, digiTrustId.id), _defineProperty(_digiTrustQueryParams, propNames.keyv, digiTrustId.keyv), _digiTrustQueryParams);

  if (propNames.pref) {
    digiTrustQueryParams[propNames.pref] = 0;
  }

  return digiTrustQueryParams;
}
/**
 * @param {BidRequest} bidRequest
 * @param bidderRequest
 * @returns {string}
 */


function _getPageUrl(bidRequest, bidderRequest) {
  var pageUrl = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('pageUrl');

  if (bidRequest.params.referrer) {
    pageUrl = bidRequest.params.referrer;
  } else if (!pageUrl) {
    pageUrl = bidderRequest.refererInfo.referer;
  }

  return bidRequest.params.secure ? pageUrl.replace(/^http:/i, 'https:') : pageUrl;
}

function _renderCreative(script, impId) {
  return "<html>\n<head><script type='text/javascript'>inDapIF=true;</script></head>\n<body style='margin : 0; padding: 0;'>\n<!-- Rubicon Project Ad Tag -->\n<div data-rp-impression-id='".concat(impId, "'>\n<script type='text/javascript'>").concat(script, "</script>\n</div>\n</body>\n</html>");
}

function parseSizes(bid, mediaType) {
  var params = bid.params;

  if (mediaType === 'video') {
    var size = [];

    if (params.video && params.video.playerWidth && params.video.playerHeight) {
      size = [params.video.playerWidth, params.video.playerHeight];
    } else if (Array.isArray(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.playerSize')) && bid.mediaTypes.video.playerSize.length === 1) {
      size = bid.mediaTypes.video.playerSize[0];
    } else if (Array.isArray(bid.sizes) && bid.sizes.length > 0 && Array.isArray(bid.sizes[0]) && bid.sizes[0].length > 1) {
      size = bid.sizes[0];
    }

    return size;
  } // deprecated: temp legacy support


  var sizes = [];

  if (Array.isArray(params.sizes)) {
    sizes = params.sizes;
  } else if (typeof __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner.sizes') !== 'undefined') {
    sizes = mapSizes(bid.mediaTypes.banner.sizes);
  } else if (Array.isArray(bid.sizes) && bid.sizes.length > 0) {
    sizes = mapSizes(bid.sizes);
  } else {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Rubicon: no sizes are setup or found');
  }

  return masSizeOrdering(sizes);
}
/**
 * @param {Object} data
 * @param bidRequest
 * @param bidderRequest
 */


function appendSiteAppDevice(data, bidRequest, bidderRequest) {
  if (!data) return; // ORTB specifies app OR site

  if (_typeof(__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('app')) === 'object') {
    data.app = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('app');
  } else {
    data.site = {
      page: _getPageUrl(bidRequest, bidderRequest)
    };
  }

  if (_typeof(__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('device')) === 'object') {
    data.device = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('device');
  } // Add language to site and device objects if there


  if (bidRequest.params.video.language) {
    ['site', 'device'].forEach(function (param) {
      if (data[param]) {
        data[param].content = _extends({
          language: bidRequest.params.video.language
        }, data[param].content);
      }
    });
  }
}
/**
 * @param {Object} data
 * @param {BidRequest} bidRequest
 */


function addVideoParameters(data, bidRequest) {
  if (_typeof(data.imp[0].video) === 'object' && data.imp[0].video.skip === undefined) {
    data.imp[0].video.skip = bidRequest.params.video.skip;
  }

  if (_typeof(data.imp[0].video) === 'object' && data.imp[0].video.skipafter === undefined) {
    data.imp[0].video.skipafter = bidRequest.params.video.skipdelay;
  } // video.pos can already be specified by adunit.mediatypes.video.pos.
  // but if not, it might be specified in the params


  if (_typeof(data.imp[0].video) === 'object' && data.imp[0].video.pos === undefined) {
    if (bidRequest.params.position === 'atf') {
      data.imp[0].video.pos = 1;
    } else if (bidRequest.params.position === 'btf') {
      data.imp[0].video.pos = 3;
    }
  }

  var size = parseSizes(bidRequest, 'video');
  data.imp[0].video.w = size[0];
  data.imp[0].video.h = size[1];
}
/**
 * @param sizes
 * @returns {*}
 */


function mapSizes(sizes) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](sizes) // map sizes while excluding non-matches
  .reduce(function (result, size) {
    var mappedSize = parseInt(sizeMap[size], 10);

    if (mappedSize) {
      result.push(mappedSize);
    }

    return result;
  }, []);
}
/**
 * Test if bid has mediaType or mediaTypes set for video.
 * Also makes sure the video object is present in the rubicon bidder params
 * @param {BidRequest} bidRequest
 * @returns {boolean}
 */


function hasVideoMediaType(bidRequest) {
  if (_typeof(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'params.video')) !== 'object') {
    return false;
  }

  return typeof __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */])) !== 'undefined';
}
/**
 * Determine bidRequest mediaType
 * @param bid the bid to test
 * @param log whether we should log errors/warnings for invalid bids
 * @returns {string|undefined} Returns 'video' or 'banner' if resolves to a type, or undefined otherwise (invalid).
 */

function bidType(bid) {
  var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  // Is it considered video ad unit by rubicon
  if (hasVideoMediaType(bid)) {
    // Removed legacy mediaType support. new way using mediaTypes.video object is now required
    // We require either context as instream or outstream
    if (['outstream', 'instream'].indexOf(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */], ".context"))) === -1) {
      if (log) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Rubicon: mediaTypes.video.context must be outstream or instream');
      }

      return;
    } // we require playerWidth and playerHeight to come from one of params.playerWidth/playerHeight or mediaTypes.video.playerSize or adUnit.sizes


    if (parseSizes(bid, 'video').length < 2) {
      if (log) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Rubicon: could not determine the playerSize of the video');
      }

      return;
    }

    if (log) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logMessage"]('Rubicon: making video request for adUnit', bid.adUnitCode);
    }

    return 'video';
  } else {
    // we require banner sizes to come from one of params.sizes or mediaTypes.banner.sizes or adUnit.sizes, in that order
    // if we cannot determine them, we reject it!
    if (parseSizes(bid, 'banner').length === 0) {
      if (log) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Rubicon: could not determine the sizes for banner request');
      }

      return;
    } // everything looks good for banner so lets do it


    if (log) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logMessage"]('Rubicon: making banner request for adUnit', bid.adUnitCode);
    }

    return 'banner';
  }
}

function masSizeOrdering(sizes) {
  var MAS_SIZE_PRIORITY = [15, 2, 9];
  return sizes.sort(function (first, second) {
    // sort by MAS_SIZE_PRIORITY priority order
    var firstPriority = MAS_SIZE_PRIORITY.indexOf(first);
    var secondPriority = MAS_SIZE_PRIORITY.indexOf(second);

    if (firstPriority > -1 || secondPriority > -1) {
      if (firstPriority === -1) {
        return 1;
      }

      if (secondPriority === -1) {
        return -1;
      }

      return firstPriority - secondPriority;
    } // and finally ascending order


    return first - second;
  });
}
function determineRubiconVideoSizeId(bid) {
  // If we have size_id in the bid then use it
  var rubiconSizeId = parseInt(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.video.size_id'));

  if (!isNaN(rubiconSizeId)) {
    return rubiconSizeId;
  } // otherwise 203 for outstream and 201 for instream
  // When this function is used we know it has to be one of outstream or instream


  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */], ".context")) === 'outstream' ? 203 : 201;
}
/**
 * @param {PrebidConfig} config
 * @returns {{ranges: {ranges: Object[]}}}
 */

function getPriceGranularity(config) {
  return {
    ranges: {
      low: [{
        max: 5.00,
        increment: 0.50
      }],
      medium: [{
        max: 20.00,
        increment: 0.10
      }],
      high: [{
        max: 20.00,
        increment: 0.01
      }],
      auto: [{
        max: 5.00,
        increment: 0.05
      }, {
        min: 5.00,
        max: 10.00,
        increment: 0.10
      }, {
        min: 10.00,
        max: 20.00,
        increment: 0.50
      }],
      dense: [{
        max: 3.00,
        increment: 0.01
      }, {
        min: 3.00,
        max: 8.00,
        increment: 0.05
      }, {
        min: 8.00,
        max: 20.00,
        increment: 0.50
      }],
      custom: config.getConfig('customPriceBucket') && config.getConfig('customPriceBucket').buckets
    }[config.getConfig('priceGranularity')]
  };
} // Function to validate the required video params

function hasValidVideoParams(bid) {
  var isValid = true; // incase future javascript changes the string represenation of the array or number classes!

  var arrayType = Object.prototype.toString.call([]);
  var numberType = Object.prototype.toString.call(0); // required params and their associated object type

  var requiredParams = {
    mimes: arrayType,
    protocols: arrayType,
    maxduration: numberType,
    linearity: numberType,
    api: arrayType
  }; // loop through each param and verify it has the correct

  Object.keys(requiredParams).forEach(function (param) {
    if (Object.prototype.toString.call(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.' + param)) !== requiredParams[param]) {
      isValid = false;
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Rubicon: mediaTypes.video.' + param + ' is required and must be of type: ' + requiredParams[param]);
    }
  });
  return isValid;
}
/**
 * Make sure the required params are present
 * @param {Object} schain
 * @param {Bool}
 */

function hasValidSupplyChainParams(schain) {
  var isValid = false;
  var requiredFields = ['asi', 'sid', 'hp'];
  if (!schain.nodes) return isValid;
  isValid = schain.nodes.reduce(function (status, node) {
    if (!status) return status;
    return requiredFields.every(function (field) {
      return node[field];
    });
  }, true);
  if (!isValid) __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Rubicon: required schain params missing');
  return isValid;
}
/**
 * Creates a URL key value param, encoding the
 * param unless the key is schain
 * @param {String} key
 * @param {String} param
 * @returns {String}
 */

function encodeParam(key, param) {
  if (key === 'rp_schain') return "rp_schain=".concat(param);
  return "".concat(key, "=").concat(encodeURIComponent(param));
}
/**
 * split array into multiple arrays of defined size
 * @param {Array} array
 * @param {number} size
 * @returns {Array}
 */

function partitionArray(array, size) {
  return array.map(function (e, i) {
    return i % size === 0 ? array.slice(i, i + size) : null;
  }).filter(function (e) {
    return e;
  });
}

var hasSynced = false;
function resetUserSync() {
  hasSynced = false;
}
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[664]);
pbjsChunk([80],{

/***/ 754:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(755);


/***/ }),

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tripleliftAdapterSpec", function() { return tripleliftAdapterSpec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var BIDDER_CODE = 'triplelift';
var STR_ENDPOINT = 'https://tlx.3lift.com/header/auction?';
var gdprApplies = true;
var consentString = null;
var tripleliftAdapterSpec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return typeof bid.params.inventoryCode !== 'undefined';
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var tlCall = STR_ENDPOINT;

    var data = _buildPostBody(bidRequests);

    tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'lib', 'prebid');
    tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'v', "4.2.0");

    if (bidderRequest && bidderRequest.refererInfo) {
      var referrer = bidderRequest.refererInfo.referer;
      tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'referrer', referrer);
    }

    if (bidderRequest && bidderRequest.timeout) {
      tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'tmax', bidderRequest.timeout);
    }

    if (bidderRequest && bidderRequest.gdprConsent) {
      if (typeof bidderRequest.gdprConsent.gdprApplies !== 'undefined') {
        gdprApplies = bidderRequest.gdprConsent.gdprApplies;
        tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'gdpr', gdprApplies.toString());
      }

      if (typeof bidderRequest.gdprConsent.consentString !== 'undefined') {
        consentString = bidderRequest.gdprConsent.consentString;
        tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'cmp_cs', consentString);
      }
    }

    if (bidderRequest && bidderRequest.uspConsent) {
      tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'us_privacy', bidderRequest.uspConsent);
    }

    if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('coppa') === true) {
      tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'coppa', true);
    }

    if (tlCall.lastIndexOf('&') === tlCall.length - 1) {
      tlCall = tlCall.substring(0, tlCall.length - 1);
    }

    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"]('tlCall request built: ' + tlCall);
    return {
      method: 'POST',
      url: tlCall,
      data: data,
      bidderRequest: bidderRequest
    };
  },
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bidderRequest = _ref.bidderRequest;
    var bids = serverResponse.body.bids || [];
    return bids.map(function (bid) {
      return _buildResponseObject(bidderRequest, bid);
    });
  },
  getUserSyncs: function getUserSyncs(syncOptions, responses, gdprConsent, usPrivacy) {
    var syncType = _getSyncType(syncOptions);

    if (!syncType) return;
    var syncEndpoint = 'https://eb2.3lift.com/sync?';

    if (syncType === 'image') {
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'px', 1);
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'src', 'prebid');
    }

    if (consentString !== null) {
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'gdpr', gdprApplies);
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'cmp_cs', consentString);
    }

    if (usPrivacy) {
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'us_privacy', usPrivacy);
    }

    return [{
      type: syncType,
      url: syncEndpoint
    }];
  }
};

function _getSyncType(syncOptions) {
  if (!syncOptions) return;
  if (syncOptions.iframeEnabled) return 'iframe';
  if (syncOptions.pixelEnabled) return 'image';
}

function _buildPostBody(bidRequests) {
  var data = {};
  var schain = bidRequests[0].schain;
  data.imp = bidRequests.map(function (bid, index) {
    return {
      id: index,
      tagid: bid.params.inventoryCode,
      floor: _getFloor(bid),
      banner: {
        format: _sizes(bid.sizes)
      }
    };
  });
  var eids = [].concat(_toConsumableArray(getUnifiedIdEids(bidRequests)), _toConsumableArray(getIdentityLinkEids(bidRequests)), _toConsumableArray(getCriteoEids(bidRequests)));

  if (eids.length > 0) {
    data.user = {
      ext: {
        eids: eids
      }
    };
  }

  if (schain) {
    data.ext = {
      schain: schain
    };
  }

  return data;
}

function _getFloor(bid) {
  var floor = null;

  if (typeof bid.getFloor === 'function') {
    var floorInfo = bid.getFloor({
      currency: 'USD',
      mediaType: 'banner',
      size: _sizes(bid.sizes)
    });

    if (_typeof(floorInfo) === 'object' && floorInfo.currency === 'USD' && !isNaN(parseFloat(floorInfo.floor))) {
      floor = parseFloat(floorInfo.floor);
    }
  }

  return floor !== null ? floor : bid.params.floor;
}

function getUnifiedIdEids(bidRequests) {
  return getEids(bidRequests, 'tdid', 'adserver.org', 'TDID');
}

function getIdentityLinkEids(bidRequests) {
  return getEids(bidRequests, 'idl_env', 'liveramp.com', 'idl');
}

function getCriteoEids(bidRequests) {
  return getEids(bidRequests, 'criteoId', 'criteo.com', 'criteoId');
}

function getEids(bidRequests, type, source, rtiPartner) {
  return bidRequests.map(getUserId(type)) // bids -> userIds of a certain type
  .filter(function (x) {
    return !!x;
  }) // filter out null userIds
  .map(formatEid(source, rtiPartner)); // userIds -> eid objects
}

function getUserId(type) {
  return function (bid) {
    return bid && bid.userId && bid.userId[type];
  };
}

function formatEid(source, rtiPartner) {
  return function (id) {
    return {
      source: source,
      uids: [{
        id: id,
        ext: {
          rtiPartner: rtiPartner
        }
      }]
    };
  };
}

function _sizes(sizeArray) {
  var sizes = sizeArray.filter(_isValidSize);
  return sizes.map(function (size) {
    return {
      w: size[0],
      h: size[1]
    };
  });
}

function _isValidSize(size) {
  return size.length === 2 && typeof size[0] === 'number' && typeof size[1] === 'number';
}

function _buildResponseObject(bidderRequest, bid) {
  var bidResponse = {};
  var width = bid.width || 1;
  var height = bid.height || 1;
  var dealId = bid.deal_id || '';
  var creativeId = bid.crid || '';

  if (bid.cpm != 0 && bid.ad) {
    bidResponse = {
      requestId: bidderRequest.bids[bid.imp_id].bidId,
      cpm: bid.cpm,
      width: width,
      height: height,
      netRevenue: true,
      ad: bid.ad,
      creativeId: creativeId,
      dealId: dealId,
      currency: 'USD',
      ttl: 300,
      tl_source: bid.tl_source
    };
  }

  ;
  return bidResponse;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(tripleliftAdapterSpec);

/***/ })

},[754]);
pbjsChunk([74],{

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(769);


/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/**
 * Adapter to send bids to Undertone
 */



var BIDDER_CODE = 'undertone';
var URL = 'https://hb.undertone.com/hb';
var FRAME_USER_SYNC = 'https://cdn.undertone.com/js/usersync.html';
var PIXEL_USER_SYNC_1 = 'https://usr.undertone.com/userPixel/syncOne?id=1&of=2';
var PIXEL_USER_SYNC_2 = 'https://usr.undertone.com/userPixel/syncOne?id=2&of=2';

function getCanonicalUrl() {
  try {
    var doc = window.top.document;
    var element = doc.querySelector("link[rel='canonical']");

    if (element !== null) {
      return element.href;
    }
  } catch (e) {}

  return null;
}

function extractDomainFromHost(pageHost) {
  var domain = null;

  try {
    var domains = /[-\w]+\.([-\w]+|[-\w]{3,}|[-\w]{1,3}\.[-\w]{2})$/i.exec(pageHost);

    if (domains != null && domains.length > 0) {
      domain = domains[0];

      for (var i = 1; i < domains.length; i++) {
        if (domains[i].length > domain.length) {
          domain = domains[i];
        }
      }
    }
  } catch (e) {
    domain = null;
  }

  return domain;
}

function getGdprQueryParams(gdprConsent) {
  if (!gdprConsent) {
    return null;
  }

  var gdpr = gdprConsent.gdprApplies ? '1' : '0';
  var gdprstr = gdprConsent.consentString ? gdprConsent.consentString : '';
  return "gdpr=".concat(gdpr, "&gdprstr=").concat(gdprstr);
}

function getBannerCoords(id) {
  var element = document.getElementById(id);
  var left = -1;
  var top = -1;

  if (element) {
    left = element.offsetLeft;
    top = element.offsetTop;
    var parent = element.offsetParent;

    if (parent) {
      left += parent.offsetLeft;
      top += parent.offsetTop;
    }

    return [left, top];
  } else {
    return null;
  }
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid && bid.params && bid.params.publisherId) {
      bid.params.publisherId = parseInt(bid.params.publisherId);
      return true;
    }
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var pageSizeArray = vw == 0 || vh == 0 ? null : [vw, vh];
    var payload = {
      'x-ut-hb-params': [],
      'commons': {
        'adapterVersion': "4.2.0",
        'uids': validBidRequests[0].userId,
        'pageSize': pageSizeArray
      }
    };
    var referer = bidderRequest.refererInfo.referer;
    var hostname = Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseUrl"])(referer).hostname;
    var domain = extractDomainFromHost(hostname);
    var pageUrl = getCanonicalUrl() || referer;
    var pubid = validBidRequests[0].params.publisherId;
    var reqUrl = "".concat(URL, "?pid=").concat(pubid, "&domain=").concat(domain);
    var gdprParams = getGdprQueryParams(bidderRequest.gdprConsent);

    if (gdprParams) {
      reqUrl += "&".concat(gdprParams);
    }

    if (bidderRequest.uspConsent) {
      reqUrl += "&ccpa=".concat(bidderRequest.uspConsent);
    }

    validBidRequests.map(function (bidReq) {
      var bid = {
        bidRequestId: bidReq.bidId,
        coordinates: getBannerCoords(bidReq.adUnitCode),
        hbadaptor: 'prebid',
        url: pageUrl,
        domain: domain,
        placementId: bidReq.params.placementId != undefined ? bidReq.params.placementId : null,
        publisherId: bidReq.params.publisherId,
        sizes: bidReq.sizes,
        params: bidReq.params
      };
      var videoMediaType = Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'mediaTypes.video');

      if (videoMediaType) {
        bid.video = {
          playerSize: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'mediaTypes.video.playerSize') || null,
          streamType: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'mediaTypes.video.context') || null,
          playbackMethod: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'params.video.playbackMethod') || null,
          maxDuration: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'params.video.maxDuration') || null,
          skippable: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'params.video.skippable') || null
        };
        bid.mediaType = 'video';
      }

      payload['x-ut-hb-params'].push(bid);
    });
    return {
      method: 'POST',
      url: reqUrl,
      withCredentials: true,
      data: JSON.stringify(payload)
    };
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bids = [];
    var body = serverResponse.body;

    if (body && Array.isArray(body) && body.length > 0) {
      body.forEach(function (bidRes) {
        if (bidRes.ad && bidRes.cpm > 0) {
          var bid = {
            requestId: bidRes.bidRequestId,
            cpm: bidRes.cpm,
            width: bidRes.width,
            height: bidRes.height,
            creativeId: bidRes.adId,
            currency: bidRes.currency,
            netRevenue: bidRes.netRevenue,
            ttl: bidRes.ttl || 360
          };

          if (bidRes.mediaType && bidRes.mediaType === 'video') {
            bid.vastXml = bidRes.ad;
            bid.mediaType = bidRes.mediaType;
          } else {
            bid.ad = bidRes.ad;
          }

          bids.push(bid);
        }
      });
    }

    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent, usPrivacy) {
    var syncs = [];
    var gdprParams = getGdprQueryParams(gdprConsent);
    var iframePrivacyParams = '';
    var pixelPrivacyParams = '';

    if (gdprParams) {
      iframePrivacyParams += "?".concat(gdprParams);
      pixelPrivacyParams += "&".concat(gdprParams);
    }

    if (usPrivacy) {
      if (iframePrivacyParams != '') {
        iframePrivacyParams += '&';
      } else {
        iframePrivacyParams += '?';
      }

      iframePrivacyParams += "ccpa=".concat(usPrivacy);
      pixelPrivacyParams += "&ccpa=".concat(usPrivacy);
    }

    if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: FRAME_USER_SYNC + iframePrivacyParams
      });
    } else if (syncOptions.pixelEnabled) {
      syncs.push({
        type: 'image',
        url: PIXEL_USER_SYNC_1 + pixelPrivacyParams
      }, {
        type: 'image',
        url: PIXEL_USER_SYNC_2 + pixelPrivacyParams
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[768]);
pbjs.processQueue();