pbjsChunk([156],{

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(560);


/***/ }),

/***/ 560:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["hasTypeVideo"] = hasTypeVideo;
/* harmony export (immutable) */ __webpack_exports__["isValid"] = isValid;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_video_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_storageManager_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_adapters_bidderFactory_js__ = __webpack_require__(1);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var storage = Object(__WEBPACK_IMPORTED_MODULE_4__src_storageManager_js__["b" /* getStorageManager */])();
var ENDPOINT = 'https://onetag-sys.com/prebid-request';
var USER_SYNC_ENDPOINT = 'https://onetag-sys.com/usync/';
var BIDDER_CODE = 'onetag';
/**
 * Determines whether or not the given bid request is valid.
 *
 * @param {BidRequest} bid The bid params to validate.
 * @return boolean True if this is a valid bid, and false otherwise.
 */

function isBidRequestValid(bid) {
  if (typeof bid === 'undefined' || typeof bid.params === 'undefined' || typeof bid.params.pubId !== 'string') {
    return false;
  }

  return isValid(__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["b" /* BANNER */], bid) || isValid(__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["d" /* VIDEO */], bid);
}

function hasTypeVideo(bid) {
  return typeof bid.mediaTypes !== 'undefined' && typeof bid.mediaTypes.video !== 'undefined';
}
function isValid(type, bid) {
  if (type === __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["b" /* BANNER */]) {
    return parseSizes(bid).length > 0;
  } else if (type === __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["d" /* VIDEO */] && hasTypeVideo(bid)) {
    var context = bid.mediaTypes.video.context;

    if (context === 'outstream' || context === 'instream') {
      return parseVideoSize(bid).length > 0;
    }
  }

  return false;
}
/**
 * Make a server request from the list of BidRequests.
 *
 * @param {validBidRequests[]} - an array of bids
 * @return ServerRequest Info describing the request to the server.
 */

function buildRequests(validBidRequests, bidderRequest) {
  var payload = _objectSpread({
    bids: requestsToBids(validBidRequests)
  }, getPageInfo());

  if (bidderRequest && bidderRequest.gdprConsent) {
    payload.gdprConsent = {
      consentString: bidderRequest.gdprConsent.consentString,
      consentRequired: bidderRequest.gdprConsent.gdprApplies
    };
  }

  if (bidderRequest && bidderRequest.uspConsent) {
    payload.usPrivacy = bidderRequest.uspConsent;
  }

  if (bidderRequest && bidderRequest.userId) {
    payload.userId = bidderRequest.userId;
  }

  try {
    if (storage.hasLocalStorage()) {
      payload.onetagSid = storage.getDataFromLocalStorage('onetag_sid');
    }
  } catch (e) {}

  return {
    method: 'POST',
    url: ENDPOINT,
    data: JSON.stringify(payload)
  };
}

function interpretResponse(serverResponse, bidderRequest) {
  var body = serverResponse.body;
  var bids = [];
  var requestData = JSON.parse(bidderRequest.data);

  if (!body || body.nobid && body.nobid === true) {
    return bids;
  }

  if (!body.bids || !Array.isArray(body.bids) || body.bids.length === 0) {
    return bids;
  }

  body.bids.forEach(function (_ref) {
    var requestId = _ref.requestId,
        cpm = _ref.cpm,
        width = _ref.width,
        height = _ref.height,
        creativeId = _ref.creativeId,
        dealId = _ref.dealId,
        currency = _ref.currency,
        mediaType = _ref.mediaType,
        ttl = _ref.ttl,
        rendererUrl = _ref.rendererUrl,
        ad = _ref.ad,
        vastUrl = _ref.vastUrl,
        videoCacheKey = _ref.videoCacheKey;
    var responseBid = {
      requestId: requestId,
      cpm: cpm,
      width: width,
      height: height,
      creativeId: creativeId,
      dealId: dealId == null ? dealId : '',
      currency: currency,
      netRevenue: false,
      meta: {
        mediaType: mediaType
      },
      ttl: ttl || 300
    };

    if (mediaType === __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["b" /* BANNER */]) {
      responseBid.ad = ad;
    } else if (mediaType === __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["d" /* VIDEO */]) {
      var _find = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(requestData.bids, function (item) {
        return item.bidId === requestId;
      }),
          context = _find.context,
          adUnitCode = _find.adUnitCode;

      if (context === __WEBPACK_IMPORTED_MODULE_1__src_video_js__["a" /* INSTREAM */]) {
        responseBid.vastUrl = vastUrl;
        responseBid.videoCacheKey = videoCacheKey;
      } else if (context === __WEBPACK_IMPORTED_MODULE_1__src_video_js__["b" /* OUTSTREAM */]) {
        responseBid.vastXml = ad;
        responseBid.vastUrl = vastUrl;

        if (rendererUrl) {
          responseBid.renderer = createRenderer({
            requestId: requestId,
            rendererUrl: rendererUrl,
            adUnitCode: adUnitCode
          });
        }
      }
    }

    bids.push(responseBid);
  });
  return bids;
}

