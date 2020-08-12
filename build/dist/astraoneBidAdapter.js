pbjsChunk([182],{

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(188);


/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'astraone';
var SSP_ENDPOINT = 'https://ssp.astraone.io/auction/prebid';
var TTL = 60;

function buildBidRequests(validBidRequests) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils__["_map"](validBidRequests, function (validBidRequest) {
    var params = validBidRequest.params;
    var bidRequest = {
      bidId: validBidRequest.bidId,
      transactionId: validBidRequest.transactionId,
      sizes: validBidRequest.sizes,
      placement: params.placement,
      placeId: params.placeId,
      imageUrl: params.imageUrl
    };
    return bidRequest;
  });
}

function buildBid(bidData) {
  var bid = {
    requestId: bidData.bidId,
    cpm: bidData.price,
    width: bidData.width,
    height: bidData.height,
    creativeId: bidData.content.seanceId,
    currency: bidData.currency,
    netRevenue: true,
    mediaType: __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */],
    ttl: TTL,
    content: bidData.content
  };
  bid.ad = wrapAd(bid, bidData);
  return bid;
}

function getMediaTypeFromBid(bid) {
  return bid.mediaTypes && Object.keys(bid.mediaTypes)[0];
}

function wrapAd(bid, bidData) {
  return "<!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\">\n        <title></title>\n        <script src=\"https://st.astraone.io/prebidrenderer.js\"></script>\n        <style>html, body {width: 100%; height: 100%; margin: 0;}</style>\n    </head>\n    <body>\n        <div data-hyb-ssp-in-image-overlay=\"".concat(bidData.content.placeId, "\" style=\"width: 100%; height: 100%;\"></div>\n        <script>\n            if (parent.window.frames[window.name]) {\n                var parentDocument = window.parent.document.getElementById(parent.window.frames[window.name].name);\n                parentDocument.style.height = \"100%\";\n                parentDocument.style.width = \"100%\";\n            }\n            var _html = \"").concat(encodeURIComponent(JSON.stringify(bid)), "\";\n            window._ao_ssp.registerInImage(JSON.parse(decodeURIComponent(_html)));\n        </script>\n    </body>\n  </html>");
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return getMediaTypeFromBid(bid) === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */] && !!bid.params.placeId && !!bid.params.imageUrl && !!bid.params.placement && bid.params.placement === 'inImage';
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var payload = {
      url: bidderRequest.refererInfo.referer,
      cmp: !!bidderRequest.gdprConsent,
      bidRequests: buildBidRequests(validBidRequests)
    };

    if (payload.cmp) {
      var gdprApplies = bidderRequest.gdprConsent.gdprApplies;
      if (gdprApplies !== undefined) payload['ga'] = gdprApplies;
      payload['cs'] = bidderRequest.gdprConsent.consentString;
    }

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: SSP_ENDPOINT,
      data: payloadString,
      options: {
        contentType: 'application/json'
      }
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse) {
    var serverBody = serverResponse.body;

    if (serverBody && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](serverBody)) {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils__["_map"](serverBody, function (bid) {
        return buildBid(bid);
      });
    } else {
      return [];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[187]);