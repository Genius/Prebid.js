pbjsChunk([88],{

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(567);


/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);



var BIDDER_CODE = 'smartadserver';
var spec = {
  code: BIDDER_CODE,
  aliases: ['smart'],
  // short code

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.siteId && bid.params.pageId && bid.params.formatId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @param {bidderRequest} - bidder request object
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    // use bidderRequest.bids[] to get bidder-dependent request info
    // if your bidder supports multiple currencies, use config.getConfig(currency)
    // to find which one the ad server needs
    // pull requested transaction ID from bidderRequest.bids[].transactionId
    return validBidRequests.map(function (bid) {
      var payload = {
        siteid: bid.params.siteId,
        pageid: bid.params.pageId,
        formatid: bid.params.formatId,
        currencyCode: __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('currency.adServerCurrency'),
        bidfloor: bid.params.bidfloor || 0.0,
        targeting: bid.params.target && bid.params.target != '' ? bid.params.target : undefined,
        buid: bid.params.buId && bid.params.buId != '' ? bid.params.buId : undefined,
        appname: bid.params.appName && bid.params.appName != '' ? bid.params.appName : undefined,
        ckid: bid.params.ckId || 0,
        tagId: bid.adUnitCode,
        sizes: bid.sizes.map(function (size) {
          return {
            w: size[0],
            h: size[1]
          };
        }),
        pageDomain: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
        transactionId: bid.transactionId,
        timeout: __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('bidderTimeout'),
        bidId: bid.bidId,
        prebidVersion: "2.37.0"
      };

      if (bidderRequest && bidderRequest.gdprConsent) {
        payload.gdpr_consent = bidderRequest.gdprConsent.consentString;
        payload.gdpr = bidderRequest.gdprConsent.gdprApplies; // we're handling the undefined case server side
      }

      var payloadString = JSON.stringify(payload);
      return {
        method: 'POST',
        url: (bid.params.domain !== undefined ? bid.params.domain : 'https://prg.smartadserver.com') + '/prebid/v1',
        data: payloadString
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var response = serverResponse.body;

    try {
      if (response) {
        var bidResponse = {
          requestId: JSON.parse(bidRequest.data).bidId,
          cpm: response.cpm,
          width: response.width,
          height: response.height,
          creativeId: response.creativeId,
          dealId: response.dealId,
          currency: response.currency,
          netRevenue: response.isNetCpm,
          ttl: response.ttl,
          referrer: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
          adUrl: response.adUrl,
          ad: response.ad
        };
        bidResponses.push(bidResponse);
      }
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Error while parsing smart server response', error);
    }

    return bidResponses;
  },

  /**
   * User syncs.
   *
   * @param {*} syncOptions Publisher prebid configuration.
   * @param {*} serverResponses A successful response from the server.
   * @return {Syncs[]} An array of syncs that should be executed.
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (syncOptions.iframeEnabled && serverResponses.length > 0) {
      syncs.push({
        type: 'iframe',
        url: serverResponses[0].body.cSyncUrl
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[566]);