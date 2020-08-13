pbjsChunk([126],{

/***/ 638:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(639);


/***/ }),

/***/ 639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["isMobile"] = isMobile;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_storageManager_js__ = __webpack_require__(9);





var BIDDER_CODE = 'relaido';
var BIDDER_DOMAIN = 'api.relaido.jp';
var ADAPTER_VERSION = '1.0.1';
var DEFAULT_TTL = 300;
var UUID_KEY = 'relaido_uuid';
var storage = Object(__WEBPACK_IMPORTED_MODULE_4__src_storageManager_js__["b" /* getStorageManager */])();

function isBidRequestValid(bid) {
  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isSafariBrowser"]() && !hasUuid()) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('uuid is not found.');
    return false;
  }

  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.placementId')) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('placementId param is reqeuired.');
    return false;
  }

  if (hasVideoMediaType(bid)) {
    if (!isVideoValid(bid)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Invalid mediaType video.');
      return false;
    }
  } else if (hasBannerMediaType(bid)) {
    if (!isBannerValid(bid)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Invalid mediaType banner.');
      return false;
    }
  } else {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Invalid mediaTypes input banner or video.');
    return false;
  }

  return true;
}

function buildRequests(validBidRequests, bidderRequest) {
  var bidRequests = [];

  for (var i = 0; i < validBidRequests.length; i++) {
    var bidRequest = validBidRequests[i];
    var placementId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('placementId', bidRequest.params);
    var bidDomain = bidRequest.params.domain || BIDDER_DOMAIN;
    var bidUrl = "https://".concat(bidDomain, "/bid/v1/prebid/").concat(placementId);
    var uuid = getUuid();
    var mediaType = getMediaType(bidRequest);
    var payload = {
      version: ADAPTER_VERSION,
      timeout_ms: bidderRequest.timeout,
      ad_unit_code: bidRequest.adUnitCode,
      auction_id: bidRequest.auctionId,
      bidder: bidRequest.bidder,
      bidder_request_id: bidRequest.bidderRequestId,
      bid_requests_count: bidRequest.bidRequestsCount,
      bid_id: bidRequest.bidId,
      transaction_id: bidRequest.transactionId,
      media_type: mediaType,
      uuid: uuid
    };

    if (hasVideoMediaType(bidRequest)) {
      var playerSize = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.playerSize');
      payload.width = playerSize[0][0];
      payload.height = playerSize[0][1];
    } else if (hasBannerMediaType(bidRequest)) {
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.banner.sizes');
      payload.width = sizes[0][0];
      payload.height = sizes[0][1];
    } // It may not be encoded, so add it at the end of the payload


    payload.ref = bidderRequest.refererInfo.referer;
    bidRequests.push({
      method: 'GET',
      url: bidUrl,
      data: payload,
      options: {
        withCredentials: true
      },
      bidId: bidRequest.bidId,
      player: bidRequest.params.player,
      width: payload.width,
      height: payload.height,
      mediaType: mediaType
    });
  }

  return bidRequests;
}

function interpretResponse(serverResponse, bidRequest) {
  var bidResponses = [];
  var body = serverResponse.body;

  if (!body || body.status != 'ok') {
    return [];
  }

  if (body.uuid) {
    storage.setDataInLocalStorage(UUID_KEY, body.uuid);
  }

  var playerUrl = bidRequest.player || body.playerUrl;
  var mediaType = bidRequest.mediaType || __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */];
  var bidResponse = {
    requestId: bidRequest.bidId,
    width: bidRequest.width,
    height: bidRequest.height,
    cpm: body.price,
    currency: body.currency,
    creativeId: body.creativeId,
    dealId: body.dealId || '',
    ttl: body.ttl || DEFAULT_TTL,
    netRevenue: true,
    mediaType: mediaType
  };

  if (mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]) {
    bidResponse.vastXml = body.vast;
    bidResponse.renderer = newRenderer(bidRequest.bidId, playerUrl);
  } else {
    var playerTag = createPlayerTag(playerUrl);
    var renderTag = createRenderTag(bidRequest.width, bidRequest.height, body.vast);
    bidResponse.ad = "<div id=\"rop-prebid\">".concat(playerTag).concat(renderTag, "</div>");
  }

  bidResponses.push(bidResponse);
  return bidResponses;
}

