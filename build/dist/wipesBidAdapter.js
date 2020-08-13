pbjsChunk([54],{

/***/ 810:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(811);


/***/ }),

/***/ 811:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);




var BIDDER_CODE = 'wipes';
var ALIAS_BIDDER_CODE = ['wi'];
var SUPPORTED_MEDIA_TYPES = [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]];
var ENDPOINT_URL = 'https://adn-srv.reckoner-api.com/v1/prebid';

function isBidRequestValid(bid) {
  switch (true) {
    case !!bid.params.asid:
      break;

    default:
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("isBidRequestValid Error. ".concat(bid.params, ", please check your implementation."));
      return false;
  }

  return true;
}

function buildRequests(validBidRequests, bidderRequest) {
  return validBidRequests.map(function (bidRequest) {
    var bidId = bidRequest.bidId;
    var params = bidRequest.params;
    var asid = params.asid;
    return {
      method: 'GET',
      url: ENDPOINT_URL,
      data: {
        asid: asid,
        bid_id: bidId
      }
    };
  });
}

function interpretResponse(serverResponse, bidRequest) {
  var bidResponses = [];
  var response = serverResponse.body;
  var cpm = response.cpm || 0;

  if (cpm !== 0) {
    var netRevenue = response.netRevenue === undefined ? true : response.netRevenue;
    var bidResponse = {
      requestId: response.bid_id,
      cpm: cpm,
      width: response.width,
      height: response.height,
      creativeId: response.video_creative_id || 0,
      dealId: response.deal_id,
      currency: 'JPY',
      netRevenue: netRevenue,
      ttl: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('_bidderTimeout'),
      referrer: bidRequest.data.r || '',
      mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */],
      ad: response.ad_tag
    };
    bidResponses.push(bidResponse);
  }

  return bidResponses;
}

var spec = {
  code: BIDDER_CODE,
  aliases: ALIAS_BIDDER_CODE,
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  supportedMediaTypes: SUPPORTED_MEDIA_TYPES
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[810]);