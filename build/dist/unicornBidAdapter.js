pbjsChunk([73],{

/***/ 770:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(771);


/***/ }),

/***/ 771:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildRequests", function() { return buildRequests; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__ = __webpack_require__(9);




var storage = Object(__WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__["b" /* getStorageManager */])();
var BIDDER_CODE = 'unicorn';
var UNICORN_ENDPOINT = 'https://ds.uncn.jp/pb/0/bid.json';
var UNICORN_DEFAULT_CURRENCY = 'JPY';
var UNICORN_PB_COOKIE_KEY = '__pb_unicorn_aud';
/**
 * Placement ID and Account ID are required.
 * @param {BidRequest} bidRequest
 * @returns {boolean}
 */

var isBidRequestValid = function isBidRequestValid(bidRequest) {
  return !!bidRequest.adUnitCode && !!bidRequest.params.accountId;
};
/**
 * @param {Array<BidRequest>} validBidRequests
 * @param {any} bidderRequest
 * @returns {ServerRequest}
 */


var buildRequests = function buildRequests(validBidRequests, bidderRequest) {
  return {
    method: 'POST',
    url: UNICORN_ENDPOINT,
    data: buildOpenRtbBidRequestPayload(validBidRequests, bidderRequest)
  };
};
/**
 * Transform BidRequest to OpenRTB-formatted BidRequest Object
 * @param {Array<BidRequest>} validBidRequests
 * @param {any} bidderRequest
 * @returns {string}
 */

function buildOpenRtbBidRequestPayload(validBidRequests, bidderRequest) {
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[UNICORN] buildOpenRtbBidRequestPayload.validBidRequests:', validBidRequests);
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[UNICORN] buildOpenRtbBidRequestPayload.bidderRequest:', bidderRequest);
  var imp = validBidRequests.map(function (br) {
    var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](br.sizes)[0];
    return {
      id: br.bidId,
      banner: {
        w: sizes.split('x')[0],
        h: sizes.split('x')[1]
      },
      tagid: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](br, 'params.placementId') || br.adUnitCode,
      secure: 1,
      bidfloor: parseFloat(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](br, 'params.bidfloorCpm') || 0)
    };
  });
  var request = {
    id: bidderRequest.auctionId,
    at: 1,
    imp: imp,
    cur: UNICORN_DEFAULT_CURRENCY,
    site: {
      id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.mediaId') || '',
      publisher: {
        id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.publisherId') || 0
      },
      domain: window.location.hostname,
      page: window.location.href,
      ref: bidderRequest.refererInfo.referer
    },
    device: {
      language: navigator.language,
      ua: navigator.userAgent
    },
    user: {
      id: getUid()
    },
    bcat: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.bcat') || [],
    source: {
      ext: {
        stype: 'prebid_uncn',
        bidder: BIDDER_CODE
      }
    },
    ext: {
      accountId: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.accountId')
    }
  };
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[UNICORN] OpenRTB Formatted Request:', request);
  return JSON.stringify(request);
}

var interpretResponse = function interpretResponse(serverResponse, request) {
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[UNICORN] interpretResponse.serverResponse:', serverResponse);
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[UNICORN] interpretResponse.request:', request);
  var res = serverResponse.body;
  var bids = [];

  if (res) {
    res.seatbid.forEach(function (sb) {
      sb.bid.forEach(function (b) {
        bids.push({
          requestId: b.impid,
          cpm: b.price || 0,
          width: b.w,
          height: b.h,
          ad: b.adm,
          ttl: 1000,
          creativeId: b.crid,
          netRevenue: false,
          currency: res.cur
        });
      });
    });
  }

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[UNICORN] interpretResponse bids:', bids);
  return bids;
};
/**
 * Get or Create Uid for First Party Cookie
 */


var getUid = function getUid() {
  var ck = storage.getCookie(UNICORN_PB_COOKIE_KEY);

  if (ck) {
    return JSON.parse(ck)['uid'];
  } else {
    var newCk = {
      uid: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["generateUUID"]()
    };
    var expireIn = new Date(Date.now() + 24 * 60 * 60 * 10000).toUTCString();
    storage.setCookie(UNICORN_PB_COOKIE_KEY, JSON.stringify(newCk), expireIn);
    return newCk.uid;
  }
};

var spec = {
  code: BIDDER_CODE,
  aliases: ['uncn'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[770]);