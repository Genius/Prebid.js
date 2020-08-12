pbjsChunk([60],{

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(489);


/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var BIDDER_CODE = 'sublime';
var DEFAULT_BID_HOST = 'pbjs.sskzlabs.com';
var DEFAULT_CURRENCY = 'EUR';
var DEFAULT_PROTOCOL = 'https';
var DEFAULT_TTL = 600;
var SUBLIME_VERSION = '0.4.0';
var spec = {
  code: BIDDER_CODE,
  aliases: [],

  /**
     * Determines whether or not the given bid request is valid.
     *
     * @param {BidRequest} bid The bid params to validate.
     * @return boolean True if this is a valid bid, and false otherwise.
     */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.zoneId;
  },

  /**
     * Make a server request from the list of BidRequests.
     *
     * @param {BidRequest[]} validBidRequests An array of bids
     * @param {Object} bidderRequest - Info describing the request to the server.
     * @return ServerRequest Info describing the request to the server.
     */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var commonPayload = {
      sublimeVersion: SUBLIME_VERSION,
      // Current Prebid params
      prebidVersion: "3.0.0",
      currencyCode: __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('currency.adServerCurrency') || DEFAULT_CURRENCY,
      timeout: __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('bidderTimeout')
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
      var protocol = bid.params.protocol || DEFAULT_PROTOCOL;
      var bidHost = bid.params.bidHost || DEFAULT_BID_HOST;

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
  },

  /**
     * Unpack the response from the server into a list of bids.
     *
     * @param {*} serverResponse A successful response from the server.
     * @param {*} bidRequest An object with bid request informations
     * @return {Bid[]} An array of bids which were nested inside the server.
     */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var response = serverResponse.body;

    if (response) {
      if (response.timeout || !response.ad || response.ad.match(/<!-- No ad -->/gmi)) {
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
        ad: response.ad
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[488]);