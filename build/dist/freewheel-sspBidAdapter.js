pbjsChunk([189],{

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(321);


/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


 // import { config } from '../src/config';

var BIDDER_CODE = 'freewheel-ssp';
var PROTOCOL = getProtocol();
var FREEWHEEL_ADSSETUP = PROTOCOL + '://ads.stickyadstv.com/www/delivery/swfIndex.php';
var MUSTANG_URL = PROTOCOL + '://cdn.stickyadstv.com/mustang/mustang.min.js';
var PRIMETIME_URL = PROTOCOL + '://cdn.stickyadstv.com/prime-time/';
var USER_SYNC_URL = PROTOCOL + '://ads.stickyadstv.com/auto-user-sync';

function getProtocol() {
  if (location.protocol && location.protocol.indexOf('https') === 0) {
    return 'https';
  } else {
    return 'http';
  }
}

function isValidUrl(str) {
  if (!str) {
    return false;
  } // regExp for url validation


  var pattern = /^(https?|ftp|file):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return pattern.test(str);
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
/*
* read the pricing extension with this format: <Extension type='StickyPricing'><Price currency="EUR">1.0000</Price></Extension>
* @return {object} pricing data in format: {currency: "EUR", price:"1.000"}
*/


function getPricing(xmlNode) {
  var pricingExtNode;
  var princingData = {};
  var extensions = xmlNode.querySelectorAll('Extension'); // Nodelist.forEach is not supported in IE and Edge
  // Workaround given here https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10638731/

  Array.prototype.forEach.call(extensions, function (node) {
    if (node.getAttribute('type') === 'StickyPricing') {
      pricingExtNode = node;
    }
  });

  if (pricingExtNode) {
    var priceNode = pricingExtNode.querySelector('Price');
    princingData = {
      currency: priceNode.getAttribute('currency'),
      price: priceNode.textContent || priceNode.innerText
    };
  } else {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('PREBID - ' + BIDDER_CODE + ': Can\'t get pricing data. Is price awareness enabled?');
  }

  return princingData;
}

function hashcode(inputString) {
  var hash = 0;
  var char;
  if (inputString.length == 0) return hash;

  for (var i = 0; i < inputString.length; i++) {
    char = inputString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
}

function getCreativeId(xmlNode) {
  var creaId = '';
  var adNodes = xmlNode.querySelectorAll('Ad'); // Nodelist.forEach is not supported in IE and Edge
  // Workaround given here https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10638731/

  Array.prototype.forEach.call(adNodes, function (el) {
    creaId += '[' + el.getAttribute('id') + ']';
  });
  return creaId;
}
/**
* returns the top most accessible window
*/


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

function getComponentId(inputFormat) {
  var component = 'mustang'; // default component id

  if (inputFormat && inputFormat !== 'inbanner') {
    // format identifiers are equals to their component ids.
    component = inputFormat;
  }

  return component;
}

function getAPIName(componentId) {
  componentId = componentId || ''; // remove dash in componentId to get API name

  return componentId.replace('-', '');
}

function formatAdHTML(bid, size) {
  var integrationType = bid.params.format;
  var divHtml = '<div id="freewheelssp_prebid_target" style="width:' + size[0] + 'px;height:' + size[1] + 'px;"></div>';
  var script = '';
  var libUrl = '';

  if (integrationType && integrationType !== 'inbanner') {
    libUrl = PRIMETIME_URL + getComponentId(bid.params.format) + '.min.js';
    script = getOutstreamScript(bid, size);
  } else {
    libUrl = MUSTANG_URL;
    script = getInBannerScript(bid, size);
  }

  return divHtml + '<script type=\'text/javascript\'>' + '(function() {' + '  var st = document.createElement(\'script\'); st.type = \'text/javascript\'; st.async = true;' + '  st.src = \'' + libUrl + '\';' + '  st.onload = function(){' + '    var vastLoader = new window.com.stickyadstv.vast.VastLoader();' + '    var vast = vastLoader.getVast();' + // get the top most accessible window
  '    var topWindow = (function(){var res=window; try{while(top != res){if(res.parent.location.href.length)res=res.parent;}}catch(e){}return res;})();' + // inject the xml in the Vast object as string
  '    vast.setXmlString(topWindow.freewheelssp_cache["' + bid.adUnitCode + '"]);' + // force ad parsing on the given vast xml
  '    vastLoader.parseAds(vast, {' + '      onSuccess: function() {' + script + ' }' + '    });' + '  };' + '  document.head.appendChild(st);' + '})();' + '</script>';
}

var getInBannerScript = function getInBannerScript(bid, size) {
  return 'var config = {' + '      preloadedVast:vast,' + '      autoPlay:true' + '    };' + '    var ad = new window.com.stickyadstv.vpaid.Ad(document.getElementById("freewheelssp_prebid_target"),config);' + '    (new window.com.stickyadstv.tools.ASLoader(' + bid.params.zoneId + ', \'' + getComponentId(bid.params.format) + '\')).registerEvents(ad);' + '    ad.initAd(' + size[0] + ',' + size[1] + ',"",0,"","");';
};

var getOutstreamScript = function getOutstreamScript(bid) {
  var config = bid.params; // default placement if no placement is set

  if (!config.hasOwnProperty('domId') && !config.hasOwnProperty('auto') && !config.hasOwnProperty('p') && !config.hasOwnProperty('article')) {
    if (config.format === 'intext-roll') {
      config.iframeMode = 'dfp';
    } else {
      config.domId = 'freewheelssp_prebid_target';
    }
  }

  var script = 'var config = {' + '  preloadedVast:vast,' + '  ASLoader:new window.com.stickyadstv.tools.ASLoader(' + bid.params.zoneId + ', \'' + getComponentId(bid.params.format) + '\')';

  for (var key in config) {
    // dont' send format parameter
    // neither zone nor vastUrlParams value as Vast is already loaded
    if (config.hasOwnProperty(key) && key !== 'format' && key !== 'zone' && key !== 'zoneId' && key !== 'vastUrlParams') {
      script += ',' + key + ':"' + config[key] + '"';
    }
  }

  script += '};' + 'window.com.stickyadstv.' + getAPIName(bid.params.format) + '.start(config);';
  return script;
};

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['banner', 'video'],
  aliases: ['stickyadstv'],
  //  former name for freewheel-ssp

  /**
  * Determines whether or not the given bid request is valid.
  *
  * @param {object} bid The bid to validate.
  * @return boolean True if this is a valid bid, and false otherwise.
  */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.zoneId;
  },

  /**
  * Make a server request from the list of BidRequests.
  *
  * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
  * @return ServerRequest Info describing the request to the server.
  */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    // var currency = config.getConfig(currency);
    var currentBidRequest = bidRequests[0];

    if (bidRequests.length > 1) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"]('Prebid.JS - freewheel bid adapter: only one ad unit is required.');
    }

    var zone = currentBidRequest.params.zoneId;
    var timeInMillis = new Date().getTime();
    var keyCode = hashcode(zone + '' + timeInMillis);
    var requestParams = {
      reqType: 'AdsSetup',
      protocolVersion: '2.0',
      zoneId: zone,
      componentId: getComponentId(currentBidRequest.params.format),
      timestamp: timeInMillis,
      pKey: keyCode
    }; // Add GDPR flag and consent string

    if (bidderRequest.gdprConsent) {
      requestParams._fw_gdpr_consent = bidderRequest.gdprConsent.consentString;

      if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') {
        requestParams._fw_gdpr = bidderRequest.gdprConsent.gdprApplies;
      }
    }

    if (currentBidRequest.params.gdpr_consented_providers) {
      requestParams._fw_gdpr_consented_providers = currentBidRequest.params.gdpr_consented_providers;
    }

    var vastParams = currentBidRequest.params.vastUrlParams;

    if (_typeof(vastParams) === 'object') {
      for (var key in vastParams) {
        if (vastParams.hasOwnProperty(key)) {
          requestParams[key] = vastParams[key];
        }
      }
    }

    var location = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();

    if (isValidUrl(location)) {
      requestParams.loc = location;
    }

    var playerSize = getBiggerSize(currentBidRequest.sizes);

    if (playerSize[0] > 0 || playerSize[1] > 0) {
      requestParams.playerSize = playerSize[0] + 'x' + playerSize[1];
    }

    return {
      method: 'GET',
      url: FREEWHEEL_ADSSETUP,
      data: requestParams,
      bidRequest: currentBidRequest
    };
  },

  /**
  * Unpack the response from the server into a list of bids.
  *
  * @param {*} serverResponse A successful response from the server.
  * @param {object} request: the built request object containing the initial bidRequest.
  * @return {Bid[]} An array of bids which were nested inside the server.
  */
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidrequest = request.bidRequest;
    var playerSize = getBiggerSize(bidrequest.sizes);

    if (_typeof(serverResponse) == 'object' && typeof serverResponse.body == 'string') {
      serverResponse = serverResponse.body;
    }

    var xmlDoc;

    try {
      var parser = new DOMParser();
      xmlDoc = parser.parseFromString(serverResponse, 'application/xml');
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Prebid.js - ' + BIDDER_CODE + ' : ' + err);
      return;
    }

    var princingData = getPricing(xmlDoc);
    var creativeId = getCreativeId(xmlDoc);
    var topWin = getTopMostWindow();

    if (!topWin.freewheelssp_cache) {
      topWin.freewheelssp_cache = {};
    }

    topWin.freewheelssp_cache[bidrequest.adUnitCode] = serverResponse;
    var bidResponses = [];

    if (princingData.price) {
      var bidResponse = {
        requestId: bidrequest.bidId,
        cpm: princingData.price,
        width: playerSize[0],
        height: playerSize[1],
        creativeId: creativeId,
        currency: princingData.currency,
        netRevenue: true,
        ttl: 360
      };
      var mediaTypes = bidrequest.mediaTypes || {};

      if (mediaTypes.video) {
        // bidResponse.vastXml = serverResponse;
        bidResponse.mediaType = 'video';
        var blob = new Blob([serverResponse], {
          type: 'application/xml'
        });
        bidResponse.vastUrl = window.URL.createObjectURL(blob);
      } else {
        bidResponse.ad = formatAdHTML(bidrequest, playerSize);
      }

      bidResponses.push(bidResponse);
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.pixelEnabled) {
      return [{
        type: 'image',
        url: USER_SYNC_URL
      }];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[320]);