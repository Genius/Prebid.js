pbjsChunk([153],{

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(406);


/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



 // use protocol relative urls for http or https

var MADVERTISE_ENDPOINT = 'https://mobile.mng-ads.com/';
var spec = {
  code: 'madvertise',

  /**
   * @param {object} bid
   * @return boolean
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (_typeof(bid.params) !== 'object') {
      return false;
    }

    var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bid.sizes);

    if (!sizes || sizes.length === 0) {
      return false;
    }

    if (sizes.length > 0 && sizes[0] === undefined) {
      return false;
    }

    if (typeof bid.params.floor == 'undefined' || parseFloat(bid.params.floor) < 0.01) {
      bid.params.floor = 0.01;
    }

    return typeof bid.params.s != 'undefined';
  },

  /**
   * @param {BidRequest[]} bidRequests
   * @param bidderRequest
   * @return ServerRequest[]
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    return bidRequests.map(function (bidRequest) {
      bidRequest.startTime = new Date().getTime(); // non-video request builder

      var src = '?rt=bid_request&v=1.0';

      for (var i = 0; i < bidRequest.sizes.length; i++) {
        if (Array.isArray(bidRequest.sizes[i]) && bidRequest.sizes[i].length == 2) {
          src = src + '&sizes[' + i + ']=' + bidRequest.sizes[i][0] + 'x' + bidRequest.sizes[i][1];
        }
      }

      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](bidRequest.params, function (item, key) {
        return src = src + '&' + key + '=' + item;
      });

      if (typeof bidRequest.params.u == 'undefined') {
        src = src + '&u=' + navigator.userAgent;
      }

      if (bidderRequest && bidderRequest.gdprConsent) {
        src = src + '&gdpr=' + (bidderRequest.gdprConsent.gdprApplies ? '1' : '0') + '&consent[0][format]=' + __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('consentManagement.cmpApi') + '&consent[0][value]=' + bidderRequest.gdprConsent.consentString;
      }

      return {
        method: 'GET',
        url: MADVERTISE_ENDPOINT + src,
        options: {
          withCredentials: false
        },
        bidId: bidRequest.bidId
      };
    });
  },

  /**
   * @param {*} responseObj
   * @param {BidRequest} bidRequest
   * @return {Bid[]} An array of bids which
   */
  interpretResponse: function interpretResponse(responseObj, bidRequest) {
    responseObj = responseObj.body; // check overall response

    if (responseObj == null || _typeof(responseObj) !== 'object' || !responseObj.hasOwnProperty('ad')) {
      return [];
    }

    var bid = {
      requestId: bidRequest.bidId,
      cpm: responseObj.cpm,
      width: responseObj.Width,
      height: responseObj.height,
      ad: responseObj.ad,
      ttl: responseObj.ttl,
      creativeId: responseObj.creativeId,
      netRevenue: responseObj.netRevenue,
      currency: responseObj.currency,
      dealId: responseObj.dealId
    };
    return [bid];
  },
  getUserSyncs: function getUserSyncs(syncOptions) {}
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[405]);