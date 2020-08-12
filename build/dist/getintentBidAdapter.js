pbjsChunk([142],{

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(281);


/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);


var BIDDER_CODE = 'getintent';
var IS_NET_REVENUE = true;
var BID_HOST = 'px.adhigh.net';
var BID_BANNER_PATH = '/rtb/direct_banner';
var BID_VIDEO_PATH = '/rtb/direct_vast';
var BID_RESPONSE_TTL_SEC = 360;
var VIDEO_PROPERTIES = ['protocols', 'mimes', 'min_dur', 'max_dur', 'min_btr', 'max_btr', 'vi_format', 'api', 'skippable'];
var OPTIONAL_PROPERTIES = ['cur', 'floor', 'sid'];
var spec = {
  code: BIDDER_CODE,
  aliases: ['getintentAdapter'],
  supportedMediaTypes: ['video', 'banner'],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid to validate.
   * @return {boolean} True if this is a valid bid, and false otherwise.
   * */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.pid && bid.params.tid);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests - an array of bids.
   * @return ServerRequest[]
   */
  buildRequests: function buildRequests(bidRequests) {
    return bidRequests.map(function (bidRequest) {
      var giBidRequest = buildGiBidRequest(bidRequest);
      return {
        method: 'GET',
        url: buildUrl(giBidRequest),
        data: giBidRequest
      };
    });
  },

  /**
   * Callback for bids, after the call to DSP completes.
   * Parse the response from the server into a list of bids.
   *
   * @param {object} serverResponse A response from the GetIntent's server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse) {
    var responseBody = serverResponse.body;
    var bids = [];

    if (responseBody && responseBody.no_bid !== 1) {
      var size = parseSize(responseBody.size);
      var bid = {
        requestId: responseBody.bid_id,
        ttl: BID_RESPONSE_TTL_SEC,
        netRevenue: IS_NET_REVENUE,
        currency: responseBody.currency,
        creativeId: responseBody.creative_id,
        cpm: responseBody.cpm,
        width: size[0],
        height: size[1]
      };

      if (responseBody.vast_url) {
        bid.mediaType = 'video';
        bid.vastUrl = responseBody.vast_url;
      } else {
        bid.mediaType = 'banner';
        bid.ad = responseBody.ad;
      }

      bids.push(bid);
    }

    return bids;
  }
};

function buildUrl(bid) {
  return 'https://' + BID_HOST + (bid.is_video ? BID_VIDEO_PATH : BID_BANNER_PATH);
}
/**
 * Builds GI bid request from BidRequest.
 *
 * @param {BidRequest} bidRequest.
 * @return {object} GI bid request.
 * */


function buildGiBidRequest(bidRequest) {
  var giBidRequest = {
    bid_id: bidRequest.bidId,
    pid: bidRequest.params.pid,
    // required
    tid: bidRequest.params.tid,
    // required
    known: bidRequest.params.known || 1,
    is_video: bidRequest.mediaType === 'video',
    resp_type: 'JSON',
    provider: 'direct.prebidjs'
  };

  if (bidRequest.sizes) {
    giBidRequest.size = produceSize(bidRequest.sizes);
  }

  addVideo(bidRequest.params.video, giBidRequest);
  addOptional(bidRequest.params, giBidRequest, OPTIONAL_PROPERTIES);
  return giBidRequest;
}

function addVideo(video, giBidRequest) {
  if (giBidRequest.is_video && video) {
    for (var i = 0, l = VIDEO_PROPERTIES.length; i < l; i++) {
      var key = VIDEO_PROPERTIES[i];

      if (video.hasOwnProperty(key)) {
        giBidRequest[key] = Array.isArray(video[key]) ? video[key].join(',') : video[key];
      }
    }
  }
}

function addOptional(params, request, props) {
  for (var i = 0; i < props.length; i++) {
    if (params.hasOwnProperty(props[i])) {
      request[props[i]] = params[props[i]];
    }
  }
}
/**
 * @param {String} s The string representing a size (e.g. "300x250").
 * @return {Number[]} An array with two elements: [width, height] (e.g.: [300, 250]).
 * */


function parseSize(s) {
  return s.split('x').map(Number);
}
/**
 * @param {Array} sizes An array of sizes/numbers to be joined into single string.
 *                      May be an array (e.g. [300, 250]) or array of arrays (e.g. [[300, 250], [640, 480]].
 * @return {String} The string with sizes, e.g. array of sizes [[50, 50], [80, 80]] becomes "50x50,80x80" string.
 * */


function produceSize(sizes) {
  function sizeToStr(s) {
    if (Array.isArray(s) && s.length === 2 && Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["isInteger"])(s[0]) && Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["isInteger"])(s[1])) {
      return s.join('x');
    } else {
      throw "Malformed parameter 'sizes'";
    }
  }

  if (Array.isArray(sizes) && Array.isArray(sizes[0])) {
    return sizes.map(sizeToStr).join(',');
  } else {
    return sizeToStr(sizes);
  }
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[280]);