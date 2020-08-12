pbjsChunk([48],{

/***/ 514:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(515);


/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
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

var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid && bid.params && bid.params.publisherId) {
      bid.params.publisherId = parseInt(bid.params.publisherId);
      return true;
    }
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var payload = {
      'x-ut-hb-params': [],
      'commons': {
        'adapterVersion': "3.0.0",
        'uids': validBidRequests[0].userId
      }
    };
    var referer = bidderRequest.refererInfo.referer;
    var hostname = __WEBPACK_IMPORTED_MODULE_0__src_url__["c" /* parse */](referer).hostname;
    var domain = extractDomainFromHost(hostname);
    var pageUrl = getCanonicalUrl() || referer;
    var pubid = validBidRequests[0].params.publisherId;
    var reqUrl = "".concat(URL, "?pid=").concat(pubid, "&domain=").concat(domain);
    var gdprParams = getGdprQueryParams(bidderRequest.gdprConsent);

    if (gdprParams) {
      reqUrl += "&".concat(gdprParams);
    }

    validBidRequests.map(function (bidReq) {
      var bid = {
        bidRequestId: bidReq.bidId,
        hbadaptor: 'prebid',
        url: pageUrl,
        domain: domain,
        placementId: bidReq.params.placementId != undefined ? bidReq.params.placementId : null,
        publisherId: bidReq.params.publisherId,
        sizes: bidReq.sizes,
        params: bidReq.params
      };
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
            ttl: bidRes.ttl || 360,
            ad: bidRes.ad
          };
          bids.push(bid);
        }
      });
    }

    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    var syncs = [];
    var gdprParams = getGdprQueryParams(gdprConsent);
    var iframeGdprParams = '';
    var pixelGdprParams = '';

    if (gdprParams) {
      iframeGdprParams += "?".concat(gdprParams);
      pixelGdprParams += "&".concat(gdprParams);
    }

    if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: FRAME_USER_SYNC + iframeGdprParams
      });
    } else if (syncOptions.pixelEnabled) {
      syncs.push({
        type: 'image',
        url: PIXEL_USER_SYNC_1 + pixelGdprParams
      }, {
        type: 'image',
        url: PIXEL_USER_SYNC_2 + pixelGdprParams
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[514]);