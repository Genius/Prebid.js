pbjsChunk([159],{

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(554);


/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var BIDDER_CODE = 'nextroll';
var BIDDER_ENDPOINT = 'https://d.adroll.com/bid/prebid/';
var ADAPTER_VERSION = 5;
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return bidRequest !== undefined && !!bidRequest.params && !!bidRequest.bidId;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var topLocation = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseUrl"](__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest, 'refererInfo.referer'));
    return validBidRequests.map(function (bidRequest) {
      return {
        method: 'POST',
        options: {
          withCredentials: true
        },
        url: BIDDER_ENDPOINT,
        data: {
          id: bidRequest.bidId,
          imp: {
            id: bidRequest.bidId,
            bidfloor: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('bidfloor', bidRequest.params),
            banner: _getBanner(bidRequest),
            native: _getNative(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.native')),
            ext: {
              zone: {
                id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('zoneId', bidRequest.params)
              },
              nextroll: {
                adapter_version: ADAPTER_VERSION
              }
            }
          },
          user: _getUser(validBidRequests),
          site: _getSite(bidRequest, topLocation),
          seller: _getSeller(bidRequest),
          device: _getDevice(bidRequest),
          regs: _getRegs(bidderRequest)
        }
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    if (!serverResponse.body) {
      return [];
    } else {
      var response = serverResponse.body;
      var bids = response.seatbid.reduce(function (acc, seatbid) {
        return acc.concat(seatbid.bid);
      }, []);
      return bids.map(function (bid) {
        return _buildResponse(response, bid);
      });
    }
  }
};

function _getBanner(bidRequest) {
  var sizes = _getSizes(bidRequest);

  if (sizes === undefined) return undefined;
  return {
    format: sizes
  };
}

function _getNative(mediaTypeNative) {
  if (mediaTypeNative === undefined) return undefined;

  var assets = _getNativeAssets(mediaTypeNative);

  if (assets === undefined || assets.length == 0) return undefined;
  return {
    request: {
      native: {
        assets: assets
      }
    }
  };
}
/*
  id: Unique numeric id for the asset
  kind: OpenRTB kind of asset. Supported: title, img and data.
  key: Name of property that comes in the mediaType.native object.
  type: OpenRTB type for that spefic kind of asset.
  required: Overrides the asset required field configured, only overrides when is true.
*/


var NATIVE_ASSET_MAP = [{
  id: 1,
  kind: 'title',
  key: 'title',
  required: true
}, {
  id: 2,
  kind: 'img',
  key: 'image',
  type: 3,
  required: true
}, {
  id: 3,
  kind: 'img',
  key: 'icon',
  type: 1
}, {
  id: 4,
  kind: 'img',
  key: 'logo',
  type: 2
}, {
  id: 5,
  kind: 'data',
  key: 'sponsoredBy',
  type: 1
}, {
  id: 6,
  kind: 'data',
  key: 'body',
  type: 2
}];
var ASSET_KIND_MAP = {
  title: _getTitleAsset,
  img: _getImageAsset,
  data: _getDataAsset
};

function _getAsset(mediaTypeNative, assetMap) {
  var asset = mediaTypeNative[assetMap.key];
  if (asset === undefined) return undefined;
  var assetFunc = ASSET_KIND_MAP[assetMap.kind];
  return _defineProperty({
    id: assetMap.id,
    required: assetMap.required || !!asset.required ? 1 : 0
  }, assetMap.kind, assetFunc(asset, assetMap));
}

function _getTitleAsset(title, _assetMap) {
  return {
    len: title.len || 0
  };
}

function _getMinAspectRatio(aspectRatio, property) {
  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](aspectRatio)) return 1;
  var ratio = aspectRatio['ratio_' + property];
  var min = aspectRatio['min_' + property];
  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](ratio)) return ratio;
  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](min)) return min;
  return 1;
}

function _getImageAsset(image, assetMap) {
  var sizes = image.sizes;
  var aspectRatio = image.aspect_ratios ? image.aspect_ratios[0] : undefined;
  return {
    type: assetMap.type,
    w: sizes ? sizes[0] : undefined,
    h: sizes ? sizes[1] : undefined,
    wmin: _getMinAspectRatio(aspectRatio, 'width'),
    hmin: _getMinAspectRatio(aspectRatio, 'height')
  };
}

function _getDataAsset(data, assetMap) {
  return {
    type: assetMap.type,
    len: data.len || 0
  };
}

function _getNativeAssets(mediaTypeNative) {
  return NATIVE_ASSET_MAP.map(function (assetMap) {
    return _getAsset(mediaTypeNative, assetMap);
  }).filter(function (asset) {
    return asset !== undefined;
  });
}

function _getUser(requests) {
  var id = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](requests, '0.userId.nextroll');

  if (id === undefined) {
    return;
  }

  return {
    ext: {
      eid: [{
        'source': 'nextroll',
        id: id
      }]
    }
  };
}

