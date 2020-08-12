pbjsChunk([116],{

/***/ 347:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(348);


/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_config__ = __webpack_require__(3);





var DEFAULT_CUR = 'USD';
var BIDDER_CODE = 'mgid';
var ENDPOINT_URL = 'https://prebid.mgid.com/prebid/';
var LOG_WARN_PREFIX = '[MGID warn]: ';
var LOG_INFO_PREFIX = '[MGID info]: ';
var NATIVE_ASSETS = {
  'TITLE': {
    ID: 1,
    KEY: 'title',
    TYPE: 0
  },
  'IMAGE': {
    ID: 2,
    KEY: 'image',
    TYPE: 0
  },
  'ICON': {
    ID: 3,
    KEY: 'icon',
    TYPE: 0
  },
  'SPONSOREDBY': {
    ID: 4,
    KEY: 'sponsoredBy',
    TYPE: 1
  },
  // please note that type of SPONSORED is also 1
  'DESC': {
    ID: 5,
    KEY: 'data',
    TYPE: 2
  },
  // please note that type of BODY is also set to 2
  'PRICE': {
    ID: 6,
    KEY: 'price',
    TYPE: 6
  },
  'SALEPRICE': {
    ID: 7,
    KEY: 'saleprice',
    TYPE: 7
  },
  'DISPLAYURL': {
    ID: 8,
    KEY: 'displayurl',
    TYPE: 11
  },
  'CTA': {
    ID: 9,
    KEY: 'cta',
    TYPE: 12
  },
  'BODY': {
    ID: 10,
    KEY: 'body',
    TYPE: 2
  },
  // please note that type of DESC is also set to 2
  'SPONSORED': {
    ID: 11,
    KEY: 'sponsored',
    TYPE: 1
  } // please note that type of SPONSOREDBY is also set to 1

};
var NATIVE_ASSET_IMAGE_TYPE = {
  'ICON': 1,
  'IMAGE': 3
};
var DEFAULT_IMAGE_WIDTH = 492;
var DEFAULT_IMAGE_HEIGHT = 328;
var DEFAULT_ICON_WIDTH = 50;
var DEFAULT_ICON_HEIGHT = 50;
var DEFAULT_TITLE_LENGTH = 80;
var isInvalidNativeRequest = false; // check if title, image can be added with mandatory field default values

var NATIVE_MINIMUM_REQUIRED_IMAGE_ASSETS = [{
  id: NATIVE_ASSETS.SPONSOREDBY.ID,
  required: true,
  data: {
    type: 1
  }
}, {
  id: NATIVE_ASSETS.TITLE.ID,
  required: true
}, {
  id: NATIVE_ASSETS.IMAGE.ID,
  required: true
}];
var _NATIVE_ASSET_ID_TO_KEY_MAP = {};
var _NATIVE_ASSET_KEY_TO_ASSET_MAP = {}; // loading _NATIVE_ASSET_ID_TO_KEY_MAP

__WEBPACK_IMPORTED_MODULE_1__src_utils__["_each"](NATIVE_ASSETS, function (anAsset) {
  _NATIVE_ASSET_ID_TO_KEY_MAP[anAsset.ID] = anAsset.KEY;
}); // loading _NATIVE_ASSET_KEY_TO_ASSET_MAP


__WEBPACK_IMPORTED_MODULE_1__src_utils__["_each"](NATIVE_ASSETS, function (anAsset) {
  _NATIVE_ASSET_KEY_TO_ASSET_MAP[anAsset.KEY] = anAsset;
});

var spec = {
  VERSION: '1.4',
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]],
  reId: /^[1-9][0-9]*$/,
  NATIVE_ASSET_ID_TO_KEY_MAP: _NATIVE_ASSET_ID_TO_KEY_MAP,
  NATIVE_ASSET_KEY_TO_ASSET_MAP: _NATIVE_ASSET_KEY_TO_ASSET_MAP,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var banner = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'mediaTypes.banner');
    var native = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'mediaTypes.native');
    var nativeOk = __WEBPACK_IMPORTED_MODULE_1__src_utils__["isPlainObject"](native);

    if (nativeOk) {
      var nativeParams = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'nativeParams');
      var assetsCount = 0;

      if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isPlainObject"](nativeParams)) {
        for (var k in nativeParams) {
          var v = nativeParams[k];
          var supportProp = spec.NATIVE_ASSET_KEY_TO_ASSET_MAP.hasOwnProperty(k);

          if (supportProp) {
            assetsCount++;
          }

          if (!__WEBPACK_IMPORTED_MODULE_1__src_utils__["isPlainObject"](v) || !supportProp && __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](v, 'required')) {
            nativeOk = false;
            break;
          }
        }
      }

      nativeOk = nativeOk && assetsCount > 0;
    }

    var bannerOk = __WEBPACK_IMPORTED_MODULE_1__src_utils__["isPlainObject"](banner);

    if (bannerOk) {
      var sizes = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](banner, 'sizes');
      bannerOk = __WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](sizes) && sizes.length > 0;

      for (var f = 0; bannerOk && f < sizes.length; f++) {
        bannerOk = sizes[f].length === 2;
      }
    }

    var acc = Number(bid.params.accountId);
    var plcmt = Number(bid.params.placementId);
    return (bannerOk || nativeOk) && __WEBPACK_IMPORTED_MODULE_1__src_utils__["isPlainObject"](bid.params) && !!bid.adUnitCode && __WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](bid.adUnitCode) && (plcmt > 0 ? bid.params.placementId.toString().search(spec.reId) === 0 : true) && !!acc && acc > 0 && bid.params.accountId.toString().search(spec.reId) === 0;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils__["logInfo"](LOG_INFO_PREFIX + "buildRequests");

    if (validBidRequests.length === 0) {
      return;
    }

    var info = pageInfo();
    var page = info.location || __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bidderRequest, 'refererInfo.referer') || __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bidderRequest, 'refererInfo.canonicalUrl');
    var hostname = __WEBPACK_IMPORTED_MODULE_2__src_url__["c" /* parse */](page).hostname;
    var domain = extractDomainFromHost(hostname) || hostname;
    var accountId = setOnAny(validBidRequests, 'params.accountId');
    var muid = getLocalStorageSafely('mgMuidn');
    var url = (setOnAny(validBidRequests, 'params.bidUrl') || ENDPOINT_URL) + accountId;

    if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](muid) && muid.length > 0) {
      url += '?muid=' + muid;
    }

    var cur = [setOnAny(validBidRequests, 'params.currency') || setOnAny(validBidRequests, 'params.cur') || __WEBPACK_IMPORTED_MODULE_4__src_config__["b" /* config */].getConfig('currency.adServerCurrency') || DEFAULT_CUR];
    var secure = window.location.protocol === 'https:' ? 1 : 0;
    var imp = [];
    validBidRequests.forEach(function (bid) {
      var tagid = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'params.placementId') || 0;
      tagid = !tagid ? bid.adUnitCode : tagid + '/' + bid.adUnitCode;
      var impObj = {
        id: bid.bidId,
        tagid: tagid,
        secure: secure
      };
      var bidFloor = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'params.bidFloor') || __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'params.bidfloor') || 0;

      if (bidFloor && __WEBPACK_IMPORTED_MODULE_1__src_utils__["isNumber"](bidFloor)) {
        impObj.bidfloor = bidFloor;
      }

      for (var mediaTypes in bid.mediaTypes) {
        switch (mediaTypes) {
          case __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */]:
            impObj.banner = createBannerRequest(bid);
            imp.push(impObj);
            break;

          case __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]:
            var native = createNativeRequest(bid.nativeParams);

            if (!isInvalidNativeRequest) {
              impObj.native = {
                'request': native
              };
              imp.push(impObj);
            }

            break;
        }
      }
    });

    if (imp.length === 0) {
      return;
    }

    var request = {
      id: __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bidderRequest, 'bidderRequestId'),
      site: {
        domain: domain,
        page: page
      },
      cur: cur,
      geo: {
        utcoffset: info.timeOffset
      },
      device: {
        ua: navigator.userAgent,
        js: 1,
        dnt: navigator.doNotTrack === 'yes' || navigator.doNotTrack === '1' || navigator.msDoNotTrack === '1' ? 1 : 0,
        h: screen.height,
        w: screen.width,
        language: getLanguage()
      },
      ext: {
        mgid_ver: spec.VERSION,
        prebid_ver: pbjs.version
      },
      imp: imp
    };

    if (bidderRequest && bidderRequest.gdprConsent) {
      request.user = {
        ext: {
          consent: bidderRequest.gdprConsent.consentString
        }
      };
      request.regs = {
        ext: {
          gdpr: bidderRequest.gdprConsent.gdprApplies ? 1 : 0
        }
      };
    }

    if (info.referrer) {
      request.site.ref = info.referrer;
    }

    __WEBPACK_IMPORTED_MODULE_1__src_utils__["logInfo"](LOG_INFO_PREFIX + "buildRequest:", request);
    return {
      method: 'POST',
      url: url,
      data: JSON.stringify(request)
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequests) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils__["logInfo"](LOG_INFO_PREFIX + "interpretResponse", serverResponse);

    if (serverResponse == null || serverResponse.body == null || serverResponse.body === '' || !__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](serverResponse.body.seatbid) || !serverResponse.body.seatbid.length) {
      return;
    }

    var returnedBids = [];
    var muidn = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](serverResponse.body, 'ext.muidn');

    if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](muidn) && muidn.length > 0) {
      setLocalStorageSafely('mgMuidn', muidn);
    }

    serverResponse.body.seatbid.forEach(function (bids) {
      bids.bid.forEach(function (bid) {
        var pbid = prebidBid(bid, serverResponse.body.cur);

        if (pbid.mediaType === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */] && __WEBPACK_IMPORTED_MODULE_1__src_utils__["isEmpty"](pbid.native)) {
          return;
        }

        returnedBids.push(pbid);
      });
    });
    __WEBPACK_IMPORTED_MODULE_1__src_utils__["logInfo"](LOG_INFO_PREFIX + "interpretedResponse", returnedBids);
    return returnedBids;
  },
  onBidWon: function onBidWon(bid) {
    var cpm = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'adserverTargeting.hb_pb') || '';

    if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](bid.nurl) && bid.nurl !== '') {
      bid.nurl = bid.nurl.replace(/\${AUCTION_PRICE}/, cpm);
      pixel(bid.nurl);
    }

    if (bid.isBurl) {
      if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */]) {
        bid.ad = bid.ad.replace(/\${AUCTION_PRICE}/, cpm);
      } else {
        bid.burl = bid.burl.replace(/\${AUCTION_PRICE}/, cpm);
        pixel(bid.burl);
      }
    }

    __WEBPACK_IMPORTED_MODULE_1__src_utils__["logInfo"](LOG_INFO_PREFIX + "onBidWon");
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils__["logInfo"](LOG_INFO_PREFIX + "getUserSyncs");
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

