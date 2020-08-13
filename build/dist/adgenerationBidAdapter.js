pbjsChunk([313],{

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(188);


/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);




var ADG_BIDDER_CODE = 'adgeneration';
var spec = {
  code: ADG_BIDDER_CODE,
  aliases: ['adg'],
  // short code
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.id;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var ADGENE_PREBID_VERSION = '1.0.1';
    var serverRequests = [];

    for (var i = 0, len = validBidRequests.length; i < len; i++) {
      var validReq = validBidRequests[i];
      var DEBUG_URL = 'https://api-test.scaleout.jp/adsv/v1';
      var URL = 'https://d.socdm.com/adsv/v1';
      var url = validReq.params.debug ? DEBUG_URL : URL;
      var data = "";
      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'posall', 'SSPLOC');
      var id = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('id', validReq.params);
      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'id', id);
      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'sdktype', '0');
      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'hb', 'true');
      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 't', 'json3');
      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'transactionid', validReq.transactionId);
      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'sizes', getSizes(validReq));
      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'currency', getCurrencyType());
      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'pbver', "4.2.0");
      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'sdkname', 'prebidjs');
      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'adapterver', ADGENE_PREBID_VERSION); // native以外にvideo等の対応が入った場合は要修正

      if (!validReq.mediaTypes || !validReq.mediaTypes.native) {
        data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'imark', '1');
      }

      data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](data, 'tp', bidderRequest.refererInfo.referer); // remove the trailing "&"

      if (data.lastIndexOf('&') === data.length - 1) {
        data = data.substring(0, data.length - 1);
      }

      serverRequests.push({
        method: 'GET',
        url: url,
        data: data,
        bidRequest: validBidRequests[i]
      });
    }

    return serverRequests;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @param {BidRequest} bidRequests
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequests) {
    var body = serverResponse.body;

    if (!body.results || body.results.length < 1) {
      return [];
    }

    var bidRequest = bidRequests.bidRequest;
    var bidResponse = {
      requestId: bidRequest.bidId,
      cpm: body.cpm || 0,
      width: body.w ? body.w : 1,
      height: body.h ? body.h : 1,
      creativeId: body.creativeid || '',
      dealId: body.dealid || '',
      currency: getCurrencyType(),
      netRevenue: true,
      ttl: body.ttl || 10
    };

    if (isNative(body)) {
      bidResponse.native = createNativeAd(body);
      bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */];
    } else {
      // banner
      bidResponse.ad = createAd(body, bidRequest);
    }

    return [bidResponse];
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
    return syncs;
  }
};

function createAd(body, bidRequest) {
  var ad = body.ad;

  if (body.vastxml && body.vastxml.length > 0) {
    ad = "<body><div id=\"apvad-".concat(bidRequest.bidId, "\"></div>").concat(createAPVTag()).concat(insertVASTMethod(bidRequest.bidId, body.vastxml), "</body>");
  }

  ad = appendChildToBody(ad, body.beacon);
  if (removeWrapper(ad)) return removeWrapper(ad);
  return ad;
}

function isNative(body) {
  if (!body) return false;
  return body.native_ad && body.native_ad.assets.length > 0;
}

function createNativeAd(body) {
  var native = {};

  if (body.native_ad && body.native_ad.assets.length > 0) {
    var assets = body.native_ad.assets;

    for (var i = 0, len = assets.length; i < len; i++) {
      switch (assets[i].id) {
        case 1:
          native.title = assets[i].title.text;
          break;

        case 2:
          native.image = {
            url: assets[i].img.url,
            height: assets[i].img.h,
            width: assets[i].img.w
          };
          break;

        case 3:
          native.icon = {
            url: assets[i].img.url,
            height: assets[i].img.h,
            width: assets[i].img.w
          };
          break;

        case 4:
          native.sponsoredBy = assets[i].data.value;
          break;

        case 5:
          native.body = assets[i].data.value;
          break;

        case 6:
          native.cta = assets[i].data.value;
          break;

        case 502:
          native.privacyLink = encodeURIComponent(assets[i].data.value);
          break;
      }
    }

    native.clickUrl = body.native_ad.link.url;
    native.clickTrackers = body.native_ad.link.clicktrackers || [];
    native.impressionTrackers = body.native_ad.imptrackers || [];

    if (body.beaconurl && body.beaconurl != '') {
      native.impressionTrackers.push(body.beaconurl);
    }
  }

  return native;
}

function appendChildToBody(ad, data) {
  return ad.replace(/<\/\s?body>/, "".concat(data, "</body>"));
}

function createAPVTag() {
  var APVURL = 'https://cdn.apvdr.com/js/VideoAd.min.js';
  var apvScript = document.createElement('script');
  apvScript.type = 'text/javascript';
  apvScript.id = 'apv';
  apvScript.src = APVURL;
  return apvScript.outerHTML;
}

function insertVASTMethod(targetId, vastXml) {
  var apvVideoAdParam = {
    s: targetId
  };
  var script = document.createElement("script");
  script.type = 'text/javascript';
  script.innerHTML = "(function(){ new APV.VideoAd(".concat(JSON.stringify(apvVideoAdParam), ").load('").concat(vastXml.replace(/\r?\n/g, ''), "'); })();");
  return script.outerHTML;
}
/**
 *
 * @param ad
 */


function removeWrapper(ad) {
  var bodyIndex = ad.indexOf('<body>');
  var lastBodyIndex = ad.lastIndexOf('</body>');
  if (bodyIndex === -1 || lastBodyIndex === -1) return false;
  return ad.substr(bodyIndex, lastBodyIndex).replace('<body>', '').replace('</body>', '');
}
/**
 * request
 * @param validReq request
 * @returns {?string} 300x250,320x50...
 */


function getSizes(validReq) {
  var sizes = validReq.sizes;
  if (!sizes || sizes.length < 1) return null;
  var sizesStr = '';

  for (var i in sizes) {
    var size = sizes[i];
    if (size.length !== 2) return null;
    sizesStr += "".concat(size[0], "x").concat(size[1], ",");
  }

  if (sizesStr || sizesStr.lastIndexOf(',') === sizesStr.length - 1) {
    sizesStr = sizesStr.substring(0, sizesStr.length - 1);
  }

  return sizesStr;
}
/**
 * @return {?string} USD or JPY
 */


function getCurrencyType() {
  if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency') && __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency').toUpperCase() === 'USD') return 'USD';
  return 'JPY';
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[187]);