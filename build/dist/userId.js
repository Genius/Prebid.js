pbjsChunk([45],{

/***/ 520:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(521);


/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syncDelay", function() { return syncDelay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auctionDelay", function() { return auctionDelay; });
/* harmony export (immutable) */ __webpack_exports__["setSubmoduleRegistry"] = setSubmoduleRegistry;
/* harmony export (immutable) */ __webpack_exports__["requestBidsHook"] = requestBidsHook;
/* harmony export (immutable) */ __webpack_exports__["attachIdSystem"] = attachIdSystem;
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_events__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_prebidGlobal__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_adapterManager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_hook__ = __webpack_require__(13);
/**
 * This module adds User ID support to prebid.js
 * @module modules/userId
 */

/**
 * @interface Submodule
 */

/**
 * @function
 * @summary performs action to obtain id and return a value in the callback's response argument.
 *  If IdResponse#id is defined, then it will be written to the current active storage.
 *  If IdResponse#callback is defined, then it'll called at the end of auction.
 *  It's permissible to return neither, one, or both fields.
 * @name Submodule#getId
 * @param {SubmoduleParams} configParams
 * @param {ConsentData|undefined} consentData
 * @param {(Object|undefined)} cacheIdObj
 * @return {(IdResponse|undefined)} A response object that contains id and/or callback.
 */

/**
 * @function
 * @summary Similar to Submodule#getId, this optional method returns response to for id that exists already.
 *  If IdResponse#id is defined, then it will be written to the current active storage even if it exists already.
 *  If IdResponse#callback is defined, then it'll called at the end of auction.
 *  It's permissible to return neither, one, or both fields.
 * @name Submodule#extendId
 * @param {SubmoduleParams} configParams
 * @param {Object} storedId - existing id, if any
 * @return {(IdResponse|function(callback:function))} A response object that contains id and/or callback.
 */

/**
 * @function
 * @summary decode a stored value for passing to bid requests
 * @name Submodule#decode
 * @param {Object|string} value
 * @return {(Object|undefined)}
 */

/**
 * @property
 * @summary used to link submodule with config
 * @name Submodule#name
 * @type {string}
 */

/**
 * @typedef {Object} SubmoduleConfig
 * @property {string} name - the User ID submodule name (used to link submodule with config)
 * @property {(SubmoduleStorage|undefined)} storage - browser storage config
 * @property {(SubmoduleParams|undefined)} params - params config for use by the submodule.getId function
 * @property {(Object|undefined)} value - if not empty, this value is added to bid requests for access in adapters
 */

/**
 * @typedef {Object} SubmoduleStorage
 * @property {string} type - browser storage type (html5 or cookie)
 * @property {string} name - key name to use when saving/reading to local storage or cookies
 * @property {number} expires - time to live for browser storage in days
 * @property {(number|undefined)} refreshInSeconds - if not empty, this value defines the maximum time span in seconds before refreshing user ID stored in browser
 */

/**
 * @typedef {Object} SubmoduleParams
 * @property {(string|undefined)} partner - partner url param value
 * @property {(string|undefined)} url - webservice request url used to load Id data
 * @property {(string|undefined)} pixelUrl - publisher pixel to extend/modify cookies
 * @property {(boolean|undefined)} create - create id if missing.  default is true.
 * @property {(boolean|undefined)} extend - extend expiration time on each access.  default is false.
 * @property {(string|undefined)} pid - placement id url param value
 * @property {(string|undefined)} publisherId - the unique identifier of the publisher in question
 * @property {(array|undefined)} identifiersToResolve - the identifiers from either ls|cookie to be attached to the getId query
 */

/**
 * @typedef {Object} SubmoduleContainer
 * @property {Submodule} submodule
 * @property {SubmoduleConfig} config
 * @property {(Object|undefined)} idObj - cache decoded id value (this is copied to every adUnit bid)
 * @property {(function|undefined)} callback - holds reference to submodule.getId() result if it returned a function. Will be set to undefined after callback executes
 */

/**
 * @typedef {Object} ConsentData
 * @property {(string|undefined)} consentString
 * @property {(Object|undefined)} vendorData
 * @property {(boolean|undefined)} gdprApplies
 */

/**
 * @typedef {Object} IdResponse
 * @property {(Object|undefined)} id - id data
 * @property {(function|undefined)} callback - function that will return an id
 */








var MODULE_NAME = 'User ID';
var COOKIE = 'cookie';
var LOCAL_STORAGE = 'html5';
var DEFAULT_SYNC_DELAY = 500;
var NO_AUCTION_DELAY = 0;
/** @type {string[]} */

var validStorageTypes = [];
/** @type {boolean} */

var addedUserIdHook = false;
/** @type {SubmoduleContainer[]} */

var submodules = [];
/** @type {SubmoduleContainer[]} */

var initializedSubmodules;
/** @type {SubmoduleConfig[]} */

var configRegistry = [];
/** @type {Submodule[]} */

var submoduleRegistry = [];
/** @type {(number|undefined)} */

var syncDelay;
/** @type {(number|undefined)} */

var auctionDelay;
/** @param {Submodule[]} submodules */

function setSubmoduleRegistry(submodules) {
  submoduleRegistry = submodules;
}
/**
 * @param {SubmoduleStorage} storage
 * @param {(Object|string)} value
 */

function setStoredValue(storage, value) {
  try {
    var valueStr = __WEBPACK_IMPORTED_MODULE_3__src_utils__["isPlainObject"](value) ? JSON.stringify(value) : value;
    var expiresStr = new Date(Date.now() + storage.expires * (60 * 60 * 24 * 1000)).toUTCString();

    if (storage.type === COOKIE) {
      __WEBPACK_IMPORTED_MODULE_3__src_utils__["setCookie"](storage.name, valueStr, expiresStr, 'Lax');

      if (typeof storage.refreshInSeconds === 'number') {
        __WEBPACK_IMPORTED_MODULE_3__src_utils__["setCookie"]("".concat(storage.name, "_last"), new Date().toUTCString(), expiresStr);
      }
    } else if (storage.type === LOCAL_STORAGE) {
      localStorage.setItem("".concat(storage.name, "_exp"), expiresStr);
      localStorage.setItem(storage.name, encodeURIComponent(valueStr));

      if (typeof storage.refreshInSeconds === 'number') {
        localStorage.setItem("".concat(storage.name, "_last"), new Date().toUTCString());
      }
    }
  } catch (error) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"](error);
  }
}
/**
 * @param {SubmoduleStorage} storage
 * @param {String|undefined} key optional key of the value
 * @returns {string}
 */


