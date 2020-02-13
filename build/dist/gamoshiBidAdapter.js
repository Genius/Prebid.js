pbjsChunk([186],{

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(327);


/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helper", function() { return helper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__ = __webpack_require__(2);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var ENDPOINTS = {
  'gamoshi': 'https://rtb.gamoshi.io'
};
var DEFAULT_TTL = 360;
var helper = {
  getTopFrame: function getTopFrame() {
    try {
      return window.top === window ? 1 : 0;
    } catch (e) {}

    return 0;
  },
  startsWith: function startsWith(str, search) {
    return str.substr(0, search.length) === search;
  },
  getTopWindowDomain: function getTopWindowDomain(url) {
    var domainStart = url.indexOf('://') + '://'.length;
    return url.substring(domainStart, url.indexOf('/', domainStart) < 0 ? url.length : url.indexOf('/', domainStart));
  },
  getMediaType: function getMediaType(bid) {
    if (bid.ext) {
      if (bid.ext.media_type) {
        return bid.ext.media_type.toLowerCase();
      } else if (bid.ext.vast_url) {
        return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */];
      } else {
        return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */];
      }
    }

    return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */];
  }
};
var spec = {
  code: 'gamoshi',
  aliases: ['gambid', 'cleanmedia', '9MediaOnline'],
  supportedMediaTypes: ['banner', 'video'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.supplyPartnerId && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](bid.params.supplyPartnerId) && (!bid.params['rtbEndpoint'] || __WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](bid.params['rtbEndpoint'])) && (!bid.params.bidfloor || __WEBPACK_IMPORTED_MODULE_0__src_utils__["isNumber"](bid.params.bidfloor)) && (!bid.params['adpos'] || __WEBPACK_IMPORTED_MODULE_0__src_utils__["isNumber"](bid.params['adpos'])) && (!bid.params['protocols'] || Array.isArray(bid.params['protocols'])) && (!bid.params.instl || bid.params.instl === 0 || bid.params.instl === 1);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var _this = this;

    return validBidRequests.map(function (bidRequest) {
      var adUnitCode = bidRequest.adUnitCode,
          auctionId = bidRequest.auctionId,
          mediaTypes = bidRequest.mediaTypes,
          params = bidRequest.params,
          sizes = bidRequest.sizes,
          transactionId = bidRequest.transactionId;
      var baseEndpoint = params['rtbEndpoint'] || ENDPOINTS['gamoshi'];
      var rtbEndpoint = "".concat(baseEndpoint, "/r/").concat(params.supplyPartnerId, "/bidr?rformat=open_rtb&reqformat=rtb_json&bidder=prebid") + (params.query ? '&' + params.query : '');
      var url = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('pageUrl') || bidderRequest.refererInfo.referer;
      var rtbBidRequest = {
        'id': auctionId,
        'site': {
          'domain': helper.getTopWindowDomain(url),
          'page': url,
          'ref': bidderRequest.refererInfo.referer
        },
        'device': {
          'ua': navigator.userAgent
        },
        'imp': [],
        'ext': {}
      };
      var gdprConsent = bidderRequest.gdprConsent;

      if (gdprConsent && gdprConsent.consentString && gdprConsent.gdprApplies) {
        rtbBidRequest.ext.gdpr_consent = {
          consent_string: gdprConsent.consentString,
          consent_required: gdprConsent.gdprApplies
        };
        rtbBidRequest.regs = {
          ext: {
            gdpr: gdprConsent.gdprApplies === true ? 1 : 0
          }
        };
        rtbBidRequest.user = {
          ext: {
            consent: gdprConsent.consentString
          }
        };
      }

      var imp = {
        'id': transactionId,
        'instl': params.instl === 1 ? 1 : 0,
        'tagid': adUnitCode,
        'bidfloor': params.bidfloor || 0,
        'bidfloorcur': 'USD',
        'secure': helper.startsWith(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]().toLowerCase(), 'http://') ? 0 : 1
      };

      var hasFavoredMediaType = params.favoredMediaType && _this.supportedMediaTypes.includes(params.favoredMediaType);

      if (!mediaTypes || mediaTypes.banner) {
        if (!hasFavoredMediaType || params.favoredMediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */]) {
          var bannerImp = _extends({}, imp, {
            banner: {
              w: sizes.length ? sizes[0][0] : 300,
              h: sizes.length ? sizes[0][1] : 250,
              pos: params.pos || 0,
              topframe: helper.getTopFrame()
            }
          });

          rtbBidRequest.imp.push(bannerImp);
        }
      }

      if (mediaTypes && mediaTypes.video) {
        if (!hasFavoredMediaType || params.favoredMediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */]) {
          var playerSize = mediaTypes.video.playerSize || sizes;

          var videoImp = _extends({}, imp, {
            video: {
              w: playerSize ? playerSize[0][0] : 300,
              h: playerSize ? playerSize[0][1] : 250,
              protocols: params.protocols || [1, 2, 3, 4, 5, 6],
              pos: params.pos || 0,
              ext: {
                context: mediaTypes.video.context
              }
            }
          });

          rtbBidRequest.imp.push(videoImp);
        }
      }

      var eids = [];

      if (bidRequest && bidRequest.userId) {
        addExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, "userId.id5id"), 'id5-sync.com', 'ID5ID');
        addExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, "userId.tdid"), 'adserver.org', 'TDID');
      }

      if (eids.length > 0) {
        rtbBidRequest.user.ext.eids = eids;
      }

      if (rtbBidRequest.imp.length === 0) {
        return;
      }

      return {
        method: 'POST',
        url: rtbEndpoint,
        data: rtbBidRequest,
        bidRequest: bidRequest
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var response = serverResponse && serverResponse.body;

    if (!response) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('empty response');
      return [];
    }

    var bids = response.seatbid.reduce(function (acc, seatBid) {
      return acc.concat(seatBid.bid);
    }, []);
    var outBids = [];
    bids.forEach(function (bid) {
      var outBid = {
        requestId: bidRequest.bidRequest.bidId,
        cpm: bid.price,
        width: bid.w,
        height: bid.h,
        ttl: DEFAULT_TTL,
        creativeId: bid.crid || bid.adid,
        netRevenue: true,
        currency: bid.cur || response.cur,
        mediaType: helper.getMediaType(bid)
      };

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest.bidRequest, 'mediaTypes.' + outBid.mediaType)) {
        if (outBid.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */]) {
          outBids.push(_extends({}, outBid, {
            ad: bid.adm
          }));
        } else if (outBid.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */]) {
          var context = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest.bidRequest, 'mediaTypes.video.context');
          outBids.push(_extends({}, outBid, {
            vastUrl: bid.ext.vast_url,
            vastXml: bid.adm,
            renderer: context === 'outstream' ? newRenderer(bidRequest.bidRequest, bid) : undefined
          }));
        }
      }
    });
    return outBids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    var syncs = [];
    var gdprApplies = gdprConsent && typeof gdprConsent.gdprApplies === 'boolean' ? gdprConsent.gdprApplies : false;
    var suffix = gdprApplies ? 'gc=' + encodeURIComponent(gdprConsent.consentString) : 'gc=missing';
    serverResponses.forEach(function (resp) {
      if (resp.body) {
        var bidResponse = resp.body;

        if (bidResponse.ext && Array.isArray(bidResponse.ext['utrk'])) {
          bidResponse.ext['utrk'].forEach(function (pixel) {
            var url = pixel.url + (pixel.url.indexOf('?') > 0 ? '&' + suffix : '?' + suffix);
            return syncs.push({
              type: pixel.type,
              url: url
            });
          });
        }

        if (Array.isArray(bidResponse.seatbid)) {
          bidResponse.seatbid.forEach(function (seatBid) {
            if (Array.isArray(seatBid.bid)) {
              seatBid.bid.forEach(function (bid) {
                if (bid.ext && Array.isArray(bid.ext['utrk'])) {
                  bid.ext['utrk'].forEach(function (pixel) {
                    var url = pixel.url + (pixel.url.indexOf('?') > 0 ? '&' + suffix : '?' + suffix);
                    return syncs.push({
                      type: pixel.type,
                      url: url
                    });
                  });
                }
              });
            }
          });
        }
      }
    });
    return syncs;
  }
};

