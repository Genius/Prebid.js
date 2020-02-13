pbjsChunk([239],{

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(205);


/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find_index__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @file AudienceNetwork adapter.
 */





var code = 'audienceNetwork';
var currency = 'USD';
var method = 'GET';
var url = 'https://an.facebook.com/v2/placementbid.json';
var supportedMediaTypes = ['banner', 'video'];
var netRevenue = true;
var hbBidder = 'fan';
var ttl = 600;
var videoTtl = 3600;
var platver = "2.37.0";
var platform = '241394079772386';
var adapterver = '1.3.0';
/**
 * Does this bid request contain valid parameters?
 * @param {Object} bid
 * @returns {Boolean}
 */

var isBidRequestValid = function isBidRequestValid(bid) {
  return _typeof(bid.params) === 'object' && typeof bid.params.placementId === 'string' && bid.params.placementId.length > 0 && Array.isArray(bid.sizes) && bid.sizes.length > 0 && (isFullWidth(bid.params.format) ? bid.sizes.map(flattenSize).some(function (size) {
    return size === '300x250';
  }) : true) && (isValidNonSizedFormat(bid.params.format) || bid.sizes.map(flattenSize).some(isValidSize));
};
/**
 * Flattens a 2-element [W, H] array as a 'WxH' string,
 * otherwise passes value through.
 * @param {Array|String} size
 * @returns {String}
 */


var flattenSize = function flattenSize(size) {
  return Array.isArray(size) && size.length === 2 ? "".concat(size[0], "x").concat(size[1]) : size;
};
/**
 * Expands a 'WxH' string as a 2-element [W, H] array
 * @param {String} size
 * @returns {Array}
 */


var expandSize = function expandSize(size) {
  return size.split('x').map(Number);
};
/**
 * Is this a valid slot size?
 * @param {String} size
 * @returns {Boolean}
 */


var isValidSize = function isValidSize(size) {
  return __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes___default()(['300x250', '320x50'], size);
};
/**
 * Is this a valid, non-sized format?
 * @param {String} size
 * @returns {Boolean}
 */


var isValidNonSizedFormat = function isValidNonSizedFormat(format) {
  return __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes___default()(['video', 'native'], format);
};
/**
 * Is this a valid size and format?
 * @param {String} size
 * @returns {Boolean}
 */


var isValidSizeAndFormat = function isValidSizeAndFormat(size, format) {
  return isFullWidth(format) && flattenSize(size) === '300x250' || isValidNonSizedFormat(format) || isValidSize(flattenSize(size));
};
/**
 * Find a preferred entry, if any, from an array of valid sizes.
 * @param {Array<String>} acc
 * @param {String} cur
 */


var sortByPreferredSize = function sortByPreferredSize(acc, cur) {
  return cur === '300x250' ? [cur].concat(_toConsumableArray(acc)) : [].concat(_toConsumableArray(acc), [cur]);
};
/**
 * Map any deprecated size/formats to new values.
 * @param {String} size
 * @param {String} format
 */


var mapDeprecatedSizeAndFormat = function mapDeprecatedSizeAndFormat(size, format) {
  return isFullWidth(format) ? ['300x250', null] : [size, format];
};
/**
 * Is this a video format?
 * @param {String} format
 * @returns {Boolean}
 */


var isVideo = function isVideo(format) {
  return format === 'video';
};
/**
 * Is this a fullwidth format?
 * @param {String} format
 * @returns {Boolean}
 */


var isFullWidth = function isFullWidth(format) {
  return format === 'fullwidth';
};
/**
 * Which SDK version should be used for this format?
 * @param {String} format
 * @returns {String}
 */


var sdkVersion = function sdkVersion(format) {
  return isVideo(format) ? '' : '6.0.web';
};
/**
 * Which platform identifier should be used?
 * @param {Array<String>} platforms Possible platform identifiers
 * @returns {String} First valid platform found, or default if none found
 */


var findPlatform = function findPlatform(platforms) {
  return [].concat(_toConsumableArray(platforms.filter(Boolean)), [platform])[0];
};
/**
 * Does the search part of the URL contain "anhb_testmode"
 * and therefore indicate testmode should be used?
 * @returns {String} "true" or "false"
 */


var isTestmode = function isTestmode() {
  return Boolean(window && window.location && typeof window.location.search === 'string' && window.location.search.indexOf('anhb_testmode') !== -1).toString();
};
/**
 * Generate ad HTML for injection into an iframe
 * @param {String} placementId
 * @param {String} format
 * @param {String} bidId
 * @returns {String} HTML
 */


var createAdHtml = function createAdHtml(placementId, format, bidId) {
  var nativeStyle = format === 'native' ? '<script>window.onload=function(){if(parent){var o=document.getElementsByTagName("head")[0];var s=parent.document.getElementsByTagName("style");for(var i=0;i<s.length;i++)o.appendChild(s[i].cloneNode(true));}}</script>' : '';
  var nativeContainer = format === 'native' ? '<div class="thirdPartyRoot"><a class="fbAdLink"><div class="fbAdMedia thirdPartyMediaClass"></div><div class="fbAdSubtitle thirdPartySubtitleClass"></div><div class="fbDefaultNativeAdWrapper"><div class="fbAdCallToAction thirdPartyCallToActionClass"></div><div class="fbAdTitle thirdPartyTitleClass"></div></div></a></div>' : '';
  return "<html>\n  <head>".concat(nativeStyle, "</head>\n  <body>\n    <div style=\"display:none;position:relative;\">\n      <script type=\"text/javascript\" src=\"https://connect.facebook.net/en_US/fbadnw60-tag.js\" async></script>\n      <script type=\"text/javascript\">\n        window.ADNW = window.ADNW || {};\n        window.ADNW.v60 = window.ADNW.v60 || {};\n        window.ADNW.v60.slots = window.ADNW.v60.slots || [];\n        window.ADNW.v60.slots.push({\n          rootElement: document.currentScript.parentElement,\n          placementid: '").concat(placementId, "',\n          format: '").concat(format, "',\n          bidid: '").concat(bidId, "',\n          testmode: false,\n          onAdLoaded: function(rootElement) {\n            console.log('Audience Network [").concat(placementId, "] ad loaded');\n            rootElement.style.display = 'block';\n          },\n          onAdError: function(errorCode, errorMessage) {\n            console.log('Audience Network [").concat(placementId, "] error (' + errorCode + ') ' + errorMessage);\n          }\n        });\n      </script>\n      ").concat(nativeContainer, "\n    </div>\n  </body>\n</html>");
};
/**
 * Get the current window location URL correctly encoded for use in a URL query string.
 * @returns {String} URI-encoded URL
 */


var getTopWindowUrlEncoded = function getTopWindowUrlEncoded() {
  return encodeURIComponent(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowUrl"])());
};
/**
 * Convert each bid request to a single URL to fetch those bids.
 * @param {Array} bids - list of bids
 * @param {String} bids[].placementCode - Prebid placement identifier
 * @param {Object} bids[].params
 * @param {String} bids[].params.placementId - Audience Network placement identifier
 * @param {String} bids[].params.platform - Audience Network platform identifier (optional)
 * @param {String} bids[].params.format - Optional format, one of 'video' or 'native' if set
 * @param {Array} bids[].sizes - list of desired advert sizes
 * @param {Array} bids[].sizes[] - Size arrays [h,w]: should include one of [300, 250], [320, 50]
 * @returns {Array<Object>} List of URLs to fetch, plus formats and sizes for later use with interpretResponse
 */


var buildRequests = function buildRequests(bids) {
  // Build lists of placementids, adformats, sizes and SDK versions
  var placementids = [];
  var adformats = [];
  var sizes = [];
  var sdk = [];
  var platforms = [];
  var requestIds = [];
  bids.forEach(function (bid) {
    return bid.sizes.map(flattenSize).filter(function (size) {
      return isValidSizeAndFormat(size, bid.params.format);
    }).reduce(sortByPreferredSize, []).slice(0, 1).forEach(function (preferredSize) {
      var _mapDeprecatedSizeAnd = mapDeprecatedSizeAndFormat(preferredSize, bid.params.format),
          _mapDeprecatedSizeAnd2 = _slicedToArray(_mapDeprecatedSizeAnd, 2),
          size = _mapDeprecatedSizeAnd2[0],
          format = _mapDeprecatedSizeAnd2[1];

      placementids.push(bid.params.placementId);
      adformats.push(format || size);
      sizes.push(size);
      sdk.push(sdkVersion(format));
      platforms.push(bid.params.platform);
      requestIds.push(bid.bidId);
    });
  }); // Build URL

  var testmode = isTestmode();
  var pageurl = getTopWindowUrlEncoded();
  var platform = findPlatform(platforms);
  var cb = Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["generateUUID"])();
  var search = {
    placementids: placementids,
    adformats: adformats,
    testmode: testmode,
    pageurl: pageurl,
    sdk: sdk,
    adapterver: adapterver,
    platform: platform,
    platver: platver,
    cb: cb
  };
  var video = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find_index___default()(adformats, isVideo);

  if (video !== -1) {
    var _expandSize = expandSize(sizes[video]);

    var _expandSize2 = _slicedToArray(_expandSize, 2);

    search.playerwidth = _expandSize2[0];
    search.playerheight = _expandSize2[1];
  }

  var data = Object(__WEBPACK_IMPORTED_MODULE_1__src_url__["b" /* formatQS */])(search);
  return [{
    adformats: adformats,
    data: data,
    method: method,
    requestIds: requestIds,
    sizes: sizes,
    url: url
  }];
};
/**
 * Convert a server response to a bid response.
 * @param {Object} response - object representing the response
 * @param {Object} response.body - response body, already converted from JSON
 * @param {Object} bidRequests - the original bid requests
 * @param {Array} bidRequest.adformats - list of formats for the original bid requests
 * @param {Array} bidRequest.sizes - list of sizes fot the original bid requests
 * @returns {Array<Object>} A list of bid response objects
 */


var interpretResponse = function interpretResponse(_ref, _ref2) {
  var body = _ref.body;
  var adformats = _ref2.adformats,
      requestIds = _ref2.requestIds,
      sizes = _ref2.sizes;
  var _body$bids = body.bids,
      bids = _body$bids === void 0 ? {} : _body$bids;
  return Object.keys(bids) // extract Array of bid responses
  .map(function (placementId) {
    return bids[placementId];
  }) // flatten
  .reduce(function (a, b) {
    return a.concat(b);
  }, []) // transform to bidResponse
  .map(function (bid, i) {
    var fbBidid = bid.bid_id,
        creativeId = bid.placement_id,
        cpm = bid.bid_price_cents;
    var format = adformats[i];

    var _expandSize3 = expandSize(flattenSize(sizes[i])),
        _expandSize4 = _slicedToArray(_expandSize3, 2),
        width = _expandSize4[0],
        height = _expandSize4[1];

    var ad = createAdHtml(creativeId, format, fbBidid);
    var requestId = requestIds[i];
    var bidResponse = {
      // Prebid attributes
      requestId: requestId,
      cpm: cpm / 100,
      width: width,
      height: height,
      ad: ad,
      ttl: ttl,
      creativeId: creativeId,
      netRevenue: netRevenue,
      currency: currency,
      // Audience Network attributes
      hb_bidder: hbBidder,
      fb_bidid: fbBidid,
      fb_format: format,
      fb_placementid: creativeId
    }; // Video attributes

    if (isVideo(format)) {
      var pageurl = getTopWindowUrlEncoded();
      bidResponse.mediaType = 'video';
      bidResponse.vastUrl = "https://an.facebook.com/v1/instream/vast.xml?placementid=".concat(creativeId, "&pageurl=").concat(pageurl, "&playerwidth=").concat(width, "&playerheight=").concat(height, "&bidid=").concat(fbBidid);
      bidResponse.ttl = videoTtl;
    }

    return bidResponse;
  });
};
/**
 * Covert bid param types for S2S
 * @param {Object} params bid params
 * @param {Boolean} isOpenRtb boolean to check openrtb2 protocol
 * @return {Object} params bid params
 */


var transformBidParams = function transformBidParams(params, isOpenRtb) {
  return Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["convertTypes"])({
    'placementId': 'string'
  }, params);
};

var spec = {
  code: code,
  supportedMediaTypes: supportedMediaTypes,
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  transformBidParams: transformBidParams
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[204]);