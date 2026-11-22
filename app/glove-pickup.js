import {paypalMark,paypalWordmark} from './paypal-brand.js';
import './gloves-i18n.js';
import routing from './glove-slot-model.cjs';
import checkout from './glove-checkout.cjs';
import {checkoutText as t} from './glove-checkout-copy.js';
const text=key=>window.SKMGloveText(key);
function element(tag,value,className){
 const el=document.createElement(tag);if(value!=null)el.textContent=value;if(className)el.className=className;return el;
}
function externalLink(label,href){
 const a=element('a',label,'glove-map-link');a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a;
}
// PayPal.Me is an external payment request. No return URL or client state marks
// a payment as complete, changes ownership, or invokes gloveCollect.
export function mountPickup(section,{city,number,itemName='',live=false,preview=false,onState,navigate,locationHost=null,pickupPlan=null}){
 const api=window.SKMBooking,currentUser=()=>api?.session()?.user?.id||null,compact=!!locationHost;
 let generation=0,disposed=false,amount='10',busy=false;
 const valid=(run,user)=>!disposed&&run===generation&&currentUser()===user&&section.isConnected;
 const content=element('div',null,'glove-purchase');section.replaceChildren(content);
 function locationSummary(state,info){
  if(!locationHost)return;
  locationHost.replaceChildren();
  const publicAddress=[pickupPlan?.address||city.label,pickupPlan?.area].filter(Boolean).join(' · ');
  const address=state==='pay'?(info.request.reply||publicAddress):publicAddress;
  locationHost.append(element('p',address,'glove-pickup-address'));
 }
 function priceForm(state,info,run,user){
  locationSummary(state,info);
  const form=element('form',null,'glove-purchase-form');form.noValidate=true;
  const label=element('div',null,'glove-price-label');if(!compact)label.append(element('span',t('price')));
  const field=element('span',null,'glove-price-field');
  const minus=element('button','−','glove-price-step'),plus=element('button','+','glove-price-step');
  minus.type=plus.type='button';minus.setAttribute('aria-label',t('decrease'));plus.setAttribute('aria-label',t('increase'));
  const value=element('span',null,'glove-price-value');value.append(element('span','USD'));
  const input=element('input');input.type='text';input.inputMode='decimal';input.autocomplete='off';input.value=amount;input.required=true;input.maxLength=18;input.setAttribute('aria-label',t('price'));value.append(input);field.append(minus,value,plus);label.append(field);
  const minimum=element('p',t('minimum'),compact?'glove-sr-only':'glove-pickup-note');minimum.id='glove-price-help';input.setAttribute('aria-describedby',minimum.id);
  const pickup=element('p',t('pickup'),'glove-pickup-only');
  const action=element('button',null,'glove-buy-button');action.type='submit';
  const title=element('span');action.append(title);if(!compact){const glyph=element('span','↗');glyph.setAttribute('aria-hidden','true');action.append(glyph);}
  const notice=element('p',null,'glove-purchase-status');notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');
  const enabled=['pay','login','request'].includes(state);
  const actionLabel={pay:'buy',held:'held',login:'login',request:'request',pending:'pending'};
  const stateLabel=actionLabel[state]?t(actionLabel[state]):text(state==='preview'?'preview':'unavailable');
  const setTitle=value=>{
   if(!compact){title.textContent=value;return;}
   action.classList.add('glove-paypal-button');title.className='glove-paypal-brand';title.replaceChildren();
   for(const [src,className] of [[paypalMark,'glove-paypal-mark'],[paypalWordmark,'glove-paypal-wordmark']]){
    const image=element('img',null,className);image.src=src;image.alt='';image.draggable=false;title.append(image);
   }
  };
  setTitle(stateLabel);
  if(compact){action.title=stateLabel;action.setAttribute('aria-label','PayPal · '+stateLabel);}
  action.disabled=!enabled;input.disabled=busy;
  const syncSteps=()=>{const normalized=checkout.usdAmount(input.value);minus.disabled=busy||normalized==='10.00';plus.disabled=busy;};
  const step=direction=>{if(busy||!valid(run,user))return;const normalized=checkout.stepUsdAmount(input.value,direction);amount=normalized.endsWith('.00')?normalized.slice(0,-3):normalized;input.value=amount;input.removeAttribute('aria-invalid');notice.textContent='';syncSteps();window.SKMApp?.haptic?.('light');};
  minus.onclick=()=>step(-1);plus.onclick=()=>step(1);syncSteps();
  input.onblur=()=>{if(!checkout.usdAmount(input.value)){input.setAttribute('aria-invalid','true');notice.textContent=t('invalid');}};
  input.oninput=()=>{amount=input.value;input.removeAttribute('aria-invalid');notice.textContent='';syncSteps();};
  form.append(label,minimum);if(!locationHost)form.append(pickup);
  if(state==='pay'&&!locationHost){
   // Exact pickup instructions are the recipient-specific snapshot from the server.
   const address=element('p',info.request.reply||text('shared'),'glove-pickup-address private-note');
   form.append(address,externalLink(text('map'),routing.pickupLink(info.request,true)));
  }
  form.append(action,notice);content.append(form);
  if(state==='pay'&&!compact){
   content.append(element('p',t('memo')+': '+itemName,'glove-pickup-note'),element('p',t('verify'),'glove-pickup-note'));
   const collect=element('button',text('collect'),'glove-map-link glove-confirm-pickup');collect.type='button';
   // This is physical receipt only, kept separate from paying.
   collect.onclick=async()=>{
    if(busy||!valid(run,user)||!window.confirm(text('confirm')))return;
    busy=true;collect.disabled=true;
    try{await api.gloveCollect(info.request.id);if(valid(run,user))await refresh();}
    catch{if(valid(run,user)){collect.disabled=false;notice.textContent=text('error');}}
    finally{busy=false;}
   };content.append(collect);
  }
  form.onsubmit=async e=>{
   e.preventDefault();if(busy||!enabled||!valid(run,user))return;
   const url=checkout.paypalURL(input.value);
   if(!url){input.setAttribute('aria-invalid','true');notice.textContent=t('invalid');input.focus();return;}
   if(state==='login'){navigate('app/login.html?next=account');return;}
   busy=true;action.disabled=true;action.setAttribute('aria-busy','true');if(!compact)title.textContent=t('check');input.disabled=true;syncSteps();
   try{
    const isLive=await api.dropLive();
    if(!valid(run,user))return;
    const latest=routing.pickupForPair(await api.gloveList(),city,number);
    if(!valid(run,user))return;
    const next=checkout.checkoutState({live:isLive===true,preview,userId:user,info:latest});
    if(next!==state||latest?.drop.id!==info?.drop.id||latest?.request?.id!==info?.request?.id){await refresh();return;}
    if(state==='request'){await api.gloveRequest(info.drop.id);if(valid(run,user))await refresh();return;}
    if(!compact)notice.textContent=t('verify');
    // A same-frame anchor supports WKWebView's existing external-link handler,
    // and browser Back returns to the collection. No popup dependency.
    const link=document.createElement('a');link.href=url;link.rel='noreferrer';link.hidden=true;content.append(link);link.click();link.remove();
   }catch{if(valid(run,user))notice.textContent=text('error');}
   finally{busy=false;if(valid(run,user)){action.disabled=false;action.removeAttribute('aria-busy');input.disabled=false;setTitle(t(actionLabel[state]));syncSteps();}}
  };
 }
 async function refresh(){
  const run=++generation,user=currentUser();content.replaceChildren();locationSummary('held',null);
  let info=null,isLive=live;
  if(preview||!isLive||!user){priceForm(checkout.checkoutState({live:isLive,preview,userId:user,info}),info,run,user);return;}
  content.append(element('p',text('loading'),'glove-pickup-note'));
  try{
   isLive=await api.dropLive();
   if(!valid(run,user))return;
   if(isLive)info=routing.pickupForPair(await api.gloveList(),city,number);
  }catch{
   if(valid(run,user)){
    const retry=element('button',text('refresh'),'glove-map-link');retry.type='button';retry.onclick=refresh;
    content.replaceChildren(element('p',text('error'),'glove-pickup-note'),retry);
   }return;
  }
  if(!valid(run,user))return;
  content.replaceChildren();if(info)onState?.(info.drop.status,info.request?.status);
  const state=checkout.checkoutState({live:isLive===true,preview,userId:user,info});
  if(state==='owner'){
   try{
    const profile=await api.community('owner',{kind:'glove',id:info.drop.id});if(!valid(run,user))return;
    content.append(element('strong',profile.name||text('mine')));
    if(profile.email)content.append(element('p',profile.email,'glove-pickup-note'));
    const contact=element('button',t('owner'),'glove-buy-button');contact.type='button';
    contact.onclick=()=>{if(valid(run,user))navigate(profile.mine?'app/community.html?view=profile':'app/community.html?view=thread&kind=glove&subject='+encodeURIComponent(info.drop.id));};content.append(contact);
   }catch{if(valid(run,user))content.append(element('p',text('collected'),'glove-pickup-note'));}return;
  }
  priceForm(state,info,run,user);
 }
 function visibility(){if(document.hidden){generation++;content.replaceChildren();locationHost?.replaceChildren();}else refresh();}
 function storage(e){if(!e.key||e.key==='skm-customer-session-v1')refresh();}
 document.addEventListener('visibilitychange',visibility);window.addEventListener('storage',storage);
 window.addEventListener('skm-account-changed',refresh);window.addEventListener('skm-language',refresh);
 refresh();return()=>{disposed=true;generation++;section.replaceChildren();locationHost?.replaceChildren();document.removeEventListener('visibilitychange',visibility);window.removeEventListener('storage',storage);window.removeEventListener('skm-account-changed',refresh);window.removeEventListener('skm-language',refresh);};
}
