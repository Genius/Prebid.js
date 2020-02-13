pbjsChunk([101],{

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(533);


/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes__);





var VIDEO_TARGETING = ['mimes', 'minduration', 'maxduration', 'protocols', 'startdelay', 'linearity', 'boxingallowed', 'playbackmethod', 'delivery', 'pos', 'api', 'ext'];
var VERSION = '1.1';
/**
 * Adapter for requesting bids from RtbdemandAdk white-label display platform
 */

var spec = {
  code: 'rtbdemandadk',
  aliases: ['headbidding'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return 'params' in bidRequest && typeof bidRequest.params.host !== 'undefined' && 'zoneId' in bidRequest.params && !isNaN(Number(bidRequest.params.zoneId));
  },
  buildRequests: function buildRequests(bidRequests) {
    var auctionId;
    var dispatch = bidRequests.map(buildImp).reduce(function (acc, curr, index) {
      var bidRequest = bidRequests[index];
      var zoneId = bidRequest.params.zoneId;
      var host = bidRequest.params.host;
      acc[host] = acc[host] || {};
      acc[host][zoneId] = acc[host][zoneId] || [];
      acc[host][zoneId].push(curr);
      auctionId = bidRequest.bidderRequestId;
      return acc;
    }, {});
    var requests = [];
    Object.keys(dispatch).forEach(function (host) {
      Object.keys(dispatch[host]).forEach(function (zoneId) {
        var request = buildRtbRequest(dispatch[host][zoneId], auctionId);
        requests.push({
          method: 'GET',
          url: "".concat(window.location.protocol, "//").concat(host, "/rtbg"),
          data: {
            zone: Number(zoneId),
            ad_type: 'rtb',
            v: VERSION,
            r: JSON.stringify(request)
          }
        });
      });
    });
    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var response = serverResponse.body;

    if (!response.seatbid) {
      return [];
    }

    var rtbRequest = JSON.parse(request.data.r);
    var rtbImps = rtbRequest.imp;
    var rtbBids = response.seatbid.map(function (seatbid) {
      return seatbid.bid;
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []);
    return rtbBids.map(function (rtbBid) {
      var imp = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(rtbImps, function (imp) {
        return imp.id === rtbBid.impid;
      });
      var prBid = {
        requestId: rtbBid.impid,
        cpm: rtbBid.price,
        creativeId: rtbBid.crid,
        currency: 'USD',
        ttl: 360,
        netRevenue: true
      };

      if ('banner' in imp) {
        prBid.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */];
        prBid.width = rtbBid.w;
        prBid.height = rtbBid.h;
        prBid.ad = formatAdMarkup(rtbBid);
      }

      if ('video' in imp) {
        prBid.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */];
        prBid.vastUrl = rtbBid.nurl;
        prBid.width = imp.video.w;
        prBid.height = imp.video.h;
      }

      return prBid;
    });
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (!syncOptions.iframeEnabled || !serverResponses || serverResponses.length === 0) {
      return [];
    }

    return serverResponses.filter(function (rsp) {
      return rsp.body && rsp.body.ext && rsp.body.ext.adk_usersync;
    }).map(function (rsp) {
      return rsp.body.ext.adk_usersync;
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
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);
/**
 *  Builds parameters object for single impression
 */

function buildImp(bid) {
  var sizes = bid.sizes;
  var imp = {
    'id': bid.bidId,
    'tagid': bid.placementCode
  };

  if (bid.mediaType === 'video') {
    imp.video = {
      w: sizes[0],
      h: sizes[1]
    };

    if (bid.params.video) {
      Object.keys(bid.params.video).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes___default()(VIDEO_TARGETING, param);
      }).forEach(function (param) {
        return imp.video[param] = bid.params.video[param];
      });
    }
  } else {
    imp.banner = {
      format: sizes.map(function (s) {
        return {
          'w': s[0],
          'h': s[1]
        };
      }),
      topframe: 0
    };
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().protocol === 'https:') {
    imp.secure = 1;
  }

  return imp;
}
/**
 * Builds complete rtb request
 * @param imps collection of impressions
 * @param auctionId
 */


function buildRtbRequest(imps, auctionId) {
  var req = {
    'id': auctionId,
    'imp': imps,
    'site': createSite(),
    'at': 1,
    'device': {
      'ip': 'caller',
      'ua': 'caller',
      'js': 1,
      'language': getLanguage()
    },
    'ext': {
      'adk_usersync': 1
    }
  };

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["getDNT"]()) {
    req.device.dnt = 1;
  }

  return req;
}

function getLanguage() {
  var language = navigator.language ? 'language' : 'userLanguage';
  return navigator[language].split('-')[0];
}
/**
 * Creates site description object
 */


function createSite() {
  var location = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]();
  return {
    'domain': location.hostname,
    'page': location.href.split('?')[0]
  };
}
/**
 *  Format creative with optional nurl call
 *  @param bid rtb Bid object
 */


function formatAdMarkup(bid) {
  var adm = bid.adm;

  if ('nurl' in bid) {
    adm += __WEBPACK_IMPORTED_MODULE_0__src_utils__["createTrackPixelHtml"]("".concat(bid.nurl, "&px=1"));
  }

  return "<!DOCTYPE html><html><head><title></title><body style='margin:0px;padding:0px;'>".concat(adm, "</body></head>");
}

/***/ })

},[532]);