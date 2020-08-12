pbjsChunk([125],{

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(328);


/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'lkqd';
var BID_TTL_DEFAULT = 300;
var ENDPOINT = 'https://v.lkqd.net/ad';
var PARAM_OUTPUT_DEFAULT = 'vast';
var PARAM_EXECUTION_DEFAULT = 'any';
var PARAM_SUPPORT_DEFAULT = 'html5';
var PARAM_PLAYINIT_DEFAULT = 'auto';
var PARAM_VOLUME_DEFAULT = '100';

function _validateId(id) {
  if (id && typeof id !== 'undefined' && parseInt(id) > 0) {
    return true;
  }

  return false;
}

function isBidRequestValid(bidRequest) {
  if (bidRequest.bidder === BIDDER_CODE && typeof bidRequest.params !== 'undefined') {
    if (_validateId(bidRequest.params.siteId) && _validateId(bidRequest.params.placementId)) {
      return true;
    }
  }

  return false;
}

function buildRequests(validBidRequests, bidderRequest) {
  var bidRequests = [];

  for (var i = 0; i < validBidRequests.length; i++) {
    var bidRequest = validBidRequests[i]; // if width/height not provided to the ad unit for some reason then attempt request with default 640x480 size

    if (!bidRequest.sizes || !bidRequest.sizes.length) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Warning: Could not find valid width/height parameters on the provided adUnit');
      bidRequest.sizes = [[640, 480]];
    } // JWPlayer demo page uses sizes: [640,480] instead of sizes: [[640,480]] so need to handle single-layer array as well as nested arrays


    if (bidRequest.sizes.length === 2 && typeof bidRequest.sizes[0] === 'number' && typeof bidRequest.sizes[1] === 'number') {
      var adWidth = bidRequest.sizes[0];
      var adHeight = bidRequest.sizes[1];
      bidRequest.sizes = [[adWidth, adHeight]];
    }

    for (var j = 0; j < bidRequest.sizes.length; j++) {
      var size = bidRequest.sizes[j];
      var playerWidth = void 0;
      var playerHeight = void 0;

      if (size && size.length == 2) {
        playerWidth = size[0];
        playerHeight = size[1];
      } else {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Warning: Could not determine width/height from the provided adUnit');
      }

      var sspUrl = ENDPOINT.concat();
      var sspData = {}; // required parameters

      sspData.pid = bidRequest.params.placementId;
      sspData.sid = bidRequest.params.siteId;
      sspData.prebid = true; // optional parameters

      if (bidRequest.params.hasOwnProperty('output') && bidRequest.params.output != null) {
        sspData.output = bidRequest.params.output;
      } else {
        sspData.output = PARAM_OUTPUT_DEFAULT;
      }

      if (bidRequest.params.hasOwnProperty('execution') && bidRequest.params.execution != null) {
        sspData.execution = bidRequest.params.execution;
      } else {
        sspData.execution = PARAM_EXECUTION_DEFAULT;
      }

      if (bidRequest.params.hasOwnProperty('support') && bidRequest.params.support != null) {
        sspData.support = bidRequest.params.support;
      } else {
        sspData.support = PARAM_SUPPORT_DEFAULT;
      }

      if (bidRequest.params.hasOwnProperty('playinit') && bidRequest.params.playinit != null) {
        sspData.playinit = bidRequest.params.playinit;
      } else {
        sspData.playinit = PARAM_PLAYINIT_DEFAULT;
      }

      if (bidRequest.params.hasOwnProperty('volume') && bidRequest.params.volume != null) {
        sspData.volume = bidRequest.params.volume;
      } else {
        sspData.volume = PARAM_VOLUME_DEFAULT;
      }

      if (playerWidth) {
        sspData.width = playerWidth;
      }

      if (playerHeight) {
        sspData.height = playerHeight;
      }

      if (bidRequest.params.hasOwnProperty('vpaidmode') && bidRequest.params.vpaidmode != null) {
        sspData.vpaidmode = bidRequest.params.vpaidmode;
      }

      if (bidRequest.params.hasOwnProperty('appname') && bidRequest.params.appname != null) {
        sspData.appname = bidRequest.params.appname;
      }

      if (bidRequest.params.hasOwnProperty('bundleid') && bidRequest.params.bundleid != null) {
        sspData.bundleid = bidRequest.params.bundleid;
      }

      if (bidRequest.params.hasOwnProperty('aid') && bidRequest.params.aid != null) {
        sspData.aid = bidRequest.params.aid;
      }

      if (bidRequest.params.hasOwnProperty('idfa') && bidRequest.params.idfa != null) {
        sspData.idfa = bidRequest.params.idfa;
      }

      if (bidRequest.params.hasOwnProperty('gdpr') && bidRequest.params.gdpr != null) {
        sspData.gdpr = bidRequest.params.gdpr;
      }

      if (bidRequest.params.hasOwnProperty('gdprcs') && bidRequest.params.gdprcs != null) {
        sspData.gdprcs = bidRequest.params.gdprcs;
      }

      if (bidRequest.params.hasOwnProperty('flrd') && bidRequest.params.flrd != null) {
        sspData.flrd = bidRequest.params.flrd;
      }

      if (bidRequest.params.hasOwnProperty('flrmp') && bidRequest.params.flrmp != null) {
        sspData.flrmp = bidRequest.params.flrmp;
      }

      if (bidRequest.params.hasOwnProperty('placement') && bidRequest.params.placement != null) {
        sspData.placement = bidRequest.params.placement;
      }

      if (bidRequest.params.hasOwnProperty('timeout') && bidRequest.params.timeout != null) {
        sspData.timeout = bidRequest.params.timeout;
      }

      if (bidRequest.params.hasOwnProperty('dnt') && bidRequest.params.dnt != null) {
        sspData.dnt = bidRequest.params.dnt;
      }

      if (bidRequest.params.hasOwnProperty('pageurl') && bidRequest.params.pageurl != null) {
        sspData.pageurl = bidRequest.params.pageurl;
      } else if (bidderRequest && bidderRequest.refererInfo) {
        sspData.pageurl = encodeURIComponent(bidderRequest.refererInfo.referer);
      }

      if (bidRequest.params.hasOwnProperty('contentId') && bidRequest.params.contentId != null) {
        sspData.contentid = bidRequest.params.contentId;
      }

      if (bidRequest.params.hasOwnProperty('contentTitle') && bidRequest.params.contentTitle != null) {
        sspData.contenttitle = bidRequest.params.contentTitle;
      }

      if (bidRequest.params.hasOwnProperty('contentLength') && bidRequest.params.contentLength != null) {
        sspData.contentlength = bidRequest.params.contentLength;
      }

      if (bidRequest.params.hasOwnProperty('contentUrl') && bidRequest.params.contentUrl != null) {
        sspData.contenturl = bidRequest.params.contentUrl;
      } // random number to prevent caching


      sspData.rnd = Math.floor(Math.random() * 999999999); // Prebid.js required properties

      sspData.bidId = bidRequest.bidId;
      sspData.bidWidth = playerWidth;
      sspData.bidHeight = playerHeight;
      bidRequests.push({
        method: 'GET',
        url: sspUrl,
        data: sspData
      });
    }
  }

  return bidRequests;
}

function interpretResponse(serverResponse, bidRequest) {
  var bidResponses = [];

  if (serverResponse && serverResponse.body) {
    if (serverResponse.error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Error: ' + serverResponse.error);
      return bidResponses;
    } else {
      try {
        var bidResponse = {};

        if (bidRequest && bidRequest.data && bidRequest.data.bidId && bidRequest.data.bidId !== '') {
          var sspXmlString = serverResponse.body;
          var sspXml = new window.DOMParser().parseFromString(sspXmlString, 'text/xml');

          if (sspXml && sspXml.getElementsByTagName('parsererror').length == 0) {
            var sspUrl = bidRequest.url.concat();
            bidResponse.requestId = bidRequest.data.bidId;
            bidResponse.bidderCode = BIDDER_CODE;
            bidResponse.ad = '';
            bidResponse.cpm = parseFloat(sspXml.getElementsByTagName('Pricing')[0].textContent);
            bidResponse.width = bidRequest.data.bidWidth;
            bidResponse.height = bidRequest.data.bidHeight;
            bidResponse.ttl = BID_TTL_DEFAULT;
            bidResponse.creativeId = sspXml.getElementsByTagName('Ad')[0].getAttribute('id');
            bidResponse.currency = sspXml.getElementsByTagName('Pricing')[0].getAttribute('currency');
            bidResponse.netRevenue = true;
            bidResponse.vastUrl = sspUrl;
            bidResponse.vastXml = sspXmlString;
            bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */];
            bidResponses.push(bidResponse);
          } else {
            __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Error: Server response contained invalid XML');
          }
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Error: Could not associate bid request to server response');
        }
      } catch (e) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Error: Could not interpret server response');
      }
    }
  } else {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Error: No server response or server response was empty for the requested URL');
  }

  return bidResponses;
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[327]);