pbjsChunk([216],{

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(419);


/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helper", function() { return helper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__ = __webpack_require__(2);
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
        return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */];
      } else {
        return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */];
      }
    }

    return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */];
  }
};
var spec = {
  code: 'gamoshi',
  aliases: ['gambid', 'cleanmedia', '9MediaOnline'],
  supportedMediaTypes: ['banner', 'video'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.supplyPartnerId && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](bid.params.supplyPartnerId) && (!bid.params['rtbEndpoint'] || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](bid.params['rtbEndpoint'])) && (!bid.params.bidfloor || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](bid.params.bidfloor)) && (!bid.params['adpos'] || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](bid.params['adpos'])) && (!bid.params['protocols'] || Array.isArray(bid.params['protocols'])) && (!bid.params.instl || bid.params.instl === 0 || bid.params.instl === 1);
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
      var url = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('pageUrl') || bidderRequest.refererInfo.referer;
      var rtbBidRequest = {
        id: auctionId,
        site: {
          domain: helper.getTopWindowDomain(url),
          page: url,
          ref: bidderRequest.refererInfo.referer
        },
        device: {
          ua: navigator.userAgent,
          dnt: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getDNT"]() ? 1 : 0,
          h: screen.height,
          w: screen.width,
          language: navigator.language
        },
        imp: [],
        ext: {},
        user: {
          ext: {}
        },
        source: {
          ext: {}
        },
        regs: {
          ext: {}
        }
      };
      var gdprConsent = bidderRequest.gdprConsent;

      if (gdprConsent && gdprConsent.consentString && gdprConsent.gdprApplies) {
        rtbBidRequest.ext.gdpr_consent = {
          consent_string: gdprConsent.consentString,
          consent_required: gdprConsent.gdprApplies
        };
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](rtbBidRequest, 'regs.ext.gdpr', gdprConsent.gdprApplies === true ? 1 : 0);
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](rtbBidRequest, 'user.ext.consent', gdprConsent.consentString);
      }

      if (validBidRequests[0].schain) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](rtbBidRequest, 'source.ext.schain', validBidRequests[0].schain);
      }

      if (bidderRequest && bidderRequest.uspConsent) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](rtbBidRequest, 'regs.ext.us_privacy', bidderRequest.uspConsent);
      }

      var imp = {
        id: transactionId,
        instl: params.instl === 1 ? 1 : 0,
        tagid: adUnitCode,
        bidfloor: params.bidfloor || 0,
        bidfloorcur: 'USD',
        secure: 1
      };

      var hasFavoredMediaType = params.favoredMediaType && _this.supportedMediaTypes.includes(params.favoredMediaType);

      if (!mediaTypes || mediaTypes.banner) {
        if (!hasFavoredMediaType || params.favoredMediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */]) {
          var bannerImp = _extends({}, imp, {
            banner: {
              w: sizes.length ? sizes[0][0] : 300,
              h: sizes.length ? sizes[0][1] : 250,
              pos: params.pos || 0,
              topframe: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["inIframe"]() ? 0 : 1
            }
          });

          rtbBidRequest.imp.push(bannerImp);
        }
      }

      if (mediaTypes && mediaTypes.video) {
        if (!hasFavoredMediaType || params.favoredMediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */]) {
          var playerSize = mediaTypes.video.playerSize || sizes;

          var videoImp = _extends({}, imp, {
            video: {
              protocols: params.protocols || [1, 2, 3, 4, 5, 6],
              pos: params.pos || 0,
              ext: {
                context: mediaTypes.video.context
              }
            }
          });

          if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](playerSize[0])) {
            videoImp.video.w = playerSize[0][0];
            videoImp.video.h = playerSize[0][1];
          } else if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](playerSize[0])) {
            videoImp.video.w = playerSize[0];
            videoImp.video.h = playerSize[1];
          } else {
            videoImp.video.w = 300;
            videoImp.video.h = 250;
          }

          rtbBidRequest.imp.push(videoImp);
        }
      }

      var eids = [];

      if (bidRequest && bidRequest.userId) {
        addExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "userId.id5id"), 'id5-sync.com', 'ID5ID');
        addExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "userId.tdid"), 'adserver.org', 'TDID');
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
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('empty response');
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

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest.bidRequest, 'mediaTypes.' + outBid.mediaType)) {
        if (outBid.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */]) {
          outBids.push(_extends({}, outBid, {
            ad: bid.adm
          }));
        } else if (outBid.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */]) {
          var context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest.bidRequest, 'mediaTypes.video.context');
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
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent, uspConsent) {
    var syncs = [];
    var gdprApplies = false;
    var consentString = '';
    var uspConsentString = '';

    if (gdprConsent && typeof gdprConsent.gdprApplies === 'boolean') {
      gdprApplies = gdprConsent.gdprApplies;
    }

    var gdpr = gdprApplies ? 1 : 0;

    if (gdprApplies && gdprConsent.consentString) {
      consentString = encodeURIComponent(gdprConsent.consentString);
    }

    if (uspConsent) {
      uspConsentString = encodeURIComponent(uspConsent);
    }

    var macroValues = {
      gdpr: gdpr,
      consent: consentString,
      uspConsent: uspConsentString
    };
    serverResponses.forEach(function (resp) {
      if (resp.body) {
        var bidResponse = resp.body;

        if (bidResponse.ext && Array.isArray(bidResponse.ext['utrk'])) {
          bidResponse.ext['utrk'].forEach(function (pixel) {
            var url = replaceMacros(pixel.url, macroValues);
            syncs.push({
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
                    var url = replaceMacros(pixel.url, macroValues);
                    syncs.push({
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
  var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer_js__["a" /* Renderer */].install({
    url: bidRequest.params && bidRequest.params.rendererUrl || bid.ext && bid.ext.renderer_url || 'https://s.gamoshi.io/video/latest/renderer.js',
    config: rendererOptions,
    loaded: false
  });

  try {
    renderer.setRender(renderOutstream);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Prebid Error calling setRender on renderer', err);
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
  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](value)) {
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

function replaceMacros(url, macros) {
  return url.replace('[GDPR]', macros.gdpr).replace('[CONSENT]', macros.consent).replace('[US_PRIVACY]', macros.uspConsent);
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[418]);