pbjsChunk([134],{

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(448);


/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["resetBoPixel"] = resetBoPixel;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_userSync__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_url__ = __webpack_require__(9);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var SUPPORTED_AD_TYPES = [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */]];
var BIDDER_CODE = 'openx';
var BIDDER_CONFIG = 'hb_pb';
var BIDDER_VERSION = '2.1.9';
var USER_ID_CODE_TO_QUERY_ARG = {
  idl_env: 'lre',
  // liveramp
  pubcid: 'pubcid',
  // publisher common id
  tdid: 'ttduuid' // the trade desk

};
var shouldSendBoPixel = true;
function resetBoPixel() {
  shouldSendBoPixel = true;
}
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: SUPPORTED_AD_TYPES,
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    var hasDelDomainOrPlatform = bidRequest.params.delDomain || bidRequest.params.platform;

    if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bidRequest, 'mediaTypes.banner') && hasDelDomainOrPlatform) {
      return !!bidRequest.params.unit || __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bidRequest, 'mediaTypes.banner.sizes.length') > 0;
    }

    return !!(bidRequest.params.unit && hasDelDomainOrPlatform);
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    if (bidRequests.length === 0) {
      return [];
    }

    var requests = [];

    var _partitionByVideoBids = partitionByVideoBids(bidRequests),
        _partitionByVideoBids2 = _slicedToArray(_partitionByVideoBids, 2),
        videoBids = _partitionByVideoBids2[0],
        bannerBids = _partitionByVideoBids2[1]; // build banner requests


    if (bannerBids.length > 0) {
      requests.push(buildOXBannerRequest(bannerBids, bidderRequest));
    } // build video requests


    if (videoBids.length > 0) {
      videoBids.forEach(function (videoBid) {
        requests.push(buildOXVideoRequest(videoBid, bidderRequest));
      });
    }

    return requests;
  },
  interpretResponse: function interpretResponse(_ref, serverRequest) {
    var oxResponseObj = _ref.body;
    var mediaType = getMediaTypeFromRequest(serverRequest);
    return mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */] ? createVideoBidResponses(oxResponseObj, serverRequest.payload) : createBannerBidResponses(oxResponseObj, serverRequest.payload);
  },
  getUserSyncs: function getUserSyncs(syncOptions, responses) {
    if (syncOptions.iframeEnabled || syncOptions.pixelEnabled) {
      var pixelType = syncOptions.iframeEnabled ? 'iframe' : 'image';
      var url = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](responses, '0.body.ads.pixels') || __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](responses, '0.body.pixels') || 'https://u.openx.net/w/1.0/pd';
      return [{
        type: pixelType,
        url: url
      }];
    }
  },
  transformBidParams: function transformBidParams(params, isOpenRtb) {
    return __WEBPACK_IMPORTED_MODULE_2__src_utils__["convertTypes"]({
      'unit': 'string',
      'customFloor': 'number'
    }, params);
  }
};

function isVideoRequest(bidRequest) {
  return __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video') && !__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bidRequest, 'mediaTypes.banner') || bidRequest.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */];
}

function createBannerBidResponses(oxResponseObj, _ref2) {
  var bids = _ref2.bids,
      startTime = _ref2.startTime;
  var adUnits = oxResponseObj.ads.ad;
  var bidResponses = [];

  for (var i = 0; i < adUnits.length; i++) {
    var adUnit = adUnits[i];
    var adUnitIdx = parseInt(adUnit.idx, 10);
    var bidResponse = {};
    bidResponse.requestId = bids[adUnitIdx].bidId;

    if (adUnit.pub_rev) {
      bidResponse.cpm = Number(adUnit.pub_rev) / 1000;
    } else {
      // No fill, do not add the bidresponse
      continue;
    }

    var creative = adUnit.creative[0];

    if (creative) {
      bidResponse.width = creative.width;
      bidResponse.height = creative.height;
    }

    bidResponse.creativeId = creative.id;
    bidResponse.ad = adUnit.html;

    if (adUnit.deal_id) {
      bidResponse.dealId = adUnit.deal_id;
    } // default 5 mins


    bidResponse.ttl = 300; // true is net, false is gross

    bidResponse.netRevenue = true;
    bidResponse.currency = adUnit.currency; // additional fields to add

    if (adUnit.tbd) {
      bidResponse.tbd = adUnit.tbd;
    }

    bidResponse.ts = adUnit.ts;
    bidResponse.meta = {};

    if (adUnit.brand_id) {
      bidResponse.meta.brandId = adUnit.brand_id;
    }

    if (adUnit.adv_id) {
      bidResponse.meta.dspid = adUnit.adv_id;
    }

    bidResponses.push(bidResponse);
    registerBeacon(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */], adUnit, startTime);
  }

  return bidResponses;
}

