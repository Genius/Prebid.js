pbjsChunk([217],{

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(417);


/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var ENDPOINT = 'https://hb.gammaplatform.com';
var ENDPOINT_USERSYNC = 'https://cm-supply-web.gammaplatform.com';
var BIDDER_CODE = 'gamma';
var spec = {
  code: BIDDER_CODE,
  aliases: ['gamma'],
  supportedMediaTypes: ['banner', 'video'],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.siteId || bid.params.zoneId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var serverRequests = [];
    var bidderRequestReferer = bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer || '';

    for (var i = 0, len = bidRequests.length; i < len; i++) {
      var gaxObjParams = bidRequests[i];
      serverRequests.push({
        method: 'GET',
        url: ENDPOINT + '/adx/request?wid=' + gaxObjParams.params.siteId + '&zid=' + gaxObjParams.params.zoneId + '&hb=pbjs&bidid=' + gaxObjParams.bidId + '&urf=' + encodeURIComponent(bidderRequestReferer)
      });
    }

    return serverRequests;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse) {
    serverResponse = serverResponse.body;
    var bids = [];

    if (serverResponse.id) {
      var bid = newBid(serverResponse);
      bids.push(bid);
    }

    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: ENDPOINT_USERSYNC + '/adx/usersync'
      }];
    }
  }
};
/**
 * Unpack the Server's Bid into a Prebid-compatible one.
 * @param serverBid
 * @return Bid
 */

function newBid(serverBid) {
  var bid = {
    ad: serverBid.seatbid[0].bid[0].adm,
    cpm: serverBid.seatbid[0].bid[0].price,
    creativeId: serverBid.seatbid[0].bid[0].adid,
    currency: serverBid.cur,
    dealId: serverBid.seatbid[0].bid[0].dealid,
    width: serverBid.seatbid[0].bid[0].w,
    height: serverBid.seatbid[0].bid[0].h,
    mediaType: serverBid.type,
    netRevenue: true,
    requestId: serverBid.id,
    ttl: serverBid.seatbid[0].bid[0].ttl || 300
  };

  if (serverBid.type == 'video') {
    _extends(bid, {
      vastXml: serverBid.seatbid[0].bid[0].vastXml,
      vastUrl: serverBid.seatbid[0].bid[0].vastUrl,
      ttl: 3600
    });
  }

  return bid;
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[416]);