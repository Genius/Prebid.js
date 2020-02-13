pbjsChunk([183],{

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(333);


/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'gjirafa';
var ENDPOINT_URL = 'https://gjc.gjirafa.com/Home/GetBid';
var DIMENSION_SEPARATOR = 'x';
var SIZE_SEPARATOR = ';';
var spec = {
  code: BIDDER_CODE,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return bid.params && (!!bid.params.placementId || !!bid.params.minCPM && !!bid.params.minCPC);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bidRequest) {
      var gjid = Math.floor(Math.random() * 99999999);
      var sizes = generateSizeParam(bidRequest.sizes);
      var configId = bidRequest.params.placementId || '';
      var minCPM = bidRequest.params.minCPM || 0.0;
      var minCPC = bidRequest.params.minCPC || 0.0;
      var allowExplicit = bidRequest.params.explicit || 0;
      var body = {
        gjid: gjid,
        sizes: sizes,
        configId: configId,
        minCPM: minCPM,
        minCPC: minCPC,
        allowExplicit: allowExplicit,
        referrer: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
        requestid: bidRequest.bidderRequestId,
        bidid: bidRequest.bidId
      };

      if (document.referrer) {
        body.referrer = document.referrer;
      }

      if (bidderRequest && bidderRequest.gdprConsent) {
        body.consent_string = bidderRequest.gdprConsent.consentString;
        body.consent_required = typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' ? bidderRequest.gdprConsent.gdprApplies : true;
      }

      return {
        method: 'GET',
        url: ENDPOINT_URL,
        data: body
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
    var serverBody = serverResponse.body;
    var bidResponses = [];
    var bidResponse = {
      requestId: bidRequest.data.bidid,
      cpm: serverBody.CPM,
      width: serverBody.Width,
      height: serverBody.Height,
      creativeId: serverBody.CreativeId,
      currency: serverBody.Currency,
      netRevenue: serverBody.NetRevenue,
      ttl: serverBody.TTL,
      referrer: serverBody.Referrer,
      ad: serverBody.Ad
    };
    bidResponses.push(bidResponse);
    return bidResponses;
  }
};
/**
* Generate size param for bid request using sizes array
*
* @param {Array} sizes Possible sizes for the ad unit.
* @return {string} Processed sizes param to be used for the bid request.
*/

function generateSizeParam(sizes) {
  return sizes.map(function (size) {
    return size.join(DIMENSION_SEPARATOR);
  }).join(SIZE_SEPARATOR);
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[332]);