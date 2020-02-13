pbjsChunk([154],{

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(404);


/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_Renderer__ = __webpack_require__(11);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var LOOPME_ENDPOINT = 'https://loopme.me/api/hb';

var entries = function entries(obj) {
  var output = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      output.push([key, obj[key]]);
    }
  }

  return output;
};

var spec = {
  code: 'loopme',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],

  /**
   * @param {object} bid
   * @return boolean
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (_typeof(bid.params) !== 'object') {
      return false;
    }

    return !!bid.params.ak;
  },

  /**
   * @param {BidRequest[]} bidRequests
   * @param bidderRequest
   * @return ServerRequest[]
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    return bidRequests.map(function (bidRequest) {
      bidRequest.startTime = new Date().getTime();
      var payload = bidRequest.params;

      if (bidderRequest && bidderRequest.gdprConsent) {
        payload.user_consent = bidderRequest.gdprConsent.consentString;
      }

      var queryString = entries(payload).map(function (item) {
        return "".concat(item[0], "=").concat(encodeURI(item[1]));
      }).join('&');
      var adUnitSizes = bidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]] ? __WEBPACK_IMPORTED_MODULE_0__src_utils__["getAdUnitSizes"](bidRequest) : __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest.mediaTypes, 'video.playerSize');
      var sizes = '&sizes=' + adUnitSizes.map(function (size) {
        return "".concat(size[0], "x").concat(size[1]);
      }).join('&sizes=');
      queryString = "".concat(queryString).concat(sizes).concat(bidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]] ? '&media_type=video' : '');
      return {
        method: 'GET',
        url: "".concat(LOOPME_ENDPOINT),
        options: {
          withCredentials: false
        },
        bidId: bidRequest.bidId,
        data: queryString
      };
    });
  },

  /**
   * @param {*} responseObj
   * @param {BidRequest} bidRequest
   * @return {Bid[]} An array of bids which
   */
  interpretResponse: function interpretResponse() {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var bidRequest = arguments.length > 1 ? arguments[1] : undefined;
    var responseObj = response.body;

    if (responseObj === null || _typeof(responseObj) !== 'object') {
      return [];
    }

    if (!responseObj.hasOwnProperty('ad') && !responseObj.hasOwnProperty('vastUrl')) {
      return [];
    } // responseObj.vastUrl = 'https://rawgit.com/InteractiveAdvertisingBureau/VAST_Samples/master/VAST%201-2.0%20Samples/Inline_NonLinear_Verification_VAST2.0.xml';


    if (responseObj.vastUrl) {
      var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer__["a" /* Renderer */].install({
        id: bidRequest.bidId,
        url: 'https://i.loopme.me/html/vast/loopme_flex.js',
        loaded: false
      });
      renderer.setRender(function (bid) {
        renderer.push(function () {
          var adverts = [{
            'type': 'VAST',
            'url': bid.vastUrl,
            'autoClose': -1
          }];
          var config = {
            containerId: bid.adUnitCode,
            vastTimeout: 250,
            ads: adverts,
            user_consent: '%%USER_CONSENT%%'
          };
          window.L.flex.loader.load(config);
        });
      });
      return [{
        requestId: bidRequest.bidId,
        cpm: responseObj.cpm,
        width: responseObj.width,
        height: responseObj.height,
        ttl: responseObj.ttl,
        currency: responseObj.currency,
        creativeId: responseObj.creativeId,
        dealId: responseObj.dealId,
        netRevenue: responseObj.netRevenue,
        vastUrl: responseObj.vastUrl,
        renderer: renderer
      }];
    }

    return [{
      requestId: bidRequest.bidId,
      cpm: responseObj.cpm,
      width: responseObj.width,
      height: responseObj.height,
      ad: responseObj.ad,
      ttl: responseObj.ttl,
      currency: responseObj.currency,
      creativeId: responseObj.creativeId,
      dealId: responseObj.dealId,
      netRevenue: responseObj.netRevenue
    }];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[403]);