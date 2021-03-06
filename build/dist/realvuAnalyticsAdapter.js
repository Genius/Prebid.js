pbjsChunk([15],{

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(513);


/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lib", function() { return lib; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapterManager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
// RealVu Analytics Adapter




var utils = __webpack_require__(0);

var realvuAnalyticsAdapter = Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter__["a" /* default */])({
  global: 'realvuAnalytics',
  handler: 'on',
  analyticsType: 'bundle'
});
window.top1 = window;

try {
  var wnd = window;

  while (window.top1 != top && typeof wnd.document != 'undefined') {
    window.top1 = wnd;
    wnd = wnd.parent;
  }
} catch (e) {
  /* continue regardless of error */
}

var lib = {
  ads: [],
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  t0: new Date(),
  nn: 0,
  frm: false,
  // check first if we are inside other domain iframe
  msg: [],
  foc: !window.top1.document.hidden,
  // 1-in, 0-out of focus
  c: '',
  // owner id
  sr: '',
  //
  beacons: [],
  // array of beacons to collect while 'conf' is not responded
  defer: [],
  init: function init() {
    var z = this;
    var u = navigator.userAgent;
    z.device = u.match(/iPad|Tablet/gi) ? 'tablet' : u.match(/iPhone|iPod|Android|Opera Mini|IEMobile/gi) ? 'mobile' : 'desktop';
    if (typeof z.len == 'undefined') z.len = 0;
    z.ie = navigator.appVersion.match(/MSIE/);
    z.saf = u.match(/Safari/) && !u.match(/Chrome/);
    z.ff = u.match(/Firefox/i);
    z.cr = u.match(/Chrome/);
    z.ope = window.opera;
    z.fr = 0;

    if (window.top1 != top) {
      z.fr = 2;

      if (typeof window.top1.$sf != 'undefined') {
        z.fr = 1;
      }
    }

    z.add_evt(window.top1, 'focus', function () {
      window.top1.realvu_aa.foc = 1;
    });
    z.add_evt(window.top1, 'scroll', function () {
      window.top1.realvu_aa.foc = 1;
    });
    z.add_evt(window.top1, 'blur', function () {
      window.top1.realvu_aa.foc = 0;
    });
    z.add_evt(window.top1.document, 'blur', function () {
      window.top1.realvu_aa.foc = 0;
    });
    z.add_evt(window.top1, 'visibilitychange', function () {
      window.top1.realvu_aa.foc = !window.top1.document.hidden;
    });
    z.doLog = window.top1.location.search.match(/boost_log/) || document.referrer.match(/boost_log/) ? 1 : 0;

    if (z.doLog) {
      window.setTimeout(z.scr(window.top1.location.protocol + '//ac.realvu.net/realvu_aa_viz.js'), 500);
    }
  },
  add_evt: function add_evt(elem, evtType, func) {
    elem.addEventListener(evtType, func, true);
    this.defer.push(function () {
      elem.removeEventListener(evtType, func, true);
    });
  },
  update: function update() {
    var z = this;
    var t = window.top1;
    var de = t.document.documentElement;
    z.x1 = t.pageXOffset ? t.pageXOffset : de.scrollLeft;
    z.y1 = t.pageYOffset ? t.pageYOffset : de.scrollTop;
    var w1 = t.innerWidth ? t.innerWidth : de.clientWidth;
    var h1 = t.innerHeight ? t.innerHeight : de.clientHeight;
    z.x2 = z.x1 + w1;
    z.y2 = z.y1 + h1;
  },
  brd: function brd(s, p) {
    // return a board Width, s-element, p={Top,Right,Bottom, Left}
    var u;
    if (window.getComputedStyle) u = window.getComputedStyle(s, null);else u = s.style;
    var a = u['border' + p + 'Width'];
    return parseInt(a.length > 2 ? a.slice(0, -2) : 0);
  },
  padd: function padd(s, p) {
    // return a board Width, s-element, p={Top,Right,Bottom, Left}
    var u;
    if (window.getComputedStyle) u = window.getComputedStyle(s, null);else u = s.style;
    var a = u['padding' + p];
    return parseInt(a.length > 2 ? a.slice(0, -2) : 0);
  },
  viz_area: function viz_area(x1, x2, y1, y2) {
    // coords of Ad
    if (this.fr == 1) {
      try {
        var iv = Math.round(100 * window.top1.$sf.ext.geom().self.iv);
        return iv;
      } catch (e) {
        /* continue regardless of error */
      }
    }

    var xv1 = Math.max(x1, this.x1);
    var yv1 = Math.max(y1, this.y1);
    var xv2 = Math.min(x2, this.x2);
    var yv2 = Math.min(y2, this.y2);
    var A = Math.round(100 * ((xv2 - xv1) * (yv2 - yv1)) / ((x2 - x1) * (y2 - y1)));
    return A > 0 ? A : 0;
  },
  viz_dist: function viz_dist(x1, x2, y1, y2) {
    // coords of Ad
    var d = Math.max(0, this.x1 - x2, x1 - this.x2) + Math.max(0, this.y1 - y2, y1 - this.y2);
    return d;
  },
  track: function track(a, f, params) {
    var z = this;
    var s1 = z.tru(a, f) + params;

    if (f == 'conf') {
      z.scr(s1, a);
      z.log(' <a href=\'' + s1 + '\'>' + f + '</a>', a.num);
    } else {
      var bk = {
        s1: s1,
        a: a,
        f: f
      };
      z.beacons.push(bk);
    }
  },
  send_track: function send_track() {
    var z = this;

    if (z.sr >= 'a') {
      // conf, send beacons
      var bk = z.beacons.shift();

      while (typeof bk != 'undefined') {
        bk.s1 = bk.s1.replace(/_sr=0*_/, '_sr=' + z.sr + '_');
        z.log(' ' + bk.a.riff + ' ' + bk.a.unit_id +
        /* ' '+pin.mode+ */
        ' ' + bk.a.w + 'x' + bk.a.h + '@' + bk.a.x + ',' + bk.a.y + ' <a href=\'' + bk.s1 + '\'>' + bk.f + '</a>', bk.a.num);

        if (bk.a.rnd < Math.pow(10, 1 - (z.sr.charCodeAt(0) & 7))) {
          z.scr(bk.s1, bk.a);
        }

        bk = z.beacons.shift();
      }
    }
  },
  scr: function scr(s1, a) {
    var st = document.createElement('script');
    st.async = true;
    st.type = 'text/javascript';
    st.src = s1;

    if (a && a.dv0 != null) {
      a.dv0.appendChild(st);
    } else {
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(st, x);
    }
  },
  tru: function tru(a, f) {
    var pin = a.pins[0];
    var s2 = '//ac.realvu.net/flip/3/c=' + pin.partner_id + '_f=' + f + '_r=' + a.riff + '_s=' + a.w + 'x' + a.h;
    if (a.p) s2 += '_p=' + a.p;
    if (f != 'conf') s2 += '_ps=' + this.enc(a.unit_id);
    s2 += '_dv=' + this.device + // + '_a=' + this.enc(a.a)
    '_d=' + pin.mode + '_sr=' + this.sr + '_h=' + this.enc(a.ru) + '?';
    return s2.replace(/%/g, '!');
  },
  enc: function enc(s1) {
    // return escape(s1).replace(/[0-9a-f]{5,}/gi,'RANDOM').replace(/\*/g, '%2A').replace(/_/g, '%5F').replace(/\+/g,
    return escape(s1).replace(/\*/g, '%2A').replace(/_/g, '%5F').replace(/\+/g, '%2B').replace(/\./g, '%2E').replace(/\x2F/g, '%2F');
  },
  findPosG: function findPosG(adi) {
    var t = this;
    var ad = adi;
    var xp = 0;
    var yp = 0;
    var dc = adi.ownerDocument;
    var wnd = dc.defaultView || dc.parentWindow;

    try {
      while (ad != null && typeof ad != 'undefined') {
        if (ad.getBoundingClientRect) {
          // Internet Explorer, Firefox 3+, Google Chrome, Opera 9.5+, Safari 4+
          var r = ad.getBoundingClientRect();
          xp += r.left; // +sL;

          yp += r.top; // +sT;

          if (wnd == window.top1) {
            xp += t.x1;
            yp += t.y1;
          }
        } else {
          if (ad.tagName == 'IFRAME') {
            xp += t.brd(ad, 'Left');
            yp += t.brd(ad, 'Top');
          }

          xp += ad.offsetLeft;
          yp += ad.offsetTop;
          var op = ad.offsetParent;
          var pn = ad.parentNode;
          var opf = ad;

          while (opf != null) {
            var cs = window.getComputedStyle(opf, null);

            if (cs.position == 'fixed') {
              if (cs.top) yp += parseInt(cs.top) + this.y1;
            }

            if (opf == op) break;
            opf = opf.parentNode;
          }

          while (op != null && typeof op != 'undefined') {
            xp += op.offsetLeft;
            yp += op.offsetTop;
            var ptn = op.tagName;

            if (t.cr || t.saf || t.ff && ptn == 'TD') {
              xp += t.brd(op, 'Left');
              yp += t.brd(op, 'Top');
            }

            if (ad.tagName != 'IFRAME' && op != document.body && op != document.documentElement) {
              xp -= op.scrollLeft;
              yp -= op.scrollTop;
            }

            if (!t.ie) {
              while (op != pn && pn != null) {
                xp -= pn.scrollLeft;
                yp -= pn.scrollTop;

                if (t.ff_o) {
                  xp += t.brd(pn, 'Left');
                  yp += t.brd(pn, 'Top');
                }

                pn = pn.parentNode;
              }
            }

            pn = pn.parentNode;
            op = op.offsetParent;
          }
        }

        if (this.fr) break; // inside different domain iframe or sf

        ad = wnd.frameElement; // in case Ad is allocated inside iframe here we go up

        wnd = wnd.parent;
      }
    } catch (e) {
      /* continue regardless of error */
    }

    var q = {
      'x': Math.round(xp),
      'y': Math.round(yp)
    };
    return q;
  },
  poll: function poll() {
    var fifo = window.top1.realvu_aa_fifo;

    while (fifo.length > 0) {
      fifo.shift()();
    }

    var z = this;
    z.update();
    var now = new Date();

    if (typeof z.ptm == 'undefined') {
      z.ptm = now;
    }

    var dvz = now - z.ptm;
    z.ptm = now;

    for (var i = 0; i < z.len; i++) {
      var a = z.ads[i];
      var restored = false;

      if (a.div == null) {
        // ad unit is not found yet
        var adobj = document.getElementById(a.pins[0].unit_id);

        if (adobj == null) {
          restored = z.readPos(a);
          if (!restored) continue; // do nothing if not found
        } else {
          z.bind_obj(a, adobj);
          z.log('{m}"' + a.unit_id + '" is bound', a.num);
        }
      }

      if (!restored) {
        a.target = z.questA(a.div);
        var target = a.target !== null ? a.target : a.div;
        a.box.w = Math.max(target.offsetWidth, a.w);
        a.box.h = Math.max(target.offsetHeight, a.h);
        var q = z.findPosG(target);
        var pad = {};
        pad.t = z.padd(target, 'Top');
        pad.l = z.padd(target, 'Left');
        pad.r = z.padd(target, 'Right');
        pad.b = z.padd(target, 'Bottom');
        var ax = q.x + pad.l;
        var ay = q.y + pad.t;
        a.box.x = ax;
        a.box.y = ay;

        if (a.box.w > a.w && a.box.w > 1) {
          ax += (a.box.w - a.w - pad.l - pad.r) / 2;
        }

        if (a.box.h > a.h && a.box.h > 1) {
          ay += (a.box.h - a.h - pad.t - pad.b) / 2;
        }

        if (ax > 0 && ay > 0 && (a.x != ax || a.y != ay)) {
          a.x = ax;
          a.y = ay;
          z.writePos(a);
        }
      }

      var vtr = a.box.w * a.box.h < 242500 ? 49 : 29; // treashfold more then 49% and more then 29% for "oversized"

      if (a.pins[0].edge) {
        vtr = a.pins[0].edge - 1; // override default edge 50% (>49)
      }

      a.vz = z.viz_area(a.box.x, a.box.x + a.box.w, a.box.y, a.box.y + a.box.h);
      a.r = z.fr > 1 ? 'frame' : a.vz > vtr && z.foc ? 'yes' : 'no'; // f-frame, y-yes in view,n-not in view

      if (a.y < 0) {
        a.r = 'out'; // if the unit intentionaly moved out, count it as out.
      }

      if (a.vz > vtr && z.foc) {
        a.vt += dvz; // real dt counter in milliseconds, because of poll() can be called irregularly

        a.vtu += dvz;
      } // now process every pin


      var plen = a.pins.length;

      for (var j = 0; j < plen; j++) {
        var pin = a.pins[j];

        if (pin.state <= 1) {
          var dist = z.viz_dist(a.x, a.x + a.w, a.y, a.y + a.h);
          var near = pin.dist != null && dist <= pin.dist; // apply "near" rule for ad call only

          a.r = z.fr > 1 ? 'frame' : a.vz > vtr && z.foc ? 'yes' : 'no';

          if (near && a.r == 'no') {
            a.r = 'yes';
          }

          if (a.riff === '') {
            a.riff = a.r;
            var vrScore = z.score(a, 'v:r');

            if (vrScore != null) {
              if (a.r == 'no' && vrScore > 75) {
                a.riff = 'yes';
              }
            }

            var vv0Score = z.score(a, 'v:v0');

            if (vv0Score != null) {
              if (a.r == 'yes' && vv0Score < 30 + 25 * Math.random()) {
                a.riff = 'no';
              }
            }
          }

          if (pin.mode == 'kvp' || pin.mode == 'tx2' || (a.vz > vtr || near) && (pin.mode == 'in-view' || pin.mode == 'video')) {
            z.show(a, pin); // in-view or flip show immediately if initial realvu=yes, or delay is over
          }
        }

        if (pin.state == 2) {
          a.target = z.questA(a.div);

          if (a.target != null) {
            pin.state = 3;
            dvz = 0;
            a.vt = 0; // @if NODE_ENV='debug'

            var _now = new Date();

            var msg = (_now.getTime() - time0) / 1000 + ' RENDERED ' + a.unit_id;
            utils.logMessage(msg); // @endif

            var rpt = z.bids_rpt(a, true);
            z.track(a, 'rend', rpt);
            z.incrMem(a, 'r', 'v:r');
          }
        }

        if (pin.state > 2) {
          var tmin = pin.mode == 'video' ? 2E3 : 1E3; // mrc min view time

          if (a.vz > vtr) {
            pin.vt += dvz; // real dt counter in milliseconds, because of poll() can be called irregularly

            if (pin.state == 3) {
              pin.state = 4;
              z.incrMem(a, 'r', 'v:v0');
            }

            if (pin.state == 4 && pin.vt >= tmin) {
              pin.state = 5;

              var _rpt = z.bids_rpt(a, true);

              z.track(a, 'view', _rpt);
              z.incrMem(a, 'v', 'v:r');
              z.incrMem(a, 'v', 'v:v0');
            }

            if (pin.state == 5 && pin.vt >= 5 * tmin) {
              pin.state = 6;

              var _rpt2 = z.bids_rpt(a, true);

              z.track(a, 'view2', _rpt2);
            }
          } else if (pin.vt < tmin) {
            pin.vt = 0; // reset to track continuous 1 sec
          }
        }

        if (pin.state >= 2 && pin.mode === 'tx2' && (a.vtu > pin.rotate || pin.delay > 0 && a.vtu > pin.delay && a.riff === 'no' && a.ncall < 2) && pin.tx2n > 0) {
          // flip or rotate
          pin.tx2n--;
          pin.state = 1;
          a.vtu = 0;
          a.target = null;
        }
      }
    }

    this.send_track();
  },
  questA: function questA(a) {
    // look for the visible object of ad_sizes size
    // returns the object or null
    if (a == null) return a;

    if (a.nodeType == Node.TEXT_NODE) {
      var dc = a.ownerDocument;

      var _wnd = dc.defaultView || dc.parentWindow;

      var par = a.parentNode;

      if (_wnd == _wnd.top) {
        return par;
      } else {
        return par.offsetParent;
      }
    }

    var notFriendly = false;
    var ain = null;
    var tn = a.tagName;
    if (tn == 'HEAD' || tn == 'SCRIPT') return null;

    if (tn == 'IFRAME') {
      ain = this.doc(a);

      if (ain == null) {
        notFriendly = true;
      } else {
        a = ain;
        tn = a.tagName;
      }
    }

    if (notFriendly || tn == 'OBJECT' || tn == 'IMG' || tn == 'EMBED' || tn == 'SVG' || tn == 'CANVAS' || tn == 'DIV' && a.style.backgroundImage) {
      var w1 = a.offsetWidth;
      var h1 = a.offsetHeight;
      if (w1 > 33 && h1 > 33 && a.style.display != 'none') return a;
    }

    if (a.hasChildNodes()) {
      var b = a.firstChild;

      while (b != null) {
        var c = this.questA(b);
        if (c != null) return c;
        b = b.nextSibling;
      }
    }

    return null;
  },
  doc: function doc(f) {
    // return document of f-iframe
    var d = null;

    try {
      if (f.contentDocument) d = f.contentDocument; // DOM
      else if (f.contentWindow) d = f.contentWindow.document; // IE
    } catch (e) {
      /* continue regardless of error */
    }

    return d;
  },
  bind_obj: function bind_obj(a, adobj) {
    a.div = adobj;
    a.target = null; // initially null, found ad when served

    a.unit_id = adobj.id; // placement id or name

    a.w = adobj.offsetWidth || 1; // width, min 1

    a.h = adobj.offsetHeight || 1; // height, min 1
  },
  add: function add(wnd1, p) {
    // p - realvu unit id
    var a = {
      num: this.len,
      x: 0,
      y: 0,
      box: {
        x: 0,
        y: 0,
        h: 1,
        w: 1
      },
      // measured ad box
      p: p,
      state: 0,
      // 0-init, (1-loaded,2-rendered,3-viewed)
      delay: 0,
      // delay in msec to show ad after gets in view
      vt: 0,
      // total view time
      vtu: 0,
      // view time to update and mem
      a: '',
      // ad_placement id
      wnd: wnd1,
      div: null,
      pins: [],
      frm: null,
      // it will be frame when "show"
      riff: '',
      // r to report
      rnd: Math.random(),
      ncall: 0,
      // a callback number
      rq_bids: [],
      // rq bids of registered partners
      bids: [] // array of bids

    };
    a.ru = window.top1.location.hostname;
    window.top1.realvu_aa.ads[this.len++] = a;
    return a;
  },
  fmt: function fmt(a, pin) {
    return {
      'realvu': a.r,
      'riff': a.riff,
      'area': a.vz,
      'ncall': a.ncall,
      'n': a.num,
      'id': a.unit_id,
      'pin': pin
    };
  },
  show: function show(a, pin) {
    pin.state = 2; // 2-published

    pin.vt = 0; // reset view time counter

    if (pin.size) {
      var asz = this.setSize(pin.size);

      if (asz != null) {
        a.w = asz.w;
        a.h = asz.h;
      }
    }

    if (typeof pin.callback != 'undefined') {
      pin.callback(this.fmt(a, pin));
    }

    a.ncall++;
    this.track(a, 'show', '');
  },
  check: function check(p1) {
    var pin = {
      dist: 150,
      state: 0,
      tx2n: 7
    }; // if dist is set trigger ad when distance < pin.dist

    for (var attr in p1) {
      if (p1.hasOwnProperty(attr)) {
        if (attr == 'ad_sizes' && typeof p1[attr] == 'string') {
          pin[attr] = p1[attr].split(',');
        } else if (attr == 'edge') {
          try {
            var ed = parseInt(p1[attr]);
            if (ed > 0 && ed < 251) pin[attr] = ed;
          } catch (e) {
            /* continue regardless of error */
          }
        } else {
          pin[attr] = p1[attr];
        }
      }
    }

    var a = null;
    var z = this;

    try {
      // not to track the same object more than one time
      for (var i = 0; i < z.len; i++) {
        //         if (z.ads[i].div == adobj) { a = z.ads[i]; break; }
        if (z.ads[i].unit_id == pin.unit_id) {
          a = z.ads[i];
          break;
        }
      }

      pin.wnd = pin.wnd || window;

      if (a == null) {
        a = z.add(pin.wnd, pin.p);
        a.unit_id = pin.unit_id;
        var adobj = pin.unit ? pin.unit : document.getElementById(a.unit_id);

        if (adobj != null) {
          z.bind_obj(a, adobj);
        } else {
          z.log('{w}"' + pin.unit_id + '" not found', a.num);
        }

        if (pin.size) {
          var asz = z.setSize(pin.size);

          if (asz != null) {
            a.w = asz.w;
            a.h = asz.h;
          }
        }

        pin.delay = pin.delay || 0; // delay in msec

        if (typeof pin.mode == 'undefined') {
          if (typeof pin.callback != 'undefined' || typeof pin.content != 'undefined') {
            pin.mode = pin.delay > 0 ? 'tx2' : 'in-view';
          } else {
            pin.mode = 'kvp';
          } // delays are for views only

        }

        pin.vt = 0; // view time

        pin.state = 0;
        a.pins.push(pin);
      }

      if (this.sr === '') {
        z.track(a, 'conf', '');
        this.sr = '0';
      }

      this.poll();
      return a;
    } catch (e) {
      z.log(e.message, -1);
      return {
        r: 'err'
      };
    }
  },
  setSize: function setSize(sa) {
    var sb = sa;

    try {
      if (typeof sa == 'string') sb = sa.split('x'); // pin.size is a string WWWxHHH or array
      else if (Array.isArray(sa)) {
          var mm = 4;

          while (--mm > 0 && Array.isArray(sa[0]) && Array.isArray(sa[0][0])) {
            sa = sa[0];
          }

          for (var m = 0; m < sa.length; m++) {
            if (Array.isArray(sa[m])) {
              sb = sa[m]; // if size is [][]

              var s = sb[0] + 'x' + sb[1];

              if (s == '300x250' || s == '728x90' || s == '320x50' || s == '970x90') {
                break; // use most popular sizes
              }
            } else if (sa.length > 1) {
              sb = sa;
            }
          }
        }
      var w1 = parseInt(sb[0]);
      var h1 = parseInt(sb[1]);
      return {
        w: w1,
        h: h1
      };
    } catch (e) {
      /* continue regardless of error */
    }

    return null;
  },
  // API functions
  addUnitById: function addUnitById(partnerId, unitId, callback, delay) {
    var p1 = partnerId;

    if (typeof p1 == 'string') {
      p1 = {
        partner_id: partnerId,
        unit_id: unitId,
        callback: callback,
        delay: delay
      };
    }

    var a = window.top1.realvu_aa.check(p1);
    return a.r;
  },
  checkBidIn: function checkBidIn(partnerId, args, b) {
    // process a bid from hb
    // b==true - add/update, b==false - update only
    if (args.cpm == 0) return; // collect only bids submitted

    var boost = window.top1.realvu_aa;
    var pushBid = false;
    var adi = null;

    if (!b) {
      // update only if already checked in by xyzBidAdapter
      for (var i = 0; i < boost.ads.length; i++) {
        adi = boost.ads[i];

        if (adi.unit_id == args.adUnitCode) {
          pushBid = true;
          break;
        }
      }
    } else {
      pushBid = true;
      adi = window.top1.realvu_aa.check({
        unit_id: args.adUnitCode,
        size: args.size,
        partner_id: partnerId
      });
    }

    if (pushBid) {
      var pb = {
        bidder: args.bidder,
        cpm: args.cpm,
        size: args.size,
        adId: args.adId,
        requestId: args.requestId,
        crid: '',
        ttr: args.timeToRespond,
        winner: 0
      };

      if (args.creative_id) {
        pb.crid = args.creative_id;
      }

      adi.bids.push(pb);
    }
  },
  checkBidWon: function checkBidWon(partnerId, args, b) {
    // b==true - add/update, b==false - update only
    var z = this;
    var unitId = args.adUnitCode;

    for (var i = 0; i < z.ads.length; i++) {
      var adi = z.ads[i];

      if (adi.unit_id == unitId) {
        for (var j = 0; j < adi.bids.length; j++) {
          var bj = adi.bids[j];

          if (bj.adId == args.adId) {
            bj.winner = 1;
            break;
          }
        }

        var rpt = z.bids_rpt(adi, false);
        z.track(adi, 'win', rpt);
        break;
      }
    }
  },
  bids_rpt: function bids_rpt(a, wo) {
    // a-unit, wo=true - WinnerOnly
    var rpt = '';

    for (var i = 0; i < a.bids.length; i++) {
      var g = a.bids[i];
      if (wo && !g.winner) continue;
      rpt += '&bdr=' + g.bidder + '&cpm=' + g.cpm + '&vi=' + a.riff + '&gw=' + g.winner + '&crt=' + g.crid + '&ttr=' + g.ttr; // append bid partner_id if any

      var pid = '';

      for (var j = 0; j < a.rq_bids.length; j++) {
        var rqb = a.rq_bids[j];

        if (rqb.adId == g.adId) {
          pid = rqb.partner_id;
          break;
        }
      }

      rpt += '&bc=' + pid;
    }

    return rpt;
  },
  getStatusById: function getStatusById(unitId) {
    // return status object
    for (var i = 0; i < this.ads.length; i++) {
      var adi = this.ads[i];
      if (adi.unit_id == unitId) return this.fmt(adi);
    }

    return null;
  },
  log: function log(m1, i) {
    if (this.doLog) {
      this.msg.push({
        dt: new Date() - this.t0,
        s: 'U' + (i + 1) + m1
      });
    }
  },
  keyPos: function keyPos(a) {
    if (a.pins[0].unit_id) {
      var level = 'L' + (window.top1.location.pathname.match(/\//g) || []).length;
      return 'realvu.' + level + '.' + a.pins[0].unit_id.replace(/[0-9]{5,}/gi, 'RANDOM');
    }
  },
  writePos: function writePos(a) {
    try {
      var v = a.x + ',' + a.y + ',' + a.w + ',' + a.h;
      localStorage.setItem(this.keyPos(a), v);
    } catch (ex) {
      /* continue regardless of error */
    }
  },
  readPos: function readPos(a) {
    try {
      var s = localStorage.getItem(this.keyPos(a));

      if (s) {
        var v = s.split(',');
        a.x = parseInt(v[0], 10);
        a.y = parseInt(v[1], 10);
        a.w = parseInt(v[2], 10);
        a.h = parseInt(v[3], 10);
        a.box = {
          x: a.x,
          y: a.y,
          w: a.w,
          h: a.h
        };
        return true;
      }
    } catch (ex) {
      /* do nothing */
    }

    return false;
  },
  incrMem: function incrMem(a, evt, name) {
    try {
      var k1 = this.keyPos(a) + '.' + name;
      var vmem = localStorage.getItem(k1);
      if (vmem == null) vmem = '1:3';
      var vr = vmem.split(':');
      var nv = parseInt(vr[0], 10);
      var nr = parseInt(vr[1], 10);

      if (evt == 'r') {
        nr <<= 1;
        nr |= 1;
        nv <<= 1;
      }

      if (evt == 'v') {
        nv |= 1;
      }

      localStorage.setItem(k1, nv + ':' + nr);
    } catch (ex) {
      /* do nothing */
    }
  },
  score: function score(a, name) {
    try {
      var vstr = localStorage.getItem(this.keyPos(a) + '.' + name);

      if (vstr != null) {
        var vr = vstr.split(':');
        var nv = parseInt(vr[0], 10);
        var nr = parseInt(vr[1], 10);
        var sv = 0;
        var sr = 0;

        for (nr &= 0x3FF; nr > 0; nr >>>= 1, nv >>>= 1) {
          // count 10 deliveries
          if (nr & 0x1) sr++;
          if (nv & 0x1) sv++;
        }

        return Math.round(sv * 100 / sr);
      }
    } catch (ex) {
      /* do nothing */
    }

    return null;
  }
};
window.top1.realvu_aa_fifo = window.top1.realvu_aa_fifo || [];
window.top1.realvu_aa = window.top1.realvu_aa || lib;

if (typeof window.top1.boost_poll == 'undefined') {
  window.top1.realvu_aa.init();
  window.top1.boost_poll = setInterval(function () {
    window.top1 && window.top1.realvu_aa && window.top1.realvu_aa.poll();
  }, 20);
}

var _options = {};
realvuAnalyticsAdapter.originEnableAnalytics = realvuAnalyticsAdapter.enableAnalytics;

realvuAnalyticsAdapter.enableAnalytics = function (config) {
  _options = config.options;

  if (typeof _options.partnerId == 'undefined' || _options.partnerId == '') {
    utils.logError('Missed realvu.com partnerId parameter', 101, 'Missed partnerId parameter');
  }

  realvuAnalyticsAdapter.originEnableAnalytics(config);
  return _options.partnerId;
};

var time0 = new Date().getTime();

realvuAnalyticsAdapter.track = function (_ref) {
  var eventType = _ref.eventType,
      args = _ref.args;
  // @if NODE_ENV='debug'
  var msg = '';
  var now = new Date();
  msg += (now.getTime() - time0) / 1000 + ' eventType=' + eventType;

  if (typeof args != 'undefined') {
    msg += ', args.bidder=' + args.bidder + ' args.adUnitCode=' + args.adUnitCode + ' args.adId=' + args.adId + ' args.cpm=' + args.cpm + ' creativei_id=' + args.creative_id;
  } // msg += '\nargs=' + JSON.stringify(args) + '<br>';


  utils.logMessage(msg); // @endif

  var boost = window.top1.realvu_aa;
  var b = false; // false - update only, true - add if not checked in yet

  var partnerId = null;

  if (_options && _options.partnerId && args) {
    partnerId = _options.partnerId;
    var code = args.adUnitCode;
    b = _options.regAllUnits;

    if (!b && _options.unitIds) {
      for (var j = 0; j < _options.unitIds.length; j++) {
        if (code === _options.unitIds[j]) {
          b = true;
          break;
        }
      }
    }
  }

  if (eventType === __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_RESPONSE) {
    boost.checkBidIn(partnerId, args, b);
  } else if (eventType === __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_WON) {
    boost.checkBidWon(partnerId, args, b);
  }
}; // xyzBidAdapter calls checkin() to obtain "yes/no" viewability


realvuAnalyticsAdapter.checkIn = function (bid, partnerId) {
  // find (or add if not registered yet) the unit in boost
  if (typeof partnerId == 'undefined' || partnerId == '') {
    utils.logError('Missed realvu.com partnerId parameter', 102, 'Missed partnerId parameter');
  }

  var a = window.top1.realvu_aa.check({
    unit_id: bid.adUnitCode,
    size: bid.sizes,
    partner_id: partnerId
  });
  a.rq_bids.push({
    bidder: bid.bidder,
    adId: bid.bidId,
    partner_id: partnerId
  });
  return a.riff;
};

realvuAnalyticsAdapter.isInView = function (adUnitCode) {
  var r = 'NA';
  var s = window.top1.realvu_aa.getStatusById(adUnitCode);

  if (s) {
    r = s.realvu;
  }

  return r;
};

var disableAnalyticsSuper = realvuAnalyticsAdapter.disableAnalytics;

realvuAnalyticsAdapter.disableAnalytics = function () {
  while (lib.defer.length) {
    lib.defer.pop()();
  }

  disableAnalyticsSuper.apply(this, arguments);
};

__WEBPACK_IMPORTED_MODULE_1__src_adapterManager__["default"].registerAnalyticsAdapter({
  adapter: realvuAnalyticsAdapter,
  code: 'realvuAnalytics'
});
/* harmony default export */ __webpack_exports__["default"] = (realvuAnalyticsAdapter);

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = AnalyticsAdapter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__constants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ajax__ = __webpack_require__(5);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var events = __webpack_require__(8);

var utils = __webpack_require__(0);

var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_0__constants___default.a.EVENTS,
    AUCTION_INIT = _CONSTANTS$EVENTS.AUCTION_INIT,
    AUCTION_END = _CONSTANTS$EVENTS.AUCTION_END,
    REQUEST_BIDS = _CONSTANTS$EVENTS.REQUEST_BIDS,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_TIMEOUT = _CONSTANTS$EVENTS.BID_TIMEOUT,
    BID_RESPONSE = _CONSTANTS$EVENTS.BID_RESPONSE,
    NO_BID = _CONSTANTS$EVENTS.NO_BID,
    BID_WON = _CONSTANTS$EVENTS.BID_WON,
    BID_ADJUSTMENT = _CONSTANTS$EVENTS.BID_ADJUSTMENT,
    BIDDER_DONE = _CONSTANTS$EVENTS.BIDDER_DONE,
    SET_TARGETING = _CONSTANTS$EVENTS.SET_TARGETING,
    AD_RENDER_FAILED = _CONSTANTS$EVENTS.AD_RENDER_FAILED,
    ADD_AD_UNITS = _CONSTANTS$EVENTS.ADD_AD_UNITS;
var ENDPOINT = 'endpoint';
var BUNDLE = 'bundle';
var _sampled = true;
function AnalyticsAdapter(_ref) {
  var url = _ref.url,
      analyticsType = _ref.analyticsType,
      global = _ref.global,
      handler = _ref.handler;
  var _queue = [];
  var _eventCount = 0;
  var _enableCheck = true;

  var _handlers;

  if (analyticsType === ENDPOINT || BUNDLE) {
    _emptyQueue();
  }

  return {
    track: _track,
    enqueue: _enqueue,
    enableAnalytics: _enable,
    disableAnalytics: _disable,
    getAdapterType: function getAdapterType() {
      return analyticsType;
    },
    getGlobal: function getGlobal() {
      return global;
    },
    getHandler: function getHandler() {
      return handler;
    },
    getUrl: function getUrl() {
      return url;
    }
  };

  function _track(_ref2) {
    var eventType = _ref2.eventType,
        args = _ref2.args;

    if (this.getAdapterType() === BUNDLE) {
      window[global](handler, eventType, args);
    }

    if (this.getAdapterType() === ENDPOINT) {
      _callEndpoint.apply(void 0, arguments);
    }
  }

  function _callEndpoint(_ref3) {
    var eventType = _ref3.eventType,
        args = _ref3.args,
        callback = _ref3.callback;
    Object(__WEBPACK_IMPORTED_MODULE_1__ajax__["a" /* ajax */])(url, callback, JSON.stringify({
      eventType: eventType,
      args: args
    }));
  }

  function _enqueue(_ref4) {
    var eventType = _ref4.eventType,
        args = _ref4.args;

    var _this = this;

    if (global && window[global] && eventType && args) {
      this.track({
        eventType: eventType,
        args: args
      });
    } else {
      _queue.push(function () {
        _eventCount++;

        _this.track({
          eventType: eventType,
          args: args
        });
      });
    }
  }

  function _enable(config) {
    var _this2 = this;

    var _this = this;

    if (_typeof(config) === 'object' && _typeof(config.options) === 'object') {
      _sampled = typeof config.options.sampling === 'undefined' || Math.random() < parseFloat(config.options.sampling);
    } else {
      _sampled = true;
    }

    if (_sampled) {
      var _handlers2;

      // first send all events fired before enableAnalytics called
      events.getEvents().forEach(function (event) {
        if (!event) {
          return;
        }

        var eventType = event.eventType,
            args = event.args;

        if (eventType !== BID_TIMEOUT) {
          _enqueue.call(_this, {
            eventType: eventType,
            args: args
          });
        }
      }); // Next register event listeners to send data immediately

      _handlers = (_handlers2 = {}, _defineProperty(_handlers2, REQUEST_BIDS, function (args) {
        return _this2.enqueue({
          eventType: REQUEST_BIDS,
          args: args
        });
      }), _defineProperty(_handlers2, BID_REQUESTED, function (args) {
        return _this2.enqueue({
          eventType: BID_REQUESTED,
          args: args
        });
      }), _defineProperty(_handlers2, BID_RESPONSE, function (args) {
        return _this2.enqueue({
          eventType: BID_RESPONSE,
          args: args
        });
      }), _defineProperty(_handlers2, NO_BID, function (args) {
        return _this2.enqueue({
          eventType: NO_BID,
          args: args
        });
      }), _defineProperty(_handlers2, BID_TIMEOUT, function (args) {
        return _this2.enqueue({
          eventType: BID_TIMEOUT,
          args: args
        });
      }), _defineProperty(_handlers2, BID_WON, function (args) {
        return _this2.enqueue({
          eventType: BID_WON,
          args: args
        });
      }), _defineProperty(_handlers2, BID_ADJUSTMENT, function (args) {
        return _this2.enqueue({
          eventType: BID_ADJUSTMENT,
          args: args
        });
      }), _defineProperty(_handlers2, BIDDER_DONE, function (args) {
        return _this2.enqueue({
          eventType: BIDDER_DONE,
          args: args
        });
      }), _defineProperty(_handlers2, SET_TARGETING, function (args) {
        return _this2.enqueue({
          eventType: SET_TARGETING,
          args: args
        });
      }), _defineProperty(_handlers2, AUCTION_END, function (args) {
        return _this2.enqueue({
          eventType: AUCTION_END,
          args: args
        });
      }), _defineProperty(_handlers2, AD_RENDER_FAILED, function (args) {
        return _this2.enqueue({
          eventType: AD_RENDER_FAILED,
          args: args
        });
      }), _defineProperty(_handlers2, ADD_AD_UNITS, function (args) {
        return _this2.enqueue({
          eventType: ADD_AD_UNITS,
          args: args
        });
      }), _defineProperty(_handlers2, AUCTION_INIT, function (args) {
        args.config = _typeof(config) === 'object' ? config.options || {} : {}; // enableAnaltyics configuration object

        _this2.enqueue({
          eventType: AUCTION_INIT,
          args: args
        });
      }), _handlers2);

      utils._each(_handlers, function (handler, event) {
        events.on(event, handler);
      });
    } else {
      utils.logMessage("Analytics adapter for \"".concat(global, "\" disabled by sampling"));
    } // finally set this function to return log message, prevents multiple adapter listeners


    this._oldEnable = this.enableAnalytics;

    this.enableAnalytics = function _enable() {
      return utils.logMessage("Analytics adapter for \"".concat(global, "\" already enabled, unnecessary call to `enableAnalytics`."));
    };
  }

  function _disable() {
    utils._each(_handlers, function (handler, event) {
      events.off(event, handler);
    });

    this.enableAnalytics = this._oldEnable ? this._oldEnable : _enable;
  }

  function _emptyQueue() {
    if (_enableCheck) {
      for (var i = 0; i < _queue.length; i++) {
        _queue[i]();
      } // override push to execute the command immediately from now on


      _queue.push = function (fn) {
        fn();
      };

      _enableCheck = false;
    }

    utils.logMessage("event count sent to ".concat(global, ": ").concat(_eventCount));
  }
}

/***/ })

},[512]);