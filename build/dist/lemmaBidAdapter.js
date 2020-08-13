pbjsChunk([188],{

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(485);


/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);



var BIDDER_CODE = 'lemma';
var LOG_WARN_PREFIX = 'LEMMA: ';
var ENDPOINT = 'https://ads.lemmatechnologies.com/lemma/servad';
var DEFAULT_CURRENCY = 'USD';
var AUCTION_TYPE = 2;
var DEFAULT_TMAX = 300;
var DEFAULT_NET_REVENUE = false;
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid && bid.params) {
      if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](bid.params.pubId)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](LOG_WARN_PREFIX + 'Error: publisherId is mandatory and cannot be string. Call to OpenBid will not be sent for ad unit: ' + JSON.stringify(bid));
        return false;
      }

      if (!bid.params.adunitId) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](LOG_WARN_PREFIX + 'Error: adUnitId is mandatory. Call to OpenBid will not be sent for ad unit: ' + JSON.stringify(bid));
        return false;
      } // video ad validation


      if (bid.params.hasOwnProperty('video')) {
        if (!bid.params.video.hasOwnProperty('mimes') || !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](bid.params.video.mimes) || bid.params.video.mimes.length === 0) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](LOG_WARN_PREFIX + 'Error: For video ads, mimes is mandatory and must specify atlease 1 mime value. Call to OpenBid will not be sent for ad unit:' + JSON.stringify(bid));
          return false;
        }
      }

      return true;
    }

    return false;
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var refererInfo;

    if (bidderRequest && bidderRequest.refererInfo) {
      refererInfo = bidderRequest.refererInfo;
    }

    var conf = _initConf(refererInfo);

    var request = oRTBTemplate(bidRequests, conf);

    if (request.imp.length == 0) {
      return;
    }

    setOtherParams(bidderRequest, request);
    var endPoint = endPointURL(bidRequests);
    return {
      method: 'POST',
      url: endPoint,
      data: JSON.stringify(request)
    };
  },
  interpretResponse: function interpretResponse(response, request) {
    return parseRTBResponse(request, response.body);
  }
};

function _initConf(refererInfo) {
  var conf = {};
  conf.pageURL = refererInfo && refererInfo.referer ? refererInfo.referer : window.location.href;

  if (refererInfo && refererInfo.referer) {
    conf.refURL = refererInfo.referer;
  } else {
    conf.refURL = '';
  }

  return conf;
}

function parseRTBResponse(request, response) {
  var bidResponses = [];

  try {
    if (response.seatbid) {
      var currency = response.curr || DEFAULT_CURRENCY;
      var seatbid = response.seatbid;
      seatbid.forEach(function (seatbidder) {
        var bidder = seatbidder.bid;
        bidder.forEach(function (bid) {
          var req = parse(request.data);
          var newBid = {
            requestId: bid.impid,
            cpm: parseFloat(bid.price).toFixed(2),
            width: bid.w,
            height: bid.h,
            creativeId: bid.crid,
            currency: currency,
            netRevenue: DEFAULT_NET_REVENUE,
            ttl: 300,
            referrer: req.site.ref,
            ad: bid.adm
          };

          if (bid.dealid) {
            newBid.dealId = bid.dealid;
          }

          if (req.imp && req.imp.length > 0) {
            newBid.mediaType = req.mediaType;
            req.imp.forEach(function (robj) {
              if (bid.impid === robj.id) {
                switch (newBid.mediaType) {
                  case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]:
                    break;

                  case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]:
                    newBid.width = bid.hasOwnProperty('w') ? bid.w : robj.video.w;
                    newBid.height = bid.hasOwnProperty('h') ? bid.h : robj.video.h;
                    newBid.vastXml = bid.adm;
                    break;
                }
              }
            });
          }

          bidResponses.push(newBid);
        });
      });
    }
  } catch (error) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](LOG_WARN_PREFIX, 'ERROR ', error);
  }

  return bidResponses;
}

function oRTBTemplate(bidRequests, conf) {
  try {
    var oRTBObject = {
      id: '' + new Date().getTime(),
      at: AUCTION_TYPE,
      tmax: DEFAULT_TMAX,
      cur: [DEFAULT_CURRENCY],
      imp: _getImpressionArray(bidRequests),
      user: {},
      ext: {}
    };
    var bid = bidRequests[0];

    var app = _getAppObject(bid);

    var site = _getSiteObject(bid, conf);

    var device = _getDeviceObject(bid);

    if (app) {
      oRTBObject.app = app;
    }

    if (site) {
      oRTBObject.site = site;
    }

    if (device) {
      oRTBObject.device = device;
    }

    return oRTBObject;
  } catch (ex) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](LOG_WARN_PREFIX, 'ERROR ', ex);
  }
}

function _getImpressionArray(request) {
  var impArray = [];
  var map = request.map(function (bid) {
    return _getImpressionObject(bid);
  });

  if (map) {
    map.forEach(function (o) {
      if (o) {
        impArray.push(o);
      }
    });
  }

  return impArray;
}

function endPointURL(request) {
  var params = request && request[0].params ? request[0].params : null;

  if (params) {
    var pubId = params.pubId ? params.pubId : 0;
    var adunitId = params.adunitId ? params.adunitId : 0;
    return ENDPOINT + '?pid=' + pubId + '&aid=' + adunitId;
  }

  return null;
}

function _getDomain(url) {
  var a = document.createElement('a');
  a.setAttribute('href', url);
  return a.hostname;
}

function _getSiteObject(request, conf) {
  var params = request && request.params ? request.params : null;

  if (params) {
    var pubId = params.pubId ? params.pubId : '0';
    var siteId = params.siteId ? params.siteId : '0';
    var appParams = params.app;

    if (!appParams) {
      return {
        publisher: {
          id: pubId.toString()
        },
        domain: _getDomain(conf.pageURL),
        id: siteId.toString(),
        ref: conf.refURL,
        page: conf.pageURL
      };
    }
  }

  return null;
}

