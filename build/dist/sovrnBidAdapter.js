pbjsChunk([8],{

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(345);
module.exports = __webpack_require__(346);


/***/ }),

/***/ 345:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _bidderFactory = __webpack_require__(6);

var _mediaTypes = __webpack_require__(12);

var _constants = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var spec = exports.spec = {
  code: 'sovrn',
  supportedMediaTypes: [_mediaTypes.BANNER],

  /**
   * Check if the bid is a valid zone ID in either number or string form
   * @param {object} bid the Sovrn bid to validate
   * @return boolean for whether or not a bid is valid
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.tagid && !isNaN(parseFloat(bid.params.tagid)) && isFinite(bid.params.tagid));
  },

  /**
   * Format the bid request object for our endpoint
   * @param {BidRequest[]} bidRequests Array of Sovrn bidders
   * @return object of parameters for Prebid AJAX request
   */
  buildRequests: function buildRequests(bidReqs) {
    var sovrnImps = [];
    var iv = void 0;
    utils._each(bidReqs, (function (bid) {
      sovrnImps.push({
        id: bid.bidId,
        banner: { w: 1, h: 1 },
        tagid: String(utils.getBidIdParameter('tagid', bid.params)),
        bidfloor: utils.getBidIdParameter('bidfloor', bid.params)
      });
      iv = iv || utils.getBidIdParameter('iv', bid.params);
    }));
    var sovrnBidReq = {
      id: utils.getUniqueIdentifierStr(),
      imp: sovrnImps,
      site: {
        domain: window.location.host,
        page: window.location.host + window.location.pathname + location.search + location.hash
      }
    };
    if (iv) sovrnBidReq.iv = iv;
    return {
      method: 'POST',
      url: '//ap.lijit.com/rtb/bid?src=' + _constants.REPO_AND_VERSION,
      data: JSON.stringify(sovrnBidReq),
      options: { contentType: 'text/plain' }
    };
  },

  /**
   * Format Sovrn responses as Prebid bid responses
   * @param {id, seatbid} sovrnResponse A successful response from Sovrn.
   * @return {Bid[]} An array of formatted bids.
  */
  interpretResponse: function interpretResponse(_ref) {
    var _ref$body = _ref.body,
        id = _ref$body.id,
        seatbid = _ref$body.seatbid;

    var sovrnBidResponses = [];
    if (id && seatbid && seatbid.length > 0 && seatbid[0].bid && seatbid[0].bid.length > 0) {
      seatbid[0].bid.map((function (sovrnBid) {
        sovrnBidResponses.push({
          requestId: sovrnBid.impid,
          cpm: parseFloat(sovrnBid.price),
          width: parseInt(sovrnBid.w),
          height: parseInt(sovrnBid.h),
          creativeId: sovrnBid.crid || sovrnBid.id,
          dealId: sovrnBid.dealId || null,
          currency: 'USD',
          netRevenue: true,
          mediaType: _mediaTypes.BANNER,
          ad: decodeURIComponent(sovrnBid.adm + '<img src="' + sovrnBid.nurl + '">'),
          ttl: 60000
        });
      }));
    }
    return sovrnBidResponses;
  }
};

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 346:
/***/ (function(module, exports) {



/***/ })

},[344]);