function createRenderer(bid) {
  var rendererOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var renderer = __WEBPACK_IMPORTED_MODULE_2__src_Renderer_js__["a" /* Renderer */].install({
    id: bid.requestId,
    url: bid.rendererUrl,
    config: rendererOptions,
    adUnitCode: bid.adUnitCode,
    loaded: false
  });

  try {
    renderer.setRender(onetagRenderer);
  } catch (e) {}

  return renderer;
}

function onetagRenderer(_ref2) {
  var renderer = _ref2.renderer,
      width = _ref2.width,
      height = _ref2.height,
      vastXml = _ref2.vastXml,
      adUnitCode = _ref2.adUnitCode;
  renderer.push(function () {
    window.onetag.Player.init({
      width: width,
      height: height,
      vastXml: vastXml,
      nodeId: adUnitCode,
      config: renderer.getConfig()
    });
  });
}

function getFrameNesting() {
  var topmostFrame = window;
  var parent = window.parent;
  var currentFrameNesting = 0;

  try {
    while (topmostFrame !== topmostFrame.parent) {
      parent = topmostFrame.parent; // eslint-disable-next-line no-unused-expressions

      parent.location.href;
      topmostFrame = topmostFrame.parent;
    }
  } catch (e) {
    currentFrameNesting = parent === topmostFrame.top ? 1 : 2;
  }

  return {
    topmostFrame: topmostFrame,
    currentFrameNesting: currentFrameNesting
  };
}

