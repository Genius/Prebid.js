pbjsChunk([148],{

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(578);


/***/ }),

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["injectAdIdsIntoAllBidResponses"] = injectAdIdsIntoAllBidResponses;
/* harmony export (immutable) */ __webpack_exports__["checkDeepArray"] = checkDeepArray;
/* harmony export (immutable) */ __webpack_exports__["defaultSize"] = defaultSize;
/* harmony export (immutable) */ __webpack_exports__["ozoneGetWinnerForRequestBid"] = ozoneGetWinnerForRequestBid;
/* harmony export (immutable) */ __webpack_exports__["ozoneGetAllBidsForBidId"] = ozoneGetAllBidsForBidId;
/* harmony export (immutable) */ __webpack_exports__["getRoundedBid"] = getRoundedBid;
/* harmony export (immutable) */ __webpack_exports__["getGranularityKeyName"] = getGranularityKeyName;
/* harmony export (immutable) */ __webpack_exports__["getGranularityObject"] = getGranularityObject;
/* harmony export (immutable) */ __webpack_exports__["ozoneAddStandardProperties"] = ozoneAddStandardProperties;
/* harmony export (immutable) */ __webpack_exports__["getWidthAndHeightFromVideoObject"] = getWidthAndHeightFromVideoObject;
/* harmony export (immutable) */ __webpack_exports__["playerSizeIsNestedArray"] = playerSizeIsNestedArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_cpmBucketManager_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_Renderer_js__ = __webpack_require__(11);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }







var BIDDER_CODE = 'ozone';
var ALLOWED_LOTAME_PARAMS = ['oz_lotameid', 'oz_lotamepid', 'oz_lotametpid']; // *** PROD ***

