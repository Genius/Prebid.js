pbjsChunk([26],{

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(263);
module.exports = __webpack_require__(264);


/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _config = __webpack_require__(8);

var _bidderFactory = __webpack_require__(6);

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _userSync = __webpack_require__(19);

var _mediaTypes = __webpack_require__(12);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var SUPPORTED_AD_TYPES = [_mediaTypes.BANNER, _mediaTypes.VIDEO];
var BIDDER_CODE = 'openx';
var BIDDER_CONFIG = 'hb_pb';
var BIDDER_VERSION = '2.0.0';

var spec = exports.spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: SUPPORTED_AD_TYPES,
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid.mediaType === _mediaTypes.VIDEO) {
      if (_typeof(bid.params.video) !== 'object' || !bid.params.video.url) {
        return false;
      }
    }
    return !!(bid.params.unit && bid.params.delDomain);
  },
  buildRequests: function buildRequests(bids) {
    var isIfr = utils.inIframe();
    var currentURL = window.parent !== window ? document.referrer : window.location.href;
    if (bids.length === 0) {
      return;
    }

    var requests = [];
    var bannerRequests = [];
    var videoRequests = [];
    var bannerBids = [];
    var videoBids = [];
    bids.forEach((function (bid) {
      if (bid.mediaType === _mediaTypes.VIDEO) {
        videoBids.push(bid);
      } else {
        bannerBids.push(bid);
      }
    }));

    // build banner requests
    if (bannerBids.length !== 0) {
      var delDomain = bannerBids[0].params.delDomain;
      var configuredBc = bannerBids[0].params.bc;
      var bc = configuredBc || BIDDER_CONFIG + '_' + BIDDER_VERSION;
      bannerRequests = [buildOXRequest(bannerBids, {
        ju: currentURL,
        jr: currentURL,
        ch: document.charSet || document.characterSet,
        res: screen.width + 'x' + screen.height + 'x' + screen.colorDepth,
        ifr: isIfr,
        tz: new Date().getTimezoneOffset(),
        tws: getViewportDimensions(isIfr),
        ef: 'bt%2Cdb',
        be: 1,
        bc: bc,
        nocache: new Date().getTime()
      }, delDomain)];
    }
    // build video requests
    if (videoBids.length !== 0) {
      videoRequests = buildOXVideoRequest(videoBids);
    }

    requests = bannerRequests.concat(videoRequests);
    return requests;
  },
  interpretResponse: function interpretResponse(_ref, bidRequest) {
    var oxResponseObj = _ref.body;

    var bidResponses = [];
    var mediaType = _mediaTypes.BANNER;
    if (bidRequest && bidRequest.payload) {
      if (bidRequest.payload.bids) {
        mediaType = bidRequest.payload.bids[0].mediaType;
      } else if (bidRequest.payload.bid) {
        mediaType = bidRequest.payload.bid.mediaType;
      }
    }

    if (mediaType === _mediaTypes.VIDEO) {
      if (oxResponseObj && oxResponseObj.pixels) {
        _userSync.userSync.registerSync('iframe', 'openx', oxResponseObj.pixels);
      }
      bidResponses = createVideoBidResponses(oxResponseObj, bidRequest.payload);
      return bidResponses;
    }

    var adUnits = oxResponseObj.ads.ad;
    if (oxResponseObj.ads && oxResponseObj.ads.pixels) {
      _userSync.userSync.registerSync('iframe', BIDDER_CODE, oxResponseObj.ads.pixels);
    }
    if (!adUnits) {
      adUnits = [];
    }
    bidResponses = createBidResponses(adUnits, bidRequest.payload);
    return bidResponses;
  }
};

