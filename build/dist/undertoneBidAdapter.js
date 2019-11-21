pbjsChunk([4],{

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(375);
module.exports = __webpack_require__(376);


/***/ }),

/***/ 375:
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

/**
 * Adapter to send bids to Undertone
 */

var BIDDER_CODE = 'undertone';
var URL = '//hb.undertone.com/hb';

var spec = exports.spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid && bid.params && bid.params.publisherId && bid.params.placementId) {
      bid.params.publisherId = parseInt(bid.params.publisherId);
      return true;
    }
  },
  buildRequests: function buildRequests(validBidRequests) {
    var payload = {
      'x-ut-hb-params': []
    };
    var host = utils.getTopWindowLocation().host;
    var domain = /[-\w]+\.(?:[-\w]+\.xn--[-\w]+|[-\w]{3,}|[-\w]+\.[-\w]{2})$/i.exec(host);

    var pubid = validBidRequests[0].params.publisherId;
    var REQ_URL = URL + '?pid=' + pubid + '&domain=' + domain;

    validBidRequests.map((function (bidReq) {
      var bid = {
        bidRequestId: bidReq.bidId,
        hbadaptor: 'prebid',
        domain: domain,
        placementId: bidReq.params.placementId,
        publisherId: bidReq.params.publisherId,
        sizes: bidReq.sizes,
        params: bidReq.params
      };
      payload['x-ut-hb-params'].push(bid);
    }));
    return {
      method: 'POST',
      url: REQ_URL,
      withCredentials: true,
      data: JSON.stringify(payload)
    };
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bids = [];
    var body = serverResponse.body;

    if (body && Array.isArray(body) && body.length > 0) {
      body.forEach((function (bidRes) {
        if (bidRes.ad && bidRes.cpm > 0) {
          var bid = {
            requestId: bidRes.bidRequestId,
            cpm: bidRes.cpm,
            width: bidRes.width,
            height: bidRes.height,
            creativeId: bidRes.adId,
            currency: bidRes.currency,
            netRevenue: bidRes.netRevenue,
            ttl: bidRes.ttl,
            ad: bidRes.ad
          };
          bids.push(bid);
        }
      }));
    }
    return bids;
  }
};
(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 376:
/***/ (function(module, exports) {



/***/ })

},[374]);