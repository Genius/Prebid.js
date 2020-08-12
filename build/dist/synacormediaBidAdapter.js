pbjsChunk([59],{

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(491);


/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes__);


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var BID_HOST = 'https://prebid.technoratimedia.com';
var USER_SYNC_HOST = 'https://ad-cdn.technoratimedia.com';
var VIDEO_PARAMS = ['minduration', 'maxduration', 'startdelay', 'placement', 'linearity', 'mimes', 'protocols', 'api'];
var BLOCKED_AD_SIZES = ['1x1', '1x2'];
var spec = {
  code: 'synacormedia',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],
  sizeMap: {},
  isVideoBid: function isVideoBid(bid) {
    return bid.mediaTypes !== undefined && bid.mediaTypes.hasOwnProperty('video');
  },
  isBidRequestValid: function isBidRequestValid(bid) {
    var hasRequiredParams = bid && bid.params && bid.params.hasOwnProperty('placementId') && bid.params.hasOwnProperty('seatId');
    var hasAdSizes = bid && Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getAdUnitSizes"])(bid).filter(function (size) {
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
    var seatId = null;
    validBidReqs.forEach(function (bid, i) {
      if (seatId && seatId !== bid.params.seatId) {
        Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"])("Synacormedia: there is an inconsistent seatId: ".concat(bid.params.seatId, " but only sending bid requests for ").concat(seatId, ", you should double check your configuration"));
        return;
      } else {
        seatId = bid.params.seatId;
      }

      var placementId = bid.params.placementId;
      var bidFloor = bid.params.bidfloor ? parseFloat(bid.params.bidfloor) : null;

      if (isNaN(bidFloor)) {
        Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"])("Synacormedia: there is an invalid bid floor: ".concat(bid.params.bidfloor));
      }

      var pos = parseInt(bid.params.pos);

      if (isNaN(pos)) {
        Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"])("Synacormedia: there is an invalid POS: ".concat(bid.params.pos));
        pos = 0;
      }

      var videoOrBannerKey = _this.isVideoBid(bid) ? 'video' : 'banner';
      Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getAdUnitSizes"])(bid).filter(function (size) {
        return BLOCKED_AD_SIZES.indexOf(size.join('x')) === -1;
      }).forEach(function (size, i) {
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

        if (videoOrBannerKey === 'video') {
          if (bid.mediaTypes.video) {
            _this.setValidVideoParams(bid.mediaTypes.video, bid.params.video);
          }

          if (bid.params.video) {
            _this.setValidVideoParams(bid.params.video, videoOrBannerValue);
          }
        }

        imp[videoOrBannerKey] = videoOrBannerValue;
        openRtbBidRequest.imp.push(imp);
      });
    });

    if (openRtbBidRequest.imp.length && seatId) {
      return {
        method: 'POST',
        url: "".concat(BID_HOST, "/openrtb/bids/").concat(seatId, "?src=Genius_prebid_3.0.0"),
        data: openRtbBidRequest,
        options: {
          contentType: 'application/json',
          withCredentials: true
        }
      };
    }
  },
  setValidVideoParams: function setValidVideoParams(sourceObj, destObj) {
    Object.keys(sourceObj).filter(function (param) {
      return __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default()(VIDEO_PARAMS, param) && sourceObj[param] !== null && (!isNaN(parseInt(sourceObj[param], 10)) || !(sourceObj[param].length < 1));
    }).forEach(function (param) {
      return destObj[param] = Array.isArray(sourceObj[param]) ? sourceObj[param] : parseInt(sourceObj[param], 10);
    });
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var updateMacros = function updateMacros(bid, r) {
      return r ? r.replace(/\${AUCTION_PRICE}/g, bid.price) : r;
    };

    if (!serverResponse.body || _typeof(serverResponse.body) != 'object') {
      Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"])('Synacormedia: server returned empty/non-json response: ' + JSON.stringify(serverResponse.body));
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

          var _bid$impid$match = bid.impid.match(/^([vb])(.*)-(.*)x(.*)$/),
              _bid$impid$match2 = _slicedToArray(_bid$impid$match, 5),
              impType = _bid$impid$match2[1],
              impid = _bid$impid$match2[2],
              width = _bid$impid$match2[3],
              height = _bid$impid$match2[4];

          var isVideo = impType == 'v';
          var bidObj = {
            requestId: impid,
            adId: bid.id.replace(/~/g, '-'),
            cpm: parseFloat(bid.price),
            width: parseInt(width, 10),
            height: parseInt(height, 10),
            creativeId: "".concat(seatbid.seat, "_").concat(bid.crid),
            currency: 'USD',
            netRevenue: true,
            mediaType: isVideo ? __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */] : __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */],
            ad: creative,
            ttl: 60
          };

          if (isVideo) {
            var _nurl$match = nurl.match(/ID=([^&]*)&?/),
                _nurl$match2 = _slicedToArray(_nurl$match, 2),
                uuid = _nurl$match2[1];

            bidObj.videoCacheKey = encodeURIComponent(uuid);
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
        url: "".concat(USER_SYNC_HOST, "/html/usersync.html?src=Genius_prebid_3.0.0")
      });
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"])('Synacormedia: Please enable iframe based user sync.');
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[490]);