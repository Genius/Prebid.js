pbjsChunk([201],{

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(293);


/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var BIDDER_CODE = 'dspx';
var ENDPOINT_URL = 'https://buyer.dspx.tv/request/';
var spec = {
  code: BIDDER_CODE,
  aliases: ['dspx'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placement;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bidRequest) {
      var params = bidRequest.params;
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bidRequest.sizes)[0];
      var width = sizes.split('x')[0];
      var height = sizes.split('x')[1];
      var placementId = params.placement;
      var rnd = Math.floor(Math.random() * 99999999999);
      var referrer = encodeURIComponent(bidderRequest.refererInfo.referer);
      var bidId = bidRequest.bidId;
      var payload = {
        _f: 'html',
        alternative: 'prebid_js',
        inventory_item_id: placementId,
        srw: width,
        srh: height,
        idt: 100,
        rnd: rnd,
        ref: referrer,
        bid_id: bidId
      };

      if (params.pfilter !== undefined) {
        payload.pfilter = params.pfilter;
      }

      if (params.bcat !== undefined) {
        payload.bcat = params.bcat;
      }

      if (params.dvt !== undefined) {
        payload.dvt = params.dvt;
      }

      return {
        method: 'GET',
        url: ENDPOINT_URL,
        data: objectToQueryString(payload)
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var response = serverResponse.body;
    var crid = response.crid || 0;
    var cpm = response.cpm / 1000000 || 0;

    if (cpm !== 0 && crid !== 0) {
      var dealId = response.dealid || '';
      var currency = response.currency || 'EUR';
      var netRevenue = response.netRevenue === undefined ? true : response.netRevenue;
      var referrer = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
      var bidResponse = {
        requestId: response.bid_id,
        cpm: cpm,
        width: response.width,
        height: response.height,
        creativeId: crid,
        dealId: dealId,
        currency: currency,
        netRevenue: netRevenue,
        ttl: __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('_bidderTimeout'),
        referrer: referrer,
        ad: response.adTag
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};

function objectToQueryString(obj, prefix) {
  var str = [];
  var p;

  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p;
      var v = obj[p];
      str.push(v !== null && _typeof(v) === 'object' ? objectToQueryString(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }

  return str.join('&');
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[292]);