pbjsChunk([56],{

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
module.exports = __webpack_require__(86);


/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _bidderFactory = __webpack_require__(6);

var _mediaTypes = __webpack_require__(12);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var DEFAULT_ADKERNEL_DSP_DOMAIN = 'tag.adkernel.com';
var VIDEO_TARGETING = ['mimes', 'protocols', 'api'];
var DEFAULT_MIMES = ['video/mp4', 'video/webm', 'application/x-shockwave-flash', 'application/javascript'];
var DEFAULT_PROTOCOLS = [2, 3, 5, 6];
var DEFAULT_APIS = [1, 2];

function isRtbDebugEnabled() {
  return utils.getTopWindowLocation().href.indexOf('adk_debug=true') !== -1;
}

function buildImp(bidRequest) {
  var sizes = bidRequest.sizes;
  var imp = {
    id: bidRequest.bidId,
    tagid: bidRequest.placementCode
  };
  if (bidRequest.mediaType === 'video' || utils.deepAccess(bidRequest, 'mediaTypes.video')) {
    imp.video = {
      w: sizes[0],
      h: sizes[1],
      mimes: DEFAULT_MIMES,
      protocols: DEFAULT_PROTOCOLS,
      api: DEFAULT_APIS
    };
    if (bidRequest.params.video) {
      Object.keys(bidRequest.params.video).filter((function (param) {
        return VIDEO_TARGETING.includes(param);
      })).forEach((function (param) {
        return imp.video[param] = bidRequest.params.video[param];
      }));
    }
  } else {
    imp.banner = {
      format: utils.parseSizesInput(bidRequest.sizes)
    };
  }
  return imp;
}

function buildRequestParams(auctionId, transactionId, tags) {
  var loc = utils.getTopWindowLocation();
  return {
    id: auctionId,
    tid: transactionId,
    site: {
      page: loc.href,
      ref: utils.getTopWindowReferrer(),
      secure: ~~(loc.protocol === 'https:')
    },
    imp: tags
  };
}

function buildBid(tag) {
  var bid = {
    requestId: tag.impid,
    bidderCode: spec.code,
    cpm: tag.bid,
    width: tag.w,
    height: tag.h,
    creativeId: tag.crid,
    currency: 'USD',
    ttl: 720,
    netRevenue: true
  };
  if (tag.tag) {
    bid.ad = '<!DOCTYPE html><html><head><title></title><body style=\'margin:0px;padding:0px;\'>' + tag.tag + '</body></head>';
    bid.mediaType = _mediaTypes.BANNER;
  } else if (tag.vast_url) {
    bid.vastUrl = tag.vast_url;
    bid.mediaType = _mediaTypes.VIDEO;
  }
  return bid;
}

var spec = exports.spec = {

  code: 'adkernelAdn',

  supportedMediaTypes: [_mediaTypes.VIDEO],

  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return 'params' in bidRequest && (typeof bidRequest.params.host === 'undefined' || typeof bidRequest.params.host === 'string') && typeof bidRequest.params.pubId === 'number';
  },

  buildRequests: function buildRequests(bidRequests) {
    var transactionId = void 0;
    var auctionId = void 0;
    var dispatch = bidRequests.map(buildImp).reduce((function (acc, curr, index) {
      var bidRequest = bidRequests[index];
      var pubId = bidRequest.params.pubId;
      var host = bidRequest.params.host || DEFAULT_ADKERNEL_DSP_DOMAIN;
      acc[host] = acc[host] || {};
      acc[host][pubId] = acc[host][pubId] || [];
      acc[host][pubId].push(curr);
      transactionId = bidRequest.transactionId;
      auctionId = bidRequest.bidderRequestId;
      return acc;
    }), {});
    var requests = [];
    Object.keys(dispatch).forEach((function (host) {
      Object.keys(dispatch[host]).forEach((function (pubId) {
        var request = buildRequestParams(auctionId, transactionId, dispatch[host][pubId]);
        requests.push({
          method: 'POST',
          url: '//' + host + '/tag?account=' + pubId + '&pb=1' + (isRtbDebugEnabled() ? '&debug=1' : ''),
          data: JSON.stringify(request)
        });
      }));
    }));
    return requests;
  },

  interpretResponse: function interpretResponse(serverResponse) {
    var response = serverResponse.body;
    if (!response.tags) {
      return [];
    }
    if (response.debug) {
      utils.logInfo('ADKERNEL DEBUG:\n' + response.debug);
    }
    return response.tags.map(buildBid);
  },

  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (!syncOptions.iframeEnabled || !serverResponses || serverResponses.length === 0) {
      return [];
    }
    return serverResponses.filter((function (rps) {
      return 'syncpages' in rps.body;
    })).map((function (rsp) {
      return rsp.body.syncpages;
    })).reduce((function (a, b) {
      return a.concat(b);
    }), []).map((function (sync_url) {
      return {
        type: 'iframe',
        url: sync_url
      };
    }));
  }
};

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 86:
/***/ (function(module, exports) {



/***/ })

},[84]);