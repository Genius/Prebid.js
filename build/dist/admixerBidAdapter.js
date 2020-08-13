pbjsChunk([304],{

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(208);


/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);


var BIDDER_CODE = 'admixer';
var ALIASES = ['go2net'];
var ENDPOINT_URL = 'https://inv-nets.admixer.net/prebid.1.0.aspx';
var spec = {
  code: BIDDER_CODE,
  aliases: ALIASES,
  supportedMediaTypes: ['banner', 'video'],

  /**
   * Determines whether or not the given bid request is valid.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.zone;
  },

  /**
   * Make a server request from the list of BidRequests.
   */
  buildRequests: function buildRequests(validRequest, bidderRequest) {
    var payload = {
      imps: []
    };

    if (bidderRequest) {
      if (bidderRequest.refererInfo && bidderRequest.refererInfo.referer) {
        payload.referrer = encodeURIComponent(bidderRequest.refererInfo.referer);
      }

      if (bidderRequest.gdprConsent) {
        payload.gdprConsent = {
          consentString: bidderRequest.gdprConsent.consentString,
          // will check if the gdprApplies field was populated with a boolean value (ie from page config).  If it's undefined, then default to true
          gdprApplies: typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' ? bidderRequest.gdprConsent.gdprApplies : true
        };
      }

      if (bidderRequest.uspConsent) {
        payload.uspConsent = bidderRequest.uspConsent;
      }
    }

    validRequest.forEach(function (bid) {
      payload.imps.push(bid);
    });
    var payloadString = JSON.stringify(payload);
    return {
      method: 'GET',
      url: ENDPOINT_URL,
      data: "data=".concat(payloadString)
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = []; // loop through serverResponses {

    try {
      serverResponse = serverResponse.body;
      serverResponse.forEach(function (bidResponse) {
        var bidResp = {
          requestId: bidResponse.bidId,
          cpm: bidResponse.cpm,
          width: bidResponse.width,
          height: bidResponse.height,
          ad: bidResponse.ad,
          ttl: bidResponse.ttl,
          creativeId: bidResponse.creativeId,
          netRevenue: bidResponse.netRevenue,
          currency: bidResponse.currency,
          vastUrl: bidResponse.vastUrl
        };
        bidResponses.push(bidResp);
      });
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](e);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[207]);