function buildQueryStringFromParams(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      if (!params[key]) {
        delete params[key];
      }
    }
  }

  return __WEBPACK_IMPORTED_MODULE_2__src_utils__["_map"](Object.keys(params), function (key) {
    return "".concat(key, "=").concat(params[key]);
  }).join('&');
}

function getViewportDimensions(isIfr) {
  var width;
  var height;
  var tWin = window;
  var tDoc = document;
  var docEl = tDoc.documentElement;
  var body;

  if (isIfr) {
    try {
      tWin = window.top;
      tDoc = window.top.document;
    } catch (e) {
      return;
    }

    docEl = tDoc.documentElement;
    body = tDoc.body;
    width = tWin.innerWidth || docEl.clientWidth || body.clientWidth;
    height = tWin.innerHeight || docEl.clientHeight || body.clientHeight;
  } else {
    docEl = tDoc.documentElement;
    width = tWin.innerWidth || docEl.clientWidth;
    height = tWin.innerHeight || docEl.clientHeight;
  }

  return "".concat(width, "x").concat(height);
}

function formatCustomParms(customKey, customParams) {
  var value = customParams[customKey];

  if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](value)) {
    // if value is an array, join them with commas first
    value = value.join(',');
  } // return customKey=customValue format, escaping + to . and / to _


  return (customKey.toLowerCase() + '=' + value.toLowerCase()).replace('+', '.').replace('/', '_');
}

function partitionByVideoBids(bidRequests) {
  return bidRequests.reduce(function (acc, bid) {
    // Fallback to banner ads if nothing specified
    if (isVideoRequest(bid)) {
      acc[0].push(bid);
    } else {
      acc[1].push(bid);
    }

    return acc;
  }, [[], []]);
}

function getMediaTypeFromRequest(serverRequest) {
  return /avjp$/.test(serverRequest.url) ? __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */] : __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */];
}

function buildCommonQueryParamsFromBids(bids, bidderRequest) {
  var isInIframe = __WEBPACK_IMPORTED_MODULE_2__src_utils__["inIframe"]();
  var defaultParams;
  defaultParams = {
    ju: __WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig('pageUrl') || __WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowUrl"](),
    jr: __WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowReferrer"](),
    ch: document.charSet || document.characterSet,
    res: "".concat(screen.width, "x").concat(screen.height, "x").concat(screen.colorDepth),
    ifr: isInIframe,
    tz: new Date().getTimezoneOffset(),
    tws: getViewportDimensions(isInIframe),
    be: 1,
    bc: bids[0].params.bc || "".concat(BIDDER_CONFIG, "_").concat(BIDDER_VERSION),
    dddid: __WEBPACK_IMPORTED_MODULE_2__src_utils__["_map"](bids, function (bid) {
      return bid.transactionId;
    }).join(','),
    nocache: new Date().getTime()
  };

  if (bids[0].params.platform) {
    defaultParams.ph = bids[0].params.platform;
  }

  if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bidderRequest, 'gdprConsent')) {
    var gdprConsentConfig = bidderRequest.gdprConsent;

    if (gdprConsentConfig.consentString !== undefined) {
      defaultParams.gdpr_consent = gdprConsentConfig.consentString;
    }

    if (gdprConsentConfig.gdprApplies !== undefined) {
      defaultParams.gdpr = gdprConsentConfig.gdprApplies ? 1 : 0;
    }

    if (__WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig('consentManagement.cmpApi') === 'iab') {
      defaultParams.x_gdpr_f = 1;
    }
  } // normalize publisher common id


  if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bids[0], 'crumbs.pubcid')) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepSetValue"](bids[0], 'userId.pubcid', __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bids[0], 'crumbs.pubcid'));
  }

  defaultParams = appendUserIdsToQueryParams(defaultParams, bids[0].userId); // supply chain support

  if (bids[0].schain) {
    defaultParams.schain = serializeSupplyChain(bids[0].schain);
  }

  return defaultParams;
}

