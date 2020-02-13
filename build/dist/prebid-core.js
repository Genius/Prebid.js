/* prebid.js v2.37.0
Updated : 2020-02-13 */
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
/******/ 		274: 0
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
/******/ 	return __webpack_require__(__webpack_require__.s = 682);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "internal", function() { return internal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return bind; });
/* harmony export (immutable) */ __webpack_exports__["replaceTokenInString"] = replaceTokenInString;
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
/* harmony export (immutable) */ __webpack_exports__["getTopWindowLocation"] = getTopWindowLocation;
/* harmony export (immutable) */ __webpack_exports__["getTopFrameReferrer"] = getTopFrameReferrer;
/* harmony export (immutable) */ __webpack_exports__["getAncestorOrigins"] = getAncestorOrigins;
/* harmony export (immutable) */ __webpack_exports__["getWindowTop"] = getWindowTop;
/* harmony export (immutable) */ __webpack_exports__["getWindowSelf"] = getWindowSelf;
/* harmony export (immutable) */ __webpack_exports__["getWindowLocation"] = getWindowLocation;
/* harmony export (immutable) */ __webpack_exports__["getTopWindowUrl"] = getTopWindowUrl;
/* harmony export (immutable) */ __webpack_exports__["getTopWindowReferrer"] = getTopWindowReferrer;
/* harmony export (immutable) */ __webpack_exports__["logMessage"] = logMessage;
/* harmony export (immutable) */ __webpack_exports__["logInfo"] = logInfo;
/* harmony export (immutable) */ __webpack_exports__["logWarn"] = logWarn;
/* harmony export (immutable) */ __webpack_exports__["logError"] = logError;
/* harmony export (immutable) */ __webpack_exports__["hasConsoleLogger"] = hasConsoleLogger;
/* harmony export (immutable) */ __webpack_exports__["debugTurnedOn"] = debugTurnedOn;
/* harmony export (immutable) */ __webpack_exports__["createInvisibleIframe"] = createInvisibleIframe;
/* harmony export (immutable) */ __webpack_exports__["getParameterByName"] = getParameterByName;
/* harmony export (immutable) */ __webpack_exports__["hasValidBidRequest"] = hasValidBidRequest;
/* harmony export (immutable) */ __webpack_exports__["addEventHandler"] = addEventHandler;
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexOf", function() { return indexOf; });
/* harmony export (immutable) */ __webpack_exports__["_map"] = _map;
/* harmony export (immutable) */ __webpack_exports__["hasOwn"] = hasOwn;
/* harmony export (immutable) */ __webpack_exports__["insertElement"] = insertElement;
/* harmony export (immutable) */ __webpack_exports__["triggerPixel"] = triggerPixel;
/* harmony export (immutable) */ __webpack_exports__["callBurl"] = callBurl;
/* harmony export (immutable) */ __webpack_exports__["insertHtmlIntoIframe"] = insertHtmlIntoIframe;
/* harmony export (immutable) */ __webpack_exports__["insertUserSyncIframe"] = insertUserSyncIframe;
/* harmony export (immutable) */ __webpack_exports__["createTrackPixelHtml"] = createTrackPixelHtml;
/* harmony export (immutable) */ __webpack_exports__["createTrackPixelIframeHtml"] = createTrackPixelIframeHtml;
/* harmony export (immutable) */ __webpack_exports__["getIframeDocument"] = getIframeDocument;
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
/* harmony export (immutable) */ __webpack_exports__["isSrcdocSupported"] = isSrcdocSupported;
/* harmony export (immutable) */ __webpack_exports__["deepClone"] = deepClone;
/* harmony export (immutable) */ __webpack_exports__["inIframe"] = inIframe;
/* harmony export (immutable) */ __webpack_exports__["isSafariBrowser"] = isSafariBrowser;
/* harmony export (immutable) */ __webpack_exports__["replaceAuctionPrice"] = replaceAuctionPrice;
/* harmony export (immutable) */ __webpack_exports__["timestamp"] = timestamp;
/* harmony export (immutable) */ __webpack_exports__["checkCookieSupport"] = checkCookieSupport;
/* harmony export (immutable) */ __webpack_exports__["cookiesAreEnabled"] = cookiesAreEnabled;
/* harmony export (immutable) */ __webpack_exports__["getCookie"] = getCookie;
/* harmony export (immutable) */ __webpack_exports__["setCookie"] = setCookie;
/* harmony export (immutable) */ __webpack_exports__["localStorageIsEnabled"] = localStorageIsEnabled;
/* harmony export (immutable) */ __webpack_exports__["delayExecution"] = delayExecution;
/* harmony export (immutable) */ __webpack_exports__["groupBy"] = groupBy;
/* harmony export (immutable) */ __webpack_exports__["createContentToExecuteExtScriptInFriendlyFrame"] = createContentToExecuteExtScriptInFriendlyFrame;
/* harmony export (immutable) */ __webpack_exports__["getDefinedParams"] = getDefinedParams;
/* harmony export (immutable) */ __webpack_exports__["isValidMediaTypes"] = isValidMediaTypes;
/* harmony export (immutable) */ __webpack_exports__["getBidderRequest"] = getBidderRequest;
/* harmony export (immutable) */ __webpack_exports__["getUserConfiguredParams"] = getUserConfiguredParams;
/* harmony export (immutable) */ __webpack_exports__["getOrigin"] = getOrigin;
/* harmony export (immutable) */ __webpack_exports__["getDNT"] = getDNT;
/* harmony export (immutable) */ __webpack_exports__["isAdUnitCodeMatchingSlot"] = isAdUnitCodeMatchingSlot;
/* harmony export (immutable) */ __webpack_exports__["isSlotMatchingAdUnitCode"] = isSlotMatchingAdUnitCode;
/* harmony export (immutable) */ __webpack_exports__["unsupportedBidderMessage"] = unsupportedBidderMessage;
/* harmony export (immutable) */ __webpack_exports__["deletePropertyFromObject"] = deletePropertyFromObject;
/* harmony export (immutable) */ __webpack_exports__["isInteger"] = isInteger;
/* harmony export (immutable) */ __webpack_exports__["convertCamelToUnderscore"] = convertCamelToUnderscore;
/* harmony export (immutable) */ __webpack_exports__["cleanObj"] = cleanObj;
/* harmony export (immutable) */ __webpack_exports__["pick"] = pick;
/* harmony export (immutable) */ __webpack_exports__["transformBidderParamKeywords"] = transformBidderParamKeywords;
/* harmony export (immutable) */ __webpack_exports__["convertTypes"] = convertTypes;
/* harmony export (immutable) */ __webpack_exports__["setDataInLocalStorage"] = setDataInLocalStorage;
/* harmony export (immutable) */ __webpack_exports__["getDataFromLocalStorage"] = getDataFromLocalStorage;
/* harmony export (immutable) */ __webpack_exports__["hasLocalStorage"] = hasLocalStorage;
/* harmony export (immutable) */ __webpack_exports__["isArrayOfNums"] = isArrayOfNums;
/* harmony export (immutable) */ __webpack_exports__["fill"] = fill;
/* harmony export (immutable) */ __webpack_exports__["chunk"] = chunk;
/* harmony export (immutable) */ __webpack_exports__["getMinValueFromArray"] = getMinValueFromArray;
/* harmony export (immutable) */ __webpack_exports__["getMaxValueFromArray"] = getMaxValueFromArray;
/* harmony export (immutable) */ __webpack_exports__["compareOn"] = compareOn;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_just_clone__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_just_clone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_just_clone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_dlv_index__ = __webpack_require__(89);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deepAccess", function() { return __WEBPACK_IMPORTED_MODULE_5_dlv_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_dset__ = __webpack_require__(90);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deepSetValue", function() { return __WEBPACK_IMPORTED_MODULE_6_dset__["a"]; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }







var CONSTANTS = __webpack_require__(4);



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
  getAncestorOrigins: getAncestorOrigins,
  getTopFrameReferrer: getTopFrameReferrer,
  getWindowLocation: getWindowLocation,
  getTopWindowLocation: getTopWindowLocation,
  insertUserSyncIframe: insertUserSyncIframe,
  insertElement: insertElement,
  isFn: isFn,
  triggerPixel: triggerPixel,
  logError: logError,
  logWarn: logWarn,
  logMessage: logMessage,
  logInfo: logInfo
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
/*
 *   Substitutes into a string from a given map using the token
 *   Usage
 *   var str = 'text %%REPLACE%% this text with %%SOMETHING%%';
 *   var map = {};
 *   map['replace'] = 'it was subbed';
 *   map['something'] = 'something else';
 *   console.log(replaceTokenInString(str, map, '%%')); => "text it was subbed this text with something else"
 */

function replaceTokenInString(str, map, token) {
  _each(map, function (value, key) {
    value = value === undefined ? '' : value;
    var keyString = token + key.toUpperCase() + token;
    var re = new RegExp(keyString, 'g');
    str = str.replace(re, value);
  });

  return str;
}
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
    return existingUrl += key + '=' + encodeURIComponent(value) + '&';
  }

  return existingUrl;
} // parse a query string object passed in bid params
// bid params should be an object such as {key: "value", key1 : "value1"}

function parseQueryStringParameters(queryObj) {
  var result = '';

  for (var k in queryObj) {
    if (queryObj.hasOwnProperty(k)) {
      result += k + '=' + encodeURIComponent(queryObj[k]) + '&';
    }
  }

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
    }
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
/**
 * @deprecated This function will be removed soon. Use http://prebid.org/dev-docs/bidder-adaptor.html#referrers
 */


function getTopWindowLocation() {
  if (inIframe()) {
    var loc;

    try {
      loc = internal.getAncestorOrigins() || internal.getTopFrameReferrer();
    } catch (e) {
      logInfo('could not obtain top window location', e);
    }

    if (loc) return Object(__WEBPACK_IMPORTED_MODULE_4__url__["c" /* parse */])(loc, {
      'decodeSearchAsString': true
    });
  }

  return internal.getWindowLocation();
}
/**
 * @deprecated This function will be removed soon. Use http://prebid.org/dev-docs/bidder-adaptor.html#referrers
 */

function getTopFrameReferrer() {
  try {
    // force an exception in x-domain environments. #1509
    window.top.location.toString();
    var referrerLoc = '';
    var currentWindow;

    do {
      currentWindow = currentWindow ? currentWindow.parent : window;

      if (currentWindow.document && currentWindow.document.referrer) {
        referrerLoc = currentWindow.document.referrer;
      }
    } while (currentWindow !== window.top);

    return referrerLoc;
  } catch (e) {
    return window.document.referrer;
  }
}
/**
 * @deprecated This function will be removed soon. Use http://prebid.org/dev-docs/bidder-adaptor.html#referrers
 */

function getAncestorOrigins() {
  if (window.document.location && window.document.location.ancestorOrigins && window.document.location.ancestorOrigins.length >= 1) {
    return window.document.location.ancestorOrigins[window.document.location.ancestorOrigins.length - 1];
  }
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
 * @deprecated This function will be removed soon. Use http://prebid.org/dev-docs/bidder-adaptor.html#referrers
 */

function getTopWindowUrl() {
  var href;

  try {
    href = internal.getTopWindowLocation().href;
  } catch (e) {
    href = '';
  }

  return href;
}
/**
 * @deprecated This function will be removed soon. Use http://prebid.org/dev-docs/bidder-adaptor.html#referrers
 */

function getTopWindowReferrer() {
  try {
    return window.top.document.referrer;
  } catch (e) {
    return document.referrer;
  }
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
  return !!__WEBPACK_IMPORTED_MODULE_0__config__["b" /* config */].getConfig('debug');
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
  var regexS = '[\\?&]' + name + '=([^&#]*)';
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);

  if (results === null) {
    return '';
  }

  return decodeURIComponent(results[1].replace(/\+/g, ' '));
}
/**
 * This function validates paramaters.
 * @param  {Object} paramObj          [description]
 * @param  {string[]} requiredParamsArr [description]
 * @return {boolean}                   Bool if paramaters are valid
 */

function hasValidBidRequest(paramObj, requiredParamsArr, adapter) {
  var found = false;

  function findParam(value, key) {
    if (key === requiredParamsArr[i]) {
      found = true;
    }
  }

  for (var i = 0; i < requiredParamsArr.length; i++) {
    found = false;

    _each(paramObj, findParam);

    if (!found) {
      logError('Params are missing for bid request. One of these required paramaters are missing: ' + requiredParamsArr, adapter);
      return false;
    }
  }

  return true;
} // Handle addEventListener gracefully in older browsers

function addEventHandler(element, event, func) {
  if (element.addEventListener) {
    element.addEventListener(event, func, true);
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, func);
  }
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
var indexOf = function () {
  if (Array.prototype.indexOf) {
    return Array.prototype.indexOf;
  } // ie8 no longer supported
  // return polyfills.indexOf;

}();
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
/**
 * Returns iframe document in a browser agnostic way
 * @param  {Object} iframe reference
 * @return {Object}        iframe `document` reference
 */