var OZONEURI = 'https://elb.the-ozone-project.com/openrtb2/auction';
var OZONECOOKIESYNC = 'https://elb.the-ozone-project.com/static/load-cookie.html';
var OZONE_RENDERER_URL = 'https://prebid.the-ozone-project.com/ozone-renderer.js';
var OZONEVERSION = '2.4.0';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]],
  cookieSyncBag: {
    'publisherId': null,
    'siteId': null,
    'userIdObject': {}
  },
  // variables we want to make available to cookie sync
  propertyBag: {
    'lotameWasOverridden': 0,
    'pageId': null,
    'buildRequestsStart': 0,
    'buildRequestsEnd': 0
  },

  /* allow us to store vars in instance scope - needs to be an object to be mutable */

  /**
   * Basic check to see whether required parameters are in the request.
   * @param bid
   * @returns {boolean}
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: isBidRequestValid : ', __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig(), bid);
    var adUnitCode = bid.adUnitCode; // adunit[n].code

    if (!bid.params.hasOwnProperty('placementId')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : missing placementId : siteId, placementId and publisherId are REQUIRED', adUnitCode);
      return false;
    }

    if (!this.isValidPlacementId(bid.params.placementId)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : placementId must be exactly 10 numeric characters', adUnitCode);
      return false;
    }

    if (!bid.params.hasOwnProperty('publisherId')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : missing publisherId : siteId, placementId and publisherId are REQUIRED', adUnitCode);
      return false;
    }

    if (!bid.params.publisherId.toString().match(/^[a-zA-Z0-9\-]{12}$/)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : publisherId must be exactly 12 alphanumieric characters including hyphens', adUnitCode);
      return false;
    }

    if (!bid.params.hasOwnProperty('siteId')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : missing siteId : siteId, placementId and publisherId are REQUIRED', adUnitCode);
      return false;
    }

    if (!bid.params.siteId.toString().match(/^[0-9]{10}$/)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : siteId must be exactly 10 numeric characters', adUnitCode);
      return false;
    }

    if (bid.params.hasOwnProperty('customParams')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : customParams should be renamed to customData', adUnitCode);
      return false;
    }

    if (bid.params.hasOwnProperty('customData')) {
      if (!Array.isArray(bid.params.customData)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : customData is not an Array', adUnitCode);
        return false;
      }

      if (bid.params.customData.length < 1) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : customData is an array but does not contain any elements', adUnitCode);
        return false;
      }

      if (!bid.params.customData[0].hasOwnProperty('targeting')) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : customData[0] does not contain "targeting"', adUnitCode);
        return false;
      }

      if (_typeof(bid.params.customData[0]['targeting']) != 'object') {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : customData[0] targeting is not an object', adUnitCode);
        return false;
      }
    }

    if (bid.params.hasOwnProperty('lotameData')) {
      if (_typeof(bid.params.lotameData) !== 'object') {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : lotameData is not an object', adUnitCode);
        return false;
      }
    }

    if (bid.hasOwnProperty('mediaTypes') && bid.mediaTypes.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */])) {
      if (!bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]].hasOwnProperty('context')) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: No video context key/value in bid. Rejecting bid: ', bid);
        return false;
      }

      if (bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]].context !== 'instream' && bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]].context !== 'outstream') {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: video.context is invalid. Only instream/outstream video is supported. Rejecting bid: ', bid);
        return false;
      }
    } // guard against hacks in GET parameters that we might allow


    var arrLotameOverride = this.getLotameOverrideParams(); // lotame override, test params. All 3 must be present, or none.

    var lotameKeys = Object.keys(arrLotameOverride);

    if (lotameKeys.length === ALLOWED_LOTAME_PARAMS.length) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: VALIDATION : arrLotameOverride', arrLotameOverride);

      for (var i in lotameKeys) {
        if (!arrLotameOverride[ALLOWED_LOTAME_PARAMS[i]].toString().match(/^[0-9a-zA-Z]+$/)) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: Only letters & numbers allowed in lotame override: ' + i.toString() + ': ' + arrLotameOverride[ALLOWED_LOTAME_PARAMS[i]].toString() + '. Rejecting bid: ', bid);
          return false;
        }
      }
    } else if (lotameKeys.length > 0) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: VALIDATION : arrLotameOverride', arrLotameOverride);
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: lotame override params are incomplete. You must set all ' + ALLOWED_LOTAME_PARAMS.length + ': ' + JSON.stringify(ALLOWED_LOTAME_PARAMS) + ', . Rejecting bid: ', bid);
      return false;
    }

    return true;
  },

  /**
   * Split this out so that we can validate the placementId and also the override GET parameter ozstoredrequest
   * @param placementId
   */
  isValidPlacementId: function isValidPlacementId(placementId) {
    return placementId.toString().match(/^[0-9]{10}$/);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var _this = this;

    this.propertyBag.buildRequestsStart = new Date().getTime();
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("OZONE: buildRequests time: ".concat(this.propertyBag.buildRequestsStart, " ozone v ").concat(OZONEVERSION, " validBidRequests"), validBidRequests, 'bidderRequest', bidderRequest); // First check - is there any config to block this request?

    if (this.blockTheRequest()) {
      return [];
    }

    var htmlParams = {
      'publisherId': '',
      'siteId': ''
    };

    if (validBidRequests.length > 0) {
      this.cookieSyncBag.userIdObject = _extends(this.cookieSyncBag.userIdObject, this.findAllUserIds(validBidRequests[0]));
      this.cookieSyncBag.siteId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.siteId');
      this.cookieSyncBag.publisherId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.publisherId');
      htmlParams = validBidRequests[0].params;
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: cookie sync bag', this.cookieSyncBag);
    var singleRequest = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('ozone.singleRequest');
    singleRequest = singleRequest !== false; // undefined & true will be true

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: config ozone.singleRequest : ', singleRequest);
    var ozoneRequest = {}; // we only want to set specific properties on this, not validBidRequests[0].params

    delete ozoneRequest.test; // don't allow test to be set in the config - ONLY use $_GET['pbjs_debug']

    if (bidderRequest && bidderRequest.gdprConsent) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: ADDING GDPR info');
      var apiVersion = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest.gdprConsent, 'apiVersion', '1');
      ozoneRequest.regs = {
        ext: {
          gdpr: bidderRequest.gdprConsent.gdprApplies ? 1 : 0,
          apiVersion: apiVersion
        }
      };

      if (ozoneRequest.regs.ext.gdpr) {
        ozoneRequest.user = ozoneRequest.user || {};
        ozoneRequest.user.ext = {
          'consent': bidderRequest.gdprConsent.consentString
        };
      } else {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: **** Strange CMP info: bidderRequest.gdprConsent exists BUT bidderRequest.gdprConsent.gdprApplies is false. See bidderRequest logged above. ****');
      }
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: WILL NOT ADD GDPR info; no bidderRequest.gdprConsent object was present.');
    }

    var getParams = this.getGetParametersAsObject();
    var ozTestMode = getParams.hasOwnProperty('oztestmode') ? getParams.oztestmode : null; // this can be any string, it's used for testing ads

    ozoneRequest.device = {
      'w': window.innerWidth,
      'h': window.innerHeight
    };
    var placementIdOverrideFromGetParam = this.getPlacementIdOverrideFromGetParam(); // null or string

    var lotameDataSingle = {}; // we will capture lotame data once & send it to the server as ext.ozone.lotameData
    // build the array of params to attach to `imp`

    var tosendtags = validBidRequests.map(function (ozoneBidRequest) {
      var obj = {};

      var placementId = placementIdOverrideFromGetParam || _this.getPlacementId(ozoneBidRequest); // prefer to use a valid override param, else the bidRequest placement Id


      obj.id = ozoneBidRequest.bidId; // this causes an error if we change it to something else, even if you update the bidRequest object: "WARNING: Bidder ozone made bid for unknown request ID: mb7953.859498327448. Ignoring."

      obj.tagid = placementId;
      obj.secure = window.location.protocol === 'https:' ? 1 : 0; // is there a banner (or nothing declared, so banner is the default)?

      var arrBannerSizes = [];

      if (!ozoneBidRequest.hasOwnProperty('mediaTypes')) {
        if (ozoneBidRequest.hasOwnProperty('sizes')) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: no mediaTypes detected - will use the sizes array in the config root');
          arrBannerSizes = ozoneBidRequest.sizes;
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: no mediaTypes detected, no sizes array in the config root either. Cannot set sizes for banner type');
        }
      } else {
        if (ozoneBidRequest.mediaTypes.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */])) {
          arrBannerSizes = ozoneBidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]].sizes;
          /* Note - if there is a sizes element in the config root it will be pushed into here */

          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: setting banner size from the mediaTypes.banner element for bidId ' + obj.id + ': ', arrBannerSizes);
        }

        if (ozoneBidRequest.mediaTypes.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */])) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: openrtb 2.5 compliant video'); // examine all the video attributes in the config, and either put them into obj.video if allowed by IAB2.5 or else in to obj.video.ext

          if (_typeof(ozoneBidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]]) == 'object') {
            var childConfig = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](ozoneBidRequest, 'params.video', {});
            obj.video = _this.unpackVideoConfigIntoIABformat(ozoneBidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]], childConfig);
            obj.video = _this.addVideoDefaults(obj.video, ozoneBidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]], childConfig);
          } // we need to duplicate some of the video values


          var wh = getWidthAndHeightFromVideoObject(obj.video);
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: setting video object from the mediaTypes.video element: ' + obj.id + ':', obj.video, 'wh=', wh);

          if (wh && _typeof(wh) === 'object') {
            obj.video.w = wh['w'];
            obj.video.h = wh['h'];

            if (playerSizeIsNestedArray(obj.video)) {
              // this should never happen; it was in the original spec for this change though.
              __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: setting obj.video.format to be an array of objects');
              obj.video.ext.format = [wh];
            } else {
              __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: setting obj.video.format to be an object');
              obj.video.ext.format = wh;
            }
          } else {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('OZONE: cannot set w, h & format values for video; the config is not right');
          }
        } // Native integration is not complete yet


        if (ozoneBidRequest.mediaTypes.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */])) {
          obj.native = ozoneBidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */]];
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: setting native object from the mediaTypes.native element: ' + obj.id + ':', obj.native);
        }
      }

      if (arrBannerSizes.length > 0) {
        // build the banner request using banner sizes we found in either possible location:
        obj.banner = {
          topframe: 1,
          w: arrBannerSizes[0][0] || 0,
          h: arrBannerSizes[0][1] || 0,
          format: arrBannerSizes.map(function (s) {
            return {
              w: s[0],
              h: s[1]
            };
          })
        };
      } // these 3 MUST exist - we check them in the validation method


      obj.placementId = placementId; // build the imp['ext'] object

      obj.ext = {
        'prebid': {
          'storedrequest': {
            'id': placementId
          }
        },
        'ozone': {}
      };
      obj.ext.ozone.adUnitCode = ozoneBidRequest.adUnitCode; // eg. 'mpu'

      obj.ext.ozone.transactionId = ozoneBidRequest.transactionId; // this is the transactionId PER adUnit, common across bidders for this unit

      if (ozoneBidRequest.params.hasOwnProperty('customData')) {
        obj.ext.ozone.customData = ozoneBidRequest.params.customData;
      }

      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: obj.ext.ozone is ', obj.ext.ozone);

      if (ozTestMode != null) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: setting ozTestMode to ', ozTestMode);

        if (obj.ext.ozone.hasOwnProperty('customData')) {
          for (var i = 0; i < obj.ext.ozone.customData.length; i++) {
            obj.ext.ozone.customData[i]['targeting']['oztestmode'] = ozTestMode;
          }
        } else {
          obj.ext.ozone.customData = [{
            'settings': {},
            'targeting': {
              'oztestmode': ozTestMode
            }
          }];
        }
      } else {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: no ozTestMode ');
      } // now deal with lotame, including the optional override parameters


      if (Object.keys(lotameDataSingle).length === 0) {
        // we've not yet found lotameData, see if we can get it from this bid request object
        lotameDataSingle = _this.tryGetLotameData(ozoneBidRequest);
      }

      return obj;
    }); // in v 2.0.0 we moved these outside of the individual ad slots

    var extObj = {
      'ozone': {
        'oz_pb_v': OZONEVERSION,
        'oz_rw': placementIdOverrideFromGetParam ? 1 : 0,
        'oz_lot_rw': this.propertyBag.lotameWasOverridden
      }
    };

    if (validBidRequests.length > 0) {
      var userIds = this.findAllUserIds(validBidRequests[0]);

      if (userIds.hasOwnProperty('pubcid')) {
        extObj.ozone.pubcid = userIds.pubcid;
      }
    }

    extObj.ozone.pv = this.getPageId(); // attach the page ID that will be common to all auciton calls for this page if refresh() is called

    extObj.ozone.lotameData = lotameDataSingle; // 2.4.0 moved lotameData out of bid objects into the single ext.ozone area to remove duplication

    var ozOmpFloorDollars = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('ozone.oz_omp_floor'); // valid only if a dollar value (typeof == 'number')

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: oz_omp_floor dollar value = ', ozOmpFloorDollars);

    if (typeof ozOmpFloorDollars === 'number') {
      extObj.ozone.oz_omp_floor = ozOmpFloorDollars;
    } else if (typeof ozOmpFloorDollars !== 'undefined') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: oz_omp_floor is invalid - IF SET then this must be a number, representing dollar value eg. oz_omp_floor: 1.55. You have it set as a ' + _typeof(ozOmpFloorDollars));
    }

    var ozWhitelistAdserverKeys = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('ozone.oz_whitelist_adserver_keys');
    var useOzWhitelistAdserverKeys = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](ozWhitelistAdserverKeys) && ozWhitelistAdserverKeys.length > 0;
    extObj.ozone.oz_kvp_rw = useOzWhitelistAdserverKeys ? 1 : 0;
    var userExtEids = this.generateEids(validBidRequests); // generate the UserIDs in the correct format for UserId module

    ozoneRequest.site = {
      'publisher': {
        'id': htmlParams.publisherId
      },
      'page': document.location.href,
      'id': htmlParams.siteId
    };
    ozoneRequest.test = getParams.hasOwnProperty('pbjs_debug') && getParams['pbjs_debug'] == 'true' ? 1 : 0; // this is for 2.2.1
    // coppa compliance

    if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('coppa') === true) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](ozoneRequest, 'regs.coppa', 1);
    } // return the single request object OR the array:


    if (singleRequest) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: buildRequests starting to generate response for a single request');
      ozoneRequest.id = bidderRequest.auctionId; // Unique ID of the bid request, provided by the exchange.

      ozoneRequest.auctionId = bidderRequest.auctionId; // not sure if this should be here?

      ozoneRequest.imp = tosendtags;
      ozoneRequest.ext = extObj;
      ozoneRequest.source = {
        'tid': bidderRequest.auctionId
      }; // RTB 2.5 : tid is Transaction ID that must be common across all participants in this bid request (e.g., potentially multiple exchanges).

      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](ozoneRequest, 'user.ext.eids', userExtEids);
      var ret = {
        method: 'POST',
        url: OZONEURI,
        data: JSON.stringify(ozoneRequest),
        bidderRequest: bidderRequest
      };
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: buildRequests ozoneRequest for single = ', ozoneRequest);
      this.propertyBag.buildRequestsEnd = new Date().getTime();
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("OZONE: buildRequests going to return for single at time ".concat(this.propertyBag.buildRequestsEnd, " (took ").concat(this.propertyBag.buildRequestsEnd - this.propertyBag.buildRequestsStart, "ms): "), ret);
      return ret;
    } // not single request - pull apart the tosendtags array & return an array of objects each containing one element in the imp array.


    var arrRet = tosendtags.map(function (imp) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: buildRequests starting to generate non-single response, working on imp : ', imp);

      var ozoneRequestSingle = _extends({}, ozoneRequest);

      imp.ext.ozone.pageAuctionId = bidderRequest['auctionId']; // make a note in the ext object of what the original auctionId was, in the bidderRequest object

      ozoneRequestSingle.id = imp.ext.ozone.transactionId; // Unique ID of the bid request, provided by the exchange.

      ozoneRequestSingle.auctionId = imp.ext.ozone.transactionId; // not sure if this should be here?

      ozoneRequestSingle.imp = [imp];
      ozoneRequestSingle.ext = extObj;
      ozoneRequestSingle.source = {
        'tid': imp.ext.ozone.transactionId
      };
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](ozoneRequestSingle, 'user.ext.eids', userExtEids);
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: buildRequests ozoneRequestSingle (for non-single) = ', ozoneRequestSingle);
      return {
        method: 'POST',
        url: OZONEURI,
        data: JSON.stringify(ozoneRequestSingle),
        bidderRequest: bidderRequest
      };
    });
    this.propertyBag.buildRequestsEnd = new Date().getTime();
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("OZONE: buildRequests going to return for non-single at time ".concat(this.propertyBag.buildRequestsEnd, " (took ").concat(this.propertyBag.buildRequestsEnd - this.propertyBag.buildRequestsStart, "ms): "), arrRet);
    return arrRet;
  },

  /**
   * Interpret the response if the array contains BIDDER elements, in the format: [ [bidder1 bid 1, bidder1 bid 2], [bidder2 bid 1, bidder2 bid 2] ]
   * NOte that in singleRequest mode this will be called once, else it will be called for each adSlot's response
   *
   * Updated April 2019 to return all bids, not just the one we decide is the 'winner'
   *
   * @param serverResponse
   * @param request
   * @returns {*}
   */
  interpretResponse: function interpretResponse(serverResponse, request) {
    var _this2 = this;

    var startTime = new Date().getTime();
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("OZONE: interpretResponse time: ".concat(startTime, " . Time between buildRequests done and interpretResponse start was ").concat(startTime - this.propertyBag.buildRequestsEnd, "ms"));
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("OZONE: serverResponse, request", serverResponse, request);
    serverResponse = serverResponse.body || {}; // note that serverResponse.id value is the auction_id we might want to use for reporting reasons.

    if (!serverResponse.hasOwnProperty('seatbid')) {
      return [];
    }

    if (_typeof(serverResponse.seatbid) !== 'object') {
      return [];
    }

    var arrAllBids = [];
    var enhancedAdserverTargeting = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('ozone.enhancedAdserverTargeting');
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: enhancedAdserverTargeting', enhancedAdserverTargeting);

    if (typeof enhancedAdserverTargeting == 'undefined') {
      enhancedAdserverTargeting = true;
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: enhancedAdserverTargeting', enhancedAdserverTargeting);
    serverResponse.seatbid = injectAdIdsIntoAllBidResponses(serverResponse.seatbid); // we now make sure that each bid in the bidresponse has a unique (within page) adId attribute.

    serverResponse.seatbid = this.removeSingleBidderMultipleBids(serverResponse.seatbid);
    var ozOmpFloorDollars = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('ozone.oz_omp_floor'); // valid only if a dollar value (typeof == 'number')

    var addOzOmpFloorDollars = typeof ozOmpFloorDollars === 'number';
    var ozWhitelistAdserverKeys = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('ozone.oz_whitelist_adserver_keys');
    var useOzWhitelistAdserverKeys = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](ozWhitelistAdserverKeys) && ozWhitelistAdserverKeys.length > 0;

    for (var i = 0; i < serverResponse.seatbid.length; i++) {
      var sb = serverResponse.seatbid[i];

      var _loop = function _loop(j) {
        var thisRequestBid = _this2.getBidRequestForBidId(sb.bid[j].impid, request.bidderRequest.bids);

        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("OZONE seatbid:".concat(i, ", bid:").concat(j, " Going to set default w h for seatbid/bidRequest"), sb.bid[j], thisRequestBid);

        var _defaultSize = defaultSize(thisRequestBid),
            defaultWidth = _defaultSize.defaultWidth,
            defaultHeight = _defaultSize.defaultHeight;

        var thisBid = ozoneAddStandardProperties(sb.bid[j], defaultWidth, defaultHeight);
        var videoContext = null;
        var isVideo = false;
        var bidType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](thisBid, 'ext.prebid.type');
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("OZONE: this bid type is : ".concat(bidType), j);

        if (bidType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]) {
          isVideo = true;
          videoContext = _this2.getVideoContextForBidId(thisBid.bidId, request.bidderRequest.bids); // should be instream or outstream (or null if error)

          if (videoContext === 'outstream') {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: going to attach a renderer to OUTSTREAM video : ', j);
            thisBid.renderer = newRenderer(thisBid.bidId);
          } else {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: bid is not an outstream video, will not attach a renderer: ', j);
          }
        }

        var adserverTargeting = {};

        if (enhancedAdserverTargeting) {
          var allBidsForThisBidid = ozoneGetAllBidsForBidId(thisBid.bidId, serverResponse.seatbid); // add all the winning & non-winning bids for this bidId:

          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: Going to iterate allBidsForThisBidId', allBidsForThisBidid);
          Object.keys(allBidsForThisBidid).forEach(function (bidderName, index, ar2) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("OZONE: adding adserverTargeting for ".concat(bidderName, " for bidId ").concat(thisBid.bidId)); // let bidderName = bidderNameWH.split('_')[0];

            adserverTargeting['oz_' + bidderName] = bidderName;
            adserverTargeting['oz_' + bidderName + '_crid'] = String(allBidsForThisBidid[bidderName].crid);
            adserverTargeting['oz_' + bidderName + '_adv'] = String(allBidsForThisBidid[bidderName].adomain);
            adserverTargeting['oz_' + bidderName + '_adId'] = String(allBidsForThisBidid[bidderName].adId);
            adserverTargeting['oz_' + bidderName + '_pb_r'] = getRoundedBid(allBidsForThisBidid[bidderName].price, allBidsForThisBidid[bidderName].ext.prebid.type);

            if (allBidsForThisBidid[bidderName].hasOwnProperty('dealid')) {
              adserverTargeting['oz_' + bidderName + '_dealid'] = String(allBidsForThisBidid[bidderName].dealid);
            }

            if (addOzOmpFloorDollars) {
              adserverTargeting['oz_' + bidderName + '_omp'] = allBidsForThisBidid[bidderName].price >= ozOmpFloorDollars ? '1' : '0';
            }

            if (isVideo) {
              adserverTargeting['oz_' + bidderName + '_vid'] = videoContext; // outstream or instream
            }

            var flr = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](allBidsForThisBidid[bidderName], 'ext.bidder.ozone.floor', null);

            if (flr != null) {
              adserverTargeting['oz_' + bidderName + '_flr'] = flr;
            }

            var rid = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](allBidsForThisBidid[bidderName], 'ext.bidder.ozone.ruleId', null);

            if (rid != null) {
              adserverTargeting['oz_' + bidderName + '_rid'] = rid;
            }

            if (bidderName.match(/^ozappnexus/)) {
              adserverTargeting['oz_' + bidderName + '_sid'] = String(allBidsForThisBidid[bidderName].cid);
            }
          });
        } else {
          if (useOzWhitelistAdserverKeys) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('OZONE: You have set a whitelist of adserver keys but this will be ignored because ozone.enhancedAdserverTargeting is set to false. No per-bid keys will be sent to adserver.');
          } else {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: ozone.enhancedAdserverTargeting is set to false, so no per-bid keys will be sent to adserver.');
          }
        } // also add in the winning bid, to be sent to dfp


        var _ozoneGetWinnerForReq = ozoneGetWinnerForRequestBid(thisBid.bidId, serverResponse.seatbid),
            winningSeat = _ozoneGetWinnerForReq.seat,
            winningBid = _ozoneGetWinnerForReq.bid;

        adserverTargeting['oz_auc_id'] = String(request.bidderRequest.auctionId);
        adserverTargeting['oz_winner'] = String(winningSeat);

        if (enhancedAdserverTargeting) {
          adserverTargeting['oz_imp_id'] = String(winningBid.impid);
          adserverTargeting['oz_pb_v'] = OZONEVERSION;
        }

        if (useOzWhitelistAdserverKeys) {
          // delete any un-whitelisted keys
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: Going to filter out adserver targeting keys not in the whitelist: ', ozWhitelistAdserverKeys);
          Object.keys(adserverTargeting).forEach(function (key) {
            if (ozWhitelistAdserverKeys.indexOf(key) === -1) {
              delete adserverTargeting[key];
            }
          });
        }

        thisBid.adserverTargeting = adserverTargeting;
        arrAllBids.push(thisBid);
      };

      for (var j = 0; j < sb.bid.length; j++) {
        _loop(j);
      }
    }

    var endTime = new Date().getTime();
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("OZONE: interpretResponse going to return at time ".concat(endTime, " (took ").concat(endTime - startTime, "ms) Time from buildRequests Start -> interpretRequests End = ").concat(endTime - this.propertyBag.buildRequestsStart, "ms"), arrAllBids);
    return arrAllBids;
  },

  /**
   * If a bidder bids for > 1 size for an adslot, allow only the highest bid
   * @param seatbid object (serverResponse.seatbid)
   */
  removeSingleBidderMultipleBids: function removeSingleBidderMultipleBids(seatbid) {
    var ret = [];

    for (var i = 0; i < seatbid.length; i++) {
      var sb = seatbid[i];
      var retSeatbid = {
        'seat': sb.seat,
        'bid': []
      };
      var bidIds = [];

      for (var j = 0; j < sb.bid.length; j++) {
        var candidate = sb.bid[j];

        if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["contains"](bidIds, candidate.impid)) {
          continue; // we've already fully assessed this impid, found the highest bid from this seat for it
        }

        bidIds.push(candidate.impid);

        for (var k = j + 1; k < sb.bid.length; k++) {
          if (sb.bid[k].impid === candidate.impid && sb.bid[k].price > candidate.price) {
            candidate = sb.bid[k];
          }
        }

        retSeatbid.bid.push(candidate);
      }

      ret.push(retSeatbid);
    }

    return ret;
  },
  // see http://prebid.org/dev-docs/bidder-adaptor.html#registering-user-syncs
  getUserSyncs: function getUserSyncs(optionsType, serverResponse, gdprConsent) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: getUserSyncs optionsType, serverResponse, gdprConsent, cookieSyncBag', optionsType, serverResponse, gdprConsent, this.cookieSyncBag);

    if (!serverResponse || serverResponse.length === 0) {
      return [];
    }

    if (optionsType.iframeEnabled) {
      var arrQueryString = [];

      if (document.location.search.match(/pbjs_debug=true/)) {
        arrQueryString.push('pbjs_debug=true');
      }

      arrQueryString.push('gdpr=' + (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](gdprConsent, 'gdprApplies', false) ? '1' : '0'));
      arrQueryString.push('gdpr_consent=' + __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](gdprConsent, 'consentString', ''));
      var objKeys = Object.getOwnPropertyNames(this.cookieSyncBag.userIdObject);

      for (var idx in objKeys) {
        var keyname = objKeys[idx];
        arrQueryString.push(keyname + '=' + this.cookieSyncBag.userIdObject[keyname]);
      }

      arrQueryString.push('publisherId=' + this.cookieSyncBag.publisherId);
      arrQueryString.push('siteId=' + this.cookieSyncBag.siteId);
      arrQueryString.push('cb=' + Date.now());
      var strQueryString = arrQueryString.join('&');

      if (strQueryString.length > 0) {
        strQueryString = '?' + strQueryString;
      }

      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: getUserSyncs going to return cookie sync url : ' + OZONECOOKIESYNC + strQueryString);
      return [{
        type: 'iframe',
        url: OZONECOOKIESYNC + strQueryString
      }];
    }
  },

  /**
   * Find the bid matching the bidId in the request object
   * get instream or outstream if this was a video request else null
   * @return object|null
   */
  getBidRequestForBidId: function getBidRequestForBidId(bidId, arrBids) {
    for (var i = 0; i < arrBids.length; i++) {
      if (arrBids[i].bidId === bidId) {
        // bidId in the request comes back as impid in the seatbid bids
        return arrBids[i];
      }
    }

    return null;
  },

  /**
   * Locate the bid inside the arrBids for this bidId, then discover the video context, and return it.
   * IF the bid cannot be found return null, else return a string.
   * @param bidId
   * @param arrBids
   * @return string|null
   */
  getVideoContextForBidId: function getVideoContextForBidId(bidId, arrBids) {
    var requestBid = this.getBidRequestForBidId(bidId, arrBids);

    if (requestBid != null) {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](requestBid, 'mediaTypes.video.context', 'unknown');
    }

    return null;
  },

  /**
   *  Look for pubcid & all the other IDs according to http://prebid.org/dev-docs/modules/userId.html
   *  @return map
   */
  findAllUserIds: function findAllUserIds(bidRequest) {
    var ret = {};
    var searchKeysSingle = ['pubcid', 'tdid', 'id5id', 'parrableId', 'idl_env', 'digitrustid', 'criteortus'];

    if (bidRequest.hasOwnProperty('userId')) {
      for (var arrayId in searchKeysSingle) {
        var key = searchKeysSingle[arrayId];

        if (bidRequest.userId.hasOwnProperty(key)) {
          ret[key] = bidRequest.userId[key];
        }
      }

      var lipbid = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest.userId, 'lipb.lipbid');

      if (lipbid) {
        ret['lipb'] = {
          'lipbid': lipbid
        };
      }
    }

    if (!ret.hasOwnProperty('pubcid')) {
      var pubcid = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'crumbs.pubcid');

      if (pubcid) {
        ret['pubcid'] = pubcid; // if built with old pubCommonId module
      }
    }

    return ret;
  },

  /**
   * get all the lotame override keys/values from the querystring.
   * @return object containing zero or more keys/values
   */
  getLotameOverrideParams: function getLotameOverrideParams() {
    var arrGet = this.getGetParametersAsObject();
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: getLotameOverrideParams - arrGet=', arrGet);
    var arrRet = {};

    for (var i in ALLOWED_LOTAME_PARAMS) {
      if (arrGet.hasOwnProperty(ALLOWED_LOTAME_PARAMS[i])) {
        arrRet[ALLOWED_LOTAME_PARAMS[i]] = arrGet[ALLOWED_LOTAME_PARAMS[i]];
      }
    }

    return arrRet;
  },

  /**
   * Boolean function to check that this lotame data is valid (check Audience.id)
   */
  isLotameDataValid: function isLotameDataValid(lotameObj) {
    if (!lotameObj.hasOwnProperty('Profile')) return false;
    var prof = lotameObj.Profile;
    if (!prof.hasOwnProperty('tpid')) return false;
    if (!prof.hasOwnProperty('pid')) return false;
    var audiences = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](prof, 'Audiences.Audience');

    if (_typeof(audiences) != 'object') {
      return false;
    }

    for (var i = 0; i < audiences.length; i++) {
      var aud = audiences[i];

      if (!aud.hasOwnProperty('id')) {
        return false;
      }
    }

    return true; // All Audiences objects have an 'id' key
  },

  /**
   * Use the arrOverride keys/vals to update the arrExisting lotame object.
   * Ideally we will only be using the oz_lotameid value to update the audiences id, but in the event of bad/missing
   * pid & tpid we will also have to use substitute values for those too.
   *
   * @param objOverride object will contain all the ALLOWED_LOTAME_PARAMS parameters
   * @param lotameData object might be {} or contain the lotame data
   */
  makeLotameObjectFromOverride: function makeLotameObjectFromOverride(objOverride, lotameData) {
    if (lotameData.hasOwnProperty('Profile') && Object.keys(lotameData.Profile).length < 3 || !lotameData.hasOwnProperty('Profile')) {
      // bad or empty lotame object (should contain pid, tpid & Audiences object) - build a total replacement
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: makeLotameObjectFromOverride will return a full default lotame object');
      return {
        'Profile': {
          'tpid': objOverride['oz_lotametpid'],
          'pid': objOverride['oz_lotamepid'],
          'Audiences': {
            'Audience': [{
              'id': objOverride['oz_lotameid'],
              'abbr': objOverride['oz_lotameid']
            }]
          }
        }
      };
    }

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](lotameData, 'Profile.Audiences.Audience')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: makeLotameObjectFromOverride will return the existing lotame object with updated Audience by oz_lotameid');
      lotameData.Profile.Audiences.Audience = [{
        'id': objOverride['oz_lotameid'],
        'abbr': objOverride['oz_lotameid']
      }];
      return lotameData;
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: makeLotameObjectFromOverride Weird error - failed to find Profile.Audiences.Audience in lotame object. Will return the object as-is');
    return lotameData;
  },

  /**
   * Convenient method to get the value we need for the placementId - ONLY from the bidRequest - NOT taking into account any GET override ID
   * @param bidRequest
   * @return string
   */
  getPlacementId: function getPlacementId(bidRequest) {
    return bidRequest.params.placementId.toString();
  },

  /**
   * GET parameter introduced in 2.2.0 : ozstoredrequest
   * IF the GET parameter exists then it must validate for placementId correctly
   * IF there's a $_GET['ozstoredrequest'] & it's valid then return this. Else return null.
   * @returns null|string
   */
  getPlacementIdOverrideFromGetParam: function getPlacementIdOverrideFromGetParam() {
    var arr = this.getGetParametersAsObject();

    if (arr.hasOwnProperty('ozstoredrequest')) {
      if (this.isValidPlacementId(arr.ozstoredrequest)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: using GET ozstoredrequest ' + arr.ozstoredrequest + ' to replace placementId');
        return arr.ozstoredrequest;
      } else {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: GET ozstoredrequest FAILED VALIDATION - will not use it');
      }
    }

    return null;
  },

  /**
   * Produces external userid object
   */
  addExternalUserId: function addExternalUserId(eids, value, source, atype) {
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](value)) {
      eids.push({
        source: source,
        uids: [{
          id: value,
          atype: atype
        }]
      });
    }
  },

  /**
   * Generate an object we can append to the auction request, containing user data formatted correctly for different ssps
   * @param validBidRequests
   * @return {Array}
   */
  generateEids: function generateEids(validBidRequests) {
    var eids = [];
    this.handleTTDId(eids, validBidRequests);
    var bidRequest = validBidRequests[0];

    if (bidRequest && bidRequest.userId) {
      this.addExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "userId.pubcid"), 'pubcid', 1);
      this.addExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "userId.pubcid"), 'pubcommon', 1);
      this.addExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "userId.id5id"), 'id5-sync.com', 1);
      this.addExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "userId.criteortus.".concat(BIDDER_CODE, ".userid")), 'criteortus', 1);
      this.addExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "userId.idl_env"), 'liveramp.com', 1);
      this.addExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "userId.lipb.lipbid"), 'liveintent.com', 1);
      this.addExternalUserId(eids, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "userId.parrableId.eid"), 'parrable.com', 1);
    }

    return eids;
  },
  handleTTDId: function handleTTDId(eids, validBidRequests) {
    var ttdId = null;
    var adsrvrOrgId = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('adsrvrOrgId');

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests, '0.userId.tdid'))) {
      ttdId = validBidRequests[0].userId.tdid;
    } else if (adsrvrOrgId && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](adsrvrOrgId.TDID)) {
      ttdId = adsrvrOrgId.TDID;
    }

    if (ttdId !== null) {
      eids.push({
        'source': 'adserver.org',
        'uids': [{
          'id': ttdId,
          'atype': 1,
          'ext': {
            'rtiPartner': 'TDID'
          }
        }]
      });
    }
  },
  // Try to use this as the mechanism for reading GET params because it's easy to mock it for tests
  getGetParametersAsObject: function getGetParametersAsObject() {
    var items = location.search.substr(1).split('&');
    var ret = {};
    var tmp = null;

    for (var index = 0; index < items.length; index++) {
      tmp = items[index].split('=');
      ret[tmp[0]] = tmp[1];
    }

    return ret;
  },

  /**
   * Do we have to block this request? Could be due to config values (no longer checking gdpr)
   * @return {boolean|*[]} true = block the request, else false
   */
  blockTheRequest: function blockTheRequest() {
    // if there is an ozone.oz_request = false then quit now.
    var ozRequest = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('ozone.oz_request');

    if (typeof ozRequest == 'boolean' && !ozRequest) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('OZONE: Will not allow auction : ozone.oz_request is set to false');
      return true;
    }

    return false;
  },

  /**
   * This returns a random ID for this page. It starts off with the current ms timestamp then appends a random component
   * @return {string}
   */
  getPageId: function getPageId() {
    if (this.propertyBag.pageId == null) {
      var randPart = '';
      var allowable = '0123456789abcdefghijklmnopqrstuvwxyz';

      for (var i = 20; i > 0; i--) {
        randPart += allowable[Math.floor(Math.random() * 36)];
      }

      this.propertyBag.pageId = new Date().getTime() + '_' + randPart;
    }

    return this.propertyBag.pageId;
  },

  /**
   * handle the complexity of there possibly being lotameData override (may be valid/invalid) & there may or may not be lotameData present in the bidRequest
   * NOTE THAT this will also set this.propertyBag.lotameWasOverridden=1 if we use lotame override
   * @param ozoneBidRequest
   * @return object representing the absolute lotameData we need to use.
   */
  tryGetLotameData: function tryGetLotameData(ozoneBidRequest) {
    var arrLotameOverride = this.getLotameOverrideParams();
    var ret = {};

    if (Object.keys(arrLotameOverride).length === ALLOWED_LOTAME_PARAMS.length) {
      // all override params are present, override lotame object:
      if (ozoneBidRequest.params.hasOwnProperty('lotameData')) {
        ret = this.makeLotameObjectFromOverride(arrLotameOverride, ozoneBidRequest.params.lotameData);
      } else {
        ret = this.makeLotameObjectFromOverride(arrLotameOverride, {});
      }

      this.propertyBag.lotameWasOverridden = 1;
    } else if (ozoneBidRequest.params.hasOwnProperty('lotameData')) {
      // no lotame override, use it as-is
      if (this.isLotameDataValid(ozoneBidRequest.params.lotameData)) {
        ret = ozoneBidRequest.params.lotameData;
      } else {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: INVALID LOTAME DATA FOUND - WILL NOT USE THIS AT ALL ELSE IT MIGHT BREAK THE AUCTION CALL!', ozoneBidRequest.params.lotameData);
        ret = {};
      }
    }

    return ret;
  },
  unpackVideoConfigIntoIABformat: function unpackVideoConfigIntoIABformat(videoConfig, childConfig) {
    var ret = {
      'ext': {}
    };
    ret = this._unpackVideoConfigIntoIABformat(ret, videoConfig);
    ret = this._unpackVideoConfigIntoIABformat(ret, childConfig);
    return ret;
  },

  /**
   *
   * look in ONE object to get video config (we need to call this multiple times, so child settings override parent)
   * @param ret
   * @param objConfig
   * @return {*}
   * @private
   */
  _unpackVideoConfigIntoIABformat: function _unpackVideoConfigIntoIABformat(ret, objConfig) {
    var arrVideoKeysAllowed = ['mimes', 'minduration', 'maxduration', 'protocols', 'w', 'h', 'startdelay', 'placement', 'linearity', 'skip', 'skipmin', 'skipafter', 'sequence', 'battr', 'maxextended', 'minbitrate', 'maxbitrate', 'boxingallowed', 'playbackmethod', 'playbackend', 'delivery', 'pos', 'companionad', 'api', 'companiontype'];

    var _loop2 = function _loop2(key) {
      found = false;
      arrVideoKeysAllowed.forEach(function (arg) {
        if (arg === key) {
          ret[key] = objConfig[key];
          found = true;
        }
      });

      if (!found) {
        ret.ext[key] = objConfig[key];
      }
    };

    for (var key in objConfig) {
      var found;

      _loop2(key);
    } // handle ext separately, if it exists; we have probably built up an ext object already


    if (objConfig.hasOwnProperty('ext') && _typeof(objConfig.ext) === 'object') {
      if (objConfig.hasOwnProperty('ext')) {
        ret.ext = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["mergeDeep"](ret.ext, objConfig.ext);
      } else {
        ret.ext = objConfig.ext;
      }
    }

    return ret;
  },
  addVideoDefaults: function addVideoDefaults(objRet, videoConfig, childConfig) {
    objRet = this._addVideoDefaults(objRet, videoConfig, false);
    objRet = this._addVideoDefaults(objRet, childConfig, true); // child config will override parent config

    return objRet;
  },

  /**
   * modify objRet, adding in default values
   * @param objRet
   * @param objConfig
   * @param addIfMissing
   * @return {*}
   * @private
   */
  _addVideoDefaults: function _addVideoDefaults(objRet, objConfig, addIfMissing) {
    // add inferred values & any default values we want.
    var context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](objConfig, 'context');

    if (context === 'outstream') {
      objRet.placement = 3;
    } else if (context === 'instream') {
      objRet.placement = 1;
    }

    var skippable = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](objConfig, 'skippable', null);

    if (skippable == null) {
      if (addIfMissing && !objRet.hasOwnProperty('skip')) {
        objRet.skip = skippable ? 1 : 0;
      }
    } else {
      objRet.skip = skippable ? 1 : 0;
    }

    return objRet;
  }
};
/**
 * add a page-level-unique adId element to all server response bids.
 * NOTE that this is destructive - it mutates the serverResponse object sent in as a parameter
 * @param seatbid  object (serverResponse.seatbid)
 * @returns seatbid object
 */

