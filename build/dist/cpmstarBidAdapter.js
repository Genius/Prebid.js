pbjsChunk([212],{

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(264);


/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'cpmstar';
var ENDPOINT_DEV = '//dev.server.cpmstar.com/view.aspx';
var ENDPOINT_STAGING = '//staging.server.cpmstar.com/view.aspx';
var ENDPOINT_PRODUCTION = '//server.cpmstar.com/view.aspx';
var DEFAULT_TTL = 300;
var DEFAULT_CURRENCY = 'USD';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],
  pageID: Math.floor(Math.random() * 10e6),
  getMediaType: function getMediaType(bidRequest) {
    if (bidRequest == null) return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */];
    return !__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video') ? __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */] : __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */];
  },
  getPlayerSize: function getPlayerSize(bidRequest) {
    var playerSize = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video.playerSize');
    if (playerSize == null) return [640, 440];
    if (playerSize[0] != null) playerSize = playerSize[0];
    if (playerSize == null || playerSize[0] == null || playerSize[1] == null) return [640, 440];
    return playerSize;
  },
  isBidRequestValid: function isBidRequestValid(bid) {
    return typeof bid.params.placementId === 'string' && !!bid.params.placementId.length || typeof bid.params.placementId === 'number';
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var requests = []; // This reference to window.top can cause issues when loaded in an iframe if not protected with a try/catch.

    for (var i = 0; i < validBidRequests.length; i++) {
      var bidRequest = validBidRequests[i];
      var referer = encodeURIComponent(bidderRequest.refererInfo.referer);
      var e = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('endpoint', bidRequest.params);
      var ENDPOINT = e == 'dev' ? ENDPOINT_DEV : e == 'staging' ? ENDPOINT_STAGING : ENDPOINT_PRODUCTION;
      var mediaType = spec.getMediaType(bidRequest);
      var playerSize = spec.getPlayerSize(bidRequest);
      var videoArgs = '&fv=0' + (playerSize ? '&w=' + playerSize[0] + '&h=' + playerSize[1] : '');
      requests.push({
        method: 'GET',
        url: ENDPOINT + '?media=' + mediaType + (mediaType == __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */] ? videoArgs : '') + '&json=c_b&mv=1&poolid=' + __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('placementId', bidRequest.params) + '&reachedTop=' + encodeURIComponent(bidderRequest.refererInfo.reachedTop) + '&requestid=' + bidRequest.bidId + '&referer=' + referer,
        bidRequest: bidRequest
      });
    }

    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidRequest = request.bidRequest;
    var mediaType = spec.getMediaType(bidRequest);
    var bidResponses = [];

    if (!Array.isArray(serverResponse.body)) {
      serverResponse.body = [serverResponse.body];
    }

    for (var i = 0; i < serverResponse.body.length; i++) {
      var raw = serverResponse.body[i];
      var rawBid = raw.creatives[0];

      if (!rawBid) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('cpmstarBidAdapter: server response failed check');
        return;
      }

      var cpm = parseFloat(rawBid.cpm) || 0;

      if (!cpm) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('cpmstarBidAdapter: server response failed check. Missing cpm');
        return;
      }

      var bidResponse = {
        requestId: rawBid.requestid,
        cpm: cpm,
        width: rawBid.width || 0,
        height: rawBid.height || 0,
        currency: rawBid.currency ? rawBid.currency : DEFAULT_CURRENCY,
        netRevenue: rawBid.netRevenue ? rawBid.netRevenue : true,
        ttl: rawBid.ttl ? rawBid.ttl : DEFAULT_TTL,
        creativeId: rawBid.creativeid || 0
      };

      if (rawBid.hasOwnProperty('dealId')) {
        bidResponse.dealId = rawBid.dealId;
      }

      if (mediaType == __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */] && rawBid.code) {
        bidResponse.ad = rawBid.code + (rawBid.px_cr ? "\n<img width=0 height=0 src='" + rawBid.px_cr + "' />" : '');
      } else if (mediaType == __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */] && rawBid.creativemacros && rawBid.creativemacros.HTML5VID_VASTSTRING) {
        var playerSize = spec.getPlayerSize(bidRequest);

        if (playerSize != null) {
          bidResponse.width = playerSize[0];
          bidResponse.height = playerSize[1];
        }

        bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */];
        bidResponse.vastXml = rawBid.creativemacros.HTML5VID_VASTSTRING;
      } else {
        return __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('bad response', rawBid);
      }

      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[263]);