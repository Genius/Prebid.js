pbjsChunk([185],{

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(178);


/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["dcn=", "&pos=", "&cmd=bid", ""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["", "/bidRequest?"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["", "/pubapi/3.0/", "/", "/", "/", "/ADTECH;v=2;cmd=bid;cors=yes;alias=", ";misc=", ";", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var AOL_BIDDERS_CODES = {
  AOL: 'aol',
  ONEMOBILE: 'onemobile',
  ONEDISPLAY: 'onedisplay'
};
var AOL_ENDPOINTS = {
  DISPLAY: {
    GET: 'display-get'
  },
  MOBILE: {
    GET: 'mobile-get',
    POST: 'mobile-post'
  }
};
var SYNC_TYPES = {
  IFRAME: {
    TAG: 'iframe',
    TYPE: 'iframe'
  },
  IMAGE: {
    TAG: 'img',
    TYPE: 'image'
  }
};
var pubapiTemplate = template(_templateObject(), 'host', 'network', 'placement', 'pageid', 'sizeid', 'alias', 'misc', 'dynamicParams');
var nexageBaseApiTemplate = template(_templateObject2(), 'host');
var nexageGetApiTemplate = template(_templateObject3(), 'dcn', 'pos', 'dynamicParams');
var MP_SERVER_MAP = {
  us: 'adserver-us.adtech.advertising.com',
  eu: 'adserver-eu.adtech.advertising.com',
  as: 'adserver-as.adtech.advertising.com'
};
var NEXAGE_SERVER = 'c2shb.ssp.yahoo.com';
var ONE_DISPLAY_TTL = 60;
var ONE_MOBILE_TTL = 3600;
var DEFAULT_PROTO = 'https';
var NUMERIC_VALUES = {
  TRUE: 1,
  FALSE: 0
};

function template(strings) {
  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      values[_key2] = arguments[_key2];
    }

    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function (key, i) {
      var value = __WEBPACK_IMPORTED_MODULE_0__src_utils__["isInteger"](key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
}

function _isMarketplaceBidder(bidder) {
  return bidder === AOL_BIDDERS_CODES.AOL || bidder === AOL_BIDDERS_CODES.ONEDISPLAY;
}

function _isOneMobileBidder(bidderCode) {
  return bidderCode === AOL_BIDDERS_CODES.AOL || bidderCode === AOL_BIDDERS_CODES.ONEMOBILE;
}

function _isNexageRequestPost(bid) {
  if (_isOneMobileBidder(bid.bidder) && bid.params.id && bid.params.imp && bid.params.imp[0]) {
    var imp = bid.params.imp[0];
    return imp.id && imp.tagid && (imp.banner && imp.banner.w && imp.banner.h || imp.video && imp.video.mimes && imp.video.minduration && imp.video.maxduration);
  }
}

function _isNexageRequestGet(bid) {
  return _isOneMobileBidder(bid.bidder) && bid.params.dcn && bid.params.pos;
}

function isMarketplaceBid(bid) {
  return _isMarketplaceBidder(bid.bidder) && bid.params.placement && bid.params.network;
}

function isMobileBid(bid) {
  return _isNexageRequestGet(bid) || _isNexageRequestPost(bid);
}

function resolveEndpointCode(bid) {
  if (_isNexageRequestGet(bid)) {
    return AOL_ENDPOINTS.MOBILE.GET;
  } else if (_isNexageRequestPost(bid)) {
    return AOL_ENDPOINTS.MOBILE.POST;
  } else if (isMarketplaceBid(bid)) {
    return AOL_ENDPOINTS.DISPLAY.GET;
  }
}

var spec = {
  code: AOL_BIDDERS_CODES.AOL,
  aliases: [AOL_BIDDERS_CODES.ONEMOBILE, AOL_BIDDERS_CODES.ONEDISPLAY],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return isMarketplaceBid(bid) || isMobileBid(bid);
  },
  buildRequests: function buildRequests(bids, bidderRequest) {
    var _this = this;

    var consentData = {};

    if (bidderRequest) {
      consentData.gdpr = bidderRequest.gdprConsent;
      consentData.uspConsent = bidderRequest.uspConsent;
    }

    return bids.map(function (bid) {
      var endpointCode = resolveEndpointCode(bid);

      if (endpointCode) {
        return _this.formatBidRequest(endpointCode, bid, consentData);
      }
    });
  },
  interpretResponse: function interpretResponse(_ref, bidRequest) {
    var body = _ref.body;

    if (!body) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Empty bid response', bidRequest.bidderCode, body);
    } else {
      var _bid = this._parseBidResponse(body, bidRequest);

      if (_bid) {
        return _bid;
      }
    }
  },
  getUserSyncs: function getUserSyncs(options, serverResponses) {
    var bidResponse = !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](serverResponses) && serverResponses[0].body;

    if (bidResponse && bidResponse.ext && bidResponse.ext.pixels) {
      return this.parsePixelItems(bidResponse.ext.pixels);
    }

    return [];
  },
  formatBidRequest: function formatBidRequest(endpointCode, bid, consentData) {
    var bidRequest;

    switch (endpointCode) {
      case AOL_ENDPOINTS.DISPLAY.GET:
        bidRequest = {
          url: this.buildMarketplaceUrl(bid, consentData),
          method: 'GET',
          ttl: ONE_DISPLAY_TTL
        };
        break;

      case AOL_ENDPOINTS.MOBILE.GET:
        bidRequest = {
          url: this.buildOneMobileGetUrl(bid, consentData),
          method: 'GET',
          ttl: ONE_MOBILE_TTL
        };
        break;

      case AOL_ENDPOINTS.MOBILE.POST:
        bidRequest = {
          url: this.buildOneMobileBaseUrl(bid),
          method: 'POST',
          ttl: ONE_MOBILE_TTL,
          data: this.buildOpenRtbRequestData(bid, consentData),
          options: {
            contentType: 'application/json',
            customHeaders: {
              'x-openrtb-version': '2.2'
            }
          }
        };
        break;
    }

    bidRequest.bidderCode = bid.bidder;
    bidRequest.bidId = bid.bidId;
    bidRequest.userSyncOn = bid.params.userSyncOn;
    return bidRequest;
  },
  buildMarketplaceUrl: function buildMarketplaceUrl(bid, consentData) {
    var params = bid.params;
    var serverParam = params.server;
    var regionParam = params.region || 'us';
    var server;

    if (!MP_SERVER_MAP.hasOwnProperty(regionParam)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]("Unknown region '".concat(regionParam, "' for AOL bidder."));
      regionParam = 'us'; // Default region.
    }

    if (serverParam) {
      server = serverParam;
    } else {
      server = MP_SERVER_MAP[regionParam];
    } // Set region param, used by AOL analytics.


    params.region = regionParam;
    return this.applyProtocol(pubapiTemplate({
      host: server,
      network: params.network,
      placement: parseInt(params.placement),
      pageid: params.pageId || 0,
      sizeid: params.sizeId || 0,
      alias: params.alias || __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"](),
      misc: new Date().getTime(),
      // cache busting
      dynamicParams: this.formatMarketplaceDynamicParams(params, consentData)
    }));
  },
  buildOneMobileGetUrl: function buildOneMobileGetUrl(bid, consentData) {
    var _bid$params = bid.params,
        dcn = _bid$params.dcn,
        pos = _bid$params.pos,
        ext = _bid$params.ext;
    var nexageApi = this.buildOneMobileBaseUrl(bid);

    if (dcn && pos) {
      var dynamicParams = this.formatOneMobileDynamicParams(ext, consentData);
      nexageApi += nexageGetApiTemplate({
        dcn: dcn,
        pos: pos,
        dynamicParams: dynamicParams
      });
    }

    return nexageApi;
  },
  buildOneMobileBaseUrl: function buildOneMobileBaseUrl(bid) {
    return this.applyProtocol(nexageBaseApiTemplate({
      host: bid.params.host || NEXAGE_SERVER
    }));
  },
  applyProtocol: function applyProtocol(url) {
    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    return url.indexOf('//') === 0 ? "".concat(DEFAULT_PROTO, ":").concat(url) : "".concat(DEFAULT_PROTO, "://").concat(url);
  },
  formatMarketplaceDynamicParams: function formatMarketplaceDynamicParams() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var consentData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var queryParams = {};

    if (params.bidFloor) {
      queryParams.bidfloor = params.bidFloor;
    }

    _extends(queryParams, this.formatKeyValues(params.keyValues));

    _extends(queryParams, this.formatConsentData(consentData));

    var paramsFormatted = '';

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](queryParams, function (value, key) {
      paramsFormatted += "".concat(key, "=").concat(encodeURIComponent(value), ";");
    });

    return paramsFormatted;
  },
  formatOneMobileDynamicParams: function formatOneMobileDynamicParams() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var consentData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.isSecureProtocol()) {
      params.secure = NUMERIC_VALUES.TRUE;
    }

    _extends(params, this.formatConsentData(consentData));

    var paramsFormatted = '';

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](params, function (value, key) {
      paramsFormatted += "&".concat(key, "=").concat(encodeURIComponent(value));
    });

    return paramsFormatted;
  },
  buildOpenRtbRequestData: function buildOpenRtbRequestData(bid) {
    var consentData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var openRtbObject = {
      id: bid.params.id,
      imp: bid.params.imp
    };

    if (this.isEUConsentRequired(consentData)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](openRtbObject, 'regs.ext.gdpr', NUMERIC_VALUES.TRUE);

      if (consentData.gdpr.consentString) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](openRtbObject, 'user.ext.consent', consentData.gdpr.consentString);
      }
    }

    if (consentData.uspConsent) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](openRtbObject, 'regs.ext.us_privacy', consentData.uspConsent);
    }

    return openRtbObject;
  },
  isEUConsentRequired: function isEUConsentRequired(consentData) {
    return !!(consentData && consentData.gdpr && consentData.gdpr.gdprApplies);
  },
  formatKeyValues: function formatKeyValues(keyValues) {
    var keyValuesHash = {};

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](keyValues, function (value, key) {
      keyValuesHash["kv".concat(key)] = value;
    });

    return keyValuesHash;
  },
  formatConsentData: function formatConsentData(consentData) {
    var params = {};

    if (this.isEUConsentRequired(consentData)) {
      params.gdpr = NUMERIC_VALUES.TRUE;

      if (consentData.gdpr.consentString) {
        params.euconsent = consentData.gdpr.consentString;
      }
    }

    if (consentData.uspConsent) {
      params.us_privacy = consentData.uspConsent;
    }

    return params;
  },
  parsePixelItems: function parsePixelItems(pixels) {
    var itemsRegExp = /(img|iframe)[\s\S]*?src\s*=\s*("|')(.*?)\2/gi;
    var tagNameRegExp = /\w*(?=\s)/;
    var srcRegExp = /src=("|')(.*?)\1/;
    var pixelsItems = [];

    if (pixels) {
      var matchedItems = pixels.match(itemsRegExp);

      if (matchedItems) {
        matchedItems.forEach(function (item) {
          var tagName = item.match(tagNameRegExp)[0];
          var url = item.match(srcRegExp)[2];

          if (tagName && tagName) {
            pixelsItems.push({
              type: tagName === SYNC_TYPES.IMAGE.TAG ? SYNC_TYPES.IMAGE.TYPE : SYNC_TYPES.IFRAME.TYPE,
              url: url
            });
          }
        });
      }
    }

    return pixelsItems;
  },
  _parseBidResponse: function _parseBidResponse(response, bidRequest) {
    var bidData;

    try {
      bidData = response.seatbid[0].bid[0];
    } catch (e) {
      return;
    }

    var cpm;

    if (bidData.ext && bidData.ext.encp) {
      cpm = bidData.ext.encp;
    } else {
      cpm = bidData.price;

      if (cpm === null || isNaN(cpm)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Invalid price in bid response', AOL_BIDDERS_CODES.AOL, bid);
        return;
      }
    }

    return {
      bidderCode: bidRequest.bidderCode,
      requestId: bidRequest.bidId,
      ad: bidData.adm,
      cpm: cpm,
      width: bidData.w,
      height: bidData.h,
      creativeId: bidData.crid || 0,
      pubapiId: response.id,
      currency: response.cur || 'USD',
      dealId: bidData.dealid,
      netRevenue: true,
      ttl: bidRequest.ttl
    };
  },
  isOneMobileBidder: _isOneMobileBidder,
  isSecureProtocol: function isSecureProtocol() {
    return document.location.protocol === 'https:';
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[177]);