function getIframeDocument(iframe) {
  if (!iframe) {
    return;
  }

  var doc;

  try {
    if (iframe.contentWindow) {
      doc = iframe.contentWindow.document;
    } else if (iframe.contentDocument.document) {
      doc = iframe.contentDocument.document;
    } else {
      doc = iframe.contentDocument;
    }
  } catch (e) {
    internal.logError('Cannot get iframe document', e);
  }

  return doc;
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
    var result = __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find___default()(bidderRequest.bids, function (bid) {
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
  return __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default()(filter, bid && bid.adUnitCode);
}
/**
 * Check if parent iframe of passed document supports content rendering via 'srcdoc' property
 * @param {HTMLDocument} doc document to check support of 'srcdoc'
 */

function isSrcdocSupported(doc) {
  // Firefox is excluded due to https://bugzilla.mozilla.org/show_bug.cgi?id=1265961
  return doc.defaultView && doc.defaultView.frameElement && 'srcdoc' in doc.defaultView.frameElement && !/firefox/i.test(navigator.userAgent);
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
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function replaceAuctionPrice(str, cpm) {
  if (!str) return;
  return str.replace(/\$\{AUCTION_PRICE\}/g, cpm);
}
function timestamp() {
  return new Date().getTime();
}
function checkCookieSupport() {
  if (window.navigator.cookieEnabled || !!document.cookie.length) {
    return true;
  }
}
function cookiesAreEnabled() {
  if (internal.checkCookieSupport()) {
    return true;
  }

  window.document.cookie = 'prebid.cookieTest';
  return window.document.cookie.indexOf('prebid.cookieTest') != -1;
}
function getCookie(name) {
  var m = window.document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]*)\\s*(;|$)');
  return m ? decodeURIComponent(m[2]) : null;
}
function setCookie(key, value, expires, sameSite) {
  document.cookie = "".concat(key, "=").concat(encodeURIComponent(value)).concat(expires !== '' ? "; expires=".concat(expires) : '', "; path=/").concat(sameSite ? "; SameSite=".concat(sameSite) : '');
}
/**
 * @returns {boolean}
 */

function localStorageIsEnabled() {
  try {
    localStorage.setItem('prebid.cookieTest', '1');
    return localStorage.getItem('prebid.cookieTest') === '1';
  } catch (error) {
    return false;
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
      func.apply(null, arguments);
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
 * Returns content for a friendly iframe to execute a URL in script tag
 * @param {string} url URL to be executed in a script tag in a friendly iframe
 * <!--PRE_SCRIPT_TAG_MACRO--> and <!--POST_SCRIPT_TAG_MACRO--> are macros left to be replaced if required
 */

function createContentToExecuteExtScriptInFriendlyFrame(url) {
  if (!url) {
    return '';
  }

  return "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"><html><head><base target=\"_top\" /><script>inDapIF=true;</script></head><body><!--PRE_SCRIPT_TAG_MACRO--><script src=\"".concat(url, "\"></script><!--POST_SCRIPT_TAG_MACRO--></body></html>");
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
    return __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default()(SUPPORTED_MEDIA_TYPES, type);
  })) {
    return false;
  }

  if (mediaTypes.video && mediaTypes.video.context) {
    return __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default()(SUPPORTED_STREAM_TYPES, mediaTypes.video.context);
  }

  return true;
}
function getBidderRequest(bidRequests, bidder, adUnitCode) {
  return __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find___default()(bidRequests, function (request) {
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
 * Delete property from object
 * @param {Object} object
 * @param {string} prop
 * @return {Object} object
 */

function deletePropertyFromObject(object, prop) {
  var result = _extends({}, object);

  delete result[prop];
  return result;
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
function setDataInLocalStorage(key, value) {
  if (hasLocalStorage()) {
    window.localStorage.setItem(key, value);
  }
}
function getDataFromLocalStorage(key) {
  if (hasLocalStorage()) {
    return window.localStorage.getItem(key);
  }
}
function hasLocalStorage() {
  try {
    return !!window.localStorage;
  } catch (e) {
    logError('Local storage api disabled');
  }
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

/***/ }),

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["registerBidder"] = registerBidder;
/* harmony export (immutable) */ __webpack_exports__["newBidder"] = newBidder;
/* harmony export (immutable) */ __webpack_exports__["preloadBidderMappingFile"] = preloadBidderMappingFile;
/* harmony export (immutable) */ __webpack_exports__["getIabSubCategory"] = getIabSubCategory;
/* harmony export (immutable) */ __webpack_exports__["isValid"] = isValid;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adapter__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__adapterManager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bidfactory__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userSync__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__native__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__video__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__events__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__hook__ = __webpack_require__(13);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }















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
 * @property {string} [meta.iabSubCatId] The IAB subcategory ID
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
    __WEBPACK_IMPORTED_MODULE_1__adapterManager__["default"].registerBidAdapter(bidder, spec.code, mediaTypes);
  }

  putBidder(spec);

  if (Array.isArray(spec.aliases)) {
    spec.aliases.forEach(function (alias) {
      __WEBPACK_IMPORTED_MODULE_1__adapterManager__["default"].aliasRegistry[alias] = spec.code;
      putBidder(_extends({}, spec, {
        code: alias
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
  return _extends(new __WEBPACK_IMPORTED_MODULE_0__adapter__["a" /* default */](spec.code), {
    getSpec: function getSpec() {
      return Object.freeze(spec);
    },
    registerSyncs: registerSyncs,
    callBids: function callBids(bidderRequest, addBidResponse, done, ajax, onTimelyResponse) {
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
        __WEBPACK_IMPORTED_MODULE_8__events___default.a.emit(__WEBPACK_IMPORTED_MODULE_7__constants_json___default.a.EVENTS.BIDDER_DONE, bidderRequest);
        registerSyncs(responses, bidderRequest.gdprConsent);
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


      var onResponse = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["delayExecution"])(afterAllResponses, requests.length);
      requests.forEach(processRequest);

      function formatGetParameters(data) {
        if (data) {
          return "?".concat(_typeof(data) === 'object' ? Object(__WEBPACK_IMPORTED_MODULE_11__utils__["parseQueryStringParameters"])(data) : data);
        }

        return '';
      }

      function processRequest(request) {
        switch (request.method) {
          case 'GET':
            ajax("".concat(request.url).concat(formatGetParameters(request.data)), {
              success: onSuccess,
              error: onFailure
            }, undefined, _extends({
              method: 'GET',
              withCredentials: true
            }, request.options));
            break;

          case 'POST':
            ajax(request.url, {
              success: onSuccess,
              error: onFailure
            }, typeof request.data === 'string' ? request.data : JSON.stringify(request.data), _extends({
              method: 'POST',
              contentType: 'text/plain',
              withCredentials: true
            }, request.options));
            break;

          default:
            Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logWarn"])("Skipping invalid request from ".concat(spec.code, ". Request type ").concat(request.type, " must be GET or POST"));
            onResponse();
        } // If the server responds successfully, use the adapter code to unpack the Bids from it.
        // If the adapter code fails, no bids should be added. After all the bids have been added, make
        // sure to call the `onResponse` function so that we're one step closer to calling done().


        function onSuccess(response, responseObj) {
          onTimelyResponse(spec.code);

          try {
            response = JSON.parse(response);
          } catch (e) {}
          /* response might not be JSON... that's ok. */
          // Make response headers available for #1742. These are lazy-loaded because most adapters won't need them.


          response = {
            body: response,
            headers: headerParser(responseObj)
          };
          responses.push(response);
          var bids;

          try {
            bids = spec.interpretResponse(response, request);
          } catch (err) {
            Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logError"])("Bidder ".concat(spec.code, " failed to interpret the server's response. Continuing without bids"), null, err);
            onResponse();
            return;
          }

          if (bids) {
            if (Object(__WEBPACK_IMPORTED_MODULE_11__utils__["isArray"])(bids)) {
              bids.forEach(addBidUsingRequestMap);
            } else {
              addBidUsingRequestMap(bids);
            }
          }

          onResponse(bids);

          function addBidUsingRequestMap(bid) {
            var bidRequest = bidRequestMap[bid.requestId];

            if (bidRequest) {
              var prebidBid = _extends(Object(__WEBPACK_IMPORTED_MODULE_3__bidfactory__["a" /* createBid */])(__WEBPACK_IMPORTED_MODULE_7__constants_json___default.a.STATUS.GOOD, bidRequest), bid);

              addBidWithCode(bidRequest.adUnitCode, prebidBid);
            } else {
              Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logWarn"])("Bidder ".concat(spec.code, " made bid for unknown request ID: ").concat(bid.requestId, ". Ignoring."));
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
          Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logError"])("Server call for ".concat(spec.code, " failed: ").concat(err, ". Continuing without bids."));
          onResponse();
        }
      }
    }
  });

  function registerSyncs(responses, gdprConsent) {
    if (spec.getUserSyncs) {
      var filterConfig = __WEBPACK_IMPORTED_MODULE_2__config__["b" /* config */].getConfig('userSync.filterSettings');
      var syncs = spec.getUserSyncs({
        iframeEnabled: !!(__WEBPACK_IMPORTED_MODULE_2__config__["b" /* config */].getConfig('userSync.iframeEnabled') || filterConfig && (filterConfig.iframe || filterConfig.all)),
        pixelEnabled: !!(__WEBPACK_IMPORTED_MODULE_2__config__["b" /* config */].getConfig('userSync.pixelEnabled') || filterConfig && (filterConfig.image || filterConfig.all))
      }, responses, gdprConsent);

      if (syncs) {
        if (!Array.isArray(syncs)) {
          syncs = [syncs];
        }

        syncs.forEach(function (sync) {
          __WEBPACK_IMPORTED_MODULE_4__userSync__["a" /* userSync */].registerSync(sync.type, spec.code, sync.url);
        });
      }
    }
  }

  function filterAndWarn(bid) {
    if (!spec.isBidRequestValid(bid)) {
      Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logWarn"])("Invalid bid sent to bidder ".concat(spec.code, ": ").concat(JSON.stringify(bid)));
      return false;
    }

    return true;
  }
}
function preloadBidderMappingFile(fn, adUnits) {
  if (!__WEBPACK_IMPORTED_MODULE_2__config__["b" /* config */].getConfig('adpod.brandCategoryExclusion')) {
    return fn.call(this, adUnits);
  }

  var adPodBidders = adUnits.filter(function (adUnit) {
    return Object(__WEBPACK_IMPORTED_MODULE_11__utils__["deepAccess"])(adUnit, 'mediaTypes.video.context') === __WEBPACK_IMPORTED_MODULE_12__mediaTypes__["a" /* ADPOD */];
  }).map(function (adUnit) {
    return adUnit.bids.map(function (bid) {
      return bid.bidder;
    });
  }).reduce(__WEBPACK_IMPORTED_MODULE_11__utils__["flatten"], []).filter(__WEBPACK_IMPORTED_MODULE_11__utils__["uniques"]);
  adPodBidders.forEach(function (bidder) {
    var bidderSpec = __WEBPACK_IMPORTED_MODULE_1__adapterManager__["default"].getBidAdapter(bidder);

    if (bidderSpec.getSpec().getMappingFileInfo) {
      var info = bidderSpec.getSpec().getMappingFileInfo();
      var refreshInDays = info.refreshInDays ? info.refreshInDays : DEFAULT_REFRESHIN_DAYS;
      var key = info.localStorageKey ? info.localStorageKey : bidderSpec.getSpec().code;
      var mappingData = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["getDataFromLocalStorage"])(key);

      if (!mappingData || Object(__WEBPACK_IMPORTED_MODULE_11__utils__["timestamp"])() < mappingData.lastUpdated + refreshInDays * 24 * 60 * 60 * 1000) {
        Object(__WEBPACK_IMPORTED_MODULE_10__ajax__["a" /* ajax */])(info.url, {
          success: function success(response) {
            try {
              response = JSON.parse(response);
              var mapping = {
                lastUpdated: Object(__WEBPACK_IMPORTED_MODULE_11__utils__["timestamp"])(),
                mapping: response.mapping
              };
              Object(__WEBPACK_IMPORTED_MODULE_11__utils__["setDataInLocalStorage"])(key, JSON.stringify(mapping));
            } catch (error) {
              Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logError"])("Failed to parse ".concat(bidder, " bidder translation mapping file"));
            }
          },
          error: function error() {
            Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logError"])("Failed to load ".concat(bidder, " bidder translation file"));
          }
        });
      }
    }
  });
  fn.call(this, adUnits);
}
Object(__WEBPACK_IMPORTED_MODULE_13__hook__["a" /* getHook */])('checkAdUnitSetup').before(preloadBidderMappingFile);
/**
 * Reads the data stored in localstorage and returns iab subcategory
 * @param {string} bidderCode bidderCode
 * @param {string} category bidders category
 */

function getIabSubCategory(bidderCode, category) {
  var bidderSpec = __WEBPACK_IMPORTED_MODULE_1__adapterManager__["default"].getBidAdapter(bidderCode);

  if (bidderSpec.getSpec().getMappingFileInfo) {
    var info = bidderSpec.getSpec().getMappingFileInfo();
    var key = info.localStorageKey ? info.localStorageKey : bidderSpec.getBidderCode();
    var data = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["getDataFromLocalStorage"])(key);

    if (data) {
      try {
        data = JSON.parse(data);
      } catch (error) {
        Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logError"])("Failed to parse ".concat(bidderCode, " mapping data stored in local storage"));
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

  var adUnit = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["getBidderRequest"])(bidRequests, bid.bidderCode, adUnitCode);
  var sizes = adUnit && adUnit.bids && adUnit.bids[0] && adUnit.bids[0].sizes;
  var parsedSizes = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["parseSizesInput"])(sizes); // if a banner impression has one valid size, we assign that size to any bid
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
      return __WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_includes___default()(bidKeys, key) && !__WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_includes___default()([undefined, null], bid[key]);
    });
  }

  function errorMessage(msg) {
    return "Invalid bid from ".concat(bid.bidderCode, ". Ignoring bid: ").concat(msg);
  }

  if (!adUnitCode) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logWarn"])('No adUnitCode was supplied to addBidResponse.');
    return false;
  }

  if (!bid) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logWarn"])("Some adapter tried to add an undefined bid for ".concat(adUnitCode, "."));
    return false;
  }

  if (!hasValidKeys()) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logError"])(errorMessage("Bidder ".concat(bid.bidderCode, " is missing required params. Check http://prebid.org/dev-docs/bidder-adapter-1.html for list of params.")));
    return false;
  }

  if (bid.mediaType === 'native' && !Object(__WEBPACK_IMPORTED_MODULE_5__native__["f" /* nativeBidIsValid */])(bid, bidRequests)) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logError"])(errorMessage('Native bid missing some required properties.'));
    return false;
  }

  if (bid.mediaType === 'video' && !Object(__WEBPACK_IMPORTED_MODULE_6__video__["d" /* isValidVideoBid */])(bid, bidRequests)) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logError"])(errorMessage("Video bid does not have required vastUrl or renderer property"));
    return false;
  }

  if (bid.mediaType === 'banner' && !validBidSize(adUnitCode, bid, bidRequests)) {
    Object(__WEBPACK_IMPORTED_MODULE_11__utils__["logError"])(errorMessage("Banner bids require a width and height"));
    return false;
  }

  return true;
}

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
module.exports = __webpack_require__(16).Array.includes;


/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Renderer;
/* harmony export (immutable) */ __webpack_exports__["c"] = isRendererRequired;
/* harmony export (immutable) */ __webpack_exports__["b"] = executeRenderer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adloader__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find__);



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
  // render function is loaded by loadScript, at which point the the command
  // queue will be processed

  this.loaded = loaded;
  this.cmd = [];

  this.push = function (func) {
    if (typeof func !== 'function') {
      __WEBPACK_IMPORTED_MODULE_1__utils__["logError"]('Commands given to Renderer.push must be wrapped in a function');
      return;
    }

    _this.loaded ? func.call() : _this.cmd.push(func);
  }; // bidders may override this with the `callback` property given to `install`


  this.callback = callback || function () {
    _this.loaded = true;

    _this.process();
  };

  if (!isRendererDefinedOnAdUnit(adUnitCode)) {
    // we expect to load a renderer url once only so cache the request to load script
    Object(__WEBPACK_IMPORTED_MODULE_0__adloader__["b" /* loadScript */])(url, this.callback, true);
  } else {
    __WEBPACK_IMPORTED_MODULE_1__utils__["logWarn"]("External Js not loaded by Renderer since renderer url and callback is already defined on adUnit ".concat(adUnitCode));
  }
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
  this.render = fn;
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

  __WEBPACK_IMPORTED_MODULE_1__utils__["logMessage"]("Prebid Renderer event for id ".concat(id, " type ").concat(eventName));
};
/*
 * Calls functions that were pushed to the command queue before the
 * renderer was loaded by `loadScript`
 */


