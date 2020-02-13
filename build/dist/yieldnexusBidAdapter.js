pbjsChunk([42],{

/***/ 672:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(673);


/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_Renderer__ = __webpack_require__(11);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var pixKey = 'utrk';

function startsWith(str, search) {
  return str.substr(0, search.length) === search;
}

function getMediaType(bid) {
  if (bid.ext) {
    if (bid.ext.media_type) {
      return bid.ext.media_type.toLowerCase();
    } else if (bid.ext.vast_url) {
      return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */];
    } else {
      return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */];
    }
  }

  return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */];
}

var spec = {
  code: 'yieldnexus',
  aliases: [],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid.params.spid) {
      return false;
    } else if (typeof bid.params.spid !== 'string') {
      return false;
    }

    return (typeof bid.params.instl === 'undefined' || bid.params.instl === 0 || bid.params.instl === 1) && (typeof bid.params.bidfloor === 'undefined' || typeof bid.params.bidfloor === 'number') && (typeof bid.params['protocols'] === 'undefined' || Array.isArray(bid.params['protocols'])) && (typeof bid.params['adpos'] === 'undefined' || typeof bid.params['adpos'] === 'number');
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bidRequest) {
      var referrer = '';

      try {
        referrer = window.top.document.referrer;
      } catch (e) {
        try {
          referrer = window.document.referrer;
        } catch (e) {}
      }

      var url = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
      var domainStart = url.indexOf('://') + 3;
      var req = {
        id: bidRequest.auctionId,
        site: {
          domain: url.substring(domainStart, url.indexOf('/', domainStart) < 0 ? url.length : url.indexOf('/', domainStart)),
          page: url,
          ref: referrer
        },
        device: {
          ua: navigator.userAgent
        },
        imp: [],
        ext: {}
      };

      if (bidderRequest && bidderRequest.gdprConsent) {
        req.ext.gdpr_consent = {
          consent_string: bidderRequest.gdprConsent.consentString,
          consent_required: bidderRequest.gdprConsent.gdprApplies
        };
      }

      var topFrame;

      try {
        topFrame = window.top === window ? 1 : 0;
      } catch (e) {
        topFrame = 0;
      }

      var imp = {
        id: bidRequest.transactionId,
        instl: bidRequest.params.instl === 1 ? 1 : 0,
        tagid: bidRequest.adUnitCode,
        bidfloor: bidRequest.params.bidfloor || 0,
        bidfloorcur: 'USD',
        secure: startsWith(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]().toLowerCase(), 'http://') ? 0 : 1
      };

      if (bidRequest.mediaTypes && bidRequest.mediaTypes.video) {
        imp.video = {
          protocols: bidRequest.params.protocols || [1, 2, 3, 4, 5, 6],
          pos: bidRequest.params.pos || 0,
          topframe: topFrame
        };
        var playerSize = bidRequest.mediaTypes.video.playerSize;

        if (playerSize && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](playerSize[0])) {
          imp.video.w = playerSize[0][0];
          imp.video.h = playerSize[0][1];
        } else if (playerSize && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isNumber"](playerSize[0])) {
          imp.video.w = playerSize[0];
          imp.video.h = playerSize[1];
        } else {
          playerSize = __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bidRequest.sizes) ? bidRequest.sizes[0] : [300, 250];
          imp.video.w = playerSize[0];
          imp.video.h = playerSize[1];
        }
      }

      if (!bidRequest.mediaTypes || bidRequest.mediaTypes.banner) {
        imp.banner = {
          w: bidRequest.sizes.length ? bidRequest.sizes[0][0] : 300,
          h: bidRequest.sizes.length ? bidRequest.sizes[0][1] : 250,
          pos: bidRequest.params.pos || 0,
          topframe: topFrame
        };
      }

      if (!imp.banner && !imp.video) {
        return;
      }

      req.imp.push(imp);
      return {
        method: 'POST',
        url: "https://ssp.ynxs.io/r/".concat(bidRequest.params.spid, "/bidr?bidder=prebid&rformat=open_rtb&reqformat=rtb_json") + (bidRequest.params.query ? '&' + bidRequest.params.query : ''),
        data: req,
        bidRequest: bidRequest
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var outBids = [];

    if (serverResponse && serverResponse.body) {
      var bids = serverResponse.body.seatbid.reduce(function (acc, seatBid) {
        return acc.concat(seatBid.bid);
      }, []);
      bids.forEach(function (bid) {
        var outBid = {
          requestId: bidRequest.bidRequest.bidId,
          cpm: bid.price,
          width: bid.w,
          height: bid.h,
          ttl: 15 * 60,
          creativeId: bid.crid,
          netRevenue: true,
          currency: bid.cur || serverResponse.body.cur,
          mediaType: getMediaType(bid)
        };

        if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest.bidRequest, 'mediaTypes.' + outBid.mediaType)) {
          if (outBid.mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]) {
            var context = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest.bidRequest, 'mediaTypes.video.context');
            outBids.push(_extends({}, outBid, {
              vastUrl: bid.ext.vast_url,
              vastXml: bid.adm,
              renderer: context === 'outstream' ? newRenderer(bidRequest.bidRequest, bid) : undefined
            }));
          } else if (outBid.mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]) {
            outBids.push(_extends({}, outBid, {
              ad: bid.adm
            }));
          }
        }
      });
    }

    return outBids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    var syncs = [];
    var gdprApplies = gdprConsent && typeof gdprConsent.gdprApplies === 'boolean' ? gdprConsent.gdprApplies : false;
    var suffix = gdprApplies ? 'gc=' + encodeURIComponent(gdprConsent.consentString) : 'gc=missing';
    serverResponses.forEach(function (resp) {
      if (resp.body) {
        var bidResponse = resp.body;

        if (bidResponse.ext && Array.isArray(bidResponse.ext[pixKey])) {
          bidResponse.ext[pixKey].forEach(function (pixel) {
            return syncs.push({
              type: pixel.type,
              url: pixel.url + (pixel.url.indexOf('?') > 0 ? '&' + suffix : '?' + suffix)
            });
          });
        }

        if (Array.isArray(bidResponse.seatbid)) {
          bidResponse.seatbid.forEach(function (seatBid) {
            if (Array.isArray(seatBid.bid)) {
              seatBid.bid.forEach(function (bid) {
                if (bid.ext && Array.isArray(bid.ext[pixKey])) {
                  bid.ext[pixKey].forEach(function (pixel) {
                    return syncs.push({
                      type: pixel.type,
                      url: pixel.url + (pixel.url.indexOf('?') > 0 ? '&' + suffix : '?' + suffix)
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
  var rendererUrl = '//s.wlplayer.com/video/latest/renderer.js';

  if (bid.ext && bid.ext.renderer_url) {
    rendererUrl = bid.ext.renderer_url;
  }

  if (bidRequest.params && bidRequest.params.rendererUrl) {
    rendererUrl = bidRequest.params.rendererUrl;
  }

  var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer__["a" /* Renderer */].install({
    url: rendererUrl,
    config: rendererOptions,
    loaded: false
  });
  renderer.setRender(renderOutstream);
  return renderer;
}

function renderOutstream(bid) {
  bid.renderer.push(function () {
    window['GambidPlayer'].renderAd({
      id: bid.adUnitCode + '/' + bid.adId,
      debug: window.location.href.indexOf('pbjsDebug') >= 0,
      placement: document.getElementById(bid.adUnitCode),
      width: bid.width,
      height: bid.height,
      events: {
        ALL_ADS_COMPLETED: function ALL_ADS_COMPLETED() {
          return window.setTimeout(function () {
            window['GambidPlayer'].removeAd(bid.adUnitCode + '/' + bid.adId);
          }, 300);
        }
      },
      vastUrl: bid.vastUrl,
      vastXml: bid.vastXml
    });
  });
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[672]);