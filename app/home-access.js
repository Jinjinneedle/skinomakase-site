/* Landing access uses the real server session; no local login flag. */
(() => {
const T=key=>window.SKMLanguage?.t(key)||key;
  'use strict';
  window.SKMEnterHome = async (api, nativeLogin) => {
    try {
      return await api.currentUser();
    } catch (error) {
      if (error.status !== 401) throw error;
    }
    if (!nativeLogin) {
      throw Object.assign(new Error(T('nativeOnly')), {code: 'native-only'});
    }
    const completed = await api.signInGoogle();
    if (!completed) throw new Error('Login did not complete');
    return await api.currentUser();
  };
})();
