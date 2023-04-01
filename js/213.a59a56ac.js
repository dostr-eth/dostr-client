(() => {
  let e,
    t = {},
    n = null;
  function s({ data: t, ports: n }) {
    let { action: s } = "string" === typeof t ? JSON.parse(t) : t;
    if (s)
      switch (s) {
        case "setPort":
          return (e = n[0]), void (e.onmessage = l);
      }
  }
  function l({ data: e }) {
    let { action: s, ticket: l, event: c } = e;
    switch (s) {
      case "stream":
        return (
          (n = l.id),
          (t[n] = t[n] || { ticket: l, events: {}, end: null }),
          void (t[n].end = null)
        );
      case "event":
        return void (t[n].events[c.id] = c);
      case "end":
        return (
          Object.keys(t[n].events).length
            ? (t[n].end = Date.now())
            : delete t[n],
          void (n = null)
        );
    }
  }
  function c() {
    (self.onmessage = s),
      setInterval(() => {
        let e = Object.values(t)
          .filter(({ end: e }) => e < Date.now() - 1e3)
          .map(({ ticket: e }) => e.id);
        for (let n of e) {
          let { ticket: e, events: s, end: l } = t[n];
          l &&
            (delete t[n],
            (e.results = Object.values(s)),
            (e.success = !0),
            e.results.length &&
              self.postMessage({ action: "complete", ticket: e }));
        }
      }, 1e3);
  }
  c();
})();
