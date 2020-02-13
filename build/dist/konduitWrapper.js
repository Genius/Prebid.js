pbjsChunk([163],{

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(382);


/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["logInfo"] = logInfo;
/* harmony export (immutable) */ __webpack_exports__["logError"] = logError;
/* harmony export (immutable) */ __webpack_exports__["buildVastUrl"] = buildVastUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adServerManager__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_targeting__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_config__ = __webpack_require__(3);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }






var MODULE_NAME = 'Konduit';

function addLogLabel(args) {
  args = [].slice.call(args);
  args.unshift("".concat(MODULE_NAME, ": "));
  return args;
}

function logInfo() {
  __WEBPACK_IMPORTED_MODULE_3__src_utils__["logInfo"].apply(__WEBPACK_IMPORTED_MODULE_3__src_utils__, _toConsumableArray(addLogLabel(arguments)));
}
function logError() {
  __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"].apply(__WEBPACK_IMPORTED_MODULE_3__src_utils__, _toConsumableArray(addLogLabel(arguments)));
}
function buildVastUrl(options) {
  if (!options.params || !options.params.konduit_id) {
    logError("'konduit_id' parameter is required for pbjs.adServers.konduit.buildVastUrl function");
    return null;
  }

  var bid = options.bid || __WEBPACK_IMPORTED_MODULE_1__src_targeting__["b" /* targeting */].getWinningBids()[0];

  if (!bid) {
    logError('Bid is not provided or not found');
    return null;
  }

  logInfo('The following bid will be wrapped: ', bid);
  var queryParams = {};
  var vastUrl = obtainVastUrl(bid);

  if (vastUrl) {
    queryParams.konduit_id = options.params.konduit_id;
    queryParams.konduit_header_bidding = 1;
    queryParams.konduit_url = vastUrl;
  } else {
    logError('No VAST url found in the bid');
  }

  var resultingUrl = null;

  if (queryParams.konduit_url) {
    resultingUrl = Object(__WEBPACK_IMPORTED_MODULE_2__src_url__["a" /* format */])({
      protocol: 'https',
      host: 'p.konduit.me',
      pathname: '/api/vastProxy',
      search: queryParams
    });
    logInfo("Konduit wrapped VAST url: ".concat(resultingUrl));
  }

  return resultingUrl;
}

function obtainVastUrl(bid) {
  var vastUrl = bid && bid.vastUrl;

  if (vastUrl) {
    logInfo("VAST url found in the bid - ".concat(vastUrl));
    return encodeURIComponent(vastUrl);
  }

  var cacheUrl = __WEBPACK_IMPORTED_MODULE_4__src_config__["b" /* config */].getConfig('cache.url');

  if (cacheUrl) {
    var composedCacheUrl = "".concat(cacheUrl, "?uuid=").concat(bid.videoCacheKey);
    logInfo("VAST url is taken from cache.url: ".concat(composedCacheUrl));
    return encodeURIComponent(composedCacheUrl);
  }
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adServerManager__["a" /* registerVideoSupport */])('konduit', {
  buildVastUrl: buildVastUrl
});

/***/ })

},[381]);