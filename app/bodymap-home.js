(()=>{
 const text={ko:'바디맵 처음으로',en:'Body map home',ja:'ボディマップの最初へ',zh:'返回人体图首页','zh-Hant':'回到人體圖首頁',fr:'Accueil du modèle',ru:'К началу карты тела',es:'Inicio del mapa corporal',de:'Zur Körperansicht',pt:'Início do mapa corporal',it:'Vista iniziale del corpo'};
 function label(el){if(!el)return;const name=text[window.SKMLanguage?.code]||text.en;el.setAttribute('aria-label',name);el.title=name;}
 function refresh(){label(document.querySelector('#studio-home,[data-studio-return]'));}
 window.SKMBodyHome={label};window.addEventListener('skm-language',refresh);refresh();
})();