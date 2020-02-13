pbjsChunk([272],{

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(93);


/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var A4G_BIDDER_CODE = 'a4g';
var A4G_CURRENCY = 'USD';
var A4G_DEFAULT_BID_URL = '//ads.ad4game.com/v1/bid';
var A4G_TTL = 120;
var LOCATION_PARAM_NAME = 'siteurl';
var ID_PARAM_NAME = 'id';
var IFRAME_PARAM_NAME = 'if';
var ZONE_ID_PARAM_NAME = 'zoneId';
var SIZE_PARAM_NAME = 'size';
var ARRAY_PARAM_SEPARATOR = ';';
var ARRAY_SIZE_SEPARATOR = ',';
var SIZE_SEPARATOR = 'x';
var spec = {
  code: A4G_BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return bid.params && !!bid.params.zoneId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var _data;

    var deliveryUrl = '';
    var idParams = [];
    var sizeParams = [];
    var zoneIds = [];

    __WEBPACK_IMPORTED_MODULE_1__src_utils__["_each"](validBidRequests, function (bid) {
      if (!deliveryUrl && typeof bid.params.deliveryUrl === 'string') {
        deliveryUrl = bid.params.deliveryUrl;
      }

      idParams.push(bid.bidId);
      sizeParams.push(bid.sizes.map(function (size) {
        return size.join(SIZE_SEPARATOR);
      }).join(ARRAY_SIZE_SEPARATOR));
      zoneIds.push(bid.params.zoneId);
    });

    if (!deliveryUrl) {
      deliveryUrl = A4G_DEFAULT_BID_URL;
    }

    var data = (_data = {}, _defineProperty(_data, IFRAME_PARAM_NAME, 0), _defineProperty(_data, LOCATION_PARAM_NAME, __WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowUrl"]()), _defineProperty(_data, SIZE_PARAM_NAME, sizeParams.join(ARRAY_PARAM_SEPARATOR)), _defineProperty(_data, ID_PARAM_NAME, idParams.join(ARRAY_PARAM_SEPARATOR)), _defineProperty(_data, ZONE_ID_PARAM_NAME, zoneIds.join(ARRAY_PARAM_SEPARATOR)), _data);

    if (bidderRequest && bidderRequest.gdprConsent) {
      data.gdpr = {
        applies: bidderRequest.gdprConsent.gdprApplies,
        consent: bidderRequest.gdprConsent.consentString
      };
    }

    return {
      method: 'GET',
      url: deliveryUrl,
      data: data
    };
  },
  interpretResponse: function interpretResponse(serverResponses, request) {
    var bidResponses = [];

    __WEBPACK_IMPORTED_MODULE_1__src_utils__["_each"](serverResponses.body, function (response) {
      if (response.cpm > 0) {
        var bidResponse = {
          requestId: response.id,
          creativeId: response.id,
          adId: response.id,
          cpm: response.cpm,
          width: response.width,
          height: response.height,
          currency: A4G_CURRENCY,
          netRevenue: true,
          ttl: A4G_TTL,
          ad: response.ad
        };
        bidResponses.push(bidResponse);
      }
    });

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[92]);