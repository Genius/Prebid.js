pbjsChunk([43],{

/***/ 524:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(525);


/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["get"] = get;
/* harmony export (immutable) */ __webpack_exports__["merge"] = merge;
/* harmony export (immutable) */ __webpack_exports__["ratioToPercentageCeil"] = ratioToPercentageCeil;
/* harmony export (immutable) */ __webpack_exports__["getDocumentHeight"] = getDocumentHeight;
/* harmony export (immutable) */ __webpack_exports__["getOffset"] = getOffset;
/* harmony export (immutable) */ __webpack_exports__["getWindowParents"] = getWindowParents;
/* harmony export (immutable) */ __webpack_exports__["getTopmostReachableWindow"] = getTopmostReachableWindow;
/* harmony export (immutable) */ __webpack_exports__["topDocumentIsReachable"] = topDocumentIsReachable;
/* harmony export (immutable) */ __webpack_exports__["isInsideIframe"] = isInsideIframe;
/* harmony export (immutable) */ __webpack_exports__["isInsideSafeframe"] = isInsideSafeframe;
/* harmony export (immutable) */ __webpack_exports__["isInsideFriendlyIframe"] = isInsideFriendlyIframe;
/* harmony export (immutable) */ __webpack_exports__["getIframeType"] = getIframeType;
/* harmony export (immutable) */ __webpack_exports__["getRectCuts"] = getRectCuts;
/* harmony export (immutable) */ __webpack_exports__["getFrameElements"] = getFrameElements;
/* harmony export (immutable) */ __webpack_exports__["getElementCuts"] = getElementCuts;
/* harmony export (immutable) */ __webpack_exports__["area"] = area;
/* harmony export (immutable) */ __webpack_exports__["getInViewRatio"] = getInViewRatio;
/* harmony export (immutable) */ __webpack_exports__["getInViewRatioInsideTopFrame"] = getInViewRatioInsideTopFrame;
/* harmony export (immutable) */ __webpack_exports__["getMayBecomeVisible"] = getMayBecomeVisible;
/* harmony export (immutable) */ __webpack_exports__["getInViewPercentage"] = getInViewPercentage;
/* harmony export (immutable) */ __webpack_exports__["getOffsetTopDocument"] = getOffsetTopDocument;
/* harmony export (immutable) */ __webpack_exports__["getOffsetTopDocumentPercentage"] = getOffsetTopDocumentPercentage;
/* harmony export (immutable) */ __webpack_exports__["getOffsetToView"] = getOffsetToView;
/* harmony export (immutable) */ __webpack_exports__["getOffsetToViewPercentage"] = getOffsetToViewPercentage;
/* harmony export (immutable) */ __webpack_exports__["getViewabilityDescription"] = getViewabilityDescription;
/* harmony export (immutable) */ __webpack_exports__["mergeArrays"] = mergeArrays;
/* harmony export (immutable) */ __webpack_exports__["documentFocus"] = documentFocus;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function get(path, obj, notFound) {
  path = typeof path === 'string' ? path.split('.') : path;

  while (path.length) {
    var _path = path,
        _path2 = _slicedToArray(_path, 1),
        key = _path2[0];

    if (!(obj instanceof Object) || !(key in obj)) return notFound;
    obj = obj[key];
    path = path.slice(1);
  }

  return obj;
}
function merge(a, b) {
  var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (a) {
    return a;
  };
  var res = {};

  for (var key in a) {
    if (key in b) {
      res[key] = fn(a[key], b[key]);
    } else {
      res[key] = a[key];
    }
  }

  for (var _key in b) {
    if (!(_key in a)) res[_key] = b[_key];
  }

  return res;
}
function ratioToPercentageCeil(x) {
  return Math.ceil(x * 100);
}
function getDocumentHeight() {
  var curDocument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  return Math.max(get('body.clientHeight', curDocument, 0), get('body.scrollHeight', curDocument, 0), get('body.offsetHeight', curDocument, 0), get('documentElement.clientHeight', curDocument, 0), get('documentElement.scrollHeight', curDocument, 0), get('documentElement.offsetHeight', curDocument, 0));
}
function getOffset(element) {
  var rect = element.getBoundingClientRect();
  var elementWindow = getElementWindow(element);
  if (!elementWindow) throw new Error('cannot get element window');
  var scrollLeft = elementWindow.pageXOffset || get('documentElement.scrollLeft', document, 0);
  var scrollTop = elementWindow.pageYOffset || get('documentElement.scrollTop', document, 0);
  return {
    top: rect.top + scrollTop,
    right: rect.right + scrollLeft,
    bottom: rect.bottom + scrollTop,
    left: rect.left + scrollLeft
  };
}
var IframeType;

(function (IframeType) {
  IframeType['safeframe'] = 'safeframe';
  IframeType['friendly'] = 'friendly';
  IframeType['nonfriendly'] = 'nonfriendly';
})(IframeType || (IframeType = {}));

function getWindowParents() {
  var curWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var parents = [];

  while (curWindow && curWindow.parent && curWindow !== curWindow.parent) {
    parents.push(curWindow.parent);
    curWindow = curWindow.parent;
  }

  return parents;
}
function getTopmostReachableWindow() {
  var curWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var parents = getWindowParents(curWindow);
  return parents.length ? parents[parents.length - 1] : curWindow;
}
function topDocumentIsReachable() {
  var curWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  if (!isInsideIframe(curWindow)) return true;
  var windowParents = getWindowParents(curWindow);

  try {
    var topWindow = windowParents[windowParents.length - 1];
    return topWindow === curWindow.top && !!curWindow.top.document;
  } catch (e) {
    return false;
  }
}
function isInsideIframe() {
  var curWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  return curWindow !== curWindow.top;
}
function isInsideSafeframe() {
  var curWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  return !topDocumentIsReachable(curWindow) && !!curWindow.$sf;
}
function isInsideFriendlyIframe() {
  var curWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  return isInsideIframe(curWindow) && topDocumentIsReachable(curWindow);
}
function getIframeType() {
  var curWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  if (!isInsideIframe(curWindow)) return;
  if (isInsideSafeframe(curWindow)) return IframeType.safeframe;
  if (isInsideFriendlyIframe(curWindow)) return IframeType.friendly;
  return IframeType.nonfriendly;
}

function getElementWindow(element) {
  return element.ownerDocument ? element.ownerDocument.defaultView : element.defaultView;
}

var NO_CUTS = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
function getRectCuts(rect, vh, vw) {
  var vCuts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : NO_CUTS;
  var top = rect.top,
      left = rect.left;
  var bottom = rect.bottom,
      right = rect.right;
  top = top + vCuts.top;
  left = left + vCuts.left;
  vh = vh + vCuts.bottom;
  vw = vw + vCuts.right;
  return {
    bottom: Math.min(0, vh - bottom),
    left: Math.min(0, left),
    right: Math.min(0, vw - right),
    top: Math.min(0, top)
  };
}
function getFrameElements() {
  var curWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var frameElements = [];

  while (curWindow && curWindow.frameElement) {
    frameElements.unshift(curWindow.frameElement);
    curWindow = curWindow.frameElement.ownerDocument && curWindow.frameElement.ownerDocument.defaultView;
  }

  return frameElements;
}
function getElementCuts(element, vCuts) {
  var window = getElementWindow(element);
  return getRectCuts(element.getBoundingClientRect(), window ? window.innerHeight : 0, window ? window.innerWidth : 0, vCuts);
}
function area(width, height) {
  var areaCuts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NO_CUTS;
  var top = areaCuts.top,
      right = areaCuts.right,
      bottom = areaCuts.bottom,
      left = areaCuts.left;
  return Math.max(0, (width + left + right) * (height + top + bottom));
}
function getInViewRatio(element) {
  var elements = [].concat(_toConsumableArray(getFrameElements(getElementWindow(element))), [element]);
  var vCuts = elements.reduce(function (vCuts, element) {
    return getElementCuts(element, vCuts);
  }, NO_CUTS);
  return area(element.offsetWidth || 1, element.offsetHeight || 1, vCuts) / area(element.offsetWidth || 1, element.offsetHeight || 1);
}
function getInViewRatioInsideTopFrame(element) {
  var elements = [].concat(_toConsumableArray(getFrameElements().slice(1)), [element]);
  var vCuts = elements.reduce(function (vCuts, element) {
    return getElementCuts(element, vCuts);
  }, NO_CUTS);
  return area(element.offsetWidth, element.offsetHeight, vCuts) / area(element.offsetWidth, element.offsetHeight);
}
function getMayBecomeVisible(element) {
  return !isInsideIframe() || !!getInViewRatioInsideTopFrame(element);
}
function getInViewPercentage(element) {
  return ratioToPercentageCeil(getInViewRatio(element));
}
function getOffsetTopDocument(element) {
  return [].concat(_toConsumableArray(getFrameElements(getElementWindow(element))), [element]).reduce(function (acc, elem) {
    return merge(acc, getOffset(elem), function (a, b) {
      return a + b;
    });
  }, {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });
}
function getOffsetTopDocumentPercentage(element) {
  var elementWindow = getElementWindow(element);
  if (!elementWindow) throw new Error('cannot get element window');

  if (!topDocumentIsReachable(elementWindow)) {
    throw new Error("top window isn't reachable");
  }

  var topWindow = getTopmostReachableWindow(elementWindow);
  var documentHeight = getDocumentHeight(topWindow.document);
  return ratioToPercentageCeil(getOffsetTopDocument(element).top / documentHeight);
}
function getOffsetToView(element) {
  var elemWindow = getElementWindow(element);
  if (!elemWindow) throw new Error('cannot get element window');
  var topWindow = getTopmostReachableWindow(elemWindow);

  var _getOffsetTopDocument = getOffsetTopDocument(element),
      top = _getOffsetTopDocument.top,
      bottom = _getOffsetTopDocument.bottom;

  var topWindowHeight = topWindow.innerHeight;
  if (bottom < topWindow.scrollY) return bottom - topWindow.scrollY;

  if (top > topWindow.scrollY + topWindowHeight) {
    return top - topWindow.scrollY - topWindowHeight;
  }

  return 0;
}
function getOffsetToViewPercentage(element) {
  return ratioToPercentageCeil(getOffsetToView(element) / getDocumentHeight(getTopmostReachableWindow(getElementWindow(element)).document));
}
function getViewabilityDescription(element) {
  var iframeType;

  try {
    if (!element) {
      return {
        error: 'no element'
      };
    }

    iframeType = getIframeType(getElementWindow(element));

    if (!iframeType || iframeType === IframeType.friendly) {
      var inViewPercentage = getInViewPercentage(element);
      return {
        inView: inViewPercentage,
        hidden: !inViewPercentage && !getMayBecomeVisible(element),
        offsetTop: getOffsetTopDocumentPercentage(element),
        offsetView: getOffsetToViewPercentage(element),
        iframeType: iframeType
      };
    }

    return {
      iframeType: iframeType
    };
  } catch (error) {
    return {
      iframeType: iframeType,
      error: error.message
    };
  }
}
function mergeArrays(hashFn) {
  var seen = {};
  var merged = [];

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  args.forEach(function (sizes) {
    sizes.forEach(function (size) {
      var key = hashFn(size);

      if (!(key in seen)) {
        seen[key] = true;
        merged.push(size);
      }
    });
  });
  return merged;
}
function documentFocus(doc) {
  return typeof doc.hasFocus === 'function' ? +doc.hasFocus() : undefined;
}
var spec = {
  code: 'vi',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(_ref) {
    var adUnitCode = _ref.adUnitCode,
        _ref$params = _ref.params;
    _ref$params = _ref$params === void 0 ? {} : _ref$params;
    var pubId = _ref$params.pubId,
        lang = _ref$params.lang,
        cat = _ref$params.cat;
    return [pubId, lang, cat].every(function (x) {
      return typeof x === 'string';
    });
  },

  /**
   *
   * @param bidRequests
   * @param bidderRequest
   * @return {
   * {method: string,
   * data: {
      imps: {
        bidId: string,
        adUnitCode: string,
        sizes: [[number, number]],
        pubId: string,
        lang: string,
        cat: string,
        iframeType: string | undefined,
        error: string | null,
        inView: number,
        offsetTop: number,
        offsetView: number,
        hidden: boolean,
        bidFloor: number
      }[],
      refererInfo: {
      referer: string
      reachedTop: boolean,
      numIframes: number,
      stack: string[]
      canonicalUrl: string
      }
    },
   * options: {withCredentials: boolean, contentType: string}, url: string}}
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    return {
      method: 'POST',
      url: 'https://pb.vi-serve.com/prebid/bid',
      data: {
        refererInfo: bidderRequest.refererInfo,
        imps: bidRequests.map(function (_ref2) {
          var bidId = _ref2.bidId,
              adUnitCode = _ref2.adUnitCode,
              sizes = _ref2.sizes,
              params = _ref2.params,
              mediaTypes = _ref2.mediaTypes;
          var slot = document.getElementById(adUnitCode);
          var bannerSizes = get('banner.sizes', mediaTypes);
          var playerSize = get('video.playerSize', mediaTypes);
          var sizesToMerge = [];

          if (!params.useSizes) {
            if (sizes) sizesToMerge.push(sizes);
            if (bannerSizes) sizesToMerge.push(bannerSizes);
            if (playerSize) sizesToMerge.push(playerSize);
          } else if (params.useSizes === 'banner' && bannerSizes) {
            sizesToMerge.push(bannerSizes);
          } else if (params.useSizes === 'video' && playerSize) {
            sizesToMerge.push(playerSize);
          }

          return _objectSpread({
            bidId: bidId,
            adUnitCode: adUnitCode,
            sizes: mergeArrays.apply(void 0, [function (x) {
              return x.join(',');
            }].concat(sizesToMerge))
          }, getViewabilityDescription(slot), {}, params);
        }),
        focus: documentFocus(document)
      },
      options: {
        contentType: 'application/json',
        withCredentials: true
      }
    };
  },
  interpretResponse: function interpretResponse(_ref3) {
    var body = _ref3.body;
    return body;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[524]);