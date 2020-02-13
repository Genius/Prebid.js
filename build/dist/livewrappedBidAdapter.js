pbjsChunk([158],{

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(394);


/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }





var BIDDER_CODE = 'livewrapped';
var URL = '//lwadm.com/ad';
var VERSION = '1.1';
var spec = {
  code: BIDDER_CODE,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * Parameters should be
   *
   * adUnitId:    LiveWrapped's id of the ad unit.    Optional. A guid identifying the ad unit.
   * adUnitName:  LiveWrapped's name of the ad unit   Optional. (Prebid's ad unit code will be used otherwise.)
   * publisherId: Publisher id.                       Required if adUnitName is used or both adUnitName and adUnitId is omitted, otherwise optional.
   * userId:      A persistent user id if available.  Optional.
   * url:         Page url                            Optional. Use if page url cannot be determined due to use of iframes.
   * bidUrl:      Bidding endpoint                    Optional.
   * seats:       List of bidders and seats           Optional. {"bidder name": ["seat 1", "seat 2"], ...}
   * deviceId:    Device id if available              Optional.
   * ifa:         Advertising ID                      Optional.
   * options      Dynamic data                        Optional. Optional data to send into adapter.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return (bid.params.adUnitId || (bid.params.adUnitName || bid.adUnitCode || bid.placementCode) && bid.params.publisherId) !== undefined;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var userId = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidRequests, hasUserId);
    var pubcid = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidRequests, hasPubcid);
    var publisherId = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidRequests, hasPublisherId);
    var auctionId = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidRequests, hasAuctionId);
    var bidUrl = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidRequests, hasBidUrl);
    var url = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidRequests, hasUrl);
    var test = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidRequests, hasTestParam);
    var seats = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidRequests, hasSeatsParam);
    var deviceId = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidRequests, hasDeviceIdParam);
    var ifa = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidRequests, hasIfaParam);
    var tid = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidRequests, hasTidParam);
    bidUrl = bidUrl ? bidUrl.params.bidUrl : URL;
    url = url ? url.params.url : __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('pageUrl') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
    test = test ? test.params.test : undefined;
    var adRequests = bidRequests.map(bidToAdRequest);
    var payload = {
      auctionId: auctionId ? auctionId.auctionId : undefined,
      publisherId: publisherId ? publisherId.params.publisherId : undefined,
      userId: userId ? userId.params.userId : pubcid ? pubcid.crumbs.pubcid : undefined,
      url: url,
      test: test,
      seats: seats ? seats.params.seats : undefined,
      deviceId: deviceId ? deviceId.params.deviceId : undefined,
      ifa: ifa ? ifa.params.ifa : undefined,
      tid: tid ? tid.params.tid : undefined,
      version: VERSION,
      gdprApplies: bidderRequest.gdprConsent ? bidderRequest.gdprConsent.gdprApplies : undefined,
      gdprConsent: bidderRequest.gdprConsent ? bidderRequest.gdprConsent.consentString : undefined,
      cookieSupport: !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isSafariBrowser"]() && __WEBPACK_IMPORTED_MODULE_0__src_utils__["cookiesAreEnabled"](),
      rcv: getAdblockerRecovered(),
      adRequests: _toConsumableArray(adRequests)
    };
    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: bidUrl,
      data: payloadString
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse) {
    var bidResponses = [];
    serverResponse.body.ads.forEach(function (ad) {
      var bidResponse = {
        requestId: ad.bidId,
        bidderCode: BIDDER_CODE,
        cpm: ad.cpmBid,
        width: ad.width,
        height: ad.height,
        ad: ad.tag,
        ttl: ad.ttl,
        creativeId: ad.creativeId,
        netRevenue: true,
        currency: serverResponse.body.currency
      };
      bidResponses.push(bidResponse);
    });
    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (serverResponses.length == 0) return [];
    var syncList = [];
    var userSync = serverResponses[0].body.pixels || [];
    userSync.forEach(function (sync) {
      if (syncOptions.pixelEnabled && sync.type == 'Redirect') {
        syncList.push({
          type: 'image',
          url: sync.url
        });
      }

      if (syncOptions.iframeEnabled && sync.type == 'Iframe') {
        syncList.push({
          type: 'iframe',
          url: sync.url
        });
      }
    });
    return syncList;
  }
};

function hasUserId(bid) {
  return !!bid.params.userId;
}

function hasPublisherId(bid) {
  return !!bid.params.publisherId;
}

function hasUrl(bid) {
  return !!bid.params.url;
}

function hasBidUrl(bid) {
  return !!bid.params.bidUrl;
}

function hasAuctionId(bid) {
  return !!bid.auctionId;
}

function hasTestParam(bid) {
  return !!bid.params.test;
}

function hasSeatsParam(bid) {
  return !!bid.params.seats;
}

function hasDeviceIdParam(bid) {
  return !!bid.params.deviceId;
}

function hasIfaParam(bid) {
  return !!bid.params.ifa;
}

function hasTidParam(bid) {
  return !!bid.params.tid;
}

function hasPubcid(bid) {
  return !!bid.crumbs && !!bid.crumbs.pubcid;
}

function bidToAdRequest(bid) {
  return {
    adUnitId: bid.params.adUnitId,
    callerAdUnitId: bid.params.adUnitName || bid.adUnitCode || bid.placementCode,
    bidId: bid.bidId,
    transactionId: bid.transactionId,
    formats: bid.sizes.map(sizeToFormat),
    options: bid.params.options
  };
}

function sizeToFormat(size) {
  return {
    width: size[0],
    height: size[1]
  };
}

function getAdblockerRecovered() {
  try {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils__["getWindowTop"]().I12C && __WEBPACK_IMPORTED_MODULE_0__src_utils__["getWindowTop"]().I12C.Morph === 1;
  } catch (e) {}
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[393]);