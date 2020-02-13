pbjsChunk([241],{

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(201);


/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config__ = __webpack_require__(3);




var BIDDER_CODE = 'arteebee';
var DEFAULT_HOST = 'bidder.mamrtb.com';
var DEFAULT_SSP = 'arteebee';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return 'params' in bidRequest && bidRequest.params.pub !== undefined && bidRequest.params.source !== undefined;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var requests = [];

    for (var i = 0; i < validBidRequests.length; i++) {
      var prebidReq = makePrebidRequest(validBidRequests[i], bidderRequest);

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
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    return [];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

function makePrebidRequest(req, bidderRequest) {
  var host = req.params.host || DEFAULT_HOST;
  var ssp = req.params.ssp || DEFAULT_SSP;
  var url = window.location.protocol + '//' + host + '/rtb/bid/' + ssp + '?type=json&register=0';
  var payload = makeRtbRequest(req, bidderRequest);
  var payloadString = JSON.stringify(payload);
  return {
    method: 'POST',
    url: url,
    data: payloadString
  };
}

function makeRtbRequest(req, bidderRequest) {
  var auctionId = req.bidderRequestId;
  var imp = [];
  imp.push(makeImp(req));
  var rtbReq = {
    'id': auctionId,
    'imp': imp,
    'site': makeSite(req),
    'device': makeDevice(),
    'at': 1,
    'tmax': __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('bidderTimeout')
  };

  if (__WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('coppa') === true || req.params.coppa) {
    rtbReq.regs = {
      coppa: 1
    };
  }

  if (bidderRequest && bidderRequest.gdprConsent) {
    if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' && bidderRequest.gdprConsent.gdprApplies) {
      if (!rtbReq.regs) {
        rtbReq.regs = {};
      }

      rtbReq.regs['ext'] = {
        'gdpr': 1
      };
    }

    if (typeof bidderRequest.gdprConsent.consentString === 'string' && bidderRequest.gdprConsent.consentString) {
      rtbReq['user'] = {
        'ext': {
          'consent': bidderRequest.gdprConsent.consentString
        }
      };
    }
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
    'page': __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
    'ref': __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"](),
    'publisher': makePublisher(req)
  };
  return site;
}

function makePublisher(req) {
  var params = req.params;
  var publisher = {
    'id': params.pub,
    'domain': getDomain(__WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('publisherDomain'))
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

/***/ })

},[200]);