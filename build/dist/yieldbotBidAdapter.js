pbjsChunk([45],{

/***/ 666:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(667);


/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YieldbotAdapter", function() { return YieldbotAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/**
 * @module {BidderSpec} YieldbotBidAdapter
 * @description Adapter for requesting bids from Yieldbot
 * @see BidderSpec
 * @author [elljoh]{@link https://github.com/elljoh}
 * @private
 */

var YieldbotAdapter = {
  _adapterLoaded: __WEBPACK_IMPORTED_MODULE_0__src_utils__["timestamp"](),
  _navigationStart: 0,
  _version: 'pbjs-yb-0.0.1',
  _bidRequestCount: 0,
  _pageviewDepth: 0,
  _lastPageviewId: '',
  _sessionBlocked: false,
  _isInitialized: false,
  _sessionTimeout: 180000,
  _userTimeout: 2592000000,
  _cookieLabels: ['n', 'u', 'si', 'pvd', 'lpv', 'lpvi', 'c'],
  initialize: function initialize() {
    if (!this._isInitialized) {
      this._pageviewDepth = this.pageviewDepth;
      this._sessionBlocked = this.sessionBlocked;
      this._isInitialized = true;
    }
  },

  /**
   * Adapter version
   * <code>pbjs-yb-x.x.x</code>
   * @returns {string} The adapter version string
   * @memberof module:YieldbotBidAdapter
   */
  get version() {
    return this._version;
  },

  /**
   * Is the user session blocked by the Yieldbot adserver.<br>
   * The Yieldbot adserver may return <code>"block_session": true</code> in a bid response.
   * A session may be blocked for efficiency (i.e. Yieldbot has decided no to bid for the session),
   * security and/or fraud detection.
   * @returns {boolean}
   * @readonly
   * @memberof module:YieldbotBidAdapter
   * @private
   */
  get sessionBlocked() {
    var cookieName = '__ybotn';
    var cookieValue = this.getCookie(cookieName);
    var sessionBlocked = cookieValue ? parseInt(cookieValue, 10) || 0 : 0;

    if (sessionBlocked) {
      this.setCookie(cookieName, 1, this._sessionTimeout, '/');
    }

    this._sessionBlocked = !!sessionBlocked;
    return this._sessionBlocked;
  },

  set sessionBlocked(blockSession) {
    var cookieName = '__ybotn';
    var sessionBlocked = blockSession ? 1 : 0;
    this.setCookie(cookieName, sessionBlocked, this._sessionTimeout, '/');
  },

  get userId() {
    var cookieName = '__ybotu';
    var cookieValue = this.getCookie(cookieName);

    if (!cookieValue) {
      cookieValue = this.newId();
      this.setCookie(cookieName, cookieValue, this._userTimeout, '/');
    }

    return cookieValue;
  },

  get sessionId() {
    var cookieName = '__ybotsi';
    var cookieValue = this.getCookie(cookieName);

    if (!cookieValue) {
      cookieValue = this.newId();
      this.setCookie(cookieName, cookieValue, this._sessionTimeout, '/');
    }

    return cookieValue;
  },

  get pageviewDepth() {
    var cookieName = '__ybotpvd';
    var cookieValue = parseInt(this.getCookie(cookieName), 10) || 0;
    cookieValue++;
    this.setCookie(cookieName, cookieValue, this._sessionTimeout, '/');
    return cookieValue;
  },

  get lastPageviewId() {
    var cookieName = '__ybotlpvi';
    var cookieValue = this.getCookie(cookieName);
    return cookieValue || '';
  },

  set lastPageviewId(id) {
    var cookieName = '__ybotlpvi';
    this.setCookie(cookieName, id, this._sessionTimeout, '/');
  },

  get lastPageviewTime() {
    var cookieName = '__ybotlpv';
    var cookieValue = this.getCookie(cookieName);
    return cookieValue ? parseInt(cookieValue, 10) : 0;
  },

  set lastPageviewTime(ts) {
    var cookieName = '__ybotlpv';
    this.setCookie(cookieName, ts, this._sessionTimeout, '/');
  },

  /**
   * Get/set the request base url used to form bid, ad markup and impression requests.
   * @param {string} [prefix] the bidder request base url
   * @returns {string} the request base Url string
   * @memberof module:YieldbotBidAdapter
   */
  urlPrefix: function urlPrefix(prefix) {
    var cookieName = '__ybotc';
    var pIdx = prefix ? prefix.indexOf(':') : -1;
    var url = pIdx !== -1 ? document.location.protocol + prefix.substr(pIdx + 1) : null;
    var cookieValue = url || this.getCookie(cookieName);

    if (!cookieValue) {
      cookieValue = '//i.yldbt.com/m/';
    }

    this.setCookie(cookieName, cookieValue, this._sessionTimeout, '/');
    return cookieValue;
  },

  /**
   * Bidder identifier code.
   * @type {string}
   * @constant
   * @memberof module:YieldbotBidAdapter
   */
  get code() {
    return 'yieldbot';
  },

  /**
   * A list of aliases which should also resolve to this bidder.
   * @type {string[]}
   * @constant
   * @memberof module:YieldbotBidAdapter
   */
  get aliases() {
    return [];
  },

  /**
   * @property {MediaType[]} [supportedMediaTypes]: A list of Media Types which the adapter supports.
   * @constant
   * @memberof module:YieldbotBidAdapter
   */
  get supportedMediaTypes() {
    return ['banner'];
  },

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @returns {boolean} True if this is a valid bid, and false otherwise.
   * @memberof module:YieldbotBidAdapter
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var invalidSizeArray = false;

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bid.sizes)) {
      var arr = bid.sizes.reduce(function (acc, cur) {
        return acc.concat(cur);
      }, []).filter(function (item) {
        return !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isNumber"](item);
      });
      invalidSizeArray = arr.length !== 0;
    }

    var ret = bid && bid.params && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](bid.params.psn) && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](bid.params.slot) && !invalidSizeArray && !!bid.params.psn && !!bid.params.slot;
    return ret;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   * @memberof module:YieldbotBidAdapter
   */
  buildRequests: function buildRequests(bidRequests) {
    var requests = [];

    if (!this._optOut && !this.sessionBlocked) {
      var searchParams = this.initBidRequestParams();
      this._bidRequestCount++;
      var pageviewIdToMap = searchParams['pvi'];
      var yieldbotSlotParams = this.getSlotRequestParams(pageviewIdToMap, bidRequests);
      searchParams['sn'] = yieldbotSlotParams['sn'] || '';
      searchParams['ssz'] = yieldbotSlotParams['ssz'] || '';
      var bidUrl = this.urlPrefix() + yieldbotSlotParams.psn + '/v1/init';
      searchParams['cts_ini'] = __WEBPACK_IMPORTED_MODULE_0__src_utils__["timestamp"]();
      requests.push({
        method: 'GET',
        url: bidUrl,
        data: searchParams,
        yieldbotSlotParams: yieldbotSlotParams,
        options: {
          withCredentials: true,
          customHeaders: {
            Accept: 'application/json'
          }
        }
      });
    }

    return requests;
  },

  /**
   * Register the user sync pixels which should be dropped after the auction.
   *
   * @param {SyncOptions} syncOptions Which user syncs are allowed?
   * @param {ServerResponse[]} serverResponses List of server's responses.
   * @return {UserSync[]} The user syncs which should be dropped.
   * @memberof module:YieldbotBidAdapter
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var userSyncs = [];

    if (syncOptions.pixelEnabled && serverResponses.length > 0 && serverResponses[0].body && serverResponses[0].body.user_syncs && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](serverResponses[0].body.user_syncs)) {
      var responseUserSyncs = serverResponses[0].body.user_syncs;
      responseUserSyncs.forEach(function (pixel) {
        userSyncs.push({
          type: 'image',
          url: pixel
        });
      });
    }

    return userSyncs;
  },

  /**
   * @typeDef {YieldbotBid} YieldbotBid
   * @type {object}
   * @property {string} slot Yieldbot config param slot
   * @property {string} cpm Yieldbot bid quantity/label
   * @property {string} size Slot dimensions of the form <code>&lt;width&gt;x&lt;height&gt;</code>
   * @memberof module:YieldbotBidAdapter
   */

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @param {BidRequest} bidRequest Request object submitted which produced the response.
   * @return {Bid[]} An array of bids which were nested inside the server.
   * @memberof module:YieldbotBidAdapter
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var _this = this;

    var bidResponses = [];
    var responseBody = serverResponse && serverResponse.body ? serverResponse.body : {};
    this._optOut = responseBody.optout || false;

    if (this._optOut) {
      this.clearAllCookies();
    }

    if (!this._optOut && !this._sessionBlocked) {
      var slotBids = responseBody.slots && responseBody.slots.length > 0 ? responseBody.slots : [];
      slotBids.forEach(function (bid) {
        if (bid.slot && bid.size && bid.cpm) {
          var sizeParts = bid.size ? bid.size.split('x') : [1, 1];
          var width = sizeParts[0] || 1;
          var height = sizeParts[1] || 1;
          var cpm = parseInt(bid.cpm, 10) / 100.0 || 0;
          var yieldbotSlotParams = bidRequest.yieldbotSlotParams || null;
          var ybBidId = bidRequest.data['pvi'];
          var paramKey = "".concat(ybBidId, ":").concat(bid.slot, ":").concat(bid.size || '');
          var bidIdMap = yieldbotSlotParams && yieldbotSlotParams.bidIdMap ? yieldbotSlotParams.bidIdMap : {};
          var requestId = bidIdMap[paramKey] || '';

          var urlPrefix = _this.urlPrefix(responseBody.url_prefix);

          var tagObject = _this.buildAdCreativeTag(urlPrefix, bid, bidRequest);

          var bidResponse = {
            requestId: requestId,
            cpm: cpm,
            width: width,
            height: height,
            creativeId: tagObject.creativeId,
            currency: 'USD',
            netRevenue: true,
            ttl: _this._sessionTimeout / 1000,
            // [s]
            ad: tagObject.ad
          };
          bidResponses.push(bidResponse);
        }
      });
    }

    return bidResponses;
  },

  /**
   * Initializes search parameters common to both ad request and impression Urls.
   * @param {string} adRequestId Yieldbot ad request identifier
   * @param {BidRequest} bidRequest The request that is the source of the impression
   * @returns {object} Search parameter key/value pairs
   * @memberof module:YieldbotBidAdapter
   */
  initAdRequestParams: function initAdRequestParams(adRequestId, bidRequest) {
    var commonSearchParams = {};
    commonSearchParams['v'] = this._version;
    commonSearchParams['vi'] = bidRequest.data.vi || this._version + '-vi';
    commonSearchParams['si'] = bidRequest.data.si || this._version + '-si';
    commonSearchParams['pvi'] = bidRequest.data.pvi || this._version + '-pvi';
    commonSearchParams['ri'] = adRequestId;
    return commonSearchParams;
  },
  buildAdUrl: function buildAdUrl(urlPrefix, publisherNumber, commonSearchParams, bid) {
    var searchParams = _extends({}, commonSearchParams);

    searchParams['cts_res'] = __WEBPACK_IMPORTED_MODULE_0__src_utils__["timestamp"]();
    searchParams['slot'] = bid.slot + ':' + bid.size;
    searchParams['ioa'] = this.intersectionObserverAvailable(window);
    var queryString = Object(__WEBPACK_IMPORTED_MODULE_1__src_url__["b" /* formatQS */])(searchParams) || '';
    var adUrl = urlPrefix + publisherNumber + '/ad/creative.js?' + queryString;
    return adUrl;
  },
  buildImpressionUrl: function buildImpressionUrl(urlPrefix, publisherNumber, commonSearchParams) {
    var searchParams = _extends({}, commonSearchParams);

    var queryString = Object(__WEBPACK_IMPORTED_MODULE_1__src_url__["b" /* formatQS */])(searchParams) || '';
    var impressionUrl = urlPrefix + publisherNumber + '/ad/impression.gif?' + queryString;
    return impressionUrl;
  },

  /**
   * Object with Yieldbot ad markup representation and unique creative identifier.
   * @typeDef {TagObject} TagObject
   * @type {object}
   * @property {string} creativeId bidder specific creative identifier for tracking at the source
   * @property {string} ad ad creative markup
   * @memberof module:YieldbotBidAdapter
   */

  /**
   * Builds the ad creative markup.
   * @param {string} urlPrefix base url for Yieldbot requests
   * @param {module:YieldbotBidAdapter.YieldbotBid} bid Bidder slot bid object
   * @returns {module:YieldbotBidAdapter.TagObject}
   * @memberof module:YieldbotBidAdapter
   */
  buildAdCreativeTag: function buildAdCreativeTag(urlPrefix, bid, bidRequest) {
    var ybotAdRequestId = this.newId();
    var commonSearchParams = this.initAdRequestParams(ybotAdRequestId, bidRequest);
    var publisherNumber = bidRequest && bidRequest.yieldbotSlotParams ? bidRequest.yieldbotSlotParams.psn || '' : '';
    var adUrl = this.buildAdUrl(urlPrefix, publisherNumber, commonSearchParams, bid);
    var impressionUrl = this.buildImpressionUrl(urlPrefix, publisherNumber, commonSearchParams);
    var htmlMarkup = "<div id=\"ybot-".concat(ybotAdRequestId, "\"></div><script type=\"text/javascript\">var yieldbot={iframeType:function(win){var it='none';while(win !== window.top){try{win=win.parent;var doc=win.document;it=doc?'so':'co';}catch(e){it='co';}}return it;},'_render':function(data){try{yieldbot['cts_rend_'+'").concat(ybotAdRequestId, "']=(new Date()).getTime();var bodyHtml=data.html,width=data.size[0]||0,height=data.size[1]||0,divEl=document.createElement('div');divEl.style.width=width+'px';divEl.style.height=height+'px';divEl.className='ybot-creativecreative-wrapper';var containerEl=document.getElementById(data.wrapper_id||'ybot-'+data.request_id);containerEl.appendChild(divEl);var iframeHtml='<!DOCTYPE html><head><meta charset=utf-8><style>'+data.style+'</style></head><body>'+data.html+'</body>',innerFrame=document.createElement('iframe');innerFrame.width=width;innerFrame.height=height;innerFrame.scrolling='no';innerFrame.marginWidth='0';innerFrame.marginHeight='0';innerFrame.frameBorder='0';innerFrame.style.border='0px';innerFrame.style['vertical-align']='bottom';innerFrame.id='ybot-'+data.request_id+'-iframe';divEl.appendChild(innerFrame);var innerFrameDoc=innerFrame.contentWindow.document;innerFrameDoc.write(iframeHtml);innerFrameDoc.close();var image=new Image(1,1);image.onload=function(){};var cts_rend=yieldbot['cts_rend_'+'").concat(ybotAdRequestId, "']||0;image.src='").concat(impressionUrl, "'+'&cts_imp='+(new Date()).getTime()+'&cts_rend='+cts_rend+'&e';}catch(err){}}};</script><script type=\"text/javascript\">var jsEl=document.createElement('script');var src='").concat(adUrl, "'+'&it='+yieldbot.iframeType(window)+'&cts_ad='+(new Date()).getTime()+'&e';jsEl.src=src;var firstEl=document.getElementsByTagName('script')[0];firstEl.parentNode.insertBefore(jsEl,firstEl);</script>");
    return {
      ad: htmlMarkup,
      creativeId: ybotAdRequestId
    };
  },
  intersectionObserverAvailable: function intersectionObserverAvailable(win) {
    /* Ref:
     * https://github.com/w3c/IntersectionObserver/blob/gh-pages/polyfill/intersection-observer.js#L23-L25
     */
    return win && win.IntersectionObserver && win.IntersectionObserverEntry && win.IntersectionObserverEntry.prototype && 'intersectionRatio' in win.IntersectionObserverEntry.prototype;
  },

  /**
   * @typeDef {BidParams} BidParams
   * @property {string} psn Yieldbot publisher customer number
   * @property {object} searchParams bid request Url search parameters
   * @property {object} searchParams.sn slot names
   * @property {object} searchParams.szz slot sizes
   * @memberof module:YieldbotBidAdapter
   * @private
   */

  /**
   * Builds the common Yieldbot bid request Url query parameters.<br>
   * Slot bid related parameters are handled separately. The so-called common parameters
   * here are request identifiers, page properties and user-agent attributes.
   * @returns {object} query parameter key/value items
   * @memberof module:YieldbotBidAdapter
   */
  initBidRequestParams: function initBidRequestParams() {
    var params = {};
    params['cts_js'] = this._adapterLoaded;
    params['cts_ns'] = this._navigationStart;
    params['v'] = this._version;
    var userId = this.userId;
    var sessionId = this.sessionId;
    var pageviewId = this.newId();
    var currentBidTime = __WEBPACK_IMPORTED_MODULE_0__src_utils__["timestamp"]();
    var lastBidTime = this.lastPageviewTime;
    var lastBidId = this.lastPageviewId;
    this.lastPageviewTime = currentBidTime;
    this.lastPageviewId = pageviewId;
    params['vi'] = userId;
    params['si'] = sessionId;
    params['pvd'] = this._pageviewDepth;
    params['pvi'] = pageviewId;
    params['lpv'] = lastBidTime;
    params['lpvi'] = lastBidId;
    params['bt'] = this._bidRequestCount === 0 ? 'init' : 'refresh';
    params['ua'] = navigator.userAgent;
    params['np'] = navigator.platform;
    params['la'] = navigator.browserLanguage ? navigator.browserLanguage : navigator.language;
    params['to'] = new Date().getTimezoneOffset() / 60;
    params['sd'] = window.screen.width + 'x' + window.screen.height;
    params['lo'] = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
    params['r'] = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"]();
    params['e'] = '';
    return params;
  },

  /**
   * Bid mapping key to the Prebid internal bidRequestId<br>
   * Format <code>{pageview id}:{slot name}:{width}x{height}</code>
   * @typeDef {BidRequestKey} BidRequestKey
   * @type {string}
   * @example "jbgxsxqxyxvqm2oud7:leaderboard:728x90"
   * @memberof module:YieldbotBidAdapter
   */

  /**
   * Internal Yieldbot adapter bid and ad markup request state
   * <br>
   * When interpreting a server response, the associated requestId is lookeded up
   * in this map when creating a {@link Bid} response object.
   * @typeDef {BidRequestMapping} BidRequestMapping
   * @type {object}
   * @property {Object.<module:YieldbotBidAdapter.BidRequestKey, string>} {*} Yieldbot bid to requestId mapping item
   * @memberof module:YieldbotBidAdapter
   * @example
   * {
   *   "jbgxsxqxyxvqm2oud7:leaderboard:728x90": "2b7e31676ce17",
   *   "jbgxsxqxyxvqm2oud7:medrec:300x250": "2b7e31676cd89",
   *   "jcrvvd6eoileb8w8ko:medrec:300x250": "2b7e316788ca7"
   * }
   * @memberof module:YieldbotBidAdapter
   */

  /**
   * Rationalized set of Yieldbot bids for adUnits and mapping to respective Prebid.js bidId.
   * @typeDef {BidSlots} BidSlots
   * @property {string} psn Yieldbot publisher site identifier taken from bidder params
   * @property {string} sn slot names
   * @property {string} szz slot sizes
   * @property {module:YieldbotBidAdapter.BidRequestMapping} bidIdMap Yieldbot bid to Prebid bidId mapping
   * @memberof module:YieldbotBidAdapter
   */

  /**
   * Gets unique slot name and sizes for query parameters object
   * @param {string} pageviewId The Yieldbot bid request identifier
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server
   * @returns {module:YieldbotBidAdapter.BidSlots} Yieldbot specific bid parameters and bid identifier mapping
   * @memberof module:YieldbotBidAdapter
   */
  getSlotRequestParams: function getSlotRequestParams(pageviewId, bidRequests) {
    var params = {};
    var bidIdMap = {};
    bidRequests = bidRequests || [];
    pageviewId = pageviewId || '';

    try {
      var slotBids = {};
      bidRequests.forEach(function (bid) {
        params.psn = params.psn || bid.params.psn || '';
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bid.sizes).forEach(function (sz) {
          var slotName = bid.params.slot;

          if (sz && (!slotBids[slotName] || !slotBids[slotName].some(function (existingSize) {
            return existingSize === sz;
          }))) {
            slotBids[slotName] = slotBids[slotName] || [];
            slotBids[slotName].push(sz);
            var paramKey = pageviewId + ':' + slotName + ':' + sz;
            bidIdMap[paramKey] = bid.bidId;
          }
        });
      });
      var nm = [];
      var sz = [];

      for (var idx in slotBids) {
        var slotName = idx;
        var slotSizes = slotBids[idx];
        nm.push(slotName);
        sz.push(slotSizes.join('.'));
      }

      params['sn'] = nm.join('|');
      params['ssz'] = sz.join('|');
      params.bidIdMap = bidIdMap;
    } catch (err) {}

    return params;
  },
  getCookie: function getCookie(name) {
    var cookies = document.cookie.split(';');
    var value = null;

    for (var idx = 0; idx < cookies.length; idx++) {
      var item = cookies[idx].split('=');
      var itemName = item[0].replace(/^\s+|\s+$/g, '');

      if (itemName == name) {
        value = item.length > 1 ? decodeURIComponent(item[1].replace(/^\s+|\s+$/g, '')) : null;
        break;
      }
    }

    return value;
  },
  setCookie: function setCookie(name, value, expireMillis, path, domain, secure) {
    var dataValue = encodeURIComponent(value);
    var cookieStr = name + '=' + dataValue + (expireMillis ? ';expires=' + new Date(__WEBPACK_IMPORTED_MODULE_0__src_utils__["timestamp"]() + expireMillis).toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
    document.cookie = cookieStr;
  },
  deleteCookie: function deleteCookie(name, path, domain, secure) {
    return this.setCookie(name, '', -1, path, domain, secure);
  },

  /**
   * Clear all first-party cookies.
   */
  clearAllCookies: function clearAllCookies() {
    var labels = this._cookieLabels;

    for (var idx = 0; idx < labels.length; idx++) {
      var label = '__ybot' + labels[idx];
      this.deleteCookie(label);
    }
  },

  /**
   * Generate a new Yieldbot format id<br>
   * Base 36 and lowercase: <[ms] since epoch><[base36]{10}>
   * @example "jbgxsyrlx9fxnr1hbl"
   * @private
   */
  newId: function newId() {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils__["timestamp"]().toString(36) + 'xxxxxxxxxx'.replace(/[x]/g, function () {
      return (0 | Math.random() * 36).toString(36);
    });
  },

  /**
   * Create a delegate function with 'this' context of the YieldbotAdapter object.
   * @param {object} instance Object for 'this' context in function apply
   * @param {function} fn Function to execute in instance context
   * @returns {function} the provided function bound to the instance context
   * @memberof module:YieldbotBidAdapter
   */
  createDelegate: function createDelegate(instance, fn) {
    var outerArgs = Array.prototype.slice.call(arguments, 2);
    return function () {
      return fn.apply(instance, outerArgs.length > 0 ? Array.prototype.slice.call(arguments, 0).concat(outerArgs) : arguments);
    };
  }
};
YieldbotAdapter.initialize();
var spec = {
  code: YieldbotAdapter.code,
  aliases: YieldbotAdapter.aliases,
  supportedMediaTypes: YieldbotAdapter.supportedMediaTypes,
  isBidRequestValid: YieldbotAdapter.createDelegate(YieldbotAdapter, YieldbotAdapter.isBidRequestValid),
  buildRequests: YieldbotAdapter.createDelegate(YieldbotAdapter, YieldbotAdapter.buildRequests),
  interpretResponse: YieldbotAdapter.createDelegate(YieldbotAdapter, YieldbotAdapter.interpretResponse),
  getUserSyncs: YieldbotAdapter.createDelegate(YieldbotAdapter, YieldbotAdapter.getUserSyncs)
};
YieldbotAdapter._navigationStart = __WEBPACK_IMPORTED_MODULE_0__src_utils__["timestamp"]();
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[666]);