function getStoredValue(storage) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var storedKey = key ? "".concat(storage.name, "_").concat(key) : storage.name;
  var storedValue;

  try {
    if (storage.type === COOKIE) {
      storedValue = __WEBPACK_IMPORTED_MODULE_3__src_utils__["getCookie"](storedKey);
    } else if (storage.type === LOCAL_STORAGE) {
      var storedValueExp = localStorage.getItem("".concat(storage.name, "_exp")); // empty string means no expiration set

      if (storedValueExp === '') {
        storedValue = localStorage.getItem(storedKey);
      } else if (storedValueExp) {
        if (new Date(storedValueExp).getTime() - Date.now() > 0) {
          storedValue = decodeURIComponent(localStorage.getItem(storedKey));
        }
      }
    } // support storing a string or a stringified object


    if (typeof storedValue === 'string' && storedValue.charAt(0) === '{') {
      storedValue = JSON.parse(storedValue);
    }
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"](e);
  }

  return storedValue;
}
/**
 * test if consent module is present, applies, and is valid for local storage or cookies (purpose 1)
 * @param {ConsentData} consentData
 * @returns {boolean}
 */


function hasGDPRConsent(consentData) {
  if (consentData && typeof consentData.gdprApplies === 'boolean' && consentData.gdprApplies) {
    if (!consentData.consentString) {
      return false;
    }

    if (consentData.vendorData && consentData.vendorData.purposeConsents && consentData.vendorData.purposeConsents['1'] === false) {
      return false;
    }
  }

  return true;
}
/**
 * @param {SubmoduleContainer[]} submodules
 * @param {function} cb - callback for after processing is done.
 */


