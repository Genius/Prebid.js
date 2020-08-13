pbjsChunk([204],{

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(443);


/***/ }),

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_auctionManager_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js__);






var BIDDER_CODE = 'hybrid';
var DSP_ENDPOINT = 'https://hbe198.hybrid.ai/prebidhb';
var TRAFFIC_TYPE_WEB = 1;
var PLACEMENT_TYPE_BANNER = 1;
var PLACEMENT_TYPE_VIDEO = 2;
var TTL = 60;
var RENDERER_URL = 'https://acdn.adnxs.com/video/outstream/ANOutstreamVideo.js';
var placementTypes = {
  'banner': PLACEMENT_TYPE_BANNER,
  'video': PLACEMENT_TYPE_VIDEO
};

function buildBidRequests(validBidRequests) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_map"](validBidRequests, function (validBidRequest) {
    var params = validBidRequest.params;
    var bidRequest = {
      bidId: validBidRequest.bidId,
      transactionId: validBidRequest.transactionId,
      sizes: validBidRequest.sizes,
      placement: placementTypes[params.placement],
      placeId: params.placeId
    };
    return bidRequest;
  });
}

var outstreamRender = function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.ANOutstreamVideo.renderAd({
      sizes: [bid.width, bid.height],
      targetId: bid.adUnitCode,
      rendererOptions: {
        showBigPlayButton: false,
        showProgressBar: 'bar',
        showVolume: false,
        allowFullscreen: true,
        skippable: false,
        content: bid.vastXml
      }
    });
  });
};

var createRenderer = function createRenderer(bid) {
  var renderer = __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__["a" /* Renderer */].install({
    targetId: bid.adUnitCode,
    url: RENDERER_URL,
    loaded: false
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  return renderer;
};

function buildBid(bidData) {
  var bid = {
    requestId: bidData.bidId,
    cpm: bidData.price,
    width: bidData.width,
    height: bidData.height,
    creativeId: bidData.bidId,
    currency: bidData.currency,
    netRevenue: true,
    ttl: TTL
  };

  if (bidData.placement === PLACEMENT_TYPE_VIDEO) {
    bid.vastXml = bidData.content;
    bid.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */];
    var adUnit = __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js___default()(__WEBPACK_IMPORTED_MODULE_2__src_auctionManager_js__["a" /* auctionManager */].getAdUnits(), function (unit) {
      return unit.transactionId === bidData.transactionId;
    });

    if (adUnit) {
      bid.width = adUnit.mediaTypes.video.playerSize[0][0];
      bid.height = adUnit.mediaTypes.video.playerSize[0][1];

      if (adUnit.mediaTypes.video.context === 'outstream') {
        bid.renderer = createRenderer(bid);
      }
    }
  } else {
    bid.ad = bidData.content;
    bid.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */];
  }

  return bid;
}

function getMediaTypeFromBid(bid) {
  return bid.mediaTypes && Object.keys(bid.mediaTypes)[0];
}

function hasVideoMandatoryParams(mediaTypes) {
  var isHasVideoContext = !!mediaTypes.video && (mediaTypes.video.context === 'instream' || mediaTypes.video.context === 'outstream');
  var isPlayerSize = !!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](mediaTypes, 'video.playerSize') && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](mediaTypes, 'video.playerSize'));
  return isHasVideoContext && isPlayerSize;
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],
  placementTypes: placementTypes,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placeId && !!bid.params.placement && (getMediaTypeFromBid(bid) === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */] && bid.params.placement === 'banner' || getMediaTypeFromBid(bid) === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */] && bid.params.placement === 'video' && hasVideoMandatoryParams(bid.mediaTypes));
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
      cmp: !!bidderRequest.gdprConsent,
      trafficType: TRAFFIC_TYPE_WEB,
      bidRequests: buildBidRequests(validBidRequests)
    };

    if (payload.cmp) {
      var gdprApplies = bidderRequest.gdprConsent.gdprApplies;
      if (gdprApplies !== undefined) payload['ga'] = gdprApplies;
      payload['cs'] = bidderRequest.gdprConsent.consentString;
    }

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: DSP_ENDPOINT,
      data: payloadString,
      options: {
        contentType: 'application/json'
      }
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidRequests = JSON.parse(bidRequest.data).bidRequests;
    var serverBody = serverResponse.body;

    if (serverBody && serverBody.bids && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](serverBody.bids)) {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_map"](serverBody.bids, function (bid) {
        var rawBid = __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js___default()(bidRequests, function (item) {
          return item.bidId === bid.bidId;
        });
        bid.placement = rawBid.placement;
        bid.transactionId = rawBid.transactionId;
        bid.placeId = rawBid.placeId;
        return buildBid(bid);
      });
    } else {
      return [];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[442]);