function injectAdIdsIntoAllBidResponses(seatbid) {
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: injectAdIdsIntoAllBidResponses', seatbid);

  for (var i = 0; i < seatbid.length; i++) {
    var sb = seatbid[i];

    for (var j = 0; j < sb.bid.length; j++) {
      // modify the bidId per-bid, so each bid has a unique adId within this response, and dfp can select one.
      // 2020-06 we now need a second level of ID because there might be multiple identical impid's within a seatbid!
      sb.bid[j]['adId'] = "".concat(sb.bid[j]['impid'], "-").concat(i, "-").concat(j);
    }
  }

  return seatbid;
}
function checkDeepArray(Arr) {
  if (Array.isArray(Arr)) {
    if (Array.isArray(Arr[0])) {
      return Arr[0];
    } else {
      return Arr;
    }
  } else {
    return Arr;
  }
}
function defaultSize(thebidObj) {
  if (!thebidObj) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: defaultSize received empty bid obj! going to return fixed default size');
    return {
      'defaultHeight': 250,
      'defaultWidth': 300
    };
  }

  var sizes = thebidObj.sizes;
  var returnObject = {};
  returnObject.defaultWidth = checkDeepArray(sizes)[0];
  returnObject.defaultHeight = checkDeepArray(sizes)[1];
  return returnObject;
}
/**
 * Do the messy searching for the best bid response in the serverResponse.seatbid array matching the requestBid.bidId
 * @param requestBid
 * @param serverResponseSeatBid
 * @returns {*} bid object
 */

