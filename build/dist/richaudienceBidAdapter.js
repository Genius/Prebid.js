pbjsChunk([79],{

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(435);


/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils__ = __webpack_require__(0);




var BIDDER_CODE = 'richaudience';
var REFERER = '';
var spec = {
  code: BIDDER_CODE,
  aliases: ['ra'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],

  /***
     * Determines whether or not the given bid request is valid
     *
     * @param {bidRequest} bid The bid params to validate.
     * @returns {boolean} True if this is a valid bid, and false otherwise
     */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.pid && bid.params.supplyType);
  },

  /***
     * Build a server request from the list of valid BidRequests
     * @param {validBidRequests} is an array of the valid bids
     * @param {bidderRequest} bidder request object
     * @returns {ServerRequest} Info describing the request to the server
     */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bid) {
      var payload = {
        bidfloor: bid.params.bidfloor,
        ifa: bid.params.ifa,
        pid: bid.params.pid,
        supplyType: bid.params.supplyType,
        currencyCode: __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('currency.adServerCurrency'),
        auctionId: bid.auctionId,
        bidId: bid.bidId,
        BidRequestsCount: bid.bidRequestsCount,
        bidder: bid.bidder,
        bidderRequestId: bid.bidderRequestId,
        tagId: bid.adUnitCode,
        sizes: raiGetSizes(bid),
        referer: typeof bidderRequest.refererInfo.referer != 'undefined' ? encodeURIComponent(bidderRequest.refererInfo.referer) : null,
        numIframes: typeof bidderRequest.refererInfo.numIframes != 'undefined' ? bidderRequest.refererInfo.numIframes : null,
        transactionId: bid.transactionId,
        timeout: __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('bidderTimeout'),
        user: raiSetEids(bid)
      };
      REFERER = typeof bidderRequest.refererInfo.referer != 'undefined' ? encodeURIComponent(bidderRequest.refererInfo.referer) : null;
      payload.gdpr_consent = '';
      payload.gdpr = null;

      if (bidderRequest && bidderRequest.gdprConsent) {
        payload.gdpr_consent = bidderRequest.gdprConsent.consentString;
        payload.gdpr = bidderRequest.gdprConsent.gdprApplies;
      }

      var payloadString = JSON.stringify(payload);
      var endpoint = 'https://shb.richaudience.com/hb/';
      return {
        method: 'POST',
        url: endpoint,
        data: payloadString
      };
    });
  },

  /***
     * Read the response from the server and build a list of bids
     * @param {serverResponse} Response from the server.
     * @param {bidRequest} Bid request object
     * @returns {bidResponses} Array of bids which were nested inside the server
     */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = []; // try catch

    var response = serverResponse.body;

    if (response) {
      var bidResponse = {
        requestId: JSON.parse(bidRequest.data).bidId,
        cpm: response.cpm,
        width: response.width,
        height: response.height,
        creativeId: response.creative_id,
        mediaType: response.media_type,
        netRevenue: response.netRevenue,
        currency: response.currency,
        ttl: response.ttl,
        dealId: response.dealId
      };

      if (response.media_type === 'video') {
        bidResponse.vastXml = response.vastXML;
      } else {
        bidResponse.ad = response.adm;
      }

      bidResponses.push(bidResponse);
    }

    return bidResponses;
  },

  /***
     * User Syncs
     *
     * @param {syncOptions} Publisher prebid configuration
     * @param {serverResponses} Response from the server
     * @param {gdprConsent} GPDR consent object
     * @returns {Array}
     */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    var syncs = [];
    var rand = Math.floor(Math.random() * 9999999999);
    var syncUrl = '';
    gdprConsent && typeof gdprConsent.consentString === 'string' ? syncUrl = 'https://sync.richaudience.com/dcf3528a0b8aa83634892d50e91c306e/?ord=' + rand + '&pubconsent=' + gdprConsent.consentString + '&euconsent=' + gdprConsent.consentString : syncUrl = 'https://sync.richaudience.com/dcf3528a0b8aa83634892d50e91c306e/?ord=' + rand;

    if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: syncUrl
      });
    } else if (syncOptions.pixelEnabled && REFERER != null) {
      syncs.push({
        type: 'image',
        url: "https://sync.richaudience.com/bf7c142f4339da0278e83698a02b0854/?euconsent=".concat(gdprConsent.consentString, "&referrer=").concat(REFERER)
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

function raiGetSizes(bid) {
  var raiNewSizes;

  if (bid.mediaTypes && bid.mediaTypes.banner && bid.mediaTypes.banner.sizes) {
    raiNewSizes = bid.mediaTypes.banner.sizes;
  } else {
    raiNewSizes = bid.sizes;
  }

  if (raiNewSizes != null) {
    return raiNewSizes.map(function (size) {
      return {
        w: size[0],
        h: size[1]
      };
    });
  }
}

function raiSetEids(bid) {
  var eids = [];

  if (bid && bid.userId) {
    raiSetUserId(bid, eids, 'id5-sync.com', __WEBPACK_IMPORTED_MODULE_3__src_utils__["deepAccess"](bid, "userId.id5id"));
    raiSetUserId(bid, eids, 'pubcommon', __WEBPACK_IMPORTED_MODULE_3__src_utils__["deepAccess"](bid, "userId.pubcid"));
    raiSetUserId(bid, eids, 'criteo.com', __WEBPACK_IMPORTED_MODULE_3__src_utils__["deepAccess"](bid, "userId.criteoId"));
    raiSetUserId(bid, eids, 'liveramp.com', __WEBPACK_IMPORTED_MODULE_3__src_utils__["deepAccess"](bid, "userId.idl_env"));
    raiSetUserId(bid, eids, 'liveintent.com', __WEBPACK_IMPORTED_MODULE_3__src_utils__["deepAccess"](bid, "userId.lipb.lipbid"));
    raiSetUserId(bid, eids, 'adserver.org', __WEBPACK_IMPORTED_MODULE_3__src_utils__["deepAccess"](bid, "userId.tdid"));
  }

  return eids;
}

function raiSetUserId(bid, eids, source, value) {
  if (__WEBPACK_IMPORTED_MODULE_3__src_utils__["isStr"](value)) {
    eids.push({
      userId: value,
      source: source
    });
  }
}

/***/ })

},[434]);