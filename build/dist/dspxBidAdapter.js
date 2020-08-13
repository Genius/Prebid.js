pbjsChunk([232],{

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(383);


/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var BIDDER_CODE = 'dspx';
var ENDPOINT_URL = 'https://buyer.dspx.tv/request/';
var ENDPOINT_URL_DEV = 'https://dcbuyer.dspx.tv/request/';
var DEFAULT_VAST_FORMAT = 'vast2';
var spec = {
  code: BIDDER_CODE,
  aliases: ['dspx'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placement;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bidRequest) {
      var params = bidRequest.params;
      var videoData = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video') || {};
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](videoData.playerSize || bidRequest.sizes)[0];

      var _sizes$split = sizes.split('x'),
          _sizes$split2 = _slicedToArray(_sizes$split, 2),
          width = _sizes$split2[0],
          height = _sizes$split2[1];

      var placementId = params.placement;
      var rnd = Math.floor(Math.random() * 99999999999);
      var referrer = bidderRequest.refererInfo.referer;
      var bidId = bidRequest.bidId;
      var isDev = params.devMode || false;
      var endpoint = isDev ? ENDPOINT_URL_DEV : ENDPOINT_URL;
      var payload = {};

      if (isVideoRequest(bidRequest)) {
        var vastFormat = params.vastFormat || DEFAULT_VAST_FORMAT;
        payload = {
          _f: vastFormat,
          alternative: 'prebid_js',
          inventory_item_id: placementId,
          srw: width,
          srh: height,
          idt: 100,
          rnd: rnd,
          ref: referrer,
          bid_id: bidId
        };
      } else {
        payload = {
          _f: 'html',
          alternative: 'prebid_js',
          inventory_item_id: placementId,
          srw: width,
          srh: height,
          idt: 100,
          rnd: rnd,
          ref: referrer,
          bid_id: bidId
        };
      }

      if (params.pfilter !== undefined) {
        payload.pfilter = params.pfilter;
      }

      if (bidderRequest && bidderRequest.gdprConsent) {
        if (payload.pfilter !== undefined) {
          if (!payload.pfilter.gdpr_consent) {
            payload.pfilter.gdpr_consent = bidderRequest.gdprConsent.consentString;
            payload.pfilter.gdpr = bidderRequest.gdprConsent.gdprApplies;
          }
        } else {
          payload.pfilter = {
            'gdpr_consent': bidderRequest.gdprConsent.consentString,
            'gdpr': bidderRequest.gdprConsent.gdprApplies
          };
        }
      }

      if (params.bcat !== undefined) {
        payload.bcat = params.bcat;
      }

      if (params.dvt !== undefined) {
        payload.dvt = params.dvt;
      }

      if (isDev) {
        payload.prebidDevMode = 1;
      }

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
        type: response.type,
        ttl: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('_bidderTimeout')
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
  return bid.mediaType === 'video' || !!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video');
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[382]);