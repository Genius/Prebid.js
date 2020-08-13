pbjsChunk([296],{

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(230);


/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__ = __webpack_require__(9);






var storage = Object(__WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__["b" /* getStorageManager */])();
var BIDDER_CODE = 'adspend';
var BID_URL = 'https://rtb.com.ru/headerbidding-bid';
var SYNC_URL = 'https://rtb.com.ru/headerbidding-sync?uid={UUID}';
var COOKIE_NAME = 'hb-adspend-id';
var TTL = 10000;
var RUB = 'RUB';
var FIRST_PRICE = 1;
var NET_REVENUE = true;
var winEventURLs = {};
var placementToBidMap = {};
var spec = {
  code: BIDDER_CODE,
  aliases: ['as'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */]],
  onBidWon: function onBidWon(winObj) {
    var requestId = winObj.requestId;
    var cpm = winObj.cpm;
    var event = winEventURLs[requestId].replace(/\$\{AUCTION_PRICE\}/, cpm);
    Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax_js__["a" /* ajax */])(event, null);
  },
  isBidRequestValid: function isBidRequestValid(bid) {
    var adServerCur = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency') === RUB;
    return !!(adServerCur && bid.params && bid.params.bidfloor && bid.crumbs.pubcid && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["checkCookieSupport"]() && storage.cookiesAreEnabled());
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var req = bidRequests[Math.floor(Math.random() * bidRequests.length)];
    var bidId = req.bidId;
    var at = FIRST_PRICE;
    var site = {
      id: req.crumbs.pubcid,
      domain: document.domain
    };
    var device = {
      ua: navigator.userAgent,
      ip: ''
    };
    var user = {
      id: getUserID()
    };
    var cur = [RUB];
    var tmax = bidderRequest.timeout;
    var imp = bidRequests.map(function (req) {
      var params = req.params;
      var tagId = params.tagId;
      var id = params.placement;
      var banner = {
        'format': getFormats(req.sizes)
      };
      var bidfloor = params.bidfloor !== undefined ? Number(params.bidfloor) : 1;
      var bidfloorcur = RUB;
      placementToBidMap[id] = bidId;
      return {
        id: id,
        tagId: tagId,
        banner: banner,
        bidfloor: bidfloor,
        bidfloorcur: bidfloorcur,
        secure: 0
      };
    });
    var payload = {
      bidId: bidId,
      at: at,
      site: site,
      device: device,
      user: user,
      imp: imp,
      cur: cur,
      tmax: tmax
    };
    return {
      method: 'POST',
      url: BID_URL,
      data: JSON.stringify(payload)
    };
  },
  interpretResponse: function interpretResponse(resp, _ref) {
    var bidderRequest = _ref.bidderRequest;
    if (resp.body === '') return [];
    var bids = resp.body.seatbid[0].bid.map(function (bid) {
      var cpm = bid.price;
      var impid = bid.impid;
      var requestId = placementToBidMap[impid];
      var width = bid.w;
      var height = bid.h;
      var creativeId = bid.adid;
      var dealId = bid.dealid;
      var currency = resp.body.cur;
      var netRevenue = NET_REVENUE;
      var ttl = TTL;
      var ad = bid.adm;
      return {
        cpm: cpm,
        requestId: requestId,
        width: width,
        height: height,
        creativeId: creativeId,
        dealId: dealId,
        currency: currency,
        netRevenue: netRevenue,
        ttl: ttl,
        ad: ad
      };
    });
    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, resps) {
    var syncs = [];
    resps.forEach(function (resp) {
      if (syncOptions.pixelEnabled && resp.body === '') {
        var uuid = getUserID();
        syncs.push({
          type: 'image',
          url: SYNC_URL.replace('{UUID}', uuid)
        });
      }
    });
    return syncs;
  }
};

var getUserID = function getUserID() {
  var i = storage.getCookie(COOKIE_NAME);

  if (i === null) {
    var uuid = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["generateUUID"]();
    storage.setCookie(COOKIE_NAME, uuid);
    return uuid;
  }

  return i;
};

var getFormats = function getFormats(arr) {
  return arr.map(function (s) {
    return {
      w: s[0],
      h: s[1]
    };
  });
};

Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[229]);