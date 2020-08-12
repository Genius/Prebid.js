pbjsChunk([159],{

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(239);


/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);



var BIDDER_CODE = 'cosmos';
var BID_ENDPOINT = 'https://bid.cosmoshq.com/openrtb2/bids';
var USER_SYNC_ENDPOINT = 'https://sync.cosmoshq.com/js/v1/usersync.html';
var HTTP_POST = 'POST';
var LOG_PREFIX = 'COSMOS: ';
var DEFAULT_CURRENCY = 'USD';
var HTTPS = 'https:';
var MEDIA_TYPES = 'mediaTypes';
var MIMES = 'mimes';
var DEFAULT_NET_REVENUE = false;
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */]],

  /**
   * generate UUID
   **/
  _createUUID: function _createUUID() {
    return '' + new Date().getTime();
  },

  /**
   * copy object if not null
   **/
  _copyObject: function _copyObject(src, dst) {
    if (src) {
      // copy complete object
      Object.keys(src).forEach(function (param) {
        return dst[param] = src[param];
      });
    }
  },

  /**
   * parse object
   **/
  _parse: function _parse(rawPayload) {
    try {
      if (rawPayload) {
        return JSON.parse(rawPayload);
      }
    } catch (ex) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"](LOG_PREFIX, 'Exception: ', ex);
    }

    return null;
  },

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   **/
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid || !bid.params) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"](LOG_PREFIX, 'nil/empty bid object');
      return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_2__src_utils__["isEmpty"](bid.params.publisherId) || !__WEBPACK_IMPORTED_MODULE_2__src_utils__["isNumber"](bid.params.publisherId)) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"](LOG_PREFIX, 'publisherId is mandatory and must be numeric. Ad Unit: ', JSON.stringify(bid));
      return false;
    } // video bid request validation


    if (bid.hasOwnProperty(MEDIA_TYPES) && bid.mediaTypes.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */])) {
      if (!bid.mediaTypes.video.hasOwnProperty(MIMES) || !__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](bid.mediaTypes.video.mimes) || bid.mediaTypes.video.mimes.length === 0) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"](LOG_PREFIX, 'mimes are mandatory for video bid request. Ad Unit: ', JSON.stringify(bid));
        return false;
      }
    }

    return true;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   **/
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    if (validBidRequests.length === 0) {
      return [];
    }

    var refererInfo;

    if (bidderRequest && bidderRequest.refererInfo) {
      refererInfo = bidderRequest.refererInfo;
    }

    var clonedBidRequests = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepClone"](validBidRequests);
    return clonedBidRequests.map(function (bidRequest) {
      var oRequest = spec._createRequest(bidRequest, refererInfo);

      if (oRequest) {
        spec._setGDPRParams(bidderRequest, oRequest);

        return {
          method: HTTP_POST,
          url: BID_ENDPOINT,
          data: JSON.stringify(oRequest)
        };
      }
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   **/
  interpretResponse: function interpretResponse(serverResponse, request) {
    var response = serverResponse.body;
    var bidResponses = [];

    try {
      if (response.seatbid) {
        var currency = response.cur ? response.cur : DEFAULT_CURRENCY;
        response.seatbid.forEach(function (seatbid) {
          var bids = seatbid.bid ? seatbid.bid : [];
          bids.forEach(function (bid) {
            var bidResponse = {
              requestId: bid.impid,
              cpm: (parseFloat(bid.price) || 0).toFixed(2),
              width: bid.w,
              height: bid.h,
              creativeId: bid.crid,
              currency: currency,
              netRevenue: DEFAULT_NET_REVENUE,
              ttl: 300
            };

            if (bid.dealid) {
              bidResponse.dealId = bid.dealid;
            }

            var req = spec._parse(request.data);

            if (req.imp && req.imp.length > 0) {
              req.imp.forEach(function (impr) {
                if (impr.id === bid.impid) {
                  if (impr.banner) {
                    bidResponse.ad = bid.adm;
                    bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */];
                  } else {
                    bidResponse.width = bid.hasOwnProperty('w') ? bid.w : impr.video.w;
                    bidResponse.height = bid.hasOwnProperty('h') ? bid.h : impr.video.h;
                    bidResponse.vastXml = bid.adm;
                    bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */];
                  }
                }
              });
            }

            bidResponses.push(bidResponse);
          });
        });
      }
    } catch (ex) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"](LOG_PREFIX, 'Exception: ', ex);
    }

    return bidResponses;
  },

  /**
   * Register the user sync pixels which should be dropped after the auction.
   * @param {SyncOptions} syncOptions Which user syncs are allowed?
   * @param {ServerResponse[]} serverResponses List of server's responses.
   * @return {UserSync[]} The user syncs which should be dropped.
   **/
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: USER_SYNC_ENDPOINT
      }];
    } else {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logWarn"](LOG_PREFIX + 'Please enable iframe based user sync.');
    }
  },

  /**
   * create IAB standard OpenRTB bid request
   **/
  _createRequest: function _createRequest(bidRequests, refererInfo) {
    var oRequest = {};

    try {
      oRequest = {
        id: spec._createUUID(),
        imp: spec._createImpressions(bidRequests),
        user: {},
        ext: {}
      };

      var site = spec._createSite(bidRequests, refererInfo);

      var app = spec._createApp(bidRequests);

      var device = spec._createDevice(bidRequests);

      if (app) {
        oRequest.app = app;
      }

      if (site) {
        oRequest.site = site;
      }

      if (device) {
        oRequest.device = device;
      }
    } catch (ex) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"](LOG_PREFIX, 'Exception: ', ex);
      oRequest = null;
    }

    return oRequest;
  },

  /**
   * create impression array objects
   **/
  _createImpressions: function _createImpressions(request) {
    var impressions = [];

    var impression = spec._creatImpression(request);

    if (impression) {
      impressions.push(impression);
    }

    return impressions;
  },

  /**
   * create impression (single) object
   **/
  _creatImpression: function _creatImpression(request) {
    if (!request.hasOwnProperty(MEDIA_TYPES)) {
      return undefined;
    }

    var params = request && request.params ? request.params : null;
    var impression = {
      id: request.bidId ? request.bidId : spec._createUUID(),
      secure: window.location.protocol === HTTPS ? 1 : 0,
      bidfloorcur: request.params.currency ? request.params.currency : DEFAULT_CURRENCY
    };

    if (params.bidFloor) {
      impression.bidfloor = params.bidFloor;
    }

    if (params.tagId) {
      impression.tagid = params.tagId.toString();
    }

    var banner;
    var video;
    var mediaType;

    for (mediaType in request.mediaTypes) {
      switch (mediaType) {
        case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]:
          banner = spec._createBanner(request);

          if (banner) {
            impression.banner = banner;
          }

          break;

        case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */]:
          video = spec._createVideo(request);

          if (video) {
            impression.video = video;
          }

          break;
      }
    }

    return impression.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]) || impression.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */]) ? impression : undefined;
  },

  /**
   * create the banner object
   **/
  _createBanner: function _createBanner(request) {
    if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](request, 'mediaTypes.banner')) {
      var banner = {};
      var sizes = request.mediaTypes.banner.sizes;

      if (sizes && __WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](sizes) && sizes.length > 0) {
        var format = [];
        banner.w = sizes[0][0];
        banner.h = sizes[0][1];
        sizes.forEach(function (size) {
          format.push({
            w: size[0],
            h: size[1]
          });
        });
        banner.format = format;
      }

      spec._copyObject(request.mediaTypes.banner, banner);

      spec._copyObject(request.params.banner, banner);

      return banner;
    }

    return undefined;
  },

  /**
   * create video object
   **/
  _createVideo: function _createVideo(request) {
    if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](request, 'mediaTypes.video')) {
      var video = {};
      var sizes = request.mediaTypes.video.playerSize;

      if (sizes && __WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](sizes) && sizes.length > 1) {
        video.w = sizes[0];
        video.h = sizes[1];
      }

      spec._copyObject(request.mediaTypes.video, video);

      spec._copyObject(request.params.video, video);

      return video;
    }

    return undefined;
  },

  /**
   * create site object
   **/
  _createSite: function _createSite(request, refererInfo) {
    var rSite = request.params.site;

    if (rSite || !request.params.app) {
      var site = {};

      spec._copyObject(rSite, site);

      if (refererInfo) {
        if (refererInfo.referer) {
          site.ref = encodeURIComponent(refererInfo.referer);
        }

        if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](refererInfo.stack) && refererInfo.stack.length > 0) {
          site.page = encodeURIComponent(refererInfo.stack[0]);
          var anchrTag = document.createElement('a');
          anchrTag.href = site.page;
          site.domain = anchrTag.hostname;
        }
      } // override publisher object


      site.publisher = {
        id: request.params.publisherId.toString()
      };
      return site;
    }

    return undefined;
  },

  /**
   * create app object
   **/
  _createApp: function _createApp(request) {
    var rApp = request.params.app;

    if (rApp) {
      var app = {};

      spec._copyObject(rApp, app); // override publisher object


      app.publisher = {
        id: request.params.publisherId.toString()
      };
      return app;
    }

    return undefined;
  },

  /**
   * create device obejct
   **/
  _createDevice: function _createDevice(request) {
    var device = {};
    var rDevice = request.params.device;

    spec._copyObject(rDevice, device);

    device.dnt = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getDNT"]() ? 1 : 0;
    device.ua = navigator.userAgent;
    device.language = navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage;
    device.w = window.screen.width || window.innerWidth;
    device.h = window.screen.height || window.innerHeigh;
    return device;
  },

  /**
   * set GDPR parameters
   **/
  _setGDPRParams: function _setGDPRParams(bidderRequest, oRequest) {
    if (!bidderRequest || !bidderRequest.gdprConsent) {
      return;
    }

    oRequest.regs = {
      ext: {
        gdpr: bidderRequest.gdprConsent.gdprApplies ? 1 : 0
      }
    };
    oRequest.user = {
      ext: {
        consent: bidderRequest.gdprConsent.consentString
      }
    };
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[238]);