function setOnAny(collection, key) {
  for (var i = 0, result; i < collection.length; i++) {
    result = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](collection[i], key);

    if (result) {
      return result;
    }
  }
}
/**
 * Unpack the Server's Bid into a Prebid-compatible one.
 * @param serverBid
 * @return Bid
 */


function prebidBid(serverBid, cur) {
  if (!__WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](cur) || cur === '') {
    cur = DEFAULT_CUR;
  }

  var bid = {
    requestId: serverBid.impid,
    ad: serverBid.adm,
    cpm: serverBid.price,
    creativeId: serverBid.adid,
    currency: cur,
    dealId: serverBid.dealid || '',
    width: serverBid.w,
    height: serverBid.h,
    mediaType: 'banner',
    netRevenue: true,
    ttl: serverBid.ttl || 300,
    nurl: serverBid.nurl || '',
    burl: serverBid.burl || '',
    isBurl: __WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](serverBid.burl) && serverBid.burl.length > 0
  };
  setMediaType(serverBid, bid);

  switch (bid.mediaType) {
    case __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */]:
      break;

    case __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]:
      parseNativeResponse(serverBid, bid);
      break;
  }

  return bid;
}

function setMediaType(bid, newBid) {
  if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'ext.crtype') === 'native') {
    newBid.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */];
  } else {
    newBid.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */];
  }
}

