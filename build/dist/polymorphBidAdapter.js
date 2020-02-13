pbjsChunk([118],{

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(482);


/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polymorphAdapterSpec", function() { return polymorphAdapterSpec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var PROTOCOL = getProtocol();
var BIDDER_CODE = 'polymorph';
var URL = '//api.adsnative.com/v1/ad-template.json';
var USER_SYNC_URL = PROTOCOL + '//rudy.adsnative.com/cm.gif';

function getProtocol() {
  if (location.protocol && location.protocol.indexOf('https') === 0) {
    return 'https:';
  } else {
    return 'http:';
  }
}

var polymorphAdapterSpec = {
  code: BIDDER_CODE,
  aliases: ['adsnative'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId || !!bid.params.network_key && !!bid.params.widget_id && !!bid.params.cat;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    return bidRequests.map(function (bid) {
      var payload = {
        url: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
        ref: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopFrameReferrer"](),
        sizes: bid.sizes,
        hb: 1,
        hb_source: 'prebid',
        bid_id: bid.bidId
      };

      if (bid.params.placementId) {
        payload.zid = bid.params.placementId;
      } else if (bid.params.network_key && bid.params.widget_id && bid.params.cat) {
        payload.network_key = bid.params.network_key;
        payload.widget_id = bid.params.widget_id;
        payload.cat = bid.params.cat;
      }

      Object.keys(bid.params).forEach(function (key) {
        if (key != 'defaultWidth' && key != 'defaultHeight') {
          payload[key] = bid.params[key];
        }
      });
      var payloadString = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseQueryStringParameters"](payload);
      return {
        method: 'GET',
        url: URL,
        data: payloadString,
        bidderRequest: bid
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bidderRequest = _ref.bidderRequest;
    var bidResponses = [];

    try {
      serverResponse = serverResponse.body;

      if (!serverResponse || typeof serverResponse.status === 'undefined') {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('HTTP Connection Error');
        return bidResponses;
      }

      if (serverResponse.status != 'OK' || typeof serverResponse.ad === 'undefined' && typeof serverResponse.ads === 'undefined') {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('API No Response: ' + serverResponse.message);
        return bidResponses;
      }

      var width = bidderRequest.params.defaultWidth || bidderRequest.sizes[0][0];
      var height = bidderRequest.params.defaultHeight || bidderRequest.sizes[0][1];
      var theHTML = '';
      var crid = '';

      if (typeof serverResponse.ad !== 'undefined') {
        crid = serverResponse.crid;
        theHTML = serverResponse.ad.html;
        width = serverResponse.ad.width || width;
        height = serverResponse.ad.height || height;
      } else {
        crid = serverResponse.ads[0].crid;
        theHTML = serverResponse.html;
      }

      var bidResp = {
        requestId: bidderRequest.bidId,
        cpm: serverResponse.ecpm,
        width: width,
        height: height,
        ad: theHTML,
        ttl: 3600,
        creativeId: crid,
        netRevenue: false,
        currency: 'USD',
        mediaType: 'banner'
      };
      bidResponses.push(bidResp);
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](e);
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.pixelEnabled) {
      return [{
        type: 'image',
        url: USER_SYNC_URL
      }];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(polymorphAdapterSpec);

/***/ })

},[481]);