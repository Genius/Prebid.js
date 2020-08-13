pbjsChunk([136],{

/***/ 606:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(607);


/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils_js__ = __webpack_require__(0);





var BIDDER_VERSION = '1.0.0';
var BASE_URL = 'https://ortb.adpearl.io';
var spec = {
  code: 'pubgenius',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    var adUnitId = bid.params.adUnitId;

    if (!Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["isStr"])(adUnitId) && !Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["isInteger"])(adUnitId)) {
      Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logError"])('pubgenius bidder params: adUnitId must be a string or integer.');
      return false;
    }

    var sizes = Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepAccess"])(bid, 'mediaTypes.banner.sizes');
    return !!(sizes && sizes.length) && sizes.every(function (size) {
      return Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["isArrayOfNums"])(size, 2);
    });
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var data = {
      id: bidderRequest.auctionId,
      imp: bidRequests.map(buildImp),
      tmax: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('bidderTimeout'),
      ext: {
        pbadapter: {
          version: BIDDER_VERSION
        }
      }
    };
    var site = buildSite(bidderRequest);

    if (site) {
      data.site = site;
    }

    var gdpr = bidderRequest.gdprConsent;

    if (gdpr) {
      var applies = gdpr.gdprApplies;
      var consent = gdpr.consentString;
      Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepSetValue"])(data, 'regs.ext.gdpr', numericBoolean(applies));

      if (applies && consent) {
        Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepSetValue"])(data, 'user.ext.consent', consent);
      }
    }

    var usp = bidderRequest.uspConsent;

    if (usp) {
      Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepSetValue"])(data, 'regs.ext.us_privacy', usp);
    }

    var schain = bidRequests[0].schain;

    if (schain) {
      Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepSetValue"])(data, 'source.ext.schain', schain);
    }

    if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('coppa')) {
      Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepSetValue"])(data, 'regs.coppa', 1);
    }

    var bidUserIdAsEids = Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepAccess"])(bidRequests, '0.userIdAsEids');

    if (bidUserIdAsEids && bidUserIdAsEids.length) {
      var eids = bidUserIdAsEids.filter(function (eid) {
        return eid.source === 'adserver.org';
      });

      if (eids.length) {
        Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepSetValue"])(data, 'user.ext.eids', eids);
      }
    }

    return {
      method: 'POST',
      url: "".concat(getBaseUrl(), "/prebid/auction"),
      data: data
    };
  },
  interpretResponse: function interpretResponse(_ref) {
    var body = _ref.body;
    var bidResponses = [];
    var currency = body.cur || 'USD';
    var seatbids = body.seatbid;

    if (seatbids) {
      seatbids.forEach(function (seatbid) {
        seatbid.bid.forEach(function (bid) {
          var bidResponse = interpretBid(bid);
          bidResponse.currency = currency;
          bidResponses.push(bidResponse);
        });
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent, uspConsent) {
    var syncs = [];

    if (syncOptions.iframeEnabled) {
      var params = {};

      if (gdprConsent) {
        params.gdpr = numericBoolean(gdprConsent.gdprApplies);

        if (gdprConsent.consentString) {
          params.consent = gdprConsent.consentString;
        }
      }

      if (uspConsent) {
        params.us_privacy = uspConsent;
      }

      var qs = Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["parseQueryStringParameters"])(params);
      syncs.push({
        type: 'iframe',
        url: "".concat(getBaseUrl(), "/usersync/pixels.html?").concat(qs)
      });
    }

    return syncs;
  },
  onTimeout: function onTimeout(data) {
    Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax_js__["a" /* ajax */])("".concat(getBaseUrl(), "/prebid/events?type=timeout"), null, JSON.stringify(data), {
      method: 'POST'
    });
  }
};

function buildImp(bid) {
  var imp = {
    id: bid.bidId,
    banner: {
      format: Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepAccess"])(bid, 'mediaTypes.banner.sizes').map(function (size) {
        return {
          w: size[0],
          h: size[1]
        };
      }),
      topframe: numericBoolean(!Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["inIframe"])())
    },
    tagid: String(bid.params.adUnitId)
  };
  var bidFloor = bid.params.bidFloor;

  if (Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["isNumber"])(bidFloor)) {
    imp.bidfloor = bidFloor;
  }

  var pos = bid.params.position;

  if (Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["isInteger"])(pos)) {
    imp.banner.pos = pos;
  }

  if (bid.params.test) {
    Object(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepSetValue"])(imp, 'ext.test', 1);
  }

  return imp;
}

function buildSite(bidderRequest) {
  var site = null;
  var refererInfo = bidderRequest.refererInfo;
  var pageUrl = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('pageUrl') || refererInfo.canonicalUrl || refererInfo.referer;

  if (pageUrl) {
    site = site || {};
    site.page = pageUrl;
  }

  if (refererInfo.reachedTop) {
    try {
      var pageRef = window.top.document.referrer;

      if (pageRef) {
        site = site || {};
        site.ref = pageRef;
      }
    } catch (e) {}
  }

  return site;
}

function interpretBid(bid) {
  var bidResponse = {
    requestId: bid.impid,
    cpm: bid.price,
    width: bid.w,
    height: bid.h,
    ad: bid.adm,
    ttl: bid.exp,
    creativeId: bid.crid,
    netRevenue: true
  };

  if (bid.adomain && bid.adomain.length) {
    bidResponse.meta = {
      advertiserDomains: bid.adomain
    };
  }

  return bidResponse;
}

function numericBoolean(value) {
  return value ? 1 : 0;
}

function getBaseUrl() {
  var pubg = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('pubgenius');
  return pubg && pubg.endpoint || BASE_URL;
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[606]);