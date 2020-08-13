pbjsChunk([317],{

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(180);


/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);





var BIDDER_CODE = 'adbutler';
var spec = {
  code: BIDDER_CODE,
  pageID: Math.floor(Math.random() * 10e6),
  aliases: ['divreach'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.accountID && bid.params.zoneID);
  },
  buildRequests: function buildRequests(validBidRequests) {
    var i;
    var zoneID;
    var bidRequest;
    var accountID;
    var keyword;
    var domain;
    var requestURI;
    var serverRequests = [];
    var zoneCounters = {};
    var extraParams = {};

    for (i = 0; i < validBidRequests.length; i++) {
      bidRequest = validBidRequests[i];
      zoneID = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('zoneID', bidRequest.params);
      accountID = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('accountID', bidRequest.params);
      keyword = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('keyword', bidRequest.params);
      domain = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('domain', bidRequest.params);
      extraParams = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('extra', bidRequest.params);

      if (!(zoneID in zoneCounters)) {
        zoneCounters[zoneID] = 0;
      }

      if (typeof domain === 'undefined' || domain.length === 0) {
        domain = 'servedbyadbutler.com';
      }

      requestURI = 'https://' + domain + '/adserve/;type=hbr;';
      requestURI += 'ID=' + encodeURIComponent(accountID) + ';';
      requestURI += 'setID=' + encodeURIComponent(zoneID) + ';';
      requestURI += 'pid=' + encodeURIComponent(spec.pageID) + ';';
      requestURI += 'place=' + encodeURIComponent(zoneCounters[zoneID]) + ';'; // append the keyword for targeting if one was passed in

      if (keyword !== '') {
        requestURI += 'kw=' + encodeURIComponent(keyword) + ';';
      }

      for (var key in extraParams) {
        if (extraParams.hasOwnProperty(key)) {
          var val = encodeURIComponent(extraParams[key]);
          requestURI += "".concat(key, "=").concat(val, ";");
        }
      }

      zoneCounters[zoneID]++;
      serverRequests.push({
        method: 'GET',
        url: requestURI,
        data: {},
        bidRequest: bidRequest
      });
    }

    return serverRequests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidObj = bidRequest.bidRequest;
    var bidResponses = [];
    var bidResponse = {};
    var isCorrectSize = false;
    var isCorrectCPM = true;
    var CPM;
    var minCPM;
    var maxCPM;
    var width;
    var height;
    serverResponse = serverResponse.body;

    if (serverResponse && serverResponse.status === 'SUCCESS' && bidObj) {
      CPM = serverResponse.cpm;
      minCPM = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('minCPM', bidObj.params);
      maxCPM = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('maxCPM', bidObj.params);
      width = parseInt(serverResponse.width);
      height = parseInt(serverResponse.height); // Ensure response CPM is within the given bounds

      if (minCPM !== '' && CPM < parseFloat(minCPM)) {
        isCorrectCPM = false;
      }

      if (maxCPM !== '' && CPM > parseFloat(maxCPM)) {
        isCorrectCPM = false;
      } // Ensure that response ad matches one of the placement sizes.


      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidObj, 'mediaTypes.banner.sizes', []), function (size) {
        if (width === size[0] && height === size[1]) {
          isCorrectSize = true;
        }
      });

      if (isCorrectCPM && isCorrectSize) {
        bidResponse.requestId = bidObj.bidId;
        bidResponse.bidderCode = bidObj.bidder;
        bidResponse.creativeId = serverResponse.placement_id;
        bidResponse.cpm = CPM;
        bidResponse.width = width;
        bidResponse.height = height;
        bidResponse.ad = serverResponse.ad_code;
        bidResponse.ad += spec.addTrackingPixels(serverResponse.tracking_pixels);
        bidResponse.currency = 'USD';
        bidResponse.netRevenue = true;
        bidResponse.ttl = __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('_bidderTimeout');
        bidResponse.referrer = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidObj, 'refererInfo.referer');
        bidResponses.push(bidResponse);
      }
    }

    return bidResponses;
  },
  addTrackingPixels: function addTrackingPixels(trackingPixels) {
    var trackingPixelMarkup = '';

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](trackingPixels, function (pixelURL) {
      var trackingPixel = '<img height="0" width="0" border="0" style="display:none;" src="';
      trackingPixel += pixelURL;
      trackingPixel += '">';
      trackingPixelMarkup += trackingPixel;
    });

    return trackingPixelMarkup;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[179]);