function getDocumentVisibility(window) {
  try {
    if (typeof window.document.hidden !== 'undefined') {
      return window.document.hidden;
    } else if (typeof window.document['msHidden'] !== 'undefined') {
      return window.document['msHidden'];
    } else if (typeof window.document['webkitHidden'] !== 'undefined') {
      return window.document['webkitHidden'];
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
/**
 * Returns information about the page needed by the server in an object to be converted in JSON
 * @returns {{location: *, referrer: (*|string), masked: *, wWidth: (*|Number), wHeight: (*|Number), sWidth, sHeight, date: string, timeOffset: number}}
 */


function getPageInfo() {
  var _getFrameNesting = getFrameNesting(),
      topmostFrame = _getFrameNesting.topmostFrame,
      currentFrameNesting = _getFrameNesting.currentFrameNesting;

  return {
    location: topmostFrame.location.href,
    referrer: topmostFrame.document.referrer !== '' ? topmostFrame.document.referrer : null,
    masked: currentFrameNesting,
    wWidth: topmostFrame.innerWidth,
    wHeight: topmostFrame.innerHeight,
    oWidth: topmostFrame.outerWidth,
    oHeight: topmostFrame.outerHeight,
    sWidth: topmostFrame.screen.width,
    sHeight: topmostFrame.screen.height,
    aWidth: topmostFrame.screen.availWidth,
    aHeight: topmostFrame.screen.availHeight,
    sLeft: 'screenLeft' in topmostFrame ? topmostFrame.screenLeft : topmostFrame.screenX,
    sTop: 'screenTop' in topmostFrame ? topmostFrame.screenTop : topmostFrame.screenY,
    xOffset: topmostFrame.pageXOffset,
    yOffset: topmostFrame.pageYOffset,
    docHidden: getDocumentVisibility(topmostFrame),
    docHeight: topmostFrame.document.body ? topmostFrame.document.body.scrollHeight : null,
    hLength: history.length,
    timing: getTiming(),
    version: {
      prebid: "4.2.0",
      adapter: '1.0.0'
    }
  };
}

function requestsToBids(bidRequests) {
  var videoBidRequests = bidRequests.filter(function (bidRequest) {
    return hasTypeVideo(bidRequest);
  }).map(function (bidRequest) {
    var videoObj = {};
    setGeneralInfo.call(videoObj, bidRequest); // Pass parameters
    // Context: instream - outstream - adpod

    videoObj['context'] = bidRequest.mediaTypes.video.context; // MIME Video Types

    videoObj['mimes'] = bidRequest.mediaTypes.video.mimes; // Sizes

    videoObj['playerSize'] = parseVideoSize(bidRequest); // Other params

    videoObj['protocols'] = bidRequest.mediaTypes.video.protocols;
    videoObj['maxDuration'] = bidRequest.mediaTypes.video.maxduration;
    videoObj['api'] = bidRequest.mediaTypes.video.api;
    videoObj['type'] = __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["d" /* VIDEO */];
    return videoObj;
  });
  var bannerBidRequests = bidRequests.filter(function (bidRequest) {
    return isValid(__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["b" /* BANNER */], bidRequest);
  }).map(function (bidRequest) {
    var bannerObj = {};
    setGeneralInfo.call(bannerObj, bidRequest);
    bannerObj['sizes'] = parseSizes(bidRequest);
    bannerObj['type'] = __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["b" /* BANNER */];
    return bannerObj;
  });
  return videoBidRequests.concat(bannerBidRequests);
}

function setGeneralInfo(bidRequest) {
  var params = bidRequest.params;
  this['adUnitCode'] = bidRequest.adUnitCode;
  this['bidId'] = bidRequest.bidId;
  this['bidderRequestId'] = bidRequest.bidderRequestId;
  this['auctionId'] = bidRequest.auctionId;
  this['transactionId'] = bidRequest.transactionId;
  this['pubId'] = params.pubId;
  this['ext'] = params.ext;

  if (params.pubClick) {
    this['click'] = params.pubClick;
  }

  if (params.dealId) {
    this['dealId'] = params.dealId;
  }

  var coords = getSpaceCoords(bidRequest.adUnitCode);

  if (coords) {
    this['coords'] = coords;
  }
}

function getSpaceCoords(id) {
  var space = document.getElementById(id);

  try {
    var _space$getBoundingCli = space.getBoundingClientRect(),
        top = _space$getBoundingCli.top,
        left = _space$getBoundingCli.left,
        width = _space$getBoundingCli.width,
        height = _space$getBoundingCli.height;

    var _window = space.ownerDocument.defaultView;
    var coords = {
      top: top + _window.pageYOffset,
      left: left + _window.pageXOffset,
      width: width,
      height: height
    };
    var frame = _window.frameElement;

    while (frame != null) {
      var _frame$getBoundingCli = frame.getBoundingClientRect(),
          _top = _frame$getBoundingCli.top,
          _left = _frame$getBoundingCli.left;

      coords.top += _top + _window.pageYOffset;
      coords.left += _left + _window.pageXOffset;
      _window = _window.parent;
      frame = _window.frameElement;
    }

    return coords;
  } catch (e) {
    return null;
  }
}

function getTiming() {
  try {
    if (window.performance != null && window.performance.timing != null) {
      var timing = {};
      var perf = window.performance.timing;
      timing.pageLoadTime = perf.loadEventEnd - perf.navigationStart;
      timing.connectTime = perf.responseEnd - perf.requestStart;
      timing.renderTime = perf.domComplete - perf.domLoading;
      return timing;
    }
  } catch (e) {
    return null;
  }

  return null;
}

function parseVideoSize(bid) {
  var playerSize = bid.mediaTypes.video.playerSize;

  if (typeof playerSize !== 'undefined' && Array.isArray(playerSize) && playerSize.length > 0) {
    return getSizes(playerSize);
  }

  return [];
}

function parseSizes(bid) {
  var ret = [];

  if (typeof bid.mediaTypes !== 'undefined' && typeof bid.mediaTypes.banner !== 'undefined' && typeof bid.mediaTypes.banner.sizes !== 'undefined' && Array.isArray(bid.mediaTypes.banner.sizes) && bid.mediaTypes.banner.sizes.length > 0) {
    return getSizes(bid.mediaTypes.banner.sizes);
  }

  var isVideoBidRequest = hasTypeVideo(bid);

  if (!isVideoBidRequest && bid.sizes && Array.isArray(bid.sizes)) {
    return getSizes(bid.sizes);
  }

  return ret;
}

function getSizes(sizes) {
  var ret = [];

  for (var i = 0; i < sizes.length; i++) {
    var size = sizes[i];
    ret.push({
      width: size[0],
      height: size[1]
    });
  }

  return ret;
}

function getUserSyncs(syncOptions, serverResponses, gdprConsent, uspConsent) {
  var syncs = [];
  var params = '';

  if (gdprConsent && typeof gdprConsent.consentString === 'string') {
    params += '&gdpr_consent=' + gdprConsent.consentString;

    if (typeof gdprConsent.gdprApplies === 'boolean') {
      params += '&gdpr=' + (gdprConsent.gdprApplies ? 1 : 0);
    }
  }

  if (uspConsent && typeof uspConsent === 'string') {
    params += '&us_privacy=' + uspConsent;
  }

  if (syncOptions.iframeEnabled) {
    syncs.push({
      type: 'iframe',
      url: USER_SYNC_ENDPOINT + '?cb=' + new Date().getTime() + params
    });
  }

  if (syncOptions.pixelEnabled) {
    syncs.push({
      type: 'image',
      url: USER_SYNC_ENDPOINT + '?tag=img' + params
    });
  }

  return syncs;
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs
};
Object(__WEBPACK_IMPORTED_MODULE_5__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[559]);