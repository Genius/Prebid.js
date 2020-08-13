pbjsChunk([189],{

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(483);


/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorMessages", function() { return errorMessages; });
/* harmony export (immutable) */ __webpack_exports__["processBids"] = processBids;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adServerManager_js__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_targeting_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_cpmBucketManager_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_auction_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_auctionManager_js__ = __webpack_require__(26);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









var SERVER_PROTOCOL = 'https';
var SERVER_HOST = 'p.konduit.me';
var KONDUIT_PREBID_MODULE_VERSION = '1.0.0';
var MODULE_NAME = 'Konduit';
var KONDUIT_ID_CONFIG = 'konduit.konduitId';
var SEND_ALL_BIDS_CONFIG = 'enableSendAllBids';
var errorMessages = {
  NO_KONDUIT_ID: 'A konduitId param is required to be in configs',
  NO_BIDS: 'No bids received in the auction',
  NO_BID: 'A bid was not found',
  CACHE_FAILURE: 'A bid was not cached'
}; // This function is copy from prebid core

function formatQS(query) {
  return Object.keys(query).map(function (k) {
    return Array.isArray(query[k]) ? query[k].map(function (v) {
      return "".concat(k, "[]=").concat(v);
    }).join('&') : "".concat(k, "=").concat(query[k]);
  }).join('&');
} // This function is copy from prebid core


function buildUrl(obj) {
  return (obj.protocol || 'http') + '://' + (obj.host || obj.hostname + (obj.port ? ":".concat(obj.port) : '')) + (obj.pathname || '') + (obj.search ? "?".concat(formatQS(obj.search || '')) : '') + (obj.hash ? "#".concat(obj.hash) : '');
}

function addLogLabel(args) {
  args = [].slice.call(args);
  args.unshift("".concat(MODULE_NAME, ": "));
  return args;
}

function logInfo() {
  __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"].apply(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__, _toConsumableArray(addLogLabel(arguments)));
}

function logError() {
  __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"].apply(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__, _toConsumableArray(addLogLabel(arguments)));
}

function sendRequest(_ref) {
  var _ref$host = _ref.host,
      host = _ref$host === void 0 ? SERVER_HOST : _ref$host,
      _ref$protocol = _ref.protocol,
      protocol = _ref$protocol === void 0 ? SERVER_PROTOCOL : _ref$protocol,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      path = _ref.path,
      payload = _ref.payload,
      callbacks = _ref.callbacks,
      timeout = _ref.timeout;
  var formattedUrlOptions = {
    protocol: protocol,
    hostname: host,
    pathname: path
  };

  if (method === 'GET') {
    formattedUrlOptions.search = payload;
  }

  var konduitAnalyticsRequestUrl = buildUrl(formattedUrlOptions);
  var ajax = Object(__WEBPACK_IMPORTED_MODULE_4__src_ajax_js__["b" /* ajaxBuilder */])(timeout);
  ajax(konduitAnalyticsRequestUrl, callbacks, method === 'POST' ? JSON.stringify(payload) : null, {
    contentType: 'application/json',
    method: method,
    withCredentials: true
  });
}

function composeBidsProcessorRequestPayload(bid) {
  return {
    auctionId: bid.auctionId,
    vastUrl: bid.vastUrl,
    bidderCode: bid.bidderCode,
    creativeId: bid.creativeId,
    adUnitCode: bid.adUnitCode,
    cpm: bid.cpm,
    currency: bid.currency
  };
}

function setDefaultKCpmToBid(bid, winnerBid, priceGranularity) {
  bid.kCpm = bid.cpm;

  if (!bid.adserverTargeting) {
    bid.adserverTargeting = {};
  }

  var kCpm = Object(__WEBPACK_IMPORTED_MODULE_6__src_auction_js__["h" /* getPriceByGranularity */])(priceGranularity)(bid);

  if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig(SEND_ALL_BIDS_CONFIG)) {
    bid.adserverTargeting["k_cpm_".concat(bid.bidderCode)] = kCpm;
  }

  if (winnerBid.bidderCode === bid.bidderCode && winnerBid.creativeId === bid.creativeId) {
    bid.adserverTargeting.k_cpm = kCpm;
  }
}

function addKCpmToBid(kCpm, bid, winnerBid, priceGranularity) {
  if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isNumber"](kCpm)) {
    bid.kCpm = kCpm;
    var priceStringsObj = Object(__WEBPACK_IMPORTED_MODULE_5__src_cpmBucketManager_js__["a" /* getPriceBucketString */])(kCpm, __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('customPriceBucket'), __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('currency.granularityMultiplier'));
    var calculatedKCpm = priceStringsObj.custom || priceStringsObj[priceGranularity] || priceStringsObj.med;

    if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig(SEND_ALL_BIDS_CONFIG)) {
      bid.adserverTargeting["k_cpm_".concat(bid.bidderCode)] = calculatedKCpm;
    }

    if (winnerBid.bidderCode === bid.bidderCode && winnerBid.creativeId === bid.creativeId) {
      bid.adserverTargeting.k_cpm = calculatedKCpm;
    }
  }
}

