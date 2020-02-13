pbjsChunk([203],{

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(289);


/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
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

              nBid.cpm = nBid.price;
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

    var tosendtags = bidRequest.map(function (dmx) {
      var obj = {};
      obj.id = dmx.bidId;
      obj.tagid = String(dmx.params.dmxid);
      obj.secure = window.location.protocol === 'https:' ? 1 : 0;
      obj.banner = {
        topframe: 1,
        w: dmx.sizes[0][0] || 0,
        h: dmx.sizes[0][1] || 0,
        format: dmx.sizes.map(function (s) {
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
    dmxRequest.imp = tosendtags;
    return {
      method: 'POST',
      url: DMXURI,
      data: JSON.stringify(dmxRequest),
      options: {
        contentType: 'application/json',
        withCredentials: true
      },
      bidderRequest: bidderRequest
    };
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

},[288]);