pbjsChunk([74],{

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(769);


/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/**
 * Adapter to send bids to Undertone
 */



var BIDDER_CODE = 'undertone';
var URL = 'https://hb.undertone.com/hb';
var FRAME_USER_SYNC = 'https://cdn.undertone.com/js/usersync.html';
var PIXEL_USER_SYNC_1 = 'https://usr.undertone.com/userPixel/syncOne?id=1&of=2';
var PIXEL_USER_SYNC_2 = 'https://usr.undertone.com/userPixel/syncOne?id=2&of=2';

function getCanonicalUrl() {
  try {
    var doc = window.top.document;
    var element = doc.querySelector("link[rel='canonical']");

    if (element !== null) {
      return element.href;
    }
  } catch (e) {}

  return null;
}

function extractDomainFromHost(pageHost) {
  var domain = null;

  try {
    var domains = /[-\w]+\.([-\w]+|[-\w]{3,}|[-\w]{1,3}\.[-\w]{2})$/i.exec(pageHost);

    if (domains != null && domains.length > 0) {
      domain = domains[0];

      for (var i = 1; i < domains.length; i++) {
        if (domains[i].length > domain.length) {
          domain = domains[i];
        }
      }
    }
  } catch (e) {
    domain = null;
  }

  return domain;
}

function getGdprQueryParams(gdprConsent) {
  if (!gdprConsent) {
    return null;
  }

  var gdpr = gdprConsent.gdprApplies ? '1' : '0';
  var gdprstr = gdprConsent.consentString ? gdprConsent.consentString : '';
  return "gdpr=".concat(gdpr, "&gdprstr=").concat(gdprstr);
}

function getBannerCoords(id) {
  var element = document.getElementById(id);
  var left = -1;
  var top = -1;

  if (element) {
    left = element.offsetLeft;
    top = element.offsetTop;
    var parent = element.offsetParent;

    if (parent) {
      left += parent.offsetLeft;
      top += parent.offsetTop;
    }

    return [left, top];
  } else {
    return null;
  }
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid && bid.params && bid.params.publisherId) {
      bid.params.publisherId = parseInt(bid.params.publisherId);
      return true;
    }
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var pageSizeArray = vw == 0 || vh == 0 ? null : [vw, vh];
    var payload = {
      'x-ut-hb-params': [],
      'commons': {
        'adapterVersion': "4.2.0",
        'uids': validBidRequests[0].userId,
        'pageSize': pageSizeArray
      }
    };
    var referer = bidderRequest.refererInfo.referer;
    var hostname = Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseUrl"])(referer).hostname;
    var domain = extractDomainFromHost(hostname);
    var pageUrl = getCanonicalUrl() || referer;
    var pubid = validBidRequests[0].params.publisherId;
    var reqUrl = "".concat(URL, "?pid=").concat(pubid, "&domain=").concat(domain);
    var gdprParams = getGdprQueryParams(bidderRequest.gdprConsent);

    if (gdprParams) {
      reqUrl += "&".concat(gdprParams);
    }

    if (bidderRequest.uspConsent) {
      reqUrl += "&ccpa=".concat(bidderRequest.uspConsent);
    }

    validBidRequests.map(function (bidReq) {
      var bid = {
        bidRequestId: bidReq.bidId,
        coordinates: getBannerCoords(bidReq.adUnitCode),
        hbadaptor: 'prebid',
        url: pageUrl,
        domain: domain,
        placementId: bidReq.params.placementId != undefined ? bidReq.params.placementId : null,
        publisherId: bidReq.params.publisherId,
        sizes: bidReq.sizes,
        params: bidReq.params
      };
      var videoMediaType = Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'mediaTypes.video');

      if (videoMediaType) {
        bid.video = {
          playerSize: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'mediaTypes.video.playerSize') || null,
          streamType: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'mediaTypes.video.context') || null,
          playbackMethod: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'params.video.playbackMethod') || null,
          maxDuration: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'params.video.maxDuration') || null,
          skippable: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"])(bidReq, 'params.video.skippable') || null
        };
        bid.mediaType = 'video';
      }

      payload['x-ut-hb-params'].push(bid);
    });
    return {
      method: 'POST',
      url: reqUrl,
      withCredentials: true,
      data: JSON.stringify(payload)
    };
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bids = [];
    var body = serverResponse.body;

    if (body && Array.isArray(body) && body.length > 0) {
      body.forEach(function (bidRes) {
        if (bidRes.ad && bidRes.cpm > 0) {
          var bid = {
            requestId: bidRes.bidRequestId,
            cpm: bidRes.cpm,
            width: bidRes.width,
            height: bidRes.height,
            creativeId: bidRes.adId,
            currency: bidRes.currency,
            netRevenue: bidRes.netRevenue,
            ttl: bidRes.ttl || 360
          };

          if (bidRes.mediaType && bidRes.mediaType === 'video') {
            bid.vastXml = bidRes.ad;
            bid.mediaType = bidRes.mediaType;
          } else {
            bid.ad = bidRes.ad;
          }

          bids.push(bid);
        }
      });
    }

    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent, usPrivacy) {
    var syncs = [];
    var gdprParams = getGdprQueryParams(gdprConsent);
    var iframePrivacyParams = '';
    var pixelPrivacyParams = '';

    if (gdprParams) {
      iframePrivacyParams += "?".concat(gdprParams);
      pixelPrivacyParams += "&".concat(gdprParams);
    }

    if (usPrivacy) {
      if (iframePrivacyParams != '') {
        iframePrivacyParams += '&';
      } else {
        iframePrivacyParams += '?';
      }

      iframePrivacyParams += "ccpa=".concat(usPrivacy);
      pixelPrivacyParams += "&ccpa=".concat(usPrivacy);
    }

    if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: FRAME_USER_SYNC + iframePrivacyParams
      });
    } else if (syncOptions.pixelEnabled) {
      syncs.push({
        type: 'image',
        url: PIXEL_USER_SYNC_1 + pixelPrivacyParams
      }, {
        type: 'image',
        url: PIXEL_USER_SYNC_2 + pixelPrivacyParams
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[768]);