function ozoneGetWinnerForRequestBid(requestBidId, serverResponseSeatBid) {
  var thisBidWinner = null;
  var winningSeat = null;

  for (var j = 0; j < serverResponseSeatBid.length; j++) {
    var theseBids = serverResponseSeatBid[j].bid;
    var thisSeat = serverResponseSeatBid[j].seat;

    for (var k = 0; k < theseBids.length; k++) {
      if (theseBids[k].impid === requestBidId) {
        // we've found a matching server response bid for this request bid
        if (thisBidWinner == null || thisBidWinner.price < theseBids[k].price) {
          thisBidWinner = theseBids[k];
          winningSeat = thisSeat;
          break;
        }
      }
    }
  }

  return {
    'seat': winningSeat,
    'bid': thisBidWinner
  };
}
/**
 * Get a list of all the bids, for this bidId. The keys in the response object will be {seatname} OR {seatname}{w}x{h} if seatname already exists
 * @param matchBidId
 * @param serverResponseSeatBid
 * @returns {} = {ozone|320x600:{obj}, ozone|320x250:{obj}, appnexus|300x250:{obj}, ... }
 */

function ozoneGetAllBidsForBidId(matchBidId, serverResponseSeatBid) {
  var objBids = {};

  for (var j = 0; j < serverResponseSeatBid.length; j++) {
    var theseBids = serverResponseSeatBid[j].bid;
    var thisSeat = serverResponseSeatBid[j].seat;

    for (var k = 0; k < theseBids.length; k++) {
      if (theseBids[k].impid === matchBidId) {
        if (objBids.hasOwnProperty(thisSeat)) {
          // > 1 bid for an adunit from a bidder - only use the one with the highest bid
          //   objBids[`${thisSeat}${theseBids[k].w}x${theseBids[k].h}`] = theseBids[k];
          if (objBids[thisSeat]['price'] < theseBids[k].price) {
            objBids[thisSeat] = theseBids[k];
          }
        } else {
          objBids[thisSeat] = theseBids[k];
        }
      }
    }
  }

  return objBids;
}
/**
 * Round the bid price down according to the granularity
 * @param price
 * @param mediaType = video, banner or native
 */