function processSubmoduleCallbacks(submodules, cb) {
  var done = cb ? __WEBPACK_IMPORTED_MODULE_3__src_utils__["delayExecution"](cb, submodules.length) : function () {};
  submodules.forEach(function (submodule) {
    submodule.callback(function callbackCompleted(idObj) {
      // if valid, id data should be saved to cookie/html storage
      if (idObj) {
        if (submodule.config.storage) {
          setStoredValue(submodule.config.storage, idObj);
        } // cache decoded value (this is copied to every adUnit bid)


        submodule.idObj = submodule.submodule.decode(idObj);
      } else {
        __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"]("".concat(MODULE_NAME, ": ").concat(submodule.submodule.name, " - request id responded with an empty value"));
      }

      done();
    }); // clear callback, this prop is used to test if all submodule callbacks are complete below

    submodule.callback = undefined;
  });
}
/**
 * This function will create a combined object for all subModule Ids
 * @param {SubmoduleContainer[]} submodules
 */


function getCombinedSubmoduleIds(submodules) {
  if (!Array.isArray(submodules) || !submodules.length) {
    return {};
  }

  var combinedSubmoduleIds = submodules.filter(function (i) {
    return __WEBPACK_IMPORTED_MODULE_3__src_utils__["isPlainObject"](i.idObj) && Object.keys(i.idObj).length;
  }).reduce(function (carry, i) {
    Object.keys(i.idObj).forEach(function (key) {
      carry[key] = i.idObj[key];
    });
    return carry;
  }, {});
  return combinedSubmoduleIds;
}
/**
 * @param {AdUnit[]} adUnits
 * @param {SubmoduleContainer[]} submodules
 */


function addIdDataToAdUnitBids(adUnits, submodules) {
  if ([adUnits].some(function (i) {
    return !Array.isArray(i) || !i.length;
  })) {
    return;
  }

  var combinedSubmoduleIds = getCombinedSubmoduleIds(submodules);

  if (Object.keys(combinedSubmoduleIds).length) {
    adUnits.forEach(function (adUnit) {
      adUnit.bids.forEach(function (bid) {
        // create a User ID object on the bid,
        bid.userId = combinedSubmoduleIds;
      });
    });
  }
}
/**
 * This is a common function that will initalize subModules if not already done and it will also execute subModule callbacks
 */


