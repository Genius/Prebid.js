pbjsChunk([65],{

/***/ 788:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(789);


/***/ }),

/***/ 789:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils_js__ = __webpack_require__(0);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var BIDDER_CODE = 'videofy';
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
  var renderer = __WEBPACK_IMPORTED_MODULE_2__src_Renderer_js__["a" /* Renderer */].install({
    url: 'https://player.srv-mars.com/script/6.1/prebidRenderer.js',
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

var irc = 0;

function buildRequests(validBidRequests, bidderRequest) {
  var bidRequests = [];

  for (var i = 0; i < validBidRequests.length; i++) {
    var bidRequest = validBidRequests[i];
    var sizes = [[640, 480]];

    if (bidRequest.mediaTypes && bidRequest.mediaTypes.video && bidRequest.mediaTypes.video.playerSize) {
      sizes = bidRequest.mediaTypes.video.playerSize;
    } else {
      if (bidRequest.sizes) {
        sizes = bidRequest.sizes;
      }
    }

    if (sizes.length === 2 && typeof sizes[0] === 'number') {
      sizes = [[sizes[0], sizes[1]]];
    }

    for (var j = 0; j < sizes.length; j++) {
      var size = sizes[j];
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
        if (bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer) {
          s2sParams.AV_URL = bidderRequest.refererInfo.referer;
        } else {
          s2sParams.AV_URL = window.location.href;
        }
      }

      if (s2sParams.AV_IDFA && !s2sParams.AV_AID) {
        s2sParams.AV_AID = s2sParams.AV_IDFA;
      }

      if (s2sParams.AV_AID && !s2sParams.AV_IDFA) {
        s2sParams.AV_IDFA = s2sParams.AV_AID;
      }

      s2sParams.cb = Math.floor(Math.random() * 999999999);
      s2sParams.AV_WIDTH = playerWidth;
      s2sParams.AV_HEIGHT = playerHeight;
      s2sParams.bidWidth = playerWidth;
      s2sParams.bidHeight = playerHeight;
      s2sParams.bidId = bidRequest.bidId;
      s2sParams.pbjs = 1;
      s2sParams.tgt = 10;
      s2sParams.s2s = '1';
      s2sParams.irc = irc;
      irc++;
      s2sParams.wpm = 1;

      if (bidderRequest && bidderRequest.gdprConsent) {
        if (bidderRequest.gdprConsent.gdprApplies) {
          s2sParams.AV_GDPR = 1;
          s2sParams.AV_CONSENT = bidderRequest.gdprConsent.consentString;
        }
      }

      if (bidderRequest && bidderRequest.uspConsent) {
        s2sParams.AV_CCPA = bidderRequest.uspConsent;
      }

      var serverDomain = bidRequest.params && bidRequest.params.serverDomain ? bidRequest.params.serverDomain : 'servx.srv-mars.com';
      var servingUrl = 'https://' + serverDomain + '/api/adserver/vast3/';
      bidRequests.push({
        method: 'GET',
        url: servingUrl,
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
              bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["d" /* VIDEO */];

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

function getSyncData(xml, options) {
  var ret = [];

  if (xml) {
    var ext = xml.getElementsByTagName('Extensions');

    if (ext && ext.length > 0) {
      ext = ext[0].getElementsByTagName('Extension');

      if (ext && ext.length > 0) {
        for (var i = 0; i < ext.length; i++) {
          if (ext[i].getAttribute('type') == 'ANIVIEW') {
            var syncs = ext[i].getElementsByTagName('AdServingSync');

            if (syncs && syncs.length == 1) {
              try {
                var data = JSON.parse(syncs[0].textContent);

                if (data && data.trackers && data.trackers.length) {
                  data = data.trackers;

                  for (var j = 0; j < data.length; j++) {
                    if (_typeof(data[j]) === 'object' && typeof data[j].url === 'string' && data[j].e === 'inventory') {
                      if (data[j].t == 1 && options.pixelEnabled) {
                        ret.push({
                          url: data[j].url,
                          type: 'image'
                        });
                      } else {
                        if (data[j].t == 3 && options.iframeEnabled) {
                          ret.push({
                            url: data[j].url,
                            type: 'iframe'
                          });
                        }
                      }
                    }
                  }
                }
              } catch (e) {}
            }

            break;
          }
        }
      }
    }
  }

  return ret;
}

function getUserSyncs(syncOptions, serverResponses) {
  if (serverResponses && serverResponses[0] && serverResponses[0].body) {
    if (serverResponses.error) {
      return [];
    } else {
      try {
        var xmlStr = serverResponses[0].body;
        var xml = new window.DOMParser().parseFromString(xmlStr, 'text/xml');

        if (xml && xml.getElementsByTagName('parsererror').length == 0) {
          var syncData = getSyncData(xml, syncOptions);
          return syncData;
        }
      } catch (e) {}
    }
  }
}

function onBidWon(bid) {
  sendbeacon(bid, 17);
}

function onTimeout(bid) {
  sendbeacon(bid, 19);
}

function onSetTargeting(bid) {
  sendbeacon(bid, 20);
}

function sendbeacon(bid, type) {
  var bidCopy = {
    bidder: bid.bidder,
    cpm: bid.cpm,
    originalCpm: bid.originalCpm,
    currency: bid.currency,
    originalCurrency: bid.originalCurrency,
    timeToRespond: bid.timeToRespond,
    statusMessage: bid.statusMessage,
    width: bid.width,
    height: bid.height,
    size: bid.size,
    params: bid.params,
    status: bid.status,
    adserverTargeting: bid.adserverTargeting,
    ttl: bid.ttl
  };
  var bidString = JSON.stringify(bidCopy);
  var encodedBuf = window.btoa(bidString);
  __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["triggerPixel"]('https://beacon.videofy.io/notification/rtb/beacon/?bt=' + type + '&bid=hcwqso&hb_j=' + encodedBuf, null);
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs,
  onBidWon: onBidWon,
  onTimeout: onTimeout,
  onSetTargeting: onSetTargeting
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[788]);