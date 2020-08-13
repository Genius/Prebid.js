pbjsChunk([278],{

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(276);


/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);




var BIDDER_CODE = 'audiencerun';
var ENDPOINT_URL = 'https://d.audiencerun.com/prebid';
var spec = {
  version: '1.0.0',
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var isValid = true;

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.zoneId')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('AudienceRun zoneId parameter is required. Bid aborted.');
      isValid = false;
    }

    return isValid;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @param {*} bidderRequest
   * @return {ServerRequest} Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var bids = bidRequests.map(function (bid) {
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner.sizes', []);
      return {
        zoneId: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getValue"](bid.params, 'zoneId'),
        sizes: sizes.map(function (size) {
          return {
            w: size[0],
            h: size[1]
          };
        }),
        bidfloor: bid.params.bidfloor || 0.0,
        bidId: bid.bidId,
        bidderRequestId: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('bidderRequestId', bid),
        adUnitCode: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('adUnitCode', bid),
        auctionId: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('auctionId', bid),
        transactionId: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('transactionId', bid)
      };
    });
    var payload = {
      libVersion: this.version,
      referer: bidderRequest.refererInfo ? bidderRequest.refererInfo.referer || null : null,
      currencyCode: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency'),
      timeout: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('bidderTimeout'),
      bids: bids
    };

    if (bidderRequest && bidderRequest.gdprConsent) {
      payload.gdpr = {
        consent: bidderRequest.gdprConsent.consentString,
        applies: bidderRequest.gdprConsent.gdprApplies
      };
    } else {
      payload.gdpr = {
        consent: ''
      };
    }

    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: JSON.stringify(payload),
      options: {
        withCredentials: true
      }
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bids = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](serverResponse.body.bid, function (bidObject) {
      if (!bidObject.cpm || bidObject.cpm === null || !bidObject.adm) {
        return;
      }

      var bid = {};
      bid.ad = bidObject.adm;
      bid.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]; // Common properties

      bid.requestId = bidObject.bidId;
      bid.adId = bidObject.zoneId;
      bid.cpm = parseFloat(bidObject.cpm);
      bid.creativeId = bidObject.crid;
      bid.currency = bidObject.currency ? bidObject.currency.toUpperCase() : 'USD';
      bid.height = bidObject.h;
      bid.width = bidObject.w;
      bid.netRevenue = bidObject.isNet ? bidObject.isNet : false;
      bid.ttl = 300;
      bids.push(bid);
    });

    return bids;
  },

  /**
   * Register the user sync pixels which should be dropped after the auction.
   *
   * @param {SyncOptions} syncOptions Which user syncs are allowed?
   * @param {ServerResponse[]} serverResponses List of server's responses.
   * @return {UserSync[]} The user syncs which should be dropped.
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (!serverResponses || !serverResponses.length) return [];
    var syncs = [];
    serverResponses.forEach(function (response) {
      response.body.bid.forEach(function (bidObject) {
        syncs.push({
          type: 'iframe',
          url: bidObject.syncUrl
        });
      });
    });
    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[275]);