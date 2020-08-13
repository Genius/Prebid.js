pbjsChunk([139],{

/***/ 600:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(601);


/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_storageManager_js__ = __webpack_require__(9);


var BIDDER_CODE = 'proxistore';
var storage = Object(__WEBPACK_IMPORTED_MODULE_1__src_storageManager_js__["b" /* getStorageManager */])();
var PROXISTORE_VENDOR_ID = 418;

function _createServerRequest(bidRequests, bidderRequest) {
  var sizeIds = [];
  bidRequests.forEach(function (bid) {
    var sizeId = {
      id: bid.bidId,
      sizes: bid.sizes.map(function (size) {
        return {
          width: size[0],
          height: size[1]
        };
      })
    };
    sizeIds.push(sizeId);
  });
  var payload = {
    auctionId: bidRequests[0].auctionId,
    transactionId: bidRequests[0].auctionId,
    bids: sizeIds,
    website: bidRequests[0].params.website,
    language: bidRequests[0].params.language,
    gdpr: {
      applies: false
    }
  };
  var options = {
    contentType: 'application/json',
    withCredentials: true
  };

  if (bidderRequest && bidderRequest.gdprConsent) {
    if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' && bidderRequest.gdprConsent.gdprApplies) {
      payload.gdpr.applies = true;
    }

    if (typeof bidderRequest.gdprConsent.consentString === 'string' && bidderRequest.gdprConsent.consentString) {
      payload.gdpr.consentString = bidderRequest.gdprConsent.consentString;
    }

    if (bidderRequest.gdprConsent.vendorData && bidderRequest.gdprConsent.vendorData.vendorConsents && typeof bidderRequest.gdprConsent.vendorData.vendorConsents[PROXISTORE_VENDOR_ID.toString(10)] !== 'undefined') {
      payload.gdpr.consentGiven = !!bidderRequest.gdprConsent.vendorData.vendorConsents[PROXISTORE_VENDOR_ID.toString(10)];
    }
  }

  return {
    method: 'POST',
    url: bidRequests[0].params.url || 'https://abs.proxistore.com/' + payload.language + '/v3/rtb/prebid/multi',
    data: JSON.stringify(payload),
    options: options
  };
}

function _createBidResponse(response) {
  return {
    requestId: response.requestId,
    cpm: response.cpm,
    width: response.width,
    height: response.height,
    ad: response.ad,
    ttl: response.ttl,
    creativeId: response.creativeId,
    currency: response.currency,
    netRevenue: response.netRevenue,
    vastUrl: response.vastUrl,
    vastXml: response.vastXml,
    dealId: response.dealId
  };
}
/**
 * Determines whether or not the given bid request is valid.
 *
 * @param bid  The bid params to validate.
 * @return boolean True if this is a valid bid, and false otherwise.
 */


function isBidRequestValid(bid) {
  var hasNoAd = function hasNoAd() {
    if (!storage.hasLocalStorage()) {
      return false;
    }

    var pxNoAds = storage.getDataFromLocalStorage("PX_NoAds_".concat(bid.params.website));

    if (!pxNoAds) {
      return false;
    } else {
      var storedDate = new Date(pxNoAds);
      var now = new Date();
      var diff = Math.abs(storedDate.getTime() - now.getTime()) / 60000;
      return diff <= 5;
    }
  };

  return !!(bid.params.website && bid.params.language) && !hasNoAd();
}
/**
 * Make a server request from the list of BidRequests.
 *
 * @param bidRequests - an array of bids
 * @param bidderRequest
 * @return ServerRequest Info describing the request to the server.
 */


function buildRequests(bidRequests, bidderRequest) {
  var request = _createServerRequest(bidRequests, bidderRequest);

  return request;
}
/**
 * Unpack the response from the server into a list of bids.
 *
 * @param serverResponse A successful response from the server.
 * @param bidRequest Request original server request
 * @return  An array of bids which were nested inside the server.
 */


function interpretResponse(serverResponse, bidRequest) {
  var itemName = "PX_NoAds_".concat(websiteFromBidRequest(bidRequest));

  if (serverResponse.body.length > 0) {
    storage.removeDataFromLocalStorage(itemName, true);
    return serverResponse.body.map(_createBidResponse);
  } else {
    storage.setDataInLocalStorage(itemName, new Date());
    return [];
  }
}

var websiteFromBidRequest = function websiteFromBidRequest(bidR) {
  if (bidR.data) {
    return JSON.parse(bidR.data).website;
  } else if (bidR.params.website) {
    return bidR.params.website;
  }
};
/**
 * Register the user sync pixels which should be dropped after the auction.
 *
 * @param syncOptions Which user syncs are allowed?
 * @param serverResponses List of server's responses.
 * @return The user syncs which should be dropped.
 */


function getUserSyncs(syncOptions, serverResponses) {
  return [];
}

var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[600]);