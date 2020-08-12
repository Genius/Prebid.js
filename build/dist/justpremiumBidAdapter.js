pbjsChunk([130],{

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(312);


/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);


var BIDDER_CODE = 'justpremium';
var ENDPOINT_URL = 'https://pre.ads.justpremium.com/v/2.0/t/xhr';
var JP_ADAPTER_VERSION = '1.6';
var pixels = [];
var spec = {
  code: BIDDER_CODE,
  time: 60000,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.zone);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var c = preparePubCond(validBidRequests);
    var dim = getWebsiteDim();
    var payload = {
      zone: validBidRequests.map(function (b) {
        return parseInt(b.params.zone);
      }).filter(function (value, index, self) {
        return self.indexOf(value) === index;
      }),
      referer: bidderRequest.refererInfo.referer,
      sw: dim.screenWidth,
      sh: dim.screenHeight,
      ww: dim.innerWidth,
      wh: dim.innerHeight,
      c: c,
      id: validBidRequests[0].params.zone,
      sizes: {}
    };
    validBidRequests.forEach(function (b) {
      var zone = b.params.zone;
      var sizes = payload.sizes;
      sizes[zone] = sizes[zone] || [];
      sizes[zone].push.apply(sizes[zone], b.mediaTypes && b.mediaTypes.banner && b.mediaTypes.banner.sizes);
    });

    if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(validBidRequests[0], 'userId.pubcid')) {
      payload.pubcid = Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(validBidRequests[0], 'userId.pubcid');
    } else if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(validBidRequests[0], 'crumbs.pubcid')) {
      payload.pubcid = Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(validBidRequests[0], 'crumbs.pubcid');
    }

    payload.uids = validBidRequests[0].userId;

    if (bidderRequest && bidderRequest.gdprConsent) {
      payload.gdpr_consent = {
        consent_string: bidderRequest.gdprConsent.consentString,
        consent_required: typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' ? bidderRequest.gdprConsent.gdprApplies : true
      };
    }

    payload.version = {
      prebid: "3.0.0",
      jp_adapter: JP_ADAPTER_VERSION
    };
    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: ENDPOINT_URL + '?i=' + +new Date(),
      data: payloadString,
      bids: validBidRequests
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequests) {
    var body = serverResponse.body;
    var bidResponses = [];
    bidRequests.bids.forEach(function (adUnit) {
      var bid = findBid(adUnit.params, body.bid);

      if (bid) {
        var size = adUnit.mediaTypes && adUnit.mediaTypes.banner && adUnit.mediaTypes.banner.sizes && adUnit.mediaTypes.banner.sizes.length && adUnit.mediaTypes.banner.sizes[0] || [];
        var bidResponse = {
          requestId: adUnit.bidId,
          creativeId: bid.id,
          width: size[0] || bid.width,
          height: size[1] || bid.height,
          ad: bid.adm,
          cpm: bid.price,
          netRevenue: true,
          currency: bid.currency || 'USD',
          ttl: bid.ttl || spec.time,
          format: bid.format
        };
        bidResponses.push(bidResponse);
      }
    });
    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, responses, gdprConsent) {
    var url = 'https://pre.ads.justpremium.com/v/1.0/t/sync' + '?_c=' + 'a' + Math.random().toString(36).substring(7) + Date.now();

    if (gdprConsent && typeof gdprConsent.gdprApplies === 'boolean') {
      url = url + '&consentString=' + encodeURIComponent(gdprConsent.consentString);
    }

    if (syncOptions.iframeEnabled) {
      pixels.push({
        type: 'iframe',
        url: url
      });
    }

    return pixels;
  }
};

function findBid(params, bids) {
  var tagId = params.zone;

  if (bids[tagId]) {
    var len = bids[tagId].length;

    while (len--) {
      if (passCond(params, bids[tagId][len])) {
        return bids[tagId].splice(len, 1).pop();
      }
    }
  }

  return false;
}

function passCond(params, bid) {
  var format = bid.format;

  if (params.allow && params.allow.length) {
    return params.allow.indexOf(format) > -1;
  }

  if (params.exclude && params.exclude.length) {
    return params.exclude.indexOf(format) < 0;
  }

  return true;
}

function preparePubCond(bids) {
  var cond = {};
  var count = {};
  bids.forEach(function (bid) {
    var params = bid.params;
    var zone = params.zone;

    if (cond[zone] === 1) {
      return;
    }

    var allow = params.allow || params.formats || [];
    var exclude = params.exclude || [];

    if (allow.length === 0 && exclude.length === 0) {
      return cond[params.zone] = 1;
    }

    cond[zone] = cond[zone] || [[], {}];
    cond[zone][0] = arrayUnique(cond[zone][0].concat(allow));
    exclude.forEach(function (e) {
      if (!cond[zone][1][e]) {
        cond[zone][1][e] = 1;
      } else {
        cond[zone][1][e]++;
      }
    });
    count[zone] = count[zone] || 0;

    if (exclude.length) {
      count[zone]++;
    }
  });
  Object.keys(count).forEach(function (zone) {
    if (cond[zone] === 1) return;
    var exclude = [];
    Object.keys(cond[zone][1]).forEach(function (format) {
      if (cond[zone][1][format] === count[zone]) {
        exclude.push(format);
      }
    });
    cond[zone][1] = exclude;
  });
  Object.keys(cond).forEach(function (zone) {
    if (cond[zone] !== 1 && cond[zone][1].length) {
      cond[zone][0].forEach(function (r) {
        var idx = cond[zone][1].indexOf(r);

        if (idx > -1) {
          cond[zone][1].splice(idx, 1);
        }
      });
      cond[zone][0].length = 0;
    }

    if (cond[zone] !== 1 && !cond[zone][0].length && !cond[zone][1].length) {
      cond[zone] = 1;
    }
  });
  return cond;
}

function arrayUnique(array) {
  var a = array.concat();

  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1);
      }
    }
  }

  return a;
}

function getWebsiteDim() {
  var top;

  try {
    top = window.top;
  } catch (e) {
    top = window;
  }

  return {
    screenWidth: top.screen.width,
    screenHeight: top.screen.height,
    innerWidth: top.innerWidth,
    innerHeight: top.innerHeight
  };
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[311]);