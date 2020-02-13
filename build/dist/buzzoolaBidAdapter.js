pbjsChunk([228],{

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(227);


/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_video__ = __webpack_require__(31);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var BIDDER_CODE = 'buzzoola';
var ENDPOINT = 'https://exchange.buzzoola.com/ssp/prebidjs';
var RENDERER_SRC = 'https://tube.buzzoola.com/new/build/buzzlibrary.js';
var spec = {
  code: BIDDER_CODE,
  aliases: ['buzzoolaAdapter'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return {boolean} True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var types = bid.mediaTypes;
    return !!(bid && bid.mediaTypes && (types.banner || types.video) && bid.params && bid.params.placementId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests an array of bids
   * @param bidderRequest
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return {
      url: ENDPOINT,
      method: 'POST',
      data: bidderRequest
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @param bidderRequest
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(_ref, _ref2) {
    var body = _ref.body;
    var data = _ref2.data;
    var requestBids = {};
    var response;

    try {
      response = JSON.parse(body);
    } catch (ex) {
      response = body;
    }

    if (!Array.isArray(response)) response = [];
    data.bids.forEach(function (bid) {
      return requestBids[bid.bidId] = bid;
    });
    return response.map(function (bid) {
      var requestBid = requestBids[bid.requestId];
      var context = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](requestBid, 'mediaTypes.video.context');
      var validBid = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepClone"](bid);

      if (validBid.mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */] && context === __WEBPACK_IMPORTED_MODULE_4__src_video__["b" /* OUTSTREAM */]) {
        var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer__["a" /* Renderer */].install({
          id: validBid.requestId,
          url: RENDERER_SRC,
          loaded: false
        });
        renderer.setRender(setOutstreamRenderer);
        validBid.renderer = renderer;
      }

      return validBid;
    });
  }
};
/**
 * Initialize Buzzoola Outstream player
 *
 * @param bid
 */

function setOutstreamRenderer(bid) {
  var adData = JSON.parse(bid.ad);
  var unitSettings = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](adData, 'placement.unit_settings');
  var extendedSettings = {
    width: '' + bid.width,
    height: '' + bid.height,
    container_height: '' + bid.height
  };
  adData.placement = _extends({}, adData.placement);
  adData.placement.unit_settings = _extends({}, unitSettings, extendedSettings);
  bid.renderer.push(function () {
    window.Buzzoola.Core.install(document.querySelector("#".concat(bid.adUnitCode)), {
      data: adData
    });
  });
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[226]);