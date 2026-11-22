(() => {
  const text = key => window.SKMLanguage?.t(key) || key;
  const get = id => document.getElementById(id);
  const requested = new URLSearchParams(location.search).get('next');
  const next = ['bodymap', 'admin', 'account', 'home'].includes(requested) ? requested : 'account';
  const status = get('status');
  const apple = get('apple');
  const native = window.webkit?.messageHandlers?.skmAuth;
  const controls = [get('login'), get('google'), apple];
  let busy = false;

  status.hidden = false;
  status.textContent = text('loginHint');
  if (native && next !== 'admin') {
    native.postMessage({action:'providers'}).then(providers => {
      apple.hidden = !providers?.apple;
    }).catch(() => {});
  }
  async function login(provider) {
    if (busy) return;
    busy = true;
    for (const control of controls) control.disabled = true;
    status.textContent = text('loginConnecting');
    try {
      if (provider === 'apple') {
        await SKMBooking.signInApple();
      } else if (!await SKMBooking.signInGoogle(next)) {
        return;
      }
      if(await SKMBooking.verifiedAppUser()!==true)throw Error('Verified sign-in required');
      if(next==='home'){location.replace('../world.html');return;}
      // The body map lives in the parent. Account and admin are pages in this frame.
      if (window.parent !== window && next === 'bodymap') parent.postMessage({skm:'signed-in', next}, '*');
      else location.replace(next === 'bodymap' ? '../world.html#bodymap' : next === 'admin' ? 'admin.html' : 'account.html');
    } catch {
      status.textContent = text('loginFailed');
    } finally {
      busy = false;
      for (const control of controls) control.disabled = false;
    }
  }
  window.addEventListener('pageshow', () => { busy=false; for(const c of controls)c.disabled=false; status.textContent=text('loginHint'); });
  get('login').onclick = get('google').onclick = () => login('google');
  apple.onclick = () => login('apple');
})();
