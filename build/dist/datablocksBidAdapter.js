pbjsChunk([237],{

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(373);


/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var NATIVE_MAP = {
  'body': 2,
  'body2': 10,
  'price': 6,
  'displayUrl': 11,
  'cta': 12
};
var NATIVE_IMAGE = [{
  id: 1,
  required: 1,
  title: {
    len: 140
  }
}, {
  id: 2,
  required: 1,
  img: {
    type: 3
  }
}, {
  id: 3,
  required: 1,
  data: {
    type: 11
  }
}, {
  id: 4,
  required: 0,
  data: {
    type: 2
  }
}, {
  id: 5,
  required: 0,
  img: {
    type: 1
  }
}, {
  id: 6,
  required: 0,
  data: {
    type: 12
  }
}];
var VIDEO_PARAMS = ['mimes', 'minduration', 'maxduration', 'protocols', 'w', 'h', 'startdelay', 'placement', 'linearity', 'skip', 'skipmin', 'skipafter', 'sequence', 'battr', 'maxextended', 'minbitrate', 'maxbitrate', 'boxingallowed', 'playbackmethod', 'playbackend', 'delivery', 'pos', 'companionad', 'api', 'companiontype', 'ext'];
var spec = {
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],
  code: 'datablocks',
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.host && bid.params.sourceId && bid.mediaTypes && (bid.mediaTypes.banner || bid.mediaTypes.native || bid.mediaTypes.video));
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    if (!validBidRequests.length) {
      return [];
    }

    var imps = {};
    var site = {};
    var device = {};
    var refurl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseUrl"](bidderRequest.referrer);
    var requests = [];
    validBidRequests.forEach(function (bidRequest) {
      var imp = {
        id: bidRequest.bidId,
        tagid: bidRequest.adUnitCode,
        secure: window.location.protocol == 'https:'
      };

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "mediaTypes.banner")) {
        var sizes = bidRequest.mediaTypes.banner.sizes;

        if (sizes.length == 1) {
          imp.banner = {
            w: sizes[0][0],
            h: sizes[0][1]
          };
        } else if (sizes.length > 1) {
          imp.banner = {
            format: sizes.map(function (size) {
              return {
                w: size[0],
                h: size[1]
              };
            })
          };
        } else {
          return;
        }
      } else if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.native')) {
        var nativeImp = bidRequest.mediaTypes.native;

        if (nativeImp.type) {
          var nativeAssets = [];

          switch (nativeImp.type) {
            case 'image':
              nativeAssets = NATIVE_IMAGE;
              break;

            default:
              return;
          }

          imp.native = JSON.stringify({
            assets: nativeAssets
          });
        } else {
          var _nativeAssets = [];
          var nativeKeys = Object.keys(nativeImp);
          nativeKeys.forEach(function (nativeKey, index) {
            var required = !!nativeImp[nativeKey].required;
            var assetId = index + 1;

            switch (nativeKey) {
              case 'title':
                _nativeAssets.push({
                  id: assetId,
                  required: required,
                  title: {
                    len: nativeImp[nativeKey].len || 140
                  }
                });

                break;

              case 'body': // desc

              case 'body2': // desc2

              case 'price':
              case 'display_url':
                var data = {
                  id: assetId,
                  required: required,
                  data: {
                    type: NATIVE_MAP[nativeKey]
                  }
                };

                if (nativeImp[nativeKey].data && nativeImp[nativeKey].data.len) {
                  data.data.len = nativeImp[nativeKey].data.len;
                }

                _nativeAssets.push(data);

                break;

              case 'image':
                if (nativeImp[nativeKey].sizes && nativeImp[nativeKey].sizes.length) {
                  _nativeAssets.push({
                    id: assetId,
                    required: required,
                    image: {
                      type: 3,
                      w: nativeImp[nativeKey].sizes[0],
                      h: nativeImp[nativeKey].sizes[1]
                    }
                  });
                }

            }
          });
          imp.native = {
            request: JSON.stringify({
              native: {
                assets: _nativeAssets
              }
            })
          };
        }
      } else if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video')) {
        var video = bidRequest.mediaTypes.video;

        var _sizes = video.playerSize || bidRequest.sizes || [];

        if (_sizes.length && Array.isArray(_sizes[0])) {
          imp.video = {
            w: _sizes[0][0],
            h: _sizes[0][1]
          };
        } else if (_sizes.length == 2 && !Array.isArray(_sizes[0])) {
          imp.video = {
            w: _sizes[0],
            h: _sizes[1]
          };
        } else {
          return;
        }

        if (video.durationRangeSec) {
          if (Array.isArray(video.durationRangeSec)) {
            if (video.durationRangeSec.length == 1) {
              imp.video.maxduration = video.durationRangeSec[0];
            } else if (video.durationRangeSec.length == 2) {
              imp.video.minduration = video.durationRangeSec[0];
              imp.video.maxduration = video.durationRangeSec[1];
            }
          } else {
            imp.video.maxduration = video.durationRangeSec;
          }
        }

        if (bidRequest.params.video) {
          Object.keys(bidRequest.params.video).forEach(function (k) {
            if (VIDEO_PARAMS.indexOf(k) > -1) {
              imp.video[k] = bidRequest.params.video[k];
            }
          });
        }
      }

      var host = bidRequest.params.host;
      var sourceId = bidRequest.params.sourceId;
      imps[host] = imps[host] || {};
      var hostImp = imps[host][sourceId] = imps[host][sourceId] || {
        imps: []
      };
      hostImp.imps.push(imp);
      hostImp.subid = hostImp.imps.subid || bidRequest.params.subid || 'blank';
      hostImp.path = 'search';
      hostImp.idParam = 'sid';
      hostImp.protocol = '//';
    }); // Generate Site obj

    site.domain = refurl.hostname;
    site.page = refurl.protocol + '://' + refurl.hostname + refurl.pathname;

    if (self === top && document.referrer) {
      site.ref = document.referrer;
    }

    var keywords = document.getElementsByTagName('meta')['keywords'];

    if (keywords && keywords.content) {
      site.keywords = keywords.content;
    } // Generate Device obj.


    device.ip = 'peer';
    device.ua = window.navigator.userAgent;
    device.js = 1;
    device.language = (navigator.language || navigator.userLanguage || '').split('-')[0] || 'en';
    RtbRequest(device, site, imps).forEach(function (formatted) {
      requests.push({
        method: 'POST',
        url: formatted.url,
        data: formatted.body,
        options: {
          withCredentials: false
        }
      });
    });
    return requests;

    function RtbRequest(device, site, imps) {
      var collection = [];
      Object.keys(imps).forEach(function (host) {
        var sourceIds = imps[host];
        Object.keys(sourceIds).forEach(function (sourceId) {
          var impObj = sourceIds[sourceId];
          collection.push({
            url: "https://".concat(host, "/").concat(impObj.path, "/?").concat(impObj.idParam, "=").concat(sourceId),
            body: {
              id: bidderRequest.auctionId,
              imp: impObj.imps,
              site: _extends({
                id: impObj.subid || 'blank'
              }, site),
              device: _extends({}, device)
            }
          });
        });
      });
      return collection;
    }
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    if (!serverResponse || !serverResponse.body || !serverResponse.body.seatbid) {
      return [];
    }

    var body = serverResponse.body;
    var bids = body.seatbid.map(function (seatbid) {
      return seatbid.bid;
    }).reduce(function (memo, bid) {
      return memo.concat(bid);
    }, []);
    var req = bidRequest.data;
    var reqImps = req.imp;
    return bids.map(function (rtbBid) {
      var imp;

      for (var i in reqImps) {
        var testImp = reqImps[i];

        if (testImp.id == rtbBid.impid) {
          imp = testImp;
          break;
        }
      }

      var br = {
        requestId: rtbBid.impid,
        cpm: rtbBid.price,
        creativeId: rtbBid.crid,
        currency: rtbBid.currency || 'USD',
        netRevenue: true,
        ttl: 360
      };

      if (!imp) {
        return br;
      } else if (imp.banner) {
        br.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */];
        br.width = rtbBid.w;
        br.height = rtbBid.h;
        br.ad = rtbBid.adm;
      } else if (imp.native) {
        br.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */];
        var reverseNativeMap = {};
        var nativeKeys = Object.keys(NATIVE_MAP);
        nativeKeys.forEach(function (k) {
          reverseNativeMap[NATIVE_MAP[k]] = k;
        });
        var idMap = {};
        var nativeReq = JSON.parse(imp.native.request);

        if (nativeReq.native && nativeReq.native.assets) {
          nativeReq.native.assets.forEach(function (asset) {
            if (asset.data) {
              idMap[asset.id] = reverseNativeMap[asset.data.type];
            }
          });
        }

        var nativeResponse = JSON.parse(rtbBid.adm);
        var _nativeResponse$nativ = nativeResponse.native,
            assets = _nativeResponse$nativ.assets,
            link = _nativeResponse$nativ.link,
            imptrackers = _nativeResponse$nativ.imptrackers,
            jstrackers = _nativeResponse$nativ.jstrackers;
        var result = {
          clickUrl: link.url,
          clickTrackers: link.clicktrackers || undefined,
          impressionTrackers: imptrackers || undefined,
          javascriptTrackers: jstrackers ? [jstrackers] : undefined
        };
        assets.forEach(function (asset) {
          if (asset.title) {
            result.title = asset.title.text;
          } else if (asset.img) {
            result.image = asset.img.url;
          } else if (idMap[asset.id]) {
            result[idMap[asset.id]] = asset.data.value;
          }
        });
        br.native = result;
      } else if (imp.video) {
        br.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */];
        br.width = rtbBid.w;
        br.height = rtbBid.h;

        if (rtbBid.adm) {
          br.vastXml = rtbBid.adm;
        } else if (rtbBid.nurl) {
          br.vastUrl = rtbBid.nurl;
        }
      }

      return br;
    });
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[372]);