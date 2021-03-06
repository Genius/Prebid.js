pbjsChunk([264],{

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(113);


/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_url__ = __webpack_require__(9);




var DEFAULT_ADKERNEL_DSP_DOMAIN = 'tag.adkernel.com';
var DEFAULT_MIMES = ['video/mp4', 'video/webm', 'application/x-shockwave-flash', 'application/javascript'];
var DEFAULT_PROTOCOLS = [2, 3, 5, 6];
var DEFAULT_APIS = [1, 2];

function isRtbDebugEnabled(refInfo) {
  return refInfo.referer.indexOf('adk_debug=true') !== -1;
}

function buildImp(bidRequest) {
  var imp = {
    id: bidRequest.bidId,
    tagid: bidRequest.adUnitCode
  };
  var bannerReq = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, "mediaTypes.banner");
  var videoReq = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, "mediaTypes.video");

  if (bannerReq) {
    var sizes = canonicalizeSizesArray(bannerReq.sizes);
    imp.banner = {
      format: __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](sizes)
    };
  } else if (videoReq) {
    var size = canonicalizeSizesArray(videoReq.playerSize)[0];
    imp.video = {
      w: size[0],
      h: size[1],
      mimes: videoReq.mimes || DEFAULT_MIMES,
      protocols: videoReq.protocols || DEFAULT_PROTOCOLS,
      api: videoReq.api || DEFAULT_APIS
    };
  }

  return imp;
}
/**
 * Convert input array of sizes to canonical form Array[Array[Number]]
 * @param sizes
 * @return Array[Array[Number]]
 */


function canonicalizeSizesArray(sizes) {
  if (sizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](sizes[0])) {
    return [sizes];
  }

  return sizes;
}

function buildRequestParams(tags, auctionId, transactionId, gdprConsent, refInfo) {
  var req = {
    id: auctionId,
    tid: transactionId,
    site: buildSite(refInfo),
    imp: tags
  };

  if (gdprConsent && (gdprConsent.gdprApplies !== undefined || gdprConsent.consentString !== undefined)) {
    req.user = {};

    if (gdprConsent.gdprApplies !== undefined) {
      req.user.gdpr = ~~gdprConsent.gdprApplies;
    }

    if (gdprConsent.consentString !== undefined) {
      req.user.consent = gdprConsent.consentString;
    }
  }

  return req;
}

function buildSite(refInfo) {
  var loc = Object(__WEBPACK_IMPORTED_MODULE_3__src_url__["c" /* parse */])(refInfo.referer);
  var result = {
    page: "".concat(loc.protocol, "://").concat(loc.hostname).concat(loc.pathname),
    secure: ~~(loc.protocol === 'https')
  };

  if (self === top && document.referrer) {
    result.ref = document.referrer;
  }

  var keywords = document.getElementsByTagName('meta')['keywords'];

  if (keywords && keywords.content) {
    result.keywords = keywords.content;
  }

  return result;
}

function buildBid(tag) {
  var bid = {
    requestId: tag.impid,
    bidderCode: spec.code,
    cpm: tag.bid,
    width: tag.w,
    height: tag.h,
    creativeId: tag.crid,
    currency: 'USD',
    ttl: 720,
    netRevenue: true
  };

  if (tag.tag) {
    bid.ad = tag.tag;
    bid.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */];
  } else if (tag.vast_url) {
    bid.vastUrl = tag.vast_url;
    bid.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */];
  }

  return bid;
}

var spec = {
  code: 'adkernelAdn',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],
  aliases: ['engagesimply'],
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return 'params' in bidRequest && (typeof bidRequest.params.host === 'undefined' || typeof bidRequest.params.host === 'string') && typeof bidRequest.params.pubId === 'number' && 'mediaTypes' in bidRequest && ('banner' in bidRequest.mediaTypes || 'video' in bidRequest.mediaTypes);
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var dispatch = bidRequests.map(buildImp).reduce(function (acc, curr, index) {
      var bidRequest = bidRequests[index];
      var pubId = bidRequest.params.pubId;
      var host = bidRequest.params.host || DEFAULT_ADKERNEL_DSP_DOMAIN;
      acc[host] = acc[host] || {};
      acc[host][pubId] = acc[host][pubId] || [];
      acc[host][pubId].push(curr);
      return acc;
    }, {});
    var auctionId = bidderRequest.auctionId,
        gdprConsent = bidderRequest.gdprConsent,
        transactionId = bidderRequest.transactionId,
        refererInfo = bidderRequest.refererInfo;
    var requests = [];
    Object.keys(dispatch).forEach(function (host) {
      Object.keys(dispatch[host]).forEach(function (pubId) {
        var request = buildRequestParams(dispatch[host][pubId], auctionId, transactionId, gdprConsent, refererInfo);
        requests.push({
          method: 'POST',
          url: "//".concat(host, "/tag?account=").concat(pubId, "&pb=1").concat(isRtbDebugEnabled(refererInfo) ? '&debug=1' : ''),
          data: JSON.stringify(request)
        });
      });
    });
    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var response = serverResponse.body;

    if (!response.tags) {
      return [];
    }

    if (response.debug) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]("ADKERNEL DEBUG:\n".concat(response.debug));
    }

    return response.tags.map(buildBid);
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (!syncOptions.iframeEnabled || !serverResponses || serverResponses.length === 0) {
      return [];
    }

    return serverResponses.filter(function (rps) {
      return rps.body && rps.body.syncpages;
    }).map(function (rsp) {
      return rsp.body.syncpages;
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []).map(function (syncUrl) {
      return {
        type: 'iframe',
        url: syncUrl
      };
    });
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[112]);