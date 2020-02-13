pbjsChunk([103],{

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(527);


/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROTATION_ZONE", function() { return ROTATION_ZONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "internals", function() { return internals; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__ = __webpack_require__(1);




var BIDDER_CODE = 'rockyou';
var BASE_REQUEST_PATH = 'https://tas.rockyou.net/servlet/rotator/';
var IFRAME_SYNC_URL = 'https://prebid.tas-sync.rockyou.net/usersync2/prebid';
var VAST_PLAYER_LOCATION = 'https://rya-static.rockyou.com/rya/js/PreBidPlayer.js';
var ROTATION_ZONE = 'prod';

var isBidRequestValid = function isBidRequestValid(bid) {
  return !!bid.params && !!bid.params.placementId;
};
/**
* The RockYou Ad Serving system currently only accepts one placementId
* per Ad request. For this reason, the first placementId indicated
* will be chosen as the predominant placementId for this request.
*/


var determineOptimalPlacementId = function determineOptimalPlacementId(bidRequest) {
  return bidRequest.params.placementId;
};

var determineOptimalRequestId = function determineOptimalRequestId(bidRequest) {
  return bidRequest.bidId;
};

var buildSiteComponent = function buildSiteComponent(bidRequest) {
  var topLocation = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]();
  var site = {
    domain: topLocation.hostname,
    page: topLocation.href,
    ref: topLocation.origin
  };
  return site;
};

var buildDeviceComponent = function buildDeviceComponent(bidRequest) {
  var device = {
    js: 1,
    language: 'language' in navigator ? navigator.language : null
  };
  return device;
};

var extractValidSize = function extractValidSize(bidRequest) {
  var width = null;
  var height = null;
  var requestedSizes = [];
  var mediaTypes = bidRequest.mediaTypes;

  if (mediaTypes && (mediaTypes.banner && mediaTypes.banner.sizes || mediaTypes.video && mediaTypes.video.playerSize)) {
    if (mediaTypes.banner) {
      requestedSizes = mediaTypes.banner.sizes;
    } else {
      requestedSizes = [mediaTypes.video.playerSize];
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

var generateVideoComponent = function generateVideoComponent(bidRequest) {
  var impSize = extractValidSize(bidRequest);
  return {
    w: impSize.w,
    h: impSize.h
  };
};

var generateBannerComponent = function generateBannerComponent(bidRequest) {
  var impSize = extractValidSize(bidRequest);
  return {
    w: impSize.w,
    h: impSize.h
  };
};

var generateImpBody = function generateImpBody(bidRequest) {
  var mediaTypes = bidRequest.mediaTypes;
  var banner = null;
  var video = null; // Assume banner if the mediatype is not included

  if (mediaTypes && mediaTypes.video) {
    video = generateVideoComponent(bidRequest);
  } else {
    banner = generateBannerComponent(bidRequest);
  }

  return {
    id: bidRequest.index,
    banner: banner,
    video: video
  };
};

var generatePayload = function generatePayload(bidRequest) {
  // Generate the expected OpenRTB payload
  var payload = {
    id: determineOptimalRequestId(bidRequest),
    site: buildSiteComponent(bidRequest),
    device: buildDeviceComponent(bidRequest),
    imp: [generateImpBody(bidRequest)]
  };
  return JSON.stringify(payload);
};

var overridableProperties = function overridableProperties(request) {
  var rendererLocation = VAST_PLAYER_LOCATION;
  var baseRequestPath = BASE_REQUEST_PATH;
  var rotationZone = ROTATION_ZONE;

  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](request.rendererOverride)) {
    rendererLocation = request.rendererOverride;
  }

  if (request.params) {
    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](request.params.baseRequestPath)) {
      baseRequestPath = request.params.baseRequestPath;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](request.params.rotationZone)) {
      rotationZone = request.params.rotationZone;
    }
  }

  return {
    rendererLocation: rendererLocation,
    baseRequestPath: baseRequestPath,
    rotationZone: rotationZone
  };
};

