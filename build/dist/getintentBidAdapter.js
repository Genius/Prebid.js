pbjsChunk([63],{

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(112);


/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _constants = __webpack_require__(4);

var _adaptermanager = __webpack_require__(1);

var _adaptermanager2 = _interopRequireDefault(_adaptermanager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var bidfactory = __webpack_require__(3);
var bidmanager = __webpack_require__(2);
var adloader = __webpack_require__(5);

var GetIntentAdapter = function GetIntentAdapter() {
  var headerBiddingStaticJS = window.location.protocol + '//cdn.adhigh.net/adserver/hb.js';

  function _callBids(params) {
    if (typeof window.gi_hb === 'undefined') {
      adloader.loadScript(headerBiddingStaticJS, (function () {
        bid(params);
      }), true);
    } else {
      bid(params);
    }
  }

  function addOptional(params, request, props) {
    for (var i = 0; i < props.length; i++) {
      if (params.hasOwnProperty(props[i])) {
        request[props[i]] = params[props[i]];
      }
    }
  }

  function bid(params) {
    var bids = params.bids || [];
    for (var i = 0; i < bids.length; i++) {
      var bidRequest = bids[i];
      var request = {
        pid: bidRequest.params.pid, // required
        tid: bidRequest.params.tid, // required
        known: bidRequest.params.known || 1,
        is_video: bidRequest.mediaType === 'video',
        video: bidRequest.params.video || {},
        size: bidRequest.sizes[0].join('x')
      };
      addOptional(bidRequest.params, request, ['cur', 'floor']);
      (function (r, br) {
        window.gi_hb.makeBid(r, (function (bidResponse) {
          if (bidResponse.no_bid === 1) {
            var nobid = bidfactory.createBid(_constants.STATUS.NO_BID);
            nobid.bidderCode = br.bidder;
            bidmanager.addBidResponse(br.placementCode, nobid);
          } else {
            var bid = bidfactory.createBid(_constants.STATUS.GOOD);
            var size = bidResponse.size.split('x');
            bid.bidderCode = br.bidder;
            bid.cpm = bidResponse.cpm;
            bid.width = size[0];
            bid.height = size[1];
            if (br.mediaType === 'video') {
              bid.vastUrl = bidResponse.vast_url;
              bid.descriptionUrl = bidResponse.vast_url;
              bid.mediaType = 'video';
            } else {
              bid.ad = bidResponse.ad;
            }
            bidmanager.addBidResponse(br.placementCode, bid);
          }
        }));
      })(request, bidRequest);
    }
  }

  return {
    callBids: _callBids
  };
};

_adaptermanager2['default'].registerBidAdapter(new GetIntentAdapter(), 'getintent', {
  supportedMediaTypes: ['video']
});

module.exports = GetIntentAdapter;

/***/ })

},[111]);