pbjsChunk([119],{

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(480);


/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var BIDDER_CODE = 'pollux';
var PLX_ENDPOINT_URL = '//adn.plxnt.com/prebid/v1';
var PLX_CURRENCY = 'EUR';
var PLX_TTL = 3600;
var PLX_NETREVENUE = true;
var spec = {
  code: BIDDER_CODE,
  aliases: ['plx'],

  /**
     * Determines whether or not the given bid request is valid.
     *
     * @param {BidRequest} bid The bid params to validate.
     * @return boolean True if this is a valid bid, and false otherwise.
     */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid.hasOwnProperty('params') || !bid.params.hasOwnProperty('zone')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('required param "zone" is missing for == ' + BIDDER_CODE + ' ==');
      return false;
    }

    return true;
  },

  /**
     * Make a server request from the list of BidRequests.
     *
     * @param {validBidRequests[]} - an array of bids
     * @return ServerRequest Info describing the request to the server.
     */
  buildRequests: function buildRequests(validBidRequests) {
    if (!Array.isArray(validBidRequests) || !validBidRequests.length) {
      return [];
    }

    var payload = [];
    var customUrl = null;

    for (var i = 0; i < validBidRequests.length; i++) {
      var bid = validBidRequests[i];
      var request = {
        bidId: bid.bidId,
        zones: bid.params.zone,
        sizes: bid.sizes
      };

      if (bid.bidderUrl && !customUrl) {
        customUrl = bid.bidderUrl;
      }

      payload.push(request);
    }

    var payloadString = JSON.stringify(payload); // build url parameters

    var domain = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getParameterByName"]('domain');
    var tracker2 = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getParameterByName"]('tracker2');
    var urlParams = {};

    if (domain) {
      urlParams.domain = domain;
    } else {
      urlParams.domain = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
    }

    if (tracker2) {
      urlParams.tracker2 = tracker2;
    } // build url


    var bidderUrl = customUrl || PLX_ENDPOINT_URL;

    if (urlParams) {
      bidderUrl = bidderUrl + '?' + __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseQueryStringParameters"](urlParams);
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"]('== ' + BIDDER_CODE + ' == request built: ' + bidderUrl);
    return {
      method: 'POST',
      url: bidderUrl,
      data: payloadString
    };
  },

  /**
     * Unpack the response from the server into a list of bids.
     *
     * @param {*} serverResponse A successful response from the server.
     * @return {Bid[]} An array of bids which were nested inside the server.
     */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];

    if (!serverResponse || _typeof(serverResponse) === 'object' && !serverResponse.hasOwnProperty('body')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"]('No prebid response from == ' + BIDDER_CODE + ' == for bid requests:');
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"](bidRequest);
      return bidResponses;
    }

    serverResponse = serverResponse.body;

    if (!Array.isArray(serverResponse) || !serverResponse.length) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"]('No prebid response from == ' + BIDDER_CODE + ' == for bid requests:');
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"](bidRequest);
      return bidResponses;
    } // loop through serverResponses


    for (var b in serverResponse) {
      var bid = serverResponse[b];
      var bidResponse = {
        requestId: bid.bidId,
        // not request id, it's bid's id
        cpm: parseFloat(bid.cpm),
        width: parseInt(bid.width),
        height: parseInt(bid.height),
        ttl: PLX_TTL,
        creativeId: bid.creativeId,
        netRevenue: PLX_NETREVENUE,
        currency: PLX_CURRENCY
      };

      if (bid.ad_type === 'url') {
        bidResponse.adUrl = bid.ad;
      } else {
        bidResponse.ad = bid.ad;
      }

      if (bid.referrer) {
        bidResponse.referrer = bid.referrer;
      }

      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[479]);