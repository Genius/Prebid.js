pbjsChunk([197],{

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(303);


/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var BIDDER_CODE = 'eplanning';
var rnd = Math.random();
var DEFAULT_SV = 'ads.us.e-planning.net';
var DEFAULT_ISV = 'i.e-planning.net';
var PARAMS = ['ci', 'sv', 't'];
var DOLLARS = 'USD';
var NET_REVENUE = true;
var TTL = 120;
var NULL_SIZE = '1x1';
var FILE = 'file';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return Boolean(bid.params.ci) || Boolean(bid.params.t);
  },
  buildRequests: function buildRequests(bidRequests) {
    var method = 'GET';
    var dfpClientId = '1';
    var sec = 'ROS';
    var url;
    var params;
    var urlConfig = getUrlConfig(bidRequests);
    var pcrs = getCharset();

    if (urlConfig.t) {
      url = urlConfig.isv + '/layers/t_pbjs_2.json';
      params = {};
    } else {
      url = '//' + (urlConfig.sv || DEFAULT_SV) + '/hb/1/' + urlConfig.ci + '/' + dfpClientId + '/' + (__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().hostname || FILE) + '/' + sec;
      var referrerUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"]();
      var spacesString = getSpacesString(bidRequests);
      params = {
        rnd: rnd,
        e: spacesString,
        ur: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]() || FILE,
        r: 'pbjs',
        pbv: "2.37.0",
        ncb: '1'
      };

      if (pcrs) {
        params.crs = pcrs;
      }

      if (referrerUrl) {
        params.fr = referrerUrl;
      }
    }

    return {
      method: method,
      url: url,
      data: params,
      adUnitToBidId: getBidIdMap(bidRequests)
    };
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var response = serverResponse.body;
    var bidResponses = [];

    if (response && !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](response.sp)) {
      response.sp.forEach(function (space) {
        if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](space.a)) {
          space.a.forEach(function (ad) {
            var bidResponse = {
              requestId: request.adUnitToBidId[space.k],
              cpm: ad.pr,
              width: ad.w,
              height: ad.h,
              ad: ad.adm,
              ttl: TTL,
              creativeId: ad.crid,
              netRevenue: NET_REVENUE,
              currency: DOLLARS
            };
            bidResponses.push(bidResponse);
          });
        }
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];
    var response = !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](serverResponses) && serverResponses[0].body;

    if (response && !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](response.cs)) {
      var responseSyncs = response.cs;
      responseSyncs.forEach(function (sync) {
        if (typeof sync === 'string' && syncOptions.pixelEnabled) {
          syncs.push({
            type: 'image',
            url: sync
          });
        } else if (_typeof(sync) === 'object' && sync.ifr && syncOptions.iframeEnabled) {
          syncs.push({
            type: 'iframe',
            url: sync.u
          });
        }
      });
    }

    return syncs;
  }
};

function cleanName(name) {
  return name.replace(/_|\.|-|\//g, '').replace(/\)\(|\(|\)|:/g, '_').replace(/^_+|_+$/g, '');
}

function getUrlConfig(bidRequests) {
  if (isTestRequest(bidRequests)) {
    return getTestConfig(bidRequests.filter(function (br) {
      return br.params.t;
    }));
  }

  var config = {};
  bidRequests.forEach(function (bid) {
    PARAMS.forEach(function (param) {
      if (bid.params[param] && !config[param]) {
        config[param] = bid.params[param];
      }
    });
  });

  if (config.sv) {
    config.sv = '//' + config.sv;
  }

  return config;
}

function isTestRequest(bidRequests) {
  var isTest = false;
  bidRequests.forEach(function (bid) {
    return isTest = bid.params.t;
  });
  return isTest;
}

function getTestConfig(bidRequests) {
  var isv;
  bidRequests.forEach(function (br) {
    return isv = isv || br.params.isv;
  });
  return {
    t: true,
    isv: '//' + (isv || DEFAULT_ISV)
  };
}

function getSpacesString(bids) {
  var spacesString = bids.map(function (bid) {
    return cleanName(bid.adUnitCode) + ':' + (bid.sizes && bid.sizes.length ? __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bid.sizes).join(',') : NULL_SIZE);
  }).join('+');
  return spacesString;
}

function getCharset() {
  try {
    return window.top.document.charset || window.top.document.characterSet;
  } catch (e) {
    return document.charset || document.characterSet;
  }
}

function getBidIdMap(bidRequests) {
  var map = {};
  bidRequests.forEach(function (bid) {
    return map[cleanName(bid.adUnitCode)] = bid.bidId;
  });
  return map;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[302]);