function getRoundedBid(price, mediaType) {
  var mediaTypeGranularity = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig("mediaTypePriceGranularity.".concat(mediaType)); // might be string or object or nothing; if set then this takes precedence over 'priceGranularity'

  var objBuckets = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('customPriceBucket'); // this is always an object - {} if strBuckets is not 'custom'

  var strBuckets = __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('priceGranularity'); // priceGranularity value, always a string ** if priceGranularity is set to an object then it's always 'custom' **

  var theConfigObject = getGranularityObject(mediaType, mediaTypeGranularity, strBuckets, objBuckets);
  var theConfigKey = getGranularityKeyName(mediaType, mediaTypeGranularity, strBuckets);
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: getRoundedBid. price:', price, 'mediaType:', mediaType, 'configkey:', theConfigKey, 'configObject:', theConfigObject, 'mediaTypeGranularity:', mediaTypeGranularity, 'strBuckets:', strBuckets);
  var priceStringsObj = Object(__WEBPACK_IMPORTED_MODULE_4__src_cpmBucketManager_js__["a" /* getPriceBucketString */])(price, theConfigObject, __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('currency.granularityMultiplier'));
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: priceStringsObj', priceStringsObj); // by default, without any custom granularity set, you get granularity name : 'medium'

  var granularityNamePriceStringsKeyMapping = {
    'medium': 'med',
    'custom': 'custom',
    'high': 'high',
    'low': 'low',
    'dense': 'dense'
  };

  if (granularityNamePriceStringsKeyMapping.hasOwnProperty(theConfigKey)) {
    var priceStringsKey = granularityNamePriceStringsKeyMapping[theConfigKey];
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: getRoundedBid: looking for priceStringsKey:', priceStringsKey);
    return priceStringsObj[priceStringsKey];
  }

  return priceStringsObj['auto'];
}
/**
 * return the key to use to get the value out of the priceStrings object, taking into account anything at
 * config.priceGranularity level or config.mediaType.xxx level
 * I've noticed that the key specified by prebid core : config.getConfig('priceGranularity') does not properly
 * take into account the 2-levels of config
 */

