pbjsChunk([133],{

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(301);


/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["resetInvibes"] = resetInvibes;
/* harmony export (immutable) */ __webpack_exports__["stubDomainOptions"] = stubDomainOptions;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var CONSTANTS = {
  BIDDER_CODE: 'invibes',
  BID_ENDPOINT: 'https://bid.videostep.com/Bid/VideoAdContent',
  SYNC_ENDPOINT: 'https://k.r66net.com/GetUserSync',
  TIME_TO_LIVE: 300,
  DEFAULT_CURRENCY: 'EUR',
  PREBID_VERSION: 2,
  METHOD: 'GET',
  INVIBES_VENDOR_ID: 436
};
var spec = {
  code: CONSTANTS.BIDDER_CODE,

  /**
   * @param {object} bid
   * @return boolean
   */
  isBidRequestValid: isBidRequestValid,

  /**
   * @param {BidRequest[]} bidRequests
   * @param bidderRequest
   * @return ServerRequest[]
   */
  buildRequests: buildRequest,

  /**
   * @param {*} responseObj
   * @param {requestParams} bidRequests
   * @return {Bid[]} An array of bids which
   */
  interpretResponse: function interpretResponse(responseObj, requestParams) {
    return handleResponse(responseObj, requestParams != null ? requestParams.bidRequests : null);
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      handlePostMessage();
      var syncUrl = buildSyncUrl();
      return {
        type: 'iframe',
        url: syncUrl
      };
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec); // some state info is required: cookie info, unique user visit id

var topWin = getTopMostWindow();
var invibes = topWin.invibes = topWin.invibes || {};

var _customUserSync;

function isBidRequestValid(bid) {
  if (invibes && _typeof(invibes.bidResponse) === 'object') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Invibes Adapter - Bid response already received. Invibes only responds to one bid request per user visit');
    return false;
  }

  if (_typeof(bid.params) !== 'object') {
    return false;
  }

  var params = bid.params;

  if (params.placementId == null) {
    return false;
  }

  return true;
}

function buildRequest(bidRequests, bidderRequest) {
  bidderRequest = bidderRequest || {};
  var _placementIds = [];

  var _loginId, _customEndpoint;

  var _ivAuctionStart = bidderRequest.auctionStart || Date.now();

  bidRequests.forEach(function (bidRequest) {
    bidRequest.startTime = new Date().getTime();

    _placementIds.push(bidRequest.params.placementId);

    _loginId = _loginId || bidRequest.params.loginId;
    _customEndpoint = _customEndpoint || bidRequest.params.customEndpoint;
    _customUserSync = _customUserSync || bidRequest.params.customUserSync;
  });
  invibes.visitId = invibes.visitId || generateRandomId();
  cookieDomain = detectTopmostCookieDomain();
  invibes.noCookies = invibes.noCookies || invibes.getCookie('ivNoCookie');
  invibes.optIn = invibes.optIn || invibes.getCookie('ivOptIn') || readGdprConsent(bidderRequest.gdprConsent);
  initDomainId(invibes.domainOptions);
  var currentQueryStringParams = parseQueryStringParams();
  var data = {
    location: getDocumentLocation(topWin),
    videoAdHtmlId: generateRandomId(),
    showFallback: currentQueryStringParams['advs'] === '0',
    ivbsCampIdsLocal: invibes.getCookie('IvbsCampIdsLocal'),
    bidParamsJson: JSON.stringify({
      placementIds: _placementIds,
      loginId: _loginId,
      auctionStartTime: _ivAuctionStart,
      bidVersion: CONSTANTS.PREBID_VERSION
    }),
    capCounts: getCappedCampaignsAsString(),
    vId: invibes.visitId,
    width: topWin.innerWidth,
    height: topWin.innerHeight,
    noc: !cookieDomain,
    oi: invibes.optIn,
    kw: keywords
  };

  if (invibes.dom.id) {
    data.lId = invibes.dom.id;
  }

  var parametersToPassForward = 'videoaddebug,advs,bvci,bvid,istop,trybvid,trybvci'.split(',');

  for (var key in currentQueryStringParams) {
    if (currentQueryStringParams.hasOwnProperty(key)) {
      var value = currentQueryStringParams[key];

      if (parametersToPassForward.indexOf(key) > -1 || /^vs|^invib/i.test(key)) {
        data[key] = value;
      }
    }
  }

  return {
    method: CONSTANTS.METHOD,
    url: _customEndpoint || CONSTANTS.BID_ENDPOINT,
    data: data,
    options: {
      withCredentials: true
    },
    // for POST: { contentType: 'application/json', withCredentials: true }
    bidRequests: bidRequests
  };
}

function handleResponse(responseObj, bidRequests) {
  if (bidRequests == null || bidRequests.length === 0) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Invibes Adapter - No bids have been requested');
    return [];
  }

  if (!responseObj) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Invibes Adapter - Bid response is empty');
    return [];
  }

  responseObj = responseObj.body || responseObj;
  responseObj = responseObj.videoAdContentResult || responseObj;
  var bidModel = responseObj.BidModel;

  if (_typeof(bidModel) !== 'object') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Invibes Adapter - Bidding is not configured');
    return [];
  }

  if (_typeof(invibes.bidResponse) === 'object') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Invibes Adapter - Bid response already received. Invibes only responds to one bid request per user visit');
    return [];
  }

  invibes.bidResponse = responseObj;
  var ads = responseObj.Ads;

  if (!Array.isArray(ads) || ads.length < 1) {
    if (responseObj.AdReason != null) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Invibes Adapter - ' + responseObj.AdReason);
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Invibes Adapter - No ads available');
    return [];
  }

  var ad = ads[0];

  if (bidModel.PlacementId == null) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Invibes Adapter - No Placement Id in response');
    return [];
  }

  var bidResponses = [];

  for (var i = 0; i < bidRequests.length; i++) {
    var bidRequest = bidRequests[i];

    if (bidModel.PlacementId == bidRequest.params.placementId) {
      var size = getBiggerSize(bidRequest.sizes);
      bidResponses.push({
        requestId: bidRequest.bidId,
        cpm: ad.BidPrice,
        width: bidModel.Width || size[0],
        height: bidModel.Height || size[1],
        creativeId: ad.VideoExposedId,
        currency: bidModel.Currency || CONSTANTS.DEFAULT_CURRENCY,
        netRevenue: true,
        ttl: CONSTANTS.TIME_TO_LIVE,
        ad: renderCreative(bidModel)
      });
      var now = Date.now();
      ivLogger.info('Bid auction started at ' + bidModel.AuctionStartTime + ' . Invibes registered the bid at ' + now + ' ; bid request took a total of ' + (now - bidModel.AuctionStartTime) + ' ms.');
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Invibes Adapter - Incorrect Placement Id: ' + bidRequest.params.placementId);
    }
  }

  return bidResponses;
}

