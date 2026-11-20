(() => {
  'use strict';
  // Web-only entry point. The separately packaged iPhone app keeps its own logo behavior.
  if (location.protocol !== 'https:' && location.protocol !== 'http:') return;
  const logo = document.getElementById('logoWrap');
  if (!logo) return;
  const store = 'https://apps.apple.com/app/id6832430549';
  const returnKey = 'skm-appstore-return-v1';
  const korean = /^ko\b/i.test(navigator.language || '');
  let leavingForStore = false;
  const style = document.createElement('style');
  style.textContent = '.skm-web-continue{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 24px);transform:translateX(-50%);z-index:51;border:0;background:transparent;color:#777;font:12px/1.5 Arial,sans-serif;letter-spacing:.02em;min-height:44px;padding:10px 18px;cursor:pointer;text-decoration:underline;text-underline-offset:4px;transition:opacity .3s}.skm-web-continue:hover,.skm-web-continue:focus-visible{color:#111}.logo-wrap:focus-visible{outline:1px solid #999;outline-offset:8px}body:not(.state0) .skm-web-continue{opacity:0;visibility:hidden;pointer-events:none}';
  document.head.append(style);
  const web = document.createElement('button');
  web.className = 'skm-web-continue';web.type = 'button';web.textContent = korean ? '웹으로 계속' : 'Continue on web';
  function openWeb() { if (typeof window.changeState === 'function') window.changeState(1); }
  web.addEventListener('click', openWeb);document.body.append(web);
  logo.setAttribute('role', 'link');logo.tabIndex = 0;
  logo.setAttribute('aria-label', korean ? 'SKINOMAKASE 앱 다운로드 · App Store' : 'Download SKINOMAKASE · App Store');
  function visitStore(event) {
    event.preventDefault();event.stopImmediatePropagation();leavingForStore = true;
    try { sessionStorage.setItem(returnKey, '1'); } catch (_) {}
    location.assign(store);
  }
  logo.addEventListener('click', visitStore, true);
  logo.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') visitStore(event); });
  function returnToWeb() {
    let returning = leavingForStore;
    try { returning = returning || sessionStorage.getItem(returnKey) === '1'; if (returning) sessionStorage.removeItem(returnKey); } catch (_) {}
    if (returning) { leavingForStore = false; openWeb(); }
  }
  window.addEventListener('pageshow', returnToWeb);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && leavingForStore) returnToWeb(); });
})();
