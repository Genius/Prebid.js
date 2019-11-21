pbjsChunk([39],{

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(205);
module.exports = __webpack_require__(206);


/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _bidderFactory = __webpack_require__(6);

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var BIDDER_CODE = 'huddledmasses';
var URL = '//huddledmassessupply.com/?c=o&m=multi';
var URL_SYNC = '//huddledmassessupply.com/?c=o&m=cookie';

var sizeObj = {
  '468x60': 1,
  '728x90': 2,
  '300x600': 10,
  '300x250': 15,
  '300x100': 19,
  '320x50': 43,
  '300x50': 44,
  '300x300': 48,
  '300x1050': 54,
  '970x90': 55,
  '970x250': 57,
  '1000x90': 58,
  '320x80': 59,
  '640x480': 65,
  '320x480': 67,
  '320x320': 72,
  '320x160': 73,
  '480x300': 83,
  '970x310': 94,
  '970x210': 96,
  '480x320': 101,
  '768x1024': 102,
  '1000x300': 113,
  '320x100': 117,
  '800x250': 118,
  '200x600': 119
};

utils._each(sizeObj, (function (item, key) {
  return sizeObj[item] = key;
}));

var spec = exports.spec = {
  code: BIDDER_CODE,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !isNaN(bid.params.placement_id) && (bid.params.sizes !== undefined && bid.params.sizes.length > 0 && bid.params.sizes.some((function (sizeIndex) {
      return sizeObj[sizeIndex] !== undefined;
    })) || bid.sizes !== undefined && bid.sizes.length > 0 && bid.sizes.map((function (size) {
      return size[0] + 'x' + size[1];
    })).some((function (size) {
      return sizeObj[size] !== undefined;
    })));
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests A non-empty list of valid bid requests that should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests) {
    var winTop = window;
    try {
      window.top.location.toString();
      winTop = window.top;
    } catch (e) {
      utils.logMessage(e);
    };
    var location = utils.getTopWindowLocation();
    var placements = [];
    var request = {
      'deviceWidth': winTop.screen.width,
      'deviceHeight': winTop.screen.height,
      'language': navigator && navigator.language ? navigator.language : '',
      'secure': location.protocol === 'https:' ? 1 : 0,
      'host': location.host,
      'page': location.pathname,
      'placements': placements
    };
    for (var i = 0; i < validBidRequests.length; i++) {
      var bid = validBidRequests[i];
      var placement = {};
      placement['placementId'] = bid.params.placement_id;
      placement['bidId'] = bid.bidId;
      placement['sizes'] = bid.sizes;
      placements.push(placement);
    }
    return {
      method: 'POST',
      url: URL,
      data: request
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse) {
    var response = [];
    try {
      serverResponse = serverResponse.body;
      for (var i = 0; i < serverResponse.length; i++) {
        var resItem = serverResponse[i];
        if (resItem.width && !isNaN(resItem.width) && resItem.height && !isNaN(resItem.height) && resItem.requestId && typeof resItem.requestId === 'string' && resItem.cpm && !isNaN(resItem.cpm) && resItem.ad && typeof resItem.ad === 'string' && resItem.ttl && !isNaN(resItem.ttl) && resItem.creativeId && typeof resItem.creativeId === 'string' && resItem.netRevenue && typeof resItem.netRevenue === 'boolean' && resItem.currency && typeof resItem.currency === 'string') {
          response.push(resItem);
        }
      }
    } catch (e) {
      utils.logMessage(e);
    };
    return response;
  },

  getUserSyncs: function getUserSyncs() {
    return [{
      type: 'image',
      url: URL_SYNC
    }];
  }
};

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 206:
/***/ (function(module, exports) {



/***/ })

},[204]);