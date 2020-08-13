pbjsChunk([151],{

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(572);


/***/ }),

/***/ 572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_storageManager_js__ = __webpack_require__(9);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var storage = Object(__WEBPACK_IMPORTED_MODULE_1__src_storageManager_js__["b" /* getStorageManager */])();
var spec = {
  code: 'orbidder',
  orbidderHost: function () {
    var ret = 'https://orbidder.otto.de';

    try {
      ret = storage.getDataFromLocalStorage('ov_orbidder_host') || ret;
    } catch (e) {}

    return ret;
  }(),
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.sizes && bid.bidId && bid.params && bid.params.accountId && typeof bid.params.accountId === 'string' && bid.params.placementId && typeof bid.params.placementId === 'string' && (typeof bid.params.bidfloor === 'undefined' || typeof bid.params.bidfloor === 'number') && (typeof bid.params.profile === 'undefined' || _typeof(bid.params.profile) === 'object'));
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bidRequest) {
      var referer = '';

      if (bidderRequest && bidderRequest.refererInfo) {
        referer = bidderRequest.refererInfo.referer || '';
      }

      var ret = {
        url: "".concat(spec.orbidderHost, "/bid"),
        method: 'POST',
        options: {
          withCredentials: true
        },
        data: {
          v: pbjs.version,
          pageUrl: referer,
          bidId: bidRequest.bidId,
          auctionId: bidRequest.auctionId,
          transactionId: bidRequest.transactionId,
          adUnitCode: bidRequest.adUnitCode,
          bidRequestCount: bidRequest.bidRequestCount,
          sizes: bidRequest.sizes,
          params: bidRequest.params
        }
      };

      if (bidderRequest && bidderRequest.gdprConsent) {
        ret.data.gdprConsent = {
          consentString: bidderRequest.gdprConsent.consentString,
          consentRequired: typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' && bidderRequest.gdprConsent.gdprApplies
        };
      }

      return ret;
    });
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var bidResponses = [];
    serverResponse = serverResponse.body;

    if (serverResponse && serverResponse.length > 0) {
      serverResponse.forEach(function (bid) {
        var bidResponse = {};

        for (var _i = 0, _arr = ['requestId', 'cpm', 'width', 'height', 'ad', 'ttl', 'creativeId', 'netRevenue', 'currency']; _i < _arr.length; _i++) {
          var requiredKey = _arr[_i];

          if (!bid.hasOwnProperty(requiredKey)) {
            return [];
          }

          bidResponse[requiredKey] = bid[requiredKey];
        }

        bidResponses.push(bidResponse);
      });
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[571]);