function createBidResponses(adUnits, _ref2) {
  var bids = _ref2.bids,
      startTime = _ref2.startTime;

  var bidResponses = [];
  var shouldSendBoPixel = bids[0].params.sendBoPixel;
  if (shouldSendBoPixel === undefined) {
    // Not specified, default to turned on
    shouldSendBoPixel = true;
  }
  for (var i = 0; i < adUnits.length; i++) {
    var adUnit = adUnits[i];
    var bidResponse = {};
    if (adUnits.length == bids.length) {
      // request and response length match, directly assign the request id based on positioning
      bidResponse.requestId = bids[i].bidId;
    } else {
      for (var j = i; j < bids.length; j++) {
        var bid = bids[j];
        if (String(bid.params.unit) === String(adUnit.adunitid) && adUnitHasValidSizeFromBid(adUnit, bid) && !bid.matched) {
          // ad unit and size match, this is the correct bid response to bid
          bidResponse.requestId = bid.bidId;
          bid.matched = true;
          break;
        }
      }
    }

    if (adUnit.pub_rev) {
      bidResponse.cpm = Number(adUnit.pub_rev) / 1000;
    } else {
      // No fill, do not add the bidresponse
      continue;
    }
    var creative = adUnit.creative[0];
    if (creative) {
      bidResponse.width = creative.width;
      bidResponse.height = creative.height;
    }
    bidResponse.creativeId = creative.id;
    bidResponse.ad = adUnit.html;
    if (adUnit.deal_id) {
      bidResponse.dealId = adUnit.deal_id;
    }
    // default 5 mins
    bidResponse.ttl = 300;
    // true is net, false is gross
    bidResponse.netRevenue = true;
    bidResponse.currency = adUnit.currency;

    // additional fields to add
    if (adUnit.tbd) {
      bidResponse.tbd = adUnit.tbd;
    }
    bidResponse.ts = adUnit.ts;

    var bt = _config.config.getConfig('bidderTimeout');
    if (window.PREBID_TIMEOUT) {
      bt = Math.min(window.PREBID_TIMEOUT, bt);
    }
    var beaconParams = {
      bd: +new Date() - startTime,
      br: '0', // may be 0, t, or p
      bt: bt,
      bs: window.location.hostname
    };

    beaconParams.br = beaconParams.bt < beaconParams.bd ? 't' : 'p';
    beaconParams.bp = adUnit.pub_rev;
    beaconParams.ts = adUnit.ts;
    var boUrl = void 0;
    if (shouldSendBoPixel) {
      boUrl = getBoUrl(adUnit.creative[0], beaconParams);
    }
    if (boUrl) {
      _userSync.userSync.registerSync('image', BIDDER_CODE, boUrl);
    }
    bidResponses.push(bidResponse);
  }
  return bidResponses;
}

function getBoUrl(creative, params) {
  var recordPixel = creative.tracking.impression;
  var boBase = recordPixel.match(/([^?]+\/)ri\?/);

  if (boBase) {
    return boBase[1] + 'bo?' + buildQueryStringFromParams(params);
  }
}

function buildQueryStringFromParams(params) {
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      if (!params[key]) {
        delete params[key];
      }
    }
  }
  return utils._map(Object.keys(params), (function (key) {
    return key + '=' + params[key];
  })).join('&');
}

function adUnitHasValidSizeFromBid(adUnit, bid) {
  var sizes = utils.parseSizesInput(bid.sizes);
  if (!sizes) {
    return false;
  }
  var found = false;
  var creative = adUnit.creative && adUnit.creative[0];
  var creative_size = String(creative.width) + 'x' + String(creative.height);

  if (utils.isArray(sizes)) {
    for (var i = 0; i < sizes.length; i++) {
      var size = sizes[i];
      if (String(size) === String(creative_size)) {
        found = true;
        break;
      }
    }
  }
  return found;
}

function getViewportDimensions(isIfr) {
  var width = void 0;
  var height = void 0;
  var tWin = window;
  var tDoc = document;
  var docEl = tDoc.documentElement;
  var body = void 0;

  if (isIfr) {
    try {
      tWin = window.top;
      tDoc = window.top.document;
    } catch (e) {
      return;
    }
    docEl = tDoc.documentElement;
    body = tDoc.body;

    width = tWin.innerWidth || docEl.clientWidth || body.clientWidth;
    height = tWin.innerHeight || docEl.clientHeight || body.clientHeight;
  } else {
    docEl = tDoc.documentElement;
    width = tWin.innerWidth || docEl.clientWidth;
    height = tWin.innerHeight || docEl.clientHeight;
  }

  return width + 'x' + height;
}

