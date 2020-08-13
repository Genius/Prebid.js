pbjsChunk([92],{

/***/ 728:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(729);


/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["log"] = log;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (immutable) */ __webpack_exports__["setState"] = setState;
/* harmony export (immutable) */ __webpack_exports__["sendEvent"] = sendEvent;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var BIDDER_CODE = 'sublime';
var BIDDER_GVLID = 114;
var DEFAULT_BID_HOST = 'pbjs.sskzlabs.com';
var DEFAULT_CURRENCY = 'EUR';
var DEFAULT_PROTOCOL = 'https';
var DEFAULT_TTL = 600;
var SUBLIME_ANTENNA = 'antenna.ayads.co';
var SUBLIME_VERSION = '0.5.2';
/**
 * Debug log message
 * @param {String} msg
 * @param {Object=} obj
 */

function log(msg, obj) {
  __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"]('SublimeBidAdapter - ' + msg, obj);
} // Default state

var state = {
  zoneId: '',
  transactionId: ''
};
/**
 * Set a new state
 * @param {Object} value
 */

function setState(value) {
  _extends(state, value);

  log('State has been updated :', state);
}
/**
 * Send pixel to our debug endpoint
 * @param {string} eventName - Event name that will be send in the e= query string
 */

function sendEvent(eventName) {
  var ts = Date.now();
  var eventObject = {
    t: ts,
    tse: ts,
    z: state.zoneId,
    e: eventName,
    src: 'pa',
    puid: state.transactionId,
    trId: state.transactionId,
    ver: SUBLIME_VERSION
  };
  log('Sending pixel for event: ' + eventName, eventObject);
  var queryString = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["formatQS"](eventObject);
  __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["triggerPixel"]('https://' + SUBLIME_ANTENNA + '/?' + queryString);
}
/**
 * Determines whether or not the given bid request is valid.
 *
 * @param {BidRequest} bid The bid params to validate.
 * @return {Boolean} True if this is a valid bid, and false otherwise.
 */

function isBidRequestValid(bid) {
  return !!Number(bid.params.zoneId);
}
/**
 * Make a server request from the list of BidRequests.
 *
 * @param {BidRequest[]} validBidRequests - An array of bids
 * @param {Object} bidderRequest - Info describing the request to the server.
 * @return {ServerRequest|ServerRequest[]} - Info describing the request to the server.
 */


function buildRequests(validBidRequests, bidderRequest) {
  var commonPayload = {
    pbav: SUBLIME_VERSION,
    // Current Prebid params
    prebidVersion: "4.2.0",
    currencyCode: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency') || DEFAULT_CURRENCY,
    timeout: _typeof(bidderRequest) === 'object' && !!bidderRequest ? bidderRequest.timeout : __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('bidderTimeout')
  }; // RefererInfo

  if (bidderRequest && bidderRequest.refererInfo) {
    commonPayload.referer = bidderRequest.refererInfo.referer;
    commonPayload.numIframes = bidderRequest.refererInfo.numIframes;
  } // GDPR handling


  if (bidderRequest && bidderRequest.gdprConsent) {
    commonPayload.gdprConsent = bidderRequest.gdprConsent.consentString;
    commonPayload.gdpr = bidderRequest.gdprConsent.gdprApplies; // we're handling the undefined case server side
  }

  return validBidRequests.map(function (bid) {
    var bidHost = bid.params.bidHost || DEFAULT_BID_HOST;
    var protocol = bid.params.protocol || DEFAULT_PROTOCOL;
    setState({
      transactionId: bid.transactionId,
      zoneId: bid.params.zoneId,
      debug: bid.params.debug || false
    });
    var bidPayload = {
      adUnitCode: bid.adUnitCode,
      auctionId: bid.auctionId,
      bidder: bid.bidder,
      bidderRequestId: bid.bidderRequestId,
      bidRequestsCount: bid.bidRequestsCount,
      requestId: bid.bidId,
      sizes: bid.sizes.map(function (size) {
        return {
          w: size[0],
          h: size[1]
        };
      }),
      transactionId: bid.transactionId,
      zoneId: bid.params.zoneId
    };

    var payload = _extends({}, commonPayload, bidPayload);

    return {
      method: 'POST',
      url: protocol + '://' + bidHost + '/bid',
      data: payload,
      options: {
        contentType: 'application/json',
        withCredentials: true
      }
    };
  });
}
/**
 * Unpack the response from the server into a list of bids.
 *
 * @param {*} serverResponse A successful response from the server.
 * @param {*} bidRequest An object with bid request informations
 * @return {Bid[]} An array of bids which were nested inside the server.
 */


function interpretResponse(serverResponse, bidRequest) {
  var bidResponses = [];
  var response = serverResponse.body;

  if (response) {
    if (response.timeout || !response.ad || /<!--\s+No\s+ad\s+-->/gmi.test(response.ad)) {
      return bidResponses;
    } // Setting our returned sizes object to default values


    var returnedSizes = {
      width: 1800,
      height: 1000
    }; // Verifying Banner sizes

    if (bidRequest && bidRequest.data && bidRequest.data.w === 1 && bidRequest.data.h === 1) {
      // If banner sizes are 1x1 we set our default size object to 1x1
      returnedSizes = {
        width: 1,
        height: 1
      };
    }

    var bidResponse = {
      requestId: response.requestId || '',
      cpm: response.cpm || 0,
      width: response.width || returnedSizes.width,
      height: response.height || returnedSizes.height,
      creativeId: response.creativeId || 1,
      dealId: response.dealId || 1,
      currency: response.currency || DEFAULT_CURRENCY,
      netRevenue: response.netRevenue || true,
      ttl: response.ttl || DEFAULT_TTL,
      ad: response.ad,
      pbav: SUBLIME_VERSION
    };
    bidResponses.push(bidResponse);
  }

  return bidResponses;
}
/**
 * Send pixel when bidWon event is triggered
 * @param {Object} timeoutData
 */


function onBidWon(bid) {
  log('Bid won', bid);
  sendEvent('bidwon');
}
/**
 * Send debug when we timeout
 * @param {Object} timeoutData
 */


function onTimeout(timeoutData) {
  log('Timeout from adapter', timeoutData);
  sendEvent('bidtimeout');
}

var spec = {
  code: BIDDER_CODE,
  gvlid: BIDDER_GVLID,
  aliases: [],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  onBidWon: onBidWon,
  onTimeout: onTimeout
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[728]);