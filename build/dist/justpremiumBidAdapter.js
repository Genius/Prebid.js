pbjsChunk([34],{

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(228);
module.exports = __webpack_require__(229);


/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _bidderFactory = __webpack_require__(6);

var _utils = __webpack_require__(0);

var BIDDER_CODE = 'justpremium';
var ENDPOINT_URL = (0, _utils.getTopWindowLocation)().protocol + '//pre.ads.justpremium.com/v/2.0/t/xhr';
var pixels = [];

var spec = exports.spec = {
  code: BIDDER_CODE,
  time: 60000,

  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.zone);
  },

  buildRequests: function buildRequests(validBidRequests) {
    var c = preparePubCond(validBidRequests);
    var dim = getWebsiteDim();
    var payload = {
      zone: validBidRequests.map((function (b) {
        return parseInt(b.params.zone);
      })).filter((function (value, index, self) {
        return self.indexOf(value) === index;
      })),
      hostname: (0, _utils.getTopWindowLocation)().hostname,
      protocol: (0, _utils.getTopWindowLocation)().protocol.replace(':', ''),
      sw: dim.screenWidth,
      sh: dim.screenHeight,
      ww: dim.innerWidth,
      wh: dim.innerHeight,
      c: c,
      id: validBidRequests[0].params.zone,
      sizes: {}
    };
    validBidRequests.forEach((function (b) {
      var zone = b.params.zone;
      var sizes = payload.sizes;
      sizes[zone] = sizes[zone] || [];
      sizes[zone].push.apply(sizes[zone], b.sizes);
    }));
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
    bidRequests.bids.forEach((function (adUnit) {
      var bid = findBid(adUnit.params, body.bid);
      if (bid) {
        var size = adUnit.sizes && adUnit.sizes.length && adUnit.sizes[0] || [];
        var bidResponse = {
          requestId: adUnit.bidId,
          creativeId: bid.id,
          width: size[0] || bid.width,
          height: size[1] || bid.height,
          ad: bid.adm,
          cpm: bid.price,
          netRevenue: true,
          currency: bid.currency || 'USD',
          ttl: bid.ttl || spec.time
        };
        bidResponses.push(bidResponse);
      }
    }));

    return bidResponses;
  },

  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      pixels.push({
        type: 'iframe',
        src: '//us-u.openx.net/w/1.0/pd?plm=10&ph=26e53f82-d199-49df-9eca-7b350c0f9646'
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

  bids.forEach((function (bid) {
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
    exclude.forEach((function (e) {
      if (!cond[zone][1][e]) {
        cond[zone][1][e] = 1;
      } else {
        cond[zone][1][e]++;
      }
    }));

    count[zone] = count[zone] || 0;
    if (exclude.length) {
      count[zone]++;
    }
  }));

  Object.keys(count).forEach((function (zone) {
    if (cond[zone] === 1) return;

    var exclude = [];
    Object.keys(cond[zone][1]).forEach((function (format) {
      if (cond[zone][1][format] === count[zone]) {
        exclude.push(format);
      }
    }));
    cond[zone][1] = exclude;
  }));

  Object.keys(cond).forEach((function (zone) {
    if (cond[zone] !== 1 && cond[zone][1].length) {
      cond[zone][0].forEach((function (r) {
        var idx = cond[zone][1].indexOf(r);
        if (idx > -1) {
          cond[zone][1].splice(idx, 1);
        }
      }));
      cond[zone][0].length = 0;
    }

    if (cond[zone] !== 1 && !cond[zone][0].length && !cond[zone][1].length) {
      cond[zone] = 1;
    }
  }));

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
  var top = void 0;
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

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 229:
/***/ (function(module, exports) {



/***/ })

},[227]);