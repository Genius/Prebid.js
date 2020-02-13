pbjsChunk([160],{

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(388);


/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
function _templateObject() {
  var data = _taggedTemplateLiteral(["//ads.lfstmedia.com/gate/", "/", "?adkey=", "&ad_size=", "&__location=", "&__referrer=", "&__wn=", "&__sf=", "&__fif=", "&__if=", "&__stamp=", "&__pp=1&__hb=1&_prebid_json=1&__gz=1&deferred_format=vast_2_0,vast_3_0&__hbver=", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var BIDDER_CODE = 'lifestreet';
var ADAPTER_VERSION = 'prebidJS-2.0';
var urlTemplate = template(_templateObject(), 'adapter', 'slot', 'adkey', 'ad_size', 'location', 'referrer', 'wn', 'sf', 'fif', 'if', 'stamp', 'hbver');
/**
 * Creates a bid requests for a given bid.
 *
 * @param {BidRequest} bid The bid params to use for formatting a request
 */

function formatBidRequest(bid, bidderRequest) {
  var url = urlTemplate({
    adapter: 'prebid',
    slot: bid.params.slot,
    adkey: bid.params.adkey,
    ad_size: bid.params.ad_size,
    location: encodeURIComponent(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]()),
    referrer: encodeURIComponent(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"]()),
    wn: boolToString(/fb_http/i.test(window.name)),
    sf: boolToString(window['sfAPI'] || window['$sf']),
    fif: boolToString(window['inDapIF'] === true),
    if: boolToString(window !== window.top),
    stamp: new Date().getTime(),
    hbver: ADAPTER_VERSION
  });

  if (bidderRequest && bidderRequest.gdprConsent) {
    if (bidderRequest.gdprConsent.gdprApplies !== undefined) {
      var gdpr = '&__gdpr=' + (bidderRequest.gdprConsent.gdprApplies ? '1' : '0');
      url += gdpr;
    }

    if (bidderRequest.gdprConsent.consentString !== undefined) {
      url += '&__consent=' + bidderRequest.gdprConsent.consentString;
    }
  }

  return {
    method: 'GET',
    url: url,
    bidId: bid.bidId
  };
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
      var value = isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
}
/**
 * A helper function for template to generate string from boolean
 */


function boolToString(value) {
  return value ? '1' : '0';
}
/**
 * A helper function for template
 */


function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
/**
 * Validates response from Lifestreet AD server
 */


function isResponseValid(response) {
  return !/^\s*\{\s*"advertisementAvailable"\s*:\s*false/i.test(response.content) && response.content.indexOf('<VAST version="2.0"></VAST>') === -1 && typeof response.cpm !== 'undefined' && response.status === 1;
}

var spec = {
  code: BIDDER_CODE,
  aliases: ['lsm'],
  // short code
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],
  // Lifestreet supports banner and video media types

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
  */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.slot && bid.params.adkey && bid.params.ad_size);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
  */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bid) {
      return formatBidRequest(bid, bidderRequest);
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
  */
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

      bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */];
    } else {
      bidResponse.ad = response.content;
      bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */];
    }

    bidResponses.push(bidResponse);
    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[387]);