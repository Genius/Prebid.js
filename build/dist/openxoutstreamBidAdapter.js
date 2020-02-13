pbjsChunk([133],{

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(450);


/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);




var SUPPORTED_AD_TYPES = [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */]];
var BIDDER_CODE = 'openxoutstream';
var BIDDER_CONFIG = 'hb_pb_ym';
var BIDDER_VERSION = '1.0.0';
var CURRENCY = 'USD';
var NET_REVENUE = true;
var TIME_TO_LIVE = 300;
var YM_SCRIPT = "!function(e,t){if(void 0===t._ym){var a=Math.round(5*Math.random()/3)+'';t._ym='';var m=e.createElement('script');m.type='text/javascript',m.async=!0,m.src='//static.yieldmo.com/ym.'+a+'.js',(e.getElementsByTagName('head')[0]||e.getElementsByTagName('body')[0]).appendChild(m)}else t._ym instanceof String||void 0===t._ym.chkPls||t._ym.chkPls()}(document,window);";
var PLACEMENT_ID = '1986307928000988495';
var PUBLISHER_ID = '1986307525700126029';
var CR_ID = '2052941939925262540';
var AD_ID = '1991358644725162800';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: SUPPORTED_AD_TYPES,
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return !!(bidRequest.params.delDomain && bidRequest.params.unit);
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    if (bidRequests.length === 0) {
      return [];
    }

    var requests = [];
    bidRequests.forEach(function (bid) {
      requests.push(buildOXBannerRequest(bid, bidderRequest));
    });
    return requests;
  },
  interpretResponse: function interpretResponse(bid, serverResponse) {
    return handleVastResponse(bid, serverResponse.payload);
  }
};

function getViewportDimensions(isIfr) {
  var width;
  var height;
  var tWin = window;
  var body;

  if (isIfr) {
    var tDoc;

    try {
      tWin = window.top;
      tDoc = window.top.document;
    } catch (e) {
      return;
    }

    body = tDoc.body;
    width = tWin.innerWidth || docEl.clientWidth || body.clientWidth;
    height = tWin.innerHeight || docEl.clientHeight || body.clientHeight;
  } else {
    width = tWin.innerWidth || docEl.clientWidth;
    height = tWin.innerHeight || docEl.clientHeight;
  }

  return "".concat(width, "x").concat(height);
}

function buildCommonQueryParamsFromBids(bid, bidderRequest) {
  var isInIframe = __WEBPACK_IMPORTED_MODULE_2__src_utils__["inIframe"]();
  var defaultParams;
  var height = '184';
  var width = '414';
  var aus = '304x184%7C412x184%7C375x184%7C414x184';
  defaultParams = {
    ju: __WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig('pageUrl') || __WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowUrl"](),
    jr: __WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowReferrer"](),
    ch: document.charSet || document.characterSet,
    res: "".concat(screen.width, "x").concat(screen.height, "x").concat(screen.colorDepth),
    ifr: isInIframe,
    tz: new Date().getTimezoneOffset(),
    tws: getViewportDimensions(isInIframe),
    be: 1,
    bc: bid.params.bc || "".concat(BIDDER_CONFIG, "_").concat(BIDDER_VERSION),
    auid: bid.params.unit,
    dddid: bid.transactionId,
    openrtb: '%7B%22mimes%22%3A%5B%22video%2Fmp4%22%5D%7D',
    nocache: new Date().getTime(),
    vht: height,
    vwd: width,
    aus: aus
  };

  if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bidderRequest, 'gdprConsent')) {
    var gdprConsentConfig = bidderRequest.gdprConsent;

    if (gdprConsentConfig.consentString !== undefined) {
      defaultParams.gdpr_consent = gdprConsentConfig.consentString;
    }

    if (gdprConsentConfig.gdprApplies !== undefined) {
      defaultParams.gdpr = gdprConsentConfig.gdprApplies ? 1 : 0;
    }

    if (__WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig('consentManagement.cmpApi') === 'iab') {
      defaultParams.x_gdpr_f = 1;
    }
  }

  return defaultParams;
}

function buildOXBannerRequest(bid, bidderRequest) {
  var queryParams = buildCommonQueryParamsFromBids(bid, bidderRequest);

  if (bid.params.doNotTrack) {
    queryParams.ns = 1;
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig('coppa') === true || bid.params.coppa) {
    queryParams.tfcd = 1;
  }

  var url = "https://".concat(bid.params.delDomain, "/v/1.0/avjp");
  return {
    method: 'GET',
    url: url,
    data: queryParams,
    payload: {
      'bid': bid
    }
  };
}

function handleVastResponse(response, serverResponse) {
  var body = response.body;
  var bidResponses = [];

  if (response !== undefined && body.vastUrl !== '' && body.pub_rev && body.pub_rev > 0) {
    var openHtmlTag = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>';
    var closeHtmlTag = '</body></html>';
    var sdkScript = createSdkScript().outerHTML;
    var placementDiv = createPlacementDiv();
    placementDiv.dataset.pId = PUBLISHER_ID;
    var placementDivString = placementDiv.outerHTML;
    var adResponse = getTemplateAdResponse(body.vastUrl);
    var adResponseString = JSON.stringify(adResponse);
    var ymAdsScript = '<script type="text/javascript"> window.__ymAds =' + adResponseString + '</script>';
    var bidResponse = {};
    bidResponse.requestId = serverResponse.bid.bidId;
    bidResponse.bidderCode = BIDDER_CODE;
    bidResponse.netRevenue = NET_REVENUE;
    bidResponse.currency = CURRENCY;
    bidResponse.cpm = Number(body.pub_rev) / 1000;
    bidResponse.creativeId = body.adid;
    bidResponse.height = body.height;
    bidResponse.width = body.width;
    bidResponse.vastUrl = body.vastUrl;
    bidResponse.ttl = TIME_TO_LIVE;
    bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */];
    bidResponse.ad = openHtmlTag + placementDivString + ymAdsScript + sdkScript + closeHtmlTag;
    bidResponses.push(bidResponse);
  }

  return bidResponses;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec); // HELPER FUNCTIONS

function createSdkScript() {
  var script = document.createElement('script');
  script.innerHTML = YM_SCRIPT;
  return script;
}

function createPlacementDiv() {
  var div = document.createElement('div');
  div.id = "ym_".concat(PLACEMENT_ID);
  div.classList.add('ym');
  div.dataset.lfId = CR_ID;
  return div;
}
/**
 * Create a nativeplay template with the placement id and vastURL.
 * @param vastUrl
 */


var getTemplateAdResponse = function getTemplateAdResponse(vastUrl) {
  return {
    loader: 'openxoutstream',
    availability_zone: '',
    data: [{
      ads: [{
        actions: {},
        adv_id: AD_ID,
        configurables: {
          cta_button_copy: 'Learn More',
          vast_click_tracking: 'true',
          vast_url: vastUrl
        },
        cr_id: CR_ID
      }],
      column_count: 1,
      configs: {
        allowable_height: '248',
        header_copy: 'You May Like',
        ping: 'true'
      },
      creative_format_id: 40,
      css: '',
      placement_id: PLACEMENT_ID
    }],
    nc: 0
  };
};

/***/ })

},[449]);