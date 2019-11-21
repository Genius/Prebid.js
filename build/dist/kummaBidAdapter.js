pbjsChunk([31],{

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(239);
module.exports = __webpack_require__(240);


/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _utils = __webpack_require__(0);

var _bidderFactory = __webpack_require__(6);

var spec = exports.spec = {

  code: 'kumma',

  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.pubId && bid.params.siteId);
  },
  buildRequests: function buildRequests(bidRequests) {
    var request = {
      id: bidRequests[0].bidderRequestId,
      at: 2,
      imp: bidRequests.map((function (slot) {
        return impression(slot);
      })),
      site: site(bidRequests),
      device: device()
    };
    return {
      method: 'POST',
      url: '//hb.kumma.com/',
      data: JSON.stringify(request)
    };
  },
  interpretResponse: function interpretResponse(response, request) {
    return bidResponseAvailable(request, response.body);
  }
};
function bidResponseAvailable(bidRequest, bidResponse) {
  var idToImpMap = {};
  var idToBidMap = {};
  var ortbRequest = null;
  try {
    ortbRequest = JSON.parse(bidRequest.data);
  } catch (ex) {
    (0, _utils.logError)('kumma.parse', 'ERROR', ex);
  }
  ortbRequest.imp.forEach((function (imp) {
    idToImpMap[imp.id] = imp;
  }));
  if (bidResponse) {
    bidResponse.seatbid.forEach((function (seatBid) {
      return seatBid.bid.forEach((function (bid) {
        idToBidMap[bid.impid] = bid;
      }));
    }));
  }
  var bids = [];
  Object.keys(idToImpMap).forEach((function (id) {
    if (idToBidMap[id]) {
      var bid = {};
      bid.requestId = id;
      bid.creativeId = idToBidMap[id].adid;
      bid.cpm = idToBidMap[id].price;
      bid.currency = bidResponse.cur;
      bid.ttl = 360;
      bid.netRevenue = true;
      bid.ad = idToBidMap[id].adm;
      bid.ad = bid.ad.replace(/\$(%7B|\{)AUCTION_IMP_ID(%7D|\})/gi, idToBidMap[id].impid);
      bid.ad = bid.ad.replace(/\$(%7B|\{)AUCTION_AD_ID(%7D|\})/gi, idToBidMap[id].adid);
      bid.ad = bid.ad.replace(/\$(%7B|\{)AUCTION_PRICE(%7D|\})/gi, idToBidMap[id].price);
      bid.ad = bid.ad.replace(/\$(%7B|\{)AUCTION_CURRENCY(%7D|\})/gi, bidResponse.cur);
      bid.ad = bid.ad.replace(/\$(%7B|\{)AUCTION_BID_ID(%7D|\})/gi, bidResponse.bidid);
      bid.width = idToImpMap[id].banner.w;
      bid.height = idToImpMap[id].banner.h;
      bids.push(bid);
    }
  }));
  return bids;
}
function impression(slot) {
  return {
    id: slot.bidId,
    banner: banner(slot),
    bidfloor: slot.params.bidFloor || '0.000001',
    tagid: slot.params.placementId.toString()
  };
}
function banner(slot) {
  var size = (0, _utils.parseSizesInput)(slot.sizes)[0].split('x');
  var width = parseInt(size[0]);
  var height = parseInt(size[1]);
  return {
    w: width,
    h: height
  };
}
function site(bidderRequest) {
  var pubId = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.pubId : '0';
  var siteId = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.siteId : '0';
  var appParams = bidderRequest[0].params.app;
  if (!appParams) {
    return {
      publisher: {
        id: pubId.toString(),
        domain: (0, _utils.getTopWindowLocation)().hostname
      },
      id: siteId.toString(),
      ref: (0, _utils.getTopWindowReferrer)(),
      page: (0, _utils.getTopWindowLocation)().href
    };
  }
  return null;
}
function device() {
  return {
    ua: navigator.userAgent,
    language: navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage,
    w: window.screen.width || window.innerWidth,
    h: window.screen.height || window.innerHeigh
  };
}

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 240:
/***/ (function(module, exports) {



/***/ })

},[238]);