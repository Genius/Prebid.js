pbjsChunk([38],{

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(296);


/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BB_HELPERS", function() { return BB_HELPERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__userId_eids_js__ = __webpack_require__(44);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }







var DEV_MODE = window.location.search.match(/bbpbs_debug=true/); // Blue Billywig Constants

var BB_CONSTANTS = {
  BIDDER_CODE: 'bluebillywig',
  AUCTION_URL: '$$URL_STARTpbs.bluebillywig.com/openrtb2/auction?pub=$$PUBLICATION',
  SYNC_URL: '$$URL_STARTpbs.bluebillywig.com/static/cookie-sync.html?pub=$$PUBLICATION',
  RENDERER_URL: 'https://$$PUBLICATION.bbvms.com/r/$$RENDERER.js',
  DEFAULT_TIMEOUT: 5000,
  DEFAULT_TTL: 300,
  DEFAULT_WIDTH: 768,
  DEFAULT_HEIGHT: 432,
  DEFAULT_NET_REVENUE: true
}; // Aliasing

var getConfig = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig; // Helper Functions

var BB_HELPERS = {
  addSiteAppDevice: function addSiteAppDevice(request, pageUrl) {
    if (!request) return;
    if (_typeof(getConfig('app')) === 'object') request.app = getConfig('app');else {
      request.site = {};
      if (_typeof(getConfig('site')) === 'object') request.site = getConfig('site');
      if (pageUrl) request.site.page = pageUrl;
    }
    if (_typeof(getConfig('device')) === 'object') request.device = getConfig('device');
    if (!request.device) request.device = {};
    if (!request.device.w) request.device.w = window.innerWidth;
    if (!request.device.h) request.device.h = window.innerHeight;
  },
  addSchain: function addSchain(request, validBidRequests) {
    if (!request) return;
    var schain = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests, '0.schain');
    if (schain) request.source.ext = {
      schain: schain
    };
  },
  addCurrency: function addCurrency(request) {
    if (!request) return;
    var adServerCur = getConfig('currency.adServerCurrency');
    if (adServerCur && typeof adServerCur === 'string') request.cur = [adServerCur];else if (Array.isArray(adServerCur) && adServerCur.length) request.cur = [adServerCur[0]];
  },
  addUserIds: function addUserIds(request, validBidRequests) {
    if (!request) return;
    var bidUserId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests, '0.userId');
    var eids = Object(__WEBPACK_IMPORTED_MODULE_5__userId_eids_js__["a" /* createEidsArray */])(bidUserId);

    if (eids.length) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](request, 'user.ext.eids', eids);
    }
  },
  addDigiTrust: function addDigiTrust(request, bidRequests) {
    var digiTrust = BB_HELPERS.getDigiTrustParams(bidRequests && bidRequests[0]);
    if (digiTrust) __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](request, 'user.ext.digitrust', digiTrust);
  },
  substituteUrl: function substituteUrl(url, publication, renderer) {
    return url.replace('$$URL_START', DEV_MODE ? 'https://dev.' : 'https://').replace('$$PUBLICATION', publication).replace('$$RENDERER', renderer);
  },
  getAuctionUrl: function getAuctionUrl(publication) {
    return BB_HELPERS.substituteUrl(BB_CONSTANTS.AUCTION_URL, publication);
  },
  getSyncUrl: function getSyncUrl(publication) {
    return BB_HELPERS.substituteUrl(BB_CONSTANTS.SYNC_URL, publication);
  },
  getRendererUrl: function getRendererUrl(publication, renderer) {
    return BB_HELPERS.substituteUrl(BB_CONSTANTS.RENDERER_URL, publication, renderer);
  },
  getDigiTrustParams: function getDigiTrustParams(bidRequest) {
    var digiTrustId = BB_HELPERS.getDigiTrustId(bidRequest);
    if (!digiTrustId || digiTrustId.privacy && digiTrustId.privacy.optout) return null;
    return {
      id: digiTrustId.id,
      keyv: digiTrustId.keyv
    };
  },
  getDigiTrustId: function getDigiTrustId(bidRequest) {
    var bidRequestDigiTrust = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'userId.digitrustid.data');
    if (bidRequestDigiTrust) return bidRequestDigiTrust;
    var digiTrustUser = getConfig('digiTrustId');
    return digiTrustUser && digiTrustUser.success && digiTrustUser.identity || null;
  },
  transformRTBToPrebidProps: function transformRTBToPrebidProps(bid, serverResponse) {
    bid.cpm = bid.price;
    delete bid.price;
    bid.bidId = bid.impid;
    bid.requestId = bid.impid;
    delete bid.impid;
    bid.width = bid.w || BB_CONSTANTS.DEFAULT_WIDTH;
    bid.height = bid.h || BB_CONSTANTS.DEFAULT_HEIGHT;

    if (bid.adm) {
      bid.ad = bid.adm;
      bid.vastXml = bid.adm;
      delete bid.adm;
    }

    if (bid.nurl && !bid.adm) {
      // ad markup is on win notice url, and adm is ommited according to OpenRTB 2.5
      bid.vastUrl = bid.nurl;
      delete bid.nurl;
    }

    bid.netRevenue = BB_CONSTANTS.DEFAULT_NET_REVENUE;
    bid.creativeId = bid.crid;
    delete bid.crid;
    bid.currency = serverResponse.cur;
    bid.ttl = BB_CONSTANTS.DEFAULT_TTL;
  }
}; // Renderer Functions