var buildRequests = function buildRequests(validBidRequests, requestRoot) {
  var requestType = 'POST';
  var requestUrl = null;
  var requestPayload = null;
  var mediaTypes = null;
  var adUnitCode = null;
  var rendererOverride = null;
  var results = []; // Due to the nature of how URLs are generated, there must
  // be at least one bid request present for this to function
  // correctly

  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](validBidRequests)) {
    results = validBidRequests.map(function (bidRequest) {
      var serverLocations = overridableProperties(bidRequest); // requestUrl is the full endpoint w/ relevant adspot paramters

      var placementId = determineOptimalPlacementId(bidRequest);
      requestUrl = "".concat(serverLocations.baseRequestPath).concat(placementId, "/0/vo?z=").concat(serverLocations.rotationZone); // requestPayload is the POST body JSON for the OpenRtb request

      requestPayload = generatePayload(bidRequest);
      mediaTypes = bidRequest.mediaTypes;
      adUnitCode = bidRequest.adUnitCode;
      rendererOverride = bidRequest.rendererOverride;
      return {
        method: requestType,
        type: requestType,
        url: requestUrl,
        data: requestPayload,
        mediaTypes: mediaTypes,
        requestId: requestRoot.bidderRequestId,
        bidId: bidRequest.bidId,
        adUnitCode: adUnitCode,
        rendererOverride: rendererOverride
      };
    });
  }

  return results;
};

var outstreamRender = function outstreamRender(bid) {
  // push to render queue because player may not be loaded yet
  bid.renderer.push(function () {
    var adUnitCode = bid.renderer.config.adUnitCode;

    try {
      RockYouVastPlayer.render(adUnitCode, bid, playerCallbacks(bid.renderer));
    } catch (pbe) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](pbe);
    }
  });
};

var rockYouEventTranslation = function rockYouEventTranslation(rockYouEvent) {
  var translated;

  switch (rockYouEvent) {
    case 'LOAD':
      translated = 'loaded';
      break;

    case 'IMPRESSION':
      translated = 'impression';
      break;

    case 'COMPLETE':
    case 'ERROR':
      translated = 'ended';
      break;
  }

  return translated;
};

var playerCallbacks = function playerCallbacks(renderer) {
  return function (id, eventName) {
    eventName = rockYouEventTranslation(eventName);

    if (eventName) {
      renderer.handleVideoEvent({
        id: id,
        eventName: eventName
      });
    }
  };
};

var generateRenderer = function generateRenderer(bid, adUnitCode, rendererLocation) {
  var renderer = __WEBPACK_IMPORTED_MODULE_1__src_Renderer__["a" /* Renderer */].install({
    url: rendererLocation,
    config: {
      adText: "RockYou Outstream Video Ad",
      adUnitCode: adUnitCode
    },
    id: bid.id
  });
  bid.renderer = renderer;

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  renderer.setEventHandlers({
    impression: function impression() {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"]('RockYou outstream video impression event');
    },
    loaded: function loaded() {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"]('RockYou outstream video loaded event');
    },
    ended: function ended() {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"]('RockYou outstream renderer video event');
      document.querySelector("#".concat(adUnitCode)).style.display = 'none';
    }
  });
  return renderer;
};

var interpretResponse = function interpretResponse(serverResponse, request) {
  var responses = [];

  if (serverResponse.body) {
    var responseBody = serverResponse.body;

    if (responseBody != null) {
      var seatBids = responseBody.seatbid;

      if (!(__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](seatBids) || __WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](seatBids[0].bid))) {
        var bid = seatBids[0].bid[0]; // handle any values that may end up undefined

        var nullify = function nullify(value) {
          return typeof value === 'undefined' ? null : value;
        };

        var ttl = null;

        if (bid.ext) {
          ttl = nullify(bid.ext.ttl);
        }

        var bidWidth = nullify(bid.w);
        var bidHeight = nullify(bid.h);
        var bannerCreative = null;
        var videoXml = null;
        var mediaType = null;
        var renderer = null;

        if (request.mediaTypes && request.mediaTypes.video) {
          videoXml = bid.adm;
          mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */];
          var serversideLocations = overridableProperties(request);
          renderer = generateRenderer(bid, request.adUnitCode, serversideLocations.rendererLocation);
        } else {
          bannerCreative = bid.adm;
        }

        var response = {
          requestId: request.bidId,
          cpm: bid.price,
          width: bidWidth,
          height: bidHeight,
          ad: bannerCreative,
          ttl: ttl,
          creativeId: bid.adid,
          netRevenue: true,
          currency: responseBody.cur,
          vastUrl: null,
          vastXml: videoXml,
          dealId: null,
          mediaType: mediaType,
          renderer: renderer
        };
        responses.push(response);
      }
    }
  }

  return responses;
};

var getUserSyncs = function getUserSyncs(syncOptions, serverResponses) {
  var syncs = [];

  if (syncOptions.iframeEnabled) {
    syncs.push({
      type: 'iframe',
      url: IFRAME_SYNC_URL
    });
  }

  return syncs;
};

var spec = {
  code: BIDDER_CODE,
  aliases: ['ry'],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]]
};
var internals = {
  playerCallbacks: playerCallbacks,
  generateRenderer: generateRenderer
};
Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[526]);