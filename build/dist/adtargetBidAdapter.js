pbjsChunk([295],{

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(232);


/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var ENDPOINT = 'https://ghb.console.adtarget.com.tr/v2/auction/';
var BIDDER_CODE = 'adtarget';
var DISPLAY = 'display';
var syncsCache = {};
var spec = {
  code: BIDDER_CODE,
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
        url: ENDPOINT
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var adapterRequest = _ref.adapterRequest;
    serverResponse = serverResponse.body;
    var bids = [];

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](serverResponse)) {
      return parseResponse(serverResponse, adapterRequest);
    }

    serverResponse.forEach(function (serverBidResponse) {
      bids = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["flatten"](bids, parseResponse(serverBidResponse, adapterRequest));
    });
    return bids;
  }
};

function parseResponse(serverResponse, adapterRequest) {
  var isInvalidValidResp = !serverResponse || !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](serverResponse.bids);
  var bids = [];

  if (isInvalidValidResp) {
    var extMessage = serverResponse && serverResponse.ext && serverResponse.ext.message ? ": ".concat(serverResponse.ext.message) : '';
    var errorMessage = "in response for ".concat(adapterRequest.bidderCode, " adapter ").concat(extMessage);
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](errorMessage);
    return bids;
  }

  serverResponse.bids.forEach(function (serverBid) {
    var request = __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default()(adapterRequest.bids, function (bidRequest) {
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
  }

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

function prepareBidRequests(bidReq) {
  var mediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidReq, 'mediaTypes.video') ? __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */] : DISPLAY;
  var sizes = mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */] ? __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidReq, 'mediaTypes.video.playerSize') : __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidReq, 'mediaTypes.banner.sizes');
  var bidReqParams = {
    'CallbackId': bidReq.bidId,
    'Aid': bidReq.params.aid,
    'AdType': mediaType,
    'Sizes': __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](sizes).join(',')
  };
  return bidReqParams;
}

function getMediaType(bidderRequest) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest, 'mediaTypes.video') ? __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */] : __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */];
}

function createBid(bidResponse, bidRequest) {
  var mediaType = getMediaType(bidRequest);
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

  _extends(bid, {
    vastUrl: bidResponse.vastUrl
  });

  return bid;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[231]);