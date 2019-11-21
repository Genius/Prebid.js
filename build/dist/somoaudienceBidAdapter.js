pbjsChunk([9],{

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(340);
module.exports = __webpack_require__(341);


/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _utils = __webpack_require__(0);

var _bidderFactory = __webpack_require__(6);

var spec = exports.spec = {

  code: 'somoaudience',

  aliases: ['somo'],

  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.placementId);
  },

  buildRequests: function buildRequests(bidRequests) {
    return bidRequests.map((function (bidRequest) {
      return {
        method: 'POST',
        url: '//publisher-east.mobileadtrading.com/rtb/bid?s=' + bidRequest.params.placementId.toString(),
        data: openRtbRequest(bidRequest),
        bidRequest: bidRequest
      };
    }));
  },

  interpretResponse: function interpretResponse(response, request) {
    return bidResponseAvailable(request, response);
  }
};

function bidResponseAvailable(bidRequest, bidResponse) {
  var bidResponses = [];
  var bidId = 1;
  if (typeof bidRequest != 'undefined' && typeof bidRequest.bidRequest != 'undefined' && typeof bidRequest.bidRequest.bidId != 'undefined') {
    bidId = bidRequest.bidRequest.bidId;
  }
  if (bidResponse.body) {
    var bidData = bidResponse.body.seatbid[0].bid[0];
    var bid = {
      requestId: bidId,
      cpm: bidData.price,
      width: bidData.w,
      height: bidData.h,
      ad: bidData.adm,
      ttl: 360,
      creativeId: bidData.crid,
      adId: bidId,
      netRevenue: false,
      currency: 'USD'
    };
    bidResponses.push(bid);
  }
  return bidResponses;
}

function openRtbRequest(bidRequest) {
  return {
    id: bidRequest.bidderRequestId,
    imp: [openRtbImpression(bidRequest)],
    at: 1,
    tmax: 400,
    site: openRtbSite(bidRequest),
    app: openRtbApp(bidRequest),
    device: openRtbDevice()
  };
}

function openRtbImpression(bidRequest) {
  return {
    id: bidRequest.bidId,
    banner: {}
  };
}

function isApp(bidRequest) {
  if (bidRequest.params.app) {
    return true;
  } else {
    return false;
  }
}

function openRtbSite(bidRequest) {
  if (!isApp(bidRequest)) {
    var pageUrl = (0, _utils.getTopWindowLocation)().href;
    var domain = (0, _utils.getTopWindowLocation)().hostname;
    return {
      ref: (0, _utils.getTopWindowReferrer)(),
      page: pageUrl,
      domain: domain
    };
  } else {
    return null;
  }
}

function openRtbApp(bidRequest) {
  if (isApp(bidRequest)) {
    var appParams = bidRequest.params.app;
    return {
      bundle: appParams.bundle ? appParams.bundle : null,
      storeurl: appParams.storeUrl ? appParams.storeUrl : null,
      domain: appParams.domain ? appParams.domain : null,
      name: appParams.name ? appParams.name : null
    };
  } else {
    return null;
  }
}

function openRtbDevice() {
  return {
    ua: navigator.userAgent,
    language: navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage
  };
}

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 341:
/***/ (function(module, exports) {



/***/ })

},[339]);