pbjsChunk([153],{

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(255);


/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);



var BIDDER_CODE = 'deepintent';
var BIDDER_ENDPOINT = 'https://prebid.deepintent.com/prebid';
var USER_SYNC_URL = 'https://beacon.deepintent.com/usersync.html';
var DI_M_V = '1.0.0';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]],
  aliases: [],
  // tagId is mandatory param
  isBidRequestValid: function isBidRequestValid(bid) {
    var valid = false;

    if (bid && bid.params && bid.params.tagId) {
      if (typeof bid.params.tagId === 'string' || bid.params.tagId instanceof String) {
        valid = true;
      }
    }

    return valid;
  },
  interpretResponse: function interpretResponse(bidResponse, request) {
    var responses = [];

    if (bidResponse && bidResponse.body) {
      var bids = bidResponse.body.seatbid && bidResponse.body.seatbid[0] ? bidResponse.body.seatbid[0].bid : [];
      responses = bids.map(function (bid) {
        return formatResponse(bid);
      });
    }

    return responses;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var user = validBidRequests.map(function (bid) {
      return buildUser(bid);
    });
    clean(user);
    var openRtbBidRequest = {
      id: __WEBPACK_IMPORTED_MODULE_2__src_utils__["generateUUID"](),
      at: 1,
      imp: validBidRequests.map(function (bid) {
        return buildImpression(bid);
      }),
      site: buildSite(bidderRequest),
      device: buildDevice(),
      user: user && user.length == 1 ? user[0] : {}
    };
    return {
      method: 'POST',
      url: BIDDER_ENDPOINT,
      data: JSON.stringify(openRtbBidRequest),
      options: {
        contentType: 'application/json'
      }
    };
  },

  /**
   * Register User Sync.
   */
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: USER_SYNC_URL
      }];
    }
  }
};

function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

function formatResponse(bid) {
  return {
    requestId: bid && bid.impid ? bid.impid : undefined,
    cpm: bid && bid.price ? bid.price : 0.0,
    width: bid && bid.w ? bid.w : 0,
    height: bid && bid.h ? bid.h : 0,
    ad: bid && bid.adm ? bid.adm : '',
    creativeId: bid && bid.crid ? bid.crid : undefined,
    netRevenue: false,
    currency: bid && bid.cur ? bid.cur : 'USD',
    ttl: 300,
    dealId: bid && bid.dealId ? bid.dealId : undefined
  };
}

function buildImpression(bid) {
  return {
    id: bid.bidId,
    tagid: bid.params.tagId || '',
    secure: window.location.protocol === 'https' ? 1 : 0,
    banner: buildBanner(bid),
    displaymanager: 'di_prebid',
    displaymanagerver: DI_M_V,
    ext: buildCustomParams(bid)
  };
}

function buildCustomParams(bid) {
  if (bid.params && bid.params.custom) {
    return {
      deepintent: bid.params.custom
    };
  } else {
    return {};
  }
}

function buildUser(bid) {
  if (bid && bid.params && bid.params.user) {
    return {
      id: bid.params.user.id && typeof bid.params.user.id == 'string' ? bid.params.user.id : undefined,
      buyeruid: bid.params.user.buyeruid && typeof bid.params.user.buyeruid == 'string' ? bid.params.user.buyeruid : undefined,
      yob: bid.params.user.yob && typeof bid.params.user.yob == 'number' ? bid.params.user.yob : null,
      gender: bid.params.user.gender && typeof bid.params.user.gender == 'string' ? bid.params.user.gender : undefined,
      keywords: bid.params.user.keywords && typeof bid.params.user.keywords == 'string' ? bid.params.user.keywords : undefined,
      customdata: bid.params.user.customdata && typeof bid.params.user.customdata == 'string' ? bid.params.user.customdata : undefined
    };
  }
}

function buildBanner(bid) {
  if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bid, 'mediaTypes.banner')) {
    // Get Sizes from MediaTypes Object, Will always take first size, will be overrided by params for exact w,h
    if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bid, 'mediaTypes.banner.sizes') && !bid.params.height && !bid.params.width) {
      var sizes = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bid, 'mediaTypes.banner.sizes');

      if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](sizes) && sizes.length > 0) {
        return {
          h: sizes[0][1],
          w: sizes[0][0]
        };
      }
    } else {
      return {
        h: bid.params.height,
        w: bid.params.width
      };
    }
  }
}

function buildSite(bidderRequest) {
  var site = {};

  if (bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer) {
    site.page = bidderRequest.refererInfo.referer;
    site.domain = getDomain(bidderRequest.refererInfo.referer);
  }

  return site;
}

function getDomain(referer) {
  if (referer) {
    var domainA = document.createElement('a');
    domainA.href = referer;
    return domainA.hostname;
  }
}

function buildDevice() {
  return {
    ua: navigator.userAgent,
    js: 1,
    dnt: navigator.doNotTrack == 'yes' || navigator.doNotTrack === '1' ? 1 : 0,
    h: screen.height,
    w: screen.width,
    language: navigator.language
  };
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[254]);