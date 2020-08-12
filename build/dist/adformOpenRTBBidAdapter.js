pbjsChunk([201],{

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(135);


/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config__ = __webpack_require__(3);
// jshint esversion: 6, es3: false, node: true


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }





var BIDDER_CODE = 'adformOpenRTB';
var NATIVE_ASSET_IDS = {
  0: 'title',
  2: 'icon',
  3: 'image',
  5: 'sponsoredBy',
  4: 'body',
  1: 'cta'
};
var NATIVE_PARAMS = {
  title: {
    id: 0,
    name: 'title'
  },
  icon: {
    id: 2,
    type: 1,
    name: 'img'
  },
  image: {
    id: 3,
    type: 3,
    name: 'img'
  },
  sponsoredBy: {
    id: 5,
    name: 'data',
    type: 1
  },
  body: {
    id: 4,
    name: 'data',
    type: 2
  },
  cta: {
    id: 1,
    type: 12,
    name: 'data'
  }
};
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["c" /* NATIVE */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.mid;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var page = bidderRequest.refererInfo.referer;
    var adxDomain = setOnAny(validBidRequests, 'params.adxDomain') || 'adx.adform.net';
    var ua = navigator.userAgent;
    var pt = setOnAny(validBidRequests, 'params.pt') || setOnAny(validBidRequests, 'params.priceType') || 'net';
    var tid = validBidRequests[0].transactionId; // ??? check with ssp

    var test = setOnAny(validBidRequests, 'params.test');
    var publisher = setOnAny(validBidRequests, 'params.publisher');
    var siteId = setOnAny(validBidRequests, 'params.siteId');
    var currency = __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('currency.adServerCurrency');
    var cur = currency && [currency];
    var imp = validBidRequests.map(function (bid, id) {
      bid.netRevenue = pt;

      var assets = __WEBPACK_IMPORTED_MODULE_2__src_utils__["_map"](bid.nativeParams, function (bidParams, key) {
        var props = NATIVE_PARAMS[key];
        var asset = {
          required: bidParams.required & 1
        };

        if (props) {
          asset.id = props.id;
          var wmin, hmin, w, h;
          var aRatios = bidParams.aspect_ratios;

          if (aRatios && aRatios[0]) {
            aRatios = aRatios[0];
            wmin = aRatios.min_width || 0;
            hmin = aRatios.ratio_height * wmin / aRatios.ratio_width | 0;
          }

          if (bidParams.sizes) {
            var sizes = flatten(bidParams.sizes);
            w = sizes[0];
            h = sizes[1];
          }

          asset[props.name] = {
            len: bidParams.len,
            type: props.type,
            wmin: wmin,
            hmin: hmin,
            w: w,
            h: h
          };
          return asset;
        }
      }).filter(Boolean);

      return {
        id: id + 1,
        tagid: bid.params.mid,
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
        id: siteId,
        page: page,
        publisher: publisher
      },
      device: {
        ua: ua
      },
      source: {
        tid: tid,
        fd: 1
      },
      ext: {
        pt: pt
      },
      cur: cur,
      imp: imp
    };

    if (test) {
      request.is_debug = !!test;
      request.test = 1;
    }

    if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bidderRequest, 'gdprConsent.gdprApplies')) {
      request.user = {
        ext: {
          consent: bidderRequest.gdprConsent.consentString
        }
      };
      request.regs = {
        ext: {
          gdpr: bidderRequest.gdprConsent.gdprApplies & 1
        }
      };
    }

    return {
      method: 'POST',
      url: 'https://' + adxDomain + '/adx/openrtb',
      data: JSON.stringify(request),
      options: {
        contentType: 'application/json'
      },
      bids: validBidRequests
    };
  },
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bids = _ref.bids;

    if (!serverResponse.body) {
      return;
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
          ttl: 360,
          netRevenue: bid.netRevenue === 'net',
          currency: cur,
          mediaType: __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["c" /* NATIVE */],
          bidderCode: BIDDER_CODE,
          native: parseNative(bidResponse)
        };
      }
    }).filter(Boolean);
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

function parseNative(bid) {
  var _bid$native = bid.native,
      assets = _bid$native.assets,
      link = _bid$native.link,
      imptrackers = _bid$native.imptrackers,
      jstracker = _bid$native.jstracker;
  var result = {
    clickUrl: link.url,
    clickTrackers: link.clicktrackers || undefined,
    impressionTrackers: imptrackers || undefined,
    javascriptTrackers: jstracker ? [jstracker] : undefined
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
    result = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](collection[i], key);

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

},[134]);