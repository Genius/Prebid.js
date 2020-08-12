pbjsChunk([96],{

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(390);


/***/ }),

/***/ 390:
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
/* harmony export (immutable) */ __webpack_exports__["getTestQuerystringValue"] = getTestQuerystringValue;
/* harmony export (immutable) */ __webpack_exports__["pgGuid"] = pgGuid;
/* harmony export (immutable) */ __webpack_exports__["getWidthAndHeightFromVideoObject"] = getWidthAndHeightFromVideoObject;
/* harmony export (immutable) */ __webpack_exports__["playerSizeIsNestedArray"] = playerSizeIsNestedArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_cpmBucketManager__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_Renderer__ = __webpack_require__(11);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }







var BIDDER_CODE = 'ozone';
var OZONEURI = 'https://elb.the-ozone-project.com/openrtb2/auction';
var OZONECOOKIESYNC = 'https://elb.the-ozone-project.com/static/load-cookie.html';
var OZONE_RENDERER_URL = 'https://prebid.the-ozone-project.com/ozone-renderer.js';
var OZONEVERSION = '2.1.2';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],

  /**
   * Basic check to see whether required parameters are in the request.
   * @param bid
   * @returns {boolean}
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid.params.hasOwnProperty('placementId')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : missing placementId : siteId, placementId and publisherId are REQUIRED');
      return false;
    }

    if (!bid.params.placementId.toString().match(/^[0-9]{10}$/)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : placementId must be exactly 10 numeric characters');
      return false;
    }

    if (!bid.params.hasOwnProperty('publisherId')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : missing publisherId : siteId, placementId and publisherId are REQUIRED');
      return false;
    }

    if (!bid.params.publisherId.toString().match(/^[a-zA-Z0-9\-]{12}$/)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : publisherId must be exactly 12 alphanumieric characters including hyphens');
      return false;
    }

    if (!bid.params.hasOwnProperty('siteId')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : missing siteId : siteId, placementId and publisherId are REQUIRED');
      return false;
    }

    if (!bid.params.siteId.toString().match(/^[0-9]{10}$/)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : siteId must be exactly 10 numeric characters');
      return false;
    }

    if (bid.params.hasOwnProperty('customData')) {
      if (_typeof(bid.params.customData) !== 'object') {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : customData is not an object');
        return false;
      }
    }

    if (bid.params.hasOwnProperty('customParams')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : customParams should be renamed to customData');
      return false;
    }

    if (bid.params.hasOwnProperty('lotameData')) {
      if (_typeof(bid.params.lotameData) !== 'object') {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: OZONE BID ADAPTER VALIDATION FAILED : lotameData is not an object');
        return false;
      }
    }

    if (bid.hasOwnProperty('mediaTypes') && bid.mediaTypes.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */])) {
      if (!bid.mediaTypes.video.hasOwnProperty('context')) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: [WARNING] No context key/value in bid. Rejecting bid: ', bid);
        return false;
      }

      if (bid.mediaTypes.video.context !== 'outstream') {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: [WARNING] Only outstream video is supported. Rejecting bid: ', bid);
        return false;
      }
    }

    return true;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: ozone v' + OZONEVERSION + ' validBidRequests', validBidRequests, 'bidderRequest', bidderRequest);
    var singleRequest = __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('ozone.singleRequest');
    singleRequest = singleRequest !== false; // undefined & true will be true

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: config ozone.singleRequest : ', singleRequest);
    var htmlParams = validBidRequests[0].params; // the html page config params will be included in each element

    var ozoneRequest = {}; // we only want to set specific properties on this, not validBidRequests[0].params

    delete ozoneRequest.test; // don't allow test to be set in the config - ONLY use $_GET['pbjs_debug']

    if (bidderRequest && bidderRequest.gdprConsent) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: ADDING GDPR info');
      ozoneRequest.regs = {};
      ozoneRequest.regs.ext = {};
      ozoneRequest.regs.ext.gdpr = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;

      if (ozoneRequest.regs.ext.gdpr) {
        ozoneRequest.user = ozoneRequest.user || {};

        if (bidderRequest.gdprConsent.vendorData && bidderRequest.gdprConsent.vendorData.vendorConsents && typeof bidderRequest.gdprConsent.consentString !== 'undefined') {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: found all info we need for GDPR - will add info to request object');
          ozoneRequest.user.ext = {
            'consent': bidderRequest.gdprConsent.consentString
          }; // are we able to make this request?

          var vendorConsents = bidderRequest.gdprConsent.vendorData.vendorConsents;
          var boolGdprConsentForOzone = vendorConsents[524];
          var arrGdprConsents = toFlatArray(bidderRequest.gdprConsent.vendorData.purposeConsents);
          ozoneRequest.regs.ext.oz_con = boolGdprConsentForOzone ? 1 : 0;
          ozoneRequest.regs.ext.gap = arrGdprConsents;
        }
      } else {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: **** Failed to find required info for GDPR for request object, even though bidderRequest.gdprConsent is TRUE ****');
      }
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: WILL NOT ADD GDPR info; no bidderRequest.gdprConsent object was present.');
    }

    ozoneRequest.device = {
      'w': window.innerWidth,
      'h': window.innerHeight
    };
    var tosendtags = validBidRequests.map(function (ozoneBidRequest) {
      var obj = {};
      obj.id = ozoneBidRequest.bidId; // this causes an error if we change it to something else, even if you update the bidRequest object: "WARNING: Bidder ozone made bid for unknown request ID: mb7953.859498327448. Ignoring."

      obj.tagid = ozoneBidRequest.params.placementId.toString();
      obj.secure = window.location.protocol === 'https:' ? 1 : 0; // is there a banner (or nothing declared, so banner is the default)?

      var arrBannerSizes = [];
      /* NOTE - if there is sizes element in the config root then there will be a mediaTypes.banner element automatically generated for us, so this code is deprecated */

      if (!ozoneBidRequest.hasOwnProperty('mediaTypes')) {
        if (ozoneBidRequest.hasOwnProperty('sizes')) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: no mediaTypes detected - will use the sizes array in the config root');
          arrBannerSizes = ozoneBidRequest.sizes;
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: no mediaTypes detected, no sizes array in the config root either. Cannot set sizes for banner type');
        }
      } else {
        if (ozoneBidRequest.mediaTypes.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */])) {
          arrBannerSizes = ozoneBidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]].sizes;
          /* Note - if there is a sizes element in the config root it will be pushed into here */

          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: setting banner size from the mediaTypes.banner element for bidId ' + obj.id + ': ', arrBannerSizes);
        }

        if (ozoneBidRequest.mediaTypes.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */])) {
          obj.video = ozoneBidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]]; // we need to duplicate some of the video values

          var wh = getWidthAndHeightFromVideoObject(obj.video);
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: setting video object from the mediaTypes.video element: ' + obj.id + ':', obj.video, 'wh=', wh);

          if (wh && _typeof(wh) === 'object') {
            obj.video.w = wh['w'];
            obj.video.h = wh['h'];

            if (playerSizeIsNestedArray(obj.video)) {
              // this should never happen; it was in the original spec for this change though.
              __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: setting obj.video.format to be an array of objects');
              obj.video.format = [wh];
            } else {
              __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: setting obj.video.format to be an object');
              obj.video.format = wh;
            }
          } else {
            __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: cannot set w, h & format values for video; the config is not right');
          }
        } // Native integration is not complete yet


        if (ozoneBidRequest.mediaTypes.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */])) {
          obj.native = ozoneBidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */]];
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: setting native object from the mediaTypes.native element: ' + obj.id + ':', obj.native);
        }
      } // build the banner request using banner sizes we found in either possible location:


      if (arrBannerSizes.length > 0) {
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


      obj.placementId = ozoneBidRequest.params.placementId.toString();
      obj.publisherId = ozoneBidRequest.params.publisherId.toString();
      obj.siteId = ozoneBidRequest.params.siteId.toString(); // build the imp['ext'] object

      obj.ext = {
        'prebid': {
          'storedrequest': {
            'id': ozoneBidRequest.params.placementId.toString()
          }
        },
        'ozone': {}
      };
      obj.ext.ozone.adUnitCode = ozoneBidRequest.adUnitCode; // eg. 'mpu'

      obj.ext.ozone.transactionId = ozoneBidRequest.transactionId; // this is the transactionId PER adUnit, common across bidders for this unit

      obj.ext.ozone.oz_pb_v = OZONEVERSION;

      if (ozoneBidRequest.params.hasOwnProperty('customData')) {
        obj.ext.ozone.customData = ozoneBidRequest.params.customData;
      }

      if (ozoneBidRequest.params.hasOwnProperty('lotameData')) {
        obj.ext.ozone.lotameData = ozoneBidRequest.params.lotameData;
      }

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](ozoneBidRequest, 'crumbs.pubcid')) {
        obj.ext.ozone.pubcid = ozoneBidRequest.crumbs.pubcid;
      }

      return obj;
    });
    ozoneRequest.site = {
      'publisher': {
        'id': htmlParams.publisherId
      },
      'page': document.location.href
    };
    ozoneRequest.test = parseInt(getTestQuerystringValue()); // will be 1 or 0
    // return the single request object OR the array:

    if (singleRequest) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: buildRequests starting to generate response for a single request');
      ozoneRequest.id = bidderRequest.auctionId; // Unique ID of the bid request, provided by the exchange.

      ozoneRequest.auctionId = bidderRequest.auctionId; // not sure if this should be here?

      ozoneRequest.imp = tosendtags;
      ozoneRequest.source = {
        'tid': bidderRequest.auctionId
      }; // RTB 2.5 : tid is Transaction ID that must be common across all participants in this bid request (e.g., potentially multiple exchanges).

      var ret = {
        method: 'POST',
        url: OZONEURI,
        data: JSON.stringify(ozoneRequest),
        bidderRequest: bidderRequest
      };
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: buildRequests ozoneRequest for single = ', ozoneRequest);
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: buildRequests going to return for single: ', ret);
      return ret;
    } // not single request - pull apart the tosendtags array & return an array of objects each containing one element in the imp array.


    var arrRet = tosendtags.map(function (imp) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: buildRequests starting to generate non-single response, working on imp : ', imp);

      var ozoneRequestSingle = _extends({}, ozoneRequest);

      imp.ext.ozone.pageAuctionId = bidderRequest['auctionId']; // make a note in the ext object of what the original auctionId was, in the bidderRequest object

      ozoneRequestSingle.id = imp.ext.ozone.transactionId; // Unique ID of the bid request, provided by the exchange.

      ozoneRequestSingle.auctionId = imp.ext.ozone.transactionId; // not sure if this should be here?

      ozoneRequestSingle.imp = [imp];
      ozoneRequestSingle.source = {
        'tid': imp.ext.ozone.transactionId
      };
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: buildRequests ozoneRequestSingle (for non-single) = ', ozoneRequestSingle);
      return {
        method: 'POST',
        url: OZONEURI,
        data: JSON.stringify(ozoneRequestSingle),
        bidderRequest: bidderRequest
      };
    });
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: buildRequests going to return for non-single: ', arrRet);
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
    serverResponse = serverResponse.body || {};

    if (!serverResponse.hasOwnProperty('seatbid')) {
      return [];
    }

    if (_typeof(serverResponse.seatbid) !== 'object') {
      return [];
    }

    var arrAllBids = [];
    serverResponse.seatbid = injectAdIdsIntoAllBidResponses(serverResponse.seatbid); // we now make sure that each bid in the bidresponse has a unique (within page) adId attribute.

    for (var i = 0; i < serverResponse.seatbid.length; i++) {
      var sb = serverResponse.seatbid[i];

      var _loop = function _loop(j) {
        var _defaultSize = defaultSize(request.bidderRequest.bids[j]),
            defaultWidth = _defaultSize.defaultWidth,
            defaultHeight = _defaultSize.defaultHeight; // there should be the same number of bids as requests, so index [j] should always exist.


        var thisBid = ozoneAddStandardProperties(sb.bid[j], defaultWidth, defaultHeight); // from https://github.com/prebid/Prebid.js/pull/1082

        if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](thisBid, 'ext.prebid.type') === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: going to attach a renderer to:', j);
          var renderConf = createObjectForInternalVideoRender(thisBid);
          thisBid.renderer = __WEBPACK_IMPORTED_MODULE_5__src_Renderer__["a" /* Renderer */].install(renderConf);
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: bid is not a video, will not attach a renderer: ', j);
        }

        var ozoneInternalKey = thisBid.bidId;
        var adserverTargeting = {}; // all keys for all bidders for this bid have to be added to all objects returned, else some keys will not be sent to ads?

        var allBidsForThisBidid = ozoneGetAllBidsForBidId(ozoneInternalKey, serverResponse.seatbid); // add all the winning & non-winning bids for this bidId:

        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: Going to iterate allBidsForThisBidId', allBidsForThisBidid);
        Object.keys(allBidsForThisBidid).forEach(function (bidderName, index, ar2) {
          adserverTargeting['oz_' + bidderName] = bidderName;
          adserverTargeting['oz_' + bidderName + '_pb'] = String(allBidsForThisBidid[bidderName].price);
          adserverTargeting['oz_' + bidderName + '_crid'] = String(allBidsForThisBidid[bidderName].crid);
          adserverTargeting['oz_' + bidderName + '_adv'] = String(allBidsForThisBidid[bidderName].adomain);
          adserverTargeting['oz_' + bidderName + '_imp_id'] = String(allBidsForThisBidid[bidderName].impid);
          adserverTargeting['oz_' + bidderName + '_adId'] = String(allBidsForThisBidid[bidderName].adId);
          adserverTargeting['oz_' + bidderName + '_pb_r'] = getRoundedBid(allBidsForThisBidid[bidderName].price, allBidsForThisBidid[bidderName].ext.prebid.type);

          if (allBidsForThisBidid[bidderName].hasOwnProperty('dealid')) {
            adserverTargeting['oz_' + bidderName + '_dealid'] = String(allBidsForThisBidid[bidderName].dealid);
          }
        }); // also add in the winning bid, to be sent to dfp

        var _ozoneGetWinnerForReq = ozoneGetWinnerForRequestBid(ozoneInternalKey, serverResponse.seatbid),
            winningSeat = _ozoneGetWinnerForReq.seat,
            winningBid = _ozoneGetWinnerForReq.bid;

        adserverTargeting['oz_auc_id'] = String(request.bidderRequest.auctionId);
        adserverTargeting['oz_winner'] = String(winningSeat);
        adserverTargeting['oz_winner_auc_id'] = String(winningBid.id);
        adserverTargeting['oz_winner_imp_id'] = String(winningBid.impid);
        adserverTargeting['oz_response_id'] = String(serverResponse.id);
        adserverTargeting['oz_pb_v'] = OZONEVERSION;
        thisBid.adserverTargeting = adserverTargeting;
        arrAllBids.push(thisBid);
      };

      for (var j = 0; j < sb.bid.length; j++) {
        _loop(j);
      }
    }

    return arrAllBids;
  },
  getUserSyncs: function getUserSyncs(optionsType, serverResponse) {
    if (!serverResponse || serverResponse.length === 0) {
      return [];
    }

    if (optionsType.iframeEnabled) {
      return [{
        type: 'iframe',
        url: OZONECOOKIESYNC
      }];
    }
  }
};
/**
 * add a page-level-unique adId element to all server response bids.
 * NOTE that this is distructive - it mutates the serverResponse object sent in as a parameter
 * @param seatbid  object (serverResponse.seatbid)
 * @returns seatbid object
 */

