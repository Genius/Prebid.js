pbjsChunk([118],{

/***/ 658:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(659);


/***/ }),

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_ajax_js__ = __webpack_require__(4);



var BIDDER_CODE = 'rtbsolutions';
var ENDPOINT_URL = 'https://dsp-eu-lb.rtbsolutions.pro/bid/hb';
var spec = {
  version: '1.0',
  code: BIDDER_CODE,
  aliases: ['rtbss'],
  // short code
  nurls: {},
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.blockId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var _this = this;

    var req = [];
    bidderRequest.bids.forEach(function (item) {
      var width = item.sizes[0][0];
      var height = item.sizes[0][1];
      var imp = {
        referer: bidderRequest.refererInfo.referer,
        ua: navigator.userAgent,
        lang: _this.getLanguage(),
        domain: _this.getDomain(),
        width: width,
        height: height,
        type: 'banner'
      };
      if (item.params.s1 !== undefined) imp.s1 = item.params.s1;
      if (item.params.s2 !== undefined) imp.s2 = item.params.s2;
      if (item.params.s3 !== undefined) imp.s3 = item.params.s3;
      if (item.params.s4 !== undefined) imp.s4 = item.params.s4;
      req.push({
        bid_id: item.bidId,
        block_id: item.params.blockId,
        ver: _this.version,
        imp: imp
      });
    });
    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: req,
      options: {
        contentType: 'application/json'
      }
    };
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var _this2 = this;

    var bidResponses = [];
    serverResponse.body.forEach(function (item) {
      _this2.nurls[item.bid_id] = item.nurl;
      var bidResponse = {
        requestId: item.bid_id,
        cpm: item.cpm,
        width: item.width,
        height: item.height,
        creativeId: item.creative_id,
        currency: item.currency,
        netRevenue: true,
        ttl: 360,
        ad: item.ad
      };
      bidResponses.push(bidResponse);
    });
    return bidResponses;
  },
  onBidWon: function onBidWon(bid) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_ajax_js__["a" /* ajax */])(this.nurls[bid.requestId], null);
  },
  getLanguage: function getLanguage() {
    var language = navigator.language ? 'language' : 'userLanguage';
    var lang2 = navigator[language].split('-')[0];

    if (lang2.length === 2 || lang2.length === 3) {
      return lang2;
    }

    return '';
  },
  getDomain: function getDomain() {
    if (!__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["inIframe"]()) {
      return window.location.hostname;
    }

    var origins = window.document.location.ancestorOrigins;

    if (origins && origins.length > 0) {
      return origins[origins.length - 1];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[658]);