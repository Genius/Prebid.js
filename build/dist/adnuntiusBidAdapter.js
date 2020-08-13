pbjsChunk([303],{

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(210);


/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var BIDDER_CODE = 'adnuntius';
var ENDPOINT_URL = 'https://delivery.adnuntius.com/i?tzo=-60&format=json';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.auId || bid.params.member && bid.params.invCode);
  },
  buildRequests: function buildRequests(validBidRequests) {
    var networks = {};
    var bidRequests = {};
    var requests = [];

    for (var i = 0; i < validBidRequests.length; i++) {
      var bid = validBidRequests[i];
      var network = bid.params.network || 'network';
      bidRequests[network] = bidRequests[network] || [];
      bidRequests[network].push(bid);
      networks[network] = networks[network] || {};
      networks[network].adUnits = networks[network].adUnits || [];
      networks[network].adUnits.push(_objectSpread(_objectSpread({}, bid.params.targeting), {}, {
        auId: bid.params.auId
      }));
    }

    var networkKeys = Object.keys(networks);

    for (var j = 0; j < networkKeys.length; j++) {
      var _network = networkKeys[j];
      requests.push({
        method: 'POST',
        url: ENDPOINT_URL,
        data: JSON.stringify(networks[_network]),
        bid: bidRequests[_network]
      });
    }

    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var serverBody = serverResponse.body;

    for (var k = 0; k < serverBody.adUnits.length; k++) {
      var adUnit = serverBody.adUnits[k];

      if (adUnit.matchedAdCount > 0) {
        var bid = adUnit.ads[0];
        bidResponses.push({
          requestId: bidRequest.bid[k].bidId,
          cpm: bid.cpm ? bid.cpm.amount : 0,
          width: Number(bid.creativeWidth),
          height: Number(bid.creativeHeight),
          creativeId: bid.creativeId,
          currency: bid.cpm ? bid.cpm.currency : 'EUR',
          netRevenue: false,
          ttl: 360,
          ad: adUnit.html
        });
      }
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[209]);