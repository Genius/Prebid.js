pbjsChunk([106],{

/***/ 518:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(519);


/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config__ = __webpack_require__(3);




var BIDDER_CODE = 'rexrtb';
var DEFAULT_HOST = 'bid.rxrtb.com';
var AUCTION_TYPE = 2;
var RESPONSE_TTL = 900;
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return 'params' in bidRequest && bidRequest.params.id !== undefined && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isInteger"](bidRequest.params.id) && bidRequest.params.token !== undefined;
  },
  buildRequests: function buildRequests(validBidRequests) {
    var requests = [];

    for (var i = 0; i < validBidRequests.length; i++) {
      var prebidReq = makePrebidRequest(validBidRequests[i]);

      if (prebidReq) {
        requests.push(prebidReq);
      }
    }

    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var rtbResp = serverResponse.body;

    if (!rtbResp || !rtbResp.seatbid) {
      return [];
    }

    var bidResponses = [];

    for (var i = 0; i < rtbResp.seatbid.length; i++) {
      var seatbid = rtbResp.seatbid[i];

      for (var j = 0; j < seatbid.bid.length; j++) {
        var bid = seatbid.bid[j];
        var bidResponse = {
          requestId: bid.impid,
          cpm: bid.price,
          width: bid.w,
          height: bid.h,
          mediaType: __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */],
          creativeId: bid.crid,
          currency: rtbResp.cur || 'USD',
          netRevenue: true,
          ttl: bid.exp || RESPONSE_TTL,
          ad: bid.adm
        };
        bidResponses.push(bidResponse);
      }
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    return [];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

function getDomain(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.host;
}

function makePrebidRequest(req) {
  var host = req.params.host || DEFAULT_HOST;
  var url = '//' + host + '/dsp?id=' + req.params.id + '&token=' + req.params.token;
  var reqData = makeRtbRequest(req);
  return {
    method: 'POST',
    url: url,
    data: JSON.stringify(reqData)
  };
}

function makeRtbRequest(req) {
  var imp = [];
  imp.push(makeImp(req));
  return {
    'id': req.auctionId,
    'imp': imp,
    'site': makeSite(req),
    'device': makeDevice(),
    'hb': 1,
    'at': req.params.at || AUCTION_TYPE,
    'cur': ['USD'],
    'badv': req.params.badv || '',
    'bcat': req.params.bcat || ''
  };
}

function makeImp(req) {
  var imp = {
    'id': req.bidId,
    'tagid': req.adUnitCode,
    'banner': makeBanner(req)
  };

  if (req.params.bidfloor && isFinite(req.params.bidfloor)) {
    imp.bidfloor = req.params.bidfloor;
  }

  return imp;
}

function makeBanner(req) {
  var format = [];
  var banner = {};

  for (var i = 0; i < req.sizes.length; i++) {
    format.push({
      w: req.sizes[i][0],
      h: req.sizes[i][1]
    });
  }

  banner.format = format;

  if (req.params.pos && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isInteger"](req.params.pos)) {
    banner.pos = req.params.pos;
  }

  return banner;
}

function makeSite(req) {
  var domain = getDomain(__WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('publisherDomain'));
  return {
    'id': req.params.source || domain,
    'domain': domain,
    'page': __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
    'ref': __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"]()
  };
}

function makeDevice() {
  return {
    'ua': window.navigator.userAgent || '',
    'ip': 1
  };
}

/***/ })

},[518]);