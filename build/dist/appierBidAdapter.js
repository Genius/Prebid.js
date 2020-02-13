pbjsChunk([243],{

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(195);


/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADAPTER_VERSION", function() { return ADAPTER_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_SERVERS_MAP", function() { return API_SERVERS_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);



var ADAPTER_VERSION = '1.0.0';
var SUPPORTED_AD_TYPES = [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]]; // we have different servers for different regions / farms

var API_SERVERS_MAP = {
  'default': 'ad2.apx.appier.net',
  'tw': 'ad2.apx.appier.net',
  'jp': 'ad-jp.apx.appier.net'
};
var BIDDER_API_ENDPOINT = '/v1/prebid/bid';
var spec = {
  code: 'appier',
  supportedMediaTypes: SUPPORTED_AD_TYPES,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return typeof bid.params.hzid === 'string';
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {bidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    if (bidRequests.length === 0) {
      return [];
    }

    var server = this.getApiServer();
    var bidderApiUrl = "//".concat(server).concat(BIDDER_API_ENDPOINT);
    var payload = {
      'bids': bidRequests,
      'refererInfo': bidderRequest.refererInfo,
      'version': ADAPTER_VERSION
    };
    return [{
      method: 'POST',
      url: bidderApiUrl,
      data: payload,
      // keep the bidder request object for later use
      bidderRequest: bidderRequest
    }];
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {serverResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, serverRequest) {
    if (!Array.isArray(serverResponse.body)) {
      return [];
    } // server response body is an array of bid results


    var bidResults = serverResponse.body; // our server directly returns the format needed by prebid.js so no more
    // transformation is needed here.

    return bidResults;
  },

  /**
   * Get the hostname of the server we want to use.
   */
  getApiServer: function getApiServer() {
    // we may use different servers for different farms (geographical regions)
    // if a server is specified explicitly, use it. otherwise, use farm specific server.
    var server = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('appier.server');

    if (!server) {
      var farm = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('appier.farm');
      server = API_SERVERS_MAP[farm] || API_SERVERS_MAP['default'];
    }

    return server;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[194]);