function getGranularityKeyName(mediaType, mediaTypeGranularity, strBuckets) {
  if (typeof mediaTypeGranularity === 'string') {
    return mediaTypeGranularity;
  }

  if (_typeof(mediaTypeGranularity) === 'object') {
    return 'custom';
  }

  if (typeof strBuckets === 'string') {
    return strBuckets;
  }

  return 'auto'; // fall back to a default key - should literally never be needed.
}
/**
 * return the object to use to create the custom value of the priceStrings object, taking into account anything at
 * config.priceGranularity level or config.mediaType.xxx level
 */

function getGranularityObject(mediaType, mediaTypeGranularity, strBuckets, objBuckets) {
  if (_typeof(mediaTypeGranularity) === 'object') {
    return mediaTypeGranularity;
  }

  if (strBuckets === 'custom') {
    return objBuckets;
  }

  return '';
}
/**
 * We expect to be able to find a standard set of properties on winning bid objects; add them here.
 * @param seatBid
 * @returns {*}
 */

function ozoneAddStandardProperties(seatBid, defaultWidth, defaultHeight) {
  seatBid.cpm = seatBid.price;
  seatBid.bidId = seatBid.impid;
  seatBid.requestId = seatBid.impid;
  seatBid.width = seatBid.w || defaultWidth;
  seatBid.height = seatBid.h || defaultHeight;
  seatBid.ad = seatBid.adm;
  seatBid.netRevenue = true;
  seatBid.creativeId = seatBid.crid;
  seatBid.currency = 'USD';
  seatBid.ttl = 300;
  return seatBid;
}
/**
 *
 * @param objVideo will be like {"playerSize":[640,480],"mimes":["video/mp4"],"context":"outstream"} or POSSIBLY {"playerSize":[[640,480]],"mimes":["video/mp4"],"context":"outstream"}
 * @return object {w,h} or null
 */

