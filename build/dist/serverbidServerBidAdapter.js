pbjsChunk([92],{

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(555);


/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapter__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_bidfactory__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapterManager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_constants__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__src_constants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_config__ = __webpack_require__(3);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var TYPE = __WEBPACK_IMPORTED_MODULE_4__src_constants__["S2S"].SRC;
var getConfig = __WEBPACK_IMPORTED_MODULE_5__src_config__["b" /* config */].getConfig;
var REQUIRED_S2S_CONFIG_KEYS = ['siteId', 'networkId', 'bidders'];

var _s2sConfig;

var bidder = 'serverbidServer';
var ServerBidServerAdapter;

ServerBidServerAdapter = function ServerBidServerAdapter() {
  var baseAdapter = new __WEBPACK_IMPORTED_MODULE_0__src_adapter__["a" /* default */]('serverbidServer');
  var BASE_URI = 'https://e.serverbid.com/api/v2';
  var sizeMap = [null, '120x90', '120x90', '468x60', '728x90', '300x250', '160x600', '120x600', '300x100', '180x150', '336x280', '240x400', '234x60', '88x31', '120x60', '120x240', '125x125', '220x250', '250x250', '250x90', '0x0', '200x90', '300x50', '320x50', '320x480', '185x185', '620x45', '300x125', '800x250'];
  sizeMap[77] = '970x90';
  sizeMap[123] = '970x250';
  sizeMap[43] = '300x600';

  function setS2sConfig(options) {
    if (options.adapter != bidder) return;

    var contains = function contains(xs, x) {
      return xs.indexOf(x) > -1;
    };

    var userConfig = Object.keys(options);
    REQUIRED_S2S_CONFIG_KEYS.forEach(function (key) {
      if (!contains(userConfig, key)) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"](key + ' missing in server to server config');
        return void 0; // void 0 to beat the linter
      }
    });
    _s2sConfig = options;
  }

  getConfig('s2sConfig', function (_ref) {
    var s2sConfig = _ref.s2sConfig;
    return setS2sConfig(s2sConfig);
  });

  function getLocalConfig() {
    return _s2sConfig || {};
  }

  function _convertFields(bid) {
    var safeBid = bid || {};
    var converted = {};
    var name = safeBid.bidder;
    converted[name] = safeBid.params;
    return converted;
  }

  baseAdapter.callBids = function (s2sBidRequest, bidRequests, addBidResponse, done, ajax) {
    var params = s2sBidRequest;

    var shouldDoWorkFn = function shouldDoWorkFn(bidRequest) {
      return bidRequest && bidRequest.ad_units && __WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](bidRequest.ad_units) && bidRequest.ad_units.length;
    };

    if (shouldDoWorkFn(params)) {
      _callBids(s2sBidRequest, bidRequests, addBidResponse, done, ajax);
    }
  };

  function _callBids(s2sBidRequest, bidRequests, addBidResponse, done, ajax) {
    var bidRequest = s2sBidRequest;
    var data = {
      placements: [],
      time: Date.now(),
      user: {},
      url: __WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowUrl"](),
      referrer: document.referrer,
      enableBotFiltering: true,
      includePricingData: true,
      parallel: true
    };
    var allBids = [];

    for (var i = 0; i < bidRequest.ad_units.length; i++) {
      var adunit = bidRequest.ad_units[i];
      var siteId = _s2sConfig.siteId;
      var networkId = getLocalConfig().networkId;
      var sizes = adunit.sizes;
      var bids = adunit.bids || []; // one placement for each of the bids

      for (var _i = 0; _i < bids.length; _i++) {
        var bid = bids[_i];
        bid.code = adunit.code;
        allBids.push(bid);

        var placement = _extends({}, {
          divName: bid.bid_id,
          networkId: networkId,
          siteId: siteId,
          adTypes: bid.adTypes || getSize(sizes),
          bidders: _convertFields(bid),
          skipSelection: true
        });

        if (placement.networkId && placement.siteId) {
          data.placements.push(placement);
        }
      }
    }

    if (data.placements.length) {
      ajax(BASE_URI, _responseCallback(addBidResponse, allBids, done), JSON.stringify(data), {
        method: 'POST',
        withCredentials: true,
        contentType: 'application/json'
      });
    }
  }

  function _responseCallback(addBidResponse, bids, done) {
    return function (resp) {
      var bid;
      var bidId;
      var result;
      var bidObj;
      var bidCode;
      var placementCode;

      var skipSelectionRequestsReturnArray = function skipSelectionRequestsReturnArray(decision) {
        return (decision || []).length ? decision[0] : {};
      };

      try {
        result = JSON.parse(resp);
      } catch (error) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"](error);
      }

      for (var i = 0; i < bids.length; i++) {
        bidObj = bids[i];
        bidId = bidObj.bid_id;
        bidObj.bidId = bidObj.bid_id;
        bidCode = bidObj.bidder;
        placementCode = bidObj.code;

        var noBid = function noBid(bidObj) {
          bid = Object(__WEBPACK_IMPORTED_MODULE_1__src_bidfactory__["a" /* createBid */])(__WEBPACK_IMPORTED_MODULE_4__src_constants__["STATUS"].NO_BID, bidObj);
          bid.bidderCode = bidCode;
          return bid;
        };

        if (result) {
          var decision = result.decisions && skipSelectionRequestsReturnArray(result.decisions[bidId]);
          var price = decision && decision.pricing && decision.pricing.clearPrice;

          if (decision && price) {
            bid = Object(__WEBPACK_IMPORTED_MODULE_1__src_bidfactory__["a" /* createBid */])(__WEBPACK_IMPORTED_MODULE_4__src_constants__["STATUS"].GOOD, bidObj);
            bid = _extends(bid, {
              bidderCode: bidCode,
              cpm: price,
              width: decision.width,
              height: decision.height,
              ad: retrieveAd(decision)
            });
          } else {
            bid = noBid(bidObj);
          }
        } else {
          bid = noBid(bidObj);
        }

        addBidResponse(placementCode, bid);
      }

      done();
    };
  }

  ;

  function retrieveAd(decision) {
    return decision.contents && decision.contents[0] && decision.contents[0].body + __WEBPACK_IMPORTED_MODULE_2__src_utils__["createTrackPixelHtml"](decision.impressionUrl);
  }

  function getSize(sizes) {
    var width = 'w';
    var height = 'h';
    var result = [];
    sizes.forEach(function (size) {
      var index = sizeMap.indexOf(size[width] + 'x' + size[height]);

      if (index >= 0) {
        result.push(index);
      }
    });
    return result;
  } // Export the `callBids` function, so that Prebid.js can execute
  // this function when the page asks to send out bid requests.


  return _extends(this, {
    queueSync: baseAdapter.queueSync,
    callBids: baseAdapter.callBids,
    setBidderCode: baseAdapter.setBidderCode,
    type: TYPE
  });
};

ServerBidServerAdapter.createNew = function () {
  return new ServerBidServerAdapter();
};

__WEBPACK_IMPORTED_MODULE_3__src_adapterManager__["default"].registerBidAdapter(new ServerBidServerAdapter(), bidder);
/* harmony default export */ __webpack_exports__["default"] = (ServerBidServerAdapter);

/***/ })

},[554]);