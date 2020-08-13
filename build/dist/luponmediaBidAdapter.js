pbjsChunk([179],{

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(510);


/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["hasValidSupplyChainParams"] = hasValidSupplyChainParams;
/* harmony export (immutable) */ __webpack_exports__["resetUserSync"] = resetUserSync;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var BIDDER_CODE = 'luponmedia';
var ENDPOINT_URL = 'https://rtb.adxpremium.services/openrtb2/auction';
var DIGITRUST_PROP_NAMES = {
  PREBID_SERVER: {
    id: 'id',
    keyv: 'keyv'
  }
};
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.siteId && bid.params.keyId); // TODO: check for siteId and keyId
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var bRequest = {
      method: 'POST',
      url: ENDPOINT_URL,
      data: null,
      options: {},
      bidderRequest: bidderRequest
    };
    var currentImps = [];

    for (var i = 0, len = bidRequests.length; i < len; i++) {
      var newReq = newOrtbBidRequest(bidRequests[i], bidderRequest, currentImps);
      currentImps = newReq.imp;
      bRequest.data = JSON.stringify(newReq);
    }

    return bRequest;
  },
  interpretResponse: function interpretResponse(response, request) {
    var bidResponses = [];
    var respCur = 'USD';
    var parsedRequest = JSON.parse(request.data);
    var parsedReferrer = parsedRequest.site && parsedRequest.site.ref ? parsedRequest.site.ref : '';

    try {
      if (response.body && response.body.seatbid && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](response.body.seatbid)) {
        // Supporting multiple bid responses for same adSize
        respCur = response.body.cur || respCur;
        response.body.seatbid.forEach(function (seatbidder) {
          seatbidder.bid && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](seatbidder.bid) && seatbidder.bid.forEach(function (bid) {
            var newBid = {
              requestId: bid.impid,
              cpm: (parseFloat(bid.price) || 0).toFixed(2),
              width: bid.w,
              height: bid.h,
              creativeId: bid.crid || bid.id,
              dealId: bid.dealid,
              currency: respCur,
              netRevenue: false,
              ttl: 300,
              referrer: parsedReferrer,
              ad: bid.adm
            };
            bidResponses.push(newBid);
          });
        });
      }
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, responses, gdprConsent, uspConsent) {
    var allUserSyncs = [];

    if (!hasSynced && (syncOptions.iframeEnabled || syncOptions.pixelEnabled)) {
      responses.forEach(function (csResp) {
        if (csResp.body && csResp.body.ext && csResp.body.ext.usersyncs) {
          try {
            var response = csResp.body.ext.usersyncs;
            var bidders = response.bidder_status;

            for (var synci in bidders) {
              var thisSync = bidders[synci];

              if (thisSync.no_cookie) {
                var url = thisSync.usersync.url;
                var type = thisSync.usersync.type;

                if (!url) {
                  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("No sync url for bidder luponmedia.");
                } else if ((type === 'image' || type === 'redirect') && syncOptions.pixelEnabled) {
                  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logMessage"]("Invoking image pixel user sync for luponmedia");
                  allUserSyncs.push({
                    type: 'image',
                    url: url
                  });
                } else if (type == 'iframe' && syncOptions.iframeEnabled) {
                  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logMessage"]("Invoking iframe user sync for luponmedia");
                  allUserSyncs.push({
                    type: 'iframe',
                    url: url
                  });
                } else {
                  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("User sync type \"".concat(type, "\" not supported for luponmedia"));
                }
              }
            }
          } catch (e) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](e);
          }
        }
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Luponmedia: Please enable iframe/pixel based user sync.');
    }

    hasSynced = true;
    return allUserSyncs;
  }
};

