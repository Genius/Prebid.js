pbjsChunk([199],{

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(453);


/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["ImproveDigitalAdServerJSClient"] = ImproveDigitalAdServerJSClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__ = __webpack_require__(11);





var BIDDER_CODE = 'improvedigital';
var RENDERER_URL = 'https://acdn.adnxs.com/video/outstream/ANOutstreamVideo.js';
var spec = {
  version: '7.1.0',
  code: BIDDER_CODE,
  gvlid: 253,
  aliases: ['id'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["c" /* NATIVE */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && (bid.params.placementId || bid.params.placementKey && bid.params.publisherId));
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var normalizedBids = bidRequests.map(function (bidRequest) {
      return getNormalizedBidRequest(bidRequest);
    });
    var idClient = new ImproveDigitalAdServerJSClient('hb');
    var requestParameters = {
      singleRequestMode: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('improvedigital.singleRequest') === true,
      returnObjType: idClient.CONSTANTS.RETURN_OBJ_TYPE.URL_PARAMS_SPLIT,
      libVersion: this.version
    };

    if (bidderRequest && bidderRequest.gdprConsent && bidderRequest.gdprConsent.consentString) {
      requestParameters.gdpr = bidderRequest.gdprConsent.consentString;
    }

    if (bidderRequest && bidderRequest.uspConsent) {
      requestParameters.usPrivacy = bidderRequest.uspConsent;
    }

    if (bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer) {
      requestParameters.referrer = bidderRequest.refererInfo.referer;
    }

    requestParameters.schain = bidRequests[0].schain;
    var requestObj = idClient.createRequest(normalizedBids, // requestObject
    requestParameters);

    if (requestObj.errors && requestObj.errors.length > 0) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('ID WARNING 0x01');
    }

    requestObj.requests.forEach(function (request) {
      return request.bidderRequest = bidderRequest;
    });
    return requestObj.requests;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bidderRequest = _ref.bidderRequest;
    var bids = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](serverResponse.body.bid, function (bidObject) {
      if (!bidObject.price || bidObject.price === null || bidObject.hasOwnProperty('errorCode') || !bidObject.adm && !bidObject.native) {
        return;
      }

      var bidRequest = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidRequest"](bidObject.id, [bidderRequest]);
      var bid = {};

      if (bidObject.native) {
        // Native
        bid.native = getNormalizedNativeAd(bidObject.native); // Expose raw oRTB response to the client to allow parsing assets not directly supported by Prebid

        bid.ortbNative = bidObject.native;

        if (bidObject.nurl) {
          bid.native.impressionTrackers.unshift(bidObject.nurl);
        }

        bid.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["c" /* NATIVE */];
      } else if (bidObject.ad_type && bidObject.ad_type === 'video') {
        bid.vastXml = bidObject.adm;
        bid.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */];

        if (isOutstreamVideo(bidRequest)) {
          bid.adResponse = {
            content: bid.vastXml,
            height: bidObject.h,
            width: bidObject.w
          };
          bid.renderer = createRenderer(bidRequest);
        }
      } else {
        // Banner
        var nurl = '';

        if (bidObject.nurl && bidObject.nurl.length > 0) {
          nurl = "<img src=\"".concat(bidObject.nurl, "\" width=\"0\" height=\"0\" style=\"display:none\">");
        }

        bid.ad = "".concat(nurl, "<script>").concat(bidObject.adm, "</script>");
        bid.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */];
      } // Common properties


      bid.adId = bidObject.id;
      bid.cpm = parseFloat(bidObject.price);
      bid.creativeId = bidObject.crid;
      bid.currency = bidObject.currency ? bidObject.currency.toUpperCase() : 'USD'; // Deal ID. Composite ads can have multiple line items and the ID of the first
      // dealID line item will be used.

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](bidObject.lid) && bidObject.buying_type && bidObject.buying_type !== 'rtb') {
        bid.dealId = bidObject.lid;
      } else if (Array.isArray(bidObject.lid) && Array.isArray(bidObject.buying_type) && bidObject.lid.length === bidObject.buying_type.length) {
        var isDeal = false;
        bidObject.buying_type.forEach(function (bt, i) {
          if (isDeal) return;

          if (bt && bt !== 'rtb') {
            isDeal = true;
            bid.dealId = bidObject.lid[i];
          }
        });
      }

      bid.height = bidObject.h;
      bid.netRevenue = bidObject.isNet ? bidObject.isNet : false;
      bid.requestId = bidObject.id;
      bid.ttl = 300;
      bid.width = bidObject.w;

      if (!bid.width || !bid.height) {
        bid.width = 1;
        bid.height = 1;
      }

      bids.push(bid);
    });

    return bids;
  },

  /**
   * Register the user sync pixels which should be dropped after the auction.
   *
   * @param {SyncOptions} syncOptions Which user syncs are allowed?
   * @param {ServerResponse[]} serverResponses List of server's responses.
   * @return {UserSync[]} The user syncs which should be dropped.
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (syncOptions.pixelEnabled) {
      var syncs = [];
      serverResponses.forEach(function (response) {
        response.body.bid.forEach(function (bidObject) {
          if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](bidObject.sync)) {
            bidObject.sync.forEach(function (syncElement) {
              if (syncs.indexOf(syncElement) === -1) {
                syncs.push(syncElement);
              }
            });
          }
        });
      });
      return syncs.map(function (sync) {
        return {
          type: 'image',
          url: sync
        };
      });
    }

    return [];
  }
};

function isInstreamVideo(bid) {
  var mediaTypes = Object.keys(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes', {}));
  var videoMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video');
  var context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.context');
  return bid.mediaType === 'video' || mediaTypes.length === 1 && videoMediaType && context !== 'outstream';
}

function isOutstreamVideo(bid) {
  var videoMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video');
  var context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.context');
  return videoMediaType && context === 'outstream';
}

function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.ANOutstreamVideo.renderAd({
      sizes: [bid.width, bid.height],
      targetId: bid.adUnitCode,
      adResponse: bid.adResponse,
      rendererOptions: bid.renderer.getConfig()
    }, handleOutstreamRendererEvents.bind(null, bid));
  });
}

function handleOutstreamRendererEvents(bid, id, eventName) {
  bid.renderer.handleVideoEvent({
    id: id,
    eventName: eventName
  });
}

function createRenderer(bidRequest) {
  var renderer = __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__["a" /* Renderer */].install({
    id: bidRequest.adUnitCode,
    url: RENDERER_URL,
    loaded: false,
    config: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'renderer.options'),
    adUnitCode: bidRequest.adUnitCode
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  return renderer;
}

