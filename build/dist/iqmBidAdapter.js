pbjsChunk([27],{

/***/ 17:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(365);


/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
 // import {config} from '../src/config';


var BIDDER_CODE = 'iqm';
var ENDPOINT_URL = 'https://pbd.bids.iqm.com';
var VERSION = 'v.1.0.0';
var spec = {
  code: BIDDER_CODE,
  aliases: ['iqm'],
  // short code

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.publisherId && bid.params.placementId && bid.params.tagId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @return ServerRequest Info describing the request to the server.
   * @param validBidRequests - an array of bids
   */
  buildRequests: function buildRequests(validBidRequests) {
    var requestId = '';
    var siteId = '';
    var device = getDevice();
    return validBidRequests.map(function (bid) {
      requestId = bid.requestId;
      var bidfloor = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('bidfloor', bid.params);
      siteId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('tagId', bid.params);
      var imp = {
        id: bid.bidId,
        secure: 1,
        bidfloor: bidfloor || 0,
        displaymanager: 'Prebid.js',
        displaymanagerver: VERSION,
        mediatype: 'banner'
      };
      imp.banner = getSize(bid.sizes);
      var data = {
        id: requestId,
        publisherId: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('publisherId', bid.params),
        tagId: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('tagId', bid.params),
        placementId: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('placementId', bid.params),
        device: device,
        site: {
          id: siteId,
          page: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().href,
          domain: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().host
        },
        imp: imp
      };
      return {
        method: 'POST',
        url: ENDPOINT_URL,
        data: data
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @param bidRequest
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    // const serverBody = serverResponse.body;
    // const headerValue = serverResponse.headers.get('some-response-header')
    var bidResponses = [];
    serverResponse = serverResponse.body;

    if (serverResponse && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](serverResponse.seatbid)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](serverResponse.seatbid, function (bidList) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](bidList.bid, function (bid) {
          var responseCPM = parseFloat(bid.price);

          if (responseCPM > 0.0 && bid.impid) {
            // const responseNurl = bid.nurl || '';
            var bidResponse = {
              requestId: bid.impid,
              currency: serverResponse.cur || 'USD',
              cpm: responseCPM,
              netRevenue: true,
              creativeId: bid.crid || '',
              ad: bid.adm || '',
              width: bid.w || bidRequest.data.imp.banner.w,
              height: bid.h || bidRequest.data.imp.banner.h,
              ttl: bid.ttl || 300
            };
            bidResponses.push(bidResponse);
          }
        });
      });
    }

    return bidResponses;
  }
};

var getDevice = function getDevice() {
  var language = navigator.language ? 'language' : 'userLanguage';
  return {
    h: screen.height,
    w: screen.width,
    dnt: _getDNT() ? 1 : 0,
    language: navigator[language].split('-')[0],
    make: navigator.vendor ? navigator.vendor : '',
    ua: navigator.userAgent,
    devicetype: _isMobile() ? 1 : _isConnectedTV() ? 3 : 2
  };
};

var _getDNT = function _getDNT() {
  return navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.msDoNotTrack === '1' || navigator.doNotTrack === 'yes';
};

var getSize = function getSize(sizes) {
  var sizeMap;

  if (sizes.length === 2 && typeof sizes[0] === 'number' && typeof sizes[1] === 'number') {
    sizeMap = {
      w: sizes[0],
      h: sizes[1]
    };
  } else {
    sizeMap = {
      w: sizes[0][0],
      h: sizes[0][1]
    };
  }

  return sizeMap;
};

function _isMobile() {
  return /(ios|ipod|ipad|iphone|android)/i.test(global.navigator.userAgent);
}

function _isConnectedTV() {
  return /(smart[-]?tv|hbbtv|appletv|googletv|hdmi|netcast\.tv|viera|nettv|roku|\bdtv\b|sonydtv|inettvbrowser|\btv\b)/i.test(global.navigator.userAgent);
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ })

},[364]);