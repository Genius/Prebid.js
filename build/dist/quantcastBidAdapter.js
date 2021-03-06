pbjsChunk([112],{

/***/ 502:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(503);


/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUANTCAST_DOMAIN", function() { return QUANTCAST_DOMAIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUANTCAST_TEST_DOMAIN", function() { return QUANTCAST_TEST_DOMAIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUANTCAST_NET_REVENUE", function() { return QUANTCAST_NET_REVENUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUANTCAST_TEST_PUBLISHER", function() { return QUANTCAST_TEST_PUBLISHER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUANTCAST_TTL", function() { return QUANTCAST_TTL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUANTCAST_PROTOCOL", function() { return QUANTCAST_PROTOCOL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUANTCAST_PORT", function() { return QUANTCAST_PORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__ = __webpack_require__(1);




var BIDDER_CODE = 'quantcast';
var DEFAULT_BID_FLOOR = 0.0000000001;
var QUANTCAST_DOMAIN = 'qcx.quantserve.com';
var QUANTCAST_TEST_DOMAIN = 's2s-canary.quantserve.com';
var QUANTCAST_NET_REVENUE = true;
var QUANTCAST_TEST_PUBLISHER = 'test-publisher';
var QUANTCAST_TTL = 4;
var QUANTCAST_PROTOCOL = window.location.protocol === 'http:' ? 'http' : 'https';
var QUANTCAST_PORT = QUANTCAST_PROTOCOL === 'http' ? '8080' : '8443';

function extractBidSizes(bid) {
  var bidSizes = [];
  bid.sizes.forEach(function (size) {
    bidSizes.push({
      width: size[0],
      height: size[1]
    });
  });
  return bidSizes;
}

function makeVideoImp(bid) {
  var video = {};

  if (bid.params.video) {
    video['mimes'] = bid.params.video.mimes;
    video['minduration'] = bid.params.video.minduration;
    video['maxduration'] = bid.params.video.maxduration;
    video['protocols'] = bid.params.video.protocols;
    video['startdelay'] = bid.params.video.startdelay;
    video['linearity'] = bid.params.video.linearity;
    video['battr'] = bid.params.video.battr;
    video['maxbitrate'] = bid.params.video.maxbitrate;
    video['playbackmethod'] = bid.params.video.playbackmethod;
    video['delivery'] = bid.params.video.delivery;
    video['placement'] = bid.params.video.placement;
    video['api'] = bid.params.video.api;
  }

  if (bid.mediaTypes.video.mimes) {
    video['mimes'] = bid.mediaTypes.video.mimes;
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bid.mediaTypes.video.playerSize[0])) {
    video['w'] = bid.mediaTypes.video.playerSize[0][0];
    video['h'] = bid.mediaTypes.video.playerSize[0][1];
  } else {
    video['w'] = bid.mediaTypes.video.playerSize[0];
    video['h'] = bid.mediaTypes.video.playerSize[1];
  }

  return {
    video: video,
    placementCode: bid.placementCode,
    bidFloor: bid.params.bidFloor || DEFAULT_BID_FLOOR
  };
}

function makeBannerImp(bid) {
  return {
    banner: {
      battr: bid.params.battr,
      sizes: extractBidSizes(bid)
    },
    placementCode: bid.placementCode,
    bidFloor: bid.params.bidFloor || DEFAULT_BID_FLOOR
  };
}

function getDomain(url) {
  if (!url) {
    return url;
  }

  return url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];
}
/**
 * The documentation for Prebid.js Adapter 1.0 can be found at link below,
 * http://prebid.org/dev-docs/bidder-adapter-1.html
 */


var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['banner', 'video'],

  /**
   * Verify the `AdUnits.bids` response with `true` for valid request and `false`
   * for invalid request.
   *
   * @param {object} bid
   * @return boolean `true` is this is a valid bid, and `false` otherwise
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.publisherId;
  },

  /**
   * Make a server request when the page asks Prebid.js for bids from a list of
   * `BidRequests`.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be send to Quantcast server
   * @param bidderRequest
   * @return ServerRequest information describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var bids = bidRequests || [];
    var gdprConsent = bidderRequest && bidderRequest.gdprConsent ? bidderRequest.gdprConsent : {};
    var referrer = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidderRequest, 'refererInfo.referer');
    var page = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidderRequest, 'refererInfo.canonicalUrl') || __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('pageUrl') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](window, 'location.href');
    var domain = getDomain(page);
    var bidRequestsList = [];
    bids.forEach(function (bid) {
      var imp;

      if (bid.mediaTypes) {
        if (bid.mediaTypes.video && bid.mediaTypes.video.context === 'instream') {
          imp = makeVideoImp(bid);
        } else if (bid.mediaTypes.banner) {
          imp = makeBannerImp(bid);
        } else {
          // Unsupported mediaType
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]("".concat(BIDDER_CODE, ": No supported mediaTypes found in ").concat(JSON.stringify(bid.mediaTypes)));
          return;
        }
      } else {
        // Parse as banner by default
        imp = makeBannerImp(bid);
      } // Request Data Format can be found at https://wiki.corp.qc/display/adinf/QCX


      var requestData = {
        publisherId: bid.params.publisherId,
        requestId: bid.bidId,
        imp: [imp],
        site: {
          page: page,
          referrer: referrer,
          domain: domain
        },
        bidId: bid.bidId,
        gdprSignal: gdprConsent.gdprApplies ? 1 : 0,
        gdprConsent: gdprConsent.consentString,
        prebidJsVersion: "2.37.0"
      };
      var data = JSON.stringify(requestData);
      var qcDomain = bid.params.publisherId === QUANTCAST_TEST_PUBLISHER ? QUANTCAST_TEST_DOMAIN : QUANTCAST_DOMAIN;
      var url = "".concat(QUANTCAST_PROTOCOL, "://").concat(qcDomain, ":").concat(QUANTCAST_PORT, "/qchb");
      bidRequestsList.push({
        data: data,
        method: 'POST',
        url: url
      });
    });
    return bidRequestsList;
  },

  /**
   * Function get called when the browser has received the response from Quantcast server.
   * The function parse the response and create a `bidResponse` object containing one/more bids.
   * Returns an empty array if no valid bids
   *
   * Response Data Format can be found at https://wiki.corp.qc/display/adinf/QCX
   *
   * @param {*} serverResponse A successful response from Quantcast server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   *
   */
  interpretResponse: function interpretResponse(serverResponse) {
    if (serverResponse === undefined) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Server Response is undefined');
      return [];
    }

    var response = serverResponse['body'];

    if (response === undefined || !response.hasOwnProperty('bids') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](response.bids)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Sub-optimal JSON received from Quantcast server');
      return [];
    }

    var bidResponsesList = response.bids.map(function (bid) {
      var ad = bid.ad,
          cpm = bid.cpm,
          width = bid.width,
          height = bid.height,
          creativeId = bid.creativeId,
          currency = bid.currency,
          videoUrl = bid.videoUrl,
          dealId = bid.dealId;
      var result = {
        requestId: response.requestId,
        cpm: cpm,
        width: width,
        height: height,
        ad: ad,
        ttl: QUANTCAST_TTL,
        creativeId: creativeId,
        netRevenue: QUANTCAST_NET_REVENUE,
        currency: currency
      };

      if (videoUrl !== undefined && videoUrl) {
        result['vastUrl'] = videoUrl;
        result['mediaType'] = 'video';
      }

      if (dealId !== undefined && dealId) {
        result['dealId'] = dealId;
      }

      return result;
    });
    return bidResponsesList;
  },
  onTimeout: function onTimeout(timeoutData) {
    var url = "".concat(QUANTCAST_PROTOCOL, "://").concat(QUANTCAST_DOMAIN, ":").concat(QUANTCAST_PORT, "/qchb_notify?type=timeout");
    Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax__["a" /* ajax */])(url, null, null);
  }
};
Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[502]);