(() => {
'use strict';
const api=window.SKMBooking;
function paint(dark){
 const paintedDark=dark&&!document.documentElement.hasAttribute('data-skm-paper');
 document.documentElement.classList.toggle('skm-session',paintedDark);
 document.querySelectorAll('iframe').forEach(frame=>frame.contentWindow?.postMessage({skm:'session-theme',dark},'*'));
 window.dispatchEvent(new CustomEvent('skm-theme',{detail:{dark:paintedDark}}));
}
let parentTheme;try{if(parent!==window)parentTheme=parent.SKMTheme;}catch(_){}
if(parentTheme){
 window.SKMTheme=parentTheme;paint(parentTheme.dark);
 window.addEventListener('message',e=>{if(e.source===parent&&e.data?.skm==='session-theme')paint(!!e.data.dark);});return;
}
if(!api)return;
const state=window.SKMCreateThemeState({storage:localStorage,session:api.session,threads:()=>api.myThreads(),changed:({dark})=>paint(dark)});
const T=key=>window.SKMLanguage?.t(key)||key;
function returnHome(){state.setDark(false);window.dispatchEvent(new CustomEvent('skm-return-home'));}
async function openConversation(){
 await state.refresh();const rows=state.rows;if(!rows.length)return false;
 state.setDark(true);
 const open=r=>window.SKMChat.open({bookingId:r.id,code:r.code,onClose:returnHome});
 if(rows.length===1){open(rows[0]);return true;}
 const picker=document.createElement('dialog');picker.className='skm-chat skm-thread-picker';
 const head=document.createElement('header'),title=document.createElement('h2'),close=document.createElement('button'),list=document.createElement('div');
 title.textContent=T('chat');close.type='button';close.textContent=T('close');list.className='skm-chat-list';head.append(title,close);picker.append(head,list);
 let chosen=false;
 for(const row of rows){const button=document.createElement('button');button.type='button';button.textContent='#'+row.code+' · '+new Date(row.created_at).toLocaleDateString(window.SKMLanguage.locale);button.onclick=()=>{chosen=true;picker.close();open(row);};list.append(button);}
 close.onclick=()=>picker.close();picker.addEventListener('close',()=>{picker.remove();if(!chosen)returnHome();});document.body.append(picker);picker.showModal();return true;
}
window.SKMTheme={get dark(){return state.dark;},get eligible(){return state.eligible;},refresh:state.refresh,booked:state.booked,openConversation,returnHome};
state.refresh().catch(()=>{});
window.addEventListener('storage',e=>{if(e.key==='skm-customer-session-v1'||e.key?.startsWith('skm-session-theme-v1:'))state.refresh().catch(()=>{});});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)state.refresh().catch(()=>{});});
})();
