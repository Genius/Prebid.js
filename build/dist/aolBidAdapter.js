pbjsChunk([51],{

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(132);
module.exports = __webpack_require__(133);


/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _templateObject = _taggedTemplateLiteral(['//', '/pubapi/3.0/', '/', '/', '/', '/ADTECH;v=2;cmd=bid;cors=yes;alias=', '', '', ';misc=', ''], ['//', '/pubapi/3.0/', '/', '/', '/', '/ADTECH;v=2;cmd=bid;cors=yes;alias=', '', '', ';misc=', '']),
    _templateObject2 = _taggedTemplateLiteral(['//', '/bidRequest?'], ['//', '/bidRequest?']),
    _templateObject3 = _taggedTemplateLiteral(['dcn=', '&pos=', '&cmd=bid', ''], ['dcn=', '&pos=', '&cmd=bid', '']);

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _bidderFactory = __webpack_require__(6);

var _config = __webpack_require__(8);

var _constants = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var AOL_BIDDERS_CODES = {
  AOL: 'aol',
  ONEMOBILE: 'onemobile',
  ONEDISPLAY: 'onedisplay'
};

var AOL_ENDPOINTS = {
  DISPLAY: {
    GET: 'display-get'
  },
  MOBILE: {
    GET: 'mobile-get',
    POST: 'mobile-post'
  }
};

var SYNC_TYPES = {
  IFRAME: {
    TAG: 'iframe',
    TYPE: 'iframe'
  },
  IMAGE: {
    TAG: 'img',
    TYPE: 'image'
  }
};

var pubapiTemplate = template(_templateObject, 'host', 'network', 'placement', 'pageid', 'sizeid', 'alias', 'bidfloor', 'keyValues', 'misc');
var nexageBaseApiTemplate = template(_templateObject2, 'host');
var nexageGetApiTemplate = template(_templateObject3, 'dcn', 'pos', 'ext');
var MP_SERVER_MAP = {
  us: 'adserver-us.adtech.advertising.com',
  eu: 'adserver-eu.adtech.advertising.com',
  as: 'adserver-as.adtech.advertising.com'
};
var NEXAGE_SERVER = 'hb.nexage.com';
var ONE_DISPLAY_TTL = 60;
var ONE_MOBILE_TTL = 3600;

pbjs.aolGlobals = {
  pixelsDropped: false
};

var showCpmAdjustmentWarning = (function () {
  var showCpmWarning = true;

  return function () {
    var bidderSettings = pbjs.bidderSettings;
    if (showCpmWarning && bidderSettings && bidderSettings.aol && typeof bidderSettings.aol.bidCpmAdjustment === 'function') {
      utils.logWarn('bidCpmAdjustment is active for the AOL adapter. ' + 'As of Prebid 0.14, AOL can bid in net – please contact your accounts team to enable.');
      showCpmWarning = false; // warning is shown at most once
    }
  };
})();

function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

function template(strings) {
  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      values[_key2] = arguments[_key2];
    }

    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach((function (key, i) {
      var value = isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    }));
    return result.join('');
  };
}

function isSecureProtocol() {
  return document.location.protocol === 'https:';
}