function _buildResponse(bidResponse, bid) {
  var response = {
    requestId: bidResponse.id,
    cpm: bid.price,
    width: bid.w,
    height: bid.h,
    creativeId: bid.crid,
    dealId: bidResponse.dealId,
    currency: 'USD',
    netRevenue: true,
    ttl: 300
  };

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](bid.adm)) {
    response.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */];
    response.ad = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["replaceAuctionPrice"](bid.adm, bid.price);
  } else {
    response.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */];
    response.native = _getNativeResponse(bid.adm, bid.price);
  }

  return response;
}

var privacyLink = 'https://info.evidon.com/pub_info/573';
var privacyIcon = 'https://c.betrad.com/pub/icon1.png';

function _getNativeResponse(adm, price) {
  var baseResponse = {
    clickTrackers: adm.link && adm.link.clicktrackers || [],
    jstracker: adm.jstracker || [],
    clickUrl: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["replaceAuctionPrice"](adm.link.url, price),
    impressionTrackers: adm.imptrackers.map(function (impTracker) {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["replaceAuctionPrice"](impTracker, price);
    }),
    privacyLink: privacyLink,
    privacyIcon: privacyIcon
  };
  return adm.assets.reduce(function (accResponse, asset) {
    var assetMaps = NATIVE_ASSET_MAP.filter(function (assetMap) {
      return assetMap.id === asset.id && asset[assetMap.kind] !== undefined;
    });
    if (assetMaps.length === 0) return accResponse;
    var assetMap = assetMaps[0];
    accResponse[assetMap.key] = _getAssetResponse(asset, assetMap);
    return accResponse;
  }, baseResponse);
}

function _getAssetResponse(asset, assetMap) {
  switch (assetMap.kind) {
    case 'title':
      return asset.title.text;

    case 'img':
      return {
        url: asset.img.url,
        width: asset.img.w,
        height: asset.img.h
      };

    case 'data':
      return asset.data.value;
  }
}

function _getSite(bidRequest, topLocation) {
  return {
    page: topLocation.href,
    domain: topLocation.hostname,
    publisher: {
      id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('publisherId', bidRequest.params)
    }
  };
}

function _getSeller(bidRequest) {
  return {
    id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('sellerId', bidRequest.params)
  };
}

function _getSizes(bidRequest) {
  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](bidRequest.sizes)) {
    return undefined;
  }

  return bidRequest.sizes.filter(_isValidSize).map(function (size) {
    return {
      w: size[0],
      h: size[1]
    };
  });
}

function _isValidSize(size) {
  var isNumber = function isNumber(x) {
    return typeof x === 'number';
  };

  return size.length === 2 && isNumber(size[0]) && isNumber(size[1]);
}

function _getDevice(_bidRequest) {
  return {
    ua: navigator.userAgent,
    language: navigator['language'],
    os: _getOs(navigator.userAgent.toLowerCase()),
    osv: _getOsVersion(navigator.userAgent)
  };
}

function _getRegs(bidderRequest) {
  if (!bidderRequest || !bidderRequest.uspConsent) {
    return undefined;
  }

  return {
    ext: {
      us_privacy: bidderRequest.uspConsent
    }
  };
}

function _getOs(userAgent) {
  var osTable = {
    'android': /android/i,
    'ios': /iphone|ipad/i,
    'mac': /mac/i,
    'linux': /linux/i,
    'windows': /windows/i
  };
  return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(Object.keys(osTable), function (os) {
    if (userAgent.match(osTable[os])) {
      return os;
    }
  }) || 'etc';
}

function _getOsVersion(userAgent) {
  var clientStrings = [{
    s: 'Android',
    r: /Android/
  }, {
    s: 'iOS',
    r: /(iPhone|iPad|iPod)/
  }, {
    s: 'Mac OS X',
    r: /Mac OS X/
  }, {
    s: 'Mac OS',
    r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
  }, {
    s: 'Linux',
    r: /(Linux|X11)/
  }, {
    s: 'Windows 10',
    r: /(Windows 10.0|Windows NT 10.0)/
  }, {
    s: 'Windows 8.1',
    r: /(Windows 8.1|Windows NT 6.3)/
  }, {
    s: 'Windows 8',
    r: /(Windows 8|Windows NT 6.2)/
  }, {
    s: 'Windows 7',
    r: /(Windows 7|Windows NT 6.1)/
  }, {
    s: 'Windows Vista',
    r: /Windows NT 6.0/
  }, {
    s: 'Windows Server 2003',
    r: /Windows NT 5.2/
  }, {
    s: 'Windows XP',
    r: /(Windows NT 5.1|Windows XP)/
  }, {
    s: 'UNIX',
    r: /UNIX/
  }, {
    s: 'Search Bot',
    r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
  }];
  var cs = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(clientStrings, function (cs) {
    return cs.r.test(userAgent);
  });
  return cs ? cs.s : 'unknown';
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[553]);