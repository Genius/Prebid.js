pbjsChunk([251],{

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(332);


/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);




var BIDDER_CODE = 'colombia';
var ENDPOINT_URL = 'https://ade.clmbtech.com/cde/prebid.htm';
var HOST_NAME = document.location.protocol + '//' + window.location.host;
var spec = {
  code: BIDDER_CODE,
  aliases: ['clmb'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bidRequest) {
      var params = bidRequest.params;
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bidRequest.sizes)[0];
      var width = sizes.split('x')[0];
      var height = sizes.split('x')[1];
      var placementId = params.placementId;
      var cb = Math.floor(Math.random() * 99999999999);
      var bidId = bidRequest.bidId;
      var referrer = bidderRequest && bidderRequest.refererInfo ? bidderRequest.refererInfo.referer : '';
      var payload = {
        v: 'hb1',
        p: placementId,
        w: width,
        h: height,
        cb: cb,
        r: referrer,
        uid: bidId,
        t: 'i',
        d: HOST_NAME
      };
      return {
        method: 'POST',
        url: ENDPOINT_URL,
        data: payload
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var response = serverResponse.body;
    var crid = response.creativeId || 0;
    var width = response.width || 0;
    var height = response.height || 0;
    var cpm = response.cpm || 0;

    if (width == 300 && height == 250) {
      cpm = cpm * 0.2;
    }

    if (width == 320 && height == 50) {
      cpm = cpm * 0.55;
    }

    if (cpm <= 0) {
      return bidResponses;
    }

    if (width !== 0 && height !== 0 && cpm !== 0 && crid !== 0) {
      var dealId = response.dealid || '';
      var currency = response.currency || 'USD';
      var netRevenue = response.netRevenue === undefined ? true : response.netRevenue;
      var bidResponse = {
        requestId: bidRequest.data.uid,
        cpm: cpm,
        width: response.width,
        height: response.height,
        creativeId: crid,
        dealId: dealId,
        currency: currency,
        netRevenue: netRevenue,
        ttl: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('_bidderTimeout'),
        referrer: bidRequest.data.r,
        ad: response.ad
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[331]);