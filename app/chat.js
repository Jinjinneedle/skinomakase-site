/* Booking conversations: text is rendered as text, and delivery retries reuse a request id. */
(() => {
const T=key=>window.SKMLanguage?.t(key)||key;
'use strict';
const assetBase=new URL('.',document.currentScript.src);
let current=null;
const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!=null)e.textContent=text;if(cls)e.className=cls;return e;};
function linkedText(node,text){
 const pattern=/https?:\/\/[^\s<>]+/g;let start=0;
 for(const match of text.matchAll(pattern)){
  node.append(document.createTextNode(text.slice(start,match.index)));
  let href=match[0],tail='';while(/[.,!?;)]$/.test(href)){tail=href.slice(-1)+tail;href=href.slice(0,-1);}
  try{const url=new URL(href);if(!['https:','http:'].includes(url.protocol)||url.username||url.password)throw Error();
   const a=el('a',href);a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';node.append(a,document.createTextNode(tail));
  }catch(_){node.append(document.createTextNode(match[0]));}
  start=match.index+match[0].length;
 }
 node.append(document.createTextNode(text.slice(start)));
}
function open({bookingId,code,admin=false,draft='',studio='',onClose=null}){
 if(current)current.close();
 const api=window.SKMBooking,dialog=el('dialog',null,'skm-chat'),head=el('header');
 const brand=el('div',null,'skm-chat-brand'),mark=el('button',null,'skm-terminal-logo'),logo=el('img');
 const close=el('button',T('close'),'skm-chat-close');
 dialog.setAttribute('aria-label',T('chat')+' #'+code);
 const payment=el('button',String(window.SKMLanguage?.locale||'').startsWith('ko')?'결제 안내':'Payment details','skm-payment-entry');payment.type='button';payment.hidden=true;payment.onclick=()=>window.SKMSessionPayment?.open(bookingId);
 logo.src=new URL('logo-transparent.png',assetBase).href;logo.alt='SKINOMAKASE';
 mark.type=close.type='button';mark.setAttribute('aria-label',T('close'));mark.append(logo);
 brand.append(mark,close);head.append(brand,el('small','#'+code));
 const older=el('button',T('older')),list=el('div',null,'skm-chat-list'),form=el('form'),label=el('label'),input=el('textarea'),send=el('button',T('send')),status=el('p',T('loading'),'skm-chat-status');
 older.type='button';older.hidden=true;list.setAttribute('aria-label',T('chatHistory'));list.setAttribute('role','log');list.setAttribute('aria-live','polite');
 input.maxLength=4000;input.rows=3;input.placeholder=T('placeholder');input.disabled=true;input.setAttribute('aria-label',T('messageLabel'));
 send.type='submit';send.disabled=true;status.setAttribute('role','status');label.append(input);form.append(label,send);const toolbar=el('div',null,'skm-chat-toolbar');dialog.append(head,toolbar,payment,older,list,form,status);document.body.append(dialog);
 const viewport=window.visualViewport;
 const resize=()=>{dialog.classList.toggle('compact',(viewport?.height||innerHeight)<600);dialog.style.setProperty('--chat-viewport',(viewport?.height||innerHeight)+'px');dialog.style.setProperty('--chat-offset',(viewport?.offsetTop||0)+'px');};
 resize();viewport?.addEventListener('resize',resize);viewport?.addEventListener('scroll',resize);
 const translation=window.SKMTranslation?.mount({container:toolbar,kind:'booking',id:bookingId,changed:()=>render(false)});
 if(studio)toolbar.prepend(window.SKMStudioLink(studio));else window.SKMStudioInfo?.(bookingId).then(name=>{if(name&&!stopped)toolbar.prepend(window.SKMStudioLink(name));}).catch(()=>{});
 let stopped=false,loading=false,sending=false,ready=false,key='',pending=null,items=new Map(),timer=null,userId='';
 const state=()=>{try{return JSON.parse(localStorage.getItem(key)||'{}');}catch(_){return {};}};
 const saveState=()=>{try{localStorage.setItem(key,JSON.stringify({draft:input.value,pending}));}catch(_){}};
 const activeUser=()=>api.session()?.user?.id===userId;
 function render(scroll=false){
  const nearBottom=list.scrollHeight-list.scrollTop-list.clientHeight<70,previous=list.scrollHeight,top=list.scrollTop;
  const sorted=[...items.values()].sort((a,b)=>a.sequence-b.sequence);list.replaceChildren();
  if(!sorted.length)list.append(el('p',T('chatEmpty'),'skm-chat-empty'));
  for(const m of sorted){
   const mine=m.sender_role===(admin?'admin':'customer'),card=el('article',null,mine?'skm-chat-message mine':'skm-chat-message');
   const name=el('strong',m.sender_role==='admin'?'SKINOMAKASE':admin?T('customer'):T('me')),body=el('p');linkedText(body,m.body);
   const time=el('time',new Date(m.created_at).toLocaleString(window.SKMLanguage?.locale||'ko-KR'));time.dateTime=m.created_at;card.append(name,body,time);translation?.render(body,{...m,mine});list.append(card);
  }
  translation?.update(sorted.map(m=>({...m,mine:m.sender_role===(admin?'admin':'customer')})));
  if(scroll||nearBottom)list.scrollTop=list.scrollHeight;else list.scrollTop=top+Math.max(0,list.scrollHeight-previous);
 }
 const merge=rows=>{for(const m of rows)items.set(m.id,m);};
 async function load(mode='new'){
  if(stopped||loading||sending||!activeUser())return;loading=true;
  const all=[...items.values()],cursor=mode==='older'?{before:Math.min(...all.map(m=>m.sequence))}:ready?{after:Math.max(0,...all.map(m=>m.sequence))}:{};
  try{
   const rows=await api.messages(bookingId,cursor);if(stopped||!activeUser())return;
   merge(rows);if(rows.length||!ready)render(!ready);if(rows.length&&api.sessionPayment&&window.SKMSessionPayment)api.sessionPayment(bookingId).then(p=>{if(!stopped&&activeUser())payment.hidden=!p;}).catch(()=>{});if(!ready||mode==='older')older.hidden=rows.length<100;
   if(!document.hidden&&mode!=='older'&&list.scrollHeight-list.scrollTop-list.clientHeight<90)api.markBookingRead?.(bookingId,Math.max(0,...[...items.values()].map(m=>m.sequence))).then(()=>{window.dispatchEvent(new Event('skm-messages-read'));if(parent!==window)parent.postMessage({skm:'messages-read'},location.origin==='null'?'*':location.origin);}).catch(()=>{});
   ready=true;input.disabled=!!pending;send.disabled=false;status.textContent=pending?T('retryNotice'):'';
   send.textContent=pending?T('retry'):T('send');
  }catch(e){if(!stopped)status.textContent=e.status===401?T('relogin'):e.status===404?T('chatUnavailable'):T('chatLoadError');}
  finally{loading=false;}
 }
 input.addEventListener('input',saveState);
 form.onsubmit=async event=>{
  event.preventDefault();if(!ready||sending||!activeUser())return;
  const body=input.value.trim();if(!body){status.textContent=T('writeMessage');return;}
  if(!pending){pending={id:crypto.randomUUID(),body};saveState();}
  sending=true;send.disabled=true;input.disabled=true;status.textContent=T('sending');
  try{
   const message=await api.sendMessage(bookingId,pending.id,pending.body,admin);
   if(stopped||!activeUser())return;
   merge([message]);pending=null;input.value='';saveState();render(true);status.textContent=T('sent');send.textContent=T('send');
  }catch(e){if(!stopped){send.textContent=T('retry');status.textContent=e.status===401?T('relogin'):T('sendError');}}
  finally{sending=false;if(!stopped){send.disabled=false;input.disabled=!!pending;}}
 };
 older.onclick=()=>load('older');
 const onVisible=()=>{if(!document.hidden&&dialog.open)load();};
 function cleanup(){if(stopped)return;stopped=true;translation?.stop();if(timer)clearInterval(timer);document.removeEventListener('visibilitychange',onVisible);viewport?.removeEventListener('resize',resize);viewport?.removeEventListener('scroll',resize);dialog.remove();if(current?.dialog===dialog)current=null;onClose?.();}
 const dismiss=()=>{
   if(dialog.classList.contains('leaving'))return;
   if(matchMedia('(prefers-reduced-motion: reduce)').matches){dialog.close();return;}
   dialog.classList.add('leaving');
   const veil=dialog.animate([{opacity:1},{opacity:0}],{duration:220,easing:'ease-in',fill:'forwards'});
   veil.finished.then(()=>{if(dialog.open)dialog.close();}).catch(()=>{});
 };
 mark.onclick=close.onclick=dismiss;
 dialog.addEventListener('cancel',e=>{e.preventDefault();dismiss();});
 dialog.addEventListener('close',cleanup);
 current={dialog,close:()=>{dialog.close();cleanup();}};dialog.showModal();
 (async()=>{
  try{
   const user=await api.currentUser();if(stopped)return;userId=user.id;key=`skm-chat-v1:${user.id}:${bookingId}:${admin?'admin':'customer'}`;
   const saved=state();pending=saved.pending?.id&&saved.pending?.body?saved.pending:null;input.value=pending?.body||draft||saved.draft||'';
   if(api.sessionPayment&&window.SKMSessionPayment){api.sessionPayment(bookingId).then(p=>{if(!stopped&&activeUser())payment.hidden=!p;}).catch(()=>{});}
   await load();if(stopped)return;
   timer=setInterval(()=>{if(!document.hidden&&dialog.open&&!sending)load();},8000);document.addEventListener('visibilitychange',onVisible);
  }catch(_){status.textContent=T('relogin');}
 })();
 return current;
}
window.SKMChat={open,close:()=>current?.close()};
})();