function extractDomainFromHost(pageHost) {
  if (pageHost == 'localhost') {
    return 'localhost';
  }

  var domain = null;

  try {
    var domains = /[-\w]+\.([-\w]+|[-\w]{3,}|[-\w]{1,3}\.[-\w]{2})$/i.exec(pageHost);

    if (domains != null && domains.length > 0) {
      domain = domains[0];

      for (var i = 1; i < domains.length; i++) {
        if (domains[i].length > domain.length) {
          domain = domains[i];
        }
      }
    }
  } catch (e) {
    domain = null;
  }

  return domain;
}

function pixel(url) {
  document.createElement('IMG').src = url;
}

function getLanguage() {
  var language = navigator.language ? 'language' : 'userLanguage';
  var lang2 = navigator[language].split('-')[0];

  if (lang2.length === 2 || lang2.length === 3) {
    return lang2;
  }

  return '';
}

function getLocalStorageSafely(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function setLocalStorageSafely(key, val) {
  try {
    return localStorage.setItem(key, val);
  } catch (e) {
    return null;
  }
}

function createBannerRequest(bid) {
  var sizes = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'mediaTypes.banner.sizes');
  var format = [];

  if (sizes.length > 1) {
    for (var f = 0; f < sizes.length; f++) {
      if (sizes[f].length === 2) {
        format.push({
          w: sizes[f][0],
          h: sizes[f][1]
        });
      }
    }
  }

  var r = {
    w: sizes && sizes[0][0],
    h: sizes && sizes[0][1]
  };

  if (format.length) {
    r.format = format;
  }

  return r;
}

