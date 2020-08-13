pbjsChunk([225],{

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(399);


/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storage", function() { return storage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_storageManager_js__ = __webpack_require__(9);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var storage = Object(__WEBPACK_IMPORTED_MODULE_2__src_storageManager_js__["b" /* getStorageManager */])();
var BIDDER_CODE = 'eplanning';
var rnd = Math.random();
var DEFAULT_SV = 'ads.us.e-planning.net';
var DEFAULT_ISV = 'i.e-planning.net';
var PARAMS = ['ci', 'sv', 't', 'ml'];
var DOLLARS = 'USD';
var NET_REVENUE = true;
var TTL = 120;
var NULL_SIZE = '1x1';
var FILE = 'file';
var STORAGE_RENDER_PREFIX = 'pbsr_';
var STORAGE_VIEW_PREFIX = 'pbvi_';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return Boolean(bid.params.ci) || Boolean(bid.params.t);
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var method = 'GET';
    var dfpClientId = '1';
    var sec = 'ROS';
    var url;
    var params;
    var urlConfig = getUrlConfig(bidRequests);
    var pcrs = getCharset();
    var spaces = getSpaces(bidRequests, urlConfig.ml);
    var pageUrl = bidderRequest.refererInfo.referer;

    var getDomain = function getDomain(url) {
      var anchor = document.createElement('a');
      anchor.href = url;
      return anchor.hostname;
    };

    if (urlConfig.t) {
      url = 'https://' + urlConfig.isv + '/layers/t_pbjs_2.json';
      params = {};
    } else {
      url = 'https://' + (urlConfig.sv || DEFAULT_SV) + '/hb/1/' + urlConfig.ci + '/' + dfpClientId + '/' + getDomain(pageUrl) + '/' + sec;
      var referrerUrl = bidderRequest.refererInfo.referer.reachedTop ? window.top.document.referrer : bidderRequest.refererInfo.referer;

      if (storage.hasLocalStorage()) {
        registerViewabilityAllBids(bidRequests);
      }

      params = {
        rnd: rnd,
        e: spaces.str,
        ur: pageUrl || FILE,
        r: 'pbjs',
        pbv: "4.2.0",
        ncb: '1',
        vs: spaces.vs
      };

      if (pcrs) {
        params.crs = pcrs;
      }

      if (referrerUrl) {
        params.fr = referrerUrl;
      }

      if (bidderRequest && bidderRequest.gdprConsent) {
        if (typeof bidderRequest.gdprConsent.gdprApplies !== 'undefined') {
          params.gdpr = bidderRequest.gdprConsent.gdprApplies ? '1' : '0';

          if (typeof bidderRequest.gdprConsent.consentString !== 'undefined') {
            params.gdprcs = bidderRequest.gdprConsent.consentString;
          }
        }
      }

      if (bidderRequest && bidderRequest.uspConsent) {
        params.ccpa = bidderRequest.uspConsent;
      }
    }

    return {
      method: method,
      url: url,
      data: params,
      adUnitToBidId: spaces.map
    };
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var response = serverResponse.body;
    var bidResponses = [];

    if (response && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](response.sp)) {
      response.sp.forEach(function (space) {
        if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](space.a)) {
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
    var response = !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](serverResponses) && serverResponses[0].body;

    if (response && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](response.cs)) {
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
  return config;
}

function isTestRequest(bidRequests) {
  for (var i = 0; i < bidRequests.length; i++) {
    if (bidRequests[i].params.t) {
      return true;
    }
  }

  return false;
}

function getTestConfig(bidRequests) {
  var isv;
  bidRequests.forEach(function (br) {
    return isv = isv || br.params.isv;
  });
  return {
    t: true,
    isv: isv || DEFAULT_ISV
  };
}

function getSize(bid, first) {
  return bid.sizes && bid.sizes.length ? __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](first ? bid.sizes[0] : bid.sizes).join(',') : NULL_SIZE;
}

