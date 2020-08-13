pbjsChunk([174],{

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(522);


/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var BIDDER_CODE = 'mediaforce';
var ENDPOINT_URL = 'https://rtb.mfadsrvr.com/header_bid';
var TEST_ENDPOINT_URL = 'https://rtb.mfadsrvr.com/header_bid?debug_key=abcdefghijklmnop';
var NATIVE_ID_MAP = {};
var NATIVE_PARAMS = {
  title: {
    id: 1,
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
  body: {
    id: 4,
    name: 'data',
    type: 2
  },
  sponsoredBy: {
    id: 5,
    name: 'data',
    type: 1
  },
  cta: {
    id: 6,
    type: 12,
    name: 'data'
  },
  body2: {
    id: 7,
    name: 'data',
    type: 10
  },
  rating: {
    id: 8,
    name: 'data',
    type: 3
  },
  likes: {
    id: 9,
    name: 'data',
    type: 4
  },
  downloads: {
    id: 10,
    name: 'data',
    type: 5
  },
  displayUrl: {
    id: 11,
    name: 'data',
    type: 11
  },
  price: {
    id: 12,
    name: 'data',
    type: 6
  },
  salePrice: {
    id: 13,
    name: 'data',
    type: 7
  },
  address: {
    id: 14,
    name: 'data',
    type: 9
  },
  phone: {
    id: 15,
    name: 'data',
    type: 8
  }
};
Object.keys(NATIVE_PARAMS).forEach(function (key) {
  NATIVE_ID_MAP[NATIVE_PARAMS[key].id] = key;
});
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(_typeof(bid.params) === 'object' && bid.params.placement_id && bid.params.publisher_id);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests - an array of bids
   * @param {bidderRequest} bidderRequest bidder request object
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    if (validBidRequests.length === 0) {
      return;
    }

    var referer = bidderRequest && bidderRequest.refererInfo ? encodeURIComponent(bidderRequest.refererInfo.referer) : '';
    var dnt = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getDNT"]() ? 1 : 0;
    var requests = [];
    validBidRequests.forEach(function (bid) {
      var tagid = bid.params.placement_id;
      var bidfloor = bid.params.bidfloor ? parseFloat(bid.params.bidfloor) : 0;
      var imp = [];
      var validImp = false;
      var impObj = {
        id: bid.bidId,
        tagid: tagid,
        secure: 1,
        bidfloor: bidfloor
      };

      for (var mediaTypes in bid.mediaTypes) {
        switch (mediaTypes) {
          case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]:
            impObj.banner = createBannerRequest(bid);
            validImp = true;
            break;

          case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */]:
            impObj.native = createNativeRequest(bid);
            validImp = true;
            break;

          default:
            return;
        }
      }

      validImp && imp.push(impObj);
      var request = {
        id: bid.transactionId,
        site: {
          page: referer,
          ref: referer,
          id: bid.params.publisher_id,
          publisher: {
            id: bid.params.publisher_id
          }
        },
        device: {
          ua: navigator.userAgent,
          js: 1,
          dnt: dnt,
          language: getLanguage()
        },
        imp: imp
      };
      requests.push({
        method: 'POST',
        url: bid.params.is_test ? TEST_ENDPOINT_URL : ENDPOINT_URL,
        data: JSON.stringify(request)
      });
    });
    return requests;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @param {BidRequest} bidRequest
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    if (!serverResponse || !serverResponse.body) {
      return [];
    }

    var responseBody = serverResponse.body;
    var bidResponses = [];
    var cur = responseBody.cur;
    responseBody.seatbid.forEach(function (bids) {
      bids.bid.forEach(function (serverBid) {
        var bid = {
          requestId: serverBid.impid,
          cpm: parseFloat(serverBid.price),
          creativeId: serverBid.adid,
          currency: cur,
          netRevenue: true,
          ttl: serverBid.ttl || 300,
          burl: serverBid.burl
        };

        if (serverBid.dealid) {
          bid.dealId = serverBid.dealid;
        }

        var jsonAdm;
        var adm = serverBid.adm;
        var ext = serverBid.ext;

        try {
          jsonAdm = JSON.parse(adm);
        } catch (err) {}

        if (jsonAdm && jsonAdm.native) {
          ext = ext || {};
          ext.native = jsonAdm.native;
          adm = null;
        }

        if (adm) {
          bid.width = serverBid.w;
          bid.height = serverBid.h;
          bid.ad = adm;
          bid.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */];
        } else if (ext && ext.native) {
          bid.native = parseNative(ext.native);
          bid.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */];
        }

        bidResponses.push(bid);
      });
    });
    return bidResponses;
  },

  /**
   * Register bidder specific code, which will execute if a bid from this bidder won the auction
   * @param {Bid} The bid that won the auction
   */
  onBidWon: function onBidWon(bid) {
    var cpm = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'adserverTargeting.hb_pb') || '';

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](bid.burl) && bid.burl !== '') {
      bid.burl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["replaceAuctionPrice"](bid.burl, cpm);
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["triggerPixel"](bid.burl);
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

function getLanguage() {
  var language = navigator.language ? 'language' : 'userLanguage';
  return navigator[language].split('-')[0];
}

function createBannerRequest(bid) {
  var sizes = bid.mediaTypes.banner.sizes;
  if (!sizes.length) return;
  var format = [];
  var r = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseGPTSingleSizeArrayToRtbSize"](sizes[0]);

  for (var f = 1; f < sizes.length; f++) {
    format.push(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseGPTSingleSizeArrayToRtbSize"](sizes[f]));
  }

  if (format.length) {
    r.format = format;
  }

  return r;
}

function parseNative(native) {
  var assets = native.assets,
      link = native.link,
      imptrackers = native.imptrackers,
      jstracker = native.jstracker;
  var result = {
    clickUrl: link.url,
    clickTrackers: link.clicktrackers || [],
    impressionTrackers: imptrackers || [],
    javascriptTrackers: jstracker ? [jstracker] : []
  };
  (assets || []).forEach(function (asset) {
    var id = asset.id,
        img = asset.img,
        data = asset.data,
        title = asset.title;
    var key = NATIVE_ID_MAP[id];

    if (key) {
      if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](title)) {
        result.title = title.text;
      } else if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](img)) {
        result[key] = {
          url: img.url,
          height: img.h,
          width: img.w
        };
      } else if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](data)) {
        result[key] = data.value;
      }
    }
  });
  return result;
}