function getWidthAndHeightFromVideoObject(objVideo) {
  var playerSize = getPlayerSizeFromObject(objVideo);

  if (!playerSize) {
    return null;
  }

  if (playerSize[0] && _typeof(playerSize[0]) === 'object') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: getWidthAndHeightFromVideoObject found nested array inside playerSize.', playerSize[0]);
    playerSize = playerSize[0];

    if (typeof playerSize[0] !== 'number' && typeof playerSize[0] !== 'string') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: getWidthAndHeightFromVideoObject found non-number/string type inside the INNER array in playerSize. This is totally wrong - cannot continue.', playerSize[0]);
      return null;
    }
  }

  if (playerSize.length !== 2) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: getWidthAndHeightFromVideoObject found playerSize with length of ' + playerSize.length + '. This is totally wrong - cannot continue.');
    return null;
  }

  return {
    'w': playerSize[0],
    'h': playerSize[1]
  };
}
/**
 * @param objVideo will be like {"playerSize":[640,480],"mimes":["video/mp4"],"context":"outstream"} or POSSIBLY {"playerSize":[[640,480]],"mimes":["video/mp4"],"context":"outstream"}
 * @return object {w,h} or null
 */

function playerSizeIsNestedArray(objVideo) {
  var playerSize = getPlayerSizeFromObject(objVideo);

  if (!playerSize) {
    return null;
  }

  if (playerSize.length < 1) {
    return null;
  }

  return playerSize[0] && _typeof(playerSize[0]) === 'object';
}
/**
 * Common functionality when looking at a video object, to get the playerSize
 * @param objVideo
 * @returns {*}
 */

