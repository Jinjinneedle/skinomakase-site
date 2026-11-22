import {createAdminAccess} from './admin-access.js';
import {deskText as T} from './desk-copy.js';
import {gloveDropPlan} from './glove-drop-plan.js';
const api=window.SKMBooking,$=id=>document.getElementById(id),work=$('work');
const adminLink=$('studio-admin'),adminShortcut=$('admin-shortcut'),adminStatus=$('admin-check-status');
const adminAccess=createAdminAccess(api,allowed=>{adminLink.hidden=adminShortcut.hidden=!allowed;},state=>{
 const expected=(api.session()?.user?.email||'').toLowerCase()==='skinomakase@gmail.com';
 adminStatus.hidden=!expected||!['checking','error','denied'].includes(state);
 adminStatus.textContent=T(state==='checking'?'adminChecking':state==='error'?'adminRetry':'adminDenied');
});
adminLink.onclick=adminShortcut.onclick=async e=>{e.preventDefault();if(await adminAccess.check())location.href=adminLink.href;};
const region={'서울':'1835848','seoul':'1835848','도쿄':'1850147','tokyo':'1850147','홍콩':'1819729','hong kong':'1819729','뉴욕':'5128581','new york':'5128581','new york city':'5128581','밴쿠버':'6173331','vancouver':'6173331','몬트리올':'6077243','montréal':'6077243','montreal':'6077243','로스앤젤레스':'5368361','los angeles':'5368361'};
const edition=pair=>gloveDropPlan[region[pair.area.trim().toLowerCase()]];
const pairName=pair=>[edition(pair)?.code,pair.area,'#'+String(pair.number).padStart(3,'0')].filter(Boolean).join(' · ');
const statuses={new:'received',accepted:'inProgress',scheduled:'scheduled',done:'done',declined:'declined',cancelled:'cancelled'};
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;};
const lang=()=>window.SKMLanguage.locale,uid=()=>api.session()?.user?.id;
let serial=0,tab='desk',owner,marketTimer,paused=false,busy=false,marketRevision='';
const money=(n,c)=>new Intl.NumberFormat(lang(),{style:'currency',currency:c}).format(n/(['KRW','JPY'].includes(c)?1:100));
const time=value=>new Date(value).toLocaleString(lang());
function status(error){$('status').textContent=!error?'':error.status===404?T('linkPending'):error.message==='profile required'?T('needProfile'):T('loadError');}
function action(label,fn,cls='link'){const b=el('button',label,cls);b.type='button';b.onclick=async()=>{if(busy)return;b.disabled=true;busy=true;try{await fn();}catch(e){status(e);}finally{busy=false;b.disabled=false;}};return b;}
function visit(view,p={}){location.href='community.html?'+new URLSearchParams({view,...p});}
function group(key){const s=el('section');s.append(el('h2',T(key)));work.append(s);return s;}
// Preview hides only in this document; it never mutates the persisted booking.
const previewHidden=new Set(), liveCancellation=window.SKM_BOOKING?.requestCancellationLive===true;
const removalLabel=()=>T(liveCancellation?'removeRequest':'previewRemove');
function confirmCancellation(code){
 const dialog=el('dialog',null,'cancel-request');
 const title=el('h2',removalLabel()+' · #'+code);
 dialog.setAttribute('aria-label',title.textContent);
 const back=el('button',T('back'),'link'),remove=el('button',removalLabel(),'link');
 dialog.append(title,el('p',T(liveCancellation?'confirmRemove':'confirmPreviewRemove')),back,remove);document.body.append(dialog);
 return new Promise(resolve=>{
   back.onclick=()=>dialog.close();remove.onclick=()=>dialog.close('remove');
   dialog.addEventListener('close',()=>{const accepted=dialog.returnValue==='remove';dialog.remove();resolve(accepted);},{once:true});
   dialog.showModal();back.focus();
 });
}
const local=(ko,en)=>String(lang()).startsWith('ko')?ko:en;
function requestCard(r){
 const journey=window.SKMSessionJourney, state=journey.describe(r,lang());
 const card=el('article',null,'session-card');card.dataset.phase=state.key;
 const head=el('header',null,'session-card-head'),info=el('div');
 info.append(el('small',journey.city(r)||'SKINOMAKASE','serial'),el('strong','#'+r.code,'serial'));
 head.append(info,el('span',state.title,'session-badge'));card.append(head);
 if(!state.closed){
  const steps=el('ol',null,'session-steps');steps.setAttribute('aria-label',local('진행 상태','Progress'));
  [local('접수','Request'),local('예약금','Deposit'),local('일정','Schedule'),local('확정','Confirmed')].forEach((label,i)=>{
   const item=el('li',label);if(i===state.step)item.setAttribute('aria-current','step');if(i<state.step)item.className='complete';steps.append(item);
  });card.append(steps);
 }
 const appointment=journey.appointment(r,lang());
 if(appointment)card.append(el('p',appointment,'session-appointment'));
 if(state.hint)card.append(el('p',state.hint,'session-hint'));
 if(r.status!=='new'&&r.currency&&Number(r.deposit)>0){const paid=el('p',local('예약금 ','Deposit ')+r.currency+' '+new Intl.NumberFormat(lang()).format(r.deposit)+' · '+(r.deposit_paid?local('확인됨','Confirmed'):local('입금 대기','Awaiting payment')),'session-money');card.append(paid);}
 const buttons=el('div',null,'session-actions');
 if(state.payment&&state.key==='deposit')buttons.append(action(local('예약금 · 결제 안내','Deposit & payment'),()=>window.SKMSessionPayment.open(r.id),'primary'));
 buttons.append(action(local('대화 열기','Open conversation'),()=>window.SKMChat.open({bookingId:r.id,code:r.code}),state.key==='deposit'&&state.payment?'secondary':'primary'));
 if((state.payment||journey.city(r)==='SINGAPORE'&&r.status==='new')&&state.key!=='deposit')buttons.append(action(local('예약금 · 결제 안내','Deposit & payment'),()=>window.SKMSessionPayment.open(r.id),'secondary'));
 card.append(buttons);
 const d=el('details',null,'session-details');d.append(el('summary',local('요청 내용','Request details')),el('time',time(r.created_at),'when'));
 for(const [name,value] of [['placement',r.placement_detail],['dates',r.dates?.join(', ')]])if(value)d.append(el('p',T(name)+' · '+value));
 if(r.note)d.append(el('p',r.note.replace(/^\[City: [A-Z ]+\]\s*/,'')));
 if(r.deposit_paid)d.append(el('p',T('depositReceived')));
 for(const url of [r.design_url,...(r.ref_urls||[])].filter(Boolean)){const i=el('img');i.alt=T('designAlt');i.loading='lazy';i.src=url;d.append(i);}
 if(r.image_error)d.append(el('p',T('imageError')));
 d.append(action(removalLabel(),async()=>{
   const user=owner;
   if(!user||uid()!==user||!await confirmCancellation(r.code)||uid()!==user)return;
   if(liveCancellation)await api.cancelMyBooking(r.id);else previewHidden.add(r.id);
   if(uid()!==user)return;card.remove();
   if(liveCancellation)window.parent.SKMTheme?.refresh().catch(()=>{});await load();
 },'link remove-request'));card.append(d);return card;
}
function amountField(label,form){const l=el('label',label),i=el('input');i.type='number';i.inputMode='decimal';i.required=true;l.append(i);form.append(l);return i;}
function readMoney(input,currency){const places=['KRW','JPY'].includes(currency)?0:2,raw=input.value.trim();
 if(!(places?/^\d+(?:\.\d{1,2})?$/:/^\d+$/).test(raw))throw Error('invalid amount');
 const [whole,frac='']=raw.split('.'),n=Number(whole)*(places?100:1)+Number(places?frac.padEnd(2,'0'):0);
 if(!Number.isSafeInteger(n)||n<1||n>1000000000)throw Error('invalid amount');return n;}
