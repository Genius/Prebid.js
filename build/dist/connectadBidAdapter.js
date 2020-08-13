pbjsChunk([249],{

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(336);


/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var BIDDER_CODE = 'connectad';
var BIDDER_CODE_ALIAS = 'connectadrealtime';
var ENDPOINT_URL = 'https://i.connectad.io/api/v2';
var SUPPORTED_MEDIA_TYPES = [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]];
var spec = {
  code: BIDDER_CODE,
  aliases: [BIDDER_CODE_ALIAS],
  supportedMediaTypes: SUPPORTED_MEDIA_TYPES,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.networkId && bid.params.siteId);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var digitrust;
    var ret = {
      method: 'POST',
      url: '',
      data: '',
      bidRequest: []
    };

    if (validBidRequests.length < 1) {
      return ret;
    }

    var data = _extends({
      placements: [],
      time: Date.now(),
      user: {},
      url: bidderRequest.refererInfo && bidderRequest.refererInfo.referer ? bidderRequest.refererInfo.referer : window.location.href,
      referrer: window.document.referrer,
      referrer_info: bidderRequest.refererInfo,
      screensize: getScreenSize(),
      dnt: navigator.doNotTrack == 'yes' || navigator.doNotTrack == '1' || navigator.msDoNotTrack == '1' ? 1 : 0,
      language: navigator.language,
      ua: navigator.userAgent
    }); // coppa compliance


    if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('coppa') === true) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.coppa', 1);
    } // adding schain object


    if (validBidRequests[0].schain) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'source.ext.schain', validBidRequests[0].schain);
    } // Attaching GDPR Consent Params


    if (bidderRequest.gdprConsent) {
      var gdprApplies;

      if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') {
        gdprApplies = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;
      }

      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.ext.gdpr', gdprApplies);
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.ext.consent', bidderRequest.gdprConsent.consentString);
    } // CCPA


    if (bidderRequest.uspConsent) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.ext.us_privacy', bidderRequest.uspConsent);
    } // Digitrust Support


    var bidRequestDigitrust = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'userId.digitrustid.data');

    if (bidRequestDigitrust && (!bidRequestDigitrust.privacy || !bidRequestDigitrust.privacy.optout)) {
      digitrust = {
        id: bidRequestDigitrust.id,
        keyv: bidRequestDigitrust.keyv
      };
    }

    if (digitrust) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.ext.digitrust', {
        id: digitrust.id,
        keyv: digitrust.keyv
      });
    }

    if (validBidRequests[0].userId && _typeof(validBidRequests[0].userId) === 'object' && (validBidRequests[0].userId.tdid || validBidRequests[0].userId.pubcid || validBidRequests[0].userId.lipb || validBidRequests[0].userId.id5id || validBidRequests[0].userId.parrableId)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.ext.eids', []);

      if (validBidRequests[0].userId.tdid) {
        data.user.ext.eids.push({
          source: 'adserver.org',
          uids: [{
            id: validBidRequests[0].userId.tdid,
            ext: {
              rtiPartner: 'TDID'
            }
          }]
        });
      }

      if (validBidRequests[0].userId.pubcid) {
        data.user.ext.eids.push({
          source: 'pubcommon',
          uids: [{
            id: validBidRequests[0].userId.pubcid
          }]
        });
      }

      if (validBidRequests[0].userId.id5id) {
        data.user.ext.eids.push({
          source: 'id5-sync.com',
          uids: [{
            id: validBidRequests[0].userId.id5id
          }]
        });
      }

      if (validBidRequests[0].userId.parrableId) {
        data.user.ext.eids.push({
          source: 'parrable.com',
          uids: [{
            id: validBidRequests[0].userId.parrableId.eid
          }]
        });
      }

      if (validBidRequests[0].userId.lipb && validBidRequests[0].userId.lipb.lipbid) {
        data.user.ext.eids.push({
          source: 'liveintent.com',
          uids: [{
            id: validBidRequests[0].userId.lipb.lipbid
          }]
        });
      }
    }

    validBidRequests.map(function (bid) {
      var placement = _extends({
        id: bid.transactionId,
        divName: bid.bidId,
        sizes: bid.mediaTypes.banner.sizes,
        adTypes: getSize(bid.mediaTypes.banner.sizes || bid.sizes)
      }, bid.params);

      if (placement.networkId && placement.siteId) {
        data.placements.push(placement);
      }
    });
    ret.data = JSON.stringify(data);
    ret.bidRequest = validBidRequests;
    ret.url = ENDPOINT_URL;
    return ret;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest, bidderRequest) {
    var bid;
    var bids;
    var bidId;
    var bidObj;
    var bidResponses = [];
    bids = bidRequest.bidRequest;
    serverResponse = (serverResponse || {}).body;

    for (var i = 0; i < bids.length; i++) {
      bid = {};
      bidObj = bids[i];
      bidId = bidObj.bidId;

      if (serverResponse) {
        var decision = serverResponse.decisions && serverResponse.decisions[bidId];
        var price = decision && decision.pricing && decision.pricing.clearPrice;

        if (decision && price) {
          bid.requestId = bidId;
          bid.cpm = price;
          bid.width = decision.width;
          bid.height = decision.height;
          bid.dealid = decision.dealid || null;
          bid.ad = retrieveAd(decision);
          bid.currency = 'USD';
          bid.creativeId = decision.adId;
          bid.ttl = 360;
          bid.netRevenue = true;
          bidResponses.push(bid);
        }
      }
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent, uspConsent) {
    var syncEndpoint = 'https://cdn.connectad.io/connectmyusers.php?';

    if (gdprConsent) {
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'gdpr', gdprConsent.gdprApplies ? 1 : 0);
    }

    if (gdprConsent && typeof gdprConsent.consentString === 'string') {
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'gdpr_consent', gdprConsent.consentString);
    }

    if (uspConsent) {
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'us_privacy', uspConsent);
    }

    if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('coppa') === true) {
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'coppa', 1);
    }

    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: syncEndpoint
      }];
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Bidder ConnectAd: Please activate iFrame Sync');
    }
  }
};
var sizeMap = [null, '120x90', '200x200', '468x60', '728x90', '300x250', '160x600', '120x600', '300x100', '180x150', '336x280', '240x400', '234x60', '88x31', '120x60', '120x240', '125x125', '220x250', '250x250', '250x90', '0x0', '200x90', '300x50', '320x50', '320x480', '185x185', '620x45', '300x125', '800x250', '980x120', '980x150', '320x150', '300x300', '200x600', '320x500', '320x320'];
sizeMap[77] = '970x90';
sizeMap[123] = '970x250';
sizeMap[43] = '300x600';
sizeMap[286] = '970x66';
sizeMap[3230] = '970x280';
sizeMap[429] = '486x60';
sizeMap[374] = '700x500';
sizeMap[934] = '300x1050';
sizeMap[1578] = '320x100';
sizeMap[331] = '320x250';
sizeMap[3301] = '320x267';
sizeMap[2730] = '728x250';

function getSize(sizes) {
  var result = [];
  sizes.forEach(function (size) {
    var index = sizeMap.indexOf(size[0] + 'x' + size[1]);

    if (index >= 0) {
      result.push(index);
    }
  });
  return result;
}

function retrieveAd(decision) {
  return decision.contents && decision.contents[0] && decision.contents[0].body;
}

function getScreenSize() {
  return [window.screen.width, window.screen.height].join('x');
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[335]);