Renderer.prototype.process = function () {
  while (this.cmd.length > 0) {
    try {
      this.cmd.shift().call();
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_1__utils__["logError"]('Error processing Renderer command: ', error);
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
  var adUnit = __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find___default()(adUnits, function (adUnit) {
    return adUnit.code === adUnitCode;
  });
  return !!(adUnit && adUnit.renderer && adUnit.renderer.url && adUnit.renderer.render);
}

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
module.exports = __webpack_require__(16).Array.find;


/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getHook; });
/* harmony export (immutable) */ __webpack_exports__["d"] = setupBeforeHookFnOnce;
/* harmony export (immutable) */ __webpack_exports__["c"] = module;
/* harmony export (immutable) */ __webpack_exports__["e"] = submodule;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


var hook = __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval___default()({
  ready: __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval___default.a.SYNC | __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval___default.a.ASYNC | __WEBPACK_IMPORTED_MODULE_0_fun_hooks_no_eval___default.a.QUEUE
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(15);
var $find = __webpack_require__(45)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(37)(KEY);


/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listenMessagesFromCreative;
/* unused harmony export _sendAdToCreative */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__native__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__constants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auctionManager__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Renderer__ = __webpack_require__(11);
/* Secure Creatives
  Provides support for rendering creatives into cross domain iframes such as SafeFrame to prevent
   access to a publisher page from creative payloads.
 */







var BID_WON = __WEBPACK_IMPORTED_MODULE_2__constants__["EVENTS"].BID_WON;
function listenMessagesFromCreative() {
  addEventListener('message', receiveMessage, false);
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
    var adObject = __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_find___default()(__WEBPACK_IMPORTED_MODULE_4__auctionManager__["a" /* auctionManager */].getBidsReceived(), function (bid) {
      return bid.adId === data.adId;
    });

    if (adObject && data.message === 'Prebid Request') {
      _sendAdToCreative(adObject, data.adServerDomain, ev.source); // save winning bids


      __WEBPACK_IMPORTED_MODULE_4__auctionManager__["a" /* auctionManager */].addWinningBid(adObject);
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.emit(BID_WON, adObject);
    } // handle this script from native template in an ad server
    // window.parent.postMessage(JSON.stringify({
    //   message: 'Prebid Native',
    //   adId: '%%PATTERN:hb_adid%%'
    // }), '*');


    if (adObject && data.message === 'Prebid Native') {
      if (data.action === 'assetRequest') {
        var message = Object(__WEBPACK_IMPORTED_MODULE_1__native__["c" /* getAssetMessage */])(data, adObject);
        ev.source.postMessage(JSON.stringify(message), ev.origin);
        return;
      }

      var trackerType = Object(__WEBPACK_IMPORTED_MODULE_1__native__["b" /* fireNativeTrackers */])(data, adObject);

      if (trackerType === 'click') {
        return;
      }

      __WEBPACK_IMPORTED_MODULE_4__auctionManager__["a" /* auctionManager */].addWinningBid(adObject);
      __WEBPACK_IMPORTED_MODULE_0__events___default.a.emit(BID_WON, adObject);
    }
  }
}

function _sendAdToCreative(adObject, remoteDomain, source) {
  var adId = adObject.adId,
      ad = adObject.ad,
      adUrl = adObject.adUrl,
      width = adObject.width,
      height = adObject.height,
      renderer = adObject.renderer,
      cpm = adObject.cpm; // rendering for outstream safeframe

  if (Object(__WEBPACK_IMPORTED_MODULE_6__Renderer__["c" /* isRendererRequired */])(renderer)) {
    Object(__WEBPACK_IMPORTED_MODULE_6__Renderer__["b" /* executeRenderer */])(renderer, adObject);
  } else if (adId) {
    resizeRemoteCreative(adObject);
    source.postMessage(JSON.stringify({
      message: 'Prebid Response',
      ad: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["replaceAuctionPrice"])(ad, cpm),
      adUrl: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["replaceAuctionPrice"])(adUrl, cpm),
      adId: adId,
      width: width,
      height: height
    }), remoteDomain);
  }
}

function resizeRemoteCreative(_ref) {
  var adUnitCode = _ref.adUnitCode,
      width = _ref.width,
      height = _ref.height;
  // resize both container div + iframe
  ['div:last-child', 'div:last-child iframe'].forEach(function (elmType) {
    var element = getElementByAdUnit(elmType);

    if (element) {
      var elementStyle = element.style;
      elementStyle.width = width + 'px';
      elementStyle.height = height + 'px';
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_3__utils__["logWarn"])("Unable to locate matching page element for adUnitCode ".concat(adUnitCode, ".  Can't resize it to ad's dimensions.  Please review setup."));
    }
  });

  function getElementByAdUnit(elmType) {
    var id = getElementIdBasedOnAdServer(adUnitCode);
    var parentDivEle = document.getElementById(id);
    return parentDivEle && parentDivEle.querySelector(elmType);
  }

  function getElementIdBasedOnAdServer(adUnitCode) {
    if (window.googletag) {
      return getDfpElementId(adUnitCode);
    } else if (window.apntag) {
      return getAstElementId(adUnitCode);
    } else {
      return adUnitCode;
    }
  }

  function getDfpElementId(adUnitCode) {
    return __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_find___default()(window.googletag.pubads().getSlots().filter(Object(__WEBPACK_IMPORTED_MODULE_3__utils__["isSlotMatchingAdUnitCode"])(adUnitCode)), function (slot) {
      return slot;
    }).getSlotElementId();
  }

  function getAstElementId(adUnitCode) {
    var astTag = window.apntag.getTag(adUnitCode);
    return astTag && astTag.targetId;
  }
}

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export boundHook */
/* unused harmony export disableOverrides */
/* unused harmony export addBidResponseHook */
/* unused harmony export getConfig */
/* harmony export (immutable) */ __webpack_exports__["a"] = sessionLoader;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auction__ = __webpack_require__(39);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var OVERRIDE_KEY = "pbjs:debugging";
var boundHook;

function logMessage(msg) {
  Object(__WEBPACK_IMPORTED_MODULE_1__utils__["logMessage"])('DEBUG: ' + msg);
}

function logWarn(msg) {
  Object(__WEBPACK_IMPORTED_MODULE_1__utils__["logWarn"])('DEBUG: ' + msg);
}

function removeHook() {
  __WEBPACK_IMPORTED_MODULE_2__auction__["c" /* addBidResponse */].getHooks({
    hook: boundHook
  }).remove();
}

function enableOverrides(overrides) {
  var fromSession = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  __WEBPACK_IMPORTED_MODULE_0__config__["b" /* config */].setConfig({
    'debug': true
  });
  logMessage("bidder overrides enabled".concat(fromSession ? ' from session' : ''));
  removeHook();
  boundHook = addBidResponseHook.bind(overrides);
  __WEBPACK_IMPORTED_MODULE_2__auction__["c" /* addBidResponse */].before(boundHook, 5);
}

