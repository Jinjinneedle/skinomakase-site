(() => {
'use strict';
const T=key=>window.SKMLanguage.t(key);
const $=id=>document.getElementById(id), I=SKM_BOOKING_I18N;
const lang=window.SKMLanguage.code, t={...I.ui[lang]};
$('home').onclick=()=>{if(window.parent!==window)window.parent.postMessage({skm:'booking-done'},'*');else window.location.replace('../world.html');};
document.documentElement.lang=lang;
document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t[e.dataset.t]);
const values={times:[]}, fields=$('fields'); let design=null, graphics=[], pending=false;
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
function input(key,type='text',max=120){const l=document.createElement('label'),s=document.createElement('span'),e=document.createElement(type==='textarea'?'textarea':'input');s.textContent=t[key];if(type!=='textarea')e.type=type;e.id=key;e.maxLength=max;e.placeholder=t[key+'_ph']||'';l.append(s,e);fields.append(l);return e;}
input('name','text',80).autocomplete='name';input('contact').autocomplete='email';input('ig','text',60);
function chips(key,options,multiple=false){const f=document.createElement('fieldset'),l=document.createElement('legend'),c=document.createElement('div');l.textContent=t[key];f.dataset.key=key;c.className='chips';for(const [value,label] of Object.entries(options)){const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-pressed','false');b.onclick=()=>{if(multiple){values[key]=values[key].includes(value)?values[key].filter(v=>v!==value):[...values[key],value];if(value==='any'&&values[key].includes('any'))values[key]=['any'];else if(value!=='any')values[key]=values[key].filter(v=>v!=='any');}else values[key]=values[key]===value?null:value;[...c.children].forEach(n=>n.setAttribute('aria-pressed',multiple?values[key].includes(n.dataset.value):values[key]===n.dataset.value));};b.dataset.value=value;c.append(b);}f.append(l,c);fields.append(f);}
const labels=k=>Object.fromEntries(Object.entries(I.enums[k]).map(([v,l])=>[v,l[lang]||l.all||l.en]));
chips('placement',labels('placement'));input('placement_detail').previousSibling.textContent=t.placement+' '+t.optional;$('placement_detail').placeholder=t.placement_ph;
chips('size',labels('size'));const dates=document.createElement('fieldset'),legend=document.createElement('legend');legend.textContent=t.dates;dates.append(legend);fields.append(dates);
const add=document.createElement('button');add.type='button';add.textContent=t.add_date;function addDate(){const e=document.createElement('input');e.type='date';e.id='booking-date-'+dates.querySelectorAll('input').length;e.min=today();e.setAttribute('aria-label',t.dates);dates.insertBefore(e,add);add.hidden=dates.querySelectorAll('input').length>=3;}dates.append(add);add.onclick=addDate;addDate();
chips('times',labels('times'),true);chips('first',{true:t.yes,false:t.no});input('note','textarea',2000);const refs=input('refs','file');refs.accept='image/*';refs.multiple=true;
// Carry the chosen city visibly into the existing editable notes, without a schema change.
try{const choice=JSON.parse(sessionStorage.getItem('skm-booking-city-v1')||'null');const allowed=['SEOUL','TOKYO','OSAKA','LONDON','PARIS','TORONTO','VANCOUVER','MONTREAL','LOS ANGELES','NEW YORK','HONG KONG','SINGAPORE'];if(allowed.includes(choice?.label)&&!$('note').value)$('note').value='[City: '+choice.label+']\n';}catch(_){}
window.addEventListener('message',e=>{if(e.source!==parent||!e.data)return;const d=e.data;if(d.skm==='design'){design=typeof d.png==='string'&&/^data:image\/png;base64,/.test(d.png)?d.png:null;graphics=Array.isArray(d.graphics)?d.graphics:[];$('preview').hidden=!design;if(design)$('design').src=design;$('saved').hidden=d.photoSaved!==true;}if(d.skm==='photo')$('saved').hidden=!d.ok;});
parent.postMessage({skm:'booking-ready'},'*');
document.addEventListener('focusin',e=>{if(e.target.matches('input,textarea'))document.body.classList.add('editing');});document.addEventListener('focusout',()=>setTimeout(()=>{if(!document.activeElement.matches('input,textarea'))document.body.classList.remove('editing');},100));
function bad(message,id){if(id)window.SKMBookingReveal?.(id);$('error').textContent=message;if(id)$(id).focus();window.SKMApp?.haptic?.('error');}
async function request(url,opt){const control=new AbortController(),timer=setTimeout(()=>control.abort(),30000);try{const r=await fetch(url,{...opt,signal:control.signal});if(!r.ok)throw Error('HTTP '+r.status);return r;}finally{clearTimeout(timer);}}
function blob(data){const bytes=atob(data.split(',')[1]);return new Blob([Uint8Array.from(bytes,c=>c.charCodeAt(0))],{type:'image/png'});}
async function resize(file){if(!file.type.startsWith('image/')||file.size>20*1024*1024)throw Error('image');const url=URL.createObjectURL(file);try{const im=new Image();im.src=url;await im.decode();const c=document.createElement('canvas'),scale=Math.min(1,1600/Math.max(im.width,im.height));c.width=im.width*scale;c.height=im.height*scale;c.getContext('2d').drawImage(im,0,0,c.width,c.height);return await new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(Error('image')),'image/jpeg',.85));}finally{URL.revokeObjectURL(url);}}
const submission=SKMCreateSubmission(SKMBooking,sessionStorage);
function complete(code){window.SKMTheme?.booked();$('booking').hidden=true;$('done').hidden=false;$('code').textContent=t.code+' #'+code;window.scrollTo(0,0);window.SKMApp?.haptic?.('success');}
const recovery=document.createElement('section');recovery.hidden=true;recovery.innerHTML='<p data-ui="recoveryNotice"></p><button type="button" data-ui="recoveryRetry"></button><p><a href="account.html" target="_top" data-ui="requests"></a></p><p role="alert"></p>';
$('booking').before(recovery);window.SKMLanguage.apply();
function showRecovery(){try{if(submission.pending()){$('booking').hidden=true;recovery.hidden=false;}}catch(e){if(e.status===401){$('booking').hidden=true;recovery.hidden=false;recovery.replaceChildren();const a=document.createElement('a');a.href='login.html?next=bodymap';a.target='_top';a.textContent=T('nativeOnly');recovery.append(a);}}}
recovery.querySelector('button').onclick=async()=>{const button=recovery.querySelector('button');button.disabled=true;try{const code=await submission.send(()=>{throw Error('missing request');});recovery.hidden=true;complete(code);}catch(e){recovery.querySelector('[role=alert]').textContent=T('recoveryError');}finally{button.disabled=false;}};
showRecovery();
$('booking').onsubmit=async e=>{e.preventDefault();if(pending)return;$('error').textContent='';refs.setCustomValidity('');const name=$('name').value.trim(),contact=$('contact').value.trim(),instagram=$('ig').value.trim().replace(/^@/,'');if(!name)return bad(t.need_name,'name');if(!contact&&!instagram)return bad(t.need_contact,'contact');if(contact&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)&&!(/^[+\d\s().-]+$/.test(contact)&&contact.replace(/\D/g,'').length>=7))return bad(t.bad_contact,'contact');if(instagram&&!/^[A-Za-z0-9._]+$/.test(instagram))return bad(t.bad_contact,'ig');if(!$('agree').checked)return bad(t.need_agree,'agree');const ds=[...dates.querySelectorAll('input')].map(e=>e.value).filter(Boolean);if(ds.some(v=>v<today())){const invalid=[...dates.querySelectorAll('input')].find(e=>e.value&&e.value<today());window.SKMBookingReveal?.(invalid.id);invalid.reportValidity();invalid.focus();return;}if(refs.files.length>3){window.SKMBookingReveal?.('refs');refs.setCustomValidity(t.refs);refs.reportValidity();return;}if(!SKMBooking.ready)return bad(t.off);
pending=true;$('send').disabled=true;$('send').textContent=t.sending;
try{
 const code=await submission.send(async()=>{
  await SKMBooking.currentUser();
  const design_path=design?await SKMBooking.upload(blob(design)):null;
  const ref_paths=await Promise.all([...refs.files].map(async f=>SKMBooking.upload(await resize(f))));
  const selectedCity=(()=>{try{return JSON.parse(sessionStorage.getItem('skm-booking-city-v1')||'null')?.label||null;}catch{return null;}})();
  return {city:selectedCity,name,contact,instagram,placement:values.placement||null,placement_detail:$('placement_detail').value.trim(),size:values.size||null,dates:ds,times:values.times,first_tattoo:values.first==null?null:values.first==='true',note:$('note').value.trim(),design_path,ref_paths,graphics,consent:true,lang:document.documentElement.lang,source:location.protocol==='skm:'?'ios':'web'};
 });
 complete(code);
}catch(err){bad(/too many/i.test(err.message)?t.busy:t.fail);showRecovery();}finally{pending=false;$('send').disabled=false;$('send').textContent=t.send;}};

window.SKMSetBookingLanguage=(code,locale)=>{
 const chosen=I.ui[code]||I.ui.en;Object.assign(t,chosen);document.documentElement.lang=code;document.documentElement.dir=['ar','fa','he','ur'].includes(code)?'rtl':'ltr';
 document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t[e.dataset.t]);
 for(const id of ['name','contact','ig','placement_detail','note','refs']){const el=$(id);el.previousSibling.textContent=id==='placement_detail'?t.placement+' '+t.optional:t[id];if(el.type!=='file')el.placeholder=id==='placement_detail'?t.placement_ph:t[id+'_ph']||'';}
 document.querySelectorAll('fieldset[data-key]').forEach(f=>{const key=f.dataset.key;f.querySelector('legend').textContent=t[key];f.querySelectorAll('[data-value]').forEach(b=>{const item=I.enums[key]?.[b.dataset.value];b.textContent=item?(item[code]||item.all||item.en):(b.dataset.value==='true'?t.yes:t.no);});});
 legend.textContent=t.dates;add.textContent=t.add_date;dates.querySelectorAll('input').forEach(e=>e.setAttribute('aria-label',t.dates));
 document.dispatchEvent(new CustomEvent('booking-language',{detail:{code,locale}}));
};

})();
