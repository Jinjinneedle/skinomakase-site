(() => {
  const api = window.SKMBooking;
  const get = id => document.getElementById(id);
  const dialog = get('delete-dialog');
  const text = key => SKMLanguage.t(key);
  let accountId = '';
  let busy = false;
  let finished = false;
  get('delete-open').onclick = () => {
    const user = api.session()?.user;
    if (!user) return;
    accountId = user.id;
    get('delete-account-email').textContent = user.email || '';
    get('delete-apple-help').hidden = !(user.app_metadata?.providers || [user.app_metadata?.provider]).includes('apple');
    get('delete-confirm').hidden = false;
    get('delete-result').textContent = '';
    finished = false;
    dialog.showModal();
    get('delete-close').focus();
  };
  const close = () => {
    if (busy) return;
    if (finished) { window.top.location.replace(new URL('../world.html', location.href).href); return; }
    dialog.close();
  };
  get('delete-close').onclick = close;
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  get('delete-confirm').onclick = async () => {
    if (busy || finished) return;
    busy = true;
    get('delete-confirm').disabled = get('delete-close').disabled = true;
    get('delete-result').textContent = text('loading');
    try {
      const result = await api.deleteOwnAccount(accountId);
      finished = result === 'deleted';
      get('delete-result').textContent = text(finished ? 'accountDeleted' : 'deleteReview');
      get('delete-confirm').hidden = true;
    } catch {
      get('delete-result').textContent = text('deleteRetry');
    } finally {
      busy = false;
      get('delete-close').disabled = get('delete-confirm').disabled = false;
    }
  };
})();
