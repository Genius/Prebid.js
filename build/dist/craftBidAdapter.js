pbjsChunk([241],{

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(358);


/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_auctionManager_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_storageManager_js__ = __webpack_require__(9);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }








var BIDDER_CODE = 'craft';
var URL = 'https://gacraft.jp/prebid-v3';
var TTL = 360;
var storage = Object(__WEBPACK_IMPORTED_MODULE_6__src_storageManager_js__["b" /* getStorageManager */])();
var spec = {
  code: BIDDER_CODE,
  aliases: ['craft'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.sitekey && !!bid.params.placementId && !isAmp();
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var tags = bidRequests.map(bidToTag);
    var schain = bidRequests[0].schain;
    var payload = {
      tags: _toConsumableArray(tags),
      ua: navigator.userAgent,
      sdk: {
        version: "4.2.0"
      },
      schain: schain
    };

    if (bidderRequest && bidderRequest.gdprConsent) {
      payload.gdpr_consent = {
        consent_string: bidderRequest.gdprConsent.consentString,
        consent_required: bidderRequest.gdprConsent.gdprApplies
      };
    }

    if (bidderRequest && bidderRequest.uspConsent) {
      payload.us_privacy = bidderRequest.uspConsent;
    }

    if (bidderRequest && bidderRequest.refererInfo) {
      var refererinfo = {
        rd_ref: bidderRequest.refererInfo.referer,
        rd_top: bidderRequest.refererInfo.reachedTop,
        rd_ifs: bidderRequest.refererInfo.numIframes
      };

      if (bidderRequest.refererInfo.stack) {
        refererinfo.rd_stk = bidderRequest.refererInfo.stack.join(',');
      }

      payload.referrer_detection = refererinfo;
    }

    var request = formatRequest(payload, bidderRequest);
    return request;
  },
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var _this = this;

    var bidderRequest = _ref.bidderRequest;

    try {
      serverResponse = serverResponse.body;
      var bids = [];

      if (!serverResponse) {
        return [];
      }

      if (serverResponse.error) {
        var errorMessage = "in response for ".concat(bidderRequest.bidderCode, " adapter");

        if (serverResponse.error) {
          errorMessage += ": ".concat(serverResponse.error);
        }

        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](errorMessage);
        return bids;
      }

      if (serverResponse.tags) {
        serverResponse.tags.forEach(function (serverBid) {
          var rtbBid = getRtbBid(serverBid);

          if (rtbBid) {
            if (rtbBid.cpm !== 0 && __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_includes_js___default()(_this.supportedMediaTypes, rtbBid.ad_type)) {
              var bid = newBid(serverBid, rtbBid, bidderRequest);
              bid.mediaType = parseMediaType(rtbBid);
              bids.push(bid);
            }
          }
        });
      }

      return bids;
    } catch (e) {
      return [];
    }
  },
  transformBidParams: function transformBidParams(params, isOpenRtb) {
    params = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["convertTypes"]({
      'sitekey': 'string',
      'placementId': 'string',
      'keywords': __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["transformBidderParamKeywords"]
    }, params);

    if (isOpenRtb) {
      if (isPopulatedArray(params.keywords)) {
        params.keywords.forEach(deleteValues);
      }

      Object.keys(params).forEach(function (paramKey) {
        var convertedKey = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["convertCamelToUnderscore"](paramKey);

        if (convertedKey !== paramKey) {
          params[convertedKey] = params[paramKey];
          delete params[paramKey];
        }
      });
    }

    return params;
  },
  onBidWon: function onBidWon(bid) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', bid._prebidWon);
    xhr.send();
  }
};

function isPopulatedArray(arr) {
  return !!(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](arr) && arr.length > 0);
}

function deleteValues(keyPairObj) {
  if (isPopulatedArray(keyPairObj.value) && keyPairObj.value[0] === '') {
    delete keyPairObj.value;
  }
}

function hasPurpose1Consent(bidderRequest) {
  var result = true;

  if (bidderRequest && bidderRequest.gdprConsent) {
    if (bidderRequest.gdprConsent.gdprApplies && bidderRequest.gdprConsent.apiVersion === 2) {
      result = !!(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest.gdprConsent, 'vendorData.purpose.consents.1') === true);
    }
  }

  return result;
}

function formatRequest(payload, bidderRequest) {
  var options = {};

  if (!hasPurpose1Consent(bidderRequest)) {
    options = {
      withCredentials: false
    };
  }

  var payloadString = JSON.stringify(payload);
  return {
    method: 'POST',
    url: URL,
    data: payloadString,
    bidderRequest: bidderRequest,
    options: options
  };
}

function newBid(serverBid, rtbBid, bidderRequest) {
  var bidRequest = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidRequest"](serverBid.uuid, [bidderRequest]);
  var bid = {
    requestId: serverBid.uuid,
    cpm: rtbBid.cpm,
    currency: 'JPY',
    width: rtbBid.rtb.banner.width,
    height: rtbBid.rtb.banner.height,
    ad: rtbBid.rtb.banner.content,
    ttl: TTL,
    creativeId: rtbBid.creative_id,
    netRevenue: false,
    // ???
    dealId: rtbBid.deal_id,
    meta: null,
    _adUnitCode: bidRequest.adUnitCode,
    _bidKey: serverBid.bid_key,
    _prebidWon: serverBid.won_url
  };
  return bid;
}

function bidToTag(bid) {
  var tag = {};

  for (var k in bid.params) {
    tag[k] = bid.params[k];
  }

  try {
    if (storage.hasLocalStorage()) {
      tag.uid = JSON.parse(storage.getDataFromLocalStorage("".concat(bid.params.sitekey, "_uid")));
    }
  } catch (e) {}

  tag.sizes = bid.sizes;
  tag.primary_size = tag.sizes[0];
  tag.ad_types = [];
  tag.uuid = bid.bidId;

  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](bid.params.keywords)) {
    var keywords = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["transformBidderParamKeywords"](bid.params.keywords);

    if (keywords.length > 0) {
      keywords.forEach(deleteValues);
    }

    tag.keywords = keywords;
  }

  var adUnit = __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default()(__WEBPACK_IMPORTED_MODULE_3__src_auctionManager_js__["a" /* auctionManager */].getAdUnits(), function (au) {
    return bid.transactionId === au.transactionId;
  });

  if (adUnit && adUnit.mediaTypes && adUnit.mediaTypes.banner) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]);
  }

  if (tag.ad_types.length === 0) {
    delete tag.ad_types;
  }

  return tag;
}

function getRtbBid(tag) {
  return tag && tag.ads && tag.ads.length && __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default()(tag.ads, function (ad) {
    return ad.rtb;
  });
}

function parseMediaType(rtbBid) {
  var adType = rtbBid.ad_type;

  if (adType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]) {
    return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */];
  } else if (adType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */]) {
    return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */];
  } else {
    return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */];
  }
}

function isAmp() {
  try {
    var ampContext = window.context || window.parent.context;

    if (ampContext && ampContext.pageViewId) {
      return ampContext;
    }

    return false;
  } catch (e) {
    return false;
  }
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[357]);