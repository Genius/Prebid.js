pbjsChunk([198],{

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(299);


/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emxAdapter", function() { return emxAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var BIDDER_CODE = 'emx_digital';
var ENDPOINT = 'hb.emxdgt.com';
var RENDERER_URL = '//js.brealtime.com/outstream/1.30.0/bundle.js';
var ADAPTER_VERSION = '1.41.1';
var DEFAULT_CUR = 'USD';
var emxAdapter = {
  validateSizes: function validateSizes(sizes) {
    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](sizes) || typeof sizes[0] === 'undefined') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"](BIDDER_CODE + ': Sizes should be an array');
      return false;
    }

    return sizes.every(function (size) {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](size) && size.length === 2;
    });
  },
  checkVideoContext: function checkVideoContext(bid) {
    return bid && bid.mediaTypes && bid.mediaTypes.video && bid.mediaTypes.video.context && (bid.mediaTypes.video.context === 'instream' || bid.mediaTypes.video.context === 'outstream');
  },
  buildBanner: function buildBanner(bid) {
    var sizes = [];
    bid.mediaTypes && bid.mediaTypes.banner && bid.mediaTypes.banner.sizes ? sizes = bid.mediaTypes.banner.sizes : sizes = bid.sizes;

    if (!emxAdapter.validateSizes(sizes)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"](BIDDER_CODE + ': could not detect mediaType banner sizes. Assigning to bid sizes instead');
      sizes = bid.sizes;
    }

    return {
      format: sizes.map(function (size) {
        return {
          w: size[0],
          h: size[1]
        };
      }),
      w: sizes[0][0],
      h: sizes[0][1]
    };
  },
  formatVideoResponse: function formatVideoResponse(bidResponse, emxBid, bidRequest) {
    bidResponse.vastXml = emxBid.adm;

    if (bidRequest.bidRequest && bidRequest.bidRequest.mediaTypes && bidRequest.bidRequest.mediaTypes.video && bidRequest.bidRequest.mediaTypes.video.context === 'outstream') {
      bidResponse.renderer = emxAdapter.createRenderer(bidResponse, {
        id: emxBid.id,
        url: RENDERER_URL
      });
    }

    return bidResponse;
  },
  isMobile: function isMobile() {
    return /(ios|ipod|ipad|iphone|android)/i.test(navigator.userAgent);
  },
  isConnectedTV: function isConnectedTV() {
    return /(smart[-]?tv|hbbtv|appletv|googletv|hdmi|netcast\.tv|viera|nettv|roku|\bdtv\b|sonydtv|inettvbrowser|\btv\b)/i.test(navigator.userAgent);
  },
  getDevice: function getDevice() {
    return {
      ua: navigator.userAgent,
      js: 1,
      dnt: navigator.doNotTrack === 'yes' || navigator.doNotTrack === '1' || navigator.msDoNotTrack === '1' ? 1 : 0,
      h: screen.height,
      w: screen.width,
      devicetype: emxAdapter.isMobile() ? 1 : emxAdapter.isConnectedTV() ? 3 : 2,
      language: navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage
    };
  },
  cleanProtocols: function cleanProtocols(video) {
    if (video.protocols && __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes___default()(video.protocols, 7)) {
      // not supporting VAST protocol 7 (VAST 4.0);
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"](BIDDER_CODE + ': VAST 4.0 is currently not supported. This protocol has been filtered out of the request.');
      video.protocols = video.protocols.filter(function (protocol) {
        return protocol !== 7;
      });
    }

    return video;
  },
  outstreamRender: function outstreamRender(bid) {
    bid.renderer.push(function () {
      var params = bid && bid.params && bid.params[0] && bid.params[0].video ? bid.params[0].video : {};
      window.emxVideoQueue = window.emxVideoQueue || [];
      window.queueEmxVideo({
        id: bid.adUnitCode,
        adsResponses: bid.vastXml,
        options: params
      });

      if (window.emxVideoReady && window.videojs) {
        window.emxVideoReady();
      }
    });
  },
  createRenderer: function createRenderer(bid, rendererParams) {
    var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer__["a" /* Renderer */].install({
      id: rendererParams.id,
      url: RENDERER_URL,
      loaded: false
    });

    try {
      renderer.setRender(emxAdapter.outstreamRender);
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Prebid Error calling setRender on renderer', err);
    }

    return renderer;
  },
  buildVideo: function buildVideo(bid) {
    var videoObj = _extends(bid.mediaTypes.video, bid.params.video);

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bid.mediaTypes.video.playerSize[0])) {
      videoObj['w'] = bid.mediaTypes.video.playerSize[0][0];
      videoObj['h'] = bid.mediaTypes.video.playerSize[0][1];
    } else {
      videoObj['w'] = bid.mediaTypes.video.playerSize[0];
      videoObj['h'] = bid.mediaTypes.video.playerSize[1];
    }

    return emxAdapter.cleanProtocols(videoObj);
  },
  parseResponse: function parseResponse(bidResponseAdm) {
    try {
      return decodeURIComponent(bidResponseAdm.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25'));
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('emx_digitalBidAdapter', 'error', err);
    }
  },
  getReferrer: function getReferrer() {
    try {
      return window.top.document.referrer;
    } catch (err) {
      return document.referrer;
    }
  },
  getGdpr: function getGdpr(bidRequests, emxData) {
    if (bidRequests.gdprConsent) {
      emxData.regs = {
        ext: {
          gdpr: bidRequests.gdprConsent.gdprApplies === true ? 1 : 0
        }
      };
    }

    if (bidRequests.gdprConsent && bidRequests.gdprConsent.gdprApplies) {
      emxData.user = {
        ext: {
          consent: bidRequests.gdprConsent.consentString
        }
      };
    }

    return emxData;
  }
};
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid || !bid.params) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"](BIDDER_CODE + ': Missing bid or bid params.');
      return false;
    }

    if (bid.bidder !== BIDDER_CODE) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"](BIDDER_CODE + ': Must use "emx_digital" as bidder code.');
      return false;
    }

    if (!bid.params.tagid || !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](bid.params.tagid)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"](BIDDER_CODE + ': Missing tagid param or tagid present and not type String.');
      return false;
    }

    if (bid.mediaTypes && bid.mediaTypes.banner) {
      var sizes;
      bid.mediaTypes.banner.sizes ? sizes = bid.mediaTypes.banner.sizes : sizes = bid.sizes;

      if (!emxAdapter.validateSizes(sizes)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"](BIDDER_CODE + ': Missing sizes in bid');
        return false;
      }
    } else if (bid.mediaTypes && bid.mediaTypes.video) {
      if (!emxAdapter.checkVideoContext(bid)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"](BIDDER_CODE + ': Missing video context: instream or outstream');
        return false;
      }

      if (!bid.mediaTypes.video.playerSize) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"](BIDDER_CODE + ': Missing video playerSize');
        return false;
      }
    }

    return true;
  },
  buildRequests: function buildRequests(validBidRequests, bidRequest) {
    var emxImps = [];
    var timeout = bidRequest.timeout || '';
    var timestamp = Date.now();
    var url = location.protocol + '//' + ENDPOINT + ('?t=' + timeout + '&ts=' + timestamp + '&src=pbjs');
    var secure = location.protocol.indexOf('https') > -1 ? 1 : 0;
    var domain = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().hostname;
    var page = bidRequest.refererInfo.referer;
    var device = emxAdapter.getDevice();
    var ref = emxAdapter.getReferrer();

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (bid) {
      var tagid = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('tagid', bid.params);
      var bidfloor = parseFloat(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('bidfloor', bid.params)) || 0;
      var isVideo = !!bid.mediaTypes.video;
      var data = {
        id: bid.bidId,
        tid: bid.transactionId,
        tagid: tagid,
        secure: secure
      };
      var typeSpecifics = isVideo ? {
        video: emxAdapter.buildVideo(bid)
      } : {
        banner: emxAdapter.buildBanner(bid)
      };
      var bidfloorObj = bidfloor > 0 ? {
        bidfloor: bidfloor,
        bidfloorcur: DEFAULT_CUR
      } : {};

      var emxBid = _extends(data, typeSpecifics, bidfloorObj);

      emxImps.push(emxBid);
    });

    var emxData = {
      id: bidRequest.auctionId,
      imp: emxImps,
      device: device,
      site: {
        domain: domain,
        page: page,
        ref: ref
      },
      cur: DEFAULT_CUR,
      version: ADAPTER_VERSION
    };
    emxData = emxAdapter.getGdpr(bidRequest, _extends({}, emxData));
    return {
      method: 'POST',
      url: url,
      data: JSON.stringify(emxData),
      options: {
        withCredentials: true
      },
      bidRequest: bidRequest
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var emxBidResponses = [];
    var response = serverResponse.body || {};

    if (response.seatbid && response.seatbid.length > 0 && response.seatbid[0].bid) {
      response.seatbid.forEach(function (emxBid) {
        emxBid = emxBid.bid[0];
        var isVideo = false;
        var adm = emxAdapter.parseResponse(emxBid.adm) || '';
        var bidResponse = {
          requestId: emxBid.id,
          cpm: emxBid.price,
          width: emxBid.w,
          height: emxBid.h,
          creativeId: emxBid.crid || emxBid.id,
          dealId: emxBid.dealid || null,
          currency: 'USD',
          netRevenue: true,
          ttl: emxBid.ttl,
          ad: adm
        };

        if (emxBid.adm && emxBid.adm.indexOf('<?xml version=') > -1) {
          isVideo = true;
          bidResponse = emxAdapter.formatVideoResponse(bidResponse, _extends({}, emxBid), bidRequest);
        }

        bidResponse.mediaType = isVideo ? __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */] : __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */];
        emxBidResponses.push(bidResponse);
      });
    }

    return emxBidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    var syncs = [];

    if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: '//biddr.brealtime.com/check.html'
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[298]);