pbjsChunk([16],{

/***/ 17:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(511);


/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDPOINT", function() { return ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var ENDPOINT = '//app.readpeak.com/header/prebid';
var NATIVE_DEFAULTS = {
  TITLE_LEN: 70,
  DESCR_LEN: 120,
  SPONSORED_BY_LEN: 50,
  IMG_MIN: 150,
  ICON_MIN: 50,
  CTA_LEN: 50
};
var BIDDER_CODE = 'readpeak';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.publisherId && bid.nativeParams);
  },
  buildRequests: function buildRequests(bidRequests) {
    var currencyObj = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('currency');
    var currency = currencyObj && currencyObj.adServerCurrency || 'USD';
    var request = {
      id: bidRequests[0].bidderRequestId,
      imp: bidRequests.map(function (slot) {
        return impression(slot);
      }).filter(function (imp) {
        return imp.native != null;
      }),
      site: site(bidRequests),
      app: app(bidRequests),
      device: device(),
      cur: [currency],
      source: {
        fd: 1,
        tid: bidRequests[0].transactionId,
        ext: {
          prebid: "2.37.0"
        }
      }
    };
    return {
      method: 'POST',
      url: ENDPOINT,
      data: JSON.stringify(request)
    };
  },
  interpretResponse: function interpretResponse(response, request) {
    return bidResponseAvailable(request, response);
  }
};

function bidResponseAvailable(bidRequest, bidResponse) {
  var idToImpMap = {};
  var idToBidMap = {};

  if (!bidResponse['body']) {
    return [];
  }

  bidResponse = bidResponse.body;
  parse(bidRequest.data).imp.forEach(function (imp) {
    idToImpMap[imp.id] = imp;
  });

  if (bidResponse) {
    bidResponse.seatbid.forEach(function (seatBid) {
      return seatBid.bid.forEach(function (bid) {
        idToBidMap[bid.impid] = bid;
      });
    });
  }

  var bids = [];
  Object.keys(idToImpMap).forEach(function (id) {
    if (idToBidMap[id]) {
      var bid = {
        requestId: id,
        cpm: idToBidMap[id].price,
        creativeId: idToBidMap[id].crid,
        ttl: 300,
        netRevenue: true,
        mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */],
        currency: bidResponse.cur,
        native: nativeResponse(idToImpMap[id], idToBidMap[id])
      };
      bids.push(bid);
    }
  });
  return bids;
}

function impression(slot) {
  return {
    id: slot.bidId,
    native: nativeImpression(slot),
    bidfloor: slot.params.bidfloor || 0,
    bidfloorcur: slot.params.bidfloorcur || 'USD'
  };
}

function nativeImpression(slot) {
  if (slot.nativeParams) {
    var assets = [];
    addAsset(assets, titleAsset(1, slot.nativeParams.title, NATIVE_DEFAULTS.TITLE_LEN));
    addAsset(assets, imageAsset(2, slot.nativeParams.image, 3, slot.nativeParams.wmin || NATIVE_DEFAULTS.IMG_MIN, slot.nativeParams.hmin || NATIVE_DEFAULTS.IMG_MIN));
    addAsset(assets, dataAsset(3, slot.nativeParams.sponsoredBy, 1, NATIVE_DEFAULTS.SPONSORED_BY_LEN));
    addAsset(assets, dataAsset(4, slot.nativeParams.body, 2, NATIVE_DEFAULTS.DESCR_LEN));
    addAsset(assets, dataAsset(5, slot.nativeParams.cta, 12, NATIVE_DEFAULTS.CTA_LEN));
    return {
      request: JSON.stringify({
        assets: assets
      }),
      ver: '1.1'
    };
  }

  return null;
}

function addAsset(assets, asset) {
  if (asset) {
    assets.push(asset);
  }
}

function titleAsset(id, params, defaultLen) {
  if (params) {
    return {
      id: id,
      required: params.required ? 1 : 0,
      title: {
        len: params.len || defaultLen
      }
    };
  }

  return null;
}

function imageAsset(id, params, type, defaultMinWidth, defaultMinHeight) {
  return params ? {
    id: id,
    required: params.required ? 1 : 0,
    img: {
      type: type,
      wmin: params.wmin || defaultMinWidth,
      hmin: params.hmin || defaultMinHeight
    }
  } : null;
}

function dataAsset(id, params, type, defaultLen) {
  return params ? {
    id: id,
    required: params.required ? 1 : 0,
    data: {
      type: type,
      len: params.len || defaultLen
    }
  } : null;
}

function site(bidderRequest) {
  var pubId = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.publisherId : '0';
  var siteId = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.siteId : '0';
  var appParams = bidderRequest[0].params.app;

  if (!appParams) {
    return {
      publisher: {
        id: pubId.toString(),
        domain: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('publisherDomain')
      },
      id: siteId ? siteId.toString() : pubId.toString(),
      ref: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"])(),
      page: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('pageUrl') || Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"])().href,
      domain: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"])().hostname
    };
  }

  return undefined;
}

function app(bidderRequest) {
  var pubId = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.publisherId : '0';
  var appParams = bidderRequest[0].params.app;

  if (appParams) {
    return {
      publisher: {
        id: pubId.toString()
      },
      bundle: appParams.bundle,
      storeurl: appParams.storeUrl,
      domain: appParams.domain
    };
  }

  return undefined;
}

function isMobile() {
  return /(ios|ipod|ipad|iphone|android)/i.test(global.navigator.userAgent);
}

function isConnectedTV() {
  return /(smart[-]?tv|hbbtv|appletv|googletv|hdmi|netcast\.tv|viera|nettv|roku|\bdtv\b|sonydtv|inettvbrowser|\btv\b)/i.test(global.navigator.userAgent);
}

function device() {
  return {
    ua: navigator.userAgent,
    language: navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage,
    devicetype: isMobile() ? 1 : isConnectedTV() ? 3 : 2
  };
}

function parse(rawResponse) {
  try {
    if (rawResponse) {
      if (_typeof(rawResponse) === 'object') {
        return rawResponse;
      } else {
        return JSON.parse(rawResponse);
      }
    }
  } catch (ex) {
    Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"])('readpeakBidAdapter.safeParse', 'ERROR', ex);
  }

  return null;
}

function nativeResponse(imp, bid) {
  if (imp && imp['native']) {
    var nativeAd = parse(bid.adm);
    var keys = {};

    if (nativeAd && nativeAd.assets) {
      nativeAd.assets.forEach(function (asset) {
        keys.title = asset.title ? asset.title.text : keys.title;
        keys.body = asset.data && asset.id === 4 ? asset.data.value : keys.body;
        keys.sponsoredBy = asset.data && asset.id === 3 ? asset.data.value : keys.sponsoredBy;
        keys.image = asset.img && asset.id === 2 ? {
          url: asset.img.url,
          width: asset.img.w || 750,
          height: asset.img.h || 500
        } : keys.image;
        keys.cta = asset.data && asset.id === 5 ? asset.data.value : keys.cta;
      });

      if (nativeAd.link) {
        keys.clickUrl = encodeURIComponent(nativeAd.link.url);
      }

      var trackers = nativeAd.imptrackers || [];
      trackers.unshift(Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["replaceAuctionPrice"])(bid.burl, bid.price));
      keys.impressionTrackers = trackers;
      return keys;
    }
  }

  return null;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ })

},[510]);