pbjsChunk([252],{

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(169);


/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_find_index__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_find_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_find_index__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var URL = '//hb.adtelligent.com/auction/';
var OUTSTREAM_SRC = '//player.adtelligent.com/outstream-unit/2.01/outstream.min.js';
var BIDDER_CODE = 'adtelligent';
var OUTSTREAM = 'outstream';
var DISPLAY = 'display';
var spec = {
  code: BIDDER_CODE,
  aliases: ['onefiftytwomedia'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return bid && bid.params && bid.params.aid;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    function addSyncs(bid) {
      var uris = bid.cookieURLs;
      var types = bid.cookieURLSTypes || [];

      if (uris && uris.length) {
        uris.forEach(function (uri, i) {
          var type = types[i] || 'image';

          if (!syncOptions.pixelEnabled && type == 'image' || !syncOptions.iframeEnabled && type == 'iframe') {
            return;
          }

          syncs.push({
            type: type,
            url: uri
          });
        });
      }
    }

    if (syncOptions.pixelEnabled || syncOptions.iframeEnabled) {
      serverResponses && serverResponses.length && serverResponses.forEach(function (response) {
        if (response.body) {
          if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](response.body)) {
            response.body.forEach(function (b) {
              addSyncs(b);
            });
          } else {
            addSyncs(response.body);
          }
        }
      });
    }

    return syncs;
  },

  /**
   * Make a server request from the list of BidRequests
   * @param bidRequests
   * @param bidderRequest
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    return {
      data: bidToTag(bidRequests, bidderRequest),
      bidderRequest: bidderRequest,
      method: 'GET',
      url: URL
    };
  },

  /**
   * Unpack the response from the server into a list of bids
   * @param serverResponse
   * @param bidderRequest
   * @return {Bid[]} An array of bids which were nested inside the server
   */
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bidderRequest = _ref.bidderRequest;
    serverResponse = serverResponse.body;
    var bids = [];

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](serverResponse)) {
      return parseRTBResponse(serverResponse, bidderRequest);
    }

    serverResponse.forEach(function (serverBidResponse) {
      bids = __WEBPACK_IMPORTED_MODULE_0__src_utils__["flatten"](bids, parseRTBResponse(serverBidResponse, bidderRequest));
    });
    return bids;
  }
};

function parseRTBResponse(serverResponse, bidderRequest) {
  var isInvalidValidResp = !serverResponse || !serverResponse.bids || !serverResponse.bids.length;
  var bids = [];

  if (isInvalidValidResp) {
    var extMessage = serverResponse && serverResponse.ext && serverResponse.ext.message ? ": ".concat(serverResponse.ext.message) : '';
    var errorMessage = "in response for ".concat(bidderRequest.bidderCode, " adapter ").concat(extMessage);
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](errorMessage);
    return bids;
  }

  serverResponse.bids.forEach(function (serverBid) {
    var requestId = __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_find_index___default()(bidderRequest.bids, function (bidRequest) {
      return bidRequest.bidId === serverBid.requestId;
    });

    if (serverBid.cpm !== 0 && requestId !== -1) {
      var bid = createBid(serverBid, getMediaType(bidderRequest.bids[requestId]));
      bids.push(bid);
    }
  });
  return bids;
}

function bidToTag(bidRequests, bidderRequest) {
  var tag = {
    domain: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().hostname
  };

  if (bidderRequest && bidderRequest.gdprConsent && bidderRequest.gdprConsent.gdprApplies) {
    tag.gdpr = 1;
    tag.gdpr_consent = bidderRequest.gdprConsent.consentString;
  }

  for (var i = 0, length = bidRequests.length; i < length; i++) {
    _extends(tag, prepareRTBRequestParams(i, bidRequests[i]));
  }

  return tag;
}
/**
 * Parse mediaType
 * @param _index {number}
 * @param bid {object}
 * @returns {object}
 */


function prepareRTBRequestParams(_index, bid) {
  var _ref2;

  var mediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video') ? __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */] : DISPLAY;
  var index = !_index ? '' : "".concat(_index + 1);
  return _ref2 = {}, _defineProperty(_ref2, 'callbackId' + index, bid.bidId), _defineProperty(_ref2, 'aid' + index, bid.params.aid), _defineProperty(_ref2, 'ad_type' + index, mediaType), _defineProperty(_ref2, 'sizes' + index, __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bid.sizes).join()), _ref2;
}
/**
 * Prepare all parameters for request
 * @param bidderRequest {object}
 * @returns {object}
 */


function getMediaType(bidderRequest) {
  var videoMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidderRequest, 'mediaTypes.video');
  var context = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidderRequest, 'mediaTypes.video.context');
  return !videoMediaType ? DISPLAY : context === OUTSTREAM ? OUTSTREAM : __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */];
}
/**
 * Configure new bid by response
 * @param bidResponse {object}
 * @param mediaType {Object}
 * @returns {object}
 */


function createBid(bidResponse, mediaType) {
  var bid = {
    requestId: bidResponse.requestId,
    creativeId: bidResponse.cmpId,
    height: bidResponse.height,
    currency: bidResponse.cur,
    width: bidResponse.width,
    cpm: bidResponse.cpm,
    netRevenue: true,
    mediaType: mediaType,
    ttl: 3600
  };

  if (mediaType === DISPLAY) {
    return _extends(bid, {
      ad: bidResponse.ad
    });
  }

  _extends(bid, {
    vastUrl: bidResponse.vastUrl
  });

  if (mediaType === OUTSTREAM) {
    _extends(bid, {
      mediaType: 'video',
      adResponse: bidResponse,
      renderer: newRenderer(bidResponse.requestId)
    });
  }

  return bid;
}
/**
 * Create Adtelligent renderer
 * @param requestId
 * @returns {*}
 */


function newRenderer(requestId) {
  var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer__["a" /* Renderer */].install({
    id: requestId,
    url: OUTSTREAM_SRC,
    loaded: false
  });
  renderer.setRender(outstreamRender);
  return renderer;
}
/**
 * Initialise Adtelligent outstream
 * @param bid
 */


function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.VOutstreamAPI.initOutstreams([{
      width: bid.width,
      height: bid.height,
      vastUrl: bid.vastUrl,
      elId: bid.adUnitCode
    }]);
  });
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[168]);