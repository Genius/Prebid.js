pbjsChunk([257],{

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(320);


/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__ = __webpack_require__(9);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var storage = Object(__WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__["b" /* getStorageManager */])();
var BIDDER_CODE = 'cedato';
var BID_URL = 'https://h.cedatoplayer.com/hb';
var SYNC_URL = 'https://h.cedatoplayer.com/hb_usync';
var TTL = 10000;
var CURRENCY = 'USD';
var NET_REVENUE = true;
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.player_id && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["checkCookieSupport"]() && storage.cookiesAreEnabled());
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var site = {
      domain: document.domain
    };
    var device = {
      ua: navigator.userAgent,
      w: screen.width,
      h: screen.height
    };
    var currency = CURRENCY;
    var tmax = bidderRequest.timeout;
    var auctionId = bidderRequest.auctionId;
    var auctionStart = bidderRequest.auctionStart;
    var bidderRequestId = bidderRequest.bidderRequestId;
    var imp = bidRequests.map(function (req) {
      var banner = getMediaType(req, 'banner');
      var video = getMediaType(req, 'video');
      var params = req.params;
      var bidId = req.bidId;
      var adUnitCode = req.adUnitCode;
      var bidRequestsCount = req.bidRequestsCount;
      var bidderWinsCount = req.bidderWinsCount;
      var transactionId = req.transactionId;
      return {
        bidId: bidId,
        banner: banner,
        video: video,
        adUnitCode: adUnitCode,
        bidRequestsCount: bidRequestsCount,
        bidderWinsCount: bidderWinsCount,
        transactionId: transactionId,
        params: params
      };
    });
    var payload = {
      version: "4.2.0",
      site: site,
      device: device,
      imp: imp,
      currency: currency,
      tmax: tmax,
      auctionId: auctionId,
      auctionStart: auctionStart,
      bidderRequestId: bidderRequestId
    };

    if (bidderRequest) {
      payload.referer_info = bidderRequest.refererInfo;
      payload.us_privacy = bidderRequest.uspConsent;

      if (bidderRequest.gdprConsent) {
        payload.gdpr_consent = {
          consent_string: bidderRequest.gdprConsent.consentString,
          consent_required: bidderRequest.gdprConsent.gdprApplies
        };
      }
    }

    return formatRequest(payload, bidderRequest);
  },
  interpretResponse: function interpretResponse(resp, _ref) {
    var bidderRequest = _ref.bidderRequest;
    resp = resp.body;
    var bids = [];

    if (!resp) {
      return bids;
    }

    resp.seatbid[0].bid.map(function (serverBid) {
      var bid = newBid(serverBid, bidderRequest);
      bid.currency = resp.cur;
      bids.push(bid);
    });
    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, resps, gdprConsent, uspConsent) {
    var syncs = [];

    if (syncOptions.iframeEnabled) {
      syncs.push(getSync('iframe', gdprConsent, uspConsent));
    } else if (syncOptions.pixelEnabled) {
      syncs.push(getSync('image', gdprConsent, uspConsent));
    }

    return syncs;
  }
};

function getMediaType(req, type) {
  var mediaTypes = req.mediaTypes;

  if (!mediaTypes) {
    return;
  }

  switch (type) {
    case 'banner':
      if (mediaTypes.banner) {
        var sizes = mediaTypes.banner.sizes;
        return {
          format: getFormats(sizes)
        };
      }

      break;

    case 'video':
      if (mediaTypes.video) {
        var _mediaTypes$video = mediaTypes.video,
            playerSize = _mediaTypes$video.playerSize,
            context = _mediaTypes$video.context;
        return {
          context: context,
          format: getFormats(playerSize)
        };
      }

  }
}

function newBid(serverBid, bidderRequest) {
  var bidRequest = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidRequest"](serverBid.uuid, [bidderRequest]);
  var cpm = serverBid.price;
  var requestId = serverBid.uuid;
  var width = serverBid.w;
  var height = serverBid.h;
  var creativeId = serverBid.crid;
  var dealId = serverBid.dealid;
  var mediaType = serverBid.media_type;
  var netRevenue = NET_REVENUE;
  var ttl = TTL;
  var bid = {
    cpm: cpm,
    requestId: requestId,
    width: width,
    height: height,
    mediaType: mediaType,
    creativeId: creativeId,
    dealId: dealId,
    netRevenue: netRevenue,
    ttl: ttl
  };

  if (mediaType == 'video') {
    var videoContext = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.context');

    if (videoContext == 'instream') {
      bid.vastUrl = serverBid.vast_url;
      bid.vastImpUrl = serverBid.notify_url;
    }
  } else {
    bid.ad = serverBid.adm;
  }

  return bid;
}

function formatRequest(payload, bidderRequest) {
  var payloadByUrl = {};
  var requests = [];
  payload.imp.forEach(function (imp) {
    var url = imp.params.bid_url || BID_URL;

    if (!payloadByUrl[url]) {
      payloadByUrl[url] = _objectSpread(_objectSpread({}, payload), {}, {
        imp: []
      });
    }

    payloadByUrl[url].imp.push(imp);
  });

  for (var url in payloadByUrl) {
    requests.push({
      url: url,
      method: 'POST',
      data: JSON.stringify(payloadByUrl[url]),
      bidderRequest: bidderRequest
    });
  }

  return requests;
}

var getSync = function getSync(type, gdprConsent) {
  var uspConsent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var syncUrl = SYNC_URL;
  var params = '?type=' + type + '&us_privacy=' + uspConsent;

  if (gdprConsent && typeof gdprConsent.consentString === 'string') {
    if (typeof gdprConsent.gdprApplies === 'boolean') {
      params += "&gdpr=".concat(Number(gdprConsent.gdprApplies), "&gdpr_consent=").concat(gdprConsent.consentString);
    } else {
      params += "&gdpr_consent=".concat(gdprConsent.consentString);
    }
  }

  return {
    type: type,
    url: syncUrl + params
  };
};

var getFormats = function getFormats(arr) {
  return arr.map(function (s) {
    return {
      w: s[0],
      h: s[1]
    };
  });
};

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[319]);