function disableOverrides() {
  removeHook();
  logMessage('bidder overrides disabled');
}
function addBidResponseHook(next, adUnitCode, bid) {
  var overrides = this;

  if (Array.isArray(overrides.bidders) && overrides.bidders.indexOf(bid.bidderCode) === -1) {
    logWarn("bidder '".concat(bid.bidderCode, "' excluded from auction by bidder overrides"));
    return;
  }

  if (Array.isArray(overrides.bids)) {
    overrides.bids.forEach(function (overrideBid) {
      if (overrideBid.bidder && overrideBid.bidder !== bid.bidderCode) {
        return;
      }

      if (overrideBid.adUnitCode && overrideBid.adUnitCode !== adUnitCode) {
        return;
      }

      bid = _extends({}, bid);
      Object.keys(overrideBid).filter(function (key) {
        return ['bidder', 'adUnitCode'].indexOf(key) === -1;
      }).forEach(function (key) {
        var value = overrideBid[key];
        logMessage("bidder overrides changed '".concat(adUnitCode, "/").concat(bid.bidderCode, "' bid.").concat(key, " from '").concat(bid[key], "' to '").concat(value, "'"));
        bid[key] = value;
      });
    });
  }

  next(adUnitCode, bid);
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
__WEBPACK_IMPORTED_MODULE_0__config__["b" /* config */].getConfig('debugging', function (_ref) {
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

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(136);
__webpack_require__(66);
__webpack_require__(145);
__webpack_require__(147);
__webpack_require__(151);
__webpack_require__(154);
__webpack_require__(156);
module.exports = __webpack_require__(16).Set;


/***/ }),

/***/ 136:
/***/ (function(module, exports) {



/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(47);
var defined = __webpack_require__(35);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(21);


/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(67);
var descriptor = __webpack_require__(44);
var setToStringTag = __webpack_require__(54);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(21)(IteratorPrototype, __webpack_require__(14)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(59)('wks');
var uid = __webpack_require__(48);
var Symbol = __webpack_require__(19).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(20);
var anObject = __webpack_require__(29);
var getKeys = __webpack_require__(141);

module.exports = __webpack_require__(22) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(142);
var enumBugKeys = __webpack_require__(68);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(30);
var toIObject = __webpack_require__(49);
var arrayIndexOf = __webpack_require__(61)(false);
var IE_PROTO = __webpack_require__(53)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(19).document;
module.exports = document && document.documentElement;


/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(30);
var toObject = __webpack_require__(46);
var IE_PROTO = __webpack_require__(53)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(146);
var global = __webpack_require__(19);
var hide = __webpack_require__(21);
var Iterators = __webpack_require__(32);
var TO_STRING_TAG = __webpack_require__(14)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(37);
var step = __webpack_require__(69);
var Iterators = __webpack_require__(32);
var toIObject = __webpack_require__(49);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(52)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(148);
var validate = __webpack_require__(77);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(150)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(20).f;
var create = __webpack_require__(67);
var redefineAll = __webpack_require__(70);
var ctx = __webpack_require__(25);
var anInstance = __webpack_require__(71);
var forOf = __webpack_require__(41);
var $iterDefine = __webpack_require__(52);
var step = __webpack_require__(69);
var setSpecies = __webpack_require__(149);
var DESCRIPTORS = __webpack_require__(22);
var fastKey = __webpack_require__(76).fastKey;
var validate = __webpack_require__(77);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(19);
var core = __webpack_require__(16);
var dP = __webpack_require__(20);
var DESCRIPTORS = __webpack_require__(22);
var SPECIES = __webpack_require__(14)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);
var core = __webpack_require__(16);
var ctx = __webpack_require__(25);
var hide = __webpack_require__(21);
var has = __webpack_require__(30);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(19);
var $export = __webpack_require__(15);
var meta = __webpack_require__(76);
var fails = __webpack_require__(33);
var hide = __webpack_require__(21);
var redefineAll = __webpack_require__(70);
var forOf = __webpack_require__(41);
var anInstance = __webpack_require__(71);
var isObject = __webpack_require__(18);
var setToStringTag = __webpack_require__(54);
var dP = __webpack_require__(20).f;
var each = __webpack_require__(45)(0);
var DESCRIPTORS = __webpack_require__(22);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(15);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(152)('Set') });


/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(75);
var from = __webpack_require__(153);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(41);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(155)('Set');


/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(15);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(157)('Set');


/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(15);
var aFunction = __webpack_require__(56);
var ctx = __webpack_require__(25);
var forOf = __webpack_require__(41);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(66);
__webpack_require__(159);
module.exports = __webpack_require__(16).Array.from;


/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(25);
var $export = __webpack_require__(15);
var toObject = __webpack_require__(46);
var call = __webpack_require__(72);
var isArrayIter = __webpack_require__(73);
var toLength = __webpack_require__(36);
var createProperty = __webpack_require__(160);
var getIterFn = __webpack_require__(74);

$export($export.S + $export.F * !__webpack_require__(161)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ 16:
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(20);
var createDesc = __webpack_require__(44);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(14)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


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
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(29);
var IE8_DOM_DEFINE = __webpack_require__(81);
var toPrimitive = __webpack_require__(82);
var dP = Object.defineProperty;

exports.f = __webpack_require__(22) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(20);
var createDesc = __webpack_require__(44);
module.exports = __webpack_require__(22) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(33)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 23:
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

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export newAuctionManager */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return auctionManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auction__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find__);
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




var CONSTANTS = __webpack_require__(4);
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
    var auction = __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find___default()(_auctions, function (auction) {
      return auction.getAuctionId() === bid.auctionId;
    });

    if (auction) {
      auction.addWinningBid(bid);
    } else {
      utils.logWarn("Auction not found when adding winning bid");
    }
  };

  auctionManager.getAllWinningBids = function () {
    return _auctions.map(function (auction) {
      return auction.getWinningBids();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils__["flatten"], []);
  };

  auctionManager.getBidsRequested = function () {
    return _auctions.map(function (auction) {
      return auction.getBidRequests();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils__["flatten"], []);
  };

  auctionManager.getNoBids = function () {
    return _auctions.map(function (auction) {
      return auction.getNoBids();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils__["flatten"], []);
  };

  auctionManager.getBidsReceived = function () {
    return _auctions.map(function (auction) {
      if (auction.getAuctionStatus() === __WEBPACK_IMPORTED_MODULE_1__auction__["a" /* AUCTION_COMPLETED */]) {
        return auction.getBidsReceived();
      }
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils__["flatten"], []).filter(function (bid) {
      return bid;
    });
  };

  auctionManager.getAdUnits = function () {
    return _auctions.map(function (auction) {
      return auction.getAdUnits();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils__["flatten"], []);
  };

  auctionManager.getAdUnitCodes = function () {
    return _auctions.map(function (auction) {
      return auction.getAdUnitCodes();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils__["flatten"], []).filter(__WEBPACK_IMPORTED_MODULE_0__utils__["uniques"]);
  };

  auctionManager.createAuction = function (_ref) {
    var adUnits = _ref.adUnits,
        adUnitCodes = _ref.adUnitCodes,
        callback = _ref.callback,
        cbTimeout = _ref.cbTimeout,
        labels = _ref.labels,
        auctionId = _ref.auctionId;
    var auction = Object(__WEBPACK_IMPORTED_MODULE_1__auction__["j" /* newAuction */])({
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
    return __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find___default()(_auctions.map(function (auction) {
      return auction.getBidsReceived();
    }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils__["flatten"], []), function (bid) {
      return bid.adId === adId;
    });
  };

  auctionManager.getStandardBidderAdServerTargeting = function () {
    return Object(__WEBPACK_IMPORTED_MODULE_1__auction__["i" /* getStandardBidderSettings */])()[CONSTANTS.JSON_MAPPING.ADSERVER_TARGETING];
  };

  auctionManager.setStatusForBids = function (adId, status) {
    var bid = auctionManager.findBidByAdId(adId);
    if (bid) bid.status = status;

    if (bid && status === CONSTANTS.BID_STATUS.BID_TARGETING_SET) {
      var auction = __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find___default()(_auctions, function (auction) {
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

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(56);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
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

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(251);
module.exports = __webpack_require__(16).String.includes;


/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(15);
var context = __webpack_require__(252);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(254)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(253);
var defined = __webpack_require__(35);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(18);
var cof = __webpack_require__(34);
var MATCH = __webpack_require__(14)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(14)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ 26:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_library_fn_array_includes__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var CONSTANTS = __webpack_require__(4);

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
  if (!(type && __WEBPACK_IMPORTED_MODULE_1_core_js_library_fn_array_includes___default()(Object.keys(SUPPORTED_TYPES), type))) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["logError"])("".concat(type, " nativeParam is not supported"));
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
  var mediaTypes = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(adUnit, 'mediaTypes.native');
  return mediaType || mediaTypes;
};
var nativeBidder = function nativeBidder(bid) {
  return __WEBPACK_IMPORTED_MODULE_1_core_js_library_fn_array_includes___default()(nativeAdapters, bid.bidder);
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
  var bidRequest = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["getBidRequest"])(bid.requestId, bidRequests);

  if (!bidRequest) {
    return false;
  } // all native bid responses must define a landing page url


  if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(bid, 'native.clickUrl')) {
    return false;
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(bid, 'native.image')) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(bid, 'native.image.height') || !Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(bid, 'native.image.width')) {
      return false;
    }
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(bid, 'native.icon')) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(bid, 'native.icon.height') || !Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(bid, 'native.icon.width')) {
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
    return __WEBPACK_IMPORTED_MODULE_1_core_js_library_fn_array_includes___default()(returnedAssets, asset);
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
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["insertHtmlIntoIframe"])(adObject['native'].javascriptTrackers);
    }
  }

  (trackers || []).forEach(__WEBPACK_IMPORTED_MODULE_0__utils__["triggerPixel"]);
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
    var sendPlaceholder = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(bidReq, "mediaTypes.native.".concat(asset, ".sendId"));

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
    var key = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["getKeyByValue"])(CONSTANTS.NATIVE_KEYS, asset);
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

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export newUserSync */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return userSync; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



 // Set userSync default values

__WEBPACK_IMPORTED_MODULE_1__config__["b" /* config */].setDefaults({
  'userSync': {
    syncEnabled: true,
    pixelEnabled: true,
    syncsPerBidder: 5,
    syncDelay: 3000,
    auctionDelay: 0
  }
});
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
    image: false,
    iframe: false
  }; // Use what is in config by default

  var usConfig = userSyncDependencies.config; // Update if it's (re)set

  __WEBPACK_IMPORTED_MODULE_1__config__["b" /* config */].getConfig('userSync', function (conf) {
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
      return __WEBPACK_IMPORTED_MODULE_0__utils__["logError"]('Error firing user syncs', e);
    } // Reset the user sync queue


    queue = getDefaultQueue();
  }

  function forEachFire(queue, fn) {
    // Randomize the order of the pixels before firing
    // This is to avoid giving any bidder who has registered multiple syncs
    // any preferential treatment and balancing them out
    __WEBPACK_IMPORTED_MODULE_0__utils__["shuffle"](queue).forEach(function (sync) {
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
    if (!(usConfig.pixelEnabled || permittedPixels.image)) {
      return;
    }

    forEachFire(queue.image, function (sync) {
      var _sync = _slicedToArray(sync, 2),
          bidderName = _sync[0],
          trackingPixelUrl = _sync[1];

      __WEBPACK_IMPORTED_MODULE_0__utils__["logMessage"]("Invoking image pixel user sync for bidder: ".concat(bidderName)); // Create image object and add the src url

      __WEBPACK_IMPORTED_MODULE_0__utils__["triggerPixel"](trackingPixelUrl);
    });
  }
  /**
   * @function loadIframes
   * @summary Loops through iframe syncs and loads an iframe element into the page
   * @private
   */


  function loadIframes() {
    if (!(usConfig.iframeEnabled || permittedPixels.iframe)) {
      return;
    }

    forEachFire(queue.iframe, function (sync) {
      var _sync2 = _slicedToArray(sync, 2),
          bidderName = _sync2[0],
          iframeUrl = _sync2[1];

      __WEBPACK_IMPORTED_MODULE_0__utils__["logMessage"]("Invoking iframe user sync for bidder: ".concat(bidderName)); // Insert iframe into DOM

      __WEBPACK_IMPORTED_MODULE_0__utils__["insertUserSyncIframe"](iframeUrl);
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
      return __WEBPACK_IMPORTED_MODULE_0__utils__["logMessage"]("already fired syncs for \"".concat(bidder, "\", ignoring registerSync call"));
    }

    if (!usConfig.syncEnabled || !__WEBPACK_IMPORTED_MODULE_0__utils__["isArray"](queue[type])) {
      return __WEBPACK_IMPORTED_MODULE_0__utils__["logWarn"]("User sync type \"".concat(type, "\" not supported"));
    }

    if (!bidder) {
      return __WEBPACK_IMPORTED_MODULE_0__utils__["logWarn"]("Bidder is required for registering sync");
    }

    if (usConfig.syncsPerBidder !== 0 && Number(numAdapterBids[bidder]) >= usConfig.syncsPerBidder) {
      return __WEBPACK_IMPORTED_MODULE_0__utils__["logWarn"]("Number of user syncs exceeded for \"".concat(bidder, "\""));
    }

    var canBidderRegisterSync = publicApi.canBidderRegisterSync(type, bidder);

    if (!canBidderRegisterSync) {
      return __WEBPACK_IMPORTED_MODULE_0__utils__["logWarn"]("Bidder \"".concat(bidder, "\" not permitted to register their \"").concat(type, "\" userSync pixels."));
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
          return !__WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default()(bidders, bidder);
        },
        'exclude': function exclude(bidders, bidder) {
          return __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default()(bidders, bidder);
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
      __WEBPACK_IMPORTED_MODULE_0__utils__["logWarn"]("Detected presence of the \"filterSettings.all\" and \"filterSettings.".concat(type, "\" in userSync config.  You cannot mix \"all\" with \"iframe/image\" configs; they are mutually exclusive."));
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
      __WEBPACK_IMPORTED_MODULE_0__utils__["logWarn"]("UserSync \"filterSettings.".concat(activeConfigName, ".filter\" setting '").concat(filterField, "' is not a valid option; use either 'include' or 'exclude'."));
      return false;
    }

    if (biddersField !== '*' && !(Array.isArray(biddersField) && biddersField.length > 0 && biddersField.every(function (bidderInList) {
      return __WEBPACK_IMPORTED_MODULE_0__utils__["isStr"](bidderInList) && bidderInList !== '*';
    }))) {
      __WEBPACK_IMPORTED_MODULE_0__utils__["logWarn"]("Detected an invalid setup in userSync \"filterSettings.".concat(activeConfigName, ".bidders\"; use either '*' (to represent all bidders) or an array of bidders."));
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
      } // TODO remove this else if code that supports deprecated fields (sometime in 2.x); for now - only run if filterSettings config is not present

    } else if (usConfig.enabledBidders && usConfig.enabledBidders.length && usConfig.enabledBidders.indexOf(bidder) < 0) {
      return false;
    } else if (type === 'iframe' && !(usConfig.iframeEnabled || permittedPixels.iframe)) {
      return false;
    } else if (type === 'image' && !(usConfig.pixelEnabled || permittedPixels.image)) {
      return false;
    }

    return true;
  };

  return publicApi;
}
var browserSupportsCookies = !__WEBPACK_IMPORTED_MODULE_0__utils__["isSafariBrowser"]() && __WEBPACK_IMPORTED_MODULE_0__utils__["cookiesAreEnabled"]();
var userSync = newUserSync({
  config: __WEBPACK_IMPORTED_MODULE_1__config__["b" /* config */].getConfig('userSync'),
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
 * @property {boolean} pixelEnabled
 * @property {boolean} iframeEnabled
 * @property {int} syncsPerBidder
 * @property {string[]} enabledBidders
 * @property {Object} filterSettings
 */

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getGlobal;
// if $$PREBID_GLOBAL$$ already exists in global document scope, use it, if not, create the object
// global defination should happen BEFORE imports to avoid global undefined errors.
window.pbjs = window.pbjs || {};
window.pbjs.cmd = window.pbjs.cmd || [];
window.pbjs.que = window.pbjs.que || [];
function getGlobal() {
  return window.pbjs;
}

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(18);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RANDOM; });
/* unused harmony export newConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cpmBucketManager__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_library_fn_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__url__ = __webpack_require__(9);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Module for getting and setting Prebid configuration.
 */





var utils = __webpack_require__(0);

var CONSTANTS = __webpack_require__(4);

var DEFAULT_DEBUG = (Object(__WEBPACK_IMPORTED_MODULE_3__url__["d" /* parseQS */])(window.location.search)[CONSTANTS.DEBUG_MODE] || '').toUpperCase() === 'TRUE';
var DEFAULT_BIDDER_TIMEOUT = 3000;
var DEFAULT_PUBLISHER_DOMAIN = window.location.origin;
var DEFAULT_ENABLE_SEND_ALL_BIDS = true;
var DEFAULT_DISABLE_AJAX_TIMEOUT = false;
var DEFAULT_BID_CACHE = false;
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
          } else if (_typeof(val) === 'object') {
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
            } else if (_typeof(val) === 'object') {
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

    function hasGranularity(val) {
      return __WEBPACK_IMPORTED_MODULE_1_core_js_library_fn_array_find___default()(Object.keys(GRANULARITY_OPTIONS), function (option) {
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
      } else if (_typeof(val) === 'object') {
        if (!Object(__WEBPACK_IMPORTED_MODULE_0__cpmBucketManager__["b" /* isValidPriceConfig */])(val)) {
          utils.logError('Invalid custom price value passed to `setPriceGranularity()`');
          return false;
        }
      }

      return true;
    }
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
      return option ? utils.deepAccess(config, option) : config;
    }

    return subscribe.apply(void 0, arguments);
  }
  /*
   * Sets configuration given an object containing key-value pairs and calls
   * listeners that were added by the `subscribe` function
   */


  function setConfig(options) {
    if (_typeof(options) !== 'object') {
      utils.logError('setConfig options must be an object');
      return;
    }

    var topics = Object.keys(options);
    var topicalConfig = {};
    topics.forEach(function (topic) {
      var option = options[topic];

      if (_typeof(defaults[topic]) === 'object' && _typeof(option) === 'object') {
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
    if (_typeof(defaults) !== 'object') {
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

    listeners.push({
      topic: topic,
      callback: callback
    }); // save and call this function to remove the listener

    return function unsubscribe() {
      listeners.splice(listeners.indexOf(listener), 1);
    };
  }
  /*
   * Calls listeners that were added by the `subscribe` function
   */


  function callSubscribers(options) {
    var TOPICS = Object.keys(options); // call subscribers of a specific topic, passing only that configuration

    listeners.filter(function (listener) {
      return __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default()(TOPICS, listener.topic);
    }).forEach(function (listener) {
      listener.callback(_defineProperty({}, listener.topic, options[listener.topic]));
    }); // call subscribers that didn't give a topic, passing everything that was set

    listeners.filter(function (listener) {
      return listener.topic === ALL_TOPICS;
    }).forEach(function (listener) {
      return listener.callback(options);
    });
  }

  resetConfig();
  return {
    getConfig: getConfig,
    setConfig: setConfig,
    setDefaults: setDefaults,
    resetConfig: resetConfig
  };
}
var config = newConfig();

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OUTSTREAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INSTREAM; });
/* unused harmony export videoAdUnit */
/* unused harmony export videoBidder */
/* unused harmony export hasNonVideoBidder */
/* harmony export (immutable) */ __webpack_exports__["d"] = isValidVideoBid;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return checkVideoBidSetup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adapterManager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hook__ = __webpack_require__(13);





var VIDEO_MEDIA_TYPE = 'video';
var OUTSTREAM = 'outstream';
var INSTREAM = 'instream';
/**
 * Helper functions for working with video-enabled adUnits
 */

var videoAdUnit = function videoAdUnit(adUnit) {
  var mediaType = adUnit.mediaType === VIDEO_MEDIA_TYPE;
  var mediaTypes = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["deepAccess"])(adUnit, 'mediaTypes.video');
  return mediaType || mediaTypes;
};
var videoBidder = function videoBidder(bid) {
  return __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default()(__WEBPACK_IMPORTED_MODULE_0__adapterManager__["default"].videoAdapters, bid.bidder);
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
  var bidRequest = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["getBidRequest"])(bid.requestId, bidRequests);
  var videoMediaType = bidRequest && Object(__WEBPACK_IMPORTED_MODULE_1__utils__["deepAccess"])(bidRequest, 'mediaTypes.video');
  var context = videoMediaType && Object(__WEBPACK_IMPORTED_MODULE_1__utils__["deepAccess"])(videoMediaType, 'context'); // if context not defined assume default 'instream' for video bids
  // instream bids require a vast url or vast xml content

  return checkVideoBidSetup(bid, bidRequest, videoMediaType, context);
}
var checkVideoBidSetup = Object(__WEBPACK_IMPORTED_MODULE_4__hook__["b" /* hook */])('sync', function (bid, bidRequest, videoMediaType, context) {
  if (!bidRequest || videoMediaType && context !== OUTSTREAM) {
    // xml-only video bids require a prebid cache url
    if (!__WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('cache.url') && bid.vastXml && !bid.vastUrl) {
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["logError"])("\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling prebid cache with pbjs.setConfig({ cache: {url: \"...\"} });\n      ");
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

/***/ 32:
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ 34:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 35:
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(47);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(369);
module.exports = __webpack_require__(16).Number.isInteger;


/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(15);

$export($export.S, 'Number', { isInteger: __webpack_require__(370) });


/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(18);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(130);
module.exports = __webpack_require__(16).Array.findIndex;


/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AUCTION_STARTED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AUCTION_IN_PROGRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUCTION_COMPLETED; });
/* harmony export (immutable) */ __webpack_exports__["j"] = newAuction;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addBidResponse; });
/* unused harmony export auctionCallbacks */
/* harmony export (immutable) */ __webpack_exports__["f"] = doCallbacksIfTimedout;
/* harmony export (immutable) */ __webpack_exports__["d"] = addBidToAuction;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return callPrebidCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getPriceGranularity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getPriceByGranularity; });
/* harmony export (immutable) */ __webpack_exports__["i"] = getStandardBidderSettings;
/* unused harmony export getKeyValueTargetingPairs */
/* unused harmony export adjustBids */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cpmBucketManager__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__native__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__videoCache__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__userSync__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__hook__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__video__ = __webpack_require__(31);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
 * @typedef {Object} BidRequest
 * //TODO add all properties
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











