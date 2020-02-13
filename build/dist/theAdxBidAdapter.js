pbjsChunk([72],{

/***/ 606:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(607);


/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_url__ = __webpack_require__(9);




var BIDDER_CODE = 'theadx';
var ENDPOINT_URL = '//ssp.theadx.com/request';
var NATIVEASSETNAMES = {
  0: 'title',
  1: 'cta',
  2: 'icon',
  3: 'image',
  4: 'body',
  5: 'sponsoredBy',
  6: 'body2',
  7: 'phone',
  8: 'privacyLink',
  9: 'displayurl',
  10: 'rating',
  11: 'address',
  12: 'downloads',
  13: 'likes',
  14: 'price',
  15: 'saleprice'
};
var NATIVEPROBS = {
  title: {
    id: 0,
    name: 'title'
  },
  body: {
    id: 4,
    name: 'data',
    type: 2
  },
  body2: {
    id: 6,
    name: 'data',
    type: 10
  },
  privacyLink: {
    id: 8,
    name: 'data',
    type: 501
  },
  sponsoredBy: {
    id: 5,
    name: 'data',
    type: 1
  },
  image: {
    id: 3,
    type: 3,
    name: 'img'
  },
  icon: {
    id: 2,
    type: 1,
    name: 'img'
  },
  displayurl: {
    id: 9,
    name: 'data',
    type: 11
  },
  cta: {
    id: 1,
    type: 12,
    name: 'data'
  },
  rating: {
    id: 7,
    name: 'data',
    type: 3
  },
  address: {
    id: 11,
    name: 'data',
    type: 5
  },
  downloads: {
    id: 12,
    name: 'data',
    type: 5
  },
  likes: {
    id: 13,
    name: 'data',
    type: 4
  },
  phone: {
    id: 7,
    name: 'data',
    type: 8
  },
  price: {
    id: 14,
    name: 'data',
    type: 6
  },
  saleprice: {
    id: 15,
    name: 'data',
    type: 7
  }
};
var spec = {
  code: BIDDER_CODE,
  aliases: ['theadx'],
  // short code
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('theadx.isBidRequestValid', bid);
    var res = false;

    if (bid && bid.params) {
      res = !!(bid.params.pid && bid.params.tagId);
    }

    return res;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('theadx.buildRequests', 'validBidRequests', validBidRequests, 'bidderRequest', bidderRequest);
    var results = [];
    var requestType = 'POST';

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](validBidRequests)) {
      results = validBidRequests.map(function (bidRequest) {
        return {
          method: requestType,
          type: requestType,
          url: "".concat(ENDPOINT_URL, "?tagid=").concat(bidRequest.params.tagId),
          options: {
            withCredentials: true
          },
          bidder: 'theadx',
          referrer: encodeURIComponent(bidderRequest.refererInfo.referer),
          data: generatePayload(bidRequest, bidderRequest),
          mediaTypes: bidRequest['mediaTypes'],
          requestId: bidderRequest.bidderRequestId,
          bidId: bidRequest.bidId,
          adUnitCode: bidRequest['adUnitCode'],
          auctionId: bidRequest['auctionId']
        };
      });
    }

    return results;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, request) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('theadx.interpretResponse', 'serverResponse', serverResponse, ' request', request);
    var responses = [];

    if (serverResponse.body) {
      var responseBody = serverResponse.body;
      var seatBids = responseBody.seatbid;

      if (!(__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](seatBids) || __WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](seatBids[0].bid))) {
        var seatBid = seatBids[0];
        var bid = seatBid.bid[0]; // handle any values that may end up undefined

        var nullify = function nullify(value) {
          return typeof value === 'undefined' ? null : parseInt(value);
        };

        var ttl = null;

        if (bid.ext) {
          ttl = nullify(bid.ext.ttl) ? nullify(bid.ext.ttl) : 2000;
        }

        var bidWidth = nullify(bid.w);
        var bidHeight = nullify(bid.h);
        var creative = null;
        var videoXml = null;
        var mediaType = null;
        var native = null;

        if (request.mediaTypes && request.mediaTypes.video) {
          videoXml = bid.ext.vast_url;
          mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */];
        } else if (request.mediaTypes && request.mediaTypes.banner) {
          mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */];
          creative = bid.adm;
        } else if (request.mediaTypes && request.mediaTypes.native) {
          mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["c" /* NATIVE */];
          var _bid$ext$native = bid.ext.native,
              assets = _bid$ext$native.assets,
              link = _bid$ext$native.link,
              imptrackers = _bid$ext$native.imptrackers,
              jstracker = _bid$ext$native.jstracker;
          native = {
            clickUrl: link.url,
            clickTrackers: link.clicktrackers || bid.ext.cliu ? [] : undefined,
            impressionTrackers: imptrackers || bid.nurl ? [] : undefined,
            javascriptTrackers: jstracker ? [jstracker] : undefined
          };

          if (bid.nurl) {
            native.impressionTrackers.unshift(bid.ext.impu);
            native.impressionTrackers.unshift(bid.nurl);

            if (native.clickTrackers) {
              native.clickTrackers.unshift(bid.ext.cliu);
            }
          }

          assets.forEach(function (asset) {
            var kind = NATIVEASSETNAMES[asset.id];
            var content = kind && asset[NATIVEPROBS[kind].name];

            if (content) {
              native[kind] = content.text || content.value || {
                url: content.url,
                width: content.w,
                height: content.h
              };
            }
          });
        }

        var response = {
          bidderCode: BIDDER_CODE,
          requestId: request.bidId,
          cpm: bid.price,
          width: bidWidth | 0,
          height: bidHeight | 0,
          ad: creative,
          ttl: ttl || 3000,
          creativeId: bid.crid,
          netRevenue: true,
          currency: responseBody.cur,
          mediaType: mediaType,
          native: native
        };

        if (mediaType == __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */] && videoXml) {
          response.vastUrl = videoXml;
          response.videoCacheKey = bid.ext.rid;
        }

        responses.push(response);
      }
    }

    return responses;
  },

  /**
   * Register the user sync pixels which should be dropped after the auction.
   *
   * @param {SyncOptions} syncOptions Which user syncs are allowed?
   * @param {ServerResponse[]} serverResponses List of server's responses.
   * @return {UserSync[]} The user syncs which should be dropped.
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('theadx.getUserSyncs', 'syncOptions', syncOptions, 'serverResponses', serverResponses);
    var syncs = [];

    if (!syncOptions.iframeEnabled && !syncOptions.pixelEnabled) {
      return syncs;
    }

    serverResponses.forEach(function (resp) {
      var syncIframeUrls = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](resp, 'body.ext.sync.iframe');
      var syncImageUrls = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](resp, 'body.ext.sync.image');

      if (syncOptions.iframeEnabled && syncIframeUrls) {
        syncIframeUrls.forEach(function (syncIframeUrl) {
          syncs.push({
            type: 'iframe',
            url: syncIframeUrl
          });
        });
      }

      if (syncOptions.pixelEnabled && syncImageUrls) {
        syncImageUrls.forEach(function (syncImageUrl) {
          syncs.push({
            type: 'image',
            url: syncImageUrl
          });
        });
      }
    });
    return syncs;
  }
};

var buildSiteComponent = function buildSiteComponent(bidRequest, bidderRequest) {
  var loc = Object(__WEBPACK_IMPORTED_MODULE_3__src_url__["c" /* parse */])(bidderRequest.refererInfo.referer, {
    decodeSearchAsString: true
  });
  var site = {
    domain: loc.hostname,
    page: loc.href,
    id: bidRequest.params.wid,
    publisher: {
      id: bidRequest.params.pid
    }
  };

  if (loc.search) {
    site.search = loc.search;
  }

  if (document) {
    var keywords = document.getElementsByTagName('meta')['keywords'];

    if (keywords && keywords.content) {
      site.keywords = keywords.content;
    }
  }

  return site;
};

