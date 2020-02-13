pbjsChunk([249],{

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(179);


/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes__);






/**
 * Adapter for requesting bids from adxcg.net
 * updated to latest prebid repo on 2017.10.20
 * updated for gdpr compliance on 2018.05.22 -requires gdpr compliance module
 * updated to pass aditional auction and impression level parameters. added pass for video targeting parameters
 * updated to fix native support for image width/height and icon 2019.03.17
 * updated support for userid - pubcid,ttid 2019.05.28
 */

var BIDDER_CODE = 'adxcg';
var SUPPORTED_AD_TYPES = [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["c" /* NATIVE */]];
var SOURCE = 'pbjs10';
var VIDEO_TARGETING = ['id', 'mimes', 'minduration', 'maxduration', 'startdelay', 'skippable', 'playback_method', 'frameworks'];
var USER_PARAMS_AUCTION = ['forcedDspIds', 'forcedCampaignIds', 'forcedCreativeIds', 'gender', 'dnt', 'language'];
var USER_PARAMS_BID = ['lineparam1', 'lineparam2', 'lineparam3'];
var BIDADAPTERVERSION = 'r20180703PB10';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: SUPPORTED_AD_TYPES,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid || !bid.params) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logWarn"](BIDDER_CODE + ': Missing bid parameters');
      return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](bid.params.adzoneid)) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logWarn"](BIDDER_CODE + ': adzoneid must be specified as a string');
      return false;
    }

    if (isVideoRequest(bid)) {
      if (!bid.params.video.mimes) {
        // Give a warning but let it pass
        __WEBPACK_IMPORTED_MODULE_1__src_utils__["logWarn"](BIDDER_CODE + ': mimes should be specified for videos');
      } else if (!__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](bid.params.video.mimes) || !bid.params.video.mimes.every(function (s) {
        return __WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](s);
      })) {
        __WEBPACK_IMPORTED_MODULE_1__src_utils__["logWarn"](BIDDER_CODE + ': mimes must be an array of strings');
        return false;
      }

      var context = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'mediaTypes.video.context');

      if (context !== 'instream') {
        __WEBPACK_IMPORTED_MODULE_1__src_utils__["logWarn"](BIDDER_CODE + ': video context must be valid - instream');
        return false;
      }
    }

    return true;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * an array of validBidRequests
   * Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils__["logMessage"]("buildRequests: ".concat(JSON.stringify(validBidRequests)));
    var location = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowLocation"]();
    var secure = location.protocol === 'https:';
    var dt = new Date();
    var ratio = window.devicePixelRatio || 1;
    var iobavailable = window && window.IntersectionObserver && window.IntersectionObserverEntry && window.IntersectionObserverEntry.prototype && 'intersectionRatio' in window.IntersectionObserverEntry.prototype;
    var bt = __WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig('bidderTimeout');

    if (window.PREBID_TIMEOUT) {
      bt = Math.min(window.PREBID_TIMEOUT, bt);
    }

    var requestUrl = __WEBPACK_IMPORTED_MODULE_2__src_url__["c" /* parse */](location.href);
    requestUrl.search = null;
    requestUrl.hash = null; // add common parameters

    var beaconParams = {
      renderformat: 'javascript',
      ver: BIDADAPTERVERSION,
      url: encodeURIComponent(__WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowUrl"]()),
      secure: secure ? '1' : '0',
      source: SOURCE,
      uw: window.screen.width,
      uh: window.screen.height,
      dpr: ratio,
      bt: bt,
      isinframe: __WEBPACK_IMPORTED_MODULE_1__src_utils__["inIframe"](),
      cookies: __WEBPACK_IMPORTED_MODULE_1__src_utils__["checkCookieSupport"]() ? '1' : '0',
      tz: dt.getTimezoneOffset(),
      dt: __WEBPACK_IMPORTED_MODULE_1__src_utils__["timestamp"](),
      iob: iobavailable ? '1' : '0',
      pbjs: "2.37.0",
      rndid: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    };

    if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowReferrer"]()) {
      beaconParams.ref = encodeURIComponent(__WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowReferrer"]());
    }

    if (bidderRequest && bidderRequest.gdprConsent && bidderRequest.gdprConsent.gdprApplies) {
      beaconParams.gdpr = bidderRequest.gdprConsent.gdprApplies ? '1' : '0';
      beaconParams.gdpr_consent = bidderRequest.gdprConsent.consentString;
    }

    var biddercustom = __WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig(BIDDER_CODE);

    if (biddercustom) {
      Object.keys(biddercustom).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes___default()(USER_PARAMS_AUCTION, param);
      }).forEach(function (param) {
        return beaconParams[param] = encodeURIComponent(biddercustom[param]);
      });
    } // per impression parameters


    var adZoneIds = [];
    var prebidBidIds = [];
    var sizes = [];
    var bidfloors = [];
    validBidRequests.forEach(function (bid, index) {
      adZoneIds.push(__WEBPACK_IMPORTED_MODULE_1__src_utils__["getBidIdParameter"]('adzoneid', bid.params));
      prebidBidIds.push(bid.bidId);
      sizes.push(__WEBPACK_IMPORTED_MODULE_1__src_utils__["parseSizesInput"](bid.sizes).join('|'));
      var bidfloor = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getBidIdParameter"]('bidfloor', bid.params) || 0;
      bidfloors.push(bidfloor); // copy video params

      if (isVideoRequest(bid)) {
        if (bid.params.video) {
          Object.keys(bid.params.video).filter(function (param) {
            return __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes___default()(VIDEO_TARGETING, param);
          }).forEach(function (param) {
            return beaconParams['video.' + param + '.' + index] = encodeURIComponent(bid.params.video[param]);
          });
        } // copy video context params


        beaconParams['video.context' + '.' + index] = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'mediaTypes.video.context');
      } // copy all custom parameters impression level parameters not supported above


      var customBidParams = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getBidIdParameter"]('custom', bid.params) || {};

      if (customBidParams) {
        Object.keys(customBidParams).filter(function (param) {
          return __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes___default()(USER_PARAMS_BID, param);
        }).forEach(function (param) {
          return beaconParams[param + '.' + index] = encodeURIComponent(customBidParams[param]);
        });
      }
    });
    beaconParams.adzoneid = adZoneIds.join(',');
    beaconParams.format = sizes.join(',');
    beaconParams.prebidBidIds = prebidBidIds.join(',');
    beaconParams.bidfloors = bidfloors.join(',');

    if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](validBidRequests, '0.userId.pubcid'))) {
      beaconParams.pubcid = validBidRequests[0].userId.pubcid;
    }

    if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](validBidRequests, '0.userId.tdid'))) {
      beaconParams.tdid = validBidRequests[0].userId.tdid;
    }

    var adxcgRequestUrl = __WEBPACK_IMPORTED_MODULE_2__src_url__["a" /* format */]({
      protocol: secure ? 'https' : 'http',
      hostname: secure ? 'hbps.adxcg.net' : 'hbp.adxcg.net',
      pathname: '/get/adi',
      search: beaconParams
    });
    return {
      contentType: 'text/plain',
      method: 'GET',
      url: adxcgRequestUrl,
      withCredentials: true
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {bidRequests[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequests) {
    var bids = [];
    serverResponse = serverResponse.body;

    if (serverResponse) {
      serverResponse.forEach(function (serverResponseOneItem) {
        var bid = {};
        bid.requestId = serverResponseOneItem.bidId;
        bid.cpm = serverResponseOneItem.cpm;
        bid.creativeId = parseInt(serverResponseOneItem.creativeId);
        bid.currency = serverResponseOneItem.currency ? serverResponseOneItem.currency : 'USD';
        bid.netRevenue = serverResponseOneItem.netRevenue ? serverResponseOneItem.netRevenue : true;
        bid.ttl = serverResponseOneItem.ttl ? serverResponseOneItem.ttl : 300;

        if (serverResponseOneItem.deal_id != null && serverResponseOneItem.deal_id.trim().length > 0) {
          bid.dealId = serverResponseOneItem.deal_id;
        }

        if (serverResponseOneItem.ad) {
          bid.ad = serverResponseOneItem.ad;
        } else if (serverResponseOneItem.vastUrl) {
          bid.vastUrl = serverResponseOneItem.vastUrl;
          bid.mediaType = 'video';
        } else if (serverResponseOneItem.nativeResponse) {
          bid.mediaType = 'native';
          var nativeResponse = serverResponseOneItem.nativeResponse;
          bid['native'] = {
            clickUrl: nativeResponse.link.url,
            impressionTrackers: nativeResponse.imptrackers,
            clickTrackers: nativeResponse.clktrackers,
            javascriptTrackers: nativeResponse.jstrackers
          };
          nativeResponse.assets.forEach(function (asset) {
            if (asset.title && asset.title.text) {
              bid['native'].title = asset.title.text;
            }

            if (asset.img && asset.img.url) {
              var nativeImage = {};
              nativeImage.url = asset.img.url;
              nativeImage.height = asset.img.h;
              nativeImage.width = asset.img.w;
              bid['native'].image = nativeImage;
            }

            if (asset.icon && asset.icon.url) {
              var nativeIcon = {};
              nativeIcon.url = asset.icon.url;
              nativeIcon.height = asset.icon.h;
              nativeIcon.width = asset.icon.w;
              bid['native'].icon = nativeIcon;
            }

            if (asset.data && asset.data.label === 'DESC' && asset.data.value) {
              bid['native'].body = asset.data.value;
            }

            if (asset.data && asset.data.label === 'SPONSORED' && asset.data.value) {
              bid['native'].sponsoredBy = asset.data.value;
            }
          });
        }

        bid.width = serverResponseOneItem.width;
        bid.height = serverResponseOneItem.height;
        __WEBPACK_IMPORTED_MODULE_1__src_utils__["logMessage"]("submitting bid[".concat(serverResponseOneItem.bidId, "]: ").concat(JSON.stringify(bid)));
        bids.push(bid);
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logMessage"]("empty bid response");
    }

    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: '//cdn.adxcg.net/pb-sync.html'
      }];
    }
  }
};

function isVideoRequest(bid) {
  return bid.mediaType === 'video' || !!__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'mediaTypes.video');
}

Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[178]);