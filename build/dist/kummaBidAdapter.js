pbjsChunk([162],{

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(384);


/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes__);




var NATIVE_DEFAULTS = {
  TITLE_LEN: 100,
  DESCR_LEN: 200,
  SPONSORED_BY_LEN: 50,
  IMG_MIN: 150,
  ICON_MIN: 50
};
var DEFAULT_MIMES = ['video/mp4', 'video/webm', 'application/x-shockwave-flash', 'application/javascript'];
var VIDEO_TARGETING = ['mimes', 'skippable', 'playback_method', 'protocols', 'api'];
var DEFAULT_PROTOCOLS = [2, 3, 5, 6];
var DEFAULT_APIS = [1, 2];
var spec = {
  code: 'kumma',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.pubId && bid.params.placementId);
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var request = {
      id: bidRequests[0].bidderRequestId,
      at: 2,
      imp: bidRequests.map(function (slot) {
        return impression(slot);
      }),
      site: site(bidRequests),
      app: app(bidRequests),
      device: device(bidRequests)
    };
    applyGdpr(bidderRequest, request);
    return {
      method: 'POST',
      url: '//hb.kumma.com/',
      data: JSON.stringify(request)
    };
  },
  interpretResponse: function interpretResponse(response, request) {
    return bidResponseAvailable(request, response.body);
  }
};

function bidResponseAvailable(bidRequest, bidResponse) {
  var idToImpMap = {};
  var idToBidMap = {};
  var ortbRequest = parse(bidRequest.data);
  ortbRequest.imp.forEach(function (imp) {
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
      var bid = {};
      bid.requestId = id;
      bid.adId = id;
      bid.creativeId = id;
      bid.cpm = idToBidMap[id].price;
      bid.currency = bidResponse.cur;
      bid.ttl = 360;
      bid.netRevenue = true;

      if (idToImpMap[id]['native']) {
        bid['native'] = nativeResponse(idToImpMap[id], idToBidMap[id]);
        var nurl = idToBidMap[id].nurl;
        nurl = nurl.replace(/\$(%7B|\{)AUCTION_IMP_ID(%7D|\})/gi, idToBidMap[id].impid);
        nurl = nurl.replace(/\$(%7B|\{)AUCTION_PRICE(%7D|\})/gi, idToBidMap[id].price);
        nurl = nurl.replace(/\$(%7B|\{)AUCTION_CURRENCY(%7D|\})/gi, bidResponse.cur);
        nurl = nurl.replace(/\$(%7B|\{)AUCTION_BID_ID(%7D|\})/gi, bidResponse.bidid);
        bid['native']['impressionTrackers'] = [nurl];
        bid.mediaType = 'native';
      } else if (idToImpMap[id]['video']) {
        bid.vastUrl = idToBidMap[id].adm;
        bid.vastUrl = bid.vastUrl.replace(/\$(%7B|\{)AUCTION_PRICE(%7D|\})/gi, idToBidMap[id].price);
        bid.crid = idToBidMap[id].crid;
        bid.width = idToImpMap[id].video.w;
        bid.height = idToImpMap[id].video.h;
        bid.mediaType = 'video';
      } else if (idToImpMap[id]['banner']) {
        bid.ad = idToBidMap[id].adm;
        bid.ad = bid.ad.replace(/\$(%7B|\{)AUCTION_IMP_ID(%7D|\})/gi, idToBidMap[id].impid);
        bid.ad = bid.ad.replace(/\$(%7B|\{)AUCTION_AD_ID(%7D|\})/gi, idToBidMap[id].adid);
        bid.ad = bid.ad.replace(/\$(%7B|\{)AUCTION_PRICE(%7D|\})/gi, idToBidMap[id].price);
        bid.ad = bid.ad.replace(/\$(%7B|\{)AUCTION_CURRENCY(%7D|\})/gi, bidResponse.cur);
        bid.ad = bid.ad.replace(/\$(%7B|\{)AUCTION_BID_ID(%7D|\})/gi, bidResponse.bidid);
        bid.width = idToImpMap[id].banner.w;
        bid.height = idToImpMap[id].banner.h;
        bid.mediaType = 'banner';
      }

      bids.push(bid);
    }
  });
  return bids;
}

function impression(slot) {
  return {
    id: slot.bidId,
    secure: window.location.protocol === 'https:' ? 1 : 0,
    'banner': banner(slot),
    'native': nativeImpression(slot),
    'video': videoImpression(slot),
    bidfloor: slot.params.bidFloor || '0.000001',
    tagid: slot.params.placementId.toString()
  };
}

function getSizes(slot) {
  var size = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](slot.sizes)[0].split('x');
  return {
    width: parseInt(size[0]),
    height: parseInt(size[1])
  };
}

function banner(slot) {
  if (slot.mediaType === 'banner' || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](slot, 'mediaTypes.banner')) {
    var sizes = getSizes(slot);
    return {
      w: sizes.width,
      h: sizes.height
    };
  }

  return null;
}

