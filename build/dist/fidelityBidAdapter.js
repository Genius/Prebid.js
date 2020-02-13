pbjsChunk([191],{

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(315);


/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'fidelity';
var BIDDER_SERVER = 'x.fidelity-media.com';
var FIDELITY_VENDOR_ID = 408;
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.zoneid);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bidRequest) {
      var server = bidRequest.params.server || BIDDER_SERVER;
      var payload = {
        from: 'hb',
        v: '1.0',
        requestid: bidRequest.bidderRequestId,
        impid: bidRequest.bidId,
        zoneid: bidRequest.params.zoneid,
        floor: parseFloat(bidRequest.params.floor) > 0 ? bidRequest.params.floor : 0,
        charset: document.charSet || document.characterSet,
        subid: 'hb',
        flashver: getFlashVersion(),
        tmax: bidderRequest.timeout,
        defloc: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
        referrer: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"]()
      };
      setConsentParams(bidderRequest.gdprConsent, payload);
      return {
        method: 'GET',
        url: '//' + server + '/delivery/hb.php',
        data: payload
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse) {
    serverResponse = serverResponse.body;
    var bidResponses = [];

    if (serverResponse && serverResponse.seatbid) {
      serverResponse.seatbid.forEach(function (seatBid) {
        return seatBid.bid.forEach(function (bid) {
          var bidResponse = {
            requestId: bid.impid,
            creativeId: bid.impid,
            cpm: bid.price,
            width: bid.width,
            height: bid.height,
            ad: bid.adm,
            netRevenue: bid.netRevenue,
            currency: bid.cur,
            ttl: bid.ttl
          };
          bidResponses.push(bidResponse);
        });
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    if (syncOptions.iframeEnabled) {
      var url = '//' + BIDDER_SERVER + '/delivery/matches.php';
      var payload = {
        type: 'iframe'
      };
      setConsentParams(gdprConsent, payload);
      return [{
        type: 'iframe',
        url: url + '?' + __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseQueryStringParameters"](payload).replace(/\&$/, '')
      }];
    }
  }
};

function getFlashVersion() {
  var plugins, plugin, result;

  if (navigator.plugins && navigator.plugins.length > 0) {
    plugins = navigator.plugins;

    for (var i = 0; i < plugins.length && !result; i++) {
      plugin = plugins[i];

      if (plugin.name.indexOf('Shockwave Flash') > -1) {
        result = plugin.description.split('Shockwave Flash ')[1];
      }
    }
  }

  return result || '';
}

function setConsentParams(gdprConsent, payload) {
  if (gdprConsent) {
    payload.gdpr = 0;
    payload.consent_str = '';
    payload.consent_given = 0;

    if (typeof gdprConsent.gdprApplies !== 'undefined') {
      payload.gdpr = gdprConsent.gdprApplies ? 1 : 0;
    }

    if (typeof gdprConsent.consentString !== 'undefined') {
      payload.consent_str = gdprConsent.consentString;
    }

    if (gdprConsent.vendorData && gdprConsent.vendorData.vendorConsents && typeof gdprConsent.vendorData.vendorConsents[FIDELITY_VENDOR_ID.toString(10)] !== 'undefined') {
      payload.consent_given = gdprConsent.vendorData.vendorConsents[FIDELITY_VENDOR_ID.toString(10)] ? 1 : 0;
    }
  }
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[314]);