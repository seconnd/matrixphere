var we = (r) => {
  throw TypeError(r);
};
var $e = (r, n, e) => n.has(r) || we("Cannot " + e);
var l = (r, n, e) => ($e(r, n, "read from private field"), e ? e.call(r) : n.get(r)), d = (r, n, e) => n.has(r) ? we("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(r) : n.set(r, e), p = (r, n, e, t) => ($e(r, n, "write to private field"), t ? t.call(r, e) : n.set(r, e), e);
var ce = function(r, n) {
  return ce = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
    e.__proto__ = t;
  } || function(e, t) {
    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
  }, ce(r, n);
};
function te(r, n) {
  if (typeof n != "function" && n !== null)
    throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
  ce(r, n);
  function e() {
    this.constructor = r;
  }
  r.prototype = n === null ? Object.create(n) : (e.prototype = n.prototype, new e());
}
function le(r) {
  var n = typeof Symbol == "function" && Symbol.iterator, e = n && r[n], t = 0;
  if (e) return e.call(r);
  if (r && typeof r.length == "number") return {
    next: function() {
      return r && t >= r.length && (r = void 0), { value: r && r[t++], done: !r };
    }
  };
  throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function he(r, n) {
  var e = typeof Symbol == "function" && r[Symbol.iterator];
  if (!e) return r;
  var t = e.call(r), i, s = [], o;
  try {
    for (; (n === void 0 || n-- > 0) && !(i = t.next()).done; ) s.push(i.value);
  } catch (u) {
    o = { error: u };
  } finally {
    try {
      i && !i.done && (e = t.return) && e.call(t);
    } finally {
      if (o) throw o.error;
    }
  }
  return s;
}
function de(r, n, e) {
  if (e || arguments.length === 2) for (var t = 0, i = n.length, s; t < i; t++)
    (s || !(t in n)) && (s || (s = Array.prototype.slice.call(n, 0, t)), s[t] = n[t]);
  return r.concat(s || Array.prototype.slice.call(n));
}
function S(r) {
  return typeof r == "function";
}
function Pe(r) {
  var n = function(t) {
    Error.call(t), t.stack = new Error().stack;
  }, e = r(n);
  return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
}
var ie = Pe(function(r) {
  return function(e) {
    r(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(t, i) {
      return i + 1 + ") " + t.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e;
  };
});
function pe(r, n) {
  if (r) {
    var e = r.indexOf(n);
    0 <= e && r.splice(e, 1);
  }
}
var re = function() {
  function r(n) {
    this.initialTeardown = n, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return r.prototype.unsubscribe = function() {
    var n, e, t, i, s;
    if (!this.closed) {
      this.closed = !0;
      var o = this._parentage;
      if (o)
        if (this._parentage = null, Array.isArray(o))
          try {
            for (var u = le(o), a = u.next(); !a.done; a = u.next()) {
              var c = a.value;
              c.remove(this);
            }
          } catch (v) {
            n = { error: v };
          } finally {
            try {
              a && !a.done && (e = u.return) && e.call(u);
            } finally {
              if (n) throw n.error;
            }
          }
        else
          o.remove(this);
      var g = this.initialTeardown;
      if (S(g))
        try {
          g();
        } catch (v) {
          s = v instanceof ie ? v.errors : [v];
        }
      var f = this._finalizers;
      if (f) {
        this._finalizers = null;
        try {
          for (var m = le(f), E = m.next(); !E.done; E = m.next()) {
            var R = E.value;
            try {
              Ee(R);
            } catch (v) {
              s = s ?? [], v instanceof ie ? s = de(de([], he(s)), he(v.errors)) : s.push(v);
            }
          }
        } catch (v) {
          t = { error: v };
        } finally {
          try {
            E && !E.done && (i = m.return) && i.call(m);
          } finally {
            if (t) throw t.error;
          }
        }
      }
      if (s)
        throw new ie(s);
    }
  }, r.prototype.add = function(n) {
    var e;
    if (n && n !== this)
      if (this.closed)
        Ee(n);
      else {
        if (n instanceof r) {
          if (n.closed || n._hasParent(this))
            return;
          n._addParent(this);
        }
        (this._finalizers = (e = this._finalizers) !== null && e !== void 0 ? e : []).push(n);
      }
  }, r.prototype._hasParent = function(n) {
    var e = this._parentage;
    return e === n || Array.isArray(e) && e.includes(n);
  }, r.prototype._addParent = function(n) {
    var e = this._parentage;
    this._parentage = Array.isArray(e) ? (e.push(n), e) : e ? [e, n] : n;
  }, r.prototype._removeParent = function(n) {
    var e = this._parentage;
    e === n ? this._parentage = null : Array.isArray(e) && pe(e, n);
  }, r.prototype.remove = function(n) {
    var e = this._finalizers;
    e && pe(e, n), n instanceof r && n._removeParent(this);
  }, r.EMPTY = function() {
    var n = new r();
    return n.closed = !0, n;
  }(), r;
}(), Re = re.EMPTY;
function Ie(r) {
  return r instanceof re || r && "closed" in r && S(r.remove) && S(r.add) && S(r.unsubscribe);
}
function Ee(r) {
  S(r) ? r() : r.unsubscribe();
}
var Ye = {
  Promise: void 0
}, Je = {
  setTimeout: function(r, n) {
    for (var e = [], t = 2; t < arguments.length; t++)
      e[t - 2] = arguments[t];
    return setTimeout.apply(void 0, de([r, n], he(e)));
  },
  clearTimeout: function(r) {
    return clearTimeout(r);
  },
  delegate: void 0
};
function Ke(r) {
  Je.setTimeout(function() {
    throw r;
  });
}
function Se() {
}
function ee(r) {
  r();
}
var je = function(r) {
  te(n, r);
  function n(e) {
    var t = r.call(this) || this;
    return t.isStopped = !1, e ? (t.destination = e, Ie(e) && e.add(t)) : t.destination = ze, t;
  }
  return n.create = function(e, t, i) {
    return new fe(e, t, i);
  }, n.prototype.next = function(e) {
    this.isStopped || this._next(e);
  }, n.prototype.error = function(e) {
    this.isStopped || (this.isStopped = !0, this._error(e));
  }, n.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, n.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, r.prototype.unsubscribe.call(this), this.destination = null);
  }, n.prototype._next = function(e) {
    this.destination.next(e);
  }, n.prototype._error = function(e) {
    try {
      this.destination.error(e);
    } finally {
      this.unsubscribe();
    }
  }, n.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, n;
}(re), Be = function() {
  function r(n) {
    this.partialObserver = n;
  }
  return r.prototype.next = function(n) {
    var e = this.partialObserver;
    if (e.next)
      try {
        e.next(n);
      } catch (t) {
        Z(t);
      }
  }, r.prototype.error = function(n) {
    var e = this.partialObserver;
    if (e.error)
      try {
        e.error(n);
      } catch (t) {
        Z(t);
      }
    else
      Z(n);
  }, r.prototype.complete = function() {
    var n = this.partialObserver;
    if (n.complete)
      try {
        n.complete();
      } catch (e) {
        Z(e);
      }
  }, r;
}(), fe = function(r) {
  te(n, r);
  function n(e, t, i) {
    var s = r.call(this) || this, o;
    return S(e) || !e ? o = {
      next: e ?? void 0,
      error: t ?? void 0,
      complete: i ?? void 0
    } : o = e, s.destination = new Be(o), s;
  }
  return n;
}(je);
function Z(r) {
  Ke(r);
}
function We(r) {
  throw r;
}
var ze = {
  closed: !0,
  next: Se,
  error: We,
  complete: Se
}, Xe = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function Ge(r) {
  return r;
}
function qe(r) {
  return r.length === 0 ? Ge : r.length === 1 ? r[0] : function(e) {
    return r.reduce(function(t, i) {
      return i(t);
    }, e);
  };
}
var xe = function() {
  function r(n) {
    n && (this._subscribe = n);
  }
  return r.prototype.lift = function(n) {
    var e = new r();
    return e.source = this, e.operator = n, e;
  }, r.prototype.subscribe = function(n, e, t) {
    var i = this, s = Ze(n) ? n : new fe(n, e, t);
    return ee(function() {
      var o = i, u = o.operator, a = o.source;
      s.add(u ? u.call(s, a) : a ? i._subscribe(s) : i._trySubscribe(s));
    }), s;
  }, r.prototype._trySubscribe = function(n) {
    try {
      return this._subscribe(n);
    } catch (e) {
      n.error(e);
    }
  }, r.prototype.forEach = function(n, e) {
    var t = this;
    return e = Oe(e), new e(function(i, s) {
      var o = new fe({
        next: function(u) {
          try {
            n(u);
          } catch (a) {
            s(a), o.unsubscribe();
          }
        },
        error: s,
        complete: i
      });
      t.subscribe(o);
    });
  }, r.prototype._subscribe = function(n) {
    var e;
    return (e = this.source) === null || e === void 0 ? void 0 : e.subscribe(n);
  }, r.prototype[Xe] = function() {
    return this;
  }, r.prototype.pipe = function() {
    for (var n = [], e = 0; e < arguments.length; e++)
      n[e] = arguments[e];
    return qe(n)(this);
  }, r.prototype.toPromise = function(n) {
    var e = this;
    return n = Oe(n), new n(function(t, i) {
      var s;
      e.subscribe(function(o) {
        return s = o;
      }, function(o) {
        return i(o);
      }, function() {
        return t(s);
      });
    });
  }, r.create = function(n) {
    return new r(n);
  }, r;
}();
function Oe(r) {
  var n;
  return (n = r ?? Ye.Promise) !== null && n !== void 0 ? n : Promise;
}
function Qe(r) {
  return r && S(r.next) && S(r.error) && S(r.complete);
}
function Ze(r) {
  return r && r instanceof je || Qe(r) && Ie(r);
}
var et = Pe(function(r) {
  return function() {
    r(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), De = function(r) {
  te(n, r);
  function n() {
    var e = r.call(this) || this;
    return e.closed = !1, e.currentObservers = null, e.observers = [], e.isStopped = !1, e.hasError = !1, e.thrownError = null, e;
  }
  return n.prototype.lift = function(e) {
    var t = new Te(this, this);
    return t.operator = e, t;
  }, n.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new et();
  }, n.prototype.next = function(e) {
    var t = this;
    ee(function() {
      var i, s;
      if (t._throwIfClosed(), !t.isStopped) {
        t.currentObservers || (t.currentObservers = Array.from(t.observers));
        try {
          for (var o = le(t.currentObservers), u = o.next(); !u.done; u = o.next()) {
            var a = u.value;
            a.next(e);
          }
        } catch (c) {
          i = { error: c };
        } finally {
          try {
            u && !u.done && (s = o.return) && s.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
      }
    });
  }, n.prototype.error = function(e) {
    var t = this;
    ee(function() {
      if (t._throwIfClosed(), !t.isStopped) {
        t.hasError = t.isStopped = !0, t.thrownError = e;
        for (var i = t.observers; i.length; )
          i.shift().error(e);
      }
    });
  }, n.prototype.complete = function() {
    var e = this;
    ee(function() {
      if (e._throwIfClosed(), !e.isStopped) {
        e.isStopped = !0;
        for (var t = e.observers; t.length; )
          t.shift().complete();
      }
    });
  }, n.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(n.prototype, "observed", {
    get: function() {
      var e;
      return ((e = this.observers) === null || e === void 0 ? void 0 : e.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), n.prototype._trySubscribe = function(e) {
    return this._throwIfClosed(), r.prototype._trySubscribe.call(this, e);
  }, n.prototype._subscribe = function(e) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
  }, n.prototype._innerSubscribe = function(e) {
    var t = this, i = this, s = i.hasError, o = i.isStopped, u = i.observers;
    return s || o ? Re : (this.currentObservers = null, u.push(e), new re(function() {
      t.currentObservers = null, pe(u, e);
    }));
  }, n.prototype._checkFinalizedStatuses = function(e) {
    var t = this, i = t.hasError, s = t.thrownError, o = t.isStopped;
    i ? e.error(s) : o && e.complete();
  }, n.prototype.asObservable = function() {
    var e = new xe();
    return e.source = this, e;
  }, n.create = function(e, t) {
    return new Te(e, t);
  }, n;
}(xe), Te = function(r) {
  te(n, r);
  function n(e, t) {
    var i = r.call(this) || this;
    return i.destination = e, i.source = t, i;
  }
  return n.prototype.next = function(e) {
    var t, i;
    (i = (t = this.destination) === null || t === void 0 ? void 0 : t.next) === null || i === void 0 || i.call(t, e);
  }, n.prototype.error = function(e) {
    var t, i;
    (i = (t = this.destination) === null || t === void 0 ? void 0 : t.error) === null || i === void 0 || i.call(t, e);
  }, n.prototype.complete = function() {
    var e, t;
    (t = (e = this.destination) === null || e === void 0 ? void 0 : e.complete) === null || t === void 0 || t.call(e);
  }, n.prototype._subscribe = function(e) {
    var t, i;
    return (i = (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(e)) !== null && i !== void 0 ? i : Re;
  }, n;
}(De);
class ke extends De {
  constructor() {
    super(), this.pipe0 = super.pipe, this.pipe = (n) => {
      let e = this.pipe0(n);
      return e.subscribe0 = e.subscribe, e.subscribe = (t) => {
        if (!t.hasOwnProperty("next"))
          throw "no exist next! in subscribe({ ... })";
        return e.subscribe0({
          next: (i) => t.next(i),
          complete: t.complete || void 0,
          error: t.complete || void 0
        });
      }, e;
    };
  }
}
function y(r) {
  return `Minified Redux error #${r}; visit https://redux.js.org/Errors?code=${r} for the full message or use the non-minified dev environment for full errors. `;
}
var tt = typeof Symbol == "function" && Symbol.observable || "@@observable", Ne = tt, se = () => Math.random().toString(36).substring(7).split("").join("."), rt = {
  INIT: `@@redux/INIT${/* @__PURE__ */ se()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ se()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${se()}`
}, A = rt;
function Ue(r) {
  if (typeof r != "object" || r === null)
    return !1;
  let n = r;
  for (; Object.getPrototypeOf(n) !== null; )
    n = Object.getPrototypeOf(n);
  return Object.getPrototypeOf(r) === n || Object.getPrototypeOf(r) === null;
}
function nt(r) {
  if (r === void 0)
    return "undefined";
  if (r === null)
    return "null";
  const n = typeof r;
  switch (n) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function":
      return n;
  }
  if (Array.isArray(r))
    return "array";
  if (ot(r))
    return "date";
  if (st(r))
    return "error";
  const e = it(r);
  switch (e) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return e;
  }
  return Object.prototype.toString.call(r).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function it(r) {
  return typeof r.constructor == "function" ? r.constructor.name : null;
}
function st(r) {
  return r instanceof Error || typeof r.message == "string" && r.constructor && typeof r.constructor.stackTraceLimit == "number";
}
function ot(r) {
  return r instanceof Date ? !0 : typeof r.toDateString == "function" && typeof r.getDate == "function" && typeof r.setDate == "function";
}
function x(r) {
  let n = typeof r;
  return process.env.NODE_ENV !== "production" && (n = nt(r)), n;
}
function Me(r, n, e) {
  if (typeof r != "function")
    throw new Error(process.env.NODE_ENV === "production" ? y(2) : `Expected the root reducer to be a function. Instead, received: '${x(r)}'`);
  if (typeof n == "function" && typeof e == "function" || typeof e == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? y(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof n == "function" && typeof e > "u" && (e = n, n = void 0), typeof e < "u") {
    if (typeof e != "function")
      throw new Error(process.env.NODE_ENV === "production" ? y(1) : `Expected the enhancer to be a function. Instead, received: '${x(e)}'`);
    return e(Me)(r, n);
  }
  let t = r, i = n, s = /* @__PURE__ */ new Map(), o = s, u = 0, a = !1;
  function c() {
    o === s && (o = /* @__PURE__ */ new Map(), s.forEach((h, $) => {
      o.set($, h);
    }));
  }
  function g() {
    if (a)
      throw new Error(process.env.NODE_ENV === "production" ? y(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return i;
  }
  function f(h) {
    if (typeof h != "function")
      throw new Error(process.env.NODE_ENV === "production" ? y(4) : `Expected the listener to be a function. Instead, received: '${x(h)}'`);
    if (a)
      throw new Error(process.env.NODE_ENV === "production" ? y(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    let $ = !0;
    c();
    const T = u++;
    return o.set(T, h), function() {
      if ($) {
        if (a)
          throw new Error(process.env.NODE_ENV === "production" ? y(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        $ = !1, c(), o.delete(T), s = null;
      }
    };
  }
  function m(h) {
    if (!Ue(h))
      throw new Error(process.env.NODE_ENV === "production" ? y(7) : `Actions must be plain objects. Instead, the actual type was: '${x(h)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    if (typeof h.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? y(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (typeof h.type != "string")
      throw new Error(process.env.NODE_ENV === "production" ? y(17) : `Action "type" property must be a string. Instead, the actual type was: '${x(h.type)}'. Value was: '${h.type}' (stringified)`);
    if (a)
      throw new Error(process.env.NODE_ENV === "production" ? y(9) : "Reducers may not dispatch actions.");
    try {
      a = !0, i = t(i, h);
    } finally {
      a = !1;
    }
    return (s = o).forEach((T) => {
      T();
    }), h;
  }
  function E(h) {
    if (typeof h != "function")
      throw new Error(process.env.NODE_ENV === "production" ? y(10) : `Expected the nextReducer to be a function. Instead, received: '${x(h)}`);
    t = h, m({
      type: A.REPLACE
    });
  }
  function R() {
    const h = f;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe($) {
        if (typeof $ != "object" || $ === null)
          throw new Error(process.env.NODE_ENV === "production" ? y(11) : `Expected the observer to be an object. Instead, received: '${x($)}'`);
        function T() {
          const _e = $;
          _e.next && _e.next(g());
        }
        return T(), {
          unsubscribe: h(T)
        };
      },
      [Ne]() {
        return this;
      }
    };
  }
  return m({
    type: A.INIT
  }), {
    dispatch: m,
    subscribe: f,
    getState: g,
    replaceReducer: E,
    [Ne]: R
  };
}
function Ce(r, n, e) {
  return Me(r, n, e);
}
function Ae(r) {
  typeof console < "u" && typeof console.error == "function" && console.error(r);
  try {
    throw new Error(r);
  } catch {
  }
}
function ut(r, n, e, t) {
  const i = Object.keys(n), s = e && e.type === A.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (i.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!Ue(r))
    return `The ${s} has unexpected type of "${x(r)}". Expected argument to be an object with the following keys: "${i.join('", "')}"`;
  const o = Object.keys(r).filter((u) => !n.hasOwnProperty(u) && !t[u]);
  if (o.forEach((u) => {
    t[u] = !0;
  }), !(e && e.type === A.REPLACE) && o.length > 0)
    return `Unexpected ${o.length > 1 ? "keys" : "key"} "${o.join('", "')}" found in ${s}. Expected to find one of the known reducer keys instead: "${i.join('", "')}". Unexpected keys will be ignored.`;
}
function at(r) {
  Object.keys(r).forEach((n) => {
    const e = r[n];
    if (typeof e(void 0, {
      type: A.INIT
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? y(12) : `The slice reducer for key "${n}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof e(void 0, {
      type: A.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? y(13) : `The slice reducer for key "${n}" returned undefined when probed with a random type. Don't try to handle '${A.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
  });
}
function N(r) {
  const n = Object.keys(r), e = {};
  for (let o = 0; o < n.length; o++) {
    const u = n[o];
    process.env.NODE_ENV !== "production" && typeof r[u] > "u" && Ae(`No reducer provided for key "${u}"`), typeof r[u] == "function" && (e[u] = r[u]);
  }
  const t = Object.keys(e);
  let i;
  process.env.NODE_ENV !== "production" && (i = {});
  let s;
  try {
    at(e);
  } catch (o) {
    s = o;
  }
  return function(u = {}, a) {
    if (s)
      throw s;
    if (process.env.NODE_ENV !== "production") {
      const f = ut(u, e, a, i);
      f && Ae(f);
    }
    let c = !1;
    const g = {};
    for (let f = 0; f < t.length; f++) {
      const m = t[f], E = e[m], R = u[m], v = E(R, a);
      if (typeof v > "u") {
        const h = a && a.type;
        throw new Error(process.env.NODE_ENV === "production" ? y(14) : `When called with an action of type ${h ? `"${String(h)}"` : "(unknown type)"}, the slice reducer for key "${m}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      g[m] = v, c = c || v !== R;
    }
    return c = c || t.length !== Object.keys(u).length, c ? g : u;
  };
}
function Ve(...r) {
  return r.length === 0 ? (n) => n : r.length === 1 ? r[0] : r.reduce((n, e) => (...t) => n(e(...t)));
}
function ct(...r) {
  return (n) => (e, t) => {
    const i = n(e, t);
    let s = () => {
      throw new Error(process.env.NODE_ENV === "production" ? y(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const o = {
      getState: i.getState,
      dispatch: (a, ...c) => s(a, ...c)
    }, u = r.map((a) => a(o));
    return s = Ve(...u)(i.dispatch), {
      ...i,
      dispatch: s
    };
  };
}
const I = {
  UNDO: "@@redux-undo/UNDO",
  REDO: "@@redux-undo/REDO",
  JUMP_TO_FUTURE: "@@redux-undo/JUMP_TO_FUTURE",
  JUMP_TO_PAST: "@@redux-undo/JUMP_TO_PAST",
  JUMP: "@@redux-undo/JUMP",
  CLEAR_HISTORY: "@@redux-undo/CLEAR_HISTORY"
};
function ye(r, n = []) {
  return Array.isArray(r) ? r : typeof r == "string" ? [r] : n;
}
function lt(r) {
  return typeof r.present < "u" && typeof r.future < "u" && typeof r.past < "u" && Array.isArray(r.future) && Array.isArray(r.past);
}
function ve(r) {
  const n = ye(r);
  return (e) => n.indexOf(e.type) >= 0;
}
function P(r, n, e, t = null) {
  return {
    past: r,
    present: n,
    future: e,
    group: t,
    _latestUnfiltered: n,
    index: r.length,
    limit: r.length + e.length + 1
  };
}
let ne, _;
const be = {
  prevState: "#9E9E9E",
  action: "#03A9F4",
  nextState: "#4CAF50"
};
function ht() {
  _ = {
    header: [],
    prev: [],
    action: [],
    next: [],
    msgs: []
  };
}
function dt() {
  const { header: r, prev: n, next: e, action: t, msgs: i } = _;
  console.group ? (console.groupCollapsed(...r), console.log(...n), console.log(...t), console.log(...e), console.log(...i), console.groupEnd()) : (console.log(...r), console.log(...n), console.log(...t), console.log(...e), console.log(...i));
}
function ge(r, n, e) {
  return [
    `%c${r}`,
    `color: ${n}; font-weight: bold`,
    e
  ];
}
function pt(r, n) {
  ht(), ne && (console.group ? (_.header = ["%credux-undo", "font-style: italic", "action", r.type], _.action = ge("action", be.action, r), _.prev = ge("prev history", be.prevState, n)) : (_.header = ["redux-undo action", r.type], _.action = ["action", r], _.prev = ["prev history", n]));
}
function w(r) {
  ne && (console.group ? _.next = ge("next history", be.nextState, r) : _.next = ["next history", r], dt());
}
function b(...r) {
  ne && (_.msgs = _.msgs.concat([...r, `
`]));
}
function ft(r) {
  ne = r;
}
function oe(r, n) {
  const e = P([], r, []);
  return n && (e._latestUnfiltered = null), e;
}
function yt(r, n, e, t) {
  const i = r.past.length + 1;
  b("inserting", n), b("new free: ", e - i);
  const { past: s, _latestUnfiltered: o } = r, u = e && e <= i, a = s.slice(u ? 1 : 0), c = o != null ? [
    ...a,
    o
  ] : a;
  return P(c, n, [], t);
}
function Fe(r, n) {
  if (n < 0 || n >= r.future.length)
    return r;
  const { past: e, future: t, _latestUnfiltered: i } = r, s = [...e, i, ...t.slice(0, n)], o = t[n], u = t.slice(n + 1);
  return P(s, o, u);
}
function Le(r, n) {
  if (n < 0 || n >= r.past.length)
    return r;
  const { past: e, future: t, _latestUnfiltered: i } = r, s = e.slice(0, n), o = [...e.slice(n + 1), i, ...t], u = e[n];
  return P(s, u, o);
}
function ue(r, n) {
  return n > 0 ? Fe(r, n - 1) : n < 0 ? Le(r, r.past.length + n) : r;
}
function vt(r, n) {
  return n.indexOf(r) > -1 ? r : !r;
}
function me(r, n = {}) {
  ft(n.debug);
  const e = {
    limit: void 0,
    filter: () => !0,
    groupBy: () => null,
    undoType: I.UNDO,
    redoType: I.REDO,
    jumpToPastType: I.JUMP_TO_PAST,
    jumpToFutureType: I.JUMP_TO_FUTURE,
    jumpType: I.JUMP,
    neverSkipReducer: !1,
    ignoreInitialState: !1,
    syncFilter: !1,
    ...n,
    initTypes: ye(n.initTypes, ["@@redux-undo/INIT"]),
    clearHistoryType: ye(
      n.clearHistoryType,
      [I.CLEAR_HISTORY]
    )
  }, t = e.neverSkipReducer ? (s, o, ...u) => ({
    ...s,
    present: r(s.present, o, ...u)
  }) : (s) => s;
  let i;
  return (s = i, o = {}, ...u) => {
    pt(o, s);
    let a = s;
    if (!i)
      if (b("history is uninitialized"), s === void 0) {
        const g = r(s, { type: "@@redux-undo/CREATE_HISTORY" }, ...u);
        return a = oe(
          g,
          e.ignoreInitialState
        ), b("do not set initialState on probe actions"), w(a), a;
      } else
        lt(s) ? (a = i = e.ignoreInitialState ? s : P(
          s.past,
          s.present,
          s.future
        ), b(
          "initialHistory initialized: initialState is a history",
          i
        )) : (a = i = oe(
          s,
          e.ignoreInitialState
        ), b(
          "initialHistory initialized: initialState is not a history",
          i
        ));
    let c;
    switch (o.type) {
      case void 0:
        return a;
      case e.undoType:
        return c = ue(a, -1), b("perform undo"), w(c), t(c, o, ...u);
      case e.redoType:
        return c = ue(a, 1), b("perform redo"), w(c), t(c, o, ...u);
      case e.jumpToPastType:
        return c = Le(a, o.index), b(`perform jumpToPast to ${o.index}`), w(c), t(c, o, ...u);
      case e.jumpToFutureType:
        return c = Fe(a, o.index), b(`perform jumpToFuture to ${o.index}`), w(c), t(c, o, ...u);
      case e.jumpType:
        return c = ue(a, o.index), b(`perform jump to ${o.index}`), w(c), t(c, o, ...u);
      case vt(o.type, e.clearHistoryType):
        return c = oe(a.present, e.ignoreInitialState), b("perform clearHistory"), w(c), t(c, o, ...u);
      default:
        if (c = r(
          a.present,
          o,
          ...u
        ), e.initTypes.some((f) => f === o.type))
          return b("reset history due to init action"), w(i), i;
        if (a._latestUnfiltered === c)
          return a;
        if (typeof e.filter == "function" && !e.filter(
          o,
          c,
          a
        )) {
          const f = P(
            a.past,
            c,
            a.future,
            a.group
          );
          return e.syncFilter || (f._latestUnfiltered = a._latestUnfiltered), b("filter ignored action, not storing it in past"), w(f), f;
        }
        const g = e.groupBy(o, c, a);
        if (g != null && g === a.group) {
          const f = P(
            a.past,
            c,
            a.future,
            a.group
          );
          return b("groupBy grouped the action with the previous action"), w(f), f;
        }
        return a = yt(a, c, e.limit, g), b("inserted new state into history"), w(a), a;
    }
  };
}
class bt {
  constructor(n) {
  }
}
class gt {
}
class ae extends bt {
  constructor(n) {
    super(n), this.next = null, this.prev = null, this.value = n;
  }
}
class mt extends gt {
  constructor() {
    super(...arguments), this.head = null, this.tail = null;
  }
  push(n) {
    const e = new ae(n);
    return this.head ? (e.prev = this.tail, this.tail && (this.tail.next = e), this.tail = e) : (this.head = e, this.tail = e), this;
  }
  unshift(n) {
    const e = new ae(n);
    return this.head ? (e.next = this.head, this.head.prev = e, this.head = e) : (this.head = e, this.tail = e), this;
  }
  insertAt(n, e) {
    if (n <= 0) return this.unshift(e);
    let t = this.head, i = 0;
    for (; t && i < n; )
      t = t.next, i++;
    const s = new ae(e);
    if (t)
      s.prev = t.prev, s.next = t, t.prev && (t.prev.next = s), t.prev = s, t === this.head && (this.head = s);
    else
      return this.push(e);
    return this;
  }
  removeAt(n) {
    if (n < 0) return this;
    let e = this.head, t = 0;
    for (; e && t < n; )
      e = e.next, t++;
    return e ? (e.prev ? e.prev.next = e.next : this.head = e.next, e.next ? e.next.prev = e.prev : this.tail = e.prev, this) : this;
  }
  pop() {
    if (!this.tail) return { value: null, list: this };
    const n = this.tail.value;
    return this.tail.prev ? (this.tail = this.tail.prev, this.tail.next = null) : (this.head = null, this.tail = null), { value: n, list: this };
  }
  shift() {
    if (!this.head) return { value: null, list: this };
    const n = this.head.value;
    return this.head.next ? (this.head = this.head.next, this.head.prev = null) : (this.head = null, this.tail = null), { value: n, list: this };
  }
  find(n) {
    let e = this.head, t = 0;
    for (; e; ) {
      if (n(e.value, t)) return e.value;
      e = e.next, t++;
    }
    return null;
  }
  findIndex(n) {
    let e = this.head, t = 0;
    for (; e; ) {
      if (n(e.value, t)) return t;
      e = e.next, t++;
    }
    return -1;
  }
  toArray() {
    const n = [];
    let e = this.head;
    for (; e; )
      n.push(e.value), e = e.next;
    return n;
  }
  getValue() {
    return this.head ? this.head.value : null;
  }
}
class _t {
  constructor() {
    this.reducers = {}, this.recordReducers = {}, this.actions = /* @__PURE__ */ new Map(), this.recordActions = /* @__PURE__ */ new Map(), this.observables = /* @__PURE__ */ new Map(), this.methods = /* @__PURE__ */ new Map(), this.parameters = /* @__PURE__ */ new Map();
  }
}
var j;
class wt extends _t {
  constructor() {
    super();
    d(this, j);
    this.setMiddleware = () => {
      if (!this.store)
        return (e) => (t) => (i) => {
          const s = i.type.split("_")[0];
          let o = {
            name: s,
            state: this.store.getState()[s],
            action: i
          };
          i.dispatched = {
            name: o.name,
            state: o.state
          };
          let u;
          if (!(i.type.includes("_undo") || i.type.includes("_redo"))) {
            if (this.observables.has(`${s}_before`))
              this.observables.get(`${s}_before`).next(i);
            else if (this.methods.has(`${s}_before`)) {
              const a = this.methods.get(`${s}_before`);
              a && (u = l(this, j).call(this, a(i)), u.dispatched = i.dispatched);
            }
          }
          return this.store.dispatched.push(o), u && (i = u), t(i);
        };
    }, p(this, j, (e) => {
      if (!e.hasOwnProperty("type")) throw "No exist action.type property.";
      if (typeof e.type != "string") throw "action.type is not 'string' type.";
      if (!e.hasOwnProperty("value")) throw "No exist action.value property.";
      return e;
    });
  }
}
j = new WeakMap();
var D, k, U;
class $t extends wt {
  constructor() {
    super();
    d(this, D);
    d(this, k);
    d(this, U);
    this.setRecord = () => {
      l(this, D).call(this), l(this, k).call(this), l(this, U).call(this);
    }, p(this, D, () => {
      this.record || (this.record = Ce(
        N({ start$: (e = {}) => e })
      ));
    }), p(this, k, () => {
      this.record.dispatch0 = this.record.dispatch, this.record.dispatched = null, this.record.dispatch = (e) => {
        const t = e.type.split("_")[0];
        let i = {
          name: t,
          state: this.record.getState()[t],
          action: e
        };
        e.dispatched = {
          name: i.name,
          state: i.state
        }, this.record.dispatched = i, this.record.dispatch0(e);
      };
    }), p(this, U, () => {
      this.record.subscribe(() => {
        if (this.record.current = this.record.getState(), !this.record.dispatched) return;
        const e = this.record.dispatched.action.type;
        if (e.substring(e.length - 5, e.length) === "_undo") {
          const t = this.record.dispatched.state.past;
          if (t.length === 0) return;
          this.store.dispatch({ type: `${this.record.dispatched.name}_undo`, value: t[t.length - 1] });
          return;
        }
        if (e.substring(e.length - 5, e.length) === "_redo") {
          const t = this.record.dispatched.state.future;
          if (t.length === 0) return;
          this.store.dispatch({ type: `${this.record.dispatched.name}_redo`, value: t[0] });
          return;
        }
      });
    }), this.createRecordState = (e) => {
      let { name: t, initialState: i } = e;
      if (this.recordReducers.hasOwnProperty(t)) return;
      let s = Date.now();
      this.recordActions.set(`${t}_update`, (u, a) => a.value);
      let o = (u = { value: `${t} created.`, timestamp: s }, a) => {
        if (o.stateName !== a.type.split("_")[0] || !this.recordActions.has(a.type)) return u;
        const c = this.recordActions.get(a.type);
        return c ? c(u, a) : u;
      };
      o.stateName = t, this.recordReducers[t] = me(o, {
        limit: 1e3,
        filter: ve(Array.from(this.recordActions.keys())),
        undoType: `${t}_undo`,
        redoType: `${t}_redo`
      }), this.record.replaceReducer(N(this.recordReducers)), this.store.currentRecord = this.record.getState(), this.record.dispatch({ type: `${t}_update`, value: {
        value: i == null ? void 0 : i.value,
        timestamp: s
      } });
    };
  }
}
D = new WeakMap(), k = new WeakMap(), U = new WeakMap();
var M, C, V, F, L, H, Y, J, K, B, W, z, X;
class Et extends $t {
  constructor() {
    super();
    d(this, M);
    d(this, C);
    d(this, V);
    d(this, F);
    d(this, L);
    d(this, H);
    d(this, Y);
    d(this, J);
    d(this, K);
    d(this, B);
    d(this, W);
    d(this, z);
    d(this, X);
    this.setStore = () => (l(this, M).call(this), l(this, C).call(this), l(this, V).call(this), l(this, L).call(this), l(this, H).call(this), l(this, Y).call(this), l(this, J).call(this), l(this, K).call(this), l(this, B).call(this), l(this, W).call(this), l(this, z).call(this), l(this, X).call(this), this.store), p(this, M, () => {
      if (this.store) return;
      const e = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Ve;
      let t = this.store = Ce(
        N({ start$: (i = {}) => i }),
        e(ct(this.setMiddleware()))
      );
      t.dispatched = new mt(), t.current = t.getState(), t.currentRecord = {};
    }), p(this, C, () => {
      let e = this.store;
      e.subscribe(() => {
        let t = e.dispatched.shift().value;
        if (e.current = e.getState(), e.getStateR && (e.currentRecord = e.getStateR()), !t || t.action.type === "initial$_delete" || t.action.type === "history$_update") return;
        let i = t.action.type;
        if (i === "history$_undo") {
          let s = e.current.history$.future[0].value;
          switch (s.name) {
            case "initial$":
              e.remove && e.remove(s.value.name, "undo");
              return;
            case "delete$":
              let o = this.parameters.get(s.value);
              o && this.setValueState(o, "undo");
              return;
            default:
              this.record.dispatch({ type: `${s.name}_undo` });
              return;
          }
        }
        if (i === "history$_redo") {
          let s = e.current.history$.present.value;
          switch (s.name) {
            case "initial$":
              let o = this.parameters.get(s.value.name);
              o && this.setValueState(o, "redo");
              return;
            case "delete$":
              e.remove && e.remove(s.value, "redo");
              return;
            default:
              this.record.dispatch({ type: `${s.name}_redo` });
              return;
          }
        }
        if (i.substring(i.length - 5, i.length) === "_undo") {
          this.observables.has(`${t.name}_undo`) && this.observables.get(`${t.name}_undo`).next(t.action);
          return;
        } else if (i.substring(i.length - 5, i.length) === "_redo") {
          this.observables.has(`${t.name}_redo`) && this.observables.get(`${t.name}_redo`).next(t.action);
          return;
        } else {
          if (t.name === "initial$" && t.action.isSilent) return;
          e.dispatch({ type: "history$_update", value: {
            name: t.name,
            value: t.action.value
          } }), this.record.dispatch({ type: `${t.name}_update`, value: {
            value: t.action.value,
            timestamp: Date.now()
          } });
        }
        i.substring(i.length - 7, i.length) === "_update" && t.name !== "initial$" && (this.parameters.get(t.name).inputState = e.current[t.name]), this.observables.has(`${t.name}_after`) && this.observables.get(`${t.name}_after`).next(t.action);
      });
    }), p(this, V, () => {
      this.store.set = (e, t = "value") => {
        switch (t) {
          case "value":
            this.setValueState && this.setValueState(e);
            break;
          case "film":
            l(this, F).call(this, e.name);
            break;
        }
      };
    }), p(this, F, (e) => {
      if (e.includes("$"))
        throw "State name must not contain '$'. '$' is automatically assigned in state name.";
      if (e === "initial")
        throw "Cannot create 'initial$' state, 'initial$' is system state.";
      if (e === "history")
        throw "Cannot create 'history$' state, 'history$' is system state.";
      const t = (i = { value: `${e}$ created.`, timestamp: Date.now() }, s) => s.type === `${e}$` ? { value: s.value, timestamp: Date.now() } : i;
      this.reducers[`${e}$`] = me(t, {
        limit: 1e3,
        filter: ve([`${e}$`]),
        undoType: `${e}$_undo`,
        redoType: `${e}$_redo`
      }), this.store.replaceReducer(N(this.reducers));
    }), p(this, L, () => {
      let e = this.store;
      e.get = (t) => {
        if (!e.current.hasOwnProperty(t))
          return console.warn(`no exist property[ ${t} ]`), null;
        if (t === "initial$") return e.current.initial$;
        if (t.includes("$")) return {
          past: e.current[t].past,
          present: e.current[t].present,
          future: e.current[t].future
        };
        if (e.current[t].hasOwnProperty("value"))
          return e.current[t].value;
      };
    }), p(this, H, () => {
      let e = this.store;
      e.update = (t, i) => {
        if (t.substring(t.length - 1, t.length) === "$")
          throw `Cannot access ${t}$ state, please access via revert() or replay().`;
        if (!this.reducers.hasOwnProperty(t)) {
          console.warn(`no exist property[ ${t} ]`);
          return;
        }
        e.dispatch({ type: `${t}_update`, value: i });
      };
    }), p(this, Y, () => {
      let e = this.store;
      e.capture = (t, i) => {
        if (t === "initial" || t === "initial$")
          throw "Cannot access 'initial$' state, 'initial$' is system state.";
        if (t === "history" || t === "history$")
          throw "Cannot access 'history$' state, 'history$' is system state.";
        if (t.includes("$") || (t += "$"), !e.current.hasOwnProperty(t))
          return console.warn(`no exist property[ ${t} ]`), null;
        let s = { type: `${t}`, value: i };
        e.dispatch(s);
      };
    }), p(this, J, () => {
      let e = this.store;
      e.remove = (t, i) => {
        if (!this.reducers.hasOwnProperty(t)) {
          console.warn(`no exist property[ ${t} ]`);
          return;
        }
        Array.from(this.actions.keys()).forEach((s) => {
          s.includes(`${t}_`) && this.actions.delete(s);
        }), Array.from(this.observables.keys()).forEach((s) => {
          s.includes(`${t}_`) && (this.observables.get(s).unsubscribe(), this.observables.delete(s));
        }), Array.from(this.methods.keys()).forEach((s) => {
          s.includes(`${t}_`) && this.methods.delete(s);
        }), e.dispatch({ type: "initial$_delete", value: { name: t } }), i ? i === "undo" ? this.record.dispatch({ type: `${t}_undo` }) : i === "redo" && this.record.dispatch({ type: `${t}_redo` }) : (e.dispatch({ type: "history$_update", value: {
          name: "delete$",
          value: t
        } }), this.record.dispatch({ type: `${t}_update`, value: "delete$" })), delete this.reducers[t], e.replaceReducer(N(this.reducers));
      };
    }), p(this, K, () => {
      let e = this.store;
      e.action = (t, i, s) => {
        if (!this.reducers.hasOwnProperty(t)) {
          console.warn(`no exist property[ ${t} ]`);
          return;
        }
        if (!this.actions.has(`${t}_${i}`)) {
          console.warn(`no exist action[ ${i} ]`);
          return;
        }
        e.dispatch({ type: `${t}_${i}`, value: s });
      };
    }), p(this, B, () => {
      let e = this.store;
      e.undo = () => {
        e.current.history$.past.length !== 0 && e.dispatch({ type: "history$_undo" });
      }, e.redo = () => {
        e.current.history$.future.length !== 0 && e.dispatch({ type: "history$_redo" });
      };
    }), p(this, W, () => {
      let e = this.store;
      e.revert = (t) => {
      }, e.replay = (t) => {
      };
    }), p(this, z, () => {
      const e = (i = {}, s) => s.type === "initial$_update" ? (i[s.value.name] = s.value.value, i) : (s.type === "initial$_delete" && delete i[s.value.name], i);
      this.reducers.initial$ = e;
      const t = me(
        (i = { value: "history$ created.", timestamp: Date.now() }, s) => {
          if (!s.type) return i;
          switch (s.type) {
            case "history$_update":
              return { value: s.value, timestamp: Date.now() };
            case "history$_undo":
              return { value: s.value.value, timestamp: s.value.timestamp };
            case "history$_redo":
              return { value: s.value.value, timestamp: s.value.timestamp };
          }
          return i;
        },
        {
          limit: 1e3,
          filter: ve(["history$_update"]),
          undoType: "history$_undo",
          redoType: "history$_redo"
        }
      );
      this.reducers.history$ = t, this.store.replaceReducer(N(this.reducers));
    }), p(this, X, () => {
      this.store.getStateR = () => this.record.getState();
    }), this.setValueState = (e, t = !1) => {
    };
  }
}
M = new WeakMap(), C = new WeakMap(), V = new WeakMap(), F = new WeakMap(), L = new WeakMap(), H = new WeakMap(), Y = new WeakMap(), J = new WeakMap(), K = new WeakMap(), B = new WeakMap(), W = new WeakMap(), z = new WeakMap(), X = new WeakMap();
var G, O, q, Q;
class St extends Et {
  constructor() {
    super();
    d(this, G);
    d(this, O);
    d(this, q);
    d(this, Q);
    this.setReducer = () => {
      Object.keys(this.reducers).length > 0;
    }, this.setValueState = (e, t = !1) => {
      let { name: i } = e;
      if (i.includes("_"))
        throw "'_' cannot be used in state name.";
      if (i.includes("$") && i !== "history$")
        throw "'$' cannot be used in state name.";
      this.reducers[i] || (t || (e.initialState = { value: e.value, timestamp: Date.now() }, e.inputState = e.initialState), this.createRecordState(e), l(this, G).call(this, e), l(this, Q).call(this, l(this, q).call(this, e), t));
    }, p(this, G, (e) => {
      let t = this.actions, i = this.methods, s = this.observables;
      if (t.set(`${e.name}_update`, (o, u) => ({ value: u.value, timestamp: Date.now() })), e.before && (typeof e.before == "function" ? i.set(`${e.name}_before`, e.before) : s.set(
        `${e.name}_before`,
        l(this, O).call(this, e.before)
      )), t.set(`${e.name}_undo`, (o, u) => ({ value: u.value.value, timestamp: u.value.timestamp })), e.undo && s.set(
        `${e.name}_undo`,
        l(this, O).call(this, e.undo)
      ), t.set(`${e.name}_redo`, (o, u) => ({ value: u.value.value, timestamp: u.value.timestamp })), e.redo && s.set(
        `${e.name}_redo`,
        l(this, O).call(this, e.redo)
      ), e.after && s.set(
        `${e.name}_after`,
        l(this, O).call(this, e.after)
      ), !!e.actions && e.actions.length !== 0)
        for (let o of e.actions) {
          if (o.name.includes("_"))
            throw console.log(o.name), "Cannot use '_' in action name";
          if (t.has(`${e.name}_${o.name}`))
            throw console.log(o.name), "already exist action name";
          i.set(`${e.name}_${o.name}`, o.method), t.set(
            `${e.name}_${o.name}`,
            i.get(`${e.name}_${o.name}`)
          );
        }
    }), p(this, O, (e) => typeof e != "function" ? e : new ke().subscribe(e)), p(this, q, (e) => {
      let { inputState: t } = e, i = (s = t, o) => {
        if (!this.actions.has(o.type) || i.stateName !== o.type.split("_")[0]) return s;
        const u = this.actions.get(o.type);
        return u ? o.type.includes("_undo") || o.type.includes("_redo") || o.type.includes("_update") ? u(s, o) || s : (o.value && (s.value = o.value), u(o) || s) : s;
      };
      return i.stateName = e.name, e.reducer = i, e;
    }), p(this, Q, (e, t) => {
      let { name: i, value: s, reducer: o } = e;
      switch (t && e.initialState && (s = e.initialState.value), this.store.dispatch({ type: "initial$_update", value: { name: i, value: s }, isSilent: t }), t) {
        case "undo":
          this.record.dispatch({ type: `${i}_undo` });
          break;
        case "redo":
          this.record.dispatch({ type: `${i}_redo` });
          break;
      }
      this.reducers[i] = o, this.store.replaceReducer(N(this.reducers)), this.parameters.set(i, e);
    });
  }
}
G = new WeakMap(), O = new WeakMap(), q = new WeakMap(), Q = new WeakMap();
class xt extends St {
  constructor() {
    return super(), this.build = () => {
      this.setRecord();
      const e = this.setStore();
      return this.setReducer(), e;
    }, this.build();
  }
}
const Tt = ke, Nt = new xt();
export {
  Nt as m$,
  Tt as stateObservable
};
