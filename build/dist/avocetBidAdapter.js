pbjsChunk([275],{

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(282);


/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var BIDDER_CODE = 'avct';
var DEFAULT_BASE_URL = 'https://ads.avct.cloud';
var DEFAULT_PREBID_PATH = '/prebid';

function getPrebidURL() {
  var host = __WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */].getConfig('avct.baseUrl');

  if (host && typeof host === 'string') {
    return "".concat(host).concat(getPrebidPath());
  }

  return "".concat(DEFAULT_BASE_URL).concat(getPrebidPath());
}

function getPrebidPath() {
  var prebidPath = __WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */].getConfig('avct.prebidPath');

  if (prebidPath && typeof prebidPath === 'string') {
    return prebidPath;
  }

  return DEFAULT_PREBID_PATH;
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid with params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params && !!bid.params.placement && typeof bid.params.placement === 'string' && bid.params.placement.length === 24;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    // Get currency from config
    var currency = __WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency'); // Publisher domain from config

    var publisherDomain = __WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */].getConfig('publisherDomain'); // First-party data from config

    var fpd = __WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */].getConfig('fpd'); // GDPR status and TCF consent string

    var tcfConsentString;
    var gdprApplies = false;

    if (bidderRequest.gdprConsent) {
      tcfConsentString = bidderRequest.gdprConsent.consentString;
      gdprApplies = !!bidderRequest.gdprConsent.gdprApplies;
    } // US privacy string


    var usPrivacyString;

    if (bidderRequest.uspConsent) {
      usPrivacyString = bidderRequest.uspConsent;
    } // Supply chain


    var schain;

    if (bidderRequest.schain) {
      schain = bidderRequest.schain;
    } // ID5 identifier


    var id5id;

    if (bidRequests[0].userId && bidRequests[0].userId.id5id) {
      id5id = bidRequests[0].userId.id5id;
    } // Build the avocet ext object


    var ext = {
      currency: currency,
      tcfConsentString: tcfConsentString,
      gdprApplies: gdprApplies,
      usPrivacyString: usPrivacyString,
      schain: schain,
      publisherDomain: publisherDomain,
      fpd: fpd,
      id5id: id5id
    }; // Extract properties from bidderRequest

    var auctionId = bidderRequest.auctionId,
        auctionStart = bidderRequest.auctionStart,
        bidderCode = bidderRequest.bidderCode,
        bidderRequestId = bidderRequest.bidderRequestId,
        refererInfo = bidderRequest.refererInfo,
        timeout = bidderRequest.timeout; // Construct payload

    var payload = JSON.stringify({
      auctionId: auctionId,
      auctionStart: auctionStart,
      bidderCode: bidderCode,
      bidderRequestId: bidderRequestId,
      refererInfo: refererInfo,
      timeout: timeout,
      bids: bidRequests,
      ext: ext
    });
    return {
      method: 'POST',
      url: getPrebidURL(),
      data: payload
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    if (!serverResponse || !serverResponse.body || _typeof(serverResponse.body) !== 'object') {
      return [];
    }

    if (Array.isArray(serverResponse.body)) {
      return serverResponse.body;
    }

    if (Array.isArray(serverResponse.body.responses)) {
      return serverResponse.body.responses;
    }

    return [];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[281]);