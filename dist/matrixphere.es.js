var mt = (i) => {
  throw TypeError(i);
};
var wt = (i, r, t) => r.has(i) || mt("Cannot " + t);
var l = (i, r, t) => (wt(i, r, "read from private field"), t ? t.call(i) : r.get(i)), h = (i, r, t) => r.has(i) ? mt("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(i) : r.set(i, t), d = (i, r, t, e) => (wt(i, r, "write to private field"), e ? e.call(i, t) : r.set(i, t), t);
var at = function(i, r) {
  return at = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
    t.__proto__ = e;
  } || function(t, e) {
    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
  }, at(i, r);
};
function tt(i, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  at(i, r);
  function t() {
    this.constructor = i;
  }
  i.prototype = r === null ? Object.create(r) : (t.prototype = r.prototype, new t());
}
function ct(i) {
  var r = typeof Symbol == "function" && Symbol.iterator, t = r && i[r], e = 0;
  if (t) return t.call(i);
  if (i && typeof i.length == "number") return {
    next: function() {
      return i && e >= i.length && (i = void 0), { value: i && i[e++], done: !i };
    }
  };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function lt(i, r) {
  var t = typeof Symbol == "function" && i[Symbol.iterator];
  if (!t) return i;
  var e = t.call(i), s, n = [], o;
  try {
    for (; (r === void 0 || r-- > 0) && !(s = e.next()).done; ) n.push(s.value);
  } catch (a) {
    o = { error: a };
  } finally {
    try {
      s && !s.done && (t = e.return) && t.call(e);
    } finally {
      if (o) throw o.error;
    }
  }
  return n;
}
function ht(i, r, t) {
  if (t || arguments.length === 2) for (var e = 0, s = r.length, n; e < s; e++)
    (n || !(e in r)) && (n || (n = Array.prototype.slice.call(r, 0, e)), n[e] = r[e]);
  return i.concat(n || Array.prototype.slice.call(r));
}
function x(i) {
  return typeof i == "function";
}
function At(i) {
  var r = function(e) {
    Error.call(e), e.stack = new Error().stack;
  }, t = i(r);
  return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
var it = At(function(i) {
  return function(t) {
    i(this), this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(e, s) {
      return s + 1 + ") " + e.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function dt(i, r) {
  if (i) {
    var t = i.indexOf(r);
    0 <= t && i.splice(t, 1);
  }
}
var et = function() {
  function i(r) {
    this.initialTeardown = r, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return i.prototype.unsubscribe = function() {
    var r, t, e, s, n;
    if (!this.closed) {
      this.closed = !0;
      var o = this._parentage;
      if (o)
        if (this._parentage = null, Array.isArray(o))
          try {
            for (var a = ct(o), u = a.next(); !u.done; u = a.next()) {
              var c = u.value;
              c.remove(this);
            }
          } catch (_) {
            r = { error: _ };
          } finally {
            try {
              u && !u.done && (t = a.return) && t.call(a);
            } finally {
              if (r) throw r.error;
            }
          }
        else
          o.remove(this);
      var v = this.initialTeardown;
      if (x(v))
        try {
          v();
        } catch (_) {
          n = _ instanceof it ? _.errors : [_];
        }
      var f = this._finalizers;
      if (f) {
        this._finalizers = null;
        try {
          for (var w = ct(f), $ = w.next(); !$.done; $ = w.next()) {
            var O = $.value;
            try {
              $t(O);
            } catch (_) {
              n = n ?? [], _ instanceof it ? n = ht(ht([], lt(n)), lt(_.errors)) : n.push(_);
            }
          }
        } catch (_) {
          e = { error: _ };
        } finally {
          try {
            $ && !$.done && (s = w.return) && s.call(w);
          } finally {
            if (e) throw e.error;
          }
        }
      }
      if (n)
        throw new it(n);
    }
  }, i.prototype.add = function(r) {
    var t;
    if (r && r !== this)
      if (this.closed)
        $t(r);
      else {
        if (r instanceof i) {
          if (r.closed || r._hasParent(this))
            return;
          r._addParent(this);
        }
        (this._finalizers = (t = this._finalizers) !== null && t !== void 0 ? t : []).push(r);
      }
  }, i.prototype._hasParent = function(r) {
    var t = this._parentage;
    return t === r || Array.isArray(t) && t.includes(r);
  }, i.prototype._addParent = function(r) {
    var t = this._parentage;
    this._parentage = Array.isArray(t) ? (t.push(r), t) : t ? [t, r] : r;
  }, i.prototype._removeParent = function(r) {
    var t = this._parentage;
    t === r ? this._parentage = null : Array.isArray(t) && dt(t, r);
  }, i.prototype.remove = function(r) {
    var t = this._finalizers;
    t && dt(t, r), r instanceof i && r._removeParent(this);
  }, i.EMPTY = function() {
    var r = new i();
    return r.closed = !0, r;
  }(), i;
}(), Pt = et.EMPTY;
function Rt(i) {
  return i instanceof et || i && "closed" in i && x(i.remove) && x(i.add) && x(i.unsubscribe);
}
function $t(i) {
  x(i) ? i() : i.unsubscribe();
}
var Ht = {
  Promise: void 0
}, Lt = {
  setTimeout: function(i, r) {
    for (var t = [], e = 2; e < arguments.length; e++)
      t[e - 2] = arguments[e];
    return setTimeout.apply(void 0, ht([i, r], lt(t)));
  },
  clearTimeout: function(i) {
    return clearTimeout(i);
  },
  delegate: void 0
};
function Jt(i) {
  Lt.setTimeout(function() {
    throw i;
  });
}
function St() {
}
function Q(i) {
  i();
}
var Ut = function(i) {
  tt(r, i);
  function r(t) {
    var e = i.call(this) || this;
    return e.isStopped = !1, t ? (e.destination = t, Rt(t) && t.add(e)) : e.destination = Yt, e;
  }
  return r.create = function(t, e, s) {
    return new ft(t, e, s);
  }, r.prototype.next = function(t) {
    this.isStopped || this._next(t);
  }, r.prototype.error = function(t) {
    this.isStopped || (this.isStopped = !0, this._error(t));
  }, r.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, r.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, i.prototype.unsubscribe.call(this), this.destination = null);
  }, r.prototype._next = function(t) {
    this.destination.next(t);
  }, r.prototype._error = function(t) {
    try {
      this.destination.error(t);
    } finally {
      this.unsubscribe();
    }
  }, r.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, r;
}(et), Vt = function() {
  function i(r) {
    this.partialObserver = r;
  }
  return i.prototype.next = function(r) {
    var t = this.partialObserver;
    if (t.next)
      try {
        t.next(r);
      } catch (e) {
        q(e);
      }
  }, i.prototype.error = function(r) {
    var t = this.partialObserver;
    if (t.error)
      try {
        t.error(r);
      } catch (e) {
        q(e);
      }
    else
      q(r);
  }, i.prototype.complete = function() {
    var r = this.partialObserver;
    if (r.complete)
      try {
        r.complete();
      } catch (t) {
        q(t);
      }
  }, i;
}(), ft = function(i) {
  tt(r, i);
  function r(t, e, s) {
    var n = i.call(this) || this, o;
    return x(t) || !t ? o = {
      next: t ?? void 0,
      error: e ?? void 0,
      complete: s ?? void 0
    } : o = t, n.destination = new Vt(o), n;
  }
  return r;
}(Ut);
function q(i) {
  Jt(i);
}
function Bt(i) {
  throw i;
}
var Yt = {
  closed: !0,
  next: St,
  error: Bt,
  complete: St
}, Kt = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function Wt(i) {
  return i;
}
function zt(i) {
  return i.length === 0 ? Wt : i.length === 1 ? i[0] : function(t) {
    return i.reduce(function(e, s) {
      return s(e);
    }, t);
  };
}
var xt = function() {
  function i(r) {
    r && (this._subscribe = r);
  }
  return i.prototype.lift = function(r) {
    var t = new i();
    return t.source = this, t.operator = r, t;
  }, i.prototype.subscribe = function(r, t, e) {
    var s = this, n = Gt(r) ? r : new ft(r, t, e);
    return Q(function() {
      var o = s, a = o.operator, u = o.source;
      n.add(a ? a.call(n, u) : u ? s._subscribe(n) : s._trySubscribe(n));
    }), n;
  }, i.prototype._trySubscribe = function(r) {
    try {
      return this._subscribe(r);
    } catch (t) {
      r.error(t);
    }
  }, i.prototype.forEach = function(r, t) {
    var e = this;
    return t = Et(t), new t(function(s, n) {
      var o = new ft({
        next: function(a) {
          try {
            r(a);
          } catch (u) {
            n(u), o.unsubscribe();
          }
        },
        error: n,
        complete: s
      });
      e.subscribe(o);
    });
  }, i.prototype._subscribe = function(r) {
    var t;
    return (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(r);
  }, i.prototype[Kt] = function() {
    return this;
  }, i.prototype.pipe = function() {
    for (var r = [], t = 0; t < arguments.length; t++)
      r[t] = arguments[t];
    return zt(r)(this);
  }, i.prototype.toPromise = function(r) {
    var t = this;
    return r = Et(r), new r(function(e, s) {
      var n;
      t.subscribe(function(o) {
        return n = o;
      }, function(o) {
        return s(o);
      }, function() {
        return e(n);
      });
    });
  }, i.create = function(r) {
    return new i(r);
  }, i;
}();
function Et(i) {
  var r;
  return (r = i ?? Ht.Promise) !== null && r !== void 0 ? r : Promise;
}
function Xt(i) {
  return i && x(i.next) && x(i.error) && x(i.complete);
}
function Gt(i) {
  return i && i instanceof Ut || Xt(i) && Rt(i);
}
var qt = At(function(i) {
  return function() {
    i(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), It = function(i) {
  tt(r, i);
  function r() {
    var t = i.call(this) || this;
    return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
  }
  return r.prototype.lift = function(t) {
    var e = new Ot(this, this);
    return e.operator = t, e;
  }, r.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new qt();
  }, r.prototype.next = function(t) {
    var e = this;
    Q(function() {
      var s, n;
      if (e._throwIfClosed(), !e.isStopped) {
        e.currentObservers || (e.currentObservers = Array.from(e.observers));
        try {
          for (var o = ct(e.currentObservers), a = o.next(); !a.done; a = o.next()) {
            var u = a.value;
            u.next(t);
          }
        } catch (c) {
          s = { error: c };
        } finally {
          try {
            a && !a.done && (n = o.return) && n.call(o);
          } finally {
            if (s) throw s.error;
          }
        }
      }
    });
  }, r.prototype.error = function(t) {
    var e = this;
    Q(function() {
      if (e._throwIfClosed(), !e.isStopped) {
        e.hasError = e.isStopped = !0, e.thrownError = t;
        for (var s = e.observers; s.length; )
          s.shift().error(t);
      }
    });
  }, r.prototype.complete = function() {
    var t = this;
    Q(function() {
      if (t._throwIfClosed(), !t.isStopped) {
        t.isStopped = !0;
        for (var e = t.observers; e.length; )
          e.shift().complete();
      }
    });
  }, r.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(r.prototype, "observed", {
    get: function() {
      var t;
      return ((t = this.observers) === null || t === void 0 ? void 0 : t.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._trySubscribe = function(t) {
    return this._throwIfClosed(), i.prototype._trySubscribe.call(this, t);
  }, r.prototype._subscribe = function(t) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t);
  }, r.prototype._innerSubscribe = function(t) {
    var e = this, s = this, n = s.hasError, o = s.isStopped, a = s.observers;
    return n || o ? Pt : (this.currentObservers = null, a.push(t), new et(function() {
      e.currentObservers = null, dt(a, t);
    }));
  }, r.prototype._checkFinalizedStatuses = function(t) {
    var e = this, s = e.hasError, n = e.thrownError, o = e.isStopped;
    s ? t.error(n) : o && t.complete();
  }, r.prototype.asObservable = function() {
    var t = new xt();
    return t.source = this, t;
  }, r.create = function(t, e) {
    return new Ot(t, e);
  }, r;
}(xt), Ot = function(i) {
  tt(r, i);
  function r(t, e) {
    var s = i.call(this) || this;
    return s.destination = t, s.source = e, s;
  }
  return r.prototype.next = function(t) {
    var e, s;
    (s = (e = this.destination) === null || e === void 0 ? void 0 : e.next) === null || s === void 0 || s.call(e, t);
  }, r.prototype.error = function(t) {
    var e, s;
    (s = (e = this.destination) === null || e === void 0 ? void 0 : e.error) === null || s === void 0 || s.call(e, t);
  }, r.prototype.complete = function() {
    var t, e;
    (e = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || e === void 0 || e.call(t);
  }, r.prototype._subscribe = function(t) {
    var e, s;
    return (s = (e = this.source) === null || e === void 0 ? void 0 : e.subscribe(t)) !== null && s !== void 0 ? s : Pt;
  }, r;
}(It);
class jt extends It {
  constructor() {
    super(), this.pipe0 = super.pipe, this.pipe = (r) => {
      let t = this.pipe0(r);
      return t.subscribe0 = t.subscribe, t.subscribe = (e) => {
        if (!e.hasOwnProperty("next"))
          throw "no exist next! in subscribe({ ... })";
        return t.subscribe0({
          next: (s) => e.next(s),
          complete: e.complete || void 0,
          error: e.complete || void 0
        });
      }, t;
    };
  }
}
function p(i) {
  return `Minified Redux error #${i}; visit https://redux.js.org/Errors?code=${i} for the full message or use the non-minified dev environment for full errors. `;
}
var Qt = typeof Symbol == "function" && Symbol.observable || "@@observable", Tt = Qt, st = () => Math.random().toString(36).substring(7).split("").join("."), Zt = {
  INIT: `@@redux/INIT${/* @__PURE__ */ st()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ st()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${st()}`
}, Z = Zt;
function te(i) {
  if (typeof i != "object" || i === null)
    return !1;
  let r = i;
  for (; Object.getPrototypeOf(r) !== null; )
    r = Object.getPrototypeOf(r);
  return Object.getPrototypeOf(i) === r || Object.getPrototypeOf(i) === null;
}
function Ct(i, r, t) {
  if (typeof i != "function")
    throw new Error(p(2));
  if (typeof r == "function" && typeof t == "function" || typeof t == "function" && typeof arguments[3] == "function")
    throw new Error(p(0));
  if (typeof r == "function" && typeof t > "u" && (t = r, r = void 0), typeof t < "u") {
    if (typeof t != "function")
      throw new Error(p(1));
    return t(Ct)(i, r);
  }
  let e = i, s = r, n = /* @__PURE__ */ new Map(), o = n, a = 0, u = !1;
  function c() {
    o === n && (o = /* @__PURE__ */ new Map(), n.forEach((b, S) => {
      o.set(S, b);
    }));
  }
  function v() {
    if (u)
      throw new Error(p(3));
    return s;
  }
  function f(b) {
    if (typeof b != "function")
      throw new Error(p(4));
    if (u)
      throw new Error(p(5));
    let S = !0;
    c();
    const T = a++;
    return o.set(T, b), function() {
      if (S) {
        if (u)
          throw new Error(p(6));
        S = !1, c(), o.delete(T), n = null;
      }
    };
  }
  function w(b) {
    if (!te(b))
      throw new Error(p(7));
    if (typeof b.type > "u")
      throw new Error(p(8));
    if (typeof b.type != "string")
      throw new Error(p(17));
    if (u)
      throw new Error(p(9));
    try {
      u = !0, s = e(s, b);
    } finally {
      u = !1;
    }
    return (n = o).forEach((T) => {
      T();
    }), b;
  }
  function $(b) {
    if (typeof b != "function")
      throw new Error(p(10));
    e = b, w({
      type: Z.REPLACE
    });
  }
  function O() {
    const b = f;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(S) {
        if (typeof S != "object" || S === null)
          throw new Error(p(11));
        function T() {
          const gt = S;
          gt.next && gt.next(v());
        }
        return T(), {
          unsubscribe: b(T)
        };
      },
      [Tt]() {
        return this;
      }
    };
  }
  return w({
    type: Z.INIT
  }), {
    dispatch: w,
    subscribe: f,
    getState: v,
    replaceReducer: $,
    [Tt]: O
  };
}
function Mt(i, r, t) {
  return Ct(i, r, t);
}
function ee(i) {
  Object.keys(i).forEach((r) => {
    const t = i[r];
    if (typeof t(void 0, {
      type: Z.INIT
    }) > "u")
      throw new Error(p(12));
    if (typeof t(void 0, {
      type: Z.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(p(13));
  });
}
function A(i) {
  const r = Object.keys(i), t = {};
  for (let n = 0; n < r.length; n++) {
    const o = r[n];
    typeof i[o] == "function" && (t[o] = i[o]);
  }
  const e = Object.keys(t);
  let s;
  try {
    ee(t);
  } catch (n) {
    s = n;
  }
  return function(o = {}, a) {
    if (s)
      throw s;
    let u = !1;
    const c = {};
    for (let v = 0; v < e.length; v++) {
      const f = e[v], w = t[f], $ = o[f], O = w($, a);
      if (typeof O > "u")
        throw a && a.type, new Error(p(14));
      c[f] = O, u = u || O !== $;
    }
    return u = u || e.length !== Object.keys(o).length, u ? c : o;
  };
}
function Nt(...i) {
  return i.length === 0 ? (r) => r : i.length === 1 ? i[0] : i.reduce((r, t) => (...e) => r(t(...e)));
}
function re(...i) {
  return (r) => (t, e) => {
    const s = r(t, e);
    let n = () => {
      throw new Error(p(15));
    };
    const o = {
      getState: s.getState,
      dispatch: (u, ...c) => n(u, ...c)
    }, a = i.map((u) => u(o));
    return n = Nt(...a)(s.dispatch), {
      ...s,
      dispatch: n
    };
  };
}
const R = {
  UNDO: "@@redux-undo/UNDO",
  REDO: "@@redux-undo/REDO",
  JUMP_TO_FUTURE: "@@redux-undo/JUMP_TO_FUTURE",
  JUMP_TO_PAST: "@@redux-undo/JUMP_TO_PAST",
  JUMP: "@@redux-undo/JUMP",
  CLEAR_HISTORY: "@@redux-undo/CLEAR_HISTORY"
};
function pt(i, r = []) {
  return Array.isArray(i) ? i : typeof i == "string" ? [i] : r;
}
function ie(i) {
  return typeof i.present < "u" && typeof i.future < "u" && typeof i.past < "u" && Array.isArray(i.future) && Array.isArray(i.past);
}
function yt(i) {
  const r = pt(i);
  return (t) => r.indexOf(t.type) >= 0;
}
function P(i, r, t, e = null) {
  return {
    past: i,
    present: r,
    future: t,
    group: e,
    _latestUnfiltered: r,
    index: i.length,
    limit: i.length + t.length + 1
  };
}
let rt, g;
const vt = {
  prevState: "#9E9E9E",
  action: "#03A9F4",
  nextState: "#4CAF50"
};
function se() {
  g = {
    header: [],
    prev: [],
    action: [],
    next: [],
    msgs: []
  };
}
function ne() {
  const { header: i, prev: r, next: t, action: e, msgs: s } = g;
  console.group ? (console.groupCollapsed(...i), console.log(...r), console.log(...e), console.log(...t), console.log(...s), console.groupEnd()) : (console.log(...i), console.log(...r), console.log(...e), console.log(...t), console.log(...s));
}
function bt(i, r, t) {
  return [
    `%c${i}`,
    `color: ${r}; font-weight: bold`,
    t
  ];
}
function oe(i, r) {
  se(), rt && (console.group ? (g.header = ["%credux-undo", "font-style: italic", "action", i.type], g.action = bt("action", vt.action, i), g.prev = bt("prev history", vt.prevState, r)) : (g.header = ["redux-undo action", i.type], g.action = ["action", i], g.prev = ["prev history", r]));
}
function m(i) {
  rt && (console.group ? g.next = bt("next history", vt.nextState, i) : g.next = ["next history", i], ne());
}
function y(...i) {
  rt && (g.msgs = g.msgs.concat([...i, `
`]));
}
function ue(i) {
  rt = i;
}
function nt(i, r) {
  const t = P([], i, []);
  return r && (t._latestUnfiltered = null), t;
}
function ae(i, r, t, e) {
  const s = i.past.length + 1;
  y("inserting", r), y("new free: ", t - s);
  const { past: n, _latestUnfiltered: o } = i, a = t && t <= s, u = n.slice(a ? 1 : 0), c = o != null ? [
    ...u,
    o
  ] : u;
  return P(c, r, [], e);
}
function kt(i, r) {
  if (r < 0 || r >= i.future.length)
    return i;
  const { past: t, future: e, _latestUnfiltered: s } = i, n = [...t, s, ...e.slice(0, r)], o = e[r], a = e.slice(r + 1);
  return P(n, o, a);
}
function Ft(i, r) {
  if (r < 0 || r >= i.past.length)
    return i;
  const { past: t, future: e, _latestUnfiltered: s } = i, n = t.slice(0, r), o = [...t.slice(r + 1), s, ...e], a = t[r];
  return P(n, a, o);
}
function ot(i, r) {
  return r > 0 ? kt(i, r - 1) : r < 0 ? Ft(i, i.past.length + r) : i;
}
function ce(i, r) {
  return r.indexOf(i) > -1 ? i : !i;
}
function _t(i, r = {}) {
  ue(r.debug);
  const t = {
    limit: void 0,
    filter: () => !0,
    groupBy: () => null,
    undoType: R.UNDO,
    redoType: R.REDO,
    jumpToPastType: R.JUMP_TO_PAST,
    jumpToFutureType: R.JUMP_TO_FUTURE,
    jumpType: R.JUMP,
    neverSkipReducer: !1,
    ignoreInitialState: !1,
    syncFilter: !1,
    ...r,
    initTypes: pt(r.initTypes, ["@@redux-undo/INIT"]),
    clearHistoryType: pt(
      r.clearHistoryType,
      [R.CLEAR_HISTORY]
    )
  }, e = t.neverSkipReducer ? (n, o, ...a) => ({
    ...n,
    present: i(n.present, o, ...a)
  }) : (n) => n;
  let s;
  return (n = s, o = {}, ...a) => {
    oe(o, n);
    let u = n;
    if (!s)
      if (y("history is uninitialized"), n === void 0) {
        const v = i(n, { type: "@@redux-undo/CREATE_HISTORY" }, ...a);
        return u = nt(
          v,
          t.ignoreInitialState
        ), y("do not set initialState on probe actions"), m(u), u;
      } else
        ie(n) ? (u = s = t.ignoreInitialState ? n : P(
          n.past,
          n.present,
          n.future
        ), y(
          "initialHistory initialized: initialState is a history",
          s
        )) : (u = s = nt(
          n,
          t.ignoreInitialState
        ), y(
          "initialHistory initialized: initialState is not a history",
          s
        ));
    let c;
    switch (o.type) {
      case void 0:
        return u;
      case t.undoType:
        return c = ot(u, -1), y("perform undo"), m(c), e(c, o, ...a);
      case t.redoType:
        return c = ot(u, 1), y("perform redo"), m(c), e(c, o, ...a);
      case t.jumpToPastType:
        return c = Ft(u, o.index), y(`perform jumpToPast to ${o.index}`), m(c), e(c, o, ...a);
      case t.jumpToFutureType:
        return c = kt(u, o.index), y(`perform jumpToFuture to ${o.index}`), m(c), e(c, o, ...a);
      case t.jumpType:
        return c = ot(u, o.index), y(`perform jump to ${o.index}`), m(c), e(c, o, ...a);
      case ce(o.type, t.clearHistoryType):
        return c = nt(u.present, t.ignoreInitialState), y("perform clearHistory"), m(c), e(c, o, ...a);
      default:
        if (c = i(
          u.present,
          o,
          ...a
        ), t.initTypes.some((f) => f === o.type))
          return y("reset history due to init action"), m(s), s;
        if (u._latestUnfiltered === c)
          return u;
        if (typeof t.filter == "function" && !t.filter(
          o,
          c,
          u
        )) {
          const f = P(
            u.past,
            c,
            u.future,
            u.group
          );
          return t.syncFilter || (f._latestUnfiltered = u._latestUnfiltered), y("filter ignored action, not storing it in past"), m(f), f;
        }
        const v = t.groupBy(o, c, u);
        if (v != null && v === u.group) {
          const f = P(
            u.past,
            c,
            u.future,
            u.group
          );
          return y("groupBy grouped the action with the previous action"), m(f), f;
        }
        return u = ae(u, c, t.limit, v), y("inserted new state into history"), m(u), u;
    }
  };
}
class le {
  constructor(r) {
  }
}
class he {
}
class ut extends le {
  constructor(r) {
    super(r), this.next = null, this.prev = null, this.value = r;
  }
}
class de extends he {
  constructor() {
    super(...arguments), this.head = null, this.tail = null;
  }
  push(r) {
    const t = new ut(r);
    return this.head ? (t.prev = this.tail, this.tail && (this.tail.next = t), this.tail = t) : (this.head = t, this.tail = t), this;
  }
  unshift(r) {
    const t = new ut(r);
    return this.head ? (t.next = this.head, this.head.prev = t, this.head = t) : (this.head = t, this.tail = t), this;
  }
  insertAt(r, t) {
    if (r <= 0) return this.unshift(t);
    let e = this.head, s = 0;
    for (; e && s < r; )
      e = e.next, s++;
    const n = new ut(t);
    if (e)
      n.prev = e.prev, n.next = e, e.prev && (e.prev.next = n), e.prev = n, e === this.head && (this.head = n);
    else
      return this.push(t);
    return this;
  }
  removeAt(r) {
    if (r < 0) return this;
    let t = this.head, e = 0;
    for (; t && e < r; )
      t = t.next, e++;
    return t ? (t.prev ? t.prev.next = t.next : this.head = t.next, t.next ? t.next.prev = t.prev : this.tail = t.prev, this) : this;
  }
  pop() {
    if (!this.tail) return { value: null, list: this };
    const r = this.tail.value;
    return this.tail.prev ? (this.tail = this.tail.prev, this.tail.next = null) : (this.head = null, this.tail = null), { value: r, list: this };
  }
  shift() {
    if (!this.head) return { value: null, list: this };
    const r = this.head.value;
    return this.head.next ? (this.head = this.head.next, this.head.prev = null) : (this.head = null, this.tail = null), { value: r, list: this };
  }
  find(r) {
    let t = this.head, e = 0;
    for (; t; ) {
      if (r(t.value, e)) return t.value;
      t = t.next, e++;
    }
    return null;
  }
  findIndex(r) {
    let t = this.head, e = 0;
    for (; t; ) {
      if (r(t.value, e)) return e;
      t = t.next, e++;
    }
    return -1;
  }
  toArray() {
    const r = [];
    let t = this.head;
    for (; t; )
      r.push(t.value), t = t.next;
    return r;
  }
  getValue() {
    return this.head ? this.head.value : null;
  }
}
class fe {
  constructor() {
    this.reducers = {}, this.recordReducers = {}, this.actions = /* @__PURE__ */ new Map(), this.recordActions = /* @__PURE__ */ new Map(), this.observables = /* @__PURE__ */ new Map(), this.methods = /* @__PURE__ */ new Map(), this.parameters = /* @__PURE__ */ new Map();
  }
}
var U;
class pe extends fe {
  constructor() {
    super();
    h(this, U);
    this.setMiddleware = () => {
      if (!this.store)
        return (t) => (e) => (s) => {
          const n = s.type.split("_")[0];
          let o = {
            name: n,
            state: this.store.getState()[n],
            action: s
          };
          s.dispatched = {
            name: o.name,
            state: o.state
          };
          let a;
          if (!(s.type.includes("_undo") || s.type.includes("_redo"))) {
            if (this.observables.has(`${n}_before`))
              this.observables.get(`${n}_before`).next(s);
            else if (this.methods.has(`${n}_before`)) {
              const u = this.methods.get(`${n}_before`);
              u && (a = l(this, U).call(this, u(s)), a.dispatched = s.dispatched);
            }
          }
          return this.store.dispatched.push(o), a && (s = a), e(s);
        };
    }, d(this, U, (t) => {
      if (!t.hasOwnProperty("type")) throw "No exist action.type property.";
      if (typeof t.type != "string") throw "action.type is not 'string' type.";
      if (!t.hasOwnProperty("value")) throw "No exist action.value property.";
      return t;
    });
  }
}
U = new WeakMap();
var I, j, C;
class ye extends pe {
  constructor() {
    super();
    h(this, I);
    h(this, j);
    h(this, C);
    this.setRecord = () => {
      l(this, I).call(this), l(this, j).call(this), l(this, C).call(this);
    }, d(this, I, () => {
      this.record || (this.record = Mt(
        A({ start$: (t = {}) => t })
      ));
    }), d(this, j, () => {
      this.record.dispatch0 = this.record.dispatch, this.record.dispatched = null, this.record.dispatch = (t) => {
        const e = t.type.split("_")[0];
        let s = {
          name: e,
          state: this.record.getState()[e],
          action: t
        };
        t.dispatched = {
          name: s.name,
          state: s.state
        }, this.record.dispatched = s, this.record.dispatch0(t);
      };
    }), d(this, C, () => {
      this.record.subscribe(() => {
        if (this.record.current = this.record.getState(), !this.record.dispatched) return;
        const t = this.record.dispatched.action.type;
        if (t.substring(t.length - 5, t.length) === "_undo") {
          const e = this.record.dispatched.state.past;
          if (e.length === 0) return;
          this.store.dispatch({ type: `${this.record.dispatched.name}_undo`, value: e[e.length - 1] });
          return;
        }
        if (t.substring(t.length - 5, t.length) === "_redo") {
          const e = this.record.dispatched.state.future;
          if (e.length === 0) return;
          this.store.dispatch({ type: `${this.record.dispatched.name}_redo`, value: e[0] });
          return;
        }
      });
    }), this.createRecordState = (t) => {
      let { name: e, initialState: s } = t;
      if (this.recordReducers.hasOwnProperty(e)) return;
      let n = Date.now();
      this.recordActions.set(`${e}_update`, (a, u) => u.value);
      let o = (a = { value: `${e} created.`, timestamp: n }, u) => {
        if (o.stateName !== u.type.split("_")[0] || !this.recordActions.has(u.type)) return a;
        const c = this.recordActions.get(u.type);
        return c ? c(a, u) : a;
      };
      o.stateName = e, this.recordReducers[e] = _t(o, {
        limit: 1e3,
        filter: yt(Array.from(this.recordActions.keys())),
        undoType: `${e}_undo`,
        redoType: `${e}_redo`
      }), this.record.replaceReducer(A(this.recordReducers)), this.store.currentRecord = this.record.getState(), this.record.dispatch({ type: `${e}_update`, value: {
        value: s == null ? void 0 : s.value,
        timestamp: n
      } });
    };
  }
}
I = new WeakMap(), j = new WeakMap(), C = new WeakMap();
var M, N, k, F, D, H, L, J, V, B, Y, K, W;
class ve extends ye {
  constructor() {
    super();
    h(this, M);
    h(this, N);
    h(this, k);
    h(this, F);
    h(this, D);
    h(this, H);
    h(this, L);
    h(this, J);
    h(this, V);
    h(this, B);
    h(this, Y);
    h(this, K);
    h(this, W);
    this.setStore = () => (l(this, M).call(this), l(this, N).call(this), l(this, k).call(this), l(this, D).call(this), l(this, H).call(this), l(this, L).call(this), l(this, J).call(this), l(this, V).call(this), l(this, B).call(this), l(this, Y).call(this), l(this, K).call(this), l(this, W).call(this), this.store), d(this, M, () => {
      if (this.store) return;
      const t = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Nt;
      let e = this.store = Mt(
        A({ start$: (s = {}) => s }),
        t(re(this.setMiddleware()))
      );
      e.dispatched = new de(), e.current = e.getState(), e.currentRecord = {};
    }), d(this, N, () => {
      let t = this.store;
      t.subscribe(() => {
        let e = t.dispatched.shift().value;
        if (t.current = t.getState(), t.getStateR && (t.currentRecord = t.getStateR()), !e || e.action.type === "initial$_delete" || e.action.type === "history$_update") return;
        let s = e.action.type;
        if (s === "history$_undo") {
          let n = t.current.history$.future[0].value;
          switch (n.name) {
            case "initial$":
              t.remove && t.remove(n.value.name, "undo");
              return;
            case "delete$":
              let o = this.parameters.get(n.value);
              o && this.setValueState(o, "undo");
              return;
            default:
              this.record.dispatch({ type: `${n.name}_undo` });
              return;
          }
        }
        if (s === "history$_redo") {
          let n = t.current.history$.present.value;
          switch (n.name) {
            case "initial$":
              let o = this.parameters.get(n.value.name);
              o && this.setValueState(o, "redo");
              return;
            case "delete$":
              t.remove && t.remove(n.value, "redo");
              return;
            default:
              this.record.dispatch({ type: `${n.name}_redo` });
              return;
          }
        }
        if (s.substring(s.length - 5, s.length) === "_undo") {
          this.observables.has(`${e.name}_undo`) && this.observables.get(`${e.name}_undo`).next(e.action);
          return;
        } else if (s.substring(s.length - 5, s.length) === "_redo") {
          this.observables.has(`${e.name}_redo`) && this.observables.get(`${e.name}_redo`).next(e.action);
          return;
        } else {
          if (e.name === "initial$" && e.action.isSilent) return;
          t.dispatch({ type: "history$_update", value: {
            name: e.name,
            value: e.action.value
          } }), this.record.dispatch({ type: `${e.name}_update`, value: {
            value: e.action.value,
            timestamp: Date.now()
          } });
        }
        s.substring(s.length - 7, s.length) === "_update" && e.name !== "initial$" && (this.parameters.get(e.name).inputState = t.current[e.name]), this.observables.has(`${e.name}_after`) && this.observables.get(`${e.name}_after`).next(e.action);
      });
    }), d(this, k, () => {
      this.store.set = (t, e = "value") => {
        switch (e) {
          case "value":
            this.setValueState && this.setValueState(t);
            break;
          case "film":
            l(this, F).call(this, t.name);
            break;
        }
      };
    }), d(this, F, (t) => {
      if (t.includes("$"))
        throw "State name must not contain '$'. '$' is automatically assigned in state name.";
      if (t === "initial")
        throw "Cannot create 'initial$' state, 'initial$' is system state.";
      if (t === "history")
        throw "Cannot create 'history$' state, 'history$' is system state.";
      const e = (s = { value: `${t}$ created.`, timestamp: Date.now() }, n) => n.type === `${t}$` ? { value: n.value, timestamp: Date.now() } : s;
      this.reducers[`${t}$`] = _t(e, {
        limit: 1e3,
        filter: yt([`${t}$`]),
        undoType: `${t}$_undo`,
        redoType: `${t}$_redo`
      }), this.store.replaceReducer(A(this.reducers));
    }), d(this, D, () => {
      let t = this.store;
      t.get = (e) => {
        if (!t.current.hasOwnProperty(e))
          return console.warn(`no exist property[ ${e} ]`), null;
        if (e === "initial$") return t.current.initial$;
        if (e.includes("$")) return {
          past: t.current[e].past,
          present: t.current[e].present,
          future: t.current[e].future
        };
        if (t.current[e].hasOwnProperty("value"))
          return t.current[e].value;
      };
    }), d(this, H, () => {
      let t = this.store;
      t.update = (e, s) => {
        if (e.substring(e.length - 1, e.length) === "$")
          throw `Cannot access ${e}$ state, please access via revert() or replay().`;
        if (!this.reducers.hasOwnProperty(e)) {
          console.warn(`no exist property[ ${e} ]`);
          return;
        }
        t.dispatch({ type: `${e}_update`, value: s });
      };
    }), d(this, L, () => {
      let t = this.store;
      t.capture = (e, s) => {
        if (e === "initial" || e === "initial$")
          throw "Cannot access 'initial$' state, 'initial$' is system state.";
        if (e === "history" || e === "history$")
          throw "Cannot access 'history$' state, 'history$' is system state.";
        if (e.includes("$") || (e += "$"), !t.current.hasOwnProperty(e))
          return console.warn(`no exist property[ ${e} ]`), null;
        let n = { type: `${e}`, value: s };
        t.dispatch(n);
      };
    }), d(this, J, () => {
      let t = this.store;
      t.remove = (e, s) => {
        if (!this.reducers.hasOwnProperty(e)) {
          console.warn(`no exist property[ ${e} ]`);
          return;
        }
        Array.from(this.actions.keys()).forEach((n) => {
          n.includes(`${e}_`) && this.actions.delete(n);
        }), Array.from(this.observables.keys()).forEach((n) => {
          n.includes(`${e}_`) && (this.observables.get(n).unsubscribe(), this.observables.delete(n));
        }), Array.from(this.methods.keys()).forEach((n) => {
          n.includes(`${e}_`) && this.methods.delete(n);
        }), t.dispatch({ type: "initial$_delete", value: { name: e } }), s ? s === "undo" ? this.record.dispatch({ type: `${e}_undo` }) : s === "redo" && this.record.dispatch({ type: `${e}_redo` }) : (t.dispatch({ type: "history$_update", value: {
          name: "delete$",
          value: e
        } }), this.record.dispatch({ type: `${e}_update`, value: "delete$" })), delete this.reducers[e], t.replaceReducer(A(this.reducers));
      };
    }), d(this, V, () => {
      let t = this.store;
      t.action = (e, s, n) => {
        if (!this.reducers.hasOwnProperty(e)) {
          console.warn(`no exist property[ ${e} ]`);
          return;
        }
        if (!this.actions.has(`${e}_${s}`)) {
          console.warn(`no exist action[ ${s} ]`);
          return;
        }
        t.dispatch({ type: `${e}_${s}`, value: n });
      };
    }), d(this, B, () => {
      let t = this.store;
      t.undo = () => {
        t.current.history$.past.length !== 0 && t.dispatch({ type: "history$_undo" });
      }, t.redo = () => {
        t.current.history$.future.length !== 0 && t.dispatch({ type: "history$_redo" });
      };
    }), d(this, Y, () => {
      let t = this.store;
      t.revert = (e) => {
      }, t.replay = (e) => {
      };
    }), d(this, K, () => {
      const t = (s = {}, n) => n.type === "initial$_update" ? (s[n.value.name] = n.value.value, s) : (n.type === "initial$_delete" && delete s[n.value.name], s);
      this.reducers.initial$ = t;
      const e = _t(
        (s = { value: "history$ created.", timestamp: Date.now() }, n) => {
          if (!n.type) return s;
          switch (n.type) {
            case "history$_update":
              return { value: n.value, timestamp: Date.now() };
            case "history$_undo":
              return { value: n.value.value, timestamp: n.value.timestamp };
            case "history$_redo":
              return { value: n.value.value, timestamp: n.value.timestamp };
          }
          return s;
        },
        {
          limit: 1e3,
          filter: yt(["history$_update"]),
          undoType: "history$_undo",
          redoType: "history$_redo"
        }
      );
      this.reducers.history$ = e, this.store.replaceReducer(A(this.reducers));
    }), d(this, W, () => {
      this.store.getStateR = () => this.record.getState();
    }), this.setValueState = (t, e = !1) => {
    };
  }
}
M = new WeakMap(), N = new WeakMap(), k = new WeakMap(), F = new WeakMap(), D = new WeakMap(), H = new WeakMap(), L = new WeakMap(), J = new WeakMap(), V = new WeakMap(), B = new WeakMap(), Y = new WeakMap(), K = new WeakMap(), W = new WeakMap();
var z, E, X, G;
class be extends ve {
  constructor() {
    super();
    h(this, z);
    h(this, E);
    h(this, X);
    h(this, G);
    this.setReducer = () => {
      Object.keys(this.reducers).length > 0;
    }, this.setValueState = (t, e = !1) => {
      let { name: s } = t;
      if (s.includes("_"))
        throw "'_' cannot be used in state name.";
      if (s.includes("$") && s !== "history$")
        throw "'$' cannot be used in state name.";
      this.reducers[s] || (e || (t.initialState = { value: t.value, timestamp: Date.now() }, t.inputState = t.initialState), this.createRecordState(t), l(this, z).call(this, t), l(this, G).call(this, l(this, X).call(this, t), e));
    }, d(this, z, (t) => {
      let e = this.actions, s = this.methods, n = this.observables;
      if (e.set(`${t.name}_update`, (o, a) => ({ value: a.value, timestamp: Date.now() })), t.before && (typeof t.before == "function" ? s.set(`${t.name}_before`, t.before) : n.set(
        `${t.name}_before`,
        l(this, E).call(this, t.before)
      )), e.set(`${t.name}_undo`, (o, a) => ({ value: a.value.value, timestamp: a.value.timestamp })), t.undo && n.set(
        `${t.name}_undo`,
        l(this, E).call(this, t.undo)
      ), e.set(`${t.name}_redo`, (o, a) => ({ value: a.value.value, timestamp: a.value.timestamp })), t.redo && n.set(
        `${t.name}_redo`,
        l(this, E).call(this, t.redo)
      ), t.after && n.set(
        `${t.name}_after`,
        l(this, E).call(this, t.after)
      ), !!t.actions && t.actions.length !== 0)
        for (let o of t.actions) {
          if (o.name.includes("_"))
            throw console.log(o.name), "Cannot use '_' in action name";
          if (e.has(`${t.name}_${o.name}`))
            throw console.log(o.name), "already exist action name";
          s.set(`${t.name}_${o.name}`, o.method), e.set(
            `${t.name}_${o.name}`,
            s.get(`${t.name}_${o.name}`)
          );
        }
    }), d(this, E, (t) => typeof t != "function" ? t : new jt().subscribe(t)), d(this, X, (t) => {
      let { inputState: e } = t, s = (n = e, o) => {
        if (!this.actions.has(o.type) || s.stateName !== o.type.split("_")[0]) return n;
        const a = this.actions.get(o.type);
        if (!a) return n;
        if (o.type.includes("_undo") || o.type.includes("_redo") || o.type.includes("_update"))
          return a(n, o) || n;
        {
          o.value || (o.value = n.value);
          let { value: u } = a(o) || n;
          return { value: u, timestamp: Date.now() };
        }
      };
      return s.stateName = t.name, t.reducer = s, t;
    }), d(this, G, (t, e) => {
      let { name: s, value: n, reducer: o } = t;
      switch (e && t.initialState && (n = t.initialState.value), this.store.dispatch({ type: "initial$_update", value: { name: s, value: n }, isSilent: e }), e) {
        case "undo":
          this.record.dispatch({ type: `${s}_undo` });
          break;
        case "redo":
          this.record.dispatch({ type: `${s}_redo` });
          break;
      }
      this.reducers[s] = o, this.store.replaceReducer(A(this.reducers)), this.parameters.set(s, t);
    });
  }
}
z = new WeakMap(), E = new WeakMap(), X = new WeakMap(), G = new WeakMap();
class _e extends be {
  constructor() {
    return super(), this.build = () => {
      this.setRecord();
      const t = this.setStore();
      return this.setReducer(), t;
    }, this.build();
  }
}
const me = jt, we = new _e();
export {
  we as m$,
  me as stateObservable
};
