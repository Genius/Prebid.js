pbjsChunk([89],{

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(409);


/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setStorageItem"] = setStorageItem;
/* harmony export (immutable) */ __webpack_exports__["getStorageItem"] = getStorageItem;
/* harmony export (immutable) */ __webpack_exports__["removeStorageItem"] = removeStorageItem;
/* harmony export (immutable) */ __webpack_exports__["isPubcidEnabled"] = isPubcidEnabled;
/* harmony export (immutable) */ __webpack_exports__["getExpInterval"] = getExpInterval;
/* harmony export (immutable) */ __webpack_exports__["getPubcidConfig"] = getPubcidConfig;
/* harmony export (immutable) */ __webpack_exports__["requestBidHook"] = requestBidHook;
/* harmony export (immutable) */ __webpack_exports__["setCookie"] = setCookie;
/* harmony export (immutable) */ __webpack_exports__["getCookie"] = getCookie;
/* harmony export (immutable) */ __webpack_exports__["setConfig"] = setConfig;
/* harmony export (immutable) */ __webpack_exports__["initPubcid"] = initPubcid;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_events__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__src_constants_json__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * This modules adds Publisher Common ID support to prebid.js.  It's a simple numeric id
 * stored in the page's domain.  When the module is included, an id is generated if needed,
 * persisted as a cookie, and automatically appended to all the bidRequest as bid.crumbs.pubcid.
 */





var ID_NAME = '_pubcid';
var OPTOUT_NAME = '_pubcid_optout';
var DEFAULT_EXPIRES = 525600; // 1-year worth of minutes

var PUB_COMMON = 'PublisherCommonId';
var EXP_SUFFIX = '_exp';
var COOKIE = 'cookie';
var LOCAL_STORAGE = 'html5';
var pubcidConfig = {
  enabled: true,
  interval: DEFAULT_EXPIRES,
  typeEnabled: LOCAL_STORAGE,
  create: true,
  extend: true,
  pixelUrl: ''
};
/**
 * Set an item in the storage with expiry time.
 * @param {string} key Key of the item to be stored
 * @param {string} val Value of the item to be stored
 * @param {number} expires Expiry time in minutes
 */

function setStorageItem(key, val, expires) {
  try {
    if (expires !== undefined && expires != null) {
      var expStr = new Date(Date.now() + expires * 60 * 1000).toUTCString();
      localStorage.setItem(key + EXP_SUFFIX, expStr);
    }

    localStorage.setItem(key, val);
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"](e);
  }
}
/**
 * Retrieve an item from storage if it exists and hasn't expired.
 * @param {string} key Key of the item.
 * @returns {string|null} Value of the item.
 */

function getStorageItem(key) {
  var val = null;

  try {
    var expVal = localStorage.getItem(key + EXP_SUFFIX);

    if (!expVal) {
      // If there is no expiry time, then just return the item
      val = localStorage.getItem(key);
    } else {
      // Only return the item if it hasn't expired yet.
      // Otherwise delete the item.
      var expDate = new Date(expVal);
      var isValid = expDate.getTime() - Date.now() > 0;

      if (isValid) {
        val = localStorage.getItem(key);
      } else {
        removeStorageItem(key);
      }
    }
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"](e);
  }

  return val;
}
/**
 * Remove an item from storage
 * @param {string} key Key of the item to be removed
 */

function removeStorageItem(key) {
  try {
    localStorage.removeItem(key + EXP_SUFFIX);
    localStorage.removeItem(key);
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"](e);
  }
}
/**
 * Read a value either from cookie or local storage
 * @param {string} name Name of the item
 * @param {string} type storage type override
 * @returns {string|null} a string if item exists
 */

function readValue(name, type) {
  var value;

  if (!type) {
    type = pubcidConfig.typeEnabled;
  }

  if (type === COOKIE) {
    value = getCookie(name);
  } else if (type === LOCAL_STORAGE) {
    value = getStorageItem(name);
  }

  if (value === 'undefined' || value === 'null') {
    return null;
  }

  return value;
}
/**
 * Write a value to either cookies or local storage
 * @param {string} name Name of the item
 * @param {string} value Value to be stored
 * @param {number} expInterval Expiry time in minutes
 */


function writeValue(name, value, expInterval) {
  if (name && value) {
    if (pubcidConfig.typeEnabled === COOKIE) {
      setCookie(name, value, expInterval, 'Lax');
    } else if (pubcidConfig.typeEnabled === LOCAL_STORAGE) {
      setStorageItem(name, value, expInterval);
    }
  }
}
/**
 * Add a callback at end of auction to fetch a pixel
 * @param {string} pixelUrl Pixel URL
 * @param {string} id pubcid
 * @returns {boolean} True if callback is queued
 */


function queuePixelCallback(pixelUrl, id) {
  if (!pixelUrl) {
    return false;
  }

  id = id || ''; // Use pubcid as a cache buster

  var urlInfo = __WEBPACK_IMPORTED_MODULE_3__src_url__["c" /* parse */](pixelUrl);
  urlInfo.search.id = encodeURIComponent('pubcid:' + id);
  var targetUrl = __WEBPACK_IMPORTED_MODULE_3__src_url__["a" /* format */](urlInfo);
  __WEBPACK_IMPORTED_MODULE_2__src_events___default.a.on(__WEBPACK_IMPORTED_MODULE_4__src_constants_json___default.a.EVENTS.AUCTION_END, function auctionEndHandler() {
    __WEBPACK_IMPORTED_MODULE_2__src_events___default.a.off(__WEBPACK_IMPORTED_MODULE_4__src_constants_json___default.a.EVENTS.AUCTION_END, auctionEndHandler);
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["triggerPixel"](targetUrl);
  });
  return true;
}

function isPubcidEnabled() {
  return pubcidConfig.enabled;
}
function getExpInterval() {
  return pubcidConfig.interval;
}
function getPubcidConfig() {
  return pubcidConfig;
}
/**
 * Decorate ad units with pubcid.  This hook function is called before the
 * real pbjs.requestBids is invoked, and can modify its parameter.  The cookie is
 * not updated until this function is called.
 * @param {Object} config This is the same parameter as pbjs.requestBids, and config.adUnits will be updated.
 * @param {function} next The next function in the chain
 */

function requestBidHook(next, config) {
  var adUnits = config.adUnits || pbjs.adUnits;
  var pubcid = null; // Pass control to the next function if not enabled

  if (!pubcidConfig.enabled || !pubcidConfig.typeEnabled) {
    return next.call(this, config);
  }

  if (_typeof(window[PUB_COMMON]) === 'object') {
    // If the page includes its own pubcid object, then use that instead.
    pubcid = window[PUB_COMMON].getId();
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"](PUB_COMMON + ': pubcid = ' + pubcid);
  } else {
    // Otherwise get the existing cookie
    pubcid = readValue(ID_NAME);

    if (!pubcid) {
      if (pubcidConfig.create) {
        // Special handling for local storage to retain previously stored id in cookies
        if (pubcidConfig.typeEnabled === LOCAL_STORAGE) {
          pubcid = readValue(ID_NAME, COOKIE);
        } // Generate a new id


        if (!pubcid) {
          pubcid = __WEBPACK_IMPORTED_MODULE_0__src_utils__["generateUUID"]();
        } // Update the cookie/storage with the latest expiration date


        writeValue(ID_NAME, pubcid, pubcidConfig.interval); // Only return pubcid if it is saved successfully

        pubcid = readValue(ID_NAME);
      }

      queuePixelCallback(pubcidConfig.pixelUrl, pubcid);
    } else if (pubcidConfig.extend) {
      // Update the cookie/storage with the latest expiration date
      if (!queuePixelCallback(pubcidConfig.pixelUrl, pubcid)) {
        writeValue(ID_NAME, pubcid, pubcidConfig.interval);
      }
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"]('pbjs: pubcid = ' + pubcid);
  } // Append pubcid to each bid object, which will be incorporated
  // into bid requests later.


  if (adUnits && pubcid) {
    adUnits.forEach(function (unit) {
      unit.bids.forEach(function (bid) {
        _extends(bid, {
          crumbs: {
            pubcid: pubcid
          }
        });
      });
    });
  }

  return next.call(this, config);
} // Helper to set a cookie

function setCookie(name, value, expires, sameSite) {
  var expTime = new Date();
  expTime.setTime(expTime.getTime() + expires * 1000 * 60);
  window.document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;expires=' + expTime.toGMTString() + (sameSite ? ';SameSite=' + sameSite : '');
} // Helper to read a cookie

function getCookie(name) {
  if (name && window.document.cookie) {
    var m = window.document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]*)\\s*(;|$)');
    return m ? decodeURIComponent(m[2]) : null;
  }

  return null;
}
/**
 * Configuration function
 * @param {boolean} enable Enable or disable pubcid.  By default the module is enabled.
 * @param {number} expInterval Expiration interval of the cookie in minutes.
 * @param {string} type Type of storage to use
 * @param {boolean} create Create the id if missing.  Default is true.
 * @param {boolean} extend Extend the stored value when id is retrieved.  Default is true.
 * @param {string} pixelUrl A pixel URL back to the publisher's own domain that may modify cookie attributes.
 */

function setConfig() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      enable = _ref.enable,
      expInterval = _ref.expInterval,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'html5,cookie' : _ref$type,
      create = _ref.create,
      extend = _ref.extend,
      pixelUrl = _ref.pixelUrl;

  if (enable !== undefined) {
    pubcidConfig.enabled = enable;
  }

  if (expInterval !== undefined) {
    pubcidConfig.interval = parseInt(expInterval, 10);
  }

  if (isNaN(pubcidConfig.interval)) {
    pubcidConfig.interval = DEFAULT_EXPIRES;
  }

  if (create !== undefined) {
    pubcidConfig.create = create;
  }

  if (extend !== undefined) {
    pubcidConfig.extend = extend;
  }

  if (pixelUrl !== undefined) {
    pubcidConfig.pixelUrl = pixelUrl;
  } // Default is to use local storage. Fall back to
  // cookie only if local storage is not supported.


  pubcidConfig.typeEnabled = null;
  var typeArray = type.split(',');

  for (var i = 0; i < typeArray.length; ++i) {
    var name = typeArray[i].trim();

    if (name === COOKIE) {
      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["cookiesAreEnabled"]()) {
        pubcidConfig.typeEnabled = COOKIE;
        break;
      }
    } else if (name === LOCAL_STORAGE) {
      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["hasLocalStorage"]()) {
        pubcidConfig.typeEnabled = LOCAL_STORAGE;
        break;
      }
    }
  }
}
/**
 * Initialize module by 1) subscribe to configuration changes and 2) register hook
 */

function initPubcid() {
  __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('pubcid', function (config) {
    return setConfig(config.pubcid);
  });
  var optout = __WEBPACK_IMPORTED_MODULE_0__src_utils__["cookiesAreEnabled"]() && readValue(OPTOUT_NAME, COOKIE) || __WEBPACK_IMPORTED_MODULE_0__src_utils__["hasLocalStorage"]() && readValue(OPTOUT_NAME, LOCAL_STORAGE);

  if (!optout) {
    pbjs.requestBids.before(requestBidHook);
  }
}
initPubcid();

/***/ })

},[408]);