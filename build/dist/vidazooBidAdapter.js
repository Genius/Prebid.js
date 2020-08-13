pbjsChunk([67],{

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(785);


/***/ }),

/***/ 785:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUPPORTED_ID_SYSTEMS", function() { return SUPPORTED_ID_SYSTEMS; });
/* harmony export (immutable) */ __webpack_exports__["createDomain"] = createDomain;
/* harmony export (immutable) */ __webpack_exports__["extractCID"] = extractCID;
/* harmony export (immutable) */ __webpack_exports__["extractPID"] = extractPID;
/* harmony export (immutable) */ __webpack_exports__["extractSubDomain"] = extractSubDomain;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);



var DEFAULT_SUB_DOMAIN = 'prebid';
var BIDDER_CODE = 'vidazoo';
var BIDDER_VERSION = '1.0.0';
var CURRENCY = 'USD';
var TTL_SECONDS = 60 * 5;
var INTERNAL_SYNC_TYPE = {
  IFRAME: 'iframe',
  IMAGE: 'img'
};
var EXTERNAL_SYNC_TYPE = {
  IFRAME: 'iframe',
  IMAGE: 'image'
};
var SUPPORTED_ID_SYSTEMS = {
  'britepoolid': 1,
  'criteoId': 1,
  'digitrustid': 1,
  'id5id': 1,
  'idl_env': 1,
  'lipb': 1,
  'netId': 1,
  'parrableId': 1,
  'pubcid': 1,
  'tdid': 1
};
function createDomain() {
  var subDomain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_SUB_DOMAIN;
  return "https://".concat(subDomain, ".cootlogix.com");
}
function extractCID(params) {
  return params.cId || params.CID || params.cID || params.CId || params.cid || params.ciD || params.Cid || params.CiD;
}
function extractPID(params) {
  return params.pId || params.PID || params.pID || params.PId || params.pid || params.piD || params.Pid || params.PiD;
}
function extractSubDomain(params) {
  return params.subDomain || params.SubDomain || params.Subdomain || params.subdomain || params.SUBDOMAIN || params.subDOMAIN;
}

function isBidRequestValid(bid) {
  var params = bid.params || {};
  return !!(extractCID(params) && extractPID(params));
}

function buildRequest(bid, topWindowUrl, sizes, bidderRequest) {
  var params = bid.params,
      bidId = bid.bidId,
      userId = bid.userId,
      adUnitCode = bid.adUnitCode;
  var bidFloor = params.bidFloor,
      ext = params.ext;
  var hashUrl = hashCode(topWindowUrl);
  var dealId = getNextDealId(hashUrl);
  var cId = extractCID(params);
  var pId = extractPID(params);
  var subDomain = extractSubDomain(params);
  var data = {
    url: encodeURIComponent(topWindowUrl),
    cb: Date.now(),
    bidFloor: bidFloor,
    bidId: bidId,
    adUnitCode: adUnitCode,
    publisherId: pId,
    sizes: sizes,
    dealId: dealId,
    bidderVersion: BIDDER_VERSION,
    prebidVersion: "4.2.0",
    res: "".concat(screen.width, "x").concat(screen.height)
  };
  appendUserIdsToRequestPayload(data, userId);

  if (bidderRequest.gdprConsent) {
    if (bidderRequest.gdprConsent.consentString) {
      data.gdprConsent = bidderRequest.gdprConsent.consentString;
    }

    if (bidderRequest.gdprConsent.gdprApplies !== undefined) {
      data.gdpr = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;
    }
  }

  if (bidderRequest.uspConsent) {
    data.usPrivacy = bidderRequest.uspConsent;
  }

  var dto = {
    method: 'POST',
    url: "".concat(createDomain(subDomain), "/prebid/multi/").concat(cId),
    data: data
  };

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](ext, function (value, key) {
    dto.data['ext.' + key] = value;
  });

  return dto;
}

function appendUserIdsToRequestPayload(payloadRef, userIds) {
  var key;

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](userIds, function (userId, idSystemProviderName) {
    if (SUPPORTED_ID_SYSTEMS[idSystemProviderName]) {
      key = "uid.".concat(idSystemProviderName);

      switch (idSystemProviderName) {
        case 'digitrustid':
          payloadRef[key] = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](userId, 'data.id');
          break;

        case 'lipb':
          payloadRef[key] = userId.lipbid;
          break;

        case 'parrableId':
          payloadRef[key] = userId.eid;
          break;

        default:
          payloadRef[key] = userId;
      }
    }
  });
}

function buildRequests(validBidRequests, bidderRequest) {
  var topWindowUrl = bidderRequest.refererInfo.referer;
  var requests = [];
  validBidRequests.forEach(function (validBidRequest) {
    var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](validBidRequest.sizes);
    var request = buildRequest(validBidRequest, topWindowUrl, sizes, bidderRequest);
    requests.push(request);
  });
  return requests;
}

function interpretResponse(serverResponse, request) {
  if (!serverResponse || !serverResponse.body) {
    return [];
  }

  var bidId = request.data.bidId;
  var results = serverResponse.body.results;
  var output = [];

  try {
    results.forEach(function (result) {
      var creativeId = result.creativeId,
          ad = result.ad,
          price = result.price,
          exp = result.exp,
          width = result.width,
          height = result.height,
          currency = result.currency;

      if (!ad || !price) {
        return;
      }

      output.push({
        requestId: bidId,
        cpm: price,
        width: width,
        height: height,
        creativeId: creativeId,
        currency: currency || CURRENCY,
        netRevenue: true,
        ttl: exp || TTL_SECONDS,
        ad: ad
      });
    });
    return output;
  } catch (e) {
    return [];
  }
}

function getUserSyncs(syncOptions, responses) {
  var iframeEnabled = syncOptions.iframeEnabled,
      pixelEnabled = syncOptions.pixelEnabled;

  if (iframeEnabled) {
    return [{
      type: 'iframe',
      url: 'https://static.cootlogix.com/basev/sync/user_sync.html'
    }];
  }

  if (pixelEnabled) {
    var lookup = {};
    var syncs = [];
    responses.forEach(function (response) {
      var body = response.body;
      var results = body ? body.results || [] : [];
      results.forEach(function (result) {
        (result.cookies || []).forEach(function (cookie) {
          if (cookie.type === INTERNAL_SYNC_TYPE.IMAGE) {
            if (pixelEnabled && !lookup[cookie.src]) {
              syncs.push({
                type: EXTERNAL_SYNC_TYPE.IMAGE,
                url: cookie.src
              });
            }
          }
        });
      });
    });
    return syncs;
  }

  return [];
}

function hashCode(s) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  var l = s.length;
  var h = 0;
  var i = 0;

  if (l > 0) {
    while (i < l) {
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
    }
  }

  return prefix + h;
}

function getNextDealId(key) {
  try {
    var currentValue = Number(getStorageItem(key) || 0);
    var nextValue = currentValue + 1;
    setStorageItem(key, nextValue);
    return nextValue;
  } catch (e) {
    return 0;
  }
}

function getStorage() {
  return window['sessionStorage'];
}

function getStorageItem(key) {
  try {
    return getStorage().getItem(key);
  } catch (e) {
    return null;
  }
}

function setStorageItem(key, value) {
  try {
    getStorage().setItem(key, String(value));
  } catch (e) {}
}

var spec = {
  code: BIDDER_CODE,
  version: BIDDER_VERSION,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[784]);