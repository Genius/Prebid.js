pbjsChunk([69],{

/***/ 780:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(781);


/***/ }),

/***/ 781:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);




var BIDDER_CODE = 'vdo.ai';
var ENDPOINT_URL = 'https://prebid.vdo.ai/auction';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @return Array Info describing the request to the server.
   * @param validBidRequests
   * @param bidderRequest
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    if (validBidRequests.length === 0) {
      return [];
    }

    return validBidRequests.map(function (bidRequest) {
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bidRequest.params.size || bidRequest.sizes)[0];
      var width = sizes.split('x')[0];
      var height = sizes.split('x')[1];
      var payload = {
        placementId: bidRequest.params.placementId,
        width: width,
        height: height,
        bidId: bidRequest.bidId,
        referer: bidderRequest.refererInfo.referer,
        id: bidRequest.auctionId
      };
      bidRequest.params.bidFloor && (payload['bidFloor'] = bidRequest.params.bidFloor);
      return {
        method: 'POST',
        url: ENDPOINT_URL,
        data: payload
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @param bidRequest
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var response = serverResponse.body;
    var creativeId = response.adid || 0; // const width = response.w || 0;

    var width = bidRequest.data.width; // const height = response.h || 0;

    var height = bidRequest.data.height;
    var cpm = response.price || 0;
    response.rWidth = width;
    response.rHeight = height;
    var adCreative = response.vdoCreative;

    if (width !== 0 && height !== 0 && cpm !== 0 && creativeId !== 0) {
      // const dealId = response.dealid || '';
      var currency = response.cur || 'USD';
      var netRevenue = true; // const referrer = bidRequest.data.referer;

      var bidResponse = {
        requestId: response.bidId,
        cpm: cpm,
        width: width,
        height: height,
        creativeId: creativeId,
        // dealId: dealId,
        currency: currency,
        netRevenue: netRevenue,
        ttl: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('_bidderTimeout'),
        // referrer: referrer,
        // ad: response.adm
        ad: adCreative
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponse) {
    var syncUrls = serverResponse[0] && serverResponse[0].body && serverResponse[0].body.cookiesync && serverResponse[0].body.cookiesync.bidder_status;

    if (syncOptions.iframeEnabled && syncUrls && syncUrls.length > 0) {
      var prebidSyncUrls = syncUrls.map(function (syncObj) {
        return {
          url: syncObj.usersync.url,
          type: 'iframe'
        };
      });
      return prebidSyncUrls;
    }

    return [];
  },
  onTImeout: function onTImeout(data) {},
  onBidWon: function onBidWon(bid) {},
  onSetTargeting: function onSetTargeting(bid) {}
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[780]);