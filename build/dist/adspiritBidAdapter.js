pbjsChunk([253],{

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(167);


/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var RTB_URL = '/rtb/getbid.php?rtbprovider=prebid';
var SCRIPT_URL = '/adasync.min.js';
var spec = {
  code: 'adspirit',
  aliases: ['xapadsmedia', 'connectad'],
  isBidRequestValid: function isBidRequestValid(bid) {
    var host = spec.getBidderHost(bid);
    if (!host) return false;
    if (!bid.params.placementId) return false;
    return true;
  },
  buildRequests: function buildRequests(validBidRequests) {
    var requests = [];
    var bidRequest;
    var reqUrl;
    var placementId;

    for (var i = 0; i < validBidRequests.length; i++) {
      bidRequest = validBidRequests[i];
      bidRequest.adspiritConId = spec.genAdConId(bidRequest);
      reqUrl = spec.getBidderHost(bidRequest);
      placementId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('placementId', bidRequest.params);
      reqUrl = '//' + reqUrl + RTB_URL + '&pid=' + placementId + '&ref=' + encodeURIComponent(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]()) + '&scx=' + screen.width + '&scy=' + screen.height + '&wcx=' + ('innerWidth' in window ? window.innerWidth : page.clientWidth) + '&wcy=' + ('innerHeight' in window ? window.innerHeight : page.clientHeight) + '&async=' + bidRequest.adspiritConId + '&t=' + Math.round(Math.random() * 100000);
      requests.push({
        method: 'GET',
        url: reqUrl,
        data: {},
        bidRequest: bidRequest
      });
    }

    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var bidObj = bidRequest.bidRequest;

    if (!serverResponse || !serverResponse.body || !bidObj) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]("No valid bids from ".concat(spec.code, " bidder!"));
      return [];
    }

    var adData = serverResponse.body;
    var cpm = adData.cpm;
    if (!cpm) return [];
    var host = spec.getBidderHost(bidObj);
    var adm = '<scr' + 'ipt>window.inDapIF=false</scr' + 'ipt><scr' + 'ipt src="//' + host + SCRIPT_URL + '"></scr' + 'ipt>' + '<ins id="' + bidObj.adspiritConId + '"></ins>' + adData.adm;
    var bidResponse = {
      requestId: bidObj.bidId,
      cpm: cpm,
      width: adData.w,
      height: adData.h,
      creativeId: bidObj.params.placementId,
      currency: 'EUR',
      netRevenue: true,
      ttl: 300,
      ad: adm
    };
    bidResponses.push(bidResponse);
    return bidResponses;
  },
  getBidderHost: function getBidderHost(bid) {
    if (bid.bidder === 'adspirit') return __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('host', bid.params);
    if (bid.bidder === 'connectad') return 'connected-by.connectad.io';
    if (bid.bidder === 'xapadsmedia') return 'dsp.xapads.com';
    return null;
  },
  genAdConId: function genAdConId(bid) {
    return bid.bidder + Math.round(Math.random() * 100000);
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[166]);