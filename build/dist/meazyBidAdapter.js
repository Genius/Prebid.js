pbjsChunk([150],{

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(414);


/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'meazy';
var PREBID_ENDPOINT = 'rtb-filter.meazy.co';
var SYNC_ENDPOINT = '//sync.meazy.co/sync/iframe';
var ENDPOINT_CONFIG = {
  defaultCurrency: ['USD'],
  availableSize: ['300x250', '320x480', '160x600']
};

var buildURI = function buildURI(pid) {
  return "//".concat(PREBID_ENDPOINT, "/pbjs?host=").concat(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getOrigin"](), "&api_key=").concat(pid);
};

var validateSize = function validateSize(size) {
  return ENDPOINT_CONFIG.availableSize.indexOf(size.join('x')) !== -1;
};

var buildImpression = function buildImpression(bidRequest) {
  var impression = {
    id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"](),
    tagid: bidRequest.adUnitCode,
    banner: {
      format: bidRequest.sizes.map(function (size) {
        return {
          w: size[0],
          h: size[1]
        };
      })
    }
  };
  return impression;
};

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.pid && bid.sizes.some(validateSize);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var payload = {
      id: bidRequests[0].bidId,
      site: {
        domain: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getOrigin"]()
      },
      device: {
        w: window.screen.width,
        h: window.screen.height,
        language: navigator.language
      },
      cur: ENDPOINT_CONFIG.defaultCurrency,
      imp: bidRequests.map(buildImpression),
      user: {}
    };

    if (bidderRequest.refererInfo) {
      if (bidderRequest.refererInfo.referer) {
        payload.site.ref = bidderRequest.refererInfo.referer;
      }

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bidderRequest.refererInfo) && bidderRequest.refererInfo.stack.length > 0) {
        payload.site.page = bidderRequest.refererInfo.stack[0];
      }
    }

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidderRequest, 'gdprConsent.gdprApplies')) {
      payload.user.ext = {
        consent: bidderRequest.gdprConsent.consentString,
        gdpr: bidderRequest.gdprConsent.gdprApplies & 1
      };
    }

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: buildURI(bidRequests[0].params.pid),
      data: payloadString
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse) {
    var bids = [];

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](serverResponse.body.seatbid) || !serverResponse.body.seatbid[0]) {
      return bids;
    }

    serverResponse.body.seatbid[0].bid.forEach(function (bidResponse) {
      var bid = {
        requestId: serverResponse.body.id,
        cpm: bidResponse.price,
        width: bidResponse.w,
        height: bidResponse.h,
        creativeId: bidResponse.crid,
        netRevenue: bidResponse.netRevenue !== undefined ? bidResponse.netRevenue : true,
        dealId: bidResponse.dealid,
        currency: ENDPOINT_CONFIG.defaultCurrency[0],
        ttl: bidResponse.exp || 900,
        ad: bidResponse.adm
      };
      bids.push(bid);
    });
    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (syncOptions.pixelEnabled && serverResponses[0] && __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](serverResponses[0], 'body.ext.syncUrl')) {
      syncs.push({
        type: 'image',
        url: serverResponses[0].body.ext.syncUrl
      });
    }

    if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: SYNC_ENDPOINT
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[413]);