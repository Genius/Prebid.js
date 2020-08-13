pbjsChunk([121],{

/***/ 648:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(649);


/***/ }),

/***/ 649:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__ = __webpack_require__(11);





var BIDDER_CODE = 'richaudience';
var REFERER = '';
var spec = {
  code: BIDDER_CODE,
  aliases: ['ra'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],

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
        currencyCode: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency'),
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
        timeout: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('bidderTimeout'),
        user: raiSetEids(bid),
        demand: raiGetDemandType(bid),
        videoData: raiGetVideoInfo(bid)
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

        try {
          if (JSON.parse(bidRequest.data).videoData.format == 'outstream') {
            bidResponse.renderer = __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__["a" /* Renderer */].install({
              url: 'https://cdn3.richaudience.com/prebidVideo/player.js'
            });
            bidResponse.renderer.setRender(renderer);
          }
        } catch (e) {
          bidResponse.ad = response.adm;
        }
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
    var consent = '';

    if (gdprConsent && typeof gdprConsent.consentString === 'string' && typeof gdprConsent.consentString != 'undefined') {
      consent = "consentString=\u2019".concat(gdprConsent.consentString);
    }

    if (syncOptions.iframeEnabled) {
      syncUrl = 'https://sync.richaudience.com/dcf3528a0b8aa83634892d50e91c306e/?ord=' + rand;

      if (consent != '') {
        syncUrl += "&".concat(consent);
      }

      syncs.push({
        type: 'iframe',
        url: syncUrl
      });
    }

    if (syncOptions.pixelEnabled && REFERER != null && syncs.length == 0) {
      syncUrl = "https://sync.richaudience.com/bf7c142f4339da0278e83698a02b0854/?referrer=".concat(REFERER);

      if (consent != '') {
        syncUrl += "&".concat(consent);
      }

      syncs.push({
        type: 'image',
        url: syncUrl
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

function raiGetSizes(bid) {
  var raiNewSizes;

  if (bid.mediaTypes && bid.mediaTypes.banner && bid.mediaTypes.banner.sizes) {
    raiNewSizes = bid.mediaTypes.banner.sizes;
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

function raiGetDemandType(bid) {
  var raiFormat = 'display';

  if (bid.mediaTypes != undefined) {
    if (bid.mediaTypes.video != undefined) {
      raiFormat = 'video';
    }
  }

  return raiFormat;
}

function raiGetVideoInfo(bid) {
  var videoData;

  if (raiGetDemandType(bid) == 'video') {
    videoData = {
      format: bid.mediaTypes.video.context,
      playerSize: bid.mediaTypes.video.playerSize,
      mimes: bid.mediaTypes.video.mimes
    };
  }

  return videoData;
}

function raiSetEids(bid) {
  var eids = [];

  if (bid && bid.userId) {
    raiSetUserId(bid, eids, 'id5-sync.com', __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bid, "userId.id5id"));
    raiSetUserId(bid, eids, 'pubcommon', __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bid, "userId.pubcid"));
    raiSetUserId(bid, eids, 'criteo.com', __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bid, "userId.criteoId"));
    raiSetUserId(bid, eids, 'liveramp.com', __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bid, "userId.idl_env"));
    raiSetUserId(bid, eids, 'liveintent.com', __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bid, "userId.lipb.lipbid"));
    raiSetUserId(bid, eids, 'adserver.org', __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bid, "userId.tdid"));
  }

  return eids;
}

function raiSetUserId(bid, eids, source, value) {
  if (__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"](value)) {
    eids.push({
      userId: value,
      source: source
    });
  }
}

function renderer(bid) {
  bid.renderer.push(function () {
    renderAd(bid);
  });
}

function renderAd(bid) {
  var raOutstreamHBPassback = "".concat(bid.vastXml);
  var raPlayerHB = {
    config: bid.params[0].player != undefined ? {
      end: bid.params[0].player.end != null ? bid.params[0].player.end : 'close',
      init: bid.params[0].player.init != null ? bid.params[0].player.init : 'close',
      skin: bid.params[0].player.skin != null ? bid.params[0].player.skin : 'light'
    } : {
      end: 'close',
      init: 'close',
      skin: 'light'
    },
    pid: bid.params[0].pid,
    adUnit: bid.adUnitCode
  };
  window.raParams(raPlayerHB, raOutstreamHBPassback, true);
}

/***/ })

},[648]);