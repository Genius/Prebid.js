pbjsChunk([294],{

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(234);


/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var subdomainSuffixes = ['', 1, 2];

var getUri = function () {
  var num = 0;
  return function () {
    return 'https://ghb' + subdomainSuffixes[num++ % subdomainSuffixes.length] + '.adtelligent.com/v2/auction/';
  };
}();

var OUTSTREAM_SRC = 'https://player.adtelligent.com/outstream-unit/2.01/outstream.min.js';
var BIDDER_CODE = 'adtelligent';
var OUTSTREAM = 'outstream';
var DISPLAY = 'display';
var syncsCache = {};
var spec = {
  code: BIDDER_CODE,
  gvlid: 410,
  aliases: ['onefiftytwomedia', 'selectmedia'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.aid');
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    function addSyncs(bid) {
      var uris = bid.cookieURLs;
      var types = bid.cookieURLSTypes || [];

      if (Array.isArray(uris)) {
        uris.forEach(function (uri, i) {
          var type = types[i] || 'image';

          if (!syncOptions.pixelEnabled && type === 'image' || !syncOptions.iframeEnabled && type === 'iframe' || syncsCache[uri]) {
            return;
          }

          syncsCache[uri] = true;
          syncs.push({
            type: type,
            url: uri
          });
        });
      }
    }

    if (syncOptions.pixelEnabled || syncOptions.iframeEnabled) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](serverResponses) && serverResponses.forEach(function (response) {
        if (response.body) {
          if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](response.body)) {
            response.body.forEach(function (b) {
              addSyncs(b);
            });
          } else {
            addSyncs(response.body);
          }
        }
      });
    }

    return syncs;
  },

  /**
   * Make a server request from the list of BidRequests
   * @param bidRequests
   * @param adapterRequest
   */
  buildRequests: function buildRequests(bidRequests, adapterRequest) {
    var adapterSettings = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig(adapterRequest.bidderCode);
    var chunkSize = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adapterSettings, 'chunkSize', 10);

    var _bidToTag = bidToTag(bidRequests, adapterRequest),
        tag = _bidToTag.tag,
        bids = _bidToTag.bids;

    var bidChunks = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["chunk"](bids, chunkSize);
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_map"](bidChunks, function (bids) {
      return {
        data: _extends({}, tag, {
          BidRequests: bids
        }),
        adapterRequest: adapterRequest,
        method: 'POST',
        url: getUri()
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids
   * @param serverResponse
   * @param bidderRequest
   * @return {Bid[]} An array of bids which were nested inside the server
   */
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var adapterRequest = _ref.adapterRequest;
    serverResponse = serverResponse.body;
    var bids = [];

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](serverResponse)) {
      return parseRTBResponse(serverResponse, adapterRequest);
    }

    serverResponse.forEach(function (serverBidResponse) {
      bids = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["flatten"](bids, parseRTBResponse(serverBidResponse, adapterRequest));
    });
    return bids;
  },
  transformBidParams: function transformBidParams(params) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["convertTypes"]({
      'aid': 'number'
    }, params);
  }
};

function parseRTBResponse(serverResponse, adapterRequest) {
  var isEmptyResponse = !serverResponse || !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](serverResponse.bids);
  var bids = [];

  if (isEmptyResponse) {
    return bids;
  }

  serverResponse.bids.forEach(function (serverBid) {
    var request = __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js___default()(adapterRequest.bids, function (bidRequest) {
      return bidRequest.bidId === serverBid.requestId;
    });

    if (serverBid.cpm !== 0 && request !== undefined) {
      var bid = createBid(serverBid, request);
      bids.push(bid);
    }
  });
  return bids;
}

function bidToTag(bidRequests, adapterRequest) {
  // start publisher env
  var tag = {
    Domain: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adapterRequest, 'refererInfo.referer')
  };

  if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('coppa') === true) {
    tag.Coppa = 1;
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adapterRequest, 'gdprConsent.gdprApplies')) {
    tag.GDPR = 1;
    tag.GDPRConsent = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adapterRequest, 'gdprConsent.consentString');
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adapterRequest, 'uspConsent')) {
    tag.USP = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adapterRequest, 'uspConsent');
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequests[0], 'schain')) {
    tag.Schain = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequests[0], 'schain');
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequests[0], 'userId')) {
    tag.UserIds = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequests[0], 'userId');
  } // end publisher env


  var bids = [];

  for (var i = 0, length = bidRequests.length; i < length; i++) {
    var bid = prepareBidRequests(bidRequests[i]);
    bids.push(bid);
  }

  return {
    tag: tag,
    bids: bids
  };
}
/**
 * Parse mediaType
 * @param bidReq {object}
 * @returns {object}
 */


function prepareBidRequests(bidReq) {
  var mediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidReq, 'mediaTypes.video') ? __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */] : DISPLAY;
  var sizes = mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */] ? __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidReq, 'mediaTypes.video.playerSize') : __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidReq, 'mediaTypes.banner.sizes');
  var bidReqParams = {
    'CallbackId': bidReq.bidId,
    'Aid': bidReq.params.aid,
    'AdType': mediaType,
    'Sizes': __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](sizes).join(',')
  };

  if (mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]) {
    var context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidReq, 'mediaTypes.video.context');

    if (context === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["a" /* ADPOD */]) {
      bidReqParams.Adpod = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidReq, 'mediaTypes.video');
    }
  }

  return bidReqParams;
}
/**
 * Prepare all parameters for request
 * @param bidderRequest {object}
 * @returns {object}
 */


function getMediaType(bidderRequest) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest, 'mediaTypes.video') ? __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */] : __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */];
}
/**
 * Configure new bid by response
 * @param bidResponse {object}
 * @param bidRequest {Object}
 * @returns {object}
 */


function createBid(bidResponse, bidRequest) {
  var mediaType = getMediaType(bidRequest);
  var context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.context');
  var bid = {
    requestId: bidResponse.requestId,
    creativeId: bidResponse.cmpId,
    height: bidResponse.height,
    currency: bidResponse.cur,
    width: bidResponse.width,
    cpm: bidResponse.cpm,
    netRevenue: true,
    mediaType: mediaType,
    ttl: 300
  };

  if (mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]) {
    return _extends(bid, {
      ad: bidResponse.ad
    });
  }

  if (context === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["a" /* ADPOD */]) {
    _extends(bid, {
      meta: {
        primaryCatId: bidResponse.primaryCatId
      },
      video: {
        context: __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["a" /* ADPOD */],
        durationSeconds: bidResponse.durationSeconds
      }
    });
  }

  _extends(bid, {
    vastUrl: bidResponse.vastUrl
  });

  if (context === OUTSTREAM) {
    _extends(bid, {
      adResponse: bidResponse,
      renderer: newRenderer(bidResponse.requestId, bidRequest.params)
    });
  }

  return bid;
}
/**
 * Create Adtelligent renderer
 * @param requestId
 * @returns {*}
 */


function newRenderer(requestId, bidderParams) {
  var renderer = __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__["a" /* Renderer */].install({
    id: requestId,
    url: OUTSTREAM_SRC,
    config: bidderParams.outstream || {},
    loaded: false
  });
  renderer.setRender(outstreamRender);
  return renderer;
}
/**
 * Initialise Adtelligent outstream
 * @param bid
 */


function outstreamRender(bid) {
  bid.renderer.push(function () {
    var opts = _extends({}, bid.renderer.getConfig(), {
      width: bid.width,
      height: bid.height,
      vastUrl: bid.vastUrl,
      elId: bid.adUnitCode
    });

    window.VOutstreamAPI.initOutstreams([opts]);
  });
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[233]);