var BB_RENDERER = {
  bootstrapPlayer: function bootstrapPlayer(bid) {
    var config = {
      code: bid.adUnitCode
    };
    if (bid.vastXml) config.vastXml = bid.vastXml;else if (bid.vastUrl) config.vastUrl = bid.vastUrl;

    if (!bid.vastXml && !bid.vastUrl) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": No vastXml or vastUrl on bid, bailing..."));
      return;
    }

    var rendererId = BB_RENDERER.getRendererId(bid.publicationName, bid.rendererCode);
    var ele = document.getElementById(bid.adUnitCode); // NB convention

    var renderer;

    for (var rendererIndex = 0; rendererIndex < window.bluebillywig.renderers.length; rendererIndex++) {
      if (window.bluebillywig.renderers[rendererIndex]._id === rendererId) {
        renderer = window.bluebillywig.renderers[rendererIndex];
        break;
      }
    }

    if (renderer) renderer.bootstrap(config, ele);else __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": Couldn't find a renderer with ").concat(rendererId));
  },
  newRenderer: function newRenderer(rendererUrl, adUnitCode) {
    var renderer = __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__["a" /* Renderer */].install({
      url: rendererUrl,
      loaded: false,
      adUnitCode: adUnitCode
    });

    try {
      renderer.setRender(BB_RENDERER.outstreamRender);
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": Error tying to setRender on renderer"), err);
    }

    return renderer;
  },
  outstreamRender: function outstreamRender(bid) {
    bid.renderer.push(function () {
      BB_RENDERER.bootstrapPlayer(bid);
    });
  },
  getRendererId: function getRendererId(pub, renderer) {
    return "".concat(pub, "-").concat(renderer); // NB convention!
  }
}; // Spec Functions
// These functions are used to construct the core spec for the adapter

