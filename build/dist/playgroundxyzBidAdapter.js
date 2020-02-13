pbjsChunk([21],{

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

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(478);


/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'playgroundxyz';
var URL = 'https://ads.playground.xyz/host-config/prebid?v=2';
var DEFAULT_CURRENCY = 'USD';
var spec = {
  code: BIDDER_CODE,
  aliases: ['playgroundxyz', 'pxyz'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var topLocation = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]();
    var payload = {
      id: bidRequests[0].auctionId,
      site: {
        domain: window.location.protocol + '//' + topLocation.hostname,
        name: topLocation.hostname,
        page: topLocation.href
      },
      device: {
        ua: navigator.userAgent,
        language: navigator.language,
        devicetype: isMobile() ? 1 : isConnectedTV() ? 3 : 2
      },
      imp: bidRequests.map(mapImpression)
    };

    if (bidderRequest && bidderRequest.gdprConsent) {
      payload.user = {
        ext: {
          consent: bidderRequest.gdprConsent.consentString
        }
      };
      var gdpr = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;
      payload.regs = {
        ext: {
          gdpr: gdpr
        }
      };
    }

    return {
      method: 'POST',
      url: URL,
      data: JSON.stringify(payload),
      bidderRequest: bidderRequest
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bidderRequest = _ref.bidderRequest;
    serverResponse = serverResponse.body;
    var bids = [];

    if (!serverResponse || serverResponse.error) {
      var errorMessage = "in response for ".concat(bidderRequest.bidderCode, " adapter");

      if (serverResponse && serverResponse.error) {
        errorMessage += ": ".concat(serverResponse.error);
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](errorMessage);
      }

      return bids;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](serverResponse.seatbid)) {
      var _errorMessage = "in response for ".concat(bidderRequest.bidderCode, " adapter ");

      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](_errorMessage += 'Malformed seatbid response');
      return bids;
    }

    if (!serverResponse.seatbid) {
      return bids;
    }

    var currency = serverResponse.cur || DEFAULT_CURRENCY;
    serverResponse.seatbid.forEach(function (sBid) {
      if (sBid.hasOwnProperty('bid')) {
        sBid.bid.forEach(function (iBid) {
          if (iBid.price !== 0) {
            var bid = newBid(iBid, currency);
            bids.push(bid);
          }
        });
      }
    });
    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    return [{
      type: 'image',
      url: '//ib.adnxs.com/getuidnb?https://ads.playground.xyz/usersync?partner=appnexus&uid=$UID'
    }];
  }
};

function newBid(bid, currency) {
  return {
    requestId: bid.impid,
    mediaType: __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */],
    cpm: bid.price,
    creativeId: bid.adid,
    ad: bid.adm,
    width: bid.w,
    height: bid.h,
    ttl: 300,
    netRevenue: true,
    currency: currency
  };
}

function mapImpression(bid) {
  return {
    id: bid.bidId,
    banner: mapBanner(bid),
    ext: {
      appnexus: {
        placement_id: parseInt(bid.params.placementId, 10)
      },
      pxyz: {
        adapter: {
          vendor: 'prebid',
          prebid: "2.37.0"
        }
      }
    }
  };
}

function mapBanner(bid) {
  return {
    w: parseInt(bid.sizes[0][0], 10),
    h: parseInt(bid.sizes[0][1], 10),
    format: mapSizes(bid.sizes)
  };
}

function mapSizes(bidSizes) {
  var format = [];
  bidSizes.forEach(function (size) {
    format.push({
      w: parseInt(size[0], 10),
      h: parseInt(size[1], 10)
    });
  });
  return format;
}

function isMobile() {
  return /(ios|ipod|ipad|iphone|android)/i.test(navigator.userAgent);
}

function isConnectedTV() {
  return /(smart[-]?tv|hbbtv|appletv|googletv|hdmi|netcast\.tv|viera|nettv|roku|\bdtv\b|sonydtv|inettvbrowser|\btv\b)/i.test(global.navigator.userAgent);
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ })

},[477]);