function appendUserIdsToQueryParams(queryParams, userIds) {
  __WEBPACK_IMPORTED_MODULE_2__src_utils__["_each"](userIds, function (userIdValue, userIdProviderKey) {
    if (USER_ID_CODE_TO_QUERY_ARG.hasOwnProperty(userIdProviderKey)) {
      queryParams[USER_ID_CODE_TO_QUERY_ARG[userIdProviderKey]] = userIdValue;
    }
  });

  return queryParams;
}

function serializeSupplyChain(supplyChain) {
  return "".concat(supplyChain.ver, ",").concat(supplyChain.complete, "!").concat(serializeSupplyChainNodes(supplyChain.nodes));
}

function serializeSupplyChainNodes(supplyChainNodes) {
  var supplyChainNodePropertyOrder = ['asi', 'sid', 'hp', 'rid', 'name', 'domain'];
  return supplyChainNodes.map(function (supplyChainNode) {
    return supplyChainNodePropertyOrder.map(function (property) {
      return supplyChainNode[property] || '';
    }).join(',');
  }).join('!');
}

function buildOXBannerRequest(bids, bidderRequest) {
  var customParamsForAllBids = [];
  var hasCustomParam = false;
  var queryParams = buildCommonQueryParamsFromBids(bids, bidderRequest);

  var auids = __WEBPACK_IMPORTED_MODULE_2__src_utils__["_map"](bids, function (bid) {
    return bid.params.unit;
  });

  queryParams.aus = __WEBPACK_IMPORTED_MODULE_2__src_utils__["_map"](bids, function (bid) {
    return __WEBPACK_IMPORTED_MODULE_2__src_utils__["parseSizesInput"](bid.sizes).join(',');
  }).join('|');
  queryParams.divIds = __WEBPACK_IMPORTED_MODULE_2__src_utils__["_map"](bids, function (bid) {
    return encodeURIComponent(bid.adUnitCode);
  }).join(',');

  if (auids.some(function (auid) {
    return auid;
  })) {
    queryParams.auid = auids.join(',');
  }

  if (bids.some(function (bid) {
    return bid.params.doNotTrack;
  })) {
    queryParams.ns = 1;
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig('coppa') === true || bids.some(function (bid) {
    return bid.params.coppa;
  })) {
    queryParams.tfcd = 1;
  }

  bids.forEach(function (bid) {
    if (bid.params.customParams) {
      var customParamsForBid = __WEBPACK_IMPORTED_MODULE_2__src_utils__["_map"](Object.keys(bid.params.customParams), function (customKey) {
        return formatCustomParms(customKey, bid.params.customParams);
      });

      var formattedCustomParams = window.btoa(customParamsForBid.join('&'));
      hasCustomParam = true;
      customParamsForAllBids.push(formattedCustomParams);
    } else {
      customParamsForAllBids.push('');
    }
  });

  if (hasCustomParam) {
    queryParams.tps = customParamsForAllBids.join(',');
  }

  var customFloorsForAllBids = [];
  var hasCustomFloor = false;
  bids.forEach(function (bid) {
    if (bid.params.customFloor) {
      customFloorsForAllBids.push(Math.round(bid.params.customFloor * 100) / 100 * 1000);
      hasCustomFloor = true;
    } else {
      customFloorsForAllBids.push(0);
    }
  });

  if (hasCustomFloor) {
    queryParams.aumfs = customFloorsForAllBids.join(',');
  }

  var url = queryParams.ph ? "https://u.openx.net/w/1.0/arj" : "https://".concat(bids[0].params.delDomain, "/w/1.0/arj");
  return {
    method: 'GET',
    url: url,
    data: queryParams,
    payload: {
      'bids': bids,
      'startTime': new Date()
    }
  };
}

function buildOXVideoRequest(bid, bidderRequest) {
  var oxVideoParams = generateVideoParameters(bid, bidderRequest);
  var url = oxVideoParams.ph ? "https://u.openx.net/v/1.0/avjp" : "https://".concat(bid.params.delDomain, "/v/1.0/avjp");
  return {
    method: 'GET',
    url: url,
    data: oxVideoParams,
    payload: {
      'bid': bid,
      'startTime': new Date()
    }
  };
}

