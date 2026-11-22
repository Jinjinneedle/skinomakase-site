(() => {
'use strict';
const api=window.SKMLanguage,button=document.createElement('button'),dialog=document.createElement('dialog');
button.id='skm-language-button';button.type='button';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-expanded','false');
const icon=document.createElement('img');icon.src='app/language-icon.jpeg';icon.alt='';button.append(icon);
dialog.id='skm-language-dialog';dialog.setAttribute('aria-labelledby','skm-language-heading');
const header=document.createElement('header'),heading=document.createElement('h2'),close=document.createElement('button'),list=document.createElement('div');
heading.id='skm-language-heading';heading.dataset.ui='language';close.type='button';close.textContent='×';close.dataset.uiAria='close';list.className='skm-language-list';
header.append(heading,close);dialog.append(header,list);
for(const language of api.languages){
 const option=document.createElement('button');option.type='button';option.lang=language.locale;option.textContent=language.name;option.dataset.code=language.code;
 option.onclick=()=>{api.set(language.code);dialog.close();};list.append(option);
}
function refresh(){button.setAttribute('aria-label',api.t('language'));button.title=api.t('language');list.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.code===api.code));}
button.onclick=()=>{refresh();api.apply();dialog.showModal();button.setAttribute('aria-expanded','true');list.querySelector('[aria-pressed=true]')?.focus();};
close.onclick=()=>dialog.close();dialog.addEventListener('close',()=>{button.setAttribute('aria-expanded','false');button.focus();});
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
window.addEventListener('skm-language',refresh);document.body.append(button,dialog);api.apply();refresh();
})();
