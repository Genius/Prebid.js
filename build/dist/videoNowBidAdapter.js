pbjsChunk([41],{

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(529);


/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var RTB_URL = 'https://bidder.videonow.ru/prebid';
var BIDDER_CODE = 'videonow';
var TTL_SECONDS = 60 * 5;

function isBidRequestValid(bid) {
  return !!(bid && bid.params && bid.params.pId);
}

function buildRequest(bid, bidderRequest) {
  var refererInfo = bidderRequest.refererInfo;
  var ext = bid.ext,
      bidId = bid.bidId,
      params = bid.params,
      code = bid.code,
      sizes = bid.sizes;

  var _ref = params || {},
      pId = _ref.pId,
      bidFloor = _ref.bidFloor,
      cur = _ref.cur,
      placementId = _ref.placementId,
      rtbUrl = _ref.url;

  var url = rtbUrl || RTB_URL;
  url = "".concat(url).concat(~url.indexOf('?') ? '&' : '?', "profile_id=").concat(pId);
  var dto = {
    method: 'POST',
    url: url,
    data: {
      id: bidId,
      cpm: bidFloor,
      code: code,
      sizes: sizes,
      cur: cur || 'RUB',
      placementId: placementId,
      ref: refererInfo && refererInfo.referer
    }
  };
  ext && Object.keys(ext).forEach(function (key) {
    dto.data["ext_".concat(key)] = ext[key];
  });
  return dto;
}

function buildRequests(validBidRequests, bidderRequest) {
  __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]("".concat(BIDDER_CODE, ". buildRequests"));
  var requests = [];
  validBidRequests.forEach(function (validBidRequest) {
    var request = buildRequest(validBidRequest, bidderRequest);
    request && requests.push(request);
  });
  return requests;
}

function interpretResponse(serverResponse, bidRequest) {
  if (!serverResponse || !serverResponse.body) {
    return [];
  }

  var _ref2 = bidRequest && bidRequest.data || {},
      bidId = _ref2.id;

  if (!bidId) return [];
  var _serverResponse$body = serverResponse.body,
      seatbid = _serverResponse$body.seatbid,
      cur = _serverResponse$body.cur,
      ext = _serverResponse$body.ext;
  if (!seatbid || !seatbid.length) return [];

  var _ref3 = ext || {},
      placementId = _ref3.placementId;

  if (!placementId) return [];
  var bids = [];
  seatbid.forEach(function (sb) {
    var bid = sb.bid;
    bid && bid.length && bid.forEach(function (b) {
      var res = createResponseBid(b, bidId, cur, placementId);
      res && bids.push(res);
    });
  });
  return bids;
}

function createResponseBid(bidInfo, bidId, cur, placementId) {
  var id = bidInfo.id,
      nurl = bidInfo.nurl,
      code = bidInfo.code,
      price = bidInfo.price,
      crid = bidInfo.crid,
      ext = bidInfo.ext,
      ttl = bidInfo.ttl,
      netRevenue = bidInfo.netRevenue,
      w = bidInfo.w,
      h = bidInfo.h,
      adm = bidInfo.adm;

  if (!id || !price || !adm) {
    return null;
  }

  var _ref4 = ext || {},
      initPath = _ref4.init,
      module = _ref4.module,
      format = _ref4.format;

  if (!initPath) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]("vnInitModulePath is not defined");
    return null;
  }

  var _ref5 = module || {},
      log = _ref5.log,
      min = _ref5.min;

  if (!min && !log) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('module\'s paths are not defined');
    return null;
  }

  return {
    requestId: bidId,
    cpm: price,
    width: w,
    height: h,
    creativeId: crid,
    currency: cur || 'RUB',
    netRevenue: netRevenue !== undefined ? netRevenue : true,
    ttl: ttl || TTL_SECONDS,
    ad: code,
    nurl: nurl,
    renderer: {
      url: min || log,
      render: function render() {
        var d = window.document;
        var el = placementId && d.getElementById(placementId);

        if (el) {
          var pId = 1; // prepare data for vn_init script

          var profileData = {
            module: module,
            dataXml: adm
          };
          format && (profileData.format = format); // add init data for vn_init on the page

          var videonow = window.videonow = window.videonow || {};
          var init = videonow.init = window.videonow.init || {};
          init[pId] = profileData; // add vn_init js on the page

          var scr = document.createElement('script');
          scr.src = "".concat(initPath).concat(~initPath.indexOf('?') ? '&' : '?', "profileId=").concat(pId);
          el && el.appendChild(scr);
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]("bidAdapter ".concat(BIDDER_CODE, ": ").concat(placementId, " not found"));
        }
      }
    }
  };
}

function getUserSyncs(syncOptions, serverResponses) {
  var syncs = [];
  if (!serverResponses || !serverResponses.length) return syncs;
  serverResponses.forEach(function (response) {
    var _ref6 = response && response.body || {},
        ext = _ref6.ext;

    var _ref7 = ext || {},
        pixels = _ref7.pixels,
        iframes = _ref7.iframes;

    if (syncOptions.iframeEnabled && iframes && iframes.length) {
      iframes.forEach(function (i) {
        return syncs.push({
          type: 'iframe',
          url: i
        });
      });
    }

    if (syncOptions.pixelEnabled && pixels && pixels.length) {
      pixels.forEach(function (p) {
        return syncs.push({
          type: 'image',
          url: p
        });
      });
    }
  });
  __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]("".concat(BIDDER_CODE, " getUserSyncs() syncs=").concat(syncs.length));
  return syncs;
}

function onBidWon(bid) {
  var _ref8 = bid || {},
      nurl = _ref8.nurl;

  if (nurl) {
    var img = document.createElement('img');
    img.src = __WEBPACK_IMPORTED_MODULE_0__src_utils__["replaceAuctionPrice"](nurl, bid.cpm);
    img.style.cssText = 'display:none !important;';
    document.body.appendChild(img);
  }
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs,
  onBidWon: onBidWon
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[528]);