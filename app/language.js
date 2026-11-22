/* One saved language across the landing, native web views, and customer forms. */
(() => {
'use strict';
const languages=[
 {code:'ko',locale:'ko-KR',name:'한국어'}, {code:'en',locale:'en-US',name:'English'},
 {code:'ja',locale:'ja-JP',name:'日本語'}, {code:'zh',locale:'zh-Hans',name:'简体中文'},
 {code:'zh-Hant',locale:'zh-Hant',name:'繁體中文'}, {code:'ru',locale:'ru-RU',name:'Русский'},
 {code:'fr',locale:'fr-FR',name:'Français'}, {code:'es',locale:'es-ES',name:'Español'},
 {code:'de',locale:'de-DE',name:'Deutsch'}, {code:'pt',locale:'pt-BR',name:'Português'},
 {code:'it',locale:'it-IT',name:'Italiano'}
];
function normalize(value){
 const v=String(value||'').replaceAll('_','-').toLowerCase();
 if(/^zh-(hant|tw|hk|mo)(-|$)/.test(v))return 'zh-Hant';
 const base=v.split('-')[0];return languages.some(x=>x.code===base)?base:'en';
}
let code;
try{code=normalize(localStorage.getItem('skm-lang')||localStorage.getItem('skm-locale')||navigator.language);}catch(_){code=normalize(navigator.language);}
const t=key=>window.SKM_UI_TRANSLATIONS?.[code]?.[key]||window.SKM_UI_TRANSLATIONS?.en?.[key]||key;
function apply(){
 document.documentElement.lang=code==='zh'?'zh-Hans':code;
 document.querySelectorAll('[data-ui]').forEach(e=>{e.textContent=t(e.dataset.ui);});
 document.querySelectorAll('[data-ui-aria]').forEach(e=>e.setAttribute('aria-label',t(e.dataset.uiAria)));
 const profile=document.getElementById('skm-account-link');if(profile){profile.title=t('requests');profile.setAttribute('aria-label',t('requests'));}
}
function set(value,{persist=true}={}){
 code=normalize(value);
 if(persist)try{localStorage.setItem('skm-lang',code);localStorage.setItem('skm-locale',languages.find(x=>x.code===code).locale);}catch(_){}
 apply();window.dispatchEvent(new CustomEvent('skm-language',{detail:{code}}));
}
window.SKMLanguage={languages,normalize,t,set,apply,get code(){return code;},get locale(){return languages.find(x=>x.code===code).locale;}};
window.addEventListener('storage',e=>{if(e.key==='skm-lang')set(e.newValue,{persist:false});});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();
