pbjsChunk([221],{

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(407);


/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);


var BIDDER_CODE = 'fidelity';
var BIDDER_SERVER = 'x.fidelity-media.com';
var FIDELITY_VENDOR_ID = 408;
var spec = {
  code: BIDDER_CODE,
  aliases: ['kubient'],
  gvlid: 408,
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
        defloc: bidderRequest.refererInfo.referer,
        referrer: getTopWindowReferrer(),
        schain: getSupplyChain(bidRequest.schain)
      };
      setConsentParams(bidderRequest.gdprConsent, bidderRequest.uspConsent, payload);
      return {
        method: 'GET',
        url: 'https://' + server + '/delivery/hb.php',
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
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent, uspConsent) {
    if (syncOptions.iframeEnabled) {
      var url = 'https://' + BIDDER_SERVER + '/delivery/matches.php';
      var payload = {
        type: 'iframe'
      };
      setConsentParams(gdprConsent, uspConsent, payload);
      return [{
        type: 'iframe',
        url: url + '?' + __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseQueryStringParameters"](payload).replace(/\&$/, '')
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

function getTopWindowReferrer() {
  try {
    return window.top.document.referrer;
  } catch (e) {
    return '';
  }
}

function setConsentParams(gdprConsent, uspConsent, payload) {
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

    if (gdprConsent.apiVersion === 1 && gdprConsent.vendorData && gdprConsent.vendorData.vendorConsents && typeof gdprConsent.vendorData.vendorConsents[FIDELITY_VENDOR_ID.toString(10)] !== 'undefined') {
      payload.consent_given = gdprConsent.vendorData.vendorConsents[FIDELITY_VENDOR_ID.toString(10)] ? 1 : 0;
    }

    if (gdprConsent.apiVersion === 2 && gdprConsent.vendorData && gdprConsent.vendorData.vendor && gdprConsent.vendorData.vendor.consents && typeof gdprConsent.vendorData.vendor.consents[FIDELITY_VENDOR_ID.toString(10)] !== 'undefined') {
      payload.consent_given = gdprConsent.vendorData.vendor.consents[FIDELITY_VENDOR_ID.toString(10)] ? 1 : 0;
    }
  }

  if (typeof uspConsent !== 'undefined') {
    payload.us_privacy = uspConsent;
  }
}

function getSupplyChain(schain) {
  var supplyChain = '';

  if (schain != null && schain.nodes) {
    supplyChain = schain.ver + ',' + schain.complete;

    for (var i = 0; i < schain.nodes.length; i++) {
      supplyChain += '!';
      supplyChain += schain.nodes[i].asi ? encodeURIComponent(schain.nodes[i].asi) : '';
      supplyChain += ',';
      supplyChain += schain.nodes[i].sid ? encodeURIComponent(schain.nodes[i].sid) : '';
      supplyChain += ',';
      supplyChain += schain.nodes[i].hp ? encodeURIComponent(schain.nodes[i].hp) : '';
      supplyChain += ',';
      supplyChain += schain.nodes[i].rid ? encodeURIComponent(schain.nodes[i].rid) : '';
      supplyChain += ',';
      supplyChain += schain.nodes[i].name ? encodeURIComponent(schain.nodes[i].name) : '';
      supplyChain += ',';
      supplyChain += schain.nodes[i].domain ? encodeURIComponent(schain.nodes[i].domain) : '';
    }
  }

  return supplyChain;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[406]);