function isMobile() {
  return /(ios|ipod|ipad|iphone|android)/i.test(navigator.userAgent);
}

function isConnectedTV() {
  return /(smart[-]?tv|hbbtv|appletv|googletv|hdmi|netcast\.tv|viera|nettv|roku|\bdtv\b|sonydtv|inettvbrowser|\btv\b)/i.test(navigator.userAgent);
}

var buildDeviceComponent = function buildDeviceComponent(bidRequest, bidderRequest) {
  var device = {
    js: 1,
    language: 'language' in navigator ? navigator.language : null,
    ua: 'userAgent' in navigator ? navigator.userAgent : null,
    devicetype: isMobile() ? 1 : isConnectedTV() ? 3 : 2,
    dnt: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getDNT"]() ? 1 : 0
  }; // Include connection info if available

  var CONNECTION = navigator.connection || navigator.webkitConnection;

  if (CONNECTION && CONNECTION.type) {
    device['connectiontype'] = CONNECTION.type;

    if (CONNECTION.downlinkMax) {
      device['connectionDownlinkMax'] = CONNECTION.downlinkMax;
    }
  }

  return device;
};

var determineOptimalRequestId = function determineOptimalRequestId(bidRequest, bidderRequest) {
  return bidRequest.bidId;
};

var extractValidSize = function extractValidSize(bidRequest, bidderRequest) {
  var width = null;
  var height = null;
  var requestedSizes = [];
  var mediaTypes = bidRequest.mediaTypes;

  if (mediaTypes && (mediaTypes.banner && mediaTypes.banner.sizes || mediaTypes.video && mediaTypes.video.sizes)) {
    if (mediaTypes.banner) {
      requestedSizes = mediaTypes.banner.sizes;
    } else {
      requestedSizes = mediaTypes.video.sizes;
    }
  } else if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](bidRequest.sizes)) {
    requestedSizes = bidRequest.sizes;
  } // Ensure the size array is normalized


  var conformingSize = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](requestedSizes);

  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](conformingSize) && conformingSize[0] != null) {
    // Currently only the first size is utilized
    var splitSizes = conformingSize[0].split('x');
    width = parseInt(splitSizes[0]);
    height = parseInt(splitSizes[1]);
  }

  return {
    w: width,
    h: height
  };
};