function addKonduitCacheKeyToBid(cacheKey, bid, winnerBid) {
  if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"](cacheKey)) {
    bid.konduitCacheKey = cacheKey;

    if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig(SEND_ALL_BIDS_CONFIG)) {
      bid.adserverTargeting["k_cache_key_".concat(bid.bidderCode)] = cacheKey;
    }

    if (winnerBid.bidderCode === bid.bidderCode && winnerBid.creativeId === bid.creativeId) {
      bid.adserverTargeting.k_cache_key = cacheKey;
      bid.adserverTargeting.konduit_cache_key = cacheKey;
    }
  }
}
/**
 * This function accepts an object with bid and tries to cache it while generating k_cache_key for it.
 * In addition, it returns a list with updated bid objects where k_cpm key is added
 * @param {Object} options
 * @param {Object} [options.bid] - a winner bid provided by a client
 * @param {Object} [options.bids] - bids array provided by a client for "Send All Bids" scenario
 * @param {string} [options.adUnitCode] - ad unit code that is used to get winning bids
 * @param {string} [options.timeout] - timeout for Konduit bids processor HTTP request
 * @param {function} [options.callback] - callback function to be executed on HTTP request end; the function is invoked with two parameters - error and bids
 */


function processBids() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var konduitId = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig(KONDUIT_ID_CONFIG);
  options = options || {};

  if (!konduitId) {
    logError(errorMessages.NO_KONDUIT_ID);

    if (options.callback) {
      options.callback(new Error(errorMessages.NO_KONDUIT_ID), []);
    }

    return null;
  }

  var publisherBids = options.bids || __WEBPACK_IMPORTED_MODULE_7__src_auctionManager_js__["a" /* auctionManager */].getBidsReceived();
  var winnerBid = options.bid || __WEBPACK_IMPORTED_MODULE_1__src_targeting_js__["a" /* targeting */].getWinningBids(options.adUnitCode, publisherBids)[0];
  var bids = [];

  if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig(SEND_ALL_BIDS_CONFIG)) {
    bids.push.apply(bids, _toConsumableArray(publisherBids));
  } else if (winnerBid) {
    bids.push(winnerBid);
  }

  if (!bids.length) {
    logError(errorMessages.NO_BIDS);

    if (options.callback) {
      options.callback(new Error(errorMessages.NO_BIDS), []);
    }

    return null;
  }

  var priceGranularity = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('priceGranularity');
  var bidsToProcess = [];
  bids.forEach(function (bid) {
    setDefaultKCpmToBid(bid, winnerBid, priceGranularity);
    bidsToProcess.push(composeBidsProcessorRequestPayload(bid));
  });
  sendRequest({
    method: 'POST',
    path: '/api/bidsProcessor',
    timeout: options.timeout || 1000,
    payload: {
      clientId: konduitId,
      konduitPrebidModuleVersion: KONDUIT_PREBID_MODULE_VERSION,
      enableSendAllBids: __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig(SEND_ALL_BIDS_CONFIG),
      bids: bidsToProcess,
      bidResponsesCount: __WEBPACK_IMPORTED_MODULE_7__src_auctionManager_js__["a" /* auctionManager */].getBidsReceived().length
    },
    callbacks: {
      success: function success(data) {
        var error = null;
        logInfo('Bids processed successfully ', data);

        try {
          var _JSON$parse = JSON.parse(data),
              kCpmData = _JSON$parse.kCpmData,
              cacheData = _JSON$parse.cacheData;

          if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isEmpty"](cacheData)) {
            throw new Error(errorMessages.CACHE_FAILURE);
          }

          winnerBid.adserverTargeting.konduit_id = konduitId;
          winnerBid.adserverTargeting.k_id = konduitId;
          bids.forEach(function (bid) {
            var processedBidKey = "".concat(bid.bidderCode, ":").concat(bid.creativeId);
            addKCpmToBid(kCpmData[processedBidKey], bid, winnerBid, priceGranularity);
            addKonduitCacheKeyToBid(cacheData[processedBidKey], bid, winnerBid);
          });
        } catch (err) {
          error = err;
          logError('Error parsing JSON response for bidsProcessor data: ', err);
        }

        if (options.callback) {
          options.callback(error, bids);
        }
      },
      error: function error(_error) {
        logError('Bids were not processed successfully ', _error);

        if (options.callback) {
          options.callback(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"](_error) ? new Error(_error) : _error, bids);
        }
      }
    }
  });
}
Object(__WEBPACK_IMPORTED_MODULE_0__src_adServerManager_js__["a" /* registerVideoSupport */])('konduit', {
  processBids: processBids
});

/***/ })

},[482]);