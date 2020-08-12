pbjsChunk([112],{

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(356);


/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes__ = __webpack_require__(2);


var _require = __webpack_require__(1),
    registerBidder = _require.registerBidder;

var BIDDER_CODE = 'my6sense';
var END_POINT = 'https://hb.mynativeplatform.com/pub2/web/v1.15.0/hbwidget.json';
var END_POINT_METHOD = 'POST'; // called first

function isBidRequestValid(bid) {
  return !(bid.bidder !== BIDDER_CODE || !bid.params || !bid.params.key);
}

function getUrl(url) {
  if (!url) {
    url = window.location.href; // "clean" url of current web page
  }

  var canonicalLink = null; // first look for meta data with property "og:url"

  var metaElements = document.getElementsByTagName('meta');

  for (var i = 0; i < metaElements.length && !canonicalLink; i++) {
    if (metaElements[i].getAttribute('property') == 'og:url') {
      canonicalLink = metaElements[i].content;
    }
  }

  if (!canonicalLink) {
    var canonicalLinkContainer = document.querySelector("link[rel='canonical']"); // html element containing the canonical link

    if (canonicalLinkContainer) {
      // get clean url from href of <link rel='canocial' .../>
      canonicalLink = canonicalLinkContainer.href;
    }
  }

  url = canonicalLink || url;
  return encodeURIComponent(url).toString();
}
/**
 * this function is used to fix param value before sending them to server, if user did not set it,
 * default value for parameter will be returned
 * example1: paidClicks: '[PAID_TRACKING_PIXEL]', will return {value: '', fromUser: false}
 * example2: pageURL: 'www.my6sense.com', will return {value: 'www.my6sense.com', fromUser: true}
 * @param key
 * @param value
 * @returns {{value: *, fromUser: boolean}}
 */


function fixRequestParamForServer(key, value) {
  function isEmptyValue(key, value) {
    return value === parametersMap[key].emptyValue;
  }

  var parametersMap = {
    'pageUrl': {
      emptyValue: '[PAGE_URL]',
      defaultValue: getUrl()
    },
    'displayWithinIframe': {
      emptyValue: '',
      defaultValue: ''
    },
    'dataParams': {
      emptyValue: '[KEY_VALUES]',
      defaultValue: ''
    },
    'paidClicks': {
      emptyValue: '[PAID_TRACKING_PIXEL]',
      defaultValue: ''
    },
    'organicClicks': {
      emptyValue: '[ORGANIC_TRACKING_PIXEL]',
      defaultValue: ''
    },
    'dataView': {
      emptyValue: '[VIEW_TRACKING_PIXEL]',
      defaultValue: ''
    } // ZONE is not part of this object, handled on server side

  }; // if param is not in list we do not change it (return it as is)

  if (!parametersMap.hasOwnProperty(key)) {
    return {
      value: value,
      fromUser: true
    };
  } // if no value given by user set it to default


  if (!value || isEmptyValue(key, value)) {
    return {
      value: parametersMap[key].defaultValue,
      fromUser: false
    };
  }

  return {
    value: value,
    fromUser: true
  };
} // called second


function buildGdprServerProperty(bidderRequest) {
  var gdprObj = {
    gdpr_consent: null,
    gdpr: null
  };

  if (bidderRequest && 'gdprConsent' in bidderRequest) {
    gdprObj.gdpr_consent = bidderRequest.gdprConsent.consentString || null;
    gdprObj.gdpr = gdprObj.gdpr === null && bidderRequest.gdprConsent.gdprApplies == true ? true : gdprObj.gdpr;
    gdprObj.gdpr = gdprObj.gdpr === null && bidderRequest.gdprConsent.gdprApplies == false ? false : gdprObj.gdpr;
    gdprObj.gdpr = gdprObj.gdpr === null && bidderRequest.gdprConsent.gdprApplies == 1 ? true : gdprObj.gdpr;
    gdprObj.gdpr = gdprObj.gdpr === null && bidderRequest.gdprConsent.gdprApplies == 0 ? false : gdprObj.gdpr;
  }

  return gdprObj;
}

function buildRequests(validBidRequests, bidderRequest) {
  var requests = [];

  if (validBidRequests && validBidRequests.length) {
    validBidRequests.forEach(function (bidRequest) {
      bidRequest.widget_num = 1; // mandatory property for server side

      var isDataUrlSetByUser = false;
      var debug = false;

      if (bidRequest.params) {
        for (var key in bidRequest.params) {
          // loop over params and remove empty/untouched values
          if (bidRequest.params.hasOwnProperty(key)) {
            // if debug we update url string to get core debug version
            if (key === 'debug' && bidRequest.params[key] === true) {
              debug = true;
              delete bidRequest.params[key];
              continue;
            }

            var fixedObj = fixRequestParamForServer(key, bidRequest.params[key]);
            bidRequest.params[key] = fixedObj.value; // if pageUrl is set by user we should update variable for query string param

            if (key === 'pageUrl' && fixedObj.fromUser === true) {
              isDataUrlSetByUser = true;
            } // remove empty params from request


            if (!bidRequest.params[key]) {
              delete bidRequest.params[key];
            }
          }
        }
      }

      var url = "".concat(END_POINT, "?widget_key=").concat(bidRequest.params.key, "&is_data_url_set=").concat(isDataUrlSetByUser); // mandatory query string for server side

      if (debug) {
        url = "".concat(END_POINT, "?env=debug&widget_key=").concat(bidRequest.params.key, "&is_data_url_set=").concat(isDataUrlSetByUser); // this url is for debugging
      }

      bidRequest.gdpr = buildGdprServerProperty(bidderRequest);
      requests.push({
        url: url,
        method: END_POINT_METHOD,
        data: JSON.stringify(bidRequest)
      });
    });
  }

  return requests;
} // called third


function interpretResponse(serverResponse) {
  var bidResponses = []; // currently server returns a single response which is the body property

  if (serverResponse.body) {
    serverResponse.body.bidderCode = BIDDER_CODE;
    bidResponses.push(serverResponse.body);
  }

  return bidResponses;
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes__["c" /* NATIVE */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse
};
registerBidder(spec);

/***/ })

},[355]);