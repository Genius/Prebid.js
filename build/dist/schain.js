pbjsChunk([96],{

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(547);


/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["isSchainObjectValid"] = isSchainObjectValid;
/* harmony export (immutable) */ __webpack_exports__["copySchainObjectInAdunits"] = copySchainObjectInAdunits;
/* harmony export (immutable) */ __webpack_exports__["isValidSchainConfig"] = isValidSchainConfig;
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_prebidGlobal__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);


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

Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["_each"])(MODE, function (mode) {
  return MODES.push(mode);
}); // validate the supply chain object


function isSchainObjectValid(schainObject, returnOnError) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isPlainObject"])(schainObject)) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain" + shouldBeAnObject);
    if (returnOnError) return false;
  } // complete: Integer


  if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isNumber"])(schainObject.complete) || !Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isInteger"])(schainObject.complete)) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain.complete" + shouldBeAnInteger);
    if (returnOnError) return false;
  } // ver: String


  if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isStr"])(schainObject.ver)) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain.ver" + shouldBeAString);
    if (returnOnError) return false;
  } // ext: Object [optional]


  if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["hasOwn"])(schainObject, 'ext')) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isPlainObject"])(schainObject.ext)) {
      Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain.ext" + shouldBeAnObject);
      if (returnOnError) return false;
    }
  } // nodes: Array of objects


  var isEachNodeIsValid = true;

  if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"])(schainObject.nodes)) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain.nodes" + shouldBeAnArray);
    if (returnOnError) return false;
  } else {
    schainObject.nodes.forEach(function (node) {
      // asi: String
      if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isStr"])(node.asi)) {
        isEachNodeIsValid = isEachNodeIsValid && false;
        Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain.nodes[].asi" + shouldBeAString);
      } // sid: String


      if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isStr"])(node.sid)) {
        isEachNodeIsValid = isEachNodeIsValid && false;
        Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain.nodes[].sid" + shouldBeAString);
      } // hp: Integer


      if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isNumber"])(node.hp) || !Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isInteger"])(node.hp)) {
        isEachNodeIsValid = isEachNodeIsValid && false;
        Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain.nodes[].hp" + shouldBeAnInteger);
      } // rid: String [Optional]


      if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["hasOwn"])(node, 'rid')) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isStr"])(node.rid)) {
          isEachNodeIsValid = isEachNodeIsValid && false;
          Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain.nodes[].rid" + shouldBeAString);
        }
      } // name: String [Optional]


      if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["hasOwn"])(node, 'name')) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isStr"])(node.name)) {
          isEachNodeIsValid = isEachNodeIsValid && false;
          Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain.nodes[].name" + shouldBeAString);
        }
      } // domain: String [Optional]


      if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["hasOwn"])(node, 'domain')) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isStr"])(node.domain)) {
          isEachNodeIsValid = isEachNodeIsValid && false;
          Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain.nodes[].domain" + shouldBeAString);
        }
      } // ext: Object [Optional]


      if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["hasOwn"])(node, 'ext')) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isPlainObject"])(node.ext)) {
          isEachNodeIsValid = isEachNodeIsValid && false;
          Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + "schain.nodes[].ext" + shouldBeAnObject);
        }
      }
    });
  }

  if (returnOnError && !isEachNodeIsValid) {
    return false;
  }

  return true;
}
function copySchainObjectInAdunits(adUnits, schainObject) {
  // copy schain object in all adUnits as adUnits[].bid.schain
  adUnits.forEach(function (adUnit) {
    adUnit.bids.forEach(function (bid) {
      bid.schain = schainObject;
    });
  });
}
function isValidSchainConfig(schainObject) {
  if (schainObject === undefined) {
    return false;
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isPlainObject"])(schainObject)) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + 'schain config will not be passed to bidders as schain is not an object.');
    return false;
  }

  return true;
}
function init(config) {
  var mode = MODE.STRICT;
  Object(__WEBPACK_IMPORTED_MODULE_1__src_prebidGlobal__["a" /* getGlobal */])().requestBids.before(function (fn, reqBidsConfigObj) {
    var schainObject = config.getConfig('schain');

    if (isValidSchainConfig(schainObject)) {
      if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isStr"])(schainObject.validation) && MODES.indexOf(schainObject.validation) != -1) {
        mode = schainObject.validation;
      }

      if (mode === MODE.OFF) {
        // no need to validate
        copySchainObjectInAdunits(reqBidsConfigObj.adUnits || Object(__WEBPACK_IMPORTED_MODULE_1__src_prebidGlobal__["a" /* getGlobal */])().adUnits, schainObject.config);
      } else {
        if (isSchainObjectValid(schainObject.config, mode === MODE.STRICT)) {
          copySchainObjectInAdunits(reqBidsConfigObj.adUnits || Object(__WEBPACK_IMPORTED_MODULE_1__src_prebidGlobal__["a" /* getGlobal */])().adUnits, schainObject.config);
        } else {
          Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"])(schainErrorPrefix + 'schain config will not be passed to bidders as it is not valid.');
        }
      }
    } // calling fn allows prebid to continue processing


    return fn.call(this, reqBidsConfigObj);
  }, 40);
}
init(__WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */]);

/***/ })

},[546]);