function generateRandomId() {
  return Math.round(Math.random() * 1e12).toString(36).substring(0, 10);
}

function getDocumentLocation(topWin) {
  return topWin.location.href.substring(0, 300).split(/[?#]/)[0];
}

function parseQueryStringParams() {
  var params = {};

  try {
    params = JSON.parse(localStorage.ivbs);
  } catch (e) {}

  var re = /[\\?&]([^=]+)=([^\\?&#]+)/g;
  var m;

  while ((m = re.exec(window.location.href)) != null) {
    if (m.index === re.lastIndex) {
      re.lastIndex++;
    }

    params[m[1].toLowerCase()] = m[2];
  }

  return params;
}

function getBiggerSize(array) {
  var result = [0, 0];

  for (var i = 0; i < array.length; i++) {
    if (array[i][0] * array[i][1] > result[0] * result[1]) {
      result = array[i];
    }
  }

  return result;
}

function getTopMostWindow() {
  var res = window;

  try {
    while (top !== res) {
      if (res.parent.location.href.length) {
        res = res.parent;
      }
    }
  } catch (e) {}

  return res;
}

function renderCreative(bidModel) {
  return "<html>\n        <head><script type='text/javascript'>inDapIF=true;</script></head>\n          <body style='margin : 0; padding: 0;'>\n          creativeHtml\n          </body>\n        </html>".replace('creativeHtml', bidModel.CreativeHtml);
}

function getCappedCampaignsAsString() {
  var key = 'ivvcap';

  var loadData = function loadData() {
    try {
      return JSON.parse(localStorage.getItem(key)) || {};
    } catch (e) {
      return {};
    }
  };

  var saveData = function saveData(data) {
    localStorage.setItem(key, JSON.stringify(data));
  };

  var clearExpired = function clearExpired() {
    var now = new Date().getTime();
    var data = loadData();
    var dirty = false;
    Object.keys(data).forEach(function (k) {
      var exp = data[k][1];

      if (exp <= now) {
        delete data[k];
        dirty = true;
      }
    });

    if (dirty) {
      saveData(data);
    }
  };

  var getCappedCampaigns = function getCappedCampaigns() {
    clearExpired();
    var data = loadData();
    return Object.keys(data).filter(function (k) {
      return data.hasOwnProperty(k);
    }).sort().map(function (k) {
      return [k, data[k][0]];
    });
  };

  return getCappedCampaigns().map(function (record) {
    return record.join('=');
  }).join(',');
}

var noop = function noop() {};

function initLogger() {
  if (localStorage && localStorage.InvibesDEBUG) {
    return window.console;
  }

  return {
    info: noop,
    error: noop,
    log: noop,
    warn: noop,
    debug: noop
  };
}

function buildSyncUrl() {
  var syncUrl = _customUserSync || CONSTANTS.SYNC_ENDPOINT;
  syncUrl += '?visitId=' + invibes.visitId;
  syncUrl += '&optIn=' + invibes.optIn;
  var did = invibes.getCookie('ivbsdid');

  if (did) {
    syncUrl += '&ivbsdid=' + encodeURIComponent(did);
  }

  var bks = invibes.getCookie('ivvbks');

  if (bks) {
    syncUrl += '&ivvbks=' + encodeURIComponent(bks);
  }

  return syncUrl;
}

function handlePostMessage() {
  try {
    if (window.addEventListener) {
      window.addEventListener('message', acceptPostMessage);
    }
  } catch (e) {}
}

function acceptPostMessage(e) {
  var msg = e.data || {};

  if (msg.ivbscd === 1) {
    invibes.setCookie(msg.name, msg.value, msg.exdays, msg.domain);
  } else if (msg.ivbscd === 2) {
    invibes.dom.graduate();
  }
}

function readGdprConsent(gdprConsent) {
  if (gdprConsent && gdprConsent.vendorData && gdprConsent.vendorData.vendorConsents) {
    return !!gdprConsent.vendorData.vendorConsents[CONSTANTS.INVIBES_VENDOR_ID.toString(10)] === true ? 2 : -2;
  }

  return 0;
}

var ivLogger = initLogger(); /// Local domain cookie management =====================

invibes.Uid = {
  generate: function generate() {
    var maxRand = parseInt('zzzzzz', 36);

    var mkRand = function mkRand() {
      return Math.floor(Math.random() * maxRand).toString(36);
    };

    var rand1 = mkRand();
    var rand2 = mkRand();
    return rand1 + rand2;
  }
};
var cookieDomain;

invibes.getCookie = function (name) {
  var i, x, y;
  var cookies = document.cookie.split(';');

  for (i = 0; i < cookies.length; i++) {
    x = cookies[i].substr(0, cookies[i].indexOf('='));
    y = cookies[i].substr(cookies[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, '');

    if (x === name) {
      return unescape(y);
    }
  }
};

invibes.setCookie = function (name, value, exdays, domain) {
  var whiteListed = name == 'ivNoCookie' || name == 'IvbsCampIdsLocal';

  if (invibes.noCookies && !whiteListed && (exdays || 0) >= 0) {
    return;
  }

  if (exdays > 365) {
    exdays = 365;
  }

  domain = domain || cookieDomain;
  var exdate = new Date();
  var exms = exdays * 24 * 60 * 60 * 1000;
  exdate.setTime(exdate.getTime() + exms);
  var cookieValue = value + (!exdays ? '' : '; expires=' + exdate.toUTCString());
  cookieValue += ';domain=' + domain + ';path=/';
  document.cookie = name + '=' + cookieValue;
};

var detectTopmostCookieDomain = function detectTopmostCookieDomain() {
  var testCookie = invibes.Uid.generate();
  var hostParts = location.hostname.split('.');

  if (hostParts.length === 1) {
    return location.hostname;
  }

  for (var i = hostParts.length - 1; i >= 0; i--) {
    var domain = '.' + hostParts.slice(i).join('.');
    invibes.setCookie(testCookie, testCookie, 1, domain);
    var val = invibes.getCookie(testCookie);

    if (val === testCookie) {
      invibes.setCookie(testCookie, testCookie, -1, domain);
      return domain;
    }
  }
};

var initDomainId = function initDomainId(options) {
  if (invibes.dom) {
    return;
  }

  options = options || {};
  var cookiePersistence = {
    cname: 'ivbsdid',
    load: function load() {
      var str = invibes.getCookie(this.cname) || '';

      try {
        return JSON.parse(str);
      } catch (e) {}
    },
    save: function save(obj) {
      invibes.setCookie(this.cname, JSON.stringify(obj), 365);
    }
  };
  var persistence = options.persistence || cookiePersistence;
  var state;
  var minHC = 2;

  var validGradTime = function validGradTime(state) {
    if (!state.cr) {
      return false;
    }

    var min = 151 * 10e9;

    if (state.cr < min) {
      return false;
    }

    var now = new Date().getTime();
    var age = now - state.cr;
    var minAge = 24 * 60 * 60 * 1000;
    return age > minAge;
  };

  state = persistence.load() || {
    id: invibes.Uid.generate(),
    cr: new Date().getTime(),
    hc: 1
  };

  if (state.id.match(/\./)) {
    state.id = invibes.Uid.generate();
  }

  var graduate = function graduate() {
    if (!state.cr) {
      return;
    }

    delete state.cr;
    delete state.hc;
    persistence.save(state);
    setId();
  };

  var regenerateId = function regenerateId() {
    state.id = invibes.Uid.generate();
    persistence.save(state);
  };

  var setId = function setId() {
    invibes.dom = {
      get id() {
        return !state.cr && invibes.optIn > 0 ? state.id : undefined;
      },

      get tempId() {
        return invibes.optIn > 0 ? state.id : undefined;
      },

      graduate: graduate,
      regen: regenerateId
    };
  };

  if (state.cr && !options.noVisit) {
    if (state.hc < minHC) {
      state.hc++;
    }

    if (state.hc >= minHC && validGradTime(state) || options.skipGraduation) {
      graduate();
    }
  }

  persistence.save(state);
  setId();
  ivLogger.info('Did=' + invibes.dom.id);
};

var keywords = function () {
  var cap = 300;
  var headTag = document.getElementsByTagName('head')[0];
  var metaTag = headTag ? headTag.getElementsByTagName('meta') : [];

  function parse(str, cap) {
    var parsedStr = str.replace(/[<>~|\\"`!@#$%^&*()=+?]/g, '');

    function onlyUnique(value, index, self) {
      return value !== '' && self.indexOf(value) === index;
    }

    var words = parsedStr.split(/[\s,;.:]+/);
    var uniqueWords = words.filter(onlyUnique);
    parsedStr = '';

    for (var i = 0; i < uniqueWords.length; i++) {
      parsedStr += uniqueWords[i];

      if (parsedStr.length >= cap) {
        return parsedStr;
      }

      if (i < uniqueWords.length - 1) {
        parsedStr += ',';
      }
    }

    return parsedStr;
  }

  function gt(cap, prefix) {
    cap = cap || 300;
    prefix = prefix || '';
    var title = document.title || headTag ? headTag.getElementsByTagName('title')[0] ? headTag.getElementsByTagName('title')[0].innerHTML : '' : '';
    return parse(prefix + ',' + title, cap);
  }

  function gmeta(metaName, cap, prefix) {
    metaName = metaName || 'keywords';
    cap = cap || 100;
    prefix = prefix || '';
    var fallbackKw = prefix;

    for (var i = 0; i < metaTag.length; i++) {
      if (metaTag[i].name && metaTag[i].name.toLowerCase() === metaName.toLowerCase()) {
        var _kw = prefix + ',' + metaTag[i].content || '';

        return parse(_kw, cap);
      } else if (metaTag[i].name && metaTag[i].name.toLowerCase().indexOf(metaName.toLowerCase()) > -1) {
        fallbackKw = prefix + ',' + metaTag[i].content || '';
      }
    }

    return parse(fallbackKw, cap);
  }

  var kw = gmeta('keywords', cap);

  if (!kw || kw.length < cap - 8) {
    kw = gmeta('description', cap, kw);

    if (!kw || kw.length < cap - 8) {
      kw = gt(cap, kw);
    }
  }

  return kw;
}(); // =====================


function resetInvibes() {
  invibes.optIn = undefined;
  invibes.noCookies = undefined;
  invibes.dom = undefined;
  invibes.bidResponse = undefined;
  invibes.domainOptions = undefined;
}
function stubDomainOptions(persistence) {
  invibes.domainOptions = {
    persistence: persistence
  };
}

/***/ })

},[300]);