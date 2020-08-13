pbjsChunk([88],{

/***/ 736:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(737);


/***/ }),

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeoutUrl", function() { return getTimeoutUrl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_bidfactory_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__src_constants_json__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var BIDDER_CODE = 'telaria';
var DOMAIN = 'tremorhub.com';
var TAG_ENDPOINT = "ads.".concat(DOMAIN, "/ad/tag");
var EVENTS_ENDPOINT = "events.".concat(DOMAIN, "/diag");
var spec = {
  code: BIDDER_CODE,
  aliases: ['tremor', 'tremorvideo'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],

  /**
   * Determines if the request is valid
   * @param bid
   * @returns {*|string}
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.adCode && bid.params.supplyCode);
  },

  /**
   * Make a server request from the list of BidRequests.
   * @param validBidRequests list of valid bid requests that have passed isBidRequestValid check
   * @param bidderRequest
   * @returns {Array} of url objects
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var requests = [];
    validBidRequests.forEach(function (bid) {
      var url = generateUrl(bid, bidderRequest);

      if (url) {
        requests.push({
          method: 'GET',
          url: url,
          bidId: bid.bidId,
          vastUrl: url.split('&fmt=json')[0]
        });
      }
    });
    return requests;
  },

  /**
   * convert the server response into a list of BidObjects that prebid accepts
   * http://prebid.org/dev-docs/bidder-adaptor.html#interpreting-the-response
   * @param serverResponse
   * @param bidderRequest
   * @returns {Array}
   */
  interpretResponse: function interpretResponse(serverResponse, bidderRequest) {
    var bidResult;
    var width, height;
    var bids = [];

    try {
      bidResult = serverResponse.body;
      bidderRequest.url.split('&').forEach(function (param) {
        var lower = param.toLowerCase();

        if (lower.indexOf('player') > -1) {
          if (lower.indexOf('width') > -1) {
            width = param.split('=')[1];
          } else if (lower.indexOf('height') > -1) {
            height = param.split('=')[1];
          }
        }
      });
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
      width = 0;
      height = 0;
    }

    if (!bidResult || bidResult.error) {
      var errorMessage = "in response for ".concat(bidderRequest.bidderCode, " adapter");

      if (bidResult && bidResult.error) {
        errorMessage += ": ".concat(bidResult.error);
      }

      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](errorMessage);
    } else if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](bidResult.seatbid)) {
      bidResult.seatbid[0].bid.forEach(function (tag) {
        bids.push(createBid(__WEBPACK_IMPORTED_MODULE_4__src_constants_json__["STATUS"].GOOD, bidderRequest, tag, width, height, BIDDER_CODE));
      });
    }

    return bids;
  },

  /**
   * We support pixel syncing only at the moment. Telaria ad server returns 'ext'
   * as an optional parameter if the tag has 'incIdSync' parameter set to true
   * @param syncOptions
   * @param serverResponses
   * @returns {Array}
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (syncOptions.pixelEnabled && serverResponses.length) {
      (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](serverResponses, '0.body.ext.telaria.userSync') || []).forEach(function (url) {
        return syncs.push({
          type: 'image',
          url: url
        });
      });
    }

    return syncs;
  },

  /**
   * See http://prebid.org/dev-docs/bidder-adaptor.html#registering-on-timeout for detailed semantic.
   * @param timeoutData bidRequest
   */
  onTimeout: function onTimeout(timeoutData) {
    var url = getTimeoutUrl(timeoutData);

    if (url) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["triggerPixel"](url);
    }
  }
};

function getDefaultSrcPageUrl() {
  return encodeURIComponent(document.location.href);
}

function getEncodedValIfNotEmpty(val) {
  return !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](val) ? encodeURIComponent(val) : '';
}
/**
 * Converts the schain object to a url param value. Please refer to
 * https://github.com/InteractiveAdvertisingBureau/openrtb/blob/master/supplychainobject.md
 * (schain for non ORTB section) for more information
 * @param schainObject
 * @returns {string}
 */