var syncUsers = __WEBPACK_IMPORTED_MODULE_7__userSync__["a" /* userSync */].syncUsers;

var utils = __webpack_require__(0);

var adapterManager = __webpack_require__(7).default;

var events = __webpack_require__(8);

var CONSTANTS = __webpack_require__(4);

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
  * @param {AdUnitCode} requestConfig.adUnitCode
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

  ;

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

      try {
        if (_callback != null) {
          var _adUnitCodes2 = _adUnitCodes;

          var bids = _bidsReceived.filter(utils.bind.call(__WEBPACK_IMPORTED_MODULE_0__utils__["adUnitsFilter"], this, _adUnitCodes2)).reduce(groupByPlacement, {});

          _callback.apply(pbjs, [bids, timedOut]);

          _callback = null;
        }
      } catch (e) {
        utils.logError('Error executing bidsBackHandler', null, e);
      } finally {
        // Calling timed out bidders
        if (timedOutBidders.length) {
          adapterManager.callTimedOutBidders(adUnits, timedOutBidders, _timeout);
        } // Only automatically sync if the publisher has not chosen to "enableOverride"


        var userSyncConfig = __WEBPACK_IMPORTED_MODULE_6__config__["b" /* config */].getConfig('userSync') || {};

        if (!userSyncConfig.enableOverride) {
          // Delay the auto sync by the config delay
          syncUsers(userSyncConfig.syncDelay);
        }
      }
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
    var _this = this;

    _auctionStatus = AUCTION_STARTED;
    _auctionStart = Date.now();
    var bidRequests = adapterManager.makeBidRequests(_adUnits, _auctionStart, _auctionId, _timeout, _labels);
    utils.logInfo("Bids Requested for Auction with id: ".concat(_auctionId), bidRequests);
    bidRequests.forEach(function (bidRequest) {
      addBidRequests(bidRequest);
    });
    var requests = {};

    if (bidRequests.length < 1) {
      utils.logWarn('No valid bid requests returned for auction');
      auctionDone();
    } else {
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
    }

    function runIfOriginHasCapacity(call) {
      var hasCapacity = true;
      var maxRequests = __WEBPACK_IMPORTED_MODULE_6__config__["b" /* config */].getConfig('maxRequestsPerOrigin') || MAX_REQUESTS_PER_ORIGIN;
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
var addBidResponse = Object(__WEBPACK_IMPORTED_MODULE_8__hook__["b" /* hook */])('async', function (adUnitCode, bid) {
  this.dispatch.call(this.bidderRequest, adUnitCode, bid);
}, 'addBidResponse');
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
  if (bidResponse.timeToRespond > auctionInstance.getTimeout() + __WEBPACK_IMPORTED_MODULE_6__config__["b" /* config */].getConfig('timeoutBuffer')) {
    auctionInstance.executeCallback(true);
  }
} // Add a bid to the auction.

function addBidToAuction(auctionInstance, bidResponse) {
  var bidderRequests = auctionInstance.getBidRequests();
  var bidderRequest = __WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_find___default()(bidderRequests, function (bidderRequest) {
    return bidderRequest.bidderCode === bidResponse.bidderCode;
  });
  setupBidTargeting(bidResponse, bidderRequest);
  events.emit(CONSTANTS.EVENTS.BID_RESPONSE, bidResponse);
  auctionInstance.addBidReceived(bidResponse);
  doCallbacksIfTimedout(auctionInstance, bidResponse);
} // Video bids may fail if the cache is down, or there's trouble on the network.

function tryAddVideoBid(auctionInstance, bidResponse, bidRequests, afterBidAdded) {
  var addBid = true;
  var bidderRequest = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["getBidRequest"])(bidResponse.requestId, [bidRequests]);
  var videoMediaType = bidderRequest && Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(bidderRequest, 'mediaTypes.video');
  var context = videoMediaType && Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(videoMediaType, 'context');

  if (__WEBPACK_IMPORTED_MODULE_6__config__["b" /* config */].getConfig('cache.url') && context !== __WEBPACK_IMPORTED_MODULE_10__video__["b" /* OUTSTREAM */]) {
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

var callPrebidCache = Object(__WEBPACK_IMPORTED_MODULE_8__hook__["b" /* hook */])('async', function (auctionInstance, bidResponse, afterBidAdded, bidderRequest) {
  Object(__WEBPACK_IMPORTED_MODULE_4__videoCache__["b" /* store */])([bidResponse], function (error, cacheIds) {
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
          bidResponse.vastUrl = Object(__WEBPACK_IMPORTED_MODULE_4__videoCache__["a" /* getCacheUrl */])(bidResponse.videoCacheKey);
        }

        addBidToAuction(auctionInstance, bidResponse);
        afterBidAdded();
      }
    }
  });
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
    responseTimestamp: Object(__WEBPACK_IMPORTED_MODULE_0__utils__["timestamp"])(),
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

  var bidReq = bidderRequest.bids && __WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_find___default()(bidderRequest.bids, function (bid) {
    return bid.adUnitCode == adUnitCode;
  });
  var adUnitRenderer = bidReq && bidReq.renderer;

  if (adUnitRenderer && adUnitRenderer.url) {
    bidObject.renderer = __WEBPACK_IMPORTED_MODULE_5__Renderer__["a" /* Renderer */].install({
      url: adUnitRenderer.url
    });
    bidObject.renderer.setRender(adUnitRenderer.render);
  } // Use the config value 'mediaTypeGranularity' if it has been defined for mediaType, else use 'customPriceBucket'


  var mediaTypeGranularity = __WEBPACK_IMPORTED_MODULE_6__config__["b" /* config */].getConfig("mediaTypePriceGranularity.".concat(bid.mediaType));
  var priceStringsObj = Object(__WEBPACK_IMPORTED_MODULE_2__cpmBucketManager__["a" /* getPriceBucketString */])(bidObject.cpm, _typeof(mediaTypeGranularity) === 'object' ? mediaTypeGranularity : __WEBPACK_IMPORTED_MODULE_6__config__["b" /* config */].getConfig('customPriceBucket'), __WEBPACK_IMPORTED_MODULE_6__config__["b" /* config */].getConfig('currency.granularityMultiplier'));
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
    var bidReq = __WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_find___default()(bidderRequest.bids, function (bid) {
      return bid.adUnitCode === bidObject.adUnitCode;
    });
    keyValues = getKeyValueTargetingPairs(bidObject.bidderCode, bidObject, bidReq);
  } // use any targeting provided as defaults, otherwise just set from getKeyValueTargetingPairs


  bidObject.adserverTargeting = _extends(bidObject.adserverTargeting || {}, keyValues);
}
/**
 * This function returns the price granularity defined. It can be either publisher defined or default value
 * @param {string} mediaType
 * @returns {string} granularity
 */


