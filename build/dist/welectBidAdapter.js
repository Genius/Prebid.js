pbjsChunk([57],{

/***/ 804:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(805);


/***/ }),

/***/ 805:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var BIDDER_CODE = 'welect';
var DEFAULT_DOMAIN = 'www.welect.de';
var spec = {
  code: BIDDER_CODE,
  aliases: ['wlt'],
  supportedMediaTypes: ['video'],
  // short code

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.context') === 'instream' && !!bid.params.placementId;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests) {
    return validBidRequests.map(function (bidRequest) {
      var rawSizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.playerSize') || bidRequest.sizes;
      var size = rawSizes[0];
      var domain = bidRequest.params.domain || DEFAULT_DOMAIN;
      var url = "https://".concat(domain, "/api/v2/preflight/by_alias/").concat(bidRequest.params.placementId);
      var gdprConsent = null;

      if (bidRequest && bidRequest.gdprConsent) {
        gdprConsent = {
          gdpr_consent: {
            gdpr_applies: bidRequest.gdprConsent.gdprApplies,
            gdpr_consent: bidRequest.gdprConsent.gdprConsent
          }
        };
      }

      var data = _objectSpread({
        width: size[0],
        height: size[1],
        bid_id: bidRequest.bidId
      }, gdprConsent);

      return {
        method: 'POST',
        url: url,
        data: data,
        options: {
          contentType: 'application/json',
          withCredentials: false,
          crossOrigin: true
        }
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var responseBody = serverResponse.body;

    if (_typeof(responseBody) !== 'object' || responseBody.available !== true) {
      return [];
    }

    var bidResponses = [];
    var bidResponse = responseBody.bidResponse;
    bidResponses.push(bidResponse);
    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[804]);