function getSupplyChainAsUrlParam(schainObject) {
  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](schainObject)) {
    return '';
  }

  var scStr = "&schain=".concat(schainObject.ver, ",").concat(schainObject.complete);
  schainObject.nodes.forEach(function (node) {
    scStr += '!';
    scStr += "".concat(getEncodedValIfNotEmpty(node.asi), ",");
    scStr += "".concat(getEncodedValIfNotEmpty(node.sid), ",");
    scStr += "".concat(getEncodedValIfNotEmpty(node.hp), ",");
    scStr += "".concat(getEncodedValIfNotEmpty(node.rid), ",");
    scStr += "".concat(getEncodedValIfNotEmpty(node.name), ",");
    scStr += "".concat(getEncodedValIfNotEmpty(node.domain));
  });
  return scStr;
}

function getUrlParams(params, schainFromBidRequest) {
  var urlSuffix = '';

  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](params)) {
    for (var key in params) {
      if (key !== 'schain' && params.hasOwnProperty(key) && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](params[key])) {
        urlSuffix += "&".concat(key, "=").concat(params[key]);
      }
    }

    urlSuffix += getSupplyChainAsUrlParam(!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](schainFromBidRequest) ? schainFromBidRequest : params['schain']);
  }

  return urlSuffix;
}

var getTimeoutUrl = function getTimeoutUrl(timeoutData) {
  var params = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](timeoutData, '0.params.0');

  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](params)) {
    var url = "https://".concat(EVENTS_ENDPOINT);
    params = _extends({
      srcPageUrl: getDefaultSrcPageUrl()
    }, params);
    url += "".concat(getUrlParams(params));
    url += '&hb=1&evt=TO';
    return url;
  }
};
/**
 * Generates the url based on the parameters given. Sizes, supplyCode & adCode are required.
 * The format is: [L,W] or [[L1,W1],...]
 * @param bid
 * @param bidderRequest
 * @returns {string}
 */

function generateUrl(bid, bidderRequest) {
  var playerSize = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.playerSize');

  if (!playerSize) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Although player size isn't required it is highly recommended");
  }

  var width, height;

  if (playerSize) {
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](playerSize) && playerSize.length === 2 && !isNaN(playerSize[0]) && !isNaN(playerSize[1])) {
      width = playerSize[0];
      height = playerSize[1];
    } else if (_typeof(playerSize) === 'object') {
      width = playerSize[0][0];
      height = playerSize[0][1];
    }
  }

  var supplyCode = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.supplyCode');
  var adCode = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.adCode');

  if (supplyCode && adCode) {
    var url = "https://".concat(supplyCode, ".").concat(TAG_ENDPOINT, "?adCode=").concat(adCode);

    if (width) {
      url += "&playerWidth=".concat(width);
    }

    if (height) {
      url += "&playerHeight=".concat(height);
    }

    var params = _extends({
      srcPageUrl: getDefaultSrcPageUrl()
    }, bid.params);

    delete params.adCode;
    url += "".concat(getUrlParams(params, bid.schain));
    url += "&transactionId=".concat(bid.transactionId);

    if (bidderRequest) {
      if (bidderRequest.gdprConsent) {
        if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') {
          url += "&gdpr=".concat(bidderRequest.gdprConsent.gdprApplies ? 1 : 0);
        }

        if (bidderRequest.gdprConsent.consentString) {
          url += "&gdpr_consent=".concat(bidderRequest.gdprConsent.consentString);
        }
      }

      if (bidderRequest.refererInfo && bidderRequest.refererInfo.referer) {
        url += "&referrer=".concat(encodeURIComponent(bidderRequest.refererInfo.referer));
      }
    }

    return url + '&hb=1&fmt=json';
  }
}
/**
 * Create and return a bid object based on status and tag
 * @param status
 * @param reqBid
 * @param response
 * @param width
 * @param height
 * @param bidderCode
 */


function createBid(status, reqBid, response, width, height, bidderCode) {
  var bid = Object(__WEBPACK_IMPORTED_MODULE_1__src_bidfactory_js__["a" /* createBid */])(status, reqBid); // TTL 5 mins by default, future support for extended imp wait time

  if (response) {
    _extends(bid, {
      requestId: reqBid.bidId,
      cpm: response.price,
      creativeId: response.crid || '-1',
      vastXml: response.adm,
      vastUrl: reqBid.vastUrl,
      mediaType: 'video',
      width: width,
      height: height,
      bidderCode: bidderCode,
      adId: response.id,
      currency: 'USD',
      netRevenue: true,
      ttl: 300,
      ad: response.adm
    });
  }

  bid.meta = bid.meta || {};

  if (response && response.adomain && response.adomain.length > 0) {
    bid.meta.advertiserDomains = response.adomain;
  }

  return bid;
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[736]);