pbjsChunk([261],{

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(119);


/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var BIDDER_CODE = 'adman';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['video', 'banner'],
  isBidRequestValid: function isBidRequestValid(bid) {
    var isValid = _validateId(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'params.id'));

    if (!isValid) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"]('Adman id parameter is required. Bid aborted.');
    }

    return isValid;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var ENDPOINT_URL = '//bidtor.admanmedia.com/prebid';
    var bids = validBidRequests.map(buildRequestObject);
    var payload = {
      referer: __WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowUrl"](),
      bids: bids,
      deviceWidth: screen.width
    };

    if (bidderRequest && bidderRequest.gdprConsent) {
      payload.gdpr = {
        consent: bidderRequest.gdprConsent.consentString,
        applies: bidderRequest.gdprConsent.gdprApplies
      };
    } else {
      payload.gdpr = {
        consent: ''
      };
    }

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: payloadString
    };
  },
  interpretResponse: function interpretResponse(serverResponse) {
    serverResponse = serverResponse.body;

    if (serverResponse && _typeof(serverResponse.bids) === 'object') {
      return serverResponse.bids;
    }

    return [];
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: '//cs.admanmedia.com/sync_tag/html'
      }];
    }
  }
};

function buildRequestObject(bid) {
  return {
    params: {
      id: __WEBPACK_IMPORTED_MODULE_1__src_utils__["getValue"](bid.params, 'id'),
      bidId: bid.bidId
    },
    sizes: bid.sizes,
    bidId: __WEBPACK_IMPORTED_MODULE_1__src_utils__["getBidIdParameter"]('bidId', bid),
    bidderRequestId: __WEBPACK_IMPORTED_MODULE_1__src_utils__["getBidIdParameter"]('bidderRequestId', bid),
    adUnitCode: __WEBPACK_IMPORTED_MODULE_1__src_utils__["getBidIdParameter"]('adUnitCode', bid),
    auctionId: __WEBPACK_IMPORTED_MODULE_1__src_utils__["getBidIdParameter"]('auctionId', bid),
    transactionId: __WEBPACK_IMPORTED_MODULE_1__src_utils__["getBidIdParameter"]('transactionId', bid)
  };
}

function _validateId() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return id.length === 8;
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[118]);