function initializeSubmodulesAndExecuteCallbacks(continueAuction) {
  var delayed = false; // initialize submodules only when undefined

  if (typeof initializedSubmodules === 'undefined') {
    initializedSubmodules = initSubmodules(submodules, __WEBPACK_IMPORTED_MODULE_5__src_adapterManager__["gdprDataHandler"].getConsentData());

    if (initializedSubmodules.length) {
      // list of submodules that have callbacks that need to be executed
      var submodulesWithCallbacks = initializedSubmodules.filter(function (item) {
        return __WEBPACK_IMPORTED_MODULE_3__src_utils__["isFn"](item.callback);
      });

      if (submodulesWithCallbacks.length) {
        if (continueAuction && auctionDelay > 0) {
          // delay auction until ids are available
          delayed = true;
          var continued = false;

          var continueCallback = function continueCallback() {
            if (!continued) {
              continued = true;
              continueAuction();
            }
          };

          __WEBPACK_IMPORTED_MODULE_3__src_utils__["logInfo"]("".concat(MODULE_NAME, " - auction delayed by ").concat(auctionDelay, " at most to fetch ids"));
          processSubmoduleCallbacks(submodulesWithCallbacks, continueCallback);
          setTimeout(continueCallback, auctionDelay);
        } else {
          // wait for auction complete before processing submodule callbacks
          __WEBPACK_IMPORTED_MODULE_2__src_events___default.a.on(__WEBPACK_IMPORTED_MODULE_6__src_constants_json___default.a.EVENTS.AUCTION_END, function auctionEndHandler() {
            __WEBPACK_IMPORTED_MODULE_2__src_events___default.a.off(__WEBPACK_IMPORTED_MODULE_6__src_constants_json___default.a.EVENTS.AUCTION_END, auctionEndHandler); // when syncDelay is zero, process callbacks now, otherwise delay process with a setTimeout

            if (syncDelay > 0) {
              setTimeout(function () {
                processSubmoduleCallbacks(submodulesWithCallbacks);
              }, syncDelay);
            } else {
              processSubmoduleCallbacks(submodulesWithCallbacks);
            }
          });
        }
      }
    }
  }

  if (continueAuction && !delayed) {
    continueAuction();
  }
}
/**
 * Hook is executed before adapters, but after consentManagement. Consent data is requied because
 * this module requires GDPR consent with Purpose #1 to save data locally.
 * The two main actions handled by the hook are:
 * 1. check gdpr consentData and handle submodule initialization.
 * 2. append user id data (loaded from cookied/html or from the getId method) to bids to be accessed in adapters.
 * @param {Object} reqBidsConfigObj required; This is the same param that's used in pbjs.requestBids.
 * @param {function} fn required; The next function in the chain, used by hook.js
 */


function requestBidsHook(fn, reqBidsConfigObj) {
  // initialize submodules only when undefined
  initializeSubmodulesAndExecuteCallbacks(function () {
    // pass available user id data to bid adapters
    addIdDataToAdUnitBids(reqBidsConfigObj.adUnits || Object(__WEBPACK_IMPORTED_MODULE_4__src_prebidGlobal__["a" /* getGlobal */])().adUnits, initializedSubmodules); // calling fn allows prebid to continue processing

    fn.call(this, reqBidsConfigObj);
  });
}
/**
 * This function will be exposed in global-name-space so that userIds stored by Prebid UserId module can be used by external codes as well.
 * Simple use case will be passing these UserIds to A9 wrapper solution
 */

function getUserIds() {
  // initialize submodules only when undefined
  initializeSubmodulesAndExecuteCallbacks();
  return getCombinedSubmoduleIds(initializedSubmodules);
}
/**
 * @param {SubmoduleContainer[]} submodules
 * @param {ConsentData} consentData
 * @returns {SubmoduleContainer[]} initialized submodules
 */


