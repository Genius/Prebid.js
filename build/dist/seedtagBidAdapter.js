pbjsChunk([111],{

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(677);


/***/ }),

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getTimeoutUrl"] = getTimeoutUrl;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
var _mediaTypesMap;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var BIDDER_CODE = 'seedtag';
var SEEDTAG_ALIAS = 'st';
var SEEDTAG_SSP_ENDPOINT = 'https://s.seedtag.com/c/hb/bid';
var SEEDTAG_SSP_ONTIMEOUT_ENDPOINT = 'https://s.seedtag.com/se/hb/timeout';
var mediaTypesMap = (_mediaTypesMap = {}, _defineProperty(_mediaTypesMap, __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], 'display'), _defineProperty(_mediaTypesMap, __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */], 'video'), _mediaTypesMap);

function mapMediaType(seedtagMediaType) {
  if (seedtagMediaType === 'display') return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */];
  if (seedtagMediaType === 'video') return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */];else return seedtagMediaType;
}

function getMediaTypeFromBid(bid) {
  return bid.mediaTypes && Object.keys(bid.mediaTypes)[0];
}

function hasMandatoryParams(params) {
  return !!params.publisherId && !!params.adUnitId && !!params.placement && (params.placement === 'inImage' || params.placement === 'inScreen' || params.placement === 'banner' || params.placement === 'video');
}

function hasVideoMandatoryParams(mediaTypes) {
  var isVideoInStream = !!mediaTypes.video && mediaTypes.video.context === 'instream';
  var isPlayerSize = !!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](mediaTypes, 'video.playerSize') && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](mediaTypes, 'video.playerSize'));
  return isVideoInStream && isPlayerSize;
}

function buildBidRequests(validBidRequests) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_map"](validBidRequests, function (validBidRequest) {
    var params = validBidRequest.params;

    var mediaTypes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_map"](Object.keys(validBidRequest.mediaTypes), function (pbjsType) {
      return mediaTypesMap[pbjsType];
    });

    var bidRequest = {
      id: validBidRequest.bidId,
      transactionId: validBidRequest.transactionId,
      sizes: validBidRequest.sizes,
      supplyTypes: mediaTypes,
      adUnitId: params.adUnitId,
      placement: params.placement
    };

    if (params.adPosition) {
      bidRequest.adPosition = params.adPosition;
    }

    if (params.video) {
      bidRequest.videoParams = params.video || {};
      bidRequest.videoParams.w = validBidRequest.mediaTypes.video.playerSize[0][0];
      bidRequest.videoParams.h = validBidRequest.mediaTypes.video.playerSize[0][1];
    }

    return bidRequest;
  });
}

function buildBid(seedtagBid) {
  var mediaType = mapMediaType(seedtagBid.mediaType);
  var bid = {
    requestId: seedtagBid.bidId,
    cpm: seedtagBid.price,
    width: seedtagBid.width,
    height: seedtagBid.height,
    creativeId: seedtagBid.creativeId,
    currency: seedtagBid.currency,
    netRevenue: true,
    mediaType: mediaType,
    ttl: seedtagBid.ttl
  };

  if (mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]) {
    bid.vastXml = seedtagBid.content;
  } else {
    bid.ad = seedtagBid.content;
  }

  return bid;
}

function getTimeoutUrl(data) {
  var queryParams = '';

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](data) && data[0] && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](data[0].params) && data[0].params[0]) {
    var params = data[0].params[0];
    queryParams = '?publisherToken=' + params.publisherId + '&adUnitId=' + params.adUnitId;
  }

  return SEEDTAG_SSP_ONTIMEOUT_ENDPOINT + queryParams;
}
var spec = {
  code: BIDDER_CODE,
  aliases: [SEEDTAG_ALIAS],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return getMediaTypeFromBid(bid) === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */] ? hasMandatoryParams(bid.params) && hasVideoMandatoryParams(bid.mediaTypes) : hasMandatoryParams(bid.params);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var payload = {
      url: bidderRequest.refererInfo.referer,
      publisherToken: validBidRequests[0].params.publisherId,
      cmp: !!bidderRequest.gdprConsent,
      timeout: bidderRequest.timeout,
      version: "4.2.0",
      bidRequests: buildBidRequests(validBidRequests)
    };

    if (payload.cmp) {
      var gdprApplies = bidderRequest.gdprConsent.gdprApplies;
      if (gdprApplies !== undefined) payload['ga'] = gdprApplies;
      payload['cd'] = bidderRequest.gdprConsent.consentString;
    }

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: SEEDTAG_SSP_ENDPOINT,
      data: payloadString
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse) {
    var serverBody = serverResponse.body;

    if (serverBody && serverBody.bids && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](serverBody.bids)) {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_map"](serverBody.bids, function (bid) {
        return buildBid(bid);
      });
    } else {
      return [];
    }
  },

  /**
   * Register the user sync pixels which should be dropped after the auction.
   *
   * @param {SyncOptions} syncOptions Which user syncs are allowed?
   * @param {ServerResponse[]} serverResponses List of server's responses.
   * @return {UserSync[]} The user syncs which should be dropped.
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var serverResponse = serverResponses[0];

    if (syncOptions.iframeEnabled && serverResponse) {
      var cookieSyncUrl = serverResponse.body.cookieSync;
      return cookieSyncUrl ? [{
        type: 'iframe',
        url: cookieSyncUrl
      }] : [];
    } else {
      return [];
    }
  },

  /**
   * Register bidder specific code, which will execute if bidder timed out after an auction
   * @param {data} Containing timeout specific data
   */
  onTimeout: function onTimeout(data) {
    getTimeoutUrl(data);
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["triggerPixel"](SEEDTAG_SSP_ONTIMEOUT_ENDPOINT);
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[676]);