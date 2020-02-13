pbjsChunk([110],{

/***/ 506:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(507);


/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var BIDDER_CODE = 'rads';
var ENDPOINT_URL = 'https://rads.recognified.net/md.request.php';
var ENDPOINT_URL_DEV = 'https://dcradn1.online-solution.biz/md.request.php';
var DEFAULT_VAST_FORMAT = 'vast2';
var spec = {
  code: BIDDER_CODE,
  aliases: ['rads'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placement;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bidRequest) {
      var params = bidRequest.params;
      var videoData = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video') || {};
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](videoData.playerSize || bidRequest.sizes)[0];

      var _sizes$split = sizes.split('x'),
          _sizes$split2 = _slicedToArray(_sizes$split, 2),
          width = _sizes$split2[0],
          height = _sizes$split2[1];

      var placementId = params.placement;
      var rnd = Math.floor(Math.random() * 99999999999);
      var referrer = encodeURIComponent(bidderRequest.refererInfo.referer);
      var bidId = bidRequest.bidId;
      var isDev = params.devMode || false;
      var endpoint = isDev ? ENDPOINT_URL_DEV : ENDPOINT_URL;
      var payload = {};

      if (isVideoRequest(bidRequest)) {
        var vastFormat = params.vastFormat || DEFAULT_VAST_FORMAT;
        payload = {
          rt: vastFormat,
          _f: 'prebid_js',
          _ps: placementId,
          srw: width,
          srh: height,
          idt: 100,
          rnd: rnd,
          p: referrer,
          bid_id: bidId
        };
      } else {
        payload = {
          rt: 'bid-response',
          _f: 'prebid_js',
          _ps: placementId,
          srw: width,
          srh: height,
          idt: 100,
          rnd: rnd,
          p: referrer,
          bid_id: bidId
        };
      }

      prepareExtraParams(params, payload);
      return {
        method: 'GET',
        url: endpoint,
        data: objectToQueryString(payload)
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var response = serverResponse.body;
    var crid = response.crid || 0;
    var cpm = response.cpm / 1000000 || 0;

    if (cpm !== 0 && crid !== 0) {
      var dealId = response.dealid || '';
      var currency = response.currency || 'EUR';
      var netRevenue = response.netRevenue === undefined ? true : response.netRevenue;
      var bidResponse = {
        requestId: response.bid_id,
        cpm: cpm,
        width: response.width,
        height: response.height,
        creativeId: crid,
        dealId: dealId,
        currency: currency,
        netRevenue: netRevenue,
        ttl: __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('_bidderTimeout')
      };

      if (response.vastXml) {
        bidResponse.vastXml = response.vastXml;
        bidResponse.mediaType = 'video';
      } else {
        bidResponse.ad = response.adTag;
      }

      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};

function objectToQueryString(obj, prefix) {
  var str = [];
  var p;

  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p;
      var v = obj[p];
      str.push(v !== null && _typeof(v) === 'object' ? objectToQueryString(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }

  return str.join('&');
}
/**
 * Check if it's a video bid request
 *
 * @param {BidRequest} bid - Bid request generated from ad slots
 * @returns {boolean} True if it's a video bid
 */


function isVideoRequest(bid) {
  return bid.mediaType === 'video' || !!__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video');
}

function prepareExtraParams(params, payload) {
  if (params.pfilter !== undefined) {
    payload.pfilter = params.pfilter;
  }

  if (params.bcat !== undefined) {
    payload.bcat = params.bcat;
  }

  if (params.dvt !== undefined) {
    payload.dvt = params.dvt;
  }

  if (params.latitude !== undefined) {
    payload.latitude = params.latitude;
  }

  if (params.longitude !== undefined) {
    payload.longitude = params.longitude;
  }

  if (params.ip !== undefined) {
    payload.i = params.ip;
  }
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[506]);