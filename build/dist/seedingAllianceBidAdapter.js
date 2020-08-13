pbjsChunk([112],{

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(675);


/***/ }),

/***/ 675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);
// jshint esversion: 6, es3: false, node: true


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var BIDDER_CODE = 'seedingAlliance';
var DEFAULT_CUR = 'EUR';
var ENDPOINT_URL = 'https://b.nativendo.de/cds/rtb/bid?format=openrtb2.5&ssp=nativendo';
var NATIVE_ASSET_IDS = {
  0: 'title',
  1: 'body',
  2: 'sponsoredBy',
  3: 'image',
  4: 'cta',
  5: 'icon'
};
var NATIVE_PARAMS = {
  title: {
    id: 0,
    name: 'title'
  },
  body: {
    id: 1,
    name: 'data',
    type: 2
  },
  sponsoredBy: {
    id: 2,
    name: 'data',
    type: 1
  },
  image: {
    id: 3,
    type: 3,
    name: 'img'
  },
  cta: {
    id: 4,
    type: 12,
    name: 'data'
  },
  icon: {
    id: 5,
    type: 1,
    name: 'img'
  }
};
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.adUnitId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var pt = setOnAny(validBidRequests, 'params.pt') || setOnAny(validBidRequests, 'params.priceType') || 'net';
    var tid = validBidRequests[0].transactionId;
    var cur = [__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency') || DEFAULT_CUR];
    var url = bidderRequest.refererInfo.referer;
    var imp = validBidRequests.map(function (bid, id) {
      var assets = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["_map"](bid.nativeParams, function (bidParams, key) {
        var props = NATIVE_PARAMS[key];
        var asset = {
          required: bidParams.required & 1
        };

        if (props) {
          asset.id = props.id;
          var w, h;

          if (bidParams.sizes) {
            w = bidParams.sizes[0];
            h = bidParams.sizes[1];
          }

          asset[props.name] = {
            len: bidParams.len,
            type: props.type,
            w: w,
            h: h
          };
          return asset;
        }
      }).filter(Boolean);

      if (bid.params.url) {
        url = bid.params.url;
      }

      return {
        id: String(id + 1),
        tagid: bid.params.adUnitId,
        tid: tid,
        pt: pt,
        native: {
          request: {
            assets: assets
          }
        }
      };
    });
    var request = {
      id: bidderRequest.auctionId,
      site: {
        page: url
      },
      device: {
        ua: navigator.userAgent
      },
      cur: cur,
      imp: imp,
      user: {},
      regs: {
        ext: {
          gdpr: 0
        }
      }
    };

    if (bidderRequest && bidderRequest.gdprConsent) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'user.ext.consent', bidderRequest.gdprConsent.consentString);
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'regs.ext.gdpr', typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' && bidderRequest.gdprConsent.gdprApplies ? 1 : 0);
    }

    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: JSON.stringify(request),
      options: {
        contentType: 'application/json'
      },
      bids: validBidRequests
    };
  },
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bids = _ref.bids;

    if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isEmpty"](serverResponse.body)) {
      return [];
    }

    var _serverResponse$body = serverResponse.body,
        seatbid = _serverResponse$body.seatbid,
        cur = _serverResponse$body.cur;
    var bidResponses = flatten(seatbid.map(function (seat) {
      return seat.bid;
    })).reduce(function (result, bid) {
      result[bid.impid - 1] = bid;
      return result;
    }, []);
    return bids.map(function (bid, id) {
      var bidResponse = bidResponses[id];

      if (bidResponse) {
        return {
          requestId: bid.bidId,
          cpm: bidResponse.price,
          creativeId: bidResponse.crid,
          ttl: 1000,
          netRevenue: bid.netRevenue === 'net',
          currency: cur,
          mediaType: __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */],
          bidderCode: BIDDER_CODE,
          native: parseNative(bidResponse)
        };
      }
    }).filter(Boolean);
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

function parseNative(bid) {
  var _bid$adm$native = bid.adm.native,
      assets = _bid$adm$native.assets,
      link = _bid$adm$native.link,
      imptrackers = _bid$adm$native.imptrackers;
  link.clicktrackers.forEach(function (clicktracker, index) {
    link.clicktrackers[index] = clicktracker.replace(/\$\{AUCTION_PRICE\}/, bid.price);
  });
  imptrackers.forEach(function (imptracker, index) {
    imptrackers[index] = imptracker.replace(/\$\{AUCTION_PRICE\}/, bid.price);
  });
  var result = {
    url: link.url,
    clickUrl: link.url,
    clickTrackers: link.clicktrackers || undefined,
    impressionTrackers: imptrackers || undefined
  };
  assets.forEach(function (asset) {
    var kind = NATIVE_ASSET_IDS[asset.id];
    var content = kind && asset[NATIVE_PARAMS[kind].name];

    if (content) {
      result[kind] = content.text || content.value || {
        url: content.url,
        width: content.w,
        height: content.h
      };
    }
  });
  return result;
}

function setOnAny(collection, key) {
  for (var i = 0, result; i < collection.length; i++) {
    result = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](collection[i], key);

    if (result) {
      return result;
    }
  }
}

function flatten(arr) {
  var _ref2;

  return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(arr));
}

/***/ })

},[674]);