var spec = {
  code: BB_CONSTANTS.BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],
  syncStore: {
    bidders: []
  },
  isBidRequestValid: function isBidRequestValid(bid) {
    var publicationNameRegex = /^\w+\.?\w+$/;
    var rendererRegex = /^[\w+_]+$/;

    if (!bid.params) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": no params set on bid. Rejecting bid: "), bid);
      return false;
    }

    if (!bid.params.hasOwnProperty('publicationName') || typeof bid.params.publicationName !== 'string') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": no publicationName specified in bid params, or it's not a string. Rejecting bid: "), bid);
      return false;
    } else if (!publicationNameRegex.test(bid.params.publicationName)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": publicationName must be in format 'publication' or 'publication.environment'. Rejecting bid: "), bid);
      return false;
    }

    if (!bid.params.hasOwnProperty('rendererCode') || typeof bid.params.rendererCode !== 'string') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": no rendererCode was specified in bid params. Rejecting bid: "), bid);
      return false;
    } else if (!rendererRegex.test(bid.params.rendererCode)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": rendererCode must be alphanumeric, including underscores. Rejecting bid: "), bid);
      return false;
    }

    if (!bid.params.accountId) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": no accountId specified in bid params. Rejecting bid: "), bid);
      return false;
    }

    if (bid.params.hasOwnProperty('connections')) {
      if (!Array.isArray(bid.params.connections)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": connections is not of type array. Rejecting bid: "), bid);
        return false;
      } else {
        for (var connectionIndex = 0; connectionIndex < bid.params.connections.length; connectionIndex++) {
          var connection = bid.params.connections[connectionIndex];

          if (!bid.params.hasOwnProperty(connection)) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": connection specified in params.connections, but not configured in params. Rejecting bid: "), bid);
            return false;
          }
        }
      }
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": no connections specified in bid. Rejecting bid: "), bid);
      return false;
    }

    if (bid.hasOwnProperty('mediaTypes') && bid.mediaTypes.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */])) {
      if (!bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]].hasOwnProperty('context')) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": no context specified in bid. Rejecting bid: "), bid);
        return false;
      }

      if (bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]].context !== 'outstream') {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": video.context is invalid, must be \"outstream\". Rejecting bid: "), bid);
        return false;
      }
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(BB_CONSTANTS.BIDDER_CODE, ": mediaTypes or mediaTypes.video is not specified. Rejecting bid: "), bid);
      return false;
    }

    return true;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var _this2 = this;

    var imps = [];

    var _loop = function _loop(validBidRequestIndex) {
      var validBidRequest = validBidRequests[validBidRequestIndex];
      var _this = _this2;
      var ext = validBidRequest.params.connections.reduce(function (extBuilder, connection) {
        extBuilder[connection] = validBidRequest.params[connection];
        if (_this.syncStore.bidders.indexOf(connection) === -1) _this.syncStore.bidders.push(connection);
        return extBuilder;
      }, {});
      imps.push({
        id: validBidRequest.bidId,
        ext: ext,
        secure: window.location.protocol === 'https' ? 1 : 0,
        video: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequest, 'mediaTypes.video')
      });
    };

    for (var validBidRequestIndex = 0; validBidRequestIndex < validBidRequests.length; validBidRequestIndex++) {
      _loop(validBidRequestIndex);
    }

    var request = {
      id: bidderRequest.auctionId,
      source: {
        tid: bidderRequest.auctionId
      },
      tmax: BB_CONSTANTS.DEFAULT_TIMEOUT,
      imp: imps,
      test: DEV_MODE ? 1 : 0,
      ext: {
        prebid: {
          targeting: {
            includewinners: true,
            includebidderkeys: false
          }
        }
      }
    }; // handle privacy settings for GDPR/CCPA/COPPA

    if (bidderRequest.gdprConsent) {
      var gdprApplies = 0;
      if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') gdprApplies = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](request, 'regs.ext.gdpr', gdprApplies);
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](request, 'user.ext.consent', bidderRequest.gdprConsent.consentString);
    }

    if (bidderRequest.uspConsent) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](request, 'regs.ext.us_privacy', bidderRequest.uspConsent);
      this.syncStore.uspConsent = bidderRequest.uspConsent;
    }

    if (getConfig('coppa') == true) __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](request, 'regs.coppa', 1); // Enrich the request with any external data we may have

    BB_HELPERS.addSiteAppDevice(request, bidderRequest.refererInfo && bidderRequest.refererInfo.referer);
    BB_HELPERS.addSchain(request, validBidRequests);
    BB_HELPERS.addCurrency(request);
    BB_HELPERS.addUserIds(request, validBidRequests);
    BB_HELPERS.addDigiTrust(request, validBidRequests);
    return {
      method: 'POST',
      url: BB_HELPERS.getAuctionUrl(validBidRequests[0].params.publicationName),
      data: JSON.stringify(request),
      bidderRequest: bidderRequest
    };
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    serverResponse = serverResponse.body || {};

    if (!serverResponse.hasOwnProperty('seatbid') || !Array.isArray(serverResponse.seatbid)) {
      return [];
    }

    var bids = [];

    for (var seatbidIndex = 0; seatbidIndex < serverResponse.seatbid.length; seatbidIndex++) {
      var seatbid = serverResponse.seatbid[seatbidIndex];
      if (!seatbid.bid || !Array.isArray(seatbid.bid)) continue;

      for (var bidIndex = 0; bidIndex < seatbid.bid.length; bidIndex++) {
        var bid = seatbid.bid[bidIndex];
        BB_HELPERS.transformRTBToPrebidProps(bid, serverResponse);
        var bidParams = void 0;

        for (var bidderRequestBidsIndex = 0; bidderRequestBidsIndex < request.bidderRequest.bids.length; bidderRequestBidsIndex++) {
          if (request.bidderRequest.bids[bidderRequestBidsIndex].bidId === bid.bidId) {
            bidParams = request.bidderRequest.bids[bidderRequestBidsIndex].params;
          }
        }

        if (bidParams) {
          bid.publicationName = bidParams.publicationName;
          bid.rendererCode = bidParams.rendererCode;
          bid.accountId = bidParams.accountId;
        }

        var rendererUrl = BB_HELPERS.getRendererUrl(bid.publicationName, bid.rendererCode);
        bid.renderer = BB_RENDERER.newRenderer(rendererUrl, bid.adUnitCode);
        bids.push(bid);
      }
    }

    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdpr) {
    if (!serverResponses || !serverResponses.length) return [];
    if (!syncOptions.iframeEnabled) return [];
    var queryString = [];
    var accountId;
    var publication;
    var serverResponse = serverResponses[0];
    if (!serverResponse.body || !serverResponse.body.seatbid) return [];

    for (var seatbidIndex = 0; seatbidIndex < serverResponse.body.seatbid.length; seatbidIndex++) {
      var seatbid = serverResponse.body.seatbid[seatbidIndex];

      for (var bidIndex = 0; bidIndex < seatbid.bid.length; bidIndex++) {
        var bid = seatbid.bid[bidIndex];
        accountId = bid.accountId || null;
        publication = bid.publicationName || null;
        if (publication && accountId) break;
      }

      if (publication && accountId) break;
    }

    if (!publication || !accountId) return [];
    if (gdpr.gdprApplies) queryString.push("gdpr=".concat(gdpr.gdprApplies ? 1 : 0));
    if (gdpr.gdprApplies && gdpr.consentString) queryString.push("gdpr_consent=".concat(gdpr.consentString));
    if (this.syncStore.uspConsent) queryString.push("usp_consent=".concat(this.syncStore.uspConsent));
    queryString.push("accountId=".concat(accountId));
    queryString.push("bidders=".concat(btoa(JSON.stringify(this.syncStore.bidders))));
    queryString.push("cb=".concat(Date.now(), "-").concat(Math.random().toString().replace('.', '')));
    if (DEV_MODE) queryString.push('bbpbs_debug=true'); // NB syncUrl by default starts with ?pub=$$PUBLICATION

    var syncUrl = "".concat(BB_HELPERS.getSyncUrl(publication), "&").concat(queryString.join('&'));
    return [{
      type: 'iframe',
      url: syncUrl
    }];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createEidsArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
 // Each user-id sub-module is expected to mention respective config here

var USER_IDS_CONFIG = {
  // key-name : {config}
  // intentIqId
  'intentIqId': {
    source: 'intentiq.com',
    atype: 1
  },
  // pubCommonId
  'pubcid': {
    source: 'pubcid.org',
    atype: 1
  },
  // unifiedId
  'tdid': {
    source: 'adserver.org',
    atype: 1,
    getUidExt: function getUidExt() {
      return {
        rtiPartner: 'TDID'
      };
    }
  },
  // id5Id
  'id5id': {
    source: 'id5-sync.com',
    atype: 1
  },
  // parrableId
  'parrableId': {
    source: 'parrable.com',
    atype: 1,
    getValue: function getValue(parrableId) {
      if (parrableId.eid) {
        return parrableId.eid;
      }

      if (parrableId.ccpaOptout) {
        // If the EID was suppressed due to a non consenting ccpa optout then
        // we still wish to provide this as a reason to the adapters
        return '';
      }

      return null;
    },
    getUidExt: function getUidExt(parrableId) {
      var extendedData = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["pick"](parrableId, ['ibaOptout', 'ccpaOptout']);

      if (Object.keys(extendedData).length) {
        return extendedData;
      }
    }
  },
  // identityLink
  'idl_env': {
    source: 'liveramp.com',
    atype: 1
  },
  // liveIntentId
  'lipb': {
    getValue: function getValue(data) {
      return data.lipbid;
    },
    source: 'liveintent.com',
    atype: 1,
    getEidExt: function getEidExt(data) {
      if (Array.isArray(data.segments) && data.segments.length) {
        return {
          segments: data.segments
        };
      }
    }
  },
  // britepoolId
  'britepoolid': {
    source: 'britepool.com',
    atype: 1
  },
  // lotamePanoramaId
  lotamePanoramaId: {
    source: 'crwdcntrl.net',
    atype: 1
  },
  // criteo
  'criteoId': {
    source: 'criteo.com',
    atype: 1
  },
  // NetId
  'netId': {
    source: 'netid.de',
    atype: 1
  },
  // sharedid
  'sharedid': {
    source: 'sharedid.org',
    atype: 1,
    getValue: function getValue(data) {
      return data.id;
    },
    getUidExt: function getUidExt(data) {
      return data && data.third ? {
        third: data.third
      } : undefined;
    }
  }
}; // this function will create an eid object for the given UserId sub-module

function createEidObject(userIdData, subModuleKey) {
  var conf = USER_IDS_CONFIG[subModuleKey];

  if (conf && userIdData) {
    var eid = {};
    eid.source = conf['source'];
    var value = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isFn"](conf['getValue']) ? conf['getValue'](userIdData) : userIdData;

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](value)) {
      var uid = {
        id: value,
        atype: conf['atype']
      }; // getUidExt

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isFn"](conf['getUidExt'])) {
        var uidExt = conf['getUidExt'](userIdData);

        if (uidExt) {
          uid.ext = uidExt;
        }
      }

      eid.uids = [uid]; // getEidExt

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isFn"](conf['getEidExt'])) {
        var eidExt = conf['getEidExt'](userIdData);

        if (eidExt) {
          eid.ext = eidExt;
        }
      }

      return eid;
    }
  }

  return null;
} // this function will generate eids array for all available IDs in bidRequest.userId
// this function will be called by userId module
// if any adapter does not want any particular userId to be passed then adapter can use Array.filter(e => e.source != 'tdid')


function createEidsArray(bidRequestUserId) {
  var eids = [];

  for (var subModuleKey in bidRequestUserId) {
    if (bidRequestUserId.hasOwnProperty(subModuleKey)) {
      var eid = createEidObject(bidRequestUserId[subModuleKey], subModuleKey);

      if (eid) {
        eids.push(eid);
      }
    }
  }

  return eids;
}

/***/ })

},[295]);