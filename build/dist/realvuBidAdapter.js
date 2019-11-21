pbjsChunk([82],{

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(301);


/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _adaptermanager = __webpack_require__(1);

var _adaptermanager2 = _interopRequireDefault(_adaptermanager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CONSTANTS = __webpack_require__(3);
var utils = __webpack_require__(0);
var adloader = __webpack_require__(5);
var bidmanager = __webpack_require__(2);
var bidfactory = __webpack_require__(4);
var Adapter = __webpack_require__(9)['default'];

var RealVuAdapter = function RealVuAdapter() {
  var baseAdapter = new Adapter('realvu');
  baseAdapter.callBids = function (params) {
    var pbids = params.bids;
    var boost_back = function boost_back() {
      var top1 = window;
      try {
        var wnd = window;
        while (top1 != top && typeof wnd.document != 'undefined') {
          top1 = wnd;
          wnd = wnd.parent;
        }
      } catch (e) {};
      top1.boost_fifo = top1.boost_fifo || [];
      top1.boost_fifo.push((function () {
        for (var i = 0; i < pbids.length; i++) {
          var bid_rq = pbids[i];
          var sizes = utils.parseSizesInput(bid_rq.sizes);
          top1.realvu_boost.addUnitById({
            partner_id: bid_rq.params.partnerId,
            unit_id: bid_rq.placementCode,
            callback: baseAdapter.boostCall,
            pbjs_bid: bid_rq,
            size: sizes[0],
            mode: 'kvp'
          });
        }
      }));
    };
    boost_back();
    adloader.loadScript('//ac.realvu.net/realvu_boost.js', null, 1);
  };

  baseAdapter.boostCall = function (rez) {
    var bid_request = rez.pin.pbjs_bid;
    var adap = new RvNuviadAdapter();
    adloader.loadScript(adap.buildCall(bid_request, rez.realvu));
  };

  var RvNuviadAdapter = function RvNuviadAdapter() {
    // let usersync = false;

    this.buildCall = function (bid, realvu) {
      // determine tag params
      var placementId = utils.getBidIdParameter('placementId', bid.params);
      var endPoint = '//ssp.nuviad.com/publishers?';

      endPoint = utils.tryAppendQueryString(endPoint, 'placementId', placementId);
      endPoint = utils.tryAppendQueryString(endPoint, 'realvu', realvu);
      endPoint = utils.tryAppendQueryString(endPoint, 'callback', 'pbjs.handleRvCallback');
      endPoint = utils.tryAppendQueryString(endPoint, 'bid_id', bid.bidId);

      var doc_url = utils.getTopWindowUrl();
      var doc_ref = utils.getTopWindowReferrer();

      endPoint = utils.tryAppendQueryString(endPoint, 'doc_url', doc_url);
      endPoint = utils.tryAppendQueryString(endPoint, 'doc_ref', doc_ref);
      // remove the trailing "&"
      if (endPoint.lastIndexOf('&') === endPoint.length - 1) {
        endPoint = endPoint.substring(0, endPoint.length - 1);
      }

      // @if NODE_ENV='debug'
      utils.logMessage('rv url: ' + endPoint);
      // @endif

      // append a timer here to track latency
      bid.startTime = new Date().getTime();

      return endPoint;
    };

    // expose the callback to the global object:
    pbjs.handleRvCallback = function (responseObj) {
      var bidCode = void 0;

      if (responseObj && responseObj.bid_id) {
        var id = responseObj.bid_id;
        var placementCode = '';
        var bidObj = utils.getBidRequest(id);
        if (bidObj) {
          bidCode = bidObj.bidder;
          placementCode = bidObj.placementCode;
          // set the status
          bidObj.status = CONSTANTS.STATUS.GOOD;
        }
        // @if NODE_ENV='debug'
        utils.logMessage('JSONP callback function called for ad ID: ' + id);
        // @endif
        var bid = void 0;
        if (responseObj.price !== 0) {
          // store bid response
          // let adId = responseObj.creative_id;
          bid = bidfactory.createBid(1, bidObj);
          // bid.creative_id = adId;
          bid.bidderCode = bidCode;
          bid.cpm = responseObj.price;
          bid.ad = responseObj.tag;
          bid.width = responseObj.width;
          bid.height = responseObj.height;
          // bid.dealId = responseObj.deal_id;
          bidmanager.addBidResponse(placementCode, bid);
        } else {
          // no bid
          var nobid = bidfactory.createBid(2, bidObj);
          nobid.bidderCode = bidCode;
          bidmanager.addBidResponse(placementCode, nobid);
        }
      } else {
        utils.logMessage('No prebid response for placement %%PLACEMENT%%');
      }
    };
  };
  // -copy/pasted appnexusBidAdapter
  return _extends(this, {
    callBids: baseAdapter.callBids,
    setBidderCode: baseAdapter.setBidderCode,
    boostCall: baseAdapter.boostCall
  });
};

_adaptermanager2['default'].registerBidAdapter(new RealVuAdapter(), 'realvu');

module.exports = RealVuAdapter;

/***/ })

},[300]);