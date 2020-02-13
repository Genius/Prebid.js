pbjsChunk([204],{

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(287);


/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["surfaceTestHook"] = surfaceTestHook;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "digiTrustIdSubmodule", function() { return digiTrustIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook__ = __webpack_require__(13);
/**
 * This module adds DigiTrust ID support to the User ID module
 * The {@link module:modules/userId} module is required
 * If the full DigiTrust Id library is included the standard functions
 * will be invoked to obtain the user's DigiTrust Id.
 * When the full library is not included this will fall back to the
 * DigiTrust Identity API and generate a mock DigiTrust object.
 * @module modules/digiTrustIdSystem
 * @requires module:modules/userId
 */



var fallbackTimeout = 1550; // timeout value that allows userId system to execute first

var fallbackTimer = 0; // timer Id for fallback init so we don't double call

/**
 * Checks to see if the DigiTrust framework is initialized.
 * @function
 */

function isInitialized() {
  if (window.DigiTrust == null) {
    return false;
  }

  return DigiTrust.isClient; // this is set to true after init
}
/**
 * Tests for presence of the DigiTrust object
 * */


function isPresent() {
  return window.DigiTrust != null;
}

var noop = function noop() {};

var MAX_RETRIES = 2;
var DT_ID_SVC = 'https://prebid.digitru.st/id/v1';

var isFunc = function isFunc(fn) {
  return typeof fn === 'function';
};

function callApi(options) {
  Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax__["a" /* ajax */])(DT_ID_SVC, {
    success: options.success,
    error: options.fail
  }, null, {
    method: 'GET'
  });
}
/**
 * Encode the Id per DigiTrust lib
 * @param {any} id
 */


function encId(id) {
  try {
    if (typeof id !== 'string') {
      id = JSON.stringify(id);
    }

    return encodeURIComponent(btoa(id));
  } catch (ex) {
    return id;
  }
}
/**
 * Writes the Identity into the expected DigiTrust cookie
 * @param {any} id
 */


function writeDigiId(id) {
  var key = 'DigiTrust.v1.identity';
  var date = new Date();
  date.setTime(date.getTime() + 604800000);
  var exp = 'expires=' + date.toUTCString();
  document.cookie = key + '=' + encId(id) + '; ' + exp + '; path=/;SameSite=none;';
}
/**
 * Set up a DigiTrust facade object to mimic the API
 *
 */


function initDigitrustFacade(config) {
  var _savedId = null; // closure variable for storing Id to avoid additional requests

  clearTimeout(fallbackTimer);
  fallbackTimer = 0;
  var facade = {
    isClient: true,
    isMock: true,
    _internals: {
      callCount: 0,
      initCallback: null
    },
    getUser: function getUser(obj, callback) {
      var isAsync = !!isFunc(callback);
      var cb = isAsync ? callback : noop;
      var errResp = {
        success: false
      };
      var inter = facade._internals;
      inter.callCount++; // wrap the initializer callback, if present

      var checkCallInitializeCb = function checkCallInitializeCb(idResponse) {
        if (inter.callCount <= 1 && isFunc(inter.initCallback)) {
          try {
            inter.initCallback(idResponse);
          } catch (ex) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Exception in passed DigiTrust init callback');
          }
        }
      };

      if (!isMemberIdValid) {
        if (!isAsync) {
          return errResp;
        } else {
          cb(errResp);
          return;
        }
      }

      if (_savedId != null) {
        checkCallInitializeCb(_savedId);

        if (isAsync) {
          cb(_savedId);
          return;
        } else {
          return _savedId;
        }
      }

      var opts = {
        success: function success(respText, result) {
          var idResult = {
            success: true
          };

          try {
            writeDigiId(respText);
            idResult.identity = JSON.parse(respText);
            _savedId = idResult;
          } catch (ex) {
            idResult.success = false;
          }

          checkCallInitializeCb(idResult);
          cb(idResult);
        },
        fail: function fail(statusErr, result) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('DigiTrustId API error: ' + statusErr);
        }
      };
      callApi(opts);

      if (!isAsync) {
        return errResp; // even if it will be successful later, without a callback we report a "failure in this moment"
      }
    }
  };

  if (config && isFunc(config.callback)) {
    facade._internals.initCallback = config.callback;
  }

  if (window && window.DigiTrust == null) {
    window.DigiTrust = facade;
  }
}
/**
 * Tests to see if a member ID is valid within facade
 * @param {any} memberId
 */


