(() => {
'use strict';
const api=window.SKMBooking,T=k=>window.SKMGloveText(k),$=id=>document.getElementById(id);
const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!=null)e.textContent=text;if(cls)e.className=cls;return e;};
let data={drops:[],requests:[]},city=null,busy=false,selected=null,owner=null,visible=true;
const urls=new Map(),slots=new Map();
function error(e){return e?.message==='too many requests'?T('limit'):e?.message==='drop unavailable'?T('unavailable'):T('error');}
function action(label,fn,cls=''){const b=el('button',label,'drop-button '+cls);b.type='button';b.onclick=async()=>{b.disabled=true;try{await fn();}catch(e){$('status').textContent=error(e);const status=$('detail-status');if(status)status.textContent=error(e);}finally{b.disabled=false;}};return b;}
const requestFor=id=>data.requests.find(r=>r.drop_id===id);
const cityKey=value=>value.trim().toLocaleLowerCase();
function image(path,root){if(!path)return;const im=el('img');im.alt=T('title');root.append(im);const failed=()=>{im.remove();root.append(el('p',T('imageError'),'drop-meta'));};im.onerror=failed;api.gloveImage(path).then(url=>{if(im.isConnected)im.src=url;}).catch(failed);}
function header(){
 $('heading').textContent=city||T('title');$('intro').textContent=city?T('choose'):T('intro');$('refresh').setAttribute('aria-label',T('refresh'));$('back').textContent='← '+T('back');$('back').hidden=!city;$('login').textContent=T('login');
}
function render(reset=false){
 header();const root=$('content');
 if(!city){slots.clear();root.replaceChildren();const list=el('div',null,'drop-cities');root.append(list);
  const cities=new Map();for(const d of data.drops){const key=cityKey(d.area);if(!cities.has(key))cities.set(key,[]);cities.get(key).push(d);}
  if(!cities.size)root.append(el('p',T('none'),'drop-sub'));
  for(const rows of cities.values()){
   const name=rows[0].area,b=action('',()=>{city=name;render(true);});b.className='drop-city';const text=el('div');text.append(el('strong',name),el('small',String(rows.filter(d=>d.status==='open').length).padStart(2,'0')+' / '+Math.max(50,...rows.map(row=>row.number))+' · '+T('open')));b.append(text,el('span','↗'));list.append(b);
  }
  return;
 }
 const rows=data.drops.filter(d=>cityKey(d.area)===cityKey(city));
 const count=Math.max(50,...rows.map(row=>row.number));
 if(reset||slots.size!==count){root.replaceChildren();slots.clear();const legend=el('div',null,'drop-legend');for(const state of ['open','reserved','collected'])legend.append(el('span',T(state),state));root.append(legend);
  const grid=el('div',null,'drop-grid');grid.setAttribute('aria-label',city+' · '+count);root.append(grid);
  for(let n=1;n<=count;n++){const b=el('button',null,'drop-slot');b.type='button';const art=el('span',null,'glove-art');art.setAttribute('aria-hidden','true');b.append(art,el('small',String(n).padStart(2,'0')));b.onclick=()=>{const d=data.drops.find(d=>cityKey(d.area)===cityKey(city)&&d.number===n);if(d)show(d.id);};slots.set(n,b);grid.append(b);}
  const mine=el('section',null,'drop-requests');mine.id='my-drops';root.append(mine);
 }
 for(let n=1;n<=count;n++){const d=rows.find(d=>d.number===n),b=slots.get(n),r=d&&requestFor(d.id);b.dataset.state=d?.status||'empty';b.disabled=!d||(!r&&d.status!=='open');b.classList.toggle('mine',!!r);b.setAttribute('aria-label',city+' #'+String(n).padStart(2,'0')+' · '+T(r?.status||d?.status||'empty'));
  // Each city can supply its own glove artwork; the first published design represents empty slots too.
  const path=d?.cover_path||rows[0]?.cover_path;if(path&&urls.has(path)){const art=b.querySelector('.glove-art');art.style.backgroundImage='url('+JSON.stringify(urls.get(path))+')';art.classList.add('photo');}
 }
 const mine=$('my-drops');mine.replaceChildren();const own=data.requests.filter(r=>rows.some(d=>d.id===r.drop_id));mine.hidden=!own.length;
 if(own.length)mine.append(el('h2',T('mine')));for(const r of own){const d=rows.find(d=>d.id===r.drop_id);const b=action('#'+String(d.number).padStart(2,'0')+' · '+T(r.status),()=>show(d.id));b.classList.add('drop-request');mine.append(b);}
}
function show(id){
 const d=data.drops.find(d=>d.id===id);if(!d)return;selected=id;const r=requestFor(id),root=$('drop-detail');root.replaceChildren(action(T('close'),()=>root.close(),'drop-close'),el('p',d.area+' / '+String(d.number).padStart(2,'0'),'drop-eyebrow'),el('h2',d.title));image(d.cover_path,root);if(d.description)root.append(el('p',d.description));root.append(el('p',T(r?.status||d.status),'drop-meta'));
 if(!r&&d.status==='open')root.append(action(T('request'),async()=>{await api.gloveRequest(id);await load(false);show(id);},'primary'));
 if(r?.status==='pending')root.append(el('p',T('wait')));
 if(r&&['shared','collected'].includes(r.status)){
  const reply=el('section',null,'drop-reply');reply.append(el('small',T('private')),el('p',r.reply));image(r.location_photo,reply);
  if(r.latitude!=null&&r.longitude!=null){const a=el('a',T('map'),'drop-button');a.href='https://maps.apple.com/?daddr='+encodeURIComponent(r.latitude+','+r.longitude)+'&dirflg=w';a.target='_blank';a.rel='noopener noreferrer';reply.append(a);}root.append(reply);
  if(r.status==='shared')root.append(action(T('collect'),async()=>{if(!confirm(T('confirm')))return;await api.gloveCollect(r.id);await load(false);show(id);},'primary'));
 }
 const status=el('p',null,'drop-status');status.id='detail-status';status.setAttribute('role','status');root.append(status);if(!root.open)root.showModal();
}
async function load(quiet=false){
 if(busy)return;busy=true;$('refresh').disabled=true;if(!quiet)$('status').textContent=T('loading');
 try{
  const who=api.session()?.user?.id;if(!who)throw Object.assign(Error('login'),{status:401});
  const result=await api.gloveList();if(api.session()?.user?.id!==who)return;
  if(owner&&owner!==who){city=null;urls.clear();slots.clear();$('drop-detail').close();}
  const selectionChanged=selected&&JSON.stringify([data.requests.find(r=>r.drop_id===selected),data.drops.find(d=>d.id===selected)])!==JSON.stringify([result.requests.find(r=>r.drop_id===selected),result.drops.find(d=>d.id===selected)]);
  owner=who;data=result;$('login').hidden=true;
  render();$('status').textContent='';
  const paths=[...new Set(data.drops.map(d=>d.cover_path).filter(Boolean))];
  await Promise.allSettled(paths.map(async path=>{if(!urls.has(path))urls.set(path,await api.gloveImage(path));}));
  if(api.session()?.user?.id===who&&city)render();
  if($('drop-detail').open&&selected&&selectionChanged)show(selected);
 }catch(e){
  if(e.status===401||e.message==='login required'){data={drops:[],requests:[]};urls.clear();owner=null;city=null;$('content').replaceChildren();$('drop-detail').close();$('login').hidden=false;header();$('status').textContent=T('login');}
  else $('status').textContent=error(e);
 }finally{busy=false;$('refresh').disabled=false;}
}
$('back').onclick=()=>{city=null;render(true);};$('refresh').onclick=()=>{urls.clear();load();};$('login').onclick=async()=>{try{if(await api.signInGoogle())load();}catch(e){$('status').textContent=error(e);}};
$('drop-detail').addEventListener('close',()=>{selected=null;});
window.addEventListener('skm-language',()=>{render(true);if(selected)show(selected);});
function resetChangedAccount(){if(owner!==api.session()?.user?.id){data={drops:[],requests:[]};urls.clear();slots.clear();city=null;$('content').replaceChildren();$('drop-detail').close();header();}}
window.addEventListener('storage',e=>{if(e.key==='skm-customer-session-v1'){resetChangedAccount();load();}});
window.addEventListener('message',e=>{if(e.source!==parent)return;if(e.data?.skm==='stop'){visible=false;$('drop-detail').close();}if(e.data?.skm==='gloves-open'){visible=true;resetChangedAccount();urls.clear();load();}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&visible){urls.clear();load(true);}});
setInterval(()=>{if(!document.hidden&&visible)load(true);},15000);
header();load();
})();
