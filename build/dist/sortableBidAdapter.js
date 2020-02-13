pbjsChunk([82],{

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(583);


/***/ }),

/***/ 583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var BIDDER_CODE = 'sortable';
var SERVER_URL = 'c.deployads.com';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    var sortableConfig = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('sortable');
    var haveSiteId = sortableConfig && !!sortableConfig.siteId || bid.params.siteId;
    var validFloor = !bid.params.floor || __WEBPACK_IMPORTED_MODULE_0__src_utils__["isNumber"](bid.params.floor);
    var validSize = /\d+x\d+/;
    var validFloorSizeMap = !bid.params.floorSizeMap || __WEBPACK_IMPORTED_MODULE_0__src_utils__["isPlainObject"](bid.params.floorSizeMap) && Object.keys(bid.params.floorSizeMap).every(function (size) {
      return size.match(validSize) && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isNumber"](bid.params.floorSizeMap[size]);
    });
    var validKeywords = !bid.params.keywords || __WEBPACK_IMPORTED_MODULE_0__src_utils__["isPlainObject"](bid.params.keywords) && Object.keys(bid.params.keywords).every(function (key) {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](key) && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](bid.params.keywords[key]);
    });
    return !!(bid.params.tagId && haveSiteId && validFloor && validFloorSizeMap && validKeywords && bid.sizes && bid.sizes.every(function (sizeArr) {
      return sizeArr.length == 2 && sizeArr.every(function (num) {
        return __WEBPACK_IMPORTED_MODULE_0__src_utils__["isNumber"](num);
      });
    }));
  },
  buildRequests: function buildRequests(validBidReqs, bidderRequest) {
    var sortableConfig = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('sortable') || {};
    var globalSiteId = sortableConfig.siteId;
    var loc = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]();

    var sortableImps = __WEBPACK_IMPORTED_MODULE_0__src_utils__["_map"](validBidReqs, function (bid) {
      var rv = {
        id: bid.bidId,
        tagid: bid.params.tagId,
        banner: {
          format: __WEBPACK_IMPORTED_MODULE_0__src_utils__["_map"](bid.sizes, function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                width = _ref2[0],
                height = _ref2[1];

            return {
              w: width,
              h: height
            };
          })
        },
        ext: {}
      };

      if (bid.params.floor) {
        rv.bidfloor = bid.params.floor;
      }

      if (bid.params.keywords) {
        rv.ext.keywords = bid.params.keywords;
      }

      if (bid.params.bidderParams) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](bid.params.bidderParams, function (params, partner) {
          rv.ext[partner] = params;
        });
      }

      if (bid.params.floorSizeMap) {
        rv.ext.floorSizeMap = bid.params.floorSizeMap;
      }

      return rv;
    });

    var gdprConsent = bidderRequest && bidderRequest.gdprConsent;
    var sortableBidReq = {
      id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"](),
      imp: sortableImps,
      site: {
        domain: loc.hostname,
        page: loc.href,
        ref: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"](),
        publisher: {
          id: globalSiteId || validBidReqs[0].params.siteId
        },
        device: {
          w: screen.width,
          h: screen.height
        }
      }
    };

    if (gdprConsent) {
      sortableBidReq.user = {
        ext: {
          consent: gdprConsent.consentString
        }
      };
      sortableBidReq.regs = {
        ext: {
          gdpr: gdprConsent.gdprApplies ? 1 : 0
        }
      };
    }

    return {
      method: 'POST',
      url: "//".concat(SERVER_URL, "/openrtb2/auction?src=Genius_prebid_2.37.0&host=").concat(loc.host),
      data: JSON.stringify(sortableBidReq),
      options: {
        contentType: 'text/plain'
      }
    };
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var _serverResponse$body = serverResponse.body,
        id = _serverResponse$body.id,
        seatbid = _serverResponse$body.seatbid;
    var sortableBids = [];

    if (id && seatbid) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](seatbid, function (seatbid) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](seatbid.bid, function (bid) {
          var bidObj = {
            requestId: bid.impid,
            cpm: parseFloat(bid.price),
            width: parseInt(bid.w),
            height: parseInt(bid.h),
            creativeId: bid.crid || bid.id,
            dealId: bid.dealid || null,
            currency: 'USD',
            netRevenue: true,
            mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */],
            ttl: 60
          };

          if (bid.adm && bid.nurl) {
            bidObj.ad = bid.adm;
            bidObj.ad += __WEBPACK_IMPORTED_MODULE_0__src_utils__["createTrackPixelHtml"](decodeURIComponent(bid.nurl));
          } else if (bid.adm) {
            bidObj.ad = bid.adm;
          } else if (bid.nurl) {
            bidObj.adUrl = bid.nurl;
          }

          sortableBids.push(bidObj);
        });
      });
    }

    return sortableBids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, responses, gdprConsent) {
    var sortableConfig = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('sortable');

    if (syncOptions.iframeEnabled && sortableConfig && !!sortableConfig.siteId) {
      var syncUrl = "//".concat(SERVER_URL, "/sync?f=html&s=").concat(sortableConfig.siteId, "&u=").concat(encodeURIComponent(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]()));

      if (gdprConsent) {
        syncUrl += '&g=' + (gdprConsent.gdprApplies ? 1 : 0);
        syncUrl += '&cs=' + encodeURIComponent(gdprConsent.consentString || '');
      }

      return [{
        type: 'iframe',
        url: syncUrl
      }];
    }
  },
  onTimeout: function onTimeout(details) {
    fetch("//".concat(SERVER_URL, "/prebid/timeout"), {
      method: 'POST',
      body: JSON.stringify(details),
      mode: 'no-cors',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[582]);