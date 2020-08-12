pbjsChunk([177],{

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(198);


/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
 // import {config} from 'src/config';


var BIDDER_CODE = 'bidglass';
var spec = {
  code: BIDDER_CODE,
  aliases: ['bg'],
  // short code

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.adUnitId && !isNaN(parseFloat(bid.params.adUnitId)) && isFinite(bid.params.adUnitId));
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    /*
    Sample array entry for validBidRequests[]:
    [{
      "bidder": "bidglass",
      "bidId": "51ef8751f9aead",
      "params": {
      "adUnitId": 11,
      ...
      },
      "adUnitCode": "div-gpt-ad-1460505748561-0",
      "transactionId": "d7b773de-ceaa-484d-89ca-d9f51b8d61ec",
      "sizes": [[320,50],[300,250],[300,600]],
      "bidderRequestId": "418b37f85e772c",
      "auctionId": "18fd8b8b0bd757",
      "bidRequestsCount": 1
    }]
    */
    var imps = [];

    var getReferer = function getReferer() {
      return window === window.top ? window.location.href : window.parent === window.top ? document.referrer : null;
    };

    var getOrigins = function getOrigins() {
      var ori = ['https://' + window.location.hostname];

      if (window.location.ancestorOrigins) {
        for (var i = 0; i < window.location.ancestorOrigins.length; i++) {
          ori.push(window.location.ancestorOrigins[i]);
        }
      } else if (window !== window.top) {
        // Derive the parent origin
        var parts = document.referrer.split('/');
        ori.push('https://' + parts[2]);

        if (window.parent !== window.top) {
          // Additional unknown origins exist
          ori.push('null');
        }
      }

      return ori;
    };

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (bid) {
      bid.sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bid.sizes) && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bid.sizes[0]) ? bid.sizes : [bid.sizes];
      bid.sizes = bid.sizes.filter(function (size) {
        return __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](size);
      }); // Stuff to send: [bid id, sizes, adUnitId]

      imps.push({
        bidId: bid.bidId,
        sizes: bid.sizes,
        adUnitId: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('adUnitId', bid.params)
      });
    }); // Stuff to send: page URL


    var bidReq = {
      reqId: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"](),
      imps: imps,
      ref: getReferer(),
      ori: getOrigins()
    };
    var url = 'https://bid.glass/ad/hb.php?' + "src=Genius_prebid_3.0.0";
    return {
      method: 'POST',
      url: url,
      data: JSON.stringify(bidReq),
      options: {
        contentType: 'text/plain',
        withCredentials: false
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
    var bidResponses = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](serverResponse.body.bidResponses, function (bid) {
      bidResponses.push({
        requestId: bid.requestId,
        cpm: parseFloat(bid.cpm),
        width: parseInt(bid.width, 10),
        height: parseInt(bid.height, 10),
        creativeId: bid.creativeId,
        dealId: bid.dealId || null,
        currency: bid.currency || 'USD',
        mediaType: bid.mediaType || 'banner',
        netRevenue: true,
        ttl: bid.ttl || 10,
        ad: bid.ad
      });
    });

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[197]);