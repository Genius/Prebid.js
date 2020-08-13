pbjsChunk([81],{

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(753);


/***/ }),

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["getStorageData"] = getStorageData;
/* harmony export (immutable) */ __webpack_exports__["setStorageData"] = setStorageData;
/* harmony export (immutable) */ __webpack_exports__["acceptPostMessage"] = acceptPostMessage;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_storageManager_js__ = __webpack_require__(9);



var storage = Object(__WEBPACK_IMPORTED_MODULE_2__src_storageManager_js__["b" /* getStorageManager */])();
var BID_REQUEST_BASE_URL = 'https://in-appadvertising.com/api/bidRequest';
var USER_SYNC_URL = 'https://in-appadvertising.com/api/userSync.html';
var BIDDER_CODE = 'trion';
var BASE_KEY = '_trion_';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.pubId && bid.params.sectionId);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bidRequests = [];

    for (var i = 0; i < validBidRequests.length; i++) {
      var bid = validBidRequests[i];
      var trionUrlParams = buildTrionUrlParams(bid, bidderRequest);
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
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent, usPrivacy) {
    if (syncOptions.iframeEnabled) {
      handlePostMessage();
      return [{
        type: 'iframe',
        url: getSyncUrl(gdprConsent, usPrivacy)
      }];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

function getSyncUrl(gdprConsent, usPrivacy) {
  var unParsedPubAndSection = getStorageData(BASE_KEY + 'lps') || ':';
  var pubSectionArray = unParsedPubAndSection.split(':') || [];
  var pubId = pubSectionArray[0] || -1;
  var sectionId = pubSectionArray[1] || -1;
  var url = getPublisherUrl();
  var consentParams = '';

  if (gdprConsent) {
    if (gdprConsent.consentString) {
      consentParams += '&gc=' + encodeURIComponent(gdprConsent.consentString);
    }

    consentParams += '&g=' + (gdprConsent.gdprApplies ? 1 : 0);
  }

  if (usPrivacy) {
    consentParams = '&up=' + encodeURIComponent(usPrivacy);
  }

  return USER_SYNC_URL + "?p=".concat(pubId, "&s=").concat(sectionId).concat(consentParams, "&u=").concat(url);
}

function getPublisherUrl() {
  var url = '';

  try {
    if (window.top == window) {
      url = window.location.href;
    } else {
      try {
        url = window.top.location.href;
      } catch (e) {
        url = document.referrer;
      }
    }
  } catch (e) {}

  return url;
}

function buildTrionUrlParams(bid, bidderRequest) {
  var pubId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('pubId', bid.params);
  var sectionId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('sectionId', bid.params);
  var url = getPublisherUrl();
  var bidSizes = getBidSizesFromBidRequest(bid);
  var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bidSizes).join(',');
  var isAutomated = navigator && navigator.webdriver ? '1' : '0';
  var isHidden = document.hidden ? '1' : '0';
  var visibilityState = encodeURIComponent(document.visibilityState);
  var intT = window.TR_INT_T && window.TR_INT_T != -1 ? window.TR_INT_T : null;

  if (!intT) {
    intT = getStorageData(BASE_KEY + 'int_t');
  }

  if (intT) {
    setStorageData(BASE_KEY + 'int_t', intT);
  }

  setStorageData(BASE_KEY + 'lps', pubId + ':' + sectionId);
  var trionUrl = '';
  trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](trionUrl, 'bidId', bid.bidId);
  trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](trionUrl, 'pubId', pubId);
  trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](trionUrl, 'sectionId', sectionId);
  trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](trionUrl, 'vers', "4.2.0");

  if (url) {
    trionUrl += 'url=' + url + '&';
  }

  if (sizes) {
    trionUrl += 'sizes=' + sizes + '&';
  }

  if (intT) {
    trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](trionUrl, 'int_t', encodeURIComponent(intT));
  }

  trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](trionUrl, 'tr_wd', isAutomated);
  trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](trionUrl, 'tr_hd', isHidden);
  trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](trionUrl, 'tr_vs', visibilityState);

  if (bidderRequest && bidderRequest.gdprConsent) {
    var gdpr = bidderRequest.gdprConsent;

    if (gdpr) {
      if (gdpr.consentString) {
        trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](trionUrl, 'gdprc', encodeURIComponent(gdpr.consentString));
      }

      trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](trionUrl, 'gdpr', gdpr.gdprApplies ? 1 : 0);
    }
  }

  if (bidderRequest && bidderRequest.uspConsent) {
    trionUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](trionUrl, 'usp', encodeURIComponent(bidderRequest.uspConsent));
  } // remove the trailing "&"


  if (trionUrl.lastIndexOf('&') === trionUrl.length - 1) {
    trionUrl = trionUrl.substring(0, trionUrl.length - 1);
  }

  return trionUrl;
}

function getBidSizesFromBidRequest(bid) {
  return bid.mediaTypes && bid.mediaTypes.banner && bid.mediaTypes.banner.sizes ? bid.mediaTypes.banner.sizes : bid.sizes;
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
    if (storage.hasLocalStorage()) {
      item = storage.getDataFromLocalStorage(key);
    }
  } catch (e) {}

  return item;
}
function setStorageData(key, item) {
  try {
    if (storage.hasLocalStorage()) {
      storage.setDataInLocalStorage(key, item);
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

},[752]);