function newRenderer(bidRequest, bid) {
  var rendererOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer__["a" /* Renderer */].install({
    url: bidRequest.params && bidRequest.params.rendererUrl || bid.ext && bid.ext.renderer_url || '//s.wlplayer.com/video/latest/renderer.js',
    config: rendererOptions,
    loaded: false
  });

  try {
    renderer.setRender(renderOutstream);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  return renderer;
}

function renderOutstream(bid) {
  bid.renderer.push(function () {
    var unitId = bid.adUnitCode + '/' + bid.adId;
    window['GamoshiPlayer'].renderAd({
      id: unitId,
      debug: window.location.href.indexOf('pbjsDebug') >= 0,
      placement: document.getElementById(bid.adUnitCode),
      width: bid.width,
      height: bid.height,
      events: {
        ALL_ADS_COMPLETED: function ALL_ADS_COMPLETED() {
          return window.setTimeout(function () {
            window['GamoshiPlayer'].removeAd(unitId);
          }, 300);
        }
      },
      vastUrl: bid.vastUrl,
      vastXml: bid.vastXml
    });
  });
}

function addExternalUserId(eids, value, source, rtiPartner) {
  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](value)) {
    eids.push({
      source: source,
      uids: [{
        id: value,
        ext: {
          rtiPartner: rtiPartner
        }
      }]
    });
  }
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[326]);