var generateVideoComponent = function generateVideoComponent(bidRequest, bidderRequest) {
  var impSize = extractValidSize(bidRequest);
  return {
    w: impSize.w,
    h: impSize.h
  };
};

var generateBannerComponent = function generateBannerComponent(bidRequest, bidderRequest) {
  var impSize = extractValidSize(bidRequest);
  return {
    w: impSize.w,
    h: impSize.h
  };
};

var generateNativeComponent = function generateNativeComponent(bidRequest, bidderRequest) {
  var assets = __WEBPACK_IMPORTED_MODULE_0__src_utils__["_map"](bidRequest.mediaTypes.native, function (bidParams, key) {
    var props = NATIVEPROBS[key];
    var asset = {
      required: bidParams.required & 1
    };

    if (props) {
      asset.id = props.id;
      asset[props.name] = {
        len: bidParams.len,
        wmin: bidParams.sizes && bidParams.sizes[0],
        hmin: bidParams.sizes && bidParams.sizes[1],
        type: props.type
      };
      return asset;
    }
  }).filter(Boolean);

  return {
    request: {
      assets: assets
    }
  };
};

var generateImpBody = function generateImpBody(bidRequest, bidderRequest) {
  var mediaTypes = bidRequest.mediaTypes;
  var banner = null;
  var video = null;
  var native = null;

  if (mediaTypes && mediaTypes.video) {
    video = generateVideoComponent(bidRequest, bidderRequest);
  } else if (mediaTypes && mediaTypes.banner) {
    banner = generateBannerComponent(bidRequest, bidderRequest);
  } else if (mediaTypes && mediaTypes.native) {
    native = generateNativeComponent(bidRequest, bidderRequest);
  }

  var result = {
    id: bidRequest.index,
    tagid: bidRequest.params.tagId + ''
  };

  if (banner) {
    result['banner'] = banner;
  }

  if (video) {
    result['video'] = video;
  }

  if (native) {
    result['native'] = native;
  }

  return result;
};

var generatePayload = function generatePayload(bidRequest, bidderRequest) {
  // Generate the expected OpenRTB payload
  var payload = {
    id: determineOptimalRequestId(bidRequest, bidderRequest),
    site: buildSiteComponent(bidRequest, bidderRequest),
    device: buildDeviceComponent(bidRequest, bidderRequest),
    imp: [generateImpBody(bidRequest, bidderRequest)]
  }; // return payload;

  return JSON.stringify(payload);
};

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[606]);