pbjsChunk([300],{

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(220);


/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDPOINT_PROTOCOL", function() { return ENDPOINT_PROTOCOL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDPOINT_DOMAIN", function() { return ENDPOINT_DOMAIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDPOINT_PATH", function() { return ENDPOINT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_ajax_js__ = __webpack_require__(4);



var BIDDER_CODE = 'adpartner';
var ENDPOINT_PROTOCOL = 'https';
var ENDPOINT_DOMAIN = 'a4p.adpartner.pro';
var ENDPOINT_PATH = '/hb/bid';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return !!parseInt(bidRequest.params.unitId);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var referer = window.location.href;

    try {
      referer = typeof bidderRequest.refererInfo === 'undefined' ? window.top.location.href : bidderRequest.refererInfo.referer;
    } catch (e) {}

    var bidRequests = [];
    var beaconParams = {
      tag: [],
      sizes: [],
      referer: ''
    };
    validBidRequests.forEach(function (validBidRequest) {
      bidRequests.push({
        unitId: parseInt(validBidRequest.params.unitId),
        adUnitCode: validBidRequest.adUnitCode,
        sizes: validBidRequest.sizes,
        bidId: validBidRequest.bidId,
        referer: referer
      });
      beaconParams.tag.push(validBidRequest.params.unitId);
      beaconParams.sizes.push(spec.joinSizesToString(validBidRequest.sizes));
      beaconParams.referer = encodeURIComponent(referer);
    });
    beaconParams.tag = beaconParams.tag.join(',');
    beaconParams.sizes = beaconParams.sizes.join(',');
    var adPartnerRequestUrl = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["buildUrl"]({
      protocol: ENDPOINT_PROTOCOL,
      hostname: ENDPOINT_DOMAIN,
      pathname: ENDPOINT_PATH,
      search: beaconParams
    });
    return {
      method: 'POST',
      url: adPartnerRequestUrl,
      data: JSON.stringify(bidRequests)
    };
  },
  joinSizesToString: function joinSizesToString(sizes) {
    var res = [];
    sizes.forEach(function (size) {
      res.push(size.join('x'));
    });
    return res.join('|');
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var validBids = JSON.parse(bidRequest.data);

    if (typeof serverResponse.body === 'undefined') {
      return [];
    }

    return validBids.map(function (bid) {
      return {
        bid: bid,
        ad: serverResponse.body[bid.adUnitCode]
      };
    }).filter(function (item) {
      return item.ad;
    }).map(function (item) {
      return spec.adResponse(item.bid, item.ad);
    });
  },
  adResponse: function adResponse(bid, ad) {
    return {
      requestId: bid.bidId,
      ad: ad.ad,
      cpm: ad.cpm,
      width: ad.width,
      height: ad.height,
      ttl: 60,
      creativeId: ad.creativeId,
      netRevenue: ad.netRevenue,
      currency: ad.currency,
      winNotification: ad.winNotification
    };
  },
  onBidWon: function onBidWon(data) {
    data.winNotification.forEach(function (unitWon) {
      var adPartnerBidWonUrl = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["buildUrl"]({
        protocol: ENDPOINT_PROTOCOL,
        hostname: ENDPOINT_DOMAIN,
        pathname: unitWon.path
      });

      if (unitWon.method === 'POST') {
        spec.postRequest(adPartnerBidWonUrl, JSON.stringify(unitWon.data));
      }
    });
    return true;
  },
  postRequest: function postRequest(endpoint, data) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_ajax_js__["a" /* ajax */])(endpoint, null, data, {
      method: 'POST'
    });
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[219]);