function getPlayerSizeFromObject(objVideo) {
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: getPlayerSizeFromObject received object', objVideo);
  var playerSize = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](objVideo, 'playerSize');

  if (!playerSize) {
    playerSize = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](objVideo, 'ext.playerSize');
  }

  if (!playerSize) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: getPlayerSizeFromObject FAILED: no playerSize in video object or ext', objVideo);
    return null;
  }

  if (_typeof(playerSize) !== 'object') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('OZONE: getPlayerSizeFromObject FAILED: playerSize is not an object/array', objVideo);
    return null;
  }

  return playerSize;
}
/*
  Rendering video ads - create a renderer instance, mark it as not loaded, set a renderer function.
  The renderer function will not assume that the renderer script is loaded - it will push() the ultimate render function call
 */


function newRenderer(adUnitCode) {
  var rendererOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var renderer = __WEBPACK_IMPORTED_MODULE_5__src_Renderer_js__["a" /* Renderer */].install({
    url: OZONE_RENDERER_URL,
    config: rendererOptions,
    loaded: false,
    adUnitCode: adUnitCode
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('OZONE Prebid Error calling setRender on renderer', err);
  }

  return renderer;
}

function outstreamRender(bid) {
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: outstreamRender called. Going to push the call to window.ozoneVideo.outstreamRender(bid) bid =', bid); // push to render queue because ozoneVideo may not be loaded yet

  bid.renderer.push(function () {
    window.ozoneVideo.outstreamRender(bid);
  });
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);
__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('OZONE: ozoneBidAdapter was loaded');

/***/ })

},[577]);