function createNativeRequest(params) {
  var nativeRequestObject = {
    plcmtcnt: 1,
    assets: []
  };

  for (var key in params) {
    var assetObj = {};

    if (params.hasOwnProperty(key)) {
      if (!(nativeRequestObject.assets && nativeRequestObject.assets.length > 0 && nativeRequestObject.assets.hasOwnProperty(key))) {
        switch (key) {
          case NATIVE_ASSETS.TITLE.KEY:
            assetObj = {
              id: NATIVE_ASSETS.TITLE.ID,
              required: params[key].required ? 1 : 0,
              title: {
                len: params[key].len || params[key].length || DEFAULT_TITLE_LENGTH
              }
            };
            break;

          case NATIVE_ASSETS.IMAGE.KEY:
            var wmin = params[key].wmin || params[key].minimumWidth || (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](params[key].minsizes) && params[key].minsizes.length > 0 ? params[key].minsizes[0] : 0);
            var hmin = params[key].hmin || params[key].minimumHeight || (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](params[key].minsizes) && params[key].minsizes.length > 1 ? params[key].minsizes[1] : 0);
            assetObj = {
              id: NATIVE_ASSETS.IMAGE.ID,
              required: params[key].required ? 1 : 0,
              img: {
                type: NATIVE_ASSET_IMAGE_TYPE.IMAGE,
                w: params[key].w || params[key].width || (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](params[key].sizes) && params[key].sizes.length > 0 ? params[key].sizes[0] : 0),
                h: params[key].h || params[key].height || (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](params[key].sizes) && params[key].sizes.length > 1 ? params[key].sizes[1] : 0),
                mimes: params[key].mimes,
                ext: params[key].ext
              }
            };

            if (wmin > 0) {
              assetObj.img.wmin = wmin;
            }

            if (hmin > 0) {
              assetObj.img.hmin = hmin;
            }

            if (!assetObj.img.w) {
              assetObj.img.w = DEFAULT_IMAGE_WIDTH;
            }

            if (!assetObj.img.h) {
              assetObj.img.h = DEFAULT_IMAGE_HEIGHT;
            }

            break;

          case NATIVE_ASSETS.ICON.KEY:
            assetObj = {
              id: NATIVE_ASSETS.ICON.ID,
              required: params[key].required ? 1 : 0,
              img: {
                type: NATIVE_ASSET_IMAGE_TYPE.ICON,
                w: params[key].w || params[key].width || (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](params[key].sizes) && params[key].sizes.length > 0 ? params[key].sizes[0] : 0),
                h: params[key].h || params[key].height || (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](params[key].sizes) && params[key].sizes.length > 0 ? params[key].sizes[1] : 0)
              }
            };

            if (!assetObj.img.w) {
              assetObj.img.w = DEFAULT_ICON_WIDTH;
            }

            if (!assetObj.img.h) {
              assetObj.img.h = DEFAULT_ICON_HEIGHT;
            }

            break;

          case NATIVE_ASSETS.SPONSORED.KEY:
          case NATIVE_ASSETS.SPONSOREDBY.KEY:
          case NATIVE_ASSETS.PRICE.KEY:
          case NATIVE_ASSETS.SALEPRICE.KEY:
          case NATIVE_ASSETS.DESC.KEY:
          case NATIVE_ASSETS.BODY.KEY:
          case NATIVE_ASSETS.DISPLAYURL.KEY:
          case NATIVE_ASSETS.CTA.KEY:
            assetObj = commonNativeRequestObject(spec.NATIVE_ASSET_KEY_TO_ASSET_MAP[key], params);
            break;

          default:
            if (params[key].required) {
              isInvalidNativeRequest = true;
              return;
            }

        }
      }
    }

    if (assetObj.id) {
      nativeRequestObject.assets[nativeRequestObject.assets.length] = assetObj;
    }
  } // for native image adtype prebid has to have few required assests i.e. title,sponsoredBy, image
  // if any of these are missing from the request then request will not be sent


  var requiredAssetCount = NATIVE_MINIMUM_REQUIRED_IMAGE_ASSETS.length;
  var presentrequiredAssetCount = 0;
  NATIVE_MINIMUM_REQUIRED_IMAGE_ASSETS.forEach(function (ele) {
    var lengthOfExistingAssets = nativeRequestObject.assets.length;

    for (var i = 0; i < lengthOfExistingAssets; i++) {
      if (ele.id === nativeRequestObject.assets[i].id) {
        presentrequiredAssetCount++;
        break;
      } else {
        if (ele.id === 4 && nativeRequestObject.assets[i].id === 11) {
          if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](nativeRequestObject.assets[i], 'data.type') === ele.data.type) {
            presentrequiredAssetCount++;
            break;
          }
        }
      }
    }
  });
  isInvalidNativeRequest = requiredAssetCount !== presentrequiredAssetCount;
  return nativeRequestObject;
}

