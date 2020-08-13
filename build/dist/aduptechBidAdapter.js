pbjsChunk([293],{

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(236);


/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIDDER_CODE", function() { return BIDDER_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PUBLISHER_PLACEHOLDER", function() { return PUBLISHER_PLACEHOLDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDPOINT_URL", function() { return ENDPOINT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDPOINT_METHOD", function() { return ENDPOINT_METHOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["extractSizesFromBidRequest"] = extractSizesFromBidRequest;
/* harmony export (immutable) */ __webpack_exports__["extractParamsFromBidRequest"] = extractParamsFromBidRequest;
/* harmony export (immutable) */ __webpack_exports__["extractGdprFromBidderRequest"] = extractGdprFromBidderRequest;
/* harmony export (immutable) */ __webpack_exports__["extractTopWindowUrlFromBidRequest"] = extractTopWindowUrlFromBidRequest;
/* harmony export (immutable) */ __webpack_exports__["extractTopWindowReferrerFromBidRequest"] = extractTopWindowReferrerFromBidRequest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);



var BIDDER_CODE = 'aduptech';
var PUBLISHER_PLACEHOLDER = '{PUBLISHER}';
var ENDPOINT_URL = 'https://rtb.d.adup-tech.com/prebid/' + PUBLISHER_PLACEHOLDER + '_bid';
var ENDPOINT_METHOD = 'POST';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]],

  /**
   * Validate given bid request
   *
   * @param {*} bidRequest
   * @returns {boolean}
   */
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    if (!bidRequest) {
      return false;
    }

    var sizes = extractSizesFromBidRequest(bidRequest);

    if (!sizes || sizes.length === 0) {
      return false;
    }

    var params = extractParamsFromBidRequest(bidRequest);

    if (!params || !params.publisher || !params.placement) {
      return false;
    }

    return true;
  },

  /**
   * Build real bid requests
   *
   * @param {*} validBidRequests
   * @param {*} bidderRequest
   * @returns {*[]}
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bidRequests = [];
    var gdpr = extractGdprFromBidderRequest(bidderRequest);
    validBidRequests.forEach(function (bidRequest) {
      bidRequests.push({
        url: ENDPOINT_URL.replace(PUBLISHER_PLACEHOLDER, encodeURIComponent(bidRequest.params.publisher)),
        method: ENDPOINT_METHOD,
        data: {
          bidId: bidRequest.bidId,
          auctionId: bidRequest.auctionId,
          transactionId: bidRequest.transactionId,
          adUnitCode: bidRequest.adUnitCode,
          pageUrl: extractTopWindowUrlFromBidRequest(bidRequest),
          referrer: extractTopWindowReferrerFromBidRequest(bidRequest),
          sizes: extractSizesFromBidRequest(bidRequest),
          params: extractParamsFromBidRequest(bidRequest),
          gdpr: gdpr
        }
      });
    });
    return bidRequests;
  },

  /**
   * Handle bid response
   *
   * @param {*} response
   * @returns {*[]}
   */
  interpretResponse: function interpretResponse(response) {
    var bidResponses = [];

    if (!response.body || !response.body.bid || !response.body.creative) {
      return bidResponses;
    }

    bidResponses.push({
      requestId: response.body.bid.bidId,
      cpm: response.body.bid.price,
      netRevenue: response.body.bid.net,
      currency: response.body.bid.currency,
      ttl: response.body.bid.ttl,
      creativeId: response.body.creative.id,
      width: response.body.creative.width,
      height: response.body.creative.height,
      ad: response.body.creative.html
    });
    return bidResponses;
  }
};
/**
 * Extracts the possible ad unit sizes from given bid request
 *
 * @param {*} bidRequest
 * @returns {number[]}
 */

function extractSizesFromBidRequest(bidRequest) {
  // since pbjs 3.0
  if (bidRequest && __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.banner.sizes')) {
    return bidRequest.mediaTypes.banner.sizes; // for backward compatibility
  } else if (bidRequest && bidRequest.sizes) {
    return bidRequest.sizes; // fallback
  } else {
    return [];
  }
}
/**
 * Extracts the custom params from given bid request
 *
 * @param {*} bidRequest
 * @returns {*}
 */

function extractParamsFromBidRequest(bidRequest) {
  if (bidRequest && bidRequest.params) {
    return bidRequest.params;
  } else {
    return null;
  }
}
/**
 * Extracts the GDPR information from given bidder request
 *
 * @param {*} bidderRequest
 * @returns {*}
 */

function extractGdprFromBidderRequest(bidderRequest) {
  var gdpr = null;

  if (bidderRequest && bidderRequest.gdprConsent) {
    gdpr = {
      consentString: bidderRequest.gdprConsent.consentString,
      consentRequired: typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' ? bidderRequest.gdprConsent.gdprApplies : true
    };
  }

  return gdpr;
}
/**
 * Extracts the page url from given bid request or use the (top) window location as fallback
 *
 * @param {*} bidRequest
 * @returns {string}
 */

function extractTopWindowUrlFromBidRequest(bidRequest) {
  if (bidRequest && __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bidRequest, 'refererInfo.canonicalUrl')) {
    return bidRequest.refererInfo.canonicalUrl;
  }

  try {
    return window.top.location.href;
  } catch (e) {
    return window.location.href;
  }
}
/**
 * Extracts the referrer from given bid request or use the (top) document referrer as fallback
 *
 * @param {*} bidRequest
 * @returns {string}
 */

function extractTopWindowReferrerFromBidRequest(bidRequest) {
  if (bidRequest && __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bidRequest, 'refererInfo.referer')) {
    return bidRequest.refererInfo.referer;
  }

  try {
    return window.top.document.referrer;
  } catch (e) {
    return window.document.referrer;
  }
}
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[235]);