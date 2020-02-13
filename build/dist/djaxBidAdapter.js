pbjsChunk([202],{

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(291);


/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_Renderer__ = __webpack_require__(11);






var SUPPORTED_AD_TYPES = [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */]];
var BIDDER_CODE = 'djax';
var DOMAIN = 'https://demo.reviveadservermod.com/headerbidding_adminshare/';
var RENDERER_URL = '//acdn.adnxs.com/video/outstream/ANOutstreamVideo.js';

function isBidRequestValid(bid) {
  return typeof bid.params !== 'undefined' && parseInt(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getValue"](bid.params, 'publisherId')) > 0;
}

function buildRequests(validBidRequests) {
  return {
    method: 'POST',
    url: DOMAIN + 'www/admin/plugins/Prebid/getAd.php',
    options: {
      withCredentials: false,
      crossOrigin: true
    },
    data: validBidRequests
  };
}

function interpretResponse(serverResponse, request) {
  var response = serverResponse.body;
  var bidResponses = [];
  var bidRequestResponses = [];

  __WEBPACK_IMPORTED_MODULE_2__src_utils__["_each"](response, function (bidAd) {
    bidAd.adResponse = {
      content: bidAd.vastXml,
      height: bidAd.height,
      width: bidAd.width
    };
    bidAd.ttl = __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('_bidderTimeout');
    bidAd.renderer = bidAd.context === 'outstream' ? createRenderer(bidAd, {
      id: bidAd.adUnitCode,
      url: RENDERER_URL
    }, bidAd.adUnitCode) : undefined;
    bidResponses.push(bidAd);
  });

  bidRequestResponses.push({
    function: 'saveResponses',
    request: request,
    response: bidResponses
  });
  sendResponseToServer(bidRequestResponses);
  return bidResponses;
}

function outstreamRender(bidAd) {
  bidAd.renderer.push(function () {
    window.ANOutstreamVideo.renderAd({
      sizes: [bidAd.width, bidAd.height],
      width: bidAd.width,
      height: bidAd.height,
      targetId: bidAd.adUnitCode,
      adResponse: bidAd.adResponse,
      rendererOptions: {
        showVolume: false,
        allowFullscreen: false
      }
    });
  });
}

function createRenderer(bidAd, rendererParams, adUnitCode) {
  var renderer = __WEBPACK_IMPORTED_MODULE_5__src_Renderer__["a" /* Renderer */].install({
    id: rendererParams.id,
    url: rendererParams.url,
    loaded: false,
    config: {
      'player_height': bidAd.height,
      'player_width': bidAd.width
    },
    adUnitCode: adUnitCode
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  return renderer;
}

function onBidWon(bid) {
  var wonBids = [];
  wonBids.push(bid);
  wonBids[0].function = 'onBidWon';
  sendResponseToServer(wonBids);
}

function onTimeout(details) {
  details.unshift({
    'function': 'onTimeout'
  });
  sendResponseToServer(details);
}

function sendResponseToServer(data) {
  Object(__WEBPACK_IMPORTED_MODULE_4__src_ajax__["a" /* ajax */])(DOMAIN + 'www/admin/plugins/Prebid/tracking/track.php', null, JSON.stringify(data), {
    withCredentials: false,
    method: 'POST',
    crossOrigin: true
  });
}

function getUserSyncs(syncOptions) {
  if (syncOptions.iframeEnabled) {
    return [{
      type: 'iframe',
      url: DOMAIN + 'www/admin/plugins/Prebid/userSync.php'
    }];
  }
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: SUPPORTED_AD_TYPES,
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs,
  onBidWon: onBidWon,
  onTimeout: onTimeout
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[290]);