function injectAdIdsIntoAllBidResponses(seatbid) {
  for (var i = 0; i < seatbid.length; i++) {
    var sb = seatbid[i];

    for (var j = 0; j < sb.bid.length; j++) {
      sb.bid[j]['adId'] = sb.bid[j]['impid'] + '-' + i; // modify the bidId per-bid, so each bid has a unique adId within this response, and dfp can select one.
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
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: defaultSize received empty bid obj! going to return fixed default size');
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
 * Get a list of all the bids, for this bidId
 * @param matchBidId
 * @param serverResponseSeatBid
 * @returns {} = {ozone:{obj}, appnexus:{obj}, ... }
 */

function ozoneGetAllBidsForBidId(matchBidId, serverResponseSeatBid) {
  var objBids = {};

  for (var j = 0; j < serverResponseSeatBid.length; j++) {
    var theseBids = serverResponseSeatBid[j].bid;
    var thisSeat = serverResponseSeatBid[j].seat;

    for (var k = 0; k < theseBids.length; k++) {
      if (theseBids[k].impid === matchBidId) {
        // we've found a matching server response bid for the request bid we're looking for
        objBids[thisSeat] = theseBids[k];
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
  var mediaTypeGranularity = __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig("mediaTypePriceGranularity.".concat(mediaType)); // might be string or object or nothing; if set then this takes precedence over 'priceGranularity'

  var objBuckets = __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('customPriceBucket'); // this is always an object - {} if strBuckets is not 'custom'

  var strBuckets = __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('priceGranularity'); // priceGranularity value, always a string ** if priceGranularity is set to an object then it's always 'custom'

  var theConfigObject = getGranularityObject(mediaType, mediaTypeGranularity, strBuckets, objBuckets);
  var theConfigKey = getGranularityKeyName(mediaType, mediaTypeGranularity, strBuckets);
  __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: getRoundedBid. price:', price, 'mediaType:', mediaType, 'configkey:', theConfigKey, 'configObject:', theConfigObject, 'mediaTypeGranularity:', mediaTypeGranularity, 'strBuckets:', strBuckets);
  var priceStringsObj = Object(__WEBPACK_IMPORTED_MODULE_4__src_cpmBucketManager__["a" /* getPriceBucketString */])(price, theConfigObject, __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('currency.granularityMultiplier'));
  __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: priceStringsObj', priceStringsObj); // by default, without any custom granularity set, you get granularity name : 'medium'

  var granularityNamePriceStringsKeyMapping = {
    'medium': 'med',
    'custom': 'custom',
    'high': 'high',
    'low': 'low',
    'dense': 'dense'
  };

  if (granularityNamePriceStringsKeyMapping.hasOwnProperty(theConfigKey)) {
    var priceStringsKey = granularityNamePriceStringsKeyMapping[theConfigKey];
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: looking for priceStringsKey:', priceStringsKey);
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

  return 'auto'; // fall back to a default key - should literally never be needed though.
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
  seatBid.ttl = 60;
  return seatBid;
}
/**
 * we need to add test=1 or test=0 to the get params sent to the server.
 * Get the value set as pbjs_debug= in the url, OR 0.
 * @returns {*}
 */

function getTestQuerystringValue() {
  var searchString = window.location.search.substring(1);
  var params = searchString.split('&');

  for (var i = 0; i < params.length; i++) {
    var val = params[i].split('=');

    if (val[0] === 'pbjs_debug') {
      return val[1] === 'true' ? 1 : 0;
    }
  }

  return 0;
}
/**
 * Generate a random number per ad; I'll use the current ms timestamp, then append 8 random alpha/numeric characters
 * Randomness : 1 in 208 billion random combinations per-millisecond, non-repeating sequence.
 *
 * @returns {*}
 */

function pgGuid() {
  return new Date().getTime() + 'xxxxxxxx'.replace(/x/g, function (c) {
    return Math.round(Math.random() * 36).toString(36);
  });
}

function createObjectForInternalVideoRender(bid) {
  var obj = {
    url: OZONE_RENDERER_URL,
    callback: function callback() {
      return onOutstreamRendererLoaded(bid);
    }
  };
  return obj;
}

function onOutstreamRendererLoaded(bid) {
  try {
    bid.renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }
}

function outstreamRender(bid) {
  window.ozoneVideo.outstreamRender(bid);
}
/**
 * convert {1: true,
            2: true,
            3: true,
            4: true,
            5: true}
   to : [1,2,3,4,5]
 * @param obj
 */


function toFlatArray(obj) {
  var ret = [];
  Object.keys(obj).forEach(function (key) {
    if (obj[key]) {
      ret.push(parseInt(key));
    }
  });
  __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: toFlatArray:', obj, 'returning', ret);
  return ret;
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
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: getWidthAndHeightFromVideoObject found nested array inside playerSize.', playerSize[0]);
    playerSize = playerSize[0];

    if (typeof playerSize[0] !== 'number' && typeof playerSize[0] !== 'string') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: getWidthAndHeightFromVideoObject found non-number/string type inside the INNER array in playerSize. This is totally wrong - cannot continue.', playerSize[0]);
      return null;
    }
  }

  if (playerSize.length !== 2) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: getWidthAndHeightFromVideoObject found playerSize with length of ' + playerSize.length + '. This is totally wrong - cannot continue.');
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
  __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: getPlayerSizeFromObject received object', objVideo);

  if (!objVideo.hasOwnProperty('playerSize')) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('OZONE: getPlayerSizeFromObject FAILED: no playerSize in video object', objVideo);
    return null;
  }

  var playerSize = objVideo.playerSize;

  if (_typeof(playerSize) !== 'object') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('OZONE: getPlayerSizeFromObject FAILED: playerSize is not an object/array', objVideo);
    return null;
  }

  return playerSize;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);
__WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('OZONE: ozoneBidAdapter ended');

/***/ })

},[389]);