var getPriceGranularity = function getPriceGranularity(mediaType) {
  // Use the config value 'mediaTypeGranularity' if it has been set for mediaType, else use 'priceGranularity'
  var mediaTypeGranularity = __WEBPACK_IMPORTED_MODULE_6__config__["b" /* config */].getConfig("mediaTypePriceGranularity.".concat(mediaType));
  var granularity = typeof mediaType === 'string' && mediaTypeGranularity ? typeof mediaTypeGranularity === 'string' ? mediaTypeGranularity : 'custom' : __WEBPACK_IMPORTED_MODULE_6__config__["b" /* config */].getConfig('priceGranularity');
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
 * @returns {*}
 */

function getStandardBidderSettings(mediaType, bidderCode) {
  // factory for key value objs
  function createKeyVal(key, value) {
    return {
      key: key,
      val: typeof value === 'function' ? function (bidResponse) {
        return value(bidResponse);
      } : function (bidResponse) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["getValue"])(bidResponse, value);
      }
    };
  }

  var TARGETING_KEYS = CONSTANTS.TARGETING_KEYS;
  var granularity = getPriceGranularity(mediaType);
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
      if (typeof __WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_find___default()(adserverTargeting, function (kvPair) {
        return kvPair.key === targetingKeyVal;
      }) === 'undefined') {
        adserverTargeting.push(createKeyVal(targetingKeyVal, 'videoCacheKey'));
      }
    }); // Adding hb_cache_host

    if (__WEBPACK_IMPORTED_MODULE_6__config__["b" /* config */].getConfig('cache.url') && (!bidderCode || utils.deepAccess(bidderSettings, "".concat(bidderCode, ".sendStandardTargeting")) !== false)) {
      var urlInfo = Object(__WEBPACK_IMPORTED_MODULE_1__url__["c" /* parse */])(__WEBPACK_IMPORTED_MODULE_6__config__["b" /* config */].getConfig('cache.url'));

      if (typeof __WEBPACK_IMPORTED_MODULE_9_core_js_library_fn_array_find___default()(adserverTargeting, function (targetingKeyVal) {
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
    var standardSettings = getStandardBidderSettings(custBidObj.mediaType, bidderCode);
    setKeys(keyValues, standardSettings, custBidObj); // 2) set keys from specific bidder setting override if they exist

    if (bidderCode && bidderSettings[bidderCode] && bidderSettings[bidderCode][CONSTANTS.JSON_MAPPING.ADSERVER_TARGETING]) {
      setKeys(keyValues, bidderSettings[bidderCode], custBidObj);
      custBidObj.sendStandardTargeting = bidderSettings[bidderCode].sendStandardTargeting;
    }
  } // set native key value targeting


  if (custBidObj['native']) {
    keyValues = _extends({}, keyValues, Object(__WEBPACK_IMPORTED_MODULE_3__native__["d" /* getNativeTargeting */])(custBidObj, bidReq));
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
  }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils__["flatten"], []).map(function (bid) {
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

/***/ 4:
/***/ (function(module, exports) {

module.exports = {"JSON_MAPPING":{"PL_CODE":"code","PL_SIZE":"sizes","PL_BIDS":"bids","BD_BIDDER":"bidder","BD_ID":"paramsd","BD_PL_ID":"placementId","ADSERVER_TARGETING":"adserverTargeting","BD_SETTING_STANDARD":"standard"},"DEBUG_MODE":"pbjs_debug","STATUS":{"GOOD":1,"NO_BID":2},"CB":{"TYPE":{"ALL_BIDS_BACK":"allRequestedBidsBack","AD_UNIT_BIDS_BACK":"adUnitBidsBack","BID_WON":"bidWon","REQUEST_BIDS":"requestBids"}},"EVENTS":{"AUCTION_INIT":"auctionInit","AUCTION_END":"auctionEnd","BID_ADJUSTMENT":"bidAdjustment","BID_TIMEOUT":"bidTimeout","BID_REQUESTED":"bidRequested","BID_RESPONSE":"bidResponse","NO_BID":"noBid","BID_WON":"bidWon","BIDDER_DONE":"bidderDone","SET_TARGETING":"setTargeting","REQUEST_BIDS":"requestBids","ADD_AD_UNITS":"addAdUnits","AD_RENDER_FAILED":"adRenderFailed"},"AD_RENDER_FAILED_REASON":{"PREVENT_WRITING_ON_MAIN_DOCUMENT":"preventWritingOnMainDocuemnt","NO_AD":"noAd","EXCEPTION":"exception","CANNOT_FIND_AD":"cannotFindAd","MISSING_DOC_OR_ADID":"missingDocOrAdid"},"EVENT_ID_PATHS":{"bidWon":"adUnitCode"},"GRANULARITY_OPTIONS":{"LOW":"low","MEDIUM":"medium","HIGH":"high","AUTO":"auto","DENSE":"dense","CUSTOM":"custom"},"TARGETING_KEYS":{"BIDDER":"hb_bidder","AD_ID":"hb_adid","PRICE_BUCKET":"hb_pb","SIZE":"hb_size","DEAL":"hb_deal","SOURCE":"hb_source","FORMAT":"hb_format","UUID":"hb_uuid","CACHE_ID":"hb_cache_id","CACHE_HOST":"hb_cache_host"},"NATIVE_KEYS":{"title":"hb_native_title","body":"hb_native_body","body2":"hb_native_body2","privacyLink":"hb_native_privacy","privacyIcon":"hb_native_privicon","sponsoredBy":"hb_native_brand","image":"hb_native_image","icon":"hb_native_icon","clickUrl":"hb_native_linkurl","displayUrl":"hb_native_displayurl","cta":"hb_native_cta","rating":"hb_native_rating","address":"hb_native_address","downloads":"hb_native_downloads","likes":"hb_native_likes","phone":"hb_native_phone","price":"hb_native_price","salePrice":"hb_native_saleprice"},"S2S":{"SRC":"s2s","DEFAULT_ENDPOINT":"https://prebid.adnxs.com/pbs/v1/openrtb2/auction","SYNCED_BIDDERS_KEY":"pbjsSyncs"},"BID_STATUS":{"BID_TARGETING_SET":"targetingSet","RENDERED":"rendered"}}

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TARGETING_KEYS */
/* unused harmony export filters */
/* harmony export (immutable) */ __webpack_exports__["a"] = getHighestCpmBidsFromBidPool;
/* unused harmony export sortByDealAndPriceBucket */
/* unused harmony export newTargeting */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return targeting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__native__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auctionManager__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sizeMapping__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }









var utils = __webpack_require__(0);

var CONSTANTS = __webpack_require__(4);

var pbTargetingKeys = [];
var MAX_DFP_KEYLENGTH = 20;
var TTL_BUFFER = 1000;
var TARGETING_KEYS = Object.keys(CONSTANTS.TARGETING_KEYS).map(function (key) {
  return CONSTANTS.TARGETING_KEYS[key];
}); // return unexpired bids

var isBidNotExpired = function isBidNotExpired(bid) {
  return bid.responseTimestamp + bid.ttl * 1000 + TTL_BUFFER > Object(__WEBPACK_IMPORTED_MODULE_0__utils__["timestamp"])();
}; // return bids whose status is not set. Winning bid can have status `targetingSet` or `rendered`.


var isUnusedBid = function isUnusedBid(bid) {
  return bid && (bid.status && !__WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()([CONSTANTS.BID_STATUS.BID_TARGETING_SET, CONSTANTS.BID_STATUS.RENDERED], bid.status) || !bid.status);
};

var filters = {
  isBidNotExpired: isBidNotExpired,
  isUnusedBid: isUnusedBid
}; // If two bids are found for same adUnitCode, we will use the highest one to take part in auction
// This can happen in case of concurrent auctions
// If adUnitBidLimit is set above 0 return top N number of bids

function getHighestCpmBidsFromBidPool(bidsReceived, highestCpmCallback) {
  var adUnitBidLimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var bids = []; // bucket by adUnitcode

  var buckets = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["groupBy"])(bidsReceived, 'adUnitCode'); // filter top bid for each bucket by bidder

  Object.keys(buckets).forEach(function (bucketKey) {
    var bucketBids = [];
    var bidsByBidder = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["groupBy"])(buckets[bucketKey], 'bidderCode');
    Object.keys(bidsByBidder).forEach(function (key) {
      return bucketBids.push(bidsByBidder[key].reduce(highestCpmCallback));
    }); // if adUnitBidLimit is set, pass top N number bids

    if (adUnitBidLimit > 0) {
      bucketBids.sort(function (a, b) {
        return b.cpm - a.cpm;
      });
      bids.push.apply(bids, _toConsumableArray(bucketBids.slice(0, adUnitBidLimit)));
    } else {
      bids.push.apply(bids, bucketBids);
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

function sortByDealAndPriceBucket(a, b) {
  if (a.adUnitTargeting.hb_deal !== undefined && b.adUnitTargeting.hb_deal === undefined) {
    return -1;
  }

  if (a.adUnitTargeting.hb_deal === undefined && b.adUnitTargeting.hb_deal !== undefined) {
    return 1;
  } // assuming both values either have a deal or don't have a deal - sort by the hb_pb param


  return b.adUnitTargeting.hb_pb - a.adUnitTargeting.hb_pb;
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

  targeting.resetPresetTargeting = function (adUnitCode) {
    if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["isGptPubadsDefined"])()) {
      var adUnitCodes = getAdUnitCodes(adUnitCode);
      var adUnits = auctionManager.getAdUnits().filter(function (adUnit) {
        return __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(adUnitCodes, adUnit.code);
      });
      window.googletag.pubads().getSlots().forEach(function (slot) {
        pbTargetingKeys.forEach(function (key) {
          // reset only registered adunits
          adUnits.forEach(function (unit) {
            if (unit.code === slot.getAdUnitPath() || unit.code === slot.getSlotElementId()) {
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
          if (!__WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(pbTargetingKeys, key.toLowerCase())) {
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
    return bid.adserverTargeting && adUnitCodes && (utils.isArray(adUnitCodes) && __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(adUnitCodes, bid.adUnitCode) || typeof adUnitCodes === 'string' && bid.adUnitCode === adUnitCodes);
  }

  ;
  /**
   * Returns targeting for any bids which have deals if alwaysIncludeDeals === true
   */

  function getDealBids(adUnitCodes, bidsReceived) {
    if (__WEBPACK_IMPORTED_MODULE_1__config__["b" /* config */].getConfig('targetingControls.alwaysIncludeDeals') === true) {
      var standardKeys = TARGETING_KEYS.concat(__WEBPACK_IMPORTED_MODULE_2__native__["a" /* NATIVE_TARGETING_KEYS */]); // we only want the top bid from bidders who have multiple entries per ad unit code

      var bids = getHighestCpmBidsFromBidPool(bidsReceived, __WEBPACK_IMPORTED_MODULE_0__utils__["getHighestCpm"]); // populate targeting keys for the remaining bids if they have a dealId

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

    var targeting = getWinningBidTargeting(adUnitCodes, bidsReceived).concat(getCustomBidTargeting(adUnitCodes, bidsReceived)).concat(__WEBPACK_IMPORTED_MODULE_1__config__["b" /* config */].getConfig('enableSendAllBids') ? getBidLandscapeTargeting(adUnitCodes, bidsReceived) : getDealBids(adUnitCodes, bidsReceived)); // store a reference of the targeting keys

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
    var auctionKeysThreshold = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* config */].getConfig('targetingControls.auctionKeyMaxChars');

    if (auctionKeysThreshold) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["logInfo"])("Detected 'targetingControls.auctionKeyMaxChars' was active for this auction; set with a limit of ".concat(auctionKeysThreshold, " characters.  Running checks on auction keys..."));
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
    var targetingCopy = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepClone"])(targeting);
    var targetingMap = Object.keys(targetingCopy).map(function (adUnitCode) {
      return {
        adUnitCode: adUnitCode,
        adUnitTargeting: targetingCopy[adUnitCode]
      };
    }).sort(sortByDealAndPriceBucket); // iterate through the targeting based on above list and transform the keys into the query-equivalent and count characters

    return targetingMap.reduce(function (accMap, currMap, index, arr) {
      var adUnitQueryString = convertKeysToQueryForm(currMap.adUnitTargeting); // for the last adUnit - trim last encoded ampersand from the converted query string

      if (index + 1 === arr.length) {
        adUnitQueryString = adUnitQueryString.slice(0, -3);
      } // if under running threshold add to result


      var code = currMap.adUnitCode;
      var querySize = adUnitQueryString.length;

      if (querySize <= auctionKeysThreshold) {
        auctionKeysThreshold -= querySize;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["logInfo"])("AdUnit '".concat(code, "' auction keys comprised of ").concat(querySize, " characters.  Deducted from running threshold; new limit is ").concat(auctionKeysThreshold), targetingCopy[code]);
        accMap[code] = targetingCopy[code];
      } else {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["logWarn"])("The following keys for adUnitCode '".concat(code, "' exceeded the current limit of the 'auctionKeyMaxChars' setting.\nThe key-set size was ").concat(querySize, ", the current allotted amount was ").concat(auctionKeysThreshold, ".\n"), targetingCopy[code]);
      }

      if (index + 1 === arr.length && Object.keys(accMap).length === 0) {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["logError"])('No auction targeting keys were permitted due to the setting in setConfig(targetingControls.auctionKeyMaxChars).  Please review setup and consider adjusting.');
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
      Object.keys(targetingConfig).filter(customSlotMatching ? customSlotMatching(slot) : Object(__WEBPACK_IMPORTED_MODULE_0__utils__["isAdUnitCodeMatchingSlot"])(slot)).forEach(function (targetId) {
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

    if (!__WEBPACK_IMPORTED_MODULE_1__config__["b" /* config */].getConfig('useBidCache')) {
      bidsReceived = bidsReceived.filter(function (bid) {
        return latestAuctionForAdUnit[bid.adUnitCode] === bid.auctionId;
      });
    }

    bidsReceived = bidsReceived.filter(function (bid) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(bid, 'video.context') !== __WEBPACK_IMPORTED_MODULE_5__mediaTypes__["a" /* ADPOD */];
    }).filter(function (bid) {
      return bid.mediaType !== 'banner' || Object(__WEBPACK_IMPORTED_MODULE_4__sizeMapping__["c" /* sizeSupported */])([bid.width, bid.height]);
    }).filter(filters.isUnusedBid).filter(filters.isBidNotExpired);
    return getHighestCpmBidsFromBidPool(bidsReceived, __WEBPACK_IMPORTED_MODULE_0__utils__["getOldestHighestCpmBid"]);
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
      return __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(adUnitCodes, bid.adUnitCode);
    }).filter(function (bid) {
      return bid.cpm > 0;
    }).map(function (bid) {
      return bid.adUnitCode;
    }).filter(__WEBPACK_IMPORTED_MODULE_0__utils__["uniques"]).map(function (adUnitCode) {
      return bidsReceived.filter(function (bid) {
        return bid.adUnitCode === adUnitCode ? bid : null;
      }).reduce(__WEBPACK_IMPORTED_MODULE_0__utils__["getHighestCpm"]);
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
    }).concat(TARGETING_KEYS).filter(__WEBPACK_IMPORTED_MODULE_0__utils__["uniques"]); // standard keys defined in the library.
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

        currentBidElement.adserverTargeting[key] = currentBidElement.adserverTargeting[key].concat(bid.adserverTargeting[key]).filter(__WEBPACK_IMPORTED_MODULE_0__utils__["uniques"]);
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
    var standardKeys = getStandardKeys().concat(__WEBPACK_IMPORTED_MODULE_2__native__["a" /* NATIVE_TARGETING_KEYS */]);
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
      return __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(adUnitCodes, bid.adUnitCode);
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
    var standardKeys = TARGETING_KEYS.concat(__WEBPACK_IMPORTED_MODULE_2__native__["a" /* NATIVE_TARGETING_KEYS */]);
    var adUnitBidLimit = __WEBPACK_IMPORTED_MODULE_1__config__["b" /* config */].getConfig('sendBidsControl.bidLimit');
    var bids = getHighestCpmBidsFromBidPool(bidsReceived, __WEBPACK_IMPORTED_MODULE_0__utils__["getHighestCpm"], adUnitBidLimit); // populate targeting keys for the remaining bids

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
var targeting = newTargeting(__WEBPACK_IMPORTED_MODULE_3__auctionManager__["a" /* auctionManager */]);

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(25);
var call = __webpack_require__(72);
var isArrayIter = __webpack_require__(73);
var anObject = __webpack_require__(29);
var toLength = __webpack_require__(36);
var getIterFn = __webpack_require__(74);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ 42:
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

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getPriceBucketString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isValidPriceConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find__);


var utils = __webpack_require__(0);

var _defaultPrecision = 2;
var _lgPriceConfig = {
  'buckets': [{
    'min': 0,
    'max': 5,
    'increment': 0.5
  }]
};
var _mgPriceConfig = {
  'buckets': [{
    'min': 0,
    'max': 20,
    'increment': 0.1
  }]
};
var _hgPriceConfig = {
  'buckets': [{
    'min': 0,
    'max': 20,
    'increment': 0.01
  }]
};
var _densePriceConfig = {
  'buckets': [{
    'min': 0,
    'max': 3,
    'increment': 0.01
  }, {
    'min': 3,
    'max': 8,
    'increment': 0.05
  }, {
    'min': 8,
    'max': 20,
    'increment': 0.5
  }]
};
var _autoPriceConfig = {
  'buckets': [{
    'min': 0,
    'max': 5,
    'increment': 0.05
  }, {
    'min': 5,
    'max': 10,
    'increment': 0.1
  }, {
    'min': 10,
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
  var bucket = __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find___default()(config.buckets, function (bucket) {
    if (cpm > cap.max * granularityMultiplier) {
      // cpm exceeds cap, just return the cap.
      var precision = bucket.precision;

      if (typeof precision === 'undefined') {
        precision = _defaultPrecision;
      }

      cpmStr = (bucket.max * granularityMultiplier).toFixed(precision);
    } else if (cpm <= bucket.max * granularityMultiplier && cpm >= bucket.min * granularityMultiplier) {
      return bucket;
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
    if (typeof bucket.min === 'undefined' || !bucket.max || !bucket.increment) {
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

/***/ 44:
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

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(25);
var IObject = __webpack_require__(58);
var toObject = __webpack_require__(46);
var toLength = __webpack_require__(36);
var asc = __webpack_require__(83);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(35);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ 47:
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ 48:
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(58);
var defined = __webpack_require__(35);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ajax; });
/* harmony export (immutable) */ __webpack_exports__["b"] = ajaxBuilder;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(3);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




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


      if (!__WEBPACK_IMPORTED_MODULE_1__config__["b" /* config */].getConfig('disableAjaxTimeout')) {
        x.ontimeout = function () {
          utils.logError('  xhr timeout after ', x.timeout, 'ms');
        };
      }

      if (method === 'GET' && data) {
        var urlInfo = Object(__WEBPACK_IMPORTED_MODULE_0__url__["c" /* parse */])(url, options);

        _extends(urlInfo.search, data);

        url = Object(__WEBPACK_IMPORTED_MODULE_0__url__["a" /* format */])(urlInfo);
      }

      x.open(method, url, true); // IE needs timoeut to be set after open - see #1410
      // Disabled timeout temporarily to avoid xhr failed requests. https://github.com/prebid/Prebid.js/issues/2648

      if (!__WEBPACK_IMPORTED_MODULE_1__config__["b" /* config */].getConfig('disableAjaxTimeout')) {
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

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = detectReferer;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getRefererInfo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
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
          Object(__WEBPACK_IMPORTED_MODULE_0__utils__["logWarn"])('Trying to access cross domain iframe. Continuing without referrer and location');
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

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadExternalScript;
/* harmony export (immutable) */ __webpack_exports__["b"] = loadScript;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


var _requestCache = {};
var _vendorWhitelist = ['criteo'];
/**
 * Loads external javascript. Can only be used if external JS is approved by Prebid. See https://github.com/prebid/prebid-js-external-js-template#policy
 * Each unique URL will be loaded at most 1 time.
 * @param {string} url the url to load
 * @param {string} moduleCode bidderCode or module code of the module requesting this resource
 */

function loadExternalScript(url, moduleCode) {
  if (!moduleCode || !url) {
    __WEBPACK_IMPORTED_MODULE_1__utils__["logError"]('cannot load external script without url and moduleCode');
    return;
  }

  if (!__WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_includes___default()(_vendorWhitelist, moduleCode)) {
    __WEBPACK_IMPORTED_MODULE_1__utils__["logError"]("".concat(moduleCode, " not whitelisted for loading external JavaScript"));
    return;
  } // only load each asset once


  if (_requestCache[url]) {
    return;
  }

  __WEBPACK_IMPORTED_MODULE_1__utils__["logWarn"]("module ".concat(moduleCode, " is loading external JavaScript"));
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = url;
  __WEBPACK_IMPORTED_MODULE_1__utils__["insertElement"](script);
  _requestCache[url] = true;
}
;
/**
 *
 * @deprecated
 * Do not use this function. Will be removed in the next release. If external resources are required, use #loadExternalScript instead.
 */

function loadScript(tagSrc, callback, cacheRequest) {
  // var noop = () => {};
  //
  // callback = callback || noop;
  if (!tagSrc) {
    __WEBPACK_IMPORTED_MODULE_1__utils__["logError"]('Error attempting to request empty URL', 'adloader.js:loadScript');
    return;
  }

  if (cacheRequest) {
    if (_requestCache[tagSrc]) {
      if (callback && typeof callback === 'function') {
        if (_requestCache[tagSrc].loaded) {
          // invokeCallbacks immediately
          callback();
        } else {
          // queue the callback
          _requestCache[tagSrc].callbacks.push(callback);
        }
      }
    } else {
      _requestCache[tagSrc] = {
        loaded: false,
        callbacks: []
      };

      if (callback && typeof callback === 'function') {
        _requestCache[tagSrc].callbacks.push(callback);
      }

      requestResource(tagSrc, function () {
        _requestCache[tagSrc].loaded = true;

        try {
          for (var i = 0; i < _requestCache[tagSrc].callbacks.length; i++) {
            _requestCache[tagSrc].callbacks[i]();
          }
        } catch (e) {
          __WEBPACK_IMPORTED_MODULE_1__utils__["logError"]('Error executing callback', 'adloader.js:loadScript', e);
        }
      });
    }
  } else {
    // trigger one time request
    requestResource(tagSrc, callback);
  }
}
;

function requestResource(tagSrc, callback) {
  var jptScript = document.createElement('script');
  jptScript.type = 'text/javascript';
  jptScript.async = true; // Execute a callback if necessary

  if (callback && typeof callback === 'function') {
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
  }

  jptScript.src = tagSrc; // add the new script tag to the page

  var elToAppend = document.getElementsByTagName('head');
  elToAppend = elToAppend.length ? elToAppend : document.getElementsByTagName('body');

  if (elToAppend.length) {
    elToAppend = elToAppend[0];
    elToAppend.insertBefore(jptScript, elToAppend.firstChild);
  }
}

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(60);
var $export = __webpack_require__(15);
var redefine = __webpack_require__(138);
var hide = __webpack_require__(21);
var Iterators = __webpack_require__(32);
var $iterCreate = __webpack_require__(139);
var setToStringTag = __webpack_require__(54);
var getPrototypeOf = __webpack_require__(144);
var ITERATOR = __webpack_require__(14)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(59)('keys');
var uid = __webpack_require__(48);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(20).f;
var has = __webpack_require__(30);
var TAG = __webpack_require__(14)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = registerVideoSupport;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prebidGlobal__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


var prebid = Object(__WEBPACK_IMPORTED_MODULE_0__prebidGlobal__["a" /* getGlobal */])();
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
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["logWarn"])("Attempting to add an already registered function property ".concat(key, " for AdServer ").concat(name, "."));
      return;
    }

    prebid.adServers[name][key] = videoSupport[key];
  });
}

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(18);
var document = __webpack_require__(19).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(34);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(16);
var global = __webpack_require__(19);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(60) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 60:
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(49);
var toLength = __webpack_require__(36);
var toAbsoluteIndex = __webpack_require__(87);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
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
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export setSizeConfig */
/* harmony export (immutable) */ __webpack_exports__["a"] = getLabels;
/* harmony export (immutable) */ __webpack_exports__["c"] = sizeSupported;
/* harmony export (immutable) */ __webpack_exports__["b"] = resolveStatus;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




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
__WEBPACK_IMPORTED_MODULE_0__config__["b" /* config */].getConfig('sizeConfig', function (config) {
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

  if (!Object(__WEBPACK_IMPORTED_MODULE_1__utils__["isPlainObject"])(mediaTypes)) {
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
    mediaTypes = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["deepClone"])(mediaTypes);
  }

  var oldSizes = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["deepAccess"])(mediaTypes, 'banner.sizes');

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
    }) && Object(__WEBPACK_IMPORTED_MODULE_1__utils__["deepAccess"])(mediaTypes, 'banner.sizes.length') > 0 && (labels.length === 0 || !labelAll && (labels.some(function (label) {
      return maps.labels[label];
    }) || labels.some(function (label) {
      return __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default()(activeLabels, label);
    })) || labelAll && labels.reduce(function (result, label) {
      return !result ? result : maps.labels[label] || __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default()(activeLabels, label);
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
      var ruleMatch = false;

      try {
        ruleMatch = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["getWindowTop"])().matchMedia(config.mediaQuery).matches;
      } catch (e) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["logWarn"])('Unfriendly iFrame blocks sizeConfig from being correctly evaluated');
        ruleMatch = matchMedia(config.mediaQuery).matches;
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
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["logWarn"])('sizeConfig rule missing required property "mediaQuery"');
    }

    return results;
  }, {
    labels: {},
    sizesSupported: {},
    shouldFilter: false
  });
}

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return adunitCounter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

var adUnits = {};
/**
 * Increments and returns current Adunit counter
 * @param {string} adunit id
 * @returns {number} current adunit count
 */

function incrementCounter(adunit) {
  adUnits[adunit] = adUnits[adunit] || {};
  adUnits[adunit].counter = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(adUnits, "".concat(adunit, ".counter")) + 1 || 1;
  return adUnits[adunit].counter;
}
/**
 * Returns current Adunit counter
 * @param {string} adunit id
 * @returns {number} current adunit count
 */


function getCounter(adunit) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["deepAccess"])(adUnits, "".concat(adunit, ".counter")) || 0;
}
/**
 * A module which counts how many times an adunit was called
 * @module adunitCounter
 */


var adunitCounter = {
  incrementCounter: incrementCounter,
  getCounter: getCounter
};


/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = store;
/* harmony export (immutable) */ __webpack_exports__["a"] = getCacheUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
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

  if (__WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('cache.vasttrack')) {
    payload.bidder = bid.bidder;
    payload.bidid = bid.requestId;
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
 * the data has been stored in the cache.
 */


function store(bids, done) {
  var requestData = {
    puts: bids.map(toStorageRequest)
  };
  Object(__WEBPACK_IMPORTED_MODULE_0__ajax__["a" /* ajax */])(__WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('cache.url'), shimStorageCallback(done), JSON.stringify(requestData), {
    contentType: 'text/plain',
    withCredentials: true
  });
}
function getCacheUrl(id) {
  return "".concat(__WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('cache.url'), "?uuid=").concat(id);
}

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkAdUnitSetup", function() { return checkAdUnitSetup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prebidGlobal__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__secureCreatives__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userSync_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__adloader__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auctionManager__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__targeting__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__hook__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__debugging__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__adUnits__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__bidfactory__ = __webpack_require__(23);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @module pbjs */














var pbjs = Object(__WEBPACK_IMPORTED_MODULE_0__prebidGlobal__["a" /* getGlobal */])();

var CONSTANTS = __webpack_require__(4);

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

Object(__WEBPACK_IMPORTED_MODULE_9__debugging__["a" /* sessionLoader */])();
/* Public vars */

pbjs.bidderSettings = pbjs.bidderSettings || {}; // let the world know we are loaded

pbjs.libLoaded = true; // version auto generated from build

pbjs.version = "v2.37.0";
utils.logInfo("Prebid.js v2.37.0 loaded"); // create adUnit array

pbjs.adUnits = pbjs.adUnits || []; // Allow publishers who enable user sync override to trigger their sync

pbjs.triggerUserSyncs = triggerUserSyncs;

function checkDefinedPlacement(id) {
  var adUnitCodes = __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].getBidsRequested().map(function (bidSet) {
    return bidSet.bids.map(function (bid) {
      return bid.adUnitCode;
    });
  }).reduce(__WEBPACK_IMPORTED_MODULE_1__utils__["flatten"]).filter(__WEBPACK_IMPORTED_MODULE_1__utils__["uniques"]);

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

var checkAdUnitSetup = Object(__WEBPACK_IMPORTED_MODULE_8__hook__["b" /* hook */])('sync', function (adUnits) {
  adUnits.forEach(function (adUnit) {
    var mediaTypes = adUnit.mediaTypes;
    var normalizedSize = utils.getAdUnitSizes(adUnit);

    if (mediaTypes && mediaTypes.banner) {
      var banner = mediaTypes.banner;

      if (banner.sizes) {
        // make sure we always send [[h,w]] format
        banner.sizes = normalizedSize;
        adUnit.sizes = normalizedSize;
      } else {
        utils.logError('Detected a mediaTypes.banner object did not include sizes.  This is a required field for the mediaTypes.banner object.  Removing invalid mediaTypes.banner object from request.');
        delete adUnit.mediaTypes.banner;
      }
    } else if (adUnit.sizes) {
      utils.logWarn('Usage of adUnits.sizes will eventually be deprecated.  Please define size dimensions within the corresponding area of the mediaTypes.<object> (eg mediaTypes.banner.sizes).');
      adUnit.sizes = normalizedSize;
    }

    if (mediaTypes && mediaTypes.video) {
      var video = mediaTypes.video;

      if (video.playerSize) {
        if (Array.isArray(video.playerSize) && video.playerSize.length === 1 && video.playerSize.every(function (plySize) {
          return Object(__WEBPACK_IMPORTED_MODULE_1__utils__["isArrayOfNums"])(plySize, 2);
        })) {
          adUnit.sizes = video.playerSize;
        } else if (Object(__WEBPACK_IMPORTED_MODULE_1__utils__["isArrayOfNums"])(video.playerSize, 2)) {
          var newPlayerSize = [];
          newPlayerSize.push(video.playerSize);
          utils.logInfo("Transforming video.playerSize from [".concat(video.playerSize, "] to [[").concat(newPlayerSize, "]] so it's in the proper format."));
          adUnit.sizes = video.playerSize = newPlayerSize;
        } else {
          utils.logError('Detected incorrect configuration of mediaTypes.video.playerSize.  Please specify only one set of dimensions in a format like: [[640, 480]]. Removing invalid mediaTypes.video.playerSize property from request.');
          delete adUnit.mediaTypes.video.playerSize;
        }
      }
    }

    if (mediaTypes && mediaTypes.native) {
      var nativeObj = mediaTypes.native;

      if (nativeObj.image && nativeObj.image.sizes && !Array.isArray(nativeObj.image.sizes)) {
        utils.logError('Please use an array of sizes for native.image.sizes field.  Removing invalid mediaTypes.native.image.sizes property from request.');
        delete adUnit.mediaTypes.native.image.sizes;
      }

      if (nativeObj.image && nativeObj.image.aspect_ratios && !Array.isArray(nativeObj.image.aspect_ratios)) {
        utils.logError('Please use an array of sizes for native.image.aspect_ratios field.  Removing invalid mediaTypes.native.image.aspect_ratios property from request.');
        delete adUnit.mediaTypes.native.image.aspect_ratios;
      }

      if (nativeObj.icon && nativeObj.icon.sizes && !Array.isArray(nativeObj.icon.sizes)) {
        utils.logError('Please use an array of sizes for native.icon.sizes field.  Removing invalid mediaTypes.native.icon.sizes property from request.');
        delete adUnit.mediaTypes.native.icon.sizes;
      }
    }
  });
  return adUnits;
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
  return __WEBPACK_IMPORTED_MODULE_7__targeting__["b" /* targeting */].getAllTargeting(adUnitCode);
};

function getBids(type) {
  var responses = __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */][type]().filter(utils.bind.call(__WEBPACK_IMPORTED_MODULE_1__utils__["adUnitsFilter"], this, __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].getAdUnitCodes())); // find the last auction id to get responses for most recent auction only

  var currentAuctionId = __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].getLastAuctionId();
  return responses.map(function (bid) {
    return bid.adUnitCode;
  }).filter(__WEBPACK_IMPORTED_MODULE_1__utils__["uniques"]).map(function (adUnitCode) {
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
  var bids = __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].getBidsReceived().filter(function (bid) {
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

  if (!Object(__WEBPACK_IMPORTED_MODULE_1__utils__["isGptPubadsDefined"])()) {
    utils.logError('window.googletag is not defined on the page');
    return;
  } // get our ad unit codes


  var targetingSet = __WEBPACK_IMPORTED_MODULE_7__targeting__["b" /* targeting */].getAllTargeting(adUnit); // first reset any old targeting

  __WEBPACK_IMPORTED_MODULE_7__targeting__["b" /* targeting */].resetPresetTargeting(adUnit); // now set new targeting keys

  __WEBPACK_IMPORTED_MODULE_7__targeting__["b" /* targeting */].setTargetingForGPT(targetingSet, customSlotMatching);
  Object.keys(targetingSet).forEach(function (adUnitCode) {
    Object.keys(targetingSet[adUnitCode]).forEach(function (targetingKey) {
      if (targetingKey === 'hb_adid') {
        __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].setStatusForBids(targetingSet[adUnitCode][targetingKey], CONSTANTS.BID_STATUS.BID_TARGETING_SET);
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

  if (!__WEBPACK_IMPORTED_MODULE_7__targeting__["b" /* targeting */].isApntagDefined()) {
    utils.logError('window.apntag is not defined on the page');
    return;
  }

  __WEBPACK_IMPORTED_MODULE_7__targeting__["b" /* targeting */].setTargetingForAst(adUnitCodes); // emit event

  events.emit(SET_TARGETING, __WEBPACK_IMPORTED_MODULE_7__targeting__["b" /* targeting */].getAllTargeting());
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
      var bid = __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].findBidByAdId(id);

      if (bid) {
        bid.status = CONSTANTS.BID_STATUS.RENDERED; // replace macros according to openRTB with price paid = bid.cpm

        bid.ad = utils.replaceAuctionPrice(bid.ad, bid.cpm);
        bid.adUrl = utils.replaceAuctionPrice(bid.adUrl, bid.cpm); // save winning bids

        __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].addWinningBid(bid); // emit 'bid won' event here

        events.emit(BID_WON, bid);
        var height = bid.height,
            width = bid.width,
            ad = bid.ad,
            mediaType = bid.mediaType,
            adUrl = bid.adUrl,
            renderer = bid.renderer;
        var creativeComment = document.createComment("Creative ".concat(bid.creativeId, " served by ").concat(bid.bidder, " Prebid.js Header Bidding"));
        utils.insertElement(creativeComment, doc, 'body');

        if (Object(__WEBPACK_IMPORTED_MODULE_12__Renderer__["c" /* isRendererRequired */])(renderer)) {
          Object(__WEBPACK_IMPORTED_MODULE_12__Renderer__["b" /* executeRenderer */])(renderer, bid);
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


pbjs.requestBids = Object(__WEBPACK_IMPORTED_MODULE_8__hook__["b" /* hook */])('async', function () {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      bidsBackHandler = _ref3.bidsBackHandler,
      timeout = _ref3.timeout,
      adUnits = _ref3.adUnits,
      adUnitCodes = _ref3.adUnitCodes,
      labels = _ref3.labels,
      auctionId = _ref3.auctionId;

  events.emit(REQUEST_BIDS);
  var cbTimeout = timeout || __WEBPACK_IMPORTED_MODULE_5__config__["b" /* config */].getConfig('bidderTimeout');
  adUnits = adUnits || pbjs.adUnits;
  utils.logInfo("Invoking pbjs.requestBids", arguments);

  if (adUnitCodes && adUnitCodes.length) {
    // if specific adUnitCodes supplied filter adUnits for those codes
    adUnits = adUnits.filter(function (unit) {
      return __WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes___default()(adUnitCodes, unit.code);
    });
  } else {
    // otherwise derive adUnitCodes from adUnits
    adUnitCodes = adUnits && adUnits.map(function (unit) {
      return unit.code;
    });
  }

  adUnits = checkAdUnitSetup(adUnits);
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
    var s2sConfig = __WEBPACK_IMPORTED_MODULE_5__config__["b" /* config */].getConfig('s2sConfig');
    var s2sBidders = s2sConfig && s2sConfig.bidders;
    var bidders = s2sBidders ? allBidders.filter(function (bidder) {
      return !__WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes___default()(s2sBidders, bidder);
    }) : allBidders;
    adUnit.transactionId = utils.generateUUID();
    bidders.forEach(function (bidder) {
      var adapter = bidderRegistry[bidder];
      var spec = adapter && adapter.getSpec && adapter.getSpec(); // banner is default if not specified in spec

      var bidderMediaTypes = spec && spec.supportedMediaTypes || ['banner']; // check if the bidder's mediaTypes are not in the adUnit's mediaTypes

      var bidderEligible = adUnitMediaTypes.some(function (type) {
        return __WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes___default()(bidderMediaTypes, type);
      });

      if (!bidderEligible) {
        // drop the bidder from the ad unit if it's not compatible
        utils.logWarn(utils.unsupportedBidderMessage(adUnit, bidder));
        adUnit.bids = adUnit.bids.filter(function (bid) {
          return bid.bidder !== bidder;
        });
      }
    });
    __WEBPACK_IMPORTED_MODULE_11__adUnits__["a" /* adunitCounter */].incrementCounter(adUnit.code);
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

  var auction = __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].createAuction({
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
    return __WEBPACK_IMPORTED_MODULE_7__targeting__["b" /* targeting */].setLatestAuctionForAdUnit(code, auction.getAuctionId());
  });
  auction.callBids();
  return auction;
});
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
  return Object(__WEBPACK_IMPORTED_MODULE_13__bidfactory__["a" /* createBid */])(statusCode);
};
/**
 * @deprecated this function will be removed in the next release. Prebid has deprected external JS loading.
 * @param  {string} tagSrc [description]
 * @param  {Function} callback [description]
 * @alias module:pbjs.loadScript
 */


pbjs.loadScript = function (tagSrc, callback, useCache) {
  utils.logInfo("Invoking pbjs.loadScript", arguments);
  Object(__WEBPACK_IMPORTED_MODULE_4__adloader__["b" /* loadScript */])(tagSrc, callback, useCache);
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


pbjs.aliasBidder = function (bidderCode, alias) {
  utils.logInfo("Invoking pbjs.aliasBidder", arguments);

  if (bidderCode && alias) {
    adapterManager.aliasBidAdapter(bidderCode, alias);
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
  return __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].getAllWinningBids();
};
/**
 * Get all of the bids that have won their respective auctions.
 * @return {Array<AdapterBidResponse>} A list of bids that have won their respective auctions.
 */


pbjs.getAllPrebidWinningBids = function () {
  return __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].getBidsReceived().filter(function (bid) {
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
  var bidsReceived = Object(__WEBPACK_IMPORTED_MODULE_7__targeting__["a" /* getHighestCpmBidsFromBidPool */])(__WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].getBidsReceived(), __WEBPACK_IMPORTED_MODULE_1__utils__["getLatestHighestCpmBid"]);
  return __WEBPACK_IMPORTED_MODULE_7__targeting__["b" /* targeting */].getWinningBids(adUnitCode, bidsReceived);
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
    bids = __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].getBidsReceived().filter(function (bid) {
      return bid.adId === markBidRequest.adId && bid.adUnitCode === markBidRequest.adUnitCode;
    });
  } else if (markBidRequest.adUnitCode) {
    bids = __WEBPACK_IMPORTED_MODULE_7__targeting__["b" /* targeting */].getWinningBids(markBidRequest.adUnitCode);
  } else if (markBidRequest.adId) {
    bids = __WEBPACK_IMPORTED_MODULE_6__auctionManager__["a" /* auctionManager */].getBidsReceived().filter(function (bid) {
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


pbjs.getConfig = __WEBPACK_IMPORTED_MODULE_5__config__["b" /* config */].getConfig;
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

pbjs.setConfig = __WEBPACK_IMPORTED_MODULE_5__config__["b" /* config */].setConfig;
pbjs.que.push(function () {
  return Object(__WEBPACK_IMPORTED_MODULE_2__secureCreatives__["a" /* listenMessagesFromCreative */])();
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
  __WEBPACK_IMPORTED_MODULE_8__hook__["b" /* hook */].ready();
  processQueue(pbjs.que);
  processQueue(pbjs.cmd);
};

/* harmony default export */ __webpack_exports__["default"] = (pbjs);

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(137)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(52)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(29);
var dPs = __webpack_require__(140);
var enumBugKeys = __webpack_require__(68);
var IE_PROTO = __webpack_require__(53)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(57)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(143).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ 68:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(65);


/***/ }),

/***/ 69:
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gdprDataHandler", function() { return gdprDataHandler; });
/* harmony export (immutable) */ __webpack_exports__["setS2STestingModule"] = setS2STestingModule;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sizeMapping__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__native__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_library_fn_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__adUnits__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__refererDetection__ = __webpack_require__(50);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/** @module adaptermanger */











var utils = __webpack_require__(0);

var CONSTANTS = __webpack_require__(4);

var events = __webpack_require__(8);

var s2sTestingModule; // store s2sTesting module if it's loaded

var adapterManager = {};

var _bidderRegistry = adapterManager.bidderRegistry = {};

var _aliasRegistry = adapterManager.aliasRegistry = {};

var _s2sConfig = {};
__WEBPACK_IMPORTED_MODULE_5__config__["b" /* config */].getConfig('s2sConfig', function (config) {
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
    var _resolveStatus = Object(__WEBPACK_IMPORTED_MODULE_1__sizeMapping__["b" /* resolveStatus */])(Object(__WEBPACK_IMPORTED_MODULE_1__sizeMapping__["a" /* getLabels */])(adUnit, labels), adUnit.mediaTypes, adUnit.sizes),
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
            nativeParams: Object(__WEBPACK_IMPORTED_MODULE_2__native__["g" /* processNativeAdUnitParams */])(nativeParams)
          });
        }

        bid = _extends({}, bid, Object(__WEBPACK_IMPORTED_MODULE_0__utils__["getDefinedParams"])(adUnit, ['mediaType', 'renderer']));

        var _resolveStatus2 = Object(__WEBPACK_IMPORTED_MODULE_1__sizeMapping__["b" /* resolveStatus */])(Object(__WEBPACK_IMPORTED_MODULE_1__sizeMapping__["a" /* getLabels */])(bid, labels), filteredMediaTypes),
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
            bidRequestsCount: __WEBPACK_IMPORTED_MODULE_8__adUnits__["a" /* adunitCounter */].getCounter(adUnit.code)
          }));
        }

        return bids;
      }, []));
    }

    return result;
  }, []).reduce(__WEBPACK_IMPORTED_MODULE_0__utils__["flatten"], []).filter(function (val) {
    return val !== '';
  });
}

function getAdUnitCopyForPrebidServer(adUnits) {
  var adaptersServerSide = _s2sConfig.bidders;
  var adUnitsCopy = utils.deepClone(adUnits);
  adUnitsCopy.forEach(function (adUnit) {
    // filter out client side bids
    adUnit.bids = adUnit.bids.filter(function (bid) {
      return __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(adaptersServerSide, bid.bidder) && (!doingS2STesting() || bid.finalSource !== s2sTestingModule.CLIENT);
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

adapterManager.makeBidRequests = function (adUnits, auctionStart, auctionId, cbTimeout, labels) {
  var bidRequests = [];
  var bidderCodes = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["getBidderCodes"])(adUnits);

  if (__WEBPACK_IMPORTED_MODULE_5__config__["b" /* config */].getConfig('bidderSequence') === __WEBPACK_IMPORTED_MODULE_5__config__["a" /* RANDOM */]) {
    bidderCodes = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["shuffle"])(bidderCodes);
  }

  var refererInfo = Object(__WEBPACK_IMPORTED_MODULE_9__refererDetection__["b" /* getRefererInfo */])();
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
      return !__WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(adaptersServerSide, elm) || __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(clientTestAdapters, elm);
    });

    var adUnitsContainServerRequests = function adUnitsContainServerRequests(adUnits) {
      return Boolean(__WEBPACK_IMPORTED_MODULE_7_core_js_library_fn_array_find___default()(adUnits, function (adUnit) {
        return __WEBPACK_IMPORTED_MODULE_7_core_js_library_fn_array_find___default()(adUnit.bids, function (bid) {
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
        bids: getBids({
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
        return __WEBPACK_IMPORTED_MODULE_7_core_js_library_fn_array_find___default()(bidRequests, function (request) {
          return __WEBPACK_IMPORTED_MODULE_7_core_js_library_fn_array_find___default()(request.bids, function (reqBid) {
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
      bids: getBids({
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

  return bidRequests;
};

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
    var s2sAjax = Object(__WEBPACK_IMPORTED_MODULE_4__ajax__["b" /* ajaxBuilder */])(requestBidsTimeout, requestCallbacks ? {
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
          bidRequest.start = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["timestamp"])();
          return doneCb.bind(bidRequest);
        }); // only log adapters that actually have adUnit bids

        var allBidders = s2sBidRequest.ad_units.reduce(function (adapters, adUnit) {
          return adapters.concat((adUnit.bids || []).reduce(function (adapters, bid) {
            return adapters.concat(bid.bidder);
          }, []));
        }, []);
        utils.logMessage("CALLING S2S HEADER BIDDERS ==== ".concat(adaptersServerSide.filter(function (adapter) {
          return __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(allBidders, adapter);
        }).join(','))); // fire BID_REQUESTED event for each s2s bidRequest

        serverBidRequests.forEach(function (bidRequest) {
          events.emit(CONSTANTS.EVENTS.BID_REQUESTED, bidRequest);
        }); // make bid requests

        s2sAdapter.callBids(s2sBidRequest, serverBidRequests, function (adUnitCode, bid) {
          var bidderRequest = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["getBidderRequest"])(serverBidRequests, bid.bidderCode, adUnitCode);

          if (bidderRequest) {
            addBidResponse.call(bidderRequest, adUnitCode, bid);
          }
        }, function () {
          return doneCbs.forEach(function (done) {
            return done();
          });
        }, s2sAjax);
      }
    }
  } // handle client adapter requests


  clientBidRequests.forEach(function (bidRequest) {
    bidRequest.start = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["timestamp"])(); // TODO : Do we check for bid in pool from here and skip calling adapter again ?

    var adapter = _bidderRegistry[bidRequest.bidderCode];
    utils.logMessage("CALLING BIDDER ======= ".concat(bidRequest.bidderCode));
    events.emit(CONSTANTS.EVENTS.BID_REQUESTED, bidRequest);
    var ajax = Object(__WEBPACK_IMPORTED_MODULE_4__ajax__["b" /* ajaxBuilder */])(requestBidsTimeout, requestCallbacks ? {
      request: requestCallbacks.request.bind(null, bidRequest.bidderCode),
      done: requestCallbacks.done
    } : undefined);
    adapter.callBids(bidRequest, addBidResponse.bind(bidRequest), doneCb.bind(bidRequest), ajax, onTimelyResponse);
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
  if (__WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(adapterManager.videoAdapters, bidderCode)) result.push('video');
  if (__WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(__WEBPACK_IMPORTED_MODULE_2__native__["e" /* nativeAdapters */], bidderCode)) result.push('native');
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

      if (__WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(supportedMediaTypes, 'video')) {
        adapterManager.videoAdapters.push(bidderCode);
      }

      if (__WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(supportedMediaTypes, 'native')) {
        __WEBPACK_IMPORTED_MODULE_2__native__["e" /* nativeAdapters */].push(bidderCode);
      }
    } else {
      utils.logError('Bidder adaptor error for bidder code: ' + bidderCode + 'bidder must implement a callBids() function');
    }
  } else {
    utils.logError('bidAdaptor or bidderCode not specified');
  }
};

adapterManager.aliasBidAdapter = function (bidderCode, alias) {
  var existingAlias = _bidderRegistry[alias];

  if (typeof existingAlias === 'undefined') {
    var bidAdaptor = _bidderRegistry[bidderCode];

    if (typeof bidAdaptor === 'undefined') {
      // check if alias is part of s2sConfig and allow them to register if so (as base bidder may be s2s-only)
      var s2sConfig = __WEBPACK_IMPORTED_MODULE_5__config__["b" /* config */].getConfig('s2sConfig');
      var s2sBidders = s2sConfig && s2sConfig.bidders;

      if (!(s2sBidders && __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_includes___default()(s2sBidders, alias))) {
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
          newAdapter = Object(__WEBPACK_IMPORTED_MODULE_3__adapters_bidderFactory__["newBidder"])(_extends({}, spec, {
            code: alias
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
      spec[method](param);
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
  tryCallBidderMethod(bidder, 'onBidWon', bid);
};

adapterManager.callSetTargetingBidder = function (bidder, bid) {
  tryCallBidderMethod(bidder, 'onSetTargeting', bid);
};

/* harmony default export */ __webpack_exports__["default"] = (adapterManager);

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(21);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ 71:
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(29);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(32);
var ITERATOR = __webpack_require__(14)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(75);
var ITERATOR = __webpack_require__(14)('iterator');
var Iterators = __webpack_require__(32);
module.exports = __webpack_require__(16).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(34);
var TAG = __webpack_require__(14)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(48)('meta');
var isObject = __webpack_require__(18);
var has = __webpack_require__(30);
var setDesc = __webpack_require__(20).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(33)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(18);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * events.js
 */
var utils = __webpack_require__(0);

var CONSTANTS = __webpack_require__(4);

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
          que.splice(utils.indexOf.call(que, _handler), 1);
        }
      });
    } else {
      utils._each(event.que, function (_handler) {
        var que = event.que;

        if (_handler === handler) {
          que.splice(utils.indexOf.call(que, _handler), 1);
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

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(15);
var $find = __webpack_require__(45)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(37)(KEY);


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(22) && !__webpack_require__(33)(function () {
  return Object.defineProperty(__webpack_require__(57)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(18);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(84);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(18);
var isArray = __webpack_require__(85);
var SPECIES = __webpack_require__(14)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(34);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(15);
var $includes = __webpack_require__(61)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(37)('includes');


/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(47);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ 88:
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

/***/ 89:
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

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = parseQS;
/* harmony export (immutable) */ __webpack_exports__["b"] = formatQS;
/* harmony export (immutable) */ __webpack_exports__["c"] = parse;
/* harmony export (immutable) */ __webpack_exports__["a"] = format;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
function parse(url, options) {
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
    search: qsAsString ? parsed.search : parseQS(parsed.search || ''),
    hash: (parsed.hash || '').replace(/^#/, ''),
    host: parsed.host || window.location.host
  };
}
function format(obj) {
  return (obj.protocol || 'http') + '://' + (obj.host || obj.hostname + (obj.port ? ":".concat(obj.port) : '')) + (obj.pathname || '') + (obj.search ? "?".concat(formatQS(obj.search || '')) : '') + (obj.hash ? "#".concat(obj.hash) : '');
}

/***/ }),

/***/ 90:
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

/***/ 91:
/***/ (function(module, exports) {

/*
* @license MIT
* Fun Hooks v0.9.6
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
        return assign(hooks, {
          remove: function() {
            hooks.forEach(function(entry) {
              entry.remove();
            });
            return this;
          }
        });
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


/***/ })

/******/ });