function generateVideoParameters(bid, bidderRequest) {
  var queryParams = buildCommonQueryParamsFromBids([bid], bidderRequest);
  var oxVideoConfig = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bid, 'params.video') || {};
  var context = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bid, 'mediaTypes.video.context');
  var playerSize = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bid, 'mediaTypes.video.playerSize');
  var width;
  var height; // normalize config for video size

  if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](bid.sizes) && bid.sizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](bid.sizes[0])) {
    width = parseInt(bid.sizes[0], 10);
    height = parseInt(bid.sizes[1], 10);
  } else if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](bid.sizes) && __WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](bid.sizes[0]) && bid.sizes[0].length === 2) {
    width = parseInt(bid.sizes[0][0], 10);
    height = parseInt(bid.sizes[0][1], 10);
  } else if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](playerSize) && playerSize.length === 2) {
    width = parseInt(playerSize[0], 10);
    height = parseInt(playerSize[1], 10);
  }

  Object.keys(oxVideoConfig).forEach(function (key) {
    if (key === 'openrtb') {
      oxVideoConfig[key].w = width || oxVideoConfig[key].w;
      oxVideoConfig[key].v = height || oxVideoConfig[key].v;
      queryParams[key] = JSON.stringify(oxVideoConfig[key]);
    } else if (!(key in queryParams) && key !== 'url') {
      // only allow video-related attributes
      queryParams[key] = oxVideoConfig[key];
    }
  });
  queryParams.auid = bid.params.unit; // override prebid config with openx config if available

  queryParams.vwd = width || oxVideoConfig.vwd;
  queryParams.vht = height || oxVideoConfig.vht;

  if (context === 'outstream') {
    queryParams.vos = '101';
  }

  if (oxVideoConfig.mimes) {
    queryParams.vmimes = oxVideoConfig.mimes;
  }

  return queryParams;
}

function createVideoBidResponses(response, _ref3) {
  var bid = _ref3.bid,
      startTime = _ref3.startTime;
  var bidResponses = [];

  if (response !== undefined && response.vastUrl !== '' && response.pub_rev !== '') {
    var vastQueryParams = Object(__WEBPACK_IMPORTED_MODULE_5__src_url__["c" /* parse */])(response.vastUrl).search || {};
    var bidResponse = {};
    bidResponse.requestId = bid.bidId; // default 5 mins

    bidResponse.ttl = 300; // true is net, false is gross

    bidResponse.netRevenue = true;
    bidResponse.currency = response.currency;
    bidResponse.cpm = Number(response.pub_rev) / 1000;
    bidResponse.width = response.width;
    bidResponse.height = response.height;
    bidResponse.creativeId = response.adid;
    bidResponse.vastUrl = response.vastUrl;
    bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */]; // enrich adunit with vast parameters

    response.ph = vastQueryParams.ph;
    response.colo = vastQueryParams.colo;
    response.ts = vastQueryParams.ts;
    bidResponses.push(bidResponse);
    registerBeacon(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */], response, startTime);
  }

  return bidResponses;
}

function registerBeacon(mediaType, adUnit, startTime) {
  // only register beacon once
  if (!shouldSendBoPixel) {
    return;
  }

  shouldSendBoPixel = false;
  var bt = __WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig('bidderTimeout');
  var beaconUrl;

  if (window.PREBID_TIMEOUT) {
    bt = Math.min(window.PREBID_TIMEOUT, bt);
  }

  var beaconParams = {
    bd: +new Date() - startTime,
    bp: adUnit.pub_rev,
    br: '0',
    // may be 0, t, or p
    bs: __WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowLocation"]().hostname,
    bt: bt,
    ts: adUnit.ts
  };
  beaconParams.br = beaconParams.bt < beaconParams.bd ? 't' : 'p';

  if (mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */]) {
    var url = Object(__WEBPACK_IMPORTED_MODULE_5__src_url__["c" /* parse */])(adUnit.colo);
    beaconParams.ph = adUnit.ph;
    beaconUrl = "https://".concat(url.hostname, "/w/1.0/bo?").concat(buildQueryStringFromParams(beaconParams));
  } else {
    var recordPixel = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](adUnit, 'creative.0.tracking.impression');
    var boBase = recordPixel.match(/([^?]+\/)ri\?/);

    if (boBase && boBase.length > 1) {
      beaconUrl = "".concat(boBase[1], "bo?").concat(buildQueryStringFromParams(beaconParams));
    }
  }

  if (beaconUrl) {
    __WEBPACK_IMPORTED_MODULE_3__src_userSync__["a" /* userSync */].registerSync('image', BIDDER_CODE, beaconUrl);
  }
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[447]);