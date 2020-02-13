pbjsChunk([60],{

/***/ 630:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(631);


/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'uol';
var ENDPOINT_URL = 'https://prebid.adilligo.com/v1/prebid.json';
var UOL_LOG_HEADER = 'UOL Bidder Error: ';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],
  // not required since it is default
  aliases: ['uol'],
  // short code

  /**
    * Determines whether or not the given bid request is valid.
    *
    * @param {BidRequest} bid The bid params to validate.
    * @return boolean True if this is a valid bid, and false otherwise.
    */
  isBidRequestValid: function isBidRequestValid(bid) {
    var isValid = true;

    if (bid.params) {
      if (!bid.params.placementId) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](UOL_LOG_HEADER + 'Param placementId was not defined for bidID ' + bid.bidId);
        isValid = false;
      }

      if (typeof bid.params.cpmFactor != 'undefined' && !bid.params.test) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](UOL_LOG_HEADER + 'Cannot manipulate cpmFactor outside test environment - bidID ' + bid.bidId);
        isValid = false;
      }

      if (bid.params.cpmFactor && (isNaN(bid.params.cpmFactor) || parseInt(Number(bid.params.cpmFactor)) != bid.params.cpmFactor || isNaN(parseInt(bid.params.cpmFactor, 10)))) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](UOL_LOG_HEADER + 'Invalid param definition for cpmFactor on bidID ' + bid.bidId);
        isValid = false;
      }
    } else {
      isValid = false;
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](UOL_LOG_HEADER + 'No params defined for bidID ' + bid.bidId);
    }

    if (getSizes(bid).length == 0) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](UOL_LOG_HEADER + 'No sizing definition found for bidID ' + bid.bidId);
      isValid = false;
    }

    return isValid;
  },

  /**
    * Make a server request from the list of BidRequests.
    *
    * @param {validBidRequests[]} - an array of bids
    * @param {bidderRequests} - an object containing all bid params, including validBids.
    * @return ServerRequest Info describing the request to the server.
    */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var data = JSON.stringify(getPayloadFor(validBidRequests, bidderRequest));
    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: data,
      bidRequest: validBidRequests
    };
  },

  /**
     * Unpack the response from the server into a list of bids.
     *
     * @param {ServerResponse} serverResponse A successful response from the server.
     * @return {Bid[]} An array of bids which were nested inside the server.
     */
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bidRequest = _ref.bidRequest;
    var bidResponses = [];

    if (serverResponse.body) {
      var ads = serverResponse.body.ads;

      for (var index = 0; index < ads.length; index++) {
        var bidResponse = {
          requestId: ads[index].bidId,
          cpm: ads[index].cpm,
          width: ads[index].width,
          height: ads[index].height,
          creativeId: ads[index].creativeId,
          dealId: ads[index].dealId,
          currency: ads[index].currency,
          netRevenue: ads[index].netRevenue,
          ttl: ads[index].ttl,
          ad: ads[index].ad,
          mediaType: ads[index].mediaType
        };
        bidResponses.push(bidResponse);
      }
    }

    return bidResponses;
  },

  /**
     * Register the user sync pixels which should be dropped after the auction.
     *
     * @param {SyncOptions} syncOptions Which user syncs are allowed?
     * @param {ServerResponse[]} serverResponses List of server's responses.
     * @return {UserSync[]} The user syncs which should be dropped.
     */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (syncOptions.iframeEnabled) {
      for (var index = 0; index < serverResponses.length; index++) {
        if (serverResponses[index].body && serverResponses[index].body.trackingPixel) {
          syncs.push({
            type: 'iframe',
            url: serverResponses[index].body.trackingPixel
          });
        }
      }
    }

    return syncs;
  }
};

function getPayloadFor(bidRequests, bidderRequest) {
  var payload = {
    auctionId: bidderRequest.auctionId,
    requestId: bidderRequest.bidderRequestId,
    referrerURL: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
    trackingAllowed: !__WEBPACK_IMPORTED_MODULE_0__src_utils__["getDNT"]()
  };

  if (payload.trackingAllowed) {
    try {
      var location = getLastLocation();

      if (location != null) {
        payload.geolocation = location;
      }
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](UOL_LOG_HEADER + 'Location acquisition error - ' + error.toString());
    }
  }

  payload.requests = [];

  for (var index = 0; index < bidRequests.length; index++) {
    var request = {
      bidId: bidRequests[index].bidId,
      transactionId: bidRequests[index].transactionId,
      adUnitCode: bidRequests[index].adUnitCode,
      sizes: getSizes(bidRequests[index]),
      customParams: extractCustomParams(bidRequests[index].params),
      type: 'banner'
    };
    payload.requests.push(request);
  }

  return payload;
}

;

function getLastLocation() {
  var location = localStorage.getItem('uolLocationTracker');

  if (navigator.permissions && navigator.permissions.query) {
    getUserCoordinates().then(function (data) {
      if (data != null) {
        var coordinates = {
          lat: data.latitude,
          long: data.longitude,
          timestamp: new Date().getTime()
        };
        localStorage.setItem('uolLocationTracker', JSON.stringify(coordinates));
      }
    }, {});
  } else {
    location = null;
    localStorage.removeItem('uolLocationTracker');
  }

  return JSON.parse(location);
}

function getUserCoordinates() {
  return new Promise(function (resolve, reject) {
    return navigator.permissions.query({
      name: 'geolocation'
    }).then(function (permission) {
      return permission.state === 'granted' ? navigator.geolocation.getCurrentPosition(function (pos) {
        return resolve(pos.coords);
      }) : resolve(null);
    });
  });
}

function extractCustomParams(data) {
  var params = {
    placementId: data.placementId
  };

  if (data.test) {
    params.test = data.test;

    if (data.cpmFactor) {
      params.cpmFactor = data.cpmFactor;
    }
  }

  return params;
}

function getSizes(bid) {
  var adSizes = [];

  if (Array.isArray(bid.sizes) && bid.sizes.length > 0) {
    adSizes = bid.sizes;
  }

  return adSizes;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[630]);