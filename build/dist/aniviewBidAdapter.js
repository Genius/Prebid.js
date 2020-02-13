pbjsChunk([245],{

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(189);


/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_Renderer__ = __webpack_require__(11);




var BIDDER_CODE = 'aniview';
var TTL = 600;

function avRenderer(bid) {
  bid.renderer.push(function () {
    var eventCallback = bid && bid.renderer && bid.renderer.handleVideoEvent ? bid.renderer.handleVideoEvent : null;
    window.aniviewRenderer.renderAd({
      id: bid.adUnitCode + '_' + bid.adId,
      debug: window.location.href.indexOf('pbjsDebug') >= 0,
      placement: bid.adUnitCode,
      width: bid.width,
      height: bid.height,
      vastUrl: bid.vastUrl,
      vastXml: bid.vastXml,
      config: bid.params[0].rendererConfig,
      eventsCallback: eventCallback,
      bid: bid
    });
  });
}

function newRenderer(bidRequest) {
  var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer__["a" /* Renderer */].install({
    url: 'https://player.aniview.com/script/6.1/prebidRenderer.js',
    config: {},
    loaded: false
  });

  try {
    renderer.setRender(avRenderer);
  } catch (err) {}

  return renderer;
}

function isBidRequestValid(bid) {
  if (!bid.params || !bid.params.AV_PUBLISHERID || !bid.params.AV_CHANNELID) {
    return false;
  }

  return true;
}

function buildRequests(validBidRequests, bidderRequest) {
  var bidRequests = [];

  for (var i = 0; i < validBidRequests.length; i++) {
    var bidRequest = validBidRequests[i];

    if (!bidRequest.sizes || !bidRequest.sizes.length) {
      bidRequest.sizes = [[640, 480]];
    }

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
        playerWidth = 640;
        playerHeight = 480;
      }

      var s2sParams = {};

      for (var attrname in bidRequest.params) {
        if (bidRequest.params.hasOwnProperty(attrname) && attrname.indexOf('AV_') == 0) {
          s2sParams[attrname] = bidRequest.params[attrname];
        }
      }

      ;

      if (s2sParams.AV_APPPKGNAME && !s2sParams.AV_URL) {
        s2sParams.AV_URL = s2sParams.AV_APPPKGNAME;
      }

      if (!s2sParams.AV_IDFA && !s2sParams.AV_URL) {
        s2sParams.AV_URL = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowUrl"]();
      }

      if (s2sParams.AV_IDFA && !s2sParams.AV_AID) {
        s2sParams.AV_AID = s2sParams.AV_IDFA;
      }

      if (s2sParams.AV_AID && !s2sParams.AV_IDFA) {
        s2sParams.AV_IDFA = s2sParams.AV_AID;
      }

      s2sParams.pbjs = 1;
      s2sParams.cb = Math.floor(Math.random() * 999999999);
      s2sParams.AV_WIDTH = playerWidth;
      s2sParams.AV_HEIGHT = playerHeight;
      s2sParams.s2s = '1';
      s2sParams.bidId = bidRequest.bidId;
      s2sParams.bidWidth = playerWidth;
      s2sParams.bidHeight = playerHeight;

      if (bidderRequest && bidderRequest.gdprConsent) {
        if (bidderRequest.gdprConsent.gdprApplies) {
          s2sParams.AV_GDPR = 1;
          s2sParams.AV_CONSENT = bidderRequest.gdprConsent.consentString;
        }
      }

      var serverDomain = bidRequest.params && bidRequest.params.serverDomain ? bidRequest.params.serverDomain : 'gov.aniview.com';
      var serverUrl = 'https://' + serverDomain + '/api/adserver/vast3/';
      bidRequests.push({
        method: 'GET',
        url: serverUrl,
        data: s2sParams,
        bidRequest: bidRequest
      });
    }
  }

  return bidRequests;
}

function getCpmData(xml) {
  var ret = {
    cpm: 0,
    currency: 'USD'
  };

  if (xml) {
    var ext = xml.getElementsByTagName('Extensions');

    if (ext && ext.length > 0) {
      ext = ext[0].getElementsByTagName('Extension');

      if (ext && ext.length > 0) {
        for (var i = 0; i < ext.length; i++) {
          if (ext[i].getAttribute('type') == 'ANIVIEW') {
            var price = ext[i].getElementsByTagName('Cpm');

            if (price && price.length == 1) {
              ret.cpm = price[0].textContent;
            }

            break;
          }
        }
      }
    }
  }

  return ret;
}

function interpretResponse(serverResponse, bidRequest) {
  var bidResponses = [];

  if (serverResponse && serverResponse.body) {
    if (serverResponse.error) {
      return bidResponses;
    } else {
      try {
        var bidResponse = {};

        if (bidRequest && bidRequest.data && bidRequest.data.bidId && bidRequest.data.bidId !== '') {
          var xmlStr = serverResponse.body;
          var xml = new window.DOMParser().parseFromString(xmlStr, 'text/xml');

          if (xml && xml.getElementsByTagName('parsererror').length == 0) {
            var cpmData = getCpmData(xml);

            if (cpmData && cpmData.cpm > 0) {
              bidResponse.requestId = bidRequest.data.bidId;
              bidResponse.bidderCode = BIDDER_CODE;
              bidResponse.ad = '';
              bidResponse.cpm = cpmData.cpm;
              bidResponse.width = bidRequest.data.AV_WIDTH;
              bidResponse.height = bidRequest.data.AV_HEIGHT;
              bidResponse.ttl = TTL;
              bidResponse.creativeId = xml.getElementsByTagName('Ad') && xml.getElementsByTagName('Ad')[0] && xml.getElementsByTagName('Ad')[0].getAttribute('id') ? xml.getElementsByTagName('Ad')[0].getAttribute('id') : 'creativeId';
              bidResponse.currency = cpmData.currency;
              bidResponse.netRevenue = true;
              var blob = new Blob([xmlStr], {
                type: 'application/xml'
              });
              bidResponse.vastUrl = window.URL.createObjectURL(blob);
              bidResponse.vastXml = xmlStr;
              bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes__["d" /* VIDEO */];

              if (bidRequest.bidRequest && bidRequest.bidRequest.mediaTypes && bidRequest.bidRequest.mediaTypes.video && bidRequest.bidRequest.mediaTypes.video.context === 'outstream') {
                bidResponse.renderer = newRenderer(bidRequest);
              }

              bidResponses.push(bidResponse);
            }
          } else {}
        } else {}
      } catch (e) {}
    }
  } else {}

  return bidResponses;
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[188]);