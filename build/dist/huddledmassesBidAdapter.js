pbjsChunk([59],{

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(120);


/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _adapter = __webpack_require__(7);

var _adapter2 = _interopRequireDefault(_adapter);

var _bidfactory = __webpack_require__(3);

var _bidfactory2 = _interopRequireDefault(_bidfactory);

var _bidmanager = __webpack_require__(2);

var _bidmanager2 = _interopRequireDefault(_bidmanager);

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _ajax = __webpack_require__(6);

var _constants = __webpack_require__(4);

var _adaptermanager = __webpack_require__(1);

var _adaptermanager2 = _interopRequireDefault(_adaptermanager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var BIDDER_CODE = 'huddledmasses';

var sizeObj = {
  1: '468x60',
  2: '728x90',
  10: '300x600',
  15: '300x250',
  19: '300x100',
  43: '320x50',
  44: '300x50',
  48: '300x300',
  54: '300x1050',
  55: '970x90',
  57: '970x250',
  58: '1000x90',
  59: '320x80',
  65: '640x480',
  67: '320x480',
  72: '320x320',
  73: '320x160',
  83: '480x300',
  94: '970x310',
  96: '970x210',
  101: '480x320',
  102: '768x1024',
  113: '1000x300',
  117: '320x100',
  118: '800x250',
  119: '200x600'
};

utils._each(sizeObj, (function (item, key) {
  return sizeObj[item] = key;
}));

function HuddledMassesAdapter() {
  function _callBids(bidderRequest) {
    var bids = bidderRequest.bids || [];

    bids.forEach((function (bid) {
      function bidCallback(responseText) {
        try {
          utils.logMessage('XHR callback function called for ad ID: ' + bid.bidId);
          handleRpCB(responseText, bid);
        } catch (err) {
          if (typeof err === 'string') {
            utils.logWarn(err + ' when processing huddledmasses response for placement code ' + bid.placementCode);
          } else {
            utils.logError('Error processing huddledmasses response for placement code ' + bid.placementCode, null, err);
          }
          var badBid = _bidfactory2['default'].createBid(_constants.STATUS.NO_BID, bid);
          badBid.bidderCode = bid.bidder;
          badBid.error = err;
          _bidmanager2['default'].addBidResponse(bid.placementCode, badBid);
        }
      }

      try {
        (0, _ajax.ajax)(buildOptimizedCall(bid), bidCallback, undefined, { withCredentials: true });
      } catch (err) {
        utils.logError('Error sending huddledmasses request for placement code ' + bid.placementCode, null, err);
      }
    }));
  }

  function buildOptimizedCall(bid) {
    bid.startTime = new Date().getTime();

    var parsedSizes = HuddledMassesAdapter.masSizeOrdering(Array.isArray(bid.params.sizes) ? bid.params.sizes.map((function (size) {
      return (sizeObj[size] || '').split('x');
    })) : bid.sizes);

    if (parsedSizes.length < 1) {
      throw 'no valid sizes';
    }

    var secure = 0;
    var win;
    try {
      win = window.top;
    } catch (e) {
      win = window;
    }

    if (win.location.protocol !== 'http:') {
      secure = 1;
    }

    var host = win.location.host;
    var page = win.location.pathname;
    var language = navigator.language;
    var deviceWidth = win.screen.width;
    var deviceHeight = win.screen.height;

    var queryString = ['banner_id', bid.params.placement_id, 'size_ad', parsedSizes[0], 'alt_size_ad', parsedSizes.slice(1).join(',') || [], 'host', host, 'page', page, 'language', language, 'deviceWidth', deviceWidth, 'deviceHeight', deviceHeight, 'secure', secure, 'bidId', bid.bidId, 'checkOn', 'rf'];

    return queryString.reduce((function (memo, curr, index) {
      return index % 2 === 0 && queryString[index + 1] !== undefined ? memo + curr + '=' + encodeURIComponent(queryString[index + 1]) + '&' : memo;
    }), '//huddledmassessupply.com/?').slice(0, -1);
  }

  function handleRpCB(responseText, bidRequest) {
    var ad = JSON.parse(responseText);

    var bid = _bidfactory2['default'].createBid(_constants.STATUS.GOOD, bidRequest);
    bid.creative_id = ad.ad_id;
    bid.bidderCode = bidRequest.bidder;
    bid.cpm = ad.cpm || 0;
    bid.ad = ad.adm;
    bid.width = ad.width;
    bid.height = ad.height;
    bid.dealId = ad.deal;

    _bidmanager2['default'].addBidResponse(bidRequest.placementCode, bid);
  }

  return _extends(new _adapter2['default'](BIDDER_CODE), { // BIDDER_CODE huddledmasses
    callBids: _callBids
  });
}

HuddledMassesAdapter.masSizeOrdering = function (sizes) {
  var MAS_SIZE_PRIORITY = [15, 2, 9];
  return utils.parseSizesInput(sizes).reduce((function (result, size) {
    var mappedSize = parseInt(sizeObj[size], 10);
    if (mappedSize) {
      result.push(mappedSize);
    }
    return result;
  }), []).sort((function (first, second) {
    var firstPriority = MAS_SIZE_PRIORITY.indexOf(first);
    var secondPriority = MAS_SIZE_PRIORITY.indexOf(second);

    if (firstPriority > -1 || secondPriority > -1) {
      if (firstPriority === -1) {
        return 1;
      }
      if (secondPriority === -1) {
        return -1;
      }
      return firstPriority - secondPriority;
    }

    return first - second;
  }));
};

_adaptermanager2['default'].registerBidAdapter(new HuddledMassesAdapter(), 'huddledmasses');

module.exports = HuddledMassesAdapter;

/***/ })

},[119]);