pbjsChunk([93],{

/***/ 726:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(727);


/***/ }),

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var BIDDER_CODE = 'stv';
var VADS_ENDPOINT_URL = 'https://ads.smartstream.tv/r/';
var DEFAULT_VIDEO_SOURCE = 'vads';
var DEFAULT_BANNER_FORMAT = 'vast2';
var spec = {
  code: BIDDER_CODE,
  aliases: ['vads'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placement;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bidRequest) {
      var params = bidRequest.params;
      var videoData = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video') || {};
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](videoData.playerSize || bidRequest.sizes)[0];
      var width = sizes.split('x')[0];
      var height = sizes.split('x')[1];
      var placementId = params.placement;
      var rnd = Math.floor(Math.random() * 99999999999);
      var referrer = bidderRequest.refererInfo.referer;
      var bidId = bidRequest.bidId;
      var endpoint = VADS_ENDPOINT_URL;
      var payload = {};

      if (isVideoRequest(bidRequest)) {
        var source = params.source || DEFAULT_VIDEO_SOURCE;

        if (source === 'vads') {
          payload = {
            _f: 'vast2',
            alternative: 'prebid_js',
            _ps: placementId,
            srw: width,
            srh: height,
            idt: 100,
            rnd: rnd,
            ref: referrer,
            bid_id: bidId
          };
          endpoint = VADS_ENDPOINT_URL;
        }
      } else {
        var outputFormat = params.format || DEFAULT_BANNER_FORMAT;
        payload = {
          _f: outputFormat,
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
      str.push(v !== null && _typeof(v) === 'object' ? objectToQueryString(v, k) : encodeURIComponent(k) + '=' + (k == '_ps' ? v : encodeURIComponent(v)));
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

function prepareExtraParams(params, payload) {
  if (params.pfilter !== undefined) {
    payload.pfilter = params.pfilter;
  }

  if (params.bcat !== undefined) {
    payload.bcat = params.bcat;
  }

  if (params.noskip !== undefined) {
    payload.noskip = params.noskip;
  }

  if (params.dvt !== undefined) {
    payload.dvt = params.dvt;
  }
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[726]);