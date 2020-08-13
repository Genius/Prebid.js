pbjsChunk([91],{

/***/ 730:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(731);


/***/ }),

/***/ 731:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_config_js__ = __webpack_require__(3);


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }






var BID_HOST = 'https://prebid.technoratimedia.com';
var USER_SYNC_HOST = 'https://ad-cdn.technoratimedia.com';
var VIDEO_PARAMS = ['minduration', 'maxduration', 'startdelay', 'placement', 'linearity', 'mimes', 'protocols', 'api'];
var BLOCKED_AD_SIZES = ['1x1', '1x2'];
var spec = {
  code: 'synacormedia',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],
  sizeMap: {},
  isVideoBid: function isVideoBid(bid) {
    return bid.mediaTypes !== undefined && bid.mediaTypes.hasOwnProperty('video');
  },
  isBidRequestValid: function isBidRequestValid(bid) {
    var hasRequiredParams = bid && bid.params && bid.params.hasOwnProperty('placementId') && bid.params.hasOwnProperty('seatId');
    var hasAdSizes = bid && Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getAdUnitSizes"])(bid).filter(function (size) {
      return BLOCKED_AD_SIZES.indexOf(size.join('x')) === -1;
    }).length > 0;
    return !!(hasRequiredParams && hasAdSizes);
  },
  buildRequests: function buildRequests(validBidReqs, bidderRequest) {
    var _this = this;

    if (!validBidReqs || !validBidReqs.length || !bidderRequest) {
      return;
    }

    var refererInfo = bidderRequest.refererInfo;
    var openRtbBidRequest = {
      id: bidderRequest.auctionId,
      site: {
        domain: location.hostname,
        page: refererInfo.referer,
        ref: document.referrer
      },
      device: {
        ua: navigator.userAgent
      },
      imp: []
    };
    var schain = validBidReqs[0].schain;

    if (schain) {
      openRtbBidRequest.source = {
        ext: {
          schain: schain
        }
      };
    }

    var seatId = null;
    validBidReqs.forEach(function (bid, i) {
      if (seatId && seatId !== bid.params.seatId) {
        Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"])("Synacormedia: there is an inconsistent seatId: ".concat(bid.params.seatId, " but only sending bid requests for ").concat(seatId, ", you should double check your configuration"));
        return;
      } else {
        seatId = bid.params.seatId;
      }

      var placementId = bid.params.placementId;
      var bidFloor = bid.params.bidfloor ? parseFloat(bid.params.bidfloor) : null;

      if (isNaN(bidFloor)) {
        Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"])("Synacormedia: there is an invalid bid floor: ".concat(bid.params.bidfloor));
      }

      var pos = parseInt(bid.params.pos, 10);

      if (isNaN(pos)) {
        Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"])("Synacormedia: there is an invalid POS: ".concat(bid.params.pos));
        pos = 0;
      }

      var videoOrBannerKey = _this.isVideoBid(bid) ? 'video' : 'banner';
      var adSizes = Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getAdUnitSizes"])(bid).filter(function (size) {
        return BLOCKED_AD_SIZES.indexOf(size.join('x')) === -1;
      });
      var imps = [];

      if (videoOrBannerKey === 'banner') {
        imps = _this.buildBannerImpressions(adSizes, bid, placementId, pos, bidFloor, videoOrBannerKey);
      } else if (videoOrBannerKey === 'video') {
        imps = _this.buildVideoImpressions(adSizes, bid, placementId, pos, bidFloor, videoOrBannerKey);
      }

      if (imps.length > 0) {
        imps.forEach(function (i) {
          return openRtbBidRequest.imp.push(i);
        });
      }
    }); // CCPA

    if (bidderRequest && bidderRequest.uspConsent) {
      Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"])(openRtbBidRequest, 'regs.ext.us_privacy', bidderRequest.uspConsent);
    }

    if (openRtbBidRequest.imp.length && seatId) {
      return {
        method: 'POST',
        url: "".concat(BID_HOST, "/openrtb/bids/").concat(seatId, "?src=Genius_prebid_4.2.0"),
        data: openRtbBidRequest,
        options: {
          contentType: 'application/json',
          withCredentials: true
        }
      };
    }
  },
  buildBannerImpressions: function buildBannerImpressions(adSizes, bid, placementId, pos, bidFloor, videoOrBannerKey) {
    var format = [];
    var imps = [];
    adSizes.forEach(function (size, i) {
      if (!size || size.length !== 2) {
        return;
      }

      format.push({
        w: size[0],
        h: size[1]
      });
    });

    if (format.length > 0) {
      var imp = {
        id: "".concat(videoOrBannerKey.substring(0, 1)).concat(bid.bidId),
        banner: {
          format: format,
          pos: pos
        },
        tagid: placementId
      };

      if (bidFloor !== null && !isNaN(bidFloor)) {
        imp.bidfloor = bidFloor;
      }

      imps.push(imp);
    }

    return imps;
  },
  buildVideoImpressions: function buildVideoImpressions(adSizes, bid, placementId, pos, bidFloor, videoOrBannerKey) {
    var _this2 = this;

    var imps = [];
    adSizes.forEach(function (size, i) {
      if (!size || size.length != 2) {
        return;
      }

      var size0 = size[0];
      var size1 = size[1];
      var imp = {
        id: "".concat(videoOrBannerKey.substring(0, 1)).concat(bid.bidId, "-").concat(size0, "x").concat(size1),
        tagid: placementId
      };

      if (bidFloor !== null && !isNaN(bidFloor)) {
        imp.bidfloor = bidFloor;
      }

      var videoOrBannerValue = {
        w: size0,
        h: size1,
        pos: pos
      };

      if (bid.mediaTypes.video) {
        _this2.setValidVideoParams(bid.mediaTypes.video, bid.params.video);
      }

      if (bid.params.video) {
        _this2.setValidVideoParams(bid.params.video, videoOrBannerValue);
      }

      imp[videoOrBannerKey] = videoOrBannerValue;
      imps.push(imp);
    });
    return imps;
  },
  setValidVideoParams: function setValidVideoParams(sourceObj, destObj) {
    Object.keys(sourceObj).filter(function (param) {
      return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(VIDEO_PARAMS, param) && sourceObj[param] !== null && (!isNaN(parseInt(sourceObj[param], 10)) || !(sourceObj[param].length < 1));
    }).forEach(function (param) {
      return destObj[param] = Array.isArray(sourceObj[param]) ? sourceObj[param] : parseInt(sourceObj[param], 10);
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var updateMacros = function updateMacros(bid, r) {
      return r ? r.replace(/\${AUCTION_PRICE}/g, bid.price) : r;
    };

    if (!serverResponse.body || _typeof(serverResponse.body) != 'object') {
      Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"])('Synacormedia: server returned empty/non-json response: ' + JSON.stringify(serverResponse.body));
      return;
    }

    var _serverResponse$body = serverResponse.body,
        id = _serverResponse$body.id,
        seatbids = _serverResponse$body.seatbid;
    var bids = [];

    if (id && seatbids) {
      seatbids.forEach(function (seatbid) {
        seatbid.bid.forEach(function (bid) {
          var creative = updateMacros(bid, bid.adm);
          var nurl = updateMacros(bid, bid.nurl);

          var _bid$impid$match = bid.impid.match(/^([vb])(.*)$/),
              _bid$impid$match2 = _slicedToArray(_bid$impid$match, 3),
              impType = _bid$impid$match2[1],
              impid = _bid$impid$match2[2];

          var height = bid.h;
          var width = bid.w;
          var isVideo = impType === 'v';
          var isBanner = impType === 'b';

          if ((!height || !width) && bidRequest.data && bidRequest.data.imp && bidRequest.data.imp.length > 0) {
            bidRequest.data.imp.forEach(function (req) {
              if (bid.impid === req.id) {
                if (isVideo) {
                  height = req.video.h;
                  width = req.video.w;
                } else if (isBanner) {
                  var bannerHeight = 1;
                  var bannerWidth = 1;

                  if (req.banner.format && req.banner.format.length > 0) {
                    bannerHeight = req.banner.format[0].h;
                    bannerWidth = req.banner.format[0].w;
                  }

                  height = bannerHeight;
                  width = bannerWidth;
                } else {
                  height = 1;
                  width = 1;
                }
              }
            });
          }

          var bidObj = {
            requestId: impid,
            adId: bid.id.replace(/~/g, '-'),
            cpm: parseFloat(bid.price),
            width: parseInt(width, 10),
            height: parseInt(height, 10),
            creativeId: "".concat(seatbid.seat, "_").concat(bid.crid),
            currency: 'USD',
            netRevenue: true,
            mediaType: isVideo ? __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */] : __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */],
            ad: creative,
            ttl: 60
          };

          if (isVideo) {
            var _nurl$match = nurl.match(/ID=([^&]*)&?/),
                _nurl$match2 = _slicedToArray(_nurl$match, 2),
                uuid = _nurl$match2[1];

            if (!__WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('cache.url')) {
              bidObj.videoCacheKey = encodeURIComponent(uuid);
            }

            bidObj.vastUrl = nurl;
          }

          bids.push(bidObj);
        });
      });
    }

    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: "".concat(USER_SYNC_HOST, "/html/usersync.html?src=Genius_prebid_4.2.0")
      });
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"])('Synacormedia: Please enable iframe based user sync.');
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[730]);