pbjsChunk([250],{

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(334);


/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);



var BIDDER_CODE = 'colossusssp';
var G_URL = 'https://colossusssp.com/?c=o&m=multi';
var G_URL_SYNC = 'https://colossusssp.com/?c=o&m=cookie';

function isBidResponseValid(bid) {
  if (!bid.requestId || !bid.cpm || !bid.creativeId || !bid.ttl || !bid.currency) {
    return false;
  }

  switch (bid.mediaType) {
    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]:
      return Boolean(bid.width && bid.height && bid.ad);

    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]:
      return Boolean(bid.vastUrl);

    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */]:
      return Boolean(bid.native);

    default:
      return false;
  }
}

function getUserId(eids, id, source, uidExt) {
  if (id) {
    var uid = {
      id: id
    };

    if (uidExt) {
      uid.ext = uidExt;
    }

    eids.push({
      source: source,
      uids: [uid]
    });
  }
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return Boolean(bid.bidId && bid.params && !isNaN(bid.params.placement_id));
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests A non-empty list of valid bid requests that should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var winTop = window;
    var location;

    try {
      location = new URL(bidderRequest.refererInfo.referer);
      winTop = window.top;
    } catch (e) {
      location = winTop.location;
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"](e);
    }

    ;
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

    if (bidderRequest) {
      if (bidderRequest.uspConsent) {
        request.ccpa = bidderRequest.uspConsent;
      }

      if (bidderRequest.gdprConsent) {
        request.gdpr_consent = bidderRequest.gdprConsent.consentString || 'ALL';
        request.gdpr_require = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;
      }
    }

    for (var i = 0; i < validBidRequests.length; i++) {
      var bid = validBidRequests[i];
      var traff = bid.params.traffic || __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */];
      var placement = {
        placementId: bid.params.placement_id,
        bidId: bid.bidId,
        sizes: bid.mediaTypes[traff].sizes,
        traffic: traff,
        eids: []
      };

      if (bid.schain) {
        placement.schain = bid.schain;
      }

      if (bid.userId) {
        getUserId(placement.eids, bid.userId.britepoolid, 'britepool.com');
        getUserId(placement.eids, bid.userId.idl_env, 'identityLink');
        getUserId(placement.eids, bid.userId.id5id, 'id5-sync.com');
        getUserId(placement.eids, bid.userId.tdid, 'adserver.org', {
          rtiPartner: 'TDID'
        });
      }

      placements.push(placement);
    }

    return {
      method: 'POST',
      url: G_URL,
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

        if (isBidResponseValid(resItem)) {
          response.push(resItem);
        }
      }
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"](e);
    }

    ;
    return response;
  },
  getUserSyncs: function getUserSyncs() {
    return [{
      type: 'image',
      url: G_URL_SYNC
    }];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[333]);