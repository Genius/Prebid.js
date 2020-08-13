pbjsChunk([84],{

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(747);


/***/ }),

/***/ 747:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADAPTER_VERSION", function() { return ADAPTER_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable no-tabs */



var ADAPTER_VERSION = '1';
var SUPPORTED_AD_TYPES = [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]];
var BIDDER_CODE = 'tpmn';
var URL = 'https://ad.tpmn.co.kr/prebidhb.tpmn';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: SUPPORTED_AD_TYPES,

  /**
   *Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return 'params' in bid && 'inventoryId' in bid.params && 'publisherId' in bid.params && !isNaN(Number(bid.params.inventoryId)) && bid.params.inventoryId > 0 && typeof bid.mediaTypes.banner.sizes != 'undefined'; // only accepting appropriate sizes
  },

  /**
  * @param {BidRequest[]} bidRequests
  * @param {*} bidderRequest
  * @return {ServerRequest}
  */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    if (bidRequests.length === 0) {
      return [];
    }

    var bids = bidRequests.map(bidToRequest);
    var bidderApiUrl = URL;
    var payload = {
      'bids': _toConsumableArray(bids),
      'site': createSite(bidderRequest.refererInfo)
    };
    return [{
      method: 'POST',
      url: bidderApiUrl,
      data: payload
    }];
  },

  /**
  * Unpack the response from the server into a list of bids.
  *
  * @param {serverResponse} serverResponse A successful response from the server.
  * @return {Bid[]} An array of bids which were nested inside the server.
  */
  interpretResponse: function interpretResponse(serverResponse, serverRequest) {
    if (!Array.isArray(serverResponse.body)) {
      return [];
    } // server response body is an array of bid results


    var bidResults = serverResponse.body; // our server directly returns the format needed by prebid.js so no more
    // transformation is needed here.

    return bidResults;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);
/**
 * Creates site description object
 */

function createSite(refInfo) {
  var url = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["parseUrl"](refInfo.referer);
  var site = {
    'domain': url.hostname,
    'page': url.protocol + '://' + url.hostname + url.pathname
  };

  if (self === top && document.referrer) {
    site.ref = document.referrer;
  }

  var keywords = document.getElementsByTagName('meta')['keywords'];

  if (keywords && keywords.content) {
    site.keywords = keywords.content;
  }

  return site;
}

function parseSize(size) {
  var sizeObj = {};
  sizeObj.width = parseInt(size[0], 10);
  sizeObj.height = parseInt(size[1], 10);
  return sizeObj;
}

function parseSizes(sizes) {
  if (Array.isArray(sizes[0])) {
    // is there several sizes ? (ie. [[728,90],[200,300]])
    return sizes.map(function (size) {
      return parseSize(size);
    });
  }

  return [parseSize(sizes)]; // or a single one ? (ie. [728,90])
}

function getBannerSizes(bidRequest) {
  return parseSizes(__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.banner.sizes') || bidRequest.sizes);
}

function bidToRequest(bid) {
  var bidObj = {};
  bidObj.sizes = getBannerSizes(bid);
  bidObj.inventoryId = bid.params.inventoryId;
  bidObj.publisherId = bid.params.publisherId;
  bidObj.bidId = bid.bidId;
  bidObj.adUnitCode = bid.adUnitCode;
  bidObj.auctionId = bid.auctionId;
  return bidObj;
}

/***/ })

},[746]);