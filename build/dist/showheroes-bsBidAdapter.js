pbjsChunk([106],{

/***/ 688:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(689);


/***/ }),

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_adloader_js__ = __webpack_require__(39);






var PROD_ENDPOINT = 'https://bs.showheroes.com/api/v1/bid';
var STAGE_ENDPOINT = 'https://bid-service.stage.showheroes.com/api/v1/bid';
var PROD_PUBLISHER_TAG = 'https://static.showheroes.com/publishertag.js';
var STAGE_PUBLISHER_TAG = 'https://pubtag.stage.showheroes.com/publishertag.js';
var PROD_VL = 'https://video-library.showheroes.com';
var STAGE_VL = 'https://video-library.stage.showheroes.com';
var BIDDER_CODE = 'showheroes-bs';
var TTL = 300;

function getEnvURLs(isStage) {
  return {
    pubTag: isStage ? STAGE_PUBLISHER_TAG : PROD_PUBLISHER_TAG,
    vlHost: isStage ? STAGE_VL : PROD_VL
  };
}

var spec = {
  code: BIDDER_CODE,
  aliases: ['showheroesBs'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.playerId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var adUnits = [];
    var pageURL = validBidRequests[0].params.contentPageUrl || bidderRequest.refererInfo.referer;
    var isStage = !!validBidRequests[0].params.stage;
    var isOutstream = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'mediaTypes.video.context') === 'outstream';
    var isCustomRender = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.outstreamOptions.customRender');
    var isNodeRender = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.outstreamOptions.slot') || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.outstreamOptions.iframe');
    var isNativeRender = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'renderer');
    var outstreamOptions = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.outstreamOptions');
    var isBanner = !!validBidRequests[0].mediaTypes.banner || isOutstream && !(isCustomRender || isNativeRender || isNodeRender);
    var defaultSchain = validBidRequests[0].schain || {};
    validBidRequests.forEach(function (bid) {
      var videoSizes = getVideoSizes(bid);
      var bannerSizes = getBannerSizes(bid);
      var vpaidMode = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('vpaidMode', bid.params);

      var makeBids = function makeBids(type, size) {
        var context = '';
        var streamType = 2;

        if (type === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */]) {
          streamType = 5;
        } else {
          context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.context');

          if (vpaidMode && context === 'instream') {
            streamType = 1;
          }

          if (context === 'outstream') {
            streamType = 5;
          }
        }

        return {
          type: streamType,
          bidId: bid.bidId,
          mediaType: type,
          context: context,
          playerId: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('playerId', bid.params),
          auctionId: bidderRequest.auctionId,
          bidderCode: BIDDER_CODE,
          gdprConsent: bidderRequest.gdprConsent,
          start: +new Date(),
          timeout: 3000,
          size: {
            width: size[0],
            height: size[1]
          },
          params: bid.params,
          schain: bid.schain || defaultSchain
        };
      };

      videoSizes.forEach(function (size) {
        adUnits.push(makeBids(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */], size));
      });
      bannerSizes.forEach(function (size) {
        adUnits.push(makeBids(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */], size));
      });
    });
    return {
      url: isStage ? STAGE_ENDPOINT : PROD_ENDPOINT,
      method: 'POST',
      options: {
        contentType: 'application/json',
        accept: 'application/json'
      },
      data: {
        'user': [],
        'meta': {
          'adapterVersion': 2,
          'pageURL': encodeURIComponent(pageURL),
          'vastCacheEnabled': !!__WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('cache') && !isBanner && !outstreamOptions || false,
          'isDesktop': __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getWindowTop"]().document.documentElement.clientWidth > 700,
          'xmlAndTag': !!(isOutstream && isCustomRender) || false,
          'stage': isStage || undefined
        },
        'requests': adUnits,
        'debug': validBidRequests[0].params.debug || false
      }
    };
  },
  interpretResponse: function interpretResponse(response, request) {
    return createBids(response.body, request.data);
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (!serverResponses.length || !serverResponses[0].body.userSync) {
      return syncs;
    }

    var userSync = serverResponses[0].body.userSync;

    if (syncOptions.iframeEnabled) {
      (userSync.iframes || []).forEach(function (url) {
        syncs.push({
          type: 'iframe',
          url: url
        });
      });
    }

    if (syncOptions.pixelEnabled) {
      (userSync.pixels || []).forEach(function (url) {
        syncs.push({
          type: 'image',
          url: url
        });
      });
    }

    return syncs;
  }
};