function videoImpression(slot) {
  if (slot.mediaType === 'video' || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](slot, 'mediaTypes.video')) {
    var sizes = getSizes(slot);
    var video = {
      w: sizes.width,
      h: sizes.height,
      mimes: DEFAULT_MIMES,
      protocols: DEFAULT_PROTOCOLS,
      api: DEFAULT_APIS
    };

    if (slot.params.video) {
      Object.keys(slot.params.video).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default()(VIDEO_TARGETING, param);
      }).forEach(function (param) {
        return video[param] = slot.params.video[param];
      });
    }

    return video;
  }

  return null;
}

function nativeImpression(slot) {
  if (slot.mediaType === 'native' || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](slot, 'mediaTypes.native')) {
    var assets = [];
    addAsset(assets, titleAsset(1, slot.nativeParams.title, NATIVE_DEFAULTS.TITLE_LEN));
    addAsset(assets, dataAsset(2, slot.nativeParams.body, 2, NATIVE_DEFAULTS.DESCR_LEN));
    addAsset(assets, dataAsset(3, slot.nativeParams.sponsoredBy, 1, NATIVE_DEFAULTS.SPONSORED_BY_LEN));
    addAsset(assets, imageAsset(4, slot.nativeParams.icon, 1, NATIVE_DEFAULTS.ICON_MIN, NATIVE_DEFAULTS.ICON_MIN));
    addAsset(assets, imageAsset(5, slot.nativeParams.image, 3, NATIVE_DEFAULTS.IMG_MIN, NATIVE_DEFAULTS.IMG_MIN));
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
  var pubId = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.pubId : '0';
  var siteId = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.siteId : '0';
  var appParams = bidderRequest[0].params.app;

  if (!appParams) {
    return {
      publisher: {
        id: pubId.toString(),
        domain: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().hostname
      },
      id: siteId.toString(),
      ref: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"](),
      page: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().href
    };
  }

  return null;
}

function app(bidderRequest) {
  var pubId = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.pubId : '0';
  var appParams = bidderRequest[0].params.app;

  if (appParams) {
    return {
      publisher: {
        id: pubId.toString()
      },
      id: appParams.id,
      name: appParams.name,
      bundle: appParams.bundle,
      storeurl: appParams.storeUrl,
      domain: appParams.domain
    };
  }

  return null;
}

function device(bidderRequest) {
  var lat = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.latitude : '';
  var lon = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.longitude : '';
  var ifa = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.ifa : '';
  return {
    dnt: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getDNT"]() ? 1 : 0,
    ua: navigator.userAgent,
    language: navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage,
    w: window.screen.width || window.innerWidth,
    h: window.screen.height || window.innerHeigh,
    geo: {
      lat: lat,
      lon: lon
    },
    ifa: ifa
  };
}

function parse(rawResponse) {
  try {
    if (rawResponse) {
      return JSON.parse(rawResponse);
    }
  } catch (ex) {
    logError('kumma.parse', 'ERROR', ex);
  }

  return null;
}

function applyGdpr(bidderRequest, ortbRequest) {
  if (bidderRequest && bidderRequest.gdprConsent) {
    ortbRequest.regs = {
      ext: {
        gdpr: bidderRequest.gdprConsent.gdprApplies ? 1 : 0
      }
    };
    ortbRequest.user = {
      ext: {
        consent: bidderRequest.gdprConsent.consentString
      }
    };
  }
}

function nativeResponse(imp, bid) {
  if (imp['native']) {
    var nativeAd = parse(bid.adm);
    var keys = {};
    keys.image = {};
    keys.icon = {};

    if (nativeAd && nativeAd['native'] && nativeAd['native'].assets) {
      nativeAd['native'].assets.forEach(function (asset) {
        keys.title = asset.title ? asset.title.text : keys.title;
        keys.body = asset.data && asset.id === 2 ? asset.data.value : keys.body;
        keys.sponsoredBy = asset.data && asset.id === 3 ? asset.data.value : keys.sponsoredBy;
        keys.icon.url = asset.img && asset.id === 4 ? asset.img.url : keys.icon.url;
        keys.icon.width = asset.img && asset.id === 4 ? asset.img.w : keys.icon.width;
        keys.icon.height = asset.img && asset.id === 4 ? asset.img.h : keys.icon.height;
        keys.image.url = asset.img && asset.id === 5 ? asset.img.url : keys.image.url;
        keys.image.width = asset.img && asset.id === 5 ? asset.img.w : keys.image.width;
        keys.image.height = asset.img && asset.id === 5 ? asset.img.h : keys.image.height;
      });

      if (nativeAd['native'].link) {
        keys.clickUrl = encodeURIComponent(nativeAd['native'].link.url);
      }

      return keys;
    }
  }

  return null;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[383]);