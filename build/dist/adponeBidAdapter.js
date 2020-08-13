pbjsChunk([298],{

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(226);


/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var ADPONE_CODE = 'adpone';
var ADPONE_ENDPOINT = 'https://rtb.adpone.com/bid-request';
var ADPONE_SYNC_ENDPOINT = 'https://eu-ads.adpone.com';
var ADPONE_REQUEST_METHOD = 'POST';
var ADPONE_CURRENCY = 'EUR';

function _createSync() {
  return {
    type: 'iframe',
    url: ADPONE_SYNC_ENDPOINT
  };
}

function getUserSyncs(syncOptions) {
  return syncOptions && syncOptions.iframeEnabled ? _createSync() : [];
}

var spec = {
  code: ADPONE_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["b" /* BANNER */]],
  getUserSyncs: getUserSyncs,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId && !!bid.bidId && bid.bidder === 'adpone';
  },
  buildRequests: function buildRequests(bidRequests) {
    return bidRequests.map(function (bid) {
      var url = ADPONE_ENDPOINT + '?pid=' + bid.params.placementId;
      var data = {
        at: 1,
        id: bid.bidId,
        imp: bid.sizes.map(function (size, index) {
          return {
            id: bid.bidId + '_' + index,
            banner: {
              w: size[0],
              h: size[1]
            }
          };
        })
      };
      var options = {
        withCredentials: true
      };
      return {
        method: ADPONE_REQUEST_METHOD,
        url: url,
        data: data,
        options: options
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    if (!serverResponse || !serverResponse.body) {
      return [];
    }

    var answer = [];
    serverResponse.body.seatbid.forEach(function (seatbid) {
      if (seatbid.bid.length) {
        answer = [].concat(_toConsumableArray(answer), _toConsumableArray(seatbid.bid.filter(function (bid) {
          return bid.price > 0;
        }).map(function (bid) {
          return {
            id: bid.id,
            requestId: bidRequest.data.id,
            cpm: bid.price,
            ad: bid.adm,
            width: bid.w || 0,
            height: bid.h || 0,
            currency: serverResponse.body.cur || ADPONE_CURRENCY,
            netRevenue: true,
            ttl: 300,
            creativeId: bid.crid || 0
          };
        })));
      }
    });
    return answer;
  },
  onBidWon: function onBidWon(bid) {
    var bidString = JSON.stringify(bid);
    var encodedBuf = window.btoa(bidString);
    Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["triggerPixel"])("https://rtb.adpone.com/prebid/analytics?q=".concat(encodedBuf));
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[225]);