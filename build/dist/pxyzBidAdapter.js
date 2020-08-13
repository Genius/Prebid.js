pbjsChunk([133],{

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(623);


/***/ }),

/***/ 623:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);



var BIDDER_CODE = 'pxyz';
var URL = 'https://ads.playground.xyz/host-config/prebid?v=2';
var DEFAULT_CURRENCY = 'USD';
var spec = {
  code: BIDDER_CODE,
  // This adapter was previously named playgroundxyz - this alias ensures
  // backwards compatibility for publishers
  aliases: ['playgroundxyz'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]],

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
    var referer = bidderRequest.refererInfo.referer;
    var parts = referer.split('/');
    var protocol, hostname;

    if (parts.length >= 3) {
      protocol = parts[0];
      hostname = parts[2];
    }

    var payload = {
      id: bidRequests[0].auctionId,
      site: {
        domain: protocol + '//' + hostname,
        name: hostname,
        page: referer
      },
      device: {
        ua: navigator.userAgent,
        language: navigator.language,
        devicetype: isMobile() ? 1 : isConnectedTV() ? 3 : 2
      },
      imp: bidRequests.map(mapImpression),
      Regs: {
        ext: {}
      }
    }; // GDPR

    if (bidderRequest && bidderRequest.gdprConsent) {
      var gdpr = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;
      var consentString = bidderRequest.gdprConsent.consentString;
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"]("PXYZ: GDPR applies ".concat(gdpr));
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"]("PXYZ: GDPR consent string ".concat(consentString));
      payload.Regs.ext.gdpr = gdpr;
      payload.User = {
        ext: {
          consent: consentString
        }
      };
    } // CCPA


    if (bidderRequest && bidderRequest.uspConsent) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"]("PXYZ: USP Consent ".concat(bidderRequest.uspConsent));
      payload.Regs.ext['us_privacy'] = bidderRequest.uspConsent;
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
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"](errorMessage);
      }

      return bids;
    }

    if (!__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isArray"](serverResponse.seatbid)) {
      var _errorMessage = "in response for ".concat(bidderRequest.bidderCode, " adapter ");

      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"](_errorMessage += 'Malformed seatbid response');
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
    mediaType: __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */],
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
          prebid: "4.2.0"
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
  return /(smart[-]?tv|hbbtv|appletv|googletv|hdmi|netcast\.tv|viera|nettv|roku|\bdtv\b|sonydtv|inettvbrowser|\btv\b)/i.test(navigator.userAgent);
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[622]);