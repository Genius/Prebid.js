pbjsChunk([79],{

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(757);


/***/ }),

/***/ 757:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);




var SUPPORTED_AD_TYPES = [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]];
var BIDDER_CODE = 'truereach';
var BIDDER_URL = 'https://ads.momagic.com/exchange/openrtb25/';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: SUPPORTED_AD_TYPES,
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return bidRequest.params.site_id && bidRequest.params.bidfloor && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.banner') && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.banner.sizes.length') > 0;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    if (validBidRequests.length === 0) {
      return [];
    }

    var queryParams = buildCommonQueryParamsFromBids(validBidRequests, bidderRequest);
    var siteId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.site_id');
    var url = BIDDER_URL + siteId + '?hb=1&transactionId=' + validBidRequests[0].transactionId;
    return {
      method: 'POST',
      url: url,
      data: queryParams,
      options: {
        withCredentials: true
      }
    };
  },
  interpretResponse: function interpretResponse(_ref, serverRequest) {
    var serverResponse = _ref.body;
    var bidResponses = [];

    if (!serverResponse || !serverResponse.id || !serverResponse.seatbid || serverResponse.seatbid.length === 0 || !serverResponse.seatbid[0].bid || serverResponse.seatbid[0].bid.length === 0) {
      return bidResponses;
    }

    var adUnits = serverResponse.seatbid[0].bid;
    var bidderBid = adUnits[0];
    var responseCPM = parseFloat(bidderBid.price);

    if (responseCPM === 0) {
      return bidResponses;
    }

    var responseAd = bidderBid.adm;

    if (bidderBid.nurl) {
      var responseNurl = '<img src="' + bidderBid.nurl + '" height="0px" width="0px">';
      responseAd += responseNurl;
    }

    var bidResponse = {
      requestId: bidderBid.impid,
      cpm: responseCPM,
      currency: serverResponse.cur || 'USD',
      width: parseInt(bidderBid.w),
      height: parseInt(bidderBid.h),
      ad: decodeURIComponent(responseAd),
      ttl: 180,
      creativeId: bidderBid.crid,
      netRevenue: false
    };

    if (bidderBid.adomain && bidderBid.adomain.length) {
      bidResponse.meta = {
        advertiserDomains: bidderBid.adomain
      };
    }

    bidResponses.push(bidResponse);
    return bidResponses;
  }
};

function buildCommonQueryParamsFromBids(validBidRequests, bidderRequest) {
  var adW = 0;
  var adH = 0;
  var adSizes = Array.isArray(validBidRequests[0].params.sizes) ? validBidRequests[0].params.sizes : validBidRequests[0].sizes;
  var sizeArrayLength = adSizes.length;

  if (sizeArrayLength === 2 && typeof adSizes[0] === 'number' && typeof adSizes[1] === 'number') {
    adW = adSizes[0];
    adH = adSizes[1];
  } else {
    adW = adSizes[0][0];
    adH = adSizes[0][1];
  }

  var bidFloor = Number(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.bidfloor'));
  var domain = window.location.host;
  var page = window.location.host + window.location.pathname + location.search + location.hash;
  var defaultParams = {
    id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getUniqueIdentifierStr"](),
    imp: [{
      id: validBidRequests[0].bidId,
      banner: {
        w: adW,
        h: adH
      },
      bidfloor: bidFloor
    }],
    site: {
      domain: domain,
      page: page
    },
    device: {
      ua: window.navigator.userAgent
    },
    tmax: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('bidderTimeout')
  };
  return defaultParams;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[756]);