function getNormalizedBidRequest(bid) {
  var adUnitId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('adUnitCode', bid) || null;
  var placementId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('placementId', bid.params) || null;
  var publisherId = null;
  var placementKey = null;

  if (placementId === null) {
    publisherId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('publisherId', bid.params) || null;
    placementKey = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('placementKey', bid.params) || null;
  }

  var keyValues = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('keyValues', bid.params) || null;
  var singleSizeFilter = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('size', bid.params) || null;
  var bidId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('bidId', bid);
  var transactionId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('transactionId', bid);
  var currency = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency');
  var bidFloor = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('bidFloor', bid.params);
  var bidFloorCur = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('bidFloorCur', bid.params);
  var normalizedBidRequest = {};

  if (isInstreamVideo(bid)) {
    normalizedBidRequest.adTypes = [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]];
  }

  if (placementId) {
    normalizedBidRequest.placementId = placementId;
  } else {
    if (publisherId) {
      normalizedBidRequest.publisherId = publisherId;
    }

    if (placementKey) {
      normalizedBidRequest.placementKey = placementKey;
    }
  }

  if (keyValues) {
    normalizedBidRequest.keyValues = keyValues;
  }

  if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('improvedigital.usePrebidSizes') === true && !isInstreamVideo(bid) && !isOutstreamVideo(bid) && bid.sizes && bid.sizes.length > 0) {
    normalizedBidRequest.format = bid.sizes;
  } else if (singleSizeFilter && singleSizeFilter.w && singleSizeFilter.h) {
    normalizedBidRequest.size = {};
    normalizedBidRequest.size.h = singleSizeFilter.h;
    normalizedBidRequest.size.w = singleSizeFilter.w;
  }

  if (bidId) {
    normalizedBidRequest.id = bidId;
  }

  if (adUnitId) {
    normalizedBidRequest.adUnitId = adUnitId;
  }

  if (transactionId) {
    normalizedBidRequest.transactionId = transactionId;
  }

  if (currency) {
    normalizedBidRequest.currency = currency;
  }

  if (bidFloor) {
    normalizedBidRequest.bidFloor = bidFloor;
    normalizedBidRequest.bidFloorCur = bidFloorCur ? bidFloorCur.toUpperCase() : 'USD';
  }

  return normalizedBidRequest;
}

