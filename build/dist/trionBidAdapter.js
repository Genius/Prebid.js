pbjsChunk([68],{

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(615);


/***/ }),

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["getStorageData"] = getStorageData;
/* harmony export (immutable) */ __webpack_exports__["setStorageData"] = setStorageData;
/* harmony export (immutable) */ __webpack_exports__["acceptPostMessage"] = acceptPostMessage;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BID_REQUEST_BASE_URL = 'https://in-appadvertising.com/api/bidRequest';
var USER_SYNC_URL = 'https://in-appadvertising.com/api/userSync.html';
var BIDDER_CODE = 'trion';
var BASE_KEY = '_trion_';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.pubId && bid.params.sectionId);
  },
  buildRequests: function buildRequests(validBidRequests) {
    var bidRequests = [];

    for (var i = 0; i < validBidRequests.length; i++) {
      var bid = validBidRequests[i];
      var trionUrlParams = buildTrionUrlParams(bid);
      bidRequests.push({
        method: 'GET',
        url: BID_REQUEST_BASE_URL,
        bidRequest: bid,
        data: trionUrlParams
      });
    }

    return bidRequests;
  },
  interpretResponse: function interpretResponse(trionResponseObj, request) {
    var bid = {};
    var bidResponses = [];
    var bidRequest = request.bidRequest;
    var responseBody = trionResponseObj ? trionResponseObj.body : {};

    if (responseBody && responseBody.bidId && bidRequest) {
      var result = responseBody.result;

      if (result && result.cpm && result.placeBid && result.ad) {
        var cpm = parseInt(result.cpm, 10) / 100;
        bid.requestId = bidRequest.bidId;
        bid.cpm = cpm;
        bid.ad = result.ad;
        bid.width = result.width;
        bid.height = result.height;
        bid.ttl = result.ttl;
        bid.creativeId = result.creativeId;
        bid.currency = result.currency;
        bid.netRevenue = result.netRevenue;
        bidResponses.push(bid);
      }
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      handlePostMessage();
      return [{
        type: 'iframe',
        url: getSyncUrl()
      }];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

function getSyncUrl() {
  var unParsedPubAndSection = getStorageData(BASE_KEY + 'lps') || ':';
  var pubSectionArray = unParsedPubAndSection.split(':') || [];
  var pubId = pubSectionArray[0] || -1;
  var sectionId = pubSectionArray[1] || -1;
  var url = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
  return USER_SYNC_URL + "?p=".concat(pubId, "&s=").concat(sectionId, "&u=").concat(url);
}

function buildTrionUrlParams(bid) {
  var pubId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('pubId', bid.params);
  var sectionId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('sectionId', bid.params);
  var re = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('re', bid.params);
  var url = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
  var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bid.sizes).join(',');
  var intT = window.TR_INT_T && window.TR_INT_T != -1 ? window.TR_INT_T : null;

  if (!intT) {
    intT = getStorageData(BASE_KEY + 'int_t');
  }

  if (intT) {
    setStorageData(BASE_KEY + 'int_t', intT);
  }

  setStorageData(BASE_KEY + 'lps', pubId + ':' + sectionId);
  var trionUrl = '';
  trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils__["tryAppendQueryString"](trionUrl, 'bidId', bid.bidId);
  trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils__["tryAppendQueryString"](trionUrl, 'pubId', pubId);
  trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils__["tryAppendQueryString"](trionUrl, 'sectionId', sectionId);
  trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils__["tryAppendQueryString"](trionUrl, 're', re);

  if (url) {
    trionUrl += 'url=' + url + '&';
  }

  if (sizes) {
    trionUrl += 'sizes=' + sizes + '&';
  }

  if (intT) {
    trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils__["tryAppendQueryString"](trionUrl, 'int_t', encodeURIComponent(intT));
  } // remove the trailing "&"


  if (trionUrl.lastIndexOf('&') === trionUrl.length - 1) {
    trionUrl = trionUrl.substring(0, trionUrl.length - 1);
  }

  return trionUrl;
}

function handlePostMessage() {
  try {
    if (window.addEventListener) {
      window.addEventListener('message', acceptPostMessage);
    }
  } catch (e) {}
}

function getStorageData(key) {
  var item = null;

  try {
    if (window.localStorage) {
      item = window.localStorage.getItem(key);
    }
  } catch (e) {}

  return item;
}
function setStorageData(key, item) {
  try {
    if (window.localStorage) {
      window.localStorage.setItem(key, item);
    }
  } catch (e) {}
}
function acceptPostMessage(e) {
  var message = e.data || '';

  if (!message.indexOf || !message.split || message.indexOf(BASE_KEY + 'userId') !== 0) {
    return;
  }

  var intT = message.split(BASE_KEY + 'userId=')[1];

  if (intT) {
    setStorageData(BASE_KEY + 'int_t', intT);
  }
}

/***/ })

},[614]);