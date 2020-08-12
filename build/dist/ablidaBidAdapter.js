pbjsChunk([203],{

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(127);


/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);



var BIDDER_CODE = 'ablida';
var ENDPOINT_URL = 'https://bidder.ablida.net/prebid';
var spec = {
  code: BIDDER_CODE,

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
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bidRequest.sizes)[0];
      var size = sizes.split('x');
      var jaySupported = 'atob' in window && 'currentScript' in document;
      var device = getDevice();
      var payload = {
        placementId: bidRequest.params.placementId,
        width: size[0],
        height: size[1],
        bidId: bidRequest.bidId,
        categories: bidRequest.params.categories,
        referer: bidderRequest.refererInfo.referer,
        jaySupported: jaySupported,
        device: device
      };
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
    response.forEach(function (bid) {
      bid.ttl = __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('_bidderTimeout');
      bidResponses.push(bid);
    });
    return bidResponses;
  }
};

function getDevice() {
  var ua = navigator.userAgent;
  var topWindow = window.top;

  if (/(ipad|xoom|sch-i800|playbook|silk|tablet|kindle)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }

  if (/(smart[-]?tv|hbbtv|appletv|googletv|hdmi|netcast\.tv|viera|nettv|roku|\bdtv\b|sonydtv|inettvbrowser|\btv\b)/i.test(ua)) {
    return 'connectedtv';
  }

  if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Windows\sCE|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(ua)) {
    return 'smartphone';
  }

  var width = topWindow.innerWidth || topWindow.document.documentElement.clientWidth || topWindow.document.body.clientWidth;

  if (width > 320) {
    return 'desktop';
  }

  return 'other';
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[126]);