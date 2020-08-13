pbjsChunk([89],{

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(735);


/***/ }),

/***/ 735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);


var utils = __webpack_require__(0);

var BIDDER_CODE = 'teads';
var ENDPOINT_URL = 'https://a.teads.tv/hb/bid-request';
var gdprStatus = {
  GDPR_APPLIES_PUBLISHER: 12,
  GDPR_APPLIES_GLOBAL: 11,
  GDPR_DOESNT_APPLY: 0,
  CMP_NOT_FOUND_OR_ERROR: 22
};
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['video', 'banner'],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var isValid = false;

    if (typeof bid.params !== 'undefined') {
      var isValidPlacementId = _validateId(utils.getValue(bid.params, 'placementId'));

      var isValidPageId = _validateId(utils.getValue(bid.params, 'pageId'));

      isValid = isValidPlacementId && isValidPageId;
    }

    if (!isValid) {
      utils.logError('Teads placementId and pageId parameters are required. Bid aborted.');
    }

    return isValid;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bids = validBidRequests.map(buildRequestObject);
    var payload = {
      referrer: getReferrerInfo(bidderRequest),
      pageReferrer: document.referrer,
      networkBandwidth: getConnectionDownLink(window.navigator),
      data: bids,
      deviceWidth: screen.width,
      hb_version: "4.2.0"
    };

    if (validBidRequests[0].schain) {
      payload.schain = validBidRequests[0].schain;
    }

    var gdpr = bidderRequest.gdprConsent;

    if (bidderRequest && gdpr) {
      var isCmp = typeof gdpr.gdprApplies === 'boolean';
      var isConsentString = typeof gdpr.consentString === 'string';
      var status = isCmp ? findGdprStatus(gdpr.gdprApplies, gdpr.vendorData, gdpr.apiVersion) : gdprStatus.CMP_NOT_FOUND_OR_ERROR;
      payload.gdpr_iab = {
        consent: isConsentString ? gdpr.consentString : '',
        status: status,
        apiVersion: gdpr.apiVersion
      };
    }

    if (bidderRequest && bidderRequest.uspConsent) {
      payload.us_privacy = bidderRequest.uspConsent;
    }

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: payloadString
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidderRequest) {
    var bidResponses = [];
    serverResponse = serverResponse.body;

    if (serverResponse.responses) {
      serverResponse.responses.forEach(function (bid) {
        var bidResponse = {
          cpm: bid.cpm,
          width: bid.width,
          height: bid.height,
          currency: bid.currency,
          netRevenue: true,
          ttl: bid.ttl,
          ad: bid.ad,
          requestId: bid.bidId,
          creativeId: bid.creativeId,
          placementId: bid.placementId
        };

        if (bid.dealId) {
          bidResponse.dealId = bid.dealId;
        }

        bidResponses.push(bidResponse);
      });
    }

    return bidResponses;
  }
};

function getReferrerInfo(bidderRequest) {
  var ref = '';

  if (bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer) {
    ref = bidderRequest.refererInfo.referer;
  }

  return ref;
}

function getConnectionDownLink(nav) {
  return nav && nav.connection && nav.connection.downlink >= 0 ? nav.connection.downlink.toString() : '';
}

function findGdprStatus(gdprApplies, gdprData, apiVersion) {
  var status = gdprStatus.GDPR_APPLIES_PUBLISHER;

  if (gdprApplies) {
    if (isGlobalConsent(gdprData, apiVersion)) status = gdprStatus.GDPR_APPLIES_GLOBAL;
  } else status = gdprStatus.GDPR_DOESNT_APPLY;

  return status;
}

function isGlobalConsent(gdprData, apiVersion) {
  return gdprData && apiVersion === 1 ? gdprData.hasGlobalScope || gdprData.hasGlobalConsent : gdprData && apiVersion === 2 ? !gdprData.isServiceSpecific : false;
}

function buildRequestObject(bid) {
  var reqObj = {};
  var placementId = utils.getValue(bid.params, 'placementId');
  var pageId = utils.getValue(bid.params, 'pageId');
  reqObj.sizes = getSizes(bid);
  reqObj.bidId = utils.getBidIdParameter('bidId', bid);
  reqObj.bidderRequestId = utils.getBidIdParameter('bidderRequestId', bid);
  reqObj.placementId = parseInt(placementId, 10);
  reqObj.pageId = parseInt(pageId, 10);
  reqObj.adUnitCode = utils.getBidIdParameter('adUnitCode', bid);
  reqObj.auctionId = utils.getBidIdParameter('auctionId', bid);
  reqObj.transactionId = utils.getBidIdParameter('transactionId', bid);
  return reqObj;
}

function getSizes(bid) {
  return utils.parseSizesInput(concatSizes(bid));
}

function concatSizes(bid) {
  var playerSize = utils.deepAccess(bid, 'mediaTypes.video.playerSize');
  var videoSizes = utils.deepAccess(bid, 'mediaTypes.video.sizes');
  var bannerSizes = utils.deepAccess(bid, 'mediaTypes.banner.sizes');

  if (utils.isArray(bannerSizes) || utils.isArray(playerSize) || utils.isArray(videoSizes)) {
    var mediaTypesSizes = [bannerSizes, videoSizes, playerSize];
    return mediaTypesSizes.reduce(function (acc, currSize) {
      if (utils.isArray(currSize)) {
        if (utils.isArray(currSize[0])) {
          currSize.forEach(function (childSize) {
            acc.push(childSize);
          });
        } else {
          acc.push(currSize);
        }
      }

      return acc;
    }, []);
  } else {
    return bid.sizes;
  }
}

function _validateId(id) {
  return parseInt(id) > 0;
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[734]);