function getSpacesStruct(bids) {
  var e = {};
  bids.forEach(function (bid) {
    var size = getSize(bid, true);
    e[size] = e[size] ? e[size] : [];
    e[size].push(bid);
  });
  return e;
}

function cleanName(name) {
  return name.replace(/_|\.|-|\//g, '').replace(/\)\(|\(|\)|:/g, '_').replace(/^_+|_+$/g, '');
}

function getSpaces(bidRequests, ml) {
  var spacesStruct = getSpacesStruct(bidRequests);
  var es = {
    str: '',
    vs: '',
    map: {}
  };
  es.str = Object.keys(spacesStruct).map(function (size) {
    return spacesStruct[size].map(function (bid, i) {
      es.vs += getVs(bid);
      var name = ml ? cleanName(bid.adUnitCode) : getSize(bid, true) + '_' + i;
      es.map[name] = bid.bidId;
      return name + ':' + getSize(bid);
    }).join('+');
  }).join('+');
  return es;
}

function getVs(bid) {
  var s;
  var vs = '';

  if (storage.hasLocalStorage()) {
    s = getViewabilityData(bid);
    vs += s.render >= 4 ? s.ratio.toString(16) : 'F';
  } else {
    vs += 'F';
  }

  return vs;
}

function getViewabilityData(bid) {
  var r = storage.getDataFromLocalStorage(STORAGE_RENDER_PREFIX + bid.adUnitCode) || 0;
  var v = storage.getDataFromLocalStorage(STORAGE_VIEW_PREFIX + bid.adUnitCode) || 0;
  var ratio = r > 0 ? v / r : 0;
  return {
    render: r,
    ratio: window.parseInt(ratio * 10, 10)
  };
}

function getCharset() {
  try {
    return window.top.document.charset || window.top.document.characterSet;
  } catch (e) {
    return document.charset || document.characterSet;
  }
}

function waitForElementsPresent(elements) {
  var observer = new MutationObserver(function (mutationList, observer) {
    if (mutationList && Array.isArray(mutationList)) {
      mutationList.forEach(function (mr) {
        if (mr && mr.addedNodes && Array.isArray(mr.addedNodes)) {
          mr.addedNodes.forEach(function (ad) {
            var index = elements.indexOf(ad.id);

            if (index >= 0) {
              registerViewability(ad);
              elements.splice(index, 1);

              if (!elements.length) {
                observer.disconnect();
              }
            }
          });
        }
      });
    }
  });
  document.addEventListener('DOMContentLoaded', function (event) {
    var config = {
      childList: true,
      subtree: true,
      characterData: true
    };
    observer.observe(document.body, config);
  });
}

function registerViewability(div) {
  visibilityHandler({
    name: div.id,
    div: div
  });
}

function registerViewabilityAllBids(bids) {
  var elementsNotPresent = [];
  bids.forEach(function (bid) {
    var div = document.getElementById(bid.adUnitCode);

    if (div) {
      registerViewability(div);
    } else {
      elementsNotPresent.push(bid.adUnitCode);
    }
  });

  if (elementsNotPresent.length) {
    waitForElementsPresent(elementsNotPresent);
  }
}

function getViewabilityTracker() {
  var TIME_PARTITIONS = 5;
  var VIEWABILITY_TIME = 1000;
  var VIEWABILITY_MIN_RATIO = 0.5;
  var publicApi;
  var context;

  function segmentIsOutsideTheVisibleRange(visibleRangeEnd, p1, p2) {
    return p1 > visibleRangeEnd || p2 < 0;
  }

  function segmentBeginsBeforeTheVisibleRange(p1) {
    return p1 < 0;
  }

  function segmentEndsAfterTheVisibleRange(visibleRangeEnd, p2) {
    return p2 < visibleRangeEnd;
  }

  function axialVisibilityRatio(visibleRangeEnd, p1, p2) {
    var visibilityRatio = 0;

    if (!segmentIsOutsideTheVisibleRange(visibleRangeEnd, p1, p2)) {
      if (segmentBeginsBeforeTheVisibleRange(p1)) {
        visibilityRatio = p2 / (p2 - p1);
      } else {
        visibilityRatio = segmentEndsAfterTheVisibleRange(visibleRangeEnd, p2) ? 1 : (visibleRangeEnd - p1) / (p2 - p1);
      }
    }

    return visibilityRatio;
  }

  function isNotHiddenByNonFriendlyIframe() {
    try {
      return window === window.top || window.frameElement;
    } catch (e) {}
  }

  function defineContext(e) {
    try {
      context = e && window.document.body.contains(e) ? window : window.top.document.body.contains(e) ? top : undefined;
    } catch (err) {}

    return context;
  }

  function getContext(e) {
    return context;
  }

  function verticalVisibilityRatio(position) {
    return axialVisibilityRatio(getContext().innerHeight, position.top, position.bottom);
  }

  function horizontalVisibilityRatio(position) {
    return axialVisibilityRatio(getContext().innerWidth, position.left, position.right);
  }

  function itIsNotHiddenByBannerAreaPosition(e) {
    var position = e.getBoundingClientRect();
    return verticalVisibilityRatio(position) * horizontalVisibilityRatio(position) > VIEWABILITY_MIN_RATIO;
  }

  function itIsNotHiddenByDisplayStyleCascade(e) {
    return e.offsetHeight > 0 && e.offsetWidth > 0;
  }

  function itIsNotHiddenByOpacityStyleCascade(e) {
    var s = e.style;
    var p = e.parentNode;
    return !(s && parseFloat(s.opacity) === 0) && (!p || itIsNotHiddenByOpacityStyleCascade(p));
  }

  function itIsNotHiddenByVisibilityStyleCascade(e) {
    return getContext().getComputedStyle(e).visibility !== 'hidden';
  }

  function itIsNotHiddenByTabFocus() {
    try {
      return getContext().top.document.hasFocus();
    } catch (e) {}
  }

  function isDefined(e) {
    return e !== null && typeof e !== 'undefined';
  }

  function itIsNotHiddenByOrphanBranch() {
    return isDefined(getContext());
  }

  function isContextInAnIframe() {
    return isDefined(getContext().frameElement);
  }

  function processIntervalVisibilityStatus(elapsedVisibleIntervals, element, callback) {
    var visibleIntervals = isVisible(element) ? elapsedVisibleIntervals + 1 : 0;

    if (visibleIntervals === TIME_PARTITIONS) {
      callback();
    } else {
      setTimeout(processIntervalVisibilityStatus.bind(this, visibleIntervals, element, callback), VIEWABILITY_TIME / TIME_PARTITIONS);
    }
  }

  function isVisible(element) {
    defineContext(element);
    return isNotHiddenByNonFriendlyIframe() && itIsNotHiddenByOrphanBranch() && itIsNotHiddenByTabFocus() && itIsNotHiddenByDisplayStyleCascade(element) && itIsNotHiddenByVisibilityStyleCascade(element) && itIsNotHiddenByOpacityStyleCascade(element) && itIsNotHiddenByBannerAreaPosition(element) && (!isContextInAnIframe() || isVisible(getContext().frameElement));
  }

  publicApi = {
    isVisible: isVisible,
    onView: processIntervalVisibilityStatus.bind(this, 0)
  };
  return publicApi;
}

;

function visibilityHandler(obj) {
  if (obj.div) {
    registerAuction(STORAGE_RENDER_PREFIX + obj.name);
    getViewabilityTracker().onView(obj.div, registerAuction.bind(undefined, STORAGE_VIEW_PREFIX + obj.name));
  }
}

function registerAuction(storageID) {
  var value;

  try {
    value = storage.getDataFromLocalStorage(storageID);
    value = value ? window.parseInt(value, 10) + 1 : 1;
    storage.setDataInLocalStorage(storageID, value);
  } catch (exc) {
    return false;
  }

  return true;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[398]);