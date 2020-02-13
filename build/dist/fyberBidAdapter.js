pbjsChunk([188],{

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(323);


/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config__ = __webpack_require__(3);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





/**
 * @type {{CODE: string, V: string, RECTANGLE_SIZE: {W: number, H: number}, SPOT_TYPES: {INTERSTITIAL: string, RECTANGLE: string, FLOATING: string, BANNER: string}, DISPLAY_AD: number, ENDPOINT_URL: string, EVENTS_ENDPOINT_URL: string, RESPONSE_HEADERS_NAME: {PRICING_VALUE: string, AD_H: string, AD_W: string}}}
 */

var CONSTANTS = {
  CODE: 'fyber',
  V: 'FY-JS-HB-PBJS-1.0',
  RECTANGLE_SIZE: {
    W: 300,
    H: 250
  },
  SPOT_TYPES: {
    INTERSTITIAL: 'interstitial',
    RECTANGLE: 'rectangle',
    FLOATING: 'floating',
    BANNER: 'banner'
  },
  DISPLAY_AD: 20,
  ENDPOINT_URL: '//ad-tag.inner-active.mobi/simpleM2M/requestJsonAd',
  EVENTS_ENDPOINT_URL: '//vast-events.inner-active.mobi/Event',
  RESPONSE_HEADERS_NAME: {
    PRICING_VALUE: 'X-IA-Pricing-Value',
    AD_H: 'X-IA-Ad-Height',
    AD_W: 'X-IA-Ad-Width',
    CREATIVE_ID: 'X-IA-Creative-ID',
    CURRENCY: 'X-IA-Pricing-Currency',
    TIMEOUT: 'X-IA-SESSION-TIMEOUT'
  }
};
/**
 * gloable util functions
 * @type {{defaultsQsParams: {v: (string|string), page: string, mw: boolean, hb: string}, stringToCamel: (function(*)), objectToCamel: (function(*=))}}
 */

var Helpers = {
  defaultsQsParams: {
    v: CONSTANTS.V,
    page: encodeURIComponent(Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"])()),
    mw: true,
    hb: 'prebidjs'
  },

  /**
   * Returns the ad HTML template
   * @param adHtml: string {ad server creative}
   * @param tracking: object {impressions, clicks}
   * @param bidParams: object
   * @returns {string}: create template
   */
  getAd: function getAd(adHtml, tracking, bidParams) {
    var impressionsHtml = '';

    if (tracking && Array.isArray(tracking.impressions)) {
      var impressions = tracking.impressions;
      impressions.push(Reporter.getEventUrl('HBPreBidImpression', bidParams, false));
      impressions.forEach(function (impression) {
        return impression && (impressionsHtml += Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["createTrackPixelHtml"])(impression));
      });
    }

    adHtml = impressionsHtml + adHtml.replace(/<a /g, '<a target="_blank" ');
    var clicks = tracking && Array.isArray(tracking.clicks) && tracking.clicks;

    if (clicks && Array.isArray(clicks)) {
      clicks.push(Reporter.getEventUrl('HBPreBidClick', bidParams, false));
    }

    var adTemplate = "\n      <html>\n        <head>\n            <script type='text/javascript'>inDapIF=true;</script>\n        </head>\n        <body style='margin : 0; padding: 0;'>\n            <div id=\"iaAdContainer\">".concat(adHtml, "</div>\n            <script type='text/javascript'>\n                var iaAdContainer = document.getElementById('iaAdContainer');\n                if(iaAdContainer){\n                    var clicks = '").concat(clicks, "';\n                    if(clicks){\n                      clicks = clicks.split(',');\n                      iaAdContainer.addEventListener('click', function onIaContainerClick(){\n                          clicks.forEach(function forEachClick(click){\n                              if(click){\n                                  (new Image(1,1)).src = encodeURI(click);\n                              }\n                          });\n                      });\n                    }\n                }\n            </script>\n        </body>\n      </html>");
    return adTemplate;
  },

  /**
  * Change string format from underscore to camelcase (e.g., APP_ID to appId)
  * @param {string} str
  * @return string
  */
  stringToCamel: function stringToCamel(str) {
    if (str.indexOf('_') === -1) {
      var first = str.charAt(0);

      if (first !== first.toLowerCase()) {
        str = str.toLowerCase();
      }

      return str;
    }

    str = str.toLowerCase();
    return str.replace(/(\_[a-z])/g, function ($1) {
      return $1.toUpperCase().replace('_', '');
    });
  },

  /**
  * Change all object keys string format from underscore to camelcase (e.g., {'APP_ID' : ...} to {'appId' : ...})
  * @param params: object
  * @returns object
  */
  objectToCamel: function objectToCamel(params) {
    var _this = this;

    Object.keys(params).forEach(function (key) {
      var keyCamelCase = _this.stringToCamel(key);

      if (keyCamelCase !== key) {
        params[keyCamelCase] = params[key];
        delete params[key];
      }
    });
    return params;
  },

  /**
   * @param {Object} params
   * @return {string} url
   */
  getEndpointUrl: function getEndpointUrl(params) {
    return params && params.qa && params.qa.url || Reporter.getPageProtocol() + CONSTANTS.ENDPOINT_URL;
  },

  /**
    * Adjust bid params to fyber-ad-server params
    * @param {Object} bid
    * @return {Object} bid
  */
  toBidParams: function toBidParams(bid) {
    var bidParamsWithCustomParams = _extends({}, bid.params, bid.params.customParams);

    delete bidParamsWithCustomParams.customParams;
    bid.params = this.objectToCamel(bidParamsWithCustomParams);
    return bid;
  },

  /**
   * Validate if response is valid
   * @param responseAsJson : object
   * @param headersData: {}
   * @returns {boolean}
   * @private
   */
  isValidBidResponse: function isValidBidResponse(responseAsJson, headersData) {
    return responseAsJson && responseAsJson.ad && responseAsJson.ad.html && headersData && headersData[CONSTANTS.RESPONSE_HEADERS_NAME.PRICING_VALUE] > 0;
  }
};
/**
 * Url generator - generates a request URL
 * @type {{defaultsParams: *, serverParamNameBySettingParamName: {referrer: string, keywords: string, appId: string, portal: string, age: string, gender: string, isSecured: (boolean|null)}, toServerParams: (function(*)), unwantedValues: *[], getUrlParams: (function(*=))}}
 */

var Url = {
  defaultsParams: _extends({}, Helpers.defaultsQsParams, {
    f: CONSTANTS.DISPLAY_AD,
    fs: false,
    ref: Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"])()
  }),
  serverParamNameBySettingParamName: {
    referrer: 'ref',
    keywords: 'k',
    appId: 'aid',
    portal: 'po',
    age: 'a',
    gender: 'g',
    gdprPrivacyConsent: 'gdpr_privacy_consent',
    consentString: 'consent_string',
    gdprConsentData: 'gdpr_consent_data'
  },
  unwantedValues: ['', null, undefined],

  /**
       * Maps publisher params to server params
       * @param params: object {k:v}
       * @returns object {k:v}
       */
  toServerParams: function toServerParams(params) {
    var serverParams = {};

    for (var paramName in params) {
      if (params.hasOwnProperty(paramName) && this.serverParamNameBySettingParamName.hasOwnProperty(paramName)) {
        serverParams[this.serverParamNameBySettingParamName[paramName]] = params[paramName];
      } else {
        serverParams[paramName] = params[paramName];
      }
    }

    serverParams.isSecured = Reporter.getPageProtocol() === 'https:' || null;
    return serverParams;
  },
  handleGDPR: function handleGDPR(params) {
    if (params.hasOwnProperty('gdprPrivacyConsent')) {
      if (['true', true, '1', 1].indexOf(params.gdprPrivacyConsent) !== -1) {
        params.gdprPrivacyConsent = 1;
      } else {
        params.gdprPrivacyConsent = 0;
      }
    }
  },

  /**
  * Prepare querty string to ad server
  * @param params: object {k:v}
  * @returns : object {k:v}
  */
  getUrlParams: function getUrlParams(params) {
    this.handleGDPR(params);
    var serverParams = this.toServerParams(params);

    var toQueryString = _extends({}, this.defaultsParams, serverParams);

    for (var paramName in toQueryString) {
      if (toQueryString.hasOwnProperty(paramName) && this.unwantedValues.indexOf(toQueryString[paramName]) !== -1) {
        delete toQueryString[paramName];
      }
    }

    toQueryString.fs = params.spotType === CONSTANTS.SPOT_TYPES.INTERSTITIAL;

    if (params.spotType === CONSTANTS.SPOT_TYPES.RECTANGLE) {
      toQueryString.rw = CONSTANTS.RECTANGLE_SIZE.W;
      toQueryString.rh = CONSTANTS.RECTANGLE_SIZE.H;
    }

    toQueryString.bco = __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('cbTimeout') || __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('bidderTimeout');
    toQueryString.timestamp = Date.now();
    delete toQueryString.qa;
    return toQueryString;
  }
};
/**
 * Analytics
 * @type {{errorEventName: string, pageProtocol: string, getPageProtocol: (function(): string), getEventUrl: (function(*, *=)), defaults: {v: (string|string), page: string, mw: boolean, hb: string}, eventQueryStringParams: (function(Object): string)}}
 */

var Reporter = {
  /**
  * @private
  */
  errorEventName: 'HBPreBidError',
  pageProtocol: '',
  defaults: Helpers.defaultsQsParams,

  /**
  * Gets the page protocol based on the <code>document.location.protocol</code>
  * The returned string is either <code>http://</code> or <code>https://</code>
  * @return {string}
  */
  getPageProtocol: function getPageProtocol() {
    if (!this.pageProtocol) {
      this.pageProtocol = Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"])().protocol === 'http:' ? 'http:' : 'https:';
    }

    return this.pageProtocol;
  },
  getEventUrl: function getEventUrl(evtName, extraDetails) {
    var eventsEndpoint = CONSTANTS.EVENTS_ENDPOINT_URL + '?table=' + (evtName === this.errorEventName ? 'mbwError' : 'mbwEvent');
    var queryStringParams = this.eventQueryStringParams(extraDetails);
    var appId = extraDetails && extraDetails.appId;
    var queryStringParamsWithAID = "".concat(queryStringParams, "&aid=").concat(appId, "_").concat(evtName, "_other&evtName=").concat(evtName);
    return eventsEndpoint + '&' + queryStringParamsWithAID;
  },

  /**
  * Fyber Event Reporting Query String Parameters, not including App Id.
  * @param {object} extraDetails - e.g., a JS exception JSON object.
  * @return {string} Fyber event contcatenated queryString parameters.
  */
  eventQueryStringParams: function eventQueryStringParams(extraDetails) {
    var toQS = _extends({}, this.defaults, {
      realAppId: extraDetails && extraDetails.appId,
      timestamp: Date.now()
    });

    Url.handleGDPR(toQS);
    return Object(__WEBPACK_IMPORTED_MODULE_2__src_url__["b" /* formatQS */])(toQS);
  }
};
var _CONSTANTS$RESPONSE_H = CONSTANTS.RESPONSE_HEADERS_NAME,
    PRICING_VALUE = _CONSTANTS$RESPONSE_H.PRICING_VALUE,
    AD_W = _CONSTANTS$RESPONSE_H.AD_W,
    AD_H = _CONSTANTS$RESPONSE_H.AD_H,
    CREATIVE_ID = _CONSTANTS$RESPONSE_H.CREATIVE_ID,
    CURRENCY = _CONSTANTS$RESPONSE_H.CURRENCY,
    TIMEOUT = _CONSTANTS$RESPONSE_H.TIMEOUT;
/**
 * Http helper to extract metadata
 * @type {{headers: *[], getBidHeaders: (function(*))}}
 */

var Http = {
  headerNames: [PRICING_VALUE, AD_W, AD_H, CREATIVE_ID, CURRENCY, TIMEOUT],

  /**
   * Extract headers data
   * @param responseHeaders: XMLHttpRequest
   * @return {}
   */
  getBidHeaders: function getBidHeaders(responseHeaders) {
    var headersData = {};
    this.headerNames.forEach(function (headerName) {
      return headersData[headerName] = responseHeaders.get(headerName);
    });
    return headersData;
  }
};
var bidByBidId = {};

var FyberBid =
/*#__PURE__*/
function () {
  function FyberBid(headersData, response, bid) {
    _classCallCheck(this, FyberBid);

    this.handleGDPR(response.config.tracking, bid.params);

    var _bid$sizes$ = _slicedToArray(bid.sizes[0], 2),
        w = _bid$sizes$[0],
        h = _bid$sizes$[1];

    this.cpm = (bid.params.qa && bid.params.qa.cpm || headersData[PRICING_VALUE]) * 1000;
    this.requestId = bid.bidId;
    this.width = parseFloat(headersData[AD_W]) || w;
    this.ad = Helpers.getAd(response.ad.html, response.config.tracking, bid.params);
    this.height = parseFloat(headersData[AD_H]) || h;
    this.creativeId = headersData[CREATIVE_ID];
    this.currency = headersData[CURRENCY] || 'USD';
    this.netRevenue = true;
    this.ttl = 60 * (headersData[TIMEOUT] || 20);
    this.dealId = null;
  }

  _createClass(FyberBid, [{
    key: "handleGDPR",
    value: function handleGDPR(tracking, params) {
      if (params.hasOwnProperty('gdprPrivacyConsent')) {
        if (['true', true, '1', 1].indexOf(params.gdprPrivacyConsent) !== -1) {
          params.gdprPrivacyConsent = 1;
        } else {
          params.gdprPrivacyConsent = 0;
        }

        Object.keys(tracking).forEach(function (trackName) {
          if (Array.isArray(tracking[trackName])) {
            tracking[trackName].forEach(function (url, index) {
              if (url) {
                if (url.indexOf('?') === -1) {
                  url += '?';
                }

                url += '&gdpr_privacy_consent=' + params.gdprPrivacyConsent;
                tracking[trackName][index] = url;
              }
            });
          }
        });
      }
    }
  }]);

  return FyberBid;
}();

var spec = {
  code: CONSTANTS.CODE,

  /**
   * Determines whether or not the given bid request is valid.
   * Valid bid request must have appId and spotType
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var _Helpers$objectToCame = Helpers.objectToCamel(bid.params),
        appId = _Helpers$objectToCame.appId,
        spotType = _Helpers$objectToCame.spotType;

    var isValid = !!(appId && spotType);

    if (!isValid) {
      Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"])("bid requires appId = ".concat(appId, " , spotType = ").concat(spotType));
    }

    return isValid;
  },
  buildRequests: function buildRequests(bidRequests) {
    var requests = [];
    bidRequests.forEach(function (bid) {
      bid = Helpers.toBidParams(bid);
      bidByBidId[bid.bidId] = bid;
      requests.push({
        method: 'GET',
        url: Helpers.getEndpointUrl(bid.params),
        data: Url.getUrlParams(bid.params),
        bidId: bid.bidId
      });
    });
    return requests;
  },
  interpretResponse: function interpretResponse(response, request) {
    var isValid = response.body && response.body.ad;
    var headersData = isValid && Http.getBidHeaders(response.headers) || {};
    var bid = bidByBidId[request.bidId];
    var bidResponse = [];

    if (!isValid || !Helpers.isValidBidResponse(response.body, headersData)) {
      Object(__WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"])("response failed for ".concat(CONSTANTS.CODE, " adapter"));
      return bidResponse;
    }

    bidResponse.push(new FyberBid(headersData, response.body, bid));
    return bidResponse;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[322]);