function getNormalizedNativeAd(rawNative) {
  var native = {};

  if (!rawNative || !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](rawNative.assets)) {
    return null;
  } // Assets


  rawNative.assets.forEach(function (asset) {
    if (asset.title) {
      native.title = asset.title.text;
    } else if (asset.data) {
      switch (asset.data.type) {
        case 1:
          native.sponsoredBy = asset.data.value;
          break;

        case 2:
          native.body = asset.data.value;
          break;

        case 3:
          native.rating = asset.data.value;
          break;

        case 4:
          native.likes = asset.data.value;
          break;

        case 5:
          native.downloads = asset.data.value;
          break;

        case 6:
          native.price = asset.data.value;
          break;

        case 7:
          native.salePrice = asset.data.value;
          break;

        case 8:
          native.phone = asset.data.value;
          break;

        case 9:
          native.address = asset.data.value;
          break;

        case 10:
          native.body2 = asset.data.value;
          break;

        case 11:
          native.displayUrl = asset.data.value;
          break;

        case 12:
          native.cta = asset.data.value;
          break;
      }
    } else if (asset.img) {
      switch (asset.img.type) {
        case 2:
          native.icon = {
            url: asset.img.url,
            width: asset.img.w,
            height: asset.img.h
          };
          break;

        case 3:
          native.image = {
            url: asset.img.url,
            width: asset.img.w,
            height: asset.img.h
          };
          break;
      }
    }
  }); // Trackers

  if (rawNative.eventtrackers) {
    native.impressionTrackers = [];
    rawNative.eventtrackers.forEach(function (tracker) {
      // Only handle impression event. Viewability events are not supported yet.
      if (tracker.event !== 1) return;

      switch (tracker.method) {
        case 1:
          // img
          native.impressionTrackers.push(tracker.url);
          break;

        case 2:
          // js
          // javascriptTrackers is a string. If there's more than one JS tracker in bid response, the last script will be used.
          native.javascriptTrackers = "<script src=\"".concat(tracker.url, "\"></script>");
          break;
      }
    });
  } else {
    native.impressionTrackers = rawNative.imptrackers || [];
    native.javascriptTrackers = rawNative.jstracker;
  }

  if (rawNative.link) {
    native.clickUrl = rawNative.link.url;
    native.clickTrackers = rawNative.link.clicktrackers;
  }

  if (rawNative.privacy) {
    native.privacyLink = rawNative.privacy;
  }

  return native;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);
