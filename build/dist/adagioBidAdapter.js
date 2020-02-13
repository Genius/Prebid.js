pbjsChunk([270],{

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(99);


/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);



var BIDDER_CODE = 'adagio';
var VERSION = '1.0.0';
var ENDPOINT = 'https://mp.4dex.io/prebid';
var SUPPORTED_MEDIA_TYPES = ['banner'];
/**
 * Based on https://github.com/ua-parser/uap-cpp/blob/master/UaParser.cpp#L331, with the following updates:
 * - replaced `mobile` by `mobi` in the table regexp, so Opera Mobile on phones is not detected as a tablet.
 */

function _getDeviceType() {
  var ua = navigator.userAgent; // Tablets must be checked before phones.

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 5; // "tablet"
  }

  if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(ua)) {
    return 4; // "phone"
  } // Consider that all other devices are personal computers


  return 2;
}

;

function _getDevice() {
  var language = navigator.language ? 'language' : 'userLanguage';
  return {
    userAgent: navigator.userAgent,
    language: navigator[language],
    deviceType: _getDeviceType(),
    dnt: __WEBPACK_IMPORTED_MODULE_1__src_utils__["getDNT"]() ? 1 : 0,
    geo: {},
    js: 1
  };
}

;

function _getSite() {
  var topLocation = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowLocation"]();
  return {
    domain: topLocation.hostname,
    page: topLocation.href,
    referrer: __WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowReferrer"]()
  };
}

;

function _getPageviewId() {
  return !window.top.ADAGIO || !window.top.ADAGIO.pageviewId ? '_' : window.top.ADAGIO.pageviewId;
}

;

function _getFeatures(bidRequest) {
  if (!window.top._ADAGIO || !window.top._ADAGIO.features) {
    return {};
  }

  var rawFeatures = window.top._ADAGIO.features.getFeatures(document.getElementById(bidRequest.adUnitCode), function (features) {
    return {
      site_id: bidRequest.params.siteId,
      placement: bidRequest.params.placementId,
      pagetype: bidRequest.params.pagetypeId,
      categories: bidRequest.params.categories
    };
  });

  return rawFeatures;
}

function _getGdprConsent(bidderRequest) {
  var consent = {};

  if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bidderRequest, 'gdprConsent')) {
    if (bidderRequest.gdprConsent.consentString !== undefined) {
      consent.consentString = bidderRequest.gdprConsent.consentString;
    }

    if (bidderRequest.gdprConsent.gdprApplies !== undefined) {
      consent.consentRequired = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;
    }

    if (bidderRequest.gdprConsent.allowAuctionWithoutConsent !== undefined) {
      consent.allowAuctionWithoutConsent = bidderRequest.gdprConsent.allowAuctionWithoutConsent ? 1 : 0;
    }
  }

  return consent;
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaType: SUPPORTED_MEDIA_TYPES,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.siteId && bid.params.placementId);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var secure = location.protocol === 'https:' ? 1 : 0;

    var device = _getDevice();

    var site = _getSite();

    var pageviewId = _getPageviewId();

    var gdprConsent = _getGdprConsent(bidderRequest);

    var adUnits = __WEBPACK_IMPORTED_MODULE_1__src_utils__["_map"](validBidRequests, function (bidRequest) {
      bidRequest.params.features = _getFeatures(bidRequest);
      var categories = bidRequest.params.categories;

      if (typeof categories !== 'undefined' && !Array.isArray(categories)) {
        bidRequest.params.categories = [categories];
      }

      return bidRequest;
    }); // Regroug ad units by siteId


    var groupedAdUnits = adUnits.reduce(function (groupedAdUnits, adUnit) {
      (groupedAdUnits[adUnit.params.siteId] = groupedAdUnits[adUnit.params.siteId] || []).push(adUnit);
      return groupedAdUnits;
    }, {}); // Build one request per siteId

    var requests = __WEBPACK_IMPORTED_MODULE_1__src_utils__["_map"](Object.keys(groupedAdUnits), function (siteId) {
      return {
        method: 'POST',
        url: ENDPOINT,
        data: {
          id: __WEBPACK_IMPORTED_MODULE_1__src_utils__["generateUUID"](),
          secure: secure,
          device: device,
          site: site,
          siteId: siteId,
          pageviewId: pageviewId,
          adUnits: groupedAdUnits[siteId],
          gdpr: gdprConsent,
          adapterVersion: VERSION
        },
        options: {
          contentType: 'application/json'
        }
      };
    });

    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];

    try {
      var response = serverResponse.body;

      if (response) {
        response.bids.forEach(function (bidObj) {
          var bidReq = __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find___default()(bidRequest.data.adUnits, function (bid) {
            return bid.bidId === bidObj.requestId;
          });

          if (bidReq) {
            bidObj.placementId = bidReq.params.placementId;
            bidObj.pagetypeId = bidReq.params.pagetypeId;
            bidObj.categories = bidReq.params.features && bidReq.params.features.categories ? bidReq.params.features.categories : [];
          }

          bidResponses.push(bidObj);
        });
      }
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"](err);
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (!serverResponses.length || serverResponses[0].body === '' || !serverResponses[0].body.userSyncs) {
      return false;
    }

    var syncs = serverResponses[0].body.userSyncs.map(function (sync) {
      return {
        type: sync.t === 'p' ? 'image' : 'iframe',
        url: sync.u
      };
    });
    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[98]);