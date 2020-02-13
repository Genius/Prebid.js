pbjsChunk([170],{

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(361);


/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var BIDDER_CODE = 'interactiveOffers';
var BIDDER_ENDPOINT = 'https://connect.interactiveoffers.com/api/endpoint.php';
var TIMEOUT_DEFAULT = 5000;
var spec = {
  code: BIDDER_CODE,
  aliases: ['ino'],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!('params' in bid)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](bid.bidder + ': No required params, please check your settings');
      return false;
    }

    if (!bid.params.pubId) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](bid.bidder + ': No required param pubId, please check your settings');
      return false;
    }

    return true;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var serverRequests = [];

    for (var i = 0; i < validBidRequests.length; i++) {
      var bidRequest = validBidRequests[i];
      var bidRequestParams = bidRequest.params;
      var pubId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('pubId', bidRequestParams); // Loc param is optional but always is sent to endpoint

      var location = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('loc', bidRequestParams);

      if (!location) {
        location = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
      } // Tmax param is optional but always is sent to endpoint


      var tmax = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('tmax', bidRequestParams);

      if (!tmax) {
        tmax = TIMEOUT_DEFAULT;
      }

      serverRequests.push({
        method: 'POST',
        url: BIDDER_ENDPOINT,
        data: _extends({
          'pubId': pubId,
          'bidId': __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"](),
          'loc': location,
          'tmax': tmax,
          'sizes': bidRequest.sizes
        }),
        options: {
          withCredentials: false
        },
        bidRequest: bidRequest
      });
    }

    return serverRequests;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidResponses = [];

    if (!serverResponse || serverResponse.error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](BIDDER_CODE + ': server response error', serverResponse);
      return bidResponses;
    }

    var serverBody = serverResponse.body;

    if (!serverBody || serverBody.success !== 'true') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](BIDDER_CODE + ': empty bid response');
      return bidResponses;
    }

    var serverPayloadData = serverBody.payloadData;

    if (!serverPayloadData || Array.isArray(serverPayloadData)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](BIDDER_CODE + ': server response no data', serverResponse);
      return bidResponses;
    }

    var CPM = serverPayloadData.cpm;

    if (CPM > 0) {
      var bidResponse = {
        requestId: request.bidRequest.bidId,
        cpm: CPM,
        width: serverPayloadData.width,
        height: serverPayloadData.height,
        creativeId: serverPayloadData.bidId,
        ttl: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('_bidderTimeout'),
        referrer: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
        currency: 'USD',
        netRevenue: true,
        ad: serverPayloadData.ad
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[360]);