function _getAppObject(request) {
  var params = request && request.params ? request.params : null;

  if (params) {
    var pubId = params.pubId ? params.pubId : 0;
    var appParams = params.app;

    if (appParams) {
      return {
        publisher: {
          id: pubId.toString()
        },
        id: appParams.id,
        name: appParams.name,
        bundle: appParams.bundle,
        storeurl: appParams.storeUrl,
        domain: appParams.domain,
        cat: appParams.categories,
        pagecat: appParams.page_category
      };
    }
  }

  return null;
}

function _getDeviceObject(request) {
  var params = request && request.params ? request.params : null;

  if (params) {
    return {
      dnt: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getDNT"]() ? 1 : 0,
      ua: navigator.userAgent,
      language: navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage,
      w: window.screen.width || window.innerWidth,
      h: window.screen.height || window.innerHeigh,
      geo: {
        country: params.country,
        lat: params.latitude,
        lon: params.longitude,
        region: params.region,
        city: params.city,
        zip: params.zip
      },
      ip: params.ip,
      devicetype: params.device_type,
      ifa: params.ifa
    };
  }

  return null;
}

function setOtherParams(request, ortbRequest) {
  var params = request && request.params ? request.params : null;

  if (request && request.gdprConsent) {
    ortbRequest.regs = {
      ext: {
        gdpr: request.gdprConsent.gdprApplies ? 1 : 0
      }
    };
    ortbRequest.user = {
      ext: {
        consent: request.gdprConsent.consentString
      }
    };
  }

  if (params) {
    ortbRequest.tmax = params.tmax;
    ortbRequest.bcat = params.bcat;
  }
}

function _getSizes(request) {
  if (request.sizes && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](request.sizes[0]) && request.sizes[0].length > 0) {
    return request.sizes[0];
  }

  return null;
}

function _getBannerRequest(bid) {
  var bObj;
  var adFormat = [];

  if (bid.mediaType === 'banner' || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner')) {
    var params = bid ? bid.params : null;
    var bannerData = params.banner;
    var sizes = _getSizes(bid) || [];

    if (sizes && sizes.length == 0) {
      sizes = bid.mediaTypes.banner.sizes[0];
    }

    if (sizes && sizes.length > 0) {
      bObj = {};
      bObj.w = sizes[0];
      bObj.h = sizes[1];
      bObj.pos = 0;

      if (bannerData) {
        bObj = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](bannerData);
      }

      sizes = bid.mediaTypes.banner.sizes;

      if (sizes.length > 0) {
        adFormat = [];
        sizes.forEach(function (size) {
          if (size.length > 1) {
            adFormat.push({
              w: size[0],
              h: size[1]
            });
          }
        });

        if (adFormat.length > 0) {
          bObj.format = adFormat;
        }
      }
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](LOG_WARN_PREFIX + 'Error: mediaTypes.banner.sizes missing for adunit: ' + bid.params.adunitId);
    }
  }

  return bObj;
}

function _getVideoRequest(bid) {
  var vObj;

  if (bid.mediaType === 'video' || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video')) {
    var params = bid ? bid.params : null;
    var sizes = _getSizes(bid) || [];

    if (sizes && sizes.length == 0) {
      sizes = bid.mediaTypes && bid.mediaTypes.video ? bid.mediaTypes.video.playerSize : [];
    }

    if (sizes && sizes.length > 0) {
      var videoData = params.video;
      vObj = {};

      if (videoData) {
        vObj = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](videoData);
      }

      vObj.w = sizes[0];
      vObj.h = sizes[1];
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](LOG_WARN_PREFIX + 'Error: mediaTypes.video.sizes missing for adunit: ' + bid.params.adunitId);
    }
  }

  return vObj;
}

function _getImpressionObject(bid) {
  var impression = {};
  var bObj;
  var vObj;
  var sizes = bid.hasOwnProperty('sizes') ? bid.sizes : [];
  var mediaTypes = '';
  var format = [];
  var params = bid && bid.params ? bid.params : null;
  impression = {
    id: bid.bidId,
    tagid: params.adunitId ? params.adunitId.toString() : undefined,
    secure: window.location.protocol === 'https:' ? 1 : 0,
    bidfloorcur: params.currency ? params.currency : DEFAULT_CURRENCY
  };

  if (params.bidFloor) {
    impression.bidfloor = params.bidFloor;
  }

  if (bid.hasOwnProperty('mediaTypes')) {
    for (mediaTypes in bid.mediaTypes) {
      switch (mediaTypes) {
        case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]:
          bObj = _getBannerRequest(bid);

          if (bObj) {
            impression.banner = bObj;
          }

          break;

        case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]:
          vObj = _getVideoRequest(bid);

          if (vObj) {
            impression.video = vObj;
          }

          break;
      }
    }
  } else {
    bObj = {
      pos: 0,
      w: sizes && sizes[0] ? sizes[0][0] : 0,
      h: sizes && sizes[0] ? sizes[0][1] : 0
    };

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](sizes) && sizes.length > 1) {
      sizes = sizes.splice(1, sizes.length - 1);
      sizes.forEach(function (size) {
        format.push({
          w: size[0],
          h: size[1]
        });
      });
      bObj.format = format;
    }

    impression.banner = bObj;
  }

  return impression.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]) || impression.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]) ? impression : undefined;
}

function parse(rawResp) {
  try {
    if (rawResp) {
      return JSON.parse(rawResp);
    }
  } catch (ex) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](LOG_WARN_PREFIX, 'ERROR', ex);
  }

  return null;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[484]);