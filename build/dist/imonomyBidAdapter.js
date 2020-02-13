pbjsChunk([174],{

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(353);


/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



var BIDDER_CODE = 'imonomy';
var ENDPOINT = '//b.imonomy.com/openrtb/hb/00000';
var USYNCURL = '//b.imonomy.com/UserMatching/b/';
var spec = {
  code: BIDDER_CODE,

  /**
  * Determines whether or not the given bid request is valid. Valid bid request must have placementId and hbid
  *
  * @param {BidRequest} bid The bid params to validate.
  * @return {boolean} True if this is a valid bid, and false otherwise.
  */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.placementId && bid.params.hbid);
  },

  /**
  * Make a server request from the list of BidRequests.
  *
  * @param {BidRequest[]} validBidRequests an array of bids
  * @return ServerRequest Info describing the request to the server.
  */
  buildRequests: function buildRequests(validBidRequests) {
    var tags = validBidRequests.map(function (bid) {
      // map each bid id to bid object to retrieve adUnit code in callback
      var tag = {
        uuid: bid.bidId,
        sizes: bid.sizes,
        trid: bid.transactionId,
        hbid: bid.params.hbid,
        placementid: bid.params.placementId
      }; // add floor price if specified (not mandatory)

      if (bid.params.floorPrice) {
        tag.floorprice = bid.params.floorPrice;
      }

      return tag;
    }); // Imonomy server config

    var time = new Date().getTime();
    var kbConf = {
      ts_as: time,
      hb_placements: [],
      hb_placement_bidids: {},
      hb_floors: {},
      cb: _generateCb(time),
      tz: new Date().getTimezoneOffset()
    };
    validBidRequests.forEach(function (bid) {
      kbConf.hdbdid = kbConf.hdbdid || bid.params.hbid;
      kbConf.encode_bid = kbConf.encode_bid || bid.params.encode_bid;
      kbConf.hb_placement_bidids[bid.params.placementId] = bid.bidId;

      if (bid.params.floorPrice) {
        kbConf.hb_floors[bid.params.placementId] = bid.params.floorPrice;
      }

      kbConf.hb_placements.push(bid.params.placementId);
    });
    var payload = {};

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](tags)) {
      payload = {
        bids: _toConsumableArray(tags),
        kbConf: kbConf
      };
    }

    var endpointToUse = ENDPOINT;

    if (kbConf.hdbdid) {
      endpointToUse = endpointToUse.replace('00000', kbConf.hdbdid);
    }

    return {
      method: 'POST',
      url: endpointToUse,
      data: JSON.stringify(payload)
    };
  },

  /**
  * Unpack the response from the server into a list of bids.
  *
  * @param {*} response A successful response from the server.
  * @return {Bid[]} An array of bids which were nested inside the server.
  */
  interpretResponse: function interpretResponse(response) {
    var bidResponses = [];

    if (response && response.body && response.body.bids) {
      response.body.bids.forEach(function (bid) {
        // The bid ID. Used to tie this bid back to the request.
        if (bid.uuid) {
          bid.requestId = bid.uuid;
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('No uuid for bid');
        } // The creative payload of the returned bid.


        if (bid.creative) {
          bid.ad = bid.creative;
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('No creative for bid');
        }

        bidResponses.push(bid);
      });
    }

    return bidResponses;
  },

  /**
  * Register User Sync.
  */
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: USYNCURL
      }];
    }
  }
};
/**
* Generated cache baster value to be sent to bid server
* @param {*} time current time to use for creating cb.
*/

function _generateCb(time) {
  return Math.floor(time % 65536 + Math.floor(Math.random() * 65536) * 65536);
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[352]);