pbjsChunk([251],{

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(171);


/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIDDER_CODE", function() { return BIDDER_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PUBLISHER_PLACEHOLDER", function() { return PUBLISHER_PLACEHOLDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDPOINT_URL", function() { return ENDPOINT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDPOINT_METHOD", function() { return ENDPOINT_METHOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'aduptech';
var PUBLISHER_PLACEHOLDER = '{PUBLISHER}';
var ENDPOINT_URL = window.location.protocol + '//rtb.d.adup-tech.com/prebid/' + PUBLISHER_PLACEHOLDER + '_bid';
var ENDPOINT_METHOD = 'POST';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.sizes && bid.sizes.length > 0 && bid.params && bid.params.publisher && bid.params.placement);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bidRequests = []; // collect GDPR information

    var gdpr = null;

    if (bidderRequest && bidderRequest.gdprConsent) {
      gdpr = {
        consentString: bidderRequest.gdprConsent.consentString,
        consentRequired: typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' ? bidderRequest.gdprConsent.gdprApplies : true
      };
    }

    validBidRequests.forEach(function (bidRequest) {
      bidRequests.push({
        url: ENDPOINT_URL.replace(PUBLISHER_PLACEHOLDER, encodeURIComponent(bidRequest.params.publisher)),
        method: ENDPOINT_METHOD,
        data: {
          pageUrl: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
          referrer: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"](),
          bidId: bidRequest.bidId,
          auctionId: bidRequest.auctionId,
          transactionId: bidRequest.transactionId,
          adUnitCode: bidRequest.adUnitCode,
          sizes: bidRequest.sizes,
          params: bidRequest.params,
          gdpr: gdpr
        }
      });
    });
    return bidRequests;
  },
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
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[170]);