var isMemberIdValid = function isMemberIdValid(memberId) {
  if (memberId && memberId.length > 0) {
    return true;
  } else {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('[DigiTrust Prebid Client Error] Missing member ID, add the member ID to the function call options');
    return false;
  }
};
/**
 * Encapsulation of needed info for the callback return.
 *
 * @param {any} opts
 */


var ResultWrapper = function ResultWrapper(opts) {
  var me = this;
  this.idObj = null;
  var idSystemFn = null;
  /**
   * Callback method that is passed back to the userId module.
   *
   * @param {function} callback
   */

  this.userIdCallback = function (callback) {
    idSystemFn = callback;

    if (me.idObj != null && isFunc(callback)) {
      callback(wrapIdResult());
    }
  };
  /**
   * Return a wrapped result formatted for userId system
   */


  function wrapIdResult() {
    if (me.idObj == null) {
      return null;
    }

    var cp = me.configParams;
    var exp = cp && cp.storage && cp.storage.expires || 60;
    var rslt = {
      data: null,
      expires: exp
    };

    if (me.idObj && me.idObj.success && me.idObj.identity) {
      rslt.data = me.idObj.identity;
    } else {
      rslt.err = 'Failure getting id';
    }

    return rslt;
  }

  this.retries = 0;
  this.retryId = 0;

  this.executeIdRequest = function (configParams) {
    DigiTrust.getUser({
      member: 'prebid'
    }, function (idResult) {
      me.idObj = idResult;

      var cb = function cb() {
        if (isFunc(idSystemFn)) {
          idSystemFn(wrapIdResult());
        }
      };

      cb();

      if (configParams && configParams.callback && isFunc(configParams.callback)) {
        try {
          configParams.callback(idResult);
        } catch (ex) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Failure in DigiTrust executeIdRequest', ex);
        }
      }
    });
  };
}; // An instance of the result wrapper object.


var resultHandler = new ResultWrapper();
/*
 * Internal implementation to get the Id and trigger callback
 */

function getDigiTrustId(configParams) {
  if (resultHandler.configParams == null) {
    resultHandler.configParams = configParams;
  } // First see if we should initialize DigiTrust framework


  if (isPresent() && !isInitialized()) {
    initializeDigiTrust(configParams);
    resultHandler.retryId = setTimeout(function () {
      getDigiTrustId(configParams);
    }, 100 * (1 + resultHandler.retries++));
    return resultHandler.userIdCallback;
  } else if (!isInitialized()) {
    // Second see if we should build a facade object
    if (resultHandler.retries >= MAX_RETRIES) {
      initDigitrustFacade(configParams); // initialize a facade object that relies on the AJAX call

      resultHandler.executeIdRequest(configParams);
    } else {
      // use expanding envelope
      if (resultHandler.retryId != 0) {
        clearTimeout(resultHandler.retryId);
      }

      resultHandler.retryId = setTimeout(function () {
        getDigiTrustId(configParams);
      }, 100 * (1 + resultHandler.retries++));
    }

    return resultHandler.userIdCallback;
  } else {
    // Third get the ID
    resultHandler.executeIdRequest(configParams);
    return resultHandler.userIdCallback;
  }
}

function initializeDigiTrust(config) {
  __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Digitrust Init');
  var dt = window.DigiTrust;

  if (dt && !dt.isClient && config != null) {
    dt.initialize(config.init, config.callback);
  } else if (dt == null) {
    // Assume we are already on a delay and DigiTrust is not on page
    initDigitrustFacade(config);
  }
}

var testHook = {};
/**
 * Exposes the test hook object by attaching to the digitrustIdModule.
 * This method is called in the unit tests to surface internals.
 */

function surfaceTestHook() {
  digiTrustIdSubmodule['_testHook'] = testHook;
  return testHook;
}
testHook.initDigitrustFacade = initDigitrustFacade; // expose for unit tests

/** @type {Submodule} */

var digiTrustIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: 'digitrust',

  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @param {string} value
   * @returns {{pubcid:string}}
   */
  decode: function decode(idData) {
    try {
      return {
        'digitrustid': idData
      };
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('DigiTrust ID submodule decode error');
    }
  },
  getId: function getId(configParams) {
    return {
      callback: getDigiTrustId(configParams)
    };
  },
  _testInit: surfaceTestHook
}; // check for fallback init of DigiTrust

function fallbackInit() {
  if (resultHandler.retryId == 0 && !isInitialized()) {
    // this triggers an init
    var conf = {
      member: 'fallback',
      callback: noop
    };
    getDigiTrustId(conf);
  }
}

fallbackTimer = setTimeout(fallbackInit, fallbackTimeout);
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook__["e" /* submodule */])('userId', digiTrustIdSubmodule);

/***/ })

},[286]);