function parsePixelItems(pixels) {
  var itemsRegExp = /(img|iframe)[\s\S]*?src\s*=\s*("|')(.*?)\2/gi;
  var tagNameRegExp = /\w*(?=\s)/;
  var srcRegExp = /src=("|')(.*?)\1/;
  var pixelsItems = [];

  if (pixels) {
    var matchedItems = pixels.match(itemsRegExp);
    if (matchedItems) {
      matchedItems.forEach((function (item) {
        var tagName = item.match(tagNameRegExp)[0];
        var url = item.match(srcRegExp)[2];

        if (tagName && tagName) {
          pixelsItems.push({
            type: tagName === SYNC_TYPES.IMAGE.TAG ? SYNC_TYPES.IMAGE.TYPE : SYNC_TYPES.IFRAME.TYPE,
            url: url
          });
        }
      }));
    }
  }

  return pixelsItems;
}

function _buildMarketplaceUrl(bid) {
  var params = bid.params;
  var serverParam = params.server;
  var regionParam = params.region || 'us';
  var server = void 0;

  if (!MP_SERVER_MAP.hasOwnProperty(regionParam)) {
    utils.logWarn('Unknown region \'' + regionParam + '\' for AOL bidder.');
    regionParam = 'us'; // Default region.
  }

  if (serverParam) {
    server = serverParam;
  } else {
    server = MP_SERVER_MAP[regionParam];
  }

  // Set region param, used by AOL analytics.
  params.region = regionParam;

  return pubapiTemplate({
    host: server,
    network: params.network,
    placement: parseInt(params.placement),
    pageid: params.pageId || 0,
    sizeid: params.sizeId || 0,
    alias: params.alias || utils.getUniqueIdentifierStr(),
    bidfloor: formatMarketplaceBidFloor(params.bidFloor),
    keyValues: formatMarketplaceKeyValues(params.keyValues),
    misc: new Date().getTime() // cache busting
  });
}

function formatMarketplaceBidFloor(bidFloor) {
  return typeof bidFloor !== 'undefined' ? ';bidfloor=' + bidFloor.toString() : '';
}

function formatMarketplaceKeyValues(keyValues) {
  var formattedKeyValues = '';

  utils._each(keyValues, (function (value, key) {
    formattedKeyValues += ';kv' + key + '=' + encodeURIComponent(value);
  }));

  return formattedKeyValues;
}

function _buildOneMobileBaseUrl(bid) {
  return nexageBaseApiTemplate({
    host: bid.params.host || NEXAGE_SERVER
  });
}

function _buildOneMobileGetUrl(bid) {
  var _bid$params = bid.params,
      dcn = _bid$params.dcn,
      pos = _bid$params.pos;

  var nexageApi = _buildOneMobileBaseUrl(bid);
  if (dcn && pos) {
    var ext = '';
    if (isSecureProtocol()) {
      bid.params.ext = bid.params.ext || {};
      bid.params.ext.secure = 1;
    }
    utils._each(bid.params.ext, (function (value, key) {
      ext += '&' + key + '=' + encodeURIComponent(value);
    }));
    nexageApi += nexageGetApiTemplate({ dcn: dcn, pos: pos, ext: ext });
  }
  return nexageApi;
}

function _isMarketplaceBidder(bidder) {
  return bidder === AOL_BIDDERS_CODES.AOL || bidder === AOL_BIDDERS_CODES.ONEDISPLAY;
}

function _isNexageBidder(bidder) {
  return bidder === AOL_BIDDERS_CODES.AOL || bidder === AOL_BIDDERS_CODES.ONEMOBILE;
}

function _isNexageRequestPost(bid) {
  if (_isNexageBidder(bid.bidder) && bid.params.id && bid.params.imp && bid.params.imp[0]) {
    var imp = bid.params.imp[0];
    return imp.id && imp.tagid && (imp.banner && imp.banner.w && imp.banner.h || imp.video && imp.video.mimes && imp.video.minduration && imp.video.maxduration);
  }
}

function _isNexageRequestGet(bid) {
  return _isNexageBidder(bid.bidder) && bid.params.dcn && bid.params.pos;
}

function isMarketplaceBid(bid) {
  return _isMarketplaceBidder(bid.bidder) && bid.params.placement && bid.params.network;
}

function isMobileBid(bid) {
  return _isNexageRequestGet(bid) || _isNexageRequestPost(bid);
}

function resolveEndpointCode(bid) {
  if (_isNexageRequestGet(bid)) {
    return AOL_ENDPOINTS.MOBILE.GET;
  } else if (_isNexageRequestPost(bid)) {
    return AOL_ENDPOINTS.MOBILE.POST;
  } else if (isMarketplaceBid(bid)) {
    return AOL_ENDPOINTS.DISPLAY.GET;
  }
}

function formatBidRequest(endpointCode, bid) {
  var bidRequest = void 0;

  switch (endpointCode) {
    case AOL_ENDPOINTS.DISPLAY.GET:
      bidRequest = {
        url: _buildMarketplaceUrl(bid),
        method: 'GET',
        ttl: ONE_DISPLAY_TTL
      };
      break;

    case AOL_ENDPOINTS.MOBILE.GET:
      bidRequest = {
        url: _buildOneMobileGetUrl(bid),
        method: 'GET',
        ttl: ONE_MOBILE_TTL
      };
      break;

    case AOL_ENDPOINTS.MOBILE.POST:
      bidRequest = {
        url: _buildOneMobileBaseUrl(bid),
        method: 'POST',
        ttl: ONE_MOBILE_TTL,
        data: bid.params,
        options: {
          contentType: 'application/json',
          customHeaders: {
            'x-openrtb-version': '2.2'
          }
        }
      };
      break;
  }

  bidRequest.bidderCode = bid.bidder;
  bidRequest.bidId = bid.bidId;
  bidRequest.userSyncOn = bid.params.userSyncOn;

  return bidRequest;
}

var spec = exports.spec = {
  code: AOL_BIDDERS_CODES.AOL,
  aliases: [AOL_BIDDERS_CODES.ONEMOBILE, AOL_BIDDERS_CODES.ONEDISPLAY],
  isBidRequestValid: function isBidRequestValid(bid) {
    return isMarketplaceBid(bid) || isMobileBid(bid);
  },
  buildRequests: function buildRequests(bids) {
    return bids.map((function (bid) {
      var endpointCode = resolveEndpointCode(bid);

      if (endpointCode) {
        return formatBidRequest(endpointCode, bid);
      }
    }));
  },
  interpretResponse: function interpretResponse(_ref, bidRequest) {
    var body = _ref.body;

    showCpmAdjustmentWarning();

    if (!body) {
      utils.logError('Empty bid response', bidRequest.bidderCode, body);
    } else {
      var _bid = this._parseBidResponse(body, bidRequest);

      if (_bid) {
        return _bid;
      }
    }
  },
  _formatPixels: function _formatPixels(pixels) {
    var formattedPixels = pixels.replace(/<\/?script( type=('|")text\/javascript('|")|)?>/g, '');

    return '<script>var w=window,prebid;' + 'for(var i=0;i<10;i++){w = w.parent;prebid=w.pbjs;' + 'if(prebid && prebid.aolGlobals && !prebid.aolGlobals.pixelsDropped){' + 'try{prebid.aolGlobals.pixelsDropped=true;' + formattedPixels + 'break;}' + 'catch(e){continue;}' + '}}</script>';
  },
  _parseBidResponse: function _parseBidResponse(response, bidRequest) {
    var bidData = void 0;

    try {
      bidData = response.seatbid[0].bid[0];
    } catch (e) {
      return;
    }

    var cpm = void 0;

    if (bidData.ext && bidData.ext.encp) {
      cpm = bidData.ext.encp;
    } else {
      cpm = bidData.price;

      if (cpm === null || isNaN(cpm)) {
        utils.logError('Invalid price in bid response', AOL_BIDDERS_CODES.AOL, bid);
        return;
      }
    }

    var ad = bidData.adm;
    if (response.ext && response.ext.pixels) {
      if (_config.config.getConfig('aol.userSyncOn') !== _constants.EVENTS.BID_RESPONSE) {
        ad += this._formatPixels(response.ext.pixels);
      }
    }

    return {
      bidderCode: bidRequest.bidderCode,
      requestId: bidRequest.bidId,
      ad: ad,
      cpm: cpm,
      width: bidData.w,
      height: bidData.h,
      creativeId: bidData.crid,
      pubapiId: response.id,
      currency: response.cur,
      dealId: bidData.dealid,
      netRevenue: true,
      ttl: bidRequest.ttl
    };
  },
  getUserSyncs: function getUserSyncs(options, bidResponses) {
    var bidResponse = bidResponses[0];

    if (_config.config.getConfig('aol.userSyncOn') === _constants.EVENTS.BID_RESPONSE) {
      if (!pbjs.aolGlobals.pixelsDropped && bidResponse.ext && bidResponse.ext.pixels) {
        pbjs.aolGlobals.pixelsDropped = true;

        return parsePixelItems(bidResponse.ext.pixels);
      }
    }

    return [];
  }
};

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 133:
/***/ (function(module, exports) {



/***/ })

},[131]);