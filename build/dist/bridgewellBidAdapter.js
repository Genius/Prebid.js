pbjsChunk([45],{

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(155);
module.exports = __webpack_require__(156);


/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _bidderFactory = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var BIDDER_CODE = 'bridgewell';
var REQUEST_ENDPOINT = '//rec.scupio.com/recweb/prebid.aspx';

var spec = exports.spec = {
  code: BIDDER_CODE,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return bid && bid.params && !!bid.params.ChannelID;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests) {
    var channelIDs = [];

    utils._each(validBidRequests, (function (bid) {
      channelIDs.push(bid.params.ChannelID);
    }));

    return {
      method: 'GET',
      url: REQUEST_ENDPOINT,
      data: {
        'ChannelID': channelIDs.join(',')
      },
      validBidRequests: validBidRequests
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @param {*} bidRequest
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];

    // map responses to requests
    utils._each(bidRequest.validBidRequests, (function (req) {
      var bidResponse = {};

      if (!serverResponse.body) {
        return;
      }

      var matchedResponse = serverResponse.body.find((function (res) {
        return !!res && !res.consumed && req.sizes.find((function (size) {
          return res.width === size[0] && res.height === size[1];
        }));
      }));

      if (matchedResponse) {
        matchedResponse.consumed = true;

        // check required parameters
        if (typeof matchedResponse.cpm !== 'number') {
          return;
        } else if (typeof matchedResponse.width !== 'number' || typeof matchedResponse.height !== 'number') {
          return;
        } else if (typeof matchedResponse.ad !== 'string') {
          return;
        } else if (typeof matchedResponse.net_revenue === 'undefined') {
          return;
        } else if (typeof matchedResponse.currency !== 'string') {
          return;
        }

        bidResponse.requestId = req.bidId;
        bidResponse.cpm = matchedResponse.cpm;
        bidResponse.width = matchedResponse.width;
        bidResponse.height = matchedResponse.height;
        bidResponse.ad = matchedResponse.ad;
        bidResponse.ttl = matchedResponse.ttl;
        bidResponse.creativeId = matchedResponse.id;
        bidResponse.netRevenue = matchedResponse.net_revenue === 'true';
        bidResponse.currency = matchedResponse.currency;

        bidResponses.push(bidResponse);
      }
    }));

    return bidResponses;
  }
};

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 156:
/***/ (function(module, exports) {



/***/ })

},[154]);