function createBids(bidRes, reqData) {
  if (bidRes && (!Array.isArray(bidRes.bids) || bidRes.bids.length < 1)) {
    return [];
  }

  var bids = [];
  var bidMap = {};
  (reqData.requests || []).forEach(function (bid) {
    bidMap[bid.bidId] = bid;
  });
  bidRes.bids.forEach(function (bid) {
    var reqBid = bidMap[bid.bidId];
    var currentBidParams = reqBid.params;
    var bidUnit = {};
    bidUnit.cpm = bid.cpm;
    bidUnit.requestId = bid.bidId;
    bidUnit.currency = bid.currency;
    bidUnit.mediaType = bid.mediaType || __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */];
    bidUnit.ttl = TTL;
    bidUnit.creativeId = 'c_' + bid.bidId;
    bidUnit.netRevenue = true;
    bidUnit.width = bid.size.width;
    bidUnit.height = bid.size.height;

    if (bid.vastXml) {
      bidUnit.vastXml = bid.vastXml;
      bidUnit.adResponse = {
        content: bid.vastXml
      };
    }

    if (bid.vastTag) {
      bidUnit.vastUrl = bid.vastTag;
    }

    if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */]) {
      bidUnit.ad = getBannerHtml(bid, reqBid, reqData);
    } else if (bid.context === 'outstream') {
      var renderer = __WEBPACK_IMPORTED_MODULE_2__src_Renderer_js__["a" /* Renderer */].install({
        id: bid.bidId,
        url: '//',
        config: {
          playerId: reqBid.playerId,
          width: bid.size.width,
          height: bid.size.height,
          vastUrl: bid.vastTag,
          vastXml: bid.vastXml,
          debug: reqData.debug,
          isStage: !!reqData.meta.stage,
          customRender: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('customRender', currentBidParams.outstreamOptions),
          slot: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('slot', currentBidParams.outstreamOptions),
          iframe: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('iframe', currentBidParams.outstreamOptions)
        }
      });
      renderer.setRender(outstreamRender);
      bidUnit.renderer = renderer;
    }

    bids.push(bidUnit);
  });
  return bids;
}

function outstreamRender(bid) {
  var embedCode = createOutstreamEmbedCode(bid);

  if (typeof bid.renderer.config.customRender === 'function') {
    bid.renderer.config.customRender(bid, embedCode);
  } else {
    try {
      var inIframe = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('iframe', bid.renderer.config);

      if (inIframe && window.document.getElementById(inIframe).nodeName === 'IFRAME') {
        var iframe = window.document.getElementById(inIframe);
        var framedoc = iframe.contentDocument || iframe.contentWindow && iframe.contentWindow.document;
        framedoc.body.appendChild(embedCode);
        return;
      }

      var slot = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('slot', bid.renderer.config) || bid.adUnitCode;

      if (slot && window.document.getElementById(slot)) {
        window.document.getElementById(slot).appendChild(embedCode);
      } else if (slot) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('[ShowHeroes][renderer] Error: spot not found');
      }
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('[ShowHeroes][renderer] Error:' + err.message);
    }
  }
}

function createOutstreamEmbedCode(bid) {
  var isStage = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('isStage', bid.renderer.config);
  var urls = getEnvURLs(isStage);
  var fragment = window.document.createDocumentFragment();
  var script = Object(__WEBPACK_IMPORTED_MODULE_5__src_adloader_js__["a" /* loadExternalScript */])(urls.pubTag, 'outstream', function () {
    window.ShowheroesTag = this;
  });
  script.setAttribute('data-player-host', urls.vlHost);
  var spot = window.document.createElement('div');
  spot.setAttribute('class', 'showheroes-spot');
  spot.setAttribute('data-player', __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('playerId', bid.renderer.config));
  spot.setAttribute('data-debug', __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('debug', bid.renderer.config));
  spot.setAttribute('data-ad-vast-tag', __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('vastUrl', bid.renderer.config));
  spot.setAttribute('data-stream-type', 'outstream');
  fragment.appendChild(spot);
  fragment.appendChild(script);
  return fragment;
}

function getBannerHtml(bid, reqBid, reqData) {
  var isStage = !!reqData.meta.stage;
  var urls = getEnvURLs(isStage);
  return "<html>\n    <head></head>\n    <body>\n      <script async src=\"".concat(urls.pubTag, "\"\n              data-canvas=\"\"\n              data-noad-passback-listener=\"\"\n              onload=\"window.ShowheroesTag=this\"\n              data-player-host=\"").concat(urls.vlHost, "\"></script>\n      <div class=\"showheroes-spot\"\n            data-debug=\"").concat(reqData.debug ? '1' : '', "\"\n            data-player=\"").concat(reqBid.playerId, "\"\n            data-ad-vast-tag=\"").concat(bid.vastTag, "\"></div>\n    </body>\n  </html>");
}

function getVideoSizes(bidRequest) {
  return formatSizes(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.playerSize') || []);
}

function getBannerSizes(bidRequest) {
  return formatSizes(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.banner.sizes') || []);
}

function formatSizes(sizes) {
  if (!sizes || !sizes.length) {
    return [];
  }

  return Array.isArray(sizes[0]) ? sizes : [sizes];
}

Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[688]);