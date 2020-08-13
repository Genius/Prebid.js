pbjsChunk([186],{

/***/ 493:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(494);


/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storage", function() { return storage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__ = __webpack_require__(9);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







var storage = Object(__WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__["b" /* getStorageManager */])();
var BIDDER_CODE = 'livewrapped';
var URL = 'https://lwadm.com/ad';
var VERSION = '1.3';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]],

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
   * bundle:      App bundle                          Optional. Read from config if exists.
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
    var userId = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasUserId);
    var pubcid = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasPubcid);
    var publisherId = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasPublisherId);
    var auctionId = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasAuctionId);
    var bidUrl = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasBidUrl);
    var url = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasUrl);
    var test = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasTestParam);
    var seats = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasSeatsParam);
    var deviceId = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasDeviceIdParam);
    var ifa = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasIfaParam);
    var bundle = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasBundleParam);
    var tid = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(bidRequests, hasTidParam);
    var schain = bidRequests[0].schain;
    bidUrl = bidUrl ? bidUrl.params.bidUrl : URL;
    url = url ? url.params.url : getAppDomain() || getTopWindowLocation(bidderRequest);
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
      ifa: ifa ? ifa.params.ifa : getDeviceIfa(),
      bundle: bundle ? bundle.params.bundle : getAppBundle(),
      width: getDeviceWidth(),
      height: getDeviceHeight(),
      tid: tid ? tid.params.tid : undefined,
      version: VERSION,
      gdprApplies: bidderRequest.gdprConsent ? bidderRequest.gdprConsent.gdprApplies : undefined,
      gdprConsent: bidderRequest.gdprConsent ? bidderRequest.gdprConsent.consentString : undefined,
      cookieSupport: !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isSafariBrowser"]() && storage.cookiesAreEnabled(),
      rcv: getAdblockerRecovered(),
      adRequests: _toConsumableArray(adRequests),
      rtbData: handleEids(bidRequests),
      schain: schain
    };

    if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig().debug) {
      payload.dbg = true;
    }

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

    if (serverResponse.body.dbg && window.livewrapped && window.livewrapped.s2sDebug) {
      window.livewrapped.s2sDebug(serverResponse.body.dbg);
    }

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
        currency: serverResponse.body.currency,
        meta: ad.meta
      };

      if (ad.native) {
        bidResponse.native = ad.native;
        bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */];
      }

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

function hasBundleParam(bid) {
  return !!bid.params.bundle;
}

function hasTidParam(bid) {
  return !!bid.params.tid;
}

function hasPubcid(bid) {
  return !!bid.crumbs && !!bid.crumbs.pubcid;
}

function bidToAdRequest(bid) {
  var adRequest = {
    adUnitId: bid.params.adUnitId,
    callerAdUnitId: bid.params.adUnitName || bid.adUnitCode || bid.placementCode,
    bidId: bid.bidId,
    transactionId: bid.transactionId,
    formats: getSizes(bid).map(sizeToFormat),
    options: bid.params.options
  };
  adRequest.native = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.native');

  if (adRequest.native && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner')) {
    adRequest.banner = true;
  }

  return adRequest;
}

function getSizes(bid) {
  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner.sizes')) {
    return bid.mediaTypes.banner.sizes;
  } else if (Array.isArray(bid.sizes) && bid.sizes.length > 0) {
    return bid.sizes;
  }

  return [];
}

function sizeToFormat(size) {
  return {
    width: size[0],
    height: size[1]
  };
}

function getAdblockerRecovered() {
  try {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getWindowTop"]().I12C && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getWindowTop"]().I12C.Morph === 1;
  } catch (e) {}
}

function AddExternalUserId(eids, value, source, atype, rtiPartner) {
  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](value)) {
    var eid = {
      source: source,
      uids: [{
        id: value,
        atype: atype
      }]
    };

    if (rtiPartner) {
      eid.uids[0] = {
        ext: {
          rtiPartner: rtiPartner
        }
      };
    }

    eids.push(eid);
  }
}

function handleEids(bidRequests) {
  var eids = [];
  var bidRequest = bidRequests[0];

  if (bidRequest && bidRequest.userId) {
    AddExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "userId.pubcid"), 'pubcommon', 1); // Also add this to eids

    AddExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "userId.id5id"), 'id5-sync.com', 1);
  }

  if (eids.length > 0) {
    return {
      user: {
        ext: {
          eids: eids
        }
      }
    };
  }

  return undefined;
}

function getTopWindowLocation(bidderRequest) {
  var url = bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer;
  return __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('pageUrl') || url;
}

function getAppBundle() {
  if (_typeof(__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('app')) === 'object') {
    return __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('app').bundle;
  }
}

function getAppDomain() {
  if (_typeof(__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('app')) === 'object') {
    return __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('app').domain;
  }
}

function getDeviceIfa() {
  if (_typeof(__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('device')) === 'object') {
    return __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('device').ifa;
  }
}

function getDeviceWidth() {
  var device = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('device');

  if (_typeof(device) === 'object' && device.width) {
    return device.width;
  }

  return window.innerWidth;
}

function getDeviceHeight() {
  var device = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('device');

  if (_typeof(device) === 'object' && device.height) {
    return device.height;
  }

  return window.innerHeight;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[493]);