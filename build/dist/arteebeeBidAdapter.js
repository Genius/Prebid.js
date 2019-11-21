pbjsChunk([48],{

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(142);
module.exports = __webpack_require__(143);


/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _mediaTypes = __webpack_require__(12);

var _bidderFactory = __webpack_require__(6);

var _config = __webpack_require__(8);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var BIDDER_CODE = 'arteebee';

var DEFAULT_HOST = 'bidder.mamrtb.com';

var DEFAULT_SSP = 'arteebee';

var spec = exports.spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [_mediaTypes.BANNER],
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return 'params' in bidRequest && bidRequest.params.pub !== undefined && bidRequest.params.source !== undefined;
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
          mediaType: _mediaTypes.BANNER,
          creativeId: bid.crid,
          currency: 'USD',
          netRevenue: true,
          ttl: bid.exp,
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

(0, _bidderFactory.registerBidder)(spec);

function makePrebidRequest(req) {
  var host = req.params.host || DEFAULT_HOST;
  var ssp = req.params.ssp || DEFAULT_SSP;

  var url = window.location.protocol + '//' + host + '/rtb/bid/' + ssp + '?type=json&register=0';

  var payload = makeRtbRequest(req);
  var payloadString = JSON.stringify(payload);

  return {
    method: 'POST',
    url: url,
    data: payloadString
  };
}

function makeRtbRequest(req) {
  var auctionId = req.requestId;

  var imp = [];
  imp.push(makeImp(req));

  var rtbReq = {
    'id': auctionId,
    'imp': imp,
    'site': makeSite(req),
    'device': makeDevice(),
    'at': 1,
    'tmax': _config.config.getConfig('bidderTimeout')
  };

  if (req.params.coppa) {
    rtbReq.regs = { coppa: 1 };
  }

  if (req.params.test) {
    rtbReq.test = 1;
  }

  return rtbReq;
}

function makeImp(req) {
  var imp = {
    'id': req.bidId,
    'tagid': req.placementCode
  };

  if (window.location.protocol === 'https:') {
    imp.secure = 1;
  }

  imp.banner = makeBanner(req);

  return imp;
}

function makeBanner(req) {
  var format = [];

  for (var i = 0; i < req.sizes.length; i++) {
    format.push({
      w: req.sizes[i][0],
      h: req.sizes[i][1]
    });
  }
  return {
    'format': format
  };
}

function makeSite(req) {
  var params = req.params;

  var site = {
    'id': params.source,
    'page': utils.getTopWindowUrl(),
    'ref': utils.getTopWindowReferrer(),
    'publisher': makePublisher(req)
  };

  return site;
}

function makePublisher(req) {
  var params = req.params;

  var publisher = {
    'id': params.pub,
    'domain': getDomain(_config.config.getConfig('publisherDomain'))
  };

  return publisher;
}

function getDomain(url) {
  var a = document.createElement('a');
  a.href = url;

  return a.host;
}

function makeDevice() {
  var device = {
    'ua': 'caller',
    'ip': 'caller',
    'js': 1
  };

  return device;
}

/***/ }),

/***/ 143:
/***/ (function(module, exports) {



/***/ })

},[141]);