function getUserSyncs(syncOptions, serverResponses) {
  if (!syncOptions.iframeEnabled) {
    return [];
  }

  var syncUrl = "https://".concat(BIDDER_DOMAIN, "/tr/v1/prebid/sync.html");

  if (serverResponses.length > 0) {
    syncUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](serverResponses, '0.body.syncUrl') || syncUrl;
  }

  receiveMessage();
  return [{
    type: 'iframe',
    url: syncUrl
  }];
}

function onBidWon(bid) {
  var query = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseQueryStringParameters"]({
    placement_id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.0.placementId'),
    creative_id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'creativeId'),
    price: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'cpm'),
    auction_id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'auctionId'),
    bid_id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'requestId'),
    ad_id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'adId'),
    ad_unit_code: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'adUnitCode'),
    ref: window.location.href
  }).replace(/\&$/, '');
  var bidDomain = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.0.domain') || BIDDER_DOMAIN;
  var burl = "https://".concat(bidDomain, "/tr/v1/prebid/win.gif?").concat(query);
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["triggerPixel"](burl);
}

function onTimeout(data) {
  var query = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseQueryStringParameters"]({
    placement_id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](data, '0.params.0.placementId'),
    timeout: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](data, '0.timeout'),
    auction_id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](data, '0.auctionId'),
    bid_id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](data, '0.bidId'),
    ad_unit_code: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](data, '0.adUnitCode'),
    ref: window.location.href
  }).replace(/\&$/, '');
  var bidDomain = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](data, '0.params.0.domain') || BIDDER_DOMAIN;
  var timeoutUrl = "https://".concat(bidDomain, "/tr/v1/prebid/timeout.gif?").concat(query);
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["triggerPixel"](timeoutUrl);
}

function createPlayerTag(playerUrl) {
  return "<script src=\"".concat(playerUrl, "\"></script>");
}

function createRenderTag(width, height, vast) {
  return "<script>(function(){" + "window.RelaidoPlayer.renderAd({" + "width: ".concat(width, ",") + "height: ".concat(height, ",") + "vastXml: '".concat(vast.replace(/\r?\n/g, ''), "',") + "mediaType: 'banner'" + "});" + "})();</script>";
}

;

function newRenderer(bidId, playerUrl) {
  var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer_js__["a" /* Renderer */].install({
    id: bidId,
    url: playerUrl,
    loaded: false
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('renderer.setRender Error', err);
  }

  return renderer;
}

function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.RelaidoPlayer.renderAd({
      adUnitCode: bid.adUnitCode,
      width: bid.width,
      height: bid.height,
      vastXml: bid.vastXml,
      mediaType: bid.mediaType
    });
  });
}

function receiveMessage() {
  window.addEventListener('message', setUuid);
}

function setUuid(e) {
  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](e.data) && e.data.relaido_uuid) {
    storage.setDataInLocalStorage(UUID_KEY, e.data.relaido_uuid);
    window.removeEventListener('message', setUuid);
  }
}

function isBannerValid(bid) {
  if (!isMobile()) {
    return false;
  }

  var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner.sizes');

  if (sizes && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](sizes)) {
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](sizes[0])) {
      var width = sizes[0][0];
      var height = sizes[0][1];

      if (width >= 300 && height >= 250) {
        return true;
      }
    }
  }

  return false;
}

function isVideoValid(bid) {
  var playerSize = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.playerSize');

  if (playerSize && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](playerSize) && playerSize.length > 0) {
    var context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.context');

    if (context && context === 'outstream') {
      return true;
    }
  }

  return false;
}

function hasUuid() {
  return !!storage.getDataFromLocalStorage(UUID_KEY);
}

function getUuid() {
  return storage.getDataFromLocalStorage(UUID_KEY) || '';
}

function isMobile() {
  var ua = navigator.userAgent;

  if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPod') > -1 || ua.indexOf('Android') > -1 && ua.indexOf('Tablet') == -1) {
    return true;
  }

  return false;
}

function getMediaType(bid) {
  if (hasVideoMediaType(bid)) {
    return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */];
  } else if (hasBannerMediaType(bid)) {
    return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */];
  }

  return '';
}

function hasBannerMediaType(bid) {
  return !!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner');
}

function hasVideoMediaType(bid) {
  return !!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video');
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs,
  onBidWon: onBidWon,
  onTimeout: onTimeout
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[638]);