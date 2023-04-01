(() => {
  "use strict";
  var e = {
      35176: (e, t, o) => {
        o(46727);
        var r = o(36836);
        const n = {};
        let s = !1,
          i = null,
          c = [],
          l = !1;
        function a() {
          self.onmessage = u;
        }
        function u({ data: e, ports: t }) {
          let { action: o, ticket: r } =
            "string" === typeof e ? JSON.parse(e) : e;
          if (o)
            switch (o) {
              case "setPort":
                return (i = t[0]), void (i.onmessage = p);
              case "submit":
                if ("status" === r.type) {
                  let e = k();
                  return (
                    (r.results = e),
                    (r.success = !0),
                    console.log("get relay status", r, e),
                    void self.postMessage({ action: "complete", ticket: r })
                  );
                }
                return c.push(r), void (l || f());
            }
        }
        async function f() {
          if (!0 === l) return;
          l = !0;
          let e = c.shift();
          while (e) await v(e), (e = c.shift());
          l = !1;
        }
        a();
        let d = {};
        function p({ data: e }) {
          let { status: t } = e;
          "ready" === t ? (Object.keys(d).length ? y() : (s = !0)) : (s = !1);
        }
        function y() {
          let e = JSON.parse(
            JSON.stringify(
              Object.values(d).filter((e) => e.relayWork.eventsToSave.length)
            )
          );
          Object.values(d)
            .filter((e) => ["stream", "update"].includes(e.type))
            .forEach((e) => (e.relayWork.eventsToSave = [])),
            i.postMessage({ tickets: e }),
            (d = {});
        }
        function m(e) {
          e.eose &&
            ((Object.keys(e.eose).length < 3 && "call" === e.type) ||
              (d[e.id] || (d[e.id] = e), s && y(), "call" === e.type && h(e)));
        }
        async function v(e) {
          e.relayWork.eventsToSave || (e.relayWork.eventsToSave = []),
            (e.relayWork.subName = e.relayWork.subName || "adhoc"),
            e.relayWork.relays.forEach(async (t) => {
              n[t] || (n[t] = await b(t)), n[t].processTicket(e);
            });
        }
        function h(e) {
          e.type = "cancel";
          for (let t in e.relayWork.relays) n[t] && n[t].processTicket(e);
        }
        function k() {
          let e = {};
          for (let t in n) e[t] = n[t].status();
          return e;
        }
        async function b(e) {
          let t = {
              main: { queue: [], mode: "stream" },
              feed: { queue: [], mode: "call" },
              page: { queue: [], mode: "stream" },
              profiles: { queue: [], mode: "call" },
              events: { queue: [], mode: "call" },
              adhoc: { queue: [], mode: "call" },
            },
            o = "unconnected",
            n = " " + Math.random().toString().slice(-4),
            s = !1;
          const i = (0, r.L6)(e);
          function c(e) {
            return t[e].queue.shift() || null;
          }
          function l(e) {
            let { ticket: o, queue: r } = t[e];
            if (o) {
              let { filter: e } = o.relayWork;
              return [e];
            }
            if (r && r.length) {
              let e = r.map((e) => {
                let { filter: t } = e.relayWork;
                return t;
              });
              return e;
            }
            return [];
          }
          async function a() {
            try {
              (o = "connecting"), await i.connect();
            } catch (e) {}
          }
          function u(e) {
            if (!t[e].queue?.length) return;
            let o = l(e),
              r = i.sub(o, { id: e + n });
            r.on("event", (t) => v(t, e)),
              r.on("eose", () => h(e)),
              (t[e].sub = r),
              (t[e].filter = o),
              (t[e].active = !0),
              "stream" === t[e].mode
                ? p(e, !0)
                : "call" === t[e].mode && d(e, !0);
          }
          function f(e) {
            t[e].sub && t[e].sub.unsub(),
              delete t[e].sub,
              (t[e].active = !1),
              (t[e].ticket = null),
              (t[e].filter = null);
          }
          function d(e, o = !1) {
            let r = c(e);
            if (r) {
              t[e].ticket = r;
              let n = l(e);
              o || n === t[e].filter || t[e].sub.sub(n),
                (t[e].filter = n),
                (t[e].timeout = setTimeout(() => h(e, !0), 5e3));
            } else f(e);
          }
          function p(e, o = !1) {
            let r = t[e].queue;
            if (r && r.length) {
              t[e].ticket = null;
              let r = l(e);
              o || r === t[e].filter || t[e].sub.sub(r), (t[e].filter = r);
            } else f(e);
          }
          function y(t, o = Math.round(Date.now() / 1e3)) {
            (t.eose = t.eose || {}),
              (t.eose[e] = o),
              o > 0 && "cancel" !== t.type && m(t);
            let { subName: r } = t.relayWork;
            d(r);
          }
          function v(e, o) {
            let { mode: n, ticket: i, timeout: c, queue: l } = t[o];
            if ("call" === n)
              k(e, i),
                s ||
                  (c && clearTimeout(c),
                  (t[o].timeout = setTimeout(() => h(o, !0), 2e3)));
            else if ("stream" === n) {
              let t = l;
              t.forEach((t) => {
                (0, r.ex)(t.relayWork.filter, e) && (k(e, t), m(t));
              });
            }
          }
          function h(o, r = !1) {
            s ||
              r ||
              ((s = !0), clearTimeout(t[o].timeout), delete t[o].timeout);
            let { mode: n, ticket: i, queue: c } = t[o];
            if ("call" === n) {
              if (!i) return;
              y(i, r ? 0 : Math.round(Date.now() / 1e3)),
                !r &&
                  i.relayWork.eose &&
                  self.postMessage({
                    ticket: { id: i.id, eose: i.eose, success: !0 },
                  });
            } else if ("stream" === n) {
              let t = c;
              t.forEach((t) => {
                (t.eose = t.eose || {}),
                  (t.eose[e] = Math.round(Date.now() / 1e3)),
                  !r &&
                    t.relayWork.eose &&
                    self.postMessage({
                      ticket: { id: t.id, eose: t.eose, success: !0 },
                    });
              });
            }
          }
          function k(t, o) {
            o.relayWork.eventsToSave.push({ event: t, relay: e });
          }
          async function b(e, r) {
            t[r].queue.push(e),
              "unconnected" === o
                ? await a()
                : "connected" !== o || t[r].sub
                ? "connected" === o && "stream" === t[r].mode && p(r)
                : u(r);
          }
          function g(e, o) {
            let r = t[o].queue.findIndex((t) => t.id === e.id);
            if (-1 !== r) {
              if (
                JSON.stringify(t[o].queue[r].relayWork.filter) ===
                JSON.stringify(e.relayWork.filter)
              )
                return;
              (t[o].queue[r].relayWork.filter = e.relayWork.filter),
                t[o].sub ? "stream" === t[o].mode && p(o) : u(o);
            }
          }
          function O(e, o) {
            if (t[o].ticket && t[o].ticket.id === e.id)
              (t[o].ticket.type = "cancel"), y(t[o].ticket, 0);
            else {
              let r = t[o].queue.findIndex((t) => t.id === e.id);
              -1 !== r && t[o].queue.splice(r, 1);
            }
          }
          function S(t) {
            let { event: o } = t.relayWork,
              r = i.publish(o);
            r.on("ok", () => {
              console.log(`${e} PUBLISH OK: event ${o.id} accepted`),
                k(o, t),
                m(t),
                self.postMessage({
                  ticket: { id: t.id, results: !0, success: !0 },
                });
            }),
              r.on("seen", () => {
                console.log(`${e} PUBLISH SEEN: event ${o.id} was seen`),
                  k(o, t),
                  m(t),
                  self.postMessage({
                    ticket: { id: t.id, results: !0, success: !0 },
                  });
              }),
              r.on("failed", (r) => {
                console.log(
                  `${e} PUBLISH FAILED: event ${o.id} failed because ${r}`
                ),
                  self.postMessage({
                    ticket: { id: t.id, results: !1, success: !0 },
                  });
              });
          }
          i.on("connect", () => {
            console.log(`connected to ${e}`),
              (o = "connected"),
              Object.keys(t).forEach((e) => u(e));
          }),
            i.on("disconnect", () => {
              console.log(`disconnected from ${e}`), (o = "disconnected");
            }),
            i.on("notice", (t) => {
              console.log(`notice from ${e}: ${t}`);
            }),
            i.on("error", () => {
              console.log(`error on connection to ${e}`), (o = "error");
            });
          const j = (e) => {
            let { type: t } = e,
              { subName: r } = e.relayWork;
            switch (t) {
              case "call":
              case "stream":
                return void b(e, r);
              case "update":
                return void g(e, r);
              case "cancel":
                return void O(e, r);
              case "publish":
                return void ("connected" === o && S(e));
            }
          };
          return {
            processTicket: j,
            status() {
              let e = JSON.parse(JSON.stringify(t));
              return { status: o, subs: e };
            },
          };
        }
      },
    },
    t = {};
  function o(r) {
    var n = t[r];
    if (void 0 !== n) return n.exports;
    var s = (t[r] = { id: r, loaded: !1, exports: {} });
    return e[r].call(s.exports, s, s.exports, o), (s.loaded = !0), s.exports;
  }
  (o.m = e),
    (o.x = () => {
      var e = o.O(void 0, [736, 64], () => o(35176));
      return (e = o.O(e)), e;
    }),
    (() => {
      o.amdO = {};
    })(),
    (() => {
      var e = [];
      o.O = (t, r, n, s) => {
        if (!r) {
          var i = 1 / 0;
          for (u = 0; u < e.length; u++) {
            for (var [r, n, s] = e[u], c = !0, l = 0; l < r.length; l++)
              (!1 & s || i >= s) && Object.keys(o.O).every((e) => o.O[e](r[l]))
                ? r.splice(l--, 1)
                : ((c = !1), s < i && (i = s));
            if (c) {
              e.splice(u--, 1);
              var a = n();
              void 0 !== a && (t = a);
            }
          }
          return t;
        }
        s = s || 0;
        for (var u = e.length; u > 0 && e[u - 1][2] > s; u--) e[u] = e[u - 1];
        e[u] = [r, n, s];
      };
    })(),
    (() => {
      o.n = (e) => {
        var t = e && e.__esModule ? () => e["default"] : () => e;
        return o.d(t, { a: t }), t;
      };
    })(),
    (() => {
      var e,
        t = Object.getPrototypeOf
          ? (e) => Object.getPrototypeOf(e)
          : (e) => e.__proto__;
      o.t = function (r, n) {
        if ((1 & n && (r = this(r)), 8 & n)) return r;
        if ("object" === typeof r && r) {
          if (4 & n && r.__esModule) return r;
          if (16 & n && "function" === typeof r.then) return r;
        }
        var s = Object.create(null);
        o.r(s);
        var i = {};
        e = e || [null, t({}), t([]), t(t)];
        for (
          var c = 2 & n && r;
          "object" == typeof c && !~e.indexOf(c);
          c = t(c)
        )
          Object.getOwnPropertyNames(c).forEach((e) => (i[e] = () => r[e]));
        return (i["default"] = () => r), o.d(s, i), s;
      };
    })(),
    (() => {
      o.d = (e, t) => {
        for (var r in t)
          o.o(t, r) &&
            !o.o(e, r) &&
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
      };
    })(),
    (() => {
      (o.f = {}),
        (o.e = (e) =>
          Promise.all(
            Object.keys(o.f).reduce((t, r) => (o.f[r](e, t), t), [])
          ));
    })(),
    (() => {
      o.u = (e) =>
        "js/" +
        { 64: "chunk-common", 736: "vendor" }[e] +
        "." +
        { 64: "449c5a18", 736: "95a6c3e8" }[e] +
        ".js";
    })(),
    (() => {
      o.miniCssF = (e) => "css/vendor.9d63c926.css";
    })(),
    (() => {
      o.g = (function () {
        if ("object" === typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e) {
          if ("object" === typeof window) return window;
        }
      })();
    })(),
    (() => {
      o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    })(),
    (() => {
      o.r = (e) => {
        "undefined" !== typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      };
    })(),
    (() => {
      o.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e);
    })(),
    (() => {
      o.j = 176;
    })(),
    (() => {
      o.p = "";
    })(),
    (() => {
      var e = { 176: 1 },
        t = (t) => {
          var [r, s, i] = t;
          for (var c in s) o.o(s, c) && (o.m[c] = s[c]);
          i && i(o);
          while (r.length) e[r.pop()] = 1;
          n(t);
        };
      o.f.i = (t, r) => {
        e[t] || importScripts(o.p + o.u(t));
      };
      var r = (globalThis["webpackChunkDostr"] =
          globalThis["webpackChunkDostr"] || []),
        n = r.push.bind(r);
      r.push = t;
    })(),
    (() => {
      var e = o.x;
      o.x = () => Promise.all([o.e(736), o.e(64)]).then(e);
    })();
  o.x();
})();
