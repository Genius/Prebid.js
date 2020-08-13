pbjsChunk([312],{

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(190);


/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);



var BIDDER_CODE = 'adglare';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    var p = bid.params;
    if (typeof p.domain === 'string' && !!p.domain.length && p.zID && !isNaN(p.zID) && p.type == 'banner') return true;
    return false;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var i;
    var j;
    var bidRequest;
    var zID;
    var domain;
    var keywords;
    var url;
    var type;
    var availscreen = window.innerWidth + 'x' + window.innerHeight;
    var pixelRatio = window.devicePixelRatio || 1;
    var screen = pixelRatio * window.screen.width + 'x' + pixelRatio * window.screen.height;
    var sizes = [];
    var serverRequests = [];
    var timeout = bidderRequest.timeout || 0;
    var referer = bidderRequest.refererInfo.referer || '';
    var reachedtop = bidderRequest.refererInfo.reachedTop || '';

    for (i = 0; i < validBidRequests.length; i++) {
      bidRequest = validBidRequests[i];
      zID = bidRequest.params.zID;
      domain = bidRequest.params.domain;
      keywords = bidRequest.params.keywords || '';
      type = bidRequest.params.type; // Build ad unit sizes

      if (bidRequest.mediaTypes && bidRequest.mediaTypes[type]) {
        for (j in bidRequest.mediaTypes[type].sizes) {
          sizes.push(bidRequest.mediaTypes[type].sizes[j].join('x'));
        }
      } // Build URL


      url = 'https://' + domain + '/?' + encodeURIComponent(zID) + '&pbjs&pbjs_version=1';
      url += '&pbjs_type=' + encodeURIComponent(type);
      url += '&pbjs_timeout=' + encodeURIComponent(timeout);
      url += '&pbjs_reachedtop=' + encodeURIComponent(reachedtop);
      url += '&sizes=' + encodeURIComponent(sizes.join(','));
      url += '&screen=' + encodeURIComponent(screen);
      url += '&availscreen=' + encodeURIComponent(availscreen);
      url += '&referer=' + encodeURIComponent(referer);

      if (keywords !== '') {
        url += '&keywords=' + encodeURIComponent(keywords);
      } // Push server request


      serverRequests.push({
        method: 'GET',
        url: url,
        data: {},
        bidRequest: bidRequest
      });
    }

    return serverRequests;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidObj = request.bidRequest;
    var bidResponses = [];
    var bidResponse = {};
    serverResponse = serverResponse.body;

    if (serverResponse && serverResponse.status == 'OK' && bidObj) {
      bidResponse.requestId = bidObj.bidId;
      bidResponse.bidderCode = bidObj.bidder;
      bidResponse.cpm = serverResponse.cpm;
      bidResponse.width = serverResponse.width;
      bidResponse.height = serverResponse.height;
      bidResponse.ad = serverResponse.adhtml;
      bidResponse.ttl = serverResponse.ttl;
      bidResponse.creativeId = serverResponse.crID;
      bidResponse.netRevenue = true;
      bidResponse.currency = serverResponse.currency;
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[189]);