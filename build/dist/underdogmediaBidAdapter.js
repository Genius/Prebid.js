pbjsChunk([49],{

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(513);


/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);



var BIDDER_CODE = 'underdogmedia';
var UDM_ADAPTER_VERSION = '3.0V';
var UDM_VENDOR_ID = '159';
var prebidVersion = "3.0.0";
__WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"]("Initializing UDM Adapter. PBJS Version: ".concat(prebidVersion, " with adapter version: ").concat(UDM_ADAPTER_VERSION, "  Updated 20191028"));
var spec = {
  code: BIDDER_CODE,
  bidParams: [],
  isBidRequestValid: function isBidRequestValid(bid) {
    var bidSizes = bid.mediaTypes && bid.mediaTypes.banner && bid.mediaTypes.banner.sizes ? bid.mediaTypes.banner.sizes : bid.sizes;
    return !!(bid.params && bid.params.siteId && bidSizes && bidSizes.length > 0);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var sizes = [];
    var siteId = 0;
    validBidRequests.forEach(function (bidParam) {
      var bidParamSizes = bidParam.mediaTypes && bidParam.mediaTypes.banner && bidParam.mediaTypes.banner.sizes ? bidParam.mediaTypes.banner.sizes : bidParam.sizes;
      sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["flatten"](sizes, __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bidParamSizes));
      siteId = bidParam.params.siteId;
    });
    var data = {
      tid: 1,
      dt: 10,
      sid: siteId,
      sizes: sizes.join(',')
    };

    if (bidderRequest && bidderRequest.gdprConsent) {
      if (typeof bidderRequest.gdprConsent.gdprApplies !== 'undefined') {
        data.gdprApplies = !!bidderRequest.gdprConsent.gdprApplies;
      }

      if (bidderRequest.gdprConsent.vendorData && bidderRequest.gdprConsent.vendorData.vendorConsents && typeof bidderRequest.gdprConsent.vendorData.vendorConsents[UDM_VENDOR_ID] !== 'undefined') {
        data.consentGiven = !!bidderRequest.gdprConsent.vendorData.vendorConsents[UDM_VENDOR_ID];
      }

      if (typeof bidderRequest.gdprConsent.consentString !== 'undefined') {
        data.consentData = bidderRequest.gdprConsent.consentString;
      }
    }

    if (!data.gdprApplies || data.consentGiven) {
      return {
        method: 'GET',
        url: 'https://udmserve.net/udm/img.fetch',
        data: data,
        bidParams: validBidRequests
      };
    }
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    bidRequest.bidParams.forEach(function (bidParam) {
      serverResponse.body.mids.forEach(function (mid) {
        if (mid.useCount > 0) {
          return;
        }

        if (!mid.useCount) {
          mid.useCount = 0;
        }

        var sizeNotFound = true;
        var bidParamSizes = bidParam.mediaTypes && bidParam.mediaTypes.banner && bidParam.mediaTypes.banner.sizes ? bidParam.mediaTypes.banner.sizes : bidParam.sizes;
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bidParamSizes).forEach(function (size) {
          if (size === mid.width + 'x' + mid.height) {
            sizeNotFound = false;
          }
        });

        if (sizeNotFound) {
          return;
        }

        var bidResponse = {
          requestId: bidParam.bidId,
          bidderCode: spec.code,
          cpm: parseFloat(mid.cpm),
          width: mid.width,
          height: mid.height,
          ad: mid.ad_code_html,
          creativeId: mid.mid,
          currency: 'USD',
          netRevenue: false,
          ttl: __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('_bidderTimeout')
        };

        if (bidResponse.cpm <= 0) {
          return;
        }

        if (bidResponse.ad.length <= 0) {
          return;
        }

        mid.useCount++;
        bidResponse.ad += makeNotification(bidResponse, mid, bidParam);
        bidResponses.push(bidResponse);
      });
    });
    return bidResponses;
  }
};

function makeNotification(bid, mid, bidParam) {
  var url = mid.notification_url;
  url += UDM_ADAPTER_VERSION;
  url += ';cb=' + Math.random();
  url += ';qqq=' + 1 / bid.cpm;
  url += ';hbt=' + __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('_bidderTimeout');
  url += ';style=adapter';
  url += ';vis=' + encodeURIComponent(document.visibilityState);
  url += ';traffic_info=' + encodeURIComponent(JSON.stringify(getUrlVars()));

  if (bidParam.params.subId) {
    url += ';subid=' + encodeURIComponent(bidParam.params.subId);
  }

  return '<script async src="' + url + '"></script>';
}

function getUrlVars() {
  var vars = {};
  var hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');

    if (hash[0].match(/^utm_/)) {
      vars[hash[0]] = hash[1].substr(0, 150);
    }
  }

  return vars;
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[512]);