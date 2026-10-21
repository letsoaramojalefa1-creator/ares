// Connects the ARES app to real services: Supabase sign-in and sync, a server-side VIGIL endpoint, and file downloads.
(function () {
  var C = window.ARES_CONFIG || {};
  var cloud = !!(C.supabaseUrl && C.supabaseKey && !/YOUR_/.test(C.supabaseUrl + C.supabaseKey));
  var sb = null, session = null;

  function screen(inner) {
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;inset:0;z-index:200;background:#171A20;color:#E8E8E8;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;text-align:center;font-family:Inter,system-ui,sans-serif';
    d.innerHTML = '<svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 5 59 59H46L32 29 18 59H5Z" fill="#E8E8E8"/><path d="M32 34l2.2 6.8L41 43l-6.8 2.2L32 52l-2.2-6.8L23 43l6.8-2.2Z" fill="#9CCBFF"/></svg><b style="letter-spacing:.35em;font-size:24px">ARES</b>' + inner;
    document.body.appendChild(d);
    return d;
  }
  function login() {
    var d = screen('<p style="color:#AEB2BA;margin:0">Sign in to continue. We will email you a one-time link.</p><input id="le" type="email" autocomplete="email" placeholder="you@example.com" style="width:min(320px,90vw);padding:12px;border-radius:10px;border:1px solid rgba(174,178,186,.3);background:#20242B;color:#F7F7F7;font:inherit"><button id="lb" style="padding:12px 20px;border:0;border-radius:10px;background:#9CCBFF;color:#171A20;font:inherit;font-weight:600;cursor:pointer">Email me a sign-in link</button><p id="lm" style="color:#AEB2BA;min-height:24px;margin:0"></p>');
    d.querySelector('#lb').onclick = function () {
      var email = d.querySelector('#le').value.trim(), m = d.querySelector('#lm');
      if (!email) return;
      m.textContent = 'Sending...';
      sb.auth.signInWithOtp({ email: email, options: { emailRedirectTo: location.origin + location.pathname } }).then(function (r) {
        m.textContent = r.error ? 'Could not send the link. Check the address and try again.' : 'Check your email for the sign-in link.';
      });
    };
    sb.auth.onAuthStateChange(function (e, s) { if (s) location.reload(); });
  }
  function ai(body) {
    var h = { 'Content-Type': 'application/json' };
    if (session) h.Authorization = 'Bearer ' + session.access_token;
    return fetch('/api/vigil', { method: 'POST', headers: h, body: JSON.stringify(body) }).then(function (r) {
      if (r.status === 429) throw { code: 'rate_limited' };
      if (!r.ok) throw { code: 'not_granted' };
      return r.json();
    });
  }
  function cdoc() {
    return {
      get: function () {
        return sb.from('ares_state').select('state').eq('user_id', session.user.id).maybeSingle().then(function (r) {
          if (r.error) throw r.error;
          return { exists: !!r.data, data: function () { return { s: r.data.state }; } };
        });
      },
      set: function (v) {
        return sb.from('ares_state').upsert({ user_id: session.user.id, state: v.s, updated_at: new Date().toISOString() }).then(function (r) { if (r.error) throw r.error; });
      }
    };
  }
  function ldoc() {
    return {
      get: function () { var s = localStorage.getItem('ares_remote'); return Promise.resolve({ exists: !!s, data: function () { return { s: s }; } }); },
      set: function (v) { localStorage.setItem('ares_remote', v.s); return Promise.resolve(); }
    };
  }
  function start() {
    window.aresMode = cloud ? 'cloud' : 'local';
    if (cloud) window.aresSignOut = function () { sb.auth.signOut().then(function () { location.reload(); }); };
    window.claude = {
      use: function (n) {
        if (n === 'user') return Promise.resolve({ id: function () { return Promise.resolve(session ? session.user.id : 'local'); } });
        if (n === 'db') return Promise.resolve({ doc: function () { return cloud ? cdoc() : ldoc(); } });
        if (n === 'sample') {
          var sm = function (m) { return ai({ messages: m }).then(function (r) { return { text: r.text }; }); };
          sm.json = function (p) {
            return ai({ messages: [{ role: 'user', content: p }] }).then(function (r) {
              var t = r.text, a = t.indexOf('{'), b = t.lastIndexOf('}');
              return JSON.parse(t.slice(a, b + 1));
            });
          };
          return Promise.resolve(sm);
        }
        if (n === 'downloads') {
          return Promise.resolve({ save: function (o) {
            var a = document.createElement('a');
            a.href = URL.createObjectURL(o.data instanceof Blob ? o.data : new Blob([o.data]));
            a.download = o.filename; document.body.appendChild(a); a.click(); a.remove();
            return Promise.resolve();
          } });
        }
        return Promise.resolve(null);
      }
    };
    var s = document.createElement('script'); s.onload = function () { var t = document.createElement('script'); t.src = 'ares2.js'; document.body.appendChild(t); }; s.src = 'app.js'; document.body.appendChild(s);
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(function () {});
  }
  if (!cloud) return start();
  try {
    sb = window.supabase.createClient(C.supabaseUrl, C.supabaseKey);
    sb.auth.getSession().then(function (r) {
      session = r.data.session;
      if (!session) return login();
      start();
    }).catch(function () { screen('<p>Could not reach the sign-in service. Check your connection and refresh.</p>'); });
  } catch (e) { screen('<p>Sign-in service failed to load. Refresh to try again.</p>'); }
})();
