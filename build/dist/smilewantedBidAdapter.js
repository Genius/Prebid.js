pbjsChunk([85],{

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(573);


/***/ }),

/***/ 573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__ = __webpack_require__(2);





var spec = {
  code: 'smilewanted',
  aliases: ['smile', 'sw'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.zoneId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests A non-empty list of valid bid requests that should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bid) {
      var payload = {
        zoneId: bid.params.zoneId,
        currencyCode: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('currency.adServerCurrency') || 'EUR',
        bidfloor: bid.params.bidfloor || 0.0,
        tagId: bid.adUnitCode,
        sizes: bid.sizes.map(function (size) {
          return {
            w: size[0],
            h: size[1]
          };
        }),
        transactionId: bid.transactionId,
        timeout: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('bidderTimeout'),
        bidId: bid.bidId,
        prebidVersion: "2.37.0"
      };

      if (bidderRequest && bidderRequest.refererInfo) {
        payload.pageDomain = bidderRequest.refererInfo.referer || '';
      }

      if (bidderRequest && bidderRequest.gdprConsent) {
        payload.gdpr_consent = bidderRequest.gdprConsent.consentString;
        payload.gdpr = bidderRequest.gdprConsent.gdprApplies; // we're handling the undefined case server side
      }

      var payloadString = JSON.stringify(payload);
      return {
        method: 'POST',
        url: 'https://prebid.smilewanted.com',
        data: payloadString
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
    var bidResponses = [];
    var response = serverResponse.body;

    try {
      if (response) {
        var bidResponse = {
          requestId: JSON.parse(bidRequest.data).bidId,
          cpm: response.cpm,
          width: response.width,
          height: response.height,
          creativeId: response.creativeId,
          dealId: response.dealId,
          currency: response.currency,
          netRevenue: response.isNetCpm,
          ttl: response.ttl,
          ad: response.ad
        };

        if (response.formatTypeSw == 'video_instream' || response.formatTypeSw == 'video_outstream') {
          bidResponse['mediaType'] = 'video';
          bidResponse['vastUrl'] = response.ad;
          bidResponse['ad'] = null;
        }

        if (response.formatTypeSw == 'video_outstream') {
          bidResponse['renderer'] = newRenderer(JSON.parse(bidRequest.data), response);
        }

        bidResponses.push(bidResponse);
      }
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Error while parsing smilewanted response', error);
    }

    return bidResponses;
  },

  /**
   * User syncs.
   *
   * @param {*} syncOptions Publisher prebid configuration.
   * @param {*} serverResponses A successful response from the server.
   * @return {Syncs[]} An array of syncs that should be executed.
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (syncOptions.iframeEnabled && serverResponses.length > 0) {
      if (serverResponses[0].body.cSyncUrl === 'https://csync.smilewanted.com') {
        syncs.push({
          type: 'iframe',
          url: serverResponses[0].body.cSyncUrl
        });
      }
    }

    return syncs;
  }
};
/**
 * Create SmileWanted renderer
 * @param requestId
 * @returns {*}
 */

function newRenderer(bidRequest, bidResponse) {
  var renderer = __WEBPACK_IMPORTED_MODULE_1__src_Renderer__["a" /* Renderer */].install({
    id: bidRequest.bidId,
    url: bidResponse.OustreamTemplateUrl,
    loaded: false
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Prebid Error calling setRender on newRenderer', err);
  }

  return renderer;
}
/**
 * Initialise SmileWanted outstream
 * @param bid
 */


function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.SmileWantedOutStreamInit({
      width: bid.width,
      height: bid.height,
      vastUrl: bid.vastUrl,
      elId: bid.adUnitCode
    });
  });
}

Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[572]);