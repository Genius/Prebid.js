pbjsChunk([215],{

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(258);


/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);



var BIDDER_CODE = 'contentignite';
var spec = {
  code: BIDDER_CODE,
  pageID: Math.floor(Math.random() * 10e6),
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.accountID && bid.params.zoneID);
  },
  buildRequests: function buildRequests(validBidRequests) {
    var i;
    var zoneID;
    var bidRequest;
    var accountID;
    var keyword;
    var requestURI;
    var serverRequests = [];
    var zoneCounters = {};

    for (i = 0; i < validBidRequests.length; i++) {
      bidRequest = validBidRequests[i];
      zoneID = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getBidIdParameter"]('zoneID', bidRequest.params);
      accountID = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getBidIdParameter"]('accountID', bidRequest.params);
      keyword = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getBidIdParameter"]('keyword', bidRequest.params);

      if (!(zoneID in zoneCounters)) {
        zoneCounters[zoneID] = 0;
      }

      requestURI = location.protocol + '//serve.connectignite.com/adserve/;type=hbr;';
      requestURI += "ID=".concat(encodeURIComponent(accountID), ";");
      requestURI += "setID=".concat(encodeURIComponent(zoneID), ";");
      requestURI += "pid=".concat(spec.pageID, ";");
      requestURI += "place=".concat(encodeURIComponent(zoneCounters[zoneID]), ";"); // append the keyword for targeting if one was passed in

      if (keyword !== '') {
        requestURI += "kw=".concat(encodeURIComponent(keyword), ";");
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
  // tslint:disable-next-line:cyclomatic-complexity
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidObj = bidRequest.bidRequest;
    var bidResponses = [];
    var bidResponse = {};
    var isCorrectSize = false;
    var isCorrectCPM = true;
    var cpm;
    var minCPM;
    var maxCPM;
    var width;
    var height;
    serverResponse = serverResponse.body;

    if (serverResponse && serverResponse.status === 'SUCCESS' && bidObj) {
      cpm = serverResponse.cpm;
      minCPM = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getBidIdParameter"]('minCPM', bidObj.params);
      maxCPM = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getBidIdParameter"]('maxCPM', bidObj.params);
      width = parseInt(serverResponse.width);
      height = parseInt(serverResponse.height); // Ensure response CPM is within the given bounds

      if (minCPM !== '' && cpm < parseFloat(minCPM)) {
        isCorrectCPM = false;
        __WEBPACK_IMPORTED_MODULE_2__src_utils__["logWarn"]('ContentIgnite: CPM did not meet minCPM requirements.');
      } else if (maxCPM !== '' && cpm > parseFloat(maxCPM)) {
        isCorrectCPM = false;
        __WEBPACK_IMPORTED_MODULE_2__src_utils__["logWarn"]('ContentIgnite: CPM did not meet maxCPM requirements.');
      } // Ensure that response ad matches one of the placement sizes.


      __WEBPACK_IMPORTED_MODULE_2__src_utils__["_each"](bidObj.sizes, function (size) {
        if (width === size[0] && height === size[1]) {
          isCorrectSize = true;
        } else {
          __WEBPACK_IMPORTED_MODULE_2__src_utils__["logWarn"]('ContentIgnite: Returned ad is of a different size to that requested.');
        }
      });

      if (isCorrectCPM && isCorrectSize) {
        bidResponse.requestId = bidObj.bidId;
        bidResponse.creativeId = serverResponse.placement_id;
        bidResponse.cpm = cpm;
        bidResponse.width = width;
        bidResponse.height = height;
        bidResponse.ad = serverResponse.ad_code;
        bidResponse.currency = 'USD';
        bidResponse.netRevenue = true;
        bidResponse.ttl = __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('_bidderTimeout');
        bidResponse.referrer = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowUrl"]();
        bidResponses.push(bidResponse);
      }
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[257]);