function commonNativeRequestObject(nativeAsset, params) {
  var key = nativeAsset.KEY;
  return {
    id: nativeAsset.ID,
    required: params[key].required ? 1 : 0,
    data: {
      type: nativeAsset.TYPE,
      len: params[key].len,
      ext: params[key].ext
    }
  };
}

function parseNativeResponse(bid, newBid) {
  newBid.native = {};

  if (bid.hasOwnProperty('adm')) {
    var adm = '';

    try {
      adm = JSON.parse(bid.adm);
    } catch (ex) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logWarn"](LOG_WARN_PREFIX + 'Error: Cannot parse native response for ad response: ' + newBid.adm);
      return;
    }

    if (adm && adm.native && adm.native.assets && adm.native.assets.length > 0) {
      newBid.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */];

      for (var i = 0, len = adm.native.assets.length; i < len; i++) {
        switch (adm.native.assets[i].id) {
          case NATIVE_ASSETS.TITLE.ID:
            newBid.native.title = adm.native.assets[i].title && adm.native.assets[i].title.text;
            break;

          case NATIVE_ASSETS.IMAGE.ID:
            newBid.native.image = {
              url: adm.native.assets[i].img && adm.native.assets[i].img.url,
              height: adm.native.assets[i].img && adm.native.assets[i].img.h,
              width: adm.native.assets[i].img && adm.native.assets[i].img.w
            };
            break;

          case NATIVE_ASSETS.ICON.ID:
            newBid.native.icon = {
              url: adm.native.assets[i].img && adm.native.assets[i].img.url,
              height: adm.native.assets[i].img && adm.native.assets[i].img.h,
              width: adm.native.assets[i].img && adm.native.assets[i].img.w
            };
            break;

          case NATIVE_ASSETS.SPONSOREDBY.ID:
          case NATIVE_ASSETS.SPONSORED.ID:
          case NATIVE_ASSETS.PRICE:
          case NATIVE_ASSETS.SALEPRICE.ID:
          case NATIVE_ASSETS.DESC.ID:
          case NATIVE_ASSETS.BODY.ID:
          case NATIVE_ASSETS.DISPLAYURL.ID:
          case NATIVE_ASSETS.CTA.ID:
            newBid.native[spec.NATIVE_ASSET_ID_TO_KEY_MAP[adm.native.assets[i].id]] = adm.native.assets[i].data && adm.native.assets[i].data.value;
            break;
        }
      }

      newBid.native.clickUrl = adm.native.link && adm.native.link.url;
      newBid.native.clickTrackers = adm.native.link && adm.native.link.clicktrackers || [];
      newBid.native.impressionTrackers = adm.native.imptrackers || [];
      newBid.native.jstracker = adm.native.jstracker || [];
      newBid.width = 0;
      newBid.height = 0;
    }
  }
}

function pageInfo() {
  var w, d, l, r, m, p, t;

  for (w = window, d = w.document, l = d.location.href, r = d.referrer, m = 0, t = new Date(); w !== w.parent;) {
    try {
      p = w.parent;
      l = p.location.href;
      r = p.document.referrer;
      w = p;
    } catch (e) {
      m = top !== w.parent ? 2 : 1;
      break;
    }
  }

  return {
    location: l,
    referrer: r || '',
    masked: m,
    wWidth: w.innerWidth,
    wHeight: w.innerHeight,
    date: t.toUTCString(),
    timeOffset: t.getTimezoneOffset()
  };
}

/***/ })

},[347]);