pbjsChunk([190],{

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(479);


/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var BIDDER_CODE = 'komoona';
var ENDPOINT = 'https://bidder.komoona.com/v1/GetSBids';
var USYNCURL = 'https://s.komoona.com/sync/usync.html';
var spec = {
  code: BIDDER_CODE,

  /**
  * Determines whether or not the given bid request is valid. Valid bid request must have placementId and hbid
  *
  * @param {BidRequest} bid The bid params to validate.
  * @return boolean True if this is a valid bid, and false otherwise.
  */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.placementId && bid.params.hbid);
  },

  /**
  * Make a server request from the list of BidRequests.
  *
  * @param {validBidRequests[]} - an array of bids
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
    }); // Komoona server config

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

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](tags)) {
      payload = {
        bids: _toConsumableArray(tags),
        kbConf: kbConf
      };
    }

    return {
      method: 'POST',
      url: ENDPOINT,
      data: JSON.stringify(payload)
    };
  },

  /**
  * Unpack the response from the server into a list of bids.
  *
  * @param {*} response A successful response from the server.
  * @return {Bid[]} An array of bids which were nested inside the server.
  */
  interpretResponse: function interpretResponse(response, request) {
    var bidResponses = [];

    try {
      if (response.body && response.body.bids) {
        response.body.bids.forEach(function (bid) {
          // The bid ID. Used to tie this bid back to the request.
          bid.requestId = bid.uuid; // The creative payload of the returned bid.

          bid.ad = bid.creative;
          bidResponses.push(bid);
        });
      }
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
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

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[478]);