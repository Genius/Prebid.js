pbjsChunk([286],{

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(254);


/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var BIDDER_CODE = 'amx';
var SIMPLE_TLD_TEST = /\.co\.\w{2,4}$/;
var DEFAULT_ENDPOINT = 'https://prebid.a-mo.net/a/c';
var VERSION = 'pba1.0';
var xmlDTDRxp = /^\s*<\?xml[^\?]+\?>/;
var VAST_RXP = /^\s*<\??(?:vast|xml)/i;
var TRACKING_ENDPOINT = 'https://1x1.a-mo.net/hbx/';

var getLocation = function getLocation(request) {
  return Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["parseUrl"])(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(request, 'refererInfo.canonicalUrl', location.href));
};

var largestSize = function largestSize(sizes, mediaTypes) {
  var allSizes = sizes.concat(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(mediaTypes, "".concat(__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], ".sizes"), []) || []).concat(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(mediaTypes, "".concat(__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */], ".sizes"), []) || []);
  return allSizes.sort(function (a, b) {
    return b[0] * b[1] - a[0] * a[1];
  })[0];
};

function flatMap(input, mapFn) {
  if (input == null) {
    return [];
  }

  return input.map(mapFn).reduce(function (acc, item) {
    return item != null && acc.concat(item);
  }, []);
}

var generateDTD = function generateDTD(xmlDocument) {
  return "<?xml version=\"".concat(xmlDocument.xmlVersion, "\" encoding=\"").concat(xmlDocument.xmlEncoding, "\" ?>");
};

var isVideoADM = function isVideoADM(html) {
  return html != null && VAST_RXP.test(html);
};

var getMediaType = function getMediaType(bid) {
  return isVideoADM(bid.adm) ? __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */] : __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */];
};

var nullOrType = function nullOrType(value, type) {
  return value == null || _typeof(value) === type;
}; // eslint-disable-line valid-typeof


function getID(loc) {
  var host = loc.hostname.split('.');
  var short = host.slice(host.length - (SIMPLE_TLD_TEST.test(loc.host) ? 3 : 2)).join('.');
  return btoa(short).replace(/=+$/, '');
}

var enc = encodeURIComponent;

function nestedQs(qsData) {
  var out = [];
  Object.keys(qsData || {}).forEach(function (key) {
    out.push(enc(key) + '=' + enc(String(qsData[key])));
  });
  return enc(out.join('&'));
}

function createBidMap(bids) {
  var out = {};

  Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["_each"])(bids, function (bid) {
    out[bid.bidId] = convertRequest(bid);
  });

  return out;
}

var trackEvent = function trackEvent(eventName, data) {
  return Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["triggerPixel"])("".concat(TRACKING_ENDPOINT, "g_").concat(eventName, "?").concat(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["formatQS"])(_objectSpread(_objectSpread({}, data), {}, {
    ts: Date.now(),
    eid: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["getUniqueIdentifierStr"])()
  }))));
};

function convertRequest(bid) {
  var size = largestSize(bid.sizes, bid.mediaTypes) || [0, 0];
  var isVideoBid = bid.mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */] || __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */] in bid.mediaTypes;
  var av = isVideoBid || size[1] > 100;
  var tid = Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bid, 'params.tagId');
  var params = {
    av: av,
    vr: isVideoBid,
    aw: size[0],
    ah: size[1],
    tf: 0
  };

  if (typeof tid === 'string' && tid.length > 0) {
    params.i = tid;
  }

  return params;
}

function decorateADM(bid) {
  var impressions = Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bid, 'ext.himp', []).concat(bid.nurl != null ? [bid.nurl] : []).filter(function (imp) {
    return imp != null && imp.length > 0;
  }).map(function (src) {
    return "<img src=\"".concat(src, "\" width=\"0\" height=\"0\"/>");
  }).join('');
  return bid.adm + impressions;
}

function transformXmlSimple(bid) {
  var pixels = [];

  Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["_each"])([bid.nurl].concat(bid.ext != null && bid.ext.himp != null ? bid.ext.himp : []), function (pixel) {
    if (pixel != null) {
      pixels.push("<Impression><![CDATA[".concat(pixel, "]]></Impression>"));
    }
  }); // find the current "Impression" here & slice ours in


  var impressionIndex = bid.adm.indexOf('<Impression');
  return bid.adm.slice(0, impressionIndex) + pixels.join('') + bid.adm.slice(impressionIndex);
}

function getOuterHTML(node) {
  return 'outerHTML' in node && node.outerHTML != null ? node.outerHTML : new XMLSerializer().serializeToString(node);
}

function decorateVideoADM(bid) {
  if (typeof DOMParser === 'undefined' || DOMParser.prototype.parseFromString == null) {
    return transformXmlSimple(bid);
  }

  var doc = new DOMParser().parseFromString(bid.adm, 'text/xml');

  if (doc == null || doc.querySelector('parsererror') != null) {
    return null;
  }

  var root = doc.querySelector('InLine,Wrapper');

  if (root == null) {
    return null;
  }

  var pixels = [bid.nurl].concat(bid.ext != null && bid.ext.himp != null ? bid.ext.himp : []).filter(function (url) {
    return url != null;
  });

  Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["_each"])(pixels, function (pxl) {
    var imagePixel = doc.createElement('Impression');
    var cdata = doc.createCDATASection(pxl);
    imagePixel.appendChild(cdata);
    root.appendChild(imagePixel);
  });

  var dtdMatch = xmlDTDRxp.exec(bid.adm);
  return (dtdMatch != null ? dtdMatch[0] : generateDTD(doc)) + getOuterHTML(doc.documentElement);
}