function newOrtbBidRequest(bidRequest, bidderRequest, currentImps) {
  bidRequest.startTime = new Date().getTime();
  var bannerParams = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.banner');
  var bannerSizes = [];

  if (bannerParams && bannerParams.sizes) {
    var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bannerParams.sizes); // get banner sizes in form [{ w: <int>, h: <int> }, ...]

    var format = sizes.map(function (size) {
      var _size$split = size.split('x'),
          _size$split2 = _slicedToArray(_size$split, 2),
          width = _size$split2[0],
          height = _size$split2[1];

      var w = parseInt(width, 10);
      var h = parseInt(height, 10);
      return {
        w: w,
        h: h
      };
    });
    bannerSizes = format;
  }

  var data = {
    id: bidRequest.transactionId,
    test: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('debug') ? 1 : 0,
    source: {
      tid: bidRequest.transactionId
    },
    tmax: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('timeout') || 1500,
    imp: currentImps.concat([{
      id: bidRequest.bidId,
      secure: 1,
      ext: _defineProperty({}, bidRequest.bidder, bidRequest.params),
      banner: {
        format: bannerSizes
      }
    }]),
    ext: {
      prebid: {
        targeting: {
          includewinners: true,
          // includebidderkeys always false for openrtb
          includebidderkeys: false
        }
      }
    },
    user: {}
  };
  var bidFloor = parseFloat(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'params.floor'));

  if (!isNaN(bidFloor)) {
    data.imp[0].bidfloor = bidFloor;
  }

  appendSiteAppDevice(data, bidRequest, bidderRequest);

  var digiTrust = _getDigiTrustQueryParams(bidRequest, 'PREBID_SERVER');

  if (digiTrust) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.ext.digitrust', digiTrust);
  }

  if (bidderRequest.gdprConsent) {
    // note - gdprApplies & consentString may be undefined in certain use-cases for consentManagement module
    var gdprApplies;

    if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') {
      gdprApplies = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'regs.ext.gdpr', gdprApplies);
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.ext.consent', bidderRequest.gdprConsent.consentString);
  }

  if (bidderRequest.uspConsent) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'regs.ext.us_privacy', bidderRequest.uspConsent);
  } // Set user uuid


  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.id', __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["generateUUID"]()); // set crumbs

  if (bidRequest.crumbs && bidRequest.crumbs.pubcid) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.buyeruid', bidRequest.crumbs.pubcid);
  } else {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.buyeruid', __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["generateUUID"]());
  }

  if (bidRequest.userId && _typeof(bidRequest.userId) === 'object' && (bidRequest.userId.tdid || bidRequest.userId.pubcid || bidRequest.userId.lipb || bidRequest.userId.idl_env)) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'user.ext.eids', []);

    if (bidRequest.userId.tdid) {
      data.user.ext.eids.push({
        source: 'adserver.org',
        uids: [{
          id: bidRequest.userId.tdid,
          ext: {
            rtiPartner: 'TDID'
          }
        }]
      });
    }

    if (bidRequest.userId.pubcid) {
      data.user.ext.eids.push({
        source: 'pubcommon',
        uids: [{
          id: bidRequest.userId.pubcid
        }]
      });
    } // support liveintent ID


    if (bidRequest.userId.lipb && bidRequest.userId.lipb.lipbid) {
      data.user.ext.eids.push({
        source: 'liveintent.com',
        uids: [{
          id: bidRequest.userId.lipb.lipbid
        }]
      });
      data.user.ext.tpid = {
        source: 'liveintent.com',
        uid: bidRequest.userId.lipb.lipbid
      };

      if (Array.isArray(bidRequest.userId.lipb.segments) && bidRequest.userId.lipb.segments.length) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'rp.target.LIseg', bidRequest.userId.lipb.segments);
      }
    } // support identityLink (aka LiveRamp)


    if (bidRequest.userId.idl_env) {
      data.user.ext.eids.push({
        source: 'liveramp.com',
        uids: [{
          id: bidRequest.userId.idl_env
        }]
      });
    }
  }

  if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('coppa') === true) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'regs.coppa', 1);
  }

  if (bidRequest.schain && hasValidSupplyChainParams(bidRequest.schain)) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'source.ext.schain', bidRequest.schain);
  }

  var siteData = _extends({}, bidRequest.params.inventory, __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.context'));

  var userData = _extends({}, bidRequest.params.visitor, __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.user'));

  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](siteData) || !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](userData)) {
    var bidderData = {
      bidders: [bidderRequest.bidderCode],
      config: {
        fpd: {}
      }
    };

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](siteData)) {
      bidderData.config.fpd.site = siteData;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](userData)) {
      bidderData.config.fpd.user = userData;
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data, 'ext.prebid.bidderconfig.0', bidderData);
  }

  var pbAdSlot = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'fpd.context.pbAdSlot');

  if (typeof pbAdSlot === 'string' && pbAdSlot) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](data.imp[0].ext, 'context.data.adslot', pbAdSlot);
  }

  return data;
}

function hasValidSupplyChainParams(schain) {
  var isValid = false;
  var requiredFields = ['asi', 'sid', 'hp'];
  if (!schain.nodes) return isValid;
  isValid = schain.nodes.reduce(function (status, node) {
    if (!status) return status;
    return requiredFields.every(function (field) {
      return node[field];
    });
  }, true);
  if (!isValid) __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('LuponMedia: required schain params missing');
  return isValid;
}

function _getDigiTrustQueryParams() {
  var _digiTrustQueryParams;

  var bidRequest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var endpointName = arguments.length > 1 ? arguments[1] : undefined;

  if (!endpointName || !DIGITRUST_PROP_NAMES[endpointName]) {
    return null;
  }

  var propNames = DIGITRUST_PROP_NAMES[endpointName];

  function getDigiTrustId() {
    var bidRequestDigitrust = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'userId.digitrustid.data');

    if (bidRequestDigitrust) {
      return bidRequestDigitrust;
    }

    var digiTrustUser = window.DigiTrust && (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('digiTrustId') || window.DigiTrust.getUser({
      member: 'T9QSFKPDN9'
    }));
    return digiTrustUser && digiTrustUser.success && digiTrustUser.identity || null;
  }

  var digiTrustId = getDigiTrustId(); // Verify there is an ID and this user has not opted out

  if (!digiTrustId || digiTrustId.privacy && digiTrustId.privacy.optout) {
    return null;
  }

  var digiTrustQueryParams = (_digiTrustQueryParams = {}, _defineProperty(_digiTrustQueryParams, propNames.id, digiTrustId.id), _defineProperty(_digiTrustQueryParams, propNames.keyv, digiTrustId.keyv), _digiTrustQueryParams);

  if (propNames.pref) {
    digiTrustQueryParams[propNames.pref] = 0;
  }

  return digiTrustQueryParams;
}

function _getPageUrl(bidRequest, bidderRequest) {
  var pageUrl = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('pageUrl');

  if (bidRequest.params.referrer) {
    pageUrl = bidRequest.params.referrer;
  } else if (!pageUrl) {
    pageUrl = bidderRequest.refererInfo.referer;
  }

  return bidRequest.params.secure ? pageUrl.replace(/^http:/i, 'https:') : pageUrl;
}

function appendSiteAppDevice(data, bidRequest, bidderRequest) {
  if (!data) return; // ORTB specifies app OR site

  if (_typeof(__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('app')) === 'object') {
    data.app = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('app');
  } else {
    data.site = {
      page: _getPageUrl(bidRequest, bidderRequest)
    };
  }

  if (_typeof(__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('device')) === 'object') {
    data.device = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('device');
  }
}

var hasSynced = false;
function resetUserSync() {
  hasSynced = false;
}
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[509]);