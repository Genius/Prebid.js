pbjsChunk([144],{

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(586);


/***/ }),

/***/ 586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);


var CLIENT = 'hellboy:v0.0.1';
var BIDDER_CODE = 'performax';
var BIDDER_SHORT_CODE = 'px';
var ENDPOINT = 'https://dale.performax.cz/hb';
var spec = {
  code: BIDDER_CODE,
  aliases: [BIDDER_SHORT_CODE],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.slotId;
  },
  buildUrl: function buildUrl(validBidRequests, bidderRequest) {
    var slotIds = validBidRequests.map(function (request) {
      return request.params.slotId;
    });
    var url = ["".concat(ENDPOINT, "?slotId[]=").concat(slotIds.join())];
    url.push('client=' + CLIENT);
    url.push('auctionId=' + bidderRequest.auctionId);
    return url.join('&');
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return {
      method: 'POST',
      url: this.buildUrl(validBidRequests, bidderRequest),
      data: {
        'validBidRequests': validBidRequests,
        'bidderRequest': bidderRequest
      },
      options: {
        contentType: 'application/json'
      }
    };
  },
  buildHtml: function buildHtml(ad) {
    var keys = Object.keys(ad.data || {});
    return ad.code.replace(new RegExp('\\$(' + keys.join('|') + ')\\$', 'g'), function (matched, key) {
      return ad.data[key] || matched;
    });
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidResponses = [];

    for (var i = 0; i < serverResponse.body.length; i++) {
      var ad = serverResponse.body[i].ad;

      if (ad.type === 'empty') {
        Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"])("One of ads is empty (reason=".concat(ad.reason, ")"));
        continue;
      }

      serverResponse.body[i].ad = this.buildHtml(ad);
      bidResponses.push(serverResponse.body[i]);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[585]);