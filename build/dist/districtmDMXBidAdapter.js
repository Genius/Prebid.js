pbjsChunk([150],{

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(261);


/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["cleanSizes"] = cleanSizes;
/* harmony export (immutable) */ __webpack_exports__["shuffle"] = shuffle;
/* harmony export (immutable) */ __webpack_exports__["removeDuplicate"] = removeDuplicate;
/* harmony export (immutable) */ __webpack_exports__["upto5"] = upto5;
/* harmony export (immutable) */ __webpack_exports__["matchRequest"] = matchRequest;
/* harmony export (immutable) */ __webpack_exports__["checkDeepArray"] = checkDeepArray;
/* harmony export (immutable) */ __webpack_exports__["defaultSize"] = defaultSize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var BIDDER_CODE = 'districtmDMX';
var DMXURI = 'https://dmx.districtm.io/b/v1';
var spec = {
  code: BIDDER_CODE,
  supportedFormat: ['banner'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.dmxid && bid.params.memberid);
  },
  interpretResponse: function interpretResponse(response, bidRequest) {
    response = response.body || {};

    if (response.seatbid) {
      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](response.seatbid)) {
        var _response = response,
            seatbid = _response.seatbid;
        var winners = seatbid.reduce(function (bid, ads) {
          var ad = ads.bid.reduce(function (oBid, nBid) {
            if (oBid.price < nBid.price) {
              var _bid = matchRequest(nBid.impid, bidRequest);

              var _defaultSize = defaultSize(_bid),
                  width = _defaultSize.width,
                  height = _defaultSize.height;

              nBid.cpm = parseFloat(nBid.price).toFixed(2);
              nBid.bidId = nBid.impid;
              nBid.requestId = nBid.impid;
              nBid.width = nBid.w || width;
              nBid.height = nBid.h || height;
              nBid.ad = nBid.adm;
              nBid.netRevenue = true;
              nBid.creativeId = nBid.crid;
              nBid.currency = 'USD';
              nBid.ttl = 60;
              return nBid;
            } else {
              oBid.cpm = oBid.price;
              return oBid;
            }
          }, {
            price: 0
          });

          if (ad.adm) {
            bid.push(ad);
          }

          return bid;
        }, []);
        var winnersClean = winners.filter(function (w) {
          if (w.bidId) {
            return true;
          }

          return false;
        });
        return winnersClean;
      } else {
        return [];
      }
    } else {
      return [];
    }
  },
  buildRequests: function buildRequests(bidRequest, bidderRequest) {
    var timeout = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('bidderTimeout');
    var schain = null;
    var dmxRequest = {
      id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["generateUUID"](),
      cur: ['USD'],
      tmax: timeout - 300,
      test: this.test() || 0,
      site: {
        publisher: {
          id: String(bidRequest[0].params.memberid) || null
        }
      }
    };

    try {
      var params = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('dmx');
      dmxRequest.user = params.user || {};
      var site = params.site || {};
      dmxRequest.site = _objectSpread({}, dmxRequest.site, {}, site);
    } catch (e) {}

    if (!dmxRequest.test) {
      delete dmxRequest.test;
    }

    if (bidderRequest.gdprConsent) {
      dmxRequest.regs = {};
      dmxRequest.regs.ext = {};
      dmxRequest.regs.ext.gdpr = bidderRequest.gdprConsent.gdprApplies === true ? 1 : 0;
      dmxRequest.user = {};
      dmxRequest.user.ext = {};
      dmxRequest.user.ext.consent = bidderRequest.gdprConsent.consentString;
    }

    try {
      schain = bidRequest[0].schain;
      dmxRequest.source = {};
      dmxRequest.source.ext = {};
      dmxRequest.source.ext.schain = schain || {};
    } catch (e) {}

    var tosendtags = bidRequest.map(function (dmx) {
      var obj = {};
      obj.id = dmx.bidId;
      obj.tagid = String(dmx.params.dmxid);
      obj.secure = 1;
      obj.banner = {
        topframe: 1,
        w: cleanSizes(dmx.sizes, 'w'),
        h: cleanSizes(dmx.sizes, 'h'),
        format: cleanSizes(dmx.sizes).map(function (s) {
          return {
            w: s[0],
            h: s[1]
          };
        }).filter(function (obj) {
          return typeof obj.w === 'number' && typeof obj.h === 'number';
        })
      };
      return obj;
    });

    if (tosendtags.length <= 5) {
      dmxRequest.imp = tosendtags;
      return {
        method: 'POST',
        url: DMXURI,
        data: JSON.stringify(dmxRequest),
        bidderRequest: bidderRequest
      };
    } else {
      return upto5(tosendtags, dmxRequest, bidderRequest, DMXURI);
    }
  },
  test: function test() {
    return window.location.href.indexOf('dmTest=true') !== -1 ? 1 : 0;
  },
  getUserSyncs: function getUserSyncs(optionsType) {
    if (optionsType.iframeEnabled) {
      return [{
        type: 'iframe',
        url: 'https://cdn.districtm.io/ids/index.html'
      }];
    }
  }
};
function cleanSizes(sizes, value) {
  var supportedSize = [{
    size: [300, 250],
    s: 100
  }, {
    size: [728, 90],
    s: 95
  }, {
    size: [320, 50],
    s: 90
  }, {
    size: [160, 600],
    s: 88
  }, {
    size: [300, 600],
    s: 85
  }, {
    size: [300, 50],
    s: 80
  }, {
    size: [970, 250],
    s: 75
  }, {
    size: [970, 90],
    s: 60
  }];
  var newArray = shuffle(sizes, supportedSize);

  switch (value) {
    case 'w':
      return newArray[0][0] || 0;

    case 'h':
      return newArray[0][1] || 0;

    case 'size':
      return newArray;

    default:
      return newArray;
  }
}
function shuffle(sizes, list) {
  var removeSizes = sizes.filter(function (size) {
    return list.map(function (l) {
      return "".concat(l.size[0], "x").concat(l.size[1]);
    }).indexOf("".concat(size[0], "x").concat(size[1])) === -1;
  });
  var reOrder = sizes.reduce(function (results, current) {
    if (results.length === 0) {
      results.push(current);
      return results;
    }

    results.push(current);
    results = list.filter(function (l) {
      return results.map(function (r) {
        return "".concat(r[0], "x").concat(r[1]);
      }).indexOf("".concat(l.size[0], "x").concat(l.size[1])) !== -1;
    });
    results = results.sort(function (a, b) {
      return b.s - a.s;
    });
    return results.map(function (r) {
      return r.size;
    });
  }, []);
  return removeDuplicate([].concat(_toConsumableArray(reOrder), _toConsumableArray(removeSizes)));
}
function removeDuplicate(arrayValue) {
  return arrayValue.filter(function (elem, index) {
    return arrayValue.map(function (e) {
      return "".concat(e[0], "x").concat(e[1]);
    }).indexOf("".concat(elem[0], "x").concat(elem[1])) === index;
  });
}
function upto5(allimps, dmxRequest, bidderRequest, DMXURI) {
  var start = 0;
  var step = 5;
  var req = [];

  while (allimps.length !== 0) {
    if (allimps.length >= 5) {
      req.push(allimps.splice(start, step));
    } else {
      req.push(allimps.splice(start, allimps.length));
    }
  }

  return req.map(function (r) {
    dmxRequest.imp = r;
    return {
      method: 'POST',
      url: DMXURI,
      data: JSON.stringify(dmxRequest),
      bidderRequest: bidderRequest
    };
  });
}
/**
 * Function matchRequest(id: string, BidRequest: object)
 * @param id
 * @type string
 * @param bidRequest
 * @type Object
 * @returns Object
 *
 */

function matchRequest(id, bidRequest) {
  var bids = bidRequest.bidderRequest.bids;

  var _bids$filter = bids.filter(function (bid) {
    return bid.bidId === id;
  }),
      _bids$filter2 = _slicedToArray(_bids$filter, 1),
      returnValue = _bids$filter2[0];

  return returnValue;
}
function checkDeepArray(Arr) {
  if (Array.isArray(Arr)) {
    if (Array.isArray(Arr[0])) {
      return Arr[0];
    } else {
      return Arr;
    }
  } else {
    return Arr;
  }
}
function defaultSize(thebidObj) {
  var sizes = thebidObj.sizes;
  var returnObject = {};
  returnObject.width = checkDeepArray(sizes)[0];
  returnObject.height = checkDeepArray(sizes)[1];
  return returnObject;
}
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[260]);