function formatCustomParms(customKey, customParams) {
  var value = customParams[customKey];
  if (utils.isArray(value)) {
    // if value is an array, join them with commas first
    value = value.join(',');
  }
  // return customKey=customValue format, escaping + to . and / to _
  return (customKey.toLowerCase() + '=' + value.toLowerCase()).replace('+', '.').replace('/', '_');
}

function buildOXRequest(bids, oxParams, delDomain) {
  if (!utils.isArray(bids)) {
    return;
  }

  oxParams.auid = utils._map(bids, (function (bid) {
    return bid.params.unit;
  })).join(',');
  oxParams.dddid = utils._map(bids, (function (bid) {
    return bid.transactionId;
  })).join(',');
  oxParams.aus = utils._map(bids, (function (bid) {
    return utils.parseSizesInput(bid.sizes).join(',');
  })).join('|');

  var customParamsForAllBids = [];
  var hasCustomParam = false;
  bids.forEach((function (bid) {
    if (bid.params.customParams) {
      var customParamsForBid = utils._map(Object.keys(bid.params.customParams), (function (customKey) {
        return formatCustomParms(customKey, bid.params.customParams);
      }));
      var formattedCustomParams = window.btoa(customParamsForBid.join('&'));
      hasCustomParam = true;
      customParamsForAllBids.push(formattedCustomParams);
    } else {
      customParamsForAllBids.push('');
    }
  }));
  if (hasCustomParam) {
    oxParams.tps = customParamsForAllBids.join(',');
  }

  var customFloorsForAllBids = [];
  var hasCustomFloor = false;
  bids.forEach((function (bid) {
    if (bid.params.customFloor) {
      customFloorsForAllBids.push(bid.params.customFloor * 1000);
      hasCustomFloor = true;
    } else {
      customFloorsForAllBids.push(0);
    }
  }));
  if (hasCustomFloor) {
    oxParams.aumfs = customFloorsForAllBids.join(',');
  }

  var url = '//' + delDomain + '/w/1.0/arj';
  return {
    method: 'GET',
    url: url,
    data: oxParams,
    payload: { 'bids': bids, 'startTime': new Date() }
  };
}

function buildOXVideoRequest(bids) {
  return bids.map((function (bid) {
    var url = 'http://' + bid.params.delDomain + '/v/1.0/avjp';
    var oxVideoParams = generateVideoParameters(bid);
    return {
      method: 'GET',
      url: url,
      data: oxVideoParams,
      payload: { 'bid': bid, 'startTime': new Date() }
    };
  }));
}

function generateVideoParameters(bid) {
  var oxVideo = bid.params.video;
  var oxVideoParams = { auid: bid.params.unit };

  Object.keys(oxVideo).forEach((function (key) {
    if (key === 'openrtb') {
      oxVideoParams[key] = JSON.stringify(oxVideo[key]);
    } else {
      oxVideoParams[key] = oxVideo[key];
    }
  }));
  oxVideoParams['be'] = 'true';
  return oxVideoParams;
}

function createVideoBidResponses(response, _ref3) {
  var bid = _ref3.bid,
      startTime = _ref3.startTime;

  var bidResponses = [];

  if (response !== undefined && response.vastUrl !== '' && response.pub_rev !== '') {
    var bidResponse = {};
    bidResponse.requestId = bid.bidId;
    bidResponse.bidderCode = BIDDER_CODE;
    // default 5 mins
    bidResponse.ttl = 300;
    // true is net, false is gross
    bidResponse.netRevenue = true;
    bidResponse.currency = response.currency;
    bidResponse.cpm = Number(response.pub_rev) / 1000;
    bidResponse.width = response.width;
    bidResponse.height = response.height;
    bidResponse.creativeId = response.adid;
    bidResponse.vastUrl = response.vastUrl;
    bidResponse.mediaType = _mediaTypes.VIDEO;

    bidResponses.push(bidResponse);
  }

  return bidResponses;
}

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 264:
/***/ (function(module, exports) {



/***/ })

},[262]);