function resolveSize(bid, request, bidId) {
  if (bid.w != null && bid.w > 1 && bid.h != null && bid.h > 1) {
    return [bid.w, bid.h];
  }

  var bidRequest = request.m[bidId];

  if (bidRequest == null) {
    return [0, 0];
  }

  return [bidRequest.aw, bidRequest.ah];
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return nullOrType(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bid, 'params.endpoint', null), 'string') && nullOrType(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bid, 'params.tagId', null), 'string') && nullOrType(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bid, 'params.testMode', null), 'boolean');
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var loc = getLocation(bidderRequest);
    var tagId = Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bidRequests[0], 'params.tagId', null);
    var testMode = Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bidRequests[0], 'params.testMode', 0);
    var payload = {
      a: bidderRequest.auctionId,
      B: 0,
      b: loc.host,
      tm: testMode,
      V: "4.2.0",
      i: testMode && tagId != null ? tagId : getID(loc),
      l: {},
      f: 0.01,
      cv: VERSION,
      st: 'prebid',
      h: screen.height,
      w: screen.width,
      gs: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bidderRequest, 'gdprConsent.gdprApplies', '0'),
      gc: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bidderRequest, 'gdprConsent.consentString', ''),
      u: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bidderRequest, 'refererInfo.canonicalUrl', loc.href),
      do: loc.host,
      re: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bidderRequest, 'refererInfo.referer'),
      usp: bidderRequest.uspConsent || '1---',
      smt: 1,
      d: '',
      m: createBidMap(bidRequests)
    };
    return {
      data: payload,
      method: 'POST',
      url: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(bidRequests[0], 'params.endpoint', DEFAULT_ENDPOINT),
      withCredentials: true
    };
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (serverResponses == null || serverResponses.length === 0) {
      return [];
    }

    var output = [];

    Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["_each"])(serverResponses, function (_ref) {
      var response = _ref.body;

      if (response != null && response.p != null && response.p.hreq) {
        Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["_each"])(response.p.hreq, function (syncPixel) {
          var pixelType = syncPixel.indexOf('__st=iframe') !== -1 ? 'iframe' : 'image';

          if (syncOptions.iframeEnabled || pixelType === 'image') {
            output.push({
              url: syncPixel,
              type: pixelType
            });
          }
        });
      }
    });

    return output;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    // validate the body/response
    var response = serverResponse.body;

    if (response == null || typeof response === 'string') {
      return [];
    }

    return flatMap(Object.keys(response.r), function (bidID) {
      return flatMap(response.r[bidID], function (siteBid) {
        return siteBid.b.map(function (bid) {
          var _ref2;

          var mediaType = getMediaType(bid); // let ad = null;

          var ad = mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */] ? decorateADM(bid) : decorateVideoADM(bid);

          if (ad == null) {
            return null;
          }

          var size = resolveSize(bid, request.data, bidID);
          return _ref2 = {
            requestId: bidID,
            cpm: bid.price,
            width: size[0],
            height: size[1],
            creativeId: bid.crid,
            currency: 'USD',
            netRevenue: true
          }, _defineProperty(_ref2, mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */] ? 'vastXml' : 'ad', ad), _defineProperty(_ref2, "meta", {
            advertiserDomains: bid.adomain,
            mediaType: mediaType
          }), _defineProperty(_ref2, "ttl", mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */] ? 90 : 70), _ref2;
        });
      }).filter(function (possibleBid) {
        return possibleBid != null;
      });
    });
  },
  onSetTargeting: function onSetTargeting(targetingData) {
    if (targetingData == null) {
      return;
    }

    trackEvent('pbst', {
      A: targetingData.bidder,
      w: targetingData.width,
      h: targetingData.height,
      bid: targetingData.adId,
      c1: targetingData.mediaType,
      np: targetingData.cpm,
      aud: targetingData.requestId,
      a: targetingData.adUnitCode,
      c2: nestedQs(targetingData.adserverTargeting)
    });
  },
  onTimeout: function onTimeout(timeoutData) {
    if (timeoutData == null) {
      return;
    }

    trackEvent('pbto', {
      A: timeoutData.bidder,
      bid: timeoutData.bidId,
      a: timeoutData.adUnitCode,
      cn: timeoutData.timeout,
      aud: timeoutData.auctionId
    });
  },
  onBidWon: function onBidWon(bidWinData) {
    if (bidWinData == null) {
      return;
    }

    trackEvent('pbwin', {
      A: bidWinData.bidder,
      w: bidWinData.width,
      h: bidWinData.height,
      bid: bidWinData.adId,
      C: bidWinData.mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */] ? 0 : 1,
      np: bidWinData.cpm,
      a: bidWinData.adUnitCode
    });
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[253]);