pbjsChunk([141],{

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(432);


/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var ADMIXER_ENDPOINT = 'https://adn.admixer.co.kr:10443/prebid';
var DEFAULT_BID_TTL = 360;
var DEFAULT_CURRENCY = 'USD';
var DEFAULT_REVENUE = false;
var spec = {
  code: 'nasmediaAdmixer',
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.ax_key);
  },
  buildRequests: function buildRequests(validBidRequests) {
    return validBidRequests.map(function (bid) {
      var adSize = getSize(bid.sizes);
      return {
        method: 'GET',
        url: ADMIXER_ENDPOINT,
        data: {
          ax_key: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('ax_key', bid.params),
          req_id: bid.bidId,
          width: adSize.width,
          height: adSize.height,
          referrer: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
          os: getOsType()
        }
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var serverBody = serverResponse.body;
    var bidResponses = [];

    if (serverBody && serverBody.error_code === 0 && serverBody.body && serverBody.body.length > 0) {
      var bidData = serverBody.body[0];
      var bidResponse = {
        ad: bidData.ad,
        requestId: serverBody.req_id,
        creativeId: bidData.ad_id,
        cpm: bidData.cpm,
        width: bidData.width,
        height: bidData.height,
        currency: bidData.currency ? bidData.currency : DEFAULT_CURRENCY,
        netRevenue: DEFAULT_REVENUE,
        ttl: DEFAULT_BID_TTL
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};

function getOsType() {
  var ua = navigator.userAgent.toLowerCase();
  var os = ['android', 'ios', 'mac', 'linux', 'window'];
  var regexpOs = [/android/i, /iphone|ipad/i, /mac/i, /linux/i, /window/i];
  return __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_find___default()(os, function (tos, idx) {
    if (ua.match(regexpOs[idx])) {
      return os[idx];
    }
  }) || 'etc';
}

function getSize(sizes) {
  var parsedSizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](sizes);

  var _ref = parsedSizes.length ? parsedSizes[0].split('x') : [],
      _ref2 = _slicedToArray(_ref, 2),
      width = _ref2[0],
      height = _ref2[1];

  return {
    width: parseInt(width, 10),
    height: parseInt(height, 10)
  };
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[431]);