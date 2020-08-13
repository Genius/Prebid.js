pbjsChunk([187],{

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(487);


/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
function _templateObject() {
  var data = _taggedTemplateLiteral(["https://ads.lfstmedia.com/gate/", "/", "?adkey=", "&ad_size=", "&__location=", "&__referrer=", "&__wn=", "&__sf=", "&__fif=", "&__if=", "&__stamp=", "&__pp=1&__hb=1&_prebid_json=1&__gz=1&deferred_format=vast_2_0,vast_3_0&__hbver=", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var BIDDER_CODE = 'lifestreet';
var ADAPTER_VERSION = "4.2.0";
var urlTemplate = template(_templateObject(), 'adapter', 'slot', 'adkey', 'ad_size', 'location', 'referrer', 'wn', 'sf', 'fif', 'if', 'stamp', 'hbver');
/**
 * A helper function for template to generate string from boolean
 */

function boolToString(value) {
  return value ? '1' : '0';
}
/**
 * A helper function to form URL from the template
 */


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
      var value = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isInteger"](key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
}
/**
 * Creates a bid requests for a given bid.
 *
 * @param {BidRequest} bid The bid params to use for formatting a request
 */


function formatBidRequest(bid) {
  var bidderRequest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var params = bid.params;

  var _ref = bidderRequest.refererInfo || {},
      referer = _ref.referer;

  var url = urlTemplate({
    adapter: 'prebid',
    slot: params.slot,
    adkey: params.adkey,
    ad_size: params.ad_size,
    location: referer,
    referrer: referer,
    wn: boolToString(/fb_http/i.test(window.name)),
    sf: boolToString(window['sfAPI'] || window['$sf']),
    fif: boolToString(window['inDapIF'] === true),
    if: boolToString(window !== window.top),
    stamp: new Date().getTime(),
    hbver: ADAPTER_VERSION
  });

  if (bidderRequest.gdprConsent) {
    if (bidderRequest.gdprConsent.gdprApplies !== undefined) {
      var gdpr = '&__gdpr=' + (bidderRequest.gdprConsent.gdprApplies ? '1' : '0');
      url += gdpr;
    }

    if (bidderRequest.gdprConsent.consentString !== undefined) {
      url += "&__consent=".concat(bidderRequest.gdprConsent.consentString);
    }
  } // ccpa support


  if (bidderRequest.uspConsent) {
    url += "&__us_privacy=".concat(bidderRequest.uspConsent);
  }

  return {
    method: 'GET',
    url: url,
    bidId: bid.bidId
  };
}

function isResponseValid(response) {
  return !/^\s*\{\s*"advertisementAvailable"\s*:\s*false/i.test(response.content) && response.content.indexOf('<VAST version="2.0"></VAST>') === -1 && typeof response.cpm !== 'undefined' && response.status === 1;
}

var spec = {
  code: BIDDER_CODE,
  aliases: ['lsm'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid() {
    var bid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _bid$params = bid.params,
        params = _bid$params === void 0 ? {} : _bid$params;
    return !!(params.slot && params.adkey && params.ad_size);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bid) {
      return formatBidRequest(bid, bidderRequest);
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var response = serverResponse.body;

    if (!isResponseValid(response)) {
      return bidResponses;
    }

    var bidResponse = {
      requestId: bidRequest.bidId,
      cpm: response.cpm,
      width: response.width,
      height: response.height,
      creativeId: response.creativeId,
      currency: response.currency ? response.currency : 'USD',
      netRevenue: response.netRevenue ? response.netRevenue : true,
      ttl: response.ttl ? response.ttl : 86400
    };

    if (response.hasOwnProperty('dealId')) {
      bidResponse.dealId = response.dealId;
    }

    if (response.content_type.indexOf('vast') > -1) {
      if (typeof response.vastUrl !== 'undefined') {
        bidResponse.vastUrl = response.vastUrl;
      } else {
        bidResponse.vastXml = response.content;
      }

      bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */];
    } else {
      bidResponse.ad = response.content;
      bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */];
    }

    bidResponses.push(bidResponse);
    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[486]);