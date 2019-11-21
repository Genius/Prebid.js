pbjsChunk([58],{

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(66);
module.exports = __webpack_require__(67);


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _bidderFactory = __webpack_require__(6);

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

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

var spec = exports.spec = {
  code: A4G_BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return bid.params && !!bid.params.zoneId;
  },

  buildRequests: function buildRequests(validBidRequests) {
    var _data;

    var deliveryUrl = '';
    var bidId = '';
    var idParams = [];
    var sizeParams = [];
    var zoneIds = [];

    utils._each(validBidRequests, (function (bid) {
      if (!deliveryUrl && typeof bid.params.deliveryUrl === 'string') {
        deliveryUrl = bid.params.deliveryUrl;
      }
      if (!bidId) {
        bidId = bid.bidId;
      }
      idParams.push(bid.placementCode);
      sizeParams.push(bid.sizes.map((function (size) {
        return size.join(SIZE_SEPARATOR);
      })).join(ARRAY_SIZE_SEPARATOR));
      zoneIds.push(bid.params.zoneId);
    }));

    if (!deliveryUrl) {
      deliveryUrl = A4G_DEFAULT_BID_URL;
    }

    return {
      method: 'GET',
      url: deliveryUrl,
      bidId: bidId,
      data: (_data = {}, _defineProperty(_data, IFRAME_PARAM_NAME, 0), _defineProperty(_data, LOCATION_PARAM_NAME, utils.getTopWindowUrl()), _defineProperty(_data, SIZE_PARAM_NAME, sizeParams.join(ARRAY_PARAM_SEPARATOR)), _defineProperty(_data, ID_PARAM_NAME, idParams.join(ARRAY_PARAM_SEPARATOR)), _defineProperty(_data, ZONE_ID_PARAM_NAME, zoneIds.join(ARRAY_PARAM_SEPARATOR)), _data)
    };
  },

  interpretResponse: function interpretResponse(serverResponses, request) {
    var bidResponses = [];
    utils._each(serverResponses.body, (function (response) {
      var bidResponse = {
        requestId: request.bidId,
        cpm: response.cpm,
        width: response.width,
        height: response.height,
        creativeId: response.zoneid,
        currency: A4G_CURRENCY,
        netRevenue: true,
        ttl: A4G_TTL,
        ad: response.ad
      };
      bidResponses.push(bidResponse);
    }));

    return bidResponses;
  }
};

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 67:
/***/ (function(module, exports) {



/***/ })

},[65]);