function initSubmodules(submodules, consentData) {
  // gdpr consent with purpose one is required, otherwise exit immediately
  if (!hasGDPRConsent(consentData)) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logWarn"]("".concat(MODULE_NAME, " - gdpr permission not valid for local storage or cookies, exit module"));
    return [];
  }

  return submodules.reduce(function (carry, submodule) {
    // There are two submodule configuration types to handle: storage or value
    // 1. storage: retrieve user id data from cookie/html storage or with the submodule's getId method
    // 2. value: pass directly to bids
    if (submodule.config.storage) {
      var storedId = getStoredValue(submodule.config.storage);
      var response;
      var refreshNeeded = false;

      if (typeof submodule.config.storage.refreshInSeconds === 'number') {
        var storedDate = new Date(getStoredValue(submodule.config.storage, 'last'));
        refreshNeeded = storedDate && Date.now() - storedDate.getTime() > submodule.config.storage.refreshInSeconds * 1000;
      }

      if (__WEBPACK_IMPORTED_MODULE_6__src_constants_json___default.a.SUBMODULES_THAT_ALWAYS_REFRESH_ID[submodule.config.name] === true) {
        refreshNeeded = true;
      }

      if (!storedId || refreshNeeded) {
        // No previously saved id.  Request one from submodule.
        response = submodule.submodule.getId(submodule.config.params, consentData, storedId);
      } else if (typeof submodule.submodule.extendId === 'function') {
        // If the id exists already, give submodule a chance to decide additional actions that need to be taken
        response = submodule.submodule.extendId(submodule.config.params, storedId);
      }

      if (__WEBPACK_IMPORTED_MODULE_3__src_utils__["isPlainObject"](response)) {
        if (response.id) {
          // A getId/extendId result assumed to be valid user id data, which should be saved to users local storage or cookies
          setStoredValue(submodule.config.storage, response.id);
          storedId = response.id;
        }

        if (typeof response.callback === 'function') {
          // Save async callback to be invoked after auction
          submodule.callback = response.callback;
        }
      }

      if (storedId) {
        // cache decoded value (this is copied to every adUnit bid)
        submodule.idObj = submodule.submodule.decode(storedId);
      }
    } else if (submodule.config.value) {
      // cache decoded value (this is copied to every adUnit bid)
      submodule.idObj = submodule.config.value;
    } else {
      var _response = submodule.submodule.getId(submodule.config.params, consentData, undefined);

      if (__WEBPACK_IMPORTED_MODULE_3__src_utils__["isPlainObject"](_response)) {
        if (typeof _response.callback === 'function') {
          submodule.callback = _response.callback;
        }

        if (_response.id) {
          submodule.idObj = submodule.submodule.decode(_response.id);
        }
      }
    }

    carry.push(submodule);
    return carry;
  }, []);
}
/**
 * list of submodule configurations with valid 'storage' or 'value' obj definitions
 * * storage config: contains values for storing/retrieving User ID data in browser storage
 * * value config: object properties that are copied to bids (without saving to storage)
 * @param {SubmoduleConfig[]} configRegistry
 * @param {Submodule[]} submoduleRegistry
 * @param {string[]} activeStorageTypes
 * @returns {SubmoduleConfig[]}
 */


function getValidSubmoduleConfigs(configRegistry, submoduleRegistry, activeStorageTypes) {
  if (!Array.isArray(configRegistry)) {
    return [];
  }

  return configRegistry.reduce(function (carry, config) {
    // every submodule config obj must contain a valid 'name'
    if (!config || __WEBPACK_IMPORTED_MODULE_3__src_utils__["isEmptyStr"](config.name)) {
      return carry;
    } // Validate storage config contains 'type' and 'name' properties with non-empty string values
    // 'type' must be a value currently enabled in the browser


    if (config.storage && !__WEBPACK_IMPORTED_MODULE_3__src_utils__["isEmptyStr"](config.storage.type) && !__WEBPACK_IMPORTED_MODULE_3__src_utils__["isEmptyStr"](config.storage.name) && activeStorageTypes.indexOf(config.storage.type) !== -1) {
      carry.push(config);
    } else if (__WEBPACK_IMPORTED_MODULE_3__src_utils__["isPlainObject"](config.value)) {
      carry.push(config);
    } else if (!config.storage && !config.value) {
      carry.push(config);
    }

    return carry;
  }, []);
}
/**
 * update submodules by validating against existing configs and storage types
 */


