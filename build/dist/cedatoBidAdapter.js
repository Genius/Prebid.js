pbjsChunk([168],{

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(216);


/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'cedato';
var BID_URL = 'https://h.cedatoplayer.com/hb';
var SYNC_URL = 'https://h.cedatoplayer.com/hb_usync?uid={UUID}';
var COOKIE_NAME = 'hb-cedato-id';
var UUID_LEN = 36;
var TTL = 10000;
var CURRENCY = 'USD';
var FIRST_PRICE = 1;
var NET_REVENUE = true;
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.player_id && __WEBPACK_IMPORTED_MODULE_0__src_utils__["checkCookieSupport"]() && __WEBPACK_IMPORTED_MODULE_0__src_utils__["cookiesAreEnabled"]());
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var req = bidRequests[Math.floor(Math.random() * bidRequests.length)];
    var params = req.params;
    var at = FIRST_PRICE;
    var site = {
      id: params.player_id,
      domain: document.domain
    };
    var device = {
      ua: navigator.userAgent
    };
    var user = {
      id: getUserID()
    };
    var currency = CURRENCY;
    var tmax = bidderRequest.timeout;
    var auctionId = bidderRequest.auctionId;
    var auctionStart = bidderRequest.auctionStart;
    var bidderRequestId = bidderRequest.bidderRequestId;
    var imp = bidRequests.map(function (req) {
      var banner = getMediaType(req, 'banner');
      var video = getMediaType(req, 'video');
      var bidfloor = params.bidfloor;
      var bidId = req.bidId;
      var adUnitCode = req.adUnitCode;
      var bidRequestsCount = req.bidRequestsCount;
      var transactionId = req.transactionId;
      return {
        bidId: bidId,
        banner: banner,
        video: video,
        adUnitCode: adUnitCode,
        bidfloor: bidfloor,
        bidRequestsCount: bidRequestsCount,
        transactionId: transactionId
      };
    });
    var payload = {
      version: "3.0.0",
      at: at,
      site: site,
      device: device,
      user: user,
      imp: imp,
      currency: currency,
      tmax: tmax,
      auctionId: auctionId,
      auctionStart: auctionStart,
      bidderRequestId: bidderRequestId
    };

    if (bidderRequest) {
      payload.referer_info = bidderRequest.refererInfo;

      if (bidderRequest.gdprConsent) {
        payload.gdpr_consent = {
          consent_string: bidderRequest.gdprConsent.consentString,
          consent_required: bidderRequest.gdprConsent.gdprApplies
        };
      }
    }

    return {
      method: 'POST',
      url: params.bid_url || BID_URL,
      data: JSON.stringify(payload),
      bidderRequest: bidderRequest
    };
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
  getUserSyncs: function getUserSyncs(syncOptions, resps, gdprConsent) {
    var syncs = [];

    if (syncOptions.iframeEnabled) {
      syncs.push(getSync('iframe', gdprConsent));
    } else if (syncOptions.pixelEnabled) {
      syncs.push(getSync('image', gdprConsent));
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
  var bidRequest = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidRequest"](serverBid.uuid, [bidderRequest]);
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
    var videoContext = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video.context');

    if (videoContext == 'instream') {
      bid.vastUrl = serverBid.vast_url;
      bid.vastImpUrl = serverBid.notify_url;
    }
  } else {
    bid.ad = serverBid.adm;
  }

  return bid;
}

var getSync = function getSync(type, gdprConsent) {
  var uuid = getUserID();
  var syncUrl = SYNC_URL;
  var params = '&type=' + type;

  if (gdprConsent && typeof gdprConsent.consentString === 'string') {
    if (typeof gdprConsent.gdprApplies === 'boolean') {
      params += "&gdpr=".concat(Number(gdprConsent.gdprApplies), "&gdpr_consent=").concat(gdprConsent.consentString);
    } else {
      params += "&gdpr_consent=".concat(gdprConsent.consentString);
    }
  }

  return {
    type: type,
    url: syncUrl.replace('{UUID}', uuid) + params
  };
};

var getUserID = function getUserID() {
  var cookieName = COOKIE_NAME;
  var uuidLen = UUID_LEN;
  var i = document.cookie.indexOf(cookieName);

  if (i === -1) {
    var uuid = __WEBPACK_IMPORTED_MODULE_0__src_utils__["generateUUID"]();
    document.cookie = "".concat(cookieName, "=").concat(uuid, "; path=/");
    return uuid;
  }

  var j = i + cookieName.length + 1;
  return document.cookie.substring(j, j + uuidLen);
};

var getFormats = function getFormats(arr) {
  return arr.map(function (s) {
    return {
      w: s[0],
      h: s[1]
    };
  });
};

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[215]);