function ImproveDigitalAdServerJSClient(endPoint) {
  this.CONSTANTS = {
    AD_SERVER_BASE_URL: 'ice.360yield.com',
    END_POINT: endPoint || 'hb',
    AD_SERVER_URL_PARAM: 'jsonp=',
    CLIENT_VERSION: 'JS-6.3.0',
    MAX_URL_LENGTH: 2083,
    ERROR_CODES: {
      MISSING_PLACEMENT_PARAMS: 2,
      LIB_VERSION_MISSING: 3
    },
    RETURN_OBJ_TYPE: {
      DEFAULT: 0,
      URL_PARAMS_SPLIT: 1
    }
  };

  this.getErrorReturn = function (errorCode) {
    return {
      idMappings: {},
      requests: {},
      'errorCode': errorCode
    };
  };

  this.createRequest = function (requestObject, requestParameters, extraRequestParameters) {
    if (!requestParameters.libVersion) {
      return this.getErrorReturn(this.CONSTANTS.ERROR_CODES.LIB_VERSION_MISSING);
    }

    requestParameters.returnObjType = requestParameters.returnObjType || this.CONSTANTS.RETURN_OBJ_TYPE.DEFAULT;
    requestParameters.adServerBaseUrl = 'https://' + (requestParameters.adServerBaseUrl || this.CONSTANTS.AD_SERVER_BASE_URL);
    var impressionObjects = [];
    var impressionObject;

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](requestObject)) {
      for (var counter = 0; counter < requestObject.length; counter++) {
        impressionObject = this.createImpressionObject(requestObject[counter]);
        impressionObjects.push(impressionObject);
      }
    } else {
      impressionObject = this.createImpressionObject(requestObject);
      impressionObjects.push(impressionObject);
    }

    var returnIdMappings = true;

    if (requestParameters.returnObjType === this.CONSTANTS.RETURN_OBJ_TYPE.URL_PARAMS_SPLIT) {
      returnIdMappings = false;
    }

    var returnObject = {};
    returnObject.requests = [];

    if (returnIdMappings) {
      returnObject.idMappings = [];
    }

    var errors = null;
    var baseUrl = "".concat(requestParameters.adServerBaseUrl, "/").concat(this.CONSTANTS.END_POINT, "?").concat(this.CONSTANTS.AD_SERVER_URL_PARAM);
    var bidRequestObject = {
      bid_request: this.createBasicBidRequestObject(requestParameters, extraRequestParameters)
    };

    for (var _counter = 0; _counter < impressionObjects.length; _counter++) {
      impressionObject = impressionObjects[_counter];

      if (impressionObject.errorCode) {
        errors = errors || [];
        errors.push({
          errorCode: impressionObject.errorCode,
          adUnitId: impressionObject.adUnitId
        });
      } else {
        if (returnIdMappings) {
          returnObject.idMappings.push({
            adUnitId: impressionObject.adUnitId,
            id: impressionObject.impressionObject.id
          });
        }

        bidRequestObject.bid_request.imp = bidRequestObject.bid_request.imp || [];
        bidRequestObject.bid_request.imp.push(impressionObject.impressionObject);
        var writeLongRequest = false;
        var outputUri = baseUrl + encodeURIComponent(JSON.stringify(bidRequestObject));

        if (outputUri.length > this.CONSTANTS.MAX_URL_LENGTH) {
          writeLongRequest = true;

          if (bidRequestObject.bid_request.imp.length > 1) {
            // Pop the current request and process it again in the next iteration
            bidRequestObject.bid_request.imp.pop();

            if (returnIdMappings) {
              returnObject.idMappings.pop();
            }

            _counter--;
          }
        }

        if (writeLongRequest || !requestParameters.singleRequestMode || _counter === impressionObjects.length - 1) {
          returnObject.requests.push(this.formatRequest(requestParameters, bidRequestObject));
          bidRequestObject = {
            bid_request: this.createBasicBidRequestObject(requestParameters, extraRequestParameters)
          };
        }
      }
    }

    if (errors) {
      returnObject.errors = errors;
    }

    return returnObject;
  };

  this.formatRequest = function (requestParameters, bidRequestObject) {
    switch (requestParameters.returnObjType) {
      case this.CONSTANTS.RETURN_OBJ_TYPE.URL_PARAMS_SPLIT:
        return {
          method: 'GET',
          url: "".concat(requestParameters.adServerBaseUrl, "/").concat(this.CONSTANTS.END_POINT),
          data: "".concat(this.CONSTANTS.AD_SERVER_URL_PARAM).concat(encodeURIComponent(JSON.stringify(bidRequestObject)))
        };

      default:
        var baseUrl = "".concat(requestParameters.adServerBaseUrl, "/") + "".concat(this.CONSTANTS.END_POINT, "?").concat(this.CONSTANTS.AD_SERVER_URL_PARAM);
        return {
          url: baseUrl + encodeURIComponent(JSON.stringify(bidRequestObject))
        };
    }
  };

  this.createBasicBidRequestObject = function (requestParameters, extraRequestParameters) {
    var impressionBidRequestObject = {};
    impressionBidRequestObject.secure = 1;

    if (requestParameters.requestId) {
      impressionBidRequestObject.id = requestParameters.requestId;
    } else {
      impressionBidRequestObject.id = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getUniqueIdentifierStr"]();
    }

    if (requestParameters.domain) {
      impressionBidRequestObject.domain = requestParameters.domain;
    }

    if (requestParameters.page) {
      impressionBidRequestObject.page = requestParameters.page;
    }

    if (requestParameters.ref) {
      impressionBidRequestObject.ref = requestParameters.ref;
    }

    if (requestParameters.callback) {
      impressionBidRequestObject.callback = requestParameters.callback;
    }

    if (requestParameters.libVersion) {
      impressionBidRequestObject.version = requestParameters.libVersion + '-' + this.CONSTANTS.CLIENT_VERSION;
    }

    if (requestParameters.referrer) {
      impressionBidRequestObject.referrer = requestParameters.referrer;
    }

    if (requestParameters.gdpr || requestParameters.gdpr === 0) {
      impressionBidRequestObject.gdpr = requestParameters.gdpr;
    }

    if (requestParameters.usPrivacy) {
      impressionBidRequestObject.us_privacy = requestParameters.usPrivacy;
    }

    if (requestParameters.schain) {
      impressionBidRequestObject.schain = requestParameters.schain;
    }

    if (extraRequestParameters) {
      for (var prop in extraRequestParameters) {
        impressionBidRequestObject[prop] = extraRequestParameters[prop];
      }
    }

    return impressionBidRequestObject;
  };

  this.createImpressionObject = function (placementObject) {
    var outputObject = {};
    var impressionObject = {};
    outputObject.impressionObject = impressionObject;

    if (placementObject.id) {
      impressionObject.id = placementObject.id;
    } else {
      impressionObject.id = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getUniqueIdentifierStr"]();
    }

    if (placementObject.adTypes) {
      impressionObject.ad_types = placementObject.adTypes;
    }

    if (placementObject.adUnitId) {
      outputObject.adUnitId = placementObject.adUnitId;
    }

    if (placementObject.currency) {
      impressionObject.currency = placementObject.currency.toUpperCase();
    }

    if (placementObject.bidFloor) {
      impressionObject.bidfloor = placementObject.bidFloor;
    }

    if (placementObject.bidFloorCur) {
      impressionObject.bidfloorcur = placementObject.bidFloorCur.toUpperCase();
    }

    if (placementObject.placementId) {
      impressionObject.pid = placementObject.placementId;
    }

    if (placementObject.publisherId) {
      impressionObject.pubid = placementObject.publisherId;
    }

    if (placementObject.placementKey) {
      impressionObject.pkey = placementObject.placementKey;
    }

    if (placementObject.transactionId) {
      impressionObject.tid = placementObject.transactionId;
    }

    if (placementObject.keyValues) {
      for (var key in placementObject.keyValues) {
        for (var valueCounter = 0; valueCounter < placementObject.keyValues[key].length; valueCounter++) {
          impressionObject.kvw = impressionObject.kvw || {};
          impressionObject.kvw[key] = impressionObject.kvw[key] || [];
          impressionObject.kvw[key].push(placementObject.keyValues[key][valueCounter]);
        }
      }
    }

    impressionObject.banner = {};

    if (placementObject.size && placementObject.size.w && placementObject.size.h) {
      impressionObject.banner.w = placementObject.size.w;
      impressionObject.banner.h = placementObject.size.h;
    } // Set of desired creative sizes
    // Input Format: array of pairs, i.e. [[300, 250], [250, 250]]


    if (placementObject.format && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](placementObject.format)) {
      var format = placementObject.format.filter(function (sizePair) {
        return sizePair.length === 2 && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isInteger"](sizePair[0]) && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isInteger"](sizePair[1]) && sizePair[0] >= 0 && sizePair[1] >= 0;
      }).map(function (sizePair) {
        return {
          w: sizePair[0],
          h: sizePair[1]
        };
      });

      if (format.length > 0) {
        impressionObject.banner.format = format;
      }
    }

    if (!impressionObject.pid && !impressionObject.pubid && !impressionObject.pkey && !(impressionObject.banner && impressionObject.banner.w && impressionObject.banner.h)) {
      outputObject.impressionObject = null;
      outputObject.errorCode = this.CONSTANTS.ERROR_CODES.MISSING_PLACEMENT_PARAMS;
    }

    return outputObject;
  };
}

/***/ })

},[452]);