function updateSubmodules() {
  var configs = getValidSubmoduleConfigs(configRegistry, submoduleRegistry, validStorageTypes);

  if (!configs.length) {
    return;
  } // do this to avoid reprocessing submodules


  var addedSubmodules = submoduleRegistry.filter(function (i) {
    return !__WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find___default()(submodules, function (j) {
      return j.name === i.name;
    });
  }); // find submodule and the matching configuration, if found create and append a SubmoduleContainer

  submodules = addedSubmodules.map(function (i) {
    var submoduleConfig = __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find___default()(configs, function (j) {
      return j.name === i.name;
    });
    return submoduleConfig ? {
      submodule: i,
      config: submoduleConfig,
      callback: undefined,
      idObj: undefined
    } : null;
  }).filter(function (submodule) {
    return submodule !== null;
  });

  if (!addedUserIdHook && submodules.length) {
    // priority value 40 will load after consentManagement with a priority of 50
    Object(__WEBPACK_IMPORTED_MODULE_4__src_prebidGlobal__["a" /* getGlobal */])().requestBids.before(requestBidsHook, 40);
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logInfo"]("".concat(MODULE_NAME, " - usersync config updated for ").concat(submodules.length, " submodules"));
    addedUserIdHook = true;
  }
}
/**
 * enable submodule in User ID
 * @param {Submodule} submodule
 */


function attachIdSystem(submodule) {
  if (!__WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_find___default()(submoduleRegistry, function (i) {
    return i.name === submodule.name;
  })) {
    submoduleRegistry.push(submodule);
    updateSubmodules();
  }
}
/**
 * test browser support for storage config types (local storage or cookie), initializes submodules but consentManagement is required,
 * so a callback is added to fire after the consentManagement module.
 * @param {{getConfig:function}} config
 */

function init(config) {
  submodules = [];
  configRegistry = [];
  addedUserIdHook = false;
  initializedSubmodules = undefined; // list of browser enabled storage types

  validStorageTypes = [__WEBPACK_IMPORTED_MODULE_3__src_utils__["localStorageIsEnabled"]() ? LOCAL_STORAGE : null, __WEBPACK_IMPORTED_MODULE_3__src_utils__["cookiesAreEnabled"]() ? COOKIE : null].filter(function (i) {
    return i !== null;
  }); // exit immediately if opt out cookie or local storage keys exists.

  if (validStorageTypes.indexOf(COOKIE) !== -1 && (__WEBPACK_IMPORTED_MODULE_3__src_utils__["getCookie"]('_pbjs_id_optout') || __WEBPACK_IMPORTED_MODULE_3__src_utils__["getCookie"]('_pubcid_optout'))) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logInfo"]("".concat(MODULE_NAME, " - opt-out cookie found, exit module"));
    return;
  } // _pubcid_optout is checked for compatiblility with pubCommonId


  if (validStorageTypes.indexOf(LOCAL_STORAGE) !== -1 && (localStorage.getItem('_pbjs_id_optout') || localStorage.getItem('_pubcid_optout'))) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logInfo"]("".concat(MODULE_NAME, " - opt-out localStorage found, exit module"));
    return;
  } // listen for config userSyncs to be set


  config.getConfig(function (conf) {
    // Note: support for both 'userSync' and 'usersync' will be deprecated with Prebid.js 3.0
    var userSync = conf.userSync || conf.usersync;

    if (userSync && userSync.userIds) {
      configRegistry = userSync.userIds;
      syncDelay = __WEBPACK_IMPORTED_MODULE_3__src_utils__["isNumber"](userSync.syncDelay) ? userSync.syncDelay : DEFAULT_SYNC_DELAY;
      auctionDelay = __WEBPACK_IMPORTED_MODULE_3__src_utils__["isNumber"](userSync.auctionDelay) ? userSync.auctionDelay : NO_AUCTION_DELAY;
      updateSubmodules();
    }
  }); // exposing getUserIds function in global-name-space so that userIds stored in Prebid can be used by external codes.

  Object(__WEBPACK_IMPORTED_MODULE_4__src_prebidGlobal__["a" /* getGlobal */])().getUserIds = getUserIds;
} // init config update listener to start the application

init(__WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */]);
Object(__WEBPACK_IMPORTED_MODULE_7__src_hook__["c" /* module */])('userId', attachIdSystem);

/***/ })

},[520]);