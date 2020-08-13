pbjsChunk([109],{

/***/ 680:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(681);


/***/ }),

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var spec = {
  code: 'sekindoUM',
  supportedMediaTypes: ['banner', 'video'],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid.mediaType == 'video' || _typeof(bid.mediaTypes) == 'object' && _typeof(bid.mediaTypes.video) == 'object') {
      if (_typeof(bid.params.video) != 'object' || typeof bid.params.video.playerWidth == 'undefined' || typeof bid.params.video.playerHeight == 'undefined') {
        return false;
      }
    }

    return !!bid.params.spaceId;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var pubUrl = null;

    try {
      if (window.top == window) {
        pubUrl = window.location.href;
      } else {
        try {
          pubUrl = window.top.location.href;
        } catch (e2) {
          pubUrl = document.referrer;
        }
      }
    } catch (e1) {}

    return validBidRequests.map(function (bidRequest) {
      var subId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('subId', bidRequest.params);
      var spaceId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('spaceId', bidRequest.params);
      var bidfloor = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('bidfloor', bidRequest.params);
      var protocol = document.location.protocol === 'https:' ? 's' : '';
      var queryString = '';
      queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 's', spaceId);
      queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'subId', subId);
      queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'pubUrl', pubUrl);
      queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'hbTId', bidRequest.transactionId);
      queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'hbBidId', bidRequest.bidId);
      queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'hbver', '4');
      queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'hbcb', '1'); /// legasy

      queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'dcpmflr', bidfloor);
      queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'protocol', protocol);
      queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'x', bidRequest.params.width);
      queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'y', bidRequest.params.height);

      if (bidderRequest && bidderRequest.gdprConsent) {
        queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'gdprConsent', bidderRequest.gdprConsent.consentString);
        queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'gdpr', bidderRequest.gdprConsent.gdprApplies ? '1' : '0');
      }

      if (bidRequest.mediaType === 'video' || _typeof(bidRequest.mediaTypes) == 'object' && _typeof(bidRequest.mediaTypes.video) == 'object') {
        queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'x', bidRequest.params.playerWidth);
        queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'y', bidRequest.params.playerHeight);

        if (typeof vid_vastType != 'undefined') {
          // eslint-disable-line camelcase
          queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'vid_vastType', bidRequest.params.vid_vastType);
        }

        if (_typeof(bidRequest.mediaTypes) == 'object' && _typeof(bidRequest.mediaTypes.video) == 'object' && typeof bidRequest.mediaTypes.video.context == 'string') {
          queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](queryString, 'vid_context', bidRequest.mediaTypes.video.context);
        }
      }

      var endpointUrl = 'https' + '://hb.sekindo.com/live/liveView.php';
      return {
        method: 'GET',
        url: endpointUrl,
        data: queryString
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    if (_typeof(serverResponse) !== 'object') {
      return [];
    }

    var bidResponses = [];
    var bidResponse = {
      requestId: serverResponse.body.id,
      bidderCode: spec.code,
      cpm: serverResponse.body.cpm,
      width: serverResponse.body.width,
      height: serverResponse.body.height,
      creativeId: serverResponse.body.creativeId,
      currency: serverResponse.body.currency,
      netRevenue: serverResponse.body.netRevenue,
      ttl: serverResponse.body.ttl
    };

    if (bidRequest.mediaType == 'video') {
      if (typeof serverResponse.body.vastUrl != 'undefined') {
        bidResponse.vastUrl = serverResponse.body.vastUrl;
      } else {
        bidResponse.vastXml = serverResponse.body.vastXml;
      }
    } else {
      bidResponse.ad = serverResponse.body.ad;
    }

    bidResponses.push(bidResponse);
    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[680]);