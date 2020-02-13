pbjsChunk([69],{

/***/ 612:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(613);


/***/ }),

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var TR_BIDDER_CODE = 'trafficroots';
var TR_CURRENCY = 'USD';
var TR_DEFAULT_BID_URL = '//service.trafficroots.com/prebid';
var TR_TTL = 60;
var LOCATION_PARAM_NAME = 'siteurl';
var ID_PARAM_NAME = 'id';
var IFRAME_PARAM_NAME = 'if';
var ZONE_ID_PARAM_NAME = 'zoneId';
var SIZE_PARAM_NAME = 'size';
var KEYWORDS_PARAM_NAME = 'keywords';
var MOBILE_PARAM_NAME = 'mobile';
var TRID_PARAM_NAME = 'trid';
var ARRAY_PARAM_SEPARATOR = ';';
var ARRAY_SIZE_SEPARATOR = ',';
var SIZE_SEPARATOR = 'x';
var IS_MOBILE = window.navigator.userAgent.toLowerCase().indexOf('mobi');

var keywords = function keywords() {
  var clean = function clean(input) {
    return input.replace(/\W/g, ' ').replace(/[ ]{2,}/g, ' ').trim();
  };

  var meta = function meta(name) {
    var tag = document.querySelector("meta[name='" + name + "']");
    return tag !== null ? tag.getAttribute('content') : '';
  };

  return encodeURIComponent(clean(meta('keywords') + ' ' + meta('description') + ' ' + document.title)).substring(0, 400);
};

var spec = {
  code: TR_BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return bid.params && !!bid.params.zoneId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var _data;

    var deliveryUrl = '';
    var idParams = [];
    var sizeParams = [];
    var zoneIds = [];
    var trid = '';

    if (window.localStorage) {
      try {
        var myid = window.localStorage.getItem('trafficroots:trid');

        if (myid) {
          trid = myid;
        }
      } catch (ex) {}
    }

    __WEBPACK_IMPORTED_MODULE_1__src_utils__["_each"](validBidRequests, function (bid) {
      if (!deliveryUrl && typeof bid.params.deliveryUrl === 'string') {
        deliveryUrl = bid.params.deliveryUrl;
      }

      idParams.push(bid.bidId);
      sizeParams.push(bid.sizes.map(function (size) {
        return size.join(SIZE_SEPARATOR);
      }).join(ARRAY_SIZE_SEPARATOR));
      zoneIds.push(bid.params.zoneId);
    });

    if (!deliveryUrl) {
      deliveryUrl = TR_DEFAULT_BID_URL;
    }

    var data = (_data = {}, _defineProperty(_data, IFRAME_PARAM_NAME, 0), _defineProperty(_data, LOCATION_PARAM_NAME, __WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowUrl"]()), _defineProperty(_data, SIZE_PARAM_NAME, sizeParams.join(ARRAY_PARAM_SEPARATOR)), _defineProperty(_data, ID_PARAM_NAME, idParams.join(ARRAY_PARAM_SEPARATOR)), _defineProperty(_data, ZONE_ID_PARAM_NAME, zoneIds.join(ARRAY_PARAM_SEPARATOR)), _defineProperty(_data, MOBILE_PARAM_NAME, IS_MOBILE), _defineProperty(_data, KEYWORDS_PARAM_NAME, decodeURIComponent(keywords())), _defineProperty(_data, TRID_PARAM_NAME, trid), _data);

    if (bidderRequest && bidderRequest.gdprConsent) {
      data.gdpr = {
        applies: bidderRequest.gdprConsent.gdprApplies,
        consent: bidderRequest.gdprConsent.consentString
      };
    }

    return {
      method: 'GET',
      url: deliveryUrl,
      data: data
    };
  },
  interpretResponse: function interpretResponse(serverResponses, request) {
    var bidResponses = [];
    var tridSet = false;

    __WEBPACK_IMPORTED_MODULE_1__src_utils__["_each"](serverResponses.body, function (response) {
      if (!tridSet) {
        try {
          if (window.localStorage) {
            window.localStorage.setItem('trafficroots:trid', response.trid);
            tridSet = true;
          }
        } catch (ex) {}
      }

      if (response.cpm > 0) {
        var bidResponse = {
          requestId: response.id,
          creativeId: response.id,
          adId: response.id,
          cpm: response.cpm,
          width: response.width,
          height: response.height,
          currency: TR_CURRENCY,
          netRevenue: true,
          ttl: TR_TTL,
          ad: response.ad
        };
        bidResponses.push(bidResponse);
      }
    });

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[612]);