function listingForm(pair,detail){
 const f=el('form'),select=el('select');select.setAttribute('aria-label','Currency');
 for(const c of ['KRW','USD','JPY','CAD','HKD','GBP','EUR'])select.append(el('option',c));f.append(select);
 const opening=amountField(T('opening'),f),step=amountField(T('step'),f);
 function units(){opening.step=step.step=['KRW','JPY'].includes(select.value)?'1':'.01';opening.min=step.min=opening.step;}
 select.onchange=units;units();
 const l=el('label',T('duration')),hours=el('select');for(const h of [24,48,72]){const o=el('option',h+' h');o.value=h;hours.append(o);}l.append(hours);f.append(l);
 const submit=el('button',T('offer'),'primary');f.append(submit);let nonce=crypto.randomUUID();
 f.onsubmit=async e=>{e.preventDefault();if(busy)return;const user=uid();
  try{const o=readMoney(opening,select.value),i=readMoney(step,select.value);
   if(!confirm([pairName(pair),T('opening')+' '+money(o,select.value),T('step')+' '+money(i,select.value),hours.value+' h',T('noCharge')].join('\n')))return;
   busy=true;submit.disabled=true;await api.desk('offer',{id:pair.id,currency:select.value,opening:o,increment:i,hours:Number(hours.value),client_id:nonce});
   if(uid()===user){tab='market';await load();}}
  catch(e){status(e);}finally{busy=false;submit.disabled=false;}};
 detail.append(f);
}
function gloveCard(pair,auctions){
 const d=el('details',null,'record'),s=el('summary');s.append(el('strong',pairName(pair),'serial'));d.append(s);
 const photo=edition(pair)?.photo;if(photo){const img=el('img');img.src='../'+photo;img.alt=pairName(pair);d.append(img);}
 if(auctions.some(a=>a.drop_id===pair.id))d.append(action(T('market'),()=>{tab='market';return load();}));
 else{const offer=el('details'),summary=el('summary',T('offer'));offer.append(summary);listingForm(pair,offer);d.append(offer);}
 return d;
}
function messageArea(threads,empty){
 const s=group('contactInbox'),existing=threads.find(r=>r.kind==='session');
 for(const v of threads){s.append(action([v.label,v.peer].filter(Boolean).join(' · '),()=>visit('thread',{id:v.id}),'row'));}
 if((api.session()?.user?.email||'').toLowerCase()==='skinomakase@gmail.com'){
  if(!threads.length)s.append(el('p',T('chatEmpty'),'blank'));
  return;
 }
 if(empty&&!existing&&!threads.length){
  const f=el('form'),label=el('label',T('inquiry')),input=el('textarea'),submit=el('button',T('send'),'primary');input.maxLength=2000;input.required=true;label.append(input);f.append(label,submit);s.append(f);
  let nonce,last;
  f.onsubmit=async e=>{e.preventDefault();const value=input.value.trim(),user=uid();if(!value||busy)return;
   if(value!==last){nonce=crypto.randomUUID();last=value;}
   busy=true;submit.disabled=true;
   try{const id=await api.desk('session');if(uid()!==user)return;await api.community('send',{id,text:value,client_id:nonce});if(uid()===user)visit('thread',{id});}
   catch(e){status(e);}finally{busy=false;submit.disabled=false;}};
 }else{s.append(action(local('새 세션 문의','New session inquiry'),()=>visit('thread',existing?{id:existing.id}:{kind:'session'}),'link'));}
}
function auctionCard(a){
 const card=el('article',null,'auction');card.dataset.auction=a.id;
 card.append(el('small',pairName(a),'serial'),el('strong',a.owner_name||'SKM'),el('p',T('current')+' · '+money(a.top_amount??a.opening,a.currency)),el('time',T('ends')+' · '+time(a.ends_at),'when'));
 if(a.owner_email)card.append(el('p',a.owner_email,'help'));
 if(!a.ended&&!a.mine){
  const f=el('form'),min=a.top_amount==null?a.opening:a.top_amount+a.increment;
  const input=amountField(T('min')+' · '+money(min,a.currency),f),unit=['KRW','JPY'].includes(a.currency)?1:100;input.min=String(min/unit);input.step=String(1/unit);
  const submit=el('button',T('bid'),'primary');f.append(submit);card.append(f);let nonce,last;
  f.onsubmit=async e=>{e.preventDefault();if(busy)return;
   try{const amount=readMoney(input,a.currency);if(amount!==last){last=amount;nonce=crypto.randomUUID();}
    if(!confirm([pairName(a),T('bid')+' · '+money(amount,a.currency),T('noCharge')].join('\n')))return;
    busy=true;submit.disabled=true;await api.desk('bid',{id:a.id,amount,client_id:nonce});await load();}
   catch(e){await load();status(e);}finally{busy=false;submit.disabled=false;}};
 }
 const actions=el('div',null,'actions');
 if(!a.mine||a.ended&&a.top_amount!==null)actions.append(action(T('contact'),async()=>visit('thread',{id:await api.desk('contact',{id:a.id})})));
 const op=a.mine&&a.top_amount===null?'cancel':a.mine&&a.ended&&!a.delivered?'deliver':a.leading&&a.ended&&a.delivered?'receive':null;
 if(op)actions.append(action(T(op),async()=>{if(confirm(T(op)+' · '+pairName(a))){await api.desk(op,{id:a.id});await load();}}));
 card.append(actions);return card;
}
async function load(){
 clearTimeout(marketTimer);const run=++serial,current=uid(),active=()=>run===serial&&uid()===current&&!paused;
 if(owner!==current){previewHidden.clear();work.replaceChildren();window.SKMChat?.close();}owner=current;
 if(!current){adminAccess.hide();location.replace('login.html?next=account');return;}
 $('desk-tab').textContent=T('desk');$('market-tab').textContent=T('market');$('profile').textContent=T('profile');$('studio-admin').textContent=adminShortcut.textContent=T('admin');
 $('active-account').textContent=api.session()?.user?.email||'';
 void adminAccess.check();
 $('desk-tab').setAttribute('aria-selected',tab==='desk');$('market-tab').setAttribute('aria-selected',tab==='market');
 if(!work.children.length)$('status').textContent=T('loading');
 try{
  const live=await api.dropLive().catch(()=>false);if(!active())return;
  $('market-tab').hidden=!live;
  if(!live&&tab==='market'){tab='desk';$('desk-tab').setAttribute('aria-selected','true');}
  if(tab==='market'){
   const rows=await api.desk('list');if(!active())return;status();
   const revision=JSON.stringify(rows);
   if(revision!==marketRevision||!work.children.length){
    const editing=document.activeElement?.closest('.auction'),draft=editing?.querySelector('input')?.value;
    marketRevision=revision;work.replaceChildren();
    const s=group('market');if(!rows.length)s.append(el('p',T('empty'),'blank'));else s.append(el('p',T('noCharge'),'help'),...rows.map(auctionCard));
    if(editing&&draft!=null){const input=Array.from(s.querySelectorAll('.auction')).find(c=>c.dataset.auction===editing.dataset.auction)?.querySelector('input');if(input){input.value=draft;input.focus({preventScroll:true});}}
   }
   marketTimer=setTimeout(()=>{if(!document.hidden&&tab==='market')load();},10000);
  }else{
   const [book,items,threads]=await Promise.allSettled([api.mine(),live?api.desk('mine'):Promise.resolve([]),api.community('inbox')]);if(!active())return;
   const missing=[book,items,threads].find(r=>r.status==='rejected');if(missing?.reason.status===401){location.replace('login.html?next=account');return;}
   work.replaceChildren();status(missing?.reason);const bookings=(book.value||[]).filter(r=>!previewHidden.has(r.id)),gloves=items.value||[];
   if(bookings.length){
    const current=bookings.filter(r=>!window.SKMSessionJourney.closed(r)),past=bookings.filter(r=>window.SKMSessionJourney.closed(r));
    const section=group('requests');section.append(...current.map(requestCard));
    if(past.length){const archive=el('details',null,'session-archive');archive.append(el('summary',local('지난 요청','Past requests')+' · '+past.length),...past.map(requestCard));section.append(archive);}
   }
   if(gloves.length){const s=group('gloves');const auctions=await api.desk('list');if(!active())return;s.append(...gloves.map(g=>gloveCard(g,auctions)));}
   messageArea(threads.value||[],!bookings.length&&!gloves.length);
  }
 }catch(e){if(active())status(e);}
}
$('desk-tab').onclick=()=>{tab='desk';work.replaceChildren();load();};$('market-tab').onclick=()=>{tab='market';work.replaceChildren();load();};
$('refresh').onclick=load;$('signout').onclick=async()=>{adminAccess.hide();++serial;work.replaceChildren();window.SKMChat?.close();await api.signOut();location.replace('../world.html');};
window.addEventListener('pagehide',()=>{paused=true;adminAccess.hide();++serial;clearTimeout(marketTimer);work.replaceChildren();});
window.addEventListener('pageshow',e=>{if(e.persisted){paused=false;load();}});
window.addEventListener('skm-account-changed',()=>{adminAccess.hide();load();});
window.addEventListener('skm-language',load);window.addEventListener('storage',e=>{if(!e.key||e.key==='skm-customer-session-v1')load();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&(tab==='market'||!work.contains(document.activeElement)))load();});
load();
