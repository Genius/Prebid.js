pbjsChunk([36],{

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(539);


/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_Renderer__ = __webpack_require__(11);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Vuble Adapter



var BIDDER_CODE = 'vuble';
var ENVS = ['com', 'net'];
var CURRENCIES = {
  com: 'EUR',
  net: 'USD'
};
var TTL = 60;

var outstreamRender = function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.ANOutstreamVideo.renderAd({
      sizes: [bid.width, bid.height],
      targetId: bid.adUnitCode,
      adResponse: bid.adResponse,
      rendererOptions: {
        showBigPlayButton: false,
        showProgressBar: 'bar',
        showVolume: false,
        allowFullscreen: true,
        skippable: false
      }
    });
  });
};

var createRenderer = function createRenderer(bid, serverResponse) {
  var renderer = __WEBPACK_IMPORTED_MODULE_2__src_Renderer__["a" /* Renderer */].install({
    id: serverResponse.renderer_id,
    url: serverResponse.renderer_url,
    loaded: false
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  return renderer;
};

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['video'],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var rawSizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.playerSize') || bid.sizes;

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](rawSizes) || __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](rawSizes).length == 0) {
      return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.context')) {
      return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["contains"](ENVS, bid.params.env)) {
      return false;
    }

    return !!(bid.params.env && bid.params.pubId && bid.params.zoneId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bidRequest) {
      // We take the first size
      var rawSize = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video.playerSize') || bidRequest.sizes;
      var size = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](rawSize)[0].split('x'); // Get the page's url

      var referer = bidderRequest && bidderRequest.refererInfo ? bidderRequest.refererInfo.referer : '';

      if (bidRequest.params.referrer) {
        referer = bidRequest.params.referrer;
      } // Get Video Context


      var context = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video.context');
      var url = 'https://player.mediabong.' + bidRequest.params.env + '/prebid/request';
      var data = {
        width: size[0],
        height: size[1],
        pub_id: bidRequest.params.pubId,
        zone_id: bidRequest.params.zoneId,
        context: context,
        floor_price: bidRequest.params.floorPrice ? bidRequest.params.floorPrice : 0,
        url: referer,
        env: bidRequest.params.env,
        bid_id: bidRequest.bidId,
        adUnitCode: bidRequest.adUnitCode
      };
      return {
        method: 'POST',
        url: url,
        data: data
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var responseBody = serverResponse.body;

    if (_typeof(responseBody) !== 'object' || responseBody.status !== 'ok') {
      return [];
    }

    var bids = [];
    var bid = {
      requestId: bidRequest.data.bid_id,
      cpm: responseBody.cpm,
      width: bidRequest.data.width,
      height: bidRequest.data.height,
      ttl: TTL,
      creativeId: responseBody.creativeId,
      dealId: responseBody.dealId,
      netRevenue: true,
      currency: CURRENCIES[bidRequest.data.env],
      vastUrl: responseBody.url,
      mediaType: 'video'
    };

    if (responseBody.renderer_url) {
      var adResponse = {
        ad: {
          video: {
            content: responseBody.content
          }
        }
      };

      _extends(bid, {
        adResponse: adResponse,
        adUnitCode: bidRequest.data.adUnitCode,
        renderer: createRenderer(bid, responseBody)
      });
    }

    bids.push(bid);
    return bids;
  },

  /**
   * Register the user sync pixels which should be dropped after the auction.
   *
   * @param {SyncOptions} syncOptions Which user syncs are allowed?
   * @param {ServerResponse[]} serverResponses List of server's responses.
   * @return {UserSync[]} The user syncs which should be dropped.
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (syncOptions.iframeEnabled) {
      if (serverResponses.length > 0) {
        var responseBody = serverResponses[0].body;

        if (_typeof(responseBody) !== 'object' || responseBody.iframeSync) {
          return [{
            type: 'iframe',
            url: responseBody.iframeSync
          }];
        }
      }
    }

    return [];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[538]);