function createNativeRequest(bid) {
  var assets = [];

  if (bid.nativeParams) {
    Object.keys(bid.nativeParams).forEach(function (key) {
      if (NATIVE_PARAMS[key]) {
        var _NATIVE_PARAMS$key = NATIVE_PARAMS[key],
            name = _NATIVE_PARAMS$key.name,
            type = _NATIVE_PARAMS$key.type,
            id = _NATIVE_PARAMS$key.id;
        var assetObj = type ? {
          type: type
        } : {};
        var _bid$nativeParams$key = bid.nativeParams[key],
            len = _bid$nativeParams$key.len,
            sizes = _bid$nativeParams$key.sizes,
            required = _bid$nativeParams$key.required,
            aRatios = _bid$nativeParams$key.aspect_ratios;

        if (len) {
          assetObj.len = len;
        }

        if (aRatios && aRatios[0]) {
          aRatios = aRatios[0];
          var wmin = aRatios.min_width || 0;
          var hmin = aRatios.ratio_height * wmin / aRatios.ratio_width | 0;
          assetObj.wmin = wmin;
          assetObj.hmin = hmin;
        }

        if (sizes && sizes.length) {
          var _ref;

          sizes = (_ref = []).concat.apply(_ref, _toConsumableArray(sizes));
          assetObj.w = sizes[0];
          assetObj.h = sizes[1];
        }

        var asset = {
          required: required ? 1 : 0,
          id: id
        };
        asset[name] = assetObj;
        assets.push(asset);
      }
    });
  }

  return {
    ver: '1.2',
    request: {
      assets: assets,
      context: 1,
      plcmttype: 1,
      ver: '1.2'
    }
  };
}

/***/ })

},[521]);