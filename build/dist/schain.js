pbjsChunk([113],{

/***/ 672:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(673);


/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["isSchainObjectValid"] = isSchainObjectValid;
/* harmony export (immutable) */ __webpack_exports__["isValidSchainConfig"] = isValidSchainConfig;
/* harmony export (immutable) */ __webpack_exports__["makeBidRequestsHook"] = makeBidRequestsHook;
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);


 // https://github.com/InteractiveAdvertisingBureau/openrtb/blob/master/supplychainobject.md

var schainErrorPrefix = 'Invalid schain object found: ';
var shouldBeAString = ' should be a string';
var shouldBeAnInteger = ' should be an Integer';
var shouldBeAnObject = ' should be an object';
var shouldBeAnArray = ' should be an Array';
var MODE = {
  STRICT: 'strict',
  RELAXED: 'relaxed',
  OFF: 'off'
};
var MODES = []; // an array of modes

Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["_each"])(MODE, function (mode) {
  return MODES.push(mode);
}); // validate the supply chain object


function isSchainObjectValid(schainObject, returnOnError) {
  var failPrefix = 'Detected something wrong within an schain config:';
  var failMsg = '';

  function appendFailMsg(msg) {
    failMsg += '\n' + msg;
  }

  function printFailMsg() {
    if (returnOnError === true) {
      Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"])(failPrefix, schainObject, failMsg);
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logWarn"])(failPrefix, schainObject, failMsg);
    }
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"])(schainObject)) {
    appendFailMsg("schain.config" + shouldBeAnObject);
    printFailMsg();
    if (returnOnError) return false;
  } // complete: Integer


  if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isNumber"])(schainObject.complete) || !Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isInteger"])(schainObject.complete)) {
    appendFailMsg("schain.config.complete" + shouldBeAnInteger);
  } // ver: String


  if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])(schainObject.ver)) {
    appendFailMsg("schain.config.ver" + shouldBeAString);
  } // ext: Object [optional]


  if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["hasOwn"])(schainObject, 'ext')) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"])(schainObject.ext)) {
      appendFailMsg("schain.config.ext" + shouldBeAnObject);
    }
  } // nodes: Array of objects


  if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isArray"])(schainObject.nodes)) {
    appendFailMsg("schain.config.nodes" + shouldBeAnArray);
    printFailMsg();
    if (returnOnError) return false;
  } else {
    schainObject.nodes.forEach(function (node, index) {
      // asi: String
      if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])(node.asi)) {
        appendFailMsg("schain.config.nodes[".concat(index, "].asi") + shouldBeAString);
      } // sid: String


      if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])(node.sid)) {
        appendFailMsg("schain.config.nodes[".concat(index, "].sid") + shouldBeAString);
      } // hp: Integer


      if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isNumber"])(node.hp) || !Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isInteger"])(node.hp)) {
        appendFailMsg("schain.config.nodes[".concat(index, "].hp") + shouldBeAnInteger);
      } // rid: String [Optional]


      if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["hasOwn"])(node, 'rid')) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])(node.rid)) {
          appendFailMsg("schain.config.nodes[".concat(index, "].rid") + shouldBeAString);
        }
      } // name: String [Optional]


      if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["hasOwn"])(node, 'name')) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])(node.name)) {
          appendFailMsg("schain.config.nodes[".concat(index, "].name") + shouldBeAString);
        }
      } // domain: String [Optional]


      if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["hasOwn"])(node, 'domain')) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])(node.domain)) {
          appendFailMsg("schain.config.nodes[".concat(index, "].domain") + shouldBeAString);
        }
      } // ext: Object [Optional]


      if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["hasOwn"])(node, 'ext')) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"])(node.ext)) {
          appendFailMsg("schain.config.nodes[".concat(index, "].ext") + shouldBeAnObject);
        }
      }
    });
  }

  if (failMsg.length > 0) {
    printFailMsg();

    if (returnOnError) {
      return false;
    }
  }

  return true;
}
function isValidSchainConfig(schainObject) {
  if (schainObject === undefined) {
    return false;
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"])(schainObject)) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"])(schainErrorPrefix + 'the following schain config will not be used as schain is not an object.', schainObject);
    return false;
  }

  return true;
}

function resolveSchainConfig(schainObject, bidder) {
  var mode = MODE.STRICT;

  if (isValidSchainConfig(schainObject)) {
    if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])(schainObject.validation) && MODES.indexOf(schainObject.validation) != -1) {
      mode = schainObject.validation;
    }

    if (mode === MODE.OFF) {
      // no need to validate
      return schainObject.config;
    } else {
      // if strict mode and config is invalid, reject config + throw error; otherwise allow config to go through
      if (isSchainObjectValid(schainObject.config, !!(mode === MODE.STRICT))) {
        return schainObject.config;
      } else {
        Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"])(schainErrorPrefix + "due to the 'strict' validation setting, this schain config will not be passed to bidder '".concat(bidder, "'.  See above error for details."));
      }
    }
  }

  return null;
}

function makeBidRequestsHook(fn, bidderRequests) {
  function getSchainForBidder(bidder) {
    var bidderSchain = bidderConfigs[bidder] && bidderConfigs[bidder].schain;
    return bidderSchain || globalSchainConfig;
  }

  var globalSchainConfig = __WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */].getConfig('schain');
  var bidderConfigs = __WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */].getBidderConfig();
  bidderRequests.forEach(function (bidderRequest) {
    var bidder = bidderRequest.bidderCode;
    var schainConfig = getSchainForBidder(bidder);
    bidderRequest.bids.forEach(function (bid) {
      var result = resolveSchainConfig(schainConfig, bidder);

      if (result) {
        bid.schain = result;
      }
    });
  });
  fn(bidderRequests);
}
function init() {
  __WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__["default"].makeBidRequests.after(makeBidRequestsHook);
}
init();

/***/ })

},[672]);