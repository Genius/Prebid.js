pbjsChunk([311],{

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(192);


/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);


function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var BIDDER_CODE = 'adhese';
var USER_SYNC_BASE_URL = 'https://user-sync.adhese.com/iframe/user_sync.html';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.account && bid.params.location && (bid.params.format || bid.mediaTypes.banner.sizes));
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    if (validBidRequests.length === 0) {
      return null;
    }

    var gdprConsent = bidderRequest.gdprConsent,
        refererInfo = bidderRequest.refererInfo;
    var account = getAccount(validBidRequests);
    var targets = validBidRequests.map(function (bid) {
      return bid.params.data;
    }).reduce(mergeTargets, {});
    var gdprParams = gdprConsent && gdprConsent.consentString ? ["xt".concat(gdprConsent.consentString)] : [];
    var refererParams = refererInfo && refererInfo.referer ? ["xf".concat(base64urlEncode(refererInfo.referer))] : [];
    var id5Params = getId5Id(validBidRequests) ? ["x5".concat(getId5Id(validBidRequests))] : [];
    var targetsParams = Object.keys(targets).map(function (targetCode) {
      return targetCode + targets[targetCode].join(';');
    });
    var slotsParams = validBidRequests.map(function (bid) {
      return 'sl' + bidToSlotName(bid);
    });
    var params = [].concat(_toConsumableArray(slotsParams), _toConsumableArray(targetsParams), gdprParams, refererParams, id5Params).map(function (s) {
      return "/".concat(s);
    }).join('');
    var cacheBuster = '?t=' + new Date().getTime();
    var uri = 'https://ads-' + account + '.adhese.com/json' + params + cacheBuster;
    return {
      method: 'GET',
      url: uri,
      bids: validBidRequests
    };
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var serverAds = serverResponse.body.reduce(function (map, ad) {
      map[ad.slotName] = ad;
      return map;
    }, {});
    serverResponse.account = getAccount(request.bids);
    return request.bids.map(function (bid) {
      return {
        bid: bid,
        ad: serverAds[bidToSlotName(bid)]
      };
    }).filter(function (item) {
      return item.ad;
    }).map(function (item) {
      return adResponse(item.bid, item.ad);
    });
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    if (syncOptions.iframeEnabled && serverResponses.length > 0) {
      var account = serverResponses[0].account;

      if (account) {
        var syncurl = USER_SYNC_BASE_URL + '?account=' + account;

        if (gdprConsent) {
          syncurl += '&gdpr=' + (gdprConsent.gdprApplies ? 1 : 0);
          syncurl += '&consentString=' + encodeURIComponent(gdprConsent.consentString || '');
        }

        return [{
          type: 'iframe',
          url: syncurl
        }];
      }
    }

    return [];
  }
};

function adResponse(bid, ad) {
  var price = getPrice(ad);
  var adDetails = getAdDetails(ad);
  var markup = getAdMarkup(ad);
  var bidResponse = getbaseAdResponse({
    requestId: bid.bidId,
    mediaType: getMediaType(markup),
    cpm: Number(price.amount),
    currency: price.currency,
    width: Number(ad.width),
    height: Number(ad.height),
    creativeId: adDetails.creativeId,
    dealId: adDetails.dealId,
    adhese: {
      originData: adDetails.originData,
      origin: adDetails.origin,
      originInstance: adDetails.originInstance
    }
  });

  if (bidResponse.mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]) {
    bidResponse.vastXml = markup;
  } else {
    var counter = ad.impressionCounter ? "<img src='" + ad.impressionCounter + "' style='height:1px; width:1px; margin: -1px -1px; display:none;'/>" : '';
    bidResponse.ad = markup + counter;
  }

  return bidResponse;
}

function mergeTargets(targets, target) {
  if (target) {
    Object.keys(target).forEach(function (key) {
      var val = target[key];
      var values = Array.isArray(val) ? val : [val];

      if (targets[key]) {
        var distinctValues = values.filter(function (v) {
          return targets[key].indexOf(v) < 0;
        });
        targets[key].push.apply(targets[key], distinctValues);
      } else {
        targets[key] = values;
      }
    });
  }

  return targets;
}

function bidToSlotName(bid) {
  if (bid.params.format) {
    return bid.params.location + '-' + bid.params.format;
  }

  var sizes = bid.mediaTypes.banner.sizes;
  sizes.sort();
  var format = sizes.map(function (size) {
    return size[0] + 'x' + size[1];
  }).join('_');

  if (format.length > 0) {
    return bid.params.location + '-' + format;
  } else {
    return bid.params.location;
  }
}

function getAccount(validBidRequests) {
  return validBidRequests[0].params.account;
}

function getId5Id(validBidRequests) {
  if (validBidRequests[0] && validBidRequests[0].userId && validBidRequests[0].userId.id5id) {
    return validBidRequests[0].userId.id5id;
  }
}

function getbaseAdResponse(response) {
  return _extends({
    netRevenue: true,
    ttl: 360
  }, response);
}

function isAdheseAd(ad) {
  return !ad.origin || ad.origin === 'JERLICIA' || ad.origin === 'DALE';
}

function getMediaType(markup) {
  var isVideo = markup.trim().toLowerCase().match(/<\?xml|<vast/);
  return isVideo ? __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */] : __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */];
}

function getAdMarkup(ad) {
  if (!isAdheseAd(ad) || ad.ext === 'js' && ad.body !== undefined && ad.body !== '' && ad.body.match(/<script|<SCRIPT|<html|<HTML|<\?xml/)) {
    return ad.body;
  } else {
    return ad.tag;
  }
}

function getPrice(ad) {
  if (ad.extension && ad.extension.prebid && ad.extension.prebid.cpm) {
    return ad.extension.prebid.cpm;
  }

  return {
    amount: 0,
    currency: 'USD'
  };
}

function getAdDetails(ad) {
  var creativeId = '';
  var dealId = '';
  var originData = {};
  var origin = '';
  var originInstance = '';

  if (isAdheseAd(ad)) {
    creativeId = ad.id;
    dealId = ad.orderId;
    originData = {
      priority: ad.priority,
      orderProperty: ad.orderProperty,
      adFormat: ad.adFormat,
      adType: ad.adType,
      libId: ad.libId,
      adspaceId: ad.adspaceId,
      viewableImpressionCounter: ad.viewableImpressionCounter,
      slotId: ad.slotID,
      slotName: ad.slotName,
      advertiserId: ad.advertiserId,
      adId: ad.id
    };
  } else {
    creativeId = ad.origin + (ad.originInstance ? '-' + ad.originInstance : '');

    if (ad.originData) {
      originData = ad.originData;
      originData.slotId = ad.slotID;
      originData.slotName = ad.slotName;
      originData.adType = ad.adType;
      if (ad.adFormat) originData.adFormat = ad.adFormat;

      if (ad.originData.seatbid && ad.originData.seatbid.length) {
        var seatbid = ad.originData.seatbid[0];

        if (seatbid.bid && seatbid.bid.length) {
          var bid = seatbid.bid[0];
          creativeId = String(bid.crid || '');
          dealId = String(bid.dealid || '');
        }
      }
    }

    if (ad.originInstance) originInstance = ad.originInstance;
    if (ad.origin) origin = ad.origin;
  }

  return {
    creativeId: creativeId,
    dealId: dealId,
    originData: originData,